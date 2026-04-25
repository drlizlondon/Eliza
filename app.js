const SPECIALTIES = [
  "Acute Medicine",
  "Orthopaedics",
  "General Surgery",
  "ENT",
  "Cardiology",
  "Respiratory",
  "Neurology",
  "Rheumatology",
  "Paediatrics",
  "Gynaecology",
];

const statusClassMap = {
  "Awaiting Review": "status-awaiting-review",
  "Accepted for Admission": "status-accepted-for-admission",
  "Awaiting GP Update": "status-awaiting-gp-update",
  Redirected: "status-redirected",
  "Scheduled Review": "status-scheduled-review",
  "Advice Given": "status-advice-given",
};

const demoReferrals = [
  {
    id: "ref-1",
    patientName: "Sarah Ahmed",
    nhsNumber: "9438821101",
    age: 53,
    referralType: "Community",
    currentSpecialty: "Orthopaedics",
    initialSpecialty: "Orthopaedics",
    reason:
      "Acute swollen knee, unable to weight bear, febrile overnight with rapidly worsening pain despite analgesia.",
    status: "Awaiting Review",
    createdAt: "2026-04-25T13:02:00",
    firstResponseAt: null,
    finalOutcomeAt: null,
    routeHistory: ["Orthopaedics"],
    timeline: [
      {
        id: "ev-1",
        time: "2026-04-25T13:02:00",
        actor: "GP",
        event: "Referral submitted to Orthopaedics",
        kind: "submitted",
      },
    ],
  },
  {
    id: "ref-2",
    patientName: "Daniel Morris",
    nhsNumber: "7812209912",
    age: 37,
    referralType: "Community",
    currentSpecialty: "Acute Medicine",
    initialSpecialty: "Acute Medicine",
    reason: "Chest pain with raised troponin and ECG changes, ongoing central discomfort and diaphoresis.",
    status: "Accepted for Admission",
    createdAt: "2026-04-25T13:08:00",
    firstResponseAt: "2026-04-25T13:12:00",
    finalOutcomeAt: "2026-04-25T13:16:00",
    routeHistory: ["Acute Medicine"],
    timeline: [
      {
        id: "ev-2",
        time: "2026-04-25T13:08:00",
        actor: "GP",
        event: "Referral submitted to Acute Medicine",
        kind: "submitted",
      },
      {
        id: "ev-3",
        time: "2026-04-25T13:12:00",
        actor: "Acute Medicine",
        event: "Acute Medicine opened referral",
        kind: "opened",
      },
      {
        id: "ev-4",
        time: "2026-04-25T13:16:00",
        actor: "Acute Medicine",
        event: "Accepted for admission. Instruction: Send patient to SAU now.",
        kind: "accepted",
      },
    ],
  },
  {
    id: "ref-3",
    patientName: "Priya Shah",
    nhsNumber: "5567723011",
    age: 31,
    referralType: "Community",
    currentSpecialty: "Rheumatology",
    initialSpecialty: "Orthopaedics",
    reason:
      "Polyarthralgia with raised inflammatory markers, hot wrists and ankles, struggling to mobilise and now systemically unwell.",
    status: "Awaiting Review",
    createdAt: "2026-04-25T13:02:00",
    firstResponseAt: "2026-04-25T13:18:00",
    finalOutcomeAt: null,
    routeHistory: ["Orthopaedics", "Rheumatology"],
    timeline: [
      {
        id: "ev-5",
        time: "2026-04-25T13:02:00",
        actor: "GP",
        event: "Referral submitted to Orthopaedics",
        kind: "submitted",
      },
      {
        id: "ev-6",
        time: "2026-04-25T13:18:00",
        actor: "Orthopaedics",
        event: "Orthopaedics opened referral",
        kind: "opened",
      },
      {
        id: "ev-7",
        time: "2026-04-25T13:24:00",
        actor: "Orthopaedics",
        event: "Orthopaedics redirected to Rheumatology. Reason: Inflammatory picture more in keeping with rheumatology than septic joint.",
        kind: "redirected",
      },
      {
        id: "ev-8",
        time: "2026-04-25T13:31:00",
        actor: "Rheumatology",
        event: "Rheumatology requested more information: Please add CRP, temperature trend and joint aspiration status if available.",
        kind: "requested-info",
      },
      {
        id: "ev-9",
        time: "2026-04-25T13:42:00",
        actor: "GP",
        event: 'GP added update: "CRP 212. Patient now tachycardic."',
        kind: "gp-update",
      },
    ],
  },
  {
    id: "ref-4",
    patientName: "Hannah Lewis",
    nhsNumber: "4472289003",
    age: 24,
    referralType: "Community",
    currentSpecialty: "ENT",
    initialSpecialty: "ENT",
    reason:
      "Peritonsillar swelling, worsening pain and reduced oral intake despite oral antibiotics, muffled voice developing.",
    status: "Awaiting GP Update",
    createdAt: "2026-04-25T12:57:00",
    firstResponseAt: "2026-04-25T13:15:00",
    finalOutcomeAt: null,
    routeHistory: ["ENT"],
    timeline: [
      {
        id: "ev-10",
        time: "2026-04-25T12:57:00",
        actor: "GP",
        event: "Referral submitted to ENT",
        kind: "submitted",
      },
      {
        id: "ev-11",
        time: "2026-04-25T13:08:00",
        actor: "ENT",
        event: "ENT opened referral",
        kind: "opened",
      },
      {
        id: "ev-12",
        time: "2026-04-25T13:15:00",
        actor: "ENT",
        event: "ENT requested more information: Please confirm observations, trismus severity and whether IV access is in place.",
        kind: "requested-info",
      },
    ],
  },
  {
    id: "ref-5",
    patientName: "Michael Turner",
    nhsNumber: "1028834471",
    age: 76,
    referralType: "Inpatient",
    currentSpecialty: "Cardiology",
    initialSpecialty: "Cardiology",
    reason: "Collapse with melaena and hypotension followed by syncope with abnormal ECG and ongoing monitoring concerns.",
    status: "Advice Given",
    createdAt: "2026-04-25T13:22:00",
    firstResponseAt: "2026-04-25T13:24:00",
    finalOutcomeAt: "2026-04-25T13:29:00",
    routeHistory: ["Cardiology"],
    timeline: [
      {
        id: "ev-13",
        time: "2026-04-25T13:22:00",
        actor: "Ward Team",
        event: "Referral submitted to Cardiology",
        kind: "submitted",
      },
      {
        id: "ev-14",
        time: "2026-04-25T13:24:00",
        actor: "Cardiology",
        event: "Cardiology opened referral",
        kind: "opened",
      },
      {
        id: "ev-15",
        time: "2026-04-25T13:29:00",
        actor: "Cardiology",
        event: "Advice given: Monitor on telemetry, correct electrolytes and repeat ECG after haemodynamic stabilisation.",
        kind: "advice",
      },
    ],
  },
  {
    id: "ref-6",
    patientName: "Leila Foster",
    nhsNumber: "6637001182",
    age: 46,
    referralType: "Community",
    currentSpecialty: "Acute Medicine",
    initialSpecialty: "Acute Medicine",
    reason: "Breathlessness with fever and oxygen saturation 90% on air, concern for sepsis and community-acquired pneumonia.",
    status: "Scheduled Review",
    createdAt: "2026-04-25T12:48:00",
    firstResponseAt: "2026-04-25T12:58:00",
    finalOutcomeAt: "2026-04-25T13:05:00",
    routeHistory: ["Acute Medicine"],
    timeline: [
      {
        id: "ev-16",
        time: "2026-04-25T12:48:00",
        actor: "GP",
        event: "Referral submitted to Acute Medicine",
        kind: "submitted",
      },
      {
        id: "ev-17",
        time: "2026-04-25T12:58:00",
        actor: "Acute Medicine",
        event: "Acute Medicine opened referral",
        kind: "opened",
      },
      {
        id: "ev-18",
        time: "2026-04-25T13:05:00",
        actor: "Acute Medicine",
        event: "Scheduled review: SDEC review tomorrow at 09:00.",
        kind: "scheduled",
      },
    ],
  },
];

const state = {
  referrals: loadState(),
  selectedSpecialty: "Acute Medicine",
  modal: null,
};

function loadState() {
  const raw = safeStorageGet("eliza-referrals");
  if (!raw) {
    safeStorageSet("eliza-referrals", JSON.stringify(demoReferrals));
    return structuredClone(demoReferrals);
  }
  try {
    return JSON.parse(raw);
  } catch {
    safeStorageSet("eliza-referrals", JSON.stringify(demoReferrals));
    return structuredClone(demoReferrals);
  }
}

function saveState() {
  safeStorageSet("eliza-referrals", JSON.stringify(state.referrals));
}

function safeStorageGet(key) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return window.__elizaFallbackStore?.[key] || null;
  }
}

function safeStorageSet(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    window.__elizaFallbackStore = window.__elizaFallbackStore || {};
    window.__elizaFallbackStore[key] = value;
  }
}

function formatDateTime(value) {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "short",
  }).format(new Date(value));
}

function timeOnly(value) {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function pluralize(count, noun) {
  return `${count} ${noun}${count === 1 ? "" : "s"}`;
}

function minutesBetween(start, end) {
  return Math.max(0, Math.round((new Date(end) - new Date(start)) / 60000));
}

function nowIso() {
  return new Date().toISOString();
}

function textPreview(text, limit = 62) {
  return text.length > limit ? `${text.slice(0, limit).trim()}...` : text;
}

function statusBadge(status) {
  return `<span class="status-badge ${statusClassMap[status] || "status-awaiting-review"}">${status}</span>`;
}

function waitingText(referral) {
  const lastEvent = referral.timeline[referral.timeline.length - 1];
  const minutes = minutesBetween(lastEvent.time, nowIso());
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  return remainder ? `${hours}h ${remainder}m` : `${hours}h`;
}

function currentPath() {
  return window.location.hash.replace(/^#/, "") || "/";
}

function navigate(path) {
  window.location.hash = path;
}

function findReferral(id) {
  return state.referrals.find((item) => item.id === id);
}

function addTimelineEvent(referral, actor, event, kind) {
  referral.timeline.push({
    id: `ev-${crypto.randomUUID()}`,
    time: nowIso(),
    actor,
    event,
    kind,
  });
}

function ensureFirstResponse(referral) {
  if (!referral.firstResponseAt) {
    referral.firstResponseAt = nowIso();
  }
}

function markFinalOutcome(referral) {
  referral.finalOutcomeAt = nowIso();
}

function computeGpMetrics(referrals) {
  const firstResponses = referrals.filter((item) => item.firstResponseAt);
  const accepted = referrals.filter((item) => item.status === "Accepted for Admission" && item.finalOutcomeAt);
  const avgFirstResponse = firstResponses.length
    ? `${Math.round(firstResponses.reduce((sum, item) => sum + minutesBetween(item.createdAt, item.firstResponseAt), 0) / firstResponses.length)} min`
    : "N/A";
  const avgAcceptance = accepted.length
    ? `${Math.round(accepted.reduce((sum, item) => sum + minutesBetween(item.createdAt, item.finalOutcomeAt), 0) / accepted.length)} min`
    : "N/A";

  return [
    ["Referrals made", referrals.length],
    ["Accepted for admission", referrals.filter((item) => item.status === "Accepted for Admission").length],
    ["Scheduled review", referrals.filter((item) => item.status === "Scheduled Review").length],
    ["Advice given", referrals.filter((item) => item.status === "Advice Given").length],
    ["Redirected", referrals.filter((item) => item.routeHistory.length > 1).length],
    ["Average time to first response", avgFirstResponse],
    ["Average time to acceptance", avgAcceptance],
  ];
}

function computeGpInsights(referrals) {
  const redirected = referrals.filter((item) => item.routeHistory.length > 1);
  const redirectedFrom = countBy(redirected.map((item) => item.initialSpecialty));
  const redirectTo = countBy(redirected.map((item) => item.currentSpecialty));
  const bySpecialtyResponse = {};
  referrals.forEach((item) => {
    if (!item.firstResponseAt) return;
    const specialty = item.currentSpecialty;
    bySpecialtyResponse[specialty] ??= [];
    bySpecialtyResponse[specialty].push(minutesBetween(item.createdAt, item.firstResponseAt));
  });
  const responseAverages = Object.entries(bySpecialtyResponse).map(([specialty, values]) => [
    specialty,
    Math.round(values.reduce((sum, value) => sum + value, 0) / values.length),
  ]);
  const fastest = responseAverages.sort((a, b) => a[1] - b[1])[0];
  const slowest = responseAverages.sort((a, b) => b[1] - a[1])[0];
  const redirectReasons = redirected
    .flatMap((item) => item.timeline.filter((entry) => entry.kind === "redirected").map((entry) => entry.event));
  const commonRedirectReason = mostCommonPhrase(redirectReasons);
  const waitingLong = referrals.filter((item) => minutesBetween(item.createdAt, nowIso()) > 30).length;

  return [
    ["Most redirected specialty", topLabel(redirectedFrom)],
    ["Common redirect destination", topLabel(redirectTo)],
    ["Fastest responding specialty", fastest ? `${fastest[0]} (${fastest[1]} min)` : "N/A"],
    ["Longest waiting specialty", slowest ? `${slowest[0]} (${slowest[1]} min)` : "N/A"],
    ["Common reason for redirect", commonRedirectReason],
    ["Referrals waiting over 30 minutes", pluralize(waitingLong, "referral")],
  ];
}

function computeSpecialtyMetrics(referrals) {
  const firstResponses = referrals.filter((item) => item.firstResponseAt);
  const finalOutcomes = referrals.filter((item) => item.finalOutcomeAt);
  const avgReview = firstResponses.length
    ? `${Math.round(firstResponses.reduce((sum, item) => sum + minutesBetween(item.createdAt, item.firstResponseAt), 0) / firstResponses.length)} min`
    : "N/A";
  const avgOutcome = finalOutcomes.length
    ? `${Math.round(finalOutcomes.reduce((sum, item) => sum + minutesBetween(item.createdAt, item.finalOutcomeAt), 0) / finalOutcomes.length)} min`
    : "N/A";

  return [
    ["Referrals received", referrals.length],
    ["Accepted for admission", referrals.filter((item) => item.status === "Accepted for Admission").length],
    ["Scheduled review", referrals.filter((item) => item.status === "Scheduled Review").length],
    ["Advice given", referrals.filter((item) => item.status === "Advice Given").length],
    ["Redirected onwards", referrals.filter((item) => item.timeline.some((entry) => entry.kind === "redirected")).length],
    ["More information requested", referrals.filter((item) => item.status === "Awaiting GP Update").length],
    ["Average time to review", avgReview],
    ["Average time to final outcome", avgOutcome],
  ];
}

function computeSpecialtyInsights(referrals) {
  const reasons = countBy(referrals.map((item) => firstWords(item.reason, 3)));
  const redirections = countBy(
    referrals
      .flatMap((item) => item.timeline.filter((entry) => entry.kind === "redirected"))
      .map((entry) => entry.event.split("redirected to ")[1]?.split(".")[0] || "None"),
  );
  const missingInfo = countBy(
    referrals
      .flatMap((item) => item.timeline.filter((entry) => entry.kind === "requested-info"))
      .map((entry) => summarizeInfoRequest(entry.event)),
  );
  const waitingLong = referrals.filter((item) => minutesBetween(item.createdAt, nowIso()) > 30).length;
  const hours = countBy(referrals.map((item) => new Date(item.createdAt).getHours()));
  const peak = Object.entries(hours).sort((a, b) => b[1] - a[1])[0];

  return [
    ["Most common referral reason", topLabel(reasons)],
    ["Most common redirection", topLabel(redirections)],
    ["Most common missing information", topLabel(missingInfo)],
    ["Referrals waiting over 30 minutes", pluralize(waitingLong, "referral")],
    ["Peak referral time", peak ? `${String(peak[0]).padStart(2, "0")}:00` : "N/A"],
  ];
}

function countBy(items) {
  return items.reduce((acc, item) => {
    const key = item || "None";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
}

function topLabel(counts) {
  const winner = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
  return winner ? `${winner[0]} (${winner[1]})` : "N/A";
}

function firstWords(text, count) {
  return text.split(" ").slice(0, count).join(" ");
}

function summarizeInfoRequest(text) {
  const lower = text.toLowerCase();
  if (lower.includes("crp")) return "Inflammatory markers";
  if (lower.includes("observations")) return "Observations";
  if (lower.includes("ecg")) return "ECG details";
  return "Additional clinical detail";
}

function mostCommonPhrase(events) {
  if (!events.length) return "N/A";
  const buckets = {
    "Incorrect specialty": 0,
    "Need inflammatory work-up": 0,
    "Need surgical review": 0,
  };
  events.forEach((event) => {
    const lower = event.toLowerCase();
    if (lower.includes("inflammatory")) buckets["Need inflammatory work-up"] += 1;
    else if (lower.includes("surgical")) buckets["Need surgical review"] += 1;
    else buckets["Incorrect specialty"] += 1;
  });
  return topLabel(buckets);
}

function dashboardSummary(referrals, mode) {
  if (mode === "gp") {
    const open = referrals.filter((item) => ["Awaiting Review", "Awaiting GP Update"].includes(item.status)).length;
    const redirected = referrals.filter((item) => item.routeHistory.length > 1).length;
    const advice = referrals.filter((item) => item.status === "Advice Given").length;
    return [
      ["Live referrals", open],
      ["Redirects logged", redirected],
      ["Advice outcomes", advice],
      ["Audit trail coverage", "100%"],
    ];
  }
  const awaiting = referrals.filter((item) => item.status === "Awaiting Review").length;
  const updates = referrals.filter((item) => item.status === "Awaiting GP Update").length;
  const outcomes = referrals.filter((item) => ["Accepted for Admission", "Scheduled Review", "Advice Given"].includes(item.status)).length;
  const over30 = referrals.filter((item) => minutesBetween(item.createdAt, nowIso()) > 30).length;
  return [
    ["Awaiting review", awaiting],
    ["Awaiting GP update", updates],
    ["Closed with action", outcomes],
    ["Over 30 mins", over30],
  ];
}

function getSpecialtyReferrals() {
  return state.referrals.filter((item) => item.currentSpecialty === state.selectedSpecialty);
}

function getSpecialtyAuditReferrals() {
  return state.referrals.filter(
    (item) =>
      item.routeHistory.includes(state.selectedSpecialty) ||
      item.timeline.some((entry) => entry.actor === state.selectedSpecialty),
  );
}

function openModal(config) {
  state.modal = config;
  render();
}

function closeModal() {
  state.modal = null;
  render();
}

function handleAddReferral(formData) {
  const specialty = formData.get("specialty");
  const reason = formData.get("reason").trim();
  if (!reason) {
    alert("Reason for referral is mandatory.");
    return;
  }

  const referral = {
    id: `ref-${crypto.randomUUID()}`,
    patientName: formData.get("patientName").trim(),
    nhsNumber: formData.get("nhsNumber").trim(),
    age: Number(formData.get("age")),
    referralType: formData.get("referralType"),
    currentSpecialty: specialty,
    initialSpecialty: specialty,
    reason,
    status: "Awaiting Review",
    createdAt: nowIso(),
    firstResponseAt: null,
    finalOutcomeAt: null,
    routeHistory: [specialty],
    timeline: [
      {
        id: `ev-${crypto.randomUUID()}`,
        time: nowIso(),
        actor: "GP",
        event: `Referral submitted to ${specialty}`,
        kind: "submitted",
      },
    ],
  };

  state.referrals = [referral, ...state.referrals];
  saveState();
  navigate("/gp");
}

function handleGpUpdate(referralId, text) {
  const referral = findReferral(referralId);
  if (!referral || !text.trim()) return;
  addTimelineEvent(referral, "GP", `GP added update: "${text.trim()}"`, "gp-update");
  if (referral.status === "Awaiting GP Update") {
    referral.status = "Awaiting Review";
  }
  saveState();
  closeModal();
  navigate(`/gp/referral/${referralId}`);
}

function handleSpecialtyAction(referralId, action, payload = {}) {
  const referral = findReferral(referralId);
  if (!referral) return;

  ensureFirstResponse(referral);

  if (action === "accepted") {
    referral.status = "Accepted for Admission";
    addTimelineEvent(
      referral,
      referral.currentSpecialty,
      `Accepted for admission.${payload.note ? ` Instruction: ${payload.note}` : ""}`,
      "accepted",
    );
    markFinalOutcome(referral);
  }

  if (action === "request-info") {
    referral.status = "Awaiting GP Update";
    addTimelineEvent(
      referral,
      referral.currentSpecialty,
      `${referral.currentSpecialty} requested more information: ${payload.note}`,
      "requested-info",
    );
  }

  if (action === "redirect") {
    const previousSpecialty = referral.currentSpecialty;
    referral.currentSpecialty = payload.specialty;
    referral.status = "Awaiting Review";
    referral.routeHistory.push(payload.specialty);
    addTimelineEvent(
      referral,
      previousSpecialty,
      `${previousSpecialty} redirected to ${payload.specialty}.${payload.note ? ` Reason: ${payload.note}` : ""}`,
      "redirected",
    );
  }

  if (action === "scheduled") {
    referral.status = "Scheduled Review";
    addTimelineEvent(referral, referral.currentSpecialty, `Scheduled review: ${payload.note}`, "scheduled");
    markFinalOutcome(referral);
  }

  if (action === "advice") {
    referral.status = "Advice Given";
    addTimelineEvent(referral, referral.currentSpecialty, `Advice given: ${payload.note}`, "advice");
    markFinalOutcome(referral);
  }

  saveState();
  closeModal();
  navigate(`/specialty/referral/${referralId}`);
}

function renderNav(path) {
  const items = [
    ["/", "Home"],
    ["/gp", "GP Demo"],
    ["/specialty", "Specialty Demo"],
    ["/audit/gp", "GP Audit"],
    ["/audit/specialty", "Specialty Audit"],
  ];
  return `
    <div class="nav">
      <a class="brand" href="#/">
        <div class="brand-mark">C</div>
        <div class="brand-text">
          <strong>ELIZA</strong>
          <span>Acute referral management MVP</span>
        </div>
      </a>
      <div class="nav-links">
        ${items
          .map(
            ([href, label]) => `
              <a class="nav-link ${path === href ? "active" : ""}" href="#${href}">${label}</a>
            `,
          )
          .join("")}
      </div>
    </div>
  `;
}

function renderHome() {
  return `
    <section class="hero">
      <div class="panel hero-copy">
        <span class="eyebrow">Acute referral flow, made visible</span>
        <h1>ELIZA</h1>
        <p class="hero-tagline">Acute referrals, without the chaos.</p>
        <p class="lead">Send the referral. Track the response. See where it went.</p>
        <div class="hero-actions">
          <a class="button" href="#/gp">GP Demo</a>
          <a class="ghost-button" href="#/specialty">Specialty Demo</a>
          <a class="ghost-button" href="#/audit/gp">View Audit</a>
        </div>
        <div class="problem-list">
          <div class="problem-item">Can’t get through to the specialty registrar?</div>
          <div class="problem-item">Patient arrived with no proof of referral?</div>
          <div class="problem-item">Wrong specialty? Redirect without losing the trail.</div>
          <div class="problem-item">Need to audit delays, redirects and outcomes?</div>
        </div>
      </div>
      <div class="panel hero-side">
        <div class="demo-stack">
          <div class="demo-card">
            <div class="demo-card-header">
              <strong>Shared workflow</strong>
              ${statusBadge("Awaiting Review")}
            </div>
            <p class="lead">ELIZA helps GPs and hospital teams manage acute referrals in one shared workflow. GPs add the patient to the specialty list. Specialty teams review, accept, redirect, request more information, schedule review, or give advice. Every step is logged.</p>
          </div>
          <div class="demo-card">
            <div class="demo-card-header">
              <strong>What it looks like</strong>
              <span class="waiting-pill">Live demo data</span>
            </div>
            <div class="timeline">
              <div class="timeline-item">
                <strong>13:02 Referral submitted to Orthopaedics</strong>
                <span class="timeline-meta">GP view and specialty list update instantly</span>
              </div>
              <div class="timeline-item">
                <strong>13:24 Redirected to Rheumatology</strong>
                <span class="timeline-meta">No lost messages, no restart, full audit trail</span>
              </div>
              <div class="timeline-item">
                <strong>13:31 More information requested</strong>
                <span class="timeline-meta">GP sees exactly what is needed next</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="section-header">
      <h2 class="section-title">Why ELIZA works well</h2>
      <p class="section-subtitle">Built to make sense in seconds for acute pathways, while still feeling like a governance tool rather than just another inbox.</p>
    </div>
    <section class="feature-grid">
      <div class="feature-card">
        <span class="eyebrow">For GPs</span>
        <h3>One place to send and track</h3>
        <p class="lead">Every referral has a mandatory reason, visible status badge and a live timeline you can show to the patient if needed.</p>
      </div>
      <div class="feature-card">
        <span class="eyebrow">For Specialties</span>
        <h3>Five clear actions, no clutter</h3>
        <p class="lead">Accept, ask for more, redirect, schedule review or give advice. The flow stays consistent and the dashboard stays calm.</p>
      </div>
      <div class="feature-card">
        <span class="eyebrow">For Governance</span>
        <h3>Audit trail by default</h3>
        <p class="lead">Delays, redirects and outcomes are all time-stamped, making quality improvement visible from day one.</p>
      </div>
    </section>
  `;
}

function renderGpDashboard() {
  const referrals = [...state.referrals].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const summary = dashboardSummary(referrals, "gp");

  return `
    <div class="page-header">
      <div>
        <span class="eyebrow">GP Dashboard</span>
        <h1 class="page-title">Acute Referral Dashboard</h1>
        <p class="page-intro">A clear record of acute referrals sent, their current destination and the latest specialty response. Select any referral to review the full audit trail.</p>
      </div>
      <a class="button" href="#/gp/new">+ Add New Referral</a>
    </div>
    <section class="summary-grid">
      ${summary.map(([label, value]) => `<div class="summary-chip"><strong>${value}</strong><span>${label}</span></div>`).join("")}
    </section>
    <section class="table-card">
      <table class="data-table">
        <thead>
          <tr>
            <th>Patient</th>
            <th>Current Specialty</th>
            <th>Reason for Referral</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          ${referrals
            .map((referral) => {
              const redirected = referral.routeHistory.length > 1;
              return `
                <tr class="table-row" data-nav="/gp/referral/${referral.id}">
                  <td>
                    <div class="cell-stack">
                      <strong>${referral.patientName}</strong>
                      <span>NHS ${referral.nhsNumber}</span>
                      <span>Age ${referral.age}</span>
                    </div>
                  </td>
                  <td>
                    <div class="cell-stack">
                      ${redirected ? `<span>Redirected</span><strong>${referral.currentSpecialty}</strong>` : `<strong>${referral.currentSpecialty}</strong>`}
                    </div>
                  </td>
                  <td>
                    <div class="cell-stack">
                      <strong>${textPreview(referral.reason)}</strong>
                    </div>
                  </td>
                  <td>
                    <div class="status-stack">
                      ${statusBadge(referral.status)}
                    </div>
                  </td>
                </tr>
              `;
            })
            .join("")}
        </tbody>
      </table>
    </section>
  `;
}

function renderAddReferral() {
  return `
    <div class="page-header">
      <div>
        <span class="eyebrow">New Referral</span>
        <h1 class="page-title">Create Acute Referral</h1>
        <p class="page-intro">Complete the minimum referral details below. The reason for referral is required and will appear in both the dashboard preview and the full referral record.</p>
      </div>
    </div>
    <section class="form-card">
      <form id="new-referral-form" class="form-grid">
        <label class="field">
          <span class="label">Patient name</span>
          <input name="patientName" placeholder="e.g. Alex Johnson" required />
        </label>
        <label class="field">
          <span class="label">NHS number</span>
          <input name="nhsNumber" placeholder="10 digit demo number" required />
        </label>
        <label class="field">
          <span class="label">Age</span>
          <input name="age" type="number" min="0" max="120" placeholder="Age" required />
        </label>
        <label class="field">
          <span class="label">Referral type</span>
          <select name="referralType" required>
            <option value="Community">Community</option>
            <option value="Inpatient">Inpatient</option>
          </select>
        </label>
        <label class="field full">
          <span class="label">Specialty</span>
          <select name="specialty" required>
            ${SPECIALTIES.map((specialty) => `<option value="${specialty}">${specialty}</option>`).join("")}
          </select>
        </label>
        <label class="field full">
          <span class="label">Reason for referral</span>
          <textarea name="reason" placeholder="Mandatory. Add the acute referral reason here." required></textarea>
          <span class="helper">This becomes the dashboard preview and the full detail view.</span>
        </label>
        <div class="field full">
          <div class="sub-actions">
            <button class="button" type="submit">Submit Referral</button>
            <a class="ghost-button" href="#/gp">Back to GP Dashboard</a>
          </div>
        </div>
      </form>
    </section>
  `;
}

function renderReferralDetail(referral, mode) {
  if (!referral) {
    return `<section class="empty-card"><span class="eyebrow">Not found</span><h3>Referral not found</h3><p class="lead">The demo referral may have been reset. Head back to the dashboard to continue.</p></section>`;
  }

  const title = mode === "gp" ? "GP Referral View" : "Specialty Referral View";
  const intro =
    mode === "gp"
      ? "Further clinical information may be added at any time. Each update is time-stamped and recorded within the referral audit trail."
      : "Use the specialty actions below to record the next clinical decision. Each action updates status and writes directly to the audit trail.";

  const actionPanel =
    mode === "gp"
      ? `
        <div class="detail-actions">
          <button class="button" data-gp-update="${referral.id}">Add More Information</button>
          <a class="ghost-button" href="#/gp">Back to GP Dashboard</a>
        </div>
      `
      : `
        <div class="detail-actions">
          <a class="ghost-button" href="#/specialty">Back to Specialty Dashboard</a>
        </div>
        <div class="action-grid">
          <button class="action-button" data-specialty-action="accepted" data-referral-id="${referral.id}">
            <strong>Accept for Admission</strong>
            <span>Change status and optionally add an instruction.</span>
          </button>
          <button class="action-button" data-specialty-action="request-info" data-referral-id="${referral.id}">
            <strong>Request More Information</strong>
            <span>Ask the GP for the missing detail.</span>
          </button>
          <button class="action-button" data-specialty-action="redirect" data-referral-id="${referral.id}">
            <strong>Redirect</strong>
            <span>Send to another specialty without losing the trail.</span>
          </button>
          <button class="action-button" data-specialty-action="scheduled" data-referral-id="${referral.id}">
            <strong>Scheduled Review</strong>
            <span>Log a planned review time or location.</span>
          </button>
          <button class="action-button" data-specialty-action="advice" data-referral-id="${referral.id}">
            <strong>Advice Given</strong>
            <span>Close with guidance for the GP or ward team.</span>
          </button>
        </div>
      `;

  return `
    <div class="page-header">
      <div>
        <span class="eyebrow">${title}</span>
        <h1 class="page-title">${referral.patientName}</h1>
        <p class="page-intro">${intro}</p>
      </div>
      ${statusBadge(referral.status)}
    </div>
    <section class="detail-grid">
      <div class="content-card">
        <div class="info-grid">
          <div>
            <span class="label">Patient</span>
            <div class="value"><strong>${referral.patientName}</strong><br />NHS ${referral.nhsNumber}<br />Age ${referral.age}</div>
          </div>
          <div>
            <span class="label">Current specialty</span>
            <div class="value">${referral.currentSpecialty}</div>
          </div>
        </div>
        <div class="info-grid">
          <div>
            <span class="label">Referral type</span>
            <div class="value">${referral.referralType}</div>
          </div>
          <div>
            <span class="label">Current status</span>
            <div class="value">${referral.status}</div>
          </div>
        </div>
        <div class="info-grid">
          <div>
            <span class="label">Full reason for referral</span>
            <div class="value">${referral.reason}</div>
          </div>
        </div>
        <div class="info-grid">
          <div>
            <span class="label">Route so far</span>
            <div class="value">${referral.routeHistory.join(" -> ")}</div>
          </div>
          <div>
            <span class="label">Submitted</span>
            <div class="value">${formatDateTime(referral.createdAt)}</div>
          </div>
        </div>
        <div class="info-grid">
          <div>${actionPanel}</div>
        </div>
      </div>
      <div class="timeline-card">
        <div class="title-row">
          <div>
            <span class="label">Timeline / audit trail</span>
            <div class="value">Every status change and update is logged.</div>
          </div>
        </div>
        <div class="timeline">
          ${referral.timeline
            .map(
              (entry) => `
                <div class="timeline-item">
                  <strong>${timeOnly(entry.time)} ${entry.event}</strong>
                  <span class="timeline-meta">${formatDateTime(entry.time)} • ${entry.actor}</span>
                </div>
              `,
            )
            .join("")}
        </div>
      </div>
    </section>
  `;
}

function renderSpecialtyDashboard() {
  const referrals = getSpecialtyReferrals().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const summary = dashboardSummary(referrals, "specialty");

  return `
    <div class="page-header">
      <div>
        <span class="eyebrow">Specialty Dashboard</span>
        <h1 class="page-title">Specialty Referral List</h1>
        <p class="page-intro">This list shows acute referrals currently assigned to the selected specialty. Open any referral to review the full history and record the next outcome.</p>
      </div>
      <div class="segmented">
        ${SPECIALTIES.map(
          (specialty) => `
            <button class="segment-button ${state.selectedSpecialty === specialty ? "active" : ""}" data-specialty-select="${specialty}">${specialty}</button>
          `,
        ).join("")}
      </div>
    </div>
    <section class="summary-grid">
      ${summary.map(([label, value]) => `<div class="summary-chip"><strong>${value}</strong><span>${label}</span></div>`).join("")}
    </section>
    <section class="table-card">
      <table class="data-table">
        <thead>
          <tr>
            <th>Patient</th>
            <th>Referral Type</th>
            <th>Reason for Referral</th>
            <th>Status</th>
            <th>Waiting</th>
          </tr>
        </thead>
        <tbody>
          ${
            referrals.length
              ? referrals
                  .map(
                    (referral) => `
                    <tr class="table-row" data-nav="/specialty/referral/${referral.id}">
                      <td>
                        <div class="cell-stack">
                          <strong>${referral.patientName}</strong>
                          <span>NHS ${referral.nhsNumber}</span>
                          <span>Age ${referral.age}</span>
                        </div>
                      </td>
                      <td><div class="cell-stack"><strong>${referral.referralType}</strong></div></td>
                      <td><div class="cell-stack"><strong>${textPreview(referral.reason)}</strong></div></td>
                      <td>${statusBadge(referral.status)}</td>
                      <td><span class="waiting-pill">${waitingText(referral)}</span></td>
                    </tr>
                  `,
                  )
                  .join("")
              : `
                <tr>
                  <td colspan="5">
                    <div class="empty-card">
                      <span class="eyebrow">Nothing here yet</span>
                      <h3>No referrals for ${state.selectedSpecialty}</h3>
                      <p class="lead">Try another specialty or add a referral from the GP side to see it appear here.</p>
                    </div>
                  </td>
                </tr>
              `
          }
        </tbody>
      </table>
    </section>
  `;
}

function renderAudit(mode) {
  const referrals = mode === "gp" ? state.referrals : getSpecialtyAuditReferrals();
  const metrics = mode === "gp" ? computeGpMetrics(referrals) : computeSpecialtyMetrics(referrals);
  const insights = mode === "gp" ? computeGpInsights(referrals) : computeSpecialtyInsights(referrals);
  const title = mode === "gp" ? "GP Audit" : `${state.selectedSpecialty} Audit`;
  const intro =
    mode === "gp"
      ? "This view supports quality improvement by summarising referral volumes, response times, redirects and waiting referrals."
      : "This view supports service review by summarising response times, onward redirection, requests for further information and referral outcomes.";

  return `
    <div class="page-header">
      <div>
        <span class="eyebrow">${mode === "gp" ? "GP Audit Page" : "Specialty Audit Page"}</span>
        <h1 class="page-title">${title}</h1>
        <p class="page-intro">${intro}</p>
      </div>
      ${mode === "specialty"
        ? `<div class="segmented">${SPECIALTIES.map(
            (specialty) => `<button class="segment-button ${state.selectedSpecialty === specialty ? "active" : ""}" data-specialty-select="${specialty}">${specialty}</button>`,
          ).join("")}</div>`
        : `<a class="ghost-button" href="#/gp">Back to GP Dashboard</a>`}
    </div>
    <section class="metrics-grid">
      ${metrics.map(([label, value]) => `<div class="metric-card"><span>${label}</span><strong>${value}</strong></div>`).join("")}
    </section>
    <section class="audit-layout">
      <div class="content-card">
        <div class="section-header">
          <h2 class="section-title">Learning insights</h2>
          <p class="section-subtitle">A lightweight governance layer for the demo workflow.</p>
        </div>
        <div class="insight-grid">
          ${insights.map(([label, value]) => `<div class="insight-item"><strong>${label}</strong><span>${value}</span></div>`).join("")}
        </div>
      </div>
      <div class="timeline-card">
        <div class="section-header">
          <h2 class="section-title">What this proves</h2>
          <p class="section-subtitle">The same data can support day-to-day flow and retrospective review.</p>
        </div>
        <div class="timeline">
          <div class="timeline-item">
            <strong>Shared source of truth</strong>
            <span class="timeline-meta">GP and specialty views reflect the same referral state.</span>
          </div>
          <div class="timeline-item">
            <strong>Actions create governance data</strong>
            <span class="timeline-meta">Redirects, delays and outcomes are measured automatically.</span>
          </div>
          <div class="timeline-item">
            <strong>Useful even without full EPR integration</strong>
            <span class="timeline-meta">This MVP already demonstrates auditability and clarity.</span>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderModal() {
  if (!state.modal) return "";
  const { type, referralId } = state.modal;
  const referral = findReferral(referralId);
  if (!referral) return "";

  if (type === "gp-update") {
    return `
      <div class="modal-backdrop" data-close-modal="true">
        <div class="modal" role="dialog" aria-modal="true">
          <h3>Add More Information</h3>
          <p>Record further clinical information. The update will be added to the audit trail with the current time.</p>
          <form id="gp-update-form">
            <label class="field full">
              <span class="label">Clinical update</span>
              <textarea name="note" placeholder="e.g. CRP 212. Patient now tachycardic." required></textarea>
            </label>
            <div class="modal-footer">
              <button class="button" type="submit">Save information</button>
              <button class="ghost-button" type="button" data-close-modal="true">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  if (type === "accepted") {
    return modalForm({
      title: "Accept for Admission",
      description: "Record acceptance and optionally add immediate instructions for the next step in the patient pathway.",
      submitLabel: "Confirm outcome",
      fields: `
        <label class="field full">
          <span class="label">Instruction (optional)</span>
          <textarea name="note" placeholder="e.g. Send patient to SAU now."></textarea>
        </label>
      `,
    });
  }

  if (type === "request-info") {
    return modalForm({
      title: "Request More Information",
      description: "Specify the information required. The referral status will change to Awaiting GP Update.",
      submitLabel: "Save request",
      required: true,
      fields: `
        <label class="field full">
          <span class="label">Information needed</span>
          <textarea name="note" placeholder="e.g. Please add observations, CRP and whether IV antibiotics have been given." required></textarea>
        </label>
      `,
    });
  }

  if (type === "redirect") {
    return modalForm({
      title: "Redirect Referral",
      description: "Transfer the referral to another specialty while preserving the complete audit trail.",
      submitLabel: "Confirm redirect",
      required: true,
      fields: `
        <label class="field full">
          <span class="label">New specialty</span>
          <select name="specialty" required>
            ${SPECIALTIES.filter((item) => item !== referral.currentSpecialty)
              .map((specialty) => `<option value="${specialty}">${specialty}</option>`)
              .join("")}
          </select>
        </label>
        <label class="field full">
          <span class="label">Reason (optional)</span>
          <textarea name="note" placeholder="e.g. Inflammatory picture more in keeping with rheumatology."></textarea>
        </label>
      `,
    });
  }

  if (type === "scheduled") {
    return modalForm({
      title: "Schedule Review",
      description: "Record the planned review arrangement so the next step is visible to all users.",
      submitLabel: "Save review plan",
      required: true,
      fields: `
        <label class="field full">
          <span class="label">Review details</span>
          <textarea name="note" placeholder="e.g. SDEC review tomorrow at 09:00." required></textarea>
        </label>
      `,
    });
  }

  if (type === "advice") {
    return modalForm({
      title: "Advice Given",
      description: "Close the referral with documented clinical advice.",
      submitLabel: "Save advice",
      required: true,
      fields: `
        <label class="field full">
          <span class="label">Advice</span>
          <textarea name="note" placeholder="e.g. Start IV co-amoxiclav, repeat bloods at 18:00 and re-refer if obs worsen." required></textarea>
        </label>
      `,
    });
  }

  return "";
}

function modalForm({ title, description, fields, submitLabel }) {
  return `
    <div class="modal-backdrop" data-close-modal="true">
      <div class="modal" role="dialog" aria-modal="true">
        <h3>${title}</h3>
        <p>${description}</p>
        <form id="specialty-action-form">
          ${fields}
          <div class="modal-footer">
            <button class="button" type="submit">${submitLabel}</button>
            <button class="ghost-button" type="button" data-close-modal="true">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  `;
}

function renderApp() {
  const path = currentPath();
  const gpReferralMatch = path.match(/^\/gp\/referral\/(.+)$/);
  const specialtyReferralMatch = path.match(/^\/specialty\/referral\/(.+)$/);
  let content = "";

  if (path === "/") content = renderHome();
  else if (path === "/gp") content = renderGpDashboard();
  else if (path === "/gp/new") content = renderAddReferral();
  else if (gpReferralMatch) content = renderReferralDetail(findReferral(gpReferralMatch[1]), "gp");
  else if (path === "/specialty") content = renderSpecialtyDashboard();
  else if (specialtyReferralMatch) content = renderReferralDetail(findReferral(specialtyReferralMatch[1]), "specialty");
  else if (path === "/audit/gp") content = renderAudit("gp");
  else if (path === "/audit/specialty") content = renderAudit("specialty");
  else content = renderHome();

  return `
    <div class="shell">
      ${renderNav(path)}
      ${content}
      <footer class="footer">
        Demo only. No real patient data. Not connected to NHS systems.
      </footer>
    </div>
    ${renderModal()}
  `;
}

function render() {
  document.body.dataset.pageTone = currentPath() === "/" ? "home" : "professional";
  document.getElementById("app").innerHTML = renderApp();
  bindEvents();
}

function bindEvents() {
  document.querySelectorAll("[data-nav]").forEach((row) => {
    row.addEventListener("click", () => navigate(row.dataset.nav));
  });

  document.querySelector("#new-referral-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    handleAddReferral(new FormData(event.currentTarget));
  });

  document.querySelectorAll("[data-gp-update]").forEach((button) => {
    button.addEventListener("click", () => openModal({ type: "gp-update", referralId: button.dataset.gpUpdate }));
  });

  document.querySelectorAll("[data-specialty-action]").forEach((button) => {
    button.addEventListener("click", () =>
      openModal({ type: button.dataset.specialtyAction, referralId: button.dataset.referralId }),
    );
  });

  document.querySelectorAll("[data-specialty-select]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedSpecialty = button.dataset.specialtySelect;
      render();
    });
  });

  document.querySelectorAll("[data-close-modal]").forEach((element) => {
    element.addEventListener("click", (event) => {
      if (event.target === element || element.dataset.closeModal === "true") {
        closeModal();
      }
    });
  });

  document.querySelector("#gp-update-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const note = new FormData(event.currentTarget).get("note");
    handleGpUpdate(state.modal.referralId, note);
  });

  document.querySelector("#specialty-action-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = {
      note: (formData.get("note") || "").trim(),
      specialty: formData.get("specialty"),
    };

    if (["request-info", "scheduled", "advice"].includes(state.modal.type) && !payload.note) {
      alert("Please complete the required details.");
      return;
    }

    if (state.modal.type === "redirect" && !payload.specialty) {
      alert("Please choose the new specialty.");
      return;
    }

    handleSpecialtyAction(state.modal.referralId, state.modal.type, payload);
  });
}

window.addEventListener("hashchange", render);
window.addEventListener("DOMContentLoaded", render);
