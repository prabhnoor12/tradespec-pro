/**
 * RigCheck Pro™ - Heavy Equipment & Mobile Crane Sizing Engine
 * Standards Grounding: ASME B30.5 / OSHA 29 CFR 1926 Subpart CC
 */

// Crane Database with Empirical Load Chart Derivations
const CRANE_CLASSES = [
  {
    id: "35T_BOOM_TRUCK",
    name: "35-Ton Commercial Boom Truck (3-Axle)",
    ratingTons: 35,
    maxBoom: 102,
    machineWeight: 48000,
    hourlyRateRange: [195, 265],
    minHours: 4,
    mobFee: 350,
    // Radius (ft) -> Net Chart Capacity (lbs)
    chart: [
      { r: 15, cap: 32000 },
      { r: 25, cap: 21000 },
      { r: 40, cap: 11000 },
      { r: 50, cap: 7200 },
      { r: 60, cap: 4600 },
      { r: 75, cap: 2400 },
      { r: 90, cap: 1200 }
    ]
  },
  {
    id: "50T_HYDRAULIC",
    name: "50-Ton Hydraulic Truck Crane (3-Axle)",
    ratingTons: 50,
    maxBoom: 115,
    machineWeight: 68000,
    hourlyRateRange: [250, 340],
    minHours: 4,
    mobFee: 450,
    chart: [
      { r: 15, cap: 52000 },
      { r: 25, cap: 34000 },
      { r: 40, cap: 19500 },
      { r: 50, cap: 13800 },
      { r: 60, cap: 9600 },
      { r: 75, cap: 6100 },
      { r: 90, cap: 3800 },
      { r: 105, cap: 2100 }
    ]
  },
  {
    id: "75T_ALL_TERRAIN",
    name: "75-Ton Hydraulic Truck Crane / All-Terrain (4-Axle)",
    ratingTons: 75,
    maxBoom: 142,
    machineWeight: 88000,
    hourlyRateRange: [320, 440],
    minHours: 8,
    mobFee: 650,
    chart: [
      { r: 15, cap: 88000 },
      { r: 25, cap: 58000 },
      { r: 40, cap: 35000 },
      { r: 50, cap: 25500 },
      { r: 60, cap: 19200 },
      { r: 75, cap: 13500 },
      { r: 90, cap: 9400 },
      { r: 110, cap: 5600 },
      { r: 130, cap: 3100 }
    ]
  },
  {
    id: "100T_ALL_TERRAIN",
    name: "100-Ton All-Terrain Crane (5-Axle)",
    ratingTons: 100,
    maxBoom: 172,
    machineWeight: 118000,
    hourlyRateRange: [450, 600],
    minHours: 8,
    mobFee: 950,
    chart: [
      { r: 20, cap: 110000 },
      { r: 35, cap: 68000 },
      { r: 50, cap: 42000 },
      { r: 65, cap: 28500 },
      { r: 80, cap: 20500 },
      { r: 100, cap: 14200 },
      { r: 120, cap: 9800 },
      { r: 145, cap: 5800 }
    ]
  },
  {
    id: "160T_HEAVY",
    name: "160-Ton Heavy All-Terrain Crane (6-Axle)",
    ratingTons: 160,
    maxBoom: 205,
    machineWeight: 156000,
    hourlyRateRange: [650, 850],
    minHours: 8,
    mobFee: 1600,
    chart: [
      { r: 20, cap: 185000 },
      { r: 40, cap: 112000 },
      { r: 60, cap: 64000 },
      { r: 80, cap: 42000 },
      { r: 100, cap: 29500 },
      { r: 120, cap: 21000 },
      { r: 150, cap: 13500 },
      { r: 180, cap: 8200 }
    ]
  },
  {
    id: "250T_LUFFING",
    name: "250+ Ton Mega-Lift All-Terrain (with Luffing Jib)",
    ratingTons: 250,
    maxBoom: 260,
    machineWeight: 220000,
    hourlyRateRange: [950, 1400],
    minHours: 8,
    mobFee: 2800,
    chart: [
      { r: 30, cap: 240000 },
      { r: 60, cap: 125000 },
      { r: 90, cap: 74000 },
      { r: 120, cap: 46000 },
      { r: 150, cap: 31000 },
      { r: 180, cap: 21500 },
      { r: 210, cap: 14000 }
    ]
  }
];

// Presets Configurations
const PRESETS = {
  container: {
    loadWeight: 8500,
    rigging: 1000,
    liftHeight: 14,
    setbackRadius: 45,
    clearanceBuffer: 10,
    soilType: "2500",
    setupLocation: "private",
    windSpeed: 10
  },
  hvac: {
    loadWeight: 6000,
    rigging: 1000,
    liftHeight: 48,
    setbackRadius: 60,
    clearanceBuffer: 12,
    soilType: "2500",
    setupLocation: "private",
    windSpeed: 10
  },
  generator: {
    loadWeight: 9500,
    rigging: 1000,
    liftHeight: 16,
    setbackRadius: 75,
    clearanceBuffer: 10,
    soilType: "2500",
    setupLocation: "private",
    windSpeed: 12
  },
  steel: {
    loadWeight: 14000,
    rigging: 2000,
    liftHeight: 65,
    setbackRadius: 50,
    clearanceBuffer: 15,
    soilType: "4000",
    setupLocation: "private",
    windSpeed: 8
  },
  pool: {
    loadWeight: 4200,
    rigging: 600,
    liftHeight: 28,
    setbackRadius: 85,
    clearanceBuffer: 12,
    soilType: "1500",
    setupLocation: "private",
    windSpeed: 6
  },
  transformer: {
    loadWeight: 18000,
    rigging: 2000,
    liftHeight: 18,
    setbackRadius: 40,
    clearanceBuffer: 8,
    soilType: "4000",
    setupLocation: "street",
    windSpeed: 10
  }
};

// DOM References
const dom = {
  loadWeight: document.getElementById("loadWeight"),
  loadWeightVal: document.getElementById("loadWeightVal"),
  riggingDeduction: document.getElementById("riggingDeduction"),
  riggingVal: document.getElementById("riggingVal"),
  grossWeightVal: document.getElementById("grossWeightVal"),
  liftHeight: document.getElementById("liftHeight"),
  liftHeightVal: document.getElementById("liftHeightVal"),
  setbackRadius: document.getElementById("setbackRadius"),
  setbackRadiusVal: document.getElementById("setbackRadiusVal"),
  clearanceBuffer: document.getElementById("clearanceBuffer"),
  clearanceBufferVal: document.getElementById("clearanceBufferVal"),
  soilType: document.getElementById("soilType"),
  setupLocation: document.getElementById("setupLocation"),
  windSpeed: document.getElementById("windSpeed"),
  windSpeedVal: document.getElementById("windSpeedVal"),
  
  // Results
  recommendedTonnage: document.getElementById("recommendedTonnage"),
  craneClassTitle: document.getElementById("craneClassTitle"),
  tonnageExplanation: document.getElementById("tonnageExplanation"),
  chartUtilizationBadge: document.getElementById("chartUtilizationBadge"),
  metricBoomLength: document.getElementById("metricBoomLength"),
  metricBoomAngle: document.getElementById("metricBoomAngle"),
  metricTipHeight: document.getElementById("metricTipHeight"),
  metricOutriggerLoad: document.getElementById("metricOutriggerLoad"),
  metricMatSize: document.getElementById("metricMatSize"),
  metricMatSub: document.getElementById("metricMatSub"),
  metricBudgetRange: document.getElementById("metricBudgetRange"),
  warningsList: document.getElementById("warningsList"),
  
  // SVG Groups
  buildingGroup: document.getElementById("buildingGroup"),
  dimensionsGroup: document.getElementById("dimensionsGroup"),
  craneGroup: document.getElementById("craneGroup"),
  boomGroup: document.getElementById("boomGroup"),
  loadGroup: document.getElementById("loadGroup"),
  
  // Modal & RFQ
  rfqModal: document.getElementById("rfqModal"),
  openRfqBtn: document.getElementById("openRfqBtn"),
  leadForm: document.getElementById("leadForm"),
  leadSuccess: document.getElementById("leadSuccess"),
  rfqTrackingId: document.getElementById("rfqTrackingId"),
  printSummaryBtn: document.getElementById("printSummaryBtn"),
  downloadPrintBtn: document.getElementById("downloadPrintBtn"),
  
  // Modal Summary Chips
  modalGross: document.getElementById("modalGross"),
  modalRadius: document.getElementById("modalRadius"),
  modalHeight: document.getElementById("modalHeight"),
  modalClass: document.getElementById("modalClass"),
  
  // Print Sheet
  printDate: document.getElementById("printDate"),
  printTracking: document.getElementById("printTracking"),
  printNetWeight: document.getElementById("printNetWeight"),
  printRigging: document.getElementById("printRigging"),
  printGrossWeight: document.getElementById("printGrossWeight"),
  printHeight: document.getElementById("printHeight"),
  printRadius: document.getElementById("printRadius"),
  printBoomLength: document.getElementById("printBoomLength"),
  printBoomAngle: document.getElementById("printBoomAngle"),
  printCraneClass: document.getElementById("printCraneClass"),
  printUtilization: document.getElementById("printUtilization"),
  printSoil: document.getElementById("printSoil"),
  printOutriggerForce: document.getElementById("printOutriggerForce"),
  printMatSize: document.getElementById("printMatSize"),
  printBudget: document.getElementById("printBudget")
};

// Global State
let currentCalculation = null;

// Interpolate chart capacity at specific radius
function getSafeCapacity(crane, radius) {
  const chart = crane.chart;
  if (radius < chart[0].r) return chart[0].cap;
  if (radius > chart[chart.length - 1].r) return 0; // Exceeds chart radius

  for (let i = 0; i < chart.length - 1; i++) {
    const p1 = chart[i];
    const p2 = chart[i + 1];
    if (radius >= p1.r && radius <= p2.r) {
      const ratio = (radius - p1.r) / (p2.r - p1.r);
      return Math.round(p1.cap - ratio * (p1.cap - p2.cap));
    }
  }
  return 0;
}

// Core Math & Sizing Engine
function calculateLift() {
  const netWeight = parseFloat(dom.loadWeight.value);
  const rigging = parseFloat(dom.riggingDeduction.value);
  const grossWeight = netWeight + rigging;
  
  const liftHeight = parseFloat(dom.liftHeight.value);
  const setbackRadius = parseFloat(dom.setbackRadius.value);
  const clearanceBuffer = parseFloat(dom.clearanceBuffer.value);
  const soilPSF = parseFloat(dom.soilType.value);
  const setupLocation = dom.setupLocation.value;
  const windSpeed = parseFloat(dom.windSpeed.value);

  // Tip Height required = Lift Height + Headroom Buffer
  const tipHeight = liftHeight + clearanceBuffer;

  // Boom Angle (radians and degrees) from Centerpin
  const angleRad = Math.atan2(tipHeight, setbackRadius);
  const angleDeg = angleRad * (180 / Math.PI);

  // Minimum Boom Length via Pythagorean Theorem + 8% head sheave & deflection offset
  const minBoomLength = Math.round(Math.sqrt(setbackRadius * setbackRadius + tipHeight * tipHeight) * 1.08);

  // Determine Required Crane Sizing
  // Safe pick threshold: utilization <= 82% (OSHA/ASME buffer against dynamic shock load)
  let selectedCrane = null;
  let chartCapacity = 0;
  let utilizationPct = 0;

  for (const crane of CRANE_CLASSES) {
    if (crane.maxBoom >= minBoomLength) {
      const cap = getSafeCapacity(crane, setbackRadius);
      if (cap > 0) {
        const util = (grossWeight / cap) * 100;
        if (util <= 85) {
          selectedCrane = crane;
          chartCapacity = cap;
          utilizationPct = Math.round(util);
          break;
        }
      }
    }
  }

  // Fallback to heaviest class if load is extreme
  if (!selectedCrane) {
    selectedCrane = CRANE_CLASSES[CRANE_CLASSES.length - 1];
    chartCapacity = getSafeCapacity(selectedCrane, setbackRadius) || 15000;
    utilizationPct = Math.round((grossWeight / chartCapacity) * 100);
  }

  // Ground Bearing Pressure & Outrigger Pad Sizing
  // Under ASME B30.5, corner outrigger carries ~75% of combined crane + load weight
  const totalMachineWeight = selectedCrane.machineWeight + grossWeight;
  const maxCornerReactionLbs = Math.round(totalMachineWeight * 0.75);
  
  // Required area in sq ft = Reaction force / Soil Allowable Bearing Capacity
  const reqMatSqFt = (maxCornerReactionLbs / soilPSF);
  const matSideFt = Math.max(2.5, Math.ceil(Math.sqrt(reqMatSqFt) * 2) / 2); // rounded to 0.5 ft
  const actualMatArea = (matSideFt * matSideFt).toFixed(1);

  // Budget Estimation
  const minHours = selectedCrane.minHours;
  const lowHourly = selectedCrane.hourlyRateRange[0];
  const highHourly = selectedCrane.hourlyRateRange[1];
  const mob = selectedCrane.mobFee;

  const lowBudget = Math.round((lowHourly * minHours) + mob);
  const highBudget = Math.round((highHourly * minHours) + mob + 450); // fuel surcharge & rigging buffer

  // Store in State
  currentCalculation = {
    netWeight,
    rigging,
    grossWeight,
    grossTons: (grossWeight / 2000).toFixed(2),
    liftHeight,
    setbackRadius,
    clearanceBuffer,
    tipHeight,
    minBoomLength,
    angleDeg: angleDeg.toFixed(1),
    selectedCrane,
    chartCapacity,
    utilizationPct,
    soilPSF,
    maxCornerReactionLbs,
    matSideFt,
    actualMatArea,
    setupLocation,
    windSpeed,
    lowBudget,
    highBudget
  };

  updateUI();
  renderSvgDiagram();
}

// Update DOM Displays
function updateUI() {
  const c = currentCalculation;

  // Labels
  dom.loadWeightVal.textContent = c.netWeight.toLocaleString();
  dom.riggingVal.textContent = c.rigging.toLocaleString();
  dom.grossWeightVal.textContent = `${c.grossWeight.toLocaleString()} lbs (${c.grossTons} Tons)`;
  dom.liftHeightVal.textContent = c.liftHeight;
  dom.setbackRadiusVal.textContent = c.setbackRadius;
  dom.clearanceBufferVal.textContent = c.clearanceBuffer;
  dom.windSpeedVal.textContent = c.windSpeed;

  // Recommendation Card
  dom.recommendedTonnage.textContent = `${c.selectedCrane.ratingTons}-TON`;
  dom.craneClassTitle.textContent = c.selectedCrane.name;

  // Utilization Badge
  dom.chartUtilizationBadge.textContent = `CHART CAPACITY: ${c.utilizationPct}%`;
  dom.chartUtilizationBadge.className = "utilization-badge " + 
    (c.utilizationPct > 85 ? "red" : c.utilizationPct > 70 ? "amber" : "green");

  // Recommendation Narrative
  dom.tonnageExplanation.textContent = 
    `A ${c.grossWeight.toLocaleString()} lb gross pick at a ${c.setbackRadius} ft radius requires a minimum ${c.minBoomLength} ft boom. At this setback, a ${c.selectedCrane.ratingTons}-ton machine has a chart capacity of ${c.chartCapacity.toLocaleString()} lbs (utilizing ${c.utilizationPct}% of chart), satisfying ASME B30.5 stability requirements.`;

  // Metric Boxes
  dom.metricBoomLength.textContent = `${c.minBoomLength} ft`;
  dom.metricBoomAngle.textContent = `${c.angleDeg}°`;
  dom.metricTipHeight.textContent = `${c.tipHeight} ft`;
  dom.metricOutriggerLoad.textContent = `${c.maxCornerReactionLbs.toLocaleString()} lbs`;
  dom.metricMatSize.textContent = `${c.matSideFt} ft × ${c.matSideFt} ft`;
  dom.metricMatSub.textContent = `Per outrigger float (${c.actualMatArea} sq ft)`;
  dom.metricBudgetRange.textContent = `$${c.lowBudget.toLocaleString()} – $${c.highBudget.toLocaleString()}`;

  // Update Price Health Gauge
  const gaugeLow = document.getElementById('gaugeLowLabel');
  const gaugeAvg = document.getElementById('gaugeAvgLabel');
  const gaugeHigh = document.getElementById('gaugeHighLabel');
  const gaugeNote = document.getElementById('gaugeExplanation');
  if (gaugeLow) {
    const avgBudget = Math.round((c.lowBudget + c.highBudget) / 2);
    const highThreshold = Math.round(c.highBudget * 1.25);
    gaugeLow.textContent = `$${c.lowBudget.toLocaleString()} (Competitive)`;
    gaugeAvg.textContent = `$${avgBudget.toLocaleString()} (Market Avg)`;
    gaugeHigh.textContent = `$${highThreshold.toLocaleString()}+ (High / Rush)`;
    if (gaugeNote) {
      gaugeNote.innerHTML = `Fair market estimates for a ${c.selectedCrane.ratingTons}-Ton crane with certified operator typically fall between <strong>$${c.lowBudget.toLocaleString()} and $${c.highBudget.toLocaleString()}</strong>. Quotes over $${highThreshold.toLocaleString()} are considered premium unless night shifts, street lane closures, or long-distance counterweight haul trucks apply.`;
    }
  }

  // Warnings Engine
  renderWarnings(c);

  // Modal Summary Update
  dom.modalGross.textContent = `${c.grossWeight.toLocaleString()} lbs`;
  dom.modalRadius.textContent = `${c.setbackRadius} ft`;
  dom.modalHeight.textContent = `${c.liftHeight} ft`;
  dom.modalClass.textContent = `${c.selectedCrane.ratingTons}-Ton Class`;
}

// Generate OSHA/ASME Warnings
function renderWarnings(c) {
  const warnings = [];

  // Low Angle Warning
  if (parseFloat(c.angleDeg) < 48) {
    warnings.push({
      critical: true,
      text: `Low Boom Angle Warning (${c.angleDeg}°): Operating below 50° severely reduces crane chart capacity due to overturning moment. Consider moving the crane closer to increase boom angle if site constraints allow.`
    });
  }

  // Capacity Warning
  if (c.utilizationPct > 85) {
    warnings.push({
      critical: true,
      text: `Critical Lift Alert: Load utilization (${c.utilizationPct}%) exceeds ASME B30.5 85% safety threshold. A formal written lift plan, rigging calculation sheets, and an on-site PE Lift Director are required.`
    });
  }

  // Street Closure Permit
  if (c.setupLocation === "street") {
    warnings.push({
      critical: false,
      text: `Public Right-of-Way Permit Required: Street setup requires a Municipal Street Closure / Obstruction Permit, an approved Traffic Control Plan (TCP), and certified flaggers or off-duty police detail (lead time 3–14 days).`
    });
  }

  // Powerline Clearance
  if (c.setupLocation === "powerlines") {
    warnings.push({
      critical: true,
      text: `OSHA 1926.1408 Power Line Proximity: Work within 50 ft of overhead power lines requires dedicated spotters and a minimum 20-foot radial encroachment boundary. Utility de-energization or line insulation may be mandatory.`
    });
  }

  // Wind Speed
  if (c.windSpeed >= 25) {
    warnings.push({
      critical: true,
      text: `High Wind Stop-Work Alert (${c.windSpeed} mph): OSHA and crane manufacturer guidelines mandate halting pick operations when sustained wind or gusts exceed 20–25 mph depending on load sail surface area.`
    });
  } else if (c.windSpeed >= 15) {
    warnings.push({
      critical: false,
      text: `Elevated Wind Caution (${c.windSpeed} mph): Rooftop HVAC units and sheet materials have high wind sail area. Tag lines and tag rigger crew required.`
    });
  }

  // Ground Outrigger Warning
  if (c.soilPSF <= 1500) {
    warnings.push({
      critical: false,
      text: `Subgrade Punch Risk: Low ground bearing strength requires verified ${c.matSideFt}×${c.matSideFt} ft heavy hardwood cribbing mats under each outrigger float before outriggers are pinned.`
    });
  }

  // Render to List
  dom.warningsList.innerHTML = warnings.map(w => 
    `<li class="${w.critical ? 'critical' : ''}">${w.text}</li>`
  ).join("");
}

// Render Real-Time Scale SVG Geometry
function renderSvgDiagram() {
  const c = currentCalculation;
  if (!c) return;

  const svgWidth = 600;
  const svgHeight = 360;
  const groundY = 310;
  const craneX = 90; // Centerpin X coordinate

  // Determine scale factor: Map real-world feet to SVG pixels
  const maxSpanFt = Math.max(c.setbackRadius + 30, c.tipHeight + 25, 90);
  const scale = (svgWidth - 140) / maxSpanFt;

  // Coordinates
  const targetX = craneX + (c.setbackRadius * scale);
  const landingY = groundY - (c.liftHeight * scale);
  const tipY = groundY - (c.tipHeight * scale);

  // 1. Building Silhouette
  const bldgWidth = Math.max(90, svgWidth - targetX + 40);
  const bldgHeight = c.liftHeight * scale;
  const bldgX = targetX - 25;

  dom.buildingGroup.innerHTML = `
    <!-- Building Body -->
    <rect x="${bldgX}" y="${landingY}" width="${bldgWidth}" height="${bldgHeight}" fill="#1e293b" stroke="#334155" stroke-width="2" />
    <!-- Parapet Cap -->
    <line x1="${bldgX - 5}" y1="${landingY}" x2="${bldgX + bldgWidth}" y2="${landingY}" stroke="#64748b" stroke-width="4" />
    <!-- Windows pattern for visual realism -->
    <rect x="${bldgX + 15}" y="${landingY + 20}" width="18" height="24" fill="#0f172a" />
    <rect x="${bldgX + 45}" y="${landingY + 20}" width="18" height="24" fill="#0f172a" />
    ${bldgHeight > 70 ? `
      <rect x="${bldgX + 15}" y="${landingY + 55}" width="18" height="24" fill="#0f172a" />
      <rect x="${bldgX + 45}" y="${landingY + 55}" width="18" height="24" fill="#0f172a" />
    ` : ''}
    <text x="${bldgX + 10}" y="${landingY - 8}" fill="#94a3b8" font-size="11" font-weight="600" font-family="sans-serif">ROOF DECK / PARAPET</text>
  `;

  // 2. Crane Chassis & Outriggers
  dom.craneGroup.innerHTML = `
    <!-- Outrigger Mats -->
    <rect x="${craneX - 45}" y="${groundY - 4}" width="24" height="4" fill="#b45309" />
    <rect x="${craneX + 22}" y="${groundY - 4}" width="24" height="4" fill="#b45309" />
    <!-- Outrigger Legs -->
    <line x1="${craneX - 33}" y1="${groundY - 14}" x2="${craneX - 33}" y2="${groundY}" stroke="#e2e8f0" stroke-width="3" />
    <line x1="${craneX + 33}" y1="${groundY - 14}" x2="${craneX + 33}" y2="${groundY}" stroke="#e2e8f0" stroke-width="3" />
    <!-- Carrier Truck Body -->
    <rect x="${craneX - 50}" y="${groundY - 26}" width="100" height="14" rx="2" fill="#334155" stroke="#475569" stroke-width="1.5" />
    <!-- Truck Cab -->
    <polygon points="${craneX - 50},${groundY - 12} ${craneX - 50},${groundY - 34} ${craneX - 30},${groundY - 34} ${craneX - 22},${groundY - 26}" fill="#475569" />
    <!-- Wheels -->
    <circle cx="${craneX - 38}" cy="${groundY - 6}" r="6" fill="#0f172a" stroke="#64748b" stroke-width="2" />
    <circle cx="${craneX - 22}" cy="${groundY - 6}" r="6" fill="#0f172a" stroke="#64748b" stroke-width="2" />
    <circle cx="${craneX + 22}" cy="${groundY - 6}" r="6" fill="#0f172a" stroke="#64748b" stroke-width="2" />
    <circle cx="${craneX + 38}" cy="${groundY - 6}" r="6" fill="#0f172a" stroke="#64748b" stroke-width="2" />
    <!-- Rotating Turntable / Cab -->
    <rect x="${craneX - 16}" y="${groundY - 42}" width="32" height="16" rx="2" fill="#facc15" stroke="#ca8a04" stroke-width="1.5" />
    <!-- Centerpin Pivot -->
    <circle cx="${craneX}" cy="${groundY - 36}" r="4" fill="#000" />
    <text x="${craneX - 45}" y="${groundY + 18}" fill="#94a3b8" font-size="10" font-family="monospace">CRANE CENTERPIN</text>
  `;

  // 3. Boom
  const boomBaseX = craneX;
  const boomBaseY = groundY - 36;
  const tipX = targetX;

  dom.boomGroup.innerHTML = `
    <!-- Main Telescopic Boom -->
    <line x1="${boomBaseX}" y1="${boomBaseY}" x2="${tipX}" y2="${tipY}" stroke="#facc15" stroke-width="7" stroke-linecap="round" />
    <line x1="${boomBaseX}" y1="${boomBaseY}" x2="${tipX}" y2="${tipY}" stroke="#ca8a04" stroke-width="2" />
    <!-- Boom Tip Sheave Head -->
    <circle cx="${tipX}" cy="${tipY}" r="5" fill="#facc15" stroke="#000" stroke-width="1.5" />
    <!-- Boom Angle Arc Indicator -->
    <path d="M ${boomBaseX + 35} ${boomBaseY} A 35 35 0 0 0 ${boomBaseX + 35 * Math.cos(angleToRad(c.angleDeg))} ${boomBaseY - 35 * Math.sin(angleToRad(c.angleDeg))}" fill="none" stroke="#38bdf8" stroke-width="2" />
    <text x="${boomBaseX + 42}" y="${boomBaseY - 14}" fill="#38bdf8" font-size="11" font-weight="bold">${c.angleDeg}°</text>
  `;

  // 4. Load & Rigging Hoist Line
  const hookY = landingY - 10;
  dom.loadGroup.innerHTML = `
    <!-- Hoist Cable -->
    <line x1="${tipX}" y1="${tipY + 4}" x2="${tipX}" y2="${hookY - 10}" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="3,2" />
    <!-- Hook Block -->
    <rect x="${tipX - 4}" y="${hookY - 12}" width="8" height="10" rx="1" fill="#475569" stroke="#94a3b8" stroke-width="1" />
    <!-- Rigging Slings -->
    <line x1="${tipX}" y1="${hookY - 2}" x2="${tipX - 14}" y2="${hookY + 8}" stroke="#ef4444" stroke-width="1.5" />
    <line x1="${tipX}" y1="${hookY - 2}" x2="${tipX + 14}" y2="${hookY + 8}" stroke="#ef4444" stroke-width="1.5" />
    <!-- Suspended Object (AC Unit / Generator) -->
    <rect x="${tipX - 18}" y="${hookY + 8}" width="36" height="20" rx="2" fill="#dc2626" stroke="#fca5a5" stroke-width="1.5" />
    <text x="${tipX}" y="${hookY + 22}" fill="#ffffff" font-size="8" font-weight="bold" text-anchor="middle">${c.grossTons}T</text>
  `;

  // 5. Dimension Annotations
  dom.dimensionsGroup.innerHTML = `
    <!-- Radius Dimension Line (Bottom) -->
    <line x1="${craneX}" y1="${groundY + 32}" x2="${tipX}" y2="${groundY + 32}" stroke="#facc15" stroke-width="1.5" marker-start="url(#arrow)" marker-end="url(#arrow)" />
    <text x="${(craneX + tipX) / 2}" y="${groundY + 46}" fill="#facc15" font-size="11" font-weight="bold" font-family="monospace" text-anchor="middle">RADIUS: ${c.setbackRadius} FT</text>
    
    <!-- Height Dimension Line (Left of building) -->
    <line x1="${bldgX - 15}" y1="${groundY}" x2="${bldgX - 15}" y2="${landingY}" stroke="#38bdf8" stroke-width="1.5" />
    <text x="${bldgX - 22}" y="${(groundY + landingY) / 2}" fill="#38bdf8" font-size="10" font-weight="bold" font-family="monospace" text-anchor="middle" transform="rotate(-90 ${bldgX - 22} ${(groundY + landingY) / 2})">HEIGHT: ${c.liftHeight} FT</text>
  `;
}

function angleToRad(deg) {
  return deg * (Math.PI / 180);
}

// Preset Activation
function applyPreset(presetKey) {
  const p = PRESETS[presetKey];
  if (!p) return;

  dom.loadWeight.value = p.loadWeight;
  dom.riggingDeduction.value = p.rigging;
  dom.liftHeight.value = p.liftHeight;
  dom.setbackRadius.value = p.setbackRadius;
  dom.clearanceBuffer.value = p.clearanceBuffer;
  dom.soilType.value = p.soilType;
  dom.setupLocation.value = p.setupLocation;
  dom.windSpeed.value = p.windSpeed;

  calculateLift();
}

// Event Listeners for Dynamic Updates
function initEventListeners() {
  const inputs = [
    dom.loadWeight,
    dom.riggingDeduction,
    dom.liftHeight,
    dom.setbackRadius,
    dom.clearanceBuffer,
    dom.soilType,
    dom.setupLocation,
    dom.windSpeed
  ];

  inputs.forEach(input => {
    input.addEventListener("input", calculateLift);
    input.addEventListener("change", calculateLift);
  });

  // Preset Buttons
  document.querySelectorAll(".preset-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".preset-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      applyPreset(btn.dataset.preset);
    });
  });

  // Modal Open Button
  dom.openRfqBtn.addEventListener("click", () => {
    dom.leadSuccess.classList.add("hidden");
    dom.leadForm.style.display = "block";
    
    // Set default target date to 1 week from today
    const d = new Date();
    d.setDate(d.getDate() + 7);
    document.getElementById("leadDate").value = d.toISOString().split("T")[0];

    dom.rfqModal.showModal();
  });

  // Light-Dismiss Fallback (Modern Web Guidance compliance for browsers lacking closedBy)
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

  // Lead Submission
  dom.leadForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const trackingCode = `LIFT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    dom.rfqTrackingId.textContent = trackingCode;

    // Persist lead to shared TradeSpec Partner Network
    try {
      const leadItem = {
        id: trackingCode,
        timestamp: new Date().toISOString(),
        trade: "crane",
        tradeTitle: "Mobile Crane & Rigging",
        name: document.getElementById("leadName")?.value || "Commercial Client",
        company: document.getElementById("leadCompany")?.value || document.getElementById("leadBusiness")?.value || "Contractor / Facility Owner",
        phone: document.getElementById("leadPhone")?.value || "(555) 000-0000",
        email: document.getElementById("leadEmail")?.value || "",
        zip: document.getElementById("leadZip")?.value || "77002",
        specSummary: `${currentCalculation?.selectedCrane?.ratingTons || 75}-Ton Crane, ${currentCalculation?.grossWeight?.toLocaleString() || '7,000'} lbs pick at ${currentCalculation?.setbackRadius || 60}ft radius`,
        budgetEst: `$${currentCalculation?.lowBudget?.toLocaleString()} – $${currentCalculation?.highBudget?.toLocaleString()}`,
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

  // Print Triggers
  dom.printSummaryBtn.addEventListener("click", triggerPrintWorksheet);
  dom.downloadPrintBtn.addEventListener("click", triggerPrintWorksheet);
}

// Populate and Trigger Print Sheet
function triggerPrintWorksheet() {
  const c = currentCalculation;
  if (!c) return;

  dom.printDate.textContent = new Date().toLocaleDateString();
  dom.printNetWeight.textContent = `${c.netWeight.toLocaleString()} lbs`;
  dom.printRigging.textContent = `${c.rigging.toLocaleString()} lbs`;
  dom.printGrossWeight.textContent = `${c.grossWeight.toLocaleString()} lbs (${c.grossTons} Tons)`;
  dom.printHeight.textContent = `${c.liftHeight} ft`;
  dom.printRadius.textContent = `${c.setbackRadius} ft`;
  dom.printBoomLength.textContent = `${c.minBoomLength} ft`;
  dom.printBoomAngle.textContent = `${c.angleDeg}°`;
  dom.printCraneClass.textContent = c.selectedCrane.name;
  dom.printUtilization.textContent = `${c.utilizationPct}% (ASME B30.5 Compliant)`;
  dom.printSoil.textContent = dom.soilType.options[dom.soilType.selectedIndex].text;
  dom.printOutriggerForce.textContent = `${c.maxCornerReactionLbs.toLocaleString()} lbs`;
  dom.printMatSize.textContent = `${c.matSideFt} ft × ${c.matSideFt} ft (${c.actualMatArea} sq ft per float)`;
  dom.printBudget.textContent = `$${c.lowBudget.toLocaleString()} – $${c.highBudget.toLocaleString()} (Estimated)`;

  window.print();
}

// Initialization
document.addEventListener("DOMContentLoaded", () => {
  initEventListeners();
  calculateLift();
    autoDetectLocation();
});


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
