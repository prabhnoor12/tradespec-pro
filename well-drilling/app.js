/**
 * WellSpec Pro™ - Private Water Well Drilling & Pump Sizing Engine
 * Standards Grounding: National Ground Water Association (NGWA) Standards
 */

const PRESETS = {
  suburban: {
    wellDepth: 180,
    staticWaterLevel: 50,
    targetGPM: 10,
    geologyType: "clay",
    casingType: "pvc6",
    setbackDist: 75,
    waterTreatment: "softener"
  },
  deepRock: {
    wellDepth: 350,
    staticWaterLevel: 110,
    targetGPM: 12,
    geologyType: "hard",
    casingType: "steel6",
    setbackDist: 120,
    waterTreatment: "softener"
  },
  homestead: {
    wellDepth: 220,
    staticWaterLevel: 40,
    targetGPM: 18,
    geologyType: "clay",
    casingType: "pvc6",
    setbackDist: 150,
    waterTreatment: "uv"
  },
  replacement: {
    wellDepth: 110,
    staticWaterLevel: 25,
    targetGPM: 8,
    geologyType: "soft",
    casingType: "pvc5",
    setbackDist: 40,
    waterTreatment: "none"
  }
};

const GEOLOGY_RATES = {
  soft: { name: "Soft Sand & Alluvial", rate: 28 },
  clay: { name: "Dense Clay & Shale", rate: 38 },
  hard: { name: "Hard Bedrock & Granite", rate: 52 }
};

const CASING_RATES = {
  pvc5: { name: "5-Inch SDR-17 PVC", rate: 14 },
  pvc6: { name: "6-Inch Sched 40 PVC", rate: 18 },
  steel6: { name: "6-Inch Carbon Steel", rate: 28 }
};

const dom = {
  wellDepth: document.getElementById("wellDepth"),
  wellDepthVal: document.getElementById("wellDepthVal"),
  staticWaterLevel: document.getElementById("staticWaterLevel"),
  staticLevelVal: document.getElementById("staticLevelVal"),
  targetGPM: document.getElementById("targetGPM"),
  targetGPMVal: document.getElementById("targetGPMVal"),
  geologyType: document.getElementById("geologyType"),
  casingType: document.getElementById("casingType"),
  setbackDist: document.getElementById("setbackDist"),
  setbackDistVal: document.getElementById("setbackDistVal"),
  waterTreatment: document.getElementById("waterTreatment"),

  // Results
  tdhBadge: document.getElementById("tdhBadge"),
  recommendedPumpHp: document.getElementById("recommendedPumpHp"),
  pumpPackageTitle: document.getElementById("pumpPackageTitle"),
  systemExplanation: document.getElementById("systemExplanation"),
  metricTDH: document.getElementById("metricTDH"),
  metricPumpDepth: document.getElementById("metricPumpDepth"),
  metricTankSize: document.getElementById("metricTankSize"),
  metricDrillFootage: document.getElementById("metricDrillFootage"),
  metricGeologyRate: document.getElementById("metricGeologyRate"),
  metricCasingFootage: document.getElementById("metricCasingFootage"),
  metricCasingRate: document.getElementById("metricCasingRate"),
  metricTurnkeyBudget: document.getElementById("metricTurnkeyBudget"),
  costTableBody: document.getElementById("costTableBody"),

  // SVG Groups
  strataGroup: document.getElementById("strataGroup"),
  surfaceGroup: document.getElementById("surfaceGroup"),
  plumbingGroup: document.getElementById("plumbingGroup"),
  aquiferGroup: document.getElementById("aquiferGroup"),
  dimensionGroup: document.getElementById("dimensionGroup"),

  // Modal & Print
  rfqModal: document.getElementById("rfqModal"),
  openRfqBtn: document.getElementById("openRfqBtn"),
  leadForm: document.getElementById("leadForm"),
  leadSuccess: document.getElementById("leadSuccess"),
  rfqTrackingId: document.getElementById("rfqTrackingId"),
  printSummaryBtn: document.getElementById("printSummaryBtn"),
  downloadPrintBtn: document.getElementById("downloadPrintBtn"),

  modalDepth: document.getElementById("modalDepth"),
  modalGPM: document.getElementById("modalGPM"),
  modalStrata: document.getElementById("modalStrata"),
  modalPump: document.getElementById("modalPump"),

  printDate: document.getElementById("printDate"),
  printTracking: document.getElementById("printTracking"),
  printDepth: document.getElementById("printDepth"),
  printStatic: document.getElementById("printStatic"),
  printGPM: document.getElementById("printGPM"),
  printStrata: document.getElementById("printStrata"),
  printCasing: document.getElementById("printCasing"),
  printTDH: document.getElementById("printTDH"),
  printPump: document.getElementById("printPump"),
  printPumpDepth: document.getElementById("printPumpDepth"),
  printTank: document.getElementById("printTank"),
  printBudget: document.getElementById("printBudget")
};

let currentCalc = null;

function calculateWell() {
  const depth = parseFloat(dom.wellDepth.value);
  const staticLevel = Math.min(depth - 10, parseFloat(dom.staticWaterLevel.value));
  const gpm = parseFloat(dom.targetGPM.value);
  const geology = dom.geologyType.value;
  const casing = dom.casingType.value;
  const setback = parseFloat(dom.setbackDist.value);
  const treatment = dom.waterTreatment.value;

  // Pumping drawdown estimate (aquifer cone of depression)
  const pumpingLift = Math.round(staticLevel + (gpm * 4.2));
  const pumpSetDepth = Math.max(depth - 25, pumpingLift + 20);

  // Pressure Head (60 PSI shut-off = 60 * 2.31 ft of head)
  const pressureHead = 60 * 2.31; // 138.6 ft

  // Friction loss in vertical drop pipe + horizontal trench pipe
  const totalPipeLength = pumpSetDepth + setback;
  const frictionLoss = Math.round(totalPipeLength * 0.038);

  // Total Dynamic Head (TDH)
  const tdh = Math.round(pumpingLift + pressureHead + frictionLoss);

  // Hydraulic Horsepower
  const whp = (gpm * tdh) / 3960;
  let pumpHP = "1.0 HP";
  let pumpCost = 1850;

  if (whp < 0.38) {
    pumpHP = "0.5 HP";
    pumpCost = 1350;
  } else if (whp < 0.65) {
    pumpHP = "0.75 HP";
    pumpCost = 1550;
  } else if (whp < 1.05) {
    pumpHP = "1.0 HP";
    pumpCost = 1850;
  } else if (whp < 1.55) {
    pumpHP = "1.5 HP";
    pumpCost = 2300;
  } else if (whp < 2.25) {
    pumpHP = "2.0 HP";
    pumpCost = 2950;
  } else {
    pumpHP = "3.0 HP";
    pumpCost = 3850;
  }

  // Pressure Tank Sizing (40/60 PSI drawdown factor ~0.30)
  const drawdownReq = gpm * 1.5; // 90 sec pump run
  let tankGal = 34;
  let tankCost = 650;
  if (drawdownReq > 22) {
    tankGal = 86;
    tankCost = 1250;
  } else if (drawdownReq > 13) {
    tankGal = 50;
    tankCost = 850;
  } else if (drawdownReq > 8) {
    tankGal = 34;
    tankCost = 650;
  } else {
    tankGal = 20;
    tankCost = 480;
  }

  // Line Item Pricing
  const drillCost = depth * GEOLOGY_RATES[geology].rate;
  const casingCost = depth * CASING_RATES[casing].rate;
  const trenchCost = Math.round(setback * 16); // $16/ft trenching, poly pipe, wire
  const pitlessAndSealCost = 750;
  const permitsAndTestCost = 650;

  let treatmentCost = 250;
  let treatmentName = "Sediment Filtration Kit";
  if (treatment === "softener") {
    treatmentCost = 1850;
    treatmentName = "Water Softener & Iron Filter";
  } else if (treatment === "uv") {
    treatmentCost = 2650;
    treatmentName = "UV Disinfection & RO System";
  }

  const subtotal = drillCost + casingCost + pumpCost + tankCost + trenchCost + pitlessAndSealCost + permitsAndTestCost + treatmentCost;
  const lowTurnkey = Math.round(subtotal * 0.95);
  const highTurnkey = Math.round(subtotal * 1.12);

  currentCalc = {
    depth,
    staticLevel,
    gpm,
    geology,
    casing,
    setback,
    treatment,
    pumpingLift,
    pumpSetDepth,
    tdh,
    pumpHP,
    pumpCost,
    tankGal,
    tankCost,
    drillCost,
    casingCost,
    trenchCost,
    pitlessAndSealCost,
    permitsAndTestCost,
    treatmentCost,
    treatmentName,
    lowTurnkey,
    highTurnkey
  };

  updateUI();
  renderSvg();
}

function updateUI() {
  const c = currentCalc;

  dom.wellDepthVal.textContent = c.depth;
  dom.staticLevelVal.textContent = c.staticLevel;
  dom.targetGPMVal.textContent = c.gpm;
  dom.setbackDistVal.textContent = c.setback;

  dom.tdhBadge.textContent = `TOTAL HEAD: ${c.tdh} FT`;
  dom.recommendedPumpHp.textContent = `${c.pumpHP} / ${c.gpm} GPM`;
  dom.pumpPackageTitle.textContent = `4-Inch Deep-Well Submersible Pump (230V Single-Phase)`;

  dom.systemExplanation.textContent = 
    `A ${c.depth}-ft well with a ${c.staticLevel}-ft static water level pumping ${c.gpm} GPM must overcome ${c.tdh} ft of Total Dynamic Head (TDH) at a 40/60 PSI shut-off. A ${c.pumpHP} pump paired with a ${c.tankGal}-gallon pressure tank delivers consistent pressure without motor short-cycling.`;

  dom.metricTDH.textContent = `${c.tdh} ft`;
  dom.metricPumpDepth.textContent = `${c.pumpSetDepth} ft`;
  dom.metricTankSize.textContent = `${c.tankGal} Gallon`;
  dom.metricDrillFootage.textContent = `${c.depth} ft`;
  dom.metricGeologyRate.textContent = `@ $${GEOLOGY_RATES[c.geology].rate}/ft (${GEOLOGY_RATES[c.geology].name})`;
  dom.metricCasingFootage.textContent = `${c.depth} ft`;
  dom.metricCasingRate.textContent = `${CASING_RATES[c.casing].name} ($${CASING_RATES[c.casing].rate}/ft)`;
  dom.metricTurnkeyBudget.textContent = `$${c.lowTurnkey.toLocaleString()} – $${c.highTurnkey.toLocaleString()}`;

  // Update Price Health Gauge
  const gaugeLow = document.getElementById('gaugeLowLabel');
  const gaugeAvg = document.getElementById('gaugeAvgLabel');
  const gaugeHigh = document.getElementById('gaugeHighLabel');
  const gaugeNote = document.getElementById('gaugeExplanation');
  if (gaugeLow) {
    const avgBudget = Math.round((c.lowTurnkey + c.highTurnkey) / 2);
    const highThreshold = Math.round(c.highTurnkey * 1.25);
    gaugeLow.textContent = `$${c.lowTurnkey.toLocaleString()} (Competitive)`;
    gaugeAvg.textContent = `$${avgBudget.toLocaleString()} (Market Avg)`;
    gaugeHigh.textContent = `$${highThreshold.toLocaleString()}+ (High / Hard Rock)`;
    if (gaugeNote) {
      gaugeNote.innerHTML = `Fair market estimates for a ${c.depth}-ft well (${c.gpm} GPM) typically fall between <strong>$${c.lowTurnkey.toLocaleString()} and $${c.highTurnkey.toLocaleString()}</strong>. Quotes over $${highThreshold.toLocaleString()} are considered premium unless deep hard rock or extended trenching applies.`;
    }
  }

  // Cost Table
  const items = [
    { label: `Borehole Rotary Drilling (${c.depth} ft @ $${GEOLOGY_RATES[c.geology].rate}/ft)`, cost: c.drillCost },
    { label: `Sanitary Casing & Grout (${c.depth} ft of ${CASING_RATES[c.casing].name})`, cost: c.casingCost },
    { label: `${c.pumpHP} Submersible Pump, Drop Cable & Torque Arrestor`, cost: c.pumpCost },
    { label: `${c.tankGal}-Gallon Pre-Charged Pressure Tank & 40/60 Switch`, cost: c.tankCost },
    { label: `Frost-Line Trenching & Poly Line (${c.setback} ft to house)`, cost: c.trenchCost },
    { label: `Pitless Adapter, Sanitary Well Cap & Brass Fittings`, cost: c.pitlessAndSealCost },
    { label: `County Health Permit, Environmental Log & Lab Water Test`, cost: c.permitsAndTestCost },
    { label: `${c.treatmentName}`, cost: c.treatmentCost }
  ];

  dom.costTableBody.innerHTML = items.map(item => `
    <tr>
      <td>${item.label}</td>
      <td style="text-align: right;">$${item.cost.toLocaleString()}</td>
    </tr>
  `).join("");

  // Modal summary
  dom.modalDepth.textContent = `${c.depth} ft`;
  dom.modalGPM.textContent = `${c.gpm} GPM`;
  dom.modalStrata.textContent = GEOLOGY_RATES[c.geology].name;
  dom.modalPump.textContent = `${c.pumpHP} Submersible`;
}

function renderSvg() {
  const c = currentCalc;
  if (!c) return;

  const groundY = 85;
  const wellX = 140;
  const houseX = 490;

  // Dynamic Scale
  const maxDepth = Math.max(c.depth, 200);
  const depthScale = 220 / maxDepth;

  const casingBottomY = groundY + (c.depth * depthScale);
  const staticWaterY = groundY + (c.staticLevel * depthScale);
  const pumpY = groundY + (c.pumpSetDepth * depthScale);
  const frostY = groundY + 16;

  // Strata
  dom.strataGroup.innerHTML = `
    <!-- Topsoil / Sand Layer -->
    <rect x="0" y="${groundY}" width="600" height="40" fill="#2d1f11" stroke="#3d2c1c" />
    <rect x="0" y="${groundY}" width="600" height="40" fill="url(#soilPattern)" opacity="0.6" />
    <text x="15" y="${groundY + 24}" fill="#a16207" font-size="9" font-family="monospace">OVERBURDEN & CLAY LAYER</text>

    <!-- Deep Bedrock Layer -->
    <rect x="0" y="${groundY + 40}" width="600" height="235" fill="#0f172a" stroke="#1e293b" />
    <rect x="0" y="${groundY + 40}" width="600" height="235" fill="url(#rockPattern)" opacity="0.4" />
    <text x="15" y="${groundY + 70}" fill="#475569" font-size="9" font-family="monospace">AQUIFER BEDROCK / FRACTURED ZONE</text>
  `;

  // Aquifer Saturated Zone
  dom.aquiferGroup.innerHTML = `
    <!-- Water Table Fill -->
    <rect x="${wellX - 14}" y="${staticWaterY}" width="28" height="${casingBottomY - staticWaterY}" fill="#0284c7" opacity="0.65" />
    <!-- Water Line -->
    <line x1="${wellX - 35}" y1="${staticWaterY}" x2="${wellX + 35}" y2="${staticWaterY}" stroke="#38bdf8" stroke-width="2" stroke-dasharray="3,2" />
    <text x="${wellX + 40}" y="${staticWaterY + 4}" fill="#38bdf8" font-size="9" font-weight="bold">STATIC WATER (${c.staticLevel} FT)</text>
  `;

  // Plumbing, Casing, Pump
  dom.plumbingGroup.innerHTML = `
    <!-- Well Borehole / Casing -->
    <rect x="${wellX - 14}" y="${groundY - 18}" width="28" height="${c.depth * depthScale + 18}" fill="none" stroke="#94a3b8" stroke-width="3" />
    <!-- Sanitary Well Cap -->
    <rect x="${wellX - 18}" y="${groundY - 24}" width="36" height="8" rx="2" fill="#475569" stroke="#94a3b8" stroke-width="1.5" />
    
    <!-- Trench to House -->
    <path d="M ${wellX} ${frostY} L ${houseX} ${frostY} L ${houseX} ${groundY + 30}" fill="none" stroke="#38bdf8" stroke-width="2" stroke-dasharray="4,2" />
    
    <!-- Pitless Adapter Node -->
    <circle cx="${wellX}" cy="${frostY}" r="4" fill="#f59e0b" />

    <!-- Drop Pipe in Well -->
    <line x1="${wellX}" y1="${frostY}" x2="${wellX}" y2="${pumpY}" stroke="#38bdf8" stroke-width="2" />

    <!-- Submersible Pump Cylinder -->
    <rect x="${wellX - 8}" y="${pumpY - 22}" width="16" height="24" rx="2" fill="#10b981" stroke="#059669" stroke-width="1.5" />
    <text x="${wellX}" y="${pumpY - 8}" fill="#ffffff" font-size="8" font-weight="bold" text-anchor="middle">${c.pumpHP}</text>
  `;

  // House and Pressure Tank
  dom.surfaceGroup.innerHTML = `
    <!-- Ground Surface Horizon -->
    <line x1="0" y1="${groundY}" x2="600" y2="${groundY}" stroke="#475569" stroke-width="2" />

    <!-- House Silhouette -->
    <polygon points="${houseX - 45},${groundY} ${houseX - 45},${groundY - 45} ${houseX},${groundY - 70} ${houseX + 45},${groundY - 45} ${houseX + 45},${groundY}" fill="#1e293b" stroke="#475569" stroke-width="2" />
    <!-- Basement / Slab -->
    <rect x="${houseX - 35}" y="${groundY}" width="70" height="40" fill="#0f172a" stroke="#334155" stroke-width="1.5" />
    
    <!-- Pressure Tank in Basement -->
    <rect x="${houseX - 10}" y="${groundY + 12}" width="20" height="24" rx="4" fill="#0284c7" stroke="#38bdf8" stroke-width="1" />
    <text x="${houseX}" y="${groundY + 28}" fill="#ffffff" font-size="7" font-weight="bold" text-anchor="middle">TANK</text>
    <text x="${houseX}" y="${groundY - 76}" fill="#94a3b8" font-size="10" font-weight="bold" text-anchor="middle">RESIDENCE</text>
  `;

  // Dimensions
  dom.dimensionGroup.innerHTML = `
    <!-- Setback Distance -->
    <line x1="${wellX}" y1="${groundY - 32}" x2="${houseX}" y2="${groundY - 32}" stroke="#facc15" stroke-width="1" />
    <text x="${(wellX + houseX) / 2}" y="${groundY - 37}" fill="#facc15" font-size="10" font-family="monospace" text-anchor="middle">TRENCH: ${c.setback} FT</text>

    <!-- Depth Dimension -->
    <line x1="${wellX - 30}" y1="${groundY}" x2="${wellX - 30}" y2="${casingBottomY}" stroke="#facc15" stroke-width="1" />
    <text x="${wellX - 38}" y="${(groundY + casingBottomY) / 2}" fill="#facc15" font-size="9" font-family="monospace" text-anchor="middle" transform="rotate(-90 ${wellX - 38} ${(groundY + casingBottomY) / 2})">TOTAL DEPTH: ${c.depth} FT</text>
  `;
}

function applyPreset(key) {
  const p = PRESETS[key];
  if (!p) return;

  dom.wellDepth.value = p.wellDepth;
  dom.staticWaterLevel.value = p.staticWaterLevel;
  dom.targetGPM.value = p.targetGPM;
  dom.geologyType.value = p.geologyType;
  dom.casingType.value = p.casingType;
  dom.setbackDist.value = p.setbackDist;
  dom.waterTreatment.value = p.waterTreatment;

  calculateWell();
}

function init() {
  const inputs = [
    dom.wellDepth,
    dom.staticWaterLevel,
    dom.targetGPM,
    dom.geologyType,
    dom.casingType,
    dom.setbackDist,
    dom.waterTreatment
  ];

  inputs.forEach(el => {
    el.addEventListener("input", calculateWell);
    el.addEventListener("change", calculateWell);
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
    const trackingCode = `WELL-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    dom.rfqTrackingId.textContent = trackingCode;

    // Persist lead to shared TradeSpec Partner Network
    try {
      const leadItem = {
        id: trackingCode,
        timestamp: new Date().toISOString(),
        trade: "well",
        tradeTitle: "Water Well & Pump",
        name: document.getElementById("leadName")?.value || "Commercial Client",
        company: document.getElementById("leadCompany")?.value || document.getElementById("leadBusiness")?.value || "Contractor / Facility Owner",
        phone: document.getElementById("leadPhone")?.value || "(555) 000-0000",
        email: document.getElementById("leadEmail")?.value || "",
        zip: document.getElementById("leadZip")?.value || "77002",
        specSummary: `${currentCalc?.depth || 200} ft Well, ${currentCalc?.gpm || 10} GPM, ${currentCalc?.pumpHP || 1.0} HP Pump (${currentCalc?.tdh || 278} ft TDH)`,
        budgetEst: `$${currentCalc?.lowTurnkey?.toLocaleString()} – $${currentCalc?.highTurnkey?.toLocaleString()}`,
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

  calculateWell();
    autoDetectLocation();
}

function triggerPrint() {
  const c = currentCalc;
  if (!c) return;

  dom.printDate.textContent = new Date().toLocaleDateString();
  dom.printDepth.textContent = `${c.depth} ft`;
  dom.printStatic.textContent = `${c.staticLevel} ft`;
  dom.printGPM.textContent = `${c.gpm} GPM`;
  dom.printStrata.textContent = GEOLOGY_RATES[c.geology].name;
  dom.printCasing.textContent = CASING_RATES[c.casing].name;
  dom.printTDH.textContent = `${c.tdh} ft`;
  dom.printPump.textContent = `${c.pumpHP} Deep-Well Submersible (230V)`;
  dom.printPumpDepth.textContent = `${c.pumpSetDepth} ft`;
  dom.printTank.textContent = `${c.tankGal} Gallon Bladder Tank (40/60 PSI)`;
  dom.printBudget.textContent = `$${c.lowTurnkey.toLocaleString()} – $${c.highTurnkey.toLocaleString()}`;

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
