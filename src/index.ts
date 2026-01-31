import { createAgent } from '@lucid-agents/core';
import { http } from '@lucid-agents/http';
import { createAgentApp } from '@lucid-agents/hono';
import { wallets } from '@lucid-agents/wallet';
import { identity } from '@lucid-agents/identity';
import { payments, paymentsFromEnv } from '@lucid-agents/payments';
import { z } from 'zod';

const dadJokes = [
  "Why don't scientists trust atoms? Because they make up everything!",
  "I'm reading a book about anti-gravity. It's impossible to put down!",
  "Why did the scarecrow win an award? He was outstanding in his field!",
  "I used to hate facial hair, but then it grew on me.",
  "Why don't eggs tell jokes? They'd crack each other up!",
  "What do you call a fake noodle? An impasta!",
  "Why did the bicycle fall over? Because it was two-tired!",
  "I only know 25 letters of the alphabet. I don't know y.",
  "What did the ocean say to the beach? Nothing, it just waved.",
  "Why do programmers prefer dark mode? Because light attracts bugs!",
  "I'm afraid for the calendar. Its days are numbered.",
  "What do you call a bear with no teeth? A gummy bear!",
  "Why don't skeletons fight each other? They don't have the guts.",
  "What's orange and sounds like a parrot? A carrot!",
  "I got hit in the head with a can of soda. Luckily it was a soft drink.",
];

function getRandomJoke(): string {
  return dadJokes[Math.floor(Math.random() * dadJokes.length)];
}

async function main() {
  const agent = await createAgent({
    name: 'dad-jokes-agent',
    version: '1.0.0',
    description: 'A paid API that serves premium dad jokes',
  })
    .use(http())
    .use(wallets({
      config: {
        agent: {
          type: 'local',
          privateKey: process.env.AGENT_WALLET_PRIVATE_KEY!,
          chainId: 1, // ETH mainnet
          rpcUrl: 'https://eth.llamarpc.com',
        },
      },
    }))
    .use(identity({
      config: {
        domain: 'dad-jokes-agent-production.up.railway.app',
        autoRegister: true,
        chainId: 1,
        rpcUrl: 'https://eth.llamarpc.com',
        registryAddress: '0x8004A169FB4a3325136EB29fA0ceB6D2e539a432',
      },
    }))
    .use(payments({ config: paymentsFromEnv() }))
    .build();

  const { app, addEntrypoint } = await createAgentApp(agent);

  addEntrypoint({
    key: 'health',
    description: 'Health check endpoint',
    input: z.object({}),
    handler: async () => ({ output: { status: 'ok', timestamp: new Date().toISOString() } }),
  });

  addEntrypoint({
    key: 'joke',
    description: 'Get a random dad joke',
    input: z.object({ category: z.string().optional() }),
    price: '0.001',
    handler: async (ctx) => ({
      output: { joke: getRandomJoke(), category: ctx.input.category || 'general', timestamp: new Date().toISOString() },
    }),
  });

  addEntrypoint({
    key: 'jokes',
    description: 'Get multiple random dad jokes',
    input: z.object({ count: z.number().min(1).max(10).default(3) }),
    price: '0.005',
    handler: async (ctx) => {
      const jokes: string[] = [];
      const seen = new Set<number>();
      while (jokes.length < ctx.input.count && seen.size < dadJokes.length) {
        const idx = Math.floor(Math.random() * dadJokes.length);
        if (!seen.has(idx)) { seen.add(idx); jokes.push(dadJokes[idx]); }
      }
      return { output: { jokes, count: jokes.length, timestamp: new Date().toISOString() } };
    },
  });

  const port = Number(process.env.PORT ?? 3000);
  console.log(`🃏 Dad Jokes Agent running on port ${port}`);
  Bun.serve({ port, fetch: app.fetch });
}

main();
