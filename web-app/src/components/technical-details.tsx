"use client";

import { useState } from "react";

export function TechnicalDetails() {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: "0.5px solid var(--border-color)",
        borderRadius: "var(--radius-card)",
        overflow: "hidden",
      }}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1rem 1.5rem",
          background: "none",
          border: "none",
          cursor: "pointer",
          fontFamily: "inherit",
        }}
      >
        <div
          style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
        >
          <span
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "1.125rem",
              fontWeight: 500,
              color: "var(--text-primary)",
            }}
          >
            Under the hood
          </span>
          <span
            style={{
              fontSize: "0.6875rem",
              fontWeight: 500,
              color: "var(--text-muted)",
              background: "var(--border-color)",
              padding: "0.125rem 0.5rem",
              borderRadius: "4px",
              letterSpacing: "0.3px",
            }}
          >
            Technical
          </span>
        </div>
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
            color: "var(--text-muted)",
          }}
        >
          <path
            d="M3.5 5.25L7 8.75L10.5 5.25"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Teaser line - visible when collapsed */}
      {!open && (
        <p
          style={{
            fontSize: "0.6875rem",
            color: "var(--text-muted)",
            padding: "0 1.5rem 1rem",
            margin: 0,
            lineHeight: 1.5,
          }}
        >
          One model does it all: Gemma 4 reads handwriting, scores against your rubric, writes feedback, and learns your voice.
        </p>
      )}

      {open && (
        <div style={{ padding: "0 1.5rem 1.5rem" }}>
          <div
            style={{
              borderTop: "0.5px solid var(--border-color)",
              paddingTop: "1.25rem",
            }}
          >
            <p
              style={{
                fontSize: "0.8125rem",
                color: "var(--text-secondary)",
                lineHeight: 1.9,
                margin: 0,
                marginBottom: "1.25rem",
              }}
            >
              Everything runs on a single device. No internet, no cloud,
              no data leaving the classroom. GemmPen is built on Gemma 4
              E4B, a multimodal open-weights model by Google DeepMind
              that understands both images and text. One model handles
              the entire journey: from reading a student&apos;s handwriting
              to generating exercises tailored to their mistakes.
            </p>

            <StepHeading num="01" title="Reading handwriting" />
            <p
              style={{
                fontSize: "0.8125rem",
                color: "var(--text-secondary)",
                lineHeight: 1.9,
                margin: 0,
                marginBottom: "1.25rem",
              }}
            >
              Gemma 4 reads handwritten exams directly from a photo or
              scan - no separate recognition step, no external service.
              It handles crossed-out words, corrections, and messy
              handwriting. Teachers can review and correct the transcript
              before moving on.
            </p>

            <StepHeading num="02" title="Scoring against your rubric" />
            <p
              style={{
                fontSize: "0.8125rem",
                color: "var(--text-secondary)",
                lineHeight: 1.9,
                margin: 0,
                marginBottom: "1.25rem",
              }}
            >
              The model was fine-tuned on real student exams to do three
              things: find errors and map them to rubric categories, check
              argument structure, and explain every score with direct quotes
              from the student&apos;s text. The rubric itself is passed as a
              configuration, not baked into the model, so any teacher can
              bring their own grading criteria.
            </p>

            <StepHeading num="03" title="Writing feedback that teaches" />
            <p
              style={{
                fontSize: "0.8125rem",
                color: "var(--text-secondary)",
                lineHeight: 1.9,
                margin: 0,
                marginBottom: "1.25rem",
              }}
            >
              Every piece of feedback is written at a level the student can
              actually understand (B1-B2 English). It points to specific
              sentences in their essay, explains the pattern behind the
              error, and nudges them toward the answer without giving it
              away. The goal is always the same: help students recognize
              their own mistakes and build confidence doing it.
            </p>

            <StepHeading num="04" title="Personalized exercises" />
            <p
              style={{
                fontSize: "0.8125rem",
                color: "var(--text-secondary)",
                lineHeight: 1.9,
                margin: 0,
                marginBottom: "1.25rem",
              }}
            >
              Based on each student&apos;s individual errors, GemmPen
              generates targeted practice exercises. Students can submit
              answers as many times as they want and get immediate hints
              if something is not quite right yet.
            </p>

            <StepHeading num="05" title="Learning your voice (optional)" />
            <p
              style={{
                fontSize: "0.8125rem",
                color: "var(--text-secondary)",
                lineHeight: 1.9,
                margin: 0,
                marginBottom: "1.25rem",
              }}
            >
              This part is entirely optional. If you edit a few feedback
              drafts, GemmPen saves each correction as a before-and-after
              pair. After about 30 edits, you can export them and train a
              personal LoRA adapter (a small add-on under 50 MB) on a free
              Kaggle GPU in about 30 minutes. From that point on, feedback
              sounds more like you. Only the corrections are uploaded for
              training, never student essays, names, or scores.
            </p>

            <StepHeading num="06" title="Built to be reproduced" />
            <p
              style={{
                fontSize: "0.8125rem",
                color: "var(--text-secondary)",
                lineHeight: 1.9,
                margin: 0,
                marginBottom: "1.25rem",
              }}
            >
              Fine-tuned on real student exams using LoRA and Unsloth on a
              free Kaggle T4 GPU. The fine-tuned model produces significantly
              more specific feedback than the base model, citing concrete
              passages and adapting its tone to each student&apos;s level.
              All weights are open, the full training notebook is public, and
              the entire pipeline can be reproduced on any device that runs
              Gemma 4.
            </p>

            {/* Links */}
            <div
              className="flex flex-wrap"
              style={{
                gap: "0.75rem 1.5rem",
                fontSize: "0.8125rem",
              }}
            >
              <a
                href="https://www.kaggle.com/code/svenjaborgwardt/gemmpen-finetuning-gemma-4-e4b"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "var(--btn-primary)",
                  fontWeight: 500,
                  textDecoration: "underline",
                  textUnderlineOffset: "2px",
                }}
              >
                View the notebook
              </a>
              <a
                href="https://github.com/SvenjaBorgwardt/GemmPen"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "var(--btn-primary)",
                  fontWeight: 500,
                  textDecoration: "underline",
                  textUnderlineOffset: "2px",
                }}
              >
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StepHeading({ num, title }: { num: string; title: string }) {
  return (
    <div
      className="flex items-baseline"
      style={{ gap: "0.375rem", marginBottom: "0.375rem" }}
    >
      <span
        style={{
          fontSize: "0.625rem",
          fontWeight: 700,
          color: "var(--accent-gold)",
          letterSpacing: "1px",
          background: "#FDF3DC",
          padding: "0.125rem 0.4rem",
          borderRadius: "4px",
        }}
      >
        {num}
      </span>
      <span
        style={{
          fontFamily: "var(--font-cormorant), Georgia, serif",
          fontSize: "1rem",
          fontWeight: 600,
          color: "var(--text-primary)",
        }}
      >
        {title}
      </span>
    </div>
  );
}
