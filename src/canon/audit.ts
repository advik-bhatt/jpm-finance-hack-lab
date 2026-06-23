// Canon — immutable, hash-chained audit trail.
//
// This is the literal artifact FINRA's 2026 report asks for: every step logged
// with its inputs, the model + version, and a human approver. The chain is real:
// each entry's hash covers the previous hash, so tampering with any earlier entry
// breaks every hash after it. In production this lands in Supabase (Postgres);
// here it runs in the browser via Web Crypto so the demo's audit trail is genuinely
// tamper-evident, not faked.

export type AuditPayload = {
  actor: string
  actorVerified: string // e.g. "Clerk · verified"
  action: string
  detail: string
  model?: string // model + version captured for every AI step
}

export type AuditEntry = AuditPayload & {
  seq: number
  ts: string
  payloadHash: string
  prevHash: string
  hash: string
}

const GENESIS = '0'.repeat(64)

async function sha256Hex(input: string): Promise<string> {
  const bytes = new TextEncoder().encode(input)
  const digest = await crypto.subtle.digest('SHA-256', bytes)
  return [...new Uint8Array(digest)]
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

export async function appendEntry(
  chain: AuditEntry[],
  payload: AuditPayload,
): Promise<AuditEntry> {
  const prevHash = chain.length ? chain[chain.length - 1].hash : GENESIS
  const seq = chain.length + 1
  const ts = new Date().toISOString()
  const payloadHash = await sha256Hex(JSON.stringify({ seq, ts, ...payload }))
  const hash = await sha256Hex(prevHash + payloadHash)
  return { ...payload, seq, ts, payloadHash, prevHash, hash }
}

// Re-derive every hash and confirm the chain is intact (the integrity check a
// regulator or auditor would run on the exported trail).
export async function verifyChain(chain: AuditEntry[]): Promise<boolean> {
  let prevHash = GENESIS
  for (const e of chain) {
    const payloadHash = await sha256Hex(
      JSON.stringify({
        seq: e.seq,
        ts: e.ts,
        actor: e.actor,
        actorVerified: e.actorVerified,
        action: e.action,
        detail: e.detail,
        model: e.model,
      }),
    )
    const expected = await sha256Hex(prevHash + payloadHash)
    if (payloadHash !== e.payloadHash || expected !== e.hash || prevHash !== e.prevHash)
      return false
    prevHash = e.hash
  }
  return true
}

// Regulator-ready export — the whole chain plus a head hash, downloadable as JSON.
export function exportTrail(chain: AuditEntry[], meta: Record<string, unknown>) {
  return {
    schema: 'canon.audit.v1',
    exportedAt: new Date().toISOString(),
    headHash: chain.length ? chain[chain.length - 1].hash : GENESIS,
    ...meta,
    entries: chain,
  }
}
