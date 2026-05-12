"use client";

import { useState } from "react";

export function TechnicalDetails() {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: "0.5px solid var(--border-color)",
        borderRadius: "var(--radius-card)",
        overflow: "hidden",
      }}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1rem 1.5rem",
          background: "none",
          border: "none",
          cursor: "pointer",
          fontFamily: "inherit",
        }}
      >
        <div
          style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
        >
          <span
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "1.125rem",
              fontWeight: 500,
              color: "var(--text-primary)",
            }}
          >
            Under the hood
          </span>
          <span
            style={{
              fontSize: "0.6875rem",
              fontWeight: 500,
              color: "var(--text-muted)",
              background: "var(--border-color)",
              padding: "0.125rem 0.5rem",
              borderRadius: "4px",
              letterSpacing: "0.3px",
            }}
          >
            Technical
          </span>
        </div>
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
            color: "var(--text-muted)",
          }}
        >
          <path
            d="M3.5 5.25L7 8.75L10.5 5.25"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Teaser line - visible when collapsed */}
      {!open && (
        <p
          style={{
            fontSize: "0.6875rem",
            color: "var(--text-muted)",
            padding: "0 1.5rem 1rem",
            margin: 0,
            lineHeight: 1.5,
          }}
        >
          Local Gemma 4 E4B inference, DPO preference learning, LoRA adapter
          stacking, JSONL export
        </p>
      )}

      {open && (
        <div style={{ padding: "0 1.5rem 1.5rem" }}>
          <div
            style={{
              borderTop: "0.5px solid var(--border-color)",
              paddingTop: "1.25rem",
            }}
          >
            <p
              style={{
                fontSize: "0.8125rem",
                color: "var(--text-secondary)",
                lineHeight: 1.9,
                margin: 0,
                marginBottom: "1.25rem",
              }}
            >
              All of GemmPen&apos;s core work (reading handwriting, scoring,
              generating feedback) runs locally on the teacher&apos;s device.
              The adaptation step is the only part that connects to an external
              server, and it only sends your corrections, never student data.
            </p>
            <p
              style={{
                fontSize: "0.8125rem",
                color: "var(--text-secondary)",
                lineHeight: 1.9,
                margin: 0,
                marginBottom: "1.25rem",
              }}
            >
              The personalization step uses DPO (Direct Preference Optimization
              - a method that learns from the contrast between what you
              rejected and what you preferred) rather than retraining from
              scratch. This is significantly more data-efficient: 30 correction
              pairs are enough to noticeably shift the model&apos;s voice. Each
              correction is stored as a preference pair in the browser and
              exported as JSONL (one JSON object per line) in the Gemma
              conversation format.
            </p>
            <p
              style={{
                fontSize: "0.8125rem",
                color: "var(--text-secondary)",
                lineHeight: 1.9,
                margin: 0,
                marginBottom: "1.25rem",
              }}
            >
              Adaptation runs on a free Kaggle T4 GPU in about 30 minutes. The
              existing base adapter is merged first, then a fresh LoRA adapter (a
              lightweight add-on under 50 MB that adjusts style without changing
              core abilities) is created on top using DPO. This stacking approach
              means the model keeps its structured exam feedback ability but shifts
              toward the teacher&apos;s preferred style. The correction data is
              deleted from the server after the run completes.
            </p>

            {/* Links */}
            <div
              className="flex flex-wrap"
              style={{
                gap: "0.75rem 1.5rem",
                fontSize: "0.8125rem",
              }}
            >
              <a
                href="https://www.kaggle.com/code/svenjaborgwardt/gemmpen-finetuning-gemma-4-e4b"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "var(--btn-primary)",
                  fontWeight: 500,
                  textDecoration: "underline",
                  textUnderlineOffset: "2px",
                }}
              >
                View the notebook
              </a>
              <a
                href="https://github.com/SvenjaBorgwardt/GemmPen"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "var(--btn-primary)",
                  fontWeight: 500,
                  textDecoration: "underline",
                  textUnderlineOffset: "2px",
                }}
              >
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
