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
    <div className="review-layout-root">
      <style>{`
        /* ---- Desktop: side-by-side, tab bar hidden ---- */
        .review-layout-root {
          display: flex;
          flex: 1 1 0%;
          min-height: 0;
          overflow: hidden;
        }

        .review-tab-bar {
          display: none;
        }

        .review-panel-doc {
          width: 45%;
          flex-shrink: 0;
          border-right: 0.5px solid var(--border-color);
          overflow: hidden;
        }

        .review-panel-feed {
          flex: 1 1 0%;
          min-width: 0;
          min-height: 0;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        /* ---- Mobile: stacked with tab switcher ---- */
        @media (max-width: 767px) {
          .review-layout-root {
            display: flex;
            flex-direction: column;
            flex: 1 1 0%;
            min-height: 0;
            overflow: hidden;
          }

          .review-tab-bar {
            display: flex;
            flex: 0 0 auto;
            border-bottom: 0.5px solid var(--border-color);
            background: var(--bg-card);
          }

          .review-tab-bar button {
            flex: 1;
            padding: 0.625rem 0;
            font-family: var(--font-dm-sans), system-ui, sans-serif;
            font-size: 0.8125rem;
            font-weight: 600;
            letter-spacing: 0.3px;
            text-transform: uppercase;
            background: none;
            border: none;
            border-bottom: 2.5px solid transparent;
            color: var(--text-muted);
            cursor: pointer;
            transition: color 0.15s, border-color 0.15s;
            min-height: 44px;
          }

          .review-tab-bar button[data-active="true"] {
            color: var(--text-primary);
            border-bottom-color: var(--accent-gold, #B8860B);
          }

          .review-panel-doc {
            width: 100%;
            flex: 1 1 0%;
            min-height: 0;
            border-right: none;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
          }

          .review-panel-doc[data-hidden="true"] {
            display: none;
          }

          .review-panel-feed {
            width: 100%;
            flex: 1 1 0%;
            min-height: 0;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
          }

          .review-panel-feed[data-hidden="true"] {
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
          Transcript
        </button>
      </div>

      {/* Document panel */}
      <div
        className="review-panel-doc"
        data-hidden={activeTab !== "document"}
      >
        {documentPanel}
      </div>

      {/* Feedback panel */}
      <div
        className="review-panel-feed"
        data-hidden={activeTab !== "feedback"}
      >
        {reviewPanel}
      </div>
    </div>
  );
}
