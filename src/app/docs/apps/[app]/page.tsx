import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronRight,
  ArrowLeft,
  CreditCard,
  Truck,
  BarChart3,
  Sparkles,
  ListChecks,
  Zap,
  Lightbulb,
  ExternalLink,
} from "lucide-react";
import { apps, type DocApp } from "@/config/apps";
import { appGuides } from "@/config/appGuides";
import Footer from "@/components/Footer";

interface Props {
  params: Promise<{ app: string }>;
}

const CATEGORY_ICON: Record<DocApp["category"], React.ElementType> = {
  Payments: CreditCard,
  Courier: Truck,
  Analytics: BarChart3,
  Sales: Sparkles,
};

export async function generateStaticParams() {
  return apps.map((app) => ({ app: app.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { app: slug } = await params;
  const app = apps.find((a) => a.slug === slug);
  if (!app) return {};
  return {
    title: app.name,
    description: app.shortDescription,
  };
}

export default async function AppPage({ params }: Props) {
  const { app: slug } = await params;
  const app = apps.find((a) => a.slug === slug);
  if (!app) notFound();

  const CategoryIcon = CATEGORY_ICON[app.category];
  const guide = appGuides[app.slug];

  return (
    <>
      <div className="px-6 sm:px-8 py-10 max-w-3xl">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 mb-8 flex-wrap">
          <Link
            href="/"
            className="text-[12.5px] text-[var(--fg-subtle)] hover:text-[var(--fg)] transition-colors"
          >
            Docs
          </Link>
          <ChevronRight className="w-3 h-3 text-[var(--fg-subtle)]" strokeWidth={2} />
          <Link
            href="/docs/apps"
            className="text-[12.5px] text-[var(--fg-subtle)] hover:text-[var(--fg)] transition-colors"
          >
            Apps & Integrations
          </Link>
          <ChevronRight className="w-3 h-3 text-[var(--fg-subtle)]" strokeWidth={2} />
          <span className="text-[12.5px] text-[var(--fg-muted)] font-medium">{app.name}</span>
        </nav>

        {/* Page header */}
        <div className="flex items-start gap-4 mb-6">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 overflow-hidden bg-white border border-[var(--border)]"
            aria-hidden="true"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={app.iconUrl}
              alt=""
              className="w-full h-full object-contain p-1.5"
            />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <h1 className="text-[26px] font-bold text-[var(--fg)] leading-tight tracking-tight">
                {app.name}
              </h1>
              <span
                className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full"
                style={{ background: "var(--brand-muted)", color: "var(--brand-dark)" }}
              >
                <CategoryIcon className="w-3 h-3" strokeWidth={2} />
                {app.category}
              </span>
            </div>
            <p className="text-[14.5px] text-[var(--fg-muted)] leading-relaxed max-w-xl">
              {app.shortDescription}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[var(--border-subtle)] mb-8" />

        {/* Full description */}
        <div
          className="rounded-[14px] border border-[var(--border)] p-5 mb-8"
          style={{ background: "var(--bg-subtle)" }}
        >
          <h2 className="text-[13px] font-semibold text-[var(--fg)] mb-2 uppercase tracking-wide">
            How it works
          </h2>
          <p className="text-[14px] text-[var(--fg-muted)] leading-relaxed">
            {app.description}
          </p>
        </div>

        {guide ? (
          <>
            {/* Prerequisite */}
            <div
              className="flex items-start gap-3 px-4 py-3.5 rounded-[10px] mb-8"
              style={{ background: "var(--brand-muted)", border: "1px solid var(--brand-light)" }}
            >
              <div>
                <p className="text-[13px] font-semibold" style={{ color: "var(--brand-dark)" }}>
                  Before you start
                </p>
                <p className="text-[12.5px] mt-0.5 leading-relaxed" style={{ color: "var(--brand-dark)", opacity: 0.8 }}>
                  {guide.prerequisite}
                </p>
              </div>
            </div>

            {/* What you'll need */}
            <div className="mb-8">
              <h2 className="text-[13px] font-semibold text-[var(--fg)] mb-3 uppercase tracking-wide flex items-center gap-1.5">
                <ListChecks className="w-3.5 h-3.5" style={{ color: "var(--brand)" }} strokeWidth={2} />
                What you&apos;ll need
              </h2>
              <div className="rounded-[14px] border border-[var(--border)] divide-y divide-[var(--border-subtle)] overflow-hidden">
                {guide.fields.map((field) => (
                  <div key={field.label} className="flex items-start justify-between gap-4 px-4 py-3">
                    <div>
                      <p className="text-[13.5px] font-medium text-[var(--fg)]">{field.label}</p>
                      {field.note && (
                        <p className="text-[12px] text-[var(--fg-subtle)] mt-0.5">{field.note}</p>
                      )}
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-[var(--fg-subtle)] flex-shrink-0 mt-0.5">
                      Required
                    </span>
                  </div>
                ))}
                {guide.extraField && (
                  <div className="flex items-start justify-between gap-4 px-4 py-3">
                    <div>
                      <p className="text-[13.5px] font-medium text-[var(--fg)]">{guide.extraField.label}</p>
                      {guide.extraField.note && (
                        <p className="text-[12px] text-[var(--fg-subtle)] mt-0.5">{guide.extraField.note}</p>
                      )}
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-[var(--fg-subtle)] flex-shrink-0 mt-0.5">
                      Optional
                    </span>
                  </div>
                )}
              </div>
              <p className="text-[12.5px] text-[var(--fg-subtle)] leading-relaxed mt-3">{guide.environment}</p>
            </div>

            {/* Setup steps */}
            <div className="mb-8">
              <h2 className="text-[13px] font-semibold text-[var(--fg)] mb-4 uppercase tracking-wide">
                Setup
              </h2>
              <ol className="space-y-4">
                {guide.setupSteps.map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0 mt-0.5"
                      style={{ background: "var(--brand-muted)", color: "var(--brand-dark)" }}
                    >
                      {i + 1}
                    </span>
                    <p className="text-[13.5px] text-[var(--fg-muted)] leading-relaxed">{step}</p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Test connection */}
            <div className="flex items-start gap-3 mb-8">
              <Zap className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "var(--brand)" }} strokeWidth={2} />
              <div>
                <p className="text-[13.5px] font-semibold text-[var(--fg)]">What Test Connection actually does</p>
                <p className="text-[13px] text-[var(--fg-muted)] leading-relaxed mt-1">{guide.testConnection}</p>
              </div>
            </div>

            {/* Flow */}
            <div
              className="rounded-[14px] border border-[var(--border)] p-5 mb-8"
              style={{ background: "var(--bg-subtle)" }}
            >
              <h2 className="text-[13px] font-semibold text-[var(--fg)] mb-2 uppercase tracking-wide">
                {guide.flowTitle}
              </h2>
              <p className="text-[14px] text-[var(--fg-muted)] leading-relaxed">{guide.flow}</p>
            </div>

            {/* Good to know */}
            <div className="mb-8">
              <h2 className="text-[13px] font-semibold text-[var(--fg)] mb-3 uppercase tracking-wide flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5" style={{ color: "var(--brand)" }} strokeWidth={2} />
                Good to know
              </h2>
              <ul className="space-y-2.5">
                {guide.goodToKnow.map((note, i) => (
                  <li key={i} className="flex gap-2.5 text-[13.5px] text-[var(--fg-muted)] leading-relaxed">
                    <span className="text-[var(--fg-subtle)] flex-shrink-0">—</span>
                    {note}
                  </li>
                ))}
              </ul>
            </div>

            {/* Links */}
            {guide.links.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {guide.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[12.5px] font-medium px-3 py-1.5 rounded-full border border-[var(--border)] text-[var(--fg-muted)] hover:border-[var(--brand)] hover:text-[var(--brand)] transition-colors"
                  >
                    {link.label}
                    <ExternalLink className="w-3 h-3" strokeWidth={2.5} />
                  </a>
                ))}
              </div>
            )}
          </>
        ) : (
          /* Coming soon notice */
          <div
            className="flex items-start gap-3 px-4 py-3.5 rounded-[10px] mb-8"
            style={{
              background: "var(--brand-muted)",
              border: "1px solid var(--brand-light)",
            }}
          >
            <div>
              <p className="text-[13px] font-semibold" style={{ color: "var(--brand-dark)" }}>
                Step-by-step setup guide in progress
              </p>
              <p className="text-[12.5px] mt-0.5 leading-relaxed" style={{ color: "var(--brand-dark)", opacity: 0.8 }}>
                A full walkthrough for connecting {app.name} is being written. In the meantime,
                install it from the App Store inside your Quikey dashboard and follow the
                in-app setup form.
              </p>
            </div>
          </div>
        )}

        {/* Back link */}
        <div className="mt-10 pt-8 border-t border-[var(--border-subtle)]">
          <Link
            href="/docs/apps"
            className="inline-flex items-center gap-2 text-[13px] font-medium text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" strokeWidth={2.5} />
            Back to all apps
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
}
