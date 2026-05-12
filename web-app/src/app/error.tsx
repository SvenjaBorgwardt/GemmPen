"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg-body, #F9F6F1)",
        fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontFamily: "var(--font-cormorant), Georgia, serif",
          fontSize: "2rem",
          fontWeight: 500,
          color: "var(--text-primary, #3D2E22)",
          marginBottom: "0.75rem",
        }}
      >
        Something went sideways
      </h1>
      <p
        style={{
          fontSize: "0.9375rem",
          color: "var(--text-secondary, #6B5D52)",
          maxWidth: "28rem",
          lineHeight: 1.7,
          marginBottom: "1.5rem",
        }}
      >
        GemmPen ran into an unexpected issue. This does not affect your saved
        corrections or student data.
      </p>
      <button
        onClick={reset}
        style={{
          fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
          fontSize: "0.875rem",
          fontWeight: 500,
          padding: "0.625rem 1.5rem",
          background: "var(--accent-primary, #B8860B)",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Try again
      </button>
    </div>
  );
}
