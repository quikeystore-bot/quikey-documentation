import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronRight,
  ArrowLeft,
  Search,
  LayoutGrid,
  MousePointerClick,
  CheckCircle2,
  Users,
} from "lucide-react";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Installing Apps",
  description: "How to browse the App Store and install an app on your Quikey store.",
};

const STEPS = [
  {
    icon: LayoutGrid,
    title: "Open the App Store",
    body: "From your Quikey dashboard, go to Apps → App Store. You'll see every available app as a card with its icon, name, category, and a Free / price badge.",
  },
  {
    icon: Search,
    title: "Find the app you need",
    body: "Use the search box to filter by name or description, or click a category pill — Payments, Courier, Analytics, Sales, Marketing, or Store Management — to narrow the grid.",
  },
  {
    icon: MousePointerClick,
    title: "Open it and click Install",
    body: "Click a card to view the app's detail page, then click Install App. There's no multi-step wizard — installation happens immediately and the app is added to your store.",
  },
  {
    icon: CheckCircle2,
    title: "Finish setup on Installed Apps",
    body: "Right after installing, you'll be offered a link to Installed Apps. Most apps (payment gateways, couriers, pixels) need credentials entered before they actually do anything — see Managing Apps for that step.",
  },
];

export default function InstallingAppsPage() {
  return (
    <>
      <div className="px-6 sm:px-8 py-10 max-w-3xl">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 mb-8 flex-wrap">
          <Link href="/" className="text-[12.5px] text-[var(--fg-subtle)] hover:text-[var(--fg)] transition-colors">
            Docs
          </Link>
          <ChevronRight className="w-3 h-3 text-[var(--fg-subtle)]" strokeWidth={2} />
          <Link href="/docs/apps" className="text-[12.5px] text-[var(--fg-subtle)] hover:text-[var(--fg)] transition-colors">
            Apps & Integrations
          </Link>
          <ChevronRight className="w-3 h-3 text-[var(--fg-subtle)]" strokeWidth={2} />
          <span className="text-[12.5px] text-[var(--fg-muted)] font-medium">Installing Apps</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-[26px] font-bold text-[var(--fg)] leading-tight tracking-tight mb-2">
            Installing Apps
          </h1>
          <p className="text-[14.5px] text-[var(--fg-muted)] leading-relaxed max-w-xl">
            How to browse the App Store and add an app to your store — it's a single click, with no
            separate approval step.
          </p>
        </div>

        <div className="border-t border-[var(--border-subtle)] mb-8" />

        {/* Steps */}
        <div className="space-y-5 mb-10">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="flex gap-4">
                <div className="flex flex-col items-center flex-shrink-0">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ background: "var(--brand-muted)" }}
                  >
                    <Icon className="w-4 h-4" style={{ color: "var(--brand)" }} strokeWidth={2} />
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className="w-px flex-1 mt-1" style={{ background: "var(--border)" }} />
                  )}
                </div>
                <div className="pb-2">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--fg-subtle)] mb-1">
                    Step {i + 1}
                  </p>
                  <h3 className="text-[15px] font-semibold text-[var(--fg)] mb-1.5">{step.title}</h3>
                  <p className="text-[13.5px] text-[var(--fg-muted)] leading-relaxed">{step.body}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Who can install */}
        <div
          className="flex items-start gap-3 px-4 py-3.5 rounded-[10px] mb-8"
          style={{ background: "var(--brand-muted)", border: "1px solid var(--brand-light)" }}
        >
          <Users className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "var(--brand)" }} strokeWidth={1.8} />
          <div>
            <p className="text-[13px] font-semibold" style={{ color: "var(--brand-dark)" }}>
              Any team member can install apps
            </p>
            <p className="text-[12.5px] mt-0.5 leading-relaxed" style={{ color: "var(--brand-dark)", opacity: 0.8 }}>
              Quikey doesn't currently restrict installing or removing apps to the store owner —
              any staff account with dashboard access can do it. If that matters for your team,
              keep an eye on who has dashboard access under Store Management → Staff & Permissions.
            </p>
          </div>
        </div>

        {/* Related links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-10">
          <Link
            href="/docs/apps/managing"
            className="flex items-center justify-between gap-3 px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--bg)] hover:border-[var(--brand)] hover:bg-[var(--brand-muted)] group transition-all"
          >
            <span className="text-[13px] font-medium text-[var(--fg-muted)] group-hover:text-[var(--fg)]">
              Next: Managing Apps
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-[var(--fg-subtle)] group-hover:text-[var(--brand)] flex-shrink-0 transition-colors" strokeWidth={2.5} />
          </Link>
          <Link
            href="/docs/apps"
            className="flex items-center justify-between gap-3 px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--bg)] hover:border-[var(--brand)] hover:bg-[var(--brand-muted)] group transition-all"
          >
            <span className="text-[13px] font-medium text-[var(--fg-muted)] group-hover:text-[var(--fg)]">
              Browse all apps
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-[var(--fg-subtle)] group-hover:text-[var(--brand)] flex-shrink-0 transition-colors" strokeWidth={2.5} />
          </Link>
        </div>

        {/* Back link */}
        <div className="pt-8 border-t border-[var(--border-subtle)]">
          <Link href="/docs/apps" className="inline-flex items-center gap-2 text-[13px] font-medium text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" strokeWidth={2.5} />
            Back to all apps
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
}
