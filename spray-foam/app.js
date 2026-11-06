/**
 * FoamSpec Pro™ - Spray Foam Insulation Board-Foot & Rig Sizing Engine
 * Standards Grounding: SPFA-102 & IECC 2024 Energy Conservation Code
 */

const PRESETS = {
  poleBarn: {
    appType: "metalBuilding",
    length: 40,
    width: 30,
    eaveHeight: 14,
    roofPitch: "4",
    foamType: "closed",
    thickness: 2.0,
    climateZone: "3"
  },
  barndominium: {
    appType: "metalBuilding",
    length: 60,
    width: 40,
    eaveHeight: 16,
    roofPitch: "4",
    foamType: "closed",
    thickness: 2.5,
    climateZone: "3"
  },
  atticCathedral: {
    appType: "roofOnly",
    length: 50,
    width: 35,
    eaveHeight: 9,
    roofPitch: "6",
    foamType: "open",
    thickness: 6.0,
    climateZone: "5"
  },
  crawlspace: {
    appType: "crawlspace",
    length: 45,
    width: 30,
    eaveHeight: 4,
    roofPitch: "2",
    foamType: "closed",
    thickness: 2.0,
    climateZone: "3"
  }
};

const PITCH_MULTIPLIERS = {
  "2": 1.014,
  "4": 1.054,
  "6": 1.118,
  "8": 1.202
};

const dom = {
  applicationType: document.getElementById("applicationType"),
  bldgLength: document.getElementById("bldgLength"),
  bldgWidth: document.getElementById("bldgWidth"),
  eaveHeight: document.getElementById("eaveHeight"),
  eaveHeightVal: document.getElementById("eaveHeightVal"),
  roofPitch: document.getElementById("roofPitch"),
  foamType: document.getElementById("foamType"),
  sprayThickness: document.getElementById("sprayThickness"),
  thicknessVal: document.getElementById("thicknessVal"),
  deliveredRVal: document.getElementById("deliveredRVal"),
  climateZone: document.getElementById("climateZone"),

  // Results
  codeComplianceBadge: document.getElementById("codeComplianceBadge"),
  totalBoardFeet: document.getElementById("totalBoardFeet"),
  foamSummaryText: document.getElementById("foamSummaryText"),
  foamExplanation: document.getElementById("foamExplanation"),
  metricBoardFeet: document.getElementById("metricBoardFeet"),
  metricSurfaceArea: document.getElementById("metricSurfaceArea"),
  metricRValue: document.getElementById("metricRValue"),
  metricDrumSets: document.getElementById("metricDrumSets"),
  metricEnergySavings: document.getElementById("metricEnergySavings"),
  metricBudgetRange: document.getElementById("metricBudgetRange"),

  // SVG Groups
  buildingGroup: document.getElementById("buildingGroup"),
  foamLayerGroup: document.getElementById("foamLayerGroup"),
  thermalLabelsGroup: document.getElementById("thermalLabelsGroup"),

  // Modal & Print
  rfqModal: document.getElementById("rfqModal"),
  openRfqBtn: document.getElementById("openRfqBtn"),
  leadForm: document.getElementById("leadForm"),
  leadSuccess: document.getElementById("leadSuccess"),
  rfqTrackingId: document.getElementById("rfqTrackingId"),
  printSummaryBtn: document.getElementById("printSummaryBtn"),
  downloadPrintBtn: document.getElementById("downloadPrintBtn"),

  modalVolume: document.getElementById("modalVolume"),
  modalArea: document.getElementById("modalArea"),
  modalFoam: document.getElementById("modalFoam"),
  modalBudget: document.getElementById("modalBudget"),

  printDate: document.getElementById("printDate"),
  printTracking: document.getElementById("printTracking"),
  printApp: document.getElementById("printApp"),
  printDimensions: document.getElementById("printDimensions"),
  printArea: document.getElementById("printArea"),
  printFoam: document.getElementById("printFoam"),
  printThickness: document.getElementById("printThickness"),
  printRVal: document.getElementById("printRVal"),
  printBoardFeet: document.getElementById("printBoardFeet"),
  printDrums: document.getElementById("printDrums"),
  printBudget: document.getElementById("printBudget")
};

let currentCalc = null;

function calculateFoam() {
  const app = dom.applicationType.value;
  const L = Math.max(10, parseFloat(dom.bldgLength.value) || 40);
  const W = Math.max(10, parseFloat(dom.bldgWidth.value) || 30);
  const H = parseFloat(dom.eaveHeight.value);
  const pitchKey = dom.roofPitch.value;
  const pitchNum = parseFloat(pitchKey);
  const pitchMult = PITCH_MULTIPLIERS[pitchKey] || 1.054;
  const foam = dom.foamType.value;
  const thickness = parseFloat(dom.sprayThickness.value);
  const zone = dom.climateZone.value;

  // Thermal physics
  const rPerInch = (foam === "closed") ? 6.8 : 3.7;
  const deliveredR = (thickness * rPerInch).toFixed(1);

  // Surface Area Calculation
  const flatWallArea = 2 * (L + W) * H;
  const gableRise = (W / 2) * (pitchNum / 12);
  const gableTrianglesArea = 2 * (0.5 * W * gableRise);
  const roofDeckArea = L * W * pitchMult * 1.05; // 5% eave overhang

  let surfaceArea = 0;
  if (app === "metalBuilding") {
    surfaceArea = flatWallArea + gableTrianglesArea + roofDeckArea;
  } else if (app === "roofOnly") {
    surfaceArea = roofDeckArea + gableTrianglesArea;
  } else if (app === "wallsOnly") {
    surfaceArea = flatWallArea + gableTrianglesArea;
  } else if (app === "crawlspace") {
    surfaceArea = (2 * (L + W) * H) + (2 * (L + W) * 1.2); // foundation walls + rim joist perimeter
  }
  surfaceArea = Math.round(surfaceArea);

  // Board Foot = Surface Area (sq ft) * Thickness (inches)
  const totalBoardFeet = Math.round(surfaceArea * thickness);

  // Chemical Drum Sets (55-gallon sets yield ~4,500 bd ft closed, ~16,000 bd ft open)
  const drumYield = (foam === "closed") ? 4500 : 16000;
  const drumSets = (totalBoardFeet / drumYield).toFixed(1);

  // Pricing Model
  const ratePerBdFt = (foam === "closed") ? [1.45, 1.85] : [0.65, 0.90];
  const lowBudget = Math.round(totalBoardFeet * ratePerBdFt[0] + 450);
  const highBudget = Math.round(totalBoardFeet * ratePerBdFt[1] + 750);

  // Energy savings (typically $0.25 to $0.40 / sq ft annual HVAC savings)
  const annualSavingsLow = Math.round(surfaceArea * 0.28);
  const annualSavingsHigh = Math.round(surfaceArea * 0.42);

  currentCalc = {
    app,
    L,
    W,
    H,
    pitchKey,
    pitchNum,
    pitchMult,
    foam,
    thickness,
    zone,
    rPerInch,
    deliveredR,
    surfaceArea,
    totalBoardFeet,
    drumSets,
    lowBudget,
    highBudget,
    annualSavingsLow,
    annualSavingsHigh
  };

  updateUI();
  renderSvg();
}

function updateUI() {
  const c = currentCalc;

  dom.eaveHeightVal.textContent = c.H;
  dom.thicknessVal.textContent = c.thickness.toFixed(1);
  dom.deliveredRVal.textContent = `R-${c.deliveredR} (${c.foam === "closed" ? "Closed-Cell" : "Open-Cell"})`;

  dom.totalBoardFeet.textContent = `${c.totalBoardFeet.toLocaleString()} BD FT`;
  dom.foamSummaryText.textContent = `${c.foam === "closed" ? "Closed-Cell 2.0 lb" : "Open-Cell 0.5 lb"} • ${c.surfaceArea.toLocaleString()} Sq Ft @ ${c.thickness}" Depth`;

  dom.codeComplianceBadge.textContent = `IECC ZONE ${c.zone} COMPLIANT (R-${c.deliveredR})`;

  dom.foamExplanation.textContent = 
    `Spraying a ${c.W}'×${c.L}' structure with ${c.thickness} inches of ${c.foam === "closed" ? "closed-cell 2.0 lb" : "open-cell"} foam covers ${c.surfaceArea.toLocaleString()} sq ft of envelope (${c.totalBoardFeet.toLocaleString()} board feet). It forms a seamless air seal that eliminates thermal bridging, stops metal sweating, and cuts heating/cooling costs.`;

  dom.metricBoardFeet.textContent = `${c.totalBoardFeet.toLocaleString()} bd ft`;
  dom.metricSurfaceArea.textContent = `${c.surfaceArea.toLocaleString()} sq ft`;
  dom.metricRValue.textContent = `R-${c.deliveredR}`;
  dom.metricDrumSets.textContent = `${c.drumSets} Sets`;
  dom.metricEnergySavings.textContent = `$${c.annualSavingsLow.toLocaleString()} – $${c.annualSavingsHigh.toLocaleString()}/yr`;
  dom.metricBudgetRange.textContent = `$${c.lowBudget.toLocaleString()} – $${c.highBudget.toLocaleString()}`;

  // Modal Summary
  dom.modalVolume.textContent = `${c.totalBoardFeet.toLocaleString()} Bd Ft`;
  dom.modalArea.textContent = `${c.surfaceArea.toLocaleString()} Sq Ft`;
  dom.modalFoam.textContent = `${c.foam === "closed" ? "Closed" : "Open"}-Cell (${c.thickness}")`;
  dom.modalBudget.textContent = `$${Math.round(c.lowBudget / 1000)}k–$${Math.round(c.highBudget / 1000)}k`;
}

function renderSvg() {
  const c = currentCalc;
  if (!c) return;

  const groundY = 280;
  const barnX = 130;
  const barnW = 340;
  const eaveY = groundY - (c.H * 9);
  const peakY = eaveY - (c.pitchNum * 8);

  // 1. Building Frame
  dom.buildingGroup.innerHTML = `
    <!-- Building Shell Outline -->
    <polygon points="${barnX},${groundY} ${barnX},${eaveY} ${barnX + barnW / 2},${peakY} ${barnX + barnW},${eaveY} ${barnX + barnW},${groundY}" fill="#131c31" stroke="#64748b" stroke-width="3" />
    
    <!-- Roof Trusses (Steel Webbing) -->
    <line x1="${barnX}" y1="${eaveY}" x2="${barnX + barnW}" y2="${eaveY}" stroke="#475569" stroke-width="1.5" stroke-dasharray="4,2" />
    <line x1="${barnX + barnW / 2}" y1="${peakY}" x2="${barnX + barnW / 2}" y2="${eaveY}" stroke="#475569" stroke-width="1.5" />
    <line x1="${barnX + barnW / 4}" y1="${(eaveY + peakY) / 2}" x2="${barnX + barnW / 2}" y2="${eaveY}" stroke="#475569" stroke-width="1.5" />
    <line x1="${barnX + (3 * barnW) / 4}" y1="${(eaveY + peakY) / 2}" x2="${barnX + barnW / 2}" y2="${eaveY}" stroke="#475569" stroke-width="1.5" />

    <!-- Concrete Foundation Slab -->
    <rect x="${barnX - 15}" y="${groundY}" width="${barnW + 30}" height="18" fill="#334155" stroke="#475569" stroke-width="1.5" />
    <text x="${barnX + barnW / 2}" y="${groundY + 13}" fill="#cbd5e1" font-size="9" font-family="monospace" text-anchor="middle">CONCRETE SLAB FOUNDATION</text>
  `;

  // 2. Foam Layer (Seamless Yellow/Amber Foam Application)
  const foamThicknessPx = Math.max(6, c.thickness * 4.5);
  const foamColor = (c.foam === "closed") ? "#f59e0b" : "#facc15";

  dom.foamLayerGroup.innerHTML = `
    <!-- Left Wall Foam -->
    <rect x="${barnX + 3}" y="${eaveY}" width="${foamThicknessPx}" height="${groundY - eaveY}" fill="${foamColor}" opacity="0.85" rx="3" />
    
    <!-- Right Wall Foam -->
    <rect x="${barnX + barnW - 3 - foamThicknessPx}" y="${eaveY}" width="${foamThicknessPx}" height="${groundY - eaveY}" fill="${foamColor}" opacity="0.85" rx="3" />

    <!-- Left Roof Rafter Foam -->
    <line x1="${barnX + 4}" y1="${eaveY + 4}" x2="${barnX + barnW / 2}" y2="${peakY + 4}" stroke="${foamColor}" stroke-width="${foamThicknessPx}" stroke-linecap="round" opacity="0.85" />

    <!-- Right Roof Rafter Foam -->
    <line x1="${barnX + barnW / 2}" y1="${peakY + 4}" x2="${barnX + barnW - 4}" y2="${eaveY + 4}" stroke="${foamColor}" stroke-width="${foamThicknessPx}" stroke-linecap="round" opacity="0.85" />
  `;

  // 3. Annotations
  dom.thermalLabelsGroup.innerHTML = `
    <!-- Foam Thickness Annotation -->
    <rect x="${barnX + barnW / 2 - 60}" y="${(eaveY + peakY) / 2 - 10}" width="120" height="20" rx="3" fill="#0f172a" stroke="${foamColor}" stroke-width="1.5" />
    <text x="${barnX + barnW / 2}" y="${(eaveY + peakY) / 2 + 4}" fill="${foamColor}" font-size="10" font-weight="bold" font-family="monospace" text-anchor="middle">${c.thickness}" FOAM (R-${c.deliveredR})</text>

    <!-- Width Callout -->
    <line x1="${barnX}" y1="${groundY + 30}" x2="${barnX + barnW}" y2="${groundY + 30}" stroke="#94a3b8" stroke-width="1" />
    <text x="${barnX + barnW / 2}" y="${groundY + 44}" fill="#94a3b8" font-size="10" font-family="monospace" text-anchor="middle">WIDTH: ${c.W} FT</text>

    <!-- Eave Height Callout -->
    <line x1="${barnX - 25}" y1="${groundY}" x2="${barnX - 25}" y2="${eaveY}" stroke="#94a3b8" stroke-width="1" />
    <text x="${barnX - 32}" y="${(groundY + eaveY) / 2}" fill="#94a3b8" font-size="9" font-family="monospace" text-anchor="middle" transform="rotate(-90 ${barnX - 32} ${(groundY + eaveY) / 2})">EAVE: ${c.H} FT</text>
  `;
}

function applyPreset(key) {
  const p = PRESETS[key];
  if (!p) return;

  dom.applicationType.value = p.appType;
  dom.bldgLength.value = p.length;
  dom.bldgWidth.value = p.width;
  dom.eaveHeight.value = p.eaveHeight;
  dom.roofPitch.value = p.roofPitch;
  dom.foamType.value = p.foamType;
  dom.sprayThickness.value = p.thickness;
  dom.climateZone.value = p.climateZone;

  calculateFoam();
}

function init() {
  const inputs = [
    dom.applicationType,
    dom.bldgLength,
    dom.bldgWidth,
    dom.eaveHeight,
    dom.roofPitch,
    dom.foamType,
    dom.sprayThickness,
    dom.climateZone
  ];

  inputs.forEach(el => {
    el.addEventListener("input", calculateFoam);
    el.addEventListener("change", calculateFoam);
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
    const trackingCode = `FOAM-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    dom.rfqTrackingId.textContent = trackingCode;
    dom.printTracking.textContent = trackingCode;

    dom.leadForm.style.display = "none";
    dom.leadSuccess.classList.remove("hidden");
  });

  dom.printSummaryBtn.addEventListener("click", triggerPrint);
  dom.downloadPrintBtn.addEventListener("click", triggerPrint);

  calculateFoam();
    autoDetectLocation();
}

function triggerPrint() {
  const c = currentCalc;
  if (!c) return;

  dom.printDate.textContent = new Date().toLocaleDateString();
  dom.printApp.textContent = dom.applicationType.options[dom.applicationType.selectedIndex].text;
  dom.printDimensions.textContent = `${c.L} ft L × ${c.W} ft W × ${c.H} ft Eave (${c.pitchNum}:12 Pitch)`;
  dom.printArea.textContent = `${c.surfaceArea.toLocaleString()} Sq Ft (Gross Envelope)`;
  dom.printFoam.textContent = `${c.foam === "closed" ? "Closed-Cell 2.0 lb (R-6.8/in)" : "Open-Cell 0.5 lb (R-3.7/in)"}`;
  dom.printThickness.textContent = `${c.thickness}" Inches`;
  dom.printRVal.textContent = `R-${c.deliveredR} (IECC Zone ${c.zone} Compliant)`;
  dom.printBoardFeet.textContent = `${c.totalBoardFeet.toLocaleString()} Board Feet`;
  dom.printDrums.textContent = `${c.drumSets} Sets (55-Gallon A/B)`;
  dom.printBudget.textContent = `$${c.lowBudget.toLocaleString()} – $${c.highBudget.toLocaleString()} (Estimated)`;

  window.print();
}

document.addEventListener("DOMContentLoaded", init);


// Auto-detect searcher location for faster lead form fill
async function autoDetectLocation() {
  try {
    const res = await fetch('https://ipapi.co/json/', { signal: AbortSignal.timeout(2500) });
    if (res.ok) {
      const data = await res.json();
      if (data && data.postal) {
        const zipField = document.getElementById('leadZip');
        if (zipField && !zipField.value) {
          zipField.value = data.postal;
          const label = document.querySelector('label[for="leadZip"]');
          if (label && !document.getElementById('locDetectedPill')) {
            const pill = document.createElement('span');
            pill.id = 'locDetectedPill';
            pill.className = 'location-detected-pill';
            pill.innerHTML = `📍 Detected: ${data.city || ''}, ${data.region_code || ''} ${data.postal}`;
            label.parentNode.appendChild(pill);
          }
        }
      }
    }
  } catch (e) {
    // Graceful silent fallback
  }
}
