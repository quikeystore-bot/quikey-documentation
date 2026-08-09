"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  Menu,
  X,
  ExternalLink,
  ChevronRight,
} from "lucide-react";

interface HeaderProps {
  onMenuToggle?: () => void;
  isSidebarOpen?: boolean;
  onSearchOpen?: () => void;
}



export default function Header({
  onMenuToggle,
  isSidebarOpen,
  onSearchOpen,
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Ctrl+K shortcut
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onSearchOpen?.();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onSearchOpen]);

  return (
    <header className={`docs-header ${scrolled ? "scrolled" : ""}`}>
      {/* ── Logo ── */}
      <Link
        href="/"
        className="flex items-center gap-2 flex-shrink-0 text-[var(--fg)] hover:opacity-80 transition-opacity"
        aria-label="Quikey Documentation home"
      >
        {/* No bag icon as requested */}
        <span className="font-bold text-[15px] tracking-tight text-[var(--fg)]">
          Quikey
        </span>
        <span
          className="text-[11px] font-semibold px-1.5 py-0.5 rounded bg-[var(--brand-muted)] text-[var(--brand)] leading-none"
          style={{ letterSpacing: "0.03em" }}
        >
          Docs
        </span>
      </Link>



      {/* ── Spacer ── */}
      <div className="flex-1" />

      {/* ── Right Actions ── */}
      <div className="flex items-center gap-2">
        {/* Search trigger */}
        <button
          onClick={onSearchOpen}
          className="search-trigger press hidden sm:flex"
          aria-label="Search documentation (Ctrl+K)"
          id="header-search-btn"
        >
          <Search className="w-3.5 h-3.5 flex-shrink-0" strokeWidth={2} />
          <span className="hidden lg:inline text-[13px]">Search docs...</span>
          <span className="hidden lg:inline ml-2 text-[11px] text-[var(--fg-subtle)] bg-[var(--bg)] border border-[var(--border)] px-1.5 py-0.5 rounded font-mono">
            ⌘K
          </span>
        </button>

        {/* Mobile search */}
        <button
          onClick={onSearchOpen}
          className="press sm:hidden p-2 rounded-md text-[var(--fg-muted)] hover:bg-[var(--bg-hover)] hover:text-[var(--fg)] transition-all"
          aria-label="Search"
          id="header-search-mobile-btn"
        >
          <Search className="w-4 h-4" strokeWidth={2} />
        </button>

        {/* Dashboard CTA */}
        <a
          href="https://app.quikey.store"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-brand press hidden sm:flex"
          id="header-dashboard-btn"
        >
          Dashboard
          <ExternalLink className="w-3 h-3 opacity-70" strokeWidth={2.5} />
        </a>

        {/* Mobile menu toggle */}
        <button
          onClick={onMenuToggle}
          className="press md:hidden p-2 rounded-md text-[var(--fg-muted)] hover:bg-[var(--bg-hover)] hover:text-[var(--fg)] transition-all"
          aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
          aria-expanded={isSidebarOpen}
          id="header-menu-btn"
        >
          {isSidebarOpen ? (
            <X className="w-4.5 h-4.5" strokeWidth={2} />
          ) : (
            <Menu className="w-4.5 h-4.5" strokeWidth={2} />
          )}
        </button>
      </div>
    </header>
  );
}
