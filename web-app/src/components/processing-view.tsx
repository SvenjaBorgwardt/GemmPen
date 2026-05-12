"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const TOTAL_STUDENTS = 21;
const TOTAL_ANALYSES = 987;
const ANALYSES_PER_EXAM = 47;
const DURATION_MS = 4500;

const phases = [
  "Grammar analysis",
  "Sentence Structure analysis",
  "Vocabulary analysis",
  "Domain Vocabulary analysis",
  "Content / Arguments analysis",
  "Text Structure analysis",
];

const categoryNames = [
  "Grammar",
  "Sentence Structure",
  "General Vocabulary",
  "Domain Vocabulary",
  "Content / Arguments",
  "Text Structure",
];

type ProcessingViewProps = {
  disabledCategories?: string[];
};

export function ProcessingView({ disabledCategories = [] }: ProcessingViewProps) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const start = Date.now();
    let raf = 0;
    const tick = () => {
      const elapsed = Date.now() - start;
      const next = Math.min(1, elapsed / DURATION_MS);
      setProgress(next);
      if (next < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setDone(true);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const percent = Math.round(progress * 100);
  const studentNum = Math.min(
    TOTAL_STUDENTS,
    Math.max(1, Math.ceil(progress * TOTAL_STUDENTS)),
  );
  const phaseIndex = Math.min(phases.length - 1, Math.floor(progress * phases.length));
  const totalCompleted = Math.round(progress * TOTAL_ANALYSES);

  return (
    <>
      <style>{`
        .processing-container {
          background: var(--bg-card);
          border: 0.5px solid var(--border-color);
          border-radius: var(--radius-card);
          padding: 2.5rem 1rem;
          text-align: center;
        }
        .processing-title { font-size: 1.75rem; }
        .processing-subtitle { margin-bottom: 2rem; }
        .processing-counters { gap: 1.5rem 2.5rem; margin-bottom: 1.75rem; }
        .processing-counter-num { font-size: 2.25rem; }
        .processing-grid { gap: 0.75rem; margin-bottom: 1.75rem; }
        .processing-grid-cell { padding: 0.75rem 0.875rem; }
        .processing-progress-section { margin-bottom: 1.75rem; }
        .processing-disclaimer { font-size: 0.8125rem; padding: 0.5rem 1.25rem; }
        .processing-cta { padding: 1rem 3rem; font-size: 1rem; }

        @media (max-width: 767px) {
          .processing-container {
            padding: 1.25rem 0.75rem 1.25rem;
            min-height: calc(100dvh - 5rem);
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
          .processing-title { font-size: 1.375rem; margin-bottom: 0.25rem !important; }
          .processing-subtitle { margin-bottom: 1rem; font-size: 0.8125rem; }
          .processing-counters { gap: 0.75rem 1.5rem; margin-bottom: 1rem; }
          .processing-counter-num { font-size: 1.75rem; }
          .processing-grid { gap: 0.5rem; margin-bottom: 1rem; }
          .processing-grid-cell { padding: 0.5rem 0.625rem; }
          .processing-progress-section { margin-bottom: 1rem; }
          .processing-disclaimer { font-size: 0.6875rem; padding: 0.375rem 0.875rem; }
          .processing-cta { padding: 0.75rem 2rem; font-size: 0.9375rem; }
        }
      `}</style>
      <div className="processing-container px-4 md:px-12">
        <div>
          <span
            style={{
              display: "block",
              fontSize: "0.75rem",
              fontStyle: "italic",
              color: "var(--text-muted)",
              textAlign: "right",
              marginBottom: "0.25rem",
            }}
          >
            Demo mode
          </span>
          <h2
            className="processing-title"
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontWeight: 500,
              color: "var(--text-primary)",
              marginBottom: "0.5rem",
            }}
          >
            {done ? "Evaluation complete" : "Evaluating exams..."}
          </h2>
          <p
            className="processing-subtitle"
            style={{
              fontSize: "0.875rem",
              color: "var(--text-secondary)",
            }}
          >
            Evaluating each sentence across all students and categories
          </p>

          <div className="processing-progress-section">
            <div
              style={{
                width: "100%",
                height: "8px",
                background: "var(--score-bar-bg)",
                borderRadius: "4px",
                overflow: "hidden",
                marginBottom: "0.625rem",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${percent}%`,
                  background: "var(--score-bar)",
                  borderRadius: "4px",
                  transition: "width 80ms linear",
                }}
              />
            </div>
            <p
              style={{
                fontSize: "0.8125rem",
                color: "var(--text-secondary)",
                fontWeight: 500,
              }}
            >
              {done ? (
                <>
                  Student <strong style={{ color: "var(--text-primary)", fontWeight: 600 }}>{TOTAL_STUDENTS}</strong> of{" "}
                  <strong style={{ color: "var(--text-primary)", fontWeight: 600 }}>{TOTAL_STUDENTS}</strong> - Complete
                </>
              ) : (
                <>
                  Student <strong style={{ color: "var(--text-primary)", fontWeight: 600 }}>{studentNum}</strong> of{" "}
                  <strong style={{ color: "var(--text-primary)", fontWeight: 600 }}>{TOTAL_STUDENTS}</strong> - {phases[phaseIndex]}
                </>
              )}
            </p>
          </div>

          <div className="processing-counters flex flex-wrap justify-center">
            <CounterItem num={TOTAL_STUDENTS} label="Exams" />
            <CounterItem num={ANALYSES_PER_EXAM} label="Checks / Exam" />
            <CounterItem num={totalCompleted} label="Checks completed" />
          </div>

          <div
            className="processing-grid grid grid-cols-2 md:grid-cols-3"
            style={{ textAlign: "left" }}
          >
            {categoryNames.map((name, i) => {
              const isDisabled = disabledCategories.some((dc) =>
                name.toLowerCase().startsWith(dc.toLowerCase().split(" /")[0].split(" &")[0]),
              );
              const segment = 1 / categoryNames.length;
              const localProgress = isDisabled
                ? 0
                : Math.max(0, Math.min(1, (progress - i * segment) / segment));
              const cp = Math.round(localProgress * 100);
              const studentsDone = Math.round(localProgress * TOTAL_STUDENTS);
              const status = isDisabled
                ? "Skipped"
                : cp === 100
                ? "Complete"
                : cp === 0
                ? "Waiting"
                : `${studentsDone} of ${TOTAL_STUDENTS}`;
              return (
                <div
                  key={name}
                  className="processing-grid-cell"
                  style={{
                    background: "var(--bg-body)",
                    borderRadius: "6px",
                    opacity: isDisabled ? 0.4 : 1,
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      color: "var(--text-primary)",
                      marginBottom: "0.375rem",
                    }}
                  >
                    {name}
                  </div>
                  <div
                    style={{
                      width: "100%",
                      height: "4px",
                      background: "var(--score-bar-bg)",
                      borderRadius: "2px",
                      overflow: "hidden",
                      marginBottom: "0.25rem",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${cp}%`,
                        background: "var(--score-bar)",
                        borderRadius: "2px",
                        transition: "width 80ms linear",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      fontSize: "0.6875rem",
                      color: isDisabled
                        ? "var(--text-muted)"
                        : cp === 100
                        ? "#6B8E5A"
                        : "var(--text-muted)",
                    }}
                  >
                    {status}
                  </div>
                </div>
              );
            })}
          </div>

          <span
            className="processing-disclaimer"
            style={{
              color: "var(--text-secondary)",
              background: "var(--badge-bg)",
              display: "inline-block",
              borderRadius: "20px",
              lineHeight: 1.4,
            }}
          >
            Simulating the evaluation pipeline with pre-computed results. In production, this runs locally on your device.
          </span>

          {done && (
            <div style={{ marginTop: "1.25rem" }}>
              <Link
                href="/app/review/alex-m"
                className="processing-cta"
                style={{
                  display: "inline-block",
                  fontWeight: 600,
                  borderRadius: "var(--radius-card)",
                  background: "var(--btn-primary)",
                  color: "var(--btn-primary-text)",
                  textDecoration: "none",
                  letterSpacing: "0.3px",
                }}
              >
                View Results
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function CounterItem({ num, label }: { num: number; label: string }) {
  return (
    <div className="text-center">
      <div
        className="processing-counter-num"
        style={{
          fontFamily: "var(--font-cormorant), Georgia, serif",
          fontWeight: 500,
          color: "var(--accent-gold)",
          lineHeight: 1,
        }}
      >
        {num}
      </div>
      <div
        style={{
          fontSize: "0.6875rem",
          color: "var(--text-muted)",
          textTransform: "uppercase",
          letterSpacing: "1px",
          marginTop: "0.375rem",
        }}
      >
        {label}
      </div>
    </div>
  );
}
