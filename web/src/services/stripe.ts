import Stripe from "stripe";
import type { ShopifyCartItem } from "@/hooks/use-shopify-cart";

export type CheckoutItem = ShopifyCartItem;

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