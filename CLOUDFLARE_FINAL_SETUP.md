# Cloudflare Pages - Final Setup Guide

## ✅ Verified Configuration

All configuration files have been verified and are ready for Cloudflare Pages deployment.

## Cloudflare Pages Build Settings

Go to **Cloudflare Dashboard → Pages → Your Project → Settings → Builds & deployments** and set:

### Build Configuration

**Build command:**
```
npm run build
```

**Build output directory:**
```
.vercel/output/static
```

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

**Branch:**
```
main
```
(Your default branch)

### Deploy Command (if required)

If Cloudflare requires a deploy command, use:
```
wrangler pages deploy .vercel/output/static --project-name=carbonatlas
```

## What Happens When You Build

1. **`npm run build`** runs:
   - `next build` - Builds Next.js app
   - `npx @cloudflare/next-on-pages` - Converts output for Cloudflare Pages

2. Output is created in:
   - `.vercel/output/static` - Static assets (what Cloudflare serves)
   - `.vercel/output/functions` - Edge functions (auto-detected by Cloudflare)

3. Cloudflare automatically deploys the static assets

## Configuration Files Status

✅ **package.json**: Build script includes `next build && npx @cloudflare/next-on-pages`
✅ **next.config.js**: ESLint disabled during builds
✅ **.eslintrc.json**: Root set, unescaped-entities rule disabled
✅ **.eslintignore**: Excludes .next and node_modules
✅ **wrangler.jsonc**: Points to .vercel/output/static
✅ **All JSX files**: Apostrophes escaped with &#39;, quotes with &quot;

## Verification Checklist

After deploying, verify:

- [ ] Build completes without ESLint errors
- [ ] No "Failed to compile" messages
- [ ] Build creates `.vercel/output/static` directory
- [ ] Site deploys successfully
- [ ] All pages load correctly

## Troubleshooting

**If build fails with "Missing entry-point":**
- Ensure build command is `npm run build` (not just `next build`)
- Check that `@cloudflare/next-on-pages` is in devDependencies

**If build succeeds but site doesn't work:**
- Verify build output directory is `.vercel/output/static`
- Check that functions are in `.vercel/output/functions`

**If ESLint errors appear:**
- Build should continue anyway (ignoreDuringBuilds: true)
- But check that all apostrophes use &#39; and quotes use &quot;

