/**
 * Grading system utilities for GemmPen.
 * Converts raw score percentages into grades for each supported system.
 * The grading system ID is persisted in localStorage by the configure page.
 */

export type GradingSystemId = "nrw-15" | "us-letter" | "uk-gcse" | "percentage";

export interface GradeResult {
  /** Primary display: "10", "B+", "A*", "72%" */
  label: string;
  /** Secondary display for systems that have it: "gut", "B+", etc. */
  sublabel?: string;
  /** Numeric value for sorting / comparison (0-100 scale) */
  numeric: number;
}

// --- NRW 15-point scale (German Abitur / Berufskolleg) ---

const NRW_THRESHOLDS: Array<{ min: number; points: number; band: string }> = [
  { min: 95, points: 15, band: "sehr gut +" },
  { min: 90, points: 14, band: "sehr gut" },
  { min: 85, points: 13, band: "sehr gut -" },
  { min: 80, points: 12, band: "gut +" },
  { min: 75, points: 11, band: "gut" },
  { min: 70, points: 10, band: "gut -" },
  { min: 65, points: 9, band: "befriedigend +" },
  { min: 60, points: 8, band: "befriedigend" },
  { min: 55, points: 7, band: "befriedigend -" },
  { min: 50, points: 6, band: "ausreichend +" },
  { min: 45, points: 5, band: "ausreichend" },
  { min: 40, points: 4, band: "ausreichend -" },
  { min: 33, points: 3, band: "mangelhaft +" },
  { min: 27, points: 2, band: "mangelhaft" },
  { min: 20, points: 1, band: "mangelhaft -" },
  { min: 0, points: 0, band: "ungenuegend" },
];

function toNRW(pct: number): GradeResult {
  const entry = NRW_THRESHOLDS.find((t) => pct >= t.min) ?? NRW_THRESHOLDS[NRW_THRESHOLDS.length - 1];
  return { label: `${entry.points}`, sublabel: entry.band, numeric: pct };
}

// --- US Letter Grades ---
// Thresholds aligned to the NRW rubric distribution so grades spread
// evenly across a 0-15 slider instead of clustering at the top.
//
// Mapping:  NRW 15-13 = A range, 12-10 = B range, 9-7 = C range,
//           6-4 = D range, 3-1 = E/F low, 0 = F

const US_THRESHOLDS: Array<{ min: number; grade: string }> = [
  { min: 95, grade: "A+" },   // NRW 15
  { min: 85, grade: "A" },    // NRW 13-14
  { min: 80, grade: "A-" },   // NRW 12
  { min: 75, grade: "B+" },   // NRW 11
  { min: 65, grade: "B" },    // NRW 9-10
  { min: 60, grade: "B-" },   // NRW 8
  { min: 55, grade: "C+" },   // NRW 7
  { min: 45, grade: "C" },    // NRW 5-6
  { min: 40, grade: "C-" },   // NRW 4
  { min: 33, grade: "D+" },   // NRW 3
  { min: 27, grade: "D" },    // NRW 2
  { min: 20, grade: "D-" },   // NRW 1
  { min: 0, grade: "F" },     // NRW 0
];

function toUSLetter(pct: number): GradeResult {
  const entry = US_THRESHOLDS.find((t) => pct >= t.min) ?? US_THRESHOLDS[US_THRESHOLDS.length - 1];
  return { label: entry.grade, numeric: pct };
}

// --- UK GCSE / A-Level ---
// Same principle: aligned to NRW bands for even slider distribution.

const UK_THRESHOLDS: Array<{ min: number; grade: string }> = [
  { min: 85, grade: "A*" },   // NRW 13-15
  { min: 65, grade: "A" },    // NRW 10-12
  { min: 45, grade: "B" },    // NRW 7-9
  { min: 27, grade: "C" },    // NRW 4-6
  { min: 20, grade: "D" },    // NRW 2-3
  { min: 7, grade: "E" },     // NRW 1
  { min: 0, grade: "U" },     // NRW 0
];

function toUKGCSE(pct: number): GradeResult {
  const entry = UK_THRESHOLDS.find((t) => pct >= t.min) ?? UK_THRESHOLDS[UK_THRESHOLDS.length - 1];
  return { label: entry.grade, numeric: pct };
}

// --- Percentage ---

function toPercentage(pct: number): GradeResult {
  return { label: `${Math.round(pct)}%`, numeric: pct };
}

// --- Public API ---

const converters: Record<GradingSystemId, (pct: number) => GradeResult> = {
  "nrw-15": toNRW,
  "us-letter": toUSLetter,
  "uk-gcse": toUKGCSE,
  percentage: toPercentage,
};

/**
 * Convert a raw score percentage (0-100) to the selected grading system.
 */
export function toGrade(pct: number, system: GradingSystemId): GradeResult {
  const clamped = Math.max(0, Math.min(100, pct));
  return converters[system](clamped);
}

/**
 * Calculate overall percentage from an array of {score, maxScore} pairs.
 */
export function calcPercentage(items: Array<{ score: number; maxScore: number }>): number {
  const totalScore = items.reduce((sum, i) => sum + i.score, 0);
  const totalMax = items.reduce((sum, i) => sum + i.maxScore, 0);
  if (totalMax === 0) return 0;
  return (totalScore / totalMax) * 100;
}

/**
 * Convert a single category score to the selected grading system.
 * Useful for showing per-slider grades.
 */
export function categoryToGrade(score: number, maxScore: number, system: GradingSystemId): GradeResult {
  const pct = maxScore > 0 ? (score / maxScore) * 100 : 0;
  return toGrade(pct, system);
}

// --- localStorage helpers ---

const GRADING_KEY = "gemmpen-grading-system";

export function getStoredGradingSystem(): GradingSystemId {
  if (typeof window === "undefined") return "nrw-15";
  const stored = localStorage.getItem(GRADING_KEY);
  if (stored && stored in converters) return stored as GradingSystemId;
  return "nrw-15";
}

export function setStoredGradingSystem(id: GradingSystemId): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(GRADING_KEY, id);
}

/** Human-readable name for each grading system. */
export const GRADING_SYSTEM_NAMES: Record<GradingSystemId, string> = {
  "nrw-15": "NRW 0-15",
  "us-letter": "US Letter",
  "uk-gcse": "UK GCSE",
  percentage: "Percentage",
};
