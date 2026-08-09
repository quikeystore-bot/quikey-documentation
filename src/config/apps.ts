export interface DocApp {
  slug: string;
  name: string;
  category: "Payments" | "Courier" | "Analytics" | "Sales";
  shortDescription: string;
  description: string;
  iconBg: string; // hex color, matches the real app icon background in Quikey
  iconText: string;
  iconUrl: string;
}

export const apps: DocApp[] = [
  // ── Payments ──────────────────────────────────────────────────────────
  {
    slug: "bkash",
    name: "bKash",
    category: "Payments",
    shortDescription: "Accept bKash payments from your customers at checkout.",
    description:
      "Connect your bKash merchant account (Tokenized Checkout) so customers can pay with bKash directly at checkout. Enter your App Key, App Secret, Username, and Password from bKash's merchant onboarding, and Quikey handles token management, payment creation, and payment verification automatically — no manual integration required.",
    iconBg: "#E2136E",
    iconText: "bK",
    iconUrl:
      "https://res.cloudinary.com/di1vdilgj/image/upload/v1785653151/bKash-Logo_juhwli.png",
  },
  {
    slug: "nagad",
    name: "Nagad",
    category: "Payments",
    shortDescription: "Accept Nagad payments from your customers at checkout.",
    description:
      "Connect your Nagad merchant account (Checkout API) so customers can pay with Nagad directly at checkout. Enter your Merchant ID, Merchant Private Key, and Nagad Gateway Public Key issued during onboarding, and Quikey handles the RSA-secured checkout handshake and payment verification automatically — no manual integration required.",
    iconBg: "#EC1D24",
    iconText: "N",
    iconUrl:
      "https://res.cloudinary.com/di1vdilgj/image/upload/v1785653151/nagad_fdstlp.png",
  },
  {
    slug: "sslcommerz",
    name: "SSLCommerz",
    category: "Payments",
    shortDescription:
      "Accept cards, mobile banking, and net banking via SSLCommerz at checkout.",
    description:
      "Connect your SSLCommerz merchant account so customers can pay via cards, mobile banking (bKash, Nagad, Rocket), and net banking — all through one aggregator. Enter your Store ID and Store Password from SSLCommerz's merchant panel, and Quikey handles session creation and payment verification automatically — no manual integration required.",
    iconBg: "#0a3d62",
    iconText: "SSL",
    iconUrl:
      "https://res.cloudinary.com/di1vdilgj/image/upload/v1785653150/sslcommerz_cfzpfx.png",
  },

  // ── Courier ───────────────────────────────────────────────────────────
  {
    slug: "pathao",
    name: "Pathao Courier",
    category: "Courier",
    shortDescription: "Send orders for delivery via Pathao Courier with one click.",
    description:
      "Connect your Pathao Merchant API credentials so you can send any order for delivery directly from the Orders page. Enter your Client ID, Client Secret, Username, and Password, pick your Pathao pickup store, and Quikey handles authentication and consignment creation automatically — no manual entry into Pathao's own dashboard required.",
    iconBg: "#EA1D25",
    iconText: "P",
    iconUrl:
      "https://res.cloudinary.com/di1vdilgj/image/upload/v1785653150/pathao-courier_umel93.jpg",
  },
  {
    slug: "steadfast",
    name: "Steadfast Courier",
    category: "Courier",
    shortDescription: "Send orders for delivery via Steadfast Courier with one click.",
    description:
      "Connect your Steadfast Courier account so you can send any order for delivery directly from the Orders page. Enter your Api Key and Secret Key from Steadfast's merchant panel, and Quikey handles consignment creation automatically — no manual entry into Steadfast's own dashboard required.",
    iconBg: "#00A651",
    iconText: "SF",
    iconUrl:
      "https://res.cloudinary.com/di1vdilgj/image/upload/v1785653151/steadfast_zmrigd.webp",
  },

  // ── Analytics ─────────────────────────────────────────────────────────
  {
    slug: "facebook-meta-pixel",
    name: "Facebook Meta Pixel",
    category: "Analytics",
    shortDescription: "Automatic Meta Pixel tracking with just a Pixel ID.",
    description:
      "Advanced Facebook Meta Pixel integration for Quikey. Enter your Pixel ID and Quikey automatically injects the Meta Pixel base code and fires standard events across your storefront — page views, product views, cart activity, checkout steps, and purchases. No manual tagging or code required.",
    iconBg: "#0866FF",
    iconText: "FB",
    iconUrl: "https://cdn.simpleicons.org/meta/0866FF",
  },
  {
    slug: "google-analytics",
    name: "Google Analytics",
    category: "Analytics",
    shortDescription: "Automatic GA4 tracking with just a Measurement ID.",
    description:
      "Advanced Google Analytics (GA4) integration for Quikey. Enter your Measurement ID and Quikey automatically injects the gtag.js script and fires GA4-compatible ecommerce and customer events across your storefront — page views, product views, cart activity, checkout steps, purchases, sign-ups, and more — with UTM and referrer attribution captured automatically. No manual tagging or code required.",
    iconBg: "#E37400",
    iconText: "GA",
    iconUrl: "https://cdn.simpleicons.org/googleanalytics/E37400",
  },
  {
    slug: "google-tag-manager",
    name: "Google Tag Manager",
    category: "Analytics",
    shortDescription:
      "Automatic GA4-compatible ecommerce tracking with just a GTM Container ID.",
    description:
      "Advanced Google Tag Manager integration for Quikey. Enter your GTM Container ID and Quikey automatically injects the GTM script, maintains a global dataLayer, and fires GA4-compatible ecommerce and customer events across your storefront — page views, product views, cart activity, checkout steps, purchases, sign-ups, wishlist actions, coupon usage, and engagement events — with UTM and referrer attribution captured automatically. No manual tagging or code required.",
    iconBg: "#246FDB",
    iconText: "GTM",
    iconUrl: "https://cdn.simpleicons.org/googletagmanager/246FDB",
  },
  {
    slug: "tiktok-pixel-events-api",
    name: "TikTok Pixel + Events API",
    category: "Analytics",
    shortDescription:
      "Automatic TikTok Pixel tracking with just a Pixel ID, plus optional server-side Events API.",
    description:
      "Advanced TikTok integration for Quikey. Enter your Pixel ID and Quikey automatically injects the TikTok Pixel base code and fires standard events across your storefront — page views, product views, cart activity, checkout steps, and purchases. Add an Events API Access Token to enable server-side event forwarding for higher match rates and deduplication against the browser pixel. No manual tagging or code required.",
    iconBg: "#000000",
    iconText: "TT",
    iconUrl: "https://cdn.simpleicons.org/tiktok/000000",
  },

  // ── Sales ─────────────────────────────────────────────────────────────
  {
    slug: "quikey-flash-sale",
    name: "Quikey Flash Sale",
    category: "Sales",
    shortDescription:
      "Run time-limited flash sales with countdown badges and automatic checkout pricing.",
    description:
      "Schedule flash sales on any set of products — pick a percentage or fixed discount and a start/end window, and Quikey automatically shows the sale price, a countdown, and a strike-through original price on the storefront the moment it goes live, then reverts the moment it ends. Checkout always charges the live sale price server-side, never a stale or client-supplied one.",
    iconBg: "#E11D48",
    iconText: "FS",
    iconUrl:
      "https://res.cloudinary.com/di1vdilgj/image/upload/v1785665526/Quikey_flash_sale_semdt9.png",
  },
  {
    slug: "quikey-discount-coupon",
    name: "Quikey Discount & Coupon",
    category: "Sales",
    shortDescription:
      "Real, server-enforced coupon codes with minimum order amounts and usage limits.",
    description:
      'Turns your coupon codes into something customers can actually use at checkout — the storefront cart gets a working "Apply code" field, and every code is validated and priced on the server (active window, usage limit, minimum order amount) before the discount is ever applied, so nothing about the amount is trusted from the browser.',
    iconBg: "#7C3AED",
    iconText: "DC",
    iconUrl:
      "https://res.cloudinary.com/di1vdilgj/image/upload/v1785665525/quikey_discount_and_coupon_hmltok.png",
  },
  {
    slug: "quikey-bundle-products",
    name: "Quikey Bundle Products",
    category: "Sales",
    shortDescription:
      "Turn product groups into purchasable bundles with automatic checkout savings.",
    description:
      'Makes your product groups purchasable — customers get a dedicated bundle page showing the individual price, the bundle price, and the savings, with a one-click "Add bundle to cart" button. At checkout, Quikey automatically detects when a cart fully covers a bundle and applies its price instead of the summed individual prices.',
    iconBg: "#059669",
    iconText: "BP",
    iconUrl:
      "https://res.cloudinary.com/di1vdilgj/image/upload/v1785665526/Quikey_Bundle_product_wbnxqn.png",
  },
  {
    slug: "quikey-product-reviews",
    name: "Quikey Product Reviews",
    category: "Sales",
    shortDescription: "Real customer reviews and ratings on your storefront product pages.",
    description:
      'Adds a real rating summary, star breakdown, and review list to every product page, plus a "Write a review" form for customers — verified-purchase reviews are flagged automatically. New reviews land in your existing Reviews moderation queue as PENDING (or auto-approve, your choice) before they go live.',
    iconBg: "#F59E0B",
    iconText: "PR",
    iconUrl:
      "https://res.cloudinary.com/di1vdilgj/image/upload/v1785665526/Quikey_Product_Reviews_aulhkd.png",
  },
];
