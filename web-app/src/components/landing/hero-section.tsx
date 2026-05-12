import Link from "next/link";

export function HeroSection() {
  return (
    <>
      <h1
        className="mb-4 md:mb-7"
        style={{
          fontFamily: "var(--font-cormorant), Georgia, serif",
          fontSize: "clamp(2.5rem, 5.5vw, 3.75rem)",
          fontWeight: 500,
          color: "var(--text-primary)",
          lineHeight: 1.1,
          letterSpacing: "-0.8px",
          maxWidth: "720px",
        }}
      >
        Every student deserves feedback that actually helps them learn.
      </h1>
      <p
        style={{
          fontSize: "1.0625rem",
          color: "var(--text-secondary)",
          lineHeight: 1.7,
          maxWidth: "620px",
          marginBottom: "0.75rem",
        }}
      >
        GemmPen reads handwritten exams, scores them against your rubric, and
        gives each student personal feedback with exercises built from their
        own mistakes. And it adapts to your voice over time.
      </p>
      <p
        className="mb-5 md:mb-10"
        style={{
          fontSize: "0.9375rem",
          color: "var(--text-muted)",
          lineHeight: 1.6,
          maxWidth: "620px",
        }}
      >
        No internet. No cloud. No student data leaves the classroom.
      </p>
    </>
  );
}

export function CtaButton() {
  return (
    <Link
      href="/app/upload"
      className="cta-btn"
      style={{
        display: "inline-block",
        fontSize: "0.9375rem",
        fontWeight: 600,
        padding: "0.875rem 2.5rem",
        borderRadius: "6px",
        background: "var(--btn-primary)",
        color: "var(--btn-primary-text)",
        textDecoration: "none",
        letterSpacing: "0.2px",
        marginBottom: "1.25rem",
      }}
    >
      Try the demo
    </Link>
  );
}

export function BadgeRow() {
  const items = [
    "Runs offline",
    "Works on mobile",
    "Any language",
    "Any subject",
    "Data stays on your device",
    "Free to use",
  ];

  return (
    <p
      style={{
        fontSize: "0.75rem",
        color: "var(--text-muted)",
        letterSpacing: "0.2px",
        marginBottom: "0",
      }}
    >
      {items.map((t, i) => (
        <span key={t}>
          {t}
          {i < items.length - 1 && (
            <span
              style={{
                display: "inline-block",
                width: "3px",
                height: "3px",
                borderRadius: "50%",
                background: "var(--border-color)",
                margin: "0 0.625rem",
                verticalAlign: "middle",
              }}
            />
          )}
        </span>
      ))}
    </p>
  );
}
