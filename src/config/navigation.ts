export interface NavSubSubItem {
  title: string;
  href: string;
}

export interface NavSubItem {
  title: string;
  href: string;
  items?: NavSubSubItem[];
}

export interface NavSection {
  title: string;
  href: string;
  items?: NavSubItem[];
}

export interface NavTab {
  id: string;
  label: string;
  sections: NavSection[];
}

export const tabs: NavTab[] = [
  {
    id: "general",
    label: "General",
    sections: [
      {
        title: "Getting Started",
        href: "/docs/getting-started",
        items: [
          { title: "Introduction", href: "/docs/getting-started" },
          { title: "Quick Setup", href: "/docs/getting-started/quick-setup" },
          { title: "Store Basics", href: "/docs/getting-started/store-basics" },
          { title: "Dashboard Overview", href: "/docs/getting-started/dashboard" },
        ],
      },
      {
        title: "Store Management",
        href: "/docs/store-management",
        items: [
          { title: "Store Settings", href: "/docs/store-management/settings" },
          { title: "Staff & Permissions", href: "/docs/store-management/staff" },
          { title: "Locations", href: "/docs/store-management/locations" },
          { title: "Sales Channels", href: "/docs/store-management/channels" },
        ],
      },
      {
        title: "Products",
        href: "/docs/products",
        items: [
          { title: "Products", href: "/docs/products" },
          { title: "Variants", href: "/docs/products/variants" },
          { title: "Categories", href: "/docs/products/categories" },
          { title: "Brands", href: "/docs/products/brands" },
          { title: "Collections", href: "/docs/products/collections" },
        ],
      },
      {
        title: "Inventory",
        href: "/docs/inventory",
        items: [
          { title: "Inventory Overview", href: "/docs/inventory" },
          { title: "Stock Tracking", href: "/docs/inventory/stock-tracking" },
          { title: "Low Stock Alerts", href: "/docs/inventory/alerts" },
          { title: "Bulk Updates", href: "/docs/inventory/bulk-updates" },
        ],
      },
      {
        title: "Orders & Fulfillment",
        href: "/docs/orders",
        items: [
          { title: "All Orders", href: "/docs/orders" },
          { title: "Order Lifecycle", href: "/docs/orders/lifecycle" },
          { title: "Draft Orders", href: "/docs/orders/drafts" },
          { title: "Abandoned Checkouts", href: "/docs/orders/abandoned" },
          { title: "Returns & Refunds", href: "/docs/orders/returns" },
          { title: "Shipping Labels", href: "/docs/orders/shipping" },
        ],
      },
      {
        title: "Payments",
        href: "/docs/payments",
        items: [
          { title: "Payment Methods", href: "/docs/payments" },
          { title: "bKash Setup", href: "/docs/payments/bkash" },
          { title: "Nagad Setup", href: "/docs/payments/nagad" },
          { title: "SSLCommerz", href: "/docs/payments/sslcommerz" },
          { title: "Cash on Delivery", href: "/docs/payments/cod" },
          { title: "Payouts", href: "/docs/payments/payouts" },
        ],
      },
      {
        title: "Marketing",
        href: "/docs/marketing",
        items: [
          { title: "Discount Coupons", href: "/docs/marketing/coupons" },
          { title: "Flash Sales", href: "/docs/marketing/flash-sales" },
          { title: "Bundle Products", href: "/docs/marketing/bundles" },
          { title: "Email Campaigns", href: "/docs/marketing/email" },
          { title: "SMS Campaigns", href: "/docs/marketing/sms" },
          { title: "Affiliates", href: "/docs/marketing/affiliates" },
        ],
      },
      {
        title: "B2B",
        href: "/docs/b2b",
        items: [
          { title: "B2B Overview", href: "/docs/b2b" },
          { title: "Company Accounts", href: "/docs/b2b/companies" },
          { title: "Pricing Rules", href: "/docs/b2b/pricing" },
          { title: "Applications", href: "/docs/b2b/applications" },
        ],
      },
      {
        title: "Developer Hub",
        href: "/docs/developer",
        items: [
          { title: "API Keys", href: "/docs/developer/api-keys" },
          {
            title: "REST API",
            href: "/docs/developer/rest-api",
            items: [
              { title: "Products", href: "/docs/developer/rest-api/products" },
              { title: "Orders", href: "/docs/developer/rest-api/orders" },
              { title: "Customers", href: "/docs/developer/rest-api/customers" },
              { title: "Inventory", href: "/docs/developer/rest-api/inventory" },
              { title: "B2B", href: "/docs/developer/rest-api/b2b" },
            ],
          },
          { title: "Webhooks", href: "/docs/developer/webhooks" },
          { title: "App Development", href: "/docs/developer/app-development" },
          { title: "SSO Bridge", href: "/docs/developer/sso-bridge" },
        ],
      },
      {
        title: "Super Admin",
        href: "/docs/super-admin",
        items: [
          { title: "Overview", href: "/docs/super-admin" },
          { title: "Tenant Management", href: "/docs/super-admin/tenants" },
          { title: "App Publishing", href: "/docs/super-admin/apps" },
          { title: "Platform Settings", href: "/docs/super-admin/settings" },
        ],
      },
    ],
  },
  {
    id: "apps",
    label: "Apps",
    sections: [
      {
        title: "Apps & Integrations",
        href: "/docs/apps",
        items: [
          { title: "App Store", href: "/docs/apps" },
          { title: "Installing Apps", href: "/docs/apps/installing" },
          { title: "Managing Apps", href: "/docs/apps/managing" },
          // Payments
          { title: "bKash", href: "/docs/apps/bkash" },
          { title: "Nagad", href: "/docs/apps/nagad" },
          { title: "SSLCommerz", href: "/docs/apps/sslcommerz" },
          // Courier
          { title: "Pathao Courier", href: "/docs/apps/pathao" },
          { title: "Steadfast Courier", href: "/docs/apps/steadfast" },
          // Analytics
          { title: "Facebook Meta Pixel", href: "/docs/apps/facebook-meta-pixel" },
          { title: "Google Analytics", href: "/docs/apps/google-analytics" },
          { title: "Google Tag Manager", href: "/docs/apps/google-tag-manager" },
          { title: "TikTok Pixel + Events API", href: "/docs/apps/tiktok-pixel-events-api" },
          // Sales
          { title: "Quikey Flash Sale", href: "/docs/apps/quikey-flash-sale" },
          { title: "Quikey Discount & Coupon", href: "/docs/apps/quikey-discount-coupon" },
          { title: "Quikey Bundle Products", href: "/docs/apps/quikey-bundle-products" },
          { title: "Quikey Product Reviews", href: "/docs/apps/quikey-product-reviews" },
        ],
      },
    ],
  },
  {
    id: "themes",
    label: "Themes",
    sections: [
      {
        title: "Storefront",
        href: "/docs/storefront",
        items: [
          { title: "Theme Overview", href: "/docs/storefront" },
          { title: "Theme Editor", href: "/docs/storefront/theme-editor" },
          { title: "Custom Domain", href: "/docs/storefront/custom-domain" },
          { title: "SEO Settings", href: "/docs/storefront/seo" },
          { title: "Navigation Menus", href: "/docs/storefront/navigation" },
        ],
      },
    ],
  },
];

export const navigation: NavSection[] = tabs.flatMap((tab) => tab.sections);
