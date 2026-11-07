# TradeSpec Pro™ — Commercial Contractor & Heavy Sizing Suite

> **Industrial-Grade Sizing, Code-Compliance & Subcontractor Lead Generation Utilities**  
> *Built with zero runtime dependencies (Pure HTML5, CSS3, Vanilla ES6 JavaScript). 100/100 Core Web Vitals.*

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live%20Suite-0284c7?style=flat&logo=github)](https://prabhnoor12.github.io/tradespec-pro/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Standards: NEC / IBC / ASME / ASHRAE / UPC](https://img.shields.io/badge/Standards-Compliant-f59e0b.svg)]()

---

## 🏗️ Suite Overview

**TradeSpec Pro™** unites 9 specialized, high-intent engineering calculation utilities under a single umbrella banner, single domain, and single repository.

Every tool is hosted seamlessly under:
`https://prabhnoor12.github.io/tradespec-pro/`

| Tool | Subpath | Governing Standard | Target Audience | Lead Value |
| :--- | :--- | :--- | :--- | :--- |
| **ChargeSpec Pro™** | [`/charge-spec/`](./charge-spec/) | NFPA 70 / NEC 625 &amp; 220 | EV Fleet Managers, Warehouse Operators | \$125 – \$350 / lead |
| **PermitSpec Pro™** | [`/permit-spec/`](./permit-spec/) | IBC Table 1004.5 &bull; IPC 403 | Commercial Tenants, Retail Franchisees | \$120 – \$300 / lead |
| **SiteSpec Pro™** | [`/site-spec/`](./site-spec/) | Rational Q=CiA &bull; NCMA SRW | Civil Developers, Excavation Contractors | \$100 – \$250 / lead |
| **ColdSpec Pro™** | [`/cold-spec/`](./cold-spec/) | ASHRAE Ch. 23 &bull; EISA 2007 | Restaurant Owners, Breweries, Cold Storage | \$110 – \$275 / lead |
| **RigCheck Pro™** | [`/crane-lift/`](./crane-lift/) | ASME B30.5 &bull; OSHA 1926.1400 | General Contractors, HVAC Riggers | \$75 – \$150 / lead |
| **WellSpec Pro™** | [`/well-drilling/`](./well-drilling/) | NGWA Standards &bull; EPA Specs | Commercial Irrigators, Estate Developers | \$100 – \$225 / lead |
| **RackSpec Pro™** | [`/pallet-racking/`](./pallet-racking/) | RMI ANSI MH16.1 &bull; OSHA 1910.176 | Logistics Directors, 3PL Warehouses | \$150 – \$350 / lead |
| **FoamSpec Pro™** | [`/spray-foam/`](./spray-foam/) | ASHRAE 90.1 &bull; IBC Chapter 26 | Insulation Subcontractors, Envelope Estimators | \$85 – \$180 / lead |
| **FOGSpec Pro™** | [`/grease-trap/`](./grease-trap/) | UPC Appendix H &bull; NFPA 96 | Restaurant Owners, MEP Kitchen Engineers | \$90 – \$200 / lead |

---

## 📁 Repository Directory Structure

```text
tradespec-pro/
├── index.html            # Unified Suite Directory & Search Portal (9 Tools)
├── style.css             # Suite Stylesheet (CSS Subgrid, Container Queries)
├── app.js                # Suite Instant Search & Category Filters
├── robots.txt            # Global Search Engine Crawling Directives
├── sitemap.xml           # Multi-Tool XML Sitemap (All 10 routes)
├── README.md             # Architecture & Operations Documentation
├── partner/              # Private Subcontractor Portal & PIN Lead Console
│   ├── index.html
│   ├── style.css
│   ├── app.js
│   └── settings.json
│
├── charge-spec/          # Module 1: Commercial EV Fleet & Infrastructure (NEC 625)
├── permit-spec/          # Module 2: Commercial Tenant Improvement (IBC/IPC)
├── site-spec/            # Module 3: Civil Earthwork & Stormwater (Rational Q=CiA)
├── cold-spec/            # Module 4: Walk-in Cooler & Freezer Heat Load (ASHRAE 23)
├── crane-lift/           # Module 5: Mobile Crane & Rigging Sizing (ASME B30.5)
├── well-drilling/        # Module 6: Water Well & Pump Head Sizing (NGWA)
├── pallet-racking/       # Module 7: Warehouse Pallet Racking (RMI ANSI MH16.1)
├── spray-foam/           # Module 8: Spray Foam Board-Feet & R-Value (ASHRAE 90.1)
└── grease-trap/          # Module 9: Grease Interceptor & Hood CFM (UPC App. H)
```

---

## 💼 Business & Monetization Architecture

1. **High Commercial Intent**: Estimators and general contractors arrive looking for exact sizing numbers for \$5,000 to \$250,000+ jobs.
2. **Transparent Calculation**: Instant code-compliant sizing builds deep trust without paywalls.
3. **Frictionless Lead Routing**: When users request local equipment bids, TradeSpec Pro packages the verified calculation specs into an RFP and routes it into the private subcontractor dispatch console (`/partner/#portal`).
4. **Unit Economics**:
   - 15 EV charger depot leads @ \$150 = **\$2,250/mo**
   - 10 tenant improvement leads @ \$140 = **\$1,400/mo**
   - 12 civil site grading leads @ \$125 = **\$1,500/mo**
   - 15 cold storage refrigeration leads @ \$120 = **\$1,800/mo**
   - 25 crane leads @ \$100 = **\$2,500/mo**
   - Total passive potential: **\$6,000 – \$12,000+/mo** without inventory or capital risk.

---

## 🚀 Deployment & Local Testing

Open `index.html` directly in any web browser or serve with any static HTTP server:

```bash
# Python
python -m http.server 8080

# Node
npx serve .
```
