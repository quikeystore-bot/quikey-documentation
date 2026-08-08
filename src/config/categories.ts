export interface DocCategory {
  slug: string;
  title: string;
  description: string;
  icon: string; // Lucide icon name
  href: string;
  color: string; // Tailwind bg class for icon background
}

export const categories: DocCategory[] = [
  {
    slug: "getting-started",
    title: "Getting Started",
    description: "Set up your store, understand the dashboard, and get running in minutes.",
    icon: "Rocket",
    href: "/docs/getting-started",
    color: "#ecfdf5",
  },
  {
    slug: "products",
    title: "Products",
    description: "Manage products, variants, categories, brands, and collections.",
    icon: "Package",
    href: "/docs/products",
    color: "#eff6ff",
  },
  {
    slug: "inventory",
    title: "Inventory",
    description: "Track stock levels, set alerts, and manage inventory across locations.",
    icon: "Boxes",
    href: "/docs/inventory",
    color: "#fdf4ff",
  },
  {
    slug: "orders",
    title: "Orders & Fulfillment",
    description: "Process orders, handle returns, manage shipping and fulfillment workflows.",
    icon: "ShoppingBag",
    href: "/docs/orders",
    color: "#fff7ed",
  },
  {
    slug: "payments",
    title: "Payments",
    description: "Configure bKash, Nagad, SSLCommerz, and other payment methods.",
    icon: "CreditCard",
    href: "/docs/payments",
    color: "#f0fdf4",
  },
  {
    slug: "marketing",
    title: "Marketing",
    description: "Coupons, flash sales, bundles, email and SMS campaigns, affiliates.",
    icon: "Megaphone",
    href: "/docs/marketing",
    color: "#fefce8",
  },
  {
    slug: "storefront",
    title: "Storefront",
    description: "Customize your theme, manage domains, and configure SEO.",
    icon: "Globe",
    href: "/docs/storefront",
    color: "#f0f9ff",
  },
  {
    slug: "apps",
    title: "Apps & Integrations",
    description: "Install and configure Pathao, Steadfast, payment gateways, and more.",
    icon: "Blocks",
    href: "/docs/apps",
    color: "#fdf2f8",
  },
  {
    slug: "b2b",
    title: "B2B",
    description: "Manage wholesale buyers, company accounts, and B2B pricing rules.",
    icon: "Building2",
    href: "/docs/b2b",
    color: "#f8fafc",
  },
  {
    slug: "developer",
    title: "Developer Hub",
    description: "REST APIs, webhooks, app development, and SSO bridge documentation.",
    icon: "Code2",
    href: "/docs/developer",
    color: "#f0fdf4",
  },
  {
    slug: "store-management",
    title: "Store Management",
    description: "Staff permissions, store settings, locations, and sales channels.",
    icon: "Settings",
    href: "/docs/store-management",
    color: "#fefce8",
  },
  {
    slug: "super-admin",
    title: "Super Admin",
    description: "Platform-level tenant management, app publishing, and admin tools.",
    icon: "Shield",
    href: "/docs/super-admin",
    color: "#fff1f2",
  },
];

export const quickStartItems = [
  {
    title: "Create Your First Product",
    description: "Add products with variants, pricing, and images.",
    href: "/docs/products",
    icon: "Package",
  },
  {
    title: "Accept Payments",
    description: "Connect bKash, Nagad, or SSLCommerz to your store.",
    href: "/docs/payments",
    icon: "CreditCard",
  },
  {
    title: "Install Courier Apps",
    description: "Set up Pathao or Steadfast for order delivery.",
    href: "/docs/apps/courier",
    icon: "Truck",
  },
];
