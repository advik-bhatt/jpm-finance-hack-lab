# Concord — The Pitch Story

*The narrative the product comes from. Open every demo, deck, and README with this.*

---

## The logline (one sentence)

> Every day, across every bank, thousands of people are paid to open a PDF and find the one number that disagrees with another system — and the technology that could finally do it for them is the one technology their compliance department won't let them use. **Concord is how a bank finally lets the AI do it.**

## The refrain (say it twice, end on it)

> **The AI proposes. The audit trail disposes.**

---

## The story — "The Break"

**7:14 p.m. Maya is still at her desk.**

Maya is a confirmations analyst at a global bank. Her job, in theory, is to make sure that when two banks agree on a trade, both banks wrote down the *same* trade. In practice, her job is to open PDFs.

Tonight it's an interest-rate swap. Her bank's system says the fixed rate is **3.25%**. The confirmation that just landed in her inbox — a 14-page PDF from the counterparty — says **3.52%**. Twenty-seven basis points. On a $50 million swap that's tens of thousands of dollars a year flowing the wrong way, hundreds of thousands over the life of the trade. That's not a typo. That's a number with a comma in it.

So Maya does what she did yesterday, and the day before. She reads the PDF. She finds the rate on page 9. She opens a spreadsheet. She writes the email — *"Hi, flagging a possible discrepancy on the fixed rate, can you confirm 3.25 vs 3.52…"* She marks the trade unconfirmed. She moves to the next item in the queue.

There are forty more.

Here's the thing about Maya's queue: **it is the same queue at every bank, on every desk, in every asset class.** Swap confirmations. Corporate-action notices. Margin calls that arrive as PDFs. Nostro breaks reconciled in Excel. Cross-border payments frozen in an investigations inbox. Different words, identical shape — *one system says one thing, another system says another, and a human who is personally, legally on the hook has to open the document and find out why.*

This is the most expensive repeated motion in finance, and almost no one outside the building has heard of it. Up to **30% of OTC confirmations contain an error.** The industry burns **over $1.6 billion a year** just investigating stuck payments. A single mishandled corporate action has cost firms **tens of millions.** And this exact process — derivative confirmations, done by hand — is what seized up in 2008: **153,860 confirmations outstanding,** backlogs past 90 days, the New York Fed hauling fourteen dealers into a room to demand they fix it.

That was eighteen years ago. **Maya is still opening PDFs.**

**Why?** Because every wave of technology fixed the easy half and left Maya the hard half. We automated the *matching* — when both sides send clean structured data, computers reconcile it in milliseconds. But the world doesn't send clean structured data. It sends a 14-page PDF, a forwarded email, a scanned term sheet, a legacy message with a "+" where the address got truncated. The unsolved step was never the matching. It was **turning the messy human artifact into trustworthy structured truth** — and until two years ago, no software could read a bespoke legal document well enough to be trusted with a number that has a comma in it.

Now one can. Large language models can finally read Maya's PDF. **So why isn't this solved?**

Because Maya works in a *bank.* And a bank cannot put an AI between two counterparties and a binding legal contract if that AI sometimes invents the answer, can't show its work, and leaves no record of who approved what. The regulators just made it official: in 2026 the Fed wrote generative AI *out* of its model-risk rulebook for being "too novel," while FINRA wrote it *in* as a top priority — demanding firms log every prompt, every output, every model version, every human sign-off. The one technology that can finally read the PDF is the one technology Maya's compliance department won't let her touch.

**That gap — AI is finally good enough to do the work, but can't yet be trusted to do it inside a bank — is the entire opportunity.**

Concord closes it. You hand it the two documents. It extracts every field and shows you **exactly where on the page each number came from.** It runs the reconciliation and surfaces the break — 3.25 versus 3.52 — ranked by the dollars at risk. It explains the likely cause and drafts Maya's email. And every step is written to an immutable, citable audit trail with a human approver's name on it — *the exact record FINRA now asks for.* The AI proposes. The audit trail disposes. Maya stays in charge. She just stops opening PDFs.

**7:14 p.m. Maya tags the last break, approves the resolution, and closes her laptop. The queue is empty. She goes home.**

We call it **Concord** — because the whole job, this entire $1.6-billion-a-year motion, was only ever about getting two systems to *agree.*

---

## The 30-second spoken cold-open (for the live pitch)

> "It's 7 p.m. and Maya is still at her desk, opening a PDF. She's a confirmations analyst — her job is to check that when two banks agree on a trade, both wrote down the same trade. Her system says the swap rate is 3.25%. The counterparty's 14-page PDF says 3.52%. So she reads it, finds page 9, opens Excel, writes an email, flags the break — and moves to the next of forty. That same queue runs at every bank, every desk: a document disagrees with a system, and a human on the legal hook has to find out why. 30% of these confirmations have errors. It's what froze the market in 2008. AI can finally read that PDF — but no bank will let it near a binding contract without provenance and an audit trail. That's the gap we close. This is Concord."

---

## Story beat → demo beat → sponsor (how the narrative drives the build)

| Story beat | What the judge sees in the demo | Sponsor doing the work |
|---|---|---|
| "She reads the PDF, finds page 9" | Upload two confirmations; fields extract with the **source span highlighted** on the page | Bigdata.com (entity/reference grounding) |
| "3.25 versus 3.52" | The **break report** — severity-ranked, dollar-quantified | (core engine) |
| "She writes the email" | One-click **drafted resolution message** | Gmail (send from the inbox it arrived in) |
| "Who approved what" | **Human approver** signs off; name + identity captured | Clerk (verified approver identity) |
| "An immutable, citable audit trail" | Exportable, hash-chained **regulator-ready log** | Supabase (Postgres audit store) |
| "The queue is empty. She goes home." | Live, deployed, shareable | Vercel (deploy) |
| The cold-open itself | A 20-second **story video** to open the pitch | Higgsfield (generate) · Canva (deck) |

The emotional story stays clean — no tool names on stage. The sponsors live in *how it's built*, revealed in the architecture slide right after the demo lands.

---

*Grounding (all from the research file): ~30% OTC confirmation error rate; $1.6B/yr cross-border investigations (Swift); corporate-action losses in the tens of millions; 2008 backlog — 153,860 confirmations, NY Fed / 14 dealers (GAO-07-716); 2026 Fed SR 26-02 excludes genAI from model-risk scope while FINRA's 2026 report makes it core and demands prompt/output/model-version logging + human-in-the-loop.*
