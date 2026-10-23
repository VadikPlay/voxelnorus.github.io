"""Professional WooCommerce Catalog Scraper & Excel Exporter for OrbitDev.

Target: Maximum.md (Moldova's leading tech retailer)
Extracts: SKU, Titlu produs, Preț (MDL), Categorie, URL Imagine, Link sursă.
Output: c:\\Users\\vadim\\Desktop\\Claude code-free\\Demo_Catalog_WooCommerce_OrbitDev.xlsx
"""

from __future__ import annotations

import logging
import re
import sys
from pathlib import Path
from typing import TypedDict

if sys.stdout and hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

import httpx
from bs4 import BeautifulSoup
from openpyxl import Workbook
from openpyxl.styles import Alignment, Border, Font, PatternFill, Side
from openpyxl.utils import get_column_letter

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
log = logging.getLogger("catalog_scraper")

OUTPUT_PATH = Path(r"c:\Users\vadim\Desktop\Claude code-free\Demo_Catalog_WooCommerce_OrbitDev.xlsx")

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
    ),
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "Accept-Language": "ro-MD,ro;q=0.9,en-US;q=0.8,en;q=0.7",
}

CATEGORIES = [
    {
        "name": "Smartphone-uri",
        "url": "https://maximum.md/ro/telefoane-si-gadgeturi/telefoane-si-comunicatii/smartphoneuri/",
        "limit": 30,
    },
    {
        "name": "Laptopuri",
        "url": "https://maximum.md/ro/tehnica-computerizata/laptopuri-si-computere/laptopuri/",
        "limit": 30,
    },
    {
        "name": "Ceasuri inteligente",
        "url": "https://maximum.md/ro/telefoane-si-gadgeturi/telefoane-si-comunicatii/ceasuri-inteligente/",
        "limit": 25,
    },
]


class ProductRecord(TypedDict):
    SKU: str
    Titlu_produs: str
    Pret_MDL: float
    Categorie: str
    URL_Imagine: str
    Link_sursa: str


def fetch_and_parse_category(
    client: httpx.Client,
    category_name: str,
    url: str,
    limit: int,
) -> list[ProductRecord]:
    log.info("Fetching category '%s' from %s", category_name, url)
    response = client.get(url, headers=HEADERS, timeout=20.0, follow_redirects=True)
    if response.status_code != 200:
        log.error("Failed to fetch %s, status code %d", url, response.status_code)
        return []

    soup = BeautifulSoup(response.text, "html.parser")
    items = soup.select(".product__item")
    log.info("Found %d raw product items in '%s'", len(items), category_name)

    records: list[ProductRecord] = []
    seen_ids: set[str] = set()

    for item in items:
        if len(records) >= limit:
            break

        # 1. Title and URL
        title_el = item.select_one(".product__item__title a")
        if not title_el:
            continue
        title = title_el.get_text().strip()
        href = title_el.get("href", "").strip()
        if not title or not href:
            continue

        full_url = f"https://maximum.md{href}" if href.startswith("/") else href

        # Extract numeric ID for SKU and deduplication
        sku_match = re.search(r"/(\d+)/?$", href)
        item_id = sku_match.group(1) if sku_match else None
        if not item_id or item_id in seen_ids:
            continue
        seen_ids.add(item_id)
        sku = f"ORB-MAX-{item_id}"

        # 2. Price (Must be real, non-empty, and parsed as float)
        price_el = item.select_one(".product__item__price-current span")
        if not price_el:
            price_el = item.select_one(".product__item__price-current")
        if not price_el:
            continue

        raw_price = (
            price_el.get_text()
            .replace("lei", "")
            .replace("MDL", "")
            .replace(" ", "")
            .replace("\xa0", "")
            .strip()
        )
        try:
            price_val = float(raw_price)
        except ValueError:
            continue

        if price_val <= 0:
            continue

        # 3. Product Image URL
        img_el = item.select_one(".product__item__image img")
        img_url = ""
        if img_el:
            img_url = (
                img_el.get("data-src")
                or img_el.get("src")
                or img_el.get("data-original")
                or ""
            ).strip()
            if img_url.startswith("//"):
                img_url = "https:" + img_url

        records.append(
            {
                "SKU": sku,
                "Titlu_produs": title,
                "Pret_MDL": price_val,
                "Categorie": category_name,
                "URL_Imagine": img_url,
                "Link_sursa": full_url,
            }
        )

    log.info("Extracted %d valid products for '%s'", len(records), category_name)
    return records


def build_styled_excel(records: list[ProductRecord], output_path: Path) -> None:
    wb = Workbook()
    ws = wb.active
    ws.title = "Catalog WooCommerce"

    # Styling constants with explicit 8-char ARGB colors (FF = 100% opaque)
    COLOR_HEADER_BG = "FF0F172A"    # Dark Slate Obsidian
    COLOR_HEADER_TEXT = "FFFFFFFF"  # White
    COLOR_ZEBRA = "FFF8FAFC"        # Light slate zebra
    COLOR_WHITE = "FFFFFFFF"        # Pure white
    COLOR_BORDER = "FFCBD5E1"       # Slate border
    COLOR_TEXT = "FF1E293B"         # Dark slate text
    COLOR_LINK = "FF2563EB"         # Blue link

    font_header = Font(name="Calibri", size=11, bold=True, color=COLOR_HEADER_TEXT)
    font_body = Font(name="Calibri", size=10, bold=False, color=COLOR_TEXT)
    font_bold = Font(name="Calibri", size=10, bold=True, color="FF0F172A")
    font_link = Font(name="Calibri", size=10, color=COLOR_LINK, underline="single")

    fill_header = PatternFill(start_color=COLOR_HEADER_BG, end_color=COLOR_HEADER_BG, fill_type="solid")
    fill_even = PatternFill(start_color=COLOR_WHITE, end_color=COLOR_WHITE, fill_type="solid")
    fill_odd = PatternFill(start_color=COLOR_ZEBRA, end_color=COLOR_ZEBRA, fill_type="solid")

    thin_side = Side(style="thin", color=COLOR_BORDER)
    border_cell = Border(left=thin_side, right=thin_side, top=thin_side, bottom=thin_side)

    align_center = Alignment(horizontal="center", vertical="center")
    align_left = Alignment(horizontal="left", vertical="center")
    align_right = Alignment(horizontal="right", vertical="center")

    headers = [
        "SKU",
        "Titlu produs",
        "Preț (MDL)",
        "Categorie",
        "URL Imagine",
        "Link sursă",
    ]

    # Write Header Row
    ws.append(headers)
    ws.row_dimensions[1].height = 28

    for col_idx in range(1, len(headers) + 1):
        cell = ws.cell(row=1, column=col_idx)
        cell.font = font_header
        cell.fill = fill_header
        cell.alignment = align_center
        cell.border = border_cell

    # Write Data Rows
    for row_idx, rec in enumerate(records, start=2):
        row_fill = fill_odd if (row_idx % 2 == 1) else fill_even
        ws.row_dimensions[row_idx].height = 22

        c_sku = ws.cell(row=row_idx, column=1, value=rec["SKU"])
        c_sku.font = font_bold
        c_sku.alignment = align_center

        c_title = ws.cell(row=row_idx, column=2, value=rec["Titlu_produs"])
        c_title.font = font_body
        c_title.alignment = align_left

        c_price = ws.cell(row=row_idx, column=3, value=rec["Pret_MDL"])
        c_price.font = font_bold
        c_price.alignment = align_right
        c_price.number_format = "#,##0.00"

        c_cat = ws.cell(row=row_idx, column=4, value=rec["Categorie"])
        c_cat.font = font_body
        c_cat.alignment = align_center

        c_img = ws.cell(row=row_idx, column=5, value=rec["URL_Imagine"])
        c_img.font = font_body
        c_img.alignment = align_left

        c_link = ws.cell(row=row_idx, column=6, value=rec["Link_sursa"])
        c_link.font = font_link
        c_link.alignment = align_left

        for col_idx in range(1, 7):
            cell = ws.cell(row=row_idx, column=col_idx)
            cell.fill = row_fill
            cell.border = border_cell

    # Freeze Header Row
    ws.freeze_panes = "A2"

    # Add AutoFilter
    max_col_letter = get_column_letter(len(headers))
    ws.auto_filter.ref = f"A1:{max_col_letter}{len(records) + 1}"

    # Auto-adjust column widths with safety margins
    column_widths = {
        "A": 18,  # SKU
        "B": 55,  # Titlu produs
        "C": 16,  # Preț (MDL)
        "D": 24,  # Categorie
        "E": 45,  # URL Imagine
        "F": 45,  # Link sursă
    }
    for col_letter, width in column_widths.items():
        ws.column_dimensions[col_letter].width = width

    output_path.parent.mkdir(parents=True, exist_ok=True)
    wb.save(str(output_path))
    log.info("Excel successfully saved to %s", output_path)


def main() -> None:
    all_products: list[ProductRecord] = []
    with httpx.Client() as client:
        for cat in CATEGORIES:
            prods = fetch_and_parse_category(
                client=client,
                category_name=cat["name"],
                url=cat["url"],
                limit=cat["limit"],
            )
            all_products.extend(prods)

    log.info("Total products scraped across all categories: %d", len(all_products))
    assert 50 <= len(all_products) <= 100, f"Expected 50-100 items, got {len(all_products)}"

    # Validate that no prices are empty, null, or zero
    for idx, p in enumerate(all_products):
        assert p["Pret_MDL"] > 0, f"Invalid price at row {idx}: {p}"
        assert p["Titlu_produs"], f"Empty title at row {idx}"
        assert p["URL_Imagine"].startswith("http"), f"Invalid image at row {idx}: {p['URL_Imagine']}"
        assert p["Link_sursa"].startswith("http"), f"Invalid link at row {idx}: {p['Link_sursa']}"

    build_styled_excel(all_products, OUTPUT_PATH)
    
    # Also export universal CSV (UTF-8 with BOM, WooCommerce standard)
    csv_path = OUTPUT_PATH.with_suffix(".csv")
    import csv
    with open(csv_path, "w", encoding="utf-8-sig", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(["SKU", "Titlu produs", "Preț (MDL)", "Categorie", "URL Imagine", "Link sursă"])
        for p in all_products:
            writer.writerow([p["SKU"], p["Titlu_produs"], f"{p['Pret_MDL']:.2f}", p["Categorie"], p["URL_Imagine"], p["Link_sursa"]])
    log.info("CSV successfully saved to %s", csv_path)

    # Also export interactive HTML preview (opens in any browser with 1 click)
    html_path = OUTPUT_PATH.with_suffix(".html")
    rows_html = "".join(
        f"""<tr class="border-b border-slate-800 hover:bg-slate-800/50 transition">
            <td class="p-3 font-mono text-xs text-sky-400">{p['SKU']}</td>
            <td class="p-3 font-medium text-slate-200">{p['Titlu_produs']}</td>
            <td class="p-3 font-semibold text-emerald-400 text-right">{p['Pret_MDL']:,.2f} MDL</td>
            <td class="p-3 text-slate-400">{p['Categorie']}</td>
            <td class="p-3 text-center"><a href="{p['URL_Imagine']}" target="_blank" class="text-blue-400 hover:underline text-xs">Foto</a></td>
            <td class="p-3"><a href="{p['Link_sursa']}" target="_blank" class="text-indigo-400 hover:underline text-xs">Sursa &rarr;</a></td>
        </tr>"""
        for p in all_products
    )
    html_content = f"""<!DOCTYPE html>
<html lang="ro" class="dark">
<head>
    <meta charset="UTF-8">
    <title>OrbitDev — Catalog Demo WooCommerce</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen p-8">
    <div class="max-w-7xl mx-auto space-y-6">
        <header class="flex justify-between items-center border-b border-slate-800 pb-4">
            <div>
                <h1 class="text-2xl font-bold text-sky-400">OrbitDev &bull; Catalog Demo WooCommerce</h1>
                <p class="text-sm text-slate-400">Total produse extrase: {len(all_products)} &bull; Actualizat în timp real</p>
            </div>
            <div class="space-x-3">
                <a href="Demo_Catalog_WooCommerce_OrbitDev.xlsx" class="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition shadow">Deschide Excel (.xlsx)</a>
                <a href="Demo_Catalog_WooCommerce_OrbitDev.csv" class="bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-lg text-sm font-medium transition border border-slate-700">Deschide CSV</a>
            </div>
        </header>
        <div class="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/50 shadow-2xl">
            <table class="w-full text-left text-sm">
                <thead class="bg-slate-900 text-xs uppercase text-slate-400 border-b border-slate-800">
                    <tr>
                        <th class="p-3">SKU</th>
                        <th class="p-3">Titlu Produs</th>
                        <th class="p-3 text-right">Preț (MDL)</th>
                        <th class="p-3">Categorie</th>
                        <th class="p-3 text-center">Imagine</th>
                        <th class="p-3">Link Sursă</th>
                    </tr>
                </thead>
                <tbody>
                    {rows_html}
                </tbody>
            </table>
        </div>
    </div>
</body>
</html>"""
    with open(html_path, "w", encoding="utf-8") as f:
        f.write(html_content)
    log.info("HTML preview successfully saved to %s", html_path)

    print(f"\n[SUCCESS] Successfully scraped and exported {len(all_products)} products to:")
    print(f"1. Excel: {OUTPUT_PATH}")
    print(f"2. CSV:   {csv_path}")
    print(f"3. HTML:  {html_path}")


if __name__ == "__main__":
    main()
