// Canon — core data model.
// A "canonical field" is a value extracted from a messy artifact, carrying its
// provenance (page + source span) and a confidence score. This is the unit the
// whole product is built on: AI proposes a value, but every value shows its receipts.

export type FieldKind =
  | 'string'
  | 'number'
  | 'rate'
  | 'currency'
  | 'date'
  | 'ratio'
  | 'enum'

export type ExtractedField = {
  key: string
  label: string
  kind: FieldKind
  value: string // raw extracted text, as it appears in the document
  page: number
  span: string // the exact source-span quote the value was lifted from
  confidence: number // 0..1, the model's calibrated confidence in this extraction
}

export type CanonDocument = {
  id: string
  name: string
  kind: string // e.g. "Corporate Action Notice", "Trade Confirmation"
  party: string // who produced this document
  fields: ExtractedField[]
}

export type DemoCase = {
  id: string
  label: string
  tag: string
  instrument: string
  summary: string
  docA: CanonDocument
  docB: CanonDocument
  // Inputs the deterministic engine uses to quantify dollar exposure.
  context: {
    notional?: number
    preSplitShares?: number
    referencePrice?: number
    years?: number
  }
}

export type Severity = 'critical' | 'high' | 'medium' | 'low' | 'match'

export type Break = {
  key: string
  label: string
  kind: FieldKind
  valueA: string
  valueB: string
  normA: string // normalized / canonicalized A (e.g. ISO date, parsed number)
  normB: string
  matched: boolean
  severity: Severity
  impactUsd: number | null
  impactLabel: string
  cause: string
  spanA: string
  spanB: string
  pageA: number
  pageB: number
  confidence: number // min confidence of the two source extractions
}
