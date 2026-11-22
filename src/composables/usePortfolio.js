import { ref, computed } from 'vue'
import data from '../data/portfolio_data.json'

/**
 * Shared portfolio state — dipakai lintas komponen:
 * BusinessLineSwitcher, IncomeChartSection, DealsTableSection, MetaAdsSection.
 * Modul-scope ref() => semua komponen membaca state yang sama.
 */

export const ACTIVE_LINE = ref('all')     // 'all' | 'iso' | 'iwash'
export const YEAR_FILTER = ref('all')     // 'all' | 2025 | 2026

export const PORTFOLIO = data
export const TOTALS = data.totals
export const LINES = data.business_lines
export const CAMPAIGNS = data.campaigns
export const IWASH_CAMPAIGNS = data.iwash_campaigns

export const LINE_BY_ID = Object.fromEntries(LINES.map(l => [l.id, l]))

/** Baris bisnis aktif sebagai array (all => semua). */
export const activeLines = computed(() =>
  ACTIVE_LINE.value === 'all' ? LINES : [LINE_BY_ID[ACTIVE_LINE.value]].filter(Boolean)
)

/** Agregat sesuai tab aktif. */
export const activeTotals = computed(() => {
  if (ACTIVE_LINE.value === 'all') return TOTALS
  const l = LINE_BY_ID[ACTIVE_LINE.value]
  return { deals: l.deals, revenue: l.revenue, ad_spend: l.ad_spend, roas: l.roas }
})

/** Seri bulanan gabungan/per-lini, difilter tahun. */
export const monthlySeries = computed(() => {
  const map = new Map()
  for (const line of activeLines.value) {
    for (const m of line.monthly) {
      if (YEAR_FILTER.value !== 'all' && m.year !== YEAR_FILTER.value) continue
      const cur = map.get(m.period) || {
        period: m.period,
        year: m.year,
        label_id: m.label_id,
        label_en: m.label_en,
        short_id: m.short_id,
        short_en: m.short_en,
        ad_spend: 0,
        revenue: 0
      }
      cur.ad_spend += m.ad_spend
      cur.revenue += m.revenue
      map.set(m.period, cur)
    }
  }
  return [...map.values()].sort((a, b) => a.period.localeCompare(b.period))
})

/** Daftar deal sesuai tab + filter tahun, sudah dikelompokkan per bulan. */
export const groupedDeals = computed(() => {
  const rows = []
  for (const line of activeLines.value) {
    for (const d of line.deals_list) {
      if (YEAR_FILTER.value !== 'all' && d.year !== YEAR_FILTER.value) continue
      rows.push({ ...d, line: line.id })
    }
  }
  rows.sort((a, b) => a.period.localeCompare(b.period) || b.deal_value - a.deal_value)

  const groups = []
  for (const row of rows) {
    const last = groups[groups.length - 1]
    if (last && last.period === row.period) {
      last.rows.push(row)
      last.total += row.deal_value
    } else {
      groups.push({ period: row.period, month_label: row.month_label, rows: [row], total: row.deal_value })
    }
  }
  return groups
})

export const allDealRows = computed(() => groupedDeals.value.flatMap(g => g.rows))

/** Ringkasan yang mengikuti filter tabel. */
export const filteredSummary = computed(() => {
  const rows = allDealRows.value
  const revenue = rows.reduce((s, r) => s + r.deal_value, 0)
  const spend = monthlySeries.value.reduce((s, m) => s + m.ad_spend, 0)
  return {
    deals: rows.length,
    revenue,
    ad_spend: spend,
    roas: spend > 0 ? +(revenue / spend).toFixed(2) : 0
  }
})

/** Kampanye Meta ISO, difilter tahun. */
export const filteredCampaigns = computed(() =>
  YEAR_FILTER.value === 'all'
    ? CAMPAIGNS
    : CAMPAIGNS.filter(c => c.period.includes(String(YEAR_FILTER.value)))
)

/* ── formatters ───────────────────────────────────────────────────────────── */

export function formatIDR(value) {
  return 'Rp ' + Number(value).toLocaleString('id-ID')
}

/** 229_080_000 -> "229,1" (id) / "229.1" (en); digits=2 -> "8,75" */
export function jutaStr(value, locale = 'id', digits = 1) {
  const v = (value / 1_000_000).toFixed(digits)
  return locale === 'id' ? v.replace('.', ',') : v
}

/** 229_080_000 -> "229,08" (juta) untuk locale id, "229.08" (M) untuk en */
export function formatJuta(value, locale = 'id') {
  const jt = value / 1_000_000
  const s = jt.toLocaleString(locale === 'id' ? 'id-ID' : 'en-US', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  })
  return s
}

export function centsToParts(value, locale = 'id') {
  return formatJuta(value, locale)
}
