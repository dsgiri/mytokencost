# Project Terminology & Lexicon

A standardized vocabulary to ensure engineering, marketing, and operations remain aligned.

### Business Terms
- **Forced-Buyer:** A high-ticket B2B client who is purchasing out of regulatory necessity (fear of fines) rather than desire for software (e.g., Hospital Admin needing HHSC compliance).
- **CaaS (Compliance-as-a-Service):** A recurring subscription model where facilities pay monthly to maintain live access to audit-ready physical footprint tracking.
- **Black-Box Audit:** An infrastructure calculation process that requires zero invasive access to a client's private networks. It relies entirely on external hardware estimations and public grid maps.
- **Telemetry HUD:** The live dashboard that calculates resource usage based on simulated constraints. 

### Engineering Terms
- **JWT (JSON Web Token):** A cryptographically signed token issued by Clerk that proves a user is logged in. 
- **RLS (Row Level Security):** A Supabase/PostgreSQL feature that prevents users from accessing rows belonging to other users.
- **Server Action:** A Next.js feature allowing React components to directly call secure backend functions without manually building API routes.
- **Webhook:** A "reverse API" call. For example, Stripe calling our server to say "Payment Successful" instead of our server constantly asking Stripe "Did they pay yet?"
- **ISR (Incremental Static Regeneration):** Next.js strategy where pages (like Blog posts) are built as static HTML for speed, but automatically rebuild in the background when content is updated in Sanity.

### Industry Domain Terms
- **ERCOT LFL:** Electric Reliability Council of Texas - Large Flexible Load task force. Targets Data Centers over 10 MW.
- **TCEQ EPP:** Texas Commission on Environmental Quality - Emergency Preparedness Plan. Targets water utilities regarding backup pump capacity.
- **HHSC 88°F Rule:** Texas Health and Human Services Commission rule enforcing ambient temperature ceilings for nursing homes during grid failures.
