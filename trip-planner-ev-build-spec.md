# Trip Planner EV — Complete Build Specification

*Everything remaining to build, in priority order, with enough detail to hand each piece to an AI builder and get correct output.*

Prepared: July 2026. Companion to the market teardown and the landing page (`trip-planner-ev.html`). Read this cover-to-cover once; then hand it to your AI builder one section at a time.

---

## How to read this document

**Sections are ordered by priority.** If you build in this order and stop at the end of any phase, you have a working product at that stage.

- **Part A** — Reality check: what you have, what you're missing, and the biggest risks.
- **Part B** — The four build phases (MVP → Growth → Premium → Business), with a "you're done when…" bar for each.
- **Part C** — Every marketing-site page (14 of them), what goes on each, and content specs.
- **Part D** — Every product screen (26 of them) in the web app.
- **Part E** — The native mobile app: whether you need it, when to build it, what's in it.
- **Part F** — Backend architecture: services, data model, third-party integrations, and — most importantly — how the reliability grade actually gets computed.
- **Part G** — Legal, compliance, analytics, monitoring.
- **Part H** — The AI-builder handoff playbook: how to actually get things built without ending up with 40 half-finished pages.

**Every item is tagged with a priority code:**
- 🟢 **MVP** — required to launch. Don't skip.
- 🟡 **V1** — required within 3 months of launch to keep users.
- 🔵 **V2** — the Premium/business tier features that unlock revenue.
- ⚪ **Later** — real but not urgent. Do not build these before you have paying users.

---

# PART A — WHERE YOU ARE

## A.1 What's done

- **Landing page** (`trip-planner-ev.html`) — hero, problem stats, features, interactive demo, methodology, comparison, pricing, FAQ, waitlist. Design system, SEO/OG/JSON-LD metadata, mobile-responsive. Sample-data demo works client-side.
- **Market intelligence** — the teardown document tells you exactly who you're competing with and where the gaps are.
- **Positioning** — "The trust layer for EV road trips. Know it'll work. Know what it costs. Before you drive." — this is your compass; every screen and email should feel consistent with it.

## A.2 What's missing — the honest headline

You're missing **everything after the click.** A waitlist page is a promise. To keep it you need:
1. A **web app** that actually plans a trip (Part D).
2. A **backend** that stores users, vehicles, stations, sessions, and grades (Part F).
3. **Real data**, not the sample dataset in the demo (Part F).
4. **Trust artifacts** — real methodology page, real privacy policy, real corridor coverage (Part C, Part G).
5. A **content engine** so people can find you on Google (Part C.8).

Everything else — mobile app, fleet product, API, embedded widget — comes after those five.

## A.3 The three risks that will kill this if you ignore them

1. **Grade credibility.** The moment your grade is wrong on a station a driver knows well, you lose that driver forever. Ship with a grade methodology that's *conservative first* (mark "insufficient data" liberally) rather than confidently wrong.
2. **Data licensing.** OpenChargeMap and OpenStreetMap are free but have attribution and share-alike terms (ODbL). Google/TomTom/HERE map tiles have display restrictions. **Read every license before you launch.** Non-compliance can kill an early-stage product overnight.
3. **Scope creep.** Do not build the mobile app before the web app works. Do not build a fleet product before you have consumer users. Do not build a browser extension. Ship the wedge.

---

# PART B — THE FOUR PHASES

Each phase has a clear "done" bar. Do not skip ahead.

## B.1 Phase 0 — Foundation (weeks 1–2) 🟢

**Goal:** legal existence + tooling in place, so you can build without stopping.

- Register a company (LLC in the US, or your local equivalent — cheap; use Stripe Atlas, Firstbase, or an accountant).
- Buy the domain (`tripplannerev.com`, plus `.app` and country variants you care about).
- Set up email (Google Workspace or Fastmail — `hello@`, `support@`, `legal@`).
- Cloud accounts: Vercel or Netlify (hosting), Supabase or Neon (Postgres), Cloudflare (DNS + CDN), a monitoring tool (Sentry free tier).
- Analytics: **Plausible** or **Fathom** (privacy-friendly, avoids the cookie-banner mess of GA4).
- Get an OpenChargeMap API key (free), a Mapbox token (free tier), a Smartcar developer account (free until launch).
- Set up a Git repo with CI (GitHub Actions running lint + tests on every push).

**Done when:** you can deploy any change to production in under 5 minutes.

## B.2 Phase 1 — MVP launch (weeks 3–10) 🟢

**Goal:** a real product that plans a real trip using real data, that someone can pay $0 to use and would tell a friend about.

Ship these — nothing else:

1. **Marketing site**: landing (done), pricing, FAQ, methodology, about, privacy, terms, contact, 404. (Part C, items 1–9.)
2. **Auth**: email + password, magic link, Google. (Part F.4.)
3. **Vehicle picker** with 700+ presets + custom. (Part D.3.)
4. **Web planner** — enter A→B, pick car, get graded plan with true cost + sensitivity band + Plan B. (Part D.5, D.6.)
5. **Station detail page** with grade breakdown, opening hours, connector list, AI-summarized reviews. (Part D.7.)
6. **Range calculator** as a standalone tool (SEO magnet + top of funnel). (Part D.4.)
7. **Waitlist → account conversion** (invite the waitlist first).
8. **Grade v1** — even if simple, it must be published and honest. (Part F.7.)

**Done when:** a stranger can go from Google search → plan a real trip → get a plan they trust, without you helping them.

## B.3 Phase 2 — Growth (weeks 11–20) 🟡

**Goal:** more people arrive, and the ones who arrive stay.

- **Programmatic SEO pages** — chargers by city, range by car model, station-reliability pages. (Part C.8.)
- **Blog engine** with the first 12 posts written. (Part C.6.)
- **Check-in flow** — the moment users start feeding you the data that makes your grade better. (Part D.14.)
- **Save trips**, **share trips**, **recent trips** in the account. (Part D.10, D.11.)
- **Occupancy forecast v1** — patterns by hour of day, weekday. (Part F.9.)
- **Newsletter** — monthly, driver-focused (not investor-focused).
- **PWA polish** — installable to home screen, offline last-plan view.

**Done when:** 60% of new users come from organic search + word-of-mouth, not paid.

## B.4 Phase 3 — Premium (weeks 21–36) 🔵

**Goal:** turn on revenue.

- **Payment (Stripe)** with the founding-price Premium tier. (Part F.12.)
- **CarPlay + Android Auto** navigation. **This is where a native mobile app becomes real.** (Part E.)
- **Live re-routing** and one-tap Plan B swap.
- **Price alerts** ("30% cheaper 2 exits ahead").
- **Live weather + traffic** in the energy model.
- **Vehicle telematics** — Smartcar integration for live state of charge without a dongle. (Part F.5.)
- **Corridor voting** page (fulfilling the waitlist promise).

**Done when:** you have 500+ paying subscribers and ≥90% month-1 retention.

## B.5 Phase 4 — Business & API (months 9–18) 🔵

**Goal:** the actual moat — sell the data.

- **Reliability + cost API**, tiered. (Part D.24.)
- **Embeddable planner widget** — the ChargeHub-style B2B channel. (Part D.25.)
- **Fleet product** — cost + CO₂ + depot scheduling.
- **NEVI-style reliability insights** — a portal for utilities, states, networks.
- **White-label planner** — power the "next Hertz."

**Done when:** you have 3 paying B2B customers.

---

# PART C — MARKETING SITE PAGES (14 pages)

Same design system as the landing page. Every page uses the highway-signage visual language, Overpass + Public Sans, and the mile-marker rhythm.

### C.1 Home / landing 🟢 ✅ done
Already built. Two future edits after Phase 1: (a) replace the sample demo with a real one-shot planner, (b) add real testimonials in place of the pledges once you have them.

### C.2 About 🟢
- **Purpose:** trust. Investors, journalists, and skeptical drivers land here.
- **Contents:**
  - The founding story — **in one paragraph, honest.** Why you started this, what personal experience with charge anxiety triggered it.
  - The mission — one sentence: "We grade EV chargers honestly so nobody dreads a road trip."
  - The team — even if it's just you, add a name, a face, and a real bio. Solo founders build trust *faster* by being visible, not by hiding behind "we."
  - The pledges (repeat from landing): No pay-to-rank, failures count as failures, corrections stay open.
  - Advisors / supporters if any. Do not fake this.
  - Contact links.
- **Content bar:** 400–600 words. One photo. No stock imagery of a Tesla plugged in — every EV site has that. Use a wireframe illustration or the actual founder.

### C.3 Pricing (standalone) 🟢
- **Purpose:** convert. Longer than the landing-page section.
- **Contents:**
  - The three plans (Free / Premium / Business) with expanded feature lists (12–15 rows each).
  - **Comparison table** — Free vs Premium row-by-row.
  - Annual vs monthly toggle (annual is 17% cheaper — $49/yr vs $60/yr).
  - **"What's included in every plan"** row (privacy, data attribution, no ads inside plans, no pay-to-rank).
  - Enterprise inquiry form (name, company, use case, expected volume).
  - Cancellation policy, refund policy (7-day money-back), student discount if you offer one.
  - Pricing FAQ (5–8 questions specific to money: chargebacks, VAT, currency, receipts).
- **Content bar:** builds trust in the money side. Every question a paying customer would ask, answered here.

### C.4 Methodology (deep dive) 🟢
- **Purpose:** trust — the anti-PlugScore.
- **Contents:**
  - The published formula (already on landing).
  - **Every input, defined.** What counts as a "successful charge," what counts as a "failure," how sessions are attributed to stalls, what "recency decay" means with a worked example.
  - **How the grade updates** — cadence, latency between a session and the score changing.
  - **The insufficient-data policy** — chargers with fewer than N recent sessions get "N/A" instead of a guess. Publish N.
  - **How corrections work** — the reporting flow, the SLA for reviewing corrections, the public log of corrections.
  - **Version history of the formula** (v1.0, v1.1, dates and what changed).
  - Data sources cited with links (OCM, OSM, OCPI feeds).
  - What is NOT in the grade (network partnerships, sponsorship, ad spend).
  - A "download the raw grade for any station" link — radical transparency wins here.
- **Content bar:** 1,500–2,500 words. Bookmarked by industry press.

### C.5 FAQ (standalone) 🟢
- Same rendering pattern as the landing FAQ, but longer — 20–30 questions grouped:
  - **About the product** (5): what is this, how is it different from ABRP, do I need an account, is it in my country, does it work offline.
  - **Grades & data** (7): how is a grade calculated, what if I disagree with a grade, how often is data refreshed, where does station data come from, how do I report an error, can operators pay for a better grade, what does "insufficient data" mean.
  - **My car** (5): is my car supported, how accurate without a dongle, how do adapters work, can I add a custom car, what if my car is new / rare.
  - **Money** (5): is it free, what does Premium include, can I cancel anytime, is there a refund, do you sell my data.
  - **Privacy & safety** (4): where is my data stored, do you sell my location, is the account required, GDPR/CCPA rights.
  - **Business & press** (2): can I embed this on my site, how do I license the API.

### C.6 Blog / Guides 🟡
- **Purpose:** SEO + trust + content marketing.
- **Structure:**
  - Category tags: Guides, News, Data insights, Behind the scenes.
  - Article template: hero image, reading time, TOC for long posts, related articles, author bio, RSS feed, share buttons (no third-party trackers — use `mailto:` and `X` intent URLs directly).
- **First 12 posts to write (drafts you can hand to an AI writer):**
  1. "How to plan a US-to-Canada EV road trip in 2026" (evergreen guide).
  2. "The real cost of Supercharging: what your car doesn't tell you."
  3. "Why 43% of chargers can be effectively unavailable — and what to do about it." (uses J.D. Power + Parkopedia data.)
  4. "CCS vs NACS vs Tesla — a plug guide that finally makes sense."
  5. "Winter EV range: the math, honest edition."
  6. "Which stations are reliable this month?" (a monthly data-insight post — this is your killer content moat).
  7. "Rented a Hertz EV: how to plan the trip in 10 minutes."
  8. "Charge anxiety, explained by a psychologist" (guest post).
  9. "The best chargers along I-5, ranked by grade" (localized).
  10. "How our formula changed this month" (methodology transparency).
  11. "What we learned from 100,000 real charging sessions" (data storytelling).
  12. "5 mistakes first-time EV road-trippers make."
- **Content bar:** every post has original data or an original point of view. No SEO junk.

### C.7 Business / For business 🔵
- **Purpose:** convert B2B leads (fleets, dealers, hotels, utilities, networks).
- **Sections:**
  - Header: "The trust layer, in your product."
  - **Three product cards:** Data API · Embeddable widget · Fleet routing.
  - Use-case tiles: dealerships, rental fleets, hotels, delivery fleets, utilities, city agencies, journalists.
  - How the API works (with a code sample — a real curl request that returns a real grade JSON).
  - Pricing tiers (free dev sandbox, Standard, Enterprise) modeled on Chargetrip's Lite/Standard/Enterprise.
  - Case study slot (leave empty until you have one — do NOT fake).
  - Inquiry form → routes to `sales@`.
- **Content bar:** looks credible enough that a fleet manager forwards the URL to their CFO.

### C.8 Programmatic SEO pages 🟡

This is your traffic engine. Templates that generate thousands of pages from data.

**Template 1: "EV chargers in [City]"** — one page per city.
- Content: city name intro paragraph, count of chargers by connector/level, a map of stations with grades, top 10 chargers by grade, worst 3 chargers by grade, average cost, tips section (specific to that city — pulled from your review digest for stations in the city).
- URL: `/chargers/[country]/[state]/[city]`
- Auto-updates from your database nightly.
- Target: 500 city pages at launch (Google Maps-scale ambition).

**Template 2: "[EV model] range calculator"** — one page per vehicle.
- Content: model name intro, real-world efficiency vs advertised range (with your data), range in mild/cold/hot weather, top 5 corridors this model can handle, list of compatible connectors, a table "how far on X% charge."
- URL: `/range/[make]/[model]`
- Target: all 700+ vehicles you support.

**Template 3: "Is [Station] reliable?"** — one page per station.
- Content: station name, current grade with the formula breakdown, last successful charge, opening hours, connector list, distance from nearest backup, AI-summarized recent reviews, monthly grade history chart.
- URL: `/stations/[station-slug]`
- Target: every station in your database (hundreds of thousands).

**Template 4: "[Corridor] EV road trip planner"** — long-form corridor guides.
- URL: `/routes/[from]-to-[to]`
- Content: distance, driving time, count of graded chargers along the route, cost estimate for popular EVs, elevation profile, seasonal notes.
- Target: 100 top corridors globally.

**Template 5: "Cheapest EV charging near [City]"** — one page per city.
- URL: `/cheap-charging/[city]`
- Content: sorted list of chargers by $/usable kWh, updated nightly.

**Total programmatic surface at 12 months:** ~50,000–200,000 pages. Google will crawl them slowly; SEO is a 6–18 month game.

### C.9 Legal pages 🟢
Boilerplate but required. Get a lawyer to review before launch — the ~$500 is worth it.

- **Privacy Policy** — what data you collect, why, retention periods, third parties (Stripe, Supabase, Sentry, OpenChargeMap), GDPR/CCPA rights, cookie usage, contact.
- **Terms of Service** — acceptable use, intellectual property, disclaimers ("estimates only, do not use as sole basis for travel decisions"), liability limits, dispute resolution.
- **Cookie Policy** — every cookie/local-storage key listed, purpose, retention. If you use privacy-friendly analytics (Plausible/Fathom), you may not even need a banner in most jurisdictions.
- **Data Attribution** — public, permanent URL crediting OpenChargeMap, OpenStreetMap contributors (with ODbL notice), NREL if used.
- **Acceptable Use Policy** — for API customers.
- **DMCA / takedown** contact.

### C.10 Contact 🟢
- Support inquiries → `support@`.
- Press → `press@`.
- Business → `sales@`.
- Legal → `legal@`.
- Response-time expectations ("we reply within 2 business days" — set a bar you can meet, or you erode trust).
- Optional: an operator portal contact for station owners who want to claim/correct listings.

### C.11 404 / error pages 🟢
- Custom 404 in the design system with **five popular routes** as fallback links (city pages, planner, blog, home, contact).
- A "did you mean…" search box.
- Errors are moments of direction (per your design system) — no cutesy "oops," just clear next actions.

### C.12 Press / Media kit ⚪
- Logo pack (SVG + PNG).
- Screenshots (planner, station detail, mobile mockups).
- Founder bio + headshot.
- One-paragraph company boilerplate.
- Fact sheet: stations covered, cities live, cars supported, session-outcome count.
- Recent press links.

### C.13 Careers ⚪
Skip until you're hiring.

### C.14 Changelog / What's new 🟡
- Public, dated release notes.
- Every methodology change gets its own post here.
- Users bookmark this — it's cheap trust-building.

---

# PART D — THE WEB APP (26 screens)

The product itself. This is where users spend time.

## D.1 Auth flow 🟢

**Screens:** sign up · log in · magic-link sent · magic-link consumed · password reset request · password reset · email verify · logged out.

- **Signup fields:** email, password (or magic link only — simpler), optional "what car do you drive" as a smart onboarding hook.
- **Social login:** Google (day 1). Apple (day 30). No Facebook — the audience doesn't want it.
- **After signup:** go directly to vehicle picker, not to a dashboard. Users came here to plan a trip.
- **Session:** JWT with refresh token, HttpOnly cookie. 30-day sliding expiration.

## D.2 Onboarding wizard (3 steps, skippable) 🟢

Runs the first time a user logs in.

1. **Pick your primary car** (search 700+ models, custom option).
2. **Adapters you carry** — CCS-to-NACS, NACS-to-CCS, CHAdeMO adapter, J1772. This is the feature ChargeHub gets dinged for missing. Show which chargers each unlocks.
3. **Home location** (optional, used for suggested corridors and default "cheapest near me").

## D.3 Vehicle profile 🟢

**Screens:** vehicles list · add vehicle · edit vehicle · delete vehicle · set primary.

- One user, many vehicles (households often have 2 EVs).
- **Fields:** make, model, year, trim, battery kWh (auto-filled but editable), typical consumption Wh/km (auto-filled but editable), reserve % (default 10), adapters, custom name.
- **"Learn from my drives"** toggle — powers the ABRP-style adaptive model over time.

## D.4 Range calculator (public, no login) 🟢

Standalone SEO tool. Same behavior as EV-Mapping's range calculator but with:
- Round-trip radius (proven UX).
- **Sensitivity band** on the map (a fuzzy ring, not a hard circle).
- Cost estimate for the round trip.
- "Plan a real trip" CTA — the conversion hook.
- URL: `/range` and `/range/[make]/[model]` (programmatic).

## D.5 Trip planner input 🟢

**Screens:** planner home · planner with waypoints · saved-plans dropdown · shared-plan view.

- Start / end (autocomplete from Mapbox Places or Photon).
- Waypoints (add / reorder / remove).
- Vehicle selector (defaults to primary).
- Starting charge %.
- Target arrival charge %.
- Advanced (collapsed by default): speed factor, cabin temperature, external temperature, wind, payload, avoid highways/tolls, preferred networks, avoided networks, minimum charging speed, battery-health mode (20–80% window).
- **Two big buttons:** "Route direct" (no charging) and "Route with charging" — the EVTripPlanner pattern, cleaner.
- **Sensible defaults for everything.** A first-time user should not have to touch Advanced.

## D.6 Trip plan output 🟢

**The core screen of the product.** This is what the landing page hero is a preview of.

- **Left:** the graded trip sign (like the landing hero), listing each stop with grade, cost, minutes, Plan B, and confidence.
- **Right:** the map with the route drawn, chargers on the route highlighted, alternates greyed. Elevation profile below the map (optional collapse).
- **Above:** total cost, total time (driving + charging), total energy, sensitivity band.
- **Actions:** save, share (public URL), send to phone (QR + SMS), export CSV/GPX, print, embed (for premium/paying).
- **Interactive elements:** click a stop to see its detail; drag stops to reorder charging (advanced users); swap for a specific alternate; toggle "Plan B" preview.
- **The confidence score** is prominent — this is your signature.
- **"Why?" tooltips** on every number — the physics is on tap.

## D.7 Station detail page 🟢

Both a user-facing screen and a programmatic-SEO landing page.

- **Header:** station name, network, grade badge (A/B/C/D/F or "insufficient data"), address, connector icons.
- **Grade breakdown:** the formula applied to *this station*: 30-day success rate, failure count, recency-weighted score, delivered kW vs rated kW.
- **Live status** (if OCPI feed available): stalls available now.
- **Cost:** normalized per usable kWh for the logged-in user's car (kWh price, per-minute price, session fees, idle fees — with the math shown).
- **Recent sessions:** anonymized list of the last 20 (time, outcome, kW, duration).
- **Reviews:** AI-summarized digest at the top ("Stalls 3–4 throttle to 62 kW — use 1, 2 or 4. Entrance is behind the diner."), then raw reviews sorted by recency, oldest folded.
- **Occupancy heatmap:** 7-day × 24-hour grid.
- **Photos** (from check-ins).
- **Nearby amenities:** food, restroom, wifi.
- **Backup chargers within 10 miles.**
- **"Report an error"** button.
- **"I'm here now" check-in button** (starts the check-in flow).

## D.8 Map / explore 🟢

- Full-screen map, filters panel.
- **Filters:** connector type, minimum kW, grade minimum (A only / A–B / A–C / all), free/paid, 24/7, open now, network include/exclude, amenities.
- **Cluster markers** by grade (color-coded).
- **"Only show reliable"** one-click preset.
- **Search bar** with locations and station names.
- **URL state** — filters and viewport in the URL so they're shareable.

## D.9 Cost calculator (public tool) 🟡

Standalone SEO tool.
- Inputs: car, distance, home vs public charging mix, network preference.
- Output: "This trip costs $X vs $Y in gas."
- URL: `/cost`

## D.10 Saved trips 🟡

List / grid of the user's saved plans, with search, sort by date, filters. Each row shows: name, distance, date planned, confidence, total cost. Duplicate / rename / delete / share.

## D.11 Shared trip view 🟡

Public URL any non-user can view.
- Read-only version of D.6.
- "Plan your own with your car" CTA.
- OG image auto-generated (looks like the trip sign) — great for social sharing.

## D.12 Corridor pages 🟡
See C.8 template 4. Live in the product too.

## D.13 Compare cars 🟡

Pick 2–3 EVs, see side-by-side: real efficiency, range in mild/cold/hot, cost per 100 km at home/DC, real-world 10–80% charge time, connector compatibility, cars available in your country.

## D.14 Check-in flow 🟡

**The most important user-generated data flow.** Every check-in feeds your grade engine.

**Steps:**
1. From station detail: "I'm here now."
2. Auto-detects stall (or lets user pick).
3. **Two big buttons:** "Charging started" · "Couldn't charge."
4. If started: after user leaves the page, "How did it go?" push/email with 3 options: worked · worked but slow · failed.
5. Optional: photo, comment, kW achieved, minutes plugged in, kWh delivered.
6. **Reward:** the driver sees their contribution counted (dashboard shows "you improved 4 grades this month").

**Anti-gaming:** rate-limit check-ins per user per day; require GPS proximity to the station; ignore check-ins that don't correlate with a session on the network's OCPI feed (when available); shadow-flag suspicious accounts.

## D.15 Review submission 🟡

Free-text review, optional star (avoid — stars mislead), tags ("stall broken," "great amenities," "hard to find," "busy weekends"), photos.

## D.16 Report an error 🟢

Any station page can be flagged. Categories: station doesn't exist · wrong location · wrong connector · wrong price · wrong hours · duplicate · other. Free text. SLA to review posted publicly.

## D.17 Account settings 🟢

- Profile: name, email, avatar (optional).
- Password.
- Two-factor auth (TOTP).
- Notification preferences (email, push).
- Units (metric/imperial) — **remembered** (ChargeHub gets dinged for not doing this).
- Language.
- Timezone.
- Data export ("download everything you have on me").
- **Delete my account** — irreversible, warns clearly.

## D.18 Subscription management 🔵

- Current plan, next billing date, payment method (via Stripe Customer Portal — don't rebuild this).
- Change plan, cancel, resume.
- Invoice history.
- Apply promo code.
- Downgrade grace period (Premium features work until end of billing cycle after cancel).

## D.19 Vehicle telematics connect 🔵

- "Connect your car" button.
- Smartcar OAuth flow.
- Shows what data flows (state of charge only, or SoC + location + odometer — user picks).
- **Disconnect any time.**
- Fallback: OBD-II dongle instructions for Tesla/older vehicles.
- Tesla API token flow (advanced).

## D.20 Notifications & alerts 🔵

- Price alerts by corridor.
- Grade-drop alerts for stations in your saved routes ("Kettleman City just dropped to B").
- Trip reminders.
- Weekly digest (opt-in).
- In-app notification center.

## D.21 Driver dashboard (post-login home) 🟡

- Last trip summary.
- **"Plan a trip"** primary action.
- Suggested corridors ("popular from your area").
- Vehicles list.
- Stations you've reviewed (with impact stats).
- Contribution level (a gentle gamification — "you're a Silver Contributor with 24 check-ins").

## D.22 Corridor voting 🔵

Fulfilling the waitlist promise. Users vote on which corridors get the deepest data next. Live tallies, notified when their corridor goes live.

## D.23 Referrals ⚪

"Give a free month, get a free month." Simple, revenue-friendly. Do NOT build this before Phase 3.

## D.24 API developer portal 🔵 (business tier)

- Register a project → get keys.
- Interactive docs (Swagger/Redoc from your OpenAPI spec).
- Rate-limit dashboard.
- Usage & billing.
- Sample code (curl, Node, Python, Swift, Kotlin).
- Webhook configuration (for real-time grade changes, availability changes).
- Sandbox environment with mock data.

## D.25 Embeddable widget config 🔵 (business tier)

- Widget picker: full planner, station map, grade badge for a single station, range calculator, cost calculator.
- Themer: color, radius, font.
- Copy the embed code (`<iframe>` or `<script>` version).
- Preview.
- Analytics per widget instance.

## D.26 Admin / moderation (internal) 🟢

Not user-facing but you need it.
- Station queue for corrections review.
- Session-outcome dashboard (what fed the grade engine today).
- Review moderation (flag spam).
- User management (ban, refund, impersonate for support).
- Feature flags.
- Content publishing (blog, changelog).

---

# PART E — THE NATIVE MOBILE APP

## E.1 The honest answer: do you need one?

**Not for MVP.** For Phases 1–2, ship a **PWA (Progressive Web App)** — a web app that installs to home screen, works offline, and shows push notifications on Android. The PWA satisfies 90% of use cases, and you skip Apple/Google app-store review cycles.

**You need a native app the moment you build the Premium in-car experience** (Phase 3), because:
- **CarPlay** and **Android Auto** cannot be delivered by a PWA. They need a native container.
- **Background location** during a trip (for auto-check-in, price alerts) is limited in browsers.
- **Reliable push notifications** on iOS require native.
- **Home-screen widgets** (last trip, next stop) require native.

## E.2 What's in the mobile app (Phase 3 build)

The native app is not "the web app in a shell." It's a *driving companion* — a distinct product for a distinct moment.

### E.2.1 Onboarding
- Import from web account, or start fresh.
- Grant location permission ("only while using" first; later ask for "always" only if the user opts into background features).
- Vehicle pick (or import).
- Connect car (Smartcar) — optional.

### E.2.2 Home
- One big card: **your last plan** (resume) or **plan a new trip.**
- Below: nearby recommended chargers (graded), price-alert cards, occupancy warnings for your usual stations.

### E.2.3 Planner
- Same fields as web D.5, redesigned for thumbs.
- Send from web → phone via account sync (no QR needed).

### E.2.4 Drive mode (Phase 3 flagship)
- Big-type turn-by-turn.
- Persistent SoC readout with **predicted arrival SoC**, updated live.
- Colored progress bar showing "ahead of plan / on plan / behind plan" (the ABRP idea, done cleanly).
- "Charging in 42 km — Kettleman City · Grade A · $11.40 · 18 min" pinned card.
- **Voice guidance** — Siri/Assistant for turn-by-turn plus proactive alerts ("Charger occupied ahead, Plan B ready").
- **Auto-swap Plan B** button, single tap.

### E.2.5 At the charger
- **Auto-check-in prompt** when GPS matches a station.
- Live session tracker (kW curve, kWh delivered, minutes remaining to target %).
- One-tap "worked / failed / worked but slow" post-session.
- Photo submission.

### E.2.6 CarPlay
- Simplified drive-mode UI — three cards max on screen (per Apple's HIG).
- Route with next-stop card.
- SoC and predicted arrival SoC.
- Voice interaction only for input.

### E.2.7 Android Auto
- Same content, Google's UI templates (they're strict — read the guidelines before building).

### E.2.8 Widgets (home-screen)
- Small: current SoC + next stop.
- Medium: last plan + resume.
- Large: full next-stop card with grade and cost.

### E.2.9 Push notifications
- Price alerts.
- Grade-drop alerts for stations on your saved routes.
- "You're arriving in 5 min — stall 1 or 2 recommended."
- Trip departure reminders.

## E.3 Tech stack for the app

**Recommendation: React Native + Expo** or **Flutter**.

- **React Native + Expo** — fastest for a solo/small team, huge library ecosystem, shares code and mental models with your web app. Downside: some CarPlay/Android Auto integration requires ejecting from Expo or using bare workflow.
- **Flutter** — beautiful UI out of the box, single codebase. Downside: smaller community for automotive integrations.
- **Native (Swift + Kotlin)** — best CarPlay/Android Auto experience but 2× the work. Only if you have platform-native developers.

**Verdict:** start with **React Native + Expo**; move CarPlay/Android Auto to bare-workflow modules when you get to Phase 3.

## E.4 App store metadata (for launch)

- **App name:** "Trip Planner EV: Graded Chargers"
- **Subtitle (iOS):** "Reliable route, honest cost"
- **Short description (Android):** "EV route planning that grades every charger and shows what it will really cost."
- **Screenshots:** 6 per platform, each pushing one core benefit (grade, cost, sensitivity band, Plan B, CarPlay, occupancy).
- **Preview video:** 30 seconds, no voice-over needed — just the plan-a-trip flow.
- **Categories:** Travel, Navigation.
- **Keywords:** EV, electric vehicle, EV charging, route planner, Tesla, Rivian, EV road trip, EV navigation.
- **Support URL:** points to `support@tripplannerev.com`.
- **Privacy label:** honest.

---

# PART F — BACKEND, DATA, AND INTEGRATIONS

## F.1 Architecture at a glance

A monolith is fine at this stage. Do **not** microservice this until you have a real team.

**Recommended stack:**
- **Frontend web:** Astro + React islands (for the marketing + programmatic SEO pages) + a separate SPA for the app portion (React + TanStack Router).
- **API:** Node.js (Fastify or Hono) or Python (FastAPI). One backend, versioned REST + a GraphQL surface for complex reads.
- **Database:** PostgreSQL (Supabase or Neon). PostGIS extension for geospatial. `pg_trgm` for search.
- **Cache:** Redis (Upstash) for rate limits, session tokens, hot data.
- **Object storage:** S3-compatible (Cloudflare R2 — no egress fees).
- **Search:** MeiliSearch or Typesense (station name / address search).
- **Queue / background jobs:** BullMQ (Redis) or Postgres-based (pg-boss).
- **Map tiles:** MapLibre GL + free OSM tiles for MVP → Mapbox for polish.
- **Deploy:** Vercel (marketing) + Fly.io or Railway (API + workers).
- **Auth:** Supabase Auth or Clerk (do not build this yourself).
- **Payments:** Stripe.

## F.2 Core data model (simplified)

The most important tables. Names are indicative — pick a convention and stick with it.

```
users             — id, email, password_hash, created_at, plan, stripe_customer_id
vehicles          — id, user_id, make, model, year, trim, battery_kwh, consumption_wh_km, reserve_pct, name
adapters          — id, vehicle_id, type
stations          — id, external_ids (JSONB: ocm_id, ocpi_id, osm_id), name, network, location (POINT), address, country, admin1
stalls            — id, station_id, connector_type, rated_kw, cpo_stall_id
tariffs           — id, station_id, valid_from, valid_to, pricing_json (kwh, per_min, session_fee, idle_fee)
sessions          — id, stall_id, user_id (nullable), started_at, ended_at, kwh, kw_peak, outcome (success/fail/partial), source (ocpi/checkin/telemetry)
checkins          — id, station_id, stall_id, user_id, outcome, note, photos[], gps_lat, gps_lng, created_at
reviews           — id, station_id, user_id, text, tags[], created_at, moderation_status
grades            — id, stall_id (or station_id for aggregate), grade_letter, grade_score, sample_size, computed_at, formula_version
trips             — id, user_id, vehicle_id, origin (POINT), destination (POINT), waypoints (JSONB), settings (JSONB), plan_json, created_at
corrections       — id, station_id, user_id, category, note, status, resolved_at
subscriptions     — id, user_id, stripe_sub_id, plan, current_period_end
api_keys          — id, org_id, key_hash, scopes[], created_at
orgs              — id, name, plan, contact_email
usage_events      — id, api_key_id, endpoint, ts, latency_ms, status
```

Indexes: `stations.location` (GiST), `stations.name` (trigram), `sessions.stall_id + started_at`, `grades.stall_id`, `trips.user_id + created_at`.

## F.3 Third-party integrations (with realistic costs)

| Service | Purpose | Cost at MVP | Cost at scale | Notes |
|---|---|---|---|---|
| **OpenChargeMap API** | Station data (bulk + delta) | Free | Free (donations encouraged) | Attribution required. Nightly sync. |
| **OpenStreetMap Overpass** | Fallback POI + amenities near stations | Free | Free | Rate-limited; self-host `overpass-api` if you scale. |
| **Mapbox** | Base map tiles + geocoding | $0 (free tier) | ~$0.50–$2 per 1,000 tile requests | Aggressive caching cuts bills 90%. |
| **MapLibre GL** | Client-side map rendering | Free (open source) | Free | Use with any tile provider. |
| **Chargetrip** | EV routing engine (buy vs build) | Lite tier free | Standard/Enterprise pricing per request | Fastest way to ship real routing. |
| **TomTom Long Distance EV Routing API** | Alternative routing engine | Paid | Enterprise | More traffic-aware. |
| **Smartcar** | Live SoC from user vehicles | Free during dev | Per-connected-vehicle per month | Standard among consumer EV apps. |
| **OCPI feeds** | Live status + tariffs from CPOs | Per network | Per network + partnership work | Slow to negotiate — start with big networks that publish OCPI publicly. |
| **NREL Alt Fuel Data API** | US charger cross-reference | Free | Free | Great for US data validation. |
| **OpenAI / Anthropic API** | Review summarization | ~$0.001/summary | Bigger but still small | Cache summaries per station, refresh weekly. |
| **Stripe** | Payments | 2.9% + $0.30 | Same | Standard. |
| **Supabase / Neon** | Postgres + Auth + Storage | $0 (free tier) | $25–$300+/mo | Free tier is generous. |
| **Sentry** | Error tracking | Free tier | Paid | Ship with day 1. |
| **Plausible / Fathom** | Analytics | ~$9/mo | ~$50–$150/mo | Privacy-friendly, no cookie banner. |
| **Postmark / Resend** | Transactional email | Free tier | Cheap | Prefer over SendGrid for deliverability. |
| **Cloudflare** | DNS + CDN + R2 storage | Free/generous | Cheap | Use R2 — no egress fees. |

**MVP monthly infra bill:** realistically **$0–$50** with free tiers. Once you're serious: **$200–$1,000/mo** at 10k users. This niche is data-hungry, not compute-hungry.

## F.4 Auth service (Phase 1) 🟢

Do NOT build this yourself. Use **Supabase Auth** or **Clerk**. Both handle email/password, magic links, social login, MFA, session management, and abuse protection.

Custom claims you'll add: `plan` (free/premium/business), `entitlements` (feature flags), `org_id` (for B2B).

## F.5 Vehicle telematics (Phase 3) 🔵

Smartcar is the standard.
- User clicks "Connect car" → Smartcar OAuth → your backend receives a token.
- Poll for state-of-charge every 5 min during a trip; every 30 min otherwise.
- Store only what you need (SoC, sometimes odometer). Do not store location history unless the user explicitly opts in for the price-alert feature.
- Provide a big **"Disconnect car"** button.

Fallback for cars not on Smartcar: OBD-II dongle docs (Vgate iCar Pro is the community favorite), plus a Tesla API token flow for Tesla owners.

## F.6 Station data ingestion 🟢

**Daily pipeline:**
1. Pull deltas from OpenChargeMap (they support last-modified queries).
2. Cross-reference with OpenStreetMap (for amenities near stations).
3. For US: cross-reference NREL Alt Fuel Data API (canonical government data).
4. For networks with OCPI: pull live availability + tariffs every 5–15 minutes.
5. De-duplicate on lat/lng + name similarity.
6. Merge into `stations` and `stalls` tables.
7. Log every change to a `station_history` table (for the changelog + trust).
8. Rebuild search index (MeiliSearch).

**Quality gates:**
- Auto-flag stations with impossible values (0 kW, invalid country codes) for human review.
- Auto-flag stations that "disappear" from OCM (may have closed) for confirmation.
- Every ingest run posts a summary to admin (count added, updated, flagged).

## F.7 The grade engine 🟢 — the core differentiator

This is the most important service in the entire product. Get this right and the rest becomes easier; get it wrong and nothing else matters.

### F.7.1 Inputs (per stall, per rolling window)

- **Sessions** (`sessions` table): outcome (success/fail/partial), kW peak, kWh delivered, duration, timestamp.
- **Check-ins** (`checkins` table): binary outcome + optional detail.
- **OCPI live data** (when available): current status, last successful session timestamp.

### F.7.2 Formula (v1.0 — publish, version, iterate)

Score in [0, 100], mapped to letter grades: 90–100 A, 80–89 B, 70–79 C, 60–69 D, <60 F, else "insufficient data."

```
success_rate_30d       = successes / (successes + failures) over last 30 days
recency_weight(t)      = 0.92 ^ days_since(t)      # decay: yesterday matters far more than last year
weighted_success_rate  = Σ (outcome_i × recency_weight_i) / Σ recency_weight_i
delivery_ratio         = avg(kw_peak / rated_kw)   # penalizes "works but slow"
failure_penalty        = min(1.0, failure_count_30d × 0.05)   # each recent failure knocks 5 pts

score = 100 × weighted_success_rate × delivery_ratio − 100 × failure_penalty
      + repair_bonus(if verified fix, decay over 14 days)
```

**Insufficient-data rule:** if fewer than **5** attributable sessions in the last 60 days, show "N/A — insufficient data" not a made-up number. This is the single most important trust-building rule.

**Attribution to stalls:** a session is attributed to a specific stall when (a) OCPI data provides the stall ID, or (b) a check-in specifies the stall. Otherwise it's attributed to the station-level score, not stall-level.

### F.7.3 Recompute cadence

- **On write:** any new session/check-in triggers a recompute of the affected stall (worker queue, ~1–3 seconds).
- **Nightly:** full recompute for all stalls (catches recency decay drift, formula version changes).
- **On formula change:** full recompute across all stalls, post a changelog entry, notify subscribers.

### F.7.4 What is NOT in the score

Publish this list on the methodology page:
- No sponsorship.
- No network-partnership term.
- No advertising weight.
- No moderation of reviews the network complained about (unless spam).
- No paid re-grading.

### F.7.5 Anti-gaming

- Rate-limit check-ins to 10/day/user.
- Require GPS proximity for check-ins (within 200 m of the station).
- Shadow-flag suspicious accounts and don't count their data in scoring (but still show it back to them so they don't try to circumvent).
- Cross-check check-in outcomes with OCPI feed where available.

### F.7.6 Corrections

Public log of every correction accepted, with a stable URL and date. Never delete corrections; supersede them.

## F.8 Cost normalization service 🟢

Pricing in this industry is intentionally confusing. Your job is to make it un-confusing for the user.

**Per station, compute:**
- Effective $/kWh for a given user's car (given the tariff and typical charge curve).
- Session fee amortized over expected session (kWh delivered).
- Idle fee, if the user might overstay.
- Membership benefit if user has an eMSP membership stored.

**Store this as a normalized `effective_cost_usd_per_kwh` per (station, user_tier)** so trip planning becomes a simple lookup.

**Currency and VAT:** store all tariffs in the local currency they're published in; convert on read using a daily FX rate.

## F.9 Occupancy prediction 🟡

- Base signal: OCPI availability polls (when available), stored as a time series.
- Fallback signal: check-in density.
- Model v1: simple median availability by (station, day-of-week, hour). No ML.
- Model v2: gradient-boosted trees per station with features (day, hour, weather, holiday). Only build v2 when v1 breaks.

## F.10 Review summarization 🟡

- Cache summaries per station, refresh weekly (or when N new reviews arrive).
- Prompt an LLM (Claude or GPT) with the last ~30 reviews, ask for a 2-sentence practical summary: *"Stalls 3–4 throttle to 62 kW — use 1, 2 or 4. Entrance is behind the diner."*
- Store the summary + the review IDs it was based on + the model + prompt version.
- Show the raw reviews on demand — never hide the source.

## F.11 Routing engine 🟢 — buy or build?

**Buy.** Do not build your own routing engine at MVP.

- **Chargetrip** — GraphQL API, Lite plan free, Standard/Enterprise per-request. Fastest way to ship.
- **TomTom Long-Distance EV Routing API** — more traffic-aware, enterprise pricing.
- **Iternio (ABRP) API** — the accuracy leader; unclear consumer-competitor licensing terms.

Wrap whichever you pick behind your own `/routes` endpoint so you can swap providers later without breaking the front-end.

## F.12 Payments (Phase 3) 🔵

**Stripe end-to-end:**
- Products: `premium_monthly`, `premium_annual`, `business_starter`, `business_growth`, `business_enterprise`.
- Checkout: Stripe Checkout (hosted) for MVP → Stripe Elements (embedded) when you have time.
- Billing portal: Stripe Customer Portal (do not rebuild).
- Webhooks: subscribe to `invoice.paid`, `customer.subscription.*`, `checkout.session.completed`. Store the last event ID to detect gaps.
- Tax: Stripe Tax (worth it — VAT/GST is a nightmare).
- Dunning: Stripe Smart Retries + your own email.

## F.13 API service (Phase 4) 🔵

- OpenAPI 3.1 spec is the single source of truth.
- Endpoints tiered by plan (Free / Standard / Enterprise) via API-key claims.
- Rate limits per plan enforced in Redis.
- Signed webhooks (HMAC signature header) for real-time events.
- Sandbox environment with deterministic mock data.
- Idempotency-Key header on all writes.

## F.14 Notifications service 🔵

- Email: Postmark or Resend. Every email has an unsubscribe link and a preferences link.
- Push (mobile): APNs (iOS) + FCM (Android), managed via Expo Push if using Expo, or direct if bare React Native.
- In-app: a notifications endpoint your app polls or subscribes to (WebSocket).

## F.15 Search 🟡

- MeiliSearch or Typesense. Index: stations, cities, corridors, blog posts.
- Autocomplete on the map search bar (debounce 150 ms).
- Full-text on blog + guides.
- Faceted search on stations (network, connector, grade, amenities).

## F.16 Content & SEO infrastructure 🟡

- Sitemap.xml auto-generated from your DB (station pages, city pages, model pages).
- robots.txt.
- Canonical URLs on every programmatic page.
- Structured data: SoftwareApplication (landing), FAQPage (FAQ), Article (blog), Place (station pages), LocalBusiness (station pages where applicable).
- OG image auto-generation via a `/og?trip=…` endpoint that returns a rendered PNG of the trip sign.
- Server-side rendering for all SEO-important pages.

## F.17 Admin tools 🟢

- Superadmin login (only your team).
- Station queue: pending corrections, potential duplicates, orphaned data.
- User management: search, ban, refund, impersonate for support.
- Session-outcome dashboard.
- Feature-flag toggle.
- Manual grade override (rare — but log it publicly to the correction log).

---

# PART G — LEGAL, COMPLIANCE, OPS

## G.1 Legal 🟢

- Company formation (see B.1).
- Terms of Service + Privacy Policy + Cookie Policy + Attribution page.
- **Data licensing compliance:**
  - OpenChargeMap: attribution.
  - OpenStreetMap: ODbL — attribution + share-alike for derived DBs. **You do not need to open-source your app**, but you must attribute and if you distribute derived DB dumps, they must be ODbL too.
  - Google/TomTom/HERE map data: read the display terms (they restrict mixing with non-approved sources).
- **GDPR** (EU users): lawful basis for each data category, right to access/delete/portability, DPA with sub-processors.
- **CCPA/CPRA** (California users): "Do Not Sell My Info" link — required even if you don't sell.
- **FTC Endorsement Guides** (US): no fake reviews, disclose paid promotions, consumer reviews cannot be materially altered. New 2024 rule has real penalties.
- **App-store terms:** if you accept payments in the mobile app, Apple/Google want their cut (15–30%). Structure subscriptions to happen on the web where possible — you're allowed to link out.

## G.2 Security 🟢

- **Threat model:** the interesting attackers here are (a) charging networks trying to game grades, (b) scrapers trying to steal your dataset, (c) opportunistic bots. State actors and elite hackers are not your risk profile at this stage.
- HTTPS everywhere (Cloudflare handles this).
- Password hashing: bcrypt or argon2id, never MD5/SHA.
- Rate limits on every write endpoint.
- Content Security Policy header — restrictive.
- Sub-resource integrity for external scripts.
- Rotate secrets quarterly. Never commit them.
- Weekly dependency scan (`npm audit`, Snyk free tier).
- Backup: automated daily Postgres backups, tested restore quarterly.
- **PII inventory:** know exactly what personal data you hold and where.

## G.3 Analytics & observability 🟢

- Product analytics: Plausible or Fathom (page-level) + PostHog (event-level).
- Error tracking: Sentry, both frontend and backend.
- Uptime monitoring: BetterUptime or Statuscake — every endpoint.
- Public status page (StatusPage or BetterUptime's).
- Log aggregation: BetterStack Logs or Grafana Cloud (free tier).
- Key business metrics dashboard: daily active users, plans created, check-ins, corrections, waitlist size, conversion rate, MRR.

## G.4 Support 🟢

- Simple ticketing: Postmark inbound + Notion, or Plain, or Help Scout at scale.
- Response-time SLA published on the contact page. Set 2 business days, meet 1.
- Help center: Notion-published or a folder of Markdown files rendered by the site (avoids Intercom-style bloat).
- Public roadmap: use Canny or GitHub Discussions — cheap trust asset.

## G.5 Community 🟡

- Discord or a subreddit for power users — they'll evangelize you.
- Weekly "grade change" post — corridor by corridor.
- Monthly "corridor spotlight" post — long-form with your own data.
- Do NOT build a full forum. It's a support burden.

## G.6 Content ops 🟡

- Editorial calendar: 1 blog post per week for the first 6 months, then 2/month sustained.
- Content types: guides (evergreen), data insights (from your own dataset — this is your moat), news commentary (industry-relevant), behind-the-scenes.
- Writer: an AI can draft; a human (you) edits. Every post has an author byline, a real bio, and a date. Update dates when facts change.

---

# PART H — HANDING THIS TO AI BUILDERS (the playbook)

You asked because you want to hand this to AI builders. Here's how to do that without ending up with a mess.

## H.1 The 3 rules that save you from AI-generated chaos

1. **One screen at a time.** Do not tell an AI "build the app." Tell it "build screen D.6 (trip plan output) using the design system in `trip-planner-ev.html`." Give it the definition-of-done checklist for that screen and nothing else.
2. **Same design system, always.** Every AI-built page must reuse the CSS variables and typography from the landing page. Paste the `:root` block into every builder session. Otherwise every page will look slightly different.
3. **Contract before code.** Before any backend feature, agree on the JSON contract (request + response). Give the AI the contract and let it fill in the implementation. This is how you avoid rewrites.

## H.2 The prompt template that works

```
Role: senior full-stack engineer.
Project: Trip Planner EV — reliability-first EV route planner.
Design system: use the CSS tokens defined in this file: [paste :root block].
Stack: Next.js (App Router) + TypeScript + Tailwind CSS + Supabase Postgres + Supabase Auth + Stripe.
Task: Build screen D.[N] — [name].
Scope (definition of done):
- [checklist from this doc's Part D]
Constraints:
- Use only these dependencies: [list].
- No external UI libraries. No component libraries.
- Server components by default; use client components only where interactivity requires it.
- Accessibility: WCAG 2.2 AA, keyboard navigation, aria labels, focus states.
- Mobile-first responsive.
Deliverables:
- File tree (proposed).
- Each file's content.
- A short README describing how to run it locally.
Do not build anything not in the scope. Ask questions if any of the scope items are unclear.
```

## H.3 The build order for a solo/small team

**Weeks 1–2 (Phase 0):**
- Foundation checklist (B.1). Do this in one week if you're disciplined.

**Weeks 3–4:**
- Marketing pages C.2, C.3, C.4, C.5, C.9, C.10, C.11. Static pages first — they're the easiest wins.
- Deploy to production behind a "public but not launched" banner.

**Weeks 5–7:**
- Auth (D.1) + onboarding (D.2) + vehicle profile (D.3).
- Range calculator (D.4) — publish this early; it's the SEO magnet.
- Backend: F.6 (station ingest), F.7 (grade engine v1), F.8 (cost normalization).

**Weeks 8–10:**
- Planner (D.5, D.6) — the crown jewel.
- Station detail (D.7).
- Map / explore (D.8).
- Admin (D.26).
- LAUNCH — invite waitlist first.

**Weeks 11–14:**
- Check-in flow (D.14) — the data engine turns on.
- Reviews (D.15), corrections (D.16).
- Saved trips (D.10), shared trips (D.11).

**Weeks 15–20:**
- Blog engine + first 12 posts (C.6).
- Programmatic SEO pages (C.8) — this is a big build; budget 3–4 weeks.
- Occupancy v1 (F.9), review summaries (F.10).

**Weeks 21+:**
- Phase 3 (Premium): payments, telematics, mobile app.

## H.4 What to build in-house vs use SaaS

**Always SaaS (do not rebuild):**
- Auth — Supabase Auth or Clerk.
- Payments — Stripe.
- Email delivery — Postmark or Resend.
- Analytics — Plausible or PostHog.
- Error tracking — Sentry.
- Uptime — BetterUptime.

**Buy the specialty:**
- Routing engine — Chargetrip or TomTom (not custom for MVP).
- Base map tiles — Mapbox or OSM tiles.
- Vehicle telematics — Smartcar.

**Build in-house (this is your product):**
- The grade engine.
- Cost normalization.
- Review summarization pipeline.
- Programmatic SEO pages.
- Check-in flow.
- The trip-plan UI.

## H.5 Definitions of done (universal checklist)

Every screen or feature ships only when:

- [ ] Uses the design system (`:root` tokens).
- [ ] Mobile-responsive down to 360 px width.
- [ ] Keyboard-navigable end to end.
- [ ] Screen reader labels on all interactive elements.
- [ ] Loading, empty, and error states designed and implemented.
- [ ] Server-rendered where SEO matters.
- [ ] Sub-1-second largest-contentful-paint on 4G.
- [ ] Instrumented with the four key events (page view, key action, conversion, error).
- [ ] Copy reviewed for tone (per your design principles — plain, active voice, sentence case).
- [ ] Feature-flagged behind a toggle.
- [ ] Documented in the changelog if user-visible.

## H.6 The critical don'ts

- **Don't** build the mobile app before the web app is loved.
- **Don't** build the API before you have consumer users.
- **Don't** build a forum, a chat, a social feed, a badges system, a gamification layer. All of them fail without the base product.
- **Don't** promise features you don't have. Keep the roadmap public but conservative.
- **Don't** launch without the methodology page. Trust is your only advantage.
- **Don't** copy competitors' data — you'll get sued.
- **Don't** ignore the accessibility bar. Ten percent of your paying audience will need it and the rest will notice the quality.
- **Don't** ship an English-only site if you want European users. Plan i18n from the start (Next.js has i18n routing built in; use it even if only English at launch).

---

## Closing note

If you follow this document in order, in 10 weeks you have a real launched product. In 6 months you have paying subscribers. In 18 months you have B2B contracts and a defensible dataset. Every incumbent in this niche got here in years, not weeks — you have the map they didn't have.

The single most important thing on any of these pages is the one you already know: **be the honest one.** Every design choice, every copy line, every grade — earn the trust.
