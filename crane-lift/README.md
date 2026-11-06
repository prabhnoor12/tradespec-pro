# 🏗️ RigCheck Pro™ — Mobile Crane & Boom Lift Sizing Calculator

> **High-Utility Engineering Pre-Planning Tool & High-Ticket Commercial Lead Generation Engine**  
> Grounded in **ASME B30.5** (Mobile and Locomotive Cranes) & **OSHA 29 CFR 1926 Subpart CC** (Cranes & Derricks in Construction).

---

## 💡 The Problem & The Market Opportunity

### The Contractor's Nightmare
A commercial HVAC contractor or general contractor needs to hoist a 6,000 lb packaged rooftop air conditioning unit (RTU) onto a 4-story building. Because the unit weighs 3 tons, an inexperienced project manager might call a crane yard and book a **30-ton crane**.

On job day, the crane arrives with an operator. The building has a 25-foot front setback and the unit sits 35 feet back from the parapet edge (a **60-foot horizontal radius**). At that operating radius, the 30-ton crane's net load chart capacity drops below 4,500 lbs. **The lift is aborted for safety reasons.** The crane rental yard still bills the contractor the standard **$3,000 to $5,000 minimum mobilization fee**, and the crane must be rescheduled for another week.

### The Business Moat & Monetization Model
Unlike generic consumer apps, commercial crane rental is a high-ticket, opaque B2B service:
* **Average Job Ticket:** $2,500 to $15,000+ per pick.
* **Contractor Intent:** When someone calculates boom radius, setback, and outrigger mats, they are days away from spending thousands of dollars.
* **The Lead Value:** Independent local crane yards and rigging companies eagerly pay **$75 to $150 per exclusive commercial lead**.
* **The $2,500/Month Blueprint (The Flat Retainer Model):**
  1. Rank for long-tail queries: *"crane size calculator"*, *"hvac crane rental cost"*, *"mobile crane radius calculator"*.
  2. Reach out to 5 independent crane rental dispatchers across 5 regional metros (e.g. Dallas, Atlanta, Denver, Phoenix, Tampa).
  3. Offer: *"I route 15–25 exclusive local lift quote requests directly to your dispatch manager for a flat $500/month."*
  4. **5 clients × $500/mo = $2,500/month steady recurring income.**

---

## ⚙️ Engineering & Math Engine

RigCheck Pro performs real-world physical and regulatory checks:

1. **Gross Pick Weight:**
   $$\text{Gross Load} = \text{Net Object Weight} + \text{Hook Block Weight} + \text{Slings \& Spreader Beam}$$
2. **Lift Geometry & Boom Clearance:**
   $$\text{Tip Elevation } H_{tip} = \text{Landing Height } H + \text{Headroom Buffer } \Delta H$$
   $$\text{Minimum Boom Length } L = \sqrt{R^2 + H_{tip}^2} \times 1.08 \quad (\text{incorporating 8\% sheave head offset})$$
   $$\text{Operating Boom Angle } \theta = \arctan\left(\frac{H_{tip}}{R}\right)$$
3. **Load Chart Sizing & Overturning Moment:**
   Crane ratings decrease non-linearly as operating radius expands. RigCheck interpolates real-world manufacturer load chart data across:
   * **35-Ton Commercial Boom Truck**
   * **50-Ton Hydraulic Truck Crane**
   * **75-Ton All-Terrain Crane**
   * **100-Ton All-Terrain Crane**
   * **160-Ton Heavy All-Terrain**
   * **250+ Ton Mega-Lift with Luffing Jib**
4. **Ground Bearing Pressure (GBP) & Outrigger Mat Sizing:**
   Under ASME B30.5, during rotation over a rear corner outrigger, up to **75% of the combined crane chassis and suspended load weight** transfers onto that single outrigger float:
   $$\text{Reaction Force } P = 0.75 \times (W_{crane} + W_{load})$$
   $$\text{Required Mat Area (sq ft)} = \frac{P}{\text{Soil Allowable Bearing Capacity (PSF)}}$$
5. **OSHA & Regulatory Alerts:**
   * **ASME B30.5 Critical Lift Warning:** Triggers when utilization exceeds 85% of chart.
   * **Street Closure & Right-of-Way Permit:** Informs contractors when municipal Traffic Control Plans (TCP) and flaggers are required.
   * **OSHA 1926.1408 Power Line Proximity:** Enforces the 20-foot radial encroachment boundary.
   * **Wind Speed Threshold:** Halts recommendations when wind exceeds 20–25 mph.

---

## 🚀 Features

* **⚡ 1-Click Job Presets:** Instant loading for Rooftop RTUs, Commercial Generators, Steel Trusses, Fiberglass Pools, and Transformers.
* **🎨 Real-Time Interactive SVG Schematic:** Dynamically scales the building height, setback distance, boom elevation angle, outrigger floats, and suspended load.
* **📊 Visual Capacity Utilization Meter:** Green (<70%), Amber (70–85%), and Red (>85% Critical Pick).
* **🖨️ 1-Page Printable Stamped Worksheet:** Clean print layout (`Ctrl+P` / Print button) formatted for field superintendents, estimators, and PE reviewers.
* **📩 Modern Accessible Lead Dialog:** Built with native HTML5 `<dialog closedby="any">` and progressive fallback.
* **📱 Zero Dependencies:** Pure vanilla HTML, CSS, and modern JavaScript. Loads in under 200ms.

---

## 🛠️ Local Development & Deployment

### Quick Start
Clone the repo and open `index.html` in any modern web browser:
```bash
git clone https://github.com/prabhnoor12/crane-lift-calculator.git
cd crane-lift-calculator
start index.html # On Windows, or open directly
```

### Free Static Hosting Options
Because this project uses pure vanilla HTML/CSS/JS without build steps or node dependencies:
* **GitHub Pages:** Go to `Repository Settings -> Pages -> Deploy from branch (main / root)`. Live in 60 seconds!
* **Cloudflare Pages / Vercel / Netlify:** Drag-and-drop the folder or connect your GitHub repo.

---

## 📄 License
MIT License. Built for contractors and equipment rental professionals.
