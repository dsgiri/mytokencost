# System Architecture

MyTokenCost.com is built on a modern, decoupled enterprise stack prioritizing high-speed marketing convergence, zero-overhead static generation, and secure Edge-protected API routing.

## Technology Stack
- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 + Framer Motion
- **Authentication:** Clerk
- **Database / Relational Backend:** Supabase (PostgreSQL)
- **Headless CMS:** Sanity.io
- **Payments / Subscriptions:** Stripe
- **Forms / Communications:** Web3Forms
- **Hosting / CI/CD:** Vercel & GitHub

## Modular Routing Structure
The Next.js App Router utilizes Route Groups to enforce logical and visual boundaries across the application:

1. **`/(public)`**: Static, heavily cached marketing pages (`/`, `/about`, `/pricing`). No authentication required. Maximum SEO focus.
2. **`/(auth)`**: Auth endpoints (`/sign-in`, `/sign-up`) owned by Clerk's UI components.
3. **`/portal`**: The secure client zone. Requires active session tokens. Renders a distinct layout (Sidebar + User Management). 
4. **`/admin`**: Internal operational dashboard. Locked behind Clerk Admin Role checks.
5. **`/(content)`**: `/blog` and `/blueprints`. Driven by Sanity.io using Incremental Static Regeneration (ISR).

## Data Flow
- **Public Traffic:** Hits statically generated Next.js pages deployed on Vercel Edge Network.
- **Form Submissions (Contact/Leads):** Handled via Web3Forms API to bypass internal SMTP complexity.
- **Authentication:** Clerk intercepts requests via `middleware.ts`. Valid tokens proceed; invalid tokens redirect to `/sign-in`.
- **Backend Querying:** When a user logs in, Clerk mints a JWT. The Next.js server passes this JWT to Supabase. Supabase decodes the JWT and applies Row Level Security (RLS) to ensure users only see their organization's data.
- **Payments:** Stripe Checkout redirects are generated on the server. Stripe Webhooks (`/api/webhooks/stripe`) securely ping the backend to update Supabase records when an audit is paid for.
