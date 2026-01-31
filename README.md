# Dad Jokes Agent 🃏

A paid x402 endpoint that serves premium dad jokes. Built with Lucid Agents SDK.

## Endpoints

| Endpoint | Price | Description |
|----------|-------|-------------|
| `GET /health` | Free | Health check |
| `POST /joke` | $0.001 | Get a random dad joke |
| `POST /jokes` | $0.005 | Get multiple jokes (1-10) |

## Setup

```bash
bun install
cp .env.example .env
# Edit .env with your wallet address
bun run start
```

## Usage

```bash
# Health check
curl http://localhost:3000/health

# Get a joke (requires x402 payment header)
curl -X POST http://localhost:3000/joke \
  -H "Content-Type: application/json" \
  -d '{}'

# Get multiple jokes
curl -X POST http://localhost:3000/jokes \
  -H "Content-Type: application/json" \
  -d '{"count": 5}'
```

## x402 Payment

Paid endpoints require an x402 payment header. Use the x402 SDK or a compatible client to make payments.

## License

MIT
