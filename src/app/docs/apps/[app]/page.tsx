import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, ArrowLeft, CreditCard, Truck } from "lucide-react";
import { apps } from "@/config/apps";
import Footer from "@/components/Footer";

interface Props {
  params: Promise<{ app: string }>;
}

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

  const CategoryIcon = app.category === "Payments" ? CreditCard : Truck;

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

        {/* Coming soon notice */}
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
