import type { Metadata } from "next";
import type { ReactNode } from "react";
import DocsShell from "@/components/DocsShell";

export const metadata: Metadata = {
  title: {
    default: "Quikey Documentation",
    template: "%s — Quikey Docs",
  },
  description: "Official documentation for Quikey — explore guides, API references, and integrations.",
};

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <DocsShell>
      {children}
    </DocsShell>
  );
}
