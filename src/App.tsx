import { useState, useRef } from 'react'

const DEMO_EMAIL = `To: confirmations@counterpartybank.com
From: maya.chen@globalbank.com
Subject: Trade Confirmation Break — SWAP-2024-8847

Hi,

We've identified a discrepancy on trade SWAP-2024-8847 (USD Interest Rate Swap, notional $50,000,000).

Break detected:
  • Fixed Rate — Our records: 3.25% | Your confirmation (p.9): 3.52%
    Impact: ~$135,000/year, ~$675,000 over life of trade

Please confirm your fixed rate and advise on correction. We're holding the confirmation unconfirmed pending your response.

Regards,
Maya Chen
Confirmations & Reconciliation, Global Markets
`

const AUDIT_ENTRIES = [
  { cls: 'upload', icon: '📄', action: 'Documents uploaded', detail: 'OurTermSheet_SWAP8847.pdf · CounterpartyConf_SWAP8847.pdf', time: '19:14:02' },
  { cls: 'analyze', icon: '🔍', action: 'AI extraction complete', detail: 'Bigdata.com grounded 12 fields across both documents', time: '19:14:08' },
  { cls: 'brk', icon: '⚠️', action: 'Break detected', detail: 'Fixed Rate — 3.25% vs 3.52% — $675K exposure over trade life', time: '19:14:08' },
  { cls: 'approve', icon: '✅', action: 'Human approval — Maya Chen', detail: 'Clerk verified · Resolution email approved for send', time: '19:14:31' },
  { cls: 'send', icon: '📧', action: 'Resolution email sent via Gmail', detail: 'To: confirmations@counterpartybank.com', time: '19:14:33' },
]

const BREAKS = [
  {
    field: 'Fixed Rate',
    source: 'p.9 · "The Fixed Rate shall be 3.52% per annum"',
    ourVal: '3.25%',
    theirVal: '3.52%',
    impact: '$675,000',
    severity: 'critical',
    cause: 'Likely typo at booking — 52 vs 25 transposition',
  },
  {
    field: 'Effective Date',
    source: 'p.2 · "Effective Date: January 15, 2025"',
    ourVal: 'Jan 15 2025',
    theirVal: 'Jan 15 2025',
    impact: '—',
    severity: 'low',
    cause: 'Match confirmed',
  },
  {
    field: 'Notional Amount',
    source: 'p.3 · "Notional Amount: USD 50,000,000"',
    ourVal: '$50,000,000',
    theirVal: '$50,000,000',
    impact: '—',
    severity: 'low',
    cause: 'Match confirmed',
  },
  {
    field: 'Payment Frequency',
    source: 'p.6 · "Fixed amounts payable semi-annually"',
    ourVal: 'Semi-annual',
    theirVal: 'Quarterly',
    impact: '$48,000',
    severity: 'high',
    cause: 'Frequency mismatch — check ISDA schedule',
  },
]

function SeverityBadge({ s }: { s: string }) {
  if (s === 'critical') return <span className="severity-badge severity-critical">● Critical</span>
  if (s === 'high') return <span className="severity-badge severity-high">● High</span>
  return <span className="severity-badge severity-low">✓ Match</span>
}

export default function App() {
  const [fileA, setFileA] = useState<string | null>(null)
  const [fileB, setFileB] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [progressLabel, setProgressLabel] = useState('')
  const [analyzing, setAnalyzing] = useState(false)
  const [done, setDone] = useState(false)
  const [approved, setApproved] = useState(false)
  const [sent, setSent] = useState(false)
  const [auditEntries, setAuditEntries] = useState<typeof AUDIT_ENTRIES>([])
  const inputA = useRef<HTMLInputElement>(null)
  const inputB = useRef<HTMLInputElement>(null)

  function pickFile(side: 'a' | 'b', name: string) {
    if (side === 'a') setFileA(name)
    else setFileB(name)
  }

  function handleDrop(side: 'a' | 'b', e: React.DragEvent) {
    e.preventDefault()
    const f = e.dataTransfer.files[0]
    if (f) pickFile(side, f.name)
  }

  async function analyze() {
    setAnalyzing(true)
    setDone(false)
    setApproved(false)
    setSent(false)
    setAuditEntries([])
    const steps = [
      [15, 'Parsing documents…'],
      [35, 'Extracting fields with AI…'],
      [55, 'Grounding with Bigdata.com…'],
      [75, 'Running reconciliation…'],
      [90, 'Ranking breaks by exposure…'],
      [100, 'Complete'],
    ]
    for (const [pct, label] of steps) {
      setProgress(pct as number)
      setProgressLabel(label as string)
      await new Promise(r => setTimeout(r, 520))
    }
    setAuditEntries(AUDIT_ENTRIES.slice(0, 3))
    setAnalyzing(false)
    setDone(true)
  }

  function approve() {
    setApproved(true)
    setAuditEntries(AUDIT_ENTRIES.slice(0, 4))
  }

  function send() {
    setSent(true)
    setAuditEntries(AUDIT_ENTRIES)
  }

  const canAnalyze = !!fileA && !!fileB && !analyzing

  return (
    <div className="app">
      <nav className="nav">
        <div className="nav-brand">
          <div className="nav-logo">C</div>
          <div>
            <div className="nav-name">Concord</div>
            <div className="nav-tagline">Trade Confirmation Reconciliation</div>
          </div>
        </div>
        <div className="nav-badge">JPMorgan Hackathon 2024</div>
      </nav>

      <div className="hero">
        <h1>The AI proposes.<br /><span>The audit trail disposes.</span></h1>
        <p>
          Upload two trade confirmations. Concord extracts every field, surfaces every break,
          drafts the resolution email, and writes an immutable audit trail — with a human approver
          on every step.
        </p>
        <div className="hero-cta">
          <button className="btn-primary" onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}>
            Try the demo
          </button>
          <button className="btn-ghost" onClick={() => {}}>Read the pitch</button>
        </div>
      </div>

      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-value red">30%</div>
          <div className="stat-label">OTC confirmations contain errors</div>
        </div>
        <div className="stat-card">
          <div className="stat-value accent">$1.6B</div>
          <div className="stat-label">Spent annually investigating stuck payments</div>
        </div>
        <div className="stat-card">
          <div className="stat-value yellow">153K</div>
          <div className="stat-label">Unresolved confirmations in 2008 crisis</div>
        </div>
        <div className="stat-card">
          <div className="stat-value green">&lt;30s</div>
          <div className="stat-label">Concord resolves what Maya spent hours on</div>
        </div>
      </div>

      <div className="sponsor-bar">
        <span className="sponsor-label">Powered by</span>
        {['Bigdata.com', 'Clerk', 'Supabase', 'Gmail', 'Vercel', 'Canva', 'Higgsfield'].map(s => (
          <span key={s} className="sponsor-chip">{s}</span>
        ))}
      </div>

      <div id="demo">
        <div className="section-title">📂 Upload Confirmations</div>

        <div className="upload-section">
          <div
            className={`upload-card ${fileA ? 'loaded' : ''}`}
            onClick={() => inputA.current?.click()}
            onDragOver={e => e.preventDefault()}
            onDrop={e => handleDrop('a', e)}
          >
            <input ref={inputA} type="file" accept=".pdf,.txt" style={{ display: 'none' }}
              onChange={e => e.target.files?.[0] && pickFile('a', e.target.files[0].name)} />
            <div className="upload-icon">{fileA ? '✅' : '📄'}</div>
            <div className="upload-label">Our Confirmation</div>
            <div className="upload-sub">Your internal trade record (PDF, TXT)</div>
            {fileA
              ? <div className="upload-filename">{fileA}</div>
              : <div className="upload-filename" style={{ color: 'var(--muted)' }}>Drop file or click — or use demo data</div>}
          </div>

          <div
            className={`upload-card ${fileB ? 'loaded' : ''}`}
            onClick={() => inputB.current?.click()}
            onDragOver={e => e.preventDefault()}
            onDrop={e => handleDrop('b', e)}
          >
            <input ref={inputB} type="file" accept=".pdf,.txt" style={{ display: 'none' }}
              onChange={e => e.target.files?.[0] && pickFile('b', e.target.files[0].name)} />
            <div className="upload-icon">{fileB ? '✅' : '📄'}</div>
            <div className="upload-label">Counterparty Confirmation</div>
            <div className="upload-sub">Their emailed PDF confirmation</div>
            {fileB
              ? <div className="upload-filename">{fileB}</div>
              : <div className="upload-filename" style={{ color: 'var(--muted)' }}>Drop file or click — or use demo data</div>}
          </div>
        </div>

        <div className="analyze-wrap">
          {!fileA && (
            <button className="btn-ghost" style={{ marginRight: 12 }} onClick={() => { setFileA('OurTermSheet_SWAP8847.pdf'); setFileB('CounterpartyConf_SWAP8847.pdf') }}>
              Load demo data
            </button>
          )}
          {analyzing && (
            <div>
              <div className="progress-bar-wrap">
                <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
              </div>
              <div className="progress-label">{progressLabel}</div>
            </div>
          )}
          <button className="btn-analyze" disabled={!canAnalyze} onClick={analyze}>
            {analyzing ? 'Analyzing…' : 'Analyze Confirmations'}
          </button>
        </div>

        {done && (
          <>
            <div className="section-title">⚠️ Break Report</div>
            <div className="break-table">
              <table>
                <thead>
                  <tr>
                    <th>Field</th>
                    <th>Our Value</th>
                    <th>Their Value</th>
                    <th>$ Impact</th>
                    <th>Severity</th>
                    <th>Likely Cause</th>
                  </tr>
                </thead>
                <tbody>
                  {BREAKS.map((b, i) => (
                    <tr key={i}>
                      <td>
                        <div className="normal" style={{ fontWeight: 600 }}>{b.field}</div>
                        <div className="field-source">{b.source}</div>
                      </td>
                      <td><span className="val-a">{b.ourVal}</span></td>
                      <td><span className="val-b">{b.theirVal}</span></td>
                      <td style={{ fontWeight: 600 }}>{b.impact}</td>
                      <td><SeverityBadge s={b.severity} /></td>
                      <td style={{ color: 'var(--muted)', fontSize: 12 }}>{b.cause}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="section-title">📄 Document View — Source Highlighting</div>
            <div className="docs-grid">
              <div className="doc-card">
                <div className="doc-card-header">📄 OurTermSheet_SWAP8847.pdf</div>
                <div className="doc-body">
                  <p>ISDA Master Agreement — Interest Rate Swap</p>
                  <p>Trade ID: <span className="normal">SWAP-2024-8847</span></p>
                  <p>Notional: <span className="highlight-match">USD 50,000,000</span></p>
                  <p>Effective Date: <span className="highlight-match">January 15, 2025</span></p>
                  <p>Termination Date: <span className="normal">January 15, 2030</span></p>
                  <p>Fixed Rate Payer: <span className="normal">Global Bank NA</span></p>
                  <p style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--border)' }}>
                    Page 9 — Fixed Amounts
                  </p>
                  <p>Fixed Rate: <span className="highlight">3.25% per annum</span> ← flagged</p>
                  <p>Payment Freq: <span className="highlight-match">Semi-annual</span></p>
                  <p>Day Count: <span className="normal">Actual/360</span></p>
                </div>
              </div>
              <div className="doc-card">
                <div className="doc-card-header">📄 CounterpartyConf_SWAP8847.pdf</div>
                <div className="doc-body">
                  <p>Trade Confirmation — Counterparty Bank Ltd</p>
                  <p>Our Ref: <span className="normal">CPB-2024-44921</span></p>
                  <p>Notional: <span className="highlight-match">USD 50,000,000</span></p>
                  <p>Effective Date: <span className="highlight-match">January 15, 2025</span></p>
                  <p>Termination Date: <span className="normal">January 15, 2030</span></p>
                  <p>Fixed Rate Payer: <span className="normal">Global Bank NA</span></p>
                  <p style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--border)' }}>
                    Page 9 — Fixed Rate Terms
                  </p>
                  <p>Fixed Rate: <span className="highlight">3.52% per annum</span> ← flagged</p>
                  <p>Payment Freq: <span className="highlight">Quarterly</span> ← flagged</p>
                  <p>Day Count: <span className="normal">Actual/360</span></p>
                </div>
              </div>
            </div>

            <div className="resolution-panel">
              <div className="resolution-header">
                <span>📧 AI-Drafted Resolution Email</span>
                <span style={{ fontSize: 12, color: 'var(--muted)' }}>via Gmail · Ready to send</span>
              </div>
              <div className="resolution-body">
                <div className="email-draft">{DEMO_EMAIL}</div>

                <div className="approver-row">
                  <div className="approver-avatar">MC</div>
                  <div className="approver-info">
                    <div className="approver-name">Maya Chen</div>
                    <div className="approver-role">Confirmations Analyst · Verified via Clerk</div>
                  </div>
                  {approved
                    ? <div className="approved-badge">✓ Approved</div>
                    : <button className="btn-approve" onClick={approve}>Approve &amp; Sign</button>}
                </div>

                <div className="action-row">
                  <button className="btn-send" disabled={!approved || sent} onClick={send}>
                    {sent ? '✓ Sent via Gmail' : 'Send via Gmail'}
                  </button>
                  {sent && <span style={{ color: 'var(--green)', fontSize: 13, alignSelf: 'center' }}>✓ Message delivered · Thread logged</span>}
                </div>
              </div>
            </div>

            <div className="audit-trail">
              <div className="audit-header">
                🔒 Immutable Audit Trail
                <div className="audit-hash">
                  Stored in Supabase · sha256: {auditEntries.length > 0 ? 'a3f8c2…d91b' : '—'}
                </div>
              </div>
              {auditEntries.map((e, i) => (
                <div className="audit-entry" key={i}>
                  <div className={`audit-icon ${e.cls}`}>{e.icon}</div>
                  <div className="audit-text">
                    <div className="audit-action">{e.action}</div>
                    <div className="audit-detail">{e.detail}</div>
                  </div>
                  <div className="audit-time">{e.time}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <footer className="footer">
        Built for the JPMorgan Finance Hackathon 2024 ·{' '}
        <strong>Concord</strong> — The AI proposes. The audit trail disposes.
      </footer>
    </div>
  )
}
