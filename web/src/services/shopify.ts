export type CheckoutItem = {
  variantId: string;
  quantity: number;
  artworkId?: string;
  artworkTitle?: string;
  artworkCategory?: string;
  media?: string;
  size?: string;
};
import variantMapJson from "@/config/shopify-variants.json";

// Load variant map from external JSON config so mappings can be updated without code changes.
const variantMap: Record<string, string> = variantMapJson as Record<string, string>;

function getSwappedSize(size: string) {
  const match = size.match(/^(\d+)\s*x\s*(\d+)\s*cm$/);
  if (!match) return "";
  return `${match[2]} x ${match[1]} cm`;
}

export function mapCartItemToVariant(media: string, size: string) {
  const directMatch = variantMap[`${media}|${size}`];
  if (directMatch) return directMatch;

  const swappedSize = getSwappedSize(size);
  return swappedSize ? variantMap[`${media}|${swappedSize}`] ?? "" : "";
}

export function getShopifyCheckoutLinkFallback() {
  const domain = process.env.SHOPIFY_STORE_DOMAIN ?? "your-shopify-store.myshopify.com";
  return `https://${domain}`;
}

export async function createCheckout(items: CheckoutItem[]) {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

  if (!domain || !token || domain.includes("your-shopify-store")) {
    return getShopifyCheckoutLinkFallback();
  }

  const query = `mutation checkoutCreate($input: CheckoutCreateInput!) {\n  checkoutCreate(input: $input) {\n    checkout { webUrl }\n    userErrors { field message }\n  }\n}`;

  const artworkSummary = items
    .map((item) => {
      const title = item.artworkTitle || item.artworkId || "Untitled artwork";
      const category = item.artworkCategory ? ` [${item.artworkCategory}]` : "";
      const spec = [item.media, item.size].filter(Boolean).join(" / ");
      const quantity = item.quantity > 1 ? ` x${item.quantity}` : "";
      return `${title}${category}${spec ? ` - ${spec}` : ""}${quantity}`;
    })
    .join("\n");

  const payload = {
    query,
    variables: {
      input: {
        lineItems: items.map((item) => ({
          variantId: item.variantId,
          quantity: item.quantity,
        })),
        note: artworkSummary || undefined,
        customAttributes: [
          {
            key: "source",
            value: "portfolio-site",
          },
          {
            key: "artworks",
            value: artworkSummary || "",
          },
        ],
      },
    },
  };

  const response = await fetch(`https://${domain}/api/2024-10/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify(payload),
  });

  const result = await response.json();
  const webUrl = result?.data?.checkoutCreate?.checkout?.webUrl;
  return webUrl || getShopifyCheckoutLinkFallback();
}
