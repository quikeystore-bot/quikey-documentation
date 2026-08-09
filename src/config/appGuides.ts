export interface AppGuideField {
  label: string;
  required: boolean;
  note?: string;
}

export interface AppGuideLink {
  label: string;
  href: string;
}

export interface AppGuide {
  prerequisite: string;
  fields: AppGuideField[];
  environment: string; // sandbox/live behavior, or "no sandbox" note
  extraField?: AppGuideField;
  setupSteps: string[];
  testConnection: string;
  flowTitle: string; // "How checkout works" or "What happens when you send an order"
  flow: string;
  goodToKnow: string[];
  links: AppGuideLink[];
}

// Verified against the real config panels (quikey-frontend/src/components/tenant/apps/*)
// and services (quikey-backend/src/modules/*) — every field, step, and behavior below
// matches what's actually implemented, not aspirational copy.
export const appGuides: Record<string, AppGuide> = {
  bkash: {
    prerequisite:
      "Register as a bKash merchant and complete Tokenized Checkout onboarding at developer.bka.sh. bKash issues sandbox credentials first, then live credentials after approval.",
    fields: [
      { label: "App Key", required: true },
      { label: "App Secret", required: true },
      { label: "Username", required: true, note: "your bKash merchant account username" },
      { label: "Password", required: true, note: "your bKash merchant account password" },
    ],
    environment:
      "Toggle between Sandbox (testing) and Live (production) — this selects which bKash API host Quikey calls. Start on Sandbox, switch to Live only once you've confirmed everything works.",
    setupSteps: [
      "Install bKash from the App Store.",
      "Enter your App Key, App Secret, Username, and Password. Keep Sandbox selected while testing, then click Save Configuration.",
      "Click Test Connection — Quikey requests a real access token from bKash to confirm your credentials are valid.",
      "Turn on Enable Integration — bKash now appears as a payment option on your storefront checkout.",
      "When you're ready to accept real payments, switch to Live, re-enter your production credentials, and save again.",
    ],
    testConnection:
      "This is a real call, not a simulation — Quikey requests a fresh access token from bKash's Tokenized Checkout API using your saved credentials.",
    flowTitle: "How checkout works",
    flow:
      "At checkout, the customer is redirected to bKash's own hosted payment page. After they pay, Quikey never trusts the redirect alone — it re-verifies the payment server-side through bKash's Execute Payment API before marking the order Paid. If verification fails or the customer cancels, the order is marked accordingly and they're returned to your storefront.",
    goodToKnow: [
      "Refunds aren't available from inside Quikey yet — process any bKash refund directly from your bKash merchant account for now.",
      "There's nothing to manually register with bKash — Quikey generates the callback URL automatically for every payment.",
    ],
    links: [
      { label: "bKash Developer Documentation", href: "https://developer.bka.sh/docs/create-payment-2" },
    ],
  },

  nagad: {
    prerequisite:
      "Register as a Nagad merchant. You'll be issued a Merchant ID, an RSA Merchant Private Key, and the Nagad Gateway Public Key — sandbox credentials first, live ones after approval.",
    fields: [
      { label: "Merchant ID", required: true },
      { label: "Merchant Private Key", required: true, note: "paste the RSA key body only — no BEGIN/END lines needed" },
      { label: "Nagad Gateway Public Key", required: true, note: "the public key body issued to you" },
    ],
    environment:
      "Toggle between Sandbox (testing) and Live (production) — start on Sandbox, switch to Live once Test Connection succeeds.",
    setupSteps: [
      "Install Nagad from the App Store.",
      "Give Nagad your callback URL so they can whitelist it: your Quikey API domain + /storefront/nagad/callback.",
      "Enter your Merchant ID, Merchant Private Key, and Nagad Gateway Public Key. Keep Sandbox selected while testing, then click Save Configuration.",
      "Click Test Connection to confirm Nagad accepts your key pair before going live.",
      "Turn on Enable Integration — Nagad now appears as a payment option on your storefront checkout.",
      "When you're ready to accept real payments, switch to Live, re-enter your production credentials, and save again.",
    ],
    testConnection:
      "A real handshake, not a simulation — Quikey initiates a checkout session with Nagad, then decrypts the response using your own private key to confirm the key pair actually works.",
    flowTitle: "How checkout works",
    flow:
      "Nagad's flow is a two-step encrypted and signed handshake, ending in a redirect to Nagad's own hosted payment page. After payment, Quikey re-verifies server-side through Nagad's Verify Payment API before marking the order Paid — the redirect result alone is never trusted.",
    goodToKnow: [
      "Nagad is the only one of the payment apps that requires you to manually whitelist a callback URL with them — don't skip that step or payments can't complete.",
      "Refunds aren't available from inside Quikey yet — process any Nagad refund directly through Nagad's own merchant tools for now.",
    ],
    links: [{ label: "Nagad Merchant Portal", href: "https://mynagad.com" }],
  },

  sslcommerz: {
    prerequisite:
      "Register as an SSLCommerz merchant at sslcommerz.com. You'll get a Store ID and Store Password — sandbox credentials first, live ones after approval.",
    fields: [
      { label: "Store ID", required: true },
      { label: "Store Password", required: true },
    ],
    environment:
      "Toggle between Sandbox (testing) and Live (production). For sandbox testing, SSLCommerz provides a shared demo account: Store ID testbox, Password qwerty.",
    setupSteps: [
      "Install SSLCommerz from the App Store.",
      "Enter your Store ID and Store Password. Keep Sandbox selected while testing, then click Save Configuration.",
      "Click Test Connection to confirm SSLCommerz accepts your credentials before going live.",
      "Turn on Enable Integration — SSLCommerz now appears as a payment option on your storefront checkout, covering cards, mobile banking, and net banking.",
      "When you're ready to accept real payments, switch to Live, re-enter your production credentials, and save again.",
    ],
    testConnection:
      "A real call, not a simulation — Quikey creates an actual throwaway ৳10.00 session with SSLCommerz using your credentials to confirm they work.",
    flowTitle: "How checkout works",
    flow:
      "The customer is redirected to SSLCommerz's own hosted Session page to choose their payment method. One shared endpoint handles success, failure, cancellation, and SSLCommerz's server-to-server IPN notification — Quikey re-validates through SSLCommerz's Validation API before marking the order Paid.",
    goodToKnow: [
      "There's nothing to manually register with SSLCommerz — Quikey passes the callback/IPN URL automatically for every session.",
      "Refunds aren't available from inside Quikey yet — process any SSLCommerz refund directly through SSLCommerz's own merchant panel for now.",
    ],
    links: [
      { label: "SSLCommerz Developer Documentation", href: "https://developer.sslcommerz.com/doc/v4/" },
    ],
  },

  pathao: {
    prerequisite:
      "Register as a Pathao merchant to get your Client ID and Client Secret, plus your login Username and Password — sandbox credentials first, live ones after approval.",
    fields: [
      { label: "Client ID", required: true },
      { label: "Client Secret", required: true },
      { label: "Username", required: true, note: "your Pathao merchant login email" },
      { label: "Password", required: true, note: "your Pathao merchant login password" },
    ],
    extraField: {
      label: "Default Parcel Weight (kg)",
      required: false,
      note: "0.5–10 kg, defaults to 0.5. Quikey doesn't track per-product weight yet, so this flat number is sent for every consignment, regardless of what's actually in the order.",
    },
    environment: "Toggle between Sandbox (testing) and Live (production).",
    setupSteps: [
      "Install Pathao Courier from the App Store.",
      "Enter your Client ID, Client Secret, Username, and Password, and set your default parcel weight. Keep Sandbox selected while testing, then click Save Configuration.",
      "Click Test Connection — this also fetches the list of pickup stores registered on your real Pathao account.",
      "Pick a pickup store from the dropdown and click Save Pickup Store. If your Pathao account has no stores yet, create one directly in Pathao's own merchant dashboard first, then click Test Connection again.",
      "Turn on Enable Integration — a Send to Pathao button now appears on every order in your Orders page.",
      "When you're ready to ship real orders, switch to Live, re-enter your production credentials, and save again.",
    ],
    testConnection:
      "A real call, not a simulation — Quikey authenticates with Pathao and pulls your actual list of pickup stores. The pickup store field is always populated from this live list; there's no way to type one in manually.",
    flowTitle: "What happens when you click \"Send to Pathao\"",
    flow:
      "Quikey builds the recipient from the order's shipping address and phone number, sets the collect-on-delivery amount to the full order total (or ৳0 if the order was already paid online), and sends your saved flat parcel weight — delivery type and item type are fixed (Normal Delivery, Parcel) and aren't configurable per order. On success, Pathao's consignment ID and status are saved to the order as a shipment record.",
    goodToKnow: [
      "The Send to Pathao button only appears once a pickup store is selected — having credentials saved and the integration enabled isn't enough by itself.",
      "Quikey doesn't sync delivery status back automatically after the consignment is created. Track the shipment's progress using the tracking number, on Pathao's own merchant portal.",
    ],
    links: [{ label: "Pathao Merchant Portal", href: "https://merchant.pathao.com" }],
  },

  steadfast: {
    prerequisite: "Register as a Steadfast merchant — you'll get an Api Key and Secret Key from your Steadfast merchant panel.",
    fields: [
      { label: "Api Key", required: true },
      { label: "Secret Key", required: true },
    ],
    environment:
      "There's no Sandbox/Live toggle for Steadfast — it's the simplest of the courier integrations, with a single mode. Every request, including your first Test Connection, is a real transaction against your live account.",
    setupSteps: [
      "Install Steadfast Courier from the App Store.",
      "Enter your Api Key and Secret Key and click Save Configuration.",
      "Click Test Connection to confirm Steadfast accepts your keys — this also shows your current account balance.",
      "Turn on Enable Integration — a Send to Steadfast button now appears on every order in your Orders page.",
    ],
    testConnection:
      "A real call, not a simulation — Quikey checks your account balance through Steadfast's own API and shows the real figure back to you.",
    flowTitle: "What happens when you click \"Send to Steadfast\"",
    flow:
      "Quikey builds the recipient from the order's shipping address and phone number, and sets the collect-on-delivery amount to the full order total (or ৳0 if the order was already paid online). Steadfast doesn't require a parcel weight. On success, Steadfast's tracking code and status are saved to the order as a shipment record.",
    goodToKnow: [
      "If your Steadfast account isn't approved yet, you may see the exact error \"Account is not active!\" — that's Steadfast's own message; contact their support to get activated.",
      "Quikey doesn't sync delivery status back automatically after the consignment is created. Track the shipment's progress using the tracking code, on Steadfast's own merchant portal.",
    ],
    links: [{ label: "Steadfast Merchant Portal", href: "https://steadfast.com.bd" }],
  },
};
