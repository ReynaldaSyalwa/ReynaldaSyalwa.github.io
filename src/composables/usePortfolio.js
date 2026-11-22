import { ref, computed } from 'vue'
import data from '../data/portfolio_data.json'

/**
 * State global portofolio.
 *
 * Filter sekarang HANYA periode (Semua / 2025 / 2026) — sesuai permintaan
 * SyaSya: sebelumnya ada dua lapis filter (baris bisnis + periode) yang
 * membuat pembaca bingung harus mulai membaca dari mana.
 */
export const PERIOD = ref('all')   // 'all' | '2025' | '2026'

export const PORTFOLIO = data
export const PERIODS = data.periods
export const META_ADS = data.meta_ads
export const LINES = data.business_lines
export const LINE_BY_ID = Object.fromEntries(LINES.map(l => [l.id, l]))

/* ── agregat periode aktif ─────────────────────────────────────────── */

export const activePeriod = computed(() => PERIODS[PERIOD.value] || PERIODS.all)
export const activeMeta = computed(() => META_ADS[PERIOD.value] || META_ADS.all)

/* ── seri bulanan (semua lini digabung) ────────────────────────────── */

export const monthlySeries = computed(() => {
  const map = new Map()
  for (const line of LINES) {
    for (const m of line.monthly) {
      if (PERIOD.value !== 'all' && m.year !== Number(PERIOD.value)) continue
      const cur = map.get(m.period) || {
        period: m.period,
        year: m.year,
        label_id: m.label_id,
        label_en: m.label_en,
        short_id: m.short_id,
        short_en: m.short_en,
        ad_spend: 0,
        revenue: 0,
      }
      cur.ad_spend += m.ad_spend
      cur.revenue += m.revenue
      map.set(m.period, cur)
    }
  }
  return [...map.values()].sort((a, b) => a.period.localeCompare(b.period))
})

/* ── daftar deal, dikelompokkan per bulan ──────────────────────────── */

export const groupedDeals = computed(() => {
  const rows = []
  for (const line of LINES) {
    for (const d of line.deals_list) {
      if (PERIOD.value !== 'all' && d.year !== Number(PERIOD.value)) continue
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
      groups.push({
        period: row.period,
        month_label: row.month_label,
        rows: [row],
        total: row.deal_value,
      })
    }
  }
  return groups
})

export const allDealRows = computed(() => groupedDeals.value.flatMap(g => g.rows))

/* ── kampanye Meta (ISO) difilter periode ──────────────────────────── */

export const filteredCampaigns = computed(() =>
  PERIOD.value === 'all'
    ? PORTFOLIO.campaigns
    : PORTFOLIO.campaigns.filter(c => c.period.includes(PERIOD.value))
)

/* ── galeri karya ──────────────────────────────────────────────────── */

export const FLYERS = [
  { file: '01_nsm_midyear_sale', brand: 'iso', title_id: 'Mid Year Sale — Sertifikasi ISO', title_en: 'Mid Year Sale — ISO Certification', tag_id: 'Promo musiman', tag_en: 'Seasonal promo' },
  { file: '02_nsm_dapur_mbg_iso', brand: 'iso', title_id: 'Dapur MBG — Cegah Keracunan Massal', title_en: 'MBG Kitchen — Prevent Mass Poisoning', tag_id: 'Edukasi regulasi', tag_en: 'Regulatory education' },
  { file: '03_nsm_endyear_sale_12pct', brand: 'iso', title_id: 'Endyear Sale — Diskon 12%', title_en: 'Endyear Sale — 12% Off', tag_id: 'Promo musiman', tag_en: 'Seasonal promo' },
  { file: '04_nsm_bundling_iso', brand: 'iso', title_id: 'Paket Bundling ISO 9001 + 14001 + 45001', title_en: 'ISO Bundling Package 9001 + 14001 + 45001', tag_id: 'Penawaran paket', tag_en: 'Bundle offer' },
  { file: '05_nsm_kemerdekaan', brand: 'iso', title_id: 'Promo Spesial Kemerdekaan', title_en: 'Independence Day Special', tag_id: 'Promo musiman', tag_en: 'Seasonal promo' },
  { file: '06_nsm_iso_dapur_mbg_kemerdekaan', brand: 'iso', title_id: 'Dapur MBG — Halal + ISO + HACCP', title_en: 'MBG Kitchen — Halal + ISO + HACCP', tag_id: 'Edukasi regulasi', tag_en: 'Regulatory education' },
  { file: '01_iwash_valentine_14pct_feb2025', brand: 'iwash', title_id: 'Valentine Days — Diskon 14%', title_en: 'Valentine Days — 14% Off', tag_id: 'Promo musiman', tag_en: 'Seasonal promo' },
  { file: '02_iwash_ramadhan_mar2025', brand: 'iwash', title_id: 'Promo Ramadhan — Deep Cleaning', title_en: 'Ramadan Promo — Deep Cleaning', tag_id: 'Promo musiman', tag_en: 'Seasonal promo' },
  { file: '03_iwash_christmas_15pct_dec2025', brand: 'iwash', title_id: 'Christmas — Diskon 15%', title_en: 'Christmas — 15% Off', tag_id: 'Promo musiman', tag_en: 'Seasonal promo' },
  { file: '04_iwash_why_choose_us', brand: 'iwash', title_id: 'Kenapa Pilih Iwash Indonesia', title_en: 'Why Choose Iwash Indonesia', tag_id: 'Awareness', tag_en: 'Awareness' },
  { file: '05_iwash_diskon15_batik', brand: 'iwash', title_id: 'Diskon 15% — Edisi Batik', title_en: '15% Off — Batik Edition', tag_id: 'Promo musiman', tag_en: 'Seasonal promo' },
]

export const VIDEOS = [
  { file: '01_iso_promo_v1', poster: '01_iso_promo_v1_mid', brand: 'iso', ratio: '9:16', duration: '0:40', title_id: 'Sertifikasi ISO — Risiko yang Bisa Dicegah', title_en: 'ISO Certification — Preventable Risks' },
  { file: '02_iso_promo_v2', poster: '02_iso_promo_v2_mid', brand: 'iso', ratio: '4:5', duration: '0:16', title_id: 'Rapat Koordinasi Klien', title_en: 'Client Coordination Meeting' },
  { file: '03_iso_promo_v3_mbg', poster: '03_iso_promo_v3_mbg_mid', brand: 'iso', ratio: '9:16', duration: '0:36', title_id: 'Dapur MBG — Standar Wajib', title_en: 'MBG Kitchen — Mandatory Standards' },
  { file: '04_iwash_valentine_2025', poster: '04_iwash_valentine_2025_mid', brand: 'iwash', ratio: '9:16', duration: '0:16', title_id: 'Valentine — Cuci Sofa & Kasur', title_en: 'Valentine — Sofa & Mattress Cleaning' },
  { file: '05_iwash_puasa_2025', poster: '05_iwash_puasa_2025_mid', brand: 'iwash', ratio: '9:16', duration: '0:27', title_id: 'Testimoni Puasa — Bisa Cuci Sofa & Kasur', title_en: 'Ramadan Testimonial — Sofa & Mattress' },
  { file: '06_iwash_hut_surabaya_2025', poster: '06_iwash_hut_surabaya_2025_mid', brand: 'iwash', ratio: '9:16', duration: '0:23', title_id: 'HUT Surabaya — Di Balik Outlet Iwash', title_en: 'Surabaya Anniversary — Inside Iwash' },
  { file: '07_hut_kantor', poster: '07_hut_kantor_mid', brand: 'iso', ratio: '16:9', duration: '2:05', title_id: 'Ucapan HUT ACM ke-15', title_en: 'ACM 15th Anniversary Message' },
]

/* ── formatter ─────────────────────────────────────────────────────── */

export function formatIDR(value) {
  return 'Rp ' + Number(value).toLocaleString('id-ID')
}

/** 229_080_000 -> "229,1" (id) / "229.1" (en); digits=2 -> "8,75" */
export function jutaStr(value, locale = 'id', digits = 1) {
  const v = (value / 1_000_000).toFixed(digits)
  return locale === 'id' ? v.replace('.', ',') : v
}

/** 218_070 -> "218,1 rb" */
export function ribuStr(value, locale = 'id') {
  const v = (value / 1_000).toFixed(0)
  return locale === 'id'
    ? Number(v).toLocaleString('id-ID') + ' rb'
    : Number(v).toLocaleString('en-US') + 'K'
}

export function compactNum(value, locale = 'id') {
  if (value >= 1_000_000) return jutaStr(value, locale, 1) + (locale === 'id' ? ' Jt' : 'M')
  if (value >= 1_000) return ribuStr(value, locale)
  return String(value)
}

/**
 * ROAS dengan pemisah desimal sesuai locale.
 * 23.06 -> "23,06" (id) / "23.06" (en)
 * Aturan situs: SEMUA angka desimal pakai koma di locale id.
 */
export function roasStr(value, locale = 'id', digits = 2) {
  const v = Number(value).toFixed(digits)
  return locale === 'id' ? v.replace('.', ',') : v
}
