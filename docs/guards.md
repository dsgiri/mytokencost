# Guards (Do's & Don'ts)

Strict engineering guidelines for maintaining the MyTokenCost codebase.

## DO
- **DO use Server Components by default:** Only add `"use client"` when interactivity (useState, useEffect, onClick) or browser APIs (like `<canvas>`) are strictly required.
- **DO enforce strict typing:** Always define TypeScript interfaces for Supabase database rows and Sanity CMS payloads.
- **DO isolate the HUD Canvas:** The `<TelemetryCanvas />` is mathematically heavy. Keep its re-renders isolated from the rest of the layout to avoid tanking framerates.
- **DO use Clerk for all identity logic:** Never build custom password hashing, session management, or MFA logic. Delegate entirely to Clerk.
- **DO use standard HTTP status codes:** When building API routes, respond with `401 Unauthorized`, `403 Forbidden`, `400 Bad Request`, etc., natively.

## DON'T
- **DON'T mix public and private layouts:** Never put marketing headers in the root `app/layout.tsx`. Keep the marketing header in `(public)/layout.tsx` and the dashboard sidebar in `portal/layout.tsx`.
- **DON'T bypass Supabase RLS:** Never use the Supabase `SERVICE_ROLE_KEY` on the client. It bypasses all database security policies. Only use the `ANON_KEY` combined with Clerk's JWT for client-side fetches.
- **DON'T bloat the client bundle:** Avoid importing heavy libraries (like `stripe` or `date-fns`) into `"use client"` components. Handle heavy operations in Server Actions.
- **DON'T hardcode sensitive URLs or Keys:** All external integrations must use `process.env`.
- **DON'T build custom email servers:** Use Web3Forms for contact/lead capture to prevent SMTP maintenance and deliverability issues.
