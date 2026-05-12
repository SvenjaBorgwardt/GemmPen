"use client";

import { useState } from "react";
import Link from "next/link";

type NavKey = "upload" | "configure" | "review" | "exercises" | "class" | "training";

const links: { key: NavKey; label: string; href: string }[] = [
  { key: "upload", label: "Upload", href: "/app/upload" },
  { key: "configure", label: "Configure", href: "/app/configure" },
  { key: "review", label: "Review", href: "/app/review/alex-m" },
  { key: "exercises", label: "Exercises", href: "/app/exercises/alex-m" },
  { key: "class", label: "Class", href: "/app/class" },
  { key: "training", label: "Adapt", href: "/app/training" },
];

export function Nav({ active }: { active?: NavKey }) {
  const [open, setOpen] = useState(false);

  return (
    <nav
      className="sticky top-0 z-[100]"
      style={{
        background: "var(--bg-nav)",
        borderBottom: "0.5px solid var(--border-color)",
      }}
    >
      <div
        className="flex items-center h-[52px] px-4 md:px-8"
      >
        <Link
          href="/"
          className="flex items-center gap-2"
          style={{ textDecoration: "none" }}
        >
          <img
            src="/gemmpen-logo.webp"
            alt="GemmPen"
            style={{ height: "28px", width: "auto" }}
          />
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
            <span
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "1.375rem",
                fontWeight: 600,
                color: "var(--text-primary)",
              }}
            >
              GemmPen
            </span>
            <span
              style={{
                fontSize: "0.5625rem",
                color: "var(--text-muted)",
                letterSpacing: "0.3px",
              }}
            >
              by Svenja Borgwardt
            </span>
          </div>
        </Link>

        {/* Desktop links */}
        <div className="ml-auto hidden md:flex items-center gap-7">
          {links.map((l) => (
            <div key={l.key} className="flex items-center" style={{ gap: "1.75rem" }}>
              {l.key === "training" && (
                <div
                  style={{
                    width: "1px",
                    height: "16px",
                    background: "var(--border-color)",
                    flexShrink: 0,
                  }}
                />
              )}
              <Link
                href={l.href}
                style={{
                  fontSize: "0.8125rem",
                  fontWeight: 500,
                  textDecoration: "none",
                  color:
                    active === l.key
                      ? "var(--text-primary)"
                      : "var(--text-muted)",
                }}
              >
                {l.label}
              </Link>
            </div>
          ))}
        </div>

        {/* Mobile hamburger button */}
        <button
          type="button"
          className="ml-auto md:hidden flex items-center justify-center"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          style={{
            width: "44px",
            height: "44px",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary)" strokeWidth="2" strokeLinecap="round">
            {open ? (
              <>
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="6" y1="18" x2="18" y2="6" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <div
          className="md:hidden flex flex-col gap-1 px-4 pb-4"
          style={{
            borderTop: "0.5px solid var(--border-color)",
          }}
        >
          {links.map((l) => (
            <div key={l.key}>
              {l.key === "training" && (
                <div
                  style={{
                    height: "0.5rem",
                    borderBottom: "0.5px solid var(--border-color)",
                  }}
                />
              )}
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className="block"
                style={{
                  fontSize: "0.9375rem",
                  fontWeight: 500,
                  textDecoration: "none",
                  padding: "0.875rem 0.75rem",
                  minHeight: "48px",
                  display: "flex",
                  alignItems: "center",
                  color:
                    active === l.key
                      ? "var(--text-primary)"
                      : "var(--text-muted)",
                  borderBottom: "0.5px solid var(--border-color)",
                }}
              >
                {l.label}
              </Link>
            </div>
          ))}
        </div>
      )}
    </nav>
  );
}
