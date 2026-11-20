# -*- coding: utf-8 -*-
"""
TradeSpec Pro™ — Programmatic Location & Code-Specific SEO Data Catalog
Contains genuinely differentiated state/municipal engineering codes, local amendments,
worked examples, permit agencies, and technical FAQs for 21 high-intent commercial pages.
"""

BASE_URL = "https://prabhnoor12.github.io/tradespec-pro"
LAST_MOD = "2026-11-20"

TOOLS_META = {
    "crane-lift": {
        "name": "Crane Sizing & Radius Calculator",
        "short": "RigCheck Pro",
        "calc_mode": "crane",
        "related": ["permit-spec", "site-spec", "pallet-racking"]
    },
    "grease-trap": {
        "name": "Commercial Grease Trap & Hood CFM Calculator",
        "short": "FOGSpec Pro",
        "calc_mode": "grease",
        "related": ["permit-spec", "cold-spec", "site-spec"]
    },
    "charge-spec": {
        "name": "Commercial EV Fleet & Infrastructure Calculator",
        "short": "ChargeSpec Pro",
        "calc_mode": "ev",
        "related": ["permit-spec", "site-spec", "crane-lift"]
    },
    "site-spec": {
        "name": "Civil Earthwork & Stormwater Runoff Calculator",
        "short": "SiteSpec Pro",
        "calc_mode": "stormwater",
        "related": ["permit-spec", "crane-lift", "well-drilling"]
    },
    "permit-spec": {
        "name": "Commercial Tenant Improvement & Occupancy Calculator",
        "short": "PermitSpec Pro",
        "calc_mode": "ti",
        "related": ["charge-spec", "grease-trap", "cold-spec"]
    },
    "cold-spec": {
        "name": "Walk-In Cooler & Cold Storage BTU Calculator",
        "short": "ColdSpec Pro",
        "calc_mode": "cold",
        "related": ["grease-trap", "permit-spec", "spray-foam"]
    },
    "well-drilling": {
        "name": "Commercial Water Well & Pump Calculator",
        "short": "WellSpec Pro",
        "calc_mode": "well",
        "related": ["site-spec", "charge-spec", "permit-spec"]
    },
    "pallet-racking": {
        "name": "Warehouse Pallet Racking Layout Calculator",
        "short": "RackSpec Pro",
        "calc_mode": "racking",
        "related": ["permit-spec", "crane-lift", "spray-foam"]
    },
    "spray-foam": {
        "name": "Commercial Spray Foam Board Foot Calculator",
        "short": "FoamSpec Pro",
        "calc_mode": "foam",
        "related": ["cold-spec", "permit-spec", "pallet-racking"]
    },
}

PAGES = [
    # =========================================================================
    # 1. CRANE LIFT (4 JURISDICTIONS)
    # =========================================================================
    {
        "tool": "crane-lift",
        "slug": "texas-osha",
        "jurisdiction": "Texas (Houston, Dallas-Fort Worth, Austin)",
        "short_label": "Texas — OSHA 1926 & TxDOT",
        "code_badge": "OSHA 29 CFR 1926 Subpart CC • TxDOT",
        "title": "Texas Crane Load Radius & Outrigger Mat Calculator (OSHA 1926 & TxDOT)",
        "description": "Calculate mobile crane tonnage, boom radius, and outrigger mat sizing for Texas commercial lifts under OSHA 29 CFR 1926.1400, TxDOT oversize permits, and Gulf Coast clay soils.",
        "keywords": "texas crane size calculator, crane load radius calculator osha 1926, houston crane outrigger mat calculator, txdot crane permit, dallas mobile crane sizing",
        "h1": "Texas Mobile Crane Sizing &amp; Outrigger Calculator (OSHA 1926 Subpart CC)",
        "lead": "Size hydraulic truck and all-terrain cranes for Texas commercial HVAC, steel erection, and tilt-wall picks. Pre-configured for OSHA 29 CFR 1926.1402 ground bearing rules on expansive Houston/DFW clay soils and TxDOT transport thresholds.",
        "meta_cards": [
            ("Governing Safety Code", "OSHA 29 CFR 1926.1400–1442"),
            ("Transport / Street Agency", "TxDOT ProMiles & Local ROW"),
            ("Typical Clay Soil Bearing", "1,500 – 2,000 PSF (Houston/DFW)"),
            ("Wind Shut-Down Reference", "20–30 mph (Chart / ASCE 7)")
        ],
        "calc_defaults": {
            "rigging_factor": "1.15",
            "load": 14000,
            "radius": 60,
            "soil": 1800
        },
        "intro_heading": "Why Texas Crane Picks Require Larger Outrigger Cribbing & Strict Wind Planning",
        "intro_body": [
            "Texas is a Federal OSHA jurisdiction for private commercial construction, meaning every mobile crane lift in Houston, Dallas-Fort Worth, Austin, and San Antonio is governed by OSHA 29 CFR 1926 Subpart CC (1926.1400–1442) alongside ASME B30.5. Under 1926.1402, the controlling entity—typically the general contractor or property owner—is legally responsible for verifying ground conditions before the crane sets up.",
            "In the Gulf Coast and North Texas corridors, high-plasticity expansive clay (Beaumont clay in Houston, Eagle Ford clay in DFW) frequently tests at just 1,500 to 2,000 PSF allowable bearing pressure after rain. Placing an undersized 4 ft × 4 ft pad under a 90-ton crane outrigger can punch through asphalt or cause differential settlement during a boom swing."
        ],
        "code_table": [
            ("OSHA 1926.1402", "Ground Conditions & Controlling Entity", "GC must ensure ground is firm, drained, and graded; outrigger mats must keep bearing pressure below local clay limits."),
            ("OSHA 1926.1408", "Power Line Clearance (ERCOT / CenterPoint)", "Minimum 20 ft clearance for lines up to 350 kV unless utility de-energizes or dedicated spotter/encroachment plan is active."),
            ("OSHA 1926.1427", "Operator Certification", "NCCCO, CIC, or NCCER accredited certification mandatory by crane type and capacity."),
            ("TxDOT 43 TAC §219", "Self-Propelled Crane Road Permits", "Annual or single-trip TxDOT ProMiles oversize/overweight permit required for cranes exceeding 80,000 lbs GVW or legal axle weights."),
            ("ASME B30.5", "Critical Lift Threshold", "Written lift plan and Lift Director required when gross load exceeds 75% of chart capacity or involves tandem picks.")
        ],
        "formula_title": "Outrigger Mat Area & Gross Pick Formula (Texas Clay Default)",
        "formula_expr": "Gross Load = Net Weight × 1.15 (Rigging)   |   Min Mat Area (sq ft) = Corner Reaction (lbs) ÷ Soil PSF",
        "worked_example_title": "Worked Example: 14,000 lb Rooftop Chiller Pick in Houston, TX",
        "worked_example_steps": [
            "<strong>Step 1 — Gross Pick Weight:</strong> 14,000 lb chiller + 2,100 lb spreader bar, slings, and hook block (15% rigging allowance) = <strong>16,100 lbs gross</strong>.",
            "<strong>Step 2 — Radius & Crane Class:</strong> 60 ft horizontal setback from curb to roof dunnage requires a <strong>85-Ton to 100-Ton hydraulic crane</strong> to stay under the 75% non-critical chart limit.",
            "<strong>Step 3 — Outrigger Corner Reaction:</strong> Peak swing reaction over one corner float ≈ <strong>78,000 lbs</strong>.",
            "<strong>Step 4 — Houston Clay Mat Sizing:</strong> At 1,800 PSF allowable bearing pressure, 78,000 ÷ 1,800 = <strong>43.3 sq ft</strong> (approx. 6.6 ft × 6.6 ft engineered composite or layered hardwood crane mats)."
        ],
        "checklist": [
            ("STEP 01", "Verify Controlling Entity Ground Sign-Off", "Check for underground detention vaults, sanitary sewer lines, and soft clay shoulders before crane arrival per OSHA 1926.1402."),
            ("STEP 02", "File Municipal ROW / Street Closure", "City of Houston Mobility Permit or City of Dallas Right-of-Way permit requires a stamped Traffic Control Plan (TCP) 5–10 business days ahead."),
            ("STEP 03", "Confirm Utility Clearances", "Coordinate with CenterPoint Energy or Oncor if boom swing approaches overhead distribution feeders within 20 feet."),
            ("STEP 04", "Monitor Gulf Coast Gust Limits", "Suspend picks if sustained winds or gusts exceed manufacturer chart derating limits (typically 20–25 mph for high-sail-area HVAC units).")
        ],
        "faqs": [
            ("Does Texas have its own state crane license or does it follow Federal OSHA?", "Texas does not issue a separate state crane operator license. Private commercial lifts follow Federal OSHA 29 CFR 1926.1427, which requires nationally accredited certification (such as NCCCO or NCCER) for the specific crane type."),
            ("What soil bearing pressure should I use for outrigger mats in Houston or Dallas?", "Unless a geotechnical report proves otherwise, conservative riggers use 1,500 to 2,000 PSF for wet Gulf Coast or North Texas clay, and 2,500 to 3,000 PSF for compacted crushed limestone base."),
            ("Do I need a TxDOT permit to drive a 90-ton crane to a Texas jobsite?", "Yes. Most 60-ton and larger hydraulic cranes exceed standard 80,000 lb gross vehicle weight or axle weight limits and require a TxDOT ProMiles oversize/overweight permit."),
            ("How far in advance do I need a street closure permit for a crane in Austin or Houston?", "Plan for 5 to 14 business days for a municipal Right-of-Way / Traffic Control Plan (TCP) approval when closing a travel lane or sidewalk.")
        ]
    },
    {
        "tool": "crane-lift",
        "slug": "california-calosha",
        "jurisdiction": "California (Los Angeles, Bay Area, San Diego)",
        "short_label": "California — Cal/OSHA Title 8",
        "code_badge": "Cal/OSHA Title 8 Group 13 • Caltrans",
        "title": "California Mobile Crane Sizing Calculator (Cal/OSHA Title 8 & Caltrans)",
        "description": "Free California crane load radius and outrigger sizing calculator compliant with Cal/OSHA Title 8 (§4884–5049), accredited crane certification, and LADOT/Caltrans lift permits.",
        "keywords": "california crane sizing calculator, cal osha crane requirements title 8, los angeles crane permit calculator, caltrans crane load radius, mobile crane outrigger mat california",
        "h1": "California Mobile Crane Sizing Calculator (Cal/OSHA Title 8, Group 13)",
        "lead": "Plan commercial crane picks across Los Angeles, San Francisco, and San Diego under California's stricter Cal/OSHA Title 8 crane regulations, mandatory state-accredited crane certification, and urban street-closure rules.",
        "meta_cards": [
            ("Governing Safety Code", "Cal/OSHA Title 8, §§4884–5049"),
            ("Transport / Street Agency", "Caltrans & LADOT / SFMTA"),
            ("Annual Crane Inspection", "Cal/OSHA Accredited Certifier"),
            ("Typical Alluvial Bearing", "2,000 – 2,500 PSF (SoCal/Bay)")
        ],
        "calc_defaults": {
            "rigging_factor": "1.18",
            "load": 10000,
            "radius": 55,
            "soil": 2200
        },
        "intro_heading": "How Cal/OSHA Title 8 Differs From Federal OSHA on Mobile Crane Picks",
        "intro_body": [
            "California operates an independent State Plan under Cal/OSHA Title 8, Group 13 (Cranes and Other Hoisting Equipment, §§4884–5049) that enforces stricter certification and inspection standards than Federal OSHA 1926 Subpart CC. Every mobile crane exceeding 3 tons rated capacity operating in California must hold a current annual certificate from a Cal/OSHA-accredited certifying agency.",
            "Urban jobsites in Los Angeles, San Jose, and San Francisco also face tight alley setbacks, subterranean parking structures, and strict municipal noise and lane-closure windows (LADOT Peak Hour Exemptions, SFMTA Special Traffic Permits)."
        ],
        "code_table": [
            ("Cal/OSHA §5021", "Mandatory Crane Certification", "Annual & quadrennial certification by a Cal/OSHA-accredited certifier is mandatory for cranes over 3 tons capacity."),
            ("Cal/OSHA §5006.1", "Operator Qualification", "Operators must hold valid accredited certification plus physical exam (ASME B30.5 medical requirements) and substance testing."),
            ("Cal/OSHA §4994", "Hoisting & Ground Stability", "Outriggers must be fully extended per chart; cribbing required to distribute load over soft alluvial soils or subterranean slabs."),
            ("Cal/OSHA §2946", "High-Voltage Clearance", "Strict minimum approach distances from PG&E, SCE, and LADWP energized overhead lines (10–20+ ft based on voltage)."),
            ("Caltrans / LADOT", "Peak Hour & Haul Permits", "Oversize crane mobilization requires Caltrans Transportation Permit plus local Peak Hour Exemption for arterial street closures.")
        ],
        "formula_title": "Cal/OSHA Pick Margin & Outrigger Bearing Formula",
        "formula_expr": "Gross Pick = Net Load × 1.18 (CA Rigging/Headache Ball)   |   Mat Area = Corner Load ÷ Soil PSF",
        "worked_example_title": "Worked Example: 10,000 lb Commercial Air Handler Pick in Los Angeles, CA",
        "worked_example_steps": [
            "<strong>Step 1 — Gross Pick Weight:</strong> 10,000 lb AHU + 1,800 lb rigging gear, slings, and hook block = <strong>11,800 lbs gross</strong>.",
            "<strong>Step 2 — Radius & Crane Class:</strong> 55 ft radius over a 2-story retail parapet requires a <strong>60-Ton to 75-Ton hydraulic crane</strong> with jib or main boom clearance.",
            "<strong>Step 3 — Outrigger Corner Reaction:</strong> Peak swing force ≈ <strong>58,500 lbs</strong> on the load-side outrigger.",
            "<strong>Step 4 — Mat Sizing:</strong> On 2,200 PSF compacted SoCal soil, 58,500 ÷ 2,200 = <strong>26.6 sq ft</strong> (minimum 5.2 ft × 5.2 ft cribbing pads)."
        ],
        "checklist": [
            ("STEP 01", "Verify Cal/OSHA Annual Cert Sticker", "Request the crane rental company's current Cal/OSHA §5021 annual inspection certificate before mobilization."),
            ("STEP 02", "Check Subterranean Vaults & Shoring", "In LA and SF urban cores, verify whether sidewalks or parking decks sit over basements; structural PE shoring review is required."),
            ("STEP 03", "Secure LADOT / SFMTA Street Permit", "Submit stamped Traffic Control Plans 10–15 business days prior; weekend picks are often mandated on arterial boulevards."),
            ("STEP 04", "Document Critical Lift Plan", "Any pick over 75% capacity, blind pick, or pick over occupied commercial space requires a written lift plan on site.")
        ],
        "faqs": [
            ("Is Federal OSHA NCCCO certification valid in California?", "Yes, NCCCO and other nationally accredited certifications meet Cal/OSHA §5006.1, provided the operator also maintains current ASME B30.5 medical and substance-testing compliance."),
            ("Does California require a state inspection sticker on every mobile crane?", "Yes. Under Cal/OSHA Title 8 §5021, mobile cranes over 3 tons capacity must be inspected and certified annually by a Cal/OSHA-accredited certifying agency."),
            ("Can I set crane outriggers over an underground parking garage in Los Angeles?", "Never without a licensed California Structural Engineer (SE/PE) shoring analysis. Outrigger corner reactions easily exceed 50,000–100,000 lbs and will punch through post-tensioned slabs."),
            ("How long does a Los Angeles crane street closure permit take?", "LADOT and Bureau of Street Services (BSS) permits typically require 10 to 15 business days, especially if a Peak Hour Exemption or Metro bus reroute is involved.")
        ]
    },
    {
        "tool": "crane-lift",
        "slug": "nyc-dob",
        "jurisdiction": "New York City (5 Boroughs — Manhattan, Brooklyn, Queens)",
        "short_label": "NYC — DOB Chapter 33",
        "code_badge": "NYC BC Chapter 33 • DOB Cranes & Derricks",
        "title": "NYC Mobile Crane Sizing & Lift Plan Calculator (NYC DOB BC Chapter 33)",
        "description": "Size mobile cranes for New York City commercial lifts under NYC DOB Building Code Chapter 33, Cranes & Derricks CD-1/CD-2 filings, Master Rigger rules, and NYCDOT OCMC permits.",
        "keywords": "nyc crane permit calculator, nyc dob cranes and derricks, nyc building code chapter 33 crane, manhattan crane sizing calculator, nyc master rigger lift plan",
        "h1": "NYC Mobile Crane Sizing &amp; Pick Plan Calculator (NYC DOB Chapter 33)",
        "lead": "Navigate the strictest urban crane regulations in North America. Estimate mobile crane class, boom clearance, and outrigger loads aligned with NYC DOB Building Code Chapter 33, Cranes &amp; Derricks (C&amp;D) filings, and NYCDOT street closures.",
        "meta_cards": [
            ("Governing Safety Code", "NYC BC Chapter 33 (§3319)"),
            ("Permit Authority", "NYC DOB C&D Unit & NYCDOT"),
            ("Required Supervision", "NYC Licensed Master Rigger / HMO"),
            ("Wind Action Threshold", "20–30 mph (DOB Wind Plan)")
        ],
        "calc_defaults": {
            "rigging_factor": "1.20",
            "load": 8500,
            "radius": 65,
            "soil": 2500
        },
        "intro_heading": "NYC DOB Cranes & Derricks (C&D) Compliance Essentials",
        "intro_body": [
            "Operating a mobile crane in Manhattan, Brooklyn, Queens, the Bronx, or Staten Island requires far more than Federal OSHA compliance. Under NYC Building Code §3319 and 1 RCNY §3319-01, cranes with booms exceeding certain lengths or capacities require an engineered Crane Notice (CN) filing engineered by a New York PE, a Licensed Hoist Machine Operator (HMO Class A, B, or C), and a NYC Licensed Master Rigger.",
            "Additionally, NYC streets sit atop dense networks of Con Edison steam/electric vaults, subway tunnels, and brick sewers. Outrigger placement over roadway vaults requires steel load-distributing dunnage beams and NYCDOT OCMC (Office of Construction Mitigation and Coordination) street stipulations."
        ],
        "code_table": [
            ("NYC BC §3319", "Crane Notice (CN) & CD Filings", "Engineered CN filing with NYC DOB Cranes & Derricks unit mandatory for most mobile crane picks over 50 ft boom or street setups."),
            ("1 RCNY §3319-01", "Wind Action Plan & Anemometer", "Mandatory calibrated anemometer and wind action plan; operations halt per chart or 30 mph (20 mph for high-wind-area loads)."),
            ("NYC BC §3316", "Master Rigger Supervision", "Critical picks, picks over 2,000 lbs on public right-of-way, or complex rigging require a NYC Licensed Master Rigger on site."),
            ("Local Law 196", "Site Safety Training (SST)", "All rigging crew and signalpersons must hold valid 40-hour SST cards plus DOB-approved 16-hr or 32-hr rigging cards."),
            ("NYCDOT OCMC", "Full Street Closure & Vault Check", "Weekend street closures and Con Edison/MTA subway vault clearances required before crane mobilization.")
        ],
        "formula_title": "NYC Urban Pick & Dunnage Distribution Formula",
        "formula_expr": "Gross Pick = Net Load × 1.20 (NYC Safety Allowance)   |   Dunnage Area = Corner Reaction ÷ Allowable Street PSF",
        "worked_example_title": "Worked Example: 8,500 lb Cooling Tower Lift in Midtown Manhattan",
        "worked_example_steps": [
            "<strong>Step 1 — Gross Pick Weight:</strong> 8,500 lb cooling tower module + 1,700 lb engineered spreader beam, shackles, and rigging = <strong>10,200 lbs gross</strong>.",
            "<strong>Step 2 — Radius & Crane Class:</strong> 65 ft horizontal reach over a 6-story facade requires a <strong>65-Ton to 90-Ton crane</strong> with luffing or swing-away jib.",
            "<strong>Step 3 — Peak Outrigger Reaction:</strong> Single-float reaction ≈ <strong>64,000 lbs</strong>.",
            "<strong>Step 4 — Roadway Dunnage:</strong> At 2,500 PSF conservative roadway limit, requires <strong>25.6 sq ft</strong> steel/timber cribbing pads positioned clear of Con Ed vault hatches."
        ],
        "checklist": [
            ("STEP 01", "Engage NY PE for DOB CN Filing", "Determine if the lift qualifies for Limited Use (CD-4) or requires a full engineered Crane Notice (CN) package with NYC DOB."),
            ("STEP 02", "Verify Vaults & Subway Proximity", "Check NYC Transit (MTA) and Con Edison vault maps; outriggers cannot bear directly on hollow sidewalk vaults without engineered steel bridging."),
            ("STEP 03", "Assign Licensed HMO & Master Rigger", "Verify active NYC DOB Hoist Machine Operator license and Master Rigger / Rigging Foreman credentials."),
            ("STEP 04", "Obtain NYCDOT OCMC Stipulations", "File for weekend street closure permits and pedestrian protection signage 2–4 weeks prior to pick date.")
        ],
        "faqs": [
            ("When is a NYC DOB Crane Notice (CN) required for a mobile crane?", "Under NYC BC §3319, a Crane Notice filed by a NY Professional Engineer is generally required for mobile cranes with booms exceeding 50 feet or capacity exceeding 3 tons, unless qualifying for specific short-term exemptions."),
            ("Can an out-of-state NCCCO operator run a crane in New York City?", "No. New York City requires its own NYC DOB Hoist Machine Operator (HMO) license (Class A, B, or C) in addition to national certification."),
            ("What is the wind speed limit for cranes in NYC?", "NYC DOB enforces manufacturer wind limits strictly and requires cranes to cease operations and secure booms when wind gusts reach 30 mph (or lower if specified by the crane load chart or high-sail load)."),
            ("Why do NYC crane picks almost always happen on weekends?", "NYCDOT OCMC restricts full lane and street closures in Manhattan and major commercial corridors to Saturday/Sunday off-peak hours to minimize transit disruption.")
        ]
    },
    {
        "tool": "crane-lift",
        "slug": "florida-hvhz",
        "jurisdiction": "Florida (Miami-Dade, Tampa, Orlando, Jacksonville)",
        "short_label": "Florida — OSHA & HVHZ Sandy Soil",
        "code_badge": "OSHA 1926 Subpart CC • FBC HVHZ • FDOT",
        "title": "Florida Crane Sizing & Outrigger Mat Calculator (OSHA 1926 & Sandy Soils)",
        "description": "Calculate mobile crane tonnage and outrigger mat sizing for Florida commercial projects. Accounts for loose coastal sandy soils, high water tables, FDOT permits, and hurricane wind rules.",
        "keywords": "florida crane sizing calculator, miami crane outrigger mat calculator, fdot crane permit, florida sandy soil bearing pressure crane, tampa mobile crane calculator",
        "h1": "Florida Mobile Crane Sizing &amp; Outrigger Calculator (OSHA 1926 &amp; Coastal Soils)",
        "lead": "Size mobile cranes and heavy-duty outrigger cribbing for Florida commercial roofs, marine terminals, and tilt-wall sites. Tailored for low-bearing coastal sands, high water tables, and FDOT mobilization rules.",
        "meta_cards": [
            ("Governing Safety Code", "OSHA 29 CFR 1926 Subpart CC"),
            ("Transport Agency", "FDOT Permit Office (PAS)"),
            ("Coastal Sand Bearing", "1,500 – 2,000 PSF (High Water Table)"),
            ("Wind / Storm Protocol", "ASCE 7 / Afternoon Squall Watch")
        ],
        "calc_defaults": {
            "rigging_factor": "1.15",
            "load": 11000,
            "radius": 55,
            "soil": 1600
        },
        "intro_heading": "Why Florida's High Water Table & Loose Sands Demand Extra Cribbing",
        "intro_body": [
            "Florida follows Federal OSHA 29 CFR 1926 Subpart CC for mobile crane operations, but coastal geology creates unique ground-stability hazards. Across Miami-Dade, Broward, Tampa Bay, and coastal Jacksonville, shallow water tables (often 2–4 feet below grade) and loose fine sands drastically reduce allowable soil bearing capacity to 1,500 PSF or less.",
            "In addition, Florida Building Code High-Velocity Hurricane Zone (HVHZ) rooftop mechanical equipment is significantly heavier due to reinforced hurricane curbs and steel frames—requiring careful gross-weight verification before dispatching a crane."
        ],
        "code_table": [
            ("OSHA 1926.1402", "Saturated Sand Ground Conditions", "High water tables and sandy shoulders require oversized composite/timber mats to prevent outrigger punching shear."),
            ("FDOT Rule 14-26", "Self-Propelled Crane Permits", "FDOT Permit Application System (PAS) blanket or trip permits required for cranes over 80,000 lbs or exceeding legal bridge axle formulas."),
            ("FBC HVHZ", "Hurricane-Rated RTU Weights", "Miami-Dade/Broward HVHZ HVAC curbs and tiedowns add 10–20% dead weight compared to standard inland specs."),
            ("OSHA 1926.1417", "Lightning & Squall Shutdown", "Florida leads the US in lightning strikes; boom must be lowered/secured when convective squalls approach within 10 miles.")
        ],
        "formula_title": "Florida Coastal Sand Outrigger Mat Formula",
        "formula_expr": "Gross Weight = (HVHZ Unit + Curb + Rigging) × 1.15   |   Mat Area (sq ft) = Peak Outrigger Load ÷ 1,600 PSF",
        "worked_example_title": "Worked Example: 11,000 lb HVHZ Rooftop Unit in Miami, FL",
        "worked_example_steps": [
            "<strong>Step 1 — Gross Pick Weight:</strong> 11,000 lb HVHZ-rated rooftop unit + 1,650 lb spreader bar and rigging = <strong>12,650 lbs gross</strong>.",
            "<strong>Step 2 — Radius & Crane Class:</strong> 55 ft reach across landscaped swale requires a <strong>65-Ton to 75-Ton hydraulic crane</strong>.",
            "<strong>Step 3 — Outrigger Corner Reaction:</strong> Peak swing force ≈ <strong>61,000 lbs</strong>.",
            "<strong>Step 4 — Coastal Sand Cribbing:</strong> At 1,600 PSF saturated sand capacity, 61,000 ÷ 1,600 = <strong>38.1 sq ft</strong> (6.2 ft × 6.2 ft layered crane mats)."
        ],
        "checklist": [
            ("STEP 01", "Verify Exact HVHZ Unit Shipping Weight", "Confirm whether hurricane rails, hail guards, and steel curbs are shipped bolted to the unit before selecting crane tonnage."),
            ("STEP 02", "Inspect Stormwater Swales & Retention Slopes", "Never set an outrigger within the 1:1 slope influence zone of a Florida retention pond or drainage canal."),
            ("STEP 03", "Secure FDOT & County MOT Permit", "Maintenance of Traffic (MOT) plan stamped by an FDOT-certified Advanced MOT specialist is mandatory for roadway setups."),
            ("STEP 04", "Schedule Early Morning Picks", "Complete critical lifts before afternoon sea-breeze thunderstorms and 25+ mph gusts build.")
        ],
        "faqs": [
            ("What soil bearing value is safe for Florida sandy soils?", "Loose or saturated Florida sand typically supports 1,500 to 2,000 PSF. Always keep outriggers back from retention pond embankments by at least 1.5× the slope depth."),
            ("Does Florida require a state crane operator license?", "No, Florida follows Federal OSHA 29 CFR 1926.1427 requiring nationally accredited operator certification (NCCCO/NCCER/CIC)."),
            ("Who can sign a Maintenance of Traffic (MOT) plan for a Florida crane closure?", "Roadway lane closures in Florida require a plan prepared or overseen by an FDOT-certified Intermediate or Advanced MOT specialist."),
            ("Do Miami-Dade HVHZ rooftop units weigh more than standard units?", "Yes. Reinforced structural frames, hurricane tie-down curbs, and heavy-gauge cabinetry often add 500 to 2,500 lbs to commercial rooftop HVAC picks.")
        ]
    },

    # =========================================================================
    # 2. GREASE TRAP (4 JURISDICTIONS)
    # =========================================================================
    {
        "tool": "grease-trap",
        "slug": "california-upc",
        "jurisdiction": "California & Los Angeles (CPC / UPC / LA Sanitation FOG)",
        "short_label": "California / LA — CPC & UPC",
        "code_badge": "California Plumbing Code • UPC Table 1014.3.6",
        "title": "California & Los Angeles Grease Trap Sizing Calculator (CPC / UPC)",
        "description": "Size commercial kitchen grease interceptors for California and Los Angeles under CPC / UPC Table 1014.3.6, DFU gravity vault rules, and LA Sanitation FOG program requirements.",
        "keywords": "grease trap sizing upc los angeles plumbing code, california grease interceptor calculator, cpc table 1014.3.6, la sanitation fog permit, california restaurant grease trap size",
        "h1": "California &amp; Los Angeles Grease Trap Sizing Calculator (CPC / UPC)",
        "lead": "Calculate hydromechanical (GPM) and gravity grease interceptor (gallon vault) sizing compliant with the California Plumbing Code (CPC Chapter 10), UPC Table 1014.3.6 Drainage Fixture Units (DFUs), and LA Sanitation FOG ordinances.",
        "meta_cards": [
            ("Governing Plumbing Code", "California Plumbing Code (UPC)"),
            ("Gravity Sizing Method", "UPC Table 1014.3.6 (DFU-Based)"),
            ("Local FOG Authority", "LA Sanitation (LASAN) / Local POTW"),
            ("Pump-Out Rule", "25% Rule (FOG + Solids)")
        ],
        "calc_defaults": {
            "code_style": "UPC",
            "sinks": 3,
            "vol": 20,
            "seats": 100
        },
        "intro_heading": "California Plumbing Code (UPC) vs. IPC Grease Interceptor Rules",
        "intro_body": [
            "Unlike Texas or Florida (which use the International Plumbing Code), California enforces the California Plumbing Code (CPC), based on the Uniform Plumbing Code (UPC). Under CPC Section 1014.3.6, Gravity Grease Interceptors (GGIs) are sized strictly by total Drainage Fixture Units (DFUs) connected to the kitchen waste line—typically starting at 500 to 750 gallons minimum and scaling to 1,000, 1,250, or 1,500+ gallons for full-service restaurants.",
            "In the City of Los Angeles, LA Sanitation (LASAN) enforces the Fats, Oils, and Grease (FOG) Control Program, requiring a dedicated sample box on the outlet line, strict adherence to the 25% FOG + settled solids rule, and prohibition of garbage disposals (food waste grinders) discharging into grease interceptors."
        ],
        "code_table": [
            ("CPC §1014.2.1", "Hydromechanical (HGI) Flow Control", "Requires vented flow control device limiting flow rate to the interceptor's rated GPM (typically 20–100 GPM indoor)."),
            ("UPC Table 1014.3.6", "Gravity Interceptor (GGI) DFU Table", "Up to 8 DFUs = 500 gal; 9–21 DFUs = 750 gal; 22–35 DFUs = 1,000 gal; 36–90 DFUs = 1,250 gal; 91–172 DFUs = 1,500 gal."),
            ("LASAN FOG Rule", "25% Maintenance Rule", "Interceptor must be pumped when combined floating grease and settled solids reach 25% of total liquid depth."),
            ("CPC §1014.1.3", "Food Waste Disposals Prohibited", "Commercial garbage disposals cannot discharge into hydromechanical grease interceptors in most California jurisdictions."),
            ("Title 24 / NFPA 96", "Exhaust Hood & MUA Integration", "Commercial kitchens pairing grease traps with Type I hoods must include Title 24 demand-controlled kitchen ventilation (DCKV).")
        ],
        "formula_title": "CPC / UPC Hydromechanical & Gravity Sizing Formulas",
        "formula_expr": "HGI GPM = (Total Sink Volume in Gal × 0.75) ÷ 1 min   |   GGI Gallons = Lookup Total Kitchen DFUs in CPC Table 1014.3.6",
        "worked_example_title": "Worked Example: 100-Seat Full-Service Restaurant in Los Angeles, CA",
        "worked_example_steps": [
            "<strong>Step 1 — Count Kitchen DFUs:</strong> 3-compartment sink (3 DFU) + pre-rinse sink (2 DFU) + mop sink (3 DFU) + 3 floor sinks (6 DFU) + wok/prep sinks (4 DFU) = <strong>18 Total DFUs</strong>.",
            "<strong>Step 2 — UPC Table 1014.3.6 Lookup:</strong> 9 to 21 DFUs mandates a minimum <strong>750-Gallon Gravity Grease Interceptor</strong> (many LA plan checkers round up to 1,000 gal for high-grease concepts).",
            "<strong>Step 3 — Indoor HGI Alternative (If Variance Granted):</strong> 3 compartments × 20 gal = 60 gal × 0.75 = <strong>45 GPM → 50 GPM (100 lb)</strong> high-capacity Schier/Zurn HGI.",
            "<strong>Step 4 — Sample Box & Permit:</strong> Install a LASAN-approved downstream sample box prior to tie-in to the building sanitary lateral."
        ],
        "checklist": [
            ("STEP 01", "Submit Kitchen Plumbing Isometric to LADBS / Local Building Dept", "Include exact DFU schedule showing all grease-bearing fixtures separated from restroom blackwater lines."),
            ("STEP 02", "Verify LASAN / POTW FOG Clearance", "Obtain Industrial Waste Management Division (IWMD) sign-off on interceptor size and exterior sample box placement."),
            ("STEP 03", "Confirm Traffic-Rated H-20 Cover", "Outdoor gravity vaults installed in parking lots or drive aisles must be H-20 traffic rated with gas-tight access rings."),
            ("STEP 04", "Establish Manifested Pumping Contract", "Keep 3 years of manifested grease hauler receipts on site for LA County Health & LASAN FOG inspections.")
        ],
        "faqs": [
            ("Does Los Angeles allow indoor hydromechanical grease traps for full-service restaurants?", "Generally, LA Sanitation requires an outdoor Gravity Grease Interceptor (750–1,500+ gal) for new full-service restaurants. Indoor high-capacity hydromechanical units (50–100+ GPM) are typically only approved for existing tenant spaces with documented space/structural hardship variances."),
            ("How many DFUs require a 1,000-gallon grease interceptor under California Plumbing Code?", "Under CPC / UPC Table 1014.3.6, between 22 and 35 connected kitchen Drainage Fixture Units (DFUs) require a 1,000-gallon gravity grease interceptor."),
            ("Can a commercial dishwasher connect to a grease trap in California?", "High-temperature dishwashers (>140°F) are generally prohibited from discharging into small indoor hydromechanical traps because hot water emulsifies grease. Some jurisdictions allow discharge into large outdoor gravity interceptors—verify with local POTW."),
            ("What is the 25% Rule for California grease interceptors?", "When the combined thickness of the top floating grease mat and bottom food solids equals 25% of the interceptor's total liquid depth, the trap must be completely pumped and cleaned.")
        ]
    },
    {
        "tool": "grease-trap",
        "slug": "texas-ipc",
        "jurisdiction": "Texas (Houston, Dallas, Austin, San Antonio)",
        "short_label": "Texas — IPC & Houston Ch. 47",
        "code_badge": "IPC Table 1003.3.5.1 • City of Houston Ch. 47",
        "title": "Texas & Houston Grease Trap Sizing Calculator (IPC §1003 & FOG)",
        "description": "Size commercial grease traps and interceptors for Texas restaurants under IPC Table 1003.3.5.1, City of Houston Chapter 47 FOG rules, and Dallas/Austin plumbing ordinances.",
        "keywords": "texas grease trap sizing calculator, houston grease interceptor calculator chapter 47, ipc table 1003.3.5.1, dallas restaurant grease trap requirements, austin fog grease trap",
        "h1": "Texas &amp; Houston Grease Trap Sizing Calculator (IPC §1003 &amp; FOG Ordinance)",
        "lead": "Calculate hydromechanical GPM ratings and exterior gravity interceptor capacity for Texas commercial kitchens under IPC Table 1003.3.5.1, City of Houston Chapter 47 FOG ordinances, and Austin/DFW municipal amendments.",
        "meta_cards": [
            ("Governing Plumbing Code", "IPC 2021 / 2024 (§1003.3)"),
            ("Houston FOG Ordinance", "Code of Ordinances Ch. 47, Art. XI"),
            ("Mandatory Inspection Port", "Downstream Sample Well"),
            ("Default Pump-Out Cycle", "Every 90 Days (Houston/Dallas)")
        ],
        "calc_defaults": {
            "code_style": "IPC",
            "sinks": 3,
            "vol": 18,
            "seats": 90
        },
        "intro_heading": "Navigating Texas IPC Grease Trap Rules & Municipal FOG Ordinances",
        "intro_body": [
            "Most major Texas metros—including Houston, Dallas, Fort Worth, and San Antonio—adopt the International Plumbing Code (IPC) with local municipal FOG amendments (Austin uses UPC with local amendments). Under IPC Section 1003.3.5, hydromechanical grease interceptors must comply with PDI G101 or ASME A112.14.3 and be sized to match the total flow rate (GPM) of connected fixtures.",
            "In Houston, Chapter 47 Article XI enforces strict Fats, Oils, and Grease registration, a mandatory downstream sample well for city inspectors, and a standard 90-day manifest-tracked pump-out schedule unless a variance is granted."
        ],
        "code_table": [
            ("IPC §1003.3.5.1", "Hydromechanical Capacity Table", "Minimum 20 GPM (40 lb) to 100 GPM (200 lb) based on fixture drainage rate; PDI G101 / ASME A112.14.3 certified."),
            ("IPC §1003.3.7", "Gravity Grease Interceptors", "Outdoor concrete/fiberglass vaults (typically 500–2,000 gal) required for high-volume kitchens with 30-minute retention time."),
            ("Houston Ch. 47", "Sample Well & 90-Day Pumping", "Requires a dedicated 4-inch or 6-inch downstream sample well and City of Houston FOG transporter manifests every 90 days."),
            ("Dallas Ch. 19", "Liquid Waste / FOG Permitting", "Dallas Water Utilities (DWU) mandates minimum 750–1,000 gal outdoor interceptors for new full-service FSEs."),
            ("IPC §1003.3.2", "Food Waste Grinders", "Where grinders are allowed, a solids interceptor must precede the grease interceptor.")
        ],
        "formula_title": "IPC Hydromechanical GPM & Gravity Retention Formula",
        "formula_expr": "HGI GPM = (Sink L × W × D ÷ 231) × 0.75 ÷ Drain Time (min)   |   GGI Gal = Peak Flow (GPM) × 30-Min Retention",
        "worked_example_title": "Worked Example: 90-Seat Restaurant in Houston, TX",
        "worked_example_steps": [
            "<strong>Step 1 — Sink Volume:</strong> 3-compartment sink (18\" × 18\" × 13\" per basin) = 18.2 gal × 3 = <strong>54.6 gallons total</strong>.",
            "<strong>Step 2 — Hydromechanical GPM:</strong> 54.6 gal × 0.75 fill factor = <strong>41 GPM → 50 GPM (100 lb)</strong> PDI-certified HGI (if indoor space is approved).",
            "<strong>Step 3 — Outdoor Gravity Vault (New Build):</strong> 90 seats × 12 gal/seat baseline = <strong>1,080 gal → 1,250-Gallon</strong> precast concrete interceptor.",
            "<strong>Step 4 — Houston Sample Well:</strong> Add a 6-inch vertical sample well downstream of the interceptor outlet prior to tying into city sewer."
        ],
        "checklist": [
            ("STEP 01", "Confirm Local Metro Code (IPC vs. Austin UPC)", "Houston, Dallas, and San Antonio follow IPC §1003; verify Austin Water's UPC-based sizing criteria if building in Travis County."),
            ("STEP 02", "Include Sample Well on Plumbing Plans", "City of Houston Public Works will reject FOG plan reviews missing a clearly detailed downstream sample well."),
            ("STEP 03", "Separate Sanitary & Grease Waste", "Never route restroom toilets, hand sinks, or condensate drains through the grease interceptor."),
            ("STEP 04", "Register With City FOG Program", "Register the Food Service Establishment (FSE) with Houston Health / DWU and log manifested pump-outs every 90 days.")
        ],
        "faqs": [
            ("What is the minimum grease trap size in Houston, Texas?", "For small light-duty food establishments, Houston allows PDI-rated hydromechanical traps starting at 20–35 GPM (40–70 lbs), while new full-service restaurants typically require a 1,000 to 1,500-gallon exterior gravity interceptor."),
            ("Does Houston require a sample well on a commercial grease trap?", "Yes. Under City of Houston Code of Ordinances Chapter 47, commercial grease interceptors require an accessible downstream sample well so city inspectors can test FOG discharge concentrations."),
            ("How often must commercial grease traps be pumped in Texas?", "Houston and Dallas enforce a standard 90-day pump-out interval (or sooner if the 25% FOG/solids limit is reached), tracked via municipal liquid waste manifests."),
            ("Can I install an indoor Schier/Thermaco grease interceptor instead of an outdoor concrete vault?", "Many Texas cities now accept high-capacity ASME A112.14.3 / CSA B481 hydromechanical interceptors for tenant retrofits when outdoor excavation is infeasible—always confirm with the local plumbing plans examiner first.")
        ]
    },
    {
        "tool": "grease-trap",
        "slug": "nyc-dep",
        "jurisdiction": "New York City (NYC Plumbing Code §1003 & NYC DEP)",
        "short_label": "NYC — Plumbing Code & DEP",
        "code_badge": "NYC Plumbing Code §1003 • NYC DEP FOG",
        "title": "NYC Commercial Grease Trap Sizing Calculator (NYC Plumbing Code §1003 & DEP)",
        "description": "Size restaurant grease interceptors in New York City per NYC Plumbing Code Section 1003, NYC DEP Best Management Practices, and flow control sizing rules.",
        "keywords": "nyc grease trap sizing calculator, nyc dep grease interceptor requirements, nyc plumbing code section 1003, restaurant grease trap nyc, manhattan grease interceptor sizing",
        "h1": "NYC Commercial Grease Trap Sizing Calculator (NYC Plumbing Code §1003 &amp; DEP)",
        "lead": "Calculate compliant indoor hydromechanical grease trap GPM and grease retention ratings for New York City restaurants, delis, and commissaries under NYC Plumbing Code §1003 and NYC DEP FOG Best Management Practices.",
        "meta_cards": [
            ("Governing Code", "2022 NYC Plumbing Code §1003"),
            ("Enforcement Agency", "NYC DEP & NYC DOB Plumbing"),
            ("Typical Urban Unit", "Indoor PDI / ASME HGI (20–75 GPM)"),
            ("Mandatory Accessory", "Vented Flow Control Fitting")
        ],
        "calc_defaults": {
            "code_style": "IPC",
            "sinks": 3,
            "vol": 15,
            "seats": 65
        },
        "intro_heading": "NYC DEP Grease Interceptor Standards for Dense Urban Kitchens",
        "intro_body": [
            "Because almost all New York City restaurants operate in ground-floor retail spaces without parking lots, exterior concrete gravity vaults are rarely feasible. Instead, the 2022 NYC Plumbing Code (Section 1003.3) and NYC Department of Environmental Protection (DEP) rely heavily on properly sized indoor Hydromechanical Grease Interceptors (HGIs) certified to PDI G101 or ASME A112.14.3.",
            "NYC DEP inspectors routinely issue hefty fines when kitchens omit the mandatory vented flow-control device, undersize the trap relative to 3-compartment sink volume, or fail to maintain grease cleaning logs."
        ],
        "code_table": [
            ("NYC PC §1003.3.4", "PDI G101 / ASME A112.14.3 Rating", "Indoor grease traps must match total connected fixture flow rate in GPM with 2× lbs grease retention capacity."),
            ("NYC PC §1003.3.4.2", "Mandatory Flow Control Device", "Every hydromechanical interceptor must have an accessible, vented flow-control fitting upstream of the trap."),
            ("NYC DEP BMP", "Weekly / Monthly Cleaning Logs", "NYC DEP requires regular skimming/cleaning before 25% capacity and visible maintenance logs posted on site."),
            ("NYC PC §1003.3.2", "No Food Waste Grinders", "Commercial garbage disposals discharging to grease interceptors are strictly prohibited in NYC.")
        ],
        "formula_title": "NYC Plumbing Code Fixture-Volume GPM Formula",
        "formula_expr": "Required GPM = (Total Sink Compartment Cubic Inches ÷ 231) × 0.75 ÷ 1-Min Drain   |   Retention = GPM × 2 lbs",
        "worked_example_title": "Worked Example: 65-Seat Bistro Kitchen in Brooklyn, NY",
        "worked_example_steps": [
            "<strong>Step 1 — Calculate Sink Volume:</strong> 3-compartment pot sink (16\" × 16\" × 14\" each) = 15.5 gal × 3 = <strong>46.5 gallons</strong>.",
            "<strong>Step 2 — Apply 75% Load Factor:</strong> 46.5 gal × 0.75 = <strong>34.9 GPM</strong>.",
            "<strong>Step 3 — Select Standard PDI Size:</strong> Round up to a <strong>35 GPM (70 lb) or 50 GPM (100 lb)</strong> PDI-certified hydromechanical grease interceptor.",
            "<strong>Step 4 — Flow Control & Access:</strong> Install vented flow control tee and ensure minimum 18-inch vertical clearance above lid for weekly baffle removal."
        ],
        "checklist": [
            ("STEP 01", "File Plumbing Alteration (DOB NOW)", "Licensed NYC Master Plumber (LMP) must file grease interceptor installation on DOB NOW plumbing drawings."),
            ("STEP 02", "Verify Flow Control Venting", "Confirm the external flow control device has an air intake vent installed per manufacturer and NYC PC §1003."),
            ("STEP 03", "Install Solids Strainer Basket", "Add removable mesh baskets on 3-compartment sinks to prevent food solids from choking the HGI."),
            ("STEP 04", "Maintain NYC DEP Logbook", "Log every cleaning date, volume removed, and licensed grease hauler manifest to avoid NYC DEP NOV fines.")
        ],
        "faqs": [
            ("What is the smallest legal commercial grease trap in NYC?", "Under NYC Plumbing Code §1003.3.4, commercial hydromechanical grease interceptors must have a minimum flow rating of 20 GPM (40 lbs grease retention capacity)."),
            ("Can I connect a commercial dishwasher to a grease trap in NYC?", "No. NYC DEP and NYC Plumbing Code prohibit connecting commercial dishwashers (which use hot water >140°F and detergents) to indoor hydromechanical grease traps."),
            ("Do I need a Licensed Master Plumber (LMP) to install a grease trap in NYC?", "Yes. Any alteration to commercial sanitary drainage piping in NYC must be performed and signed off by a NYC Licensed Master Plumber."),
            ("What happens if NYC DEP inspects and finds no flow control device?", "NYC DEP issues a Notice of Violation (NOV) requiring immediate retrofit of a vented flow control fitting, as unthrottled sink drainage flushes emulsified grease straight into the city sewer.")
        ]
    },
    {
        "tool": "grease-trap",
        "slug": "florida-fbc",
        "jurisdiction": "Florida & Miami-Dade (FBC Plumbing & DERM FOG)",
        "short_label": "Florida / Miami-Dade — FBC & DERM",
        "code_badge": "Florida Building Code Plumbing • Miami-Dade DERM",
        "title": "Florida & Miami-Dade Grease Trap Sizing Calculator (FBC Plumbing & DERM)",
        "description": "Size commercial grease interceptors for Florida restaurants under the Florida Building Code (FBC Plumbing §1003) and Miami-Dade DERM / county FOG programs.",
        "keywords": "florida grease trap sizing calculator, miami dade derm grease interceptor, fbc plumbing section 1003, florida restaurant grease trap requirements, orlando grease interceptor sizing",
        "h1": "Florida &amp; Miami-Dade Grease Trap Sizing Calculator (FBC Plumbing &amp; DERM)",
        "lead": "Calculate commercial grease interceptor capacity for Florida restaurants and food service facilities under the Florida Building Code – Plumbing (§1003) and strict county FOG ordinances like Miami-Dade DERM.",
        "meta_cards": [
            ("Governing Code", "Florida Building Code – Plumbing"),
            ("Local FOG Authority", "Miami-Dade DERM / County Utilities"),
            ("Typical Outdoor Vault", "750 – 1,500+ Gallon GGI"),
            ("High Water Table Rule", "Anti-Flotation Anchoring Required")
        ],
        "calc_defaults": {
            "code_style": "IPC",
            "sinks": 3,
            "vol": 20,
            "seats": 110
        },
        "intro_heading": "Florida Building Code & County-Level FOG Rules (Miami-Dade DERM)",
        "intro_body": [
            "The Florida Building Code (FBC) – Plumbing follows the IPC framework in Section 1003, but county utility departments (such as Miami-Dade DERM, Broward County, Orange County Utilities, and Hillsborough County) enforce strict minimum exterior vault sizes—commonly 750 to 1,250 gallons minimum for any full-service Food Service Establishment (FSE).",
            "A critical Florida-specific engineering factor is buoyancy: because groundwater sits just 2 to 4 feet below grade in South and Central Florida, buried fiberglass or concrete grease interceptors must be engineered with anti-flotation concrete hold-down slabs so the empty tank doesn't pop out of the ground during pump-out!"
        ],
        "code_table": [
            ("FBC Plumbing §1003.3", "Grease Interceptor Mandatory", "Required for all commercial kitchens, hotels, cafeterias, and food prep facilities discharging FOG waste."),
            ("Miami-Dade Ch. 24", "DERM FOG Operating Permit", "Annual Grease Discharge Operating (GDO) permit required; minimum 750–1,250 gal exterior vault for most FSEs."),
            ("FBC Structural", "Buoyancy / Anti-Flotation", "Buried interceptors in high water tables require concrete deadman anchors or ballast slabs per manufacturer engineering."),
            ("County Utilities", "Sampling Manhole & 90-Day Pump", "Downstream sampling port required; manifests tracked electronically through county FOG portals.")
        ],
        "formula_title": "Florida Gravity Interceptor & Buoyancy Check Formula",
        "formula_expr": "GGI Size = max(750 gal, Seats × Meals/Hr × Waste Factor × Retention)   |   Check Anti-Flotation for High Water Table",
        "worked_example_title": "Worked Example: 110-Seat Restaurant in Miami-Dade County, FL",
        "worked_example_steps": [
            "<strong>Step 1 — Kitchen Flow Assessment:</strong> 3-compartment sink (60 gal total) + wok/prep sinks + 110 dining seats.",
            "<strong>Step 2 — Gravity Vault Sizing:</strong> 110 seats × 12 gal/seat baseline = <strong>1,320 gal → 1,500-Gallon</strong> exterior precast concrete grease interceptor.",
            "<strong>Step 3 — Anti-Flotation Engineering:</strong> Spec heavy-wall precast concrete vault (or strapped fiberglass tank on concrete ballast pad) rated for water table at finished grade.",
            "<strong>Step 4 — DERM GDO Permit:</strong> Apply for Miami-Dade DERM Grease Discharge Operating Permit prior to Certificate of Occupancy."
        ],
        "checklist": [
            ("STEP 01", "Check County FOG Minimums First", "Miami-Dade DERM, Orange County, and Tampa each publish distinct minimum gallon tables—verify before ordering tanks."),
            ("STEP 02", "Verify High-Water-Table Anchoring", "Ensure site civil plans specify anti-flotation concrete ballast so the interceptor stays anchored when pumped dry."),
            ("STEP 03", "Install Dedicated Sampling Port", "Place a traffic-rated sampling tee/manhole immediately downstream of the interceptor outlet."),
            ("STEP 04", "Activate Annual FOG Operating Permit", "Enroll with a licensed Florida grease hauler and upload pump-out manifests every 30 to 90 days.")
        ],
        "faqs": [
            ("What is the minimum outdoor grease interceptor size in Miami-Dade County?", "Miami-Dade DERM typically requires a minimum 750 to 1,250-gallon exterior gravity grease interceptor for full-service restaurants, depending on seat count and menu grease intensity."),
            ("Why do buried grease traps float in Florida?", "Florida's shallow groundwater table exerts massive upward hydrostatic pressure when a tank is pumped empty during maintenance. Concrete ballast slabs or heavy precast concrete vaults prevent tank flotation."),
            ("Can I use an under-sink grease trap in a Florida strip mall restaurant?", "Only if the local county utility approves a hardship variance (typically for low-grease coffee shops or sandwich concepts without fryers/grills) using a high-capacity PDI/ASME hydromechanical unit."),
            ("Do I need a separate DERM permit in addition to my building permit?", "Yes. In Miami-Dade County, food service establishments must obtain a DERM Grease Discharge Operating (GDO) permit and renew it annually.")
        ]
    },

    # =========================================================================
    # 3. CHARGE SPEC — COMMERCIAL EV FLEET (4 JURISDICTIONS)
    # =========================================================================
    {
        "tool": "charge-spec",
        "slug": "california-nec-625",
        "jurisdiction": "California (CEC Article 625 & CALGreen Title 24)",
        "short_label": "California — CEC 625 & CALGreen",
        "code_badge": "CEC Article 625 • CALGreen Title 24",
        "title": "California Commercial EV Charger Electrical Sizing Calculator (CEC 625 & CALGreen)",
        "description": "Calculate commercial EV fleet electrical load, 480V amps, transformer kVA, and EMS load sharing under California Electrical Code Article 625 and CALGreen Title 24 mandates.",
        "keywords": "california commercial ev charger electrical sizing calculator, nec 625 calculator california, calgreen ev parking requirements, pge ev fleet transformer sizing, cec article 625",
        "h1": "California Commercial EV Electrical Sizing Calculator (CEC 625 &amp; CALGreen)",
        "lead": "Size commercial EV charging panels, 480V three-phase feeders, and utility transformers under California Electrical Code (CEC) Article 625, CALGreen Title 24 mandatory EV parking ratios, and NEC 625.42 Energy Management Systems (EMS).",
        "meta_cards": [
            ("Governing Electrical Code", "CEC Article 625 (NEC 625)"),
            ("Mandatory Parking Code", "CALGreen Title 24 Part 11"),
            ("Continuous Load Rule", "125% (CEC 625.41)"),
            ("Utility Make-Ready", "PG&E / SCE / LADWP EV Fleet")
        ],
        "calc_defaults": {
            "ports": 16,
            "kw": 19.2,
            "ems": 0.5
        },
        "intro_heading": "Sizing Commercial EV Infrastructure Under CEC Article 625 & CALGreen",
        "intro_body": [
            "California enforces the most aggressive commercial EV charging mandates in the United States. Under CALGreen (Title 24, Part 11), new commercial buildings and major parking retrofits must allocate up to 20%–45% of total parking spaces as EV-Capable, EV-Ready, or EVCS-installed depending on lot size and local reach codes.",
            "Without Automated Load Management Systems (ALMS / EMS under CEC 625.42), installing 16 Level 2 commercial chargers at 19.2 kW each would require a massive 384 kW continuous service upgrade. Using UL-listed EMS load sharing (2:1 or 3:1 power sharing) cuts switchgear and PG&E/SCE transformer upgrade costs by 50% or more."
        ],
        "code_table": [
            ("CEC 625.41", "125% Continuous Load Rating", "Overcurrent protection and feeder conductors must be sized at not less than 125% of maximum EVSE load."),
            ("CEC 625.42", "Energy Management System (EMS)", "Allows dynamic load sharing across multiple EVSE ports so feeder/service size matches the EMS setpoint."),
            ("CALGreen §5.106.5.3", "Nonresidential EV Parking", "Mandates EV-capable spaces and installed EVCS stations scaled by total commercial parking count."),
            ("CBC Chapter 11B", "Accessible EVCS Stalls", "Requires ADA van-accessible EV charging stalls (12 ft wide + 5 ft access aisle) with compliant reach range."),
            ("PG&E / SCE Rule 29", "Utility-Side Make-Ready", "Utility covers upstream distribution & transformer upgrades for qualifying commercial EV fleets.")
        ],
        "formula_title": "CEC 625.41 & 625.42 Continuous Load & 480V 3-Phase Formula",
        "formula_expr": "Design kW = (Ports × Port kW × EMS Factor) × 1.25   |   Amps (480V 3Ø) = (Design kW × 1,000) ÷ (480 × 1.732)",
        "worked_example_title": "Worked Example: 16-Port Commercial Workplace Depot in San Jose, CA",
        "worked_example_steps": [
            "<strong>Step 1 — Nameplate Load:</strong> 16 Level 2 chargers × 19.2 kW (80A) = <strong>307.2 kW raw connected load</strong>.",
            "<strong>Step 2 — Apply CEC 625.42 EMS (2:1 Sharing):</strong> Dynamic load management caps simultaneous draw at 50% = <strong>153.6 kW</strong>.",
            "<strong>Step 3 — Apply CEC 625.41 (125% Continuous):</strong> 153.6 kW × 1.25 = <strong>192.0 kW design load</strong>.",
            "<strong>Step 4 — Service & Transformer Sizing:</strong> 192,000 ÷ 831.4 = <strong>231 Amps @ 480V 3Ø</strong> → <strong>250 kVA dedicated transformer</strong> (eligible for PG&E EV Charge Network / Rule 29)."
        ],
        "checklist": [
            ("STEP 01", "Run 12-Month Interval Load Study", "Pull PG&E/SCE/LADWP 15-minute interval peak demand data to verify spare capacity under CEC 220.87."),
            ("STEP 02", "Verify Local Reach Codes", "Cities like San Jose, San Francisco, and Santa Monica enforce stricter EV percentages than baseline CALGreen."),
            ("STEP 03", "Apply for Utility Rule 29 / Make-Ready", "Submit utility service applications early—pad-mount transformer lead times run 16 to 36+ weeks."),
            ("STEP 04", "Include CBC Chapter 11B ADA Striping", "Include van-accessible EV stall slopes (<2%) and bollard clearances on permit plans.")
        ],
        "faqs": [
            ("How does CEC 625.42 EMS reduce commercial EV electrical upgrade costs?", "By installing a UL-listed Energy Management System (EMS) that dynamically caps aggregate current, CEC 625.42 permits sizing the panel and feeder to the EMS maximum setpoint rather than the sum of all charger nameplates."),
            ("Do commercial EV chargers in California require a 125% continuous load factor?", "Yes. Under CEC 625.41, EVSE is classified as a continuous load, requiring circuit breakers and conductors to be sized at 125% of the maximum load."),
            ("What are California's ADA requirements for commercial EV chargers?", "California Building Code Chapter 11B requires a minimum number of van-accessible, standard-accessible, and ambulatory EVCS stalls with 12-foot stall widths, 5-foot aisles, and operable parts between 15 and 48 inches high."),
            ("Does PG&E or SCE pay for the transformer upgrade on commercial EV projects?", "Under California's EV Infrastructure Rules (Rule 29 for PG&E/SCE), utilities cover qualifying utility-side distribution and transformer upgrades for separately metered commercial EV installations.")
        ]
    },
    {
        "tool": "charge-spec",
        "slug": "texas-nec-625",
        "jurisdiction": "Texas (NEC 2023 Article 625 & TDLR)",
        "short_label": "Texas — NEC 2023 & TDLR",
        "code_badge": "NEC 2023 Article 625 • TDLR • Oncor / CenterPoint",
        "title": "Texas Commercial EV Fleet Electrical Load Calculator (NEC 2023 Article 625)",
        "description": "Calculate commercial EV charger electrical service size, 480V amps, and transformer kVA for Texas fleets under 2023 NEC Article 625, TDLR licensing, and Oncor/CenterPoint rules.",
        "keywords": "texas commercial ev charger electrical sizing calculator, nec 2023 article 625 texas, fleet ev charging load calculation nec 625, oncor commercial ev transformer, centerpoint ev fleet",
        "h1": "Texas Commercial EV Fleet Electrical Load Calculator (NEC 2023 Article 625)",
        "lead": "Size commercial Level 2 and Level 3 DCFC fleet depots across Dallas-Fort Worth, Houston, Austin, and San Antonio under Texas's statewide 2023 NEC Article 625 adoption and TDLR electrical standards.",
        "meta_cards": [
            ("Governing Electrical Code", "2023 NEC Article 625 (TDLR)"),
            ("Continuous Load Factor", "125% (NEC 625.41)"),
            ("Key Texas Utilities", "Oncor, CenterPoint, Austin Energy"),
            ("NEVI Corridor Grants", "TxDOT Texas EV Infrastructure Plan")
        ],
        "calc_defaults": {
            "ports": 10,
            "kw": 50,
            "ems": 0.75
        },
        "intro_heading": "Commercial EV Depot Sizing Under Texas 2023 NEC Adoption",
        "intro_body": [
            "Texas adopted the 2023 National Electrical Code (NEC) statewide through the Texas Department of Licensing and Regulation (TDLR), bringing updated Article 625 and Article 750 (Energy Management Systems) provisions directly to commercial fleet depots, logistics hubs, and retail plazas.",
            "In deregulated ERCOT territories (Oncor in DFW, CenterPoint in Houston), commercial DC Fast Charging (50 kW to 350 kW) projects require careful demand-charge modeling and early utility transformer reservation due to rapid industrial grid growth."
        ],
        "code_table": [
            ("NEC 625.41", "125% Continuous Load", "Branch circuits, feeders, and overcurrent devices must be rated at least 125% of the EVSE maximum load."),
            ("NEC 625.42", "EMS Load Management", "2023 NEC explicitly permits automated EMS current limiting to fit fleet charging inside existing switchgear."),
            ("NEC 625.43", "Disconnecting Means", "Equipment rated >60A or >150V to ground requires a lockable disconnecting means installed in a readily accessible location."),
            ("TDLR TAS", "Texas Accessibility Standards", "Commercial EV projects >= $50,000 must register with TDLR and undergo Registered Accessibility Specialist (RAS) inspection."),
            ("ERCOT / TDU", "Demand Charge Mitigation", "4CP (Four Coincident Peak) summer afternoon demand spikes can be avoided by scheduling fleet charging overnight.")
        ],
        "formula_title": "Texas 2023 NEC Commercial Fleet Load & Transformer Formula",
        "formula_expr": "NEC Load (kW) = Ports × kW × EMS Ratio × 1.25   |   Transformer kVA = NEC Load (kW) ÷ 0.85 Power/Design Factor",
        "worked_example_title": "Worked Example: 10-Bay 50 kW Commercial Fleet Depot in Dallas, TX",
        "worked_example_steps": [
            "<strong>Step 1 — Nameplate DCFC Load:</strong> 10 fleet chargers × 50 kW = <strong>500 kW connected</strong>.",
            "<strong>Step 2 — EMS Power Sharing (75% Cap):</strong> Managed overnight fleet schedule caps peak draw at <strong>375 kW</strong>.",
            "<strong>Step 3 — NEC 625.41 Continuous Factor:</strong> 375 kW × 1.25 = <strong>468.8 kW continuous service rating</strong>.",
            "<strong>Step 4 — Switchgear & Transformer:</strong> 564 Amps @ 480V 3Ø → specify <strong>800A 480V distribution panel</strong> and <strong>500–750 kVA pad-mount transformer</strong> with Oncor."
        ],
        "checklist": [
            ("STEP 01", "Submit Utility Load Letter (Oncor / CenterPoint)", "Provide 480V 3-phase kVA demand letter to your Transmission & Distribution Utility (TDU) at schematic design."),
            ("STEP 02", "Verify NEC 625.43 Lockable Disconnects", "All commercial DCFC cabinets (>60A) require accessible, lockable disconnects per 2023 NEC."),
            ("STEP 03", "Register Project With TDLR (If >= $50k)", "File EABPRJ registration for Texas Accessibility Standards (TAS) review on commercial charging bays."),
            ("STEP 04", "Program 4CP Demand Avoidance", "Configure OCPP/EMS software to curtail charging during June–September 3 PM–7 PM ERCOT peak windows.")
        ],
        "faqs": [
            ("Which NEC edition does Texas use for commercial EV chargers?", "Texas enforces the 2023 NEC statewide through TDLR, though some home-rule municipalities adopt local amendments—always confirm with the local city electrical inspector."),
            ("When is a lockable disconnect required on commercial EV chargers?", "Under NEC 625.43, any EVSE rated more than 60 amperes or more than 150 volts to ground requires a lockable disconnecting means installed in a readily accessible location."),
            ("What is ERCOT 4CP and why does it matter for Texas EV fleets?", "4CP (Four Coincident Peak) measures your facility's demand during the four highest summer 15-minute ERCOT grid peaks (June–September). Curtailing EV fleet charging during those afternoon windows can save thousands per month in transmission demand charges."),
            ("Do commercial EV charging stations in Texas need TDLR accessibility review?", "Yes. If total construction cost of the commercial EV project is $50,000 or more, Texas law requires TDLR TAS plan review and post-construction inspection by a Registered Accessibility Specialist.")
        ]
    },
    {
        "tool": "charge-spec",
        "slug": "nyc-electrical-code",
        "jurisdiction": "New York City (NYC Electrical Code & Con Edison PowerReady)",
        "short_label": "NYC — Electrical Code & ConEd",
        "code_badge": "NYC Electrical Code • Con Edison PowerReady",
        "title": "NYC Commercial EV Charger Electrical Sizing Calculator (Con Edison PowerReady)",
        "description": "Size commercial EV charging installations in New York City under NYC Electrical Code Article 625, Local Law 55 EV-ready garage rules, and Con Edison PowerReady incentives.",
        "keywords": "nyc commercial ev charger sizing calculator, con edison powerready commercial, nyc electrical code article 625, nyc parking garage ev charger load calculation, local law 55 ev",
        "h1": "NYC Commercial EV Charger Sizing Calculator (NYC Electrical Code &amp; Con Edison)",
        "lead": "Plan commercial parking garage and fleet depot EV charging across the five boroughs with NEC/NYC Electrical Code Article 625 load sizing, Con Edison PowerReady make-ready incentives, and FDNY safety compliance.",
        "meta_cards": [
            ("Governing Code", "NYC Electrical Code (NEC 625)"),
            ("Utility Incentive", "Con Edison PowerReady (Up to 100%)"),
            ("Garage Mandate", "NYC Local Law 55 / BC §406"),
            ("Fire Safety", "FDNY / NFPA 88A Garage Rules")
        ],
        "calc_defaults": {
            "ports": 12,
            "kw": 11.5,
            "ems": 0.5
        },
        "intro_heading": "Designing NYC Commercial Garage EV Charging With Con Edison PowerReady",
        "intro_body": [
            "New York City parking garages face tight electrical room space, older 208V 3-phase services, and strict NYC DOB electrical permitting. Con Edison's PowerReady program offsets 50% to 100% of utility-side and customer-side make-ready electrical costs (transformers, conduit, switchgear) for qualifying commercial Level 2 and DC Fast Charging sites.",
            "Because upgrading a Manhattan building service can take 12+ months, using UL-listed EMS load management (Article 625.42) to share existing 208V/480V spare capacity is the fastest path to commissioning."
        ],
        "code_table": [
            ("NYC EC Art. 625", "125% Continuous Load", "EVSE branch circuits and feeders must be sized at 125% of continuous rating; NYC DOB Licensed Master Electrician filing required."),
            ("ConEd PowerReady", "Make-Ready Cost Coverage", "Covers up to 50%–100% of eligible electrical infrastructure costs for public/fleet commercial EV chargers."),
            ("NYC Local Law 55", "EV-Ready Garage Infrastructure", "New and altered open/enclosed parking garages must provide EV-capable conduit/raceways for 20%+ of spaces."),
            ("FDNY / BC §406", "Ventilation & Protection", "Impact bollards, emergency shutoff signage, and compliant garage fire sprinkler coverage required.")
        ],
        "formula_title": "NYC Garage 208V/480V EV Load Formula",
        "formula_expr": "Design kW = (Ports × kW × EMS Sharing) × 1.25   |   Amps (480V 3Ø) = Design kW × 1,000 ÷ 831.4",
        "worked_example_title": "Worked Example: 12-Charger Commercial Parking Garage in Queens, NY",
        "worked_example_steps": [
            "<strong>Step 1 — Connected Load:</strong> 12 commercial Level 2 ports × 11.5 kW (48A) = <strong>138 kW raw load</strong>.",
            "<strong>Step 2 — EMS 2:1 Load Management:</strong> Dynamic load sharing limits total draw to <strong>69 kW</strong>.",
            "<strong>Step 3 — 125% Continuous Sizing:</strong> 69 kW × 1.25 = <strong>86.3 kW continuous</strong> (104 Amps @ 480V 3Ø or 240 Amps @ 208V 3Ø).",
            "<strong>Step 4 — Con Edison PowerReady:</strong> Submit single-line diagram and Licensed Master Electrician quote to Con Edison PowerReady portal prior to construction."
        ],
        "checklist": [
            ("STEP 01", "Enroll in Con Edison PowerReady Before Construction", "Incentive approval must be secured prior to pulling conduit or installing switchgear."),
            ("STEP 02", "Verify 208V vs. 480V Building Service", "Many older NYC commercial garages operate on 208V/120V 3-phase; verify voltage drop and panel busbar rating."),
            ("STEP 03", "File NYC DOB Electrical Permit", "Only a NYC Licensed Master Electrician (LME) can file ED16A/DOB NOW electrical permits."),
            ("STEP 04", "Install Steel Bollards & Emergency Shutoff", "Protect pedestals from vehicle impact and post clear disconnect signage for FDNY response.")
        ],
        "faqs": [
            ("How much does Con Edison PowerReady pay for commercial EV installations?", "Depending on charger type, public accessibility, and disadvantaged community (DAC) location, Con Edison PowerReady can reimburse 50% to 100% of eligible make-ready electrical infrastructure costs."),
            ("Do NYC parking garages need a new Con Edison service to add EV chargers?", "Not always. If a 30-day load study shows spare capacity on the existing switchgear, UL-listed Energy Management Systems (EMS) allow adding 10–30+ Level 2 ports without waiting for a utility service upgrade."),
            ("What permits are needed for commercial EV chargers in NYC?", "A NYC DOB Electrical Permit filed by a Licensed Master Electrician is mandatory; larger switchgear or structural trenching work also requires DOB Alt-2 filings."),
            ("Are NYC commercial EV chargers required to be networked?", "To qualify for Con Edison PowerReady or NYSERDA Charge Ready NY 2.0 incentives, chargers must be networked (OCPP/cellular) and share utilization data.")
        ]
    },
    {
        "tool": "charge-spec",
        "slug": "florida-nec-625",
        "jurisdiction": "Florida (FBC / NEC 625 & FPL EVolution)",
        "short_label": "Florida — FBC / NEC 625 & FPL",
        "code_badge": "FBC Electrical • NEC Article 625 • FPL EVolution",
        "title": "Florida Commercial EV Fleet Sizing Calculator (FBC / NEC 625 & Coastal Specs)",
        "description": "Size commercial EV chargers, 480V feeders, and transformers in Florida under FBC Electrical / NEC Article 625, NEMA 4X coastal enclosures, and FPL EVolution commercial programs.",
        "keywords": "florida commercial ev charger sizing calculator, fpl evolution commercial ev, nec 625 florida building code, miami ev fleet electrical calculator, nema 4x ev charger coastal",
        "h1": "Florida Commercial EV Fleet Sizing Calculator (FBC / NEC 625 &amp; Coastal Specs)",
        "lead": "Calculate commercial EV charging service capacity, 480V amps, and transformer sizing for Florida retail, hospitality, and fleet sites under Florida Building Code (NEC Article 625), coastal NEMA 4X/3R standards, and FPL/Duke utility programs.",
        "meta_cards": [
            ("Governing Code", "Florida Building Code (NEC 625)"),
            ("Coastal Enclosure Spec", "NEMA 3R / 4X Corrosion-Resistant"),
            ("Surge Protection", "UL 1449 Type 1/2 SPD Mandatory"),
            ("Utility Programs", "FPL EVolution / Duke Park & Plug")
        ],
        "calc_defaults": {
            "ports": 8,
            "kw": 19.2,
            "ems": 0.75
        },
        "intro_heading": "Florida Coastal Engineering Requirements for Commercial EV Charging",
        "intro_body": [
            "Florida commercial EV installations follow NEC Article 625 as adopted by the Florida Building Code, but environmental exposure demands tougher hardware specifications. Salt-spray corrosion within 5 miles of the Atlantic or Gulf coasts rapidly degrades painted steel enclosures—making stainless steel or powder-coated aluminum NEMA 4X switchgear and pedestals essential.",
            "Additionally, Florida's lightning density makes heavy-duty Type 1/Type 2 Surge Protective Devices (SPDs) at the EV distribution panel critical to prevent blown DCFC power modules."
        ],
        "code_table": [
            ("NEC 625.41", "125% Continuous Load", "Conductors and breakers sized at minimum 125% of continuous EVSE load."),
            ("FBC / ASCE 7", "Wind-Load Pedestal Anchoring", "Outdoor charging pedestals and canopies in HVHZ (Miami-Dade/Broward) require wind-load stamped anchor bolts."),
            ("NEC 242 / UL 1449", "Lightning Surge Protection", "Install Type 1/2 SPD on dedicated EV subpanels to protect sensitive charger electronics from Florida surges."),
            ("FEMA Flood Zones", "Base Flood Elevation (BFE)", "In AE/VE coastal flood zones, elevate switchgear and transformer pads above Base Flood Elevation.")
        ],
        "formula_title": "Florida Commercial EV Service & Transformer Formula",
        "formula_expr": "Design kW = (Ports × kW × EMS Ratio) × 1.25   |   Transformer kVA = Design kW ÷ 0.85",
        "worked_example_title": "Worked Example: 8-Port Hotel & Fleet EV Hub in Tampa, FL",
        "worked_example_steps": [
            "<strong>Step 1 — Connected Load:</strong> 8 Level 2 commercial ports × 19.2 kW = <strong>153.6 kW raw load</strong>.",
            "<strong>Step 2 — EMS Load Sharing (75%):</strong> Caps aggregate draw at <strong>115.2 kW</strong>.",
            "<strong>Step 3 — 125% Continuous Rating:</strong> 115.2 kW × 1.25 = <strong>144.0 kW</strong> (174 Amps @ 480V 3Ø).",
            "<strong>Step 4 — Coastal Protection:</strong> Specify 225A 480V NEMA 4X panelboard with integrated 200kA SPD and elevated concrete pad."
        ],
        "checklist": [
            ("STEP 01", "Check FEMA Flood Map Elevation", "Verify Base Flood Elevation (BFE) before setting pad-mount transformers or DCFC power cabinets."),
            ("STEP 02", "Specify NEMA 4X & Stainless Hardware", "Use 316 stainless steel anchor bolts and NEMA 4X enclosures for coastal salt-air durability."),
            ("STEP 03", "Install Commercial Surge Protection", "Add UL 1449 Type 1/2 surge arrestors at both the main EV switchgear and subpanel."),
            ("STEP 04", "Coordinate FPL / Duke Commercial Service", "Submit load calculations early for dedicated EV metering and demand-rate optimization.")
        ],
        "faqs": [
            ("Why is NEMA 4X recommended for commercial EV chargers in Florida?", "Salt air along Florida's coasts causes rapid rusting of standard NEMA 3R painted steel panels. NEMA 4X stainless or aluminum enclosures resist salt corrosion and wind-driven hurricane rain."),
            ("Do outdoor EV chargers in Miami-Dade need hurricane wind-load calculations?", "Yes. Pedestals, overhead canopies, and concrete transformer pads in the High-Velocity Hurricane Zone (HVHZ) require engineered anchoring per FBC wind loads."),
            ("Should commercial EV panels in Florida include surge protection?", "Strongly recommended and increasingly mandated. Lightning-induced grid transients are the #1 cause of premature EV charger board failures in Florida."),
            ("Does Florida have a statewide commercial EV mandate like California?", "No statewide mandate like CALGreen, though certain South Florida municipalities (such as Miami Beach and Coral Gables) enforce local EV-ready parking ordinances for new developments.")
        ]
    },

    # =========================================================================
    # 4. SITE SPEC — CIVIL STORMWATER (3 JURISDICTIONS)
    # =========================================================================
    {
        "tool": "site-spec",
        "slug": "texas-txdot-atlas14",
        "jurisdiction": "Texas (TxDOT Hydraulic Design Manual & NOAA Atlas 14)",
        "short_label": "Texas — TxDOT & Atlas 14",
        "code_badge": "TxDOT HDM • NOAA Atlas 14 • HCFCD",
        "title": "Texas Rational Method Stormwater Runoff Calculator (TxDOT HDM & Atlas 14)",
        "description": "Calculate peak stormwater runoff (cfs) and detention volume for Texas commercial sites using the Rational Method (Q = C × I × A), TxDOT runoff C-values, and NOAA Atlas 14 rainfall intensities.",
        "keywords": "rational method stormwater runoff c value texas dot, txdot hydraulic design manual calculator, noaa atlas 14 houston runoff calculator, texas commercial detention pond sizing",
        "h1": "Texas Rational Method Stormwater Runoff Calculator (TxDOT HDM &amp; Atlas 14)",
        "lead": "Compute peak commercial site runoff (cfs) and preliminary detention sizing using the Rational Method (Q = C·I·A) calibrated for TxDOT Hydraulic Design Manual C-values and post-Harvey NOAA Atlas 14 rainfall intensity curves.",
        "meta_cards": [
            ("Governing Manual", "TxDOT Hydraulic Design Manual"),
            ("Rainfall Dataset", "NOAA Atlas 14 (Volume 11 — TX)"),
            ("Asphalt / Roof C-Value", "0.85 – 0.95 (TxDOT Table 4-10)"),
            ("Houston 100-Yr Intensity", "~10.0 – 12.5 in/hr (Short Tc)")
        ],
        "calc_defaults": {
            "acres": 3.0,
            "cval": 0.90,
            "intensity": 8.8
        },
        "intro_heading": "Why NOAA Atlas 14 Changed Commercial Stormwater Sizing Across Texas",
        "intro_body": [
            "Following Hurricane Harvey, NOAA Atlas 14 (Volume 11) significantly increased design rainfall intensities across Houston (Harris County Flood Control District — HCFCD), Austin, and Central Texas. What used to be a 100-year storm in Harris County is now closer to a 25-year storm, forcing larger on-site commercial detention ponds and underground storm vaults.",
            "For commercial sites under 200 acres, Texas civil engineers use the Rational Method (Q = C × I × A) per the TxDOT Hydraulic Design Manual, applying frequency adjustment factors (Cf) for 25-year (1.10), 50-year (1.20), and 100-year (1.25) storms where required."
        ],
        "code_table": [
            ("TxDOT HDM Ch. 4", "Rational Method Limit", "Approved for drainage areas up to 200 acres; Q = C × I × A (cfs)."),
            ("TxDOT Table 4-10", "Commercial Runoff C-Values", "Pavement/Asphalt: 0.70–0.95; Commercial Roofs: 0.75–0.95; Lawns (Clay, >2%): 0.18–0.35."),
            ("TxDOT Cf Factor", "Rare Storm Adjustment", "Multiply C by 1.1 (25-yr), 1.2 (50-yr), or 1.25 (100-yr), capped at C_max = 1.0."),
            ("HCFCD / Austin", "Zero Net Rise Detention", "Post-development peak runoff must not exceed pre-development rates; Harris County requires Atlas 14 detention ratios (0.55–0.65+ ac-ft/acre).")
        ],
        "formula_title": "TxDOT Rational Method Peak Discharge Formula",
        "formula_expr": "Q (cfs) = C × I (in/hr) × A (acres)   |   1 cfs = 448.83 GPM   |   Apply Cf for 25–100 yr storms",
        "worked_example_title": "Worked Example: 3.0-Acre Commercial Retail Pad in Houston, TX",
        "worked_example_steps": [
            "<strong>Step 1 — Composite C-Value:</strong> 85% asphalt/roof (C = 0.92) + 15% landscape (C = 0.25) → composite <strong>C = 0.82</strong> (adjusted to 0.90 for 25-yr Cf = 1.1).",
            "<strong>Step 2 — NOAA Atlas 14 Intensity:</strong> 15-minute Time of Concentration (Tc) for 25-yr storm in Harris County ≈ <strong>8.8 in/hr</strong>.",
            "<strong>Step 3 — Peak Runoff (Q):</strong> Q = 0.90 × 8.8 × 3.0 = <strong>23.76 cfs (10,664 GPM)</strong>.",
            "<strong>Step 4 — Detention Volume:</strong> Requires approximately <strong>38,500+ cu ft</strong> (~0.88 acre-ft) of surface pond or underground corrugated pipe detention."
        ],
        "checklist": [
            ("STEP 01", "Pull Site-Specific NOAA Atlas 14 IDF Table", "Use the exact project latitude/longitude on NOAA PFDS for 2-, 10-, 25-, and 100-year intensities."),
            ("STEP 02", "Verify HCFCD / City Detention Rate", "Harris County, City of Houston, Austin, and Dallas enforce strict post-development detention minimums."),
            ("STEP 03", "Check TCEQ Construction General Permit", "Sites disturbing 1.0+ acres require a SWPPP and TCEQ TXR150000 Notice of Intent (NOI)."),
            ("STEP 04", "Design Outfall Restrictor", "Size orifice plate or weir structure to throttle post-development discharge to pre-development cfs.")
        ],
        "faqs": [
            ("What runoff coefficient (C) does TxDOT use for commercial asphalt parking lots?", "The TxDOT Hydraulic Design Manual lists C = 0.70 to 0.95 for asphalt and concrete pavements, with 0.85 to 0.95 standard for commercial retail and industrial pads."),
            ("How much did NOAA Atlas 14 increase Houston detention requirements?", "In Harris County, Atlas 14 raised 100-year rainfall depths by 25%–35%, pushing commercial detention requirements to roughly 0.55 to 0.65+ acre-feet per acre of impervious cover."),
            ("When should I use the Rational Method vs. HEC-HMS in Texas?", "The Rational Method is standard for small commercial tracts (typically under 20–50 acres, max 200 acres per TxDOT). Larger watersheds or complex regional routing require NRCS/SCS hydrographs in HEC-HMS."),
            ("Does a 1.5-acre commercial site in Texas need a TCEQ stormwater permit?", "Yes. Any construction activity disturbing 1.0 or more acres in Texas requires a Stormwater Pollution Prevention Plan (SWPPP) under TCEQ General Permit TXR150000.")
        ]
    },
    {
        "tool": "site-spec",
        "slug": "florida-fdot-erp",
        "jurisdiction": "Florida (FDOT Drainage Manual & SFWMD / SWFWMD ERP)",
        "short_label": "Florida — FDOT & WMD ERP",
        "code_badge": "FDOT Drainage Manual • SFWMD / SWFWMD ERP",
        "title": "Florida Stormwater Runoff & Detention Calculator (FDOT Manual & WMD ERP)",
        "description": "Calculate commercial stormwater runoff (cfs) and retention sizing for Florida sites under the FDOT Drainage Manual and Water Management District Environmental Resource Permits (ERP).",
        "keywords": "florida stormwater runoff calculator, fdot drainage manual rational method, sfwmd erp detention calculator, florida wet detention pond sizing, swfwmd stormwater calculator",
        "h1": "Florida Stormwater Runoff &amp; Detention Calculator (FDOT &amp; WMD ERP)",
        "lead": "Estimate commercial site peak runoff (cfs) and preliminary detention volumes under the FDOT Drainage Manual and Florida Water Management District (SFWMD, SWFWMD, SJRWMD) Environmental Resource Permit (ERP) rules.",
        "meta_cards": [
            ("Governing Manual", "FDOT Drainage Manual"),
            ("Permit Authority", "SFWMD / SWFWMD / SJRWMD (ERP)"),
            ("Typical Impervious C", "0.85 – 0.95 (FDOT Table B-1)"),
            ("Key Site Constraint", "Seasonal High Water Table (SHWT)")
        ],
        "calc_defaults": {
            "acres": 2.5,
            "cval": 0.88,
            "intensity": 8.0
        },
        "intro_heading": "Florida ERP Stormwater Design & Seasonal High Water Table Constraints",
        "intro_body": [
            "Commercial land development in Florida requires an Environmental Resource Permit (ERP) from one of the state's five Water Management Districts (such as SFWMD in South Florida or SWFWMD in Tampa Bay). Unlike arid states, Florida mandates both water quantity attenuation (25-year/72-hour or 100-year storm) and strict water quality treatment volume (first 1 inch of runoff or 2.5 inches × impervious percentage).",
            "Because the Seasonal High Water Table (SHWT) often lies 1 to 3 feet below grade, dry retention ponds frequently fail drawdown tests—making wet detention ponds or underground exfiltration trenches the standard commercial solution."
        ],
        "code_table": [
            ("FDOT Drainage Manual", "Rational Method & IDF Curves", "Uses FDOT Zone 1–11 IDF curves; impervious asphalt/roof C = 0.85–0.95."),
            ("WMD ERP Rules", "Water Quality Treatment Volume", "Must treat greater of 1.0 inch over total site or 2.5 inches × % impervious cover prior to discharge."),
            ("SFWMD / SWFWMD", "Wet vs. Dry Detention", "Dry retention requires 1–2 ft clearance above SHWT; otherwise wet detention pond with littoral shelf is required."),
            ("FDEP Clean Waterways", "2024+ Nutrient Reduction", "Updated Florida stormwater rules mandate stricter Total Nitrogen (TN) and Total Phosphorus (TP) removal efficiencies.")
        ],
        "formula_title": "FDOT Rational Method Peak Flow Formula",
        "formula_expr": "Q (cfs) = C × I (FDOT Zone in/hr) × A (acres)   |   Water Quality Vol = max(1\" × Site, 2.5\" × Impervious)",
        "worked_example_title": "Worked Example: 2.5-Acre Commercial Plaza in Orlando, FL",
        "worked_example_steps": [
            "<strong>Step 1 — Composite C-Value:</strong> 80% impervious parking/roof + 20% turf → <strong>C = 0.88</strong>.",
            "<strong>Step 2 — FDOT Zone Intensity:</strong> 10-year, 15-minute storm in Central Florida ≈ <strong>8.0 in/hr</strong>.",
            "<strong>Step 3 — Peak Runoff (Q):</strong> Q = 0.88 × 8.0 × 2.5 = <strong>17.60 cfs (7,899 GPM)</strong>.",
            "<strong>Step 4 — ERP Treatment Volume:</strong> 2.5 in × 80% impervious = 2.0 in over 2.5 acres = <strong>18,150 cu ft</strong> minimum water quality volume."
        ],
        "checklist": [
            ("STEP 01", "Order Geotechnical SHWT Boring", "Establish Seasonal High Water Table (SHWT) elevation before choosing dry retention vs. wet detention."),
            ("STEP 02", "Identify Your Water Management District", "Confirm whether the parcel falls under SFWMD, SWFWMD, SJRWMD, SRWMD, or NWFWMD."),
            ("STEP 03", "Model Pre- vs. Post-Development Attenuation", "Run ICPR4 or HydroCAD routing for the district's required 25-year/24-hr or 72-hr storm event."),
            ("STEP 04", "Include FDEP Nutrient Treatment", "Verify updated Florida BMP treatment train compliance for phosphorus and nitrogen reduction.")
        ],
        "faqs": [
            ("What is a Florida ERP stormwater permit?", "An Environmental Resource Permit (ERP) issued by a Florida Water Management District regulates commercial site grading, stormwater runoff attenuation, water quality treatment, and wetland impacts."),
            ("Why are wet detention ponds so common in Florida commercial developments?", "Because Florida's Seasonal High Water Table (SHWT) sits very close to the surface, dry ponds cannot percolate stormwater within 72 hours. Wet detention ponds store runoff above the permanent pool elevation."),
            ("Which FDOT rainfall zone applies to my project?", "FDOT divides Florida into 11 Intensity-Duration-Frequency (IDF) rainfall zones (e.g., Zone 6 for Tampa, Zone 7 for Orlando, Zone 10 for Miami-Dade)."),
            ("Can underground exfiltration trenches replace a pond in Miami-Dade?", "Yes. Where land costs are high and porous limestone (Biscayne Aquifer) sits beneath the site, French drains / exfiltration trenches are widely used to meet SFWMD/DERM retention rules.")
        ]
    },
    {
        "tool": "site-spec",
        "slug": "california-caltrans-lid",
        "jurisdiction": "California (Caltrans HDM & MS4 LID Stormwater)",
        "short_label": "California — Caltrans & LID",
        "code_badge": "Caltrans HDM Ch. 810 • State Water Board MS4 LID",
        "title": "California Stormwater Runoff & LID Capture Calculator (Caltrans HDM & MS4)",
        "description": "Calculate commercial site peak runoff (cfs) and Low Impact Development (LID) 85th-percentile capture volumes under Caltrans Highway Design Manual and California MS4 permits.",
        "keywords": "california stormwater runoff calculator, caltrans hdm rational method, los angeles lid stormwater capture calculator, california ms4 85th percentile storm, rational method california",
        "h1": "California Stormwater Runoff &amp; LID Capture Calculator (Caltrans HDM &amp; MS4)",
        "lead": "Estimate commercial site peak discharge (cfs) and preliminary Low Impact Development (LID) capture sizing under Caltrans Highway Design Manual Chapter 810 and California Regional Water Board MS4 permits.",
        "meta_cards": [
            ("Governing Manual", "Caltrans HDM Ch. 810 & County Hydrology"),
            ("Water Quality Mandate", "MS4 LID (85th Percentile 24-Hr Storm)"),
            ("Impervious C-Value", "0.90 (LA County / Caltrans Standard)"),
            ("Construction Permit", "SWRCB CGP (SMARTS Filing)")
        ],
        "calc_defaults": {
            "acres": 2.0,
            "cval": 0.90,
            "intensity": 3.2
        },
        "intro_heading": "California Rational Method & Mandatory LID Bioretention Standards",
        "intro_body": [
            "Commercial projects in California face a dual stormwater requirement: peak flood control using the Rational Method (or LA County Modified Rational Method) AND mandatory Low Impact Development (LID) on-site capture of the 85th-percentile, 24-hour storm event under Regional Water Quality Control Board MS4 permits.",
            "In Los Angeles County (SUSMP/LID), the Bay Area (MRP C.3), and San Diego (BMP Design Manual), projects creating or replacing 5,000+ sq ft of impervious surface must infiltrate, capture/reuse, or biofilter stormwater on site via bioretention planters, permeable pavers, or underground infiltration galleries."
        ],
        "code_table": [
            ("Caltrans HDM §819.2", "Rational Method Standard", "Q = C × I × A for commercial tracts; asphalt/concrete roof C = 0.90."),
            ("MS4 LID Mandate", "85th Percentile Storm Capture", "On-site infiltration or biofiltration of the 85th percentile 24-hour storm (typically 0.75\" to 1.1\" in SoCal)."),
            ("SWRCB CGP", "SMARTS Risk Level 1–3", "Sites disturbing >= 1 acre require QSD-prepared SWPPP filed on California SMARTS portal."),
            ("LA County / Bay C.3", "Hydromodification Control", "Maintain post-project runoff flow duration curve to prevent downstream creek erosion.")
        ],
        "formula_title": "California Rational Method & LID Capture Volume Formula",
        "formula_expr": "Peak Q (cfs) = C × I × A   |   LID Capture Vol (cu ft) ≈ (0.85–1.0 in ÷ 12) × Impervious Area (sq ft) × C",
        "worked_example_title": "Worked Example: 2.0-Acre Commercial Warehouse in Los Angeles, CA",
        "worked_example_steps": [
            "<strong>Step 1 — Peak Runoff Inputs:</strong> 2.0 acres (87,120 sq ft), 90% impervious (<strong>C = 0.90</strong>), 25-yr short-duration intensity ≈ <strong>3.2 in/hr</strong>.",
            "<strong>Step 2 — Peak Discharge (Q):</strong> Q = 0.90 × 3.2 × 2.0 = <strong>5.76 cfs (2,585 GPM)</strong>.",
            "<strong>Step 3 — LA County LID 85th Percentile Capture:</strong> At 0.85 inch design storm, (0.85 ÷ 12) × 87,120 × 0.90 = <strong>5,554 cu ft</strong>.",
            "<strong>Step 4 — BMP Selection:</strong> Size underground infiltration chambers (if percolation >= 0.3 in/hr) or lined flow-through bioretention planters."
        ],
        "checklist": [
            ("STEP 01", "Run Soil Percolation / Infiltration Test", "Geotechnical infiltration rate (in/hr) determines whether you can infiltrate on site or must use lined biofiltration."),
            ("STEP 02", "Prepare LID / WQMP Report", "Submit Low Impact Development (LA) or Water Quality Management Plan (OC/IE/SD) during grading plan check."),
            ("STEP 03", "File SWRCB SMARTS NOI (If >= 1 Acre)", "Engage a Qualified SWPPP Developer (QSD) and Practitioner (QSP) for California Construction General Permit."),
            ("STEP 04", "Record LID Maintenance Covenant", "Most California cities require recording a permanent BMP maintenance covenant on the property title.")
        ],
        "faqs": [
            ("What is the 85th percentile storm in California LID stormwater design?", "It is the 24-hour rainfall depth that is greater than or equal to 85% of all storm events in the local historical record (commonly 0.75 to 1.10 inches in Southern California)."),
            ("What impervious threshold triggers California MS4 LID requirements?", "Most California MS4 permits trigger full LID stormwater capture when a commercial development creates or replaces 5,000 to 10,000 sq ft of impervious surface (2,500 sq ft for restaurants and auto facilities in some counties)."),
            ("Can I use underground infiltration chambers under a California parking lot?", "Yes—provided geotechnical percolation testing confirms adequate infiltration rate, minimum 10-foot groundwater separation, and no soil contamination plumes."),
            ("What is a QSD vs. QSP under California's Construction General Permit?", "A QSD (Qualified SWPPP Developer) writes the stormwater plan, while a QSP (Qualified SWPPP Practitioner) conducts mandatory site inspections and rain-event sampling during construction.")
        ]
    },

    # =========================================================================
    # 5. PERMIT SPEC — COMMERCIAL TENANT IMPROVEMENT (3 JURISDICTIONS)
    # =========================================================================
    {
        "tool": "permit-spec",
        "slug": "california-cbc-title24",
        "jurisdiction": "California (CBC, Title 24 Energy & Chapter 11B ADA)",
        "short_label": "California — CBC & Title 24",
        "code_badge": "California Building Code • Title 24 • Chapter 11B",
        "title": "California Commercial Tenant Improvement Calculator (CBC, Title 24 & ADA 11B)",
        "description": "Estimate commercial tenant improvement (TI) costs, IBC/CBC occupant load, exit counts, Title 24 Part 6 energy upgrades, and Chapter 11B 20% ADA path-of-travel budgets in California.",
        "keywords": "california commercial tenant improvement cost calculator, title 24 tenant improvement requirements, cbc chapter 11b 20 percent rule, california commercial occupancy load calculator",
        "h1": "California Commercial Tenant Improvement Calculator (CBC, Title 24 &amp; Chapter 11B)",
        "lead": "Calculate commercial occupant loads, required exits, plumbing fixture counts, and TI construction budgets tailored to the California Building Code (CBC), Title 24 Part 6 energy rules, and Chapter 11B accessibility triggers.",
        "meta_cards": [
            ("Governing Building Code", "2022/2025 California Building Code"),
            ("Energy Compliance", "Title 24 Part 6 (NRCC Forms)"),
            ("ADA Path-of-Travel Rule", "CBC §11B-202.4 (20% Valuation)"),
            ("Typical CA TI Cost", "$145 – $280 / sq ft (Urban)")
        ],
        "calc_defaults": {
            "sqft": 4000,
            "occ": 150,
            "cost": 185
        },
        "intro_heading": "Hidden California TI Budget Triggers: Title 24 & Chapter 11B Path of Travel",
        "intro_body": [
            "Commercial Tenant Improvements (TI) in Los Angeles, San Francisco, San Diego, and Orange County carry two major regulatory cost drivers beyond standard IBC jurisdictions: California Title 24 Part 6 Energy Standards (requiring automated lighting controls, demand-responsive thermostats, and HERS/ATTCP acceptance testing) and CBC Chapter 11B Disabled Access.",
            "Under CBC §11B-202.4, if your TI valuation is below the annual DSA valuation threshold (approx. $200,000+), you must spend up to 20% of the adjusted construction cost upgrading the accessible path of travel (parking, entrance, restrooms, drinking fountains). Above the threshold, full 100% path-of-travel compliance is triggered."
        ],
        "code_table": [
            ("CBC Table 1004.5", "Occupant Load Factors", "Business/Office: 150 gross sq ft; Mercantile/Retail: 60 gross sq ft; Assembly (Unconcentrated): 15 net sq ft."),
            ("CBC §1006.2.1", "Two-Exit Threshold", "Spaces with occupant load >= 50 (Group B, M, A) or common path of egress > 75–100 ft require 2 remote exits."),
            ("CBC §11B-202.4", "20% Path-of-Travel Rule", "Alterations trigger mandatory accessible parking, entry, and restroom upgrades up to 20% of project valuation (or full compliance above DSA threshold)."),
            ("Title 24 Part 6", "NRCC Lighting & Mechanical", "Requires certified Acceptance Test Technician (ATTCP) sign-off on commercial lighting controls and HVAC economizers.")
        ],
        "formula_title": "CBC Occupant Load & Chapter 11B Budget Reserve Formula",
        "formula_expr": "Occupant Load = Gross Sq Ft ÷ CBC Table 1004.5 Factor   |   ADA Reserve = 20% × TI Valuation (Below DSA Cap)",
        "worked_example_title": "Worked Example: 4,000 Sq Ft Commercial Office TI in Orange County, CA",
        "worked_example_steps": [
            "<strong>Step 1 — Occupant Load (Group B):</strong> 4,000 sq ft ÷ 150 sq ft/occupant = <strong>27 Occupants</strong> (1 exit permitted if travel distance <= 100 ft sprinklered).",
            "<strong>Step 2 — Base TI Construction Cost:</strong> 4,000 sq ft × $185/sq ft = <strong>$740,000</strong>.",
            "<strong>Step 3 — CBC Chapter 11B Trigger:</strong> Exceeds annual DSA valuation threshold (~$200k) → <strong>full accessible path-of-travel compliance</strong> (parking stall, entry door pressure <= 5 lbf, compliant restroom).",
            "<strong>Step 4 — Title 24 Acceptance Testing:</strong> Budget $3,500–$6,000 for certified ATTCP lighting & mechanical acceptance testing prior to final inspection."
        ],
        "checklist": [
            ("STEP 01", "Commission a CASp Inspection Before Signing Lease", "A Certified Access Specialist (CASp) report identifies hidden parking/restroom barriers so you can negotiate landlord TI allowance."),
            ("STEP 02", "Verify Change of Occupancy (e.g., Retail → Restaurant)", "Changing occupancy group (M to A-2 or B) triggers full seismic, fire sprinkler, and Title 24 upgrades."),
            ("STEP 03", "Include Title 24 NRCC Forms in Plan Submittal", "Architectural, mechanical, and electrical Title 24 energy compliance forms must be stamped onto the permit drawing set."),
            ("STEP 04", "Schedule ATTCP Acceptance Testing", "City inspectors will not grant final Certificate of Occupancy without signed Title 24 NRCA acceptance certificates.")
        ],
        "faqs": [
            ("What is the 20% ADA rule for California commercial tenant improvements?", "Under CBC §11B-202.4, when a commercial TI project is below the state's annual DSA valuation threshold (approx. $200,000+), the owner must spend up to 20% of the construction budget upgrading accessible path-of-travel elements (entrance, restrooms, parking)."),
            ("When do I need 2 exits in a California commercial space?", "Under CBC Table 1006.2.1, Business (Group B), Mercantile (Group M), and Assembly (Group A) spaces require at least 2 exits whenever the occupant load reaches 50 or more (or if common path of egress exceeds code limits)."),
            ("What is Title 24 ATTCP acceptance testing?", "California Title 24 Part 6 requires an independent, state-certified Acceptance Test Technician to functionally test commercial lighting controls (occupancy sensors, daylight dimming) and HVAC systems before final inspection."),
            ("How long do commercial TI permits take in Los Angeles or San Francisco?", "Simple office TIs can clear over-the-counter or in 4–8 weeks; full restaurant or change-of-use TIs typically require 3 to 6 months across Building, Health, and Fire plan checks.")
        ]
    },
    {
        "tool": "permit-spec",
        "slug": "texas-ibc-tas",
        "jurisdiction": "Texas (IBC 2021/2024 & TDLR TAS Accessibility)",
        "short_label": "Texas — IBC & TDLR TAS",
        "code_badge": "IBC 2021/2024 • TDLR TAS ($50k Rule)",
        "title": "Texas Commercial Tenant Improvement & Occupancy Calculator (IBC & TDLR TAS)",
        "description": "Calculate commercial TI budgets, IBC occupant load, exit counts, and Texas Accessibility Standards (TDLR TAS $50,000 threshold) requirements for Houston, Dallas, and Austin.",
        "keywords": "texas commercial tenant improvement calculator, tdlr tas 50000 threshold, ibc 1004 occupant load calculator texas, houston commercial remodel permit, austin commercial ti cost",
        "h1": "Texas Commercial Tenant Improvement Calculator (IBC &amp; TDLR TAS)",
        "lead": "Estimate commercial occupant loads, required egress doors, plumbing fixtures, and TI construction costs across Texas under the International Building Code (IBC) and mandatory TDLR Texas Accessibility Standards (TAS) registration.",
        "meta_cards": [
            ("Governing Building Code", "IBC 2021 / 2024 (Local Adoption)"),
            ("Accessibility Law", "TDLR TAS (Mandatory >= $50,000)"),
            ("Energy Code", "IECC 2021 (COMcheck Required)"),
            ("Typical TX TI Cost", "$105 – $195 / sq ft")
        ],
        "calc_defaults": {
            "sqft": 5000,
            "occ": 150,
            "cost": 135
        },
        "intro_heading": "The Texas TDLR TAS $50,000 Rule Every Commercial Contractor Must Know",
        "intro_body": [
            "Texas municipalities (Houston, Dallas, Austin, San Antonio) enforce the 2021 or 2024 International Building Code (IBC) and IECC energy code (via COMcheck). However, Texas enforces a unique statewide accessibility statute: the Architectural Barriers Act (Texas Government Code Chapter 469).",
            "Any commercial construction, renovation, or tenant improvement in Texas with an estimated construction cost of $50,000 or more MUST be registered with the Texas Department of Licensing and Regulation (TDLR), reviewed by a Registered Accessibility Specialist (RAS) before permitting, and inspected within 1 year of completion."
        ],
        "code_table": [
            ("IBC Table 1004.5", "Occupant Load Factors", "Business: 150 gross sq ft; Mercantile: 60 gross sq ft; Dining/Assembly: 15 net sq ft."),
            ("TDLR TAS §68.50", "$50,000 Registration Threshold", "Mandatory EABPRJ registration + RAS plan review & post-construction inspection for all commercial projects >= $50,000."),
            ("IECC 2021", "COMcheck Energy Compliance", "Envelope, lighting power density (LPD), and mechanical COMcheck certificates required at permit submittal."),
            ("IPC Table 403.1", "Restroom Fixture Counts", "Single-user unisex restroom allowed for small spaces (typically <= 15 occupants for B/M or <= 30 in some TX amendments).")
        ],
        "formula_title": "Texas IBC Occupant Load & TI Budget Formula",
        "formula_expr": "Occupant Load = Area (sq ft) ÷ IBC Factor   |   TDLR TAS Trigger = Estimated Construction Cost >= $50,000",
        "worked_example_title": "Worked Example: 5,000 Sq Ft Medical / Professional Office TI in Dallas, TX",
        "worked_example_steps": [
            "<strong>Step 1 — Occupant Load:</strong> 5,000 sq ft ÷ 150 sq ft (Group B) = <strong>34 Occupants</strong>.",
            "<strong>Step 2 — Egress Check:</strong> Under 50 occupants, but confirm max common path of egress travel (<= 75 ft unsprinklered / <= 100 ft sprinklered).",
            "<strong>Step 3 — Estimated TI Budget:</strong> 5,000 sq ft × $135/sq ft = <strong>$675,000</strong>.",
            "<strong>Step 4 — TDLR TAS Filing:</strong> Exceeds $50,000 → obtain TDLR Project Number (TABS) and submit drawings to a Registered Accessibility Specialist (RAS)."
        ],
        "checklist": [
            ("STEP 01", "Register TABS Number With TDLR", "If project valuation is >= $50,000, register online with TDLR ($175 state fee) and hire a Texas RAS before submitting to the city."),
            ("STEP 02", "Generate COMcheck Energy Reports", "Attach signed Lighting, Mechanical, and Envelope COMcheck compliance certificates to the permit package."),
            ("STEP 03", "Verify Fire Marshal Sprinkler & Alarm Scope", "Moving partitions or ceilings in sprinklered Texas buildings requires a licensed Texas RME-G / APS fire submittal."),
            ("STEP 04", "Complete Post-Construction RAS Inspection", "Schedule the mandatory RAS accessibility inspection within 365 days of substantial completion to avoid TDLR fines.")
        ],
        "faqs": [
            ("What triggers a TDLR TAS accessibility review in Texas?", "Any commercial building construction, remodel, or tenant finish-out in Texas with an estimated construction cost of $50,000 or more requires TDLR registration and Registered Accessibility Specialist (RAS) review and inspection."),
            ("Do Texas cities require a TABS number before issuing a commercial building permit?", "Yes. Houston, Dallas, Austin, and San Antonio building departments require your TDLR Architectural Barriers (TABS) registration number on the permit application for projects >= $50,000."),
            ("What is the IBC occupant load factor for a commercial office in Texas?", "Under the 2021 and 2024 IBC Table 1004.5, Business areas (offices) are calculated at 150 gross square feet per occupant (updated from the older 100 sq ft rule)."),
            ("Is an architect seal required for a commercial tenant improvement in Texas?", "Under the Texas Board of Architectural Examiners (TBAE), an architect seal is generally required for commercial alterations exceeding $50,000 or involving life-safety/egress changes.")
        ]
    },
    {
        "tool": "permit-spec",
        "slug": "nyc-dob-alt2",
        "jurisdiction": "New York City (NYC Building Code 2022 & DOB NOW Alt-2)",
        "short_label": "NYC — BC 2022 & DOB Alt-2",
        "code_badge": "2022 NYC Building Code • DOB NOW Alt-2 • NYCECC",
        "title": "NYC Commercial Tenant Improvement Calculator (NYC BC 2022 & DOB NOW Alt-2)",
        "description": "Estimate NYC commercial tenant improvement (TI) budgets, occupant load, exit counts, DOB NOW Alt-2 vs. Alt-1 filing scope, and NYC Energy Conservation Code compliance.",
        "keywords": "nyc commercial tenant improvement cost calculator, nyc dob alt 2 vs alt 1, nyc building code occupant load calculator, manhattan office buildout cost per sq ft",
        "h1": "NYC Commercial Tenant Improvement Calculator (NYC BC 2022 &amp; DOB NOW Alt-2)",
        "lead": "Plan commercial office, retail, and hospitality buildouts in New York City with 2022 NYC Building Code occupant load calculations, Alt-1 vs. Alt-2 filing guidance, and Manhattan/Outer Borough TI cost benchmarks.",
        "meta_cards": [
            ("Governing Code", "2022 NYC Building Code"),
            ("Permit Portal", "NYC DOB NOW: Build (Alt-CO / Alt)"),
            ("Energy Compliance", "2020/2025 NYCECC (EN1/TR8)"),
            ("Typical NYC TI Cost", "$190 – $350+ / sq ft")
        ],
        "calc_defaults": {
            "sqft": 3500,
            "occ": 150,
            "cost": 240
        },
        "intro_heading": "NYC DOB Alt-2 vs. Alt-1 Filings & Special Inspections (TR1/TR8)",
        "intro_body": [
            "Commercial buildouts in New York City require strict classification under NYC DOB rules. Standard office or retail interior renovations that do not change the building's use, egress, or occupancy group file as an Alteration (formerly Alt-2) in DOB NOW—often eligible for Professional Certification by a NY Registered Architect (RA) or PE for faster approval.",
            "Projects that change the occupancy group (for example, converting retail Group M into a restaurant Group A-2 over 74 occupants) require a full Alteration-CO (formerly Alt-1) resulting in a new Certificate of Occupancy, plus FDNY fire alarm and sprinkler sign-offs."
        ],
        "code_table": [
            ("NYC BC §1004.5", "NYC Occupant Load", "Business: 150 gross sq ft; Mercantile: 60 gross sq ft; Public Assembly (PA) permit triggered at >= 75 persons."),
            ("DOB NOW Alt-2", "No Change in Use/Egress", "Covers interior partitions, MEP, ceilings, and lighting without modifying the Certificate of Occupancy."),
            ("NYC BC §28-117", "Place of Assembly (PA) Permit", "Mandatory separate DOB Place of Assembly Certificate of Operation when indoor assembly occupancy reaches 75+."),
            ("NYCECC / TR8", "Energy Special Inspections", "Requires independent Special Inspection Agency (TR8) verification of commercial lighting, HVAC, and envelope.")
        ],
        "formula_title": "NYC Occupant Load & Place of Assembly Check Formula",
        "formula_expr": "Occupant Load = Sq Ft ÷ NYC BC Table 1004.5   |   If Assembly >= 75 Persons → Place of Assembly (PA) Permit Required",
        "worked_example_title": "Worked Example: 3,500 Sq Ft Commercial Office Suite in Midtown Manhattan",
        "worked_example_steps": [
            "<strong>Step 1 — Occupant Load:</strong> 3,500 sq ft ÷ 150 sq ft (Group B) = <strong>24 Occupants</strong>.",
            "<strong>Step 2 — Filing Classification:</strong> Existing Group B office remaining Group B → qualifies for <strong>DOB NOW Alteration (Alt-2)</strong>.",
            "<strong>Step 3 — Estimated NYC TI Budget:</strong> 3,500 sq ft × $240/sq ft = <strong>$840,000</strong> (includes union/building-approved MEP & expediting).",
            "<strong>Step 4 — Asbestos & Special Inspections:</strong> File mandatory NYC DEP ACP-5 asbestos form prior to DOB permit issuance plus TR1/TR8 energy inspections."
        ],
        "checklist": [
            ("STEP 01", "Obtain NYC DEP ACP-5 Form First", "A certified NYC Asbestos Investigator must issue an ACP-5 (No Asbestos) form before DOB will issue any alteration permit."),
            ("STEP 02", "Verify Existing Certificate of Occupancy", "Confirm current legal use group on NYC DOB BIS/DOB NOW to avoid triggering an unexpected Alt-1 CO change."),
            ("STEP 03", "Hire Special Inspection Agency (TR1 / TR8)", "Firestopping, mechanical, sprinkler, and NYCECC energy code inspections require a DOB-registered Special Inspection Agency."),
            ("STEP 04", "Confirm Building Class A Rules", "Verify landlord union labor rules, freight elevator hours, and Certificate of Insurance (COI) limits before bidding.")
        ],
        "faqs": [
            ("What is the difference between a NYC DOB Alt-1 and Alt-2 permit?", "An Alt-2 (Alteration) covers interior renovations (partitions, plumbing, HVAC, electrical) that do not change the building's use, egress, or occupancy. An Alt-1 (Alteration-CO) is required when changing occupancy group or egress, resulting in a new Certificate of Occupancy."),
            ("When is a NYC Place of Assembly (PA) permit required?", "Any indoor commercial space (restaurant, bar, event venue, conference center) with a calculated occupancy of 75 or more persons requires a DOB Place of Assembly Certificate of Operation."),
            ("Do I need an ACP-5 asbestos form for a modern NYC office buildout?", "Yes. Unless exempt under specific DOB criteria, an ACP-5 signed by a DEP-certified Asbestos Investigator is required for virtually all NYC commercial alteration filings."),
            ("Can a contractor pull a commercial TI permit in NYC without an architect?", "No. Commercial interior alterations in NYC must be filed by a New York State Registered Architect (RA) or Professional Engineer (PE) on DOB NOW.")
        ]
    },

    # =========================================================================
    # 6. COLD SPEC — WALK-IN COOLER & COLD STORAGE (3 JURISDICTIONS)
    # =========================================================================
    {
        "tool": "cold-spec",
        "slug": "california-title24-carb",
        "jurisdiction": "California (Title 24 §120.6 & CARB Low-GWP Refrigerants)",
        "short_label": "California — Title 24 & CARB",
        "code_badge": "Title 24 Part 6 §120.6 • CARB Low-GWP (<150)",
        "title": "California Walk-In Cooler & Freezer BTU Calculator (Title 24 §120.6 & CARB)",
        "description": "Size commercial walk-in coolers and freezers in California under Title 24 Part 6 Section 120.6 insulation/motor rules and CARB <150 GWP refrigerant regulations.",
        "keywords": "california walk in cooler sizing calculator, title 24 section 120.6 walk in cooler, carb low gwp refrigerant commercial refrigeration, walk in freezer btu calculator california",
        "h1": "California Walk-In Cooler &amp; Freezer BTU Calculator (Title 24 &amp; CARB)",
        "lead": "Calculate commercial walk-in cooler and freezer heat loads (BTU/hr), refrigeration tonnage, and condenser HP compliant with California Title 24 Part 6 Section 120.6 and CARB Low-GWP refrigerant mandates.",
        "meta_cards": [
            ("Energy Standard", "Title 24 Part 6 (§120.6(a))"),
            ("Refrigerant Mandate", "CARB (<150 GWP New Systems >50 lb)"),
            ("Min Wall / Floor R-Value", "R-25 Cooler / R-32 Freezer (4\"+ PIR)"),
            ("Mandatory Hardware", "EC Fan Motors & Auto Door Closers")
        ],
        "calc_defaults": {
            "latent_mult": "1.10",
            "sqft": 400,
            "boxtemp": 35,
            "ambtemp": 95
        },
        "intro_heading": "California Title 24 §120.6 & CARB Refrigerant Rules for Walk-In Boxes",
        "intro_body": [
            "California enforces the strictest commercial refrigeration efficiency and refrigerant rules in the United States. Under Title 24 Part 6 Section 120.6 (and DOE Federal EISA standards), walk-in coolers must meet minimum R-25 wall/ceiling insulation, walk-in freezers must meet R-32 walls and R-28 floors, and all evaporator/condenser fans must use high-efficiency Electronically Commutated (EC) motors.",
            "Simultaneously, the California Air Resources Board (CARB) prohibits high-GWP HFC refrigerants (like R-404A) in new commercial refrigeration systems with >50 lbs charge, driving adoption of A2L refrigerants (R-454A/R-454C) or natural CO2 (R-744) systems."
        ],
        "code_table": [
            ("Title 24 §120.6(a)", "Box Insulation & Doors", "R-25 min cooler panels, R-32 min freezer panels; automatic door closers & strip curtains mandatory."),
            ("Title 24 §120.6(a)4", "Evaporator & Condenser Fans", "EC motors required on evaporator fans (<1 HP) and variable-speed/floating head pressure controls on condensers."),
            ("CARB HFC Rule", "Low-GWP Refrigerant Cap", "New refrigeration facilities >50 lbs charge capped at <150 GWP; retail/foodservice systems shifting to A2L/CO2."),
            ("ASHRAE 15 / CMC", "A2L Leak Detection", "New mildly flammable A2L refrigerants require mechanical room/box leak sensors per California Mechanical Code.")
        ],
        "formula_title": "Walk-In Heat Load (BTU/hr) & Tonnage Estimation Formula",
        "formula_expr": "Total Load (BTU/hr) = Box Area × Base Factor × (ΔT ÷ 60) × Local Factor   |   Tons = BTU/hr ÷ 12,000",
        "worked_example_title": "Worked Example: 20 ft × 20 ft (400 Sq Ft) Walk-In Cooler in Sacramento, CA",
        "worked_example_steps": [
            "<strong>Step 1 — Box & Ambient ΔT:</strong> 35°F cooler box inside 95°F unconditioned back-of-house/outdoor condensing ambient → <strong>ΔT = 60°F</strong>.",
            "<strong>Step 2 — Total Hourly Heat Load:</strong> 400 sq ft × 30 BTU/sq ft × (60 ÷ 60) × 1.10 = <strong>13,200 BTU/hr</strong> (1.10 Tons).",
            "<strong>Step 3 — Condensing Unit Selection:</strong> Select <strong>1.5 HP to 2.0 HP</strong> Title 24 compliant outdoor condensing unit with floating head pressure control.",
            "<strong>Step 4 — Title 24 Compliance:</strong> Verify 4-inch polyurethane (R-28/R-32) cam-lock panels, LED vapor-tight fixtures with occupancy sensors, and EC evaporator fans."
        ],
        "checklist": [
            ("STEP 01", "Verify DOE / Title 24 AWEF Rating", "Confirm the condensing unit and unit cooler meet Annual Walk-In Energy Factor (AWEF) minimums."),
            ("STEP 02", "Confirm CARB Refrigerant Compliance", "Avoid legacy R-404A equipment; specify compliant low-GWP / A2L / CO2 condensing packages."),
            ("STEP 03", "Include Floor Insulation & Heated Threshold", "Walk-in freezers (<= 32°F) require R-28 insulated floors and heated door frames to prevent slab frost heave."),
            ("STEP 04", "Submit NRCC-PRC-E Title 24 Forms", "Commercial refrigerated warehouses (>3,000 sq ft) require full Title 24 Process Refrigeration compliance forms.")
        ],
        "faqs": [
            ("What R-value is required for walk-in coolers and freezers in California?", "Under DOE standards and California Title 24 Part 6, walk-in coolers require at least R-25 wall/ceiling insulation, and walk-in freezers require at least R-32 walls/ceilings and R-28 floors."),
            ("Can I still install a new R-404A walk-in cooler in California?", "No. CARB regulations ban R-404A and R-507A in new commercial refrigeration equipment. Contractors must specify CARB-compliant lower-GWP blends, A2L refrigerants, or CO2 systems."),
            ("Do California walk-in coolers require occupancy sensors on lights?", "Yes. Title 24 and DOE rules require LED lighting with automatic shutoff timers or occupancy sensors (max 15-minute shutoff) inside commercial walk-in boxes."),
            ("How many BTUs per square foot does a commercial walk-in cooler need?", "A standard 35°F walk-in cooler typically requires 25 to 35 BTU/hr per square foot of floor area, while a -10°F walk-in freezer requires 45 to 60 BTU/hr per square foot depending on ambient temperature and door traffic.")
        ]
    },
    {
        "tool": "cold-spec",
        "slug": "texas-ashrae-90-1",
        "jurisdiction": "Texas (IECC 2021 / ASHRAE 90.1 High-Ambient Sizing)",
        "short_label": "Texas — ASHRAE High Ambient",
        "code_badge": "IECC 2021 • ASHRAE 90.1 • 105°F Ambient Design",
        "title": "Texas Walk-In Cooler & Freezer BTU Calculator (ASHRAE 90.1 High Ambient)",
        "description": "Size commercial walk-in coolers and freezers for Texas's extreme 100°F–105°F summer ambient design temperatures under IECC 2021 and ASHRAE 90.1.",
        "keywords": "texas walk in cooler btu calculator, high ambient condensing unit sizing texas, ashrae 90.1 walk in cooler, dallas commercial refrigeration sizing, houston walk in freezer calculator",
        "h1": "Texas Walk-In Cooler &amp; Freezer BTU Calculator (High-Ambient ASHRAE 90.1)",
        "lead": "Prevent summer compressor burnout across Dallas, Houston, Austin, and San Antonio. Size walk-in cooler BTU heat loads and outdoor condensing units for 100°F–105°F Texas summer ambient design temperatures.",
        "meta_cards": [
            ("Governing Energy Code", "IECC 2021 / ASHRAE 90.1"),
            ("Summer 0.4% Ambient", "100°F – 105°F (Roof up to 115°F)"),
            ("Panel Spec", "4\"+ Foamed-in-Place PIR (R-28/R-32)"),
            ("Condenser Sizing", "Derated for 105°F–110°F Ambient")
        ],
        "calc_defaults": {
            "latent_mult": "1.18",
            "sqft": 450,
            "boxtemp": 35,
            "ambtemp": 105
        },
        "intro_heading": "Why Standard 95°F Refrigeration Charts Fail on Texas Rooftops",
        "intro_body": [
            "Most manufacturer walk-in condensing unit brochures publish headline BTU ratings at 90°F or 95°F ambient air temperature. In Texas, ASHRAE 0.4% cooling design temperatures exceed 100°F–103°F—and black TPO or gravel commercial rooftops routinely hit 110°F–115°F in July and August.",
            "At 105°F–110°F ambient, an air-cooled condensing unit loses 12% to 20% of its rated BTU capacity while head pressures spike. Properly derating the condenser and upgrading to 4-inch or 5-inch insulated panels avoids high-pressure cutouts during peak summer service."
        ],
        "code_table": [
            ("ASHRAE 0.4% DB", "Texas Summer Design Temps", "Dallas/Fort Worth: 101°F; Houston: 98°F (High Humidity); Austin/San Antonio: 101°F; El Paso: 102°F."),
            ("IECC 2021 §C403.10", "Walk-In Efficiency Rules", "Mandates DOE-compliant R-25/R-32 panels, EC evaporator fan motors, automatic door closers, and LED lighting."),
            ("Condenser Derating", "High-Ambient Selection", "Always select outdoor Texas condensing units from the 105°F or 110°F ambient column of the manufacturer catalog."),
            ("IMC Chapter 11", "Refrigerant Piping & Access", "Insulate suction lines with minimum 3/4\" to 1\" closed-cell elastomeric insulation to prevent condensation drip.")
        ],
        "formula_title": "Texas High-Ambient Heat Load Formula",
        "formula_expr": "Total BTU/hr = Floor Sq Ft × Base Factor × ((Ambient 105°F − Box Temp) ÷ 60) × 1.18",
        "worked_example_title": "Worked Example: 450 Sq Ft Restaurant Walk-In Cooler in Dallas, TX",
        "worked_example_steps": [
            "<strong>Step 1 — High-Ambient ΔT:</strong> 35°F cooler box with 105°F summer design ambient → <strong>ΔT = 70°F</strong>.",
            "<strong>Step 2 — Calculated Load:</strong> 450 sq ft × 30 × (70 ÷ 60) × 1.18 = <strong>18,585 BTU/hr</strong> (1.55 Tons).",
            "<strong>Step 3 — Condenser Selection:</strong> Select a <strong>2.5 HP condensing unit</strong> rated to deliver >= 19,000 BTU/hr specifically at <strong>105°F–110°F ambient</strong>.",
            "<strong>Step 4 — Rooftop Placement:</strong> Elevate unit on 18-inch stands above roof membrane heat layer with clear airflow on all condenser coil sides."
        ],
        "checklist": [
            ("STEP 01", "Select From 105°F–110°F Catalog Column", "Never size a Texas outdoor condensing unit using standard 90°F/95°F ratings."),
            ("STEP 02", "Verify 16-to-18 Hour Daily Runtime", "Size equipment so total 24-hour heat load is satisfied in 16 hours (coolers) or 18 hours (freezers with defrost)."),
            ("STEP 03", "Install Oversized Condenser Coil / Hail Guards", "Protect rooftop fins from Texas spring hailstorms without restricting airflow."),
            ("STEP 04", "Confirm Dedicated Electrical Disconnect", "Provide weatherproof NEC disconnect and 120V GFCI service receptacle within 25 feet on the roof.")
        ],
        "faqs": [
            ("What ambient temperature should I use to size a walk-in cooler in Texas?", "Use at least 100°F–105°F for ground-level shaded units and 110°F for rooftop condensing units across Dallas, Austin, Houston, and San Antonio."),
            ("Why do walk-in coolers fail in Texas during July and August?", "Undersized condensers selected at 95°F ratings cannot reject heat when rooftop air hits 110°F+, causing high head pressure trips and compressor overheating."),
            ("Do walk-in freezers in Texas need heated pressure relief ports?", "Yes. Every commercial walk-in freezer requires a heated pressure relief port to equalize air pressure when warm humid air contracts after door openings."),
            ("What insulation thickness is best for Texas walk-in freezers?", "Minimum 4-inch foamed-in-place polyurethane/PIR panels (R-32) for indoor freezers, and 5-inch panels (R-40) for outdoor boxes exposed to direct Texas sun.")
        ]
    },
    {
        "tool": "cold-spec",
        "slug": "florida-fbc-humidity",
        "jurisdiction": "Florida (FBC Energy & High-Humidity Latent Load)",
        "short_label": "Florida — FBC & Latent Humidity",
        "code_badge": "Florida Building Code Energy • High Latent Load",
        "title": "Florida Walk-In Cooler Heat Load & Humidity Calculator (FBC Energy)",
        "description": "Size commercial walk-in coolers and freezers for Florida's extreme ambient humidity and latent infiltration loads under Florida Building Code Energy Conservation rules.",
        "keywords": "florida walk in cooler btu calculator, high humidity walk in freezer sizing, florida building code walk in cooler, miami commercial refrigeration sizing, latent heat load walk in cooler",
        "h1": "Florida Walk-In Cooler &amp; Freezer BTU Calculator (FBC &amp; High-Humidity Load)",
        "lead": "Account for Florida's 78°F–80°F dew points and massive latent moisture infiltration. Calculate commercial walk-in cooler BTU loads, evaporator defrost sizing, and coastal corrosion-resistant condensing specs.",
        "meta_cards": [
            ("Governing Energy Code", "FBC Energy Conservation (IECC)"),
            ("Ambient Humidity Factor", "High Latent Moisture (78°F+ Dew Pt)"),
            ("Coastal Coil Spec", "E-Coated / Copper-Fin Condenser"),
            ("Anti-Sweat Hardware", "Strip Curtains & Heated Thresholds")
        ],
        "calc_defaults": {
            "latent_mult": "1.25",
            "sqft": 360,
            "boxtemp": 0,
            "ambtemp": 95
        },
        "intro_heading": "Why Latent Humidity Dominates Walk-In Freezer Loads in Florida",
        "intro_body": [
            "In Miami, Tampa, Orlando, and Jacksonville, ambient relative humidity regularly sits at 75% to 90% with dew points near 78°F. Every time a kitchen staff member opens a walk-in freezer door, warm moisture-laden air rushes inside and instantly condenses and freezes on the evaporator coil—creating massive latent heat load and rapid coil icing.",
            "Under the Florida Building Code – Energy Conservation, walk-in boxes require automatic door closers, heavy-duty vinyl strip curtains or air curtains, and properly sized electric/hot-gas defrost cycles. Coastal installations also require E-coated or Heresite-coated condenser coils to survive salt-air corrosion."
        ],
        "code_table": [
            ("FBC Energy §C403.10", "Walk-In Box Efficiency", "Mandatory R-25 cooler / R-32 freezer panels, EC fan motors, LED lighting, and automatic door closers."),
            ("Latent Infiltration", "High Dew-Point Multiplier", "Add 20%–25% infiltration safety margin for high-traffic Florida restaurant kitchens and outdoor boxes."),
            ("Coastal Protection", "Coil Coating & HVHZ Tie-Downs", "Specify factory E-coat/TechniCoat condenser coils and FBC HVHZ wind-rated equipment stands."),
            ("Condensate Drainage", "Heated Freezer Drain Lines", "Freezer evaporator drain lines must be heat-traced, insulated, and trapped outside the box to prevent freeze-ups.")
        ],
        "formula_title": "Florida High-Latent-Load Walk-In Sizing Formula",
        "formula_expr": "Total BTU/hr = Floor Sq Ft × Base Factor × (ΔT ÷ 60) × 1.25 (High Humidity / Latent Factor)",
        "worked_example_title": "Worked Example: 360 Sq Ft Walk-In Freezer (0°F) in Miami, FL",
        "worked_example_steps": [
            "<strong>Step 1 — Box & Ambient ΔT:</strong> 0°F freezer with 95°F ambient → <strong>ΔT = 95°F</strong>.",
            "<strong>Step 2 — High-Latent Load Calculation:</strong> 360 sq ft × 48 BTU/sq ft × (95 ÷ 60) × 1.25 = <strong>34,200 BTU/hr</strong> (2.85 Tons).",
            "<strong>Step 3 — Condensing Unit Selection:</strong> Select a <strong>4.0 HP low-temp condensing unit</strong> with factory E-coated coil and electric defrost evaporator.",
            "<strong>Step 4 — Moisture Control:</strong> Install heavy-duty strip curtains, heated pressure relief port, and heat-traced condensate drain line."
        ],
        "checklist": [
            ("STEP 01", "Install Strip Curtains & Auto Door Closers", "Mandatory under FBC Energy and critical to cutting Florida latent frost buildup by up to 60%."),
            ("STEP 02", "Specify Corrosion-Resistant Condenser Coils", "Standard bare aluminum fins corrode in 2–4 years near Florida coasts; order factory E-coated coils."),
            ("STEP 03", "Anchor Outdoor Units for HVHZ Wind Loads", "Miami-Dade and Broward outdoor boxes and condensing racks require engineered hurricane tie-down straps."),
            ("STEP 04", "Size Defrost Cycles for Humid Climate", "Program 4 electric defrost cycles per 24 hours on Florida freezers with fan-delay termination.")
        ],
        "faqs": [
            ("Why do walk-in freezers ice up so fast in Florida?", "Florida's high ambient dew point means every door opening pulls heavy moisture into the box. Without tight gaskets, strip curtains, and 4 daily defrost cycles, frost rapidly blocks evaporator airflow."),
            ("What coil coating is recommended for commercial refrigeration in Florida?", "Factory-applied E-coat (electrocoating) or phenolic/Heresite coatings protect aluminum condenser fins from coastal salt-spray corrosion."),
            ("Do outdoor walk-in coolers in South Florida need Miami-Dade NOA approval?", "Yes. Outdoor walk-in coolers/freezers installed in the High-Velocity Hurricane Zone (Miami-Dade and Broward) require structural wind-load engineering and anchored tie-downs per FBC HVHZ."),
            ("How much extra BTU capacity should I add for Florida humidity?", "For high-traffic commercial kitchens in humid coastal Florida, adding a 15% to 25% latent infiltration allowance prevents under-sizing during peak summer humidity.")
        ]
    },

    # =========================================================================
    # 7. WELL DRILLING (3 JURISDICTIONS)
    # =========================================================================
    {
        "tool": "well-drilling",
        "slug": "texas-tdlr",
        "jurisdiction": "Texas (TDLR 16 TAC Ch. 76 & Edwards / Trinity / Gulf Coast Aquifers)",
        "short_label": "Texas — TDLR Ch. 76 & GCDs",
        "code_badge": "TDLR 16 TAC Ch. 76 • Groundwater Conservation Districts",
        "title": "Texas Commercial Water Well & Pump Sizing Calculator (TDLR Ch. 76)",
        "description": "Estimate commercial water well drilling costs, Total Dynamic Head (TDH), submersible pump HP, and casing specs in Texas under TDLR 16 TAC Chapter 76 and local GCD rules.",
        "keywords": "texas commercial water well cost calculator, tdlr water well regulations chapter 76, texas well pump sizing calculator, trinity aquifer well depth cost, edwards aquifer well permit",
        "h1": "Texas Commercial Water Well &amp; Pump Calculator (TDLR 16 TAC Ch. 76)",
        "lead": "Calculate commercial drilling budgets, Total Dynamic Head (TDH), submersible pump horsepower, and casing diameters across Texas aquifers under TDLR 16 TAC Chapter 76 and local Groundwater Conservation District (GCD) spacing rules.",
        "meta_cards": [
            ("Governing Regulation", "TDLR 16 TAC Chapter 76"),
            ("Local Permitting", "Texas Groundwater Conservation Districts"),
            ("Typical Commercial Depth", "350 – 800+ ft (Trinity / Gulf Coast)"),
            ("Sanitary Seal Requirement", "Min. 10 ft Cement Annular Seal")
        ],
        "calc_defaults": {
            "depth": 500,
            "gpm": 50,
            "costft": 60
        },
        "intro_heading": "Texas Water Well Standards: TDLR Licensing, GCD Permits & Aquifer Depths",
        "intro_body": [
            "Every commercial, industrial, or agricultural water well drilled in Texas is regulated by the Texas Department of Licensing and Regulation (TDLR) under 16 TAC Chapter 76—requiring a licensed Texas Water Well Driller, mandatory State of Texas Well Reports filed within 60 days, and minimum annular cement sanitary seals.",
            "In addition, over 98 local Groundwater Conservation Districts (such as the Edwards Aquifer Authority, Barton Springs/Edwards Aquifer CD, and Harris-Galveston Subsidence District) enforce strict well spacing, metering, and annual acre-foot production permits for non-exempt commercial wells."
        ],
        "code_table": [
            ("16 TAC §76.100", "Annular Cement Seal & Setbacks", "Minimum 10-foot cement/bentonite sanitary seal; minimum 50 ft from property lines (100 ft from septic drain fields)."),
            ("TCEQ 30 TAC §290", "Public Water System (PWS) Wells", "Commercial sites serving 25+ people/day for 60+ days/year require TCEQ Public Water Supply engineering approval."),
            ("Local GCD Rules", "Production & Metering Permits", "Commercial wells (>25,000 GPD or non-exempt) require GCD drilling permits, flow meters, and spacing clearances."),
            ("TDLR Well Log", "60-Day Submission Mandate", "Driller must submit official lithologic log and pump test data to the Texas Water Development Board (TWDB).")
        ],
        "formula_title": "Total Dynamic Head (TDH) & Submersible Pump Horsepower Formula",
        "formula_expr": "TDH (ft) = Pumping Water Level + (Surface PSI × 2.31) + Friction Loss   |   Pump HP = (GPM × TDH) ÷ (3,960 × Pump Eff.)",
        "worked_example_title": "Worked Example: 500 ft, 50 GPM Commercial Well in Hill Country / Central Texas",
        "worked_example_steps": [
            "<strong>Step 1 — Pumping Level & TDH:</strong> 500 ft Trinity Aquifer well with 360 ft pumping level + 115 ft (50 PSI pressure tank) + 10 ft friction = <strong>485 ft TDH</strong>.",
            "<strong>Step 2 — Submersible Pump HP:</strong> (50 GPM × 485 ft) ÷ (3,960 × 0.62) = 9.88 → specify <strong>10 HP 3-phase submersible pump</strong> with VFD constant-pressure controller.",
            "<strong>Step 3 — Casing Specification:</strong> 6-inch Schedule 80 PVC or steel casing with TDLR-compliant cement annular seal.",
            "<strong>Step 4 — Turnkey Budget:</strong> 500 ft × $60/ft ($30,000) + 10 HP pump/VFD/drop pipe ($14,000) ≈ <strong>$44,000 turnkey</strong>."
        ],
        "checklist": [
            ("STEP 01", "Check Local Groundwater Conservation District", "Confirm whether the parcel lies inside a GCD or Subsidence District and apply for a commercial drilling permit first."),
            ("STEP 02", "Verify TCEQ Public Water Supply Trigger", "If serving >= 25 employees/customers daily, engage a TX PE for TCEQ Chapter 290 PWS well design before drilling."),
            ("STEP 03", "Confirm Setbacks From Septic & Property Lines", "Maintain 50 ft from property lines and 100 ft from aerobic spray fields or septic leach lines per 16 TAC §76.100."),
            ("STEP 04", "Run 4-to-24 Hour Yield & Drawdown Test", "Document static level, pumping level, and recovery rate before ordering final submersible pump horsepower.")
        ],
        "faqs": [
            ("How much does it cost to drill a commercial water well in Texas?", "Commercial 6-inch to 8-inch water wells in Texas typically cost $45 to $85+ per foot for drilling and casing, plus $10,000 to $35,000+ for high-GPM submersible pumps, VFDs, and storage tanks."),
            ("Do I need a permit to drill a commercial water well in Texas?", "If your property is inside a Groundwater Conservation District (GCD) or Subsidence District, yes—commercial wells are generally non-exempt and require a drilling and production permit before mobilizing a rig."),
            ("When does a Texas commercial well become a TCEQ Public Water System?", "Under TCEQ 30 TAC Chapter 290, a well serving at least 25 people per day for at least 60 days per year (such as an office park, RV park, or restaurant) is regulated as a Public Water System."),
            ("What casing diameter is needed for a 50 to 100 GPM commercial well?", "A 6-inch ID casing is standard for 40 to 100 GPM commercial submersible pumps; flows above 100–150 GPM generally require 8-inch or 10-inch steel/PVC casing.")
        ]
    },
    {
        "tool": "well-drilling",
        "slug": "california-sgma",
        "jurisdiction": "California (DWR Bulletin 74-90 & SGMA GSA Permits)",
        "short_label": "California — DWR & SGMA",
        "code_badge": "CA DWR Bulletin 74-90 • SGMA GSA • County EHD",
        "title": "California Commercial & Ag Water Well Sizing Calculator (DWR & SGMA)",
        "description": "Size commercial and agricultural water wells, pump HP, and budgets in California under DWR Bulletin 74-90, County Environmental Health permits, and SGMA GSA groundwater sustainability rules.",
        "keywords": "california commercial water well cost calculator, ca dwr bulletin 74-90, sgma groundwater well permit california, central valley ag well pump sizing, california well drilling cost per foot",
        "h1": "California Commercial &amp; Ag Water Well Calculator (DWR Bulletin 74-90 &amp; SGMA)",
        "lead": "Estimate commercial and agricultural water well drilling depth, Total Dynamic Head (TDH), pump horsepower, and budgets calibrated for California DWR Bulletin 74-90 sanitary seals and SGMA Groundwater Sustainability Agency (GSA) rules.",
        "meta_cards": [
            ("Governing Standard", "CA DWR Bulletin 74-81 / 74-90"),
            ("Groundwater Authority", "Local SGMA GSA & County EHD"),
            ("Sanitary Annular Seal", "Min. 50 ft Cement Seal (Commercial)"),
            ("Driller License", "CSLB C-57 Water Well Contractor")
        ],
        "calc_defaults": {
            "depth": 600,
            "gpm": 80,
            "costft": 95
        },
        "intro_heading": "California SGMA Permitting & DWR Bulletin 74-90 Sanitary Seal Rules",
        "intro_body": [
            "Drilling a commercial or agricultural water well in California requires navigating both County Environmental Health Department (EHD) construction standards (DWR Bulletin 74-90) and the Sustainable Groundwater Management Act (SGMA). In medium- and high-priority basins across the Central Valley, Salinas Valley, and Southern California, counties must obtain written consistency verification from the local Groundwater Sustainability Agency (GSA) before issuing a commercial well permit.",
            "California also mandates a much deeper annular sanitary cement seal—typically 50 feet minimum for commercial/agricultural wells (and 50–100+ feet for public supply)—plus a CSLB C-57 licensed drilling contractor."
        ],
        "code_table": [
            ("DWR Bulletin 74-90", "50-Foot Annular Sanitary Seal", "Commercial and public supply wells require a minimum 50 ft cement grout seal inspected by County EHD."),
            ("SGMA / Exec. Order", "GSA Consistency Verification", "New non-domestic wells in medium/high-priority basins require written GSA determination of no undesirable subsidence/depletion."),
            ("CSLB C-57 License", "Licensed Well Driller", "All drilling, deepening, and well destruction must be performed by an active California C-57 contractor."),
            ("SWRCB DDW", "Public Supply Standards", "Commercial facilities serving 25+ people/day trigger State Water Board Division of Drinking Water permitting.")
        ],
        "formula_title": "California Deep-Well TDH & Submersible Pump Sizing Formula",
        "formula_expr": "TDH (ft) = Pumping Depth + 115 ft (50 PSI) + Friction   |   HP = (GPM × TDH) ÷ (3,960 × 0.62)",
        "worked_example_title": "Worked Example: 600 ft, 80 GPM Commercial / Ag Well in Central California",
        "worked_example_steps": [
            "<strong>Step 1 — Pumping Level & TDH:</strong> 600 ft alluvial basin well with 432 ft pumping water level + 125 ft pressure/friction = <strong>557 ft TDH</strong>.",
            "<strong>Step 2 — Pump Horsepower:</strong> (80 GPM × 557 ft) ÷ 2,455 = 18.15 → specify <strong>20 HP 480V 3-phase submersible pump</strong> with VFD.",
            "<strong>Step 3 — Casing & 50 ft Seal:</strong> 6-inch or 8-inch stainless-screened casing with 50 ft neat-cement sanitary seal witnessed by County EHD.",
            "<strong>Step 4 — Turnkey Budget:</strong> 600 ft × $95/ft ($57,000) + 20 HP pump/VFD/column ($23,500) ≈ <strong>$80,500 turnkey</strong>."
        ],
        "checklist": [
            ("STEP 01", "Obtain Local SGMA GSA Written Verification", "Verify basin priority and obtain GSA groundwater sustainability consistency sign-off prior to County EHD submittal."),
            ("STEP 02", "Hire Active CSLB C-57 Contractor", "Verify C-57 license and workers' comp before filing the County Environmental Health well permit."),
            ("STEP 03", "Schedule Witnessed 50-Foot Annular Seal", "County EHD inspector must witness the cement grout pour for the minimum 50-foot sanitary seal."),
            ("STEP 04", "Install Totalizing Flow Meter", "Most California GSAs require calibrated flow meters and semi-annual groundwater extraction reporting.")
        ],
        "faqs": [
            ("How deep is the required sanitary seal for a commercial well in California?", "Under DWR Bulletin 74-90, agricultural and commercial wells typically require a minimum 50-foot annular cement seal (compared to 20 feet for standard domestic wells in some counties)."),
            ("How does SGMA affect new commercial water wells in California?", "Under the Sustainable Groundwater Management Act (SGMA), counties cannot issue permits for new non-domestic wells in medium- or high-priority basins without verifying consistency with the local GSA's Groundwater Sustainability Plan."),
            ("What license is required to drill a water well in California?", "Only a contractor holding an active California Contractors State License Board (CSLB) C-57 Water Well Drilling license can legally drill or rehabilitate a water well."),
            ("How much does a commercial water well cost in California?", "Expect $75 to $130+ per foot for commercial 6-inch to 10-inch rotary-drilled wells with stainless steel screen, gravel pack, and 50-foot cement seal, excluding pump and electrical service.")
        ]
    },
    {
        "tool": "well-drilling",
        "slug": "florida-wmd",
        "jurisdiction": "Florida (FDEP Ch. 62-532 & WMD Consumptive Use Permits)",
        "short_label": "Florida — FDEP & WMD CUP",
        "code_badge": "FDEP Ch. 62-532 • Floridan Aquifer • WMD CUP",
        "title": "Florida Commercial Water Well & Pump Calculator (FDEP 62-532 & WMD)",
        "description": "Size commercial water wells, Floridan Aquifer pump HP, and drilling budgets in Florida under FDEP Chapter 62-532 and Water Management District Consumptive Use Permits (CUP).",
        "keywords": "florida commercial water well cost calculator, floridan aquifer well drilling cost, fdep chapter 62-532 water well, florida wmd consumptive use permit, florida well pump sizing",
        "h1": "Florida Commercial Water Well &amp; Pump Calculator (FDEP Ch. 62-532 &amp; WMD)",
        "lead": "Estimate commercial water well drilling costs, Total Dynamic Head, and submersible pump sizing tapping the Floridan or Biscayne Aquifers under FDEP Chapter 62-532 and Water Management District Consumptive Use Permits.",
        "meta_cards": [
            ("Governing Regulation", "FDEP Ch. 62-532 F.A.C."),
            ("Permit Authority", "SFWMD / SWFWMD / SJRWMD (WUP/CUP)"),
            ("Primary Commercial Aquifer", "Upper Floridan Limestone (250–650 ft)"),
            ("Driller License", "FL Licensed Water Well Contractor")
        ],
        "calc_defaults": {
            "depth": 350,
            "gpm": 75,
            "costft": 52
        },
        "intro_heading": "Tapping the Floridan Aquifer Under FDEP Chapter 62-532 & WMD Rules",
        "intro_body": [
            "Commercial, irrigation, and industrial wells across Central and North Florida typically tap the high-yielding Upper Floridan limestone aquifer (often 200 to 650 feet deep), while South Florida commercial wells tap either the surficial Biscayne Aquifer or deeper brackish Floridan zones. All well construction is governed by FDEP Chapter 62-532 F.A.C. and delegated to Florida's five Water Management Districts.",
            "Commercial wells with casing diameters of 6 inches or larger—or average daily withdrawals exceeding district thresholds (often 100,000 GPD)—require a formal Water Use Permit (WUP) or Consumptive Use Permit (CUP) alongside the standard well construction permit."
        ],
        "code_table": [
            ("FDEP 62-532.400", "Well Construction Permits", "Required from the local Water Management District or delegated county health department prior to mobilizing."),
            ("FDEP 62-532.500", "Casing & Grouting Standards", "Casing must seat into the confining limestone formation with continuous neat cement grout to prevent saltwater intrusion."),
            ("WMD CUP / WUP", "Consumptive Use Permit", "Mandatory for large commercial/industrial/irrigation withdrawals (>= 6\" casing or high daily GPD allocations)."),
            ("FDOH Ch. 64E-8", "Limited Use Public Systems", "Commercial properties serving non-community drinking water require Florida Dept. of Health microbiological testing.")
        ],
        "formula_title": "Florida Limestone Aquifer TDH & Pump Sizing Formula",
        "formula_expr": "TDH (ft) = Pumping Level + (50 PSI × 2.31) + Friction   |   HP = (GPM × TDH) ÷ (3,960 × 0.62)",
        "worked_example_title": "Worked Example: 350 ft, 75 GPM Upper Floridan Commercial Well in Central FL",
        "worked_example_steps": [
            "<strong>Step 1 — Pumping Level & TDH:</strong> High-yield Floridan limestone well with 252 ft pumping head + 125 ft surface pressure/friction = <strong>377 ft TDH</strong>.",
            "<strong>Step 2 — Pump Horsepower:</strong> (75 GPM × 377 ft) ÷ 2,455 = 11.5 → specify <strong>15 HP submersible pump</strong> with stainless steel impellers for mineral resistance.",
            "<strong>Step 3 — Casing & Grout:</strong> 6-inch Schedule 80 PVC or steel casing grouted solidly into the Ocala/Avon Park limestone cap.",
            "<strong>Step 4 — Turnkey Budget:</strong> 350 ft × $52/ft ($18,200) + 15 HP pump/VFD/wellhead ($18,750) ≈ <strong>$36,950 turnkey</strong>."
        ],
        "checklist": [
            ("STEP 01", "Verify WMD CUP / WUP Threshold", "Check SFWMD, SWFWMD, or SJRWMD rules to see if your casing diameter (>= 6\") or daily GPM triggers a Consumptive Use Permit."),
            ("STEP 02", "Screen for Saltwater Intrusion Zones", "Coastal Florida parcels require chloride testing and strict well-depth caps to avoid brackish upconing."),
            ("STEP 03", "Confirm Septic & Stormwater Setbacks", "Maintain minimum 75–100 ft separation from septic systems and sanitary hazards per FDEP 62-532."),
            ("STEP 04", "File Well Completion Report", "Licensed Florida Water Well Contractor must submit completion log and cuttings data within 30 days.")
        ],
        "faqs": [
            ("When do I need a Consumptive Use Permit (CUP) for a commercial well in Florida?", "Most Florida Water Management Districts require a CUP/WUP when a commercial well uses a 6-inch or larger casing diameter, withdraws over 100,000 gallons per day, or sits inside a Water Use Caution Area."),
            ("How deep are commercial Floridan Aquifer wells in Central Florida?", "Most commercial Upper Floridan wells in Orlando, Tampa, and Jacksonville range from 250 to 600 feet deep, frequently yielding 60 to 300+ GPM."),
            ("Does Florida require a licensed driller for commercial wells?", "Yes. Under Florida Statutes Chapter 373, all water well construction must be performed by a Water Management District-licensed Water Well Contractor."),
            ("Why is stainless steel recommended for Florida commercial well pumps?", "Floridan Aquifer water often contains elevated dissolved sulfur (hydrogen sulfide), iron, and chlorides in coastal areas, which corrode cast-iron pump housings rapidly.")
        ]
    },

    # =========================================================================
    # 8. PALLET RACKING (3 JURISDICTIONS)
    # =========================================================================
    {
        "tool": "pallet-racking",
        "slug": "california-seismic-rmi",
        "jurisdiction": "California (CBC / RMI MH16.1 Seismic Category D/E & NFPA 13)",
        "short_label": "California — Seismic RMI & CBC",
        "code_badge": "CBC / RMI MH16.1 (SDC D/E) • CFC Ch. 32 High-Piled",
        "title": "California Seismic Pallet Racking & High-Piled Storage Calculator (CBC & RMI)",
        "description": "Calculate warehouse pallet positions, aisle widths, and seismic rack engineering requirements in California under CBC / RMI MH16.1 Seismic Design Category D/E and CFC Chapter 32.",
        "keywords": "california seismic pallet racking calculator, rmi mh16.1 seismic design category d, california high piled storage permit cfc chapter 32, inland empire warehouse rack layout calculator",
        "h1": "California Seismic Pallet Racking Calculator (CBC / RMI MH16.1 &amp; CFC Ch. 32)",
        "lead": "Plan warehouse pallet capacity, forklift aisle spacing, and seismic rack compliance across the Inland Empire, Los Angeles, and Bay Area under California Building Code (CBC), RMI MH16.1 Seismic Design Categories D/E, and CFC Chapter 32 High-Piled Storage.",
        "meta_cards": [
            ("Structural Rack Code", "CBC & ANSI / RMI MH16.1 (SDC D/E)"),
            ("Fire & High-Piled Code", "California Fire Code (CFC) Ch. 32"),
            ("Permit Trigger Height", "Racks > 5 ft 9 in (Seismic) / > 12 ft (Fire)"),
            ("Sprinkler Clearance", "Min. 36 in (ESFR) / 18 in (Std.)")
        ],
        "calc_defaults": {
            "sqft": 30000,
            "height": 32,
            "aisle": 10.5
        },
        "intro_heading": "Why California Warehouse Racking Requires PE Seismic Stamping Over 5'-9\"",
        "intro_body": [
            "California enforces the strictest industrial storage rack permitting in the United States. Under the California Building Code (CBC) and ANSI/RMI MH16.1, ANY pallet rack exceeding 5 feet 9 inches in height (effectively every commercial warehouse rack) requires a building permit with California PE-stamped seismic structural calculations, oversized seismic footplates, and heavy-duty wedge/epoxy concrete anchors.",
            "Furthermore, storing commodities higher than 12 feet triggers California Fire Code (CFC) Chapter 32 High-Piled Combustible Storage permitting—requiring longitudinal and transverse flue spaces (typically 6-inch longitudinal, 3-inch transverse), smoke/heat vents, and ESFR (Early Suppression Fast Response) sprinkler verification."
        ],
        "code_table": [
            ("CBC / RMI MH16.1", "Seismic Design Category D/E", "Heavy-gauge columns, oversized seismic baseplates, and PE-stamped slab thickness & anchor pull-out calculations required."),
            ("CBC §105.2", "5'-9\" Rack Permit Trigger", "Storage racks taller than 5 ft 9 in require a full municipal building permit and Deputy Special Inspector anchor verification."),
            ("CFC Chapter 32", "High-Piled Storage (> 12 ft)", "Requires High-Piled Storage Fire Permit, commodity classification (Class I–IV or Group A Plastics), and fire department access doors."),
            ("NFPA 13 / ESFR", "Flue Space & Deflector Clearance", "Maintain strict 6\" longitudinal flue spaces and 36\" clearance below ESFR sprinkler deflectors.")
        ],
        "formula_title": "Warehouse Pallet Density & Clear-Height Level Formula",
        "formula_expr": "Ground Positions = (Warehouse Sq Ft × 0.62 Usable) ÷ (4.25 ft × (4 ft Rack + Aisle ÷ 2))   |   Levels = Floor((Clear Ht − 3 ft) ÷ 5.5 ft)",
        "worked_example_title": "Worked Example: 30,000 Sq Ft Distribution Center in Inland Empire, CA",
        "worked_example_steps": [
            "<strong>Step 1 — Usable Racking Footprint:</strong> 30,000 sq ft × 62% usable storage (38% docks/staging/fire aisles) = <strong>18,600 sq ft</strong>.",
            "<strong>Step 2 — Ground Pallet Positions (10.5 ft Reach-Truck Aisles):</strong> 18,600 ÷ (4.25 × 9.25) = <strong>473 ground positions</strong>.",
            "<strong>Step 3 — Beam Levels (32 ft Clear Height):</strong> (32 ft − 3 ft ESFR clearance) ÷ 5.5 ft/level = <strong>5 levels high</strong>.",
            "<strong>Step 4 — Total Capacity & Permitting:</strong> 473 × 5 = <strong>2,365 pallet positions</strong> → requires CA PE seismic rack calc + CFC Ch. 32 High-Piled Fire Permit."
        ],
        "checklist": [
            ("STEP 01", "Verify Concrete Slab Thickness & PSI", "Seismic SDC D/E racks typically require a minimum 6-inch, 3,000–4,000 PSI concrete slab; core-test if slab drawings are missing."),
            ("STEP 02", "Obtain CA PE-Stamped RMI Seismic Calcs", "Submit rack elevations, baseplate details, and anchor torque specs for municipal Building & Safety review."),
            ("STEP 03", "File CFC Chapter 32 High-Piled Permit", "Classify stored goods (Class I–IV vs. Group A Plastics) and verify ESFR K-14/K-17/K-25 sprinkler adequacy."),
            ("STEP 04", "Schedule Deputy Inspector Anchor Sign-Off", "LADBS and Inland Empire cities require a certified Special Inspector to verify anchor embedment and torque.")
        ],
        "faqs": [
            ("What height requires a pallet rack permit in California?", "Under the California Building Code, any storage rack exceeding 5 feet 9 inches in height requires a building permit with California PE-stamped seismic calculations."),
            ("When does a California warehouse need a High-Piled Storage Permit?", "Under California Fire Code (CFC) Chapter 32, storing combustible materials higher than 12 feet (or 6 feet for high-hazard Group A plastics) triggers a High-Piled Combustible Storage permit."),
            ("What aisle width do I need for a stand-up reach truck vs. sit-down forklift?", "Standard counterbalance sit-down forklifts require 12 to 13-foot aisles; stand-up reach trucks require 9.5 to 10.5-foot aisles; turret/VNA trucks operate in 5.5 to 6.5-foot aisles."),
            ("Why are seismic pallet racks more expensive in California than Texas?", "Seismic Design Category D/E engineering requires thicker upright columns, larger welded seismic footplates, multiple heavy-duty concrete anchors per column, and Special Inspection sign-offs.")
        ]
    },
    {
        "tool": "pallet-racking",
        "slug": "texas-high-piled",
        "jurisdiction": "Texas (IFC Ch. 32 High-Piled Storage & RMI MH16.1)",
        "short_label": "Texas — IFC Ch. 32 & RMI",
        "code_badge": "IFC Chapter 32 • RMI MH16.1 (SDC A/B) • NFPA 13",
        "title": "Texas Warehouse Pallet Racking & High-Piled Storage Calculator (IFC Ch. 32)",
        "description": "Calculate warehouse pallet positions, forklift aisle widths, and IFC Chapter 32 High-Piled Storage permit requirements for Dallas-Fort Worth, Houston, and Austin logistics centers.",
        "keywords": "texas warehouse pallet racking layout calculator, ifc chapter 32 high piled storage texas, dallas warehouse rack permit, houston pallet rack layout calculator, esfr sprinkler rack clearance",
        "h1": "Texas Warehouse Pallet Racking &amp; High-Piled Calculator (IFC Ch. 32 &amp; RMI)",
        "lead": "Optimize warehouse pallet density, reach-truck aisle widths, and IFC Chapter 32 High-Piled Combustible Storage compliance across Dallas-Fort Worth, Houston, San Antonio, and Austin industrial parks.",
        "meta_cards": [
            ("Structural Rack Code", "IBC & ANSI / RMI MH16.1 (SDC A/B)"),
            ("Fire & High-Piled Code", "IFC 2021/2024 Chapter 32"),
            ("High-Piled Trigger", "Storage Height > 12 ft"),
            ("Permit Authority", "City Building & Fire Marshal")
        ],
        "calc_defaults": {
            "sqft": 40000,
            "height": 32,
            "aisle": 10.5
        },
        "intro_heading": "Texas Logistics Warehouse Racking: IFC Chapter 32 & Fire Marshal Approvals",
        "intro_body": [
            "While Texas sits in low-seismic Seismic Design Category A/B (making structural uprights and baseplates significantly more economical than in California), Dallas-Fort Worth and Houston Fire Marshals strictly enforce International Fire Code (IFC) Chapter 32 for High-Piled Combustible Storage whenever pallet tops exceed 12 feet.",
            "Before anchoring a single upright, Texas warehouse tenants must submit a High-Piled Storage submittal detailing commodity class (Class I–IV or Group A Plastics), transverse/longitudinal flue spaces, fire department exterior access doors (every 100–125 linear feet), and confirmation that existing ESFR sprinklers match the rack layout."
        ],
        "code_table": [
            ("IFC Chapter 32", "High-Piled Storage Permit", "Mandatory Fire Marshal permit for combustible storage > 12 ft (or > 6 ft for high-hazard commodities)."),
            ("ANSI / RMI MH16.1", "Structural Load Plaques", "Maximum unit load and bay load plaques must be permanently mounted on rack end-frames."),
            ("NFPA 13 / ESFR", "Flue Space Alignment", "6-inch longitudinal flue spaces between back-to-back rows and 3-inch transverse flues at uprights."),
            ("IFC §3206.7", "Fire Dept. Access Doors", "Exterior personnel access doors required at max 100–125 ft spacing along fire lane walls.")
        ],
        "formula_title": "Texas Distribution Warehouse Pallet Capacity Formula",
        "formula_expr": "Total Pallets = Floor((Sq Ft × 0.62) ÷ (4.25 × (4 + Aisle ÷ 2))) × Floor((Clear Ht − 3 ft) ÷ 5.5 ft)",
        "worked_example_title": "Worked Example: 40,000 Sq Ft Logistics Hub in Dallas-Fort Worth, TX",
        "worked_example_steps": [
            "<strong>Step 1 — Usable Storage Zone:</strong> 40,000 sq ft × 62% usable = <strong>24,800 sq ft</strong>.",
            "<strong>Step 2 — Ground Positions (10.5 ft Reach Aisles):</strong> 24,800 ÷ 39.31 = <strong>630 ground pallet positions</strong>.",
            "<strong>Step 3 — Vertical Beam Levels (32 ft Clear):</strong> (32 − 3 ft ESFR clearance) ÷ 5.5 ft = <strong>5 levels</strong>.",
            "<strong>Step 4 — Total Warehouse Capacity:</strong> 630 × 5 = <strong>3,150 pallet positions</strong> → requires City of Dallas / Fort Worth IFC Ch. 32 High-Piled Fire Permit."
        ],
        "checklist": [
            ("STEP 01", "Obtain Existing Fire Sprinkler Hydraulic Data", "Pull the landlord's sprinkler riser tag and hydraulic calc sheet to verify ESFR K-factor and commodity rating."),
            ("STEP 02", "Submit IFC Chapter 32 High-Piled Package", "Include commodity class letter, rack elevation drawings, and flue-space keeper bars for Fire Marshal review."),
            ("STEP 03", "Install Column Guards & Load Plaques", "Protect end-of-aisle uprights from forklift strikes and post RMI MH16.1 rated capacity plaques."),
            ("STEP 04", "Pass Final Fire Marshal Inspection", "Ensure aisles are striped, exit paths unobstructed, and 36-inch ESFR sprinkler clearance maintained.")
        ],
        "faqs": [
            ("Do I need a permit to install pallet racking in Dallas or Houston?", "Yes. Both cities require a building/rack permit for storage racks over 8 feet tall AND an IFC Chapter 32 High-Piled Combustible Storage permit from the Fire Marshal when storage exceeds 12 feet."),
            ("Do solid wood decking shelves violate NFPA 13 in Texas warehouses?", "Yes. Solid shelving blocks ESFR sprinkler water penetration and typically triggers expensive in-rack sprinklers. Use open wire mesh decking (at least 70% open) instead."),
            ("How much clearance is required between top pallets and ESFR sprinklers?", "NFPA 13 requires a minimum of 36 inches of clear vertical space between the top of the highest stored pallet and the deflector of ESFR sprinkler heads."),
            ("How many pallet positions fit in a 40,000 sq ft warehouse with 32-foot ceilings?", "With standard selective racking and 10.5-foot reach-truck aisles, a 40,000 sq ft warehouse typically holds 3,000 to 3,400 standard 48\"×40\" GMA pallets.")
        ]
    },
    {
        "tool": "pallet-racking",
        "slug": "new-jersey-northeast",
        "jurisdiction": "New Jersey / NY Metro (NJ UCC / IBC High-Piled & ESFR)",
        "short_label": "NJ / NY Metro — NJ UCC & IFC",
        "code_badge": "NJ UCC (IBC) • IFC Ch. 32 • Port Logistics Corridor",
        "title": "New Jersey & NY Metro Warehouse Pallet Racking Calculator (NJ UCC & IFC Ch. 32)",
        "description": "Size warehouse pallet racking layouts, VNA/reach aisle density, and NJ Uniform Construction Code (NJ UCC) High-Piled Storage permits along the NJ Turnpike & Port Newark corridor.",
        "keywords": "new jersey warehouse pallet racking calculator, nj ucc pallet rack permit, port newark warehouse rack layout, high piled storage permit new jersey, vna pallet racking calculator",
        "h1": "New Jersey &amp; NY Metro Pallet Racking Calculator (NJ UCC &amp; High-Piled Storage)",
        "lead": "Maximize pallet density in high-rent Northern/Central New Jersey and NY Metro warehouses. Calculate selective and narrow-aisle pallet counts aligned with the NJ Uniform Construction Code (NJ UCC) and Fire Official High-Piled rules.",
        "meta_cards": [
            ("Governing Code", "NJ Uniform Construction Code (IBC)"),
            ("Fire Permit Standard", "NJ Uniform Fire Code / IFC Ch. 32"),
            ("High-Rent Optimization", "Reach (10 ft) & VNA (6 ft) Aisles"),
            ("Sprinkler Standard", "NFPA 13 ESFR / In-Rack Rules")
        ],
        "calc_defaults": {
            "sqft": 25000,
            "height": 36,
            "aisle": 9.5
        },
        "intro_heading": "Maximizing Cube Utilization in High-Rent NJ Turnpike & Port Newark Warehouses",
        "intro_body": [
            "With industrial warehouse rents along the New Jersey Turnpike (Exits 7A–14) and Port Newark among the highest in North America, shifting from 12-foot counterbalance aisles to 9.5-foot reach-truck or 6-foot Very Narrow Aisle (VNA) layouts can increase pallet capacity by 25% to 45% inside the exact same building footprint.",
            "All commercial rack installations in New Jersey must comply with the New Jersey Uniform Construction Code (NJ UCC — Building & Fire Protection Subcodes), requiring NJ PE-signed rack drawings, slab load verification, and municipal Fire Official High-Piled Combustible Storage clearance."
        ],
        "code_table": [
            ("NJ UCC (IBC)", "Building & Fire Subcode Permits", "Municipal Construction Office building + fire subcode permits required for racks > 8 ft / high-piled storage > 12 ft."),
            ("RMI MH16.1", "NJ PE Structural Seal", "Signed and sealed rack calculations verifying upright capacity, baseplates, and floor slab bearing."),
            ("NFPA 13 / ESFR", "36'-40' Clear Height Rules", "Modern 36–40 ft NJ spec warehouses rely on K-22/K-25 ESFR heads; verify exact ceiling-to-pallet clearances."),
            ("NJ Uniform Fire Code", "Flue Space & Rack Signage", "6\" longitudinal flues, wire decking, and posted maximum load limit signs inspected prior to Certificate of Approval.")
        ],
        "formula_title": "High-Cube NJ Warehouse Pallet Density Formula",
        "formula_expr": "Total Pallets = Floor((Sq Ft × 0.62) ÷ (4.25 × (4 + Aisle ÷ 2))) × Floor((Clear Ht − 3 ft) ÷ 5.5 ft)",
        "worked_example_title": "Worked Example: 25,000 Sq Ft 36-Foot Clear Warehouse in Edison, NJ",
        "worked_example_steps": [
            "<strong>Step 1 — Usable Racking Zone:</strong> 25,000 sq ft × 62% = <strong>15,500 sq ft</strong>.",
            "<strong>Step 2 — Ground Positions (9.5 ft Reach Aisles):</strong> 15,500 ÷ (4.25 × 8.75) = <strong>416 ground positions</strong>.",
            "<strong>Step 3 — Beam Levels (36 ft Clear Height):</strong> (36 − 3 ft ESFR clearance) ÷ 5.5 ft = <strong>6 levels high</strong>.",
            "<strong>Step 4 — Total Capacity:</strong> 416 × 6 = <strong>2,496 pallet positions</strong> (vs. ~1,950 with 12.5 ft aisles — a +28% gain)."
        ],
        "checklist": [
            ("STEP 01", "Confirm Municipal NJ UCC Subcode Forms", "Submit NJ Construction Permit Jacket with Building and Fire Protection Technical Sections + NJ PE sealed rack drawings."),
            ("STEP 02", "Verify Slab Flatness for VNA / High-Bay", "Racks reaching 30–36 ft high require high slab flatness (FF/FL) tolerances to prevent turret-truck sway."),
            ("STEP 03", "Check ESFR Obstructions (Lights & Heaters)", "Confirm LED high-bay fixtures and gas unit heaters do not obstruct ESFR sprinkler discharge patterns."),
            ("STEP 04", "Schedule Fire Official High-Piled Walk-Through", "Confirm flue spaces, fire extinguishers, and exit signage before loading inventory.")
        ],
        "faqs": [
            ("Does New Jersey require a PE seal for warehouse pallet racking?", "Yes. Under the NJ Uniform Construction Code (NJ UCC), commercial pallet racking installations generally require structural drawings and calculations signed and sealed by a New Jersey Licensed Professional Engineer."),
            ("How much more storage does a 9.5-foot reach aisle give over a 12-foot aisle?", "Narrowing aisles from 12 feet to 9.5 feet typically increases total warehouse pallet capacity by 18% to 25% without adding a single square foot of leased space."),
            ("Are wire decks required on pallet racks in New Jersey?", "In sprinklered high-piled warehouses, NFPA 13 requires at least 70% open wire mesh decking (or open bar grating) rather than solid plywood so overhead sprinklers can reach lower rack levels."),
            ("How long does a pallet rack permit take in New Jersey?", "Under NJ UCC statutory timelines, municipal construction offices have 20 business days to review complete permit applications once all Fire Subcode and PE documents are submitted.")
        ]
    },

    # =========================================================================
    # 9. SPRAY FOAM (3 JURISDICTIONS)
    # =========================================================================
    {
        "tool": "spray-foam",
        "slug": "california-title24",
        "jurisdiction": "California (Title 24 Part 6 & CBC §2603.4 Thermal Barrier)",
        "short_label": "California — Title 24 & CBC",
        "code_badge": "Title 24 Part 6 • CBC §2603.4 Thermal/Ignition Barrier",
        "title": "California Commercial Spray Foam Board Foot & R-Value Calculator (Title 24)",
        "description": "Calculate commercial closed-cell and open-cell spray foam board feet, R-value thickness, chemical drum sets, and CBC §2603.4 intumescent thermal barrier compliance in California.",
        "keywords": "california commercial spray foam calculator, title 24 spray foam r value requirements, cbc 2603.4 thermal barrier spray foam, closed cell spray foam board foot calculator california",
        "h1": "California Commercial Spray Foam Calculator (Title 24 &amp; CBC §2603.4)",
        "lead": "Calculate commercial spray polyurethane foam (SPF) board feet, chemical drum sets, and R-value thickness compliant with California Title 24 Part 6 continuous insulation rules and CBC §2603.4 thermal/ignition barrier codes.",
        "meta_cards": [
            ("Energy Standard", "Title 24 Part 6 (Climate Zones 1–16)"),
            ("Fire / Thermal Barrier", "CBC §2603.4 (15-Min / DC315 Intumescent)"),
            ("Closed-Cell R-Value", "~R-6.5 per inch (2.0 lb/cu ft)"),
            ("HERS / Verification", "QII (Quality Insulation Installation)")
        ],
        "calc_defaults": {
            "sqft": 6500,
            "thick": 3.5,
            "type": "closed"
        },
        "intro_heading": "California Title 24 Roof/Wall R-Values & CBC §2603.4 Thermal Barriers",
        "intro_body": [
            "Commercial metal buildings, warehouses, and tenant retrofits in California rely heavily on 2.0 lb closed-cell spray polyurethane foam (ccSPF) to hit Title 24 Part 6 continuous insulation (ci) targets while simultaneously sealing air leakage in a single pass.",
            "Under California Building Code (CBC) Section 2603.4, exposed foam plastic inside occupied commercial interiors MUST be separated from the interior by a 15-minute thermal barrier (typically 1/2-inch gypsum drywall) OR a tested, ICC-ES approved intumescent fire-retardant coating (such as DC315 or No-Burn Plus ThB) applied at the exact wet-mil thickness specified in its ESR report."
        ],
        "code_table": [
            ("Title 24 Part 6", "Commercial Roof / Wall R-Value", "Commercial metal roofs typically require R-19 to R-30 continuous insulation depending on California Climate Zone (CZ 1–16)."),
            ("CBC §2603.4", "15-Minute Thermal Barrier", "Occupied spaces require 1/2\" drywall or ICC-ES NFPA 286 approved intumescent coating over exposed spray foam."),
            ("CBC §2603.4.1.6", "Attic / Crawlspace Ignition Barrier", "Unoccupied mechanical attics/crawlspaces require a compliant ignition barrier coating if entered only for service."),
            ("Title 24 QII", "Insulation Depth Verification", "Third-party verification of uniform foam thickness and zero thermal bridging on metal purlins/girts.")
        ],
        "formula_title": "Commercial Spray Foam Board Foot & Drum Set Formula",
        "formula_expr": "Board Feet = Area (sq ft) × Thickness (in) × 1.10 (Waste/Texture)   |   2.0 lb Closed-Cell Sets = Board Feet ÷ 4,000",
        "worked_example_title": "Worked Example: 6,500 Sq Ft Commercial Metal Roof Deck in Fresno, CA",
        "worked_example_steps": [
            "<strong>Step 1 — Target R-Value:</strong> 3.5 inches of 2.0 lb closed-cell SPF × R-6.5/in = <strong>R-22.8 continuous insulation</strong> + air/vapor barrier.",
            "<strong>Step 2 — Board Feet (w/ 10% Waste):</strong> 6,500 sq ft × 3.5 in × 1.10 = <strong>25,025 Board Feet</strong>.",
            "<strong>Step 3 — Chemical Drum Sets:</strong> 25,025 BF ÷ 4,000 BF/set = <strong>6.3 Sets</strong> (A-side + B-side 55-gal drums).",
            "<strong>Step 4 — CBC §2603.4 Fire Coating:</strong> Exposed commercial ceiling requires ~18–20 wet mils of ICC-ES approved intumescent paint (e.g., DC315) over the foam."
        ],
        "checklist": [
            ("STEP 01", "Confirm California Climate Zone (CZ 1–16)", "Verify exact Title 24 Part 6 roof and wall U-factor / R-value target on the NRCC-ENV compliance form."),
            ("STEP 02", "Match Foam Brand With Intumescent ESR Report", "Inspectors verify that the specific spray foam manufacturer is listed on the intumescent coating's ICC-ES ESR report."),
            ("STEP 03", "Keep Substrate Clean & Dry (> 50°F)", "De-grease new galvanized metal roof panels and confirm substrate temperature before spraying 2.0 lb closed-cell foam."),
            ("STEP 04", "Log Wet-Mil Thickness Readings", "Document intumescent coating wet-mil gauge checks for final California Building Inspector sign-off.")
        ],
        "faqs": [
            ("Can commercial spray foam be left exposed in a California warehouse?", "Only if covered with an ICC-ES tested NFPA 286 intumescent thermal barrier coating (such as DC315) specifically approved for that exact spray foam product, or separated by 1/2-inch drywall per CBC §2603.4."),
            ("How many board feet are in one set of 2.0 lb closed-cell spray foam?", "A standard 1,000 lb two-drum set (A + B) of 2.0 lb closed-cell foam theoretically yields ~4,000 to 4,500 board feet; commercial estimators use 4,000 BF per set to account for corrugated metal ribs and overspray."),
            ("What thickness of closed-cell spray foam gives R-20?", "At approximately R-6.5 per inch, 3.0 to 3.25 inches of 2.0 lb closed-cell spray foam delivers R-19.5 to R-21 continuous insulation."),
            ("Does spray foam help pass California Title 24 blower door / air sealing requirements?", "Yes. Closed-cell spray foam forms a monolithic air barrier at 1.5+ inches, dramatically reducing envelope air leakage compared to fiberglass batts.")
        ]
    },
    {
        "tool": "spray-foam",
        "slug": "texas-iecc-climate-2",
        "jurisdiction": "Texas (IECC 2021 Climate Zones 2A/3A & Metal Building Condensation)",
        "short_label": "Texas — IECC Climate Zone 2/3",
        "code_badge": "IECC 2021 CZ 2A / 3A • Metal Building Condensation Control",
        "title": "Texas Commercial Metal Building Spray Foam Calculator (IECC 2021)",
        "description": "Calculate closed-cell spray foam board feet, R-values, and drum sets for Texas steel warehouses, barndominiums, and commercial shops under IECC 2021 Climate Zones 2 & 3.",
        "keywords": "texas commercial spray foam calculator, metal building spray foam thickness texas, iecc 2021 climate zone 2 spray foam, closed cell spray foam board foot calculator texas, houston warehouse spray foam",
        "h1": "Texas Commercial Metal Building Spray Foam Calculator (IECC 2021 CZ 2/3)",
        "lead": "Size closed-cell spray foam thickness, board feet, and material budgets for Texas steel buildings, warehouses, and shops—engineered to stop Gulf Coast condensation and meet IECC 2021 Climate Zone 2A/3A energy codes.",
        "meta_cards": [
            ("Governing Energy Code", "IECC 2021 (Climate Zones 2A & 3A)"),
            ("Condensation Prevention", "Min. 2\" Closed-Cell (Class II Vapor)"),
            ("Thermal Barrier Code", "IBC §2603.4 (Intumescent / Drywall)"),
            ("Typical TX Metal Shop", "2\" Walls (R-13) / 3\" Roof (R-19.5)")
        ],
        "calc_defaults": {
            "sqft": 8000,
            "thick": 2.5,
            "type": "closed"
        },
        "intro_heading": "Stopping Steel-Building Condensation in Humid Texas Summers",
        "intro_body": [
            "Across Houston (Climate Zone 2A), Dallas-Fort Worth (3A), Austin, and San Antonio, uninsulated or fiberglass-insulated commercial metal buildings suffer severe interior sweating when humid Gulf air meets cool steel panels—leading to dripping roofs, rusted purlins, and ruined inventory.",
            "Applying a minimum of 2.0 inches of 2.0 lb closed-cell spray foam directly to the interior steel skin creates a Class II vapor retarder (<1.0 perm) that permanently eliminates dew-point condensation on the metal while slashing summer HVAC cooling tonnage by 30%–45%."
        ],
        "code_table": [
            ("IECC 2021 CZ 2A/3A", "Commercial Metal Building Roof/Wall", "Metal building walls typically target R-13+ continuous (2\" ccSPF); roofs target R-19 to R-25 continuous (3\"–4\" ccSPF)."),
            ("Class II Vapor Retarder", "2.0\" Closed-Cell Minimum", "At 2 inches, 2.0 lb closed-cell foam achieves < 1.0 perm, blocking humid Gulf Coast moisture from reaching cool steel."),
            ("IBC §2603.4", "Thermal Barrier in Occupied Shops", "Commercial shops/warehouses require 1/2\" drywall or NFPA 286 intumescent coating over exposed foam."),
            ("Open-Cell Caution", "Avoid Open-Cell on Direct Steel", "0.5 lb open-cell foam is vapor-permeable and can trap moisture against bare metal panels in humid Texas Climate Zone 2A.")
        ],
        "formula_title": "Texas Metal Building Board Foot & Corrugation Factor Formula",
        "formula_expr": "Board Feet = Flat Area × Thickness (in) × 1.10–1.15 (R-Panel Rib Factor)   |   Closed-Cell Sets = BF ÷ 4,000",
        "worked_example_title": "Worked Example: 8,000 Sq Ft Commercial Steel Warehouse in Houston, TX",
        "worked_example_steps": [
            "<strong>Step 1 — Thickness & R-Value:</strong> 2.5 inches average closed-cell SPF (2\" walls, 3\" roof deck) = <strong>R-16.3 avg continuous insulation</strong>.",
            "<strong>Step 2 — Board Feet (w/ Rib/Waste Allowance):</strong> 8,000 sq ft × 2.5 in × 1.10 = <strong>22,000 Board Feet</strong>.",
            "<strong>Step 3 — Material Requirement:</strong> 22,000 BF ÷ 4,000 BF/set = <strong>5.5 Chemical Drum Sets</strong>.",
            "<strong>Step 4 — Installed Budget:</strong> 22,000 BF × $1.45/BF ≈ <strong>$31,900 installed</strong> (add ~$0.75–$1.10/sq ft if intumescent fire paint is required)."
        ],
        "checklist": [
            ("STEP 01", "Use Closed-Cell (Not Open-Cell) on Metal", "In humid Texas Climate Zones 2A/3A, always specify 2.0 lb closed-cell foam directly on steel panels to prevent hidden rust."),
            ("STEP 02", "Account for R-Panel Corrugations & Purlins", "Add 10% to 15% surface area multiplier for ribbed steel panels and wrapping exposed C-purlins."),
            ("STEP 03", "Verify City Fire Marshal Intumescent Rule", "Occupied commercial bays inside city limits require IBC §2603.4 thermal barrier coating (e.g., DC315)."),
            ("STEP 04", "Mask Skylights, Roll-Up Tracks & Conduit", "Protect translucent panels, overhead door tracks, and electrical boxes prior to high-pressure spraying.")
        ],
        "faqs": [
            ("Should I use open-cell or closed-cell spray foam on a Texas metal building?", "Always use 2.0 lb closed-cell spray foam on metal buildings in Texas. Open-cell foam allows humid Gulf air to pass through and condense against cool steel panels, risking roof rust and mold."),
            ("How thick should closed-cell spray foam be in a Houston or Dallas warehouse?", "Standard commercial practice is 2 inches (R-13) on steel walls and 3 inches (R-19.5) on the roof deck to control radiant heat and condensation."),
            ("Does closed-cell spray foam add structural rigidity to metal buildings?", "Yes. 2.0 lb closed-cell foam adheres tightly to steel panels and purlins, increasing racking strength and noticeably reducing rain and wind noise."),
            ("Do commercial shops in Texas need fire-retardant paint over spray foam?", "Inside incorporated Texas municipalities enforcing the IBC, exposed spray foam in occupied commercial buildings requires a 15-minute thermal barrier (drywall or ICC-ES approved intumescent coating).")
        ]
    },
    {
        "tool": "spray-foam",
        "slug": "florida-hvhz-vapor",
        "jurisdiction": "Florida (FBC Energy, Class II Vapor Barrier & HVHZ Uplift)",
        "short_label": "Florida — FBC & HVHZ Uplift",
        "code_badge": "FBC Energy CZ 1A/2A • Class II Vapor • HVHZ Uplift",
        "title": "Florida Commercial Closed-Cell Spray Foam Calculator (FBC & HVHZ)",
        "description": "Calculate commercial closed-cell spray foam board feet, R-value, and costs in Florida under FBC Energy Conservation (Climate Zones 1A/2A), vapor barrier rules, and hurricane roof uplift.",
        "keywords": "florida commercial spray foam calculator, closed cell spray foam florida building code, hvhz roof uplift spray foam florida, miami spray foam board foot calculator, climate zone 1a spray foam",
        "h1": "Florida Commercial Spray Foam Calculator (FBC Energy &amp; HVHZ Uplift)",
        "lead": "Size 2.0 lb closed-cell spray polyurethane foam for Florida commercial roofs, warehouses, and coastal structures—delivering FBC Climate Zone 1A/2A thermal performance, moisture vapor blocking, and hurricane roof-deck uplift resistance.",
        "meta_cards": [
            ("Governing Energy Code", "FBC Energy Conservation (CZ 1A / 2A)"),
            ("Moisture Control", "Closed-Cell (< 1.0 Perm @ 2 in)"),
            ("Wind Uplift Benefit", "Up to 2×–3× Roof Deck Uplift Resistance"),
            ("Fire Protection", "FBC §2603.4 Thermal / Ignition Barrier")
        ],
        "calc_defaults": {
            "sqft": 5500,
            "thick": 3.0,
            "type": "closed"
        },
        "intro_heading": "Why Closed-Cell Spray Foam Is the Gold Standard for Florida Commercial Envelopes",
        "intro_body": [
            "Florida's hot-humid Climate Zones 1A (Miami-Dade/Broward/Keys) and 2A (Tampa/Orlando/Jacksonville) drive continuous inward moisture vapor pressure 10 months of the year. Closed-cell 2.0 lb spray foam seals air leakage and acts as a Class II vapor retarder at 2+ inches—stopping humid outdoor air from infiltrating cooled commercial ceilings and causing mold.",
            "Beyond energy savings, structural adhesive testing shows 2 to 3 inches of 2.0 lb closed-cell foam bonded to the underside of commercial roof decks significantly boosts wind-uplift resistance during tropical storms and hurricanes, and qualifies for wind-mitigation insurance credits in many Florida jurisdictions."
        ],
        "code_table": [
            ("FBC Energy CZ 1A/2A", "Commercial Roof / Wall Insulation", "Continuous roof insulation R-20 to R-25 (3\"–4\" ccSPF); wall insulation R-13+ (2\" ccSPF)."),
            ("FBC §2603.4", "Thermal & Ignition Barriers", "1/2\" gypsum board or approved NFPA 286 intumescent coating mandatory in occupied commercial interiors."),
            ("Unvented Roof Decks", "FBC §R806.5 / IBC §1202.3", "Direct-to-deck closed-cell spray foam allows unvented conditioned attics/plenums, keeping ductwork inside conditioned space."),
            ("FEMA Flood Zones", "FEMA Class 5 Flood-Resistant", "Closed-cell SPF is classified by FEMA Technical Bulletin 2 as a Class 5 flood-damage-resistant insulation material.")
        ],
        "formula_title": "Florida Commercial Closed-Cell Board Foot & R-Value Formula",
        "formula_expr": "Board Feet = Area (sq ft) × Thickness (in) × 1.10 (Waste)   |   Total R-Value = Thickness × 6.5 (Closed-Cell)",
        "worked_example_title": "Worked Example: 5,500 Sq Ft Commercial Roof Deck in Tampa, FL",
        "worked_example_steps": [
            "<strong>Step 1 — Thickness & R-Value:</strong> 3.0 inches of 2.0 lb closed-cell SPF × R-6.5/in = <strong>R-19.5 continuous roof insulation</strong>.",
            "<strong>Step 2 — Total Board Feet:</strong> 5,500 sq ft × 3.0 in × 1.10 = <strong>18,150 Board Feet</strong>.",
            "<strong>Step 3 — Chemical Drum Sets:</strong> 18,150 BF ÷ 4,000 BF/set = <strong>4.5 Sets</strong>.",
            "<strong>Step 4 — Moisture & Fire Compliance:</strong> Exceeds Class II vapor barrier threshold (< 1 perm) and receives FBC §2603.4 intumescent thermal barrier where exposed."
        ],
        "checklist": [
            ("STEP 01", "Specify 2.0 lb Closed-Cell for Vapor & Flood Rating", "Closed-cell foam resists bulk water absorption and is FEMA Class 5 flood-damage-resistant for coastal Florida buildings."),
            ("STEP 02", "Verify Unvented Roof Assembly Details", "Seal all ridge and soffit vents when creating an unvented conditioned commercial roof deck per FBC."),
            ("STEP 03", "Apply FBC §2603.4 Intumescent Coating", "If the roof deck remains exposed to occupied commercial space, apply tested intumescent fire barrier to spec mil thickness."),
            ("STEP 04", "Resize HVAC Load (Manual N / ASHRAE)", "Airtight spray-foamed Florida commercial envelopes often allow downsizing HVAC tonnage while requiring dedicated dehumidification.")
        ],
        "faqs": [
            ("Is closed-cell spray foam flood-resistant for coastal Florida buildings?", "Yes. FEMA Technical Bulletin 2 classifies 2.0 lb closed-cell spray polyurethane foam as a Class 5 flood-damage-resistant material because it does not absorb water or sag when submerged."),
            ("Why shouldn't I use open-cell spray foam in Miami or Tampa commercial roofs?", "Open-cell foam is vapor-permeable and can absorb moisture during high-humidity seasons or roof leaks. Closed-cell foam blocks vapor drive and adds hurricane wind-uplift strength."),
            ("Does spray foam under a Florida commercial roof require a fire barrier?", "Yes. Under Florida Building Code §2603.4, foam plastic insulation in occupied commercial spaces must be covered by 1/2-inch drywall or an ICC-ES approved intumescent coating."),
            ("How much does commercial closed-cell spray foam cost in Florida?", "Commercial 2.0 lb closed-cell spray foam typically installs for $1.35 to $1.85 per board foot (approx. $4.00–$5.50 per sq ft at 3 inches thick), excluding intumescent fire coating.")
        ]
    }
]
