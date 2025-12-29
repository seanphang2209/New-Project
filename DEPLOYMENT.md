# Deployment Guide

## Pushing to GitHub

1. **Create a new repository on GitHub:**
   - Go to https://github.com/new
   - Name it `carbonatlas` (or your preferred name)
   - Choose public or private
   - Do NOT initialize with README, .gitignore, or license (we already have these)

2. **Connect your local repository:**
   ```bash
   cd "/Users/seanphang/Desktop/New Project"
   git remote add origin https://github.com/YOUR_USERNAME/carbonatlas.git
   git branch -M main
   git push -u origin main
   ```

3. **Initial commit message suggestion:**
   ```bash
   git commit -m "Initial commit: CarbonAtlas MVP

   - Next.js 14 App Router with TypeScript
   - Carbon footprint calculator (Scope 1, 2, 3)
   - Industry benchmarking and maturity assessment
   - Achievements system
   - Dashboard with business insights
   - Methodology page with framework alignment
   - Tailwind CSS for styling
   - In-memory data store (ready for Cloudflare D1 migration)"
   ```

## Deploying to Cloudflare Pages

### Option 1: Via GitHub Integration (Recommended)

1. Push your repository to GitHub (see steps above)

2. In Cloudflare Dashboard:
   - Go to **Pages** → **Create a project**
   - Select **Connect to Git**
   - Choose your GitHub repository
   - Configure build settings:
     - **Framework preset:** Next.js
     - **Build command:** `npm run build`
     - **Build output directory:** `.next`
     - **Root directory:** `/` (or leave blank)

3. Deploy: Cloudflare will automatically build and deploy

### Option 2: Via Wrangler CLI

1. Install Wrangler:
   ```bash
   npm install -g wrangler
   ```

2. Login:
   ```bash
   wrangler login
   ```

3. Build the project:
   ```bash
   npm run build
   ```

4. Deploy:
   ```bash
   wrangler pages deploy .next
   ```

## Environment Variables

No environment variables are required for the MVP. For production scaling:

- `DATABASE_URL` - If using external database
- `NEXT_PUBLIC_API_URL` - If adding API endpoints

## Post-Deployment Checklist

- [ ] Verify all pages load correctly
- [ ] Test calculator flow end-to-end
- [ ] Verify homepage contains all required keywords
- [ ] Check that disclaimer appears in footer
- [ ] Test responsive design on mobile devices
- [ ] Verify no console errors

## Scaling Considerations

See README.md for details on migrating from in-memory storage to Cloudflare D1 or KV for persistent data storage.
