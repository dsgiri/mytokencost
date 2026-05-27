# Security Protocol

MyTokenCost handles sensitive physical infrastructure footprints (Data Center node counts, Hospital bed capacities) and targets high-value corporate clients. Security is paramount.

## Edge Protection (Middleware)
- Next.js `middleware.ts` runs on the Vercel Edge.
- It actively intercepts incoming requests to `/portal/*` and `/admin/*`.
- Requests lacking a valid Clerk session token are immediately rejected and redirected before hitting the main application logic.

## Row Level Security (RLS)
Supabase acts as the permanent datastore, but it does NOT trust requests blindly.
- Every Supabase query must include the Authorization Bearer token minted by Clerk.
- Supabase RLS policies are written to map the `user_id` inside the Clerk JWT to the `owner_id` column on the database rows.
- A user attempting to query `/api/audits` with a modified payload will be stopped at the PostgreSQL database level.

## Secrets Management
All sensitive variables are managed strictly via Vercel Environment Variables.
- **Safe for Browser:** Prefix with `NEXT_PUBLIC_` (e.g., `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`).
- **Strictly Server-Only:** No prefix (e.g., `STRIPE_SECRET_KEY`, `SUPABASE_SERVICE_ROLE_KEY`). Exposing these to the client bundle is a critical violation.

## Payment Integrity
Stripe handles all PCI-DSS compliance.
- No credit card data ever touches MyTokenCost servers.
- Audit fulfillment and CaaS provisioning only trigger via cryptographically signed webhooks dispatched directly from Stripe's servers to `src/app/api/webhooks/stripe/route.ts`.

## Content Integrity
Sanity.io requires explicit CORS allowlisting. Only requests originating from `https://mytokencost.com` (and localhost during dev) will be permitted to fetch CMS drafts or production data.
