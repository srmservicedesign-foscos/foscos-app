/* Consumer Grievance Portal — Firebase integration.
 *
 * =====================  SETUP  =====================
 * 1. Paste your Firebase web-app config into `firebaseConfig` below.
 *    (Firebase console → Project settings → Your apps → Web app → Config)
 *
 * 2. Enable providers in the Firebase console:
 *      Authentication → Sign-in method → Phone  (enable)
 *      Authentication → Settings → Authorized domains (add your domain / localhost)
 *
 * 3. Allow reads on restaurants/comments and read+write on complaints
 *    (after auth) in Firestore rules:
 *
 *      rules_version = '2';
 *      service cloud.firestore {
 *        match /databases/{database}/documents {
 *          match /restaurants/{id} { allow read: if true; }
 *          match /comments/{id}    { allow read: if true; }
 *          match /complaints/{id}  {
 *            allow read:   if true;                       // public tracking
 *            allow create: if request.auth != null;       // after phone auth
 *            allow update: if false;                      // FSO/FBO via admin
 *          }
 *        }
 *      }
 *
 * 4. Collections (managed by this module):
 *      restaurants { name, license, location, rating, area? }
 *      comments    { restaurantId, text, type, status, createdAt }
 *      complaints  { complaintId, restaurantId, restaurantName,
 *                    restaurantLicense, restaurantLocation,
 *                    rating_cleanliness, rating_food_freshness,
 *                    rating_staff_hygiene, overallRating, comment,
 *                    evidencePhoto, billPhoto, consumerName, consumerPhone,
 *                    status, createdAt, assignedFSO, flaggedByFBO }
 *
 * This module runs as an ES module (<script type="module">) and bridges
 * helpers onto window.Portal so non-module page scripts can use them.
 * It always fires `portal:ready` on window — success or not.
 * ====================================================
 */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import {
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  onAuthStateChanged,
  signOut as fbSignOut,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  // ▼▼▼ REPLACE THESE WITH YOUR FIREBASE WEB CONFIG ▼▼▼
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  // ▲▲▲ REPLACE THESE WITH YOUR FIREBASE WEB CONFIG ▲▲▲
};

/* -------------------- Test phone numbers (demo / jury mode) --------------------
 * Real Firebase Phone Auth requires the Blaze plan; on the Spark plan it
 * fails with `auth/billing-not-enabled`. While billing is disabled, you can:
 *
 *   (a) ALSO add these numbers in the Firebase console under
 *       Authentication → Sign-in method → Phone → "Phone numbers for testing".
 *       Doing so makes the LIVE SDK accept these without sending an SMS.
 *
 *   (b) Independently of (a), this module short-circuits the listed test
 *       numbers on the client so `sendOtp()` always succeeds and
 *       `verifyOtp(<expected code>)` always works — useful for offline
 *       prototype demos.
 *
 * Add or remove pairs as needed. Values are { phone (E.164): otp }.
 */
const TEST_PHONES = {
  "+919876543210": "123456",
  "+911111111111": "123456",
  "+910000000000": "123456",
};

const isConfigured = Boolean(firebaseConfig.projectId && firebaseConfig.apiKey);
let db = null;
let auth = null;
let initError = null;
let recaptchaVerifier = null;
let pendingConfirmation = null;
let pendingTestOtp = null;

if (!isConfigured) {
  console.warn(
    "%c[Consumer Grievance Portal] Firebase is not configured. " +
      "OTP + complaint saving will use local mocks. " +
      "Edit frontend/shared/firebase.js → firebaseConfig.",
    "color:#b85c00;font-weight:600"
  );
} else {
  try {
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    auth = getAuth(app);
    console.info(
      "%c[Consumer Grievance Portal] Firebase initialised.",
      "color:#2e7d5b;font-weight:600",
      { projectId: firebaseConfig.projectId }
    );
  } catch (e) {
    initError = e;
    console.error("[Consumer Grievance Portal] Firebase init failed:", e);
  }
}

/* -------------------- Restaurants + comments -------------------- */
function mapRestaurant(snap) {
  const data = snap.data ? snap.data() : snap;
  const rating = data.rating;
  const numericRating =
    typeof rating === "number"
      ? rating
      : parseFloat(String(rating || "0").replace(/[^\d.-]/g, "")) || 0;
  return {
    id: snap.id || data.id || data.license || "",
    name: data.name || "",
    license: String(data.license || ""),
    location: data.location || "",
    area: data.area || "",
    rating: numericRating,
    cuisine: data.cuisine || "",
  };
}

async function fetchRestaurants() {
  if (!db) return null;
  try {
    const snap = await getDocs(collection(db, "restaurants"));
    const list = snap.docs.map(mapRestaurant);
    console.info(
      `[Consumer Grievance Portal] Firestore /restaurants → ${list.length} documents.`
    );
    return list;
  } catch (e) {
    console.error(
      "[Consumer Grievance Portal] Firestore fetch (restaurants) failed. " +
        "Check your Firestore rules and collection name.",
      e
    );
    return null;
  }
}

async function fetchApprovedComments(restaurantId) {
  if (!db || !restaurantId) return null;
  try {
    const q = query(
      collection(db, "comments"),
      where("restaurantId", "==", restaurantId),
      where("status", "==", "approved")
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (e) {
    console.warn("[Consumer Grievance Portal] Firestore comments fetch failed:", e);
    return null;
  }
}

/* -------------------- Complaint saving -------------------- */
function generateComplaintId() {
  const year = new Date().getFullYear();
  const rand = Math.floor(10000 + Math.random() * 90000);
  return `GRV-${year}-${rand}`;
}

function normalizePhone(phone) {
  const trimmed = String(phone || "").replace(/\s|-/g, "");
  if (!trimmed) return "";
  if (trimmed.startsWith("+")) return trimmed;
  if (/^\d{10}$/.test(trimmed)) return "+91" + trimmed;
  return trimmed;
}

/**
 * Persist a complaint to Firestore. Returns { complaintId, savedRemotely }.
 * Falls back to sessionStorage when Firestore isn't configured so demos work.
 */
async function submitComplaint(data) {
  const complaintId = data.complaintId || generateComplaintId();
  const record = {
    complaintId,
    restaurantId: data.restaurantId || "",
    restaurantName: data.restaurantName || "",
    restaurantLicense: data.restaurantLicense || "",
    restaurantLocation: data.restaurantLocation || "",
    rating_cleanliness: Number(data.rating_cleanliness) || 0,
    rating_food_freshness: Number(data.rating_food_freshness) || 0,
    rating_staff_hygiene: Number(data.rating_staff_hygiene) || 0,
    overallRating: Number(data.overallRating) || 0,
    comment: data.comment || "",
    evidencePhoto: data.evidencePhoto || "",
    billPhoto: data.billPhoto || "",
    consumerName: data.consumerName || "",
    consumerPhone: normalizePhone(data.consumerPhone),
    status: "Submitted",
    assignedFSO: data.assignedFSO || "",
    flaggedByFBO: false,
  };

  if (!db) {
    const local = JSON.parse(sessionStorage.getItem("cgpComplaints") || "[]");
    local.unshift({ ...record, createdAt: new Date().toISOString() });
    sessionStorage.setItem("cgpComplaints", JSON.stringify(local));
    return { complaintId, savedRemotely: false };
  }

  try {
    await setDoc(doc(db, "complaints", complaintId), {
      ...record,
      createdAt: serverTimestamp(),
    });
    console.info(
      `[Consumer Grievance Portal] Complaint saved to Firestore: ${complaintId}`
    );
    return { complaintId, savedRemotely: true };
  } catch (e) {
    console.error(
      "[Consumer Grievance Portal] Firestore complaint save failed:",
      e
    );
    const local = JSON.parse(sessionStorage.getItem("cgpComplaints") || "[]");
    local.unshift({ ...record, createdAt: new Date().toISOString() });
    sessionStorage.setItem("cgpComplaints", JSON.stringify(local));
    return { complaintId, savedRemotely: false, error: e };
  }
}

async function fetchComplaintById(complaintId) {
  if (!db || !complaintId) return null;
  try {
    const ref = doc(db, "complaints", complaintId);
    const snap = await getDoc(ref);
    if (!snap.exists()) return null;
    return { ...snap.data() };
  } catch (e) {
    console.warn("[Consumer Grievance Portal] fetchComplaintById failed:", e);
    return null;
  }
}

async function fetchComplaintsByPhone(phone) {
  if (!db) return null;
  const normalized = normalizePhone(phone);
  if (!normalized) return [];
  try {
    // orderBy + where on non-indexed pair can require a composite index;
    // keep it simple with one filter and sort client-side.
    const q = query(
      collection(db, "complaints"),
      where("consumerPhone", "==", normalized)
    );
    const snap = await getDocs(q);
    const list = snap.docs.map((d) => d.data());
    list.sort((a, b) => {
      const ta = a.createdAt && a.createdAt.toMillis ? a.createdAt.toMillis() : 0;
      const tb = b.createdAt && b.createdAt.toMillis ? b.createdAt.toMillis() : 0;
      return tb - ta;
    });
    return list;
  } catch (e) {
    console.warn("[Consumer Grievance Portal] fetchComplaintsByPhone failed:", e);
    return null;
  }
}

/* -------------------- FBO / FSO dashboards -------------------- */
function sortByCreatedAtDesc(list) {
  list.sort((a, b) => {
    const ta = a.createdAt && a.createdAt.toMillis ? a.createdAt.toMillis() : 0;
    const tb = b.createdAt && b.createdAt.toMillis ? b.createdAt.toMillis() : 0;
    return tb - ta;
  });
  return list;
}

function localComplaintsFallback(filterFn) {
  const all = JSON.parse(sessionStorage.getItem("cgpComplaints") || "[]");
  return filterFn ? all.filter(filterFn) : all;
}

async function fetchComplaintsForFbo({ license, restaurantId } = {}) {
  if (!db) {
    return localComplaintsFallback(
      (c) =>
        (license && c.restaurantLicense === license) ||
        (restaurantId && c.restaurantId === restaurantId)
    );
  }
  try {
    let q;
    if (license) {
      q = query(
        collection(db, "complaints"),
        where("restaurantLicense", "==", license)
      );
    } else if (restaurantId) {
      q = query(
        collection(db, "complaints"),
        where("restaurantId", "==", restaurantId)
      );
    } else {
      return [];
    }
    const snap = await getDocs(q);
    return sortByCreatedAtDesc(snap.docs.map((d) => d.data()));
  } catch (e) {
    console.error("[Consumer Grievance Portal] fetchComplaintsForFbo failed:", e);
    return null;
  }
}

async function fetchAllComplaints() {
  if (!db) return localComplaintsFallback();
  try {
    const snap = await getDocs(collection(db, "complaints"));
    return sortByCreatedAtDesc(snap.docs.map((d) => d.data()));
  } catch (e) {
    console.error("[Consumer Grievance Portal] fetchAllComplaints failed:", e);
    return null;
  }
}

async function updateComplaint(complaintId, updates) {
  if (!db || !complaintId) {
    // Update local mock store
    const all = JSON.parse(sessionStorage.getItem("cgpComplaints") || "[]");
    const idx = all.findIndex((c) => c.complaintId === complaintId);
    if (idx >= 0) {
      all[idx] = { ...all[idx], ...updates, updatedAt: new Date().toISOString() };
      sessionStorage.setItem("cgpComplaints", JSON.stringify(all));
      return { ok: true, mock: true };
    }
    return { ok: false, reason: "not-found" };
  }
  try {
    const ref = doc(db, "complaints", complaintId);
    await updateDoc(ref, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
    return { ok: true };
  } catch (e) {
    console.error("[Consumer Grievance Portal] updateComplaint failed:", e);
    return { ok: false, error: e };
  }
}

/* -------------------- Real-time subscriptions -------------------- */
/* Each subscriber returns an unsubscribe function. When Firestore is not
 * configured, the subscriber pushes a one-shot snapshot from session
 * storage so the UI still renders. */

function subscribeComplaintById(complaintId, cb) {
  if (!complaintId) {
    cb(null);
    return () => {};
  }
  if (!db) {
    const all = JSON.parse(sessionStorage.getItem("cgpComplaints") || "[]");
    cb(all.find((c) => c.complaintId === complaintId) || null);
    return () => {};
  }
  const ref = doc(db, "complaints", complaintId);
  return onSnapshot(
    ref,
    (snap) => cb(snap.exists() ? snap.data() : null),
    (err) => {
      console.warn("[Consumer Grievance Portal] subscribeComplaintById error:", err);
    }
  );
}

function subscribeComplaintsByPhone(phone, cb) {
  const normalized = normalizePhone(phone);
  if (!db) {
    cb(localComplaintsFallback((c) => c.consumerPhone === normalized));
    return () => {};
  }
  if (!normalized) {
    cb([]);
    return () => {};
  }
  const q = query(
    collection(db, "complaints"),
    where("consumerPhone", "==", normalized)
  );
  return onSnapshot(
    q,
    (snap) => cb(sortByCreatedAtDesc(snap.docs.map((d) => d.data()))),
    (err) => {
      console.warn("[Consumer Grievance Portal] subscribeComplaintsByPhone error:", err);
    }
  );
}

function subscribeComplaintsForFbo({ license, restaurantId } = {}, cb) {
  if (!db) {
    cb(
      localComplaintsFallback(
        (c) =>
          (license && c.restaurantLicense === license) ||
          (restaurantId && c.restaurantId === restaurantId)
      )
    );
    return () => {};
  }
  let q;
  if (license) {
    q = query(
      collection(db, "complaints"),
      where("restaurantLicense", "==", license)
    );
  } else if (restaurantId) {
    q = query(
      collection(db, "complaints"),
      where("restaurantId", "==", restaurantId)
    );
  } else {
    cb([]);
    return () => {};
  }
  return onSnapshot(
    q,
    (snap) => cb(sortByCreatedAtDesc(snap.docs.map((d) => d.data()))),
    (err) => {
      console.warn("[Consumer Grievance Portal] subscribeComplaintsForFbo error:", err);
    }
  );
}

function subscribeAllComplaints(cb) {
  if (!db) {
    cb(localComplaintsFallback());
    return () => {};
  }
  return onSnapshot(
    collection(db, "complaints"),
    (snap) => cb(sortByCreatedAtDesc(snap.docs.map((d) => d.data()))),
    (err) => {
      console.warn("[Consumer Grievance Portal] subscribeAllComplaints error:", err);
    }
  );
}

/* ---- FBO action wrappers ---- */
const fbo = {
  sendThankYou: (id) =>
    updateComplaint(id, { thankYouSent: true, fboReviewed: "positive" }),
  markGenuine: (id) =>
    updateComplaint(id, { fboReviewed: "genuine", status: "Under Review" }),
  addImprovementUpdate: (id, note) =>
    updateComplaint(id, {
      improvementUpdate: note || "",
      fboReviewed: "genuine",
      status: "Under Review",
    }),
  markImprovementCompleted: (id, note) =>
    updateComplaint(id, {
      improvementUpdate: note || "Improvement completed by FBO.",
      fboReviewed: "completed",
      status: "Action Taken",
    }),
  flagComplaint: (id, reason) =>
    updateComplaint(id, {
      flaggedByFBO: true,
      flagReason: reason || "",
      fboReviewed: "flagged",
      status: "Under Review",
    }),
};

/* ---- FSO action wrappers ---- */
const fso = {
  assignInspection: (id, note) =>
    updateComplaint(id, {
      FSOAction: "Inspection Assigned",
      inspectionNote: note || "",
      status: "Under Review",
    }),
  contactConsumer: (id) =>
    updateComplaint(id, { FSOAction: "Consumer Contacted" }),
  contactFbo: (id) =>
    updateComplaint(id, { FSOAction: "FBO Contacted" }),
  escalate: (id, note) =>
    updateComplaint(id, {
      FSOAction: "Escalated",
      escalationNote: note || "",
      escalated: true,
      status: "Under Review",
    }),
  sendWarning: (id, note) =>
    updateComplaint(id, {
      FSOAction: "Warning Issued",
      warningNote: note || "",
    }),
  askImprovementUpdate: (id) =>
    updateComplaint(id, {
      FSOAction: "Improvement Requested",
      status: "Under Review",
    }),
  markResolved: (id, note) =>
    updateComplaint(id, {
      FSOAction: "Resolved",
      officialNote: note || "",
      status: "Action Taken",
    }),
  closeComplaint: (id, note) =>
    updateComplaint(id, {
      FSOAction: "Closed",
      officialNote: note || "",
      closed: true,
      status: "Action Taken",
    }),
  addOfficialNote: (id, note) =>
    updateComplaint(id, { officialNote: note || "" }),
};

/* -------------------- Phone-auth OTP -------------------- */
function ensureRecaptcha(containerId = "recaptcha-container") {
  if (!auth) return null;
  const host = document.getElementById(containerId);
  if (!host) {
    const div = document.createElement("div");
    div.id = containerId;
    div.style.display = "none";
    document.body.appendChild(div);
  }
  if (!recaptchaVerifier) {
    recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
      size: "invisible",
    });
  }
  return recaptchaVerifier;
}

async function sendOtp(phone) {
  const normalized = normalizePhone(phone);

  // Local short-circuit for test phone numbers (works even without Firebase)
  if (TEST_PHONES[normalized]) {
    pendingTestOtp = { phone: normalized, code: TEST_PHONES[normalized] };
    pendingConfirmation = null;
    console.info(
      "%c[Consumer Grievance Portal] Test phone — use OTP " + TEST_PHONES[normalized],
      "color:#b85c00;font-weight:600"
    );
    return { ok: true, demo: true, hint: TEST_PHONES[normalized] };
  }

  if (!auth) {
    // Local fallback — pretend we "sent" an OTP (any 6 digits will verify)
    window.__mockOtpPhone = normalized;
    pendingTestOtp = null;
    pendingConfirmation = null;
    return { ok: true, mock: true };
  }

  try {
    const verifier = ensureRecaptcha();
    pendingConfirmation = await signInWithPhoneNumber(auth, normalized, verifier);
    pendingTestOtp = null;
    return { ok: true };
  } catch (e) {
    console.error("[Consumer Grievance Portal] sendOtp failed:", e);
    // Reset reCAPTCHA so a retry can re-render it
    try { recaptchaVerifier && recaptchaVerifier.clear && recaptchaVerifier.clear(); } catch (_) {}
    recaptchaVerifier = null;

    // Translate billing-not-enabled into something a demo-runner can act on
    if (e && e.code === "auth/billing-not-enabled") {
      const friendly = new Error(
        "Phone Auth requires the Firebase Blaze plan. " +
          "For the prototype, use a registered test phone number (e.g. " +
          Object.keys(TEST_PHONES)[0] +
          " with OTP " +
          TEST_PHONES[Object.keys(TEST_PHONES)[0]] +
          ") or add this number under " +
          "Authentication → Phone → Phone numbers for testing in the Firebase console."
      );
      friendly.code = e.code;
      throw friendly;
    }
    throw e;
  }
}

async function verifyOtp(code) {
  // Test-phone path
  if (pendingTestOtp) {
    if (String(code) !== String(pendingTestOtp.code)) {
      throw new Error("Invalid demo OTP. Use " + pendingTestOtp.code + ".");
    }
    const phone = pendingTestOtp.phone;
    pendingTestOtp = null;
    return { uid: "test-" + phone, phoneNumber: phone };
  }

  // Mock fallback when Firebase auth isn't initialised
  if (!auth) {
    if (String(code).length !== 6) throw new Error("Invalid code.");
    return {
      uid: "mock-" + (window.__mockOtpPhone || "user"),
      phoneNumber: window.__mockOtpPhone || "",
    };
  }

  if (!pendingConfirmation) throw new Error("Please request an OTP first.");
  try {
    const result = await pendingConfirmation.confirm(code);
    pendingConfirmation = null;
    return result.user;
  } catch (e) {
    console.error("[Consumer Grievance Portal] verifyOtp failed:", e);
    throw e;
  }
}

function onAuthChanged(cb) {
  if (!auth) {
    cb(null);
    return () => {};
  }
  return onAuthStateChanged(auth, cb);
}

function currentUser() {
  return auth ? auth.currentUser : null;
}

async function signOutUser() {
  if (!auth) return;
  try {
    await fbSignOut(auth);
  } catch (e) {
    console.warn("signOut failed:", e);
  }
}

/* -------------------- Client-side image compression -------------------- */
async function compressImageFile(file, maxDim = 1200, quality = 0.72) {
  if (!file) return "";
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const ratio = Math.min(maxDim / img.width, maxDim / img.height, 1);
        const w = Math.round(img.width * ratio);
        const h = Math.round(img.height * ratio);
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        canvas.getContext("2d").drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = () => resolve("");
      img.src = e.target.result;
    };
    reader.onerror = () => resolve("");
    reader.readAsDataURL(file);
  });
}

/* -------------------- Bridge to non-module scripts -------------------- */
window.Portal = {
  isConfigured,
  isFirebaseReady: Boolean(db),
  isAuthReady: Boolean(auth),
  initError,
  // Restaurants / comments
  fetchRestaurants,
  fetchApprovedComments,
  // Complaints (consumer)
  submitComplaint,
  fetchComplaintById,
  fetchComplaintsByPhone,
  generateComplaintId,
  // Complaints (FBO + FSO)
  fetchComplaintsForFbo,
  fetchAllComplaints,
  updateComplaint,
  fbo,
  fso,
  // Real-time subscriptions
  subscribeComplaintById,
  subscribeComplaintsByPhone,
  subscribeComplaintsForFbo,
  subscribeAllComplaints,
  // Demo support
  testPhones: TEST_PHONES,
  // Auth / OTP
  sendOtp,
  verifyOtp,
  onAuthChanged,
  currentUser,
  signOutUser,
  // Utilities
  compressImageFile,
  normalizePhone,
};

window.dispatchEvent(new CustomEvent("portal:ready", { detail: window.Portal }));

export {
  fetchRestaurants,
  fetchApprovedComments,
  submitComplaint,
  fetchComplaintById,
  fetchComplaintsByPhone,
  fetchComplaintsForFbo,
  fetchAllComplaints,
  updateComplaint,
  fbo,
  fso,
  subscribeComplaintById,
  subscribeComplaintsByPhone,
  subscribeComplaintsForFbo,
  subscribeAllComplaints,
  TEST_PHONES,
  sendOtp,
  verifyOtp,
  onAuthChanged,
  signOutUser,
  compressImageFile,
  generateComplaintId,
};
