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
import { TechnicalDetails } from "@/components/technical-details";

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
          className="flex flex-col items-center text-center pt-6 md:pt-14 pb-4 md:pb-8 px-6"
          style={{
            maxWidth: "880px",
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
          className="py-8 md:py-18 px-6"
          style={{
            width: "100%",
            background: "var(--bg-section-alt)",
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
          className="flex flex-col items-center text-center py-8 md:py-16 px-6"
          style={{ maxWidth: "640px", margin: "0 auto" }}
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
          className="flex flex-col items-center pb-8 md:pb-16 px-6"
          style={{ maxWidth: "880px", margin: "0 auto", width: "100%" }}
        >
          <ScrollReveal>
            <BeforeAfterSection />
          </ScrollReveal>
        </section>

        {/* Under the hood - collapsible technical details */}
        <section
          className="flex flex-col items-center pb-8 md:pb-16 px-6"
          style={{ maxWidth: "880px", margin: "0 auto", width: "100%" }}
        >
          <ScrollReveal>
            <TechnicalDetails />
          </ScrollReveal>
        </section>

        {/* Footer - dark band */}
        <FooterSection />
      </main>
    </div>
  );
}
