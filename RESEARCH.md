# FinanceHackLab NYC — Idea Research & Recommendation

*Institutional / capital-markets focus · JPMorgan-aligned · solo full-stack + multi-agent builder · ~24–36h MVP. Compiled 2026-06-23.*

---

## TL;DR — the one to build

**Concord** *(placeholder name — alts: "TieOut", "BreakBot")* — **an auditable AI reconciliation agent for capital-markets back-office, instantiated on OTC derivative confirmation matching.**

Drop in two counterparties' trade confirmations (PDF/email). A multi-agent pipeline extracts each into a structured schema, runs a finance-aware **economic break report** (notional, day-count, rate, dates — severity-ranked with the dollar delta), and — the moat — renders **every extracted field with an inline citation to the source span, a confidence score, and an immutable, regulator-ready audit trail with human sign-off.** "AI proposes, the structured diff + audit trail dispose."

It is the single idea that satisfies **both** halves of your brief at once:
- **Legacy process new tech hasn't replaced:** OTC confirmations still run on PDFs/email; ~30% contain errors; this is literally the process that caused the 2005–08 credit-derivatives backlog crisis the NY Fed had to intervene on — and it runs the same way today.
- **Problem newly created by the most-adopted tech (genAI):** the reason banks *can't* just point an LLM at it is the missing governance layer — provenance, auditability, model-risk sign-off. Build that layer and you unlock the legacy process.

**Why it wins the room:** uniquely good **public ground-truth data** (FpML/FINOS CDM samples) so you can show a real extraction-accuracy number; **ISDA itself validated the approach in May 2025**; a demo a finance judge groks in 5 seconds (two PDFs → red dollar-deltas); and it maps directly onto a **named JPMorgan AI use case** (reconciliation/exception resolution) using JPM's exact 2026 vocabulary (agentic, compliance-by-design, AI-ready data).

---

## How this was researched

Four parallel research agents, each owning a vein, all constrained to institutional/capital-markets + JPM-relevance, each required to quantify pain and cite primary sources:

1. **GenAI-adoption created *new* recurring problems** (model risk, provenance/hallucination, AI recordkeeping, deepfake fraud, RAG entitlement leakage, prompt injection).
2. **Legacy post-trade/ops processes tech hasn't replaced** (OTC confirmations, corporate actions, collateral/margin, reconciliation, T+1, ISO 20022 repair, NAV, reference data).
3. **JPMorgan sponsor-fit & judge appeal** (public tech priorities, accessible APIs, what wins bank hackathons).
4. **Payments / treasury / regulatory-reporting pain** (instant-rail APP fraud, cross-border investigations, ISO 20022, stablecoin/deposit-token recon, EMIR/CAT reporting).

Primary sources spanned FINRA, SEC, Federal Reserve, OCC, ESMA, IOSCO, BIS, DTCC, ISDA, AFME/SIFMA, GLEIF, Swift/TCH, JPMorgan filings & disclosures, and reputable trade press. *(Note: the Bigdata.com MCP connector was offline — "subscription ended" — so grounding came from open web + filings; several primary PDFs 403'd the automated fetcher and were captured via search-engine extraction and cross-checked.)*

---

## The scoring — candidate shortlist

Each scored 1–5 on Severity · JPM-fit · Why-now · Buildability (solo, 24–36h) · Demo-wow · Defensibility. Weighted toward **severity × JPM-fit × buildability**.

| Candidate product | Sev | JPM | Why-now | Build | Demo | Moat | **Total /30** |
|---|:--:|:--:|:--:|:--:|:--:|:--:|:--:|
| **① Concord — OTC confirmation recon + audit layer** | 5 | 5 | 5 | 4 | 5 | 5 | **29** |
| ② AI-memo provenance / "trust layer" (research/IC/credit memos) | 5 | 5 | 5 | 4 | 4 | 3 | 26 |
| ③ Corporate-actions golden-record validator | 5 | 5 | 4 | 3 | 4 | 4 | 25 |
| ④ Real-time scam interceptor (RTP/FedNow + payee check) | 5 | 4 | 5 | 3 | 5 | 3 | 25 |
| ⑤ AI compliance recorder (books-&-records middleware) | 4 | 5 | 5 | 4 | 3 | 4 | 25 |
| ⑥ Margin-call copilot (AI collateral inbox) | 4 | 4 | 4 | 5 | 4 | 3 | 24 |
| ⑦ ISO 20022 MT→MX repair / structured-data rescue | 4 | 5 | 5 | 3 | 4 | 3 | 24 |
| ⑧ Cross-border payment investigations copilot | 4 | 5 | 4 | 3 | 4 | 3 | 23 |
| ⑨ Deposit-token (JPMD/Kinexys) settlement reconciler | 4 | 5 | 4 | 3 | 4 | 3 | 23 |
| ⑩ Entitlement-aware RAG gateway (MNPI walls) | 4 | 4 | 4 | 3 | 4 | 3 | 22 |

**①** wins because it's the only candidate that scores top marks on *both* data availability (public FpML ground truth → a real accuracy metric) *and* defensibility (the audit/governance layer + finance-aware comparators are a genuine moat, not a wrapper), while fusing both of your problem buckets.

---

## THE RECOMMENDATION — "Concord"

### The problem (quantified)
- OTC derivatives confirmations are the binding legal record of a trade. Standardized cleared flow is electronically matched, but **tens of thousands of bespoke trades are still confirmed on long-form PDF/Word/email**, taking days-to-weeks. Historically **up to ~30% of OTC confirmations contain an error** requiring rebooking. **>80% of firms still negotiate agreements via email + Word/PDF** (ISDA Document Negotiation Survey, Jul 2024).
- **Origin story judges remember:** the **2005–08 credit-derivatives confirmation backlog crisis** — 14 dealers, **153,860 confirmations outstanding**, up to 90-day backlogs, requiring NY Fed / Geithner intervention (GAO-07-716). Twenty years later it still runs on PDFs.
- The same "extract → reconcile → a human is liable" shape recurs across corporate actions ($3–5M/yr lost per firm; 46% processed manually), collateral/margin (~45% of calls disputed), and trade/cash reconciliation (one bank: 500 recs/day, ~8M lines/day) — so the architecture generalizes.

### Why now (2024–2026)
- **ISDA itself published a paper (May 2025)** showing LLMs extracting CSA clauses into the Common Domain Model at **>90% accuracy** (100% on simple clauses) — the thesis is industry-validated, not speculative. CDM 6.0/7.0 shipped in 2025; OSTTRA launched AI paper-digitisation ("hours → minutes").
- **T+1 settlement** (US, May 2024; EU/UK/CH confirmed **11 Oct 2027**) compresses every post-trade timeline, raising the cost of a slow confirmation.
- **The governance vacuum is the opening:** Fed **SR 26-02 / OCC 2026-13 (Apr 2026) explicitly *exclude* generative & agentic AI** from model-risk scope, while **FINRA's 2026 report** makes genAI a core priority and expects firms to "store prompt and output logs, track model version, [apply] human-in-the-loop review." Banks must self-govern with no rulebook — so an AI tool that ships **with** provenance + audit + sign-off baked in is differentiated, not commoditized.

### Who feels it / who pays
- **Users:** derivatives middle-office / confirmations ops, collateral ops, and the supervisory reviewers who sign off — at dealers (JPM is top-3 OTC) and the buy-side.
- **Buyers:** sell-side dealers' post-trade ops; custodians (JPM Securities Services); or as an AI module sold into incumbent post-trade rails (OSTTRA, FIS, SmartStream).
- **ROI line for the pitch:** today = 2 analysts × multiple days × ~30% error rate; with Concord = seconds, with an auditable trail. JPM has publicly guided **ops headcount down ≥10% via AI** — quote it.

### What you build (MVP scope, 24–36h)
A web app with one core flow working end-to-end:
1. **Upload** two counterparties' confirmations (rendered as PDFs from public FpML/CDM samples).
2. **Extract** each into a CDM-lite JSON schema — per field: value + **source span + confidence**.
3. **Reconcile** field-by-field with **finance-aware comparators** (notional tolerance; day-count equivalence ACT/360 vs ACT/365; date normalization; rate-transposition detection e.g. 3.25 vs 3.52).
4. **Economic break report** — severity-ranked, dollar-quantified, each break linked to both source spans.
5. **Explain & draft** — LLM narrates each break's likely root cause and drafts the counterparty resolution message.
6. **Govern** — immutable, hash-chained audit record (prompt, output, model+version, sources, human approver, timestamp) in Postgres; human approve/reject; **exportable "regulator-ready" trail.**
7. *(Stretch, high-impact):* score your extraction against the native FpML as ground truth → show **"94% field accuracy"** live. No other candidate can show a number like this.

### Architecture (plays to your exact stack)
- **Ingestion agent** — PDF → text + layout, retaining character spans for provenance.
- **Extraction agent** — structured generation into the CDM-lite schema via tool-use / JSON-schema-constrained output; per-field citation + confidence. *(Your "structured generation" skill.)*
- **Retrieval/grounding** — embeddings + vector search to bind each field to its source span and to retrieve comparable clause templates. *(Your "vector search / retrieval systems" skill.)*
- **Reconciliation engine** — deterministic, finance-aware diff (not an LLM — keep money math auditable).
- **Explanation agent** — narrates breaks + drafts comms.
- **Governance layer** — hash-chained audit log in **Postgres** *(your skill)*; human-in-the-loop; model+version capture; export.
- **LLM:** Claude via the Anthropic API — a frontier tier (Claude Opus 4.8) for hard extraction/reasoning, a fast cheap tier (Claude Haiku 4.5) for classification/narration passes; swappable. Use tool-use for schema-constrained extraction.
- **Front end:** React/TypeScript *(your skill)*; consider JPMorgan's open-source **Perspective** lib for a slick break-grid (subtle sponsor nod).

### The demo script (<3 min, beat by beat)
1. **0:00** — "OTC confirmations caused a Fed-level crisis in 2008 and still run on PDFs. 30% have errors. Here's a JPM-aligned fix." (one slide, one number).
2. **0:20** — Upload two confirmations. Pipeline runs live.
3. **0:45** — Break report appears: red **$ deltas**, severity-ranked. Click a break → both source PDFs highlight the exact conflicting span (**provenance**).
4. **1:30** — "But AI can't be trusted in a bank unless it's governed." Show confidence scores, the human approve/reject, and the **exportable audit trail** (prompt, model+version, sources, approver) — "this is what FINRA's 2026 report asks for."
5. **2:10** — Show **"extraction accuracy: 94% vs ISDA's own FpML ground truth."**
6. **2:30** — ROI + roadmap slide: same engine → corporate actions, margin calls, ISO 20022 repair. "Compliance-by-design, agentic, on JPM's roadmap." Done.

### The moat / why it's not a wrapper
Finance-aware reconciliation comparators + the provenance-and-audit governance layer + a proprietary accuracy-eval harness + workflow integration. The hard, defensible parts are exactly the parts a generic "chat with your PDF" can't do and a bank won't deploy without.

### JPM-fit (say this to judges)
Maps to JPMorgan's **named** AI use case (reconciliation/exception resolution) and its compliance-by-design / agentic-AI strategy (LLM Suite at 200k+ employees; 450+ AI use cases in prod; "model-risk teams review every agent before release"; $19.8B 2026 tech budget). Build on **public** JPM-adjacent hooks where natural (FpML/FINOS CDM is open; Perspective is JPM open-source) and honestly mock anything gated.

### Risks & skeptic's mitigations
- *Extraction isn't 100% on bespoke clauses* → that's the point: **AI proposes, human disposes**; the value is in triage + provenance + audit, and you show the real accuracy number rather than overclaiming.
- *"Reconciliation looks solved"* → differentiate hard on the **root-cause narration + provenance + audit-trail**, not the matching.
- *Scope creep* → demo **one product type** (e.g., interest-rate swaps) end-to-end; mention the rest as roadmap.

---

## Runner-ups (and when to pick them instead)

- **② AI-memo provenance / "trust layer"** — if you'd rather ride the pure genAI/agentic wave and prefer EDGAR filings over derivatives domain. Strongest "new-tech-induced" story; slightly less defensible (citation-RAG is semi-commoditized) and no clean accuracy ground-truth. *Easiest pivot — it shares ~70% of Concord's architecture (extract + cite + audit).*
- **④ Real-time scam interceptor (RTP/FedNow)** — if you want the most visceral demo ("scam caught mid-flight") and the biggest headline number ($8.3B→$14.9B APP fraud; Jun 2025 Fed/OCC/FDIC RFI; US has no payee-verification mandate). Risk: the scam-scoring core is hard to make credible without real data — lean on the payee-check + irrevocability story.
- **⑥ Margin-call copilot** — if you want the *easiest* build with fully synthetic data. Risk: OSTTRA/Acadia are already shipping this, so defensibility is lower.

---

## Appendix — condensed problem inventory by vein

**GenAI-induced (bucket A):** provenance/hallucination in analytical docs (8–41% fabrication rates; KPMG/Deloitte withdrawn reports) · AI recordkeeping & supervision (>$3B off-channel fines since 2021; FINRA 2026 ask) · deepfake/voice-clone payment fraud (Arup $25.6M; US deepfake losses $1.1B in 2025, 3×) · RAG entitlement leakage (77% pasted company data into chatbots) · model-risk in the SR-11-7 vacuum · prompt injection in agentic workflows · AI-slop polluting research/alt-data.

**Legacy-unreplaced (bucket B):** OTC confirmations (~30% error; 2005–08 crisis) · corporate actions ($3–5M/firm/yr; 46% manual) · collateral/margin disputes ($1.4T margin; 45% disputed) · trade/cash reconciliation (Excel/EUDA swamp; €2.5M/yr saved in one case) · T+1 affirmation gap (bilateral ~91% vs prime-broker ~99%) · ISO 20022 MT-repair (STP as low as ~26%; $15–40/repair) · NAV/shadow-NAV (>80% run shadow books; Infinity Q >$1B) · reference-data/LEI (~$12.9M/yr per org) · syndicated loans (~T+15–20; JPM-led Versana cashless roll Oct 2025).

**Payments/treasury/reporting (bucket C):** RTP/FedNow APP fraud · cross-border investigations ($1.6B/yr industry) · ISO 20022 truncation · stablecoin/deposit-token recon (GENIUS Act; JPMD live Nov 2025; $33T stablecoin volume) · EMIR/MiFIR reject & pairing breaks (~1 in 5 derivatives don't reconcile) · CAT error rates (Citadel/IMC fines) · treasury cash-forecasting in Excel · SEC 10c-1a (SLATE).

**JPMorgan lens:** center of gravity = agentic AI + Payments; public hooks = `jpmorgan-payments` GitHub (incl. `pdp-mcp`), Fusion/PyFusion SDK, Perspective; top "would-love-solved" = agentic memo copilot, compliance-by-design for agents, **reconciliation/exception agent**, ISO 20022 intelligence, tokenized-collateral. Judge rule: named user + dollar/hour ROI + visible compliance + one flow working live in <3 min.

*(Full per-problem write-ups with sources are preserved in the research transcripts behind this report.)*
