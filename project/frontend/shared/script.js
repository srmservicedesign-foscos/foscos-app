/* Shared helpers + mock data for the Consumer Grievance Portal.
   Icons are small inline emoji-style characters (not SVG illustrations).
   Firestore integration lives in shared/firebase.js (optional). */

/* ---------- Icon map (emoji-style) ---------- */
const Icons = {
  search: "🔍",
  map: "📍",
  pin: "📍",
  pin_code: "📌",
  star: "⭐",
  sparkles: "✨",
  bell: "🔔",
  shield: "🛡",
  alert: "⚠",
  check: "✔",
  upload: "⬆",
  phone: "📞",
  user: "👤",
  home: "🏠",
  list: "📋",
  building: "🏢",
  chef: "🧑‍🍳",
  leaf: "🌿",
  sparkle: "✨",
  flag: "🚩",
  flagged: "🚨",
  heart: "❤",
  search_doc: "🔎",
  gavel: "⚖",
  clipboard: "📋",
  clock: "⏱",
  arrow_right: "→",
  arrow_left: "←",
  message: "💬",
  image: "🖼",
  utensils: "🍽",
  plate: "🍽",
  gloves: "🧤",
  building_clean: "🏢",
  receipt: "🧾",
  document: "📄",
  thumbs_up: "👍",
  info: "ℹ",
  badge: "🪪",
  qr: "🔳",
  mail: "✉",
  chart: "📊",
  filter: "🔽",
  trending: "📈",
  lock: "🔒",
  camera: "📷",
  award: "🏆",
  history: "🕒",
  plus: "➕",
  eye: "👁",
  grid: "🔲",
  megaphone: "📣",
  verified: "✅",
  stopwatch: "⏱",
  fire: "🔥",
  book: "📖",
  law: "⚖",
  fso: "🏛",
  officer: "👮",
  office: "🏢",
  close: "✕",
};

function icon(name, cls = "") {
  const e = Icons[name] || "";
  return `<span class="icon ${cls}">${e}</span>`;
}

/* ---------- Mock data (fallback when Firestore not configured) ---------- */
const MOCK_RESTAURANTS = [
  {
    id: "R001",
    name: "Green Leaf Restaurant",
    location: "MG Road, Bengaluru",
    license: "10012345000123",
    rating: 4.3,
    cuisine: "Vegetarian · Indian",
    comments: [
      { text: "Excellent hygiene and polite staff.", type: "good", status: "approved" },
      { text: "Found a hair in my food once.", type: "bad", status: "approved" },
      { text: "Loved the fresh salad.", type: "good", status: "approved" },
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
      { text: "Tasty food, but slow service.", type: "good", status: "approved" },
      { text: "Floor was a bit sticky.", type: "bad", status: "approved" },
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
      { text: "Best kebabs in town.", type: "good", status: "approved" },
      { text: "Kitchen looked dirty through the window.", type: "bad", status: "approved" },
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
      { text: "Very fresh fish.", type: "good", status: "approved" },
      { text: "A bit pricey but clean.", type: "good", status: "approved" },
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
      { text: "Staff weren't wearing gloves.", type: "bad", status: "approved" },
      { text: "Dosa was crisp and tasty.", type: "good", status: "approved" },
    ],
  },
  {
    id: "R006",
    name: "Urban Bites Cafe",
    location: "Banjara Hills, Hyderabad",
    license: "10012345001345",
    rating: 4.4,
    cuisine: "Continental",
    comments: [{ text: "Great ambience and service.", type: "good", status: "approved" }],
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

/* ---------- Find-an-Officer mock data (keyed by PIN prefix) ---------- */
const OFFICERS = [
  {
    prefix: "560",
    name: "Ms. Anjali Nair",
    designation: "Food Safety Officer",
    contact: "+91-80-2234-5678",
    office: "FSSAI Regional Office, Bengaluru",
    jurisdiction: "Bengaluru Urban (560xxx)",
  },
  {
    prefix: "400",
    name: "Mr. Rohan Desai",
    designation: "Food Safety Officer",
    contact: "+91-22-2765-4321",
    office: "FSSAI Regional Office, Mumbai",
    jurisdiction: "Greater Mumbai (400xxx)",
  },
  {
    prefix: "110",
    name: "Ms. Priya Sharma",
    designation: "Food Safety Officer",
    contact: "+91-11-2345-6789",
    office: "FSSAI Regional Office, New Delhi",
    jurisdiction: "New Delhi District (110xxx)",
  },
  {
    prefix: "600",
    name: "Mr. Karthik Iyer",
    designation: "Food Safety Officer",
    contact: "+91-44-2456-7890",
    office: "FSSAI Regional Office, Chennai",
    jurisdiction: "Chennai Metropolitan (600xxx)",
  },
  {
    prefix: "700",
    name: "Ms. Sanchita Roy",
    designation: "Food Safety Officer",
    contact: "+91-33-2456-3456",
    office: "FSSAI Regional Office, Kolkata",
    jurisdiction: "Kolkata (700xxx)",
  },
  {
    prefix: "500",
    name: "Mr. Arjun Reddy",
    designation: "Food Safety Officer",
    contact: "+91-40-2345-6712",
    office: "FSSAI Regional Office, Hyderabad",
    jurisdiction: "Hyderabad (500xxx)",
  },
];

function findOfficerByPin(pin) {
  const p = String(pin || "").trim();
  if (!/^\d{6}$/.test(p)) return null;
  return OFFICERS.find((o) => p.startsWith(o.prefix)) || OFFICERS[0];
}

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
  for (let i = 0; i < 5; i++) out += i < full ? "★" : "☆";
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
      if (box.value && idx < boxes.length - 1) boxes[idx + 1].focus();
    });
    box.addEventListener("keydown", (e) => {
      if (e.key === "Backspace" && !box.value && idx > 0) boxes[idx - 1].focus();
    });
  });
}

function getOtpValue(containerSelector) {
  return qsa(`${containerSelector} input`)
    .map((b) => b.value)
    .join("");
}

/* ---------- Navbar (shared across pages) ---------- */
function renderNavbar(active = "home") {
  const links = [
    { href: "/consumer/index.html", key: "home", label: "Home", icon: "home" },
    { href: "#officer", key: "officer", label: "Find an Officer", icon: "officer" },
    { href: "#rules", key: "rules", label: "Rules & Regulations", icon: "book" },
    { href: "https://www.fssai.gov.in", key: "fssai", label: "FSSAI", icon: "shield" },
  ];

  return `
    <header class="app-header">
      <a href="/consumer/index.html" class="brand">
        <span class="logo">CG</span>
        <div>
          <div>Consumer Grievance Portal</div>
          <small>Food Safety &amp; Standards</small>
        </div>
      </a>
      <nav>
        ${links
          .map((l) => {
            const target =
              l.key === "fssai"
                ? 'target="_blank" rel="noopener"'
                : "";
            return `<a href="${l.href}" ${target} class="${
              l.key === active ? "active" : ""
            }" data-navkey="${l.key}">${icon(l.icon, "sm")} ${l.label}</a>`;
          })
          .join("")}
      </nav>
      <div class="actions">
        <a href="/consumer/dashboard.html" class="btn ghost">
          ${icon("user", "sm")} Sign In
        </a>
      </div>
    </header>`;
}

/* ---------- Find-an-Officer modal (injected + wired once) ---------- */
function ensureOfficerModal() {
  if (qs("#officerModal")) return;
  const el = document.createElement("div");
  el.id = "officerModal";
  el.className = "modal hidden";
  el.innerHTML = `
    <div class="modal-backdrop" data-close></div>
    <div class="modal-card">
      <div class="modal-head">
        <h3>${icon("officer", "sm")} Find your Food Safety Officer</h3>
        <button class="icon-btn" data-close aria-label="Close">✕</button>
      </div>
      <p class="muted">Enter your 6-digit PIN code to see the assigned FSO for your jurisdiction.</p>
      <label class="label">${icon("pin_code", "sm")} PIN code</label>
      <div class="flex" style="gap: 8px">
        <input class="input" id="officerPin" type="text" inputmode="numeric"
               maxlength="6" placeholder="e.g. 560001" />
        <button class="btn" id="officerLookup">Find</button>
      </div>
      <div id="officerResult" style="margin-top: 14px"></div>
    </div>`;
  document.body.appendChild(el);

  qsa("[data-close]", el).forEach((b) =>
    b.addEventListener("click", () => el.classList.add("hidden"))
  );
  qs("#officerLookup", el).addEventListener("click", () => {
    const pin = qs("#officerPin", el).value.trim();
    const o = findOfficerByPin(pin);
    const result = qs("#officerResult", el);
    if (!o) {
      result.innerHTML =
        '<div class="notice">⚠ Please enter a valid 6-digit PIN code.</div>';
      return;
    }
    result.innerHTML = `
      <div class="card" style="margin-bottom: 0; background: var(--cream)">
        <div class="flex" style="gap: 10px; align-items: flex-start">
          <span class="icon-circle sage">${Icons.officer}</span>
          <div>
            <h4>${o.name}</h4>
            <div class="meta">${icon("badge", "sm")} ${o.designation}</div>
            <div class="meta" style="margin-top: 4px">${icon("phone", "sm")} ${o.contact}</div>
            <div class="meta" style="margin-top: 4px">${icon("building", "sm")} ${o.office}</div>
            <div class="meta" style="margin-top: 4px">${icon("pin", "sm")} ${o.jurisdiction}</div>
          </div>
        </div>
      </div>`;
  });
}

function openOfficerModal() {
  ensureOfficerModal();
  const m = qs("#officerModal");
  m.classList.remove("hidden");
  const inp = qs("#officerPin", m);
  if (inp) inp.focus();
}

/* Wire navbar-level triggers after it's injected */
function wireNavbarTriggers() {
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[data-navkey]");
    if (!a) return;
    if (a.dataset.navkey === "officer") {
      e.preventDefault();
      openOfficerModal();
    } else if (a.dataset.navkey === "rules") {
      e.preventDefault();
      alert(
        "Rules & Regulations — Food Safety and Standards Act, 2006 and allied regulations. (Link placeholder)"
      );
    }
  });
}
wireNavbarTriggers();
