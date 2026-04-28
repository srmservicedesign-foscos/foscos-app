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

/* ---------- Mock data (fallback when Firestore not configured) ----------
 * Each restaurant carries 5+ public comments with mixed status. Only
 * { status: "approved" } items are shown publicly on the consumer side
 * (the home detail view filters on this). Other statuses ("pending",
 * "under_review", "flagged") flow through the FBO + FSO dashboards. */
function _c(text, type, status) {
  return { text, type, status };
}

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
      _c("Cozy place, clean kitchen.", "good", "approved"),
      _c("Long wait on Sunday afternoons.", "bad", "approved"),
      _c("Loved the live music nights.", "good", "approved"),
      _c("Once found a hair in the salad — was addressed.", "bad", "approved"),
      _c("Friendly servers, gloves used.", "good", "approved"),
      _c("Bill seemed inflated, FSO investigating.", "bad", "under_review"),
      _c("Restroom needs attention.", "bad", "flagged"),
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
      _c("Authentic pork dishes.", "good", "approved"),
      _c("Service was slow.", "bad", "approved"),
      _c("Best dohjem in Shillong.", "good", "approved"),
      _c("Floor was a bit sticky.", "bad", "approved"),
      _c("Reasonably priced.", "good", "approved"),
      _c("Found pet hair on chair, escalated.", "bad", "flagged"),
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
      _c("Loved the ambience.", "good", "approved"),
      _c("Great pancakes and coffee.", "good", "approved"),
      _c("Tribute to Bob Dylan vibe.", "good", "approved"),
      _c("Bill miscalculated once — quickly corrected.", "bad", "approved"),
      _c("Vegan options are a plus.", "good", "approved"),
      _c("Music too loud during dinner.", "bad", "under_review"),
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
      _c("Good coffee and sandwiches.", "good", "approved"),
      _c("Pet-friendly which is rare here.", "good", "approved"),
      _c("Wi-Fi works perfectly.", "good", "approved"),
      _c("Slow on Sundays.", "bad", "approved"),
      _c("Tables wobble.", "bad", "approved"),
      _c("Stale bread once, FBO acknowledged.", "bad", "under_review"),
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
      _c("Staff weren't wearing gloves.", "bad", "approved"),
      _c("Food tastes good.", "good", "approved"),
      _c("Late-night option — appreciated.", "good", "approved"),
      _c("Counter was greasy.", "bad", "flagged"),
      _c("Generous portions.", "good", "approved"),
      _c("Spoiled chicken claim — FSO inspecting.", "bad", "under_review"),
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
      _c("Traditional taste, small place.", "good", "approved"),
      _c("Authentic jadoh and dohneiiong.", "good", "approved"),
      _c("Hygiene could improve.", "bad", "approved"),
      _c("Best value-for-money in Mawlai.", "good", "approved"),
      _c("Plates not always rinsed properly.", "bad", "flagged"),
      _c("Owner friendly and humble.", "good", "approved"),
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
      _c("View is worth it.", "good", "approved"),
      _c("Sunset hours are magical.", "good", "approved"),
      _c("Pricey but clean.", "good", "approved"),
      _c("Drink was watered down once.", "bad", "approved"),
      _c("Server was patient with kids.", "good", "approved"),
      _c("Bill not itemised — followed up.", "bad", "under_review"),
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
      _c("Fresh salads, clean place.", "good", "approved"),
      _c("Lovely view of the lake.", "good", "approved"),
      _c("Slow service when crowded.", "bad", "approved"),
      _c("Children's portions available.", "good", "approved"),
      _c("Tap water was cloudy.", "bad", "flagged"),
      _c("Rice came lukewarm.", "bad", "under_review"),
    ],
  },
  {
    id: "R009",
    name: "Highland Cafe",
    location: "Upper Shillong",
    area: "Upper Shillong",
    license: "10112345601910",
    rating: 4.0,
    cuisine: "Cafe · Bakery",
    comments: [
      _c("Pastries are fresh daily.", "good", "approved"),
      _c("Cheerful staff.", "good", "approved"),
      _c("Pricing slightly high.", "bad", "approved"),
      _c("Clean restrooms.", "good", "approved"),
      _c("Cake had foreign object — being investigated.", "bad", "flagged"),
    ],
  },
  {
    id: "R010",
    name: "Cantonment Mess",
    location: "Shillong Cantonment",
    area: "Shillong Cantonment",
    license: "10112345602011",
    rating: 3.9,
    cuisine: "Indian · Mess",
    comments: [
      _c("Hearty meals at fair prices.", "good", "approved"),
      _c("Tables wiped between guests.", "good", "approved"),
      _c("Curry was reheated.", "bad", "approved"),
      _c("Plates have stains sometimes.", "bad", "flagged"),
      _c("Reliable for groups.", "good", "approved"),
    ],
  },
  {
    id: "R011",
    name: "Nong Bah Snacks",
    location: "Nongthymmai, Shillong",
    area: "Nongthymmai",
    license: "10112345602212",
    rating: 3.7,
    cuisine: "Street food",
    comments: [
      _c("Tasty puri-sabji.", "good", "approved"),
      _c("Hand wash facility provided.", "good", "approved"),
      _c("Oil reused — concern raised.", "bad", "flagged"),
      _c("Quick service.", "good", "approved"),
      _c("Plates not always covered.", "bad", "under_review"),
    ],
  },
  {
    id: "R012",
    name: "Heritage Diner",
    location: "Police Bazar, Shillong",
    area: "Police Bazar",
    license: "10112345602413",
    rating: 4.2,
    cuisine: "Continental · Bakery",
    comments: [
      _c("Polite hosts and freshly baked bread.", "good", "approved"),
      _c("Heritage decor adds charm.", "good", "approved"),
      _c("AC not strong on hot days.", "bad", "approved"),
      _c("Allergens clearly labelled.", "good", "approved"),
      _c("Soup was lukewarm — corrected.", "bad", "approved"),
    ],
  },
];

/* ---------- Demo complaint seeder (non-destructive) ----------
 * Pre-populates session storage with a varied set of complaints across
 * the mock restaurants — used only when Firestore returns empty so the
 * jury demo always has data to look at on FBO + FSO + consumer sides. */
function seedMockComplaints() {
  const KEY = "cgpComplaints";
  const SEEDED = "cgpComplaintsSeeded";
  if (sessionStorage.getItem(SEEDED)) return;
  const existing = JSON.parse(sessionStorage.getItem(KEY) || "[]");
  if (existing.length >= 12) {
    sessionStorage.setItem(SEEDED, "1");
    return;
  }

  const PHONES = ["+919876500001", "+919876500002", "+919876500003", "+919876500004"];
  const NAMES = ["Lapyngshai N.", "Damanbha S.", "Iaihun K.", "Riti B.", "Kyrshan M."];
  const STATUSES = ["Submitted", "Under Review", "Action Taken", "Submitted"];
  const SAMPLES_BAD = [
    "Stale vegetables in the salad.",
    "Floor near kitchen was dirty.",
    "Staff didn't wear gloves while serving.",
    "Found a strand of hair in the dish.",
    "Bill not itemised, suspect overcharge.",
    "Cockroach near the wash area.",
    "Soup tasted off — possibly spoilt.",
    "Storage room visible — unclean.",
  ];
  const SAMPLES_GOOD = [
    "Hygiene was excellent today, kudos.",
    "Polite staff and clean restrooms.",
    "Loved the freshly prepared meal.",
    "Best service I've had in weeks.",
    "Allergens noted on the menu.",
  ];

  const seeded = [];
  let counter = 1001;
  function makeComplaintId() {
    counter += 1;
    return `GRV-2026-${String(counter).padStart(5, "0")}`;
  }
  function daysAgoIso(d) {
    const t = new Date();
    t.setDate(t.getDate() - d);
    return t.toISOString();
  }

  MOCK_RESTAURANTS.forEach((r, idx) => {
    const count = 11 + (idx % 3); // 11–13 per restaurant
    for (let i = 0; i < count; i++) {
      const isPositive = Math.random() < 0.45;
      const baseRating = isPositive
        ? 4 + Math.random()
        : 1 + Math.random() * 2.4;
      const overall = Math.round(baseRating * 10) / 10;
      const ratings = isPositive
        ? [
            4 + Math.floor(Math.random() * 2),
            4 + Math.floor(Math.random() * 2),
            4 + Math.floor(Math.random() * 2),
          ]
        : [
            1 + Math.floor(Math.random() * 3),
            1 + Math.floor(Math.random() * 3),
            1 + Math.floor(Math.random() * 3),
          ];
      // Spread dates so the date filters (today / 2d / 7d / 30d) all show data
      const offset = i === 0 ? 0 : i === 1 ? 1 : Math.floor(Math.random() * 35);
      const status = STATUSES[i % STATUSES.length];
      const flagged = !isPositive && Math.random() < 0.18;
      const c = {
        complaintId: makeComplaintId(),
        restaurantId: r.id,
        restaurantName: r.name,
        restaurantLicense: r.license,
        restaurantLocation: r.location,
        rating_cleanliness: ratings[0],
        rating_food_freshness: ratings[1],
        rating_staff_hygiene: ratings[2],
        overallRating: overall,
        comment: isPositive
          ? SAMPLES_GOOD[Math.floor(Math.random() * SAMPLES_GOOD.length)]
          : SAMPLES_BAD[Math.floor(Math.random() * SAMPLES_BAD.length)],
        evidencePhoto: "",
        billPhoto: "",
        consumerName: NAMES[(idx + i) % NAMES.length],
        consumerPhone: PHONES[(idx + i) % PHONES.length],
        status: isPositive ? "Action Taken" : status,
        createdAt: daysAgoIso(offset),
        assignedFSO: "Mr. Banshan Lyngdoh",
        flaggedByFBO: flagged,
        improvementUpdate:
          status === "Under Review"
            ? "FBO acknowledged and is acting on the issue."
            : "",
        FSOAction:
          status === "Action Taken"
            ? "Resolved"
            : flagged
            ? "Inspection Assigned"
            : "",
      };
      seeded.push(c);
    }
  });

  // Newest first
  seeded.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1));
  sessionStorage.setItem(KEY, JSON.stringify([...existing, ...seeded]));
  sessionStorage.setItem(SEEDED, "1");
}
// auto-seed for demo
try { seedMockComplaints(); } catch (_) {}

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
    {
      href:
        "https://www.indiacode.nic.in/bitstream/123456789/7800/1/200634_food_safety_and_standards_act%2C_2006.pdf",
      key: "rules",
      label: "Rules & Regulations",
      icon: "book",
      external: true,
    },
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
            const isExternal = l.key === "fssai" || l.external;
            const target = isExternal
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

/* Wire navbar-level triggers after it's injected.
 * The "Rules & Regulations" link is now a real anchor pointing at the
 * official FSSAI Act 2006 PDF and opens in a new tab — no JS hijack. */
function wireNavbarTriggers() {
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[data-navkey]");
    if (!a) return;
    if (a.dataset.navkey === "officer") {
      e.preventDefault();
      openOfficerModal();
    }
  });
}
wireNavbarTriggers();
