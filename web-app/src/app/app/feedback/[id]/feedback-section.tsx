"use client";

import { useEffect, useState } from "react";
import { getAllCorrections } from "@/lib/feedback-store";
import type { FeedbackItem, CategoryId } from "@/lib/types";

interface FeedbackSectionProps {
  studentSlug: string;
  feedbackItems: FeedbackItem[];
}

export function FeedbackSection({ studentSlug, feedbackItems }: FeedbackSectionProps) {
  const [items, setItems] = useState(feedbackItems);

  useEffect(() => {
    const corrections = getAllCorrections(studentSlug);
    if (corrections.length === 0) return;

    const correctionMap = new Map(
      corrections.map((c) => [c.categoryId, c])
    );

    // eslint-disable-next-line react-hooks/set-state-in-effect -- reading localStorage after hydration
    setItems(
      feedbackItems.map((item) => {
        const correction = correctionMap.get(item.categoryId as CategoryId);
        if (!correction) return item;
        return {
          ...item,
          feedbackText: correction.feedbackText,
          score: correction.score,
        };
      })
    );
  }, [studentSlug, feedbackItems]);

  return (
    <>
      {items.map((item, i) => {
        const fg = item.color;
        const bg = item.bgColor;
        const last = i === items.length - 1;
        return (
          <div
            key={item.categoryId}
            style={{
              marginBottom: last ? 0 : "1.125rem",
              paddingBottom: last ? 0 : "1.125rem",
              borderBottom: last ? "none" : "0.5px solid #EDE8E0",
            }}
          >
            <div
              className="flex items-center"
              style={{
                fontSize: "0.8125rem",
                fontWeight: 600,
                marginBottom: "0.3125rem",
                color: fg,
                gap: "0.5rem",
              }}
            >
              {item.label}
              <span
                style={{
                  fontSize: "0.6875rem",
                  fontWeight: 500,
                  padding: "2px 8px",
                  borderRadius: "10px",
                  background: bg,
                  color: fg,
                }}
              >
                {item.score} / {item.maxScore}
              </span>
            </div>
            <p
              style={{
                fontSize: "0.8125rem",
                color: "var(--text-secondary)",
                lineHeight: 1.6,
                marginBottom: "0.5rem",
              }}
            >
              {item.feedbackText}
            </p>
            {item.quotes.map((q, qi) => (
              <div
                key={qi}
                style={{
                  fontSize: "0.75rem",
                  color: "var(--text-secondary)",
                  background: "var(--bg-body)",
                  padding: "0.5rem 0.875rem",
                  borderRadius: "0 4px 4px 0",
                  lineHeight: 1.5,
                  fontStyle: "italic",
                  marginBottom: "0.5rem",
                  borderLeft: `2px solid ${fg}`,
                }}
              >
                {q.text}
                {q.explanation && (
                  <>
                    <br />
                    <span style={{ fontStyle: "normal" }}>{q.explanation}</span>
                  </>
                )}
              </div>
            ))}
            <div
              style={{
                fontSize: "0.75rem",
                color: "var(--text-primary)",
                background: "#F5EFE3",
                padding: "0.5rem 0.875rem",
                borderRadius: "4px",
                lineHeight: 1.5,
              }}
            >
              <strong style={{ fontWeight: 600 }}>Why this matters:</strong>{" "}
              {item.tip}
            </div>
          </div>
        );
      })}
    </>
  );
}
