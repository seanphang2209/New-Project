# Cloudflare Pages - EXACT Settings Required

## ⚠️ CRITICAL: These are the EXACT settings you MUST use in Cloudflare Dashboard

### Step-by-Step Instructions

1. **Go to Cloudflare Dashboard**
   - Navigate to: https://dash.cloudflare.com
   - Click **Pages** in the sidebar
   - Click on your project (or create new one)

2. **Go to Build Settings**
   - Click **Settings** tab
   - Click **Builds & deployments** section

3. **Set These EXACT Values:**

   **Build command:**
   ```
   npm run build
   ```
   (Copy this EXACTLY - no quotes, no extra spaces)

   **Build output directory:**
   ```
   .vercel/output/static
   ```
   (Copy this EXACTLY - includes the leading dot)

   **Root directory:**
   ```
   /
   ```
   (Just a forward slash, or leave completely blank)

   **Node version:**
   ```
   18
   ```
   (Just the number 18, or select 18.x from dropdown)

   **Branch:**
   ```
   main
   ```
   (Your default branch name)

4. **Deploy Command (if required field):**
   If Cloudflare shows a "Deploy command" field that is required:
   ```
   wrangler pages deploy .vercel/output/static --project-name=carbonatlas
   ```

5. **Save Settings**
   - Click **Save** button
   - Wait for confirmation

6. **Trigger New Build**
   - Go to **Deployments** tab
   - Click **Retry deployment** on the latest failed deployment
   - OR push a new commit to trigger automatic build

## What Should Happen

When you run `npm run build`, it executes:
1. `next build` - Builds your Next.js app
2. `npx @cloudflare/next-on-pages` - Converts output for Cloudflare

This creates `.vercel/output/static` which Cloudflare then deploys.

## Verification

After deployment, check build logs for:
- ✅ `Installing project dependencies`
- ✅ `Executing user build command: npm run build`
- ✅ `Creating an optimized production build...`
- ✅ `✓ Compiled successfully`
- ✅ `Running @cloudflare/next-on-pages...`
- ✅ `Output written to .vercel/output/static`
- ✅ `Deployment succeeds`

## If It Still Fails

1. **Check the exact error message** in Cloudflare build logs
2. **Verify Node version** - Should be 18.x (we have .nvmrc file)
3. **Check build command** - Must be exactly `npm run build` (not `npm run build:cf`)
4. **Verify output directory** - Must be exactly `.vercel/output/static`
5. **Check branch** - Must match your GitHub default branch (usually `main`)

## Common Issues

**Issue**: "Missing entry-point to Worker script"
- **Fix**: Make sure build command is `npm run build` (not `npx wrangler deploy`)

**Issue**: "Cannot find module"
- **Fix**: Check that all dependencies are in package.json

**Issue**: "Build output directory not found"
- **Fix**: Verify build command includes `npx @cloudflare/next-on-pages`

**Issue**: ESLint errors blocking build
- **Fix**: Should not happen (ignoreDuringBuilds: true), but check .eslintrc.json

