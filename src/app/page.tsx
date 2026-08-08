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
        style={{ background: "var(--brand-muted)" }}
        aria-hidden="true"
      >
        <Icon className="w-5 h-5" style={{ color: "var(--brand)" }} strokeWidth={1.8} />
      </div>
      <h3 className="text-[15px] font-semibold text-[var(--fg)] mb-2 leading-snug">
        {cat.title}
      </h3>
      <p className="text-[13px] text-[var(--fg-muted)] leading-relaxed mb-4 flex-1">
        {cat.description}
      </p>
      <div className="flex items-center gap-1.5 mt-auto text-[13px] font-medium text-[var(--brand)] opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[-4px] group-hover:translate-x-0">
        Explore documentation
        <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
      </div>
    </Link>
  );
}

function QuickCard({ item }: { item: typeof quickStartItems[0] }) {
  const Icon = ICON_MAP[item.icon] ?? Package;
  return (
    <Link href={item.href} className="quick-card group" aria-label={item.title}>
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
          style={{ background: "var(--brand-muted)" }}
        >
          <Icon className="w-4.5 h-4.5" style={{ color: "var(--brand)" }} strokeWidth={2} />
        </div>
        <span className="text-[14px] font-semibold text-[var(--fg)]">{item.title}</span>
      </div>
      <p className="text-[13px] text-[var(--fg-muted)] leading-relaxed">{item.description}</p>
      <span className="flex items-center gap-1.5 mt-1 text-[12.5px] font-semibold text-[var(--brand)] transition-transform duration-300 translate-x-0 group-hover:translate-x-1">
        Read guide <ChevronRight className="w-3.5 h-3.5" strokeWidth={2.5} />
      </span>
    </Link>
  );
}

export default function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const blobRef1 = useRef<HTMLDivElement>(null);
  const blobRef2 = useRef<HTMLDivElement>(null);

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

        // Ambient Blob Animation
        if (blobRef1.current && blobRef2.current) {
          gsap.to(blobRef1.current, {
            x: "random(-30, 30)",
            y: "random(-30, 30)",
            rotation: "random(-10, 10)",
            duration: 8,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          });
          gsap.to(blobRef2.current, {
            x: "random(-40, 40)",
            y: "random(-40, 40)",
            rotation: "random(-15, 15)",
            duration: 10,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: 1,
          });
        }

        // Hero fade-in
        if (heroRef.current) {
          const heroChildren = heroRef.current.querySelectorAll(
            ".hero-animate"
          );
          gsap.fromTo(
            heroChildren,
            { opacity: 0, y: 24, scale: 0.98 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1,
              ease: "expo.out",
              stagger: 0.1,
              delay: 0.1,
            }
          );
        }

        // Card stagger reveal
        if (cardsRef.current) {
          const cards = cardsRef.current.querySelectorAll(".doc-card, .quick-card");
          gsap.fromTo(
            cards,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "expo.out",
              stagger: 0.04,
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

      <div className="docs-layout overflow-hidden relative">
        <Sidebar isOpen={sidebarOpen} onClose={handleSidebarClose} />

        <main className="docs-main relative z-10" id="docs-content" role="main">
          
          {/* Ambient Background Glows */}
          <div className="absolute top-0 left-0 w-full h-[800px] overflow-hidden -z-10 pointer-events-none">
            <div 
              ref={blobRef1}
              className="absolute -top-[20%] left-[20%] w-[600px] h-[600px] rounded-full mix-blend-multiply opacity-[0.06] blur-[100px]"
              style={{ background: "var(--brand)" }} 
            />
            <div 
              ref={blobRef2}
              className="absolute top-[10%] right-[10%] w-[500px] h-[500px] rounded-full mix-blend-multiply opacity-[0.04] blur-[120px]"
              style={{ background: "#0ea5e9" }} 
            />
          </div>

          {/* ── Hero ── */}
          <section
            className="px-6 sm:px-8 pt-24 pb-20 max-w-4xl mx-auto flex flex-col items-center text-center"
            aria-labelledby="hero-heading"
          >
            <div ref={heroRef} className="w-full flex flex-col items-center">
              {/* Breadcrumb-like label */}
              <p className="hero-animate text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--brand)] mb-6">
                Developer & Merchant Hub
              </p>

              {/* Main heading */}
              <h1
                id="hero-heading"
                className="hero-animate text-[40px] sm:text-[56px] font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-gray-900 to-gray-600 leading-[1.1] tracking-tight mb-6"
              >
                Build your store.<br/>Grow your business.
              </h1>

              {/* Description */}
              <p className="hero-animate text-[16px] sm:text-[18px] text-[var(--fg-muted)] leading-relaxed max-w-2xl mb-12">
                Everything you need to build, manage, and grow your online
                store with Quikey — from product setup to developer APIs.
              </p>

              {/* Search bar */}
              <button
                onClick={handleSearchOpen}
                className="hero-animate landing-search group"
                aria-label="Open search (Ctrl+K)"
                id="hero-search-btn"
              >
                <Search
                  className="w-5 h-5 text-[var(--fg-subtle)] flex-shrink-0 group-hover:text-[var(--brand)] transition-colors"
                  strokeWidth={2}
                />
                <span className="flex-1 text-left text-[15px] font-medium text-[var(--fg-subtle)] group-hover:text-[var(--fg-muted)] transition-colors">
                  Search the documentation...
                </span>
                <kbd className="hidden sm:block text-[12px] text-[var(--fg-subtle)] bg-[rgba(0,0,0,0.04)] border border-[rgba(0,0,0,0.04)] px-2 py-0.5 rounded-md font-mono font-medium flex-shrink-0 shadow-sm">
                  ⌘K
                </kbd>
              </button>
            </div>
          </section>

          {/* ── Quick Start ── */}
          <section className="px-6 sm:px-8 py-12 max-w-5xl mx-auto" aria-labelledby="quick-start-heading">
            <h2
              id="quick-start-heading"
              className="text-[12px] font-bold uppercase tracking-[0.1em] text-[var(--fg-subtle)] mb-6 text-center"
            >
              Get started quickly
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5" ref={cardsRef}>
              {quickStartItems.map((item) => (
                <QuickCard key={item.href} item={item} />
              ))}
            </div>
          </section>

          {/* ── Category Grid ── */}
          <section className="px-6 sm:px-8 pt-10 pb-24 max-w-5xl mx-auto" aria-labelledby="explore-heading">
            <h2
              id="explore-heading"
              className="text-[28px] font-bold tracking-tight text-[var(--fg)] mb-10 text-center"
            >
              Explore Documentation
            </h2>

            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
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
