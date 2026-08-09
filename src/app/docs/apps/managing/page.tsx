import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronRight,
  ArrowLeft,
  ListChecks,
  KeyRound,
  ToggleRight,
  Trash2,
  AlertTriangle,
} from "lucide-react";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Managing Apps",
  description: "Configure, enable/disable, and uninstall apps from Installed Apps.",
};

const SECTIONS = [
  {
    icon: ListChecks,
    title: "Installed Apps",
    body: "Apps → Installed Apps lists everything you've added, each with a status badge: Active (configured and running) or Not Configured (installed, but still needs credentials before it does anything).",
  },
  {
    icon: KeyRound,
    title: "Configure",
    body: "Click Configure on an app to open its setup form. Each app asks for exactly the credentials listed on that app's own doc page — for example bKash needs its App Key, App Secret, Username, and Password. Payment and courier apps also show a webhook URL to copy into the provider's dashboard if their setup requires one.",
  },
  {
    icon: ToggleRight,
    title: "Enable / Disable",
    body: "Configured apps have an Enable Integration toggle on their config screen. Turning it off stops the app from running (e.g. a disabled pixel stops firing, a disabled payment method disappears from checkout) without losing your saved credentials — flip it back on any time.",
  },
  {
    icon: Trash2,
    title: "Uninstall",
    body: "The trash icon on Installed Apps (or the Uninstall App button on the app's own page) removes it immediately — there's no confirmation prompt. Uninstalling deletes its saved configuration, so if you reinstall later you'll need to re-enter credentials.",
  },
];

export default function ManagingAppsPage() {
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
          <span className="text-[12.5px] text-[var(--fg-muted)] font-medium">Managing Apps</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-[26px] font-bold text-[var(--fg)] leading-tight tracking-tight mb-2">
            Managing Apps
          </h1>
          <p className="text-[14.5px] text-[var(--fg-muted)] leading-relaxed max-w-xl">
            Once an app is installed, everything else — entering credentials, turning it on or off,
            or removing it — happens from Installed Apps.
          </p>
        </div>

        <div className="border-t border-[var(--border-subtle)] mb-8" />

        {/* Sections */}
        <div className="space-y-6 mb-10">
          {SECTIONS.map((section) => {
            const Icon = section.icon;
            return (
              <div key={section.title} className="flex gap-4">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "var(--brand-muted)" }}
                >
                  <Icon className="w-4 h-4" style={{ color: "var(--brand)" }} strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-[15px] font-semibold text-[var(--fg)] mb-1.5">{section.title}</h3>
                  <p className="text-[13.5px] text-[var(--fg-muted)] leading-relaxed">{section.body}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Uninstall warning */}
        <div
          className="flex items-start gap-3 px-4 py-3.5 rounded-[10px] mb-8"
          style={{ background: "#fff7ed", border: "1px solid #fed7aa" }}
        >
          <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#c2410c]" strokeWidth={1.8} />
          <div>
            <p className="text-[13px] font-semibold text-[#9a3412]">Uninstall takes effect immediately</p>
            <p className="text-[12.5px] mt-0.5 leading-relaxed text-[#9a3412]/80">
              There's no "are you sure?" step. Before removing a payment or courier app, make sure
              nothing depends on it right now — e.g. don't uninstall a payment gateway that's live
              on your checkout, or a courier app you're mid-shipment with.
            </p>
          </div>
        </div>

        {/* Related links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-10">
          <Link
            href="/docs/apps/installing"
            className="flex items-center justify-between gap-3 px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--bg)] hover:border-[var(--brand)] hover:bg-[var(--brand-muted)] group transition-all"
          >
            <span className="text-[13px] font-medium text-[var(--fg-muted)] group-hover:text-[var(--fg)]">
              Back: Installing Apps
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
