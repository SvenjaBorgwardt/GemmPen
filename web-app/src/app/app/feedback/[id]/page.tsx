import { notFound } from "next/navigation";
import { Nav } from "@/components/nav";
import { PDFPage } from "@/components/pdf-page";
import { PdfToolbar } from "@/components/pdf-toolbar";
import { getDetailStudent } from "@/lib/mock-data";
import { CATEGORY_CSS_COLORS, CATEGORY_FEEDBACK_MAP } from "@/lib/constants";
import { getAnnotations, getPriority, getPotential, getDate } from "@/lib/student-annotations";
import type { CatKey, AnnotationSegment } from "@/lib/student-annotations";
import { QRCodeSVG } from "qrcode.react";
import { FeedbackSection } from "./feedback-section";
import { ScoresSection } from "./scores-section";

const catColor = CATEGORY_CSS_COLORS;
const categoryFeedbackMap = CATEGORY_FEEDBACK_MAP;

type Segment = { kind?: CatKey; markerNum?: number; text: string };

function buildSegments(line: string, annotations: AnnotationSegment[]): Segment[] {
  const segments: Segment[] = [{ text: line }];

  annotations.forEach((a) => {
    for (let i = segments.length - 1; i >= 0; i--) {
      const seg = segments[i];
      if (seg.kind) continue;
      const idx = seg.text.indexOf(a.text);
      if (idx < 0) continue;
      const before = seg.text.slice(0, idx);
      const match = seg.text.slice(idx, idx + a.text.length);
      const after = seg.text.slice(idx + a.text.length);
      const replacement: Segment[] = [];
      if (before) replacement.push({ text: before });
      replacement.push({ text: match, kind: a.kind, markerNum: a.markerNum });
      if (after) replacement.push({ text: after });
      segments.splice(i, 1, ...replacement);
      break;
    }
  });

  return segments;
}

export default async function FeedbackPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const detail = getDetailStudent(id);
  if (!detail) notFound();

  const annotations = getAnnotations(id);
  const priority = getPriority(id);
  const potential = getPotential(id);
  const date = getDate(id);

  const paragraphs = detail.transcript.split(/\n+/).filter(Boolean);

  return (
    <>
      <Nav active="class" />
      <div style={{ background: "#E8E3DA", minHeight: "100vh", paddingBottom: "2rem" }}>
        <PdfToolbar studentName={detail.name} />

        <PDFPage
          subTitle="Your Personal Feedback"
          rightTopLine={date}
          rightSubLine="English B1-B2 Writing"
          teacherLine="Reviewed by S. Borgwardt"
          pageNumber={1}
          totalPages={3}
        >
          <ScoresSection
            studentSlug={id}
            studentName={detail.name}
            taskInfo={detail.taskInfo}
            categoryScores={detail.categoryScores}
            potential={potential}
          />

          <SectionHeading>Your Text</SectionHeading>
          <div
            style={{
              background: "#FEFCF8",
              border: "1px solid #E8E0D4",
              borderRadius: "6px",
              padding: "clamp(1rem, 3vw, 1.375rem) clamp(1rem, 3vw, 1.625rem)",
              marginBottom: "1.5rem",
              fontFamily: "var(--font-caveat), cursive",
              fontSize: "clamp(0.9375rem, 3.5vw, 1.1875rem)",
              lineHeight: 2,
              color: "#3A3228",
              wordBreak: "break-word" as const,
              overflowWrap: "anywhere" as const,
              backgroundImage:
                "repeating-linear-gradient(transparent, transparent 37px, #E8E2D8 37px, #E8E2D8 38px)",
              backgroundPosition: "0 23px",
            }}
          >
            {paragraphs.map((line, i) => {
              const segments = buildSegments(line, annotations);
              return (
                <p key={i} style={{ marginBottom: "0.25rem" }}>
                  {segments.map((seg, j) => {
                    if (!seg.kind) return <span key={j}>{seg.text}</span>;
                    const c = catColor[seg.kind];
                    return (
                      <span
                        key={j}
                        style={{
                          padding: "1px 3px",
                          borderRadius: "3px",
                          background: c.bg,
                          borderBottom: `2px solid ${c.fg}`,
                        }}
                      >
                        <Marker kind={seg.kind} num={seg.markerNum ?? 0} /> {seg.text}
                      </span>
                    );
                  })}
                </p>
              );
            })}

            <div
              className="flex flex-wrap"
              style={{
                marginTop: "0.875rem",
                paddingTop: "0.75rem",
                borderTop: "0.5px solid #E4DDD2",
                gap: "1rem",
                fontFamily: "var(--font-dm-sans), sans-serif",
              }}
            >
              <LegendItem color="var(--cat-grammar)" label="Grammar" />
              <LegendItem color="var(--cat-vocabulary)" label="Vocabulary" />
              <LegendItem color="var(--cat-sentence)" label="Sentence Structure" />
              <LegendItem color="var(--cat-connectives)" label="Connectives" />
            </div>
          </div>

          {priority && (
            <div
              className="flex items-start"
              style={{
                background: "#F5EFE3",
                border: "1px solid #E4D9C4",
                borderRadius: "6px",
                padding: "0.75rem 1rem",
                marginBottom: "1.75rem",
                gap: "0.875rem",
              }}
            >
              <div
                className="flex items-center justify-center shrink-0"
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: catColor[priority.color].fg,
                  color: "#fff",
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "1.125rem",
                  fontWeight: 600,
                }}
              >
                {priority.rank}
              </div>
              <div>
                <h4
                  style={{
                    fontSize: "0.8125rem",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    marginBottom: "0.25rem",
                  }}
                >
                  {priority.title}
                </h4>
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--text-secondary)",
                    lineHeight: 1.55,
                  }}
                >
                  {priority.text}
                </p>
              </div>
            </div>
          )}
        </PDFPage>

        <PageBreakHint />

        <PDFPage
          subTitle="Detailed Feedback"
          rightTopLine={detail.name}
          rightSubLine="English B1-B2 Writing"
          teacherLine="Reviewed by S. Borgwardt"
          pageNumber={2}
          totalPages={3}
          footerLeft="Generated by GemmPen - powered by Gemma 4"
        >
          <SectionHeading>What went well, and where to grow</SectionHeading>

          <FeedbackSection
            studentSlug={id}
            feedbackItems={detail.feedbackItems}
          />
        </PDFPage>

        <PageBreakHint />

        <PDFPage
          subTitle="Practice Exercises"
          rightTopLine={detail.name}
          rightSubLine="Built from your exam"
          teacherLine="Reviewed by S. Borgwardt"
          pageNumber={3}
          totalPages={3}
          footerLeft={
            <>
              Generated by GemmPen - powered by Gemma 4
              <br />
              <span className="flex items-center" style={{ gap: "0.5rem", marginTop: "0.25rem" }}>
                <QRCodeSVG
                  value={`https://gemmpen.vercel.app/app/exercises/${id}`}
                  size={64}
                  level="M"
                />
                <span style={{ fontSize: "0.6875rem", color: "var(--text-muted)" }}>
                  Scan to check your answers
                </span>
              </span>
            </>
          }
        >
          <SectionHeading>Your Practice Exercises</SectionHeading>
          <p
            style={{
              fontSize: "0.8125rem",
              color: "var(--text-secondary)",
              marginBottom: "1.125rem",
              lineHeight: 1.6,
            }}
          >
            Every exercise below comes from your own text. Work through them at
            your own pace, and check your answers in the GemmPen app. You can try
            as many times as you like.
          </p>

          {detail.exercises.map((ex) => {
            const key = categoryFeedbackMap[ex.categoryId];
            const c = catColor[key];
            return (
              <div
                key={ex.number}
                style={{
                  background: "var(--bg-body)",
                  borderRadius: "6px",
                  padding: "1rem 1.125rem",
                  marginBottom: "0.75rem",
                }}
              >
                <div
                  className="flex flex-wrap items-center"
                  style={{ gap: "0.5rem", marginBottom: "0.5rem" }}
                >
                  <span
                    style={{
                      fontSize: "0.6875rem",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      color: "var(--accent-gold)",
                    }}
                  >
                    Exercise {ex.number}
                  </span>
                  <span
                    style={{
                      fontSize: "0.6875rem",
                      fontWeight: 500,
                      padding: "2px 8px",
                      borderRadius: "10px",
                      background: c.bg,
                      color: c.fg,
                      display: "inline-block",
                    }}
                  >
                    {labelForExercise(ex.type, ex.categoryId)}
                  </span>
                  <span
                    style={{
                      fontSize: "0.625rem",
                      color: "var(--text-muted)",
                      marginLeft: "auto",
                    }}
                  >
                    {ex.sourceHint}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: "0.8125rem",
                    color: "var(--text-primary)",
                    fontWeight: 500,
                    marginBottom: "0.625rem",
                    lineHeight: 1.5,
                  }}
                >
                  {ex.instruction}
                </p>
                <div
                  style={{
                    fontSize: "0.8125rem",
                    color: "var(--text-secondary)",
                    lineHeight: 1.7,
                  }}
                >
                  {ex.content.sentences?.map((s, idx) => (
                    <p key={idx} style={{ marginBottom: "0.5rem" }}>
                      {renderSentenceWithBlanks(s)}
                    </p>
                  ))}
                  {ex.content.options && (
                    <div
                      className="flex flex-col"
                      style={{ marginTop: "0.625rem", gap: "0.375rem" }}
                    >
                      {ex.content.options.map((o) => (
                        <div
                          key={o.letter}
                          className="flex items-center"
                          style={{
                            fontSize: "0.8125rem",
                            color: "var(--text-secondary)",
                            padding: "0.375rem 0.75rem",
                            background: "#fff",
                            border: "0.5px solid var(--border-color)",
                            borderRadius: "4px",
                            gap: "0.5rem",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "0.75rem",
                              fontWeight: 600,
                              color: "var(--btn-primary)",
                              width: "20px",
                            }}
                          >
                            {o.letter}
                          </span>
                          <span>{o.text}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </PDFPage>
      </div>
    </>
  );
}

function Marker({ kind, num }: { kind: CatKey; num: number }) {
  const c = catColor[kind];
  return (
    <span
      className="inline-flex items-center justify-center align-middle"
      style={{
        width: "18px",
        height: "18px",
        borderRadius: "50%",
        background: c.fg,
        color: "#fff",
        fontFamily: "var(--font-dm-sans), sans-serif",
        fontSize: "0.5625rem",
        fontWeight: 700,
        lineHeight: 1,
        margin: "0 1px",
      }}
    >
      {num}
    </span>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3
      style={{
        fontFamily: "var(--font-cormorant), Georgia, serif",
        fontSize: "1.1875rem",
        fontWeight: 500,
        color: "var(--text-primary)",
        marginBottom: "0.875rem",
        paddingBottom: "0.3125rem",
        borderBottom: "0.5px solid #E4DDD2",
      }}
    >
      {children}
    </h3>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <span
      className="flex items-center"
      style={{
        fontSize: "0.6875rem",
        fontWeight: 500,
        gap: "0.3125rem",
      }}
    >
      <span
        style={{
          width: "10px",
          height: "10px",
          borderRadius: "3px",
          background: color,
          display: "inline-block",
        }}
      />
      {label}
    </span>
  );
}

function PageBreakHint() {
  return (
    <div
      className="page-break-hint text-center"
      style={{
        padding: "0.625rem 0",
        fontSize: "0.625rem",
        color: "#C4B49E",
        letterSpacing: "1px",
        textTransform: "uppercase",
      }}
    >
      - page break -
    </div>
  );
}

function labelForExercise(type: string, categoryId: string): string {
  if (type === "fill-blank" && categoryId === "grammar") return "Subject-Verb Agreement";
  if (type === "fill-blank" && categoryId === "domainVocab") return "Domain Vocabulary";
  if (type === "fill-blank") return "Fill in the Blank";
  if (type === "rewrite" && categoryId === "sentenceStructure") return "Sentence Variety";
  if (type === "rewrite" && categoryId === "genVocabulary") return "Synonym Upgrade";
  if (type === "rewrite") return "Rewrite";
  if (type === "multiple-choice" && categoryId === "domainVocab") return "Connectives";
  if (type === "multiple-choice") return "Multiple Choice";
  return "Practice";
}

function renderSentenceWithBlanks(s: string): React.ReactNode {
  const parts = s.split("____");
  if (parts.length === 1) return s;
  return parts.flatMap((p, i) =>
    i === 0
      ? [p]
      : [
          <span
            key={`blank-${i}`}
            style={{
              display: "inline-block",
              minWidth: "60px",
              borderBottom: "1.5px solid var(--score-bar)",
              margin: "0 2px",
              color: "transparent",
            }}
          >
            ____
          </span>,
          p,
        ],
  );
}
