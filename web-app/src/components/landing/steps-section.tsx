"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { CATEGORIES } from "@/lib/constants";
import { FlowLines } from "@/app/components/flow-lines";

export function StepsSection() {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "820px",
        marginBottom: "0",
        position: "relative",
      }}
    >
      <FlowLines>
      {/* Top row: 3 cards with arrows */}
      <div
        className="flex flex-col md:flex-row md:items-stretch md:justify-center"
        style={{ gap: "1.25rem", position: "relative" }}
      >
        <Link href="/app/upload" className="step-card-link w-full md:flex-1 md:basis-0 md:max-w-[240px]">
          <FlowCard
            num="01"
            title="Scan"
            text="Reads handwritten exams directly - cross-outs, corrections, messy handwriting. No separate scanner, no upload."
            illustration={<ScanIllustration />}
            step={1}
          />
        </Link>
        <FlowArrow />
        <Link href="/app/configure" className="step-card-link w-full md:flex-1 md:basis-0 md:max-w-[240px]">
          <FlowCard
            num="02"
            title="Evaluate"
            text="Scores like you would. Your rubric, your standards, your categories."
            illustration={<EvaluateIllustration />}
            step={2}
          />
        </Link>
        <FlowArrow />
        <Link href="/app/review/alex-m" className="step-card-link w-full md:flex-1 md:basis-0 md:max-w-[240px]">
          <FlowCard
            num="03"
            title="Feedback"
            text="Personal exercises that make students find their own mistakes."
            illustration={<FeedbackIllustration />}
            step={3}
          />
        </Link>
      </div>

      {/* Card 4: centered below */}
      <div
        className="flex items-center justify-center"
        style={{ marginTop: "2.5rem" }}
      >
        <Link href="/app/training" className="step-card-link" style={{ width: "100%", maxWidth: "340px" }}>
          <div
            data-step="4"
            className="card-hover"
            style={{
              width: "100%",
              background: "var(--bg-card)",
              border: "1.5px solid var(--accent-gold)",
              borderRadius: "12px",
              overflow: "hidden",
              position: "relative",
              boxShadow: "0 2px 12px rgba(184, 134, 11, 0.08), 0 1px 4px rgba(44, 34, 22, 0.04)",
            }}
          >
            {/* Subtle outer glow ring */}
            <div
              style={{
                position: "absolute",
                inset: "-4px",
                borderRadius: "16px",
                border: "1px solid var(--accent-gold)",
                opacity: 0.1,
                pointerEvents: "none",
              }}
            />
            {/* Illustration area */}
            <div
              className="flex items-center justify-center"
              style={{
                height: "85px",
                background: "#F5EFE3",
                padding: "0.625rem 0.75rem",
              }}
            >
              <GrowthIllustration />
            </div>
            {/* Text content */}
            <div style={{ padding: "1rem 1.125rem" }}>
              <div className="flex items-baseline" style={{ gap: "0.375rem", marginBottom: "0.25rem" }}>
                <span
                  style={{
                    fontSize: "0.6875rem",
                    fontWeight: 700,
                    color: "var(--accent-gold)",
                    letterSpacing: "1px",
                  }}
                >
                  04
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-cormorant), Georgia, serif",
                    fontSize: "1.125rem",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                  }}
                >
                  It Grows With You
                </span>
              </div>
              <p
                style={{
                  fontSize: "0.8125rem",
                  color: "var(--text-secondary)",
                  lineHeight: 1.5,
                  marginBottom: "0.625rem",
                }}
              >
                Want GemmPen to sound like you? Correct a few drafts, hit one button, and it adapts to your voice. Only your corrections are used - never student data. Completely optional, but powerful.
              </p>
            </div>
          </div>
        </Link>
      </div>
      </FlowLines>
    </div>
  );
}

function FlowCard({
  num,
  title,
  text,
  illustration,
  step,
}: {
  num: string;
  title: string;
  text: string;
  illustration: ReactNode;
  step?: number;
}) {
  return (
    <div
      data-step={step}
      className="card-hover"
      style={{
        height: "100%",
        background: "var(--bg-card)",
        border: "1px solid var(--border-color)",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 2px 8px rgba(44, 34, 22, 0.07), 0 1px 3px rgba(44, 34, 22, 0.04)",
      }}
    >
      {/* Illustration area */}
      <div
        className="flex items-center justify-center"
        style={{
          height: "100px",
          background: "#F5EFE3",
          padding: "0.75rem",
        }}
      >
        {illustration}
      </div>
      {/* Text content */}
      <div style={{ padding: "1rem 1.125rem" }}>
        <div className="flex items-baseline" style={{ gap: "0.375rem", marginBottom: "0.25rem" }}>
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
              fontSize: "1.125rem",
              fontWeight: 600,
              color: "var(--text-primary)",
            }}
          >
            {title}
          </span>
        </div>
        <p
          style={{
            fontSize: "0.8125rem",
            color: "var(--text-secondary)",
            lineHeight: 1.5,
          }}
        >
          {text}
        </p>
      </div>
    </div>
  );
}

function FlowArrow() {
  return (
    <div
      className="hidden md:flex items-center justify-center"
      style={{
        width: "36px",
        flexShrink: 0,
        paddingBottom: "60px",
      }}
    >
      <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden>
        <circle cx="10" cy="10" r="9" fill="var(--bg-card)" stroke="var(--border-color)" strokeWidth="0.5" />
        <path
          d="M 7 10 L 13 10 M 11 7.5 L 13 10 L 11 12.5"
          stroke="var(--accent-gold)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

/* Mini-illustrations - animations trigger on hover via CSS parent selector */

function ScanIllustration() {
  return (
    <svg width="120" height="72" viewBox="0 0 120 72" fill="none">
      {/* Paper background */}
      <rect x="10" y="4" width="100" height="64" rx="4" fill="#FFF9F2" stroke="#DDD0BE" strokeWidth="0.5" />
      {/* Handwriting lines (wavy) */}
      <path d="M 22 18 Q 35 14, 48 19 Q 61 23, 74 17 Q 87 12, 98 18" stroke="#A09484" strokeWidth="1.2" fill="none" opacity="0.55" />
      <path d="M 22 30 Q 38 25, 52 31 Q 64 35, 76 28 Q 88 23, 98 30" stroke="#A09484" strokeWidth="1.2" fill="none" opacity="0.45" />
      <path d="M 22 42 Q 32 38, 44 43 Q 56 47, 68 41 Q 80 36, 90 42" stroke="#A09484" strokeWidth="1.2" fill="none" opacity="0.35" />
      <path d="M 22 54 Q 36 49, 50 55 Q 60 58, 72 52 Q 82 48, 92 54" stroke="#A09484" strokeWidth="1.2" fill="none" opacity="0.25" />
      {/* Cross-out mark */}
      <line x1="44" y1="14" x2="62" y2="24" stroke={CATEGORIES.grammar.color} strokeWidth="1" opacity="0.45" />
      {/* Scan beam - animates on card hover */}
      <g className="scan-beam">
        <rect x="8" y="22" width="104" height="3" rx="1.5" fill={CATEGORIES.genVocabulary.color} opacity="0.15" />
        <rect x="8" y="22" width="104" height="1" fill={CATEGORIES.genVocabulary.color} opacity="0.3" />
      </g>
    </svg>
  );
}

function EvaluateIllustration() {
  return (
    <svg width="140" height="72" viewBox="0 0 140 72" fill="none">
      {/* Score bars - calibrate on card hover */}
      <text x="4" y="16" fill="#A09484" fontSize="7" fontWeight="500" fontFamily="var(--font-dm-sans), system-ui, sans-serif">Grammar</text>
      <rect x="52" y="9" width="72" height="8" rx="4" fill="#E4DDD2" />
      <rect className="bar-calibrate bar-cal-1" x="52" y="9" width="54" height="8" rx="4" fill={CATEGORIES.grammar.color} opacity="0.65" />
      <text x="128" y="16" fill="#A09484" fontSize="7" fontFamily="var(--font-dm-sans), system-ui, sans-serif">10</text>

      <text x="4" y="32" fill="#A09484" fontSize="7" fontWeight="500" fontFamily="var(--font-dm-sans), system-ui, sans-serif">Vocabulary</text>
      <rect x="52" y="25" width="72" height="8" rx="4" fill="#E4DDD2" />
      <rect className="bar-calibrate bar-cal-2" x="52" y="25" width="63" height="8" rx="4" fill={CATEGORIES.genVocabulary.color} opacity="0.65" />
      <text x="128" y="32" fill="#A09484" fontSize="7" fontFamily="var(--font-dm-sans), system-ui, sans-serif">12</text>

      <text x="4" y="48" fill="#A09484" fontSize="7" fontWeight="500" fontFamily="var(--font-dm-sans), system-ui, sans-serif">Sentences</text>
      <rect x="52" y="41" width="72" height="8" rx="4" fill="#E4DDD2" />
      <rect className="bar-calibrate bar-cal-3" x="52" y="41" width="43" height="8" rx="4" fill={CATEGORIES.sentenceStructure.color} opacity="0.65" />
      <text x="128" y="48" fill="#A09484" fontSize="7" fontFamily="var(--font-dm-sans), system-ui, sans-serif">7</text>

      <text x="4" y="64" fill="#A09484" fontSize="7" fontWeight="500" fontFamily="var(--font-dm-sans), system-ui, sans-serif">Connectives</text>
      <rect x="52" y="57" width="72" height="8" rx="4" fill="#E4DDD2" />
      <rect className="bar-calibrate bar-cal-4" x="52" y="57" width="58" height="8" rx="4" fill={CATEGORIES.domainVocab.color} opacity="0.65" />
      <text x="128" y="64" fill="#A09484" fontSize="7" fontFamily="var(--font-dm-sans), system-ui, sans-serif">11</text>
    </svg>
  );
}

function FeedbackIllustration() {
  return (
    <svg width="120" height="72" viewBox="0 0 120 72" fill="none">
      {/* Mini feedback card */}
      <rect x="8" y="4" width="104" height="50" rx="6" fill="#FFF9F2" stroke="#DDD0BE" strokeWidth="0.5" />
      {/* Category tag */}
      <rect x="14" y="10" width="38" height="10" rx="3" fill={CATEGORIES.grammar.color} opacity="0.15" />
      <text x="33" y="18" textAnchor="middle" fill={CATEGORIES.grammar.color} fontSize="6" fontWeight="600" fontFamily="var(--font-dm-sans), system-ui, sans-serif">Grammar</text>
      {/* Feedback text lines - appear one by one on hover */}
      <rect className="fb-line fb-line-1" x="14" y="26" width="88" height="3" rx="1.5" fill="#DDD0BE" opacity="0.6" />
      <rect className="fb-line fb-line-2" x="14" y="33" width="72" height="3" rx="1.5" fill="#DDD0BE" opacity="0.45" />
      <rect className="fb-line fb-line-3" x="14" y="40" width="80" height="3" rx="1.5" fill="#DDD0BE" opacity="0.3" />
      {/* Exercise badge - pops in after text on hover */}
      <g className="fb-badge">
        <rect x="8" y="58" width="56" height="12" rx="4" fill={CATEGORIES.genVocabulary.color} fillOpacity="0.08" stroke={CATEGORIES.genVocabulary.color} strokeWidth="0.5" strokeOpacity="0.25" />
        <text x="36" y="67" textAnchor="middle" fill={CATEGORIES.genVocabulary.color} fontSize="6.5" fontWeight="500" fontFamily="var(--font-dm-sans), system-ui, sans-serif">Exercise 1</text>
      </g>
      {/* Sparkle */}
      <path d="M 100 60 l -2 5 l 2 5 l 2 -5 l -2 -5 Z" fill={CATEGORIES.genVocabulary.color} opacity="0.3" />
      <path d="M 96.5 65 l 3.5 -1.5 l 3.5 1.5 l -3.5 1.5 Z" fill={CATEGORIES.genVocabulary.color} opacity="0.3" />
    </svg>
  );
}

function GrowthIllustration() {
  return (
    <svg width="220" height="65" viewBox="0 0 220 65" fill="none">
      {/* Soil line */}
      <line x1="70" y1="58" x2="150" y2="58" stroke="#DDD0BE" strokeWidth="1" strokeLinecap="round" opacity="0.3" />

      {/* Small pot / base */}
      <path d="M102,58 L104,63 L116,63 L118,58" fill="none" stroke="#C4B9AB" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
      <line x1="100" y1="58" x2="120" y2="58" stroke="#C4B9AB" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />

      {/* Sprout (visible by default, fades on hover) */}
      <g className="plant-sprout">
        <path d="M110,58 L110,48" stroke="#C4B9AB" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
        <ellipse cx="106" cy="46" rx="5" ry="3.5" fill="#C4B9AB" opacity="0.15" transform="rotate(-25,106,46)" />
        <ellipse cx="114" cy="47" rx="4.5" ry="3" fill="#C4B9AB" opacity="0.12" transform="rotate(20,114,47)" />
      </g>

      {/* Main stem (draws upward on hover) */}
      <path className="plant-stem" d="M110,58 C110,50 108,40 110,30 C111,24 110,16 110,10" stroke={CATEGORIES.sentenceStructure.color} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6" />

      {/* Branch lines to leaves */}
      <path className="plant-stem" d="M110,42 C105,40 98,40 94,42" stroke={CATEGORIES.sentenceStructure.color} strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.4" />
      <path className="plant-stem" d="M110,36 C115,34 122,34 126,36" stroke={CATEGORIES.sentenceStructure.color} strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.4" />
      <path className="plant-stem" d="M110,28 C105,26 98,25 94,27" stroke={CATEGORIES.sentenceStructure.color} strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.4" />
      <path className="plant-stem" d="M110,22 C115,20 122,19 126,21" stroke={CATEGORIES.sentenceStructure.color} strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.4" />

      {/* Leaf 1 - Grammar (Terracotta) - lower left */}
      <g className="plant-leaf leaf-1">
        <ellipse cx="88" cy="40" rx="9" ry="5" fill={CATEGORIES.grammar.color} opacity="0.2" transform="rotate(-15,88,40)" />
        <ellipse cx="88" cy="40" rx="7" ry="3.5" fill={CATEGORIES.grammar.color} opacity="0.15" transform="rotate(-15,88,40)" />
        <path d="M94,42 C90,40 86,40 84,41" stroke={CATEGORIES.grammar.color} strokeWidth="0.5" fill="none" opacity="0.3" />
      </g>

      {/* Leaf 2 - Vocabulary (Gold) - middle right */}
      <g className="plant-leaf leaf-2">
        <ellipse cx="132" cy="34" rx="9" ry="5" fill={CATEGORIES.genVocabulary.color} opacity="0.2" transform="rotate(12,132,34)" />
        <ellipse cx="132" cy="34" rx="7" ry="3.5" fill={CATEGORIES.genVocabulary.color} opacity="0.15" transform="rotate(12,132,34)" />
        <path d="M126,36 C130,34 134,34 136,35" stroke={CATEGORIES.genVocabulary.color} strokeWidth="0.5" fill="none" opacity="0.3" />
      </g>

      {/* Leaf 3 - Sentence Structure (Olive) - upper left */}
      <g className="plant-leaf leaf-3">
        <ellipse cx="87" cy="25" rx="10" ry="5.5" fill={CATEGORIES.sentenceStructure.color} opacity="0.2" transform="rotate(-20,87,25)" />
        <ellipse cx="87" cy="25" rx="8" ry="4" fill={CATEGORIES.sentenceStructure.color} opacity="0.15" transform="rotate(-20,87,25)" />
        <path d="M94,27 C90,25 86,25 83,26" stroke={CATEGORIES.sentenceStructure.color} strokeWidth="0.5" fill="none" opacity="0.3" />
      </g>

      {/* Leaf 4 - Connectives (Lavender) - upper right */}
      <g className="plant-leaf leaf-4">
        <ellipse cx="133" cy="19" rx="10" ry="5.5" fill={CATEGORIES.domainVocab.color} opacity="0.25" transform="rotate(15,133,19)" />
        <ellipse cx="133" cy="19" rx="8" ry="4" fill={CATEGORIES.domainVocab.color} opacity="0.18" transform="rotate(15,133,19)" />
        <path d="M126,21 C130,19 134,19 136,20" stroke={CATEGORIES.domainVocab.color} strokeWidth="0.5" fill="none" opacity="0.3" />
      </g>

      {/* Bud / bloom at the top (appears last) */}
      <g className="plant-bud">
        <circle cx="110" cy="8" r="4" fill="var(--accent-gold)" opacity="0.15" />
        <circle cx="110" cy="8" r="2.5" fill="var(--accent-gold)" opacity="0.25" />
        <circle cx="110" cy="8" r="1" fill="var(--accent-gold)" opacity="0.5" />
      </g>
    </svg>
  );
}
