"use client";

import { useState, type ReactNode } from "react";

interface ReviewMobileLayoutProps {
  documentPanel: ReactNode;
  reviewPanel: ReactNode;
}

export function ReviewMobileLayout({
  documentPanel,
  reviewPanel,
}: ReviewMobileLayoutProps) {
  const [activeTab, setActiveTab] = useState<"feedback" | "document">(
    "feedback"
  );

  return (
    <>
      <style>{`
        /* ---- Mobile tab bar: hidden on desktop ---- */
        .review-tab-bar {
          display: none;
        }

        /* ---- Desktop: side-by-side (unchanged) ---- */
        .review-split-wrapper {
          display: flex;
          flex: 1;
          min-height: 0;
          overflow: hidden;
          align-items: stretch;
        }

        .review-split-left {
          width: 45%;
          flex-shrink: 0;
          border-right: 0.5px solid var(--border-color);
          overflow: hidden;
        }

        .review-split-right {
          flex: 1 1 0;
          min-width: 0;
          min-height: 0;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        /* ---- Mobile overrides (< 768px) ---- */
        @media (max-width: 767px) {
          .review-tab-bar {
            display: flex;
            flex-shrink: 0;
            border-bottom: 0.5px solid var(--border-color);
            background: var(--bg-card);
          }

          .review-tab-bar button {
            flex: 1;
            padding: 0.75rem 0;
            font-family: var(--font-cormorant), Georgia, serif;
            font-size: 0.9375rem;
            font-weight: 500;
            background: none;
            border: none;
            border-bottom: 2px solid transparent;
            color: var(--text-muted);
            cursor: pointer;
            transition: color 0.15s, border-color 0.15s;
          }

          .review-tab-bar button[data-active="true"] {
            color: var(--text-primary);
            border-bottom-color: var(--accent-gold);
          }

          .review-split-wrapper {
            display: flex;
            flex-direction: column;
          }

          .review-split-left {
            width: 100%;
            flex: 1 1 0;
            border-right: none;
            min-height: 0;
          }

          .review-split-left[data-hidden="true"] {
            display: none;
          }

          .review-split-right {
            width: 100%;
            flex: 1 1 0;
          }

          .review-split-right[data-hidden="true"] {
            display: none;
          }
        }
      `}</style>

      {/* Tab bar - visible only on mobile */}
      <div className="review-tab-bar">
        <button
          type="button"
          data-active={activeTab === "feedback"}
          onClick={() => setActiveTab("feedback")}
        >
          Feedback
        </button>
        <button
          type="button"
          data-active={activeTab === "document"}
          onClick={() => setActiveTab("document")}
        >
          Document
        </button>
      </div>

      {/* Panels */}
      <div className="review-split-wrapper">
        <div
          className="review-split-left"
          data-hidden={activeTab !== "document"}
        >
          {documentPanel}
        </div>
        <div
          className="review-split-right"
          data-hidden={activeTab !== "feedback"}
        >
          {reviewPanel}
        </div>
      </div>
    </>
  );
}
