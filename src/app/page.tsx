"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  Rocket,
  Package,
  Boxes,
  ShoppingBag,
  CreditCard,
  Megaphone,
  Globe,
  Blocks,
  Building2,
  Code2,
  Settings,
  Shield,
  Truck,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import SearchModal from "@/components/SearchModal";
import Footer from "@/components/Footer";
import { categories, quickStartItems } from "@/config/categories";

const ICON_MAP: Record<string, React.ElementType> = {
  Rocket, Package, Boxes, ShoppingBag, CreditCard, Megaphone,
  Globe, Blocks, Building2, Code2, Settings, Shield, Truck,
};

function CategoryCard({ cat }: { cat: typeof categories[0] }) {
  const Icon = ICON_MAP[cat.icon] ?? Package;
  return (
    <Link
      href={cat.href}
      className="doc-card group"
      aria-label={`${cat.title} documentation`}
    >
      <div
        className="doc-card-icon"
        style={{ background: cat.color }}
        aria-hidden="true"
      >
        <Icon className="w-4.5 h-4.5" style={{ color: "var(--brand)" }} strokeWidth={1.8} />
      </div>
      <h3 className="text-[14px] font-600 text-[var(--fg)] mb-1 leading-snug font-semibold">
        {cat.title}
      </h3>
      <p className="text-[12.5px] text-[var(--fg-muted)] leading-relaxed line-clamp-2">
        {cat.description}
      </p>
      <div className="flex items-center gap-1 mt-3 text-[12px] font-medium text-[var(--brand)] opacity-0 group-hover:opacity-100 transition-opacity">
        Explore
        <ArrowRight className="w-3 h-3" strokeWidth={2.5} />
      </div>
    </Link>
  );
}

function QuickCard({ item }: { item: typeof quickStartItems[0] }) {
  const Icon = ICON_MAP[item.icon] ?? Package;
  return (
    <Link href={item.href} className="quick-card group" aria-label={item.title}>
      <div className="flex items-center gap-2.5">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: "var(--brand-muted)" }}
        >
          <Icon className="w-4 h-4" style={{ color: "var(--brand)" }} strokeWidth={1.8} />
        </div>
        <span className="text-[13.5px] font-semibold text-[var(--fg)]">{item.title}</span>
      </div>
      <p className="text-[12.5px] text-[var(--fg-muted)] leading-relaxed">{item.description}</p>
      <span className="flex items-center gap-1 text-[12px] font-medium text-[var(--brand)]">
        Read guide <ChevronRight className="w-3 h-3" strokeWidth={2.5} />
      </span>
    </Link>
  );
}

export default function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const handleSearchOpen = useCallback(() => setSearchOpen(true), []);
  const handleSearchClose = useCallback(() => setSearchOpen(false), []);
  const handleMenuToggle = useCallback(() => setSidebarOpen((v) => !v), []);
  const handleSidebarClose = useCallback(() => setSidebarOpen(false), []);

  // Ctrl+K global shortcut
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        handleSearchOpen();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [handleSearchOpen]);

  // GSAP animations
  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    let cleanup: (() => void) | undefined;

    import("gsap").then(({ gsap }) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        // Hero fade-in
        if (heroRef.current) {
          const heroChildren = heroRef.current.querySelectorAll(
            ".hero-animate"
          );
          gsap.fromTo(
            heroChildren,
            { opacity: 0, y: 16 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              stagger: 0.08,
              delay: 0.1,
            }
          );
        }

        // Card stagger reveal
        if (cardsRef.current) {
          const cards = cardsRef.current.querySelectorAll(".doc-card");
          gsap.fromTo(
            cards,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power2.out",
              stagger: 0.05,
              scrollTrigger: {
                trigger: cardsRef.current,
                start: "top 85%",
              },
            }
          );
        }

        cleanup = () => {
          ScrollTrigger.getAll().forEach((t) => t.kill());
        };
      });
    });

    return () => cleanup?.();
  }, []);

  return (
    <>
      <Header
        onMenuToggle={handleMenuToggle}
        isSidebarOpen={sidebarOpen}
        onSearchOpen={handleSearchOpen}
      />

      <div className="docs-layout">
        <Sidebar isOpen={sidebarOpen} onClose={handleSidebarClose} />

        <main className="docs-main" id="docs-content" role="main">
          {/* ── Hero ── */}
          <section
            className="px-6 sm:px-8 pt-12 pb-10 max-w-3xl"
            aria-labelledby="hero-heading"
          >
            <div ref={heroRef}>
              {/* Breadcrumb-like label */}
              <p className="hero-animate text-[12px] font-semibold uppercase tracking-widest text-[var(--brand)] mb-4">
                Documentation
              </p>

              {/* Main heading */}
              <h1
                id="hero-heading"
                className="hero-animate text-[32px] sm:text-[38px] font-bold text-[var(--fg)] leading-tight tracking-tight mb-4"
              >
                Quikey Documentation
              </h1>

              {/* Description */}
              <p className="hero-animate text-[15px] text-[var(--fg-muted)] leading-relaxed max-w-xl mb-8">
                Everything you need to build, manage, and grow your online
                store with Quikey — from product setup to developer APIs.
              </p>

              {/* Search bar */}
              <button
                onClick={handleSearchOpen}
                className="hero-animate landing-search text-left"
                aria-label="Open search (Ctrl+K)"
                id="hero-search-btn"
              >
                <Search
                  className="w-4 h-4 text-[var(--fg-subtle)] flex-shrink-0"
                  strokeWidth={2}
                />
                <span className="flex-1 text-[14px] text-[var(--fg-subtle)]">
                  Search documentation...
                </span>
                <kbd className="hidden sm:block text-[11px] text-[var(--fg-subtle)] bg-[var(--bg-subtle)] border border-[var(--border)] px-1.5 py-0.5 rounded font-mono flex-shrink-0">
                  ⌘K
                </kbd>
              </button>
            </div>
          </section>

          {/* ── Divider ── */}
          <div className="border-t border-[var(--border-subtle)] mx-6 sm:mx-8" />

          {/* ── Quick Start ── */}
          <section className="px-6 sm:px-8 py-10" aria-labelledby="quick-start-heading">
            <h2
              id="quick-start-heading"
              className="text-[13px] font-semibold uppercase tracking-wider text-[var(--fg-subtle)] mb-5"
            >
              Quick Start
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl">
              {quickStartItems.map((item) => (
                <QuickCard key={item.href} item={item} />
              ))}
            </div>
          </section>

          {/* ── Divider ── */}
          <div className="border-t border-[var(--border-subtle)] mx-6 sm:mx-8" />

          {/* ── Category Grid ── */}
          <section className="px-6 sm:px-8 py-10" aria-labelledby="explore-heading">
            <div className="flex items-center justify-between mb-6 max-w-3xl">
              <h2
                id="explore-heading"
                className="text-[13px] font-semibold uppercase tracking-wider text-[var(--fg-subtle)]"
              >
                Explore Documentation
              </h2>
            </div>

            <div
              ref={cardsRef}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-3xl"
            >
              {categories.map((cat) => (
                <CategoryCard key={cat.slug} cat={cat} />
              ))}
            </div>
          </section>

          {/* ── Footer ── */}
          <Footer />
        </main>
      </div>

      <SearchModal isOpen={searchOpen} onClose={handleSearchClose} />
    </>
  );
}
