/* Shared helpers + mock data for the Consumer Grievance Portal.
   UI-only: no backend / database integrations yet. */

/* ---------- Inline SVG icon library (Feather-style, stroke-based) ---------- */
const Icons = {
  search:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>',
  map:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
  star:
    '<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z"/></svg>',
  sparkles:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/></svg>',
  bell:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>',
  shield:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  alert:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
  check:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
  upload:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>',
  phone:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.8a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.28-1.28a2 2 0 0 1 2.11-.45c.9.35 1.84.59 2.8.72A2 2 0 0 1 22 16.92z"/></svg>',
  user:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  home:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
  list:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>',
  building:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="1"/><path d="M9 22V12h6v10"/><line x1="7" y1="7" x2="7.01" y2="7"/><line x1="11" y1="7" x2="11.01" y2="7"/><line x1="15" y1="7" x2="15.01" y2="7"/></svg>',
  chef:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 14v6a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-6"/><path d="M6 14a4 4 0 0 1-1-7.75A4 4 0 0 1 12 3a4 4 0 0 1 7 2.25A4 4 0 0 1 18 14H6z"/></svg>',
  leaf:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 4 13c0-5 5-11 9-11s4 4 4 7a7 7 0 0 1-6 11z"/><path d="M11 20c0-5 3-8 7-9"/></svg>',
  sparkle:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v4M12 18v4M2 12h4M18 12h4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>',
  flag:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>',
  heart:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
  search_doc:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><circle cx="11.5" cy="14.5" r="2.5"/><line x1="13.3" y1="16.3" x2="15" y2="18"/></svg>',
  gavel:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 13l-8 8a2.83 2.83 0 1 1-4-4l8-8"/><path d="M17 3l4 4-8 8-4-4z"/><line x1="3" y1="22" x2="21" y2="22"/></svg>',
  clipboard:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>',
  clock:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  arrow_right:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>',
  message:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
  image:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>',
};

function icon(name, cls = "") {
  const svg = Icons[name] || "";
  return `<span class="icon ${cls}">${svg}</span>`;
}

/* ---------- Mock data ---------- */
const MOCK_RESTAURANTS = [
  {
    id: "R001",
    name: "Green Leaf Restaurant",
    location: "MG Road, Bengaluru",
    license: "10012345000123",
    rating: 4.3,
    cuisine: "Vegetarian · Indian",
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
    cuisine: "Bengali · Chinese",
    comments: [
      { text: "Tasty food, but slow service.", type: "good" },
      { text: "Floor was a bit sticky.", type: "bad" },
    ],
  },
  {
    id: "R003",
    name: "Tandoor House",
    location: "Connaught Place, New Delhi",
    license: "10012345000789",
    rating: 4.6,
    cuisine: "North Indian · Mughlai",
    comments: [
      { text: "Best kebabs in town.", type: "good" },
      { text: "Kitchen looked dirty through the window.", type: "bad" },
    ],
  },
  {
    id: "R004",
    name: "Coastal Catch",
    location: "Marine Drive, Mumbai",
    license: "10012345000991",
    rating: 4.1,
    cuisine: "Seafood",
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
    cuisine: "South Indian",
    comments: [
      { text: "Staff weren't wearing gloves.", type: "bad" },
      { text: "Dosa was crisp and tasty.", type: "good" },
    ],
  },
  {
    id: "R006",
    name: "Urban Bites Cafe",
    location: "Banjara Hills, Hyderabad",
    license: "10012345001345",
    rating: 4.4,
    cuisine: "Continental",
    comments: [
      { text: "Great ambience and service.", type: "good" },
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

/* ---------- Storage helpers (session-only) ---------- */
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

/* ---------- Rendering helpers ---------- */
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

function initials(name) {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/* ---------- OTP boxes helper ---------- */
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

/* ---------- Navbar helper (shared across pages) ---------- */
function renderNavbar(active = "home", role = "consumer") {
  const links =
    role === "consumer"
      ? [
          { href: "/consumer/index.html", key: "home", label: "Home", icon: "home" },
          {
            href: "/consumer/dashboard.html",
            key: "dashboard",
            label: "My Complaints",
            icon: "list",
          },
          {
            href: "/consumer/track.html",
            key: "track",
            label: "Track",
            icon: "clock",
          },
        ]
      : role === "fbo"
      ? [
          {
            href: "/fbo/dashboard.html",
            key: "feedback",
            label: "Feedback",
            icon: "message",
          },
          { href: "/consumer/index.html", key: "consumer", label: "Consumer Site", icon: "home" },
        ]
      : [
          {
            href: "/fso/dashboard.html",
            key: "complaints",
            label: "Complaints",
            icon: "clipboard",
          },
          {
            href: "/fso/dashboard.html#fbo",
            key: "fbo",
            label: "FBO Database",
            icon: "building",
          },
        ];

  return `
    <header class="app-header">
      <div class="brand">
        <span class="logo">CG</span>
        <div>
          <div>Consumer Grievance Portal</div>
          <small>Food Safety &amp; Standards</small>
        </div>
      </div>
      <nav>
        ${links
          .map(
            (l) =>
              `<a href="${l.href}" class="${
                l.key === active ? "active" : ""
              }">${icon(l.icon, "sm")} ${l.label}</a>`
          )
          .join("")}
      </nav>
      <div class="actions">
        <a href="/consumer/dashboard.html" class="btn ghost">
          ${icon("user", "sm")} Sign in
        </a>
      </div>
    </header>`;
}
