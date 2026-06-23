# The Venture Thesis — FinanceHackLab NYC, built as a company (not a hackathon)

*Institutional / capital-markets focus · JPMorgan as a marquee client, not the market · solo full-stack + multi-agent builder · venture-scale ambition (the next fintech infrastructure company). Compiled 2026-06-23. Supersedes the hackathon-scoped `RESEARCH.md`/`PITCH.md`.*

---

## TL;DR — the company to build

**Canon** *(working name — alts: Tieout, Lineage, Tessera)* — **the AI trust layer for the unstructured, manual, high-consequence tail of capital-markets operations.**

You hand Canon a messy financial artifact — a corporate-action notice, a trade confirmation, a custodian statement, a margin call — and it turns it into a **structured, provenance-bound, validated record**: every extracted field carries an inline citation to its source span, a confidence score, deterministic finance-aware validation, and an **immutable, regulator-ready audit trail with a human sign-off.** AI proposes; the audit trail disposes.

- **Wedge:** corporate-actions processing — the single sharpest entry point ($58B/yr cost pool, ~46% still manual, the worst automation baseline in the back office, and direct multi-billion loss leakage you can price against).
- **Platform:** the same engine generalizes across the post-trade exception & document estate — reconciliation/breaks, confirmations, collateral, KYC docs, regulatory reporting.
- **Category:** the **system of record for machine-extracted financial truth** — the governance substrate that lets a regulated institution actually deploy AI on work that carries legal liability. This is the thing FINRA's 2026 report now *requires* and the thing the Fed/OCC model-risk rules explicitly *leave unaddressed*.

It satisfies **both halves of the brief at once:** a legacy process no prior tech replaced (extract → reconcile → a human is liable), unlocked by the most-adopted new tech (genAI), and gated by the new problem that same tech created (you can't trust/govern it inside a bank without provenance + audit).

---

## The one-paragraph thesis

Every wave of finance technology automated the *easy* half of operations — matching, settlement, messaging — once data is already clean and structured. None automated the *hard* half: **turning a bespoke human artifact (a PDF, an email, a multilingual notice, a 1980s-format message) into trustworthy structured truth that a system can act on.** That step still runs on humans because, until ~2 years ago, no software could read a bespoke financial-legal document well enough to be trusted with a number that has a comma in it. Now frontier LLMs can — *but only on templated documents; they still fall off a cliff on bespoke ones (see the benchmarks below).* And a regulated institution cannot put an AI between itself and a binding obligation unless that AI shows its work, quantifies its confidence, and leaves an auditable record of who approved what. **That gap — AI is finally good enough to do the work, but can't yet be trusted to do it inside a regulated institution — is the entire opportunity, and the governance layer that closes it is the moat.**

---

## How this was researched

A multi-agent sweep (17+ parallel research briefs), each constrained to institutional/capital-markets + adjacent finance, each required to quantify pain with **primary sources** and judge it on **venture** criteria (TAM, moat, why-now, wedge-to-platform), not demo-wow.

**Honesty on method:** This environment's egress proxy 403-blocked direct page fetches to most primary domains (SEC.gov, FINRA, Fed, DTCC, ISDA, market-research publishers), and the **Bigdata.com** ([bigdata.com](https://bigdata.com)) MCP connector was subscription-paused. So figures were captured via search-engine extraction of those same primary sources and **cross-checked across ≥2 independent reporters per number.** Soft/estimated figures are labeled. Several "headline" market numbers (e.g., $58B corporate-actions, $96B equity-fails, $100B first-party fraud) are association/vendor estimates — used directionally; hard regulator/issuer figures are leaned on for the pitch.

---

## The problem field, venture-ranked

Scored on Severity · TAM (with budget) · Why-now · Moat/defensibility · Founder-fit (solo full-stack+AI) · Wedge→platform. Weighted toward **moat × TAM × why-now**.

| # | Candidate company | Core pain | TAM anchor (sourced) | Why-now | Moat | **/30** |
|---|---|---|---|---|---|:--:|
| **①** | **Canon — AI trust layer for the ops tail (lead: corporate actions)** | Unstructured artifact → trusted record; a human is liable | **$58B/yr** CA cost pool (DTCC); post-trade software $6–10B; recon ~$2B | LLMs finally parse bespoke notices; T+1; FINRA 2026 + SR 26-2 gap | Provenance eval + deterministic finance logic + immutable audit + cross-counterparty network + value-capture pricing | **28** |
| ② | Post-trade reconciliation / breaks network | Daily swivel-chair break investigation | $33B/day Treasury fails; recon sw ~$2–2.6B, 15% CAGR | T+1 (US 2024, EU/UK Oct 2027) | Cross-counterparty data network (real, but monetization proven-hard) | 25 |
| ③ | AI governance / recordkeeping for finance | Can't supervise/log what AI says | $3.2B+ fines as demand signal; DCGA/surveillance market | FINRA 2026 logging+HITL; SR 26-2 carve-out | Connector breadth + proprietary compliance data — **but crowding fast** | 24 |
| ④ | KYC / onboarding / perpetual-KYC | 38 weeks & ~$25k to onboard a corporate (Fenergo) | FCC market **~$25–26B** (Chartis); KYC/KYB FS spend ~$20B | pKYC shift; agentic AI | Data + workflow lock-in; crowded (Fenergo, nCino, Quantexa) | 23 |
| ⑤ | Regulatory / trade-transaction reporting | EMIR/MiFIR/CFTC breaks & repair | Narrow reg-reporting sw **$5.7B**; trade-reporting slice ~$2–3B | EMIR Refit, CFTC Rewrite | Rules-as-code + audit; incumbents entrenched (Droit, Kaizen) | 23 |
| ⑥ | First-party / "friendly" fraud & disputes | Chargeback + Reg E dispute ops | **~$100B/yr** first-party fraud (Socure); ~261M chargebacks (Mastercard) | Frictionless mobile checkout; first-party fraud doubled '23→'24 | Cross-merchant data network — incumbents already hold it | 22 |
| ⑦ | Deepfake / synthetic-identity fraud | KYC/voice/exec-impersonation fraud | Deloitte: US fraud **$12.3B→$40B by 2027** | Arup $25M; deepfake every 5 min | Fraud-signal data network; model-treadmill risk | 21 |
| ⑧ | Open-banking infrastructure | Data-access, recon, liability | JPM now charging aggregators (~$300M/yr to Plaid) | CFPB 1033 — **but rule is enjoined** | Plaid/MX/Akoya own the rails | 19 |

**① wins** because it's the only candidate that scores top marks on *both* defensibility (the provenance-and-audit governance layer + deterministic finance comparators + a proprietary accuracy-eval harness are a genuine moat, not a wrapper) *and* a clean, public ground-truth path (FpML / FINOS CDM / ISO 20022 schemas → a real, demonstrable accuracy number) — while fusing both halves of the brief and absorbing candidate ③'s regulatory tailwind as a built-in *feature* rather than competing in that crowded lane head-on.

---

## THE RECOMMENDATION — "Canon"

### What it is
An AI-native platform that converts the **unstructured, high-consequence artifacts of capital-markets operations into a trusted, structured, auditable record.** Five-stage agentic pipeline, with the money-math kept deterministic:

1. **Ingest** — PDF / email / SWIFT message / scan → text + layout, retaining character spans for provenance.
2. **Extract** — structured generation into a canonical schema (CDM-lite / ISO 20022-aligned); **per field: value + source-span citation + confidence.**
3. **Validate / reconcile** — *deterministic, finance-aware* comparators (date normalization, day-count equivalence, ratio/notional tolerance, cross-source golden-record resolution). Not an LLM — keep money math auditable.
4. **Explain** — narrate each exception's likely root cause; draft the counterparty/ops resolution.
5. **Govern** — immutable, hash-chained audit record (prompt, output, model + version, sources, human approver, timestamp); human approve/reject; **exportable regulator-ready trail** — the exact artifact FINRA's 2026 report asks for.

### The wedge: corporate actions (why it's the sharpest entry)
- **Cost pool:** DTCC brands corporate actions **"The $58B problem,"** growing ~10%/yr, **automation below 40%** *(association estimate — use directionally)*. Hard anchors: **~46% of CA event data still processed manually**, only **~17%** sent via ISO 20022, **~71% STP even on mandatory/income events**, **75% of participants manually re-validate** vendor data against each other (ValueExchange 2024; Citi 2025 Asset Servicing).
- **Asymmetric loss = willingness to pay + demand for provenance:** a single fat-fingered ratio or missed election is a direct, often uninsured loss (the France Télécom one-day-late rights instruction: **€574,750** lost on one event; Oxera/DTCC: **€1.6–8B/yr** front-office risk). Buyers *insist* on validation and audit — Canon's exact strengths.
- **A built-in value-capture business model:** Scorpeo quantifies **$10B+/yr of shareholder value leaked** on sub-optimal/missed *voluntary* elections (~$1.3B/yr on scrip dividends alone). Canon can price on **value recovered**, not seats — the highest-trust pricing model, available from day one.
- **Cleanest "why now":** the historical blocker was turning a prospectus/registrar letter/multilingual notice into validated structured terms — *exactly* what modern LLMs do. The bottleneck that defeated 20 years of ISO standardization is now tractable.
- **Underserved by AI-natives:** *no well-funded pure-play AI corporate-actions startup exists* — the capability is being absorbed by incumbents (Broadridge ~40% of global CA volume; DTCC) and a Chainlink + Swift + Euroclear + DTCC + 24-institution consortium whose Phase 2 (2025) used GPT/Gemini/**Claude** to reach **100% on confirmed records**, output as ISO 20022 "in minutes not days." **This is the biggest strategic risk to the CA wedge** — you'd be racing a utility consortium. The opening: be the **independent, audited-accuracy, value-capture** layer that feeds or out-flanks it, monetizing the $10B+ voluntary-election leakage the consortium isn't pricing against.
- *Sourcing honesty:* the **$58B is a Citi 2025 estimate** (single-vendor, amplified by the Chainlink campaign); the older "$1.6B" figure is Oxera 2004 (EUR, stale). The **hard** anchors are: ~46% manual, <40% STP (ValueExchange); Robinhood's **$57M** loss on one mishandled reverse split; ~1.3M DTC-eligible securities.

### The alternative lead wedge — OTC / ISDA documentation & confirmations
Two independent research veins ranked this **#1**, because it is the cleanest greenfield in all of capital markets: **>80% of ISDA Master/CSA negotiations still run on email + Word/PDF, ~29% take >6 months, and there has been *zero* speed improvement since ISDA's 2006 survey** (ISDA Document Negotiation Survey, Jul 2024). OSTTRA owns the *standardized/cleared* confirmation rails (MarkitWire, 80M+ trades/mo) but the **bespoke/uncleared** tail is its structural blind spot — and ISDA itself open-sourced the **CDM data standard** (via FINOS) and validated LLM extraction at >90%. The adjacent **collateral/margin** pool is the largest in the building (**$1.6T** total IM+VM, ISDA YE2025; Acadia $1T/day). **Trade-off vs. corporate actions:** OTC docs = deeper unsolved pain + better buy-side fit (faster first revenue) + less consortium competition, but a nichier headline number and OSTTRA owns distribution; corporate actions = bigger blessed TAM + cleaner two-document demo, but a utility consortium is already racing. **Recommendation:** demo on corporate actions (most legible, biggest number, killer anecdotes), architect the engine document-type-agnostic, and fast-follow into OTC docs + collateral — the same provenance-and-network platform serves both.

### The platform & the category
Same engine, next pins: **reconciliation/breaks** (the cross-counterparty network — $33B/day Treasury fails; T+1 in EU/UK Oct 2027 is a dated forcing function), **OTC confirmations**, **collateral/margin**, **KYC documents**, **regulatory-reporting repair**. The destination category is **the system of record for machine-extracted financial truth** — and once Canon holds the provenance-bound canonical record + audit history for a customer's events, rip-and-replace is painful (system-of-record lock-in).

### The white space (the clincher — why nobody owns this yet)
The competitive sweep found a clean, exploitable gap. Every AI-native venture dollar in finance has flowed to one of two places:
- **Front-office research copilots** — Rogo (**$2B**, JPM-backed), Hebbia ($700M), AlphaSense ($7.5B), Brightwave, Finster. They *read and analyze*; they stop at the analyst's desk.
- **Corporate-accounting / CFO-office tools** — Basis ($1.15B), Campfire, Rillet, Digits, Numeric, Tabs, Klarity. They automate the *SMB/mid-market accounting* close.

**The capital-markets back/middle office — post-trade, reconciliation, corporate actions, NAV/fund accounting, regulatory reporting — has no AI-native, venture-scale challenger.** It is defended by legacy incumbents retrofitting AI onto decades-old rails: **OSTTRA** (KKR-owned at $3.1B; its core, MarkitWire, is ~20-year-old SwapsWire tech; it self-describes as an *"expert user of AI, not a frontier researcher,"* bolting Google Vertex ML onto legacy and shipping a "Paper Digitisation Module" for PDF confirms) and **Broadridge** ($6.9B revenue on ADP-heritage batch infrastructure; its OpsGPT agent does fails-research + break-resolution + email automation and it pitches *"up to 30% Day-1 cost reduction"* — an admission of how expensive the legacy status quo is). That both **validates the pain** (the incumbents are scrambling) **and defines the wedge**: AI-native + provenance/audit-to-spec + a cross-counterparty network beats a legacy retrofit. This empty quadrant *is* the company.

### Why now (2024–2026), quantified
- **LLM capability crossed the line — but only on templated docs (this asymmetry IS the product):** ISDA's own May 2025 study extracts CSA clauses into CDM at **>90% (up to 100% on standardized clauses)** — but materially lower on bespoke, cross-referenced terms even with domain priming. ContractEval 2025: best frontier model tops out at **~0.64 F1 across clause types and ~0 F1 on rare/bespoke clauses.** FinanceBench: GPT-4-Turbo + RAG answers only **~19% of real 10-K questions correctly.** *Translation: raw LLM = unusable alone on bespoke finance docs; the value is in the provenance + deterministic validation + human-in-the-loop triage that makes it deployable. That scaffolding is the moat, not the model.*
- **The governance regime just made provenance mandatory:** FINRA's **2026** Annual Regulatory Oversight Report expects firms to *"[store] prompt and output logs … track which model version was used and when … validation and human-in-the-loop review."* Off-channel/books-&-records enforcement has hit **$3.2B+ across 100+ firms** (SEC >$2B + CFTC >$1.23B since Dec 2021) — proof regulators will pay-to-punish missing audit trails.
- **The model-risk rulebook explicitly leaves the gap open:** Fed **SR 26-2** / OCC **2026-13** (Apr 17, 2026) supersede SR 11-7 and state generative & agentic AI are *"novel and rapidly evolving … not within the scope of this guidance,"* with only a future RFI promised. Banks must self-govern genAI with no rulebook — so a tool that ships **with** provenance + audit + sign-off baked in is differentiated, not commoditized.
- **T+1 + ISO 20022** compress every post-trade timeline (US live May 2024; EU/UK/CH locked for **11 Oct 2027**), raising the cost of slow, manual exception handling.

### The moat (the VC "is-this-a-wrapper?" test, answered)
**The single most important finding across every sub-domain researched:** *AI lowers the cost of extracting structured data from a messy artifact, but it does **not** create the moat — **data access, the inter-counterparty network, and chain-of-trust do.*** Whoever owns the attested golden record wins; an LLM wrapper alone has no defensibility. Canon is architected so the durable value accrues to exactly those layers:
1. **Proprietary accuracy-eval harness + ground truth** — score extraction against FpML/CDM/ISO 20022 natives → a defensible, referenceable accuracy number on the unstructured tail that *no incumbent and no consortium has published.* Where loss is asymmetric (corporate actions, confirmations), **verified accuracy *is* the product.**
2. **Deterministic finance-aware logic** — the reconciliation/validation comparators are domain IP, not GPT calls; they keep the money-math auditable and are exactly what a "chat-with-your-PDF" can't do and a bank won't deploy without. (Practitioners report pure-LLM reconciliation hits an **85–92% accuracy ceiling**; the last 8–15% — the part that gets you fined — needs deterministic domain code, not bigger prompts.)
3. **Immutable provenance + audit substrate** — the system-of-record status; high retention, painful to rip out; *and* the literal deliverable FINRA 2026 demands.
4. **Cross-counterparty network effect (phase 2)** — a shared golden record gets better with every institution added (the AccessFintech / Saphyre "onboard-once, reuse-across-counterparties" thesis — but note AccessFintech's cautionary tale: every bulge-bracket bank on the cap table, still ~$8M revenue, so *build the agent first, earn the network second; don't lead with the consortium*).
5. **Value-capture pricing** — charging on recovered leakage aligns price to value and structurally out-competes flat-fee incumbents.

**The 5-question wrapper test (self-audit a VC/judge will run):** (1) *24-hour-clone* — could a team rebuild this in a weekend with Claude + a system prompt + your UI? (2) *Data-asset* — does each transaction make *your* models measurably better in a way a new entrant can't buy? (3) *Network* — does customer #50 improve the product for customer #1? (4) *Rip-out* — if they churn, do they lose their system-of-record / audit evidence, or just a nicer UI? (5) *Accuracy-frontier* — on the bespoke/rare cases where benchmarks show LLMs collapse (ContractEval ~0 F1 on rare clauses; FinanceBench ~19%), do you win *because of* proprietary labels + deterministic logic? Canon is designed to pass all five; a pure GPT wrapper fails 1, 3, and 5 and is un-fundable as "the next billion-dollar company."

### Architecture (and how the toolchain maps)
- **Ingestion / extraction / explanation agents:** Claude via the Anthropic API — frontier tier (Claude Opus 4.8) for hard extraction/reasoning, fast tier (Claude Haiku 4.5) for classification/narration; tool-use / JSON-schema-constrained output for the canonical schema.
- **Reconciliation engine:** deterministic finance-aware comparators (your code, not an LLM).
- **Ledger / system-of-record:** **Campfire** (campfire.ai, AI-native ERP/GL) as the accounting system of record — book transactions, revenue recognition, multi-entity close via its GL/API instead of building double-entry from scratch.
- **Audit store:** **Supabase** (Postgres + RLS) for the hash-chained, exportable audit trail; **Clerk** for verified approver identity + org/RBAC multi-tenancy.
- **Deploy:** **Replit** (Agent + Deployments/Reserved VM) for MVP → early production and the deploy story; graduate data/security tier (dedicated VPC, residency, model-risk controls) for regulated scale. **Vercel** for the edge front-end/dashboard.
- **Data grounding:** **Bigdata.com** for entity/reference-data grounding; **Gmail/Workspace** as the document-ingestion pipe (notices/statements arriving by email).
- **Monetization & ROI:** **Stripe** (usage/seat billing); **Ramp** (spend benchmarks to quantify customer ROI in the sales motion).
- **GTM/design:** **Figma** (UI), **tldraw** (architecture/workflow canvas), **Canva** (deck), **Higgsfield** (pitch/sales video).

### Business model & pricing
Land on a **platform-access base fee + per-event/per-document usage**; expand to **outcome/value-capture pricing** (revenue-share on recovered voluntary-election leakage and avoided losses) once attribution data exists. Infrastructure economics: **65–80% gross margins**, low churn, expansion-led NRR.

**Vertical-AI unicorn precedent (the playbook is proven):** the breakout vertical-AI companies validate every piece of this — **Rogo** (AI analyst for finance, **$2B**, J.P. Morgan/Thrive/Sequoia/Kleiner-backed, 35k+ users) proves finance vertical-AI is venture-scale and that JPM funds it; **Harvey** ($11B legal) proves the *design-partner trust cascade* (win the marquee names first, trust flows down-market); **Sierra** ($15.8B) proves **outcome-based pricing** for AI agents ("pay only when the agent achieves the outcome") — the model Canon graduates into; **Basis** ($1.15B autonomous accounting) and **Campfire** prove autonomous, action-taking finance agents get funded. The pattern: *vertical + design partners + usage/outcome pricing + a system-of-record moat.* Canon is that pattern aimed at the one finance quadrant none of them touch.

### GTM / beachhead ($0 → $1M → $100M)
- **$0→$1M:** 5–15 paid design-partner institutions at ~$50–150k ACV. **Lead with buy-side (hedge funds / smaller asset managers) + asset servicers' innovation teams** — single budget owner (PM/CIO/COO), acute P&L urgency, minimal procurement theater. **Get SOC 2 Type II *before* selling** (it's a procurement gate, not a badge; ~$40–120k first year). Land one workflow (corporate actions), prove audited ROI, bank the reference logo. **JPM is the marquee design partner / named-use-case validator — not the whole market.**
- **$1M→$10M:** productize the security/procurement playbook (it's your gating constraint); push NRR >120% via usage expansion; add pins 2–3; move into **mid-tier/regional banks** (real budgets, can't-build urgency, lighter procurement than tier-1).
- **$10M→$100M:** multi-product platform; **tier-1 dealers + custodians** (6–7-figure ACV now justifies 9–18-mo cycles); the cross-counterparty network + embedded/API distribution (the Plaid/Stripe pattern) carries the curve.
- **Market beyond JPM:** custodians & asset servicers (BNY, State Street, Citi, JPM Securities Services), global asset managers & hedge funds, sell-side dealers, fund admins, CSDs — a global asset-servicing/post-trade estate.

### Competitive landscape & white space
- **Post-trade incumbents bolting AI on:** SmartStream (ICD-owned), Duco (Nordic Capital), Gresham (STG), S&P/IHS Markit (CA scrubbing), Broadridge (OpsGPT + DeepSee stake), FIS, Xceptor. **White space:** none has a published, audited extraction-accuracy number on the bespoke tail, and all price flat-fee.
- **Network play:** AccessFintech (JPM/GS/Citi/BNP/BlackRock on cap table; ~$97M raised; thin revenue — distribution ≠ monetization).
- **AI-governance startups (the lane Canon absorbs as a feature):** Norm Ai (~$87M), Greenboard, Credo AI, Fiddler; exits Robust Intelligence→Cisco, CalypsoAI→F5 ($180M) — validation that governance is a real budget, and a signal *not* to build a standalone governance pure-play.
- **Value-capture incumbent to study:** Scorpeo (voluntary-CA leakage recovery) — a model to emulate, not a head-on competitor.
- **The consortium (Chainlink/Swift/DTCC/Euroclear):** the biggest strategic risk — but slow, blockchain-flavored, and unproven on accuracy. Canon wins as the **best-accuracy extraction/validation engine** that feeds or out-flanks it, or via the value-capture wedge.

### Risks & skeptic's mitigations
- *"Extraction isn't 100% on bespoke clauses"* → **that's the thesis.** AI proposes, human disposes; the value is triage + provenance + audit, and you show the *real* audited accuracy number rather than overclaiming.
- *"The consortium/incumbents will build it"* → they're slow and have published no accuracy; win the audited-accuracy benchmark and the value-capture wedge first; partner from strength.
- *"Reconciliation/governance look crowded/proven-hard to monetize"* (AccessFintech) → don't lead with the network or a governance pure-play; lead with the **corporate-actions value-capture wedge** (clean ROI, outcome pricing), earn the network second.
- *"Replit/Campfire aren't production-grade for regulated money"* → true; they're the MVP + GL-of-record + deploy story. Graduate the regulated data/security tier (VPC, residency, BAAs, model-risk) as you scale — a known, budgeted path, not a blocker.
- *Scope creep* → demo **one event type** (e.g., mandatory cash dividend, then a voluntary tender) end-to-end; everything else is roadmap.

---

## Runner-ups (and when to pivot to them)
- **② Reconciliation network** — if you'd rather ride the bulge-bracket cap-table/network story; shares ~70% of Canon's architecture. Pivot risk: monetization (see AccessFintech).
- **③ AI governance/recordkeeping** — if you want the purest regulatory tailwind and a horizontal (non-capital-markets) market. Pivot risk: crowding + incumbent archiving data moats; better as Canon's feature.
- **⑥ First-party fraud** — if you want the biggest headline number ($100B) and a consumer-payments market. Pivot risk: crowded, incumbents own the data network, off-thesis for capital markets.

---

## Tool / sponsor map (every sponsor has a real job)
| Layer | Tool | Job in Canon |
|---|---|---|
| Ledger / system of record | **Campfire** (campfire.ai) | AI-native GL — book transactions, rev-rec, multi-entity close via API |
| Build + deploy | **Replit** | Agent build + Deployments (MVP → early prod; deploy story) |
| Edge front-end | **Vercel** | Dashboard + marketing site at the edge |
| Audit datastore | **Supabase** | Hash-chained, exportable regulator-ready audit trail (Postgres + RLS) |
| Approver identity | **Clerk** | Verified human sign-off + org/RBAC multi-tenancy (SSO/SAML) |
| Reference grounding | **Bigdata.com** | Entity / reference-data grounding for extraction |
| Ingestion | **Gmail / Workspace** | Notices/statements/confirmations arriving by email |
| Billing | **Stripe** | Usage/seat metering for SaaS revenue |
| ROI in the sale | **Ramp** | Spend benchmarks to quantify customer savings |
| Pitch video | **Higgsfield** | AI sizzle reel for fundraise/sales |
| Deck / UI / canvas | **Canva / Figma / tldraw** | Deck, product UI/design system, architecture & workflow diagrams |

---

## Appendix — hard numbers & sources (curated)
- **Corporate actions:** "$58B problem," <40% automation (DTCC / Chainlink-Swift-DTCC-Euroclear consortium PR, Sep 2025); ~46% manual, ~17% ISO 20022, ~71% STP (ValueExchange 2024); 75% manual re-validation (Citi 2025 Asset Servicing); $10B+/yr voluntary-election leakage, ~$1.3B/yr scrip (Scorpeo); €1.6–8B/yr risk, €574,750 France Télécom event (Oxera/DTCC 2018).
- **Reconciliation / settlement:** ~$33B/day US Treasury fails (DTCC 2025); recon software ~$2.1–2.65B, ~15% CAGR (Fortune Business Insights, Market.us); Citi fat-finger $444B entered / ~$1.4B executed / £62M fines (FCA/PRA, May 2024); T+1 EU/UK/CH 11 Oct 2027 (EU OJ, Oct 2025).
- **LLM accuracy (why-now):** ISDA "Benchmarking GenAI for CSA Clause Extraction & CDM" (15 May 2025) — >90%/up-to-100% on standardized, lower on bespoke; ContractEval (arXiv 2508.03080) best ~0.64 F1, ~0 on rare clauses; FinanceBench (Patronus, arXiv 2311.11944) GPT-4-Turbo+RAG ~19% correct.
- **Governance regime:** FINRA 2026 Annual Regulatory Oversight Report (prompt/output/model-version logging + HITL); SEC+CFTC off-channel **$3.2B+** since Dec 2021 (SEC PR 2022-174, 2024-98, 2025-6; CFTC PR 9114-25); Fed **SR 26-2** / OCC **2026-13** (17 Apr 2026) — genAI excluded from MRM scope; EU AI Act 2024/1689 (credit-scoring high-risk; high-risk deadlines moving to 2 Dec 2027 via Digital Omnibus, not yet OJ-published as of 23 Jun 2026).
- **Market context:** post-trade software $6–10B (TBRC, Dataintelo); IDP ~$3B, ~33% CAGR, BFSI ~31.7% (MarketsandMarkets); FCC ~$25–26B (Chartis FCC50 2024); narrow reg-reporting software $5.7B (Verified Market Reports); CIB operate spend ~$159B / ~$35B tech (Coalition Greenwich 2024).
- **OTC docs / collateral (alt wedge):** >80% of ISDA negotiations on email+Word/PDF, ~29% take >6 months, zero improvement since 2006 (ISDA Doc Negotiation Survey, Jul 2024); CDM open-sourced via FINOS; total IM+VM **$1.6T**, record IM $524.7B (ISDA Margin Survey YE2025); OTC notional **$846T** (BIS, Jun 2025); Acadia >$1T collateral/day; institutional KYC ~$2,598/client & ~95 days (Fenergo).
- **Incumbents to displace/out-flank:** OSTTRA (KKR-owned, **$3.1B** EV, +6-bank minority Feb 2026; core MarkitWire ~20-yr-old tech; "expert user of AI, not frontier researcher"); Broadridge ($6.9B rev, ADP-heritage; OpsGPT agentic fails-research/break-resolution, "up to 30% Day-1 cost cut," DeepSee stake); Saphyre ($70M FTV Jul 2025, "onboard once"); AccessFintech (~$97M, thin rev); SmartStream/Duco/Gresham; Chainlink-Swift-Euroclear-DTCC CA consortium.
- **Toolchain:** Campfire $108M raised, $65M Series B co-led Accel & Ribbit, Oct 2025 (campfire.ai; TechCrunch; CFO Brew), Replit is a Campfire customer; Replit Agent + Deployments, SOC 2 Type II Enterprise.
- **Vertical-AI unicorn precedent / comps:** Rogo **$2B** (Series D, Kleiner, Apr 2026; JPM/Thrive/Sequoia-backed); Harvey $11B; Sierra $15.8B (outcome-based pricing); Glean $7.2B; Hebbia $700M; AlphaSense $7.5B; Basis $1.15B (autonomous accounting); Norm Ai ~$140M raised. AI-security/governance is a *feature that gets acquired*: Robust Intelligence→Cisco, CalypsoAI→F5 ($180M), Protect AI→Palo Alto (~$650–700M est.), Lakera→Check Point (~$300M est.) — i.e., *don't* build a standalone governance pure-play; bake it in.

*(Full per-brief write-ups with URLs are preserved in the research transcripts behind this thesis. Soft/estimated figures labeled throughout; hard regulator/issuer figures preferred for the pitch.)*
