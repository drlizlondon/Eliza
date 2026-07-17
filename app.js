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
  "Red Flag Pathway Activated": "status-red-flag-pathway-activated",
  "Pending Specialty Transfer": "status-pending-specialty-transfer",
  "Awaiting Arrival": "status-awaiting-arrival",
  "Patient Arrived": "status-patient-arrived",
  "Awaiting GP Update": "status-awaiting-gp-update",
  "Scheduled Review": "status-scheduled-review",
  "Advice Given": "status-advice-given",
  Closed: "status-closed",
  Cancelled: "status-cancelled",
};

const STORAGE_KEY = "eliza-referrals-v3";

const RED_FLAG_CRITERIA = {
  Orthopaedics: ["Suspected septic joint", "Cauda equina syndrome", "Open fracture"],
  Cardiology: ["STEMI", "Unstable arrhythmia", "Cardiogenic shock"],
  "Acute Medicine": ["Sepsis with haemodynamic instability", "Acute hypoxia requiring immediate assessment", "Severe metabolic derangement with instability"],
  ENT: ["Airway compromise", "Post-tonsillectomy bleed", "Deep neck space infection with sepsis"],
  "General Surgery": ["Peritonitis", "Bowel ischaemia", "Ruptured abdominal aortic aneurysm concern"],
  Respiratory: ["Tension pneumothorax", "Massive haemoptysis", "Severe asthma with exhaustion"],
  Neurology: ["Acute stroke thrombolysis window", "Status epilepticus", "Reduced consciousness with focal deficit"],
  Rheumatology: ["Suspected vasculitis with organ threat", "Acute cord compression in inflammatory disease", "Septic arthritis in immunosuppressed patient"],
  Paediatrics: ["Sepsis in child", "Meningococcal rash", "Acute airway compromise in child"],
  Gynaecology: ["Suspected ruptured ectopic pregnancy", "Ovarian torsion", "Severe pregnancy-related haemorrhage"],
};

const SPECIALTY_GUIDANCE_LIBRARY = {
  Orthopaedics: [
    "Orthopaedics Acute Referral Criteria.pdf",
    "Suspected Septic Joint Admission Pathway.pdf",
  ],
  Cardiology: [
    "Cardiology Acute Referral Criteria.pdf",
    "Chest Pain Admission Pathway.pdf",
  ],
  "Acute Medicine": [
    "Acute Medicine Same Day Assessment Criteria.pdf",
    "Medical Admissions Escalation Guidance.pdf",
  ],
  ENT: ["ENT Emergency Referral Criteria.pdf"],
};

const GUIDANCE_ATTACHMENTS = {
  redirect: [
    "Receiving Specialty Handover Note.pdf",
    "Acute Transfer Pathway.pdf",
  ],
  scheduled: [
    "Planned Review Information Sheet.pdf",
    "What Happens Next After Referral.pdf",
  ],
  advice: [
    "Patient Advice Sheet.pdf",
    "Home Monitoring Guidance.pdf",
    "Safety Netting Leaflet.pdf",
  ],
};

const CLOSE_OUTCOMES = [
  "Patient admitted",
  "Advice completed",
  "Patient reviewed",
  "No longer required",
  "Duplicate referral",
  "Other",
];

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
    redFlagCriterion: "Suspected septic joint",
    arrivalInstructions: "",
    attachedGuidance: [],
    routeHistory: ["Orthopaedics"],
    timeline: [
      {
        id: "ev-1",
        time: "2026-04-25T13:02:00",
        actor: "GP",
        event: "Referral submitted to Orthopaedics",
        kind: "submitted",
      },
      {
        id: "ev-1b",
        time: "2026-04-25T13:03:00",
        actor: "GP",
        event: "Red flag pathway activated: Suspected septic joint. Patient instructed to attend hospital immediately.",
        kind: "red-flag",
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
    redFlagCriterion: null,
    arrivalInstructions: "Send directly to SAU. Blood cultures on arrival.",
    attachedGuidance: [],
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
      {
        id: "ev-4b",
        time: "2026-04-25T13:17:00",
        actor: "Acute Medicine",
        event: "Arrival instructions recorded: Send directly to SAU. Blood cultures on arrival.",
        kind: "arrival-instructions",
      },
      {
        id: "ev-4c",
        time: "2026-04-25T13:18:00",
        actor: "Acute Medicine",
        event: "Status updated to Awaiting Arrival.",
        kind: "arrival-state",
      },
    ],
    status: "Awaiting Arrival",
  },
  {
    id: "ref-3",
    patientName: "Priya Shah",
    nhsNumber: "5567723011",
    age: 31,
    referralType: "Community",
    currentSpecialty: "Orthopaedics",
    pendingTransferSpecialty: "Rheumatology",
    initialSpecialty: "Orthopaedics",
    reason:
      "Polyarthralgia with raised inflammatory markers, hot wrists and ankles, struggling to mobilise and now systemically unwell.",
    status: "Pending Specialty Transfer",
    createdAt: "2026-04-25T13:02:00",
    firstResponseAt: "2026-04-25T13:18:00",
    finalOutcomeAt: null,
    redFlagCriterion: null,
    arrivalInstructions: "",
    attachedGuidance: [
      {
        name: "Receiving Specialty Handover Note.pdf",
        addedAt: "2026-04-25T13:24:00",
        addedBy: "Orthopaedics",
        eventKind: "redirect",
      },
    ],
    routeHistory: ["Orthopaedics"],
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
        event: "Orthopaedics requested transfer to Rheumatology. Reason: Inflammatory picture more in keeping with rheumatology than septic joint.",
        kind: "redirected",
      },
      {
        id: "ev-7b",
        time: "2026-04-25T13:24:00",
        actor: "Orthopaedics",
        event: "Attached guidance: Receiving Specialty Handover Note.pdf.",
        kind: "guidance-attached",
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
    redFlagCriterion: null,
    arrivalInstructions: "",
    attachedGuidance: [],
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
    redFlagCriterion: null,
    arrivalInstructions: "",
    attachedGuidance: [
      {
        name: "Patient Advice Sheet.pdf",
        addedAt: "2026-04-25T13:29:00",
        addedBy: "Cardiology",
        eventKind: "advice",
      },
    ],
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
      {
        id: "ev-15b",
        time: "2026-04-25T13:29:00",
        actor: "Cardiology",
        event: "Attached guidance: Patient Advice Sheet.pdf.",
        kind: "guidance-attached",
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
    redFlagCriterion: null,
    arrivalInstructions: "",
    attachedGuidance: [
      {
        name: "Planned Review Information Sheet.pdf",
        addedAt: "2026-04-25T13:05:00",
        addedBy: "Acute Medicine",
        eventKind: "scheduled",
      },
    ],
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
      {
        id: "ev-18b",
        time: "2026-04-25T13:05:00",
        actor: "Acute Medicine",
        event: "Attached guidance: Planned Review Information Sheet.pdf.",
        kind: "guidance-attached",
      },
    ],
  },
  {
    id: "ref-7",
    patientName: "Omar Patel",
    nhsNumber: "3347182206",
    age: 42,
    referralType: "Community",
    currentSpecialty: "Rheumatology",
    initialSpecialty: "Orthopaedics",
    reason: "Hot swollen joints with inflammatory markers rising despite initial orthopaedic review.",
    status: "Accepted for Admission",
    createdAt: "2026-04-25T13:02:00",
    firstResponseAt: "2026-04-25T13:08:00",
    finalOutcomeAt: "2026-04-25T13:20:00",
    pendingTransferSpecialty: null,
    redFlagCriterion: null,
    arrivalInstructions: "X-ray pelvis before specialty review. Keep nil by mouth.",
    attachedGuidance: [],
    routeHistory: ["Orthopaedics", "Rheumatology"],
    timeline: [
      {
        id: "ev-19",
        time: "2026-04-25T13:02:00",
        actor: "GP",
        event: "Referral submitted to Orthopaedics",
        kind: "submitted",
      },
      {
        id: "ev-20",
        time: "2026-04-25T13:08:00",
        actor: "Orthopaedics",
        event: "Accepted for admission.",
        kind: "accepted",
      },
      {
        id: "ev-21",
        time: "2026-04-25T13:14:00",
        actor: "Orthopaedics",
        event: "Orthopaedics requested transfer to Rheumatology.",
        kind: "redirected",
      },
      {
        id: "ev-22",
        time: "2026-04-25T13:20:00",
        actor: "Rheumatology",
        event: "Rheumatology accepted transfer.",
        kind: "transfer-accepted",
      },
      {
        id: "ev-22b",
        time: "2026-04-25T13:21:00",
        actor: "Rheumatology",
        event: "Arrival instructions recorded: X-ray pelvis before specialty review. Keep nil by mouth.",
        kind: "arrival-instructions",
      },
      {
        id: "ev-22c",
        time: "2026-04-25T13:22:00",
        actor: "Rheumatology",
        event: "Status updated to Awaiting Arrival.",
        kind: "arrival-state",
      },
    ],
    status: "Awaiting Arrival",
  },
];

const state = {
  referrals: loadState(),
  selectedSpecialty: "Acute Medicine",
  newReferralSpecialty: "",
  newReferralPathway: "Standard Referral",
  modal: null,
  gpFilter: "All",
  expandedPathways: {},
};

function loadState() {
  const raw = safeStorageGet(STORAGE_KEY);
  if (!raw) {
    safeStorageSet(STORAGE_KEY, JSON.stringify(demoReferrals));
    return structuredClone(demoReferrals);
  }
  try {
    return JSON.parse(raw);
  } catch {
    safeStorageSet(STORAGE_KEY, JSON.stringify(demoReferrals));
    return structuredClone(demoReferrals);
  }
}

function saveState() {
  safeStorageSet(STORAGE_KEY, JSON.stringify(state.referrals));
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

function dateTimeShort(value) {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
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

function latestUpdateAt(referral) {
  return referral.timeline[referral.timeline.length - 1]?.time || referral.createdAt;
}

function currentLocationLabel(referral) {
  return referral.referralType;
}

function displayStatus(referral) {
  if (isRedFlag(referral)) return "Automatic Admission";
  if (["Awaiting Arrival", "Patient Arrived"].includes(referral.status)) return "Accepted for Admission";
  return referral.status;
}

function statusBadge(referralOrStatus) {
  const referral = typeof referralOrStatus === "string" ? null : referralOrStatus;
  const status = referral ? displayStatus(referral) : referralOrStatus;
  const className = referral
    ? isRedFlag(referral)
      ? "status-red-flag-pathway-activated"
      : statusClassMap[status] || "status-awaiting-review"
    : statusClassMap[status] || "status-awaiting-review";
  return `<span class="status-badge ${className}">${status}</span>`;
}

function waitingText(referral) {
  if (isRedFlag(referral)) return "Attend now";
  if (["Closed", "Cancelled"].includes(referral.status)) return "Completed";
  const minutes = currentWaitMinutes(referral);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  return remainder ? `${hours}h ${remainder}m` : `${hours}h`;
}

function currentWaitMinutes(referral) {
  const lastEvent = referral.timeline[referral.timeline.length - 1];
  return minutesBetween(lastEvent.time, nowIso());
}

function waitingTone(referral) {
  if (isRedFlag(referral)) return "waiting-red-flag";
  if (["Closed", "Cancelled"].includes(referral.status)) return "waiting-neutral";
  const minutes = currentWaitMinutes(referral);
  if (minutes < 15) return "waiting-neutral";
  if (minutes <= 30) return "waiting-amber";
  return "waiting-red";
}

function waitingLabel(referral) {
  if (isRedFlag(referral)) return "Immediate attendance advised";
  if (["Closed", "Cancelled"].includes(referral.status)) return "Outcome recorded";
  const minutes = currentWaitMinutes(referral);
  if (minutes < 15) return "Within expected review window";
  if (minutes <= 30) return "Watch delay";
  return "Delayed";
}

function isPendingTransfer(referral) {
  return referral.status === "Pending Specialty Transfer" && Boolean(referral.pendingTransferSpecialty);
}

function hasRedirectHistory(referral) {
  return isPendingTransfer(referral) || referral.routeHistory.length > 1;
}

function isRedFlag(referral) {
  return referral.status === "Red Flag Pathway Activated" || Boolean(referral.redFlagCriterion);
}

function activeSpecialtyForView(referral) {
  if (isPendingTransfer(referral) && referral.pendingTransferSpecialty === state.selectedSpecialty) {
    return referral.pendingTransferSpecialty;
  }
  return referral.currentSpecialty;
}

function responsibilitySummary(referral) {
  if (isPendingTransfer(referral)) {
    return {
      responsible: referral.currentSpecialty,
      pending: referral.pendingTransferSpecialty,
    };
  }
  return {
    responsible: referral.currentSpecialty,
    pending: null,
  };
}

function pathwayHistoryEntries(referral) {
  return referral.timeline.filter((entry) =>
    ["submitted", "accepted", "redirected", "transfer-accepted", "red-flag", "arrival-state"].includes(entry.kind),
  );
}

function renderPathwaySummary(referral) {
  if (isRedFlag(referral)) {
    return `Automatic admission due to red flag: ${referral.redFlagCriterion}`;
  }
  if (isPendingTransfer(referral)) {
    return `Responsible: ${referral.currentSpecialty} -> Attempting onward referral to ${referral.pendingTransferSpecialty}`;
  }
  return `Responsible: ${referral.currentSpecialty}`;
}

function renderRedFlagBanner(referral) {
  if (!isRedFlag(referral)) return "";
  return `
    <div class="red-flag-panel">
      <strong>Automatic Admission</strong>
      <span>Patient should attend hospital immediately. Do not wait for specialty response.</span>
      <small>Hospital-defined escalation guidance: ${referral.redFlagCriterion}</small>
    </div>
  `;
}

function renderArrivalInstructions(referral) {
  if (!referral.arrivalInstructions) return "";
  return `
    <div class="instruction-panel">
      <span class="label">Arrival instructions</span>
      <div class="instruction-copy">${referral.arrivalInstructions}</div>
    </div>
  `;
}

function renderAttachedGuidance(referral) {
  if (!referral.attachedGuidance?.length) return "";
  return `
    <div class="guidance-panel">
      <span class="label">Attached Guidance</span>
      <div class="guidance-list">
        ${referral.attachedGuidance
          .map(
            (item) => `
              <div class="guidance-item">
                <span>${item.name}</span>
                <small>${item.addedBy} · ${formatDateTime(item.addedAt)}</small>
              </div>
            `,
          )
          .join("")}
      </div>
    </div>
  `;
}

function attachGuidance(referral, guidanceNames, actor, eventKind) {
  if (!guidanceNames?.length) return;
  referral.attachedGuidance = referral.attachedGuidance || [];
  guidanceNames.forEach((name) => {
    const addedAt = nowIso();
    referral.attachedGuidance.push({ name, addedAt, addedBy: actor, eventKind });
    referral.timeline.push({
      id: `ev-${crypto.randomUUID()}`,
      time: addedAt,
      actor,
      event: `Attached guidance: ${name}.`,
      kind: "guidance-attached",
    });
  });
}

function renderGuidancePicker(action) {
  const options = attachmentOptionsFor(action);
  if (!options.length) return "";
  return `
    <div class="field full">
      <span class="label">Attach guidance</span>
      <div class="choice-list">
        ${options
          .map((item) => `<label class="choice-item"><input type="checkbox" name="guidance" value="${item}" /> ${item}</label>`)
          .join("")}
      </div>
    </div>
  `;
}

function redFlagOptionsFor(specialty) {
  return RED_FLAG_CRITERIA[specialty] || [];
}

function guidanceLibraryFor(specialty) {
  return SPECIALTY_GUIDANCE_LIBRARY[specialty] || ["Local acute referral guidance unavailable"];
}

function attachmentOptionsFor(action) {
  return GUIDANCE_ATTACHMENTS[action] || [];
}

function patientStatusCopy(referral) {
  if (isRedFlag(referral)) return "Attend hospital now";
  if (referral.status === "Awaiting Review") return "Referral received";
  if (referral.status === "Awaiting GP Update") return "Under review";
  if (referral.status === "Accepted for Admission") return "Accepted for hospital assessment";
  if (referral.status === "Awaiting Arrival") return "Accepted for hospital assessment";
  if (referral.status === "Patient Arrived") return "Patient arrived";
  if (referral.status === "Scheduled Review") return "Awaiting scheduled review";
  if (referral.status === "Advice Given") return "Advice provided";
  if (referral.status === "Closed") return "Referral completed";
  if (referral.status === "Cancelled") return "Referral closed";
  return "Under review";
}

function transferDelayMinutes(referral) {
  const requested = [...referral.timeline].reverse().find((entry) => entry.kind === "redirected");
  const accepted = [...referral.timeline].reverse().find((entry) => entry.kind === "transfer-accepted");
  if (!requested || !accepted) return null;
  return minutesBetween(requested.time, accepted.time);
}

function renderPathwayDisclosure(referral, colspan) {
  const items = pathwayHistoryEntries(referral)
    .map(
      (entry) => `
        <div class="pathway-event">
          <span class="pathway-time">${timeOnly(entry.time)}</span>
          <span class="pathway-text">${entry.event}</span>
        </div>
      `,
    )
    .join("");

  return `
    <tr class="pathway-row">
      <td colspan="${colspan}">
        <div class="pathway-history">
          ${items}
        </div>
      </td>
    </tr>
  `;
}

function renderSpecialtyCell(referral) {
  const transfer = responsibilitySummary(referral);
  const primary = transfer.responsible;
  const meta = transfer.pending ? `→ ${transfer.pending}` : "";

  return `
    <button class="specialty-box" type="button" data-pathway-toggle="${referral.id}">
      <div class="cell-stack">
        <div class="specialty-primary">${primary}</div>
        ${meta ? `<span class="specialty-meta">${meta}</span>` : ""}
      </div>
    </button>
  `;
}

function renderSpecialtyPath(referral) {
  if (responsibilitySummary(referral).pending) {
    return `
      <div class="cell-stack">
        <div class="specialty-primary">${responsibilitySummary(referral).responsible}</div>
        <span class="specialty-meta">Pending -> ${responsibilitySummary(referral).pending}</span>
      </div>
    `;
  }
  if (referral.routeHistory.length > 1) {
    return `
      <div class="cell-stack">
        <div class="specialty-primary">${referral.routeHistory.join(" -> ")}</div>
      </div>
    `;
  }
  return `<div class="cell-stack"><div class="specialty-primary">${referral.currentSpecialty}</div></div>`;
}

function renderResponsibilityCell(referral) {
  const transfer = responsibilitySummary(referral);
  return `
    <div class="cell-stack">
      <div class="specialty-primary">${transfer.responsible}</div>
      <span class="specialty-meta">${transfer.pending ? `Transfer pending: ${transfer.pending}` : "No transfer pending"}</span>
    </div>
  `;
}

function renderGpSidebar() {
  const items = [
    ["Dashboard", "#/gp", currentPath() === "/gp"],
    ["New Referral", "#/gp/new", currentPath() === "/gp/new"],
    ["My Referrals", "#/gp", state.gpFilter === "All"],
    ["Awaiting Update", "#/gp", state.gpFilter === "Awaiting GP Update"],
    ["Closed / Cancelled", "#/gp", state.gpFilter === "Closed"],
  ];

  return `
    <aside class="ops-sidebar">
      <div class="ops-sidebar-title">GP Workflow</div>
      <div class="ops-sidebar-links">
        ${items
          .map(
            ([label, href, active]) =>
              `<a class="ops-sidebar-link ${active ? "active" : ""}" href="${href}" ${label === "My Referrals" ? 'data-gp-filter-link="All"' : ""} ${label === "Awaiting Update" ? 'data-gp-filter-link="Awaiting GP Update"' : ""} ${label === "Closed / Cancelled" ? 'data-gp-filter-link="Closed"' : ""}>${label}</a>`,
          )
          .join("")}
      </div>
    </aside>
  `;
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

function getSavedNotes(referral) {
  return referral.timeline.filter((entry) =>
    ["gp-update", "requested-info", "accepted", "redirected", "scheduled", "advice", "report"].includes(entry.kind),
  );
}

function latestActionSummary(referral) {
  const latest = referral.timeline[referral.timeline.length - 1];
  if (!latest) return "";
  if (latest.kind === "red-flag") return "Automatic admission due to red flag";
  if (latest.kind === "report") return "Audit issue reported";
  if (latest.kind === "requested-info") return extractAfterColon(latest.event) || "Further information requested";
  if (latest.kind === "accepted") return extractAfterColon(latest.event) || "Accepted by specialty";
  if (latest.kind === "transfer-accepted") return "Responsibility transferred";
  if (latest.kind === "arrival-instructions") return "Arrival instructions recorded";
  if (latest.kind === "arrival-state") return latest.event.replace(/^Status updated to /, "").replace(/\.$/, "");
  if (latest.kind === "guidance-attached") return "Guidance attached";
  if (latest.kind === "advice") return "Review specialty advice";
  if (latest.kind === "scheduled") return extractAfterColon(latest.event) || "Review planned";
  if (latest.kind === "redirected") return `Onward referral attempted to ${referral.pendingTransferSpecialty || referral.currentSpecialty}`;
  if (latest.kind === "closed") return latest.event.replace(/^Referral /, "");
  if (latest.kind === "gp-update") return "New GP information added";
  return "";
}

function extractAfterColon(text) {
  const parts = text.split(":");
  return parts.length > 1 ? parts.slice(1).join(":").trim() : "";
}

function statusGroup(referral) {
  if (isRedFlag(referral)) return 0;
  if (referral.status === "Awaiting Review") return 1;
  if (referral.status === "Awaiting GP Update") return 2;
  if (["Accepted for Admission", "Awaiting Arrival", "Patient Arrived"].includes(referral.status)) return 3;
  if (["Scheduled Review", "Advice Given"].includes(referral.status)) return 4;
  if (referral.status === "Closed") return 5;
  if (referral.status === "Cancelled") return 6;
  return 7;
}

function filterGpReferrals(referrals) {
  const filter = state.gpFilter;
  if (filter === "All") return referrals;
  if (filter === "Red Flag") return referrals.filter((item) => item.status === "Red Flag Pathway Activated");
  if (filter === "Awaiting Review") return referrals.filter((item) => item.status === "Awaiting Review");
  if (filter === "Pending Transfer") return referrals.filter((item) => item.status === "Pending Specialty Transfer");
  if (filter === "Awaiting GP Update") return referrals.filter((item) => item.status === "Awaiting GP Update");
  if (filter === "Accepted") return referrals.filter((item) => item.status === "Accepted for Admission");
  if (filter === "Closed") return referrals.filter((item) => ["Advice Given", "Scheduled Review", "Closed", "Cancelled"].includes(item.status));
  return referrals;
}

function pathwaySummary(referral) {
  const steps = ["GP", ...referral.routeHistory];
  if (referral.pendingTransferSpecialty) steps.push(`Pending ${referral.pendingTransferSpecialty}`);
  if (referral.status === "Red Flag Pathway Activated") steps.push("Attend now");
  if (referral.status === "Accepted for Admission") steps.push("Accepted");
  if (referral.status === "Awaiting Arrival") steps.push("Awaiting arrival");
  if (referral.status === "Patient Arrived") steps.push("Arrived");
  if (referral.status === "Scheduled Review") steps.push("Scheduled");
  if (referral.status === "Advice Given") steps.push("Advice");
  if (referral.status === "Closed" || referral.status === "Cancelled") steps.push(referral.status);
  return steps.join(" -> ");
}

function timelineKindLabel(entry) {
  if (entry.kind === "gp-update" || entry.actor === "GP") return "GP";
  if (entry.kind === "red-flag") return "Red Flag";
  if (entry.kind === "redirected") return "Redirect";
  if (entry.kind === "transfer-accepted") return "Transfer";
  if (entry.kind === "arrival-instructions") return "Arrival";
  if (entry.kind === "guidance-attached") return "Guidance";
  if (entry.kind === "report") return "Report";
  if (["accepted", "scheduled", "advice", "closed"].includes(entry.kind)) return "Outcome";
  return "Specialty";
}

function timelineTone(entry) {
  if (entry.kind === "red-flag") return "timeline-red-flag";
  if (entry.kind === "gp-update" || entry.actor === "GP") return "timeline-gp";
  if (["redirected", "transfer-accepted"].includes(entry.kind)) return "timeline-redirect";
  if (["accepted", "scheduled", "advice", "closed"].includes(entry.kind)) return "timeline-close";
  return "timeline-specialty";
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
    ["Red flag activations", referrals.filter((item) => item.status === "Red Flag Pathway Activated").length],
    ["Accepted for admission", referrals.filter((item) => item.status === "Accepted for Admission").length],
    ["Awaiting arrival", referrals.filter((item) => item.status === "Awaiting Arrival").length],
    ["Patient arrived", referrals.filter((item) => item.status === "Patient Arrived").length],
    ["Pending transfer", referrals.filter((item) => item.status === "Pending Specialty Transfer").length],
    ["Average time to first response", avgFirstResponse],
    ["Average time to acceptance", avgAcceptance],
  ];
}

function computeGpInsights(referrals) {
  const redirected = referrals.filter((item) => hasRedirectHistory(item));
  const redirectedFrom = countBy(redirected.map((item) => item.initialSpecialty));
  const redirectTo = countBy(redirected.map((item) => item.pendingTransferSpecialty || item.currentSpecialty));
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
    ["Red flag referrals", pluralize(referrals.filter((item) => item.status === "Red Flag Pathway Activated").length, "referral")],
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
    ["Red flag referrals", referrals.filter((item) => item.status === "Red Flag Pathway Activated").length],
    ["Accepted for admission", referrals.filter((item) => item.status === "Accepted for Admission").length],
    ["Awaiting arrival", referrals.filter((item) => item.status === "Awaiting Arrival").length],
    ["Patient arrived", referrals.filter((item) => item.status === "Patient Arrived").length],
    ["Pending transfer", referrals.filter((item) => item.status === "Pending Specialty Transfer").length],
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
    ["Arrival instructions used", pluralize(referrals.filter((item) => item.arrivalInstructions).length, "referral")],
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
    const madeToday = referrals.filter((item) => {
      const created = new Date(item.createdAt);
      const now = new Date();
      return created.toDateString() === now.toDateString();
    }).length;
    const awaitingReview = referrals.filter((item) => item.status === "Awaiting Review").length;
    const awaitingGpUpdate = referrals.filter((item) => item.status === "Awaiting GP Update").length;
    return [
      ["Referrals made today", madeToday],
      ["Red flag", referrals.filter((item) => item.status === "Red Flag Pathway Activated").length],
      ["Awaiting first review", awaitingReview],
      ["Pending transfer", referrals.filter((item) => item.status === "Pending Specialty Transfer").length],
      ["Awaiting GP update", awaitingGpUpdate],
    ];
  }
  const awaiting = referrals.filter((item) => item.status === "Awaiting Review").length;
  const pending = referrals.filter((item) => item.status === "Pending Specialty Transfer").length;
  const arrivals = referrals.filter((item) => item.status === "Awaiting Arrival").length;
  const updates = referrals.filter((item) => item.status === "Awaiting GP Update").length;
  const outcomes = referrals.filter((item) => ["Accepted for Admission", "Scheduled Review", "Advice Given", "Patient Arrived"].includes(item.status)).length;
  const over30 = referrals.filter((item) => minutesBetween(item.createdAt, nowIso()) > 30).length;
  return [
    ["Awaiting review", awaiting],
    ["Pending transfer", pending],
    ["Awaiting arrival", arrivals],
    ["Operational outcomes", outcomes],
    ["Delayed", over30],
  ];
}

function getSpecialtyReferrals() {
  return state.referrals.filter(
    (item) => item.currentSpecialty === state.selectedSpecialty || item.pendingTransferSpecialty === state.selectedSpecialty,
  );
}

function getSpecialtyAuditReferrals() {
  return state.referrals.filter(
    (item) =>
      item.pendingTransferSpecialty === state.selectedSpecialty ||
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
  const referralPathway = formData.get("referralPathway");
  const redFlagCriterion = referralPathway === "Red Flag Referral" ? formData.get("redFlagCriterion") || null : null;
  if (!reason) {
    alert("Reason for referral is mandatory.");
    return;
  }

  const referralTime = nowIso();
  const referral = {
    id: `ref-${crypto.randomUUID()}`,
    patientName: formData.get("patientName").trim(),
    nhsNumber: formData.get("nhsNumber").trim(),
    age: Number(formData.get("age")),
    referralType: formData.get("referralType"),
    currentSpecialty: specialty,
    initialSpecialty: specialty,
    reason,
    status: redFlagCriterion ? "Red Flag Pathway Activated" : "Awaiting Review",
    createdAt: referralTime,
    firstResponseAt: redFlagCriterion ? referralTime : null,
    finalOutcomeAt: null,
    redFlagCriterion,
    arrivalInstructions: "",
    attachedGuidance: [],
    routeHistory: [specialty],
    pendingTransferSpecialty: null,
    timeline: [
      {
        id: `ev-${crypto.randomUUID()}`,
        time: referralTime,
        actor: "GP",
        event: `Referral submitted to ${specialty}`,
        kind: "submitted",
      },
    ],
  };

  if (redFlagCriterion) {
    referral.status = "Accepted for Admission";
    referral.timeline.push({
      id: `ev-${crypto.randomUUID()}`,
      time: referralTime,
      actor: "GP",
      event: `Automatic admission due to red flag: ${redFlagCriterion}. Patient instructed to attend hospital immediately.`,
      kind: "red-flag",
    });
    referral.timeline.push({
      id: `ev-${crypto.randomUUID()}`,
      time: referralTime,
      actor: specialty,
      event: `Automatic acceptance triggered because red flag pathway criteria were selected.`,
      kind: "accepted",
    });
  }

  state.referrals = [referral, ...state.referrals];
  saveState();
  if (redFlagCriterion) {
    alert("Automatic admission due to red flag. Patient should attend hospital immediately.");
  }
  state.newReferralSpecialty = "";
  state.newReferralPathway = "Standard Referral";
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

function handleCloseReferral(referralId, payload = {}, actorMode = "gp") {
  const referral = findReferral(referralId);
  if (!referral) return;
  const actor = actorMode === "gp" ? "GP" : referral.currentSpecialty;
  const outcome = payload.outcome || "Other";
  const note = payload.note ? ` Note: ${payload.note}` : "";
  referral.status = ["No longer required", "Duplicate referral"].includes(outcome) ? "Cancelled" : "Closed";
  addTimelineEvent(referral, actor, `Referral ${referral.status.toLowerCase()}: ${outcome}.${note}`, "closed");
  markFinalOutcome(referral);
  saveState();
  closeModal();
  navigate(`/${actorMode === "gp" ? "gp" : "specialty"}/referral/${referralId}`);
}

function handleSpecialtyAction(referralId, action, payload = {}) {
  const referral = findReferral(referralId);
  if (!referral) return;

  ensureFirstResponse(referral);

  if (action === "accepted") {
    const actingSpecialty = activeSpecialtyForView(referral);
    if (isPendingTransfer(referral) && referral.pendingTransferSpecialty === actingSpecialty) {
      referral.currentSpecialty = actingSpecialty;
      referral.pendingTransferSpecialty = null;
      if (!referral.routeHistory.includes(actingSpecialty)) {
        referral.routeHistory.push(actingSpecialty);
      }
      referral.status = "Accepted for Admission";
      addTimelineEvent(referral, actingSpecialty, `${actingSpecialty} accepted transfer.`, "transfer-accepted");
      if (payload.arrivalInstructions) {
        referral.arrivalInstructions = payload.arrivalInstructions;
        addTimelineEvent(referral, actingSpecialty, `Arrival instructions recorded: ${payload.arrivalInstructions}`, "arrival-instructions");
      }
      saveState();
      closeModal();
      navigate(`/specialty/referral/${referralId}`);
      return;
    }

    referral.status = "Accepted for Admission";
    addTimelineEvent(
      referral,
      actingSpecialty,
      `Accepted for admission.${payload.note ? ` Instruction: ${payload.note}` : ""}`,
      "accepted",
    );
    if (payload.arrivalInstructions) {
      referral.arrivalInstructions = payload.arrivalInstructions;
      addTimelineEvent(referral, actingSpecialty, `Arrival instructions recorded: ${payload.arrivalInstructions}`, "arrival-instructions");
    }
  }

  if (action === "request-info") {
    referral.status = "Awaiting GP Update";
    addTimelineEvent(
      referral,
      activeSpecialtyForView(referral),
      `${activeSpecialtyForView(referral)} requested more information: ${payload.note}`,
      "requested-info",
    );
  }

  if (action === "report") {
    addTimelineEvent(
      referral,
      activeSpecialtyForView(referral),
      `Audit issue reported: ${payload.note}`,
      "report",
    );
  }

  if (action === "redirect") {
    const previousSpecialty = referral.currentSpecialty;
    referral.pendingTransferSpecialty = payload.specialty;
    if (!["Accepted for Admission", "Awaiting Arrival", "Patient Arrived"].includes(referral.status)) {
      referral.status = "Awaiting Review";
    }
    addTimelineEvent(
      referral,
      previousSpecialty,
      `${previousSpecialty} requested transfer to ${payload.specialty}.${payload.note ? ` Reason: ${payload.note}` : ""}`,
      "redirected",
    );
    attachGuidance(referral, payload.guidance, previousSpecialty, "redirect");
  }

  if (action === "scheduled") {
    referral.status = "Scheduled Review";
    addTimelineEvent(referral, activeSpecialtyForView(referral), `Scheduled review: ${payload.note}`, "scheduled");
    attachGuidance(referral, payload.guidance, activeSpecialtyForView(referral), "scheduled");
    markFinalOutcome(referral);
  }

  if (action === "advice") {
    referral.status = "Advice Given";
    addTimelineEvent(referral, activeSpecialtyForView(referral), `Advice given: ${payload.note}`, "advice");
    attachGuidance(referral, payload.guidance, activeSpecialtyForView(referral), "advice");
    markFinalOutcome(referral);
  }

  if (action === "awaiting-arrival") {
    referral.status = "Awaiting Arrival";
    addTimelineEvent(referral, activeSpecialtyForView(referral), "Status updated to Awaiting Arrival.", "arrival-state");
  }

  if (action === "arrived") {
    referral.status = "Patient Arrived";
    addTimelineEvent(referral, activeSpecialtyForView(referral), "Status updated to Patient Arrived.", "arrival-state");
  }

  if (action === "close") {
    handleCloseReferral(referralId, payload, "specialty");
    return;
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
    ["/ed", "ED View"],
    ["/audit/gp", "GP Audit"],
    ["/audit/specialty", "Specialty Audit"],
  ];
  return `
    <div class="nav">
      <a class="brand" href="#/">
        <div class="brand-mark">E</div>
        <div class="brand-text">
          <strong>ELIZA</strong>
          <span>Acute referral visibility</span>
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
    <section class="hero hero-structured">
      <div class="hero-copy">
        <span class="eyebrow">Acute referral visibility</span>
        <h1>Acute referrals, without the chaos.</h1>
        <p class="lead">See where referrals go, who accepted responsibility, and what happened next.</p>
        <p class="inline-note hero-strapline">No lost referrals. No unclear ownership. No endless referral chasing.</p>
        <div class="hero-actions">
          <a class="button" href="#/gp">GP Workflow</a>
          <a class="ghost-button" href="#/specialty">Specialty Workflow</a>
        </div>
      </div>
      <div class="hero-side hero-side-panel">
        <div class="hero-credibility">Designed around real acute referral workflow friction experienced in frontline care.</div>
      </div>
    </section>
    <section class="home-section home-grid">
      <div class="home-grid-main">
        <div class="section-header">
          <h2 class="section-title">Where acute referrals break down</h2>
        </div>
        <section class="feature-grid problem-grid">
        <div class="feature-card problem-card"><div class="feature-icon">○</div><h3>Patient arrived in ED with no accepted referral</h3></div>
        <div class="feature-card problem-card"><div class="feature-icon">⌁</div><h3>Specialty denies referral was received</h3></div>
        <div class="feature-card problem-card"><div class="feature-icon">↗</div><h3>Referral sent to wrong specialty</h3></div>
        <div class="feature-card problem-card"><div class="feature-icon">◌</div><h3>No visibility after referral is sent</h3></div>
        <div class="feature-card problem-card"><div class="feature-icon">⧖</div><h3>Delays hidden across calls and bleeps</h3></div>
        <div class="feature-card problem-card"><div class="feature-icon">⇄</div><h3>Patients bounced between specialties</h3></div>
        </section>
      </div>
      <div class="home-grid-side">
        <div class="section-header">
          <h2 class="section-title">How ELIZA improves acute referral coordination</h2>
        </div>
        <section class="solution-grid">
          <div class="solution-card"><h3>Track referral movement</h3><p>See where referrals go, which specialty holds responsibility, and what decision was made.</p></div>
          <div class="solution-card"><h3>Visible specialty ownership</h3><p>Responsibility remains visible until formally transferred.</p></div>
          <div class="solution-card"><h3>Detect pathway delays and redirects</h3><p>Surface waiting times, repeated redirects and unclear pathways.</p></div>
          <div class="solution-card"><h3>Support acute operational workflows</h3><p>Use arrival instructions, red flags and structured onward referrals.</p></div>
        </section>
      </div>
    </section>
    <section class="home-section">
      <div class="section-header">
        <h2 class="section-title">How an acute referral moves</h2>
      </div>
      <div class="operational-flow">
        <div class="flow-step">
          <span class="flow-time">13:02</span>
          <p>GP sends referral to Orthopaedics</p>
        </div>
        <div class="flow-arrow">↓</div>
        <div class="flow-step">
          <span class="flow-time">13:08</span>
          <p>Orthopaedics accepts referral</p>
        </div>
        <div class="flow-arrow">↓</div>
        <div class="flow-step flow-step-emphasis">
          <span class="flow-time">13:14</span>
          <p>Transfer requested → Rheumatology</p>
          <span class="flow-status">Status: Pending Transfer</span>
          <span class="flow-meta">Orthopaedics remains responsible</span>
        </div>
        <div class="flow-arrow">↓</div>
        <div class="flow-step">
          <span class="flow-time">13:20</span>
          <p>Rheumatology accepts transfer</p>
        </div>
        <div class="flow-arrow">↓</div>
        <div class="flow-step">
          <p>Responsibility transferred to Rheumatology</p>
        </div>
      </div>
    </section>
  `;
}

function renderGpDashboard() {
  const referrals = filterGpReferrals(
    [...state.referrals].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
  );
  const summary = [
    ["Total referrals", state.referrals.length],
    ["Red Flag", state.referrals.filter((item) => isRedFlag(item)).length],
    ["Awaiting GP Update", state.referrals.filter((item) => item.status === "Awaiting GP Update").length],
    ["Pending Transfer", state.referrals.filter((item) => responsibilitySummary(item).pending).length],
    ["Accepted for Admission", state.referrals.filter((item) => displayStatus(item) === "Accepted for Admission").length],
    ["Scheduled Review", state.referrals.filter((item) => item.status === "Scheduled Review").length],
  ];

  return `
    <div class="dashboard-layout">
      ${renderGpSidebar()}
      <div class="dashboard-main">
        <div class="page-header">
          <div>
            <span class="eyebrow">GP Dashboard</span>
            <h1 class="page-title">Acute Referral Dashboard</h1>
          </div>
          <a class="button" href="#/gp/new">New Referral</a>
        </div>
        <section class="summary-grid summary-grid-ops">
          ${summary.map(([label, value]) => `<div class="summary-chip"><strong>${value}</strong><span>${label}</span></div>`).join("")}
        </section>
        <section class="table-card">
          <table class="data-table data-table-wide">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Location</th>
                <th>Specialty</th>
                <th>Reason for Referral</th>
                <th>Status</th>
                <th>Responsible / Transfer</th>
                <th>Waiting Time</th>
                <th>Updated</th>
              </tr>
            </thead>
            <tbody>
              ${referrals
                .map((referral) => {
                  return `
                    <tr class="table-row" data-nav="/gp/referral/${referral.id}">
                      <td data-label="Patient"><div class="cell-stack"><strong>${referral.patientName}</strong><span>NHS ${referral.nhsNumber} · Age ${referral.age}</span></div></td>
                      <td data-label="Location"><div class="cell-stack"><span>${currentLocationLabel(referral)}</span></div></td>
                      <td data-label="Specialty">${renderSpecialtyPath(referral)}</td>
                      <td data-label="Reason for Referral"><div class="cell-stack"><span class="reason-preview">${textPreview(referral.reason, 84)}</span></div></td>
                      <td data-label="Status" class="status-cell"><div class="status-stack">${statusBadge(referral)}</div></td>
                      <td data-label="Responsible / Transfer">${renderResponsibilityCell(referral)}</td>
                      <td data-label="Waiting Time"><div class="waiting-stack"><span class="waiting-pill ${waitingTone(referral)}">${waitingText(referral)}</span><span class="waiting-caption">${waitingLabel(referral)}</span></div></td>
                      <td data-label="Updated"><div class="cell-stack"><span>${dateTimeShort(latestUpdateAt(referral))}</span></div></td>
                    </tr>
                    ${state.expandedPathways[referral.id] ? renderPathwayDisclosure(referral, 8) : ""}
                  `;
                })
                .join("")}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  `;
}

function renderAddReferral() {
  const specialty = state.newReferralSpecialty;
  const referralPathway = state.newReferralPathway;
  const redFlags = redFlagOptionsFor(specialty);
  const guidance = guidanceLibraryFor(specialty);
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
          <span class="label">Patient Location</span>
          <select name="referralType" required>
            <option value="Community">Community</option>
            <option value="Inpatient">Inpatient</option>
          </select>
        </label>
        <label class="field">
          <span class="label">Referral Pathway</span>
          <select name="referralPathway" required>
            <option value="Standard Referral" ${referralPathway === "Standard Referral" ? "selected" : ""}>Standard Referral</option>
            <option value="Red Flag Referral" ${referralPathway === "Red Flag Referral" ? "selected" : ""}>Red Flag Referral</option>
          </select>
        </label>
        <label class="field full">
          <span class="label">Specialty</span>
          <select id="new-referral-specialty" name="specialty" required>
            <option value="" ${specialty ? "" : "selected"} disabled>Select specialty</option>
            ${SPECIALTIES.map((item) => `<option value="${item}" ${item === specialty ? "selected" : ""}>${item}</option>`).join("")}
          </select>
        </label>
        ${
          specialty && referralPathway === "Red Flag Referral"
            ? `
              <div class="field full">
                <div id="red-flag-criteria-section" class="support-panel">
                  <span class="label">Red Flag Criteria</span>
                  ${
                    redFlags.length
                      ? `
                        <div class="choice-list">
                          <label class="choice-item"><input type="radio" name="redFlagCriterion" value="" checked /> No red flag selected</label>
                          ${redFlags
                            .map(
                              (item) => `<label class="choice-item"><input type="radio" name="redFlagCriterion" value="${item}" /> ${item}</label>`,
                            )
                            .join("")}
                        </div>
                      `
                      : `<p class="helper">No specialty-specific red flag escalation criteria loaded for this pathway.</p>`
                  }
                  <div id="red-flag-preview"></div>
                </div>
              </div>
            `
            : ""
        }
        <label class="field full">
          <span class="label">Reason for referral</span>
          <textarea name="reason" placeholder="Mandatory. Add the acute referral reason here." required></textarea>
          <span class="helper">This becomes the dashboard preview and the full detail view.</span>
        </label>
        ${
          specialty
            ? `
              <div class="field full">
                <div id="guidance-library-section" class="support-panel">
                  <span class="label">Referral Guidance Library</span>
                  <div class="guidance-list">
                    ${guidance.map((item) => `<div class="guidance-item"><span>${item}</span></div>`).join("")}
                  </div>
                </div>
              </div>
            `
            : ""
        }
        <div class="field full">
          <div class="sub-actions">
            <button class="ghost-button" type="button" id="add-demo-patient">Add Demo Patient</button>
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
  const savedNotes = getSavedNotes(referral);
  const specialtyActions = [];
  if (mode !== "gp") {
    specialtyActions.push(`
      <button class="action-button action-primary" data-specialty-action="accepted" data-referral-id="${referral.id}">
        <strong>${isPendingTransfer(referral) && referral.pendingTransferSpecialty === state.selectedSpecialty ? "Accept Transfer" : "Accept for Admission"}</strong>
        <span>${isPendingTransfer(referral) && referral.pendingTransferSpecialty === state.selectedSpecialty ? "Transfer responsibility into your specialty queue." : "Record acceptance and immediate destination."}</span>
      </button>
    `);
    specialtyActions.push(`
      <button class="action-button action-secondary" data-specialty-action="request-info" data-referral-id="${referral.id}">
        <strong>Request More Information</strong>
        <span>Request specific clinical detail.</span>
      </button>
    `);
    specialtyActions.push(`
      <button class="action-button action-secondary" data-specialty-action="redirect" data-referral-id="${referral.id}">
        <strong>Refer to Another Specialty</strong>
        <span>Transfer without losing the audit trail.</span>
      </button>
    `);
    specialtyActions.push(`
      <button class="action-button action-secondary" data-specialty-action="report" data-referral-id="${referral.id}">
        <strong>Report Issue</strong>
        <span>Record an inconsistency for later audit review.</span>
      </button>
    `);
    if (["Accepted for Admission", "Red Flag Pathway Activated"].includes(referral.status)) {
      specialtyActions.push(`
        <button class="action-button action-tertiary" data-specialty-action="awaiting-arrival" data-referral-id="${referral.id}">
          <strong>Set Awaiting Arrival</strong>
          <span>Show that the patient is expected on site.</span>
        </button>
      `);
    }
    if (referral.status === "Awaiting Arrival") {
      specialtyActions.push(`
        <button class="action-button action-tertiary" data-specialty-action="arrived" data-referral-id="${referral.id}">
          <strong>Mark Patient Arrived</strong>
          <span>Confirm arrival for operational visibility.</span>
        </button>
      `);
    }
    specialtyActions.push(`
      <button class="action-button action-tertiary" data-specialty-action="scheduled" data-referral-id="${referral.id}">
        <strong>Scheduled Review</strong>
        <span>Record the planned review step.</span>
      </button>
    `);
    specialtyActions.push(`
      <button class="action-button action-tertiary" data-specialty-action="advice" data-referral-id="${referral.id}">
        <strong>Advice Given</strong>
        <span>Document specialty advice.</span>
      </button>
    `);
    specialtyActions.push(`
      <button class="action-button action-tertiary" data-specialty-action="close" data-referral-id="${referral.id}">
        <strong>Close Referral</strong>
        <span>Complete the referral with an outcome.</span>
      </button>
    `);
  }

  const actionPanel =
    mode === "gp"
      ? `
        <div class="detail-actions">
          <button class="button" data-gp-update="${referral.id}">Add More Information</button>
          <button class="ghost-button" data-gp-close="${referral.id}">Close Referral</button>
          <a class="ghost-button" href="#/patient/${referral.id}">Patient Status View</a>
          <a class="ghost-button" href="#/ed/referral/${referral.id}">ED Receiving View</a>
          <a class="ghost-button" href="#/gp">Back to GP Dashboard</a>
        </div>
      `
      : `
        <div class="detail-actions">
          <a class="ghost-button" href="#/patient/${referral.id}">Patient Status View</a>
          <a class="ghost-button" href="#/ed/referral/${referral.id}">ED Receiving View</a>
          <a class="ghost-button" href="#/specialty">Back to Specialty Dashboard</a>
        </div>
        <div class="action-grid">
          ${specialtyActions.join("")}
        </div>
      `;

  return `
    <div class="page-header">
      <div>
        <span class="eyebrow">${title}</span>
        <h1 class="page-title">${referral.patientName}</h1>
        <p class="page-intro">${intro}</p>
      </div>
      ${statusBadge(referral)}
    </div>
    ${renderRedFlagBanner(referral)}
    <section class="detail-grid">
      <div class="content-card">
        <div class="pathway-summary">${pathwaySummary(referral)}</div>
        ${renderArrivalInstructions(referral)}
        <div class="info-grid">
          <div>
            <span class="label">Patient</span>
            <div class="value"><strong>${referral.patientName}</strong><br />NHS ${referral.nhsNumber}<br />Age ${referral.age}</div>
          </div>
          <div>
            <span class="label">Responsibility</span>
            <div class="value">
              Responsible: ${responsibilitySummary(referral).responsible}
              ${responsibilitySummary(referral).pending ? `<br />Attempting onward referral: ${responsibilitySummary(referral).pending}<br />Transfer status: Awaiting Acceptance` : ""}
            </div>
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
            <div class="value">${renderPathwaySummary(referral)}</div>
          </div>
          <div>
            <span class="label">Submitted</span>
            <div class="value">${formatDateTime(referral.createdAt)}</div>
          </div>
        </div>
        <div class="info-grid">
          <div>
            <span class="label">Saved comments and updates</span>
            <div class="value">
              ${
                savedNotes.length
                  ? savedNotes
                      .slice()
                      .reverse()
                      .map(
                        (entry) =>
                          `<div class="saved-note"><strong>${entry.actor}</strong><span>${entry.event}</span><small>${formatDateTime(entry.time)}</small></div>`,
                      )
                      .join("")
                  : `<span class="muted">No comments or free-text updates have been saved yet.</span>`
              }
            </div>
          </div>
        </div>
        <div class="info-grid">
          <div>${renderAttachedGuidance(referral)}</div>
        </div>
        <div class="info-grid">
          <div>${actionPanel}</div>
        </div>
      </div>
      <div class="timeline-card">
        <div class="title-row">
          <div>
            <span class="label">Audit trail</span>
          </div>
        </div>
        <div class="timeline">
          ${referral.timeline
            .map(
              (entry) => `
                <div class="timeline-item ${timelineTone(entry)}">
                  <span class="timeline-kind">${timelineKindLabel(entry)}</span>
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
  const referrals = getSpecialtyReferrals().sort((a, b) => {
    const statusDiff = statusGroup(a) - statusGroup(b);
    if (statusDiff !== 0) return statusDiff;
    return currentWaitMinutes(b) - currentWaitMinutes(a);
  });
  const summary = dashboardSummary(referrals, "specialty");

  return `
    <div class="page-header">
      <div>
        <span class="eyebrow">Specialty Dashboard</span>
        <h1 class="page-title">Specialty Referral List</h1>
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
            <th>Specialty</th>
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
                      <td data-label="Patient">
                        <div class="cell-stack">
                          <strong>${referral.patientName}</strong>
                          <span>NHS ${referral.nhsNumber} · Age ${referral.age}</span>
                        </div>
                      </td>
                      <td data-label="Specialty">${renderSpecialtyCell(referral)}</td>
                      <td data-label="Reason for Referral"><div class="cell-stack"><span class="reason-preview">${textPreview(referral.reason, 72)}</span></div></td>
                      <td data-label="Status" class="status-cell"><div class="status-stack">${statusBadge(referral)}${latestActionSummary(referral) ? `<span class="status-subtext">${latestActionSummary(referral)}</span>` : ""}</div></td>
                      <td data-label="Waiting"><div class="waiting-stack"><span class="waiting-pill ${waitingTone(referral)}">${waitingText(referral)}</span><span class="waiting-caption">${waitingLabel(referral)}</span></div></td>
                    </tr>
                    ${state.expandedPathways[referral.id] ? renderPathwayDisclosure(referral, 5) : ""}
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

function renderPatientStatus(referral) {
  if (!referral) {
    return `<section class="empty-card"><span class="eyebrow">Not found</span><h3>Status not found</h3><p class="lead">The referral could not be found.</p></section>`;
  }

  return `
    <div class="page-header">
      <div>
        <span class="eyebrow">Patient Status View</span>
        <h1 class="page-title">${referral.patientName}</h1>
        <p class="page-intro">A simplified referral update page for patients and families.</p>
      </div>
      <div class="status-badge status-patient-view">${patientStatusCopy(referral)}</div>
    </div>
    ${renderRedFlagBanner(referral)}
    <section class="detail-grid">
      <div class="content-card">
        <div class="patient-status-card">
          <span class="label">Current update</span>
          <div class="patient-status-copy">${patientStatusCopy(referral)}</div>
          <p class="helper">This page shows only patient-facing referral updates.</p>
        </div>
        ${renderArrivalInstructions(referral)}
        ${renderAttachedGuidance(referral)}
      </div>
      <div class="timeline-card">
        <div class="title-row"><div><span class="label">Status updates</span></div></div>
        <div class="timeline">
          ${[
            ["Referral received", formatDateTime(referral.createdAt)],
            [patientStatusCopy(referral), formatDateTime(referral.timeline[referral.timeline.length - 1].time)],
          ]
            .map(
              ([label, time]) => `
                <div class="timeline-item timeline-specialty">
                  <strong>${label}</strong>
                  <span class="timeline-meta">${time}</span>
                </div>
              `,
            )
            .join("")}
        </div>
      </div>
    </section>
  `;
}

function renderEdView(referralId = null) {
  if (referralId) {
    const referral = findReferral(referralId);
    if (!referral) {
      return `<section class="empty-card"><span class="eyebrow">Not found</span><h3>Receiving view unavailable</h3></section>`;
    }

    return `
      <div class="page-header">
        <div>
          <span class="eyebrow">ED Receiving View</span>
          <h1 class="page-title">${referral.patientName}</h1>
          <p class="page-intro">Operational handover view for the receiving team.</p>
        </div>
        ${statusBadge(referral)}
      </div>
      ${renderRedFlagBanner(referral)}
      <section class="detail-grid">
        <div class="content-card">
          <div class="info-grid">
            <div><span class="label">Responsible specialty</span><div class="value">${responsibilitySummary(referral).responsible}</div></div>
            <div><span class="label">Transfer status</span><div class="value">${responsibilitySummary(referral).pending ? `Awaiting acceptance by ${responsibilitySummary(referral).pending}` : "No transfer pending"}</div></div>
          </div>
          ${renderArrivalInstructions(referral)}
          ${renderAttachedGuidance(referral)}
        </div>
        <div class="timeline-card">
          <div class="title-row"><div><span class="label">Receiving timeline</span></div></div>
          <div class="timeline">
            ${referral.timeline
              .filter((entry) => ["submitted", "accepted", "transfer-accepted", "arrival-instructions", "arrival-state", "red-flag"].includes(entry.kind))
              .map(
                (entry) => `
                  <div class="timeline-item ${timelineTone(entry)}">
                    <strong>${timeOnly(entry.time)} ${entry.event}</strong>
                    <span class="timeline-meta">${formatDateTime(entry.time)} · ${entry.actor}</span>
                  </div>
                `,
              )
              .join("")}
          </div>
        </div>
      </section>
    `;
  }

  const referrals = state.referrals.filter((item) =>
    ["Red Flag Pathway Activated", "Accepted for Admission", "Awaiting Arrival", "Patient Arrived", "Pending Specialty Transfer"].includes(item.status),
  );

  return `
    <div class="page-header">
      <div>
        <span class="eyebrow">ED Receiving View</span>
        <h1 class="page-title">Incoming Acute Referrals</h1>
        <p class="page-intro">Operational list of referrals expected in hospital or requiring immediate attendance.</p>
      </div>
    </div>
    <section class="table-card">
      <table class="data-table">
        <thead>
          <tr>
            <th>Patient</th>
            <th>Responsible Specialty</th>
            <th>Status</th>
            <th>Waiting Time</th>
            <th>Arrival Instructions</th>
          </tr>
        </thead>
        <tbody>
          ${referrals
            .map(
              (referral) => `
                <tr class="table-row" data-nav="/ed/referral/${referral.id}">
                  <td data-label="Patient"><div class="cell-stack"><strong>${referral.patientName}</strong><span>NHS ${referral.nhsNumber} · Age ${referral.age}</span></div></td>
                  <td data-label="Responsible Specialty"><div class="cell-stack"><div class="specialty-primary">${responsibilitySummary(referral).responsible}</div>${responsibilitySummary(referral).pending ? `<span class="specialty-meta">Transfer pending: ${responsibilitySummary(referral).pending}</span>` : ""}</div></td>
                  <td data-label="Status" class="status-cell"><div class="status-stack">${statusBadge(referral)}</div></td>
                  <td data-label="Waiting Time"><div class="waiting-stack"><span class="waiting-pill ${waitingTone(referral)}">${waitingText(referral)}</span><span class="waiting-caption">${waitingLabel(referral)}</span></div></td>
                  <td data-label="Arrival Instructions"><div class="cell-stack"><span class="reason-preview">${referral.arrivalInstructions || "No arrival instructions recorded"}</span></div></td>
                </tr>
              `,
            )
            .join("")}
        </tbody>
      </table>
    </section>
  `;
}

function renderAudit(mode) {
  const referrals = mode === "gp" ? state.referrals : getSpecialtyAuditReferrals();
  const metrics = mode === "gp" ? computeGpMetrics(referrals) : computeSpecialtyMetrics(referrals);
  const insights = mode === "gp" ? computeGpInsights(referrals) : computeSpecialtyInsights(referrals);
  const delayedReferrals = referrals
    .filter((item) => currentWaitMinutes(item) > 30)
    .sort((a, b) => currentWaitMinutes(b) - currentWaitMinutes(a))
    .slice(0, 4);
  const redirectPathways = countBy(
    referrals.filter((item) => hasRedirectHistory(item)).map((item) => [...item.routeHistory, item.pendingTransferSpecialty].filter(Boolean).join(" -> ")),
  );
  const transferDelays = referrals.map(transferDelayMinutes).filter((value) => value !== null);
  const averageTransferDelay = transferDelays.length
    ? Math.round(transferDelays.reduce((sum, value) => sum + value, 0) / transferDelays.length)
    : null;
  const responseMins = referrals.filter((item) => item.firstResponseAt).map((item) => minutesBetween(item.createdAt, item.firstResponseAt));
  const averageResponse = responseMins.length ? Math.round(responseMins.reduce((sum, value) => sum + value, 0) / responseMins.length) : 0;
  const trendTone = averageResponse > 30 ? "alert-text" : averageResponse > 15 ? "watch-text" : "ok-text";
  const title = mode === "gp" ? "GP Audit" : `${state.selectedSpecialty} Audit`;
  const intro =
    mode === "gp"
      ? "Operational view of referral flow, delays, redirects and outcomes."
      : "Operational review of specialty response, onward redirection and delayed referrals.";
  const selector =
    mode === "specialty"
      ? `<div class="page-header-side"><div class="segmented">${SPECIALTIES.map(
          (specialty) => `<button class="segment-button ${state.selectedSpecialty === specialty ? "active" : ""}" data-specialty-select="${specialty}">${specialty}</button>`,
        ).join("")}</div></div>`
      : `<div class="page-header-side"><a class="ghost-button" href="#/gp">Back to GP Dashboard</a></div>`;

  return `
    <div class="page-header page-header-split">
      <div class="page-header-main">
        <span class="eyebrow">${mode === "gp" ? "GP Audit Page" : "Specialty Audit Page"}</span>
        <h1 class="page-title">${title}</h1>
        <p class="page-intro">${intro}</p>
      </div>
      ${selector}
    </div>
    <section class="metrics-grid">
      ${metrics.map(([label, value]) => `<div class="metric-card"><span>${label}</span><strong>${value}</strong></div>`).join("")}
    </section>
    <section class="audit-layout">
      <div class="content-card">
        <div class="section-header">
          <h2 class="section-title">Operational insights</h2>
        </div>
        <div class="insight-grid">
          ${insights.map(([label, value]) => `<div class="insight-item"><strong>${label}</strong><span>${value}</span></div>`).join("")}
        </div>
      </div>
      <div class="timeline-card">
        <div class="section-header">
          <h2 class="section-title">Delay watch</h2>
        </div>
        <div class="alert-card ${trendTone}">
          <strong>Average first response</strong>
          <span>${averageResponse ? `${averageResponse} min` : "No response data"}</span>
        </div>
        <div class="delay-list">
          ${
            delayedReferrals.length
              ? delayedReferrals
                  .map(
                    (referral) => `<div class="delay-item"><strong>${referral.patientName}</strong><span>${referral.currentSpecialty}</span><span class="waiting-pill ${waitingTone(referral)}">${waitingText(referral)}</span></div>`,
                  )
                  .join("")
              : `<span class="muted">No referrals currently over 30 minutes.</span>`
          }
        </div>
      </div>
    </section>
    <section class="audit-layout audit-layout-secondary">
      <div class="content-card">
        <div class="section-header">
          <h2 class="section-title">Wait trends</h2>
        </div>
        <div class="insight-grid">
          <div class="insight-item"><strong>Average wait trend</strong><span>${averageResponse ? `${averageResponse} min first response` : "Insufficient data"}</span></div>
          <div class="insight-item"><strong>Delayed referrals</strong><span>${delayedReferrals.length ? `${delayedReferrals.length} currently over 30 mins` : "No current delay signal"}</span></div>
          <div class="insight-item"><strong>Most redirected specialties</strong><span>${topLabel(countBy(referrals.filter((item) => hasRedirectHistory(item)).map((item) => item.initialSpecialty)))}</span></div>
          <div class="insight-item"><strong>Common redirect pathways</strong><span>${topLabel(redirectPathways)}</span></div>
          <div class="insight-item"><strong>Average transfer acceptance delay</strong><span>${averageTransferDelay !== null ? `${averageTransferDelay} min` : "No accepted transfers yet"}</span></div>
        </div>
      </div>
      <div class="timeline-card">
        <div class="section-header">
          <h2 class="section-title">Governance markers</h2>
        </div>
        <div class="timeline">
          <div class="timeline-item timeline-specialty">
            <span class="timeline-kind">Flow</span>
            <strong>Shared referral state</strong>
            <span class="timeline-meta">GP and specialty teams see the same pathway history.</span>
          </div>
          <div class="timeline-item timeline-redirect">
            <span class="timeline-kind">Redirect</span>
            <strong>Redirect pathways visible</strong>
            <span class="timeline-meta">Misrouted referrals can be tracked rather than lost.</span>
          </div>
          <div class="timeline-item timeline-red-flag">
            <span class="timeline-kind">Escalation</span>
            <strong>Red flag activations recorded</strong>
            <span class="timeline-meta">Immediate attendance pathways are audited as hospital-defined escalation guidance.</span>
          </div>
          <div class="timeline-item timeline-close">
            <span class="timeline-kind">Close</span>
            <strong>Referral closure recorded</strong>
            <span class="timeline-meta">Closed and cancelled referrals now carry an explicit outcome.</span>
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
      <div class="modal-backdrop" data-modal-backdrop="true">
        <div class="modal" role="dialog" aria-modal="true">
          <h3>Add More Information</h3>
          <p>Record further clinical information. The update will be added to the audit trail with the current time.</p>
          <form id="gp-update-form">
            <label class="field full">
              <span class="label">Clinical update</span>
              <textarea name="note" placeholder="e.g. CRP 212. Patient now tachycardic." required autofocus></textarea>
              <span class="helper">This text will be saved to the referral record and audit trail.</span>
            </label>
            <div class="modal-footer">
              <button class="button" type="submit">Save information</button>
              <button class="ghost-button" type="button" data-modal-dismiss="true">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  if (type === "accepted") {
    const acceptingTransfer = isPendingTransfer(referral) && referral.pendingTransferSpecialty === state.selectedSpecialty;
    return modalForm({
      title: acceptingTransfer ? "Accept Transfer" : "Accept for Admission",
      description: acceptingTransfer
        ? "Accept transfer into your specialty. Responsibility will move once this is confirmed."
        : "Record acceptance and optionally add immediate instructions for the next step in the patient pathway.",
      submitLabel: "Confirm outcome",
      fields: `
        <label class="field full">
          <span class="label">Instruction (optional)</span>
          <textarea name="note" placeholder="e.g. Send patient to SAU now."></textarea>
        </label>
        <label class="field full">
          <span class="label">Arrival Instructions</span>
          <textarea name="arrivalInstructions" placeholder="e.g. X-ray pelvis before specialty review. Keep nil by mouth."></textarea>
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
      title: "Refer to Another Specialty",
      description: "Transfer the referral to another specialty while preserving the complete audit trail.",
      submitLabel: "Save referral",
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
        ${renderGuidancePicker("redirect")}
      `,
    });
  }

  if (type === "report") {
    return modalForm({
      title: "Report Issue",
      description: "Record an inconsistency or concern for audit review later. This does not send a message to clinicians.",
      submitLabel: "Save report",
      fields: `
        <label class="field full">
          <span class="label">Issue for audit review</span>
          <textarea name="note" placeholder="e.g. Referral timing inconsistent with switchboard log." required></textarea>
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
        ${renderGuidancePicker("scheduled")}
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
        ${renderGuidancePicker("advice")}
      `,
    });
  }

  if (type === "close") {
    return modalForm({
      title: "Close Referral",
      description: "Record the referral outcome and close the workflow.",
      submitLabel: "Save closure",
      fields: `
        <label class="field full">
          <span class="label">Outcome</span>
          <select name="outcome" required>
            ${CLOSE_OUTCOMES.map((item) => `<option value="${item}">${item}</option>`).join("")}
          </select>
        </label>
        <label class="field full">
          <span class="label">Outcome note (optional)</span>
          <textarea name="note" placeholder="Add any closing detail if needed."></textarea>
        </label>
      `,
    });
  }

  return "";
}

function modalForm({ title, description, fields, submitLabel }) {
  return `
    <div class="modal-backdrop" data-modal-backdrop="true">
      <div class="modal" role="dialog" aria-modal="true">
        <h3>${title}</h3>
        <p>${description}</p>
        <form id="specialty-action-form">
          ${fields}
          <p class="helper">Any text entered here will be saved into the referral record and displayed in the audit trail.</p>
          <div class="modal-footer">
            <button class="button" type="submit">${submitLabel}</button>
            <button class="ghost-button" type="button" data-modal-dismiss="true">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  `;
}

function refreshReferralSupportPanels() {
  const specialtySelect = document.querySelector("#new-referral-specialty");
  const redFlagSection = document.querySelector("#red-flag-criteria-section");
  const guidanceSection = document.querySelector("#guidance-library-section");
  if (!specialtySelect) return;

  const specialty = specialtySelect.value;
  const redFlags = redFlagOptionsFor(specialty);
  if (redFlagSection) {
    redFlagSection.innerHTML = `
      <span class="label">Red Flag Criteria</span>
      ${
        redFlags.length
          ? `
            <div class="choice-list">
              <label class="choice-item"><input type="radio" name="redFlagCriterion" value="" checked /> No red flag selected</label>
              ${redFlags
                .map((item) => `<label class="choice-item"><input type="radio" name="redFlagCriterion" value="${item}" /> ${item}</label>`)
                .join("")}
            </div>
          `
          : `<p class="helper">No specialty-specific red flag escalation criteria loaded for this pathway.</p>`
      }
      <div id="red-flag-preview"></div>
    `;
    bindRedFlagChoiceEvents();
  }

  if (guidanceSection) {
    guidanceSection.innerHTML = `
      <span class="label">Referral Guidance Library</span>
      <div class="guidance-list">
        ${guidanceLibraryFor(specialty).map((item) => `<div class="guidance-item"><span>${item}</span></div>`).join("")}
      </div>
    `;
  }
}

function bindRedFlagChoiceEvents() {
  document.querySelectorAll('input[name="redFlagCriterion"]').forEach((input) => {
    input.addEventListener("change", () => {
      const preview = document.querySelector("#red-flag-preview");
      if (!preview) return;
      if (input.checked && input.value) {
        preview.innerHTML = `
          <div class="red-flag-panel">
            <strong>Red Flag Pathway Activated</strong>
            <span>Patient should attend hospital immediately. Do not wait for specialty response.</span>
          </div>
        `;
      } else {
        preview.innerHTML = "";
      }
    });
  });
}

function renderApp() {
  const path = currentPath();
  const gpReferralMatch = path.match(/^\/gp\/referral\/(.+)$/);
  const specialtyReferralMatch = path.match(/^\/specialty\/referral\/(.+)$/);
  const patientReferralMatch = path.match(/^\/patient\/(.+)$/);
  const edReferralMatch = path.match(/^\/ed\/referral\/(.+)$/);
  let content = "";

  if (path === "/") content = renderHome();
  else if (path === "/gp") content = renderGpDashboard();
  else if (path === "/gp/new") content = renderAddReferral();
  else if (gpReferralMatch) content = renderReferralDetail(findReferral(gpReferralMatch[1]), "gp");
  else if (path === "/specialty") content = renderSpecialtyDashboard();
  else if (specialtyReferralMatch) content = renderReferralDetail(findReferral(specialtyReferralMatch[1]), "specialty");
  else if (path === "/ed") content = renderEdView();
  else if (edReferralMatch) content = renderEdView(edReferralMatch[1]);
  else if (patientReferralMatch) content = renderPatientStatus(findReferral(patientReferralMatch[1]));
  else if (path === "/audit/gp") content = renderAudit("gp");
  else if (path === "/audit/specialty") content = renderAudit("specialty");
  else content = renderHome();

  return `
    <div class="shell">
      ${renderNav(path)}
      ${content}
      <footer class="footer">
        Demo only. No real patient data.
        <br />
        Operational referral coordination demo environment.
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
    row.addEventListener("click", (event) => {
      if (event.target.closest("[data-pathway-toggle]")) return;
      navigate(row.dataset.nav);
    });
  });

  document.querySelectorAll("[data-pathway-toggle]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const referralId = button.dataset.pathwayToggle;
      state.expandedPathways[referralId] = !state.expandedPathways[referralId];
      render();
    });
  });

  document.querySelector("#new-referral-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    handleAddReferral(new FormData(event.currentTarget));
  });

  document.querySelector("#add-demo-patient")?.addEventListener("click", () => {
    const form = document.querySelector("#new-referral-form");
    if (!form) return;
    form.querySelector('[name="patientName"]').value = "Alex Johnson";
    form.querySelector('[name="nhsNumber"]').value = "7284415502";
    form.querySelector('[name="age"]').value = "47";
  });

  document.querySelector("#new-referral-specialty")?.addEventListener("change", (event) => {
    state.newReferralSpecialty = event.currentTarget.value;
    render();
  });

  document.querySelector('[name="referralPathway"]')?.addEventListener("change", (event) => {
    state.newReferralPathway = event.currentTarget.value;
    render();
  });
  bindRedFlagChoiceEvents();

  document.querySelectorAll("[data-gp-update]").forEach((button) => {
    button.addEventListener("click", () => openModal({ type: "gp-update", referralId: button.dataset.gpUpdate }));
  });

  document.querySelectorAll("[data-specialty-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.dataset.specialtyAction;
      const referralId = button.dataset.referralId;
      if (["awaiting-arrival", "arrived"].includes(action)) {
        handleSpecialtyAction(referralId, action, {});
        return;
      }
      openModal({ type: action, referralId });
    });
  });

  document.querySelectorAll("[data-specialty-select]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedSpecialty = button.dataset.specialtySelect;
      render();
    });
  });

  document.querySelectorAll("[data-gp-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      state.gpFilter = button.dataset.gpFilter;
      render();
    });
  });

  document.querySelectorAll("[data-gp-filter-link]").forEach((link) => {
    link.addEventListener("click", () => {
      state.gpFilter = link.dataset.gpFilterLink;
    });
  });

  document.querySelectorAll("[data-gp-close]").forEach((button) => {
    button.addEventListener("click", () => openModal({ type: "close", referralId: button.dataset.gpClose, actorMode: "gp" }));
  });

  document.querySelectorAll(".modal").forEach((element) => {
    element.addEventListener("click", (event) => {
      event.stopPropagation();
    });
    element.addEventListener("mousedown", (event) => {
      event.stopPropagation();
    });
  });

  document.querySelectorAll("[data-modal-dismiss]").forEach((element) => {
    element.addEventListener("click", () => closeModal());
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
      outcome: formData.get("outcome"),
      arrivalInstructions: (formData.get("arrivalInstructions") || "").trim(),
      guidance: formData.getAll("guidance"),
    };

    if (["request-info", "scheduled", "advice", "report"].includes(state.modal.type) && !payload.note) {
      alert("Please complete the required details.");
      return;
    }

    if (state.modal.type === "redirect" && !payload.specialty) {
      alert("Please choose the new specialty.");
      return;
    }

    if (state.modal.type === "close" && !payload.outcome) {
      alert("Please select the closure outcome.");
      return;
    }

    if (state.modal.type === "close") {
      handleCloseReferral(state.modal.referralId, payload, state.modal.actorMode || "specialty");
      return;
    }

    handleSpecialtyAction(state.modal.referralId, state.modal.type, payload);
  });
}

window.addEventListener("hashchange", render);
window.addEventListener("DOMContentLoaded", render);
