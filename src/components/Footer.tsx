import Link from "next/link";
import Image from "next/image";

const FOOTER_COLS = [
  {
    label: "Product",
    links: [
      { label: "Features", href: "https://quikey.store/features" },
      { label: "Pricing", href: "https://quikey.store/pricing" },
      { label: "Request a Feature", href: "https://quikey.store/feedback" },
    ],
  },
  {
    label: "Resources",
    links: [
      { label: "Community", href: "https://quikey.store/community" },
      { label: "Video Tutorials", href: "https://quikey.store/tutorials" },
      { label: "System Status", href: "https://status.quikey.store" },
    ],
  },
  {
    label: "Developers",
    links: [
      { label: "API Reference", href: "/docs/developer/rest-api" },
      { label: "Webhooks", href: "/docs/developer/webhooks" },
      { label: "Build an App", href: "/docs/developer/app-development" },
    ],
  },
  {
    label: "Legal",
    links: [
      { label: "Privacy Policy", href: "https://quikey.store/privacy" },
      { label: "Terms of Service", href: "https://quikey.store/terms" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="docs-footer" role="contentinfo">
      <div
        className="max-w-[1280px] mx-auto px-6"
        style={{ maxWidth: "var(--sidebar-w, 248px) + 1032px" }}
      >
        {/* Top: Logo + columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 pb-10 border-b border-[var(--border)]">
          {/* Brand column */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 w-fit group">
              <Image
                src="/logo.png"
                alt="Quikey"
                width={26}
                height={26}
                className="object-contain"
              />
              <span className="font-bold text-[14px] text-[var(--fg)] tracking-tight">
                Quikey
              </span>
            </Link>
            <p className="text-[12.5px] text-[var(--fg-subtle)] leading-relaxed max-w-[200px]">
              The complete e-commerce platform built for Bangladesh.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3 mt-4">
              <a
                href="https://facebook.com/quikey"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--fg-subtle)] hover:text-[var(--fg)] transition-colors text-[12px] font-medium"
                aria-label="Quikey on Facebook"
              >
                FB
              </a>
              <a
                href="https://linkedin.com/company/quikey"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--fg-subtle)] hover:text-[var(--fg)] transition-colors text-[12px] font-medium"
                aria-label="Quikey on LinkedIn"
              >
                LI
              </a>
              <a
                href="https://github.com/quikey"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--fg-subtle)] hover:text-[var(--fg)] transition-colors text-[12px] font-medium"
                aria-label="Quikey on GitHub"
              >
                GH
              </a>
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_COLS.map((col) => (
            <div key={col.label}>
              <p className="text-[12px] font-semibold text-[var(--fg)] mb-3 uppercase tracking-wider">
                {col.label}
              </p>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[12.5px] text-[var(--fg-subtle)] hover:text-[var(--fg)] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6">
          <p className="text-[12px] text-[var(--fg-subtle)]">
            © {new Date().getFullYear()} Quikey. All rights reserved.
          </p>
          <p className="text-[12px] text-[var(--fg-subtle)]">
            Built for Bangladeshi e-commerce.
          </p>
        </div>
      </div>
    </footer>
  );
}
