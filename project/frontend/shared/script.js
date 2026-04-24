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

/* ---------- Shillong areas (used by the area filter) ---------- */
const SHILLONG_AREAS = [
  "Police Bazar",
  "Laitumkhrah",
  "Shillong Cantonment",
  "Shillong Peak",
  "Ward's Lake",
  "Golf Links",
  "Mawlai",
  "Nongthymmai",
  "Upper Shillong",
  "Bara Bazar",
];

/* ---------- Mock data (fallback when Firestore not configured) ---------- */
const MOCK_RESTAURANTS = [
  {
    id: "R001",
    name: "Cafe Shillong",
    location: "Laitumkhrah, Shillong",
    area: "Laitumkhrah",
    license: "10112345600123",
    rating: 4.4,
    cuisine: "Continental · Khasi",
    comments: [
      { text: "Cozy place, clean kitchen.", type: "good", status: "approved" },
      { text: "Long wait on Sunday afternoons.", type: "bad", status: "approved" },
    ],
  },
  {
    id: "R002",
    name: "Trattoria",
    location: "Police Bazar, Shillong",
    area: "Police Bazar",
    license: "10112345600456",
    rating: 4.1,
    cuisine: "Khasi · Indian",
    comments: [
      { text: "Authentic pork dishes.", type: "good", status: "approved" },
      { text: "Service was slow.", type: "bad", status: "approved" },
    ],
  },
  {
    id: "R003",
    name: "Dylan's Cafe",
    location: "Laitumkhrah, Shillong",
    area: "Laitumkhrah",
    license: "10112345600789",
    rating: 4.5,
    cuisine: "Cafe · Continental",
    comments: [
      { text: "Loved the ambience.", type: "good", status: "approved" },
    ],
  },
  {
    id: "R004",
    name: "ML05 Cafe",
    location: "Golf Links, Shillong",
    area: "Golf Links",
    license: "10112345600991",
    rating: 4.2,
    cuisine: "Fusion",
    comments: [
      { text: "Good coffee and sandwiches.", type: "good", status: "approved" },
    ],
  },
  {
    id: "R005",
    name: "City Hut Dhaba",
    location: "Bara Bazar, Shillong",
    area: "Bara Bazar",
    license: "10112345601122",
    rating: 3.4,
    cuisine: "North Indian · Dhaba",
    comments: [
      { text: "Staff weren't wearing gloves.", type: "bad", status: "approved" },
      { text: "Food tastes good.", type: "good", status: "approved" },
    ],
  },
  {
    id: "R006",
    name: "Jadoh Stall",
    location: "Mawlai, Shillong",
    area: "Mawlai",
    license: "10112345601345",
    rating: 4.0,
    cuisine: "Khasi",
    comments: [
      { text: "Traditional taste, small place.", type: "good", status: "approved" },
    ],
  },
  {
    id: "R007",
    name: "Cloud 9 Rooftop",
    location: "Shillong Peak, Shillong",
    area: "Shillong Peak",
    license: "10112345601678",
    rating: 4.3,
    cuisine: "Continental",
    comments: [
      { text: "View is worth it.", type: "good", status: "approved" },
    ],
  },
  {
    id: "R008",
    name: "Lakeside Kitchen",
    location: "Ward's Lake, Shillong",
    area: "Ward's Lake",
    license: "10112345601809",
    rating: 4.1,
    cuisine: "Multi-cuisine",
    comments: [
      { text: "Fresh salads, clean place.", type: "good", status: "approved" },
    ],
  },
];

const MOCK_COMPLAINTS = [
  {
    id: "GRV-2026-10001",
    restaurant: "Cafe Shillong",
    rating: 2.0,
    status: "Under Review",
    date: "2026-04-10",
    comment: "Stale vegetables in salad.",
  },
  {
    id: "GRV-2026-10002",
    restaurant: "Trattoria",
    rating: 4.3,
    status: "Action Taken",
    date: "2026-03-28",
    comment: "Great hygiene, small billing issue.",
  },
  {
    id: "GRV-2026-10003",
    restaurant: "City Hut Dhaba",
    rating: 1.6,
    status: "Submitted",
    date: "2026-04-18",
    comment: "Dirty kitchen visible from window.",
  },
];

const RATING_LABELS = ["Very Poor", "Poor", "Okay", "Good", "Excellent"];

/* ---------- Find-an-Officer mock data (Shillong, Meghalaya) ---------- */
const OFFICERS = [
  {
    prefix: "793001",
    name: "Mr. Banshan Lyngdoh",
    designation: "Food Safety Officer",
    contact: "+91-364-222-1111",
    office: "FSSAI Regional Office, Police Bazar, Shillong",
    jurisdiction: "Shillong — Police Bazar & Central Zone (793001)",
  },
  {
    prefix: "793003",
    name: "Ms. Ibahunlang Kharbani",
    designation: "Food Safety Officer",
    contact: "+91-364-222-2222",
    office: "FSSAI Regional Office, Laitumkhrah, Shillong",
    jurisdiction: "Shillong — Laitumkhrah & Golf Links (793003)",
  },
  {
    prefix: "793004",
    name: "Mr. Iaienbor Marwein",
    designation: "Food Safety Officer",
    contact: "+91-364-222-3333",
    office: "FSSAI Regional Office, Nongthymmai, Shillong",
    jurisdiction: "Shillong — Nongthymmai & Upper Shillong (793004)",
  },
  {
    prefix: "793006",
    name: "Ms. Wanphai Syiem",
    designation: "Food Safety Officer",
    contact: "+91-364-222-4444",
    office: "FSSAI Regional Office, Mawlai, Shillong",
    jurisdiction: "Shillong — Mawlai & Cantonment (793006)",
  },
  {
    prefix: "793",
    name: "Mr. Kyrsoibor Pyrtuh",
    designation: "Food Safety Officer",
    contact: "+91-364-222-5555",
    office: "FSSAI State Office, Shillong, Meghalaya",
    jurisdiction: "East Khasi Hills District (793xxx)",
  },
];

const DEFAULT_OFFICER = OFFICERS[OFFICERS.length - 1];

function findOfficerByPin(pin) {
  const p = String(pin || "").trim();
  if (!/^\d{6}$/.test(p)) return null;
  const exact = OFFICERS.find((o) => p === o.prefix);
  if (exact) return exact;
  const byPrefix = OFFICERS.find(
    (o) => o.prefix.length >= 3 && p.startsWith(o.prefix)
  );
  return byPrefix || DEFAULT_OFFICER;
}

function findOfficerByArea(area) {
  const a = String(area || "").toLowerCase();
  if (!a) return DEFAULT_OFFICER;
  if (a.includes("laitumkhrah") || a.includes("golf")) return OFFICERS[1];
  if (a.includes("nongthymmai") || a.includes("upper shillong")) return OFFICERS[2];
  if (a.includes("mawlai") || a.includes("cantonment")) return OFFICERS[3];
  if (a.includes("police bazar") || a.includes("bara bazar") || a.includes("ward")) return OFFICERS[0];
  return DEFAULT_OFFICER;
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
    Submitted: "chip pending",
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
