"use client";

import { useState, useRef, useEffect } from "react";
import { HighlightTooltip } from "./highlight-tooltip";
import { CATEGORY_CSS_COLORS } from "@/lib/constants";
import type { CatKey, Highlight, UncertainSpan } from "@/lib/student-annotations";

type Token = { text: string; kind?: CatKey; note?: string; uncertain?: UncertainSpan };

function tokenizeParagraph(
  line: string,
  highlights: Highlight[],
  uncertainSpans: UncertainSpan[]
): Token[] {
  const tokens: Token[] = [{ text: line }];

  highlights.forEach((h) => {
    for (let i = tokens.length - 1; i >= 0; i--) {
      const token = tokens[i];
      if (token.kind || token.uncertain) continue;
      const idx = token.text.indexOf(h.text);
      if (idx < 0) continue;
      const before = token.text.slice(0, idx);
      const match = token.text.slice(idx, idx + h.text.length);
      const after = token.text.slice(idx + h.text.length);
      const replacement: Token[] = [];
      if (before) replacement.push({ text: before });
      replacement.push({ text: match, kind: h.kind, note: h.note });
      if (after) replacement.push({ text: after });
      tokens.splice(i, 1, ...replacement);
      break;
    }
  });

  uncertainSpans.forEach((u) => {
    for (let i = tokens.length - 1; i >= 0; i--) {
      const token = tokens[i];
      if (token.kind || token.uncertain) continue;
      const idx = token.text.indexOf(u.text);
      if (idx < 0) continue;
      const before = token.text.slice(0, idx);
      const match = token.text.slice(idx, idx + u.text.length);
      const after = token.text.slice(idx + u.text.length);
      const replacement: Token[] = [];
      if (before) replacement.push({ text: before });
      replacement.push({ text: match, uncertain: u });
      if (after) replacement.push({ text: after });
      tokens.splice(i, 1, ...replacement);
      break;
    }
  });

  return tokens;
}

function UncertainTooltip({ text, span }: { text: string; span: UncertainSpan }) {
  const [show, setShow] = useState(false);
  const [below, setBelow] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (show && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setBelow(rect.top < 100);
    }
  }, [show]);

  const confidencePct = Math.round(span.confidence * 100);

  return (
    <span
      ref={ref}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      style={{
        position: "relative",
        borderBottom: "2px dotted var(--amber-accent, #D4A843)",
        background: "rgba(212, 168, 67, 0.08)",
        cursor: "help",
        paddingBottom: "1px",
      }}
    >
      {text}
      {show && (
        <span
          style={{
            position: "absolute",
            [below ? "top" : "bottom"]: "calc(100% + 6px)",
            left: "50%",
            transform: "translateX(-50%)",
            background: "#2C2924",
            color: "#FAF8F5",
            fontSize: "0.6875rem",
            lineHeight: 1.5,
            padding: "6px 10px",
            borderRadius: "6px",
            whiteSpace: "nowrap",
            zIndex: 50,
            pointerEvents: "none",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          }}
        >
          <span style={{ display: "block", fontWeight: 600, marginBottom: "2px" }}>
            Low confidence ({confidencePct}%)
          </span>
          {span.suggestion && (
            <span style={{ display: "block", opacity: 0.85 }}>
              Did you mean: {span.suggestion}
            </span>
          )}
          <span
            style={{
              position: "absolute",
              [below ? "top" : "bottom"]: "-4px",
              left: "50%",
              transform: `translateX(-50%) rotate(${below ? "180deg" : "0deg"})`,
              width: 0,
              height: 0,
              borderLeft: "5px solid transparent",
              borderRight: "5px solid transparent",
              borderTop: "5px solid #2C2924",
            }}
          />
        </span>
      )}
    </span>
  );
}

type Props = {
  paragraphs: string[];
  highlights: Highlight[];
  uncertainSpans?: UncertainSpan[];
  editable?: boolean;
  onTranscriptChange?: (text: string) => void;
};

export function TranscriptView({
  paragraphs,
  highlights,
  uncertainSpans = [],
  editable = false,
  onTranscriptChange,
}: Props) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");
  const [saved, setSaved] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function handleEdit() {
    setDraft(paragraphs.join("\n\n"));
    setEditing(true);
    setSaved(false);
  }

  function handleSave() {
    onTranscriptChange?.(draft);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  function handleCancel() {
    setEditing(false);
  }

  useEffect(() => {
    if (editing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }
  }, [editing]);

  if (editing) {
    return (
      <div>
        <div
          style={{
            fontSize: "0.6875rem",
            color: "var(--amber-accent, #D4A843)",
            background: "rgba(212, 168, 67, 0.08)",
            border: "0.5px solid rgba(212, 168, 67, 0.25)",
            borderRadius: "6px",
            padding: "6px 10px",
            marginBottom: "0.5rem",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
            <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2" />
            <path d="M7 4v3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            <circle cx="7" cy="9.75" r="0.75" fill="currentColor" />
          </svg>
          Corrections will trigger re-analysis of feedback and scores
        </div>
        <textarea
          ref={textareaRef}
          value={draft}
          onChange={(e) => {
            setDraft(e.target.value);
            e.target.style.height = "auto";
            e.target.style.height = e.target.scrollHeight + "px";
          }}
          style={{
            width: "100%",
            background: "#fff",
            border: "1.5px solid var(--amber-accent, #D4A843)",
            borderRadius: "var(--radius-card)",
            padding: "1rem",
            fontSize: "1rem",
            lineHeight: 1.7,
            color: "var(--text-primary)",
            minHeight: "160px",
            resize: "none",
            outline: "none",
            fontFamily: "inherit",
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "0.5rem",
            marginTop: "0.5rem",
          }}
        >
          <button
            onClick={handleCancel}
            style={{
              fontSize: "0.8125rem",
              fontWeight: 500,
              padding: "0.375rem 1rem",
              borderRadius: "6px",
              border: "0.5px solid var(--border-color)",
              background: "var(--bg-card)",
              color: "var(--text-secondary)",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            style={{
              fontSize: "0.8125rem",
              fontWeight: 500,
              padding: "0.375rem 1rem",
              borderRadius: "6px",
              border: "0.5px solid var(--btn-primary)",
              background: "var(--btn-primary)",
              color: "var(--btn-primary-text)",
              cursor: "pointer",
            }}
          >
            Save & Re-analyze
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div
        style={{
          background: "#fff",
          border: "0.5px solid var(--border-color)",
          borderRadius: "var(--radius-card)",
          padding: "1rem",
          fontSize: "1rem",
          lineHeight: 1.7,
          color: "var(--text-primary)",
          minHeight: "160px",
          outline: "none",
        }}
      >
        {paragraphs.map((p, i) => {
          const tokens = tokenizeParagraph(p, highlights, uncertainSpans);
          return (
            <p key={i} style={{ marginBottom: i < paragraphs.length - 1 ? "0.875rem" : 0 }}>
              {tokens.map((t, j) => {
                if (t.uncertain) {
                  return <UncertainTooltip key={j} text={t.text} span={t.uncertain} />;
                }
                if (!t.kind) return <span key={j}>{t.text}</span>;
                return (
                  <HighlightTooltip
                    key={j}
                    text={t.text}
                    kind={t.kind}
                    note={t.note}
                  />
                );
              })}
            </p>
          );
        })}
      </div>
      {editable && (
        <div style={{ marginTop: "0.5rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <button
            onClick={handleEdit}
            style={{
              fontSize: "0.75rem",
              fontWeight: 500,
              padding: "0.375rem 0.875rem",
              borderRadius: "6px",
              border: "0.5px solid var(--border-color)",
              background: "var(--bg-card)",
              color: "var(--text-secondary)",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M8.5 1.5l2 2L4 10H2v-2l6.5-6.5z"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Edit Transcript
          </button>
          {saved && (
            <span style={{ fontSize: "0.6875rem", color: "var(--text-muted)" }}>
              Saved - re-analysis queued
            </span>
          )}
          {uncertainSpans.length > 0 && !saved && (
            <span style={{ fontSize: "0.6875rem", color: "var(--amber-accent, #D4A843)" }}>
              {uncertainSpans.length} uncertain {uncertainSpans.length === 1 ? "word" : "words"} detected
            </span>
          )}
        </div>
      )}
    </div>
  );
}
