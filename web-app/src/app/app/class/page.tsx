"use client";

import { useEffect, useMemo, useState } from "react";
import { Nav } from "@/components/nav";
import { StudentRow } from "@/components/student-row";
import { students, classStats } from "@/lib/mock-data";
import { getStoredGradingSystem, toGrade, GradingSystemId } from "@/lib/grading";

type Filter = "all" | "reviewed" | "pending";
type SortOption = "score-high" | "score-low" | "name" | "status";

const INSIGHT_CATEGORIES = [
  { id: "grammar", label: "Grammar", abbr: "GRM", cssColor: "var(--cat-grammar)" },
  { id: "sentenceStructure", label: "Sentence Structure", abbr: "SS", cssColor: "var(--cat-sentence)" },
  { id: "genVocabulary", label: "General Vocabulary", abbr: "VOC", cssColor: "var(--cat-vocabulary)" },
  { id: "domainVocab", label: "Connectives", abbr: "CON", cssColor: "var(--cat-connectives)" },
] as const;

export default function ClassOverviewPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const [sort, setSort] = useState<SortOption>("score-high");
  const [gradingSystem, setGradingSystem] = useState<GradingSystemId>("nrw-15");

  useEffect(() => {
    setGradingSystem(getStoredGradingSystem());
  }, []);

  const avgDisplay = useMemo(() => {
    if (gradingSystem === "nrw-15") return classStats.avgScore.toFixed(1);
    const pct = (classStats.avgScore / 15) * 100;
    return toGrade(pct, gradingSystem).label;
  }, [gradingSystem]);

  const categoryAverages = useMemo(() => {
    const sums: Record<string, { total: number; count: number; max: number }> = {};
    for (const s of students) {
      for (const cs of s.categoryScores) {
        if (!sums[cs.categoryId]) sums[cs.categoryId] = { total: 0, count: 0, max: cs.maxScore };
        sums[cs.categoryId].total += cs.score;
        sums[cs.categoryId].count += 1;
      }
    }
    return INSIGHT_CATEGORIES.map((cat) => {
      const entry = sums[cat.id];
      const avg = entry ? entry.total / entry.count : 0;
      const max = entry ? entry.max : 15;
      return { ...cat, avg: Math.round(avg * 10) / 10, max };
    });
  }, []);

  const lowestCategory = useMemo(() => {
    let lowest = categoryAverages[0];
    for (const c of categoryAverages) {
      if (c.avg < lowest.avg) lowest = c;
    }
    return lowest;
  }, [categoryAverages]);

  const visible = useMemo(() => {
    let list = students.slice();
    if (filter === "reviewed") list = list.filter((s) => s.status === "reviewed");
    if (filter === "pending") list = list.filter((s) => s.status === "pending");

    switch (sort) {
      case "score-high":
        list.sort((a, b) => b.gradePoints - a.gradePoints);
        break;
      case "score-low":
        list.sort((a, b) => a.gradePoints - b.gradePoints);
        break;
      case "name":
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "status":
        list.sort((a, b) => a.status.localeCompare(b.status));
        break;
    }
    return list;
  }, [filter, sort]);

  return (
    <>
      <Nav active="class" />
      <main
        className="px-4 md:px-12"
        style={{
          maxWidth: "1080px",
          margin: "0 auto",
          paddingTop: "1.75rem",
          paddingBottom: "4rem",
        }}
      >
        <div
          className="flex flex-col md:flex-row md:items-end md:justify-between"
          style={{ marginBottom: "1.5rem" }}
        >
          <div>
            <h1
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "2rem",
                fontWeight: 500,
                color: "var(--text-primary)",
                marginBottom: "0.25rem",
              }}
            >
              Class Overview
            </h1>
            <div
              className="flex flex-wrap"
              style={{
                gap: "0.5rem 1rem",
                fontSize: "0.8125rem",
                color: "var(--text-secondary)",
              }}
            >
              <span>English B1-B2 Writing</span>
              <span>{classStats.totalStudents} students</span>
              <span>Task A2: Comment Writing</span>
            </div>
          </div>
        </div>

        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5"
          style={{ gap: "0.875rem", marginBottom: "1.5rem" }}
        >
          <StatCard num={classStats.totalStudents} label="Students" />
          <StatCard display={avgDisplay} label="Avg. Score" />
          <StatCard num={classStats.reviewedCount} label="Reviewed" />
          <StatCard num={classStats.pendingCount} label="Pending" />
          <StatCard num={classStats.microAnalysesCount} label="Checks completed" title="Total sentence-level checks across all students: grammar patterns, vocabulary range, argument structure, and more." />
        </div>

        {/* Grade Distribution Dot Plot */}
        <GradeDistribution students={students} avgScore={classStats.avgScore} gradingSystem={gradingSystem} />

        {/* Class Insights */}
        <div
          style={{
            background: "var(--bg-card)",
            border: "0.5px solid var(--border-color)",
            borderRadius: "var(--radius-card)",
            padding: "1.25rem 1.5rem",
            marginBottom: "1.5rem",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "1.125rem",
              fontWeight: 500,
              color: "var(--text-primary)",
              marginBottom: "1rem",
            }}
          >
            Class Insights
          </h2>
          <div
            className="grid grid-cols-2 md:grid-cols-4"
            style={{ gap: "0.75rem 1.25rem", marginBottom: "1rem" }}
          >
            {categoryAverages.map((cat) => (
              <div key={cat.id}>
                <div
                  className="flex items-center justify-between"
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--text-secondary)",
                    marginBottom: "0.375rem",
                  }}
                >
                  <span style={{ fontWeight: 600 }}>{cat.label}</span>
                  <span style={{ color: "var(--text-muted)", fontSize: "0.6875rem" }}>
                    {cat.avg}/{cat.max}
                  </span>
                </div>
                <div
                  style={{
                    height: "6px",
                    borderRadius: "3px",
                    background: "var(--border-color)",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${(cat.avg / cat.max) * 100}%`,
                      borderRadius: "3px",
                      background: cat.cssColor,
                      transition: "width 0.3s ease",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p
            style={{
              fontSize: "0.8125rem",
              color: "var(--text-secondary)",
              lineHeight: 1.5,
            }}
          >
            <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>
              Biggest opportunity:
            </span>{" "}
            {lowestCategory.label} (avg {lowestCategory.avg}/{lowestCategory.max}) - consider
            focusing your next lesson here.
          </p>
        </div>

        <div
          className="flex flex-wrap items-center justify-between gap-3"
          style={{ marginBottom: "1rem" }}
        >
          <div className="flex flex-wrap" style={{ gap: "0.5rem" }}>
            <FilterBtn
              active={filter === "all"}
              onClick={() => setFilter("all")}
              label={`All (${classStats.totalStudents})`}
            />
            <FilterBtn
              active={filter === "reviewed"}
              onClick={() => setFilter("reviewed")}
              label={`Reviewed (${classStats.reviewedCount})`}
            />
            <FilterBtn
              active={filter === "pending"}
              onClick={() => setFilter("pending")}
              label={`Pending (${classStats.pendingCount})`}
            />
          </div>
          <select
            aria-label="Sort students"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            style={{
              fontSize: "0.75rem",
              padding: "0.5rem 0.75rem",
              borderRadius: "6px",
              border: "0.5px solid var(--border-color)",
              background: "var(--bg-card)",
              color: "var(--text-secondary)",
              cursor: "pointer",
              fontFamily: "inherit",
              minHeight: "44px",
            }}
          >
            <option value="score-high">Sort by: Score (high to low)</option>
            <option value="score-low">Sort by: Score (low to high)</option>
            <option value="name">Sort by: Name (A-Z)</option>
            <option value="status">Sort by: Status</option>
          </select>
        </div>

        <div
          className="flex flex-wrap items-center"
          style={{
            gap: "0.5rem 1.25rem",
            marginBottom: "0.75rem",
            fontSize: "0.6875rem",
            color: "var(--text-muted)",
          }}
        >
          {[
            { abbr: "GRM", full: "Grammar", color: "var(--cat-grammar)" },
            { abbr: "VOC", full: "General Vocabulary", color: "var(--cat-vocabulary)" },
            { abbr: "SS", full: "Sentence Structure", color: "var(--cat-sentence)" },
            { abbr: "CON", full: "Connectives", color: "var(--cat-connectives)" },
          ].map((c) => (
            <span key={c.abbr} className="flex items-center" style={{ gap: "4px" }}>
              <span
                style={{
                  display: "inline-block",
                  width: "8px",
                  height: "8px",
                  borderRadius: "2px",
                  background: c.color,
                }}
              />
              <span style={{ fontWeight: 600 }}>{c.abbr}</span> = {c.full}
            </span>
          ))}
        </div>

        <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
        <table
          className="w-full"
          style={{
            borderCollapse: "separate",
            borderSpacing: "0 6px",
            minWidth: "640px",
          }}
        >
          <thead>
            <tr>
              <Th>Student</Th>
              <Th center>Grade</Th>
              <Th>Language Scores</Th>
              <Th center>Status</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {visible.map((s) => (
              <StudentRow key={s.id} student={s} gradingSystem={gradingSystem} />
            ))}
          </tbody>
        </table>
        </div>

        <div
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          style={{
            marginTop: "1.75rem",
            paddingTop: "1.25rem",
            borderTop: "0.5px solid var(--border-color)",
          }}
        >
          <span style={{ fontSize: "0.8125rem", color: "var(--text-muted)" }}>
            {classStats.reviewedCount} of {classStats.totalStudents} students reviewed
            - {classStats.pendingCount} pending review
          </span>
          <div>
            <button
              type="button"
              style={{
                fontSize: "0.9375rem",
                fontWeight: 600,
                padding: "0.875rem 2.25rem",
                borderRadius: "var(--radius-card)",
                background: "var(--btn-primary)",
                color: "var(--btn-primary-text)",
                border: "none",
                cursor: "pointer",
                fontFamily: "inherit",
                minHeight: "44px",
              }}
            >
              Generate All Feedback
            </button>
            <p
              style={{
                fontSize: "0.6875rem",
                color: "var(--text-muted)",
                marginTop: "0.5rem",
              }}
            >
              Creates personalized feedback PDFs for all reviewed students
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

function StatCard({
  num,
  label,
  decimal,
  title,
  display,
}: {
  num?: number;
  label: string;
  decimal?: boolean;
  title?: string;
  display?: string;
}) {
  return (
    <div
      className="flex-1 text-center"
      title={title}
      style={{
        background: "var(--bg-card)",
        border: "0.5px solid var(--border-color)",
        borderRadius: "var(--radius-card)",
        padding: "1rem 1.25rem",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-cormorant), Georgia, serif",
          fontSize: "1.75rem",
          fontWeight: 500,
          color: "var(--text-primary)",
          lineHeight: 1,
        }}
      >
        {display ?? (decimal ? num!.toFixed(1) : num)}
      </div>
      <div
        style={{
          fontSize: "0.6875rem",
          color: "var(--text-muted)",
          marginTop: "0.25rem",
          textTransform: "uppercase",
          letterSpacing: "0.5px",
        }}
      >
        {label}
      </div>
    </div>
  );
}

function FilterBtn({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        fontSize: "0.75rem",
        fontWeight: 500,
        padding: "8px 14px",
        borderRadius: "16px",
        border: active ? "0.5px solid #C4B49E" : "0.5px solid var(--border-color)",
        background: active ? "var(--badge-bg)" : "var(--bg-card)",
        color: active ? "var(--badge-text)" : "var(--text-secondary)",
        cursor: "pointer",
        fontFamily: "inherit",
        minHeight: "44px",
      }}
    >
      {label}
    </button>
  );
}

function Th({
  children,
  center,
}: {
  children: React.ReactNode;
  center?: boolean;
}) {
  return (
    <th
      style={{
        fontSize: "0.625rem",
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "1.2px",
        color: "var(--text-muted)",
        textAlign: center ? "center" : "left",
        padding: "0 14px 8px",
      }}
    >
      {children}
    </th>
  );
}

/* ------------------------------------------------------------------ */
/*  Grade Distribution - Dot Plot                                      */
/* ------------------------------------------------------------------ */

const GRADE_BANDS = [
  { label: "below standard", min: 1, max: 3 },
  { label: "adequate", min: 4, max: 6 },
  { label: "satisfactory", min: 7, max: 9 },
  { label: "good", min: 10, max: 12 },
  { label: "very good", min: 13, max: 15 },
] as const;

function GradeDistribution({
  students: allStudents,
  avgScore,
  gradingSystem,
}: {
  students: typeof students;
  avgScore: number;
  gradingSystem: GradingSystemId;
}) {
  const distribution = useMemo(() => {
    const buckets: Record<number, number> = {};
    for (const s of allStudents) {
      buckets[s.gradePoints] = (buckets[s.gradePoints] || 0) + 1;
    }
    return buckets;
  }, [allStudents]);

  const dots = useMemo(() => {
    const result: Array<{ score: number; row: number }> = [];
    for (let score = 0; score <= 15; score++) {
      const count = distribution[score] || 0;
      for (let i = 0; i < count; i++) {
        result.push({ score, row: i });
      }
    }
    return result;
  }, [distribution]);

  // SVG dimensions - using viewBox for responsiveness
  const VB_W = 600;
  const VB_H = 56;
  const DOT_R = 5;
  const DOT_SPACING = 12;
  const MARGIN_LEFT = 10;
  const MARGIN_RIGHT = 10;
  const PLOT_W = VB_W - MARGIN_LEFT - MARGIN_RIGHT;
  const BASELINE = VB_H - 4;

  const scoreToX = (score: number) => MARGIN_LEFT + (score / 15) * PLOT_W;

  return (
    <div
      style={{
        background: "var(--bg-card)",
        border: "0.5px solid var(--border-color)",
        borderRadius: "var(--radius-card)",
        padding: "0.75rem 1.25rem 0.5rem",
        marginBottom: "1.5rem",
      }}
    >
      <div
        style={{
          fontSize: "0.6875rem",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.5px",
          color: "var(--text-muted)",
          marginBottom: "0.375rem",
        }}
      >
        Grade Distribution
      </div>

      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ width: "100%", height: "auto", maxHeight: "80px", display: "block" }}
        role="img"
        aria-label="Grade distribution showing each student as a dot on a 0 to 15 scale"
      >
        {/* Baseline */}
        <line
          x1={MARGIN_LEFT}
          y1={BASELINE}
          x2={VB_W - MARGIN_RIGHT}
          y2={BASELINE}
          stroke="var(--border-color)"
          strokeWidth={0.75}
        />

        {/* Band separators (dashed vertical lines at boundaries) */}
        {[3.5, 6.5, 9.5, 12.5].map((boundary) => (
          <line
            key={boundary}
            x1={scoreToX(boundary)}
            y1={2}
            x2={scoreToX(boundary)}
            y2={BASELINE}
            stroke="var(--border-color)"
            strokeWidth={0.5}
            strokeDasharray="2,2"
          />
        ))}

        {/* Average line */}
        <line
          x1={scoreToX(avgScore)}
          y1={0}
          x2={scoreToX(avgScore)}
          y2={BASELINE + 1}
          stroke="var(--accent-gold, #B8860B)"
          strokeWidth={1.5}
          opacity={0.8}
        />
        <text
          x={scoreToX(avgScore)}
          y={8}
          textAnchor="middle"
          fontSize={7}
          fontWeight={600}
          fill="var(--accent-gold, #B8860B)"
          fontFamily="var(--font-dm-sans, system-ui, sans-serif)"
        >
          avg {gradingSystem === "nrw-15" ? avgScore.toFixed(1) : toGrade((avgScore / 15) * 100, gradingSystem).label}
        </text>

        {/* Student dots */}
        {dots.map((dot) => (
          <circle
            key={`d-${dot.score}-${dot.row}`}
            cx={scoreToX(dot.score)}
            cy={BASELINE - 6 - dot.row * DOT_SPACING}
            r={DOT_R}
            fill="var(--btn-primary, #6B5340)"
            opacity={0.72}
          />
        ))}
      </svg>

      {/* Scale labels */}
      <div
        style={{
          display: "flex",
          fontSize: "0.5625rem",
          color: "var(--text-muted)",
          letterSpacing: "0.2px",
          marginTop: "1px",
          paddingLeft: `${(MARGIN_LEFT / VB_W) * 100}%`,
          paddingRight: `${(MARGIN_RIGHT / VB_W) * 100}%`,
        }}
      >
        {GRADE_BANDS.map((band) => (
          <span key={band.label} style={{ flex: 1, textAlign: "center" }}>
            {band.min}-{band.max}
          </span>
        ))}
      </div>
    </div>
  );
}
