import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Rocket, Package, Boxes, ShoppingBag, CreditCard, Megaphone,
  Globe, Blocks, Building2, Code2, Settings, Shield,
  ChevronRight, ArrowLeft, BookOpen, Download, SlidersHorizontal,
} from "lucide-react";
import { categories } from "@/config/categories";
import { navigation } from "@/config/navigation";
import { apps, type DocApp } from "@/config/apps";
import Footer from "@/components/Footer";

const APP_CATEGORY_ORDER: DocApp["category"][] = ["Payments", "Courier", "Analytics", "Sales"];

interface Props {
  params: Promise<{ category: string }>;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Rocket, Package, Boxes, ShoppingBag, CreditCard, Megaphone,
  Globe, Blocks, Building2, Code2, Settings, Shield,
};

export async function generateStaticParams() {
  return categories.map((cat) => ({ category: cat.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = categories.find((c) => c.slug === category);
  if (!cat) return {};
  return {
    title: cat.title,
    description: cat.description,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = categories.find((c) => c.slug === category);
  if (!cat) notFound();

  const Icon = ICON_MAP[cat.icon] ?? Package;

  // Find corresponding nav section for sub-links
  const navSection = navigation.find(
    (s) => s.href === cat.href || s.href.includes(category)
  );

  return (
    <>
      <div className="px-6 sm:px-8 py-10 max-w-3xl">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 mb-8">
          <Link
            href="/"
            className="text-[12.5px] text-[var(--fg-subtle)] hover:text-[var(--fg)] transition-colors"
          >
            Docs
          </Link>
          <ChevronRight className="w-3 h-3 text-[var(--fg-subtle)]" strokeWidth={2} />
          <span className="text-[12.5px] text-[var(--fg-muted)] font-medium">
            {cat.title}
          </span>
        </nav>

        {/* Page header */}
        <div className="flex items-start gap-4 mb-8">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
            style={{ background: cat.color }}
            aria-hidden="true"
          >
            <Icon
              className="w-6 h-6"
              style={{ color: "var(--brand)" }}
              strokeWidth={1.7}
            />
          </div>
          <div>
            <h1 className="text-[26px] font-bold text-[var(--fg)] leading-tight tracking-tight mb-2">
              {cat.title}
            </h1>
            <p className="text-[14.5px] text-[var(--fg-muted)] leading-relaxed max-w-xl">
              {cat.description}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[var(--border-subtle)] mb-8" />

        {cat.slug === "apps" ? (
          <>
            {/* Guides */}
            <h2 className="text-[14px] font-semibold text-[var(--fg)] mb-4">Guides</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-10">
              <Link
                href="/docs/apps/installing"
                className="flex items-center gap-3 px-4 py-3.5 rounded-lg border border-[var(--border)] bg-[var(--bg)] hover:border-[var(--brand)] hover:bg-[var(--brand-muted)] group transition-all"
              >
                <Download className="w-4 h-4 text-[var(--fg-subtle)] group-hover:text-[var(--brand)] flex-shrink-0 transition-colors" strokeWidth={2} />
                <span className="text-[13px] font-medium text-[var(--fg-muted)] group-hover:text-[var(--fg)] flex-1">
                  Installing Apps
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-[var(--fg-subtle)] group-hover:text-[var(--brand)] flex-shrink-0 transition-colors" strokeWidth={2.5} />
              </Link>
              <Link
                href="/docs/apps/managing"
                className="flex items-center gap-3 px-4 py-3.5 rounded-lg border border-[var(--border)] bg-[var(--bg)] hover:border-[var(--brand)] hover:bg-[var(--brand-muted)] group transition-all"
              >
                <SlidersHorizontal className="w-4 h-4 text-[var(--fg-subtle)] group-hover:text-[var(--brand)] flex-shrink-0 transition-colors" strokeWidth={2} />
                <span className="text-[13px] font-medium text-[var(--fg-muted)] group-hover:text-[var(--fg)] flex-1">
                  Managing Apps
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-[var(--fg-subtle)] group-hover:text-[var(--brand)] flex-shrink-0 transition-colors" strokeWidth={2.5} />
              </Link>
            </div>

            {/* All apps, grouped by category, with real logos */}
            {APP_CATEGORY_ORDER.map((groupCategory) => {
              const groupApps = apps.filter((a) => a.category === groupCategory);
              if (groupApps.length === 0) return null;
              return (
                <div key={groupCategory} className="mb-10">
                  <h2 className="text-[14px] font-semibold text-[var(--fg)] mb-4">{groupCategory}</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {groupApps.map((app) => (
                      <Link
                        key={app.slug}
                        href={`/docs/apps/${app.slug}`}
                        className="flex items-center gap-3 px-4 py-3.5 rounded-lg border border-[var(--border)] bg-[var(--bg)] hover:border-[var(--brand)] hover:bg-[var(--brand-muted)] group transition-all"
                      >
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden bg-white border border-[var(--border)]">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={app.iconUrl} alt="" className="w-full h-full object-contain p-1" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-[13px] font-semibold text-[var(--fg)] truncate">{app.name}</p>
                          <p className="text-[12px] text-[var(--fg-subtle)] truncate">{app.shortDescription}</p>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-[var(--fg-subtle)] group-hover:text-[var(--brand)] flex-shrink-0 transition-colors" strokeWidth={2.5} />
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <>
            {/* Coming soon notice */}
            <div
              className="flex items-start gap-3 px-4 py-3.5 rounded-[10px] mb-8"
              style={{
                background: "var(--brand-muted)",
                border: "1px solid var(--brand-light)",
              }}
            >
              <BookOpen
                className="w-4 h-4 mt-0.5 flex-shrink-0"
                style={{ color: "var(--brand)" }}
                strokeWidth={1.8}
              />
              <div>
                <p className="text-[13px] font-semibold" style={{ color: "var(--brand-dark)" }}>
                  Documentation in progress
                </p>
                <p className="text-[12.5px] mt-0.5 leading-relaxed" style={{ color: "var(--brand-dark)", opacity: 0.8 }}>
                  Detailed articles for this section are being written. Check back soon — or explore the topics listed below.
                </p>
              </div>
            </div>

            {/* Sub-page links */}
            {navSection?.items && navSection.items.length > 0 && (
              <>
                <h2 className="text-[14px] font-semibold text-[var(--fg)] mb-4">
                  Topics in {cat.title}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {navSection.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center justify-between gap-3 px-4 py-3 rounded-lg border border-[var(--border)] bg-[var(--bg)] hover:border-[var(--brand)] hover:bg-[var(--brand-muted)] group transition-all"
                    >
                      <span className="text-[13px] font-medium text-[var(--fg-muted)] group-hover:text-[var(--fg)]">
                        {item.title}
                      </span>
                      <ChevronRight
                        className="w-3.5 h-3.5 text-[var(--fg-subtle)] group-hover:text-[var(--brand)] flex-shrink-0 transition-colors"
                        strokeWidth={2.5}
                      />
                    </Link>
                  ))}
                </div>
              </>
            )}
          </>
        )}

        {/* Back link */}
        <div className="mt-10 pt-8 border-t border-[var(--border-subtle)]">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[13px] font-medium text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" strokeWidth={2.5} />
            Back to all documentation
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
}
