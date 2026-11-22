#!/usr/bin/env python3
"""
Generator dataset portofolio Reynalda Syalwa.
Sumber: Data_klien_ads_2026_untuk_keperluan_portofolio.xlsx + REKAP_IKLAN_IWASH.xlsx
Output: src/data/portfolio_data.json

Jalankan: python3 scripts/generate_portfolio_data.py
"""
import json, re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "src" / "data" / "portfolio_data.json"

# ── ISO / NSM deals (nama institusi → tampil penuh) ────────────────────────────
ISO_DEALS = [
    ("2025-01", "Januari 2025", 2025, "Law Firm AS & Partner", "Konsultasi & Sertifikasi ISO", 5_550_000),
    ("2025-07", "Juli 2025", 2025, "PT. Tunas Karya Sulawesi", "Sertifikasi ISO", 18_870_000),
    ("2025-11", "November 2025", 2025, "Yayasan KPM Hadist (Dapur SPPG)", "Sertifikasi ISO Pangan", 9_990_000),
    ("2025-11", "November 2025", 2025, "CV. Hypnosis Indonesia", "Sertifikasi ISO", 8_658_000),
    ("2025-11", "November 2025", 2025, "Yayasan Nurul Anwar (Dapur SPPG)", "Sertifikasi ISO Pangan", 6_660_000),
    ("2025-12", "Desember 2025", 2025, "Yayasan Al-barokah (Dapur SPPG)", "Paket Sertifikasi Institusional", 31_080_000),
    ("2026-01", "Januari 2026", 2026, "PT. Adipati Karya Group", "Penawaran & Sertifikasi ISO", 5_000_000),
    ("2026-05", "Mei 2026", 2026, "PT. Plaza Medis Indonesia (NSM)", "Sertifikasi NSM", 6_660_000),
    ("2026-05", "Mei 2026", 2026, "PT. Plaza Medis Indonesia (VRC)", "Sertifikasi VRC", 11_100_000),
    ("2026-05", "Mei 2026", 2026, "Yayasan Kemala Bhayangkari (SPPG Polresta Sidoarjo)", "Sertifikasi ISO Pangan", 27_000_000),
    ("2026-07", "Juli 2026", 2026, "Yayasan Nurul Ummah (Dapur SPPG)", "Sertifikasi NSM", 10_440_000),
    ("2026-08", "Agustus 2026", 2026, "PT. Setrum Mobil Listrik", "Sertifikasi NSM", 7_770_000),
    ("2026-08", "Agustus 2026", 2026, "CV. Maha Karya Indonesia", "Sertifikasi NSM", 13_986_000),
    ("2026-09", "September 2026", 2026, "CV. Loviona Awstin Marine", "Sertifikasi NSM", 6_500_000),
    ("2026-11", "November 2026", 2026, "PT. Mitra Intertrans Forwarding", "Sertifikasi NSM", 15_540_000),
    ("2026-12", "Desember 2026", 2026, "PT. Mitra Intertrans Forwarding", "Paket Sertifikasi Institusional", 42_180_000),
]

# ── IWASH deals (konsumen perorangan → disamarkan) ─────────────────────────────
IWASH_DEALS = [
    ("2025-02", "Imlek 2025", 2025, "Liane Darmawan", "Deep Cleaning Rumah", 835_000),
    ("2025-03", "Ramadhan 2025", 2025, "Bu Yuke", "Cleaning Service", 300_000),
    ("2025-03", "Ramadhan 2025", 2025, "Sylla", "Cleaning Service", 140_000),
    ("2025-03", "Ramadhan 2025", 2025, "Enggar", "Cleaning Service", 295_000),
    ("2025-05", "HUT Surabaya 2025", 2025, "Susan", "Cleaning Service", 126_000),
    ("2025-05", "HUT Surabaya 2025", 2025, "Ibu Ferrah", "Deep Cleaning", 400_000),
]

# ── Ad spend ISO (Rupiah) ──────────────────────────────────────────────────────
ISO_SPEND = {
    "2025-01": 654_790, "2025-02": 506_000, "2025-03": 365_000,
    "2025-06": 511_721, "2025-07": 566_207, "2025-08": 405_406,
    "2025-09": 541_374, "2025-10": 352_528, "2025-11": 407_602, "2025-12": 328_468,
    "2026-01": 258_160, "2026-02": 507_219, "2026-03": 155_620, "2026-04": 486_333,
    "2026-05": 740_000, "2026-06": 176_428, "2026-07": 214_960, "2026-08": 396_799,
    "2026-09": 401_130, "2026-10": 498_499, "2026-11": 400_000, "2026-12": 500_000,
}

IWASH_SPEND = {"2025-02": 88_263, "2025-03": 272_098, "2025-05": 200_000}

IWASH_CAMPAIGNS = [
    {"moment": "Imlek", "moment_id": "Imlek 2025", "moment_en": "Lunar New Year 2025",
     "period": "2025-02", "ad_spend": 88_263, "leads": 13, "results": 1, "revenue": 835_000},
    {"moment": "Ramadhan Batch 1", "moment_id": "Ramadhan Batch 1", "moment_en": "Ramadan Batch 1",
     "period": "2025-03", "ad_spend": 272_098, "leads": 8, "results": 3, "revenue": 735_000},
    {"moment": "HUT Surabaya", "moment_id": "HUT Surabaya", "moment_en": "Surabaya Anniversary",
     "period": "2025-05", "ad_spend": 200_000, "leads": 18, "results": 2, "revenue": 526_000},
]

MONTH_ID = {
    "01": "Januari", "02": "Februari", "03": "Maret", "04": "April", "05": "Mei", "06": "Juni",
    "07": "Juli", "08": "Agustus", "09": "September", "10": "Oktober", "11": "November", "12": "Desember",
}
MONTH_EN = {
    "01": "Jan", "02": "Feb", "03": "Mar", "04": "Apr", "05": "May", "06": "Jun",
    "07": "Jul", "08": "Aug", "09": "Sep", "10": "Oct", "11": "Nov", "12": "Dec",
}

PRIVATE_MARKERS = ("ibu ", "bu ", "pak ", "bapak ", "mas ", "bang ")


def mask_person(name: str) -> str:
    """Liane Darmawan -> L**** D*******  (panjang nama tetap terjaga)"""
    parts = [p for p in re.split(r"\s+", name.strip()) if p]
    out = []
    for p in parts:
        core = p.rstrip(".")
        if len(core) <= 1:
            out.append(core + "***")
        else:
            out.append(core[0] + "*" * (len(core) - 1))
    return " ".join(out)


def build_line(line_id, deals, spend):
    rows = []
    for period, label, year, client, service, value in deals:
        rows.append({
            "period": period,
            "month_label": label,
            "year": year,
            "client": mask_person(client) if line_id == "iwash" else client,
            "client_full_masked": mask_person(client),
            "service": service,
            "deal_value": value,
        })
    rev_by_month = {}
    for period, _, _, _, _, value in deals:
        rev_by_month[period] = rev_by_month.get(period, 0) + value

    monthly = []
    for period in sorted(set(spend) | set(rev_by_month)):
        y, m = period.split("-")
        monthly.append({
            "period": period,
            "year": int(y),
            "label_id": f"{MONTH_ID[m]} {y}",
            "label_en": f"{MONTH_EN[m]} {y}",
            "short_id": f"{MONTH_ID[m][:3]} {y}",
            "short_en": f"{MONTH_EN[m]} {y}",
            "ad_spend": spend.get(period, 0),
            "revenue": rev_by_month.get(period, 0),
            "has_campaign": period in spend,
        })

    revenue = sum(v for *_, v in deals)
    ad_spend = sum(spend.values())
    return {
        "id": line_id,
        "deals": len(deals),
        "revenue": revenue,
        "ad_spend": ad_spend,
        "roas": round(revenue / ad_spend, 2),
        "deals_list": rows,
        "monthly": monthly,
    }


def main():
    iso = build_line("iso", ISO_DEALS, ISO_SPEND)
    iwash = build_line("iwash", IWASH_DEALS, IWASH_SPEND)

    totals = {
        "deals": iso["deals"] + iwash["deals"],
        "revenue": iso["revenue"] + iwash["revenue"],
        "ad_spend": iso["ad_spend"] + iwash["ad_spend"],
    }
    totals["roas"] = round(totals["revenue"] / totals["ad_spend"], 2)
    totals["avg_deal_value"] = round(totals["revenue"] / totals["deals"])

    # ── preserved campaign-level Meta Ads data (27 kampanye) ──────────────────
    # Bila file legacy masih ada pakai itu; jika tidak, pertahankan campaigns
    # dari portfolio_data.json yang sudah ada agar generator tetap reproducible.
    legacy_path = ROOT / "src" / "data" / "meta_ads_and_deals.json"
    if legacy_path.exists():
        campaigns = json.loads(legacy_path.read_text())["monthly_ad_performance"]
    else:
        campaigns = json.loads(OUT.read_text())["campaigns"]

    data = {
        "meta": {
            "currency": "IDR",
            "updated": "2026-11-22",
            "period": "2025-01 .. 2026-12",
            "sources": [
                "Data_klien_ads_2026_untuk_keperluan_portofolio.xlsx",
                "REKAP_IKLAN_IWASH.xlsx",
            ],
            "notes": [
                "Nama konsumen IWASH disamarkan (inisial), nama PT/Yayasan tampil penuh.",
                "Nomor telepon tidak pernah dipublikasikan.",
                "Ad spend ISO April & Mei 2025 tidak tercatat pada file sumber.",
            ],
        },
        "totals": totals,
        "business_lines": [iso, iwash],
        "campaigns": campaigns,
        "iwash_campaigns": IWASH_CAMPAIGNS,
    }

    # ── guard: pastikan total cocok ───────────────────────────────────────────
    assert iso["revenue"] == 226_984_000, iso["revenue"]
    assert iso["deals"] == 16
    assert iwash["revenue"] == 2_096_000
    assert totals["revenue"] == 229_080_000, totals["revenue"]
    assert totals["ad_spend"] == iso["ad_spend"] + 560_361
    assert len(campaigns) == 27

    OUT.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n")
    print(f"✓ {OUT.relative_to(ROOT)}")
    print(f"  ISO   : {iso['deals']} deals | Rp {iso['revenue']:,} | ROAS {iso['roas']}x")
    print(f"  IWASH : {iwash['deals']} deals | Rp {iwash['revenue']:,} | ROAS {iwash['roas']}x")
    print(f"  TOTAL : {totals['deals']} deals | Rp {totals['revenue']:,} | ROAS {totals['roas']}x")
    print(f"  Monthly series: ISO {len(iso['monthly'])} bulan, IWASH {len(iwash['monthly'])} bulan")
    print(f"  Campaigns: {len(campaigns)} Meta + {len(IWASH_CAMPAIGNS)} IWASH")


if __name__ == "__main__":
    main()
