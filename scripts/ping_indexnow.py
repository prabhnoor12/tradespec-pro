# -*- coding: utf-8 -*-
"""
TradeSpec Pro™ — Automated IndexNow Instant Indexing Ping
Reads all URLs from sitemap.xml and submits them to Bing, DuckDuckGo,
Yandex, and ChatGPT Search via https://api.indexnow.org/indexnow.

Usage:
  python scripts/ping_indexnow.py              # Ping live URLs from sitemap.xml
  python scripts/ping_indexnow.py --dry-run    # Preview payload without sending
"""

import json
import sys
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
INDEXNOW_KEY = "a7f3c91e4b2d8056f1e9a4c2d8b73e10"


def main():
    dry_run = "--dry-run" in sys.argv
    tree = ET.parse(ROOT / "sitemap.xml")
    urls = [el.text.strip() for el in tree.findall(".//{http://www.sitemaps.org/schemas/sitemap/0.9}loc") if el.text]

    if not urls:
        print("No URLs found in sitemap.xml.")
        return

    parsed = urllib.parse.urlparse(urls[0])
    host = parsed.netloc
    # Support both custom root domain (https://domain.com/) and GitHub Pages subpath
    base_prefix = urls[0].rstrip("/")
    key_location = f"{base_prefix}/{INDEXNOW_KEY}.txt"

    payload = {
        "host": host,
        "key": INDEXNOW_KEY,
        "keyLocation": key_location,
        "urlList": urls,
    }

    print(f"IndexNow Host: {host}")
    print(f"Key Location : {key_location}")
    print(f"Total URLs   : {len(urls)}")

    if dry_run:
        print("\n[DRY RUN] Payload ready. Run without --dry-run after deploying to ping IndexNow.")
        return

    req = urllib.request.Request(
        "https://api.indexnow.org/indexnow",
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json; charset=utf-8"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            print(f"IndexNow Ping Success! HTTP {resp.status} ({len(urls)} URLs submitted)")
    except urllib.error.HTTPError as e:
        print(f"IndexNow HTTP {e.code}: {e.read().decode('utf-8', errors='ignore')}")
    except Exception as e:
        print(f"IndexNow Error: {e}")


if __name__ == "__main__":
    main()
