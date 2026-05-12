"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { FeedbackCard } from "@/components/feedback-card";
import { CategoryBadge } from "@/components/category-badge";
import { ScoreSummary } from "@/components/score-summary";
import type { FeedbackItem, FeedbackCorrection } from "@/lib/types";
import {
  saveCorrection,
  getCorrection,
  addDPOPair,
  getCalibrationState,
} from "@/lib/feedback-store";

interface ReviewPanelProps {
  studentSlug: string;
  studentName: string;
  feedbackItems: FeedbackItem[];
}

export function ReviewPanel({ studentSlug, studentName, feedbackItems }: ReviewPanelProps) {
  const [corrections, setCorrections] = useState<
    Record<string, { action: "approved" | "edited" | "regenerated"; feedbackText: string; score: number } | null>
  >({});
  // Track live scores for all categories (updated on every slider move)
  const [liveScores, setLiveScores] = useState<Record<string, number>>({});
  const [loaded, setLoaded] = useState(false);
  const [thresholdReached, setThresholdReached] = useState(false);
  const [thresholdDismissed, setThresholdDismissed] = useState(false);
  const [nearThresholdMsg, setNearThresholdMsg] = useState<string | null>(null);

  useEffect(() => {
    const initial: typeof corrections = {};
    const initialScores: Record<string, number> = {};
    for (const item of feedbackItems) {
      initialScores[item.categoryId] = item.score;
      const stored = getCorrection(studentSlug, item.categoryId);
      if (stored) {
        initial[item.categoryId] = {
          action: stored.action,
          feedbackText: stored.feedbackText,
          score: stored.score,
        };
        initialScores[item.categoryId] = stored.score;
      }
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reading localStorage after hydration
    setCorrections(initial);
    setLiveScores(initialScores);
    setLoaded(true);
  }, [studentSlug, feedbackItems]);

  const handleCorrectionSave = (correction: FeedbackCorrection) => {
    saveCorrection({
      studentSlug,
      categoryId: correction.categoryId,
      feedbackText: correction.teacherFeedback,
      score: correction.teacherScore,
      action: correction.action,
      timestamp: new Date().toISOString(),
    });

    if (correction.action === "edited" || correction.action === "regenerated") {
      const item = feedbackItems.find(fi => fi.categoryId === correction.categoryId);
      addDPOPair({
        studentSlug,
        categoryId: correction.categoryId,
        action: correction.action,
        modelFeedback: correction.modelFeedback,
        teacherFeedback: correction.teacherFeedback,
        modelScore: correction.modelScore,
        teacherScore: correction.teacherScore,
        maxScore: item?.maxScore ?? 15,
        evidenceQuotes: item?.quotes?.map(q => q.text) ?? [],
      });
    }
    // "Looks good" (approved) does not count toward the calibration threshold
    // because it means the model feedback was already good -- no DPO signal.
    window.dispatchEvent(new CustomEvent("calibration-update"));

    // Check threshold after saving a DPO pair
    if (correction.action === "edited" || correction.action === "regenerated") {
      const state = getCalibrationState();
      if (state.pairs.length >= state.currentThreshold) {
        setThresholdReached(true);
        setThresholdDismissed(false);
        setNearThresholdMsg(null);
      } else {
        const remaining = state.currentThreshold - state.pairs.length;
        if (remaining <= 5 && remaining > 0) {
          setNearThresholdMsg(
            `${remaining} more correction${remaining === 1 ? "" : "s"} until your model can learn from you.`
          );
        }
      }
    }

    setCorrections((prev) => ({
      ...prev,
      [correction.categoryId]: {
        action: correction.action,
        feedbackText: correction.teacherFeedback,
        score: correction.teacherScore,
      },
    }));
    setLiveScores((prev) => ({
      ...prev,
      [correction.categoryId]: correction.teacherScore,
    }));
  };

  // Handler for live slider changes (fires on every drag, not just save)
  const handleScoreChange = (categoryId: string, newScore: number) => {
    setLiveScores((prev) => ({ ...prev, [categoryId]: newScore }));
  };

  // Build score items for the summary from live scores
  const summaryItems = useMemo(
    () =>
      feedbackItems.map((item) => ({
        categoryId: item.categoryId,
        label: item.label,
        score: liveScores[item.categoryId] ?? item.score,
        maxScore: item.maxScore,
        color: item.color,
      })),
    [feedbackItems, liveScores]
  );

  if (!loaded) return null;

  return (
    <div
      style={{
        flex: "1 1 0",
        minWidth: 0,
        minHeight: 0,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
    <div
      className="overflow-y-auto"
      style={{
        flex: "1 1 0",
        minHeight: 0,
        padding: "1rem",
        paddingBottom: "0.5rem",
      }}
    >
      <div
        className="flex items-center justify-between"
        style={{ marginBottom: "1.25rem" }}
      >
        <span
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "1.375rem",
            fontWeight: 500,
            color: "var(--text-primary)",
          }}
        >
          Student Feedback
        </span>
        <CategoryBadge label="Review & refine before sending">
          Review &amp; refine before sending
        </CategoryBadge>
      </div>

      <p
        style={{
          fontSize: "0.75rem",
          color: "var(--text-muted)",
          marginBottom: "1rem",
          lineHeight: 1.5,
        }}
      >
        Approve, edit, or regenerate each section. Adjust scores with the slider.
      </p>

      <ScoreSummary items={summaryItems} />

      {/* Threshold reached notification */}
      {thresholdReached && !thresholdDismissed && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "0.75rem",
            marginBottom: "1rem",
            padding: "0.75rem 1rem",
            borderRadius: "var(--radius-card)",
            background: "rgba(184, 134, 11, 0.08)",
            border: "0.5px solid rgba(184, 134, 11, 0.25)",
          }}
        >
          <span
            style={{
              fontSize: "0.8125rem",
              color: "var(--text-primary)",
              lineHeight: 1.5,
            }}
          >
            You have enough corrections for GemmPen to learn your style.{" "}
            <Link
              href="/app/training"
              style={{
                color: "var(--btn-primary)",
                fontWeight: 600,
                textDecoration: "underline",
                textUnderlineOffset: "2px",
              }}
            >
              Adapt now
            </Link>
          </span>
          <button
            type="button"
            onClick={() => setThresholdDismissed(true)}
            aria-label="Dismiss"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "1rem",
              color: "var(--text-muted)",
              padding: "0.5rem",
              lineHeight: 1,
              flexShrink: 0,
              minWidth: "44px",
              minHeight: "44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            &#x2715;
          </button>
        </div>
      )}

      {/* Near-threshold hint */}
      {!thresholdReached && nearThresholdMsg && (
        <div
          style={{
            marginBottom: "1rem",
            padding: "0.625rem 1rem",
            borderRadius: "var(--radius-card)",
            background: "rgba(184, 134, 11, 0.04)",
            border: "0.5px solid rgba(184, 134, 11, 0.12)",
            fontSize: "0.75rem",
            color: "var(--text-secondary)",
          }}
        >
          {nearThresholdMsg}
        </div>
      )}

      {feedbackItems.map((item) => (
        <FeedbackCard
          key={item.categoryId}
          categoryId={item.categoryId}
          label={item.label}
          score={item.score}
          maxScore={item.maxScore}
          color={item.color}
          bgColor={item.bgColor}
          feedbackText={item.feedbackText}
          altFeedbackText={item.altFeedbackText}
          quotes={item.quotes}
          tip={item.tip}
          initialCorrection={corrections[item.categoryId] ?? null}
          onCorrectionSave={handleCorrectionSave}
          onScoreChange={handleScoreChange}
        />
      ))}

    </div>

      {/* Floating footer - always visible */}
      <div
        style={{
          flexShrink: 0,
          padding: "0.75rem 1rem",
          borderTop: "0.5px solid var(--border-color)",
          background: "var(--bg-card)",
          textAlign: "center",
          boxShadow: "0 -4px 12px rgba(0,0,0,0.04)",
        }}
      >
        <Link
          href={`/app/exercises/${studentSlug}`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "0.8125rem",
            fontWeight: 600,
            padding: "0.625rem 1.5rem",
            borderRadius: "6px",
            background: "var(--bg-body)",
            border: "0.5px solid var(--border-color)",
            color: "var(--text-primary)",
            textDecoration: "none",
            minHeight: "44px",
          }}
        >
          View exercises for {studentName} &rarr;
        </Link>
      </div>
    </div>
  );
}
