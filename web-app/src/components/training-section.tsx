"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { getCalibrationState, exportDPOPairs } from "@/lib/feedback-store";

type TrainingStatus = "idle" | "uploading" | "training" | "complete" | "error";

interface TrainingStep {
  label: string;
  detail: string;
  duration: number; // ms
}

const DEMO_STEPS: TrainingStep[] = [
  { label: "Preparing your corrections", detail: "Formatting your edits...", duration: 2000 },
  { label: "Sending corrections securely", detail: "Only your edits are sent, never student data...", duration: 2500 },
  { label: "Loading your current model", detail: "Connecting to your GemmPen instance...", duration: 3000 },
  { label: "Adapting to your style", detail: "GemmPen is learning your voice...", duration: 5000 },
  { label: "Finishing up", detail: "Saving your personal style layer...", duration: 2000 },
];

export function TrainingSection() {
  const [pairCount, setPairCount] = useState(0);
  const [threshold, setThreshold] = useState(30);
  const [loaded, setLoaded] = useState(false);
  const [status, setStatus] = useState<TrainingStatus>("idle");
  const [currentStep, setCurrentStep] = useState(0);
  const [stepProgress, setStepProgress] = useState(0);
  const [showExport, setShowExport] = useState(false);
  const [copied, setCopied] = useState(false);
  const animRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const refresh = useCallback(() => {
    const state = getCalibrationState();
    setPairCount(state.pairs.length);
    setThreshold(state.currentThreshold);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reading localStorage after hydration
    refresh();
    setLoaded(true);
  }, [refresh]);

  useEffect(() => {
    window.addEventListener("calibration-update", refresh);
    return () => window.removeEventListener("calibration-update", refresh);
  }, [refresh]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animRef.current) clearTimeout(animRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, []);

  const runDemoStepRef = useRef<(stepIndex: number) => void>(() => {});

  const runDemoStep = useCallback((stepIndex: number) => {
    if (stepIndex >= DEMO_STEPS.length) {
      setStatus("complete");
      setStepProgress(100);
      return;
    }

    setCurrentStep(stepIndex);
    setStepProgress(0);

    const step = DEMO_STEPS[stepIndex];
    const tickInterval = 50;
    const ticks = step.duration / tickInterval;
    let tick = 0;

    if (progressRef.current) clearInterval(progressRef.current);
    progressRef.current = setInterval(() => {
      tick++;
      setStepProgress(Math.min((tick / ticks) * 100, 100));
      if (tick >= ticks) {
        if (progressRef.current) clearInterval(progressRef.current);
      }
    }, tickInterval);

    animRef.current = setTimeout(() => {
      runDemoStepRef.current(stepIndex + 1);
    }, step.duration);
  }, []);

  useEffect(() => {
    runDemoStepRef.current = runDemoStep;
  }, [runDemoStep]);

  const handleRetrain = () => {
    setStatus("uploading");
    setCurrentStep(0);
    setStepProgress(0);

    animRef.current = setTimeout(() => {
      setStatus("training");
      runDemoStep(0);
    }, 500);
  };

  const handleDownload = () => {
    const jsonl = exportDPOPairs();
    const blob = new Blob([jsonl], { type: "application/jsonl" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `gemmpen-corrections-${new Date().toISOString().slice(0, 10)}.jsonl`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopy = async () => {
    const jsonl = exportDPOPairs();
    await navigator.clipboard.writeText(jsonl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setStatus("idle");
    setCurrentStep(0);
    setStepProgress(0);
  };

  if (!loaded) return null;

  const pct = Math.min((pairCount / threshold) * 100, 100);
  const isRunning = status === "uploading" || status === "training";
  const ready = pairCount >= threshold;

  const stepsWithCount = DEMO_STEPS.map((s, i) =>
    i === 0 ? { ...s, detail: `Formatting ${pairCount} corrections...` } : s
  );

  return (
    <div
      className="px-4 md:px-7"
      style={{
        background: "var(--bg-card)",
        border: "0.5px solid var(--border-color)",
        borderRadius: "var(--radius-card)",
        paddingTop: "1.75rem",
        paddingBottom: "1.75rem",
      }}
    >
      {/* Hero message */}
      <p
        style={{
          fontFamily: "var(--font-cormorant), Georgia, serif",
          fontSize: "1.375rem",
          fontWeight: 500,
          color: "var(--text-primary)",
          lineHeight: 1.4,
          marginBottom: "0.375rem",
          maxWidth: "520px",
        }}
      >
        {status === "complete"
          ? "GemmPen now sounds more like you"
          : ready
            ? "Ready to adapt"
            : "Your progress"}
      </p>
      <p
        style={{
          fontSize: "0.8125rem",
          color: "var(--text-secondary)",
          lineHeight: 1.6,
          marginBottom: "1.5rem",
          maxWidth: "520px",
        }}
      >
        {status === "complete"
          ? "From now on, feedback will reflect your style. Keep correcting to refine it further."
          : ready
            ? `You have ${pairCount} corrections. That is enough for GemmPen to learn your feedback style.`
            : `Every time you edit feedback on the Review page, GemmPen saves what you changed. After ${threshold} corrections, you can adapt it with one click.`}
      </p>

      {/* Progress bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          marginBottom: "1.5rem",
        }}
      >
        <div
          style={{
            flex: 1,
            height: "6px",
            borderRadius: "3px",
            background: "var(--border-color)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${pct}%`,
              height: "100%",
              borderRadius: "3px",
              background: ready || status === "complete" ? "#2D7A2E" : "var(--btn-primary)",
              transition: "width 0.4s ease",
            }}
          />
        </div>
        <span
          style={{
            fontSize: "0.75rem",
            fontWeight: 500,
            color: "var(--text-muted)",
            whiteSpace: "nowrap",
          }}
        >
          {pairCount} / {threshold} corrections
        </span>
      </div>

      {/* Training steps visualization */}
      {(isRunning || status === "complete") && (
        <div
          style={{
            marginBottom: "1.5rem",
            padding: "1rem 1.25rem",
            borderRadius: "8px",
            background: status === "complete"
              ? "rgba(45, 122, 46, 0.04)"
              : "rgba(184, 134, 11, 0.04)",
            border: `0.5px solid ${status === "complete" ? "rgba(45, 122, 46, 0.15)" : "rgba(184, 134, 11, 0.15)"}`,
          }}
        >
          {stepsWithCount.map((step, i) => {
            const isDone = status === "complete" || i < currentStep;
            const isActive = status === "training" && i === currentStep;
            const isPending = !isDone && !isActive;

            return (
              <div
                key={step.label}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.75rem",
                  marginBottom: i < DEMO_STEPS.length - 1 ? "0.75rem" : 0,
                  opacity: isPending ? 0.35 : 1,
                  transition: "opacity 0.3s ease",
                }}
              >
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    flexShrink: 0,
                    marginTop: "1px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.625rem",
                    fontWeight: 600,
                    background: isDone
                      ? "#2D7A2E"
                      : isActive
                        ? "var(--btn-primary)"
                        : "var(--border-color)",
                    color: isDone || isActive ? "#fff" : "var(--text-muted)",
                    transition: "all 0.3s ease",
                  }}
                >
                  {isDone ? (
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5L4 7L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : (
                    i + 1
                  )}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: "0.8125rem",
                      fontWeight: isDone || isActive ? 600 : 400,
                      color: isDone
                        ? "#2D7A2E"
                        : isActive
                          ? "var(--text-primary)"
                          : "var(--text-muted)",
                      marginBottom: isActive ? "0.375rem" : 0,
                      transition: "color 0.3s ease",
                    }}
                  >
                    {step.label}
                  </div>

                  {isActive && (
                    <>
                      <div
                        style={{
                          fontSize: "0.75rem",
                          color: "var(--text-muted)",
                          marginBottom: "0.375rem",
                        }}
                      >
                        {step.detail}
                      </div>
                      <div
                        style={{
                          height: "3px",
                          borderRadius: "2px",
                          background: "var(--border-color)",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            width: `${stepProgress}%`,
                            height: "100%",
                            borderRadius: "2px",
                            background: "var(--btn-primary)",
                            transition: "width 0.05s linear",
                          }}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Primary action */}
      <div className="flex flex-wrap items-center" style={{ gap: "0.75rem" }}>
        <button
          type="button"
          onClick={handleRetrain}
          disabled={!ready || isRunning || status === "complete"}
          title={!ready ? `${threshold - pairCount} more corrections needed` : undefined}
          style={{
            fontSize: "0.875rem",
            fontWeight: 600,
            padding: "0.75rem 1.5rem",
            minHeight: "44px",
            borderRadius: "var(--radius-card)",
            background:
              !ready || isRunning || status === "complete"
                ? "var(--border-color)"
                : "var(--btn-primary)",
            color:
              !ready || isRunning || status === "complete"
                ? "var(--text-muted)"
                : "var(--btn-primary-text)",
            border: "none",
            cursor:
              !ready || isRunning || status === "complete"
                ? "not-allowed"
                : "pointer",
            fontFamily: "inherit",
            transition: "all 0.2s ease",
          }}
        >
          {isRunning
            ? "Adapting..."
            : status === "complete"
              ? "Adapted successfully"
              : !ready
                ? `${threshold - pairCount} more corrections needed`
                : "Adapt to my style"}
        </button>

        {status === "complete" && (
          <button
            type="button"
            onClick={handleReset}
            style={{
              fontSize: "0.8125rem",
              color: "var(--text-muted)",
              background: "none",
              border: "none",
              cursor: "pointer",
              textDecoration: "underline",
              textUnderlineOffset: "2px",
              fontFamily: "inherit",
              minHeight: "44px",
            }}
          >
            Reset
          </button>
        )}
      </div>

      {/* Expandable export section */}
      <div style={{ marginTop: "1.25rem", borderTop: "0.5px solid var(--border-color)", paddingTop: "1rem" }}>
        <button
          type="button"
          onClick={() => setShowExport(!showExport)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.375rem",
            fontSize: "0.75rem",
            fontWeight: 500,
            color: "var(--text-muted)",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            fontFamily: "inherit",
          }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            style={{
              transform: showExport ? "rotate(90deg)" : "rotate(0deg)",
              transition: "transform 0.2s ease",
            }}
          >
            <path d="M4.5 2.5L8 6L4.5 9.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Advanced: Export correction data
        </button>

        {showExport && (
          <div style={{ marginTop: "0.75rem" }}>
            <p
              style={{
                fontSize: "0.75rem",
                color: "var(--text-muted)",
                lineHeight: 1.6,
                marginBottom: "0.75rem",
                maxWidth: "480px",
              }}
            >
              Download your corrections as a file for advanced use, for example on your own hardware or in a notebook environment.
            </p>
            <div className="flex flex-wrap" style={{ gap: "0.5rem" }}>
              <button
                type="button"
                onClick={handleDownload}
                disabled={isRunning}
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  padding: "0.5rem 1rem",
                  minHeight: "36px",
                  borderRadius: "var(--radius-card)",
                  background: "var(--bg-card)",
                  color: "var(--text-secondary)",
                  border: "0.5px solid var(--border-color)",
                  cursor: isRunning ? "not-allowed" : "pointer",
                  fontFamily: "inherit",
                  opacity: isRunning ? 0.5 : 1,
                }}
              >
                Download file
              </button>

              <button
                type="button"
                onClick={handleCopy}
                disabled={isRunning}
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  padding: "0.5rem 1rem",
                  minHeight: "36px",
                  borderRadius: "var(--radius-card)",
                  background: "var(--bg-card)",
                  color: copied ? "#2D7A2E" : "var(--text-secondary)",
                  border: `0.5px solid ${copied ? "#2D7A2E" : "var(--border-color)"}`,
                  cursor: isRunning ? "not-allowed" : "pointer",
                  fontFamily: "inherit",
                  transition: "all 0.2s ease",
                  opacity: isRunning ? 0.5 : 1,
                }}
              >
                {copied ? "Copied!" : "Copy to clipboard"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
