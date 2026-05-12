import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#F9F6F1",
        fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <p
        style={{
          fontSize: "4rem",
          fontFamily: "var(--font-cormorant), Georgia, serif",
          fontWeight: 600,
          color: "#B8860B",
          margin: 0,
          lineHeight: 1,
        }}
      >
        404
      </p>
      <h1
        style={{
          fontFamily: "var(--font-cormorant), Georgia, serif",
          fontSize: "1.75rem",
          fontWeight: 500,
          color: "#3D2E22",
          margin: "0.75rem 0",
        }}
      >
        Page not found
      </h1>
      <p
        style={{
          fontSize: "0.9375rem",
          color: "#6B5D52",
          maxWidth: "24rem",
          lineHeight: 1.7,
          marginBottom: "1.5rem",
        }}
      >
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        style={{
          fontSize: "0.875rem",
          fontWeight: 500,
          padding: "0.625rem 1.5rem",
          background: "#B8860B",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          textDecoration: "none",
        }}
      >
        Back to GemmPen
      </Link>
    </div>
  );
}
