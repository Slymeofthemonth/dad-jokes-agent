# Dad Jokes Agent 🃏

Premium dad jokes, delivered fresh. Paid API via x402.

*Why did the API return 402? Because good jokes aren't free!*

## Endpoints

| Endpoint | Price | Description |
|----------|-------|-------------|
| `/entrypoints/health/invoke` | Free | Health check |
| `/entrypoints/joke/invoke` | $0.001 | Get a random dad joke |
| `/entrypoints/jokes/invoke` | $0.005 | Get multiple jokes (1-10) |

## Usage

### Get a joke

```bash
curl -X POST https://dad-jokes-agent-production.up.railway.app/entrypoints/joke/invoke \
  -H "Content-Type: application/json" \
  -d '{"input": {}}'
```

Response:
```json
{
  "joke": "Why don't scientists trust atoms? Because they make up everything!",
  "category": "general",
  "timestamp": "2026-02-03T04:00:00.000Z"
}
```

### Get multiple jokes

```bash
curl -X POST https://dad-jokes-agent-production.up.railway.app/entrypoints/jokes/invoke \
  -H "Content-Type: application/json" \
  -d '{"input": {"count": 5}}'
```

Response:
```json
{
  "jokes": [
    "Why did the scarecrow win an award? He was outstanding in his field!",
    "What do you call a fake noodle? An impasta!",
    "Why do programmers prefer dark mode? Because light attracts bugs!"
  ],
  "count": 3,
  "timestamp": "2026-02-03T04:00:00.000Z"
}
```

### Health check

```bash
curl -X POST https://dad-jokes-agent-production.up.railway.app/entrypoints/health/invoke \
  -H "Content-Type: application/json" \
  -d '{"input": {}}'
```

## x402 Payment

Paid endpoints return a `402 Payment Required` response with payment details. Use an x402-compatible client or the [x402 SDK](https://github.com/coinbase/x402) to complete payment.

## ERC-8004 Identity

This agent is registered on-chain:
- **Agent ID:** 22618
- **Registry:** `eip155:1:0x8004A169FB4a3325136EB29fA0ceB6D2e539a432`
- **Explorer:** [8004scan.io](https://8004scan.io/agents/1/22618)

## Self-Hosting

### 1. Install dependencies

```bash
bun install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Required variables:
- `AGENT_WALLET_PRIVATE_KEY` — your agent's wallet
- `PAYMENTS_RECEIVABLE_ADDRESS` — where payments go

### 3. Run locally

```bash
bun run dev
```

### 4. Deploy to Railway

```bash
railway init --name dad-jokes-agent
railway up --detach
railway variables set AGENT_WALLET_PRIVATE_KEY=... PAYMENTS_RECEIVABLE_ADDRESS=...
railway domain
```

## Sample Jokes

> Why don't scientists trust atoms? Because they make up everything!

> I'm reading a book about anti-gravity. It's impossible to put down!

> Why do programmers prefer dark mode? Because light attracts bugs!

> What do you call a bear with no teeth? A gummy bear!

> I only know 25 letters of the alphabet. I don't know y.

## Built With

- [Lucid Agents SDK](https://github.com/lucid-labs/lucid-agents)
- [Bun](https://bun.sh)
- [x402](https://github.com/coinbase/x402)

## License

MIT
