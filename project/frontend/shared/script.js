/* Shared helpers + mock data used across the grievance portal frontend.
   UI-only: no backend / database integrations yet. */

const MOCK_RESTAURANTS = [
  {
    id: "R001",
    name: "Green Leaf Restaurant",
    location: "MG Road, Bengaluru",
    license: "10012345000123",
    rating: 4.3,
    comments: [
      { text: "Excellent hygiene and polite staff.", type: "good" },
      { text: "Found a hair in my food once.", type: "bad" },
      { text: "Loved the fresh salad.", type: "good" },
    ],
  },
  {
    id: "R002",
    name: "Spice Junction",
    location: "Park Street, Kolkata",
    license: "10012345000456",
    rating: 3.8,
    comments: [
      { text: "Tasty food, but slow service.", type: "good" },
      { text: "Floor was a bit sticky.", type: "bad" },
    ],
  },
  {
    id: "R003",
    name: "Tandoor House",
    location: "CP, New Delhi",
    license: "10012345000789",
    rating: 4.6,
    comments: [
      { text: "Best kebabs in town!", type: "good" },
      { text: "Kitchen looked dirty through the window.", type: "bad" },
    ],
  },
  {
    id: "R004",
    name: "Coastal Catch",
    location: "Marine Drive, Mumbai",
    license: "10012345000991",
    rating: 4.1,
    comments: [
      { text: "Very fresh fish.", type: "good" },
      { text: "A bit pricey but clean.", type: "good" },
    ],
  },
  {
    id: "R005",
    name: "South Express",
    location: "T. Nagar, Chennai",
    license: "10012345001122",
    rating: 3.2,
    comments: [
      { text: "Staff weren't wearing gloves.", type: "bad" },
      { text: "Dosa was crisp and tasty.", type: "good" },
    ],
  },
];

const MOCK_COMPLAINTS = [
  {
    id: "C001",
    restaurant: "Green Leaf Restaurant",
    rating: 2.0,
    status: "Under Review",
    date: "2026-04-10",
    comment: "Stale vegetables in salad.",
  },
  {
    id: "C002",
    restaurant: "Spice Junction",
    rating: 4.3,
    status: "Action Taken",
    date: "2026-03-28",
    comment: "Great hygiene, small billing issue.",
  },
  {
    id: "C003",
    restaurant: "Tandoor House",
    rating: 1.6,
    status: "Pending",
    date: "2026-04-18",
    comment: "Dirty kitchen visible from window.",
  },
];

const RATING_LABELS = ["Very Poor", "Poor", "Okay", "Good", "Excellent"];

/* ----------- Storage helpers (session-only) ----------- */
const Store = {
  set(key, value) {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      /* ignore */
    }
  },
  get(key, fallback = null) {
    try {
      const raw = sessionStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  },
  clear(key) {
    sessionStorage.removeItem(key);
  },
};

/* ----------- Rendering helpers ----------- */
function renderStars(value) {
  const full = Math.round(value);
  let out = "";
  for (let i = 0; i < 5; i++) {
    out += i < full ? "★" : "☆";
  }
  return out;
}

function statusChip(status) {
  const map = {
    Pending: "chip pending",
    "Under Review": "chip review",
    "Action Taken": "chip action",
  };
  const cls = map[status] || "chip";
  return `<span class="${cls}">${status}</span>`;
}

function qs(sel, root = document) {
  return root.querySelector(sel);
}

function qsa(sel, root = document) {
  return Array.from(root.querySelectorAll(sel));
}

/* ----------- OTP boxes helper ----------- */
function wireOtpBoxes(containerSelector) {
  const boxes = qsa(`${containerSelector} input`);
  boxes.forEach((box, idx) => {
    box.addEventListener("input", () => {
      box.value = box.value.replace(/\D/g, "").slice(0, 1);
      if (box.value && idx < boxes.length - 1) {
        boxes[idx + 1].focus();
      }
    });
    box.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && !box.value && idx > 0) {
        boxes[idx - 1].focus();
      }
    });
  });
}

function getOtpValue(containerSelector) {
  return qsa(`${containerSelector} input`)
    .map((b) => b.value)
    .join("");
}
