# Technical Decisions & Scaling Guide

## Key Technical Decisions

1. **Next.js 14 App Router**: Chosen for modern React patterns, excellent TypeScript support, and Cloudflare compatibility. App Router enables server components by default.

2. **TypeScript**: Full type safety across the codebase ensures maintainability and catches errors at compile time.

3. **Tailwind CSS**: Utility-first CSS framework provides rapid development, consistent design system, and small bundle size.

4. **In-Memory Data Store**: MVP uses Map-based in-memory storage for simplicity. Data persists only during browser session and resets on refresh. This avoids database setup complexity while demonstrating full functionality.

5. **Client-Side Components**: Calculator and Dashboard use 'use client' directive for interactivity. Data store is instantiated per module, so data persists within a session but not across refreshes.

6. **Emission Factors**: Uses standard factors from IPCC, EPA, and national agencies. Grid factors are country-level averages suitable for MVP.

7. **Simplified Scope 3**: Spend-based proxy method (0.5 kg CO₂e per USD) provides rough approximation. Suitable for initial assessments; full Scope 3 requires specialized methodologies.

8. **Benchmarking Logic**: Heuristic-based system comparing against industry averages and best practices. Maturity levels (1-5) provide clear progression framework.

9. **Confidence Scoring**: Data completeness determines confidence (low/medium/high). Transparent to users and guides data input priorities.

10. **No Authentication**: MVP avoids auth complexity. In production, add Cloudflare Access or similar for user management.

## How This MVP Scales on Cloudflare

### Current Architecture
- **Frontend**: Next.js App Router with static generation where possible
- **Data Layer**: In-memory Maps (client-side only)
- **Calculation**: Client-side TypeScript functions
- **Styling**: Tailwind CSS (compiled to static CSS)

### Cloudflare Scaling Path

#### Phase 1: Persistent Storage (Cloudflare D1)
1. **Migrate to D1 Database:**
   ```typescript
   // Replace lib/data.ts with D1 bindings
   // Create schema: companies, assessments, achievements tables
   // Use wrangler d1 migrations
   ```
2. **Benefits**: Persistent data, SQL queries, ACID transactions
3. **Migration effort**: Medium - requires schema design and query refactoring

#### Phase 2: Edge Functions (Cloudflare Workers)
1. **Move calculations to edge:**
   - Create API routes in `app/api/`
   - Use Cloudflare Workers for serverless compute
   - Maintain client-side validation
2. **Benefits**: Faster calculations, reduced client bundle size, server-side validation
3. **Migration effort**: Low - Next.js API routes work directly with Workers

#### Phase 3: Caching (Cloudflare Cache)
1. **Cache benchmark data:**
   - Static benchmark data can be cached at edge
   - Industry averages rarely change
2. **Benefits**: Instant benchmark lookups, reduced compute
3. **Migration effort**: Low - use Cache API in API routes

#### Phase 4: Real-time Features (Cloudflare Durable Objects)
1. **If needed for real-time collaboration:**
   - Durable Objects for state synchronization
   - WebSocket connections for live updates
2. **Use case**: Multi-user dashboards, live collaboration
3. **Migration effort**: High - requires architectural changes

#### Phase 5: Authentication (Cloudflare Access)
1. **Add user management:**
   - Cloudflare Access for SSO/auth
   - Or integrate Auth0, Clerk, etc.
2. **Benefits**: Secure user accounts, data isolation
3. **Migration effort**: Medium - requires UI and backend changes

### Database Migration Example (D1)

```typescript
// schema.sql
CREATE TABLE companies (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  industry TEXT NOT NULL,
  size TEXT NOT NULL,
  country TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE TABLE assessments (
  id TEXT PRIMARY KEY,
  company_id TEXT NOT NULL,
  scope1_emissions REAL,
  scope2_emissions REAL,
  scope3_emissions REAL,
  total_emissions REAL,
  confidence_score TEXT,
  maturity_level INTEGER,
  created_at TEXT NOT NULL,
  FOREIGN KEY (company_id) REFERENCES companies(id)
);

// lib/data-d1.ts (example)
export async function createCompany(db: D1Database, company: Company) {
  await db.prepare(
    'INSERT INTO companies (id, name, industry, size, country, created_at) VALUES (?, ?, ?, ?, ?, ?)'
  ).bind(company.id, company.name, company.industry, company.size, company.country, company.createdAt).run();
}
```

### Performance Optimizations

1. **Static Generation**: Homepage and Methodology pages can be statically generated at build time
2. **Image Optimization**: Use Next.js Image component with Cloudflare's image resizing
3. **Code Splitting**: Next.js automatically splits code by route
4. **Edge Caching**: Use Cloudflare's cache for static assets and API responses

### Monitoring & Analytics

1. **Cloudflare Analytics**: Built-in analytics for traffic and performance
2. **Web Vitals**: Monitor Core Web Vitals via Cloudflare
3. **Error Tracking**: Integrate Sentry or similar for error monitoring

### Cost Considerations

- **Cloudflare Pages**: Free tier includes generous limits
- **D1 Database**: Pay-as-you-go, very cost-effective for MVP scale
- **Workers**: Free tier (100k requests/day) should cover MVP
- **KV**: Alternative to D1 for simple key-value needs, also very affordable

## Future Enhancements

1. **Multi-year Tracking**: Add time-series data for progress tracking
2. **Export Functionality**: PDF reports, CSV exports
3. **API Access**: RESTful API for integrations
4. **Custom Emission Factors**: Allow users to override default factors
5. **Advanced Scope 3**: Category-by-category Scope 3 calculation
6. **Goal Setting**: Set reduction targets and track progress
7. **Team Collaboration**: Multi-user access, role-based permissions
8. **Integration**: Connect to utility APIs for automatic data import
9. **Certification Prep**: Generate reports aligned with certification standards
10. **Mobile App**: React Native app using shared calculation logic

## Security Considerations

- **Input Validation**: All user inputs are validated client-side; add server-side validation for production
- **XSS Protection**: React's built-in escaping prevents XSS
- **CSRF**: Next.js handles CSRF protection
- **Data Privacy**: Add GDPR compliance features if serving EU customers
- **Rate Limiting**: Implement rate limiting on API routes in production

## Testing Strategy

1. **Unit Tests**: Calculation functions (lib/calculations.ts)
2. **Integration Tests**: Calculator flow, dashboard rendering
3. **E2E Tests**: Playwright or Cypress for full user journeys
4. **Visual Regression**: Screenshot testing for UI consistency
