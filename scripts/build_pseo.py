# -*- coding: utf-8 -*-
"""
TradeSpec Pro™ — Programmatic Location & Code-Specific Landing Page Generator
Generates static, Google-crawlable HTML pages, updates sitemap.xml, and injects
internal link hubs into parent calculator pages.
"""

import os
import json
import html
import re
from pathlib import Path
from pseo_data import BASE_URL, LAST_MOD, TOOLS_META, PAGES

ROOT_DIR = Path(__file__).resolve().parent.parent


def render_quick_calc(page, tool_meta):
    mode = tool_meta["calc_mode"]
    d = page["calc_defaults"]

    if mode == "crane":
        return f"""
        <div class="quick-calc-card" id="jurisdictionQuickCalc" data-calc-mode="crane" data-rigging-factor="{d['rigging_factor']}">
          <div class="quick-calc-header">
            <div class="quick-calc-title">⚡ Quick {html.escape(page['short_label'])} Pick &amp; Mat Estimator</div>
            <span class="quick-calc-tag">Pre-Loaded: {d['soil']:,} PSF Local Soil</span>
          </div>
          <div class="quick-calc-grid">
            <div class="calc-field">
              <label for="qc_load">Net Equipment / Load Weight (lbs)</label>
              <input type="number" id="qc_load" value="{d['load']}" min="500" step="500">
            </div>
            <div class="calc-field">
              <label for="qc_radius">Horizontal Pick Radius (ft)</label>
              <input type="number" id="qc_radius" value="{d['radius']}" min="15" max="200" step="5">
            </div>
            <div class="calc-field">
              <label for="qc_soil">Local Soil Bearing Pressure (PSF)</label>
              <input type="number" id="qc_soil" value="{d['soil']}" min="1000" max="6000" step="100">
            </div>
          </div>
          <div class="quick-calc-results">
            <div class="qres-item"><span class="qres-label">Est. Crane Class</span><span class="qres-val" id="qc_out1">—</span></div>
            <div class="qres-item"><span class="qres-label">Gross Pick (w/ Rigging)</span><span class="qres-val highlight-amber" id="qc_out2">—</span></div>
            <div class="qres-item"><span class="qres-label">Peak Outrigger Reaction</span><span class="qres-val" id="qc_out3">—</span></div>
            <div class="qres-item"><span class="qres-label">Min. Outrigger Mat Size</span><span class="qres-val highlight-green" id="qc_out4">—</span></div>
          </div>
          <a href="../" class="btn btn-primary">Open Full Boom Clearance &amp; Rental Calculator &rarr;</a>
        </div>"""

    if mode == "grease":
        return f"""
        <div class="quick-calc-card" id="jurisdictionQuickCalc" data-calc-mode="grease" data-code-style="{d['code_style']}">
          <div class="quick-calc-header">
            <div class="quick-calc-title">⚡ Quick {html.escape(page['short_label'])} Grease Interceptor Estimator</div>
            <span class="quick-calc-tag">Pre-Loaded: {d['code_style']} Sizing Mode</span>
          </div>
          <div class="quick-calc-grid">
            <div class="calc-field">
              <label for="qc_sinks">Connected Sink Compartments</label>
              <input type="number" id="qc_sinks" value="{d['sinks']}" min="1" max="12" step="1">
            </div>
            <div class="calc-field">
              <label for="qc_vol">Avg. Gallons per Basin</label>
              <input type="number" id="qc_vol" value="{d['vol']}" min="5" max="60" step="1">
            </div>
            <div class="calc-field">
              <label for="qc_seats">Restaurant Dining Seats</label>
              <input type="number" id="qc_seats" value="{d['seats']}" min="10" max="500" step="5">
            </div>
          </div>
          <div class="quick-calc-results">
            <div class="qres-item"><span class="qres-label">Indoor HGI Rating</span><span class="qres-val" id="qc_out1">—</span></div>
            <div class="qres-item"><span class="qres-label">FOG Grease Capacity</span><span class="qres-val highlight-amber" id="qc_out2">—</span></div>
            <div class="qres-item"><span class="qres-label">Outdoor Gravity Vault</span><span class="qres-val highlight-green" id="qc_out3">—</span></div>
            <div class="qres-item"><span class="qres-label">Code Basis</span><span class="qres-val" id="qc_out4">—</span></div>
          </div>
          <a href="../" class="btn btn-primary">Open Full Grease Trap &amp; NFPA 96 Hood CFM Calculator &rarr;</a>
        </div>"""

    if mode == "ev":
        return f"""
        <div class="quick-calc-card" id="jurisdictionQuickCalc" data-calc-mode="ev">
          <div class="quick-calc-header">
            <div class="quick-calc-title">⚡ Quick {html.escape(page['short_label'])} EV Load Estimator</div>
            <span class="quick-calc-tag">NEC 625.41 (125%) + EMS 625.42</span>
          </div>
          <div class="quick-calc-grid">
            <div class="calc-field">
              <label for="qc_ports">Number of EV Charging Ports</label>
              <input type="number" id="qc_ports" value="{d['ports']}" min="1" max="200" step="1">
            </div>
            <div class="calc-field">
              <label for="qc_kw">Power per Port (kW)</label>
              <select id="qc_kw">
                <option value="7.2" {"selected" if d['kw'] == 7.2 else ""}>7.2 kW (Level 2 — 30A)</option>
                <option value="11.5" {"selected" if d['kw'] == 11.5 else ""}>11.5 kW (Level 2 — 48A)</option>
                <option value="19.2" {"selected" if d['kw'] == 19.2 else ""}>19.2 kW (Commercial L2 — 80A)</option>
                <option value="50" {"selected" if d['kw'] == 50 else ""}>50 kW (Fleet DC Fast)</option>
                <option value="150" {"selected" if d['kw'] == 150 else ""}>150 kW (High-Power DCFC)</option>
              </select>
            </div>
            <div class="calc-field">
              <label for="qc_ems">EMS Power Sharing Ratio</label>
              <select id="qc_ems">
                <option value="1.0" {"selected" if d['ems'] == 1.0 else ""}>1.0 (No EMS — 100% Dedicated)</option>
                <option value="0.75" {"selected" if d['ems'] == 0.75 else ""}>0.75 (25% Dynamic Load Sharing)</option>
                <option value="0.5" {"selected" if d['ems'] == 0.5 else ""}>0.50 (2:1 ALMS / EMS Sharing)</option>
              </select>
            </div>
          </div>
          <div class="quick-calc-results">
            <div class="qres-item"><span class="qres-label">NEC Continuous Load</span><span class="qres-val" id="qc_out1">—</span></div>
            <div class="qres-item"><span class="qres-label">480V 3-Phase Amps</span><span class="qres-val highlight-amber" id="qc_out2">—</span></div>
            <div class="qres-item"><span class="qres-label">Min. Transformer Size</span><span class="qres-val highlight-green" id="qc_out3">—</span></div>
            <div class="qres-item"><span class="qres-label">NEC Compliance</span><span class="qres-val" id="qc_out4">—</span></div>
          </div>
          <a href="../" class="btn btn-primary">Open Full EV Fleet Switchgear &amp; Cost Calculator &rarr;</a>
        </div>"""

    if mode == "stormwater":
        return f"""
        <div class="quick-calc-card" id="jurisdictionQuickCalc" data-calc-mode="stormwater">
          <div class="quick-calc-header">
            <div class="quick-calc-title">⚡ Quick {html.escape(page['short_label'])} Rational Method Estimator</div>
            <span class="quick-calc-tag">Q = C × I × A (Local Intensity)</span>
          </div>
          <div class="quick-calc-grid">
            <div class="calc-field">
              <label for="qc_acres">Drainage Area (Acres)</label>
              <input type="number" id="qc_acres" value="{d['acres']}" min="0.1" max="200" step="0.25">
            </div>
            <div class="calc-field">
              <label for="qc_cval">Runoff Coefficient (C)</label>
              <input type="number" id="qc_cval" value="{d['cval']}" min="0.10" max="0.98" step="0.02">
            </div>
            <div class="calc-field">
              <label for="qc_intensity">Design Rainfall Intensity I (in/hr)</label>
              <input type="number" id="qc_intensity" value="{d['intensity']}" min="1.0" max="15.0" step="0.2">
            </div>
          </div>
          <div class="quick-calc-results">
            <div class="qres-item"><span class="qres-label">Peak Discharge (Q)</span><span class="qres-val" id="qc_out1">—</span></div>
            <div class="qres-item"><span class="qres-label">Peak Flow Rate</span><span class="qres-val highlight-amber" id="qc_out2">—</span></div>
            <div class="qres-item"><span class="qres-label">Prelim. Detention Vol.</span><span class="qres-val highlight-green" id="qc_out3">—</span></div>
            <div class="qres-item"><span class="qres-label">Design Parameters</span><span class="qres-val" id="qc_out4">—</span></div>
          </div>
          <a href="../" class="btn btn-primary">Open Full Civil Earthwork &amp; Stormwater Calculator &rarr;</a>
        </div>"""

    if mode == "ti":
        return f"""
        <div class="quick-calc-card" id="jurisdictionQuickCalc" data-calc-mode="ti">
          <div class="quick-calc-header">
            <div class="quick-calc-title">⚡ Quick {html.escape(page['short_label'])} TI &amp; Occupancy Estimator</div>
            <span class="quick-calc-tag">Pre-Loaded Local TI Cost Benchmark</span>
          </div>
          <div class="quick-calc-grid">
            <div class="calc-field">
              <label for="qc_sqft">Commercial Lease Area (sq ft)</label>
              <input type="number" id="qc_sqft" value="{d['sqft']}" min="500" max="100000" step="250">
            </div>
            <div class="calc-field">
              <label for="qc_occ">Occupancy Load Factor (sq ft / person)</label>
              <select id="qc_occ">
                <option value="150" {"selected" if d['occ'] == 150 else ""}>150 sq ft (Business / Office — Group B)</option>
                <option value="60" {"selected" if d['occ'] == 60 else ""}>60 sq ft (Mercantile / Retail — Group M)</option>
                <option value="15" {"selected" if d['occ'] == 15 else ""}>15 sq ft (Dining / Assembly — Group A-2)</option>
                <option value="300" {"selected" if d['occ'] == 300 else ""}>300 sq ft (Warehouse / Storage — Group S)</option>
              </select>
            </div>
            <div class="calc-field">
              <label for="qc_cost">Local TI Construction Rate ($ / sq ft)</label>
              <input type="number" id="qc_cost" value="{d['cost']}" min="50" max="500" step="5">
            </div>
          </div>
          <div class="quick-calc-results">
            <div class="qres-item"><span class="qres-label">Calculated Occupancy</span><span class="qres-val" id="qc_out1">—</span></div>
            <div class="qres-item"><span class="qres-label">Min. Remote Exits</span><span class="qres-val highlight-amber" id="qc_out2">—</span></div>
            <div class="qres-item"><span class="qres-label">Est. TI Budget</span><span class="qres-val highlight-green" id="qc_out3">—</span></div>
            <div class="qres-item"><span class="qres-label">Accessibility Trigger</span><span class="qres-val" id="qc_out4">—</span></div>
          </div>
          <a href="../" class="btn btn-primary">Open Full Tenant Improvement &amp; Plumbing Fixture Calculator &rarr;</a>
        </div>"""

    if mode == "cold":
        return f"""
        <div class="quick-calc-card" id="jurisdictionQuickCalc" data-calc-mode="cold" data-latent-mult="{d['latent_mult']}">
          <div class="quick-calc-header">
            <div class="quick-calc-title">⚡ Quick {html.escape(page['short_label'])} Walk-In BTU Estimator</div>
            <span class="quick-calc-tag">Pre-Loaded: {d['ambtemp']}°F Local Ambient</span>
          </div>
          <div class="quick-calc-grid">
            <div class="calc-field">
              <label for="qc_sqft">Walk-In Box Floor Area (sq ft)</label>
              <input type="number" id="qc_sqft" value="{d['sqft']}" min="50" max="10000" step="20">
            </div>
            <div class="calc-field">
              <label for="qc_boxtemp">Target Box Temp (°F)</label>
              <select id="qc_boxtemp">
                <option value="35" {"selected" if d['boxtemp'] == 35 else ""}>35°F (Standard Cooler)</option>
                <option value="28" {"selected" if d['boxtemp'] == 28 else ""}>28°F (Meat / Beer Cooler)</option>
                <option value="0" {"selected" if d['boxtemp'] == 0 else ""}>0°F (Commercial Freezer)</option>
                <option value="-10" {"selected" if d['boxtemp'] == -10 else ""}>-10°F (Ice Cream / Deep Freeze)</option>
              </select>
            </div>
            <div class="calc-field">
              <label for="qc_ambtemp">Local Design Ambient (°F)</label>
              <input type="number" id="qc_ambtemp" value="{d['ambtemp']}" min="70" max="120" step="1">
            </div>
          </div>
          <div class="quick-calc-results">
            <div class="qres-item"><span class="qres-label">Est. Heat Load</span><span class="qres-val" id="qc_out1">—</span></div>
            <div class="qres-item"><span class="qres-label">Refrigeration Tons</span><span class="qres-val highlight-amber" id="qc_out2">—</span></div>
            <div class="qres-item"><span class="qres-label">Est. Condenser HP</span><span class="qres-val highlight-green" id="qc_out3">—</span></div>
            <div class="qres-item"><span class="qres-label">Thermal Delta</span><span class="qres-val" id="qc_out4">—</span></div>
          </div>
          <a href="../" class="btn btn-primary">Open Full Walk-In Cooler &amp; Cold Storage Calculator &rarr;</a>
        </div>"""

    return ""


def build_page_html(page):
    tool = page["tool"]
    slug = page["slug"]
    tool_meta = TOOLS_META[tool]
    canonical_url = f"{BASE_URL}/{tool}/{slug}/"
    parent_url = f"{BASE_URL}/{tool}/"

    # Sibling pages for same tool
    siblings = [p for p in PAGES if p["tool"] == tool and p["slug"] != slug]
    # Related tools
    related_tools = tool_meta.get("related", [])

    # JSON-LD: BreadcrumbList
    breadcrumb_ld = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "TradeSpec Pro", "item": f"{BASE_URL}/"},
            {"@type": "ListItem", "position": 2, "name": tool_meta["name"], "item": parent_url},
            {"@type": "ListItem", "position": 3, "name": page["short_label"], "item": canonical_url}
        ]
    }

    # JSON-LD: TechArticle + WebApplication reference
    article_ld = {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "headline": page["title"],
        "description": page["description"],
        "url": canonical_url,
        "dateModified": LAST_MOD,
        "author": {"@type": "Organization", "name": "TradeSpec Pro Engineering"},
        "publisher": {"@type": "Organization", "name": "TradeSpec Pro™"},
        "about": {
            "@type": "WebApplication",
            "name": tool_meta["name"],
            "url": parent_url,
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "All"
        }
    }

    # JSON-LD: FAQPage
    faq_ld = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": q,
                "acceptedAnswer": {"@type": "Answer", "text": a}
            }
            for q, a in page["faqs"]
        ]
    }

    meta_cards_html = "\n".join(
        f"""          <div class="spec-meta-card">
            <span class="spec-meta-label">{html.escape(k)}</span>
            <span class="spec-meta-val">{html.escape(v)}</span>
          </div>"""
        for k, v in page["meta_cards"]
    )

    intro_paras = "\n".join(f"        <p>{html.escape(p)}</p>" for p in page["intro_body"])

    code_rows = "\n".join(
        f"""            <tr>
              <td>{html.escape(sec)}</td>
              <td><strong>{html.escape(topic)}</strong></td>
              <td>{html.escape(detail)}</td>
            </tr>"""
        for sec, topic, detail in page["code_table"]
    )

    worked_steps = "\n".join(
        f"          <li>{step}</li>" for step in page["worked_example_steps"]
    )

    checklist_cards = "\n".join(
        f"""        <div class="checklist-card">
          <span class="checklist-step">{html.escape(step)}</span>
          <h3>{html.escape(title)}</h3>
          <p>{html.escape(body)}</p>
        </div>"""
        for step, title, body in page["checklist"]
    )

    faq_items = "\n".join(
        f"""        <details class="faq-item">
          <summary>{html.escape(q)}</summary>
          <div class="faq-answer">{html.escape(a)}</div>
        </details>"""
        for q, a in page["faqs"]
    )

    sibling_cards = "\n".join(
        f"""        <a href="../{s['slug']}/" class="hub-link-card">
          <span class="hub-link-title">{html.escape(s['short_label'])}</span>
          <span class="hub-link-sub">{html.escape(s['code_badge'])}</span>
        </a>"""
        for s in siblings
    )

    related_cards = "\n".join(
        f"""        <a href="../../{rt}/" class="hub-link-card">
          <span class="hub-link-title">{html.escape(TOOLS_META[rt]['name'])}</span>
          <span class="hub-link-sub">{html.escape(TOOLS_META[rt]['short'])}™ — Free Engineering Calculator</span>
        </a>"""
        for rt in related_tools
    )

    quick_calc_html = render_quick_calc(page, tool_meta)

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{html.escape(page['title'])} | TradeSpec Pro™</title>
  <meta name="description" content="{html.escape(page['description'])}">
  <meta name="keywords" content="{html.escape(page['keywords'])}">
  <link rel="canonical" href="{canonical_url}">

  <!-- OpenGraph / Social -->
  <meta property="og:title" content="{html.escape(page['title'])}">
  <meta property="og:description" content="{html.escape(page['description'])}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="{canonical_url}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{html.escape(page['title'])}">
  <meta name="twitter:description" content="{html.escape(page['description'])}">

  <!-- Structured Data: BreadcrumbList -->
  <script type="application/ld+json">
{json.dumps(breadcrumb_ld, indent=2)}
  </script>

  <!-- Structured Data: TechArticle -->
  <script type="application/ld+json">
{json.dumps(article_ld, indent=2)}
  </script>

  <!-- Structured Data: FAQPage -->
  <script type="application/ld+json">
{json.dumps(faq_ld, indent=2)}
  </script>

  <link rel="stylesheet" href="../../css/code-guide.css">
</head>
<body>

  <!-- Header -->
  <header class="guide-header">
    <div class="container guide-header-inner">
      <a href="../../" class="guide-brand">
        <span>TradeSpec Pro™</span>
        <span class="guide-brand-badge">{html.escape(tool_meta['short'])}</span>
      </a>
      <nav class="guide-nav" aria-label="Primary Navigation">
        <a href="../../">All 9 Calculators</a>
        <a href="#quick-estimator">Quick Estimator</a>
        <a href="#code-reference">Code Table</a>
        <a href="#worked-example">Worked Example</a>
        <a href="#faq">FAQs</a>
        <a href="../" class="nav-cta">Launch Full Calculator</a>
      </nav>
    </div>
  </header>

  <!-- Breadcrumbs -->
  <nav class="breadcrumb-bar" aria-label="Breadcrumb">
    <div class="container">
      <ol class="breadcrumb-list">
        <li><a href="../../">TradeSpec Pro</a></li>
        <li><a href="../">{html.escape(tool_meta['name'])}</a></li>
        <li class="breadcrumb-current" aria-current="page">{html.escape(page['short_label'])}</li>
      </ol>
    </div>
  </nav>

  <!-- Hero -->
  <section class="guide-hero">
    <div class="container">
      <div class="jurisdiction-pill">📍 {html.escape(page['code_badge'])}</div>
      <h1>{page['h1']}</h1>
      <p class="guide-hero-lead">{page['lead']}</p>

      <div class="hero-actions">
        <a href="../" class="btn btn-primary">⚡ Open Full {html.escape(tool_meta['short'])}™ Calculator</a>
        <a href="#quick-estimator" class="btn btn-secondary">Run Quick {html.escape(page['jurisdiction'].split('(')[0].strip())} Check &darr;</a>
      </div>

      <div class="spec-meta-grid">
{meta_cards_html}
      </div>
    </div>
  </section>

  <!-- Main Content -->
  <main class="guide-main">
    <div class="container">

      <!-- 1. Interactive Quick Estimator -->
      <section class="guide-section" id="quick-estimator">
        <span class="section-kicker">Interactive Jurisdiction Tool</span>
        <h2>Pre-Configured {html.escape(page['short_label'])} Quick Estimator</h2>
        <p>Default values below are pre-seeded for <strong>{html.escape(page['jurisdiction'])}</strong>. Adjust inputs for an instant code-aligned sanity check, or launch the full calculator for printable engineering specs.</p>
{quick_calc_html}
      </section>

      <!-- 2. Local Regulatory Overview -->
      <section class="guide-section" id="code-reference">
        <span class="section-kicker">Regulatory &amp; Engineering Standards</span>
        <h2>{html.escape(page['intro_heading'])}</h2>
{intro_paras}

        <div class="table-wrap">
          <table class="code-table">
            <thead>
              <tr>
                <th>Code / Standard</th>
                <th>Requirement</th>
                <th>Jurisdiction Implementation</th>
              </tr>
            </thead>
            <tbody>
{code_rows}
            </tbody>
          </table>
        </div>
      </section>

      <!-- 3. Formula & Worked Local Example -->
      <section class="guide-section" id="worked-example">
        <span class="section-kicker">Calculation Walkthrough</span>
        <h2>{html.escape(page['formula_title'])}</h2>
        <div class="formula-box">
          <strong>Governing Engineering Formula:</strong>
          <div class="formula-code">{html.escape(page['formula_expr'])}</div>
          <h3>{html.escape(page['worked_example_title'])}</h3>
          <ul class="worked-example-steps">
{worked_steps}
          </ul>
        </div>
      </section>

      <!-- 4. Jurisdiction Permit & Inspection Checklist -->
      <section class="guide-section" id="permit-checklist">
        <span class="section-kicker">Field Execution</span>
        <h2>{html.escape(page['jurisdiction'].split('(')[0].strip())} Permit &amp; Compliance Checklist</h2>
        <div class="checklist-grid">
{checklist_cards}
        </div>
      </section>

      <!-- 5. Jurisdiction FAQs -->
      <section class="guide-section" id="faq">
        <span class="section-kicker">Technical Q&amp;A</span>
        <h2>Frequently Asked Questions — {html.escape(page['short_label'])}</h2>
        <div class="faq-list">
{faq_items}
        </div>
      </section>

      <!-- 6. Internal Linking Hub: Sibling States & Related Tools -->
      <section class="guide-section" id="other-jurisdictions">
        <span class="section-kicker">State &amp; Municipal Editions</span>
        <h2>Other {html.escape(tool_meta['short'])}™ Jurisdiction Guides</h2>
        <div class="hub-grid">
{sibling_cards}
        </div>
      </section>

      <section class="guide-section" id="related-calculators">
        <span class="section-kicker">TradeSpec Pro Suite</span>
        <h2>Related Commercial Sizing Calculators</h2>
        <div class="hub-grid">
{related_cards}
        </div>
      </section>

    </div>
  </main>

  <!-- Footer -->
  <footer class="guide-footer">
    <div class="container guide-footer-inner">
      <div>
        <p><strong>TradeSpec Pro™</strong> — Engineering-Grade Commercial Sizing Suite.</p>
        <p>Disclaimer: Preliminary engineering sizing tool. Always verify final stamped calculations with a licensed PE, architect, or local Authority Having Jurisdiction (AHJ).</p>
      </div>
      <div class="guide-footer-links">
        <a href="../../">Home</a>
        <a href="../">{html.escape(tool_meta['short'])}™ Calculator</a>
        <a href="../../sitemap.xml">Sitemap</a>
      </div>
    </div>
  </footer>

  <script src="../../js/code-guide-calc.js"></script>
</body>
</html>
"""


def update_sitemap():
    base_tools = [
        ("", "weekly", "1.0"),
        ("charge-spec/", "monthly", "0.9"),
        ("permit-spec/", "monthly", "0.9"),
        ("site-spec/", "monthly", "0.9"),
        ("cold-spec/", "monthly", "0.9"),
        ("crane-lift/", "monthly", "0.9"),
        ("well-drilling/", "monthly", "0.9"),
        ("pallet-racking/", "monthly", "0.9"),
        ("spray-foam/", "monthly", "0.9"),
        ("grease-trap/", "monthly", "0.9"),
    ]

    lines = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    for path, freq, prio in base_tools:
        lines.append(f"""  <url>
    <loc>{BASE_URL}/{path}</loc>
    <lastmod>{LAST_MOD}</lastmod>
    <changefreq>{freq}</changefreq>
    <priority>{prio}</priority>
  </url>""")

    for p in PAGES:
        lines.append(f"""  <url>
    <loc>{BASE_URL}/{p['tool']}/{p['slug']}/</loc>
    <lastmod>{LAST_MOD}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>""")

    lines.append("</urlset>\n")
    (ROOT_DIR / "sitemap.xml").write_text("\n".join(lines), encoding="utf-8")
    print(f"Updated sitemap.xml with {len(base_tools) + len(PAGES)} total URLs.")


def inject_parent_hubs():
    """Inject a clean, idempotent State & Municipal Code Editions section into each parent tool index.html."""
    marker_start = "<!-- PSEO_JURISDICTION_HUB_START -->"
    marker_end = "<!-- PSEO_JURISDICTION_HUB_END -->"

    tools_with_pages = sorted(set(p["tool"] for p in PAGES))
    for tool in tools_with_pages:
        parent_file = ROOT_DIR / tool / "index.html"
        if not parent_file.exists():
            print(f"Warning: {parent_file} not found, skipping.")
            continue

        content = parent_file.read_text(encoding="utf-8")
        tool_pages = [p for p in PAGES if p["tool"] == tool]

        links_html = "\n".join(
            f"""          <a href="{p['slug']}/" style="display:block;padding:0.9rem 1rem;background:rgba(19,29,49,0.9);border:1px solid rgba(255,255,255,0.12);border-radius:10px;text-decoration:none;color:#f8fafc;">
            <strong style="display:block;font-size:0.95rem;margin-bottom:0.25rem;color:#38bdf8;">📍 {html.escape(p['short_label'])} &rarr;</strong>
            <span style="display:block;font-size:0.8rem;color:#94a3b8;">{html.escape(p['code_badge'])}</span>
          </a>"""
            for p in tool_pages
        )

        block = f"""{marker_start}
  <section class="container" style="margin:2.5rem auto;padding:1.5rem;background:rgba(15,23,42,0.85);border:1px solid rgba(56,189,248,0.22);border-radius:14px;">
    <div style="margin-bottom:1rem;">
      <span style="display:inline-block;font-size:0.74rem;font-weight:700;text-transform:uppercase;letter-spacing:0.07em;color:#f59e0b;margin-bottom:0.25rem;">State &amp; Municipal Code Editions</span>
      <h2 style="font-size:1.35rem;font-weight:800;margin:0 0 0.35rem;color:#f8fafc;">Jurisdiction-Specific {html.escape(TOOLS_META[tool]['short'])}™ Engineering Guides</h2>
      <p style="font-size:0.9rem;color:#94a3b8;margin:0;">Select your state or municipal jurisdiction for local building code amendments, agency permit checklists, and pre-calibrated regional defaults.</p>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:0.85rem;">
{links_html}
    </div>
  </section>
  {marker_end}"""

        # Replace existing block if present, else inject right before <footer
        pattern = re.compile(re.escape(marker_start) + r".*?" + re.escape(marker_end), re.DOTALL)
        if pattern.search(content):
            new_content = pattern.sub(block, content)
        else:
            footer_idx = content.rfind("<footer")
            if footer_idx == -1:
                print(f"Warning: no <footer> found in {parent_file}")
                continue
            new_content = content[:footer_idx] + block + "\n\n  " + content[footer_idx:]

        parent_file.write_text(new_content, encoding="utf-8")
        print(f"Injected {len(tool_pages)} jurisdiction links into {tool}/index.html")


def inject_homepage_directory():
    """Inject a compact State & Building Code Directory onto the root index.html for 1-click crawl depth."""
    marker_start = "<!-- PSEO_HOME_DIRECTORY_START -->"
    marker_end = "<!-- PSEO_HOME_DIRECTORY_END -->"
    home_file = ROOT_DIR / "index.html"
    if not home_file.exists():
        return

    content = home_file.read_text(encoding="utf-8")
    tools_with_pages = ["crane-lift", "grease-trap", "charge-spec", "site-spec", "permit-spec", "cold-spec"]

    groups_html = []
    for tool in tools_with_pages:
        t_pages = [p for p in PAGES if p["tool"] == tool]
        items = "\n".join(
            f'            <li><a href="{tool}/{p["slug"]}/" style="color:#94a3b8;text-decoration:none;font-size:0.86rem;">{html.escape(p["short_label"])}</a></li>'
            for p in t_pages
        )
        groups_html.append(f"""        <div style="background:#131d31;border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:1.1rem;">
          <h3 style="font-size:0.95rem;font-weight:700;color:#38bdf8;margin:0 0 0.6rem;">{html.escape(TOOLS_META[tool]['short'])}™ Code Editions</h3>
          <ul style="list-style:none;display:grid;gap:0.45rem;padding:0;margin:0;">
{items}
          </ul>
        </div>""")

    block = f"""{marker_start}
  <section id="jurisdiction-guides" style="padding:3rem 0;border-top:1px solid rgba(255,255,255,0.08);background:#0f172a;">
    <div class="container">
      <div style="margin-bottom:1.5rem;">
        <span style="display:inline-block;font-size:0.75rem;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#f59e0b;margin-bottom:0.35rem;">State &amp; Municipal Code Directory</span>
        <h2 style="font-size:1.65rem;font-weight:800;color:#f8fafc;margin:0 0 0.4rem;">Browse Calculators by State &amp; Governing Building Code</h2>
        <p style="color:#94a3b8;font-size:0.95rem;max-width:740px;margin:0;">Direct engineering reference guides calibrated for OSHA 1926, Cal/OSHA Title 8, NYC DOB, UPC/IPC FOG ordinances, NEC Article 625, TxDOT Atlas 14, and California Title 24.</p>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1rem;">
{chr(10).join(groups_html)}
      </div>
    </div>
  </section>
  {marker_end}"""

    pattern = re.compile(re.escape(marker_start) + r".*?" + re.escape(marker_end), re.DOTALL)
    if pattern.search(content):
        new_content = pattern.sub(block, content)
    else:
        footer_idx = content.rfind("<footer")
        if footer_idx == -1:
            return
        new_content = content[:footer_idx] + block + "\n\n  " + content[footer_idx:]

    home_file.write_text(new_content, encoding="utf-8")
    print("Injected State & Municipal Code Directory into root index.html")


def main():
    generated = 0
    for page in PAGES:
        out_dir = ROOT_DIR / page["tool"] / page["slug"]
        out_dir.mkdir(parents=True, exist_ok=True)
        out_file = out_dir / "index.html"
        out_file.write_text(build_page_html(page), encoding="utf-8")
        generated += 1

    print(f"Generated {generated} programmatic jurisdiction & code-specific landing pages.")
    update_sitemap()
    inject_parent_hubs()
    inject_homepage_directory()


if __name__ == "__main__":
    main()
