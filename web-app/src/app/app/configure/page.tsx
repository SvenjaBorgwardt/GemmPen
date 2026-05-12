"use client";

import { useState } from "react";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { PresetCard } from "@/components/preset-card";
import { Toggle } from "@/components/toggle";
import { ProcessingView } from "@/components/processing-view";
import { rubricPresets } from "@/lib/mock-data";
import { setStoredGradingSystem, type GradingSystemId } from "@/lib/grading";

type CategoryRow = {
  id: string;
  name: string;
  description: string;
  on: boolean;
  subToggles?: { label: string; on: boolean }[];
};

const presetCategories: Record<string, CategoryRow[]> = {
  "english-b1b2": [
    {
      id: "spelling",
      name: "Spelling",
      description: "Orthographic correctness, consistent spelling patterns (optional - enable if your rubric includes spelling)",
      on: false,
    },
    {
      id: "grammar",
      name: "Grammar",
      description: "Morphological and syntactic correctness across all structures",
      on: true,
      subToggles: [
        { label: "Tenses", on: true },
        { label: "Subject-verb agreement", on: true },
        { label: "Articles", on: true },
        { label: "Prepositions", on: true },
        { label: "Pronouns", on: true },
      ],
    },
    {
      id: "syntax",
      name: "Sentence Structure / Syntax",
      description: "Sentence variety, complexity, cohesion, run-on avoidance",
      on: true,
    },
    {
      id: "gen-vocab",
      name: "General Vocabulary",
      description: "Range, precision, and appropriateness of word choice",
      on: true,
    },
    {
      id: "domain-vocab",
      name: "Domain Vocabulary & Connectives",
      description: "Subject-specific terms (AI, automation...) and linking devices (however, furthermore...)",
      on: true,
    },
    {
      id: "content",
      name: "Content / Arguments",
      description: "Claim-Reason-Example completeness, argument strength and ordering",
      on: true,
    },
    {
      id: "structure",
      name: "Text Structure",
      description: "Introduction, bridge, conclusion, paragraph organization",
      on: true,
    },
  ],
  "economics-essay": [
    {
      id: "thesis",
      name: "Thesis & Position",
      description: "Clear central argument, well-defined economic stance",
      on: true,
    },
    {
      id: "argumentation",
      name: "Argumentation & Reasoning",
      description: "Logical chain of reasoning, use of economic models and theories",
      on: true,
      subToggles: [
        { label: "Cause-effect reasoning", on: true },
        { label: "Cost-benefit analysis", on: true },
        { label: "Counter-arguments", on: true },
      ],
    },
    {
      id: "data-use",
      name: "Use of Data & Evidence",
      description: "Integration of statistics, graphs, case studies, and real-world examples",
      on: true,
    },
    {
      id: "technical-terms",
      name: "Technical Vocabulary",
      description: "Correct use of economic terms (GDP, inflation, elasticity, market failure...)",
      on: true,
      subToggles: [
        { label: "Micro terms", on: true },
        { label: "Macro terms", on: true },
        { label: "Policy terms", on: true },
      ],
    },
    {
      id: "structure",
      name: "Essay Structure",
      description: "Introduction with context, body paragraphs, balanced evaluation, conclusion",
      on: true,
    },
    {
      id: "evaluation",
      name: "Critical Evaluation",
      description: "Weighing perspectives, acknowledging limitations, nuanced judgment",
      on: true,
    },
  ],
  "biology-lab": [
    {
      id: "hypothesis",
      name: "Hypothesis & Research Question",
      description: "Clear, testable hypothesis with identified variables",
      on: true,
    },
    {
      id: "methodology",
      name: "Methodology & Procedure",
      description: "Reproducible method, controlled variables, appropriate sample size",
      on: true,
      subToggles: [
        { label: "Independent variable", on: true },
        { label: "Dependent variable", on: true },
        { label: "Control group", on: true },
        { label: "Safety measures", on: true },
      ],
    },
    {
      id: "data-recording",
      name: "Data Recording & Presentation",
      description: "Accurate tables, appropriate graphs, correct units and labels",
      on: true,
    },
    {
      id: "analysis",
      name: "Analysis & Interpretation",
      description: "Pattern identification, statistical reasoning, relation to hypothesis",
      on: true,
    },
    {
      id: "terminology",
      name: "Scientific Terminology",
      description: "Correct use of biological terms (mitosis, osmosis, enzyme, allele...)",
      on: true,
    },
    {
      id: "evaluation",
      name: "Evaluation & Conclusion",
      description: "Error analysis, reliability, suggestions for improvement, ecological context",
      on: true,
    },
  ],
  custom: [
    {
      id: "custom1",
      name: "Custom Category 1",
      description: "Your rubric here",
      on: true,
    },
    {
      id: "custom2",
      name: "Custom Category 2",
      description: "Your rubric here",
      on: true,
    },
  ],
};

type GradingSystem = {
  id: string;
  name: string;
  icon: string;
  description: string;
  scale: string;
};

const gradingSystems: GradingSystem[] = [
  {
    id: "nrw-15",
    name: "German Abitur",
    icon: "DE",
    description: "15-point scale used in German upper secondary",
    scale: "0 - 15 points",
  },
  {
    id: "us-letter",
    name: "US Letter Grades",
    icon: "US",
    description: "Letter grades with plus and minus modifiers",
    scale: "A+ to F",
  },
  {
    id: "uk-gcse",
    name: "UK GCSE / A-Level",
    icon: "UK",
    description: "Grade bands used in British secondary exams",
    scale: "A* to U",
  },
  {
    id: "percentage",
    name: "Percentage",
    icon: "%",
    description: "Universal percentage scale for any context",
    scale: "0 - 100%",
  },
];

export default function ConfigurePage() {
  const [selectedPreset, setSelectedPreset] = useState("english-b1b2");
  const [categories, setCategories] = useState<CategoryRow[]>(presetCategories["english-b1b2"]);
  const [selectedGrading, setSelectedGrading] = useState<GradingSystemId>("nrw-15");

  const handleGradingChange = (id: GradingSystemId) => {
    setSelectedGrading(id);
    setStoredGradingSystem(id);
  };
  const [processing, setProcessing] = useState(false);

  const handlePresetChange = (presetId: string) => {
    setSelectedPreset(presetId);
    if (presetCategories[presetId]) {
      setCategories(presetCategories[presetId].map((c) => ({
        ...c,
        subToggles: c.subToggles ? c.subToggles.map((s) => ({ ...s })) : undefined,
      })));
    }
  };

  const selectedCount = categories.filter((c) => c.on).length;

  const toggleRow = (id: string) =>
    setCategories((rows) =>
      rows.map((r) => (r.id === id ? { ...r, on: !r.on } : r)),
    );

  const toggleSub = (rowId: string, label: string) =>
    setCategories((rows) =>
      rows.map((r) => {
        if (r.id !== rowId || !r.subToggles) return r;
        const updatedSubs = r.subToggles.map((s) =>
          s.label === label ? { ...s, on: !s.on } : s,
        );
        const allSubsOff = updatedSubs.every((s) => !s.on);
        return { ...r, on: allSubsOff ? false : r.on, subToggles: updatedSubs };
      }),
    );

  return (
    <>
      <Nav active="configure" />
      <main
        className="px-4 md:px-12"
        style={{
          maxWidth: "880px",
          margin: "0 auto",
          paddingBottom: processing ? "0.5rem" : "4rem",
        }}
      >
        {processing ? (
          <ProcessingView disabledCategories={categories.filter((c) => !c.on).map((c) => c.name)} />
        ) : (
          <>
            <Link
              href="/app/upload"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.375rem",
                fontSize: "0.8125rem",
                color: "var(--text-muted)",
                textDecoration: "none",
                marginBottom: "1rem",
              }}
            >
              <span style={{ fontSize: "1rem", lineHeight: 1 }}>&larr;</span>
              Back to Upload
            </Link>
            <h1
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "2rem",
                fontWeight: 500,
                color: "var(--text-primary)",
                marginBottom: "0.375rem",
              }}
            >
              Configure Assessment
            </h1>
            <p
              style={{
                fontSize: "0.9375rem",
                color: "var(--text-secondary)",
                marginBottom: "2rem",
                lineHeight: 1.5,
              }}
            >
              Choose a preset rubric or customize which categories the AI should
              evaluate. GemmPen works with any grading system.
            </p>

            <SectionLabel>Rubric Preset</SectionLabel>
            <div
              className="grid grid-cols-2 md:grid-cols-4"
              style={{
                gap: "0.75rem",
                marginBottom: "2.25rem",
              }}
            >
              {rubricPresets.map((p) => (
                <PresetCard
                  key={p.id}
                  icon={p.icon}
                  name={p.name}
                  description={p.description}
                  selected={selectedPreset === p.id}
                  onClick={() => handlePresetChange(p.id)}
                />
              ))}
            </div>

            {selectedPreset === "custom" && (
              <div style={{ marginTop: "-1.25rem", marginBottom: "2.25rem", maxWidth: "600px" }}>
                <textarea
                  placeholder="Describe your subject and what you want to evaluate. For example: 'German A2 writing exam, focus on grammar, vocabulary range, and text coherence.'"
                  rows={3}
                  style={{
                    width: "100%",
                    padding: "0.75rem 1rem",
                    borderRadius: "var(--radius-card)",
                    border: "1px solid var(--border-color)",
                    background: "var(--bg-card)",
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: "1rem",
                    color: "var(--text-primary)",
                    resize: "vertical",
                    outline: "none",
                  }}
                />
                <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>
                  In the full version, GemmPen generates matching evaluation categories from your description.
                </p>
              </div>
            )}

            <SectionLabel>Evaluation Categories</SectionLabel>
            <div
              style={{
                background: "var(--bg-card)",
                border: "0.5px solid var(--border-color)",
                borderRadius: "var(--radius-card)",
                padding: "1.5rem",
                marginBottom: "2.25rem",
              }}
            >
              {categories.map((row, idx) => (
                <div
                  key={row.id}
                  className="flex items-start justify-between"
                  style={{
                    padding: "0.875rem 0",
                    borderBottom:
                      idx < categories.length - 1
                        ? "0.5px solid #EDE8E0"
                        : "none",
                  }}
                >
                  <div style={{ flex: 1, paddingRight: "1rem" }}>
                    <div
                      style={{
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        color: "var(--text-primary)",
                        marginBottom: "3px",
                      }}
                    >
                      {row.name}
                    </div>
                    <div
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--text-muted)",
                        lineHeight: 1.4,
                      }}
                    >
                      {row.description}
                    </div>
                    {row.subToggles && row.on && (
                      <div
                        className="flex flex-wrap"
                        style={{ gap: "6px", marginTop: "0.5rem" }}
                      >
                        {row.subToggles.map((s) => (
                          <button
                            key={s.label}
                            type="button"
                            onClick={() => toggleSub(row.id, s.label)}
                            style={{
                              fontSize: "0.6875rem",
                              padding: "0.5rem 0.625rem",
                              borderRadius: "12px",
                              background: s.on
                                ? "var(--badge-bg)"
                                : "#F0ECE4",
                              color: s.on
                                ? "var(--badge-text)"
                                : "var(--text-muted)",
                              textDecoration: s.on ? "none" : "line-through",
                              cursor: "pointer",
                              border: "none",
                              fontFamily: "inherit",
                              minHeight: "44px",
                            }}
                          >
                            {s.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <Toggle
                    on={row.on}
                    onChange={() => toggleRow(row.id)}
                    ariaLabel={row.name}
                  />
                </div>
              ))}
            </div>

            <SectionLabel>Grading System</SectionLabel>
            <div
              className="grid grid-cols-2 md:grid-cols-4"
              style={{
                gap: "0.75rem",
                marginBottom: "2.25rem",
              }}
            >
              {gradingSystems.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => handleGradingChange(g.id as GradingSystemId)}
                  style={{
                    padding: "1rem",
                    borderRadius: "var(--radius-card)",
                    border: selectedGrading === g.id
                      ? "0.5px solid var(--accent-gold)"
                      : "0.5px solid var(--border-color)",
                    boxShadow: selectedGrading === g.id
                      ? "0 0 0 1.5px var(--accent-gold)"
                      : "none",
                    background: "var(--bg-card)",
                    cursor: "pointer",
                    textAlign: "left",
                    fontFamily: "inherit",
                    transition: "border-color 0.15s, box-shadow 0.15s",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.6875rem",
                      fontWeight: 700,
                      letterSpacing: "1px",
                      color: selectedGrading === g.id
                        ? "var(--accent-gold)"
                        : "var(--text-muted)",
                      marginBottom: "0.375rem",
                    }}
                  >
                    {g.icon}
                  </div>
                  <div
                    style={{
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      color: "var(--text-primary)",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {g.name}
                  </div>
                  <div
                    style={{
                      fontSize: "0.6875rem",
                      color: "var(--text-muted)",
                      lineHeight: 1.4,
                      marginBottom: "0.375rem",
                    }}
                  >
                    {g.description}
                  </div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      color: selectedGrading === g.id
                        ? "var(--accent-gold)"
                        : "var(--text-secondary)",
                    }}
                  >
                    {g.scale}
                  </div>
                </button>
              ))}
            </div>
            <p
              style={{
                fontSize: "0.75rem",
                color: "var(--text-muted)",
                lineHeight: 1.5,
                marginTop: "-1.25rem",
                marginBottom: "2.25rem",
              }}
            >
              Each category is scored independently on the selected scale. You can switch grading systems at any time without losing your category setup.
            </p>

            <div className="text-center" style={{ paddingTop: "0.5rem" }}>
              <p
                style={{
                  fontSize: "0.8125rem",
                  color: "var(--text-secondary)",
                  marginBottom: "1rem",
                }}
              >
                {`${selectedCount} of ${categories.length} categories selected · 21 exams loaded`}
              </p>
              <button
                type="button"
                onClick={() => setProcessing(true)}
                style={{
                  fontSize: "1rem",
                  fontWeight: 600,
                  padding: "1rem 3rem",
                  borderRadius: "var(--radius-card)",
                  background: "var(--btn-primary)",
                  color: "var(--btn-primary-text)",
                  border: "none",
                  cursor: "pointer",
                  letterSpacing: "0.3px",
                  fontFamily: "inherit",
                }}
              >
                Start AI Evaluation
              </button>
              <p
                style={{
                  fontSize: "0.75rem",
                  color: "var(--text-muted)",
                  marginTop: "0.625rem",
                }}
              >
                Estimated time: about 2 minutes for 21 exams
              </p>
            </div>
          </>
        )}
      </main>
    </>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontSize: "0.6875rem",
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "1.5px",
        color: "var(--text-muted)",
        marginBottom: "0.875rem",
      }}
    >
      {children}
    </p>
  );
}
