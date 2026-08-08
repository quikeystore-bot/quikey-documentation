"use client";

import { useEffect, useRef, useState } from "react";
import { Search, X, ArrowRight, FileText, Code2, Package, ShoppingBag } from "lucide-react";
import Link from "next/link";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Placeholder popular links shown before typing
const POPULAR = [
  { label: "Getting Started", href: "/docs/getting-started", icon: FileText },
  { label: "REST API Reference", href: "/docs/developer/rest-api", icon: Code2 },
  { label: "Products Guide", href: "/docs/products", icon: Package },
  { label: "Orders & Fulfillment", href: "/docs/orders", icon: ShoppingBag },
];

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="search-modal"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label="Search documentation"
      id="search-modal"
    >
      <div className="search-box mx-4">
        {/* Input row */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[var(--border)]">
          <Search className="w-4 h-4 text-[var(--fg-subtle)] flex-shrink-0" strokeWidth={2} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search documentation..."
            className="flex-1 text-[14px] text-[var(--fg)] placeholder:text-[var(--fg-subtle)] bg-transparent outline-none border-none font-[inherit]"
            id="search-input"
            aria-label="Search input"
            autoComplete="off"
            spellCheck={false}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-0.5 rounded text-[var(--fg-subtle)] hover:text-[var(--fg)] hover:bg-[var(--bg-hover)] transition-colors"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" strokeWidth={2.5} />
            </button>
          )}
          <kbd className="text-[11px] text-[var(--fg-subtle)] bg-[var(--bg-subtle)] border border-[var(--border)] px-1.5 py-0.5 rounded font-mono hidden sm:block">
            Esc
          </kbd>
        </div>

        {/* Results / Popular */}
        <div className="py-2 max-h-[400px] overflow-y-auto">
          {!query ? (
            <>
              <p className="px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-[var(--fg-subtle)]">
                Popular
              </p>
              {POPULAR.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className="flex items-center gap-3 px-4 py-2.5 text-[13.5px] text-[var(--fg-muted)] hover:bg-[var(--bg-hover)] hover:text-[var(--fg)] transition-colors group"
                  >
                    <Icon className="w-4 h-4 text-[var(--fg-subtle)] group-hover:text-[var(--brand)] flex-shrink-0 transition-colors" strokeWidth={1.8} />
                    <span className="flex-1">{item.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-40 transition-opacity" strokeWidth={2} />
                  </Link>
                );
              })}
            </>
          ) : (
            <div className="px-4 py-8 text-center text-[13px] text-[var(--fg-subtle)]">
              <Search className="w-8 h-8 mx-auto mb-3 opacity-20" strokeWidth={1.5} />
              <p className="font-medium text-[var(--fg-muted)]">No results for &ldquo;{query}&rdquo;</p>
              <p className="mt-1 text-[12px]">Full search coming soon. Try browsing the sidebar.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
