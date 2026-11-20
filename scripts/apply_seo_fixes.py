# -*- coding: utf-8 -*-
"""
TradeSpec Pro™ — Priority 1 Technical SEO Remediation Script
1. Generates 1200x630 OpenGraph preview PNG (assets/og-tradespec-pro.png)
2. Tightens over-long <title> & <meta name="description"> tags across root + 9 core tools
3. Injects favicon, og:image, twitter:image, Organization/WebSite & BreadcrumbList JSON-LD
4. Injects sibling tool internal cross-link hubs into the 5 orphaned calculators
"""

import json
import re
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
BASE_URL = "https://prabhnoor12.github.io/tradespec-pro"
OG_IMAGE_URL = f"{BASE_URL}/assets/og-tradespec-pro.png"

CORE_SEO = {
    "": {
        "title": "TradeSpec Pro™ | 9 Commercial Engineering & Sizing Calculators",
        "desc": "Free code-compliant sizing calculators for commercial EV fleets, cranes, grease traps, stormwater, walk-in coolers, water wells, pallet racks & spray foam.",
        "name": "TradeSpec Pro",
    },
    "charge-spec": {
        "title": "Commercial EV Fleet Sizing Calculator (NEC 625) | ChargeSpec",
        "desc": "Free NEC Article 625 commercial EV charger electrical load calculator. Size 480V panels, transformer kVA, EMS load sharing, and installation budgets.",
        "name": "Commercial EV Fleet Sizing Calculator",
        "short": "ChargeSpec Pro",
    },
    "cold-spec": {
        "title": "Walk-In Cooler & Freezer BTU Calculator | ColdSpec Pro™",
        "desc": "Free commercial walk-in cooler and freezer heat load calculator. Calculate BTU/hr, refrigeration tonnage, condenser HP, and ASHRAE / Title 24 compliance.",
        "name": "Walk-In Cooler & Freezer BTU Calculator",
        "short": "ColdSpec Pro",
    },
    "crane-lift": {
        "title": "Mobile Crane Sizing & Load Radius Calculator | RigCheck Pro",
        "desc": "Free OSHA 1926 & ASME B30.5 mobile crane sizing calculator. Compute required crane tonnage, boom clearance, outrigger mat PSF area, and rental budgets.",
        "name": "Mobile Crane Sizing & Radius Calculator",
        "short": "RigCheck Pro",
    },
    "grease-trap": {
        "title": "Commercial Grease Trap & Hood CFM Calculator | FOGSpec Pro",
        "desc": "Free UPC & IPC restaurant grease trap sizing calculator. Calculate hydromechanical GPM, gravity vault gallons, NFPA 96 kitchen hood CFM, and permit costs.",
        "name": "Commercial Grease Trap & Hood CFM Calculator",
        "short": "FOGSpec Pro",
    },
    "pallet-racking": {
        "title": "Warehouse Pallet Racking Layout Calculator | RackSpec Pro™",
        "desc": "Free warehouse pallet rack capacity and forklift aisle width calculator. Estimate total pallet positions, RMI MH16.1 seismic specs, and IFC Ch. 32 rules.",
        "name": "Warehouse Pallet Racking Layout Calculator",
        "short": "RackSpec Pro",
    },
    "permit-spec": {
        "title": "Commercial Tenant Improvement & IBC Calculator | PermitSpec",
        "desc": "Free commercial tenant improvement (TI) cost and building code calculator. Estimate IBC 1004 occupant load, required exits, plumbing fixtures, and budgets.",
        "name": "Commercial Tenant Improvement Calculator",
        "short": "PermitSpec Pro",
    },
    "site-spec": {
        "title": "Stormwater Runoff & Earthwork Calculator | SiteSpec Pro™",
        "desc": "Free Rational Method (Q = CIA) stormwater runoff and civil earthwork calculator. Size commercial detention basins, cut/fill volumes, and drainage budgets.",
        "name": "Civil Stormwater & Earthwork Calculator",
        "short": "SiteSpec Pro",
    },
    "spray-foam": {
        "title": "Commercial Spray Foam Board Foot Calculator | FoamSpec Pro",
        "desc": "Free closed-cell and open-cell spray foam insulation calculator. Compute exact board feet, R-value thickness, chemical drum sets, and installed costs.",
        "name": "Commercial Spray Foam Board Foot Calculator",
        "short": "FoamSpec Pro",
    },
    "well-drilling": {
        "title": "Commercial Water Well & Pump Sizing Calculator | WellSpec",
        "desc": "Free commercial water well drilling cost and submersible pump HP calculator. Estimate Total Dynamic Head (TDH), casing diameter, and turnkey budgets.",
        "name": "Commercial Water Well & Pump Calculator",
        "short": "WellSpec Pro",
    },
}

ORPHAN_TOOLS = ["crane-lift", "grease-trap", "pallet-racking", "spray-foam", "well-drilling"]


def load_font(size, bold=False):
    candidates = [
        "C:/Windows/Fonts/segoeuib.ttf" if bold else "C:/Windows/Fonts/segoeui.ttf",
        "C:/Windows/Fonts/arialbd.ttf" if bold else "C:/Windows/Fonts/arial.ttf",
        "C:/Windows/Fonts/consolab.ttf" if bold else "C:/Windows/Fonts/consola.ttf",
    ]
    for path in candidates:
        if Path(path).exists():
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


def generate_og_image():
    assets_dir = ROOT / "assets"
    assets_dir.mkdir(exist_ok=True)
    out_path = assets_dir / "og-tradespec-pro.png"

    W, H = 1200, 630
    img = Image.new("RGB", (W, H), (9, 13, 22))
    draw = ImageDraw.Draw(img)

    # Subtle blueprint grid lines
    for x in range(0, W, 40):
        draw.line([(x, 0), (x, H)], fill=(20, 32, 54), width=1)
    for y in range(0, H, 40):
        draw.line([(0, y), (W, y)], fill=(20, 32, 54), width=1)

    # Top accent bar
    draw.rectangle([(0, 0), (W, 8)], fill=(56, 189, 248))

    # Outer border frame
    draw.rounded_rectangle([(36, 36), (W - 36, H - 36)], radius=20, outline=(56, 189, 248), width=2)

    # Brand badge
    draw.rounded_rectangle([(80, 82), (380, 128)], radius=22, fill=(18, 38, 66), outline=(56, 189, 248), width=2)
    f_badge = load_font(22, bold=True)
    draw.text((106, 92), "TRADESPEC PRO™ SUITE", fill=(56, 189, 248), font=f_badge)

    # Main headline
    f_h1 = load_font(62, bold=True)
    draw.text((80, 160), "Commercial Engineering", fill=(248, 250, 252), font=f_h1)
    draw.text((80, 232), "& Equipment Sizing Suite", fill=(56, 189, 248), font=f_h1)

    # Subheadline
    f_sub = load_font(28, bold=False)
    draw.text((80, 326), "9 Free Code-Compliant Calculators + 30 State & Municipal Editions", fill=(148, 163, 184), font=f_sub)

    # Code compliance pills
    codes = ["OSHA 1926", "NEC 625", "IBC 2024", "UPC / IPC", "ASHRAE 90.1", "ASME B30.5"]
    f_pill = load_font(20, bold=True)
    px, py = 80, 408
    for code in codes:
        bbox = draw.textbbox((0, 0), code, font=f_pill)
        tw = bbox[2] - bbox[0]
        pw = tw + 34
        draw.rounded_rectangle([(px, py), (px + pw, py + 44)], radius=10, fill=(19, 29, 49), outline=(245, 158, 11), width=2)
        draw.text((px + 17, py + 9), code, fill=(245, 158, 11), font=f_pill)
        px += pw + 14

    # Bottom footer strip
    f_foot = load_font(22, bold=False)
    draw.text((80, 520), "Cranes • EV Fleets • Grease Traps • Stormwater • Cold Storage • Wells • Racking • Spray Foam", fill=(100, 116, 139), font=f_foot)

    img.save(out_path, "PNG", optimize=True)
    print(f"Generated {out_path} ({W}x{H})")


def update_core_html():
    seo_start = "<!-- SEO_ENHANCEMENTS_START -->"
    seo_end = "<!-- SEO_ENHANCEMENTS_END -->"

    for tool, meta in CORE_SEO.items():
        html_path = ROOT / tool / "index.html" if tool else ROOT / "index.html"
        txt = html_path.read_text(encoding="utf-8")

        # 1. Replace <title>
        txt = re.sub(r"<title>.*?</title>", f"<title>{meta['title']}</title>", txt, count=1, flags=re.S)

        # 2. Replace <meta name="description">
        txt = re.sub(
            r'<meta\s+name="description"\s+content=".*?">',
            f'<meta name="description" content="{meta["desc"]}">',
            txt,
            count=1,
            flags=re.S,
        )

        # 3. Build favicon + OG image + extra JSON-LD block
        fav_href = "favicon.svg" if tool == "" else "../favicon.svg"
        extra_schemas = []

        if tool == "":
            org_ld = {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "TradeSpec Pro™",
                "url": f"{BASE_URL}/",
                "logo": OG_IMAGE_URL,
                "description": "Engineering-grade commercial contractor sizing calculators and state building code reference guides."
            }
            site_ld = {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "TradeSpec Pro",
                "alternateName": "TradeSpec Pro™",
                "url": f"{BASE_URL}/"
            }
            extra_schemas.append(org_ld)
            extra_schemas.append(site_ld)
        else:
            bc_ld = {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {"@type": "ListItem", "position": 1, "name": "TradeSpec Pro", "item": f"{BASE_URL}/"},
                    {"@type": "ListItem", "position": 2, "name": meta["name"], "item": f"{BASE_URL}/{tool}/"}
                ]
            }
            extra_schemas.append(bc_ld)

        schema_tags = "\n".join(
            f'  <script type="application/ld+json">\n{json.dumps(s, indent=2)}\n  </script>'
            for s in extra_schemas
        )

        seo_block = f"""{seo_start}
  <link rel="icon" type="image/svg+xml" href="{fav_href}">
  <meta property="og:image" content="{OG_IMAGE_URL}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:image" content="{OG_IMAGE_URL}">
{schema_tags}
  {seo_end}"""

        pattern = re.compile(re.escape(seo_start) + r".*?" + re.escape(seo_end), re.DOTALL)
        if pattern.search(txt):
            txt = pattern.sub(seo_block, txt)
        else:
            head_close = txt.find("</head>")
            if head_close != -1:
                txt = txt[:head_close] + "  " + seo_block + "\n" + txt[head_close:]

        # 4. Inject sibling calculator cross-link hub into the 5 orphaned tools
        if tool in ORPHAN_TOOLS:
            sib_start = "<!-- SIBLING_TOOLS_HUB_START -->"
            sib_end = "<!-- SIBLING_TOOLS_HUB_END -->"

            cards = []
            for other_slug, other_meta in CORE_SEO.items():
                if not other_slug or other_slug == tool:
                    continue
                cards.append(
                    f'          <a href="../{other_slug}/" style="display:block;padding:0.75rem 0.95rem;background:rgba(19,29,49,0.9);border:1px solid rgba(255,255,255,0.1);border-radius:8px;text-decoration:none;color:#f8fafc;font-size:0.86rem;font-weight:600;">⚡ {other_meta["short"]}™ &mdash; {other_meta["name"].replace(" Calculator", "")}</a>'
                )

            sib_block = f"""{sib_start}
  <section class="container" style="margin:2rem auto;padding:1.4rem 1.5rem;background:rgba(15,23,42,0.8);border:1px solid rgba(255,255,255,0.1);border-radius:14px;">
    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.75rem;margin-bottom:1rem;">
      <div>
        <span style="display:inline-block;font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.07em;color:#38bdf8;">TradeSpec Pro™ Engineering Suite</span>
        <h2 style="font-size:1.25rem;font-weight:800;margin:0.15rem 0 0;color:#f8fafc;">Explore All 9 Commercial Sizing Calculators</h2>
      </div>
      <a href="../" style="color:#38bdf8;font-size:0.88rem;font-weight:700;text-decoration:none;">&larr; All Tools Home</a>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:0.7rem;">
{chr(10).join(cards)}
    </div>
  </section>
  {sib_end}"""

            sib_pat = re.compile(re.escape(sib_start) + r".*?" + re.escape(sib_end), re.DOTALL)
            if sib_pat.search(txt):
                txt = sib_pat.sub(sib_block, txt)
            else:
                footer_idx = txt.rfind("<footer")
                if footer_idx != -1:
                    txt = txt[:footer_idx] + sib_block + "\n\n  " + txt[footer_idx:]

        html_path.write_text(txt, encoding="utf-8")
        print(f"Updated SEO & schema in {html_path.relative_to(ROOT)}")


if __name__ == "__main__":
    generate_og_image()
    update_core_html()
