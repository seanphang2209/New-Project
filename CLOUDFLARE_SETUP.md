# Cloudflare Pages Setup Instructions

## The Problem

If you see this error in Cloudflare:
```
✘ [ERROR] Missing entry-point to Worker script or to assets directory
```

It means Cloudflare is trying to run `npx wrangler deploy` **before** building your Next.js app.

## The Solution

Cloudflare Pages needs to **build first**, then deploy the output. Here's how to fix it:

### Step 1: Update Cloudflare Pages Build Settings

1. Go to **Cloudflare Dashboard** → **Pages** → Your Project
2. Click **Settings** → **Builds & deployments**
3. Update these settings:

   **Build command:**
   ```
   npm run build
   ```
   (NOT `npx wrangler deploy`)

   **Build output directory:**
   ```
   out
   ```
   (This is where Next.js static export puts files)

   **Root directory:**
   ```
   /
   ```
   (Leave blank or use `/`)

   **Node version:**
   ```
   18.x
   ```
   (or 20.x)

### Step 2: Save and Redeploy

1. Click **Save** on the build settings
2. Go to **Deployments** tab
3. Click **Retry deployment** on the failed deployment, OR
4. Push a new commit to trigger automatic deployment

## Why This Happens

- **Wrong:** Cloudflare tries to deploy without building → `npx wrangler deploy` fails because there's no `out` folder yet
- **Correct:** Cloudflare builds first → `npm run build` creates `out` folder → Cloudflare automatically deploys the `out` folder

## Verification

After updating settings, the build logs should show:
1. ✅ `Installing project dependencies`
2. ✅ `Executing user deploy command: npm run build`
3. ✅ `Creating an optimized production build...`
4. ✅ `Export successful. Files written to out`
5. ✅ Deployment succeeds

## Alternative: If You Must Use Wrangler CLI

If you need to use `wrangler` directly (not recommended for Pages), use the script:

```bash
npm run pages:deploy
```

This builds first, then deploys. But for Cloudflare Pages, the dashboard settings approach is better.

