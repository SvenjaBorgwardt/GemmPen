"use client";

import { useState, useRef, useEffect } from "react";
import type { FeedbackCorrection, CategoryId } from "@/lib/types";
import { categoryToGrade, getStoredGradingSystem, type GradingSystemId } from "@/lib/grading";

type CardState = "idle" | "approved" | "editing" | "regenerating" | "confirmed";

interface FeedbackCardProps {
  categoryId: CategoryId;
  label: string;
  score: number;
  maxScore: number;
  color: string;
  bgColor: string;
  feedbackText: string;
  altFeedbackText?: string;
  quotes: Array<{ text: string; explanation?: string }>;
  tip: string;
  initialCorrection?: {
    action: "approved" | "edited" | "regenerated";
    feedbackText: string;
    score: number;
  } | null;
  onCorrectionSave: (correction: FeedbackCorrection) => void;
  onScoreChange?: (categoryId: CategoryId, score: number) => void;
}

export function FeedbackCard({
  categoryId,
  label,
  score: initialScore,
  maxScore,
  color,
  bgColor,
  feedbackText: originalText,
  altFeedbackText,
  quotes,
  tip,
  initialCorrection,
  onCorrectionSave,
  onScoreChange,
}: FeedbackCardProps) {
  const [state, setState] = useState<CardState>(
    initialCorrection
      ? initialCorrection.action === "approved"
        ? "approved"
        : "confirmed"
      : "idle"
  );
  const [score, setScore] = useState(initialCorrection?.score ?? initialScore);
  const [displayText, setDisplayText] = useState(
    initialCorrection?.feedbackText ?? originalText
  );
  const [editText, setEditText] = useState(displayText);
  const [confirmedAction, setConfirmedAction] = useState<
    "edited" | "regenerated" | null
  >(
    initialCorrection && initialCorrection.action !== "approved"
      ? (initialCorrection.action as "edited" | "regenerated")
      : null
  );
  const [hasRegenerated, setHasRegenerated] = useState(false);
  const [gradingSystem, setGradingSystem] = useState<GradingSystemId>("nrw-15");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setGradingSystem(getStoredGradingSystem());
  }, []);

  useEffect(() => {
    if (state === "editing" && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [state]);

  const emitCorrection = (
    action: "approved" | "edited" | "regenerated",
    teacherText: string,
    teacherScore: number
  ) => {
    onCorrectionSave({
      categoryId,
      action,
      modelFeedback: originalText,
      teacherFeedback: teacherText,
      modelScore: initialScore,
      teacherScore,
    });
  };

  const handleLooksGood = () => {
    setState("approved");
    emitCorrection("approved", displayText, score);
  };

  const handleEdit = () => {
    setEditText(displayText);
    setState("editing");
  };

  const handleSave = () => {
    setDisplayText(editText);
    setConfirmedAction("edited");
    setState("confirmed");
    emitCorrection("edited", editText, score);
  };

  const handleCancel = () => {
    setState(
      confirmedAction ? "confirmed" : hasRegenerated ? "idle" : state === "editing" ? "idle" : "idle"
    );
  };

  const handleRegenerate = () => {
    setState("regenerating");
    setHasRegenerated(true);
    setTimeout(() => {
      const newText = altFeedbackText ?? displayText;
      setDisplayText(newText);
      setState("idle");
    }, 1400);
  };

  const handleLooksGoodAfterRegenerate = () => {
    setState("confirmed");
    setConfirmedAction("regenerated");
    emitCorrection("regenerated", displayText, score);
  };

  const handleUndo = () => {
    setDisplayText(originalText);
    setConfirmedAction(null);
    setHasRegenerated(false);
    setState("idle");
  };

  const handleScoreChange = (newScore: number) => {
    setScore(newScore);
    onScoreChange?.(categoryId, newScore);
    if (state === "approved" || state === "confirmed") {
      emitCorrection(
        confirmedAction ?? "approved",
        displayText,
        newScore
      );
    }
  };

  const badge =
    state === "approved"
      ? { text: "Approved", bg: "#DEF5DD", fg: "#2D7A2E" }
      : state === "confirmed" && confirmedAction === "edited"
      ? { text: "Edited by you", bg: "#FEF3CD", fg: "#8A6D00" }
      : state === "confirmed" && confirmedAction === "regenerated"
      ? { text: "Regenerated", bg: "#DBEAFE", fg: "#1E5FAF" }
      : null;

  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: "0.5px solid var(--border-color)",
        borderRadius: "var(--radius-card)",
        padding: "1.125rem 1.25rem",
        marginBottom: "0.875rem",
        transition: "opacity 0.2s",
      }}
    >
      {/* Header: label + badge + score slider */}
      <div
        className="flex flex-wrap items-center justify-between gap-2"
        style={{ marginBottom: "0.625rem" }}
      >
        <div className="flex items-center" style={{ gap: "0.5rem" }}>
          <span
            style={{
              fontSize: "0.875rem",
              fontWeight: 600,
              color: "var(--text-primary)",
            }}
          >
            {label}
          </span>
          {badge && (
            <span
              style={{
                fontSize: "0.6875rem",
                fontWeight: 600,
                padding: "2px 8px",
                borderRadius: "10px",
                background: badge.bg,
                color: badge.fg,
              }}
            >
              {badge.text}
            </span>
          )}
        </div>
        <div className="flex items-center" style={{ gap: "0.5rem" }}>
          <input
            type="range"
            min={0}
            max={maxScore}
            value={score}
            onChange={(e) => handleScoreChange(Number(e.target.value))}
            aria-label={`${label} score`}
            className="w-[80px] md:w-[120px]"
            style={{ accentColor: color, minHeight: "44px" }}
          />
          {gradingSystem === "nrw-15" ? (
            /* NRW: raw points ARE the grade */
            <span
              style={{
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "var(--btn-primary)",
                minWidth: "48px",
                textAlign: "right",
              }}
            >
              {score} / {maxScore}
            </span>
          ) : (
            /* Other systems: show grade prominently, raw points small */
            <span className="flex items-center" style={{ gap: "4px" }}>
              <span
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 700,
                  color: "var(--btn-primary)",
                  minWidth: "28px",
                  textAlign: "center",
                  background: "var(--bg-body)",
                  padding: "1px 6px",
                  borderRadius: "4px",
                }}
              >
                {categoryToGrade(score, maxScore, gradingSystem).label}
              </span>
              <span
                style={{
                  fontSize: "0.625rem",
                  color: "var(--text-muted)",
                }}
              >
                ({score}/{maxScore})
              </span>
            </span>
          )}
        </div>
      </div>

      {/* Feedback text or textarea */}
      {state === "editing" ? (
        <textarea
          ref={textareaRef}
          value={editText}
          onChange={(e) => {
            setEditText(e.target.value);
            e.target.style.height = "auto";
            e.target.style.height = e.target.scrollHeight + "px";
          }}
          style={{
            width: "100%",
            fontSize: "1rem",
            color: "var(--text-secondary)",
            lineHeight: 1.6,
            marginBottom: "0.5rem",
            padding: "0.75rem",
            background: "#FFFDF5",
            border: "1.5px dashed #D4AD4A",
            borderRadius: "6px",
            resize: "none",
            outline: "none",
            fontFamily: "inherit",
            minHeight: "80px",
          }}
        />
      ) : state === "regenerating" ? (
        <div
          style={{
            fontSize: "0.8125rem",
            color: "var(--text-muted)",
            lineHeight: 1.6,
            marginBottom: "0.625rem",
            padding: "0.75rem",
            background: "var(--bg-body)",
            borderRadius: "6px",
            minHeight: "60px",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <span
            className="animate-spin"
            style={{
              display: "inline-block",
              width: "16px",
              height: "16px",
              border: "2px solid var(--border-color)",
              borderTop: `2px solid ${color}`,
              borderRadius: "50%",
            }}
          />
          Generating new feedback...
        </div>
      ) : (
        <p
          style={{
            fontSize: "0.8125rem",
            color: "var(--text-secondary)",
            lineHeight: 1.6,
            marginBottom: "0.625rem",
          }}
        >
          {(() => {
            const dot = displayText.indexOf(". ");
            if (dot < 0) return displayText;
            return (
              <>
                <strong style={{ fontWeight: 600, color: "var(--text-primary)" }}>
                  {displayText.slice(0, dot + 1)}
                </strong>
                {displayText.slice(dot + 1)}
              </>
            );
          })()}
        </p>
      )}

      {/* Quotes */}
      {state !== "regenerating" &&
        quotes.map((q, i) => (
          <div
            key={i}
            style={{
              fontSize: "0.75rem",
              color: "var(--text-secondary)",
              background: "var(--bg-body)",
              borderLeft: `2px solid ${color}`,
              padding: "0.375rem 0.75rem",
              marginBottom: "0.375rem",
              borderRadius: "0 4px 4px 0",
              lineHeight: 1.5,
              fontStyle: "italic",
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

      {/* Tip */}
      {state !== "regenerating" && (
        <div
          style={{
            fontSize: "0.75rem",
            color: "var(--text-primary)",
            background: bgColor,
            padding: "0.5rem 0.75rem",
            borderRadius: "4px",
            lineHeight: 1.5,
            marginTop: "0.5rem",
            marginBottom: "0.75rem",
          }}
        >
          <strong style={{ fontWeight: 600 }}>Why this matters:</strong> {tip}
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-wrap items-center" style={{ gap: "0.5rem", marginTop: "0.5rem" }}>
        {state === "editing" ? (
          <>
            <ActionButton
              onClick={handleSave}
              bg="var(--btn-primary)"
              fg="var(--btn-primary-text)"
            >
              Save
            </ActionButton>
            <ActionButton onClick={handleCancel} bg="transparent" fg="var(--text-muted)" border>
              Cancel
            </ActionButton>
          </>
        ) : (
          <>
            {hasRegenerated && state === "idle" ? (
              <ActionButton
                onClick={handleLooksGoodAfterRegenerate}
                bg="#DEF5DD"
                fg="#2D7A2E"
                primary
              >
                Approve
              </ActionButton>
            ) : (
              <ActionButton
                onClick={handleLooksGood}
                bg={state === "approved" ? "#DEF5DD" : "rgba(222, 245, 221, 0.5)"}
                fg={state === "approved" ? "#2D7A2E" : "#3D7A3E"}
                border
                primary
              >
                {state === "approved" ? "Approved" : "Approve"}
              </ActionButton>
            )}
            <ActionButton
              onClick={handleEdit}
              bg="transparent"
              fg="var(--text-muted)"
              border
              disabled={state === "regenerating"}
            >
              Edit
            </ActionButton>
            <ActionButton
              onClick={handleRegenerate}
              bg="transparent"
              fg="var(--text-muted)"
              border
              disabled={state === "regenerating"}
            >
              Regenerate
            </ActionButton>
            {state === "confirmed" && (
              <button
                onClick={handleUndo}
                style={{
                  fontSize: "0.75rem",
                  color: "var(--text-muted)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textDecoration: "underline",
                  marginLeft: "auto",
                  padding: "0.5rem 0.75rem",
                  minHeight: "44px",
                }}
              >
                Undo
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function ActionButton({
  children,
  onClick,
  bg,
  fg,
  border,
  disabled,
  primary,
}: {
  children: React.ReactNode;
  onClick: () => void;
  bg: string;
  fg: string;
  border?: boolean;
  disabled?: boolean;
  primary?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        fontSize: "0.75rem",
        fontWeight: primary ? 600 : 500,
        padding: "0.5rem 0.875rem",
        borderRadius: "6px",
        background: bg,
        color: fg,
        border: border
          ? primary
            ? "0.5px solid rgba(45, 122, 46, 0.3)"
            : "0.5px solid var(--border-color)"
          : "none",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        transition: "opacity 0.15s, background 0.15s",
        minHeight: "44px",
      }}
    >
      {children}
    </button>
  );
}
