/* Consumer Grievance Portal — Firebase / Firestore integration.
 *
 * Drop your Firebase project config into `firebaseConfig` below.
 * Until a `projectId` is set, the helpers return null and the UI
 * falls back to the mock data defined in shared/script.js.
 *
 * Expected Firestore shape:
 *   collection "restaurants" — { name, license, location, rating }
 *   collection "comments"    — { restaurantId, text, type: "good"|"bad",
 *                                status: "approved"|"pending", createdAt }
 *
 * Loaded as an ES module; a tiny bridge exposes helpers on window.Portal
 * so the existing non-module page scripts can consume them.
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
  // TODO: fill in with your Firebase project's web config
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

const isConfigured = Boolean(firebaseConfig.projectId);
let db = null;

if (isConfigured) {
  try {
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
  } catch (e) {
    console.warn("Firebase init failed, falling back to mock data:", e);
    db = null;
  }
}

async function fetchRestaurants() {
  if (!db) return null;
  try {
    const snap = await getDocs(collection(db, "restaurants"));
    return snap.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name || "",
        license: data.license || "",
        location: data.location || "",
        rating: Number(data.rating) || 0,
        cuisine: data.cuisine || "",
      };
    });
  } catch (e) {
    console.warn("Firestore fetch (restaurants) failed:", e);
    return null;
  }
}

async function fetchApprovedComments(restaurantId) {
  if (!db) return null;
  try {
    const q = query(
      collection(db, "comments"),
      where("restaurantId", "==", restaurantId),
      where("status", "==", "approved")
    );
    const snap = await getDocs(q);
    return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (e) {
    console.warn("Firestore fetch (comments) failed:", e);
    return null;
  }
}

// Bridge to non-module page scripts
window.Portal = {
  isFirebaseReady: Boolean(db),
  fetchRestaurants,
  fetchApprovedComments,
};

// Notify listeners that the bridge is ready
window.dispatchEvent(new CustomEvent("portal:ready"));

export { fetchRestaurants, fetchApprovedComments };
