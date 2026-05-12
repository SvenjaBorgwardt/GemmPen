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

export function ProcessingView() {
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
    <div
      className="px-4 md:px-12"
      style={{
        background: "var(--bg-card)",
        border: "0.5px solid var(--border-color)",
        borderRadius: "var(--radius-card)",
        paddingTop: "2.5rem",
        paddingBottom: "2.5rem",
        textAlign: "center",
      }}
    >
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
        style={{
          fontFamily: "var(--font-cormorant), Georgia, serif",
          fontSize: "1.75rem",
          fontWeight: 500,
          color: "var(--text-primary)",
          marginBottom: "0.5rem",
        }}
      >
        {done ? "Evaluation complete" : "Evaluating exams..."}
      </h2>
      <p
        style={{
          fontSize: "0.875rem",
          color: "var(--text-secondary)",
          marginBottom: "2rem",
        }}
      >
        Evaluating each sentence across all students and categories
      </p>

      <div style={{ marginBottom: "1.75rem" }}>
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

      <div className="flex flex-wrap justify-center" style={{ gap: "1.5rem 2.5rem", marginBottom: "1.75rem" }}>
        <CounterItem num={TOTAL_STUDENTS} label="Exams" />
        <CounterItem num={ANALYSES_PER_EXAM} label="Checks / Exam" />
        <CounterItem num={totalCompleted} label="Checks completed" />
      </div>

      <div
        className="grid grid-cols-2 md:grid-cols-3"
        style={{
          gap: "0.75rem",
          marginBottom: "1.75rem",
          textAlign: "left",
        }}
      >
        {categoryNames.map((name, i) => {
          const segment = 1 / categoryNames.length;
          const localProgress = Math.max(
            0,
            Math.min(1, (progress - i * segment) / segment),
          );
          const cp = Math.round(localProgress * 100);
          const studentsDone = Math.round(localProgress * TOTAL_STUDENTS);
          const status =
            cp === 100
              ? "Complete"
              : cp === 0
              ? "Waiting"
              : `${studentsDone} of ${TOTAL_STUDENTS}`;
          return (
            <div
              key={name}
              style={{
                background: "var(--bg-body)",
                borderRadius: "6px",
                padding: "0.75rem 0.875rem",
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
                  color: cp === 100 ? "#6B8E5A" : "var(--text-muted)",
                }}
              >
                {status}
              </div>
            </div>
          );
        })}
      </div>

      <span
        style={{
          fontSize: "0.8125rem",
          color: "var(--text-secondary)",
          background: "var(--badge-bg)",
          display: "inline-block",
          padding: "0.5rem 1.25rem",
          borderRadius: "20px",
          lineHeight: 1.4,
        }}
      >
        Simulating the evaluation pipeline with pre-computed results. In production, this runs locally on your device.
      </span>

      {done && (
        <div style={{ marginTop: "1.5rem" }}>
          <Link
            href="/app/review/alex-m"
            style={{
              display: "inline-block",
              fontSize: "1rem",
              fontWeight: 600,
              padding: "1rem 3rem",
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
  );
}

function CounterItem({ num, label }: { num: number; label: string }) {
  return (
    <div className="text-center">
      <div
        style={{
          fontFamily: "var(--font-cormorant), Georgia, serif",
          fontSize: "2.25rem",
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
