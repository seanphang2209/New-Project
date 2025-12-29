# CarbonAtlas

A production-quality MVP web application that helps businesses estimate their carbon emissions, benchmark themselves against industry standards, and track progress with achievements and practical business insights.

## Overview

CarbonAtlas is decision-support software designed for SMEs to enterprise businesses. It calculates Scope 1, 2, and simplified Scope 3 emissions, provides benchmarking against industry/size expectations, and tracks progress with achievements and business upsides.

**Important:** This tool provides decision-support estimates only. It is not legal advice, certification, or assurance.

## Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Deployment on Cloudflare

This repository is intended to be hosted on Cloudflare.

### Option 1: Cloudflare Pages

1. Push this repository to GitHub
2. In Cloudflare Dashboard, go to Pages
3. Create a new project and connect your GitHub repository
4. Set build command: `npm run build`
5. Set output directory: `.next`
6. Deploy

### Option 2: Cloudflare Workers (via Wrangler)

1. Install Wrangler CLI:
   ```bash
   npm install -g wrangler
   ```

2. Authenticate:
   ```bash
   wrangler login
   ```

3. Deploy:
   ```bash
   wrangler pages deploy .next
   ```

### Database Considerations

**Current MVP:** Uses in-memory storage for simplicity. Data persists only during the browser session and resets on page refresh or deployment.

**Production Scaling on Cloudflare:**
- **Cloudflare D1:** For relational data (SQLite-compatible)
  - Migrate database logic to use D1 bindings
  - Run migrations: `wrangler d1 migrations apply <database-name>`
- **Cloudflare KV:** For key-value storage if simple lookups suffice
- **Durable Objects:** For real-time features or complex state management

### Environment Variables

No environment variables are required for the MVP. For production:
- Database connection strings (if using external DB)
- API keys (if adding external integrations)

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── calculator/         # Calculator page
│   ├── dashboard/          # Dashboard page
│   ├── methodology/        # Methodology page
│   └── layout.tsx          # Root layout
├── components/             # Reusable React components
├── lib/                    # Utilities and business logic
│   ├── calculations.ts     # Emission calculation logic
│   ├── data.ts             # Data models and storage
│   └── benchmarks.ts       # Benchmarking logic
└── public/                 # Static assets
```

## Key Features

- **Carbon Emissions Calculator:** Step-by-step form for Scope 1, 2, and simplified Scope 3
- **Benchmarking:** Compare against industry/size standards
- **Achievements:** Track progress with unlockable achievements
- **Business Upsides:** See practical benefits of carbon reduction
- **Maturity Levels:** Understand your carbon management maturity (1-5)

## Technology Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Storage:** In-memory (JSON) - ready for Cloudflare D1/KV migration

## License

MIT

## Disclaimer

This software provides decision-support estimates only. It is not legal advice, certification, or assurance. Results should be verified with qualified professionals for compliance purposes.
