/**
 * TradeSpec Pro™ — Subcontractor Partner Trade & Metadata Dictionary
 * Shared data structures across Landing Page and Contractor Console
 */

(function(window) {
  'use strict';

  const ALL_TRADE_KEYS = ["charge", "permit", "site", "cold", "crane", "well", "racking", "foam", "grease"];

  const TRADE_META = {
    charge: {
      title: "Commercial EV Fleet Infrastructure",
      short: "EV Charging",
      ticket: 85000,
      leadCost: 225,
      codeBreakdown: [
        { param: "Continuous Duty Circuit Load", code: "NEC 625.41 / 625.42 (125% Rule)", val: "361 Amps Coincident Peak" },
        { param: "Service Voltage & Feed Phase", code: "NFPA 70 Commercial Service Standard", val: "480V 3-Phase Padmount" },
        { param: "Required Dedicated Transformer", code: "Utility Interconnection Standard", val: "225 kVA Commercial Transformer" },
        { param: "Trenching Feeder Conductor Run", code: "NEC 300.5 Underground RMC Conduit", val: "150 ft Rigid Metal Conduit" },
        { param: "IRA Section 30C Tax Credit", code: "Inflation Reduction Act Commercial", val: "30% Federal Credit (~$25,500)" }
      ]
    },
    permit: {
      title: "Commercial Tenant Improvement",
      short: "Tenant TI",
      ticket: 140000,
      leadCost: 275,
      codeBreakdown: [
        { param: "Occupancy Classification & Load", code: "IBC Table 1004.5 Commercial Assembly", val: "160 Persons (15 SF/person Net)" },
        { param: "Required Egress Width & Doors", code: "IBC Section 1005.3.2 / 1006.2", val: "2 Remote Doors (min 36\" clear)" },
        { param: "Commercial Kitchen Exhaust Hood", code: "IMC Section 507 Type I Hood Exhaust", val: "12 ft Hood (4,800 CFM @ 400 CFM/LF)" },
        { param: "ADA Accessibility Path of Travel", code: "Texas TAS Section 202.4 Disproportionality", val: "20% Path of Travel Compliance" }
      ]
    },
    site: {
      title: "Civil Earthwork & Stormwater",
      short: "Civil & Stormwater",
      ticket: 65000,
      leadCost: 185,
      codeBreakdown: [
        { param: "Peak Stormwater Discharge Runoff", code: "Rational Method Q = C * I * A", val: "3.23 CFS (10-Yr 24-Hr Event)" },
        { param: "Required Retention Basin Volume", code: "TCEQ Edwards Aquifer / Local BMP", val: "0.26 Acre-Feet (11,325 cu ft)" },
        { param: "Site Earthwork Cut / Fill Balance", code: "Civil Engineering Mass Haul Volumetrics", val: "800 BCY Cut / 450 BCY Fill" },
        { param: "Segmental Retaining Wall Height", code: "IBC 1807.2 / NCMA Segmental Retaining", val: "6.0 ft Wall (Geogrid Reinforcement)" }
      ]
    },
    cold: {
      title: "Commercial Walk-In Cold Box",
      short: "Cold Storage",
      ticket: 18500,
      leadCost: 95,
      codeBreakdown: [
        { param: "Design Operating Temperature", code: "ASHRAE Standard 15 / Food Safety", val: "+35°F (Holding Cooler)" },
        { param: "Peak Refrigeration Cooling Load", code: "ASHRAE Handbook of Refrigeration", val: "11,850 BTU/hr (16-Hr Defrost Run)" },
        { param: "Condensing Unit Horsepower", code: "Commercial High-Temp Scroll Comp", val: "1.5 HP Medium Temp Scroll" },
        { param: "Insulated Metal Panel Floor (IMP)", code: "DOE Walk-In Cooler Rule / R-29 min", val: "4-inch Polyurethane Foam Panel" }
      ]
    },
    crane: {
      title: "Mobile Crane & Heavy Rigging",
      short: "Crane & Rigging",
      ticket: 3500,
      leadCost: 45,
      codeBreakdown: [
        { param: "Maximum Gross Pick Weight", code: "OSHA 1926.1400 / ASME B30.5", val: "8,500 lbs (Unit + Spreader Bar)" },
        { param: "Working Radius from Center of Pin", code: "Manufacturer Load Chart Radius", val: "55 Feet Operating Radius" },
        { param: "Minimum Boom Tip Height Required", code: "ASME B30.5 Mobile Crane Standard", val: "78 Feet Boom Length" },
        { param: "Crane Load Chart Utilization", code: "Critical Lift Standard (<75%)", val: "58.4% Capacity (Within Safe Limit)" }
      ]
    },
    well: {
      title: "Water Well Drilling & Pumps",
      short: "Water Well",
      ticket: 16000,
      leadCost: 85,
      codeBreakdown: [
        { param: "Drilling Target Total Depth", code: "Texas Water Code Chapter 32 / TDLR", val: "380 Feet Total Bore Depth" },
        { param: "Submersible Pump Horsepower", code: "Hydraulic Head Equation H = hf + h_static", val: "5 HP Submersible (230V 1-Phase)" },
        { param: "Continuous Yield Flow Rate", code: "Continuous Yield Test Standard", val: "45 GPM Sustained Discharge" },
        { param: "Sanitary Surface Casing Grout", code: "TDLR Well Construction Rule 76.1000", val: "100 ft Pressure-Cement Grout Seal" }
      ]
    },
    racking: {
      title: "Warehouse Pallet Racking",
      short: "Pallet Racking",
      ticket: 32000,
      leadCost: 135,
      codeBreakdown: [
        { param: "Total Pallet Storage Capacity", code: "RMI ANSI MH16.1 Design Standard", val: "480 Pallet Positions (40\"x48\")" },
        { param: "Rack Upright Frame Height", code: "Clear Ceiling Clearance Standard", val: "24 ft Teardrop Roll-Formed Upright" },
        { param: "Seismic Design Category (SDC)", code: "IBC 2024 Chapter 16 / ASCE 7-22", val: "SDC B (Anchor Wedge Bolts 3/4\"x5\")" },
        { param: "Flue Space Flammability Clearance", code: "NFPA 13 In-Rack Sprinkler Standard", val: "6\" Transverse Flue Clear Space" }
      ]
    },
    foam: {
      title: "Commercial Spray Foam",
      short: "Spray Foam",
      ticket: 9500,
      leadCost: 60,
      codeBreakdown: [
        { param: "Total Roof Deck & Wall Area", code: "Commercial Thermal Boundary Standard", val: "4,200 Square Feet Surface" },
        { param: "Installed Core Thickness", code: "IECC 2021 Commercial Envelope Table", val: "3.5\" Closed Cell Foam (R-24.5)" },
        { param: "Vapor Permeance Rating", code: "ASTM E96 Desiccant Water Vapor Method", val: "0.8 Perms (Class II Vapor Retarder)" },
        { param: "Ignition Barrier Thermal Coating", code: "IBC 2603.9 / NFPA 286 Intumescent", val: "DC315 Intumescent Barrier (14 mils)" }
      ]
    },
    grease: {
      title: "Commercial Kitchen MEP & Hoods",
      short: "Kitchen MEP",
      ticket: 14000,
      leadCost: 75,
      codeBreakdown: [
        { param: "Hydromechanical Interceptor Sizing", code: "UPC Table 1014.2.1 / ASME A112.14.3", val: "75 GPM Flow / 150 lbs Grease Cap" },
        { param: "Commercial Kitchen Exhaust Airflow", code: "NFPA 96 / IMC Section 507.2", val: "3,600 CFM Exhaust (1,200 FPM Duct)" },
        { param: "Dedicated 100% Tempered MUA", code: "ASHRAE Standard 62.1 Make-Up Air", val: "2,880 CFM MUA (80% Replacement)" },
        { param: "Fire Suppression UL 300 Cylinder", code: "NFPA 17A Wet Chemical System", val: "3-Gallon Wet Chemical Dual Nozzle" }
      ]
    }
  };

  const DEFAULT_LEADS = [
    {
      id: "EV-2026-7812",
      timestamp: "2026-11-07T14:15:00Z",
      trade: "charge",
      tradeTitle: "Commercial EV Fleet",
      name: "Marcus Vance",
      company: "Apex Logistics LLC",
      phone: "(713) 555-8902",
      email: "mvance@apexlogistics.com",
      zip: "77002",
      city: "Houston, TX",
      specSummary: "12x 19.2kW Level 2 Ports, 85kWh Vans, 361A @ 480V, 225kVA Padmount, 150ft Trench",
      budgetEst: "$75,000 – $145,000",
      status: "new"
    },
    {
      id: "TI-2026-6190",
      timestamp: "2026-11-07T10:40:00Z",
      trade: "permit",
      tradeTitle: "Tenant Improvement",
      name: "Elena Rostova",
      company: "Artisan Bakery & Cafe",
      phone: "(469) 555-7391",
      email: "elena@artisanbakery.com",
      zip: "75001",
      city: "Dallas, TX",
      specSummary: "2,400 SF Restaurant, 160 Persons, 2 Remote Exits, 12ft Type I Hood (4,800 CFM), $45/SF TI Credit",
      budgetEst: "$310,000 – $480,000",
      status: "new"
    },
    {
      id: "SITE-2026-4431",
      timestamp: "2026-11-07T09:20:00Z",
      trade: "site",
      tradeTitle: "Civil Earthwork",
      name: "Derrick Cole",
      company: "Cole Commercial Properties",
      phone: "(512) 555-4321",
      email: "dcole@coleproperties.com",
      zip: "78701",
      city: "Austin, TX",
      specSummary: "1.5 Acres, 65% Impervious, 3.23 CFS Runoff, 0.26 Ac-Ft Pond, 800 BCY Cut, 60ft x 6ft Geogrid Wall",
      budgetEst: "$66,000 – $108,000",
      status: "new"
    },
    {
      id: "COLD-2026-5892",
      timestamp: "2026-11-07T08:50:00Z",
      trade: "cold",
      tradeTitle: "Commercial Refrigeration",
      name: "Carlos Mendez",
      company: "Lone Star Brewing Co.",
      phone: "(210) 555-6789",
      email: "carlos@lonestarbrew.com",
      zip: "78205",
      city: "San Antonio, TX",
      specSummary: "10x12x8.5 ft Cooler (+35°F), 11,850 BTU/hr, 1.5 HP Scroll Condenser, 4\" IMP (R-29)",
      budgetEst: "$14,500 – $24,000",
      status: "new"
    },
    {
      id: "LIFT-2026-8491",
      timestamp: "2026-11-06T15:24:00Z",
      trade: "crane",
      tradeTitle: "Crane & Rigging",
      name: "Arthur Pendelton",
      company: "Summit Industrial HVAC",
      phone: "(713) 555-0192",
      email: "apendelton@summithvac.com",
      zip: "77002",
      city: "Houston, TX",
      specSummary: "8,500 lb Rooftop Chiller, 55ft Radius, 78ft Tip Height, 60-Ton Hydraulic Crane, Outrigger Matting",
      budgetEst: "$3,200 – $4,800",
      status: "contacted"
    },
    {
      id: "WELL-2026-3104",
      timestamp: "2026-11-06T12:05:00Z",
      trade: "well",
      tradeTitle: "Water Well Drilling",
      name: "Travis Sterling",
      company: "Sterling Ranch Facilities",
      phone: "(830) 555-3921",
      email: "tsterling@sterlingranch.com",
      zip: "78624",
      city: "Fredericksburg, TX",
      specSummary: "380ft Total Depth, 45 GPM Target, 5 HP Submersible Pump, 100ft Sanitary Grout Seal, 2,500 Gal Storage",
      budgetEst: "$14,800 – $22,500",
      status: "won"
    },
    {
      id: "RACK-2026-7241",
      timestamp: "2026-11-05T16:40:00Z",
      trade: "racking",
      tradeTitle: "Pallet Racking",
      name: "Nathan Drake",
      company: "CrossDock Distribution",
      phone: "(817) 555-6677",
      email: "ndrake@crossdocklogistics.com",
      zip: "76102",
      city: "Fort Worth, TX",
      specSummary: "480 Pallet Positions (40x48), 24ft Uprights, Teardrop Beams (5,000 lb/pair), SDC B Seismic Anchors",
      budgetEst: "$28,000 – $38,000",
      status: "new"
    },
    {
      id: "FOAM-2026-9023",
      timestamp: "2026-11-05T14:10:00Z",
      trade: "foam",
      tradeTitle: "Commercial Spray Foam",
      name: "Hannah Lee",
      company: "Titan Cold Storage Inc.",
      phone: "(972) 555-8812",
      email: "hlee@titancold.com",
      zip: "75201",
      city: "Dallas, TX",
      specSummary: "4,200 SF Roof Deck, 3.5\" Closed Cell Foam (R-24.5), Class II Vapor Barrier, DC315 Intumescent Coating",
      budgetEst: "$8,500 – $12,400",
      status: "contacted"
    },
    {
      id: "FOG-2026-1934",
      timestamp: "2026-11-05T11:30:00Z",
      trade: "grease",
      tradeTitle: "Commercial Kitchen MEP",
      name: "Dominic Silva",
      company: "Silva Hospitality Group",
      phone: "(713) 555-4921",
      email: "dsilva@silvahospitality.com",
      zip: "77006",
      city: "Houston, TX",
      specSummary: "75 GPM Hydromechanical Interceptor, 3,600 CFM Exhaust Hood, 2,880 CFM MUA, UL 300 Wet Chem",
      budgetEst: "$14,200 – $18,500",
      status: "new"
    }
  ];

  const DEFAULT_CONTRACTOR = {
    companyName: "Registered Subcontractor Account",
    contactPerson: "Estimator / Owner",
    licenseNumber: "Pending Verification",
    insuranceBond: "$1,000,000 / $2,000,000 Commercial General Liability",
    dispatchPhone: "(555) 000-0000",
    dispatchEmail: "dispatch@contractor.com",
    baseZip: "77002",
    radius: 60,
    minJob: 2500,
    pin: "1234",
    activeSources: ["charge"],
    walletBalance: 150.00,
    autoReload: true,
    webhookUrl: "",
    webhookSecret: "",
    webhookAutoSync: true,
    transactions: [
      {
        date: new Date().toISOString().split('T')[0],
        desc: "Initial Welcome Territory Credit Allocation",
        amount: 150.00,
        balance: 150.00,
        type: "pos"
      }
    ]
  };

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  window.TradeSpecData = {
    ALL_TRADE_KEYS,
    TRADE_META,
    DEFAULT_LEADS,
    DEFAULT_CONTRACTOR,
    escapeHtml
  };
})(window);
