"use client";

import { useEffect, useState } from "react";
import {
  toGrade,
  calcPercentage,
  categoryToGrade,
  getStoredGradingSystem,
  GRADING_SYSTEM_NAMES,
  type GradingSystemId,
} from "@/lib/grading";

interface ScoreItem {
  categoryId: string;
  label: string;
  score: number;
  maxScore: number;
  color: string;
}

interface ScoreSummaryProps {
  items: ScoreItem[];
}

export function ScoreSummary({ items }: ScoreSummaryProps) {
  const [gradingSystem, setGradingSystem] = useState<GradingSystemId>("nrw-15");

  useEffect(() => {
    setGradingSystem(getStoredGradingSystem());
  }, []);

  const pct = calcPercentage(items);
  const overall = toGrade(pct, gradingSystem);
  const totalScore = items.reduce((s, i) => s + i.score, 0);
  const totalMax = items.reduce((s, i) => s + i.maxScore, 0);

  // Group: language (maxScore=15) vs content/structure (maxScore!=15 or specific ids)
  const languageItems = items.filter(
    (i) =>
      i.categoryId === "grammar" ||
      i.categoryId === "sentenceStructure" ||
      i.categoryId === "genVocabulary" ||
      i.categoryId === "domainVocab"
  );
  const otherItems = items.filter(
    (i) =>
      i.categoryId !== "grammar" &&
      i.categoryId !== "sentenceStructure" &&
      i.categoryId !== "genVocabulary" &&
      i.categoryId !== "domainVocab"
  );

  const langAvg =
    languageItems.length > 0
      ? languageItems.reduce((s, i) => s + i.score, 0) / languageItems.length
      : 0;
  const langMax = languageItems.length > 0 ? languageItems[0].maxScore : 15;

  return (
    <div
      className="score-summary-root"
      style={{
        background: "var(--bg-card)",
        border: "0.5px solid var(--border-color)",
        borderRadius: "var(--radius-card)",
        padding: "0.875rem 1rem",
        marginBottom: "1rem",
      }}
    >
      <style>{`
        @media (max-width: 767px) {
          .score-summary-root {
            padding: 0.625rem 0.625rem !important;
          }
          .score-summary-root .ss-top-row {
            flex-direction: row !important;
            gap: 0.5rem;
          }
          .score-summary-root .ss-grade-box {
            width: 40px !important;
            height: 40px !important;
            font-size: 1.125rem !important;
          }
          .score-summary-root .ss-chips {
            gap: 0.375rem !important;
          }
          .score-summary-root .ss-chips > div {
            min-width: 80px !important;
          }
        }
      `}</style>
      {/* Top row: overall grade prominent */}
      <div
        className="ss-top-row flex items-center justify-between"
        style={{ marginBottom: "0.75rem" }}
      >
        <div className="flex items-center" style={{ gap: "0.75rem" }}>
          <div
            className="ss-grade-box"
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "8px",
              background: "var(--btn-primary)",
              color: "var(--btn-primary-text)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: overall.label.length > 2 ? "1rem" : "1.375rem",
              fontWeight: 600,
              lineHeight: 1,
            }}
          >
            {overall.label}
          </div>
          <div>
            <div
              style={{
                fontSize: "0.8125rem",
                fontWeight: 600,
                color: "var(--text-primary)",
                lineHeight: 1.2,
              }}
            >
              Overall Grade
            </div>
            <div
              style={{
                fontSize: "0.6875rem",
                color: "var(--text-muted)",
                marginTop: "1px",
              }}
            >
              {totalScore} / {totalMax} points
              {overall.sublabel ? ` - ${overall.sublabel}` : ""}
            </div>
          </div>
        </div>
        <span
          style={{
            fontSize: "0.5625rem",
            fontWeight: 500,
            color: "var(--text-muted)",
            background: "var(--bg-body)",
            padding: "2px 6px",
            borderRadius: "3px",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          {GRADING_SYSTEM_NAMES[gradingSystem]}
        </span>
      </div>

      {/* Breakdown row */}
      <div
        className="ss-chips flex"
        style={{
          gap: "0.5rem",
          flexWrap: "wrap",
        }}
      >
        {/* Language average */}
        {languageItems.length > 0 && (
          <ScoreChip
            label="Language avg"
            value={`${langAvg.toFixed(1)} / ${langMax}`}
            grade={categoryToGrade(langAvg, langMax, gradingSystem)}
            gradingSystem={gradingSystem}
          />
        )}
        {/* Other categories (Content, Text Structure) */}
        {otherItems.map((item) => (
          <ScoreChip
            key={item.categoryId}
            label={item.label}
            value={`${item.score} / ${item.maxScore}`}
            grade={categoryToGrade(item.score, item.maxScore, gradingSystem)}
            gradingSystem={gradingSystem}
            color={item.color}
          />
        ))}
      </div>
    </div>
  );
}

function ScoreChip({
  label,
  value,
  grade,
  gradingSystem,
  color,
}: {
  label: string;
  value: string;
  grade: { label: string; sublabel?: string };
  gradingSystem: GradingSystemId;
  color?: string;
}) {
  return (
    <div
      style={{
        flex: "1 1 0",
        minWidth: "100px",
        padding: "0.5rem 0.625rem",
        background: "var(--bg-body)",
        borderRadius: "6px",
        borderLeft: color ? `2px solid ${color}` : undefined,
      }}
    >
      <div
        style={{
          fontSize: "0.5625rem",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.5px",
          color: color ?? "var(--text-muted)",
          marginBottom: "2px",
        }}
      >
        {label}
      </div>
      <div className="flex items-baseline" style={{ gap: "4px" }}>
        <span
          style={{
            fontSize: "0.8125rem",
            fontWeight: 600,
            color: "var(--text-primary)",
          }}
        >
          {value}
        </span>
        {gradingSystem !== "percentage" && (
          <span
            style={{
              fontSize: "0.625rem",
              color: "var(--text-muted)",
            }}
          >
            ({grade.label})
          </span>
        )}
      </div>
    </div>
  );
}
