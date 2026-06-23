// Canon — seeded demo cases.
//
// Two different document types, ONE engine. This is the platform thesis in code:
// the same extract -> reconcile -> govern pipeline handles a corporate-action
// notice and an OTC trade confirmation without changing the engine. Confidence
// scores follow the research: templated fields extract near-certain; bespoke /
// hand-entered fields carry visibly lower confidence (the part LLMs get wrong).

import type { DemoCase } from './types.ts'

export const CASES: DemoCase[] = [
  {
    id: 'corp-action',
    label: 'Corporate Action — Reverse Split',
    tag: 'Asset servicing',
    instrument: 'Acme Robotics Inc · NYSE:ARBT',
    summary:
      'An issuer reverse-split notice vs. a custodian data feed. A wrong consolidation ratio is exactly the kind of break that cost a major broker ~$57M on a single mishandled reverse split.',
    context: { preSplitShares: 4_000_000, referencePrice: 12 },
    docA: {
      id: 'arbt-issuer',
      name: 'ARBT_ReverseSplit_IssuerNotice.pdf',
      kind: 'Corporate Action Notice (issuer agent)',
      party: 'Transfer Agent — golden source',
      fields: [
        { key: 'event_type', label: 'Event Type', kind: 'enum', value: 'Reverse Stock Split', page: 1, span: '"…will effect a reverse stock split of its common stock"', confidence: 0.99 },
        { key: 'security', label: 'Security / CUSIP', kind: 'string', value: 'Acme Robotics Inc · 00488Q201', page: 1, span: '"Acme Robotics Inc. (CUSIP 00488Q201)"', confidence: 0.99 },
        { key: 'ratio', label: 'Consolidation Ratio', kind: 'ratio', value: '1-for-8', page: 2, span: '"at a ratio of one-for-eight (1-for-8)"', confidence: 0.9 },
        { key: 'effective_date', label: 'Effective Date', kind: 'date', value: 'February 18, 2026', page: 2, span: '"effective as of February 18, 2026"', confidence: 0.98 },
        { key: 'record_date', label: 'Record Date', kind: 'date', value: 'February 11, 2026', page: 2, span: '"holders of record as of February 11, 2026"', confidence: 0.95 },
        { key: 'fractional', label: 'Fractional Handling', kind: 'enum', value: 'Cash in lieu', page: 3, span: '"no fractional shares… paid cash in lieu"', confidence: 0.88 },
      ],
    },
    docB: {
      id: 'arbt-vendor',
      name: 'ARBT_ReverseSplit_VendorFeed.pdf',
      kind: 'Corporate Action Notice (custodian feed)',
      party: 'Custodian / data vendor',
      fields: [
        { key: 'event_type', label: 'Event Type', kind: 'enum', value: 'Reverse Stock Split', page: 1, span: '"Mandatory reverse split"', confidence: 0.99 },
        { key: 'security', label: 'Security / CUSIP', kind: 'string', value: 'Acme Robotics Inc · 00488Q201', page: 1, span: '"ACME ROBOTICS INC / 00488Q201"', confidence: 0.99 },
        { key: 'ratio', label: 'Consolidation Ratio', kind: 'ratio', value: '1:3', page: 1, span: '"Ratio 1:3"', confidence: 0.83 },
        { key: 'effective_date', label: 'Effective Date', kind: 'date', value: '18 Feb 2026', page: 1, span: '"Eff. 18 Feb 2026"', confidence: 0.97 },
        { key: 'record_date', label: 'Record Date', kind: 'date', value: '02/12/2026', page: 1, span: '"Rec date 02/12/2026"', confidence: 0.92 },
        { key: 'fractional', label: 'Fractional Handling', kind: 'enum', value: 'Round up to whole share', page: 2, span: '"fractions rounded up"', confidence: 0.85 },
      ],
    },
  },
  {
    id: 'otc-swap',
    label: 'OTC Confirmation — IR Swap',
    tag: 'Derivatives middle office',
    instrument: 'USD Interest Rate Swap · SWAP-2024-8847',
    summary:
      'Two counterparties’ confirmations of the same $50M swap. The fixed rate disagrees by a transposed digit — tens of thousands a year flowing the wrong way. The motion that froze the market in 2008, still run on PDFs.',
    context: { notional: 50_000_000, years: 5 },
    docA: {
      id: 'swap-ours',
      name: 'OurTermSheet_SWAP8847.pdf',
      kind: 'Trade Confirmation (internal record)',
      party: 'Global Bank NA',
      fields: [
        { key: 'trade_id', label: 'Trade ID', kind: 'string', value: 'SWAP-2024-8847', page: 1, span: '"Trade ID: SWAP-2024-8847"', confidence: 0.99 },
        { key: 'notional', label: 'Notional', kind: 'currency', value: 'USD 50,000,000', page: 3, span: '"Notional Amount: USD 50,000,000"', confidence: 0.99 },
        { key: 'effective_date', label: 'Effective Date', kind: 'date', value: 'January 15, 2025', page: 2, span: '"Effective Date: January 15, 2025"', confidence: 0.98 },
        { key: 'fixed_rate', label: 'Fixed Rate', kind: 'rate', value: '3.25% per annum', page: 9, span: '"The Fixed Rate shall be 3.25% per annum"', confidence: 0.91 },
        { key: 'pay_freq', label: 'Payment Frequency', kind: 'enum', value: 'Semi-annual', page: 6, span: '"Fixed amounts payable semi-annually"', confidence: 0.93 },
        { key: 'day_count', label: 'Day Count', kind: 'enum', value: 'Actual/360', page: 6, span: '"Day Count Fraction: Actual/360"', confidence: 0.97 },
      ],
    },
    docB: {
      id: 'swap-cpty',
      name: 'CounterpartyConf_SWAP8847.pdf',
      kind: 'Trade Confirmation (counterparty)',
      party: 'Counterparty Bank Ltd',
      fields: [
        { key: 'trade_id', label: 'Trade ID', kind: 'string', value: 'SWAP-2024-8847', page: 1, span: '"Re: SWAP-2024-8847 (your ref)"', confidence: 0.98 },
        { key: 'notional', label: 'Notional', kind: 'currency', value: 'USD 50,000,000', page: 1, span: '"Notional: USD 50,000,000"', confidence: 0.99 },
        { key: 'effective_date', label: 'Effective Date', kind: 'date', value: '15 Jan 2025', page: 1, span: '"Effective: 15 Jan 2025"', confidence: 0.98 },
        { key: 'fixed_rate', label: 'Fixed Rate', kind: 'rate', value: '3.52% per annum', page: 9, span: '"Fixed Rate: 3.52% per annum"', confidence: 0.86 },
        { key: 'pay_freq', label: 'Payment Frequency', kind: 'enum', value: 'Quarterly', page: 6, span: '"Fixed amounts payable quarterly"', confidence: 0.88 },
        { key: 'day_count', label: 'Day Count', kind: 'enum', value: 'Actual/360', page: 6, span: '"Day Count: ACT/360"', confidence: 0.95 },
      ],
    },
  },
]
