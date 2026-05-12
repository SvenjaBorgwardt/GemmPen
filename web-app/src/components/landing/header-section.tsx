export function HeaderSection() {
  return (
    <header
      className="flex flex-col sm:flex-row items-center justify-between w-full gap-3"
      style={{
        maxWidth: "1100px",
        marginBottom: "3.5rem",
      }}
    >
      <span
        className="flex items-center"
        style={{ gap: "10px" }}
      >
        <img
          src="/gemmpen-logo.webp"
          alt="GemmPen"
          style={{ height: "36px", width: "auto" }}
        />
        <span className="flex flex-col">
          <span
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "1.5rem",
              fontWeight: 600,
              color: "var(--text-primary)",
              lineHeight: 1.2,
            }}
          >
            GemmPen
          </span>
          <span
            style={{
              fontSize: "0.625rem",
              color: "var(--text-muted)",
              letterSpacing: "0.3px",
            }}
          >
            by Svenja Borgwardt
          </span>
        </span>
      </span>
      <span
        style={{
          fontSize: "0.6875rem",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "1.5px",
          color: "var(--text-muted)",
        }}
      >
        Built with Gemma 4 + Unsloth
      </span>
    </header>
  );
}
