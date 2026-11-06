/**
 * RackSpec Pro™ - Warehouse Pallet Racking & Aisle Sizing Engine
 * Standards Grounding: ANSI/RMI MH16.1 & OSHA 1910.176
 */

const PRESETS = {
  flexSpace: {
    length: 120,
    width: 80,
    clearHeight: 24,
    forkliftType: "reach",
    palletHeight: 54,
    palletWeight: 2000,
    bayConfig: "96",
    deckingType: "wireMesh"
  },
  standard3pl: {
    length: 200,
    width: 125,
    clearHeight: 28,
    forkliftType: "counterbalance",
    palletHeight: 60,
    palletWeight: 2200,
    bayConfig: "96",
    deckingType: "wireMesh"
  },
  vnaHighDensity: {
    length: 180,
    width: 100,
    clearHeight: 36,
    forkliftType: "vna",
    palletHeight: 50,
    palletWeight: 2000,
    bayConfig: "96",
    deckingType: "heavyDuty"
  },
  smallShop: {
    length: 80,
    width: 50,
    clearHeight: 18,
    forkliftType: "counterbalance",
    palletHeight: 48,
    palletWeight: 1500,
    bayConfig: "96",
    deckingType: "palletSupports"
  }
};

const FORKLIFTS = {
  counterbalance: { name: "Sit-Down Counterbalance", aisleWidth: 13.0 },
  reach: { name: "Narrow Aisle Reach Truck", aisleWidth: 9.5 },
  vna: { name: "Very Narrow Aisle (VNA)", aisleWidth: 5.5 }
};

const dom = {
  buildingLength: document.getElementById("buildingLength"),
  buildingWidth: document.getElementById("buildingWidth"),
  clearHeight: document.getElementById("clearHeight"),
  clearHeightVal: document.getElementById("clearHeightVal"),
  forkliftType: document.getElementById("forkliftType"),
  palletHeight: document.getElementById("palletHeight"),
  palletHeightVal: document.getElementById("palletHeightVal"),
  palletWeight: document.getElementById("palletWeight"),
  palletWeightVal: document.getElementById("palletWeightVal"),
  bayConfig: document.getElementById("bayConfig"),
  deckingType: document.getElementById("deckingType"),

  // Results
  densityBadge: document.getElementById("densityBadge"),
  totalPalletPositions: document.getElementById("totalPalletPositions"),
  rackingSummaryText: document.getElementById("rackingSummaryText"),
  densityExplanation: document.getElementById("densityExplanation"),
  metricLevels: document.getElementById("metricLevels"),
  metricUprightHeight: document.getElementById("metricUprightHeight"),
  metricBeamCap: document.getElementById("metricBeamCap"),
  metricAisleWidth: document.getElementById("metricAisleWidth"),
  metricTotalBays: document.getElementById("metricTotalBays"),
  metricSteelBudget: document.getElementById("metricSteelBudget"),

  // SVG Groups
  floorplanGroup: document.getElementById("floorplanGroup"),
  elevationGroup: document.getElementById("elevationGroup"),
  annotationGroup: document.getElementById("annotationGroup"),

  // Modal & Print
  rfqModal: document.getElementById("rfqModal"),
  openRfqBtn: document.getElementById("openRfqBtn"),
  leadForm: document.getElementById("leadForm"),
  leadSuccess: document.getElementById("leadSuccess"),
  rfqTrackingId: document.getElementById("rfqTrackingId"),
  printSummaryBtn: document.getElementById("printSummaryBtn"),
  downloadPrintBtn: document.getElementById("downloadPrintBtn"),

  modalCapacity: document.getElementById("modalCapacity"),
  modalHeight: document.getElementById("modalHeight"),
  modalAisle: document.getElementById("modalAisle"),
  modalBudget: document.getElementById("modalBudget"),

  printDate: document.getElementById("printDate"),
  printTracking: document.getElementById("printTracking"),
  printBuilding: document.getElementById("printBuilding"),
  printClear: document.getElementById("printClear"),
  printForklift: document.getElementById("printForklift"),
  printPallet: document.getElementById("printPallet"),
  printCapacity: document.getElementById("printCapacity"),
  printLevels: document.getElementById("printLevels"),
  printBeams: document.getElementById("printBeams"),
  printBays: document.getElementById("printBays"),
  printBudget: document.getElementById("printBudget")
};

let currentCalc = null;

function calculateRacking() {
  const bldgL = Math.max(30, parseFloat(dom.buildingLength.value) || 120);
  const bldgW = Math.max(20, parseFloat(dom.buildingWidth.value) || 80);
  const clearH = parseFloat(dom.clearHeight.value);
  const forkliftKey = dom.forkliftType.value;
  const palletHInches = parseFloat(dom.palletHeight.value);
  const palletWt = parseFloat(dom.palletWeight.value);
  const bayBeamInches = parseFloat(dom.bayConfig.value);
  const decking = dom.deckingType.value;

  const forklift = FORKLIFTS[forkliftKey];
  const aisleWidth = forklift.aisleWidth;

  // 1. Vertical Tier Sizing
  // NFPA 13 mandates 36 inches (3 ft) clearance below sprinkler heads
  const usableVerticalH = clearH - 3.0;
  // Each beam level height = pallet height (inches) + 6 inches (beam face thickness & lift-off clearance)
  const tierHeightFt = (palletHInches + 6) / 12;
  const levels = Math.max(2, Math.floor(usableVerticalH / tierHeightFt));
  const uprightHeight = Math.round(levels * tierHeightFt);

  // Pallets per beam level: 96" and 108" hold 2 pallets; 144" holds 3 pallets
  const palletsPerLevel = (bayBeamInches >= 144) ? 3 : 2;

  // 2. Horizontal Layout & Aisle Spacing
  // Back-to-back rack run depth = 42" + 6" flue space + 42" = 90" = 7.5 ft
  const rackRowDepth = 7.5;
  const moduleWidth = rackRowDepth + aisleWidth;

  // Usable floor width (leaving 5 ft perimeter clearance along side walls)
  const usableWidth = Math.max(10, bldgW - 10);
  const modules = Math.max(1, Math.floor(usableWidth / moduleWidth));
  const doubleRuns = modules;
  const totalRuns = doubleRuns * 2;

  // Usable floor length (leaving 25 ft dock/staging aisle at front, 5 ft egress at rear)
  const usableLength = Math.max(10, bldgL - 30);
  const bayLengthFt = (bayBeamInches / 12) + 0.25; // beam span + 3" column upright width
  const baysPerRun = Math.max(2, Math.floor(usableLength / bayLengthFt));
  const totalBays = totalRuns * baysPerRun;

  // Total Pallet Storage Capacity
  const totalPallets = totalBays * levels * palletsPerLevel;

  // Beam capacity requirement (lbs per pair)
  const beamCapacityReq = palletsPerLevel * palletWt;

  // Budget Estimation ($75 to $95 per pallet position installed)
  let costPerPosition = 82;
  if (decking === "heavyDuty") costPerPosition = 98;
  if (decking === "palletSupports") costPerPosition = 70;

  const lowBudget = Math.round(totalPallets * (costPerPosition - 8));
  const highBudget = Math.round(totalPallets * (costPerPosition + 12));

  // Storage density footprint percentage
  const totalSqFt = bldgL * bldgW;
  const rackFootprintSqFt = totalRuns * 3.5 * (baysPerRun * bayLengthFt);
  const densityPct = Math.min(88, Math.round((rackFootprintSqFt / totalSqFt) * 100));

  currentCalc = {
    bldgL,
    bldgW,
    totalSqFt,
    clearH,
    forkliftKey,
    forklift,
    palletHInches,
    palletWt,
    bayBeamInches,
    decking,
    levels,
    uprightHeight,
    palletsPerLevel,
    aisleWidth,
    doubleRuns,
    totalRuns,
    baysPerRun,
    totalBays,
    totalPallets,
    beamCapacityReq,
    lowBudget,
    highBudget,
    densityPct
  };

  updateUI();
  renderSvg();
}

function updateUI() {
  const c = currentCalc;

  dom.clearHeightVal.textContent = c.clearH;
  dom.palletHeightVal.textContent = c.palletHInches;
  dom.palletWeightVal.textContent = c.palletWt.toLocaleString();

  dom.totalPalletPositions.textContent = `${c.totalPallets.toLocaleString()} PALLETS`;
  dom.rackingSummaryText.textContent = `${c.levels} Levels High • ${c.totalRuns} Rack Rows (${c.totalBays} Total Bays)`;

  dom.densityBadge.textContent = `STORAGE DENSITY: ${c.densityPct}%`;

  dom.densityExplanation.textContent = 
    `In a ${c.totalSqFt.toLocaleString()} sq ft facility with ${c.clearH} ft clear height, deploying a ${c.forklift.name} (${c.aisleWidth} ft aisles) creates ${c.totalPallets.toLocaleString()} pallet positions across ${c.totalBays} teardrop bays. Using standard sit-down forklifts (13 ft aisles) would sacrifice up to 30% of this capacity.`;

  dom.metricLevels.textContent = `${c.levels} Levels`;
  dom.metricUprightHeight.textContent = `${c.uprightHeight} ft`;
  dom.metricBeamCap.textContent = `${c.beamCapacityReq.toLocaleString()} lbs`;
  dom.metricAisleWidth.textContent = `${c.aisleWidth} ft`;
  dom.metricTotalBays.textContent = `${c.totalBays} Bays`;
  dom.metricSteelBudget.textContent = `$${c.lowBudget.toLocaleString()} – $${c.highBudget.toLocaleString()}`;

  // Modal Summary
  dom.modalCapacity.textContent = `${c.totalPallets.toLocaleString()} Pallets`;
  dom.modalHeight.textContent = `${c.clearH} ft Clear`;
  dom.modalAisle.textContent = `${c.aisleWidth} ft (${c.forklift.name.split(" ")[0]})`;
  dom.modalBudget.textContent = `$${Math.round(c.lowBudget / 1000)}k–$${Math.round(c.highBudget / 1000)}k`;
}

function renderSvg() {
  const c = currentCalc;
  if (!c) return;

  // 1. Top-Down Floor Plan Blueprint (Left 55% of SVG)
  const fpX = 20;
  const fpY = 30;
  const fpW = 310;
  const fpH = 300;

  let floorplanSvg = `
    <!-- Building Perimeter Wall -->
    <rect x="${fpX}" y="${fpY}" width="${fpW}" height="${fpH}" fill="#0d1424" stroke="#334155" stroke-width="2" />
    <text x="${fpX + 10}" y="${fpY + 18}" fill="#94a3b8" font-size="10" font-family="monospace">TOP-DOWN WAREHOUSE BLUEPRINT (${c.bldgL}' × ${c.bldgW}')</text>

    <!-- Staging / Dock Area at Bottom -->
    <rect x="${fpX}" y="${fpY + fpH - 45}" width="${fpW}" height="45" fill="#1e293b" stroke="#334155" stroke-width="1" />
    <text x="${fpX + fpW / 2}" y="${fpY + fpH - 22}" fill="#64748b" font-size="9" font-weight="bold" font-family="monospace" text-anchor="middle">LOADING DOCKS & STAGING BUFFER (25 FT)</text>
  `;

  // Draw Rack Rows and Aisle Corridors
  const numModules = Math.min(c.doubleRuns, 5);
  const usableFpW = fpW - 30;
  const slotW = usableFpW / numModules;

  for (let m = 0; m < numModules; m++) {
    const rx = fpX + 15 + (m * slotW);
    const rowDepthPx = slotW * 0.42;
    const aisleWidthPx = slotW * 0.58;

    // Rack Double-Row
    floorplanSvg += `
      <!-- Double Rack Run ${m + 1} -->
      <rect x="${rx}" y="${fpY + 30}" width="${rowDepthPx}" height="${fpH - 85}" fill="#c2410c" stroke="#f97316" stroke-width="1.5" />
      <!-- Flue Space Line -->
      <line x1="${rx + rowDepthPx / 2}" y1="${fpY + 30}" x2="${rx + rowDepthPx / 2}" y2="${fpY + fpH - 55}" stroke="#ef4444" stroke-width="1" stroke-dasharray="2,2" />
      
      <!-- Aisle Corridor -->
      <rect x="${rx + rowDepthPx}" y="${fpY + 30}" width="${aisleWidthPx}" height="${fpH - 85}" fill="#0f172a" opacity="0.6" />
      ${m === 0 ? `
        <text x="${rx + rowDepthPx + aisleWidthPx / 2}" y="${fpY + 50}" fill="#38bdf8" font-size="8" font-family="monospace" text-anchor="middle" transform="rotate(-90 ${rx + rowDepthPx + aisleWidthPx / 2} ${fpY + 50})">AISLE ${c.aisleWidth} FT</text>
      ` : ''}
    `;
  }

  dom.floorplanGroup.innerHTML = floorplanSvg;

  // 2. Cross-Section Vertical Rack Elevation (Right 45% of SVG)
  const elX = 360;
  const elY = 40;
  const elW = 210;
  const elH = 280;
  const groundY = elY + elH;

  let elevationSvg = `
    <!-- Elevation Frame Background -->
    <rect x="${elX - 10}" y="${elY - 15}" width="${elW + 20}" height="${elH + 30}" fill="#0f172a" stroke="#1e293b" />
    <text x="${elX}" y="${elY - 2}" fill="#94a3b8" font-size="10" font-family="monospace">RACK TIER ELEVATION</text>
    
    <!-- Roof Truss & Sprinkler Line -->
    <line x1="${elX}" y1="${elY + 12}" x2="${elX + elW}" y2="${elY + 12}" stroke="#ef4444" stroke-width="2" />
    <text x="${elX + elW - 5}" y="${elY + 8}" fill="#fca5a5" font-size="8" text-anchor="end">NFPA 13 SPRINKLER LINE (36" BUFFER)</text>

    <!-- Upright Columns (Blue/Orange) -->
    <rect x="${elX + 15}" y="${elY + 45}" width="8" height="${elH - 45}" fill="#1e3a8a" stroke="#3b82f6" stroke-width="1" />
    <rect x="${elX + elW - 25}" y="${elY + 45}" width="8" height="${elH - 45}" fill="#1e3a8a" stroke="#3b82f6" stroke-width="1" />
    
    <!-- Floor Slab -->
    <line x1="${elX}" y1="${groundY}" x2="${elX + elW}" y2="${groundY}" stroke="#64748b" stroke-width="3" />
  `;

  // Draw Horizontal Step Beams & Pallets
  const numTiers = Math.min(c.levels, 6);
  const tierSpacingPx = (elH - 60) / numTiers;

  for (let t = 0; t < numTiers; t++) {
    const beamY = groundY - (t * tierSpacingPx);
    
    // Step Beam
    elevationSvg += `
      <rect x="${elX + 15}" y="${beamY - 6}" width="${elW - 40}" height="6" fill="#f97316" stroke="#ea580c" />
    `;

    // Pallets on this beam tier (2 pallets)
    if (t < numTiers) {
      const palletW = (elW - 60) / 2;
      const palletH = tierSpacingPx * 0.75;
      elevationSvg += `
        <!-- Pallet 1 -->
        <rect x="${elX + 28}" y="${beamY - 6 - palletH}" width="${palletW}" height="${palletH}" rx="2" fill="#ca8a04" stroke="#facc15" stroke-width="1" />
        <!-- Pallet 2 -->
        <rect x="${elX + 34 + palletW}" y="${beamY - 6 - palletH}" width="${palletW}" height="${palletH}" rx="2" fill="#ca8a04" stroke="#facc15" stroke-width="1" />
      `;
    }
  }

  elevationSvg += `
    <text x="${elX + elW / 2}" y="${groundY + 18}" fill="#94a3b8" font-size="10" font-family="monospace" text-anchor="middle">${c.bayBeamInches}" BEAM LEVEL (${c.beamCapacityReq.toLocaleString()} LBS CAP)</text>
  `;

  dom.elevationGroup.innerHTML = elevationSvg;
}

function applyPreset(key) {
  const p = PRESETS[key];
  if (!p) return;

  dom.buildingLength.value = p.length;
  dom.buildingWidth.value = p.width;
  dom.clearHeight.value = p.clearHeight;
  dom.forkliftType.value = p.forkliftType;
  dom.palletHeight.value = p.palletHeight;
  dom.palletWeight.value = p.palletWeight;
  dom.bayConfig.value = p.bayConfig;
  dom.deckingType.value = p.deckingType;

  calculateRacking();
}

function init() {
  const inputs = [
    dom.buildingLength,
    dom.buildingWidth,
    dom.clearHeight,
    dom.forkliftType,
    dom.palletHeight,
    dom.palletWeight,
    dom.bayConfig,
    dom.deckingType
  ];

  inputs.forEach(el => {
    el.addEventListener("input", calculateRacking);
    el.addEventListener("change", calculateRacking);
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
    const trackingCode = `RACK-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    dom.rfqTrackingId.textContent = trackingCode;

    // Persist lead to shared TradeSpec Partner Network
    try {
      const leadItem = {
        id: trackingCode,
        timestamp: new Date().toISOString(),
        trade: "racking",
        tradeTitle: "Warehouse Pallet Racking",
        name: document.getElementById("leadName")?.value || "Commercial Client",
        company: document.getElementById("leadCompany")?.value || document.getElementById("leadBusiness")?.value || "Contractor / Facility Owner",
        phone: document.getElementById("leadPhone")?.value || "(555) 000-0000",
        email: document.getElementById("leadEmail")?.value || "",
        zip: document.getElementById("leadZip")?.value || "77002",
        specSummary: `${currentCalc?.totalPallets?.toLocaleString() || 648} Pallets, ${currentCalc?.bldgL || 120}x${currentCalc?.bldgW || 80}ft Facility, ${currentCalc?.aisleWidth || 9.5}ft Aisle`,
        budgetEst: `$${currentCalc?.lowBudget?.toLocaleString()} – $${currentCalc?.highBudget?.toLocaleString()}`,
        status: "new"
      };
      const existingLeads = JSON.parse(localStorage.getItem("tradespec_leads") || "[]");
      existingLeads.unshift(leadItem);
      localStorage.setItem("tradespec_leads", JSON.stringify(existingLeads));
    } catch(err) {}

    dom.printTracking.textContent = trackingCode;

    dom.leadForm.style.display = "none";
    dom.leadSuccess.classList.remove("hidden");
  });

  dom.printSummaryBtn.addEventListener("click", triggerPrint);
  dom.downloadPrintBtn.addEventListener("click", triggerPrint);

  calculateRacking();
    autoDetectLocation();
}

function triggerPrint() {
  const c = currentCalc;
  if (!c) return;

  dom.printDate.textContent = new Date().toLocaleDateString();
  dom.printBuilding.textContent = `${c.bldgL} ft L × ${c.bldgW} ft W (${c.totalSqFt.toLocaleString()} Sq Ft)`;
  dom.printClear.textContent = `${c.clearH} ft Clear Height`;
  dom.printForklift.textContent = `${c.forklift.name} (${c.aisleWidth} ft Aisle)`;
  dom.printPallet.textContent = `48"×40"×${c.palletHInches}" H @ ${c.palletWt.toLocaleString()} lbs`;
  dom.printCapacity.textContent = `${c.totalPallets.toLocaleString()} Pallet Positions`;
  dom.printLevels.textContent = `${c.levels} Levels High (${c.uprightHeight} ft Upright Frame)`;
  dom.printBeams.textContent = `${c.bayBeamInches}" Step Beams (${c.beamCapacityReq.toLocaleString()} lbs/pair)`;
  dom.printBays.textContent = `${c.totalBays} Bays (${c.totalRuns} Rack Rows)`;
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
