"use client";

import { use, useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Exercise } from "@/lib/types";
import { getDetailStudent } from "@/lib/mock-data";
import { CATEGORY_CSS_COLORS, CATEGORY_FEEDBACK_MAP, EXERCISE_COLORS } from "@/lib/constants";

const catColor = CATEGORY_CSS_COLORS;
const categoryFeedbackMap = CATEGORY_FEEDBACK_MAP;

const categoryName: Record<string, string> = {
  grammar: "Grammar",
  sentenceStructure: "Sentence Structure",
  genVocabulary: "General Vocabulary",
  domainVocab: "Connectives",
};

function exerciseTypeLabel(ex: Exercise): string {
  if (ex.type === "fill-blank" && ex.categoryId === "grammar")
    return "Subject-Verb Agreement";
  if (ex.type === "fill-blank" && ex.categoryId === "domainVocab")
    return "Domain Vocabulary";
  if (ex.type === "fill-blank") return "Fill in the Blank";
  if (ex.type === "rewrite" && ex.categoryId === "sentenceStructure")
    return "Sentence Variety";
  if (ex.type === "rewrite" && ex.categoryId === "genVocabulary")
    return "Synonym Upgrade";
  if (ex.type === "rewrite") return "Rewrite";
  if (ex.type === "multiple-choice" && ex.categoryId === "domainVocab")
    return "Connectives";
  if (ex.type === "multiple-choice") return "Multiple Choice";
  return "Practice";
}

export default function ExercisesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const detail = getDetailStudent(id);
  if (!detail) notFound();

  const initials = detail.name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .toUpperCase();

  const counts: Record<string, number> = {};
  detail.exercises.forEach((e) => {
    const name = categoryName[e.categoryId] ?? e.categoryId;
    counts[name] = (counts[name] ?? 0) + 1;
  });

  return (
    <>
      <Nav active="exercises" />
      <main
        className="px-4 md:px-8"
        style={{
          maxWidth: "640px",
          margin: "0 auto",
          paddingTop: "1.75rem",
          paddingBottom: "4rem",
        }}
      >
        <div
          className="flex items-center justify-between flex-wrap"
          style={{ marginBottom: "1rem", gap: "0.5rem" }}
        >
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
          <div className="flex items-center" style={{ gap: "0.5rem" }}>
            <Link
              href={`/app/feedback/${id}`}
              style={{
                fontSize: "0.75rem",
                fontWeight: 500,
                padding: "0.375rem 0.875rem",
                borderRadius: "6px",
                background: "var(--bg-card)",
                color: "var(--text-secondary)",
                border: "0.5px solid var(--border-color)",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.375rem",
                minHeight: "36px",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
              View my Feedback
            </Link>
            <Link
              href={`/app/feedback/${id}`}
              target="_blank"
              style={{
                fontSize: "0.75rem",
                fontWeight: 500,
                padding: "0.375rem 0.875rem",
                borderRadius: "6px",
                background: "var(--btn-primary)",
                color: "var(--btn-primary-text)",
                border: "none",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.375rem",
                minHeight: "36px",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Download PDF
            </Link>
          </div>
        </div>

        <div
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-3"
          style={{ marginBottom: "1.25rem" }}
        >
          <div>
            <h1
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "1.875rem",
                fontWeight: 500,
                color: "var(--text-primary)",
                lineHeight: 1.1,
              }}
            >
              Practice Exercises
            </h1>
          </div>
          <div className="flex items-center" style={{ gap: "0.625rem" }}>
            <div
              className="flex items-center justify-center"
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "var(--badge-bg)",
                color: "var(--badge-text)",
                fontSize: "0.75rem",
                fontWeight: 600,
              }}
            >
              {initials}
            </div>
            <span style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>
              {detail.name}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap" style={{ gap: "0.5rem", marginBottom: "1.25rem" }}>
          {Object.entries(counts).map(([name, count]) => (
            <span
              key={name}
              style={{
                fontSize: "0.6875rem",
                fontWeight: 500,
                padding: "0.25rem 0.625rem",
                borderRadius: "10px",
                background: "var(--badge-bg)",
                color: "var(--badge-text)",
              }}
            >
              {count} {name}
            </span>
          ))}
        </div>

        <ProgressPill exercises={detail.exercises} />

        <div className="flex flex-col" style={{ gap: "1rem" }}>
          {detail.exercises.map((ex, idx) => {
            // Pre-set state per spec: ex 2 starts as correct
            const startCorrect = idx === 1;
            return (
              <ExerciseCard key={ex.number} exercise={ex} startCorrect={startCorrect} />
            );
          })}
        </div>

        <div
          className="flex flex-col items-center"
          style={{ marginTop: "1.5rem", gap: "0.75rem" }}
        >
          <p
            style={{
              fontSize: "0.75rem",
              color: "var(--text-muted)",
              fontStyle: "italic",
              textAlign: "center",
              lineHeight: 1.6,
            }}
          >
            You can try each exercise as many times as you like. The AI gives you a
            new hint every time.
          </p>
          <Link
            href={`/app/feedback/${id}`}
            style={{
              fontSize: "0.8125rem",
              fontWeight: 500,
              color: "var(--btn-primary)",
              textDecoration: "none",
            }}
          >
            View my full feedback &rarr;
          </Link>
        </div>
      </main>
    </>
  );
}

function ProgressPill({ exercises }: { exercises: Exercise[] }) {
  const total = exercises.length;
  return (
    <div
      style={{
        display: "inline-block",
        fontSize: "0.6875rem",
        fontWeight: 500,
        padding: "0.25rem 0.75rem",
        borderRadius: "10px",
        background: "var(--bg-card)",
        color: "var(--text-secondary)",
        border: "0.5px solid var(--border-color)",
        marginBottom: "1.25rem",
      }}
    >
      1 of {total} completed
    </div>
  );
}

function ExerciseCard({
  exercise,
  startCorrect,
}: {
  exercise: Exercise;
  startCorrect: boolean;
}) {
  const key = categoryFeedbackMap[exercise.categoryId];
  const c = catColor[key];

  type State =
    | { kind: "open" }
    | { kind: "wrong"; value: string; hint: string }
    | { kind: "correct"; value: string };

  const [state, setState] = useState<State>(() =>
    startCorrect
      ? {
          kind: "correct",
          value: exercise.correctAnswers[0],
        }
      : { kind: "open" },
  );

  const [textValue, setTextValue] = useState("");
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleCheck = () => {
    if (exercise.type === "multiple-choice") {
      if (!selectedOption) return;
      const opt = exercise.content.options?.find((o) => o.letter === selectedOption);
      if (opt?.isCorrect) {
        setState({ kind: "correct", value: opt.text });
      } else {
        setState({
          kind: "wrong",
          value: opt?.text ?? "",
          hint:
            opt?.hint ??
            "Take another look at the options. The strongest one matches the tone you want.",
        });
      }
    } else {
      const trimmed = textValue.trim();
      const matches = exercise.correctAnswers.some(
        (a) => a.toLowerCase() === trimmed.toLowerCase(),
      );
      if (matches) {
        setState({ kind: "correct", value: trimmed });
      } else {
        setState({
          kind: "wrong",
          value: trimmed,
          hint: hintForExercise(exercise, trimmed),
        });
      }
    }
  };

  const handleReset = () => {
    setState({ kind: "open" });
    setTextValue("");
    setSelectedOption(null);
  };

  const containerStyle = {
    background:
      state.kind === "correct"
        ? "var(--status-reviewed-bg)"
        : state.kind === "wrong"
        ? EXERCISE_COLORS.hint.bg
        : "var(--bg-card)",
    border:
      state.kind === "correct"
        ? `1px solid ${EXERCISE_COLORS.correct.bg}`
        : state.kind === "wrong"
        ? `1px solid ${EXERCISE_COLORS.hint.border}`
        : "0.5px solid var(--border-color)",
    borderRadius: "var(--radius-card)",
    padding: "1.25rem 1.375rem",
    transition: "background 200ms ease, border-color 200ms ease",
  } as const;

  return (
    <div style={containerStyle}>
      <div className="flex flex-wrap items-center" style={{ gap: "0.5rem", marginBottom: "0.625rem" }}>
        <span
          style={{
            fontSize: "0.6875rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "1px",
            color: "var(--accent-gold)",
          }}
        >
          Exercise {exercise.number}
        </span>
        <span
          style={{
            fontSize: "0.6875rem",
            fontWeight: 500,
            padding: "2px 8px",
            borderRadius: "10px",
            background: c.bg,
            color: c.fg,
          }}
        >
          {exerciseTypeLabel(exercise)}
        </span>
        <span
          style={{
            fontSize: "0.625rem",
            color: "var(--text-muted)",
            marginLeft: "auto",
          }}
        >
          {exercise.sourceHint}
        </span>
        {state.kind === "correct" && (
          <span
            style={{
              fontSize: "0.6875rem",
              fontWeight: 600,
              padding: "2px 10px",
              borderRadius: "10px",
              background: EXERCISE_COLORS.correct.bg,
              color: EXERCISE_COLORS.correct.fg,
            }}
          >
            Completed
          </span>
        )}
      </div>

      <p
        style={{
          fontSize: "0.875rem",
          color: "var(--text-primary)",
          fontWeight: 500,
          marginBottom: "0.875rem",
          lineHeight: 1.5,
        }}
      >
        {exercise.instruction}
      </p>

      {exercise.content.sentences && (
        <div
          className="flex flex-col"
          style={{ gap: "0.5rem", marginBottom: "0.875rem" }}
        >
          {exercise.content.sentences.map((s, i) => (
            <p
              key={i}
              style={{
                fontSize: "0.8125rem",
                color: "var(--text-secondary)",
                lineHeight: 1.7,
              }}
            >
              {s}
            </p>
          ))}
        </div>
      )}

      {exercise.type === "multiple-choice" && exercise.content.options && (
        <div className="flex flex-col" style={{ gap: "0.5rem", marginBottom: "0.875rem" }}>
          {exercise.content.options.map((o) => {
            const isSelected = selectedOption === o.letter;
            const isFinalCorrect =
              state.kind === "correct" && state.value === o.text;
            return (
              <button
                type="button"
                key={o.letter}
                disabled={state.kind === "correct"}
                onClick={() => setSelectedOption(o.letter)}
                style={{
                  textAlign: "left",
                  fontSize: "0.8125rem",
                  color: "var(--text-secondary)",
                  padding: "0.5rem 0.75rem",
                  background: isFinalCorrect
                    ? "#fff"
                    : isSelected
                    ? "var(--badge-bg)"
                    : "#fff",
                  border: isFinalCorrect
                    ? `1px solid ${EXERCISE_COLORS.correct.bg}`
                    : isSelected
                    ? "1px solid var(--accent-gold)"
                    : "0.5px solid var(--border-color)",
                  borderRadius: "4px",
                  cursor: state.kind === "correct" ? "default" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontFamily: "inherit",
                  minHeight: "44px",
                }}
              >
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "var(--btn-primary)",
                    width: "20px",
                  }}
                >
                  {o.letter}
                </span>
                <span>{o.text}</span>
              </button>
            );
          })}
        </div>
      )}

      {(exercise.type === "fill-blank" || exercise.type === "rewrite") &&
        state.kind !== "correct" && (
          <div className="flex" style={{ gap: "0.5rem", marginBottom: "0.5rem" }}>
            <input
              type="text"
              value={textValue}
              onChange={(e) => setTextValue(e.target.value)}
              placeholder={
                exercise.type === "fill-blank" && exercise.categoryId === "grammar"
                  ? "Type the correct verb form..."
                  : exercise.type === "fill-blank" && exercise.categoryId === "domainVocab"
                  ? "Type the domain term..."
                  : exercise.type === "fill-blank"
                  ? "Type your answer..."
                  : exercise.type === "rewrite" && exercise.categoryId === "sentenceStructure"
                  ? "Rewrite the sentence here..."
                  : exercise.type === "rewrite" && exercise.categoryId === "genVocabulary"
                  ? "Type a more precise word..."
                  : "Type your new version..."
              }
              style={{
                flex: 1,
                fontSize: "1rem",
                padding: "0.5rem 0.75rem",
                background: "#fff",
                border: "0.5px solid var(--border-color)",
                borderRadius: "6px",
                color: "var(--text-primary)",
                fontFamily: "inherit",
                minHeight: "44px",
              }}
            />
          </div>
        )}

      {state.kind !== "correct" && (
        <button
          type="button"
          onClick={handleCheck}
          style={{
            fontSize: "0.8125rem",
            fontWeight: 600,
            padding: "0.5rem 1.25rem",
            borderRadius: "6px",
            background: "var(--btn-primary)",
            color: "var(--btn-primary-text)",
            border: "none",
            cursor: "pointer",
            fontFamily: "inherit",
            minHeight: "44px",
          }}
        >
          Check
        </button>
      )}

      {state.kind === "wrong" && (
        <div
          style={{
            marginTop: "0.875rem",
            padding: "0.625rem 0.875rem",
            background: EXERCISE_COLORS.hint.bg,
            border: `1px solid ${EXERCISE_COLORS.hint.border}`,
            borderRadius: "6px",
            fontSize: "0.8125rem",
            color: "var(--text-primary)",
            lineHeight: 1.55,
          }}
        >
          {state.hint}
        </div>
      )}

      {state.kind === "correct" && (
        <div className="flex flex-col" style={{ gap: "0.625rem", marginTop: "0.5rem" }}>
          <div
            style={{
              background: "#fff",
              border: `0.5px solid ${EXERCISE_COLORS.correct.bg}`,
              borderRadius: "6px",
              padding: "0.625rem 0.875rem",
              fontSize: "0.8125rem",
              color: "var(--text-primary)",
              fontWeight: 500,
            }}
          >
            {state.value}
          </div>
          <div
            style={{
              padding: "0.625rem 0.875rem",
              background: EXERCISE_COLORS.correct.explanationBg,
              border: `1px solid ${EXERCISE_COLORS.correct.border}`,
              borderRadius: "6px",
              fontSize: "0.8125rem",
              color: EXERCISE_COLORS.correct.fg,
              lineHeight: 1.55,
            }}
          >
            {exercise.explanation}
          </div>
          <button
            type="button"
            onClick={handleReset}
            style={{
              alignSelf: "flex-start",
              fontSize: "0.6875rem",
              fontWeight: 500,
              padding: "0.5rem 0.75rem",
              borderRadius: "10px",
              background: "transparent",
              color: "var(--text-secondary)",
              border: "0.5px solid var(--border-color)",
              cursor: "pointer",
              fontFamily: "inherit",
              minHeight: "44px",
            }}
          >
            Try again
          </button>
        </div>
      )}
    </div>
  );
}

function hintForExercise(exercise: Exercise, attempt: string): string {
  const lower = attempt.toLowerCase();
  if (exercise.type === "fill-blank" && exercise.categoryId === "grammar") {
    if (exercise.number === 1 && lower === "is") {
      return "Almost. Look at the subject: \"concerns\". Is that one thing or many things? That tells you which verb form you need.";
    }
    if (exercise.number === 1 && lower === "offer") {
      return "Close. Think of \"AI\" as one thing. \"He offers\" or \"He offer\"? Which one feels right out loud?";
    }
    return "Take another look at the subject. Is it singular or plural? The verb has to match.";
  }
  if (exercise.type === "rewrite") {
    return "Try starting with a phrase like \"By...\" or \"In many...\". You want a different opener but the same meaning.";
  }
  return "Not quite. Re-read the source sentence and try a slight variation.";
}
