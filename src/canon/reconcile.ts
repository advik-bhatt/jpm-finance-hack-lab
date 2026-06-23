// Canon — deterministic, finance-aware reconciliation engine.
//
// This is the moat, not the model. The LLM's job ends at turning a messy document
// into structured fields; the money-math lives here, in deterministic code a bank
// can audit line by line. No LLM call decides whether two numbers "match" — these
// comparators do, with finance-aware tolerances and normalization.

import type { Break, DemoCase, ExtractedField, FieldKind, Severity } from './types.ts'

const MONTHS: Record<string, number> = {
  jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6,
  jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12,
}

// ---- normalizers -----------------------------------------------------------

// Parse many human date formats to an ISO yyyy-mm-dd, so "January 15, 2025",
// "15 Jan 2025", "01/15/2025" and "2025-01-15" all canonicalize identically.
export function normalizeDate(raw: string): string | null {
  const s = raw.trim()
  let m = s.match(/(\d{4})-(\d{2})-(\d{2})/)
  if (m) return `${m[1]}-${m[2]}-${m[3]}`
  m = s.match(/([A-Za-z]+)\.?\s+(\d{1,2}),?\s+(\d{4})/) // January 15, 2025
  if (m) {
    const mo = MONTHS[m[1].slice(0, 3).toLowerCase()]
    if (mo) return `${m[3]}-${pad(mo)}-${pad(+m[2])}`
  }
  m = s.match(/(\d{1,2})\s+([A-Za-z]+)\.?\s+(\d{4})/) // 15 Jan 2025
  if (m) {
    const mo = MONTHS[m[2].slice(0, 3).toLowerCase()]
    if (mo) return `${m[3]}-${pad(mo)}-${pad(+m[1])}`
  }
  m = s.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/) // 01/15/2025 (US)
  if (m) return `${m[3]}-${pad(+m[1])}-${pad(+m[2])}`
  return null
}

// "3.52% per annum" -> 3.52 ; "ACT/360" stays null
export function parseRate(raw: string): number | null {
  const m = raw.replace(/,/g, '').match(/-?\d+(\.\d+)?/)
  return m ? parseFloat(m[0]) : null
}

// "USD 50,000,000" / "$50,000,000.00" -> 50000000
export function parseCurrency(raw: string): number | null {
  const m = raw.replace(/[, ]/g, '').match(/-?\d+(\.\d+)?/)
  return m ? parseFloat(m[0]) : null
}

// "1-for-8", "1:8", "1 for 8", "8" -> 8 (the consolidation denominator)
export function parseRatio(raw: string): number | null {
  const m = raw.match(/(\d+(?:\.\d+)?)\s*(?:[-:]|for|to|x)\s*(\d+(?:\.\d+)?)/i)
  if (m) return parseFloat(m[2]) / parseFloat(m[1])
  const single = raw.replace(/,/g, '').match(/\d+(\.\d+)?/)
  return single ? parseFloat(single[0]) : null
}

function pad(n: number): string {
  return String(n).padStart(2, '0')
}

function daysBetween(isoA: string, isoB: string): number {
  return Math.round(
    Math.abs(Date.parse(isoA) - Date.parse(isoB)) / 86_400_000,
  )
}

function fmtUsd(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `$${Math.round(n / 1_000)}K`
  return `$${Math.round(n)}`
}

// ---- per-field comparators -------------------------------------------------
// Each returns { matched, severity, impactUsd, impactLabel, cause } for one field.

type Verdict = {
  matched: boolean
  severity: Severity
  impactUsd: number | null
  impactLabel: string
  cause: string
  normA: string
  normB: string
}

function compare(
  kind: FieldKind,
  a: string,
  b: string,
  ctx: DemoCase['context'],
): Verdict {
  switch (kind) {
    case 'date': {
      const na = normalizeDate(a)
      const nb = normalizeDate(b)
      const normA = na ?? a
      const normB = nb ?? b
      if (na && nb && na === nb)
        return ok(normA, normB, 'Dates normalize to the same calendar day.')
      const gap = na && nb ? daysBetween(na, nb) : 1
      return {
        matched: false,
        severity: gap >= 1 ? 'high' : 'medium',
        impactUsd: null,
        impactLabel: `${gap}-day gap`,
        cause: `Date mismatch — ${gap} day(s) apart. Affects record/ex-date eligibility and accrual.`,
        normA,
        normB,
      }
    }

    case 'rate': {
      const ra = parseRate(a)
      const rb = parseRate(b)
      const normA = ra != null ? `${ra}%` : a
      const normB = rb != null ? `${rb}%` : b
      if (ra == null || rb == null) return enumLike(a, b)
      if (Math.abs(ra - rb) < 1e-9)
        return ok(normA, normB, 'Rates match within tolerance.')
      const notional = ctx.notional ?? 0
      const years = ctx.years ?? 1
      const impact = (notional * (Math.abs(ra - rb) / 100)) * years
      // digit-transposition heuristic (e.g. 3.25 vs 3.52)
      const transposed = isTransposition(a, b)
      return {
        matched: false,
        severity: impact >= 100_000 || transposed ? 'critical' : 'high',
        impactUsd: impact || null,
        impactLabel: impact ? `${fmtUsd(impact)} over life` : '—',
        cause: transposed
          ? 'Rate mismatch — digit transposition at booking (e.g. 25 vs 52).'
          : `Rate mismatch of ${Math.abs(ra - rb).toFixed(2)}bp-equivalent on notional.`,
        normA,
        normB,
      }
    }

    case 'currency': {
      const ca = parseCurrency(a)
      const cb = parseCurrency(b)
      const normA = ca != null ? fmtUsd(ca) : a
      const normB = cb != null ? fmtUsd(cb) : b
      if (ca == null || cb == null) return enumLike(a, b)
      const tol = Math.max(ca, cb) * 0.0001 // 1bp tolerance
      if (Math.abs(ca - cb) <= tol)
        return ok(normA, normB, 'Amounts match within 1bp tolerance.')
      return {
        matched: false,
        severity: 'critical',
        impactUsd: Math.abs(ca - cb),
        impactLabel: fmtUsd(Math.abs(ca - cb)),
        cause: 'Notional / amount mismatch beyond tolerance.',
        normA,
        normB,
      }
    }

    case 'ratio': {
      // Reverse-split consolidation ratio. Denominator = shares-in per share-out.
      const da = parseRatio(a)
      const db = parseRatio(b)
      const normA = da != null ? `1-for-${trim(da)}` : a
      const normB = db != null ? `1-for-${trim(db)}` : b
      if (da == null || db == null) return enumLike(a, b)
      if (Math.abs(da - db) < 1e-9)
        return ok(normA, normB, 'Consolidation ratios match.')
      const shares = ctx.preSplitShares ?? 0
      const px = ctx.referencePrice ?? 0
      const postA = da ? shares / da : 0
      const postB = db ? shares / db : 0
      const impact = Math.abs(postA - postB) * px
      return {
        matched: false,
        severity: 'critical',
        impactUsd: impact || null,
        impactLabel: impact ? `${fmtUsd(impact)} position exposure` : '—',
        cause: `Split-ratio mismatch — applying the wrong ratio mis-states the position by ${Math.round(
          Math.abs(postA - postB),
        ).toLocaleString()} shares.`,
        normA,
        normB,
      }
    }

    case 'enum':
    case 'string':
    default:
      return enumLike(a, b)
  }
}

function enumLike(a: string, b: string): Verdict {
  const na = a.trim().toLowerCase()
  const nb = b.trim().toLowerCase()
  if (na === nb) return ok(a, b, 'Values match.')
  return {
    matched: false,
    severity: 'high',
    impactUsd: null,
    impactLabel: 'terms differ',
    cause: 'Categorical term mismatch — settlement/handling terms disagree.',
    normA: a,
    normB: b,
  }
}

function ok(normA: string, normB: string, cause: string): Verdict {
  return { matched: true, severity: 'match', impactUsd: null, impactLabel: '—', cause, normA, normB }
}

function trim(n: number): string {
  return Number.isInteger(n) ? String(n) : n.toFixed(2)
}

function isTransposition(a: string, b: string): boolean {
  const da = (a.match(/\d/g) ?? []).join('')
  const db = (b.match(/\d/g) ?? []).join('')
  if (da.length !== db.length || da === db) return false
  return [...da].sort().join('') === [...db].sort().join('')
}

const SEV_RANK: Record<Severity, number> = {
  critical: 0, high: 1, medium: 2, low: 3, match: 4,
}

// ---- the engine ------------------------------------------------------------

export function reconcile(c: DemoCase): Break[] {
  const byKey = new Map<string, ExtractedField>()
  for (const f of c.docB.fields) byKey.set(f.key, f)

  const breaks: Break[] = []
  for (const fa of c.docA.fields) {
    const fb = byKey.get(fa.key)
    if (!fb) continue
    const v = compare(fa.kind, fa.value, fb.value, c.context)
    breaks.push({
      key: fa.key,
      label: fa.label,
      kind: fa.kind,
      valueA: fa.value,
      valueB: fb.value,
      normA: v.normA,
      normB: v.normB,
      matched: v.matched,
      severity: v.severity,
      impactUsd: v.impactUsd,
      impactLabel: v.impactLabel,
      cause: v.cause,
      spanA: fa.span,
      spanB: fb.span,
      pageA: fa.page,
      pageB: fb.page,
      confidence: Math.min(fa.confidence, fb.confidence),
    })
  }

  // Severity-ranked, then by dollar exposure descending.
  breaks.sort((x, y) => {
    const s = SEV_RANK[x.severity] - SEV_RANK[y.severity]
    if (s !== 0) return s
    return (y.impactUsd ?? 0) - (x.impactUsd ?? 0)
  })
  return breaks
}

export function totalExposure(breaks: Break[]): number {
  return breaks.reduce((sum, b) => sum + (b.impactUsd ?? 0), 0)
}

export { fmtUsd }
