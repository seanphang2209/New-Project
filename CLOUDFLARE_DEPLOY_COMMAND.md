# Cloudflare Pages Deploy Command

Since the Deploy command field is required in Cloudflare Pages settings, use:

```
wrangler pages deploy .vercel/output/static --project-name=carbonatlas
```

## Complete Build Settings

**Build command:**
```
npm run build
```

**Deploy command:**
```
wrangler pages deploy .vercel/output/static --project-name=carbonatlas
```

**Non-production branch deploy command:**
```
wrangler pages deploy .vercel/output/static --project-name=carbonatlas
```
(Can be the same, or leave empty if optional)

**Build output directory:**
```
.vercel/output/static
```

**Path:**
```
/
```

## How It Works

1. **Build command** runs: `next build && npx @cloudflare/next-on-pages`
   - This creates `.vercel/output/static` directory
   
2. **Deploy command** runs: `wrangler pages deploy .vercel/output/static --project-name=carbonatlas`
   - This deploys the built static assets to Cloudflare Pages
   - The `--project-name=carbonatlas` matches your project name

## Alternative (if npm script works better)

You could also use:
```
npm run deploy:pages
```

But the direct wrangler command is more explicit and reliable in CI/CD.

