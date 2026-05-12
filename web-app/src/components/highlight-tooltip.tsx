"use client";

import { useState, useRef, useEffect } from "react";
import type { CatKey } from "@/lib/student-annotations";
import { CATEGORY_CSS_COLORS } from "@/lib/constants";

const CATEGORY_LABELS: Record<CatKey, string> = {
  grammar: "Grammar",
  structure: "Sentence Structure",
  vocab: "Vocabulary",
  connectives: "Connectives",
};

type Props = {
  text: string;
  kind: CatKey;
  note?: string;
};

export function HighlightTooltip({ text, kind, note }: Props) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<"above" | "below">("above");
  const spanRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const c = CATEGORY_CSS_COLORS[kind];

  useEffect(() => {
    if (open && spanRef.current) {
      const rect = spanRef.current.getBoundingClientRect();
      // If too close to top, show below
      setPosition(rect.top < 120 ? "below" : "above");
    }
  }, [open]);

  // Determine if this is a strength (positive note) or an error
  const isStrength =
    note &&
    (note.toLowerCase().includes("good") ||
      note.toLowerCase().includes("strong") ||
      note.toLowerCase().includes("excellent") ||
      note.toLowerCase().includes("sophisticated") ||
      note.toLowerCase().includes("advanced") ||
      note.toLowerCase().includes("precise"));

  return (
    <span
      ref={spanRef}
      style={{ position: "relative", display: "inline" }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <span
        style={{
          background: c.bg,
          borderBottom: `1.5px solid ${c.fg}`,
          padding: "0 2px",
          borderRadius: "2px",
          cursor: note ? "help" : "default",
          transition: "filter 0.15s ease",
          filter: open ? "brightness(0.95)" : "none",
        }}
      >
        {text}
      </span>
      {open && note && (
        <span
          ref={tooltipRef}
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            ...(position === "above"
              ? { bottom: "calc(100% + 8px)" }
              : { top: "calc(100% + 8px)" }),
            zIndex: 50,
            display: "block",
            pointerEvents: "none",
          }}
        >
          <span
            style={{
              display: "block",
              background: "var(--bg-card, #fff)",
              border: `1px solid ${c.fg}`,
              borderRadius: "6px",
              padding: "6px 10px",
              fontSize: "0.75rem",
              lineHeight: 1.45,
              color: "var(--text-primary)",
              whiteSpace: "normal",
              maxWidth: "320px",
              minWidth: "160px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            <span
              style={{
                display: "block",
                fontSize: "0.625rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.8px",
                color: c.fg,
                marginBottom: "2px",
              }}
            >
              {CATEGORY_LABELS[kind]}
              {isStrength ? " - Strength" : ""}
            </span>
            <span style={{ whiteSpace: "normal" }}>{note}</span>
          </span>
          {/* Arrow */}
          <span
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              ...(position === "above"
                ? {
                    bottom: "-4px",
                    borderLeft: "5px solid transparent",
                    borderRight: "5px solid transparent",
                    borderTop: `5px solid ${c.fg}`,
                  }
                : {
                    top: "-4px",
                    borderLeft: "5px solid transparent",
                    borderRight: "5px solid transparent",
                    borderBottom: `5px solid ${c.fg}`,
                  }),
              width: 0,
              height: 0,
              display: "block",
            }}
          />
        </span>
      )}
    </span>
  );
}
