export function FooterSection() {
  return (
    <footer
      style={{
        width: "100%",
        background: "var(--bg-footer)",
        padding: "3rem 1.5rem",
        marginTop: "0",
      }}
    >
      <style>{`
        .footer-link {
          color: var(--bg-footer-muted);
          text-decoration: none;
          min-height: 44px;
          display: inline-flex;
          align-items: center;
          transition: color 0.2s ease;
        }
        .footer-link:hover { color: var(--bg-footer-text); }
        .footer-link-underline {
          text-decoration: underline;
          text-underline-offset: 3px;
          text-decoration-color: rgba(160, 148, 132, 0.4);
        }
      `}</style>
      <div
        className="flex flex-col items-center"
        style={{
          maxWidth: "880px",
          margin: "0 auto",
          gap: "1rem",
        }}
      >
        {/* Logo + name */}
        <span
          className="flex items-center"
          style={{ gap: "8px" }}
        >
          <img
            src="/gemmpen-logo.webp"
            alt="GemmPen"
            style={{ height: "20px", width: "auto", opacity: 0.6, filter: "brightness(1.8)" }}
          />
          <span
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "1.125rem",
              fontWeight: 600,
              color: "var(--bg-footer-text)",
              lineHeight: 1.2,
            }}
          >
            GemmPen
          </span>
        </span>

        {/* Links */}
        <div
          className="flex flex-wrap items-center justify-center"
          style={{
            gap: "0.5rem 1.25rem",
            fontSize: "0.8125rem",
          }}
        >
          <a
            href="https://ai.google.dev/gemma"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            Powered by Gemma 4
          </a>
          <span style={{ color: "var(--bg-footer-muted)", opacity: 0.3 }}>|</span>
          <a
            href="https://unsloth.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            Fine-tuned with Unsloth
          </a>
          <span style={{ color: "var(--bg-footer-muted)", opacity: 0.3 }}>|</span>
          <a
            href="https://www.kaggle.com/code/svenjaborgwardt/gemmpen-finetuning-gemma-4-e4b"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link footer-link-underline"
          >
            Kaggle Notebook
          </a>
        </div>

        {/* Social links */}
        <div
          className="flex items-center justify-center"
          style={{ gap: "1rem", marginTop: "0.25rem" }}
        >
          <a
            href="https://github.com/SvenjaBorgwardt/GemmPen"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
            aria-label="GitHub"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
          </a>
          <a
            href="mailto:svenja@borgwardt.me"
            className="footer-link"
            aria-label="Email"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/svenja-borgwardt-5581b03b4"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
            aria-label="LinkedIn"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect width="4" height="12" x="2" y="9" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
        </div>

        {/* Credit line */}
        <p
          style={{
            fontSize: "0.6875rem",
            color: "var(--bg-footer-muted)",
            opacity: 0.5,
            marginTop: "0.5rem",
          }}
        >
          Built by Svenja Borgwardt
        </p>
      </div>
    </footer>
  );
}
