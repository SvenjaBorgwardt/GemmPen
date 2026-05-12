import { notFound } from "next/navigation";
import { Nav } from "@/components/nav";
import { getDetailStudent } from "@/lib/mock-data";
import { getHighlights, getUncertainSpans } from "@/lib/student-annotations";
import { ReviewPanel } from "./review-panel";
import { DocumentPanel } from "./document-panel";

const reviewOrder = ["alex-m", "jordan-k", "casey-r"];

export default async function ReviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const detail = getDetailStudent(id);
  if (!detail) notFound();

  const idx = reviewOrder.indexOf(id);
  const studentNum = idx >= 0 ? idx + 1 : 1;
  const prevSlug = idx > 0 ? reviewOrder[idx - 1] : null;
  const nextHref =
    idx === reviewOrder.length - 1
      ? "/app/class"
      : `/app/review/${reviewOrder[idx + 1]}`;
  const highlights = getHighlights(id);
  const uncertainSpans = getUncertainSpans(id);
  const paragraphs = detail.transcript.split(/\n+/).filter(Boolean);

  const scanUrls: Record<string, string> = {
    "alex-m": "/scans/alex-m.jpg",
    "jordan-k": "/scans/jordan-k.jpg",
    "casey-r": "/scans/casey-r.jpg",
  };
  const scanUrl = scanUrls[id];
  const initialZoomOverrides: Record<string, number> = {
    "casey-r": 1,
  };
  const initialZoomIdx = initialZoomOverrides[id];

  return (
    <div className="review-outer" style={{ display: "flex", flexDirection: "column", height: "100dvh", overflow: "hidden" }}>
      <div style={{ flexShrink: 0 }}>
        <Nav active="review" />
      </div>

      <div
        className="review-header flex items-center justify-between"
        style={{
          flexShrink: 0,
          padding: "0.875rem 1rem",
          background: "var(--bg-card)",
          borderBottom: "0.5px solid var(--border-color)",
        }}
      >
        <div>
          <h2
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "1.375rem",
              fontWeight: 500,
              color: "var(--text-primary)",
              lineHeight: 1.2,
            }}
          >
            {detail.name}
          </h2>
          <p
            style={{
              fontSize: "0.75rem",
              color: "var(--text-muted)",
              marginTop: "2px",
            }}
          >
            {detail.taskInfo}
          </p>
        </div>
        <div className="review-header-actions flex items-center" style={{ gap: "0.75rem" }}>
          <a
            href="/app/class"
            style={{
              fontSize: "0.75rem",
              color: "var(--text-muted)",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <span style={{ fontSize: "0.625rem" }}>&larr;</span>
            Class
          </a>
          <span style={{ fontSize: "0.75rem", color: "var(--border-color)" }}>|</span>
          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
            Student {studentNum} of 21
          </span>
          {prevSlug ? (
            <a
              href={`/app/review/${prevSlug}`}
              className="inline-block"
              style={{
                fontSize: "0.8125rem",
                fontWeight: 500,
                padding: "0.5rem 1.125rem",
                borderRadius: "6px",
                border: "0.5px solid var(--border-color)",
                background: "var(--bg-card)",
                color: "var(--text-secondary)",
                textDecoration: "none",
                minHeight: "44px",
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              &larr; Previous
            </a>
          ) : (
            <span
              style={{
                fontSize: "0.8125rem",
                fontWeight: 500,
                padding: "0.5rem 1.125rem",
                borderRadius: "6px",
                border: "0.5px solid var(--border-color)",
                background: "var(--bg-body)",
                color: "var(--text-muted)",
                minHeight: "44px",
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              &larr; Previous
            </span>
          )}
          <a
            href={nextHref}
            style={{
              fontSize: "0.8125rem",
              fontWeight: 500,
              padding: "0.5rem 1.125rem",
              borderRadius: "6px",
              background: "var(--btn-primary)",
              color: "var(--btn-primary-text)",
              border: "0.5px solid var(--btn-primary)",
              textDecoration: "none",
              minHeight: "44px",
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            Save &amp; Next &rarr;
          </a>
        </div>
      </div>

      <div
        className="review-split"
        style={{
          display: "flex",
          flex: 1,
          minHeight: 0,
          overflow: "hidden",
          alignItems: "stretch",
        }}
      >
        <div
          style={{
            width: "45%",
            flexShrink: 0,
            borderRight: "0.5px solid var(--border-color)",
            overflow: "hidden",
          }}
        >
          <DocumentPanel
            transcript={detail.transcript}
            scanUrl={scanUrl}
            initialZoomIdx={initialZoomIdx}
            paragraphs={paragraphs}
            highlights={highlights}
            uncertainSpans={uncertainSpans}
          />
        </div>

        <ReviewPanel
          studentSlug={id}
          studentName={detail.name}
          feedbackItems={detail.feedbackItems}
        />
      </div>
    </div>
  );
}
