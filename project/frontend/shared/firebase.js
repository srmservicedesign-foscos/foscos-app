/* Consumer Grievance Portal — Firebase / Firestore integration.
 *
 * =====================  SETUP  =====================
 * 1. Paste your Firebase web-app config into `firebaseConfig` below.
 *    (Firebase console → Project settings → Your apps → Web app → Config)
 *
 * 2. Allow public reads on the `restaurants` collection in Firestore rules:
 *
 *      rules_version = '2';
 *      service cloud.firestore {
 *        match /databases/{database}/documents {
 *          match /restaurants/{id} { allow read: if true; }
 *          match /comments/{id}    { allow read: if true; }
 *        }
 *      }
 *
 * 3. Each document in the `restaurants` collection should have fields:
 *      name (string), license (string), location (string), rating (number)
 *
 * Optional `comments` collection:
 *      restaurantId, text, type ("good"|"bad"),
 *      status ("approved"|"pending"), createdAt
 *
 * This module runs as an ES module (loaded via <script type="module">) and
 * bridges Firestore helpers onto window.Portal so non-module page scripts
 * can consume them. It always dispatches a `portal:ready` event on window
 * once bootstrapping finishes — success or not — so the UI can react.
 * ====================================================
 */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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

const isConfigured = Boolean(firebaseConfig.projectId && firebaseConfig.apiKey);
let db = null;
let initError = null;

if (!isConfigured) {
  console.warn(
    "%c[Consumer Grievance Portal] Firebase is not configured. " +
      "Falling back to mock data. " +
      "Edit frontend/shared/firebase.js → firebaseConfig.",
    "color:#b85c00;font-weight:600"
  );
} else {
  try {
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    console.info(
      "%c[Consumer Grievance Portal] Firebase initialised.",
      "color:#2e7d5b;font-weight:600",
      { projectId: firebaseConfig.projectId }
    );
  } catch (e) {
    initError = e;
    console.error(
      "[Consumer Grievance Portal] Firebase init failed:",
      e
    );
  }
}

function mapRestaurant(doc) {
  const data = doc.data ? doc.data() : doc;
  const rating = data.rating;
  const numericRating =
    typeof rating === "number"
      ? rating
      : parseFloat(String(rating || "0").replace(/[^\d.-]/g, "")) || 0;
  return {
    id: doc.id || data.id || data.license || "",
    name: data.name || "",
    license: String(data.license || ""),
    location: data.location || "",
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
        "Check your security rules and collection name.",
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
    return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (e) {
    console.warn(
      "[Consumer Grievance Portal] Firestore fetch (comments) failed:",
      e
    );
    return null;
  }
}

window.Portal = {
  isFirebaseReady: Boolean(db),
  isConfigured,
  initError,
  fetchRestaurants,
  fetchApprovedComments,
};

window.dispatchEvent(new CustomEvent("portal:ready", { detail: window.Portal }));

export { fetchRestaurants, fetchApprovedComments };
