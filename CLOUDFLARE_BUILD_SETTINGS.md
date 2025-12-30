# Cloudflare Pages Build Settings

## Current Configuration

After the latest changes, ensure your Cloudflare Pages settings are:

### Build Settings

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

### Important Notes

1. **Build Script**: The `build` script in `package.json` is now just `next build`. 
   - For Cloudflare Pages with `@cloudflare/next-on-pages`, you may need to change the build command to:
   ```
   npm run build:cf
   ```
   OR update Cloudflare build command to:
   ```
   npm run build && npx @cloudflare/next-on-pages
   ```

2. **ESLint**: 
   - ESLint is disabled during builds (`eslint.ignoreDuringBuilds: true`)
   - The `react/no-unescaped-entities` rule is explicitly disabled
   - `.eslintignore` excludes `.next` and `node_modules`

3. **Branch**: Ensure Cloudflare is building from the `main` branch (or your default branch)

## Verification

After deploying, check the build logs for:
- ✅ No "Linting and checking validity of types" errors
- ✅ No "Failed to compile" due to `react/no-unescaped-entities`
- ✅ Build completes successfully
- ✅ Output directory `.vercel/output/static` is created (if using next-on-pages)

## If Build Still Fails

If you see errors about missing `.vercel/output/static`:
1. Change build command to: `npm run build:cf`
2. Or manually: `npm run build && npx @cloudflare/next-on-pages`

