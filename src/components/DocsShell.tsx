"use client";

import { useState, useCallback } from "react";
import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import SearchModal from "@/components/SearchModal";

export default function DocsShell({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();

  const handleMenuToggle = useCallback(() => setSidebarOpen((v) => !v), []);
  const handleSidebarClose = useCallback(() => setSidebarOpen(false), []);
  const handleSearchOpen = useCallback(() => setSearchOpen(true), []);
  const handleSearchClose = useCallback(() => setSearchOpen(false), []);

  return (
    <>
      <Header
        onMenuToggle={handleMenuToggle}
        isSidebarOpen={sidebarOpen}
        onSearchOpen={handleSearchOpen}
      />

      <div className="docs-layout">
        <Sidebar isOpen={sidebarOpen} onClose={handleSidebarClose} />
        <main
          className="docs-main min-h-screen"
          id="docs-content"
          role="main"
        >
          <div key={pathname} className="page-transition">
            {children}
          </div>
        </main>
      </div>

      <SearchModal isOpen={searchOpen} onClose={handleSearchClose} />
    </>
  );
}
