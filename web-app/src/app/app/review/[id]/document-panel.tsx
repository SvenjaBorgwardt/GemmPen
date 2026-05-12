"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { TranscriptView } from "@/components/transcript-view";
import type { Highlight, UncertainSpan } from "@/lib/student-annotations";

/* ------------------------------------------------------------------ */
/*  ScanViewer - scrollable image that fits container width            */
/*  Simple approach: width=100%, natural scroll, no custom pan/zoom    */
/* ------------------------------------------------------------------ */

const ZOOM_LEVELS = [100, 125, 150, 200, 250];

function ScanViewer({ scanUrl, initialZoomIdx = 0 }: { scanUrl: string; initialZoomIdx?: number }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [baseWidth, setBaseWidth] = useState(0);
  const [zoomIdx, setZoomIdx] = useState(initialZoomIdx);
  const zoom = ZOOM_LEVELS[zoomIdx];
  const [isPanning, setIsPanning] = useState(false);
  const panStart = useRef({ x: 0, y: 0, scrollLeft: 0, scrollTop: 0 });

  useEffect(() => {
    if (!scrollRef.current) return;
    const measure = () => setBaseWidth(scrollRef.current?.clientWidth ?? 0);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(scrollRef.current);
    return () => ro.disconnect();
  }, []);

  const zoomIn = useCallback(() => {
    setZoomIdx((i) => Math.min(i + 1, ZOOM_LEVELS.length - 1));
  }, []);

  const zoomOut = useCallback(() => {
    setZoomIdx((i) => Math.max(i - 1, 0));
  }, []);

  const imgWidth = baseWidth > 0 ? Math.round(baseWidth * zoom / 100) : undefined;
  const canPan = zoom > 100;

  const panActive = useRef(false);

  const onPanStart = useCallback((e: React.PointerEvent) => {
    if (!canPan || !scrollRef.current) return;
    panActive.current = true;
    setIsPanning(true);
    panStart.current = {
      x: e.clientX,
      y: e.clientY,
      scrollLeft: scrollRef.current.scrollLeft,
      scrollTop: scrollRef.current.scrollTop,
    };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [canPan]);

  const onPanMove = useCallback((e: React.PointerEvent) => {
    if (!panActive.current || !scrollRef.current) return;
    const dx = e.clientX - panStart.current.x;
    const dy = e.clientY - panStart.current.y;
    scrollRef.current.scrollLeft = panStart.current.scrollLeft - dx;
    scrollRef.current.scrollTop = panStart.current.scrollTop - dy;
  }, []);

  const onPanEnd = useCallback((e: React.PointerEvent) => {
    panActive.current = false;
    setIsPanning(false);
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        background: "#E8E3DA",
        borderRadius: "var(--radius-card)",
        border: "0.5px solid var(--border-color)",
      }}
    >
      {/* Scrollable + pannable image area */}
      <div
        ref={scrollRef}
        onPointerDown={onPanStart}
        onPointerMove={onPanMove}
        onPointerUp={onPanEnd}
        onPointerCancel={onPanEnd}
        style={{
          width: "100%",
          height: "100%",
          overflow: "auto",
          cursor: canPan ? (isPanning ? "grabbing" : "grab") : "default",
          touchAction: canPan ? "none" : "auto",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={scanUrl}
          alt="Handwritten exam"
          draggable={false}
          style={{
            display: "block",
            width: imgWidth ? `${imgWidth}px` : "100%",
            maxWidth: "none",
            height: "auto",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Zoom controls - positioned outside scroll container */}
      <div
        style={{
          position: "absolute",
          bottom: "8px",
          left: "8px",
          display: "flex",
          alignItems: "center",
          gap: "2px",
          background: "rgba(232, 227, 218, 0.92)",
          borderRadius: "6px",
          border: "0.5px solid var(--border-color)",
          padding: "2px",
          zIndex: 3,
        }}
      >
        <button
          onClick={zoomOut}
          disabled={zoomIdx === 0}
          style={{
            width: "24px",
            height: "24px",
            border: "none",
            background: "transparent",
            cursor: zoomIdx === 0 ? "default" : "pointer",
            fontSize: "0.875rem",
            color: zoomIdx === 0 ? "var(--border-color)" : "var(--text-secondary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "4px",
          }}
          title="Zoom out"
        >
          -
        </button>
        <span
          style={{
            fontSize: "0.5625rem",
            color: "var(--text-muted)",
            minWidth: "32px",
            textAlign: "center",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {zoom}%
        </span>
        <button
          onClick={zoomIn}
          disabled={zoomIdx === ZOOM_LEVELS.length - 1}
          style={{
            width: "24px",
            height: "24px",
            border: "none",
            background: "transparent",
            cursor: zoomIdx === ZOOM_LEVELS.length - 1 ? "default" : "pointer",
            fontSize: "0.875rem",
            color: zoomIdx === ZOOM_LEVELS.length - 1 ? "var(--border-color)" : "var(--text-secondary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "4px",
          }}
          title="Zoom in"
        >
          +
        </button>
        {zoomIdx !== 0 && (
          <>
            <div
              style={{
                width: "1px",
                height: "14px",
                background: "var(--border-color)",
                margin: "0 2px",
              }}
            />
            <button
              onClick={() => setZoomIdx(0)}
              style={{
                height: "24px",
                border: "none",
                background: "transparent",
                cursor: "pointer",
                fontSize: "0.5625rem",
                color: "var(--text-muted)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "4px",
                padding: "0 6px",
                letterSpacing: "0.3px",
              }}
              title="Reset zoom"
            >
              Reset
            </button>
          </>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  SimulatedScan - CSS fake for students without a real scan          */
/* ------------------------------------------------------------------ */

function SimulatedScan({ transcript }: { transcript: string }) {
  const lines = transcript.split(/\n+/).filter(Boolean);
  const preview = lines.slice(0, 2).join(" ");
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        background: "#E8E3DA",
        borderRadius: "var(--radius-card)",
        border: "0.5px solid var(--border-color)",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: `${28 + i * 24}px`,
              left: "20px",
              right: "20px",
              height: "1px",
              background: "#C7BFB2",
              opacity: 0.3,
            }}
          />
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          inset: "16px 20px",
          fontFamily: "var(--font-caveat), cursive",
          fontSize: "1.0625rem",
          lineHeight: "24px",
          color: "#3A3630",
          transform: "rotate(-0.7deg)",
          overflow: "hidden",
        }}
      >
        {preview}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "40px",
          background: "linear-gradient(transparent, #E8E3DA)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Resize handle styling constants                                    */
/* ------------------------------------------------------------------ */

const HANDLE_HEIGHT = 20;
const MIN_SCAN_PX = 80;
const MIN_TRANSCRIPT_PX = 120;

/* ------------------------------------------------------------------ */
/*  DocumentPanel - resizable split: scan on top, transcript below     */
/* ------------------------------------------------------------------ */

export function DocumentPanel({
  transcript,
  scanUrl,
  initialZoomIdx,
  paragraphs,
  highlights,
  uncertainSpans,
}: {
  transcript: string;
  scanUrl?: string;
  initialZoomIdx?: number;
  paragraphs: string[];
  highlights: Highlight[];
  uncertainSpans: UncertainSpan[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scanRatio, setScanRatio] = useState(0.35);
  const isDragging = useRef(false);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      isDragging.current = true;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      document.body.style.userSelect = "none";
      document.body.style.cursor = "row-resize";
    },
    [],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalHeight = rect.height - HANDLE_HEIGHT;
      const y = e.clientY - rect.top;

      const clampedY = Math.max(
        MIN_SCAN_PX,
        Math.min(y, totalHeight - MIN_TRANSCRIPT_PX),
      );
      setScanRatio(clampedY / totalHeight);
    },
    [],
  );

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      isDragging.current = false;
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
    },
    [],
  );

  return (
    <div
      ref={containerRef}
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden",
      }}
    >
      {/* ---- Scan area ---- */}
      <div
        style={{
          flex: `0 0 ${scanRatio * 100}%`,
          position: "relative",
          overflow: "hidden",
          padding: "1rem 1rem 0 1rem",
        }}
      >
        <div style={{ position: "relative", height: "100%" }}>
          {scanUrl ? (
            <ScanViewer scanUrl={scanUrl} initialZoomIdx={initialZoomIdx} />
          ) : (
            <SimulatedScan transcript={transcript} />
          )}
          <span
            style={{
              position: "absolute",
              top: "8px",
              right: "10px",
              fontSize: "0.5625rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "1px",
              color: "var(--text-muted)",
              background: "rgba(232, 227, 218, 0.85)",
              padding: "2px 6px",
              borderRadius: "3px",
              zIndex: 2,
            }}
          >
            Handwritten original
          </span>
        </div>
      </div>

      {/* ---- Drag handle ---- */}
      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        style={{
          flex: `0 0 ${HANDLE_HEIGHT}px`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "row-resize",
          padding: "0 1rem",
          touchAction: "none",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "1px",
            background: "var(--border-color)",
            position: "relative",
          }}
        >
          {/* Grip indicator */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "2px",
              background: "var(--bg-card)",
              padding: "2px 10px",
              borderRadius: "4px",
              border: "0.5px solid var(--border-color)",
            }}
          >
            <svg
              width="16"
              height="6"
              viewBox="0 0 16 6"
              fill="none"
              style={{ opacity: 0.4 }}
            >
              <line x1="0" y1="1" x2="16" y2="1" stroke="var(--text-muted)" strokeWidth="1" />
              <line x1="0" y1="5" x2="16" y2="5" stroke="var(--text-muted)" strokeWidth="1" />
            </svg>
          </div>
        </div>
      </div>

      {/* ---- Transcript area ---- */}
      <div
        style={{
          flex: 1,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          padding: "0 1rem 1rem 1rem",
        }}
      >
        {/* Transcript header */}
        <div
          className="flex items-center justify-between"
          style={{
            fontSize: "0.6875rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "1.5px",
            color: "var(--text-muted)",
            marginBottom: "0.375rem",
            flexShrink: 0,
          }}
        >
          <span>Transcript</span>
          <span
            style={{
              fontSize: "0.5625rem",
              fontWeight: 500,
              textTransform: "none",
              letterSpacing: "0.3px",
              color: "var(--text-muted)",
              opacity: 0.8,
            }}
          >
            Transcribed by Gemma 4
          </span>
        </div>

        {/* Category legend */}
        <div
          className="flex"
          style={{
            gap: "0.75rem",
            marginBottom: "0.5rem",
            flexWrap: "wrap",
            flexShrink: 0,
          }}
        >
          {[
            { label: "Grammar", color: "var(--cat-grammar)", bg: "var(--cat-grammar-bg)" },
            { label: "Vocabulary", color: "var(--cat-vocabulary)", bg: "var(--cat-vocabulary-bg)" },
            { label: "Sentence Structure", color: "var(--cat-sentence)", bg: "var(--cat-sentence-bg)" },
            { label: "Connectives", color: "var(--cat-connectives)", bg: "var(--cat-connectives-bg)" },
          ].map((c) => (
            <span
              key={c.label}
              className="flex items-center"
              style={{ fontSize: "0.625rem", color: c.color, gap: "4px" }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: "8px",
                  height: "8px",
                  borderRadius: "2px",
                  background: c.bg,
                  border: `1px solid ${c.color}`,
                }}
              />
              {c.label}
            </span>
          ))}
        </div>

        <p
          style={{
            fontSize: "0.6875rem",
            color: "var(--text-muted)",
            marginBottom: "0.625rem",
            fontStyle: "italic",
            flexShrink: 0,
          }}
        >
          Hover over highlighted text to see error details
        </p>

        {/* Scrollable transcript */}
        <div style={{ flex: 1, overflowY: "auto", minHeight: 0 }}>
          <TranscriptView
            paragraphs={paragraphs}
            highlights={highlights}
            uncertainSpans={uncertainSpans}
            editable
          />
        </div>
      </div>
    </div>
  );
}
