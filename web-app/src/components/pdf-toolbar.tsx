"use client";

import Link from "next/link";

export function PdfToolbar({ studentName }: { studentName: string }) {
  return (
    <div
      className="no-print flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
      style={{
        maxWidth: "780px",
        margin: "1.25rem auto 0.75rem",
        padding: "0 1rem",
      }}
    >
      <div className="flex flex-wrap items-center" style={{ gap: "0.75rem" }}>
        <Link
          href="/app/class"
          style={{
            fontSize: "0.8125rem",
            color: "var(--text-secondary)",
            textDecoration: "none",
          }}
        >
          &larr; Back to class
        </Link>
        <span
          style={{
            fontSize: "0.875rem",
            fontWeight: 600,
            color: "var(--text-primary)",
          }}
        >
          PDF Preview: {studentName}
        </span>
      </div>
      <div className="flex" style={{ gap: "0.5rem" }}>
        <button
          type="button"
          onClick={() => window.print()}
          style={{
            fontSize: "0.8125rem",
            fontWeight: 500,
            padding: "0.5rem 1.125rem",
            borderRadius: "6px",
            border: "0.5px solid var(--border-color)",
            background: "var(--bg-card)",
            color: "var(--text-secondary)",
            cursor: "pointer",
            fontFamily: "inherit",
            minHeight: "44px",
          }}
        >
          Print
        </button>
        <button
          type="button"
          onClick={() => window.print()}
          style={{
            fontSize: "0.8125rem",
            fontWeight: 500,
            padding: "0.5rem 1.125rem",
            borderRadius: "6px",
            background: "var(--btn-primary)",
            color: "var(--btn-primary-text)",
            border: "0.5px solid var(--btn-primary)",
            cursor: "pointer",
            fontFamily: "inherit",
            minHeight: "44px",
          }}
        >
          Download PDF
        </button>
      </div>
    </div>
  );
}
