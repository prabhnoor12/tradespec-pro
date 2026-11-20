import json
import re
import sys
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "scripts"))
from pseo_data import PAGES

errors = 0

# 1. Verify sitemap.xml
try:
    tree = ET.parse(ROOT / "sitemap.xml")
    urls = tree.findall(".//{http://www.sitemaps.org/schemas/sitemap/0.9}loc")
    print(f"Sitemap XML valid! Total URLs: {len(urls)}")
except Exception as e:
    print(f"INVALID SITEMAP XML: {e}")
    errors += 1

# 2. Verify shared assets exist
for asset in ["css/code-guide.css", "js/code-guide-calc.js"]:
    if not (ROOT / asset).exists():
        print(f"MISSING ASSET: {asset}")
        errors += 1

# 3. Verify every pSEO page
for p in PAGES:
    f = ROOT / p["tool"] / p["slug"] / "index.html"
    if not f.exists():
        print(f"MISSING PAGE: {f}")
        errors += 1
        continue
    txt = f.read_text(encoding="utf-8")
    ld_blocks = re.findall(r'<script type="application/ld\+json">\s*(.*?)\s*</script>', txt, re.S)
    if len(ld_blocks) != 3:
        print(f"BAD LD COUNT in {f}: {len(ld_blocks)}")
        errors += 1
    for idx, b in enumerate(ld_blocks):
        try:
            obj = json.loads(b)
            if "@type" not in obj:
                print(f"MISSING @type in block {idx} of {f}")
                errors += 1
        except Exception as e:
            print(f"INVALID JSON-LD block {idx} in {f}: {e}")
            errors += 1
    if 'id="jurisdictionQuickCalc"' not in txt:
        print(f"MISSING QUICK CALC in {f}")
        errors += 1
    if f'rel="canonical" href="https://prabhnoor12.github.io/tradespec-pro/{p["tool"]}/{p["slug"]}/"' not in txt:
        print(f"BAD CANONICAL in {f}")
        errors += 1

print(f"Verification complete across {len(PAGES)} pages. Total errors: {errors}")
sys.exit(1 if errors else 0)
