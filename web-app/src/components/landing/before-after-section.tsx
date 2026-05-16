"use client";

import type { ReactNode } from "react";
import { useState } from "react";

export function BeforeAfterSection() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { label: "Pattern recognition", icon: "search" },
    { label: "Argument analysis", icon: "list-check" },
    { label: "Tone adaptation", icon: "adjustments-horizontal" },
  ];

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "760px",
        marginBottom: "2.5rem",
      }}
    >
      <h2
        style={{
          fontFamily: "var(--font-cormorant), Georgia, serif",
          fontSize: "1.375rem",
          fontWeight: 500,
          color: "var(--text-primary)",
          textAlign: "center",
          marginBottom: "1.25rem",
        }}
      >
        What personalization actually changes
      </h2>

      {/* Tab bar */}
      <div
        className="flex items-center justify-center"
        style={{ gap: "0.5rem", marginBottom: "1.25rem", flexWrap: "wrap" }}
      >
        {tabs.map((tab, i) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(i)}
            style={{
              padding: "0.5rem 0.875rem",
              borderRadius: "16px",
              border: activeTab === i
                ? "1px solid var(--accent-gold)"
                : "0.5px solid var(--border-color)",
              background: activeTab === i ? "#FDF3DC" : "var(--bg-card)",
              color: activeTab === i ? "var(--accent-gold)" : "var(--text-secondary)",
              fontSize: "0.75rem",
              fontWeight: activeTab === i ? 600 : 500,
              cursor: "pointer",
              transition: "all 0.15s ease",
              fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
              minHeight: "44px",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 0: Pattern Recognition */}
      {activeTab === 0 && (
        <div className="flex flex-col md:flex-row" style={{ gap: "1rem" }}>
          <div
            className="flex-1"
            style={{
              background: "var(--bg-body)",
              border: "1px dashed var(--border-color)",
              borderRadius: "var(--radius-card)",
              padding: "1.25rem",
            }}
          >
            <span style={labelBaseStyle}>Base Model</span>
            <p style={textBaseStyle}>
              &ldquo;Your grammar needs improvement in several areas. Try to use more varied
              sentence structures and work on subject-verb agreement. Consider expanding your
              vocabulary with more precise word choices. Your arguments could be more clearly
              structured with better use of connectives.&rdquo;
            </p>
          </div>
          <div
            className="flex-1"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--accent-gold)",
              borderRadius: "var(--radius-card)",
              padding: "1.25rem",
            }}
          >
            <span style={labelGoldStyle}>Fine-tuned</span>
            <ComparisonBadge color="grammar">Finds the pattern behind the errors</ComparisonBadge>
            <p style={textTunedStyle}>
              &ldquo;You made the same grammar mistake{" "}
              <HighlightGold>four times</HighlightGold> in your text.
              Here is one of them:
            </p>
            <div style={quoteBlockStyle}>
              &ldquo;there <HighlightError>is</HighlightError> also concerns about data privacy.&rdquo;
            </div>
            <p style={{ ...textTunedStyle, fontStyle: "italic", color: "var(--accent-gold)", marginTop: "0.25rem" }}>
              Read it out loud. Can you hear it?
            </p>
            <p style={{ ...textTunedStyle, marginTop: "0.5rem" }}>
              The subject is &lsquo;concerns&rsquo; - that is plural. What verb form
              does a plural subject need? Once you spot this pattern,{" "}
              <HighlightGold>four errors in your text disappear at once.</HighlightGold>&rdquo;
            </p>
          </div>
        </div>
      )}

      {/* Tab 1: Argument Analysis */}
      {activeTab === 1 && (
        <div className="flex flex-col md:flex-row" style={{ gap: "1rem" }}>
          <div
            className="flex-1"
            style={{
              background: "var(--bg-body)",
              border: "1px dashed var(--border-color)",
              borderRadius: "var(--radius-card)",
              padding: "1.25rem",
            }}
          >
            <span style={labelBaseStyle}>Base Model</span>
            <p style={textBaseStyle}>
              &ldquo;Your arguments are partially developed. Some arguments would benefit from
              supporting evidence or examples. Try to provide more specific examples to support your
              claims. The overall structure of your comment could be improved with clearer
              transitions between arguments.&rdquo;
            </p>
          </div>
          <div
            className="flex-1"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--accent-gold)",
              borderRadius: "var(--radius-card)",
              padding: "1.25rem",
            }}
          >
            <span style={labelGoldStyle}>Fine-tuned</span>
            <ComparisonBadge color="connectives">Scores each argument individually</ComparisonBadge>
            <p style={textTunedStyle}>&ldquo;Your argument structure scores:</p>
            <div style={{ margin: "0.5rem 0", fontSize: "0.8125rem" }}>
              <ArgRow label="Arg 1" text="AI reduces repetitive tasks" score="3/3" pass />
              <ArgRow label="Arg 2" text="Workers can focus on creativity" score="0/3" pass={false} />
              <ArgRow label="Arg 3" text="Companies save money" score="3/3" pass />
            </div>
            <p style={{ ...textTunedStyle, marginTop: "0.5rem" }}>
              Argument 2 has a claim and a reason, but{" "}
              <HighlightGold>the example is not yet there</HighlightGold>. Without an example,
              the rubric gives 0 points, even though the idea is good.
            </p>
            <div style={quoteBlockStyle}>
              &ldquo;Workers can focus on creative tasks because AI handles the boring parts.&rdquo;
            </div>
            <p style={{ ...textTunedStyle, fontStyle: "italic", color: "var(--accent-gold)", marginTop: "0.25rem" }}>
              Can you think of one real company or job where this already happens?&rdquo;
            </p>
          </div>
        </div>
      )}

      {/* Tab 2: Tone Adaptation */}
      {activeTab === 2 && (
        <div className="flex flex-col md:flex-row" style={{ gap: "1rem" }}>
          <div
            className="flex-1"
            style={{
              background: "var(--bg-body)",
              border: "1px dashed var(--border-color)",
              borderRadius: "var(--radius-card)",
              padding: "1.25rem",
            }}
          >
            <span style={labelBaseStyle}>Base Model</span>
            <p style={{
              fontSize: "0.6875rem",
              color: "var(--text-muted)",
              lineHeight: 1.5,
              marginBottom: "0.5rem",
              fontStyle: "italic",
            }}>
              Same feedback for every student level:
            </p>
            <p style={textBaseStyle}>
              &ldquo;Your vocabulary shows room for improvement. Try to use more varied
              and precise word choices. Work on distinguishing between similar words to
              improve clarity. Practice using academic vocabulary in your writing.&rdquo;
            </p>
          </div>
          <div
            className="flex-1"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--accent-gold)",
              borderRadius: "var(--radius-card)",
              padding: "1.25rem",
            }}
          >
            <span style={labelGoldStyle}>Fine-tuned</span>
            <ComparisonBadge color="vocabulary">Adapts to student level</ComparisonBadge>
            {/* Struggling student */}
            <div
              style={{
                borderRadius: "6px",
                padding: "0.625rem 0.75rem",
                background: "var(--cat-grammar-bg)",
                border: "0.5px solid var(--cat-grammar-border)",
                marginBottom: "0.5rem",
              }}
            >
              <span style={{
                fontSize: "0.6875rem",
                fontWeight: 600,
                color: "var(--cat-grammar)",
                display: "block",
                marginBottom: "0.25rem",
              }}>
                4/15 - struggling student
              </span>
              <p style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
                &ldquo;You mix up basic words throughout your text.{" "}
                &lsquo;<HighlightError>over</HighlightError>&rsquo; instead of &lsquo;our.&rsquo;{" "}
                &lsquo;<HighlightError>live</HighlightError>&rsquo; instead of &lsquo;life.&rsquo;{" "}
                Each swap changes the meaning. Your reader has to stop and guess what you meant.&rdquo;
              </p>
            </div>
            {/* Strong student */}
            <div
              style={{
                borderRadius: "6px",
                padding: "0.625rem 0.75rem",
                background: "var(--cat-sentence-bg)",
                border: "0.5px solid var(--cat-sentence-border)",
              }}
            >
              <span style={{
                fontSize: "0.6875rem",
                fontWeight: 600,
                color: "var(--cat-sentence)",
                display: "block",
                marginBottom: "0.25rem",
              }}>
                11/15 - strong student
              </span>
              <p style={{ fontSize: "0.8125rem", color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
                &ldquo;Your vocabulary is strong overall. One pattern to polish: you write
                &lsquo;the <HighlightGold>forced</HighlightGold> usage&rsquo; - try
                &lsquo;mandatory adoption&rsquo; for a more academic register.{" "}
                <span style={{ color: "var(--cat-sentence)", fontWeight: 500 }}>
                  Small shift, big impact on your score.
                </span>&rdquo;
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Takeaway */}
      <div
        style={{
          marginTop: "0.75rem",
          padding: "0.625rem 1rem",
          background: "var(--badge-bg)",
          borderLeft: "3px solid var(--accent-gold)",
          borderRadius: "0 var(--radius-card) var(--radius-card) 0",
          fontSize: "0.75rem",
          color: "var(--text-secondary)",
          lineHeight: 1.6,
        }}
      >
        {activeTab === 0 && (
          <>
            <strong style={{ fontWeight: 600, color: "var(--text-primary)" }}>The difference: </strong>
            The base model identifies the category. The fine-tuned model finds one repeating pattern,
            quotes the student&apos;s own text, and asks a question instead of giving the answer.
            Fix one rule, fix four errors.
          </>
        )}
        {activeTab === 1 && (
          <>
            <strong style={{ fontWeight: 600, color: "var(--text-primary)" }}>The difference: </strong>
            The base model flags the issue. The fine-tuned model
            shows <em>which</em> argument, <em>what</em> is not yet there, and asks the student to
            complete it, turning a vague comment into a concrete task.
          </>
        )}
        {activeTab === 2 && (
          <>
            <strong style={{ fontWeight: 600, color: "var(--text-primary)" }}>The difference: </strong>
            The base model gives the same structure to every student. The fine-tuned
            model is direct with struggling students (no fake praise) and shows strong students the
            exact upgrade path to the next level.
          </>
        )}
      </div>
    </div>
  );
}

/* Shared styles */

const labelBaseStyle: React.CSSProperties = {
  fontSize: "0.6875rem",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "1px",
  color: "var(--text-muted)",
  marginBottom: "0.75rem",
  display: "block",
};

const labelGoldStyle: React.CSSProperties = {
  fontSize: "0.6875rem",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "1px",
  color: "var(--accent-gold)",
  marginBottom: "0.5rem",
  display: "block",
};

const textBaseStyle: React.CSSProperties = {
  fontSize: "0.8125rem",
  color: "var(--text-secondary)",
  lineHeight: 1.6,
  fontStyle: "italic",
};

const textTunedStyle: React.CSSProperties = {
  fontSize: "0.8125rem",
  color: "var(--text-secondary)",
  lineHeight: 1.6,
  margin: 0,
};

const quoteBlockStyle: React.CSSProperties = {
  fontFamily: "var(--font-dm-sans), monospace",
  fontSize: "0.8125rem",
  background: "var(--bg-body)",
  padding: "0.5rem 0.75rem",
  borderRadius: "4px",
  border: "0.5px solid var(--border-color)",
  margin: "0.5rem 0 0.25rem",
  color: "var(--text-primary)",
  lineHeight: 1.6,
};

function HighlightGold({ children }: { children: ReactNode }) {
  return (
    <span
      style={{
        background: "#FDF3DC",
        padding: "1px 4px",
        borderRadius: "3px",
        color: "var(--accent-gold)",
        fontWeight: 600,
      }}
    >
      {children}
    </span>
  );
}

function HighlightError({ children }: { children: ReactNode }) {
  return (
    <span
      style={{
        background: "var(--cat-grammar-bg)",
        padding: "1px 4px",
        borderRadius: "3px",
        color: "var(--cat-grammar)",
        fontWeight: 600,
        textDecoration: "underline wavy var(--cat-grammar)",
        textUnderlineOffset: "3px",
      }}
    >
      {children}
    </span>
  );
}

function ComparisonBadge({ children, color }: { children: ReactNode; color: string }) {
  const colorMap: Record<string, { bg: string; text: string }> = {
    grammar: { bg: "var(--cat-grammar-bg)", text: "var(--cat-grammar)" },
    vocabulary: { bg: "var(--cat-vocabulary-bg)", text: "var(--cat-vocabulary)" },
    sentence: { bg: "var(--cat-sentence-bg)", text: "var(--cat-sentence)" },
    connectives: { bg: "var(--cat-connectives-bg)", text: "var(--cat-connectives)" },
  };
  const c = colorMap[color] || colorMap.grammar;
  return (
    <span
      style={{
        display: "inline-block",
        fontSize: "0.6875rem",
        fontWeight: 600,
        padding: "0.2rem 0.625rem",
        borderRadius: "12px",
        background: c.bg,
        color: c.text,
        marginBottom: "0.625rem",
      }}
    >
      {children}
    </span>
  );
}

function ArgRow({ label, text, score, pass }: { label: string; text: string; score: string; pass: boolean }) {
  return (
    <div
      className="flex items-center"
      style={{
        gap: "0.5rem",
        padding: "0.25rem 0.5rem",
        borderRadius: "4px",
        background: pass ? "var(--cat-sentence-bg)" : "var(--cat-grammar-bg)",
        marginBottom: "0.25rem",
        fontSize: "0.8125rem",
      }}
    >
      <span style={{ color: "var(--text-muted)", fontSize: "0.75rem", fontWeight: 500, minWidth: "2.5rem" }}>
        {label}
      </span>
      <span style={{ flex: 1, color: "var(--text-secondary)" }}>{text}</span>
      <span
        style={{
          fontWeight: 600,
          color: pass ? "var(--cat-sentence)" : "var(--cat-grammar)",
          fontSize: "0.75rem",
        }}
      >
        {score}
      </span>
    </div>
  );
}
