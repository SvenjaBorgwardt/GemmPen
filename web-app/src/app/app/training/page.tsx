"use client";

import { Nav } from "@/components/nav";
import { TrainingSection } from "@/components/training-section";
import { TechnicalDetails } from "@/components/technical-details";

export default function TrainingPage() {
  return (
    <>
      <Nav active="training" />
      <main
        className="px-4 md:px-12"
        style={{
          maxWidth: "1080px",
          margin: "0 auto",
          paddingTop: "2.5rem",
          paddingBottom: "4rem",
        }}
      >
        {/* Hero */}
        <div style={{ marginBottom: "2.5rem", textAlign: "center" }}>
          <h1
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "2.25rem",
              fontWeight: 500,
              color: "var(--text-primary)",
              marginBottom: "0.625rem",
            }}
          >
            Adapt to me
          </h1>
          <p
            style={{
              fontSize: "0.9375rem",
              color: "var(--text-secondary)",
              lineHeight: 1.7,
              maxWidth: "520px",
              margin: "0 auto",
            }}
          >
            GemmPen already writes structured feedback. If you want it to sound
            more like you, correct a few drafts and let it learn your style.
          </p>
          <p
            style={{
              fontSize: "0.8125rem",
              color: "var(--text-muted)",
              marginTop: "0.5rem",
            }}
          >
            This is entirely optional. If the feedback already fits, you can skip
            this page.
          </p>
        </div>

        {/* How it works - 3 step visual */}
        <HowItWorks />

        {/* Before / After comparison */}
        <div style={{ marginTop: "2.5rem" }}>
          <BeforeAfterSection />
        </div>

        {/* Privacy strip */}
        <PrivacyStrip />

        {/* Interactive training section */}
        <div style={{ marginTop: "2rem" }}>
          <TrainingSection />
        </div>

        {/* Technical deep dive */}
        <div style={{ marginTop: "1.5rem" }}>
          <TechnicalDetails />
        </div>
      </main>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  How it works - 3 step visual flow                                  */
/* ------------------------------------------------------------------ */

function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Review feedback",
      desc: "On the Review page, read the feedback GemmPen wrote for each student. Edit anything that does not sound like you.",
      illustration: <ReviewIllustration />,
    },
    {
      num: "02",
      title: "Corrections add up",
      desc: "Every edit is saved as a before-and-after pair. After 30 corrections, you have enough for GemmPen to learn from.",
      illustration: <CorrectionsIllustration />,
    },
    {
      num: "03",
      title: "One click to adapt",
      desc: "Hit the button below and GemmPen adjusts its writing to match yours. From then on, feedback sounds more like you.",
      illustration: <AdaptIllustration />,
    },
  ];

  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: "0.5px solid var(--border-color)",
        borderRadius: "12px",
        padding: "2rem 1.5rem",
      }}
    >
      <div
        style={{
          fontSize: "0.6875rem",
          fontWeight: 600,
          color: "var(--text-muted)",
          letterSpacing: "0.5px",
          textTransform: "uppercase",
          marginBottom: "1.5rem",
          textAlign: "center",
        }}
      >
        How it works
      </div>

      <div
        className="flex flex-col md:flex-row"
        style={{ gap: "1.25rem", alignItems: "stretch" }}
      >
        {steps.map((step, i) => (
          <div key={step.num} className="flex flex-col md:flex-row" style={{ flex: 1, alignItems: "stretch" }}>
            {/* Step card */}
            <div className="training-step" style={{ flex: 1 }}>
              <div
                className="training-step-card"
                style={{
                  height: "100%",
                  background: "var(--bg-body)",
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
                  {step.illustration}
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
                      {step.num}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-cormorant), Georgia, serif",
                        fontSize: "1.125rem",
                        fontWeight: 600,
                        color: "var(--text-primary)",
                      }}
                    >
                      {step.title}
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "0.8125rem",
                      color: "var(--text-secondary)",
                      lineHeight: 1.5,
                    }}
                  >
                    {step.desc}
                  </p>
                </div>
              </div>
            </div>

            {/* Connector arrow (not after last) */}
            {i < steps.length - 1 && (
              <>
                {/* Desktop: horizontal arrow in circle */}
                <div
                  className="hidden md:flex items-center justify-center"
                  style={{ width: "36px", flexShrink: 0, paddingBottom: "60px" }}
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
                {/* Mobile: vertical arrow */}
                <div
                  className="flex md:hidden items-center justify-center"
                  style={{ height: "32px", flexShrink: 0 }}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden>
                    <circle cx="10" cy="10" r="9" fill="var(--bg-card)" stroke="var(--border-color)" strokeWidth="0.5" />
                    <path
                      d="M 10 7 L 10 13 M 7.5 11 L 10 13 L 12.5 11"
                      stroke="var(--accent-gold)"
                      strokeWidth="1.5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Training step illustrations - animated on hover                    */
/* ------------------------------------------------------------------ */

function ReviewIllustration() {
  return (
    <svg width="120" height="72" viewBox="0 0 120 72" fill="none" style={{ maxWidth: "100%", height: "auto" }}>
      {/* Feedback card background */}
      <rect x="8" y="4" width="104" height="64" rx="4" fill="#FFF9F2" stroke="#DDD0BE" strokeWidth="0.5" />
      {/* Category tag */}
      <rect x="14" y="10" width="38" height="10" rx="3" fill="#B85C3A" opacity="0.15" />
      <text x="33" y="18" textAnchor="middle" fill="#B85C3A" fontSize="6" fontWeight="600" fontFamily="var(--font-dm-sans), system-ui, sans-serif">Grammar</text>
      {/* Text line 1 - stays */}
      <rect x="14" y="26" width="88" height="3" rx="1.5" fill="#DDD0BE" opacity="0.5" />
      {/* Text line 2 - gets strikethrough on hover */}
      <rect x="14" y="34" width="72" height="3" rx="1.5" fill="#DDD0BE" opacity="0.45" />
      <line className="review-strike" x1="14" y1="35.5" x2="86" y2="35.5" stroke="#B85C3A" strokeWidth="0.8" strokeLinecap="round" opacity="0.7" />
      {/* Correction line - writes in on hover */}
      <rect className="review-correction" x="14" y="41" width="78" height="3" rx="1.5" fill="var(--accent-gold)" opacity="0.5" />
      {/* Text line 3 - stays */}
      <rect x="14" y="49" width="64" height="3" rx="1.5" fill="#DDD0BE" opacity="0.35" />
      {/* Pen cursor */}
      <g className="review-pen">
        <path d="M96 42L100 38M100 38L101.5 39.5M100 38L98.5 36.5" stroke="var(--accent-gold)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="96" y1="42" x2="92" y2="42" stroke="var(--accent-gold)" strokeWidth="0.8" strokeLinecap="round" opacity="0.4" />
      </g>
      {/* Sparkle near pen */}
      <g className="review-sparkle">
        <path d="M104 32 l-1.5 3 l1.5 3 l1.5 -3 l-1.5 -3Z" fill="var(--accent-gold)" opacity="0.25" />
        <path d="M101 35 l2.5 -1 l2.5 1 l-2.5 1Z" fill="var(--accent-gold)" opacity="0.25" />
      </g>
    </svg>
  );
}

function CorrectionsIllustration() {
  return (
    <svg width="140" height="72" viewBox="0 0 140 72" fill="none" style={{ maxWidth: "100%", height: "auto" }}>
      {/* Pair 1 */}
      <g className="corr-pair corr-pair-1">
        <rect x="12" y="6" width="48" height="12" rx="3" fill="#FFF9F2" stroke="#DDD0BE" strokeWidth="0.5" />
        <rect x="16" y="10" width="24" height="3" rx="1.5" fill="#DDD0BE" opacity="0.5" />
        <line x1="16" y1="11.5" x2="40" y2="11.5" stroke="#B85C3A" strokeWidth="0.5" opacity="0.5" />
        <rect x="66" y="6" width="48" height="12" rx="3" fill="#FBF6EC" stroke="var(--accent-gold)" strokeWidth="0.5" />
        <rect x="70" y="10" width="28" height="3" rx="1.5" fill="var(--accent-gold)" opacity="0.35" />
        <path d="M62 12L64.5 12" stroke="#DDD0BE" strokeWidth="0.8" strokeLinecap="round" />
        <path d="M60.5 10L63 12L60.5 14" stroke="#DDD0BE" strokeWidth="0.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      {/* Pair 2 */}
      <g className="corr-pair corr-pair-2">
        <rect x="12" y="22" width="48" height="12" rx="3" fill="#FFF9F2" stroke="#DDD0BE" strokeWidth="0.5" />
        <rect x="16" y="26" width="30" height="3" rx="1.5" fill="#DDD0BE" opacity="0.5" />
        <line x1="16" y1="27.5" x2="46" y2="27.5" stroke="#B85C3A" strokeWidth="0.5" opacity="0.5" />
        <rect x="66" y="22" width="48" height="12" rx="3" fill="#FBF6EC" stroke="var(--accent-gold)" strokeWidth="0.5" />
        <rect x="70" y="26" width="22" height="3" rx="1.5" fill="var(--accent-gold)" opacity="0.35" />
        <path d="M62 28L64.5 28" stroke="#DDD0BE" strokeWidth="0.8" strokeLinecap="round" />
        <path d="M60.5 26L63 28L60.5 30" stroke="#DDD0BE" strokeWidth="0.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      {/* Pair 3 */}
      <g className="corr-pair corr-pair-3">
        <rect x="12" y="38" width="48" height="12" rx="3" fill="#FFF9F2" stroke="#DDD0BE" strokeWidth="0.5" />
        <rect x="16" y="42" width="20" height="3" rx="1.5" fill="#DDD0BE" opacity="0.5" />
        <line x1="16" y1="43.5" x2="36" y2="43.5" stroke="#B85C3A" strokeWidth="0.5" opacity="0.5" />
        <rect x="66" y="38" width="48" height="12" rx="3" fill="#FBF6EC" stroke="var(--accent-gold)" strokeWidth="0.5" />
        <rect x="70" y="42" width="26" height="3" rx="1.5" fill="var(--accent-gold)" opacity="0.35" />
        <path d="M62 44L64.5 44" stroke="#DDD0BE" strokeWidth="0.8" strokeLinecap="round" />
        <path d="M60.5 42L63 44L60.5 46" stroke="#DDD0BE" strokeWidth="0.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      {/* Progress bar */}
      <rect x="12" y="57" width="102" height="6" rx="3" fill="#E4DDD2" opacity="0.5" />
      <rect className="corr-progress" x="12" y="57" width="68" height="6" rx="3" fill="var(--accent-gold)" opacity="0.55" />
      {/* Progress label */}
      <text x="120" y="62" fill="#A09484" fontSize="6.5" fontWeight="500" fontFamily="var(--font-dm-sans), system-ui, sans-serif">
        <tspan className="corr-count">20</tspan>/30
      </text>
    </svg>
  );
}

function AdaptIllustration() {
  return (
    <svg width="120" height="72" viewBox="0 0 120 72" fill="none" style={{ maxWidth: "100%", height: "auto" }}>
      {/* Outer ripple rings - visible by default, replay on hover */}
      <circle className="adapt-ring adapt-ring-3" cx="60" cy="36" r="32" stroke="var(--accent-gold)" strokeWidth="0.5" fill="none" />
      <circle className="adapt-ring adapt-ring-2" cx="60" cy="36" r="25" stroke="var(--accent-gold)" strokeWidth="0.6" fill="none" />
      <circle className="adapt-ring adapt-ring-1" cx="60" cy="36" r="18" stroke="var(--accent-gold)" strokeWidth="0.8" fill="none" />
      {/* Central button */}
      <circle cx="60" cy="36" r="12" fill="#FDF3DC" stroke="var(--accent-gold)" strokeWidth="1" />
      <g className="adapt-btn">
        {/* Sync/refresh icon inside button */}
        <path d="M55 33.5C55.8 31 58.2 29.5 60.5 29.5C63.5 29.5 66 31.8 66 35" stroke="var(--accent-gold)" strokeWidth="1.3" strokeLinecap="round" fill="none" />
        <path d="M64.5 33L66 35L67.5 33" stroke="var(--accent-gold)" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M65 38.5C64.2 41 61.8 42.5 59.5 42.5C56.5 42.5 54 40.2 54 37" stroke="var(--accent-gold)" strokeWidth="1.3" strokeLinecap="round" fill="none" />
        <path d="M55.5 39L54 37L52.5 39" stroke="var(--accent-gold)" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>
      {/* Small decorative dots at cardinal points - visible by default */}
      <circle className="adapt-dot adapt-dot-1" cx="60" cy="4" r="1.5" fill="var(--accent-gold)" />
      <circle className="adapt-dot adapt-dot-2" cx="96" cy="36" r="1.5" fill="var(--accent-gold)" />
      <circle className="adapt-dot adapt-dot-3" cx="60" cy="68" r="1.5" fill="var(--accent-gold)" />
      <circle className="adapt-dot adapt-dot-4" cx="24" cy="36" r="1.5" fill="var(--accent-gold)" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Before / After comparison                                         */
/* ------------------------------------------------------------------ */

function BeforeAfterSection() {
  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: "0.5px solid var(--border-color)",
        borderRadius: "12px",
        padding: "1.5rem",
      }}
    >
      <div
        style={{
          fontSize: "0.6875rem",
          fontWeight: 600,
          color: "var(--text-muted)",
          letterSpacing: "0.5px",
          textTransform: "uppercase",
          marginBottom: "1.25rem",
          textAlign: "center",
        }}
      >
        Same quality, your voice
      </div>
      <div
        className="flex flex-col md:flex-row"
        style={{ gap: "0" }}
      >
        {/* Before */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: "0.6875rem",
              fontWeight: 600,
              color: "var(--text-muted)",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              marginBottom: "0.625rem",
            }}
          >
            GemmPen default
          </div>
          <div
            style={{
              padding: "1rem 1.125rem",
              borderRadius: "8px",
              border: "0.5px solid var(--border-color)",
              background: "var(--bg-body)",
            }}
          >
            <div
              style={{
                display: "inline-block",
                fontSize: "0.625rem",
                fontWeight: 600,
                padding: "0.125rem 0.5rem",
                borderRadius: "4px",
                background: "var(--cat-grammar-bg)",
                color: "var(--cat-grammar)",
                marginBottom: "0.625rem",
              }}
            >
              Grammar
            </div>
            <p
              style={{
                fontSize: "0.8125rem",
                color: "var(--text-secondary)",
                lineHeight: 1.65,
                margin: 0,
              }}
            >
              You wrote{" "}
              <span
                style={{
                  background: "var(--cat-grammar-bg)",
                  padding: "0.0625rem 0.25rem",
                  borderRadius: "3px",
                  fontStyle: "italic",
                }}
              >
                &quot;the company have decided&quot;
              </span>{" "}
              in your second paragraph. Since &quot;company&quot; is singular in
              English, try &quot;has decided.&quot; You are already getting the
              present perfect right elsewhere, which shows real progress.
            </p>
          </div>
        </div>

        {/* Connector */}
        <div
          className="flex items-center justify-center"
          style={{ flexShrink: 0 }}
        >
          {/* Desktop: vertical connector */}
          <div
            className="hidden md:flex flex-col items-center"
            style={{ padding: "0 1.5rem", gap: "0.375rem" }}
          >
            <div
              style={{
                width: "1px",
                height: "20px",
                background: "var(--border-color)",
              }}
            />
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: "#F5EFE3",
                border: "0.5px solid var(--border-color)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <PenIcon />
            </div>
            <div
              style={{
                fontSize: "0.625rem",
                color: "var(--text-muted)",
                whiteSpace: "nowrap",
              }}
            >
              your edits
            </div>
            <div
              style={{
                width: "1px",
                height: "20px",
                background: "var(--border-color)",
              }}
            />
          </div>

          {/* Mobile: horizontal connector */}
          <div
            className="flex md:hidden items-center"
            style={{
              gap: "0.5rem",
              width: "100%",
              padding: "1rem 0",
            }}
          >
            <div
              style={{
                flex: 1,
                height: "1px",
                background: "var(--border-color)",
              }}
            />
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                background: "#F5EFE3",
                border: "0.5px solid var(--border-color)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <PenIcon />
            </div>
            <div
              style={{
                fontSize: "0.625rem",
                color: "var(--text-muted)",
                flexShrink: 0,
              }}
            >
              your edits
            </div>
            <div
              style={{
                flex: 1,
                height: "1px",
                background: "var(--border-color)",
              }}
            />
          </div>
        </div>

        {/* After */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: "0.6875rem",
              fontWeight: 600,
              color: "var(--accent-gold)",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              marginBottom: "0.625rem",
            }}
          >
            With your voice
          </div>
          <div
            style={{
              padding: "1rem 1.125rem",
              borderRadius: "8px",
              border: "1px solid var(--accent-gold)",
              background: "#FBF6EC",
              boxShadow: "0 2px 8px rgba(184, 134, 11, 0.06)",
            }}
          >
            <div
              style={{
                display: "inline-block",
                fontSize: "0.625rem",
                fontWeight: 600,
                padding: "0.125rem 0.5rem",
                borderRadius: "4px",
                background: "var(--cat-grammar-bg)",
                color: "var(--cat-grammar)",
                marginBottom: "0.625rem",
              }}
            >
              Grammar
            </div>
            <p
              style={{
                fontSize: "0.8125rem",
                color: "var(--text-secondary)",
                lineHeight: 1.65,
                margin: 0,
              }}
            >
              Your present perfect in paragraph three is spot on - well done!
              Now look at{" "}
              <span
                style={{
                  background: "var(--cat-grammar-bg)",
                  padding: "0.0625rem 0.25rem",
                  borderRadius: "3px",
                  fontStyle: "italic",
                }}
              >
                &quot;the company have decided&quot;
              </span>{" "}
              in paragraph two. &quot;Company&quot; is one thing, so it wants
              &quot;has.&quot; You clearly know the rule - just keep an eye on
              collective nouns and you are golden.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Privacy strip                                                      */
/* ------------------------------------------------------------------ */

function PrivacyStrip() {
  return (
    <div
      className="flex flex-col md:flex-row"
      style={{
        gap: "1rem",
        margin: "1.75rem 0",
        padding: "1.25rem 1.5rem",
        background: "var(--bg-card)",
        border: "0.5px solid var(--border-color)",
        borderRadius: "12px",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: "0.625rem", flex: 1 }}>
        <div style={{ flexShrink: 0, marginTop: "1px" }}>
          <ShieldIcon />
        </div>
        <div>
          <div style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#4A6B3A", marginBottom: "0.25rem" }}>
            Student data stays on your device
          </div>
          <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", lineHeight: 1.55, margin: 0 }}>
            Only your corrections and the original AI feedback are used. Student
            essays, names, and scores never leave your computer.
          </p>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "flex-start", gap: "0.625rem", flex: 1 }}>
        <div style={{ flexShrink: 0, marginTop: "1px" }}>
          <OptionalIcon />
        </div>
        <div>
          <div style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.25rem" }}>
            Completely optional
          </div>
          <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", lineHeight: 1.55, margin: 0 }}>
            Many teachers are happy with the default feedback style. You only need
            this if you want GemmPen to match your personal tone.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Icons                                                             */
/* ------------------------------------------------------------------ */

function PenIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M9.5 2.5L11.5 4.5M2 12L2.5 9.5L10 2L12 4L3.5 12.5L2 12Z"
        stroke="var(--accent-gold)"
        strokeWidth="0.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path
        d="M9 1.5L3 4.5V8.25C3 12.075 5.565 15.6225 9 16.5C12.435 15.6225 15 12.075 15 8.25V4.5L9 1.5Z"
        fill="#DEE8D4"
        stroke="#4A6B3A"
        strokeWidth="0.75"
        strokeLinejoin="round"
      />
      <path
        d="M6.5 9L8 10.5L11.5 7"
        stroke="#4A6B3A"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function OptionalIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="7" stroke="var(--text-muted)" strokeWidth="0.85" fill="none"/>
      <path d="M9 5.5V10" stroke="var(--text-muted)" strokeWidth="1" strokeLinecap="round"/>
      <circle cx="9" cy="12.5" r="0.65" fill="var(--text-muted)"/>
    </svg>
  );
}

