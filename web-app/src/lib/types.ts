/**
 * TypeScript types for GemmPen web app
 * Source of truth for all data structures
 */

export type CategoryId = 'grammar' | 'sentenceStructure' | 'genVocabulary' | 'domainVocab' | 'content' | 'textStructure';

export interface CategoryScore {
  id: 'grammar' | 'sentenceStructure' | 'genVocabulary' | 'domainVocab';
  label: string;
  score: number;
  maxScore: number;
  color: string;
  bgColor: string;
  borderColor: string;
  reasoning: string;
  evidenceQuotes: string[];
  errorTags: string[];
}

export interface FeedbackItem {
  categoryId: CategoryId;
  label: string;
  score: number;
  maxScore: number;
  color: string;
  bgColor: string;
  feedbackText: string;
  altFeedbackText?: string;
  quotes: Array<{
    text: string;
    explanation?: string;
  }>;
  tip: string;
}

export interface FeedbackCorrection {
  categoryId: CategoryId;
  action: 'approved' | 'edited' | 'regenerated';
  modelFeedback: string;
  teacherFeedback: string;
  modelScore: number;
  teacherScore: number;
}

export interface DPOPair {
  id: string;
  timestamp: string;
  studentSlug: string;
  categoryId: CategoryId;
  action: 'edited' | 'regenerated';
  modelFeedback: string;
  teacherFeedback: string;
  modelScore: number;
  teacherScore: number;
  maxScore: number;
  evidenceQuotes: string[];
}

export interface ExerciseBlank {
  position: number;
  answer: string;
  hint: string;
}

export interface ExerciseOption {
  letter: 'A' | 'B' | 'C' | 'D';
  text: string;
  isCorrect: boolean;
  hint?: string;
}

export interface Exercise {
  number: number;
  type: 'fill-blank' | 'rewrite' | 'multiple-choice';
  categoryId: CategoryId;
  sourceHint: string;
  instruction: string;
  content: {
    sentences?: string[];
    blanks?: ExerciseBlank[];
    options?: ExerciseOption[];
  };
  correctAnswers: string[];
  explanation: string;
}

export interface StudentDetail {
  slug: string;
  name: string;
  taskInfo: string;
  transcript: string;
  categoryScores: CategoryScore[];
  contentScore: number;
  textStructureScore: number;
  feedbackItems: FeedbackItem[];
  exercises: Exercise[];
  gradePoints: number;
  gradeLetter: string;
}

export interface Student {
  id: string;
  slug: string;
  name: string;
  gradePoints: number;
  gradeLetter: string;
  categoryScores: Array<{
    categoryId: string;
    score: number;
    maxScore: number;
  }>;
  status: 'reviewed' | 'pending';
  detail?: StudentDetail;
}

export interface RubricCategory {
  id: string;
  name: string;
  description: string;
}

export interface RubricPreset {
  id: string;
  name: string;
  icon: string;
  description: string;
  categories: RubricCategory[];
}

export interface ClassStats {
  totalStudents: number;
  avgScore: number;
  reviewedCount: number;
  pendingCount: number;
  microAnalysesCount: number;
}

export interface AppState {
  students: Student[];
  classStats: ClassStats;
  rubricPresets: RubricPreset[];
}
