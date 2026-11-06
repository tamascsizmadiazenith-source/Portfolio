# Stripe Integration — Status

This project already has a working Stripe Checkout integration (Scenario A: existing
Checkout Session call found and updated in place). See [src/services/stripe.ts](src/services/stripe.ts).

## Values to Replace

None. The `mode`, `success_url`, `cancel_url`, and `line_items` parameters already use
real, non-placeholder values (dynamic `price_data` built from the cart, and real
success/cancel URLs derived from the request origin / `NEXT_PUBLIC_SITE_URL`).

## Configured Parameters

These parameters were set from the Checkout Studio field intents in
[src/services/stripe.ts](src/services/stripe.ts):

| Parameter | Value |
|-----------|-------|
| ui_mode | hosted_page |
| billing_address_collection | auto |
| phone_number_collection | `{ enabled: false }` |
| automatic_tax | `{ enabled: false }` |
| allow_promotion_codes | true |
| submit_type | auto |
| name_collection | `{ individual: { enabled: true, optional: true } }` |
| integration_identifier | hosted_mobile_app_0001 |
| origin_context | mobile_app |

**Not applied:** `payment_method_collection` was specified as `"always"`, but per the
integration rules it only applies when `mode` is `"subscription"`. This site's checkout
uses `mode: "payment"` (one-time print purchases), so it was intentionally omitted.

**Please double-check `origin_context: "mobile_app"`.** This site is a standard web
storefront (Next.js), not a mobile app — Stripe's valid values here are `"mobile_app"`
or `"web"`. It was applied as specified in the Checkout Studio configuration, but if
that was set up with an assumption of a native mobile app, it should likely be `"web"`
instead (this affects which Checkout optimizations Stripe applies).

## Setup and next steps

- Stripe keys are already configured in `.env.local` (`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`,
  `STRIPE_SECRET_KEY`), and the `stripe` SDK (`^22.3.0`) is already a dependency.
- No webhook endpoint exists yet. If you need to react to completed payments server-side
  (e.g. order fulfillment/notifications beyond Stripe's own emails), add a
  `/api/webhook` route using `stripe.webhooks.constructEvent` and a
  `STRIPE_WEBHOOK_SECRET` env var.
- Test with Stripe's test cards in test mode, e.g. `4242 4242 4242 4242` (any future
  expiry, any CVC, any ZIP).
- Resources: https://support.stripe.com and https://docs.stripe.com/mcp
