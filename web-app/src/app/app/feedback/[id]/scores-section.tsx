"use client";

import { useEffect, useState } from "react";
import { getAllCorrections } from "@/lib/feedback-store";
import { ScoreBar } from "@/components/score-bar";
import type { CategoryId } from "@/lib/types";

type CatKey = "grammar" | "structure" | "vocab" | "connectives";

const catColor: Record<CatKey, { fg: string }> = {
  grammar: { fg: "var(--cat-grammar)" },
  structure: { fg: "var(--cat-sentence)" },
  vocab: { fg: "var(--cat-vocabulary)" },
  connectives: { fg: "var(--cat-connectives)" },
};

const categoryFeedbackMap: Record<string, CatKey> = {
  grammar: "grammar",
  sentenceStructure: "structure",
  genVocabulary: "vocab",
  domainVocab: "connectives",
};

interface CategoryScore {
  id: string;
  label: string;
  score: number;
  maxScore: number;
}

interface PotentialData {
  width: number;
  label: string;
}

interface ScoresSectionProps {
  studentSlug: string;
  studentName: string;
  taskInfo: string;
  categoryScores: CategoryScore[];
  potential: Record<string, PotentialData>;
}

export function ScoresSection({
  studentSlug,
  studentName,
  taskInfo,
  categoryScores,
  potential,
}: ScoresSectionProps) {
  const [scores, setScores] = useState(categoryScores);

  useEffect(() => {
    const corrections = getAllCorrections(studentSlug);
    if (corrections.length === 0) return;

    const correctionMap = new Map(
      corrections.map((c) => [c.categoryId, c])
    );

    // eslint-disable-next-line react-hooks/set-state-in-effect -- reading localStorage after hydration
    setScores(
      categoryScores.map((cat) => {
        const correction = correctionMap.get(cat.id as CategoryId);
        if (!correction) return cat;
        return { ...cat, score: correction.score };
      })
    );
  }, [studentSlug, categoryScores]);

  const overallAvg = (
    scores.reduce((acc, c) => acc + c.score, 0) / scores.length
  ).toFixed(1);

  return (
    <>
      <div
        className="flex flex-wrap items-center justify-between gap-3"
        style={{
          background: "var(--bg-body)",
          borderRadius: "6px",
          padding: "1.125rem 1.375rem",
          marginBottom: "1.5rem",
        }}
      >
        <div>
          <h2
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "1.375rem",
              fontWeight: 500,
              color: "var(--text-primary)",
              marginBottom: "0.1875rem",
            }}
          >
            {studentName}
          </h2>
          <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
            {taskInfo}
          </p>
        </div>
        <div
          className="text-center"
          style={{
            background: "var(--bg-card)",
            border: "0.5px solid var(--border-color)",
            borderRadius: "var(--radius-card)",
            padding: "0.75rem 1.375rem",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "2rem",
              fontWeight: 500,
              color: "var(--text-primary)",
              lineHeight: 1,
            }}
          >
            {overallAvg}
          </div>
          <div
            style={{
              fontSize: "0.625rem",
              color: "var(--text-muted)",
              marginTop: "0.1875rem",
            }}
          >
            of 15 (language avg.)
          </div>
        </div>
      </div>

      <SectionHeading>Your Scores</SectionHeading>
      <div
        className="grid grid-cols-1 sm:grid-cols-2"
        style={{
          gap: "0.625rem",
          marginBottom: "1.5rem",
        }}
      >
        {scores.map((cat) => {
          const key = categoryFeedbackMap[cat.id];
          const originalCat = categoryScores.find((c) => c.id === cat.id);
          const originalScore = originalCat?.score ?? cat.score;
          const pot = potential[cat.id];

          let adjustedPot: PotentialData | undefined;
          if (pot) {
            const target = originalScore + (pot.width / 100) * cat.maxScore;
            if (cat.score < target) {
              const newWidth = ((target - cat.score) / cat.maxScore) * 100;
              adjustedPot = { width: newWidth, label: pot.label };
            }
          }

          return (
            <div
              key={cat.id}
              style={{
                background: "var(--bg-body)",
                borderRadius: "6px",
                padding: "0.75rem 0.875rem",
              }}
            >
              <div
                className="flex items-center justify-between"
                style={{ marginBottom: "0.375rem" }}
              >
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                  }}
                >
                  {cat.label}
                </span>
                <span
                  style={{
                    fontSize: "0.8125rem",
                    fontWeight: 600,
                    color: "var(--btn-primary)",
                  }}
                >
                  {cat.score} / {cat.maxScore}
                </span>
              </div>
              <ScoreBar
                score={cat.score}
                maxScore={cat.maxScore}
                color={catColor[key].fg}
                variant="pdf"
                potentialPercent={adjustedPot?.width}
              />
              {adjustedPot && (
                <div
                  style={{
                    fontSize: "0.625rem",
                    marginTop: "0.3125rem",
                    fontWeight: 500,
                    color: catColor[key].fg,
                  }}
                >
                  {adjustedPot.label}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3
      style={{
        fontFamily: "var(--font-cormorant), Georgia, serif",
        fontSize: "1.1875rem",
        fontWeight: 500,
        color: "var(--text-primary)",
        marginBottom: "0.875rem",
        paddingBottom: "0.3125rem",
        borderBottom: "0.5px solid #E4DDD2",
      }}
    >
      {children}
    </h3>
  );
}
