#!/usr/bin/env python3
"""Tambah blok `periods` ke portfolio_data.json: agregat Semua / 2025 / 2026.

Satu sumber kebenaran untuk filter periode di website. Angka dihitung dari
deals_list + monthly, lalu diverifikasi dengan assert agar tidak ada drift.
"""
import json
from pathlib import Path

ROOT = Path('/home/sya/ReynaldaSyalwa.github.io')
DATA = ROOT / 'src/data/portfolio_data.json'

d = json.loads(DATA.read_text())
lines = d['business_lines']

periods = {}
for key, years in [('all', (2025, 2026)), ('2025', (2025,)), ('2026', (2026,))]:
    deals = 0
    revenue = 0
    spend = 0
    campaigns = 0
    for line in lines:
        for deal in line['deals_list']:
            if deal['year'] in years:
                deals += 1
                revenue += deal['deal_value']
        for m in line['monthly']:
            if m['year'] in years:
                spend += m['ad_spend']
    for c in d['campaigns']:
        cyear = 2025 if '2025' in c['period'] else 2026
        if cyear in years:
            campaigns += 1

    roas = round(revenue / spend, 2) if spend else 0
    periods[key] = {
        'deals': deals,
        'revenue': revenue,
        'ad_spend': spend,
        'roas': roas,
        'avg_deal_value': round(revenue / deals) if deals else 0,
        'campaigns': campaigns,
    }

# ---- verifikasi terhadap angka yang sudah disepakati dengan SyaSya ----
assert periods['all']['deals'] == 22, periods['all']
assert periods['all']['revenue'] == 229_080_000, periods['all']
assert periods['all']['ad_spend'] == 9_934_605, periods['all']
assert periods['all']['roas'] == 23.06, periods['all']

assert periods['2025']['deals'] == 12, periods['2025']
assert periods['2025']['revenue'] == 82_904_000, periods['2025']
assert periods['2025']['ad_spend'] == 5_199_457, periods['2025']

assert periods['2026']['deals'] == 10, periods['2026']
assert periods['2026']['revenue'] == 146_176_000, periods['2026']
assert periods['2026']['ad_spend'] == 4_735_148, periods['2026']

# Meta ads agregat (untuk kartu statistik section 03)
agg = {}
for key, years in [('all', (2025, 2026)), ('2025', (2025,)), ('2026', (2026,))]:
    cs = [c for c in d['campaigns'] if (2025 if '2025' in c['period'] else 2026) in years]
    agg[key] = {
        'campaigns': len(cs),
        'spend': sum(c['amount_spent'] for c in cs),
        'reach': sum(c['reach'] for c in cs),
        'impressions': sum(c['impressions'] for c in cs),
        'chats': sum(c['results_messaging'] for c in cs),
        'link_clicks': sum(c['link_clicks'] for c in cs),
        'best_cpr': min(c['cost_per_result'] for c in cs) if cs else 0,
    }
    agg[key]['cost_per_chat'] = round(agg[key]['spend'] / agg[key]['chats']) if agg[key]['chats'] else 0

d['periods'] = periods
d['meta_ads'] = agg

DATA.write_text(json.dumps(d, ensure_ascii=False, indent=2) + '\n')

print('periods:')
for k, v in periods.items():
    print(f"  {k:>4}: {v['deals']:>2} deal · Rp {v['revenue']:>12,} · spend Rp {v['ad_spend']:>9,} · {v['roas']:>6}x · {v['campaigns']} kampanye")
print('meta_ads:')
for k, v in agg.items():
    print(f"  {k:>4}: {v['campaigns']:>2} kampanye · {v['chats']:>4} chat · {v['reach']:>7,} reach · CPR terbaik Rp {v['best_cpr']:,} · cost/chat Rp {v['cost_per_chat']:,}")
