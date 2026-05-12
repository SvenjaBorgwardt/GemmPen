import {
  HeaderSection,
  HeroSection,
  CtaButton,
  BadgeRow,
  StepsSection,
  BeforeAfterSection,
  FooterSection,
} from "@/components/landing";
import { ScrollReveal } from "@/components/landing/scroll-reveal";

export default function LandingPage() {
  return (
    <div
      className="flex flex-col items-center"
      style={{ minHeight: "100vh", background: "var(--bg-body)" }}
    >
      {/* Header */}
      <div style={{ width: "100%", padding: "2rem 1.5rem 0" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <HeaderSection />
        </div>
      </div>

      {/* Hero */}
      <main className="flex flex-col items-center w-full">
        <section
          className="flex flex-col items-center text-center"
          style={{
            maxWidth: "880px",
            padding: "3.5rem 1.5rem 2rem",
            margin: "0 auto",
          }}
        >
          <ScrollReveal>
            <HeroSection />
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <CtaButton />
          </ScrollReveal>
          <ScrollReveal delay={0.25}>
            <BadgeRow />
          </ScrollReveal>
        </section>

        {/* Steps - full-width warm band */}
        <section
          style={{
            width: "100%",
            background: "var(--bg-section-alt)",
            padding: "4.5rem 1.5rem",
            marginTop: "0",
          }}
        >
          <div
            className="flex flex-col items-center"
            style={{ maxWidth: "880px", margin: "0 auto" }}
          >
            <ScrollReveal>
              <h2
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "clamp(1.5rem, 3vw, 2rem)",
                  fontWeight: 500,
                  color: "var(--text-primary)",
                  marginBottom: "2rem",
                  letterSpacing: "-0.3px",
                  textAlign: "center",
                }}
              >
                How it works
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <StepsSection />
            </ScrollReveal>
          </div>
        </section>

        {/* Pull quote */}
        <section
          className="flex flex-col items-center text-center"
          style={{ maxWidth: "640px", padding: "4rem 1.5rem 3.5rem", margin: "0 auto" }}
        >
          <ScrollReveal>
            <p
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "clamp(1.25rem, 3vw, 1.75rem)",
                fontWeight: 400,
                fontStyle: "italic",
                color: "var(--text-secondary)",
                lineHeight: 1.5,
                maxWidth: "560px",
              }}
            >
              One device - even a phone. Any classroom. Every student
              gets feedback that meets them where they are.
            </p>
          </ScrollReveal>
        </section>

        {/* Before / After */}
        <section
          className="flex flex-col items-center"
          style={{ maxWidth: "880px", padding: "0 1.5rem 4rem", margin: "0 auto", width: "100%" }}
        >
          <ScrollReveal>
            <BeforeAfterSection />
          </ScrollReveal>
        </section>

        {/* Footer - dark band */}
        <FooterSection />
      </main>
    </div>
  );
}
