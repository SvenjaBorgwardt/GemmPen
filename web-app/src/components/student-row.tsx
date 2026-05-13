import Link from "next/link";
import { Student } from "@/lib/types";
import { toGrade, GradingSystemId } from "@/lib/grading";

const categoryShort: Record<string, string> = {
  grammar: "GRM",
  sentenceStructure: "SS",
  genVocabulary: "VOC",
  domainVocab: "CON",
};

const categoryFull: Record<string, string> = {
  grammar: "Grammar",
  sentenceStructure: "Sentence Structure",
  genVocabulary: "General Vocabulary",
  domainVocab: "Domain Vocab & Connectives",
};

const categoryOrder = [
  "genVocabulary",
  "domainVocab",
  "grammar",
  "sentenceStructure",
];

function barTone(score: number): "low" | "mid" | "high" {
  if (score <= 5) return "low";
  if (score <= 9) return "mid";
  return "high";
}

const toneColor: Record<"low" | "mid" | "high", string> = {
  low: "var(--bar-low)",
  mid: "var(--bar-mid)",
  high: "var(--bar-high)",
};

const categoryColor: Record<string, string> = {
  grammar: "var(--cat-grammar)",
  sentenceStructure: "var(--cat-sentence)",
  genVocabulary: "var(--cat-vocabulary)",
  domainVocab: "var(--cat-connectives)",
};

const detailSlugs = new Set(["alex-m", "jordan-k", "casey-r"]);

export function StudentRow({ student, gradingSystem = "nrw-15" }: { student: Student; gradingSystem?: GradingSystemId }) {
  const targetSlug = detailSlugs.has(student.slug) ? student.slug : "alex-m";
  const reviewHref = `/app/review/${targetSlug}`;
  const pdfHref = `/app/feedback/${targetSlug}`;
  const exHref = `/app/exercises/${targetSlug}`;

  const pct = (student.gradePoints / 15) * 100;
  const grade = toGrade(pct, gradingSystem);

  const ordered = categoryOrder
    .map((id) => student.categoryScores.find((s) => s.categoryId === id))
    .filter(
      (s): s is { categoryId: string; score: number; maxScore: number } =>
        Boolean(s),
    );

  return (
    <tr
      style={{
        background: "var(--bg-card)",
      }}
    >
      <td
        style={{
          padding: "0.875rem",
          borderTop: "0.5px solid var(--border-color)",
          borderBottom: "0.5px solid var(--border-color)",
          borderLeft: "0.5px solid var(--border-color)",
          borderRadius: "var(--radius-card) 0 0 var(--radius-card)",
          verticalAlign: "middle",
        }}
      >
        <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text-primary)" }}>
          {student.name}
        </span>
      </td>
      <td
        style={{
          padding: "0.875rem",
          borderTop: "0.5px solid var(--border-color)",
          borderBottom: "0.5px solid var(--border-color)",
          textAlign: "center",
          verticalAlign: "middle",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "1.375rem",
            fontWeight: 500,
            color: "var(--text-primary)",
            lineHeight: 1,
          }}
        >
          {grade.label}
        </div>
        <div style={{ fontSize: "0.6875rem", color: "var(--text-muted)", marginTop: "2px" }}>
          {grade.sublabel ?? ""}
        </div>
      </td>
      <td
        style={{
          padding: "0.875rem",
          borderTop: "0.5px solid var(--border-color)",
          borderBottom: "0.5px solid var(--border-color)",
          verticalAlign: "middle",
        }}
      >
        <div className="flex flex-col" style={{ gap: "0.25rem", minWidth: "180px" }}>
          {ordered.map((s) => {
            const percent = (s.score / s.maxScore) * 100;
            const tone = barTone(s.score);
            return (
              <div key={s.categoryId} className="flex items-center" style={{ gap: "0.375rem" }}>
                <span
                  title={categoryFull[s.categoryId] ?? s.categoryId}
                  style={{
                    fontSize: "0.5625rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    color: "var(--text-muted)",
                    width: "32px",
                    flexShrink: 0,
                  }}
                >
                  {categoryShort[s.categoryId] ?? s.categoryId.slice(0, 3)}
                </span>
                <div
                  className="flex-1"
                  style={{
                    height: "5px",
                    background: "var(--score-bar-bg)",
                    borderRadius: "3px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${percent}%`,
                      background: categoryColor[s.categoryId] ?? toneColor[tone],
                      borderRadius: "3px",
                    }}
                  />
                </div>
                <span
                  style={{
                    fontSize: "0.625rem",
                    fontWeight: 600,
                    color: "var(--text-secondary)",
                    width: "18px",
                    textAlign: "right",
                    flexShrink: 0,
                  }}
                >
                  {s.score}
                </span>
              </div>
            );
          })}
        </div>
      </td>
      <td
        style={{
          padding: "0.875rem",
          borderTop: "0.5px solid var(--border-color)",
          borderBottom: "0.5px solid var(--border-color)",
          textAlign: "center",
          verticalAlign: "middle",
        }}
      >
        <span
          className="inline-block"
          style={{
            fontSize: "0.6875rem",
            fontWeight: 500,
            padding: "3px 10px",
            borderRadius: "10px",
            background:
              student.status === "reviewed"
                ? "var(--status-reviewed-bg)"
                : "var(--status-pending-bg)",
            color:
              student.status === "reviewed"
                ? "var(--status-reviewed-text)"
                : "var(--status-pending-text)",
          }}
        >
          {student.status === "reviewed" ? "Reviewed" : "Pending"}
        </span>
      </td>
      <td
        style={{
          padding: "0.875rem",
          borderTop: "0.5px solid var(--border-color)",
          borderBottom: "0.5px solid var(--border-color)",
          borderRight: "0.5px solid var(--border-color)",
          borderRadius: "0 var(--radius-card) var(--radius-card) 0",
          verticalAlign: "middle",
        }}
      >
        <div className="flex" style={{ gap: "0.375rem" }}>
          <ActionLink href={reviewHref} label="View" />
          <ActionLink href={pdfHref} label="PDF" />
          {student.status === "reviewed" ? (
            <ActionLink href={exHref} label="Exercises" />
          ) : (
            <span
              title="Review this student first"
              style={{
                fontSize: "0.6875rem",
                fontWeight: 500,
                padding: "0.5rem 0.75rem",
                borderRadius: "5px",
                border: "0.5px solid var(--border-color)",
                background: "var(--bg-body)",
                color: "var(--text-muted)",
                whiteSpace: "nowrap",
                opacity: 0.5,
                cursor: "not-allowed",
                minHeight: "44px",
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              Exercises
            </span>
          )}
        </div>
      </td>
    </tr>
  );
}

function ActionLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      style={{
        fontSize: "0.6875rem",
        fontWeight: 500,
        padding: "0.5rem 0.75rem",
        borderRadius: "5px",
        border: "0.5px solid var(--border-color)",
        background: "var(--bg-body)",
        color: "var(--text-secondary)",
        textDecoration: "none",
        whiteSpace: "nowrap",
        minHeight: "44px",
        display: "inline-flex",
        alignItems: "center",
      }}
    >
      {label}
    </Link>
  );
}
