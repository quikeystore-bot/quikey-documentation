"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { tabs, navigation, type NavSection, type NavSubItem } from "@/config/navigation";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

// Third-level items (e.g. REST API → Products)
function SubSubMenu({ items, basePath }: { items: { title: string; href: string }[]; basePath: string }) {
  const pathname = usePathname();
  return (
    <div className="mt-0.5 space-y-px">
      {items.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`nav-sub-sub-item ${isActive ? "active" : ""}`}
          >
            {item.title}
          </Link>
        );
      })}
    </div>
  );
}

// Second-level items
function SubMenu({ subItems, parentHref }: { subItems: NavSubItem[]; parentHref: string }) {
  const pathname = usePathname();
  const [openSubSub, setOpenSubSub] = useState<string | null>(null);

  // Auto-open if current path is inside a sub-sub group
  useEffect(() => {
    subItems.forEach((sub) => {
      if (sub.items?.some((s) => pathname.startsWith(s.href))) {
        setOpenSubSub(sub.href);
      }
    });
  }, [pathname, subItems]);

  return (
    <div className="mt-0.5 space-y-px pb-1">
      {subItems.map((sub) => {
        const hasChildren = sub.items && sub.items.length > 0;
        // Leaf items only match their exact path — prefix matching here would
        // make an "index" item (e.g. href === parent section's href) light up
        // for every sibling page nested under that same section.
        const isActive = hasChildren
          ? pathname === sub.href || pathname.startsWith(sub.href + "/")
          : pathname === sub.href;
        const isSubSubOpen = openSubSub === sub.href;

        if (hasChildren) {
          return (
            <div key={sub.href}>
              <button
                onClick={() => setOpenSubSub(isSubSubOpen ? null : sub.href)}
                className={`nav-sub-item w-full justify-between ${isActive ? "active" : ""}`}
              >
                <span>{sub.title}</span>
                <ChevronRight
                  className="w-3 h-3 opacity-50 flex-shrink-0 transition-transform"
                  style={{ transform: isSubSubOpen ? "rotate(90deg)" : "rotate(0deg)" }}
                  strokeWidth={2.5}
                />
              </button>
              {isSubSubOpen && sub.items && (
                <SubSubMenu items={sub.items} basePath={sub.href} />
              )}
            </div>
          );
        }

        return (
          <Link
            key={sub.href}
            href={sub.href}
            className={`nav-sub-item ${isActive ? "active" : ""}`}
          >
            {sub.title}
          </Link>
        );
      })}
    </div>
  );
}

// Top-level section
function SectionItem({ section }: { section: NavSection }) {
  const pathname = usePathname();
  const hasItems = section.items && section.items.length > 0;

  // Determine if this section is active
  const isSectionActive =
    pathname === section.href || pathname.startsWith(section.href + "/");

  const [isOpen, setIsOpen] = useState(isSectionActive);

  // Auto-open when navigating into this section
  useEffect(() => {
    if (isSectionActive) setIsOpen(true);
  }, [isSectionActive]);

  if (!hasItems) {
    return (
      <Link
        href={section.href}
        className={`nav-item ${isSectionActive ? "active" : ""}`}
      >
        {section.title}
      </Link>
    );
  }

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`nav-item w-full justify-between ${isSectionActive ? "active" : ""}`}
        aria-expanded={isOpen}
      >
        <span>{section.title}</span>
        <ChevronRight
          className="w-3.5 h-3.5 opacity-40 flex-shrink-0 transition-transform"
          style={{
            transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
            transition: "transform 200ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          strokeWidth={2.5}
        />
      </button>

      {isOpen && section.items && (
        <SubMenu subItems={section.items} parentHref={section.href} />
      )}
    </div>
  );
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const sidebarRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState("general");

  // Sync active tab with current route
  useEffect(() => {
    const matchedTab = tabs.find(tab => 
      tab.sections.some(section => 
        pathname === section.href || pathname.startsWith(section.href + "/")
      )
    );
    if (matchedTab) {
      setActiveTab(matchedTab.id);
    }
  }, [pathname]);

  // Close on route change (mobile)
  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  // Trap scroll when mobile sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const activeSections = tabs.find(t => t.id === activeTab)?.sections || [];

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`sidebar-overlay ${isOpen ? "visible" : ""} md:hidden`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`docs-sidebar sidebar-scrollbar flex flex-col ${isOpen ? "open" : ""}`}
        aria-label="Documentation navigation"
        id="docs-sidebar"
      >
        {/* Tabs */}
        <div className="px-3 pt-4 pb-2 shrink-0">
          <div className="flex space-x-1 bg-[var(--bg-subtle)] p-1 rounded-lg border border-[var(--border)] shadow-inner">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`press flex-1 text-[11px] uppercase tracking-wider font-semibold py-1.5 px-2 rounded-md transition-all ${
                  activeTab === tab.id
                    ? "bg-[var(--bg)] text-[var(--fg)] shadow-sm"
                    : "text-[var(--fg-subtle)] hover:text-[var(--fg)] hover:bg-[var(--bg-subtle-hover)]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sidebar inner padding */}
        <div className="px-3 py-2 space-y-px flex-1 overflow-y-auto">
          {activeSections.map((section) => (
            <SectionItem key={section.href} section={section} />
          ))}
        </div>

        {/* Sidebar footer note */}
        <div className="px-4 py-4 border-t border-[var(--border)] mt-auto shrink-0">
          <p className="text-[11px] text-[var(--fg-subtle)] leading-relaxed">
            Can&apos;t find what you need?{" "}
            <a
              href="https://app.quikey.store/support"
              className="text-[var(--brand)] hover:underline font-medium"
            >
              Contact support →
            </a>
          </p>
        </div>
      </aside>
    </>
  );
}
