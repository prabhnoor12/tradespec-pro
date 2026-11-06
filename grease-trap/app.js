/**
 * FOGSpec Pro™ - Commercial Grease Trap & Kitchen Hood Sizing Engine
 * Standards Grounding: Uniform Plumbing Code (UPC Ch 10) & NFPA 96
 */

const PRESETS = {
  casualDine: {
    sinkBowlSize: "18",
    prepSinks: 2,
    dishwasherType: "door",
    applianceDuty: "heavy",
    hoodLength: 10,
    trapLocation: "indoorFloor"
  },
  coffeeShop: {
    sinkBowlSize: "16",
    prepSinks: 1,
    dishwasherType: "undercounter",
    applianceDuty: "light",
    hoodLength: 6,
    trapLocation: "indoorFloor"
  },
  fullService: {
    sinkBowlSize: "24",
    prepSinks: 4,
    dishwasherType: "conveyor",
    applianceDuty: "heavy",
    hoodLength: 16,
    trapLocation: "outdoorVault"
  },
  ghostKitchen: {
    sinkBowlSize: "24",
    prepSinks: 3,
    dishwasherType: "door",
    applianceDuty: "extraHeavy",
    hoodLength: 14,
    trapLocation: "indoorRecessed"
  }
};

const SINK_VOLUMES = {
  "16": 49.8,
  "18": 58.9,
  "24": 104.7
};

const DISH_FLOWS = {
  door: 15,
  conveyor: 25,
  undercounter: 8,
  none: 0
};

const HOOD_DUTIES = {
  light: { name: "Light-Duty (Ovens/Steamers)", cfmPerFt: 225 },
  medium: { name: "Medium-Duty (Fryers/Griddles)", cfmPerFt: 300 },
  heavy: { name: "Heavy-Duty (Charbroiler/Wok)", cfmPerFt: 400 },
  extraHeavy: { name: "Extra Heavy-Duty (Wood/Solid Fuel)", cfmPerFt: 550 }
};

const dom = {
  sinkBowlSize: document.getElementById("sinkBowlSize"),
  prepSinks: document.getElementById("prepSinks"),
  dishwasherType: document.getElementById("dishwasherType"),
  applianceDuty: document.getElementById("applianceDuty"),
  hoodLength: document.getElementById("hoodLength"),
  hoodLengthVal: document.getElementById("hoodLengthVal"),
  trapLocation: document.getElementById("trapLocation"),

  // Results
  complianceBadge: document.getElementById("complianceBadge"),
  recommendedTrapRating: document.getElementById("recommendedTrapRating"),
  systemSummaryText: document.getElementById("systemSummaryText"),
  systemExplanation: document.getElementById("systemExplanation"),
  metricTrapGPM: document.getElementById("metricTrapGPM"),
  metricGreaseCap: document.getElementById("metricGreaseCap"),
  metricHoodCFM: document.getElementById("metricHoodCFM"),
  metricMUA: document.getElementById("metricMUA"),
  metricPumpFreq: document.getElementById("metricPumpFreq"),
  metricTurnkeyBudget: document.getElementById("metricTurnkeyBudget"),

  // SVG Groups
  equipmentGroup: document.getElementById("equipmentGroup"),
  trapGroup: document.getElementById("trapGroup"),
  ductworkGroup: document.getElementById("ductworkGroup"),

  // Modal & Print
  rfqModal: document.getElementById("rfqModal"),
  openRfqBtn: document.getElementById("openRfqBtn"),
  leadForm: document.getElementById("leadForm"),
  leadSuccess: document.getElementById("leadSuccess"),
  rfqTrackingId: document.getElementById("rfqTrackingId"),
  printSummaryBtn: document.getElementById("printSummaryBtn"),
  downloadPrintBtn: document.getElementById("downloadPrintBtn"),

  modalTrap: document.getElementById("modalTrap"),
  modalCFM: document.getElementById("modalCFM"),
  modalDuty: document.getElementById("modalDuty"),
  modalBudget: document.getElementById("modalBudget"),

  printDate: document.getElementById("printDate"),
  printTracking: document.getElementById("printTracking"),
  printSink: document.getElementById("printSink"),
  printDischarge: document.getElementById("printDischarge"),
  printTrapRating: document.getElementById("printTrapRating"),
  printTrapLoc: document.getElementById("printTrapLoc"),
  printDuty: document.getElementById("printDuty"),
  printHoodLen: document.getElementById("printHoodLen"),
  printCFM: document.getElementById("printCFM"),
  printMUA: document.getElementById("printMUA"),
  printBudget: document.getElementById("printBudget")
};

let currentCalc = null;

function calculateFOG() {
  const bowlKey = dom.sinkBowlSize.value;
  const prepCount = parseInt(dom.prepSinks.value, 10) || 2;
  const dishKey = dom.dishwasherType.value;
  const dutyKey = dom.applianceDuty.value;
  const hoodLen = parseFloat(dom.hoodLength.value);
  const locKey = dom.trapLocation.value;

  // 1. Grease Interceptor Sizing (UPC Chapter 10)
  const sinkGallons = SINK_VOLUMES[bowlKey] || 58.9;
  const sinkPeakGPM = Math.round((sinkGallons * 0.75) / 1.5); // 75% fill factor drained in 1.5 min
  const dishGPM = DISH_FLOWS[dishKey] || 15;
  const prepGPM = prepCount * 3.5;
  const totalFlowGPM = sinkPeakGPM + dishGPM + prepGPM;

  let trapGPM = 50;
  let greaseLbs = 100;
  let trapRatingText = "50 GPM / 100 LBS";

  if (locKey === "outdoorVault") {
    trapRatingText = "1,000 Gallon Gravity Interceptor";
    trapGPM = 100;
    greaseLbs = 2000;
  } else {
    if (totalFlowGPM <= 22) {
      trapGPM = 25;
      greaseLbs = 50;
      trapRatingText = "25 GPM / 50 LBS";
    } else if (totalFlowGPM <= 35) {
      trapGPM = 35;
      greaseLbs = 70;
      trapRatingText = "35 GPM / 70 LBS";
    } else if (totalFlowGPM <= 52) {
      trapGPM = 50;
      greaseLbs = 100;
      trapRatingText = "50 GPM / 100 LBS";
    } else if (totalFlowGPM <= 75) {
      trapGPM = 75;
      greaseLbs = 150;
      trapRatingText = "75 GPM / 150 LBS";
    } else {
      trapGPM = 100;
      greaseLbs = 200;
      trapRatingText = "100 GPM / 200 LBS";
    }
  }

  // 2. Kitchen Exhaust Hood CFM (NFPA 96 & IMC Chapter 5)
  const duty = HOOD_DUTIES[dutyKey];
  const exhaustCFM = Math.round(hoodLen * duty.cfmPerFt);
  const muaCFM = Math.round(exhaustCFM * 0.85); // 85% tempered make-up air

  // 3. Turnkey Budget Estimation
  let trapCost = 2800;
  if (locKey === "indoorRecessed") trapCost = 5400;
  if (locKey === "outdoorVault") trapCost = 12500;

  // Hood Package: canopy ($450/ft) + upblast exhaust fan ($1,850) + tempered MUA unit ($3,400) + Ansul R-102 fire system ($2,850) + ductwork/plumbing labor
  const hoodCost = Math.round(hoodLen * 450) + 1850 + 3400 + 2850 + 2400;

  const totalLow = Math.round((trapCost + hoodCost) * 0.95);
  const totalHigh = Math.round((trapCost + hoodCost) * 1.15);

  const pumpFreq = (locKey === "outdoorVault") ? "Every 90 Days" : "Every 30–60 Days";

  currentCalc = {
    bowlKey,
    prepCount,
    dishKey,
    dutyKey,
    duty,
    hoodLen,
    locKey,
    totalFlowGPM,
    trapGPM,
    greaseLbs,
    trapRatingText,
    exhaustCFM,
    muaCFM,
    pumpFreq,
    totalLow,
    totalHigh
  };

  updateUI();
  renderSvg();
}

function updateUI() {
  const c = currentCalc;

  dom.hoodLengthVal.textContent = c.hoodLen;

  dom.recommendedTrapRating.textContent = c.trapRatingText;
  dom.systemSummaryText.textContent = `${c.exhaustCFM.toLocaleString()} CFM Type I Hood • ${c.muaCFM.toLocaleString()} CFM Make-Up Air`;

  dom.systemExplanation.textContent = 
    `Kitchen fixtures generate a combined ${c.totalFlowGPM} GPM peak drainage surge, requiring a ${c.trapRatingText}. The ${c.hoodLen}-ft ${c.duty.name} line mandates ${c.exhaustCFM.toLocaleString()} CFM exhaust airflow with an 85% tempered make-up air supply (${c.muaCFM.toLocaleString()} CFM) to satisfy NFPA 96 fire safety codes.`;

  dom.metricTrapGPM.textContent = `${c.trapGPM} GPM`;
  dom.metricGreaseCap.textContent = `${c.greaseLbs.toLocaleString()} lbs`;
  dom.metricHoodCFM.textContent = `${c.exhaustCFM.toLocaleString()} CFM`;
  dom.metricMUA.textContent = `${c.muaCFM.toLocaleString()} CFM`;
  dom.metricPumpFreq.textContent = c.pumpFreq;
  dom.metricTurnkeyBudget.textContent = `$${c.totalLow.toLocaleString()} – $${c.totalHigh.toLocaleString()}`;

  // Modal Summary
  dom.modalTrap.textContent = c.trapRatingText;
  dom.modalCFM.textContent = `${c.exhaustCFM.toLocaleString()} CFM`;
  dom.modalDuty.textContent = c.duty.name.split(" ")[0];
  dom.modalBudget.textContent = `$${Math.round(c.totalLow / 1000)}k–$${Math.round(c.totalHigh / 1000)}k`;
}

function renderSvg() {
  const c = currentCalc;
  if (!c) return;

  const groundY = 270;
  const sinkX = 70;
  const hoodX = 260;
  const hoodW = Math.max(160, c.hoodLen * 18);
  const trapX = 110;

  // 1. Kitchen Equipment (Sink & Cooking Range)
  dom.equipmentGroup.innerHTML = `
    <!-- 3-Compartment Stainless Steel Sink -->
    <rect x="${sinkX}" y="${groundY - 55}" width="110" height="35" fill="#475569" stroke="#94a3b8" stroke-width="1.5" />
    <!-- Sink Legs -->
    <line x1="${sinkX + 10}" y1="${groundY - 20}" x2="${sinkX + 10}" y2="${groundY}" stroke="#94a3b8" stroke-width="2" />
    <line x1="${sinkX + 100}" y1="${groundY - 20}" x2="${sinkX + 100}" y2="${groundY}" stroke="#94a3b8" stroke-width="2" />
    <!-- Faucet Gooseneck -->
    <path d="M ${sinkX + 55} ${groundY - 55} L ${sinkX + 55} ${groundY - 78} A 8 8 0 0 1 ${sinkX + 71} ${groundY - 78} L ${sinkX + 71} ${groundY - 65}" fill="none" stroke="#cbd5e1" stroke-width="2" />
    <text x="${sinkX + 55}" y="${groundY - 32}" fill="#cbd5e1" font-size="8" font-family="monospace" text-anchor="middle">3-COMP SINK</text>

    <!-- Commercial Cooking Line (Fryers & Charbroiler) -->
    <rect x="${hoodX}" y="${groundY - 55}" width="${hoodW}" height="55" fill="#334155" stroke="#64748b" stroke-width="1.5" />
    <text x="${hoodX + hoodW / 2}" y="${groundY - 25}" fill="#cbd5e1" font-size="9" font-family="monospace" text-anchor="middle">COOKING RANGE (${c.duty.name.split(" ")[0]})</text>
  `;

  // 2. Stainless Steel Type I Hood & Exhaust Duct
  const hoodY = groundY - 140;
  dom.ductworkGroup.innerHTML = `
    <!-- Type I Stainless Steel Canopy Hood -->
    <polygon points="${hoodX - 10},${hoodY + 25} ${hoodX - 5},${hoodY} ${hoodX + hoodW + 5},${hoodY} ${hoodX + hoodW + 10},${hoodY + 25}" fill="#64748b" stroke="#cbd5e1" stroke-width="2" />
    <!-- Baffle Filters in Hood -->
    <line x1="${hoodX + 10}" y1="${hoodY + 20}" x2="${hoodX + hoodW - 10}" y2="${hoodY + 20}" stroke="#facc15" stroke-width="3" stroke-dasharray="6,3" />
    <text x="${hoodX + hoodW / 2}" y="${hoodY + 14}" fill="#f8fafc" font-size="9" font-weight="bold" font-family="monospace" text-anchor="middle">TYPE I HOOD (${c.exhaustCFM.toLocaleString()} CFM)</text>

    <!-- Upblast Exhaust Duct to Roof -->
    <rect x="${hoodX + hoodW / 2 - 16}" y="20" width="32" height="${hoodY - 20}" fill="#475569" stroke="#94a3b8" stroke-width="1.5" />
    <!-- Centrifugal Upblast Fan on Roof -->
    <rect x="${hoodX + hoodW / 2 - 28}" y="8" width="56" height="18" rx="3" fill="#0284c7" stroke="#38bdf8" stroke-width="1.5" />
    <text x="${hoodX + hoodW / 2}" y="21" fill="#ffffff" font-size="8" font-weight="bold" text-anchor="middle">EXHAUST FAN</text>

    <!-- Make-Up Air Supply Duct (Blue) -->
    <path d="M ${hoodX + 15} 20 L ${hoodX + 15} ${hoodY} L ${hoodX + 5} ${hoodY + 15}" fill="none" stroke="#38bdf8" stroke-width="2.5" />
    <text x="${hoodX - 18}" y="${hoodY - 20}" fill="#38bdf8" font-size="8" font-weight="bold">MUA 85%</text>
  `;

  // 3. Grease Trap Interceptor & Drainage Pipes
  const trapY = groundY + 20;
  dom.trapGroup.innerHTML = `
    <!-- Drain Pipe from Sink -->
    <path d="M ${sinkX + 55} ${groundY - 20} L ${sinkX + 55} ${trapY + 15} L ${trapX} ${trapY + 15}" fill="none" stroke="#cbd5e1" stroke-width="3" />

    <!-- Grease Interceptor Tank -->
    <rect x="${trapX}" y="${trapY}" width="95" height="50" rx="3" fill="#1e293b" stroke="#d97706" stroke-width="2" />
    <!-- Baffle Plate inside Trap -->
    <line x1="${trapX + 45}" y1="${trapY + 6}" x2="${trapX + 45}" y2="${trapY + 38}" stroke="#94a3b8" stroke-width="2" />
    <!-- Grease Layer (Yellow floating FOG) -->
    <rect x="${trapX + 2}" y="${trapY + 2}" width="91" height="12" fill="#facc15" opacity="0.85" />
    <text x="${trapX + 47}" y="${trapY + 10}" fill="#78350f" font-size="7" font-weight="bold" text-anchor="middle">GREASE LAYER</text>

    <!-- Clean Effluent to Sewer -->
    <path d="M ${trapX + 95} ${trapY + 35} L ${trapX + 130} ${trapY + 35} L ${trapX + 130} 345" fill="none" stroke="#38bdf8" stroke-width="3" />
    <text x="${trapX + 47}" y="${trapY + 45}" fill="#f8fafc" font-size="8" font-weight="bold" text-anchor="middle">${c.trapRatingText.split("/")[0]}</text>
  `;
}

function applyPreset(key) {
  const p = PRESETS[key];
  if (!p) return;

  dom.sinkBowlSize.value = p.sinkBowlSize;
  dom.prepSinks.value = p.prepSinks;
  dom.dishwasherType.value = p.dishwasherType;
  dom.applianceDuty.value = p.applianceDuty;
  dom.hoodLength.value = p.hoodLength;
  dom.trapLocation.value = p.trapLocation;

  calculateFOG();
}

function init() {
  const inputs = [
    dom.sinkBowlSize,
    dom.prepSinks,
    dom.dishwasherType,
    dom.applianceDuty,
    dom.hoodLength,
    dom.trapLocation
  ];

  inputs.forEach(el => {
    el.addEventListener("input", calculateFOG);
    el.addEventListener("change", calculateFOG);
  });

  document.querySelectorAll(".preset-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".preset-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      applyPreset(btn.dataset.preset);
    });
  });

  dom.openRfqBtn.addEventListener("click", () => {
    dom.leadSuccess.classList.add("hidden");
    dom.leadForm.style.display = "block";
    dom.rfqModal.showModal();
  });

  // Light dismiss fallback per modern-web-guidance
  if (!('closedBy' in HTMLDialogElement.prototype)) {
    dom.rfqModal.addEventListener("click", (event) => {
      if (event.target !== dom.rfqModal) return;
      const rect = dom.rfqModal.getBoundingClientRect();
      const isInside = (
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width
      );
      if (!isInside) dom.rfqModal.close();
    });
  }

  dom.leadForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const trackingCode = `FOG-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    dom.rfqTrackingId.textContent = trackingCode;
    dom.printTracking.textContent = trackingCode;

    dom.leadForm.style.display = "none";
    dom.leadSuccess.classList.remove("hidden");
  });

  dom.printSummaryBtn.addEventListener("click", triggerPrint);
  dom.downloadPrintBtn.addEventListener("click", triggerPrint);

  calculateFOG();
}

function triggerPrint() {
  const c = currentCalc;
  if (!c) return;

  dom.printDate.textContent = new Date().toLocaleDateString();
  dom.printSink.textContent = dom.sinkBowlSize.options[dom.sinkBowlSize.selectedIndex].text.split("(")[0];
  dom.printDischarge.textContent = `${dom.dishwasherType.options[dom.dishwasherType.selectedIndex].text} + ${c.prepCount} Prep Sinks`;
  dom.printTrapRating.textContent = c.trapRatingText;
  dom.printTrapLoc.textContent = dom.trapLocation.options[dom.trapLocation.selectedIndex].text.split("(")[0];
  dom.printDuty.textContent = c.duty.name;
  dom.printHoodLen.textContent = `${c.hoodLen} Ft Type I Wall Canopy`;
  dom.printCFM.textContent = `${c.exhaustCFM.toLocaleString()} CFM Exhaust Airflow`;
  dom.printMUA.textContent = `${c.muaCFM.toLocaleString()} CFM Tempered Supply Air (85%)`;
  dom.printBudget.textContent = `$${c.totalLow.toLocaleString()} – $${c.totalHigh.toLocaleString()} (Estimated)`;

  window.print();
}

document.addEventListener("DOMContentLoaded", init);
