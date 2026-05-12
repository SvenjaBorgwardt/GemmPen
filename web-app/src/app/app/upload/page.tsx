"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Nav } from "@/components/nav";

export default function UploadPage() {
  const router = useRouter();
  const [dragging, setDragging] = useState(false);
  const [dropped, setDropped] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragStart = useCallback((e: React.DragEvent) => {
    e.dataTransfer.setData("text/plain", "english-b1b2");
    e.dataTransfer.effectAllowed = "copy";
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
    setDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    if (dropRef.current && !dropRef.current.contains(e.relatedTarget as Node)) {
      setDragging(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      setDropped(true);
      setTimeout(() => router.push("/app/configure"), 600);
    },
    [router],
  );

  const handleFileSelect = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        setDropped(true);
        setTimeout(() => router.push("/app/configure"), 600);
      }
    },
    [router],
  );

  return (
    <>
      <style>{`
        @media (hover: hover) {
          @keyframes nudgeUp {
            0%, 100% { transform: translateY(0); }
            40% { transform: translateY(-6px); }
            60% { transform: translateY(-3px); }
          }
        }
        @keyframes fadeInHint {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <Nav active="upload" />
      <main
        className="px-4 md:px-12"
        style={{
          maxWidth: "880px",
          margin: "0 auto",
          paddingTop: "2.5rem",
          paddingBottom: "4rem",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "2rem",
            fontWeight: 500,
            color: "var(--text-primary)",
            marginBottom: "0.375rem",
          }}
        >
          Upload Exams
        </h1>
        <p
          style={{
            fontSize: "0.9375rem",
            color: "var(--text-secondary)",
            marginBottom: "2rem",
            lineHeight: 1.5,
          }}
        >
          <span className="hidden md:inline">Upload scanned handwritten exams, or drag one of the examples below
          into the drop zone.</span>
          <span className="md:hidden">Upload scanned handwritten exams, or tap an example below to get started.</span>
        </p>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          multiple
          onChange={handleFileChange}
          style={{ display: "none" }}
        />

        {/* Drop zone */}
        <div
          ref={dropRef}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleFileSelect}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: dropped
              ? "var(--status-reviewed-bg)"
              : dragging
              ? "#FDF6E9"
              : "var(--bg-card)",
            border: dropped
              ? "2px solid var(--accent-gold)"
              : dragging
              ? "2px solid var(--accent-gold)"
              : "2px dashed var(--border-color)",
            borderRadius: "var(--radius-card)",
            padding: "3.5rem 1rem",
            textAlign: "center",
            cursor: "pointer",
            transition: "border-color 0.2s, background 0.2s, transform 0.2s",
            transform: dragging ? "scale(1.01)" : "scale(1)",
          }}
        >
          {dropped ? (
            <>
              <div
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "1.5rem",
                  fontWeight: 500,
                  color: "var(--accent-gold)",
                  marginBottom: "0.375rem",
                }}
              >
                Loading exams...
              </div>
              <div style={{ fontSize: "0.8125rem", color: "var(--text-muted)" }}>
                21 handwritten exams received
              </div>
            </>
          ) : (
            <>
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke={dragging ? "var(--accent-gold)" : "var(--text-muted)"}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ marginBottom: "0.5rem", transition: "stroke 0.2s" }}
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              <div
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "1.5rem",
                  fontWeight: 500,
                  color: dragging ? "var(--accent-gold)" : "var(--text-primary)",
                  marginBottom: "0.375rem",
                  transition: "color 0.2s",
                }}
              >
                {dragging ? (
                  "Drop here"
                ) : (
                  <>
                    <span className="hidden md:inline">Drop exam scans here</span>
                    <span className="md:hidden">Tap to upload exam scans</span>
                  </>
                )}
              </div>
              <div style={{ fontSize: "0.8125rem", color: "var(--text-muted)" }}>
                <span className="hidden md:inline">PDF, JPG, or PNG - click to browse</span>
                <span className="md:hidden">PDF, JPG, or PNG</span>
              </div>
            </>
          )}
        </div>

        <p
          style={{
            fontSize: "0.6875rem",
            color: "var(--text-muted)",
            textAlign: "center",
            marginTop: "0.75rem",
            fontStyle: "italic",
          }}
        >
          In production, all processing runs on your device. This demo uses
          pre-evaluated results to show the full workflow.
        </p>

        <p
          style={{
            fontSize: "0.6875rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "1.5px",
            color: "var(--text-muted)",
            marginTop: "2.5rem",
            marginBottom: "1rem",
          }}
        >
          Or start with an example
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "0.875rem",
          }}
        >
          {/* English - active, draggable */}
          <ExampleCard
            title="English B1-B2 Writing"
            info="21 students, handwritten"
            badge="Comment Writing"
            draggable
            onDragStart={handleDragStart}
            onClick={() => router.push("/app/configure")}
          />

          {/* Economics - coming soon */}
          <ExampleCard
            title="Economics Essay"
            info="18 students, handwritten"
            badge="Market Analysis"
            disabled
          />

          {/* Biology - coming soon */}
          <ExampleCard
            title="Biology Lab Report"
            info="24 students, handwritten"
            badge="Photosynthesis"
            disabled
          />
        </div>
      </main>
    </>
  );
}

function ExampleCard({
  title,
  info,
  badge,
  disabled,
  draggable,
  onDragStart,
  onClick,
}: {
  title: string;
  info: string;
  badge: string;
  disabled?: boolean;
  draggable?: boolean;
  onDragStart?: (e: React.DragEvent) => void;
  onClick?: () => void;
}) {
  return (
    <div
      draggable={draggable && !disabled}
      onDragStart={onDragStart}
      onClick={disabled ? undefined : onClick}
      className={disabled ? "" : "example-card"}
      style={{
        display: "block",
        background: "var(--bg-card)",
        border: draggable
          ? "1.5px solid var(--accent-gold)"
          : "0.5px solid var(--border-color)",
        borderRadius: "var(--radius-card)",
        overflow: "hidden",
        cursor: disabled ? "default" : draggable ? "grab" : "pointer",
        transition: "box-shadow 0.15s, border-color 0.15s, opacity 0.15s",
        opacity: disabled ? 0.45 : 1,
        position: "relative",
        animation: draggable ? "nudgeUp 2.5s ease-in-out infinite" : "none",
      }}
    >
      {draggable && <span className="hidden md:block"><DragHint /></span>}
      <ScanThumbnail />
      <div style={{ padding: "0.875rem 1rem 1rem" }}>
        <div
          style={{
            fontSize: "0.875rem",
            fontWeight: 600,
            color: "var(--text-primary)",
            marginBottom: "0.25rem",
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: "0.75rem",
            color: "var(--text-muted)",
            marginBottom: "0.625rem",
          }}
        >
          {info}
        </div>
        <span
          style={{
            display: "inline-block",
            fontSize: "0.625rem",
            fontWeight: 500,
            padding: "0.125rem 0.5rem",
            borderRadius: "10px",
            background: "var(--badge-bg)",
            color: "var(--badge-text)",
          }}
        >
          {badge}
        </span>
        {disabled && (
          <div
            style={{
              fontSize: "0.6875rem",
              color: "var(--text-muted)",
              fontStyle: "italic",
              marginTop: "0.5rem",
            }}
          >
            Coming soon
          </div>
        )}
      </div>

    </div>
  );
}

function DragHint() {
  return (
    <div
      style={{
        position: "absolute",
        top: "0.5rem",
        right: "0.5rem",
        display: "flex",
        alignItems: "center",
        gap: "0.25rem",
        background: "var(--accent-gold)",
        color: "#fff",
        fontSize: "0.5625rem",
        fontWeight: 600,
        padding: "0.2rem 0.5rem",
        borderRadius: "8px",
        zIndex: 2,
        letterSpacing: "0.5px",
        textTransform: "uppercase",
        animation: "fadeInHint 0.8s ease-out",
      }}
    >
      <svg
        width="10"
        height="10"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="17 11 12 6 7 11" />
        <line x1="12" y1="6" x2="12" y2="18" />
      </svg>
      Drag me up
    </div>
  );
}

function ScanThumbnail() {
  const widths = ["92%", "85%", "94%", "70%", "88%", "82%", "60%"];
  return (
    <div
      style={{
        background: "#E8E3DA",
        height: "120px",
        display: "flex",
        flexDirection: "column",
        gap: "0.625rem",
        padding: "1rem 1.125rem",
        borderBottom: "0.5px solid var(--border-color)",
      }}
    >
      {widths.map((w, i) => (
        <div
          key={i}
          style={{
            height: "2px",
            background: "#C7BFB2",
            opacity: 0.5,
            borderRadius: "1px",
            width: w,
          }}
        />
      ))}
    </div>
  );
}
