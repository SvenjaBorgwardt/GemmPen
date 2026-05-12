"use client";

import { useState, useEffect } from "react";
import { getCalibrationState } from "@/lib/feedback-store";

export function CalibrationProgress() {
  const [count, setCount] = useState(0);
  const [threshold, setThreshold] = useState(30);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const state = getCalibrationState();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reading localStorage after hydration
    setCount(state.totalCorrections);
    setThreshold(state.currentThreshold);
    setLoaded(true);
  }, []);

  useEffect(() => {
    const handler = () => {
      const state = getCalibrationState();
      setCount(state.totalCorrections);
      setThreshold(state.currentThreshold);
    };
    window.addEventListener("calibration-update", handler);
    return () => window.removeEventListener("calibration-update", handler);
  }, []);

  if (!loaded) return null;

  const pct = Math.min((count / threshold) * 100, 100);
  const adapted = count >= threshold;

  return (
    <div
      className="flex items-center"
      style={{ gap: "0.5rem", marginLeft: "1.5rem" }}
      title={
        adapted
          ? `Adapted! Next at ${threshold === 30 ? 50 : threshold === 50 ? 70 : threshold}.`
          : `Every edit you make teaches the model your voice. After ${threshold} corrections, it writes like you.`
      }
    >
      {!adapted && (
        <span
          style={{
            fontSize: "0.6875rem",
            color: "var(--text-muted)",
            whiteSpace: "nowrap",
          }}
        >
          Corrections
        </span>
      )}
      <div
        style={{
          width: "60px",
          height: "4px",
          borderRadius: "2px",
          background: "var(--border-color)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: "100%",
            borderRadius: "2px",
            background: adapted ? "#2D7A2E" : "var(--btn-primary)",
            transition: "width 0.4s ease",
          }}
        />
      </div>
      <span
        style={{
          fontSize: "0.6875rem",
          fontWeight: 500,
          color: adapted ? "#2D7A2E" : "var(--text-muted)",
          whiteSpace: "nowrap",
        }}
      >
        {adapted ? `Adapted! Next at ${threshold === 30 ? 50 : threshold === 50 ? 70 : threshold}.` : `${count} / ${threshold}`}
      </span>
    </div>
  );
}
