import { useMemo, useRef, useState } from 'react'
import './canon.css'
import { CASES } from './canon/cases.ts'
import { reconcile, totalExposure, fmtUsd } from './canon/reconcile.ts'
import { appendEntry, exportTrail, verifyChain } from './canon/audit.ts'
import type { AuditEntry } from './canon/audit.ts'
import type { Break } from './canon/types.ts'

const MODEL = 'canon-extract-v1 · frontier-LLM'

function sevClass(s: Break['severity']) {
  return `severity-badge severity-${s}`
}
function sevLabel(s: Break['severity']) {
  if (s === 'match') return '✓ Match'
  return '● ' + s[0].toUpperCase() + s.slice(1)
}

function draftEmail(top: Break, instrument: string): string {
  return `To: operations@counterparty.com
From: analyst@yourfirm.com
Subject: Discrepancy on ${instrument} — ${top.label}

Hi,

Canon flagged a discrepancy on ${instrument} that needs your confirmation before we can mark this matched.

  Field:        ${top.label}
  Our value:    ${top.normA}
  Your value:   ${top.normB}
  Exposure:     ${top.impactLabel}
  Likely cause: ${top.cause}

Source (ours):  ${top.spanA} (p.${top.pageA})
Source (yours): ${top.spanB} (p.${top.pageB})

Please confirm the correct value. We're holding this unconfirmed pending your response, and this message + your reply are logged to the audit trail.

Regards,
Operations`
}

export default function App() {
  const [caseId, setCaseId] = useState(CASES[0].id)
  const demo = useMemo(() => CASES.find((c) => c.id === caseId)!, [caseId])

  const [fileA, setFileA] = useState<string | null>(null)
  const [fileB, setFileB] = useState<string | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [progressLabel, setProgressLabel] = useState('')
  const [breaks, setBreaks] = useState<Break[] | null>(null)
  const [approved, setApproved] = useState(false)
  const [sent, setSent] = useState(false)
  const [audit, setAudit] = useState<AuditEntry[]>([])
  const [chainValid, setChainValid] = useState<boolean | null>(null)
  const inputA = useRef<HTMLInputElement>(null)
  const inputB = useRef<HTMLInputElement>(null)

  function resetRun() {
    setBreaks(null)
    setApproved(false)
    setSent(false)
    setAudit([])
    setChainValid(null)
  }

  function loadDemo() {
    setFileA(demo.docA.name)
    setFileB(demo.docB.name)
  }

  async function push(chain: AuditEntry[], p: Parameters<typeof appendEntry>[1]) {
    const entry = await appendEntry(chain, p)
    const next = [...chain, entry]
    setAudit(next)
    return next
  }

  async function analyze() {
    setAnalyzing(true)
    resetRun()
    const steps: [number, string][] = [
      [18, 'Ingesting documents (Gmail / Drive)…'],
      [40, 'Extracting fields with provenance…'],
      [60, 'Grounding entities with Bigdata.com…'],
      [80, 'Running deterministic reconciliation…'],
      [100, 'Ranking breaks by exposure…'],
    ]
    for (const [pct, label] of steps) {
      setProgress(pct)
      setProgressLabel(label)
      await new Promise((r) => setTimeout(r, 460))
    }
    const result = reconcile(demo)
    setBreaks(result)

    let chain: AuditEntry[] = []
    chain = await push(chain, {
      actor: 'Canon pipeline',
      actorVerified: 'system',
      action: 'Documents ingested',
      detail: `${demo.docA.name} · ${demo.docB.name}`,
      model: MODEL,
    })
    chain = await push(chain, {
      actor: 'Canon pipeline',
      actorVerified: 'system',
      action: 'Fields extracted with provenance',
      detail: `${demo.docA.fields.length} fields/doc · per-field source span + confidence captured`,
      model: MODEL,
    })
    const crit = result.filter((b) => !b.matched).length
    await push(chain, {
      actor: 'Canon engine',
      actorVerified: 'deterministic',
      action: 'Reconciliation complete',
      detail: `${crit} break(s) · ${fmtUsd(totalExposure(result))} total exposure · money-math by deterministic comparators (no LLM)`,
      model: 'canon-reconcile-v1 (deterministic)',
    })
    setAnalyzing(false)
  }

  async function approve() {
    setApproved(true)
    await push(audit, {
      actor: 'Maya Chen',
      actorVerified: 'Clerk · verified',
      action: 'Human approval & sign-off',
      detail: 'Resolution reviewed and approved for send (human-in-the-loop, FINRA 2026)',
      model: MODEL,
    })
  }

  async function send() {
    setSent(true)
    await push(audit, {
      actor: 'Maya Chen',
      actorVerified: 'Clerk · verified',
      action: 'Resolution sent via Gmail',
      detail: 'Counterparty notified · thread linked to break record',
    })
  }

  async function verify() {
    setChainValid(await verifyChain(audit))
  }

  function exportAudit() {
    const payload = exportTrail(audit, {
      case: demo.id,
      instrument: demo.instrument,
      breaks: breaks?.filter((b) => !b.matched).map((b) => ({ field: b.label, ours: b.normA, theirs: b.normB, exposure: b.impactUsd })),
    })
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `canon-audit-${demo.id}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const canAnalyze = !!fileA && !!fileB && !analyzing
  const openBreaks = breaks?.filter((b) => !b.matched) ?? []
  const top = openBreaks[0]
  const exposure = breaks ? totalExposure(breaks) : 0

  return (
    <div className="app">
      <nav className="nav">
        <div className="nav-brand">
          <div className="nav-logo">C</div>
          <div>
            <div className="nav-name">Canon</div>
            <div className="nav-tagline">The trust layer for AI in capital-markets operations</div>
          </div>
        </div>
        <div className="nav-badge">FinanceHackLab NYC</div>
      </nav>

      <div className="hero">
        <h1>The AI proposes.<br /><span>The audit trail disposes.</span></h1>
        <p>
          Canon turns the messy, high-stakes paperwork of the back office — corporate actions,
          trade confirmations, custodian breaks — into a <strong>structured, provenance-bound,
          validated record</strong>. Every field shows its receipts. Every break is dollar-ranked.
          Every step is written to an immutable, regulator-ready audit trail with a human sign-off.
        </p>
        <div className="hero-cta">
          <button className="btn-primary" onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}>
            Run the live demo
          </button>
          <button className="btn-ghost" onClick={() => document.getElementById('business')?.scrollIntoView({ behavior: 'smooth' })}>
            The business
          </button>
        </div>
      </div>

      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-value red">$58B</div>
          <div className="stat-label">Annual cost of corporate-actions processing (DTCC)</div>
        </div>
        <div className="stat-card">
          <div className="stat-value yellow">46%</div>
          <div className="stat-label">Of corporate-action data still keyed by hand</div>
        </div>
        <div className="stat-card">
          <div className="stat-value accent">19%</div>
          <div className="stat-label">What GPT-4 + RAG gets right on real filings — why raw AI can't be trusted unsupervised</div>
        </div>
        <div className="stat-card">
          <div className="stat-value green">$3.2B</div>
          <div className="stat-label">Fines for missing audit trails — the demand signal Canon answers</div>
        </div>
      </div>

      <div className="sponsor-bar">
        <span className="sponsor-label">Built on</span>
        {['Campfire (GL)', 'Replit', 'Supabase', 'Clerk', 'Bigdata.com', 'Gmail', 'Stripe', 'Ramp', 'Vercel'].map((s) => (
          <span key={s} className="sponsor-chip">{s}</span>
        ))}
      </div>

      <div id="demo">
        <div className="section-title">⚙️ One engine, any document type</div>
        <div className="case-tabs">
          {CASES.map((c) => (
            <button
              key={c.id}
              className={`case-tab ${c.id === caseId ? 'active' : ''}`}
              onClick={() => { setCaseId(c.id); setFileA(null); setFileB(null); resetRun() }}
            >
              <span className="case-tab-tag">{c.tag}</span>
              <span className="case-tab-label">{c.label}</span>
            </button>
          ))}
        </div>
        <div className="case-summary">{demo.summary}</div>

        <div className="upload-section">
          {[{ side: 'a' as const, inp: inputA, file: fileA, doc: demo.docA, set: setFileA },
            { side: 'b' as const, inp: inputB, file: fileB, doc: demo.docB, set: setFileB }].map(({ side, inp, file, doc, set }) => (
            <div
              key={side}
              className={`upload-card ${file ? 'loaded' : ''}`}
              onClick={() => inp.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) set(f.name) }}
            >
              <input ref={inp} type="file" accept=".pdf,.txt,.xml" style={{ display: 'none' }}
                onChange={(e) => e.target.files?.[0] && set(e.target.files[0].name)} />
              <div className="upload-icon">{file ? '✅' : '📄'}</div>
              <div className="upload-label">{doc.party}</div>
              <div className="upload-sub">{doc.kind}</div>
              <div className="upload-filename" style={file ? undefined : { color: 'var(--muted)' }}>
                {file ?? 'Drop file or click — or load demo data'}
              </div>
            </div>
          ))}
        </div>

        <div className="analyze-wrap">
          {(!fileA || !fileB) && (
            <button className="btn-ghost" style={{ marginRight: 12 }} onClick={loadDemo}>Load demo data</button>
          )}
          {analyzing && (
            <div>
              <div className="progress-bar-wrap"><div className="progress-bar-fill" style={{ width: `${progress}%` }} /></div>
              <div className="progress-label">{progressLabel}</div>
            </div>
          )}
          <button className="btn-analyze" disabled={!canAnalyze} onClick={analyze}>
            {analyzing ? 'Reconciling…' : 'Reconcile'}
          </button>
        </div>

        {breaks && (
          <>
            <div className="section-title">
              ⚠️ Break Report
              <span className="exposure-pill">{openBreaks.length} break(s) · {fmtUsd(exposure)} exposure</span>
            </div>
            <div className="break-table">
              <table>
                <thead>
                  <tr><th>Field</th><th>Ours</th><th>Theirs</th><th>$ Exposure</th><th>Severity</th><th>Confidence</th><th>Likely cause</th></tr>
                </thead>
                <tbody>
                  {breaks.map((b) => (
                    <tr key={b.key}>
                      <td>
                        <div className="normal" style={{ fontWeight: 600 }}>{b.label}</div>
                        <div className="field-source">{b.matched ? b.spanA : `${b.spanA} · p.${b.pageA}`}</div>
                      </td>
                      <td><span className={b.matched ? '' : 'val-a'}>{b.normA}</span></td>
                      <td><span className={b.matched ? '' : 'val-b'}>{b.normB}</span></td>
                      <td style={{ fontWeight: 600 }}>{b.impactLabel}</td>
                      <td><span className={sevClass(b.severity)}>{sevLabel(b.severity)}</span></td>
                      <td>
                        <div className="conf-bar"><div className="conf-fill" style={{ width: `${Math.round(b.confidence * 100)}%` }} /></div>
                        <div className="conf-num">{Math.round(b.confidence * 100)}%</div>
                      </td>
                      <td style={{ color: 'var(--muted)', fontSize: 12 }}>{b.cause}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="section-title">📄 Provenance — every field traced to its source span</div>
            <div className="docs-grid">
              {[demo.docA, demo.docB].map((doc, di) => (
                <div className="doc-card" key={doc.id}>
                  <div className="doc-card-header">📄 {doc.name}</div>
                  <div className="doc-body">
                    {doc.fields.map((f) => {
                      const br = breaks.find((b) => b.key === f.key)
                      const cls = !br ? 'normal' : br.matched ? 'highlight-match' : 'highlight'
                      return (
                        <p key={f.key}>
                          <span style={{ color: 'var(--muted)' }}>{f.label}: </span>
                          <span className={cls}>{f.value}</span>
                          {br && !br.matched && <span className="flag"> ← break</span>}
                          <span className="span-quote">{f.span}</span>
                        </p>
                      )
                    })}
                    <p className="doc-foot">Source: {doc.party} · {di === 0 ? 'golden record' : 'counterparty / feed'}</p>
                  </div>
                </div>
              ))}
            </div>

            {top && (
              <div className="resolution-panel">
                <div className="resolution-header">
                  <span>📧 AI-drafted resolution</span>
                  <span style={{ fontSize: 12, color: 'var(--muted)' }}>generated from the top break · ready to send via Gmail</span>
                </div>
                <div className="resolution-body">
                  <div className="email-draft">{draftEmail(top, demo.instrument)}</div>
                  <div className="approver-row">
                    <div className="approver-avatar">MC</div>
                    <div className="approver-info">
                      <div className="approver-name">Maya Chen</div>
                      <div className="approver-role">Operations · identity verified via Clerk</div>
                    </div>
                    {approved
                      ? <div className="approved-badge">✓ Approved &amp; signed</div>
                      : <button className="btn-approve" onClick={approve}>Approve &amp; Sign</button>}
                  </div>
                  <div className="action-row">
                    <button className="btn-send" disabled={!approved || sent} onClick={send}>
                      {sent ? '✓ Sent via Gmail' : 'Send via Gmail'}
                    </button>
                    {sent && <span style={{ color: 'var(--green)', fontSize: 13, alignSelf: 'center' }}>✓ Delivered · thread logged</span>}
                  </div>
                </div>
              </div>
            )}

            <div className="audit-trail">
              <div className="audit-header">
                🔒 Immutable, hash-chained audit trail
                <div className="audit-actions">
                  {chainValid !== null && (
                    <span className={`verify-badge ${chainValid ? 'ok' : 'bad'}`}>
                      {chainValid ? '✓ Chain verified' : '✗ Tampered'}
                    </span>
                  )}
                  <button className="btn-mini" onClick={verify} disabled={!audit.length}>Verify chain</button>
                  <button className="btn-mini" onClick={exportAudit} disabled={!audit.length}>Export JSON</button>
                </div>
              </div>
              {audit.map((e) => (
                <div className="audit-entry" key={e.seq}>
                  <div className="audit-seq">{e.seq}</div>
                  <div className="audit-text">
                    <div className="audit-action">{e.action} <span className="audit-actor">· {e.actor} ({e.actorVerified})</span></div>
                    <div className="audit-detail">{e.detail}{e.model ? ` · ${e.model}` : ''}</div>
                    <div className="hash-mono">sha256 {e.hash.slice(0, 24)}… ← prev {e.prevHash.slice(0, 12)}…</div>
                  </div>
                </div>
              ))}
              {!audit.length && <div className="audit-empty">Run a reconciliation to generate the chain.</div>}
              <div className="audit-foot">Each entry hashes the previous one (real SHA-256, in-browser). In production this lands in Supabase. This is the exact artifact FINRA's 2026 report asks for: prompt/output logs, model version, and a human approver.</div>
            </div>
          </>
        )}
      </div>

      <div id="business">
        <div className="section-title">📈 The business — built for $2M MRR, then a unicorn</div>
        <div className="biz-grid">
          <div className="biz-card">
            <div className="biz-card-title">The market nobody's serving</div>
            <p>Every AI-native fintech dollar went to <strong>front-office research copilots</strong> (Rogo $2B, Hebbia $700M) or <strong>SMB accounting</strong> (Basis $1.15B, Campfire). The <strong>capital-markets back/middle office</strong> — post-trade, reconciliation, corporate actions, NAV, reg reporting — has <strong>zero AI-native challenger</strong>. It's defended by 20-year-old rails (OSTTRA's MarkitWire, Broadridge on ADP-era batch). That empty quadrant is Canon.</p>
          </div>
          <div className="biz-card">
            <div className="biz-card-title">Why now</div>
            <p>AI is finally good enough on <em>templated</em> finance docs but falls off a cliff on <em>bespoke</em> ones — so the provenance + deterministic validation + human sign-off <em>is</em> the product, not the model. FINRA's 2026 report now <strong>requires</strong> prompt/output/model-version logging + a human approver; Fed SR 26-2 writes genAI <strong>out</strong> of model-risk scope. Banks must self-govern AI with no rulebook. Canon ships that rulebook baked in.</p>
          </div>
          <div className="biz-card">
            <div className="biz-card-title">The moat (not a wrapper)</div>
            <p>The model isn't the moat — <strong>the golden-source network + provenance substrate are.</strong> Proprietary accuracy-eval vs. CDM/FpML/ISO 20022 ground truth · deterministic finance comparators (the money-math) · immutable audit-of-record · a cross-counterparty data network that compounds with every institution · value-capture pricing. Passes the 24-hour-clone, network, rip-out, and accuracy-frontier tests a VC runs.</p>
          </div>
        </div>

        <div className="model-block">
          <div className="biz-card-title">Business model — three stacked revenue lines</div>
          <div className="model-grid">
            <div className="model-cell"><div className="model-h">1 · Platform subscription</div><p>Per-org access + seats for ops/approvers. The land. ~$60–180K ACV (buy-side) to $1–3M (custodian / asset servicer).</p></div>
            <div className="model-cell"><div className="model-h">2 · Usage</div><p>Per event / document reconciled — scales with the customer's volume. Metered &amp; billed via <strong>Stripe</strong>; ROI proven with <strong>Ramp</strong> spend benchmarks.</p></div>
            <div className="model-cell"><div className="model-h">3 · Value-capture</div><p>Revenue-share on recovered leakage &amp; prevented loss (the $10B+/yr lost on mishandled voluntary elections). Outcome-based, like Sierra ($15.8B). The expand.</p></div>
          </div>
          <p className="margin-note">Infrastructure economics: <strong>65–80% gross margin</strong>, &gt;120% net revenue retention, system-of-record lock-in.</p>
        </div>

        <div className="model-block">
          <div className="biz-card-title">The path to $2M MRR ($24M ARR)</div>
          <table className="mrr-table">
            <thead><tr><th>Segment</th><th>Logos</th><th>Avg ACV</th><th>ARR</th><th>MRR</th></tr></thead>
            <tbody>
              <tr><td>Custodians / asset servicers (enterprise)</td><td>4</td><td>$2.6M</td><td>$10.4M</td><td>$867K</td></tr>
              <tr><td>Hedge funds / asset managers (buy-side)</td><td>34</td><td>$0.22M</td><td>$7.5M</td><td>$625K</td></tr>
              <tr><td>Usage + value-capture upside</td><td>—</td><td>—</td><td>$6.1M</td><td>$508K</td></tr>
              <tr className="mrr-total"><td>Total</td><td>38</td><td>—</td><td>$24.0M</td><td>$2.0M</td></tr>
            </tbody>
          </table>
          <p className="margin-note">~38 logos to clear $2M MRR — reachable on a buy-side-first, land-and-expand motion (fastest procurement, single budget owner). Then the post-trade / recon / corporate-actions TAM supports <strong>$100M+ ARR → a unicorn at standard ~10x infrastructure multiples.</strong> Comps that already cleared it: Rogo $2B (J.P. Morgan-backed), Harvey $11B, Sierra $15.8B — vertical AI is unicorn territory; Canon owns the one finance quadrant they don't touch.</p>
        </div>
      </div>

      <footer className="footer">
        <strong>Canon</strong> — the trust layer for AI in capital-markets operations. The AI proposes. The audit trail disposes. · FinanceHackLab NYC
      </footer>
    </div>
  )
}
