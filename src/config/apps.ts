export interface DocApp {
  slug: string;
  name: string;
  category: "Payments" | "Courier";
  shortDescription: string;
  description: string;
  iconBg: string; // hex color, matches the real app icon background in Quikey
  iconText: string;
  iconUrl: string;
}

export const apps: DocApp[] = [
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
];
