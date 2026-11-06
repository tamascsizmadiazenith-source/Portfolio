import Stripe from "stripe";
import type { ShopifyCartItem } from "@/hooks/use-shopify-cart";

export type CheckoutItem = ShopifyCartItem;

// Countries Checkout offers as shipping destinations, configured in Checkout Studio.
const SHIPPING_ALLOWED_COUNTRIES: Stripe.Checkout.SessionCreateParams.ShippingAddressCollection.AllowedCountry[] = [
  "CA", "MX", "US", "AG", "AI", "AW", "BB", "BL", "BM", "BQ", "BS", "BZ", "CR", "CW", "DM",
  "DO", "GD", "GL", "GP", "GT", "HN", "HT", "JM", "KN", "KY", "LC", "MF", "MQ", "MS", "NI",
  "PA", "PM", "PR", "SV", "SX", "TC", "TT", "VC", "VG", "AR", "BO", "BR", "BV", "CL", "CO",
  "EC", "FK", "GF", "GS", "GY", "PE", "PY", "SR", "UY", "VE", "AD", "AL", "AT", "AX", "BA",
  "BE", "BG", "BY", "CH", "CZ", "DE", "DK", "EE", "ES", "FI", "FO", "FR", "GB", "GG", "GI",
  "GR", "HR", "HU", "IE", "IM", "IS", "IT", "JE", "LI", "LT", "LU", "LV", "MC", "MD", "ME",
  "MK", "MT", "NL", "NO", "PL", "PT", "RO", "RS", "RU", "SE", "SI", "SJ", "SK", "SM", "UA",
  "VA", "AO", "BF", "BI", "BJ", "BW", "CD", "CF", "CG", "CI", "CM", "CV", "DJ", "DZ", "EG",
  "ER", "ET", "GA", "GH", "GM", "GN", "GQ", "GW", "IO", "KE", "KM", "LR", "LS", "LY", "MA",
  "MG", "ML", "MR", "MU", "MW", "MZ", "NA", "NE", "NG", "RE", "RW", "SC", "SH", "SL", "SN",
  "SO", "SS", "ST", "SZ", "TD", "TF", "TG", "TN", "TZ", "UG", "YT", "ZA", "ZM", "ZW", "AE",
  "AF", "AM", "AZ", "BD", "BH", "BN", "BT", "CN", "CY", "GE", "HK", "ID", "IL", "IN", "IQ",
  "JO", "JP", "KG", "KH", "KR", "KW", "KZ", "LA", "LB", "LK", "MM", "MN", "MO", "MV", "MY",
  "NP", "OM", "PH", "PK", "QA", "SA", "SG", "TH", "TJ", "TL", "TM", "TR", "TW", "UZ", "VN",
  "YE", "AU", "CK", "FJ", "GU", "KI", "NC", "NR", "NU", "NZ", "PF", "PG", "PN", "SB", "TK",
  "TO", "TV", "VU", "WF", "WS",
];

function getStripeClient() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error("Missing STRIPE_SECRET_KEY environment variable.");
  }

  return new Stripe(secretKey);
}

function trimTrailingSlash(value: string) {
  return value.endsWith("/") ? value.slice(0, -1) : value;
}

function getBaseUrl(origin?: string) {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  if (configured) return trimTrailingSlash(configured);
  if (origin) return trimTrailingSlash(origin);
  return "http://localhost:3000";
}

function buildArtworkSummary(items: CheckoutItem[]) {
  return items
    .map((item) => {
      const category = item.category ? ` [${item.category}]` : "";
      return `${item.title}${category} - ${item.media} / ${item.size} x${item.quantity}`;
    })
    .join("\n");
}

export async function createCheckout(items: CheckoutItem[], origin?: string) {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("Cannot create checkout without items.");
  }

  const stripe = getStripeClient();
  const baseUrl = getBaseUrl(origin);
  const artworkSummary = buildArtworkSummary(items);
  const artworkIds = items.map((item) => item.artworkId).join(",").slice(0, 500);

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    success_url: `${baseUrl}/?checkout=success`,
    cancel_url: `${baseUrl}/?checkout=cancel`,
    ui_mode: "hosted_page",
    billing_address_collection: "auto",
    phone_number_collection: { enabled: false },
    automatic_tax: { enabled: false },
    allow_promotion_codes: true,
    submit_type: "auto",
    name_collection: { individual: { enabled: true, optional: true } },
    integration_identifier: "hosted_mobile_app_0001",
    origin_context: "mobile_app",
    shipping_address_collection: { allowed_countries: SHIPPING_ALLOWED_COUNTRIES },
    line_items: items.map((item) => ({
      quantity: item.quantity,
      price_data: {
        currency: "eur",
        unit_amount: Math.round(item.price * 100),
        product_data: {
          name: item.title,
          description: [item.media, item.size].filter(Boolean).join(" • "),
          metadata: {
            artworkId: item.artworkId,
            artworkCategory: item.category,
          },
        },
      },
    })),
    metadata: {
      source: "portfolio-site",
      artwork_ids: artworkIds,
      item_count: String(items.length),
    },
    payment_intent_data: {
      metadata: {
        source: "portfolio-site",
        artworks: artworkSummary.slice(0, 500),
      },
    },
  });

  if (!session.url) {
    throw new Error("Stripe checkout session did not return a URL.");
  }

  return session.url;
}