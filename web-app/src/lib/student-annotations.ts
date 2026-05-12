/**
 * Centralised student metadata keyed by slug.
 * Used by feedback, exercises, and review pages.
 */

export type CatKey = "grammar" | "structure" | "vocab" | "connectives";

export type AnnotationSegment = { kind: CatKey; markerNum: number; text: string };

export type Highlight = { kind: CatKey; text: string; note?: string };

export type UncertainSpan = { text: string; confidence: number; suggestion?: string };

export type Priority = { color: CatKey; rank: string; title: string; text: string };

export type PotentialEntry = { width: number; label: string };

const annotationsBySlug: Record<string, AnnotationSegment[]> = {
  "alex-m": [
    { kind: "grammar", markerNum: 1, text: "Topiks" },
    { kind: "vocab", markerNum: 5, text: "worklife" },
    { kind: "grammar", markerNum: 2, text: "lets" },
    { kind: "connectives", markerNum: 9, text: "First of all" },
    { kind: "vocab", markerNum: 6, text: "Many" },
    { kind: "vocab", markerNum: 7, text: "manufacturing industry" },
    { kind: "vocab", markerNum: 6, text: "many" },
    { kind: "connectives", markerNum: 9, text: "Furthermore" },
    { kind: "grammar", markerNum: 3, text: "there is" },
    { kind: "structure", markerNum: 8, text: "Companies that use AI systems collect large amounts of personal data, which could be misused." },
    { kind: "connectives", markerNum: 9, text: "However" },
    { kind: "grammar", markerNum: 4, text: "AI offer" },
    { kind: "vocab", markerNum: 7, text: "repetitive tasks" },
    { kind: "vocab", markerNum: 7, text: "creative and strategic" },
  ],
  "jordan-k": [
    { kind: "structure", markerNum: 1, text: "By handling routine, repetitive tasks, artificial intelligence allows human workers to concentrate on strategic, creative endeavors that require emotional intelligence and complex problem-solving." },
    { kind: "vocab", markerNum: 2, text: "displace" },
    { kind: "connectives", markerNum: 3, text: "Initially" },
    { kind: "connectives", markerNum: 3, text: "Additionally" },
    { kind: "connectives", markerNum: 3, text: "However" },
    { kind: "vocab", markerNum: 2, text: "endeavors" },
    { kind: "vocab", markerNum: 2, text: "algorithmic systems" },
  ],
  "casey-r": [
    { kind: "grammar", markerNum: 1, text: "Many peoples talks" },
    { kind: "grammar", markerNum: 2, text: "Company have data" },
    { kind: "structure", markerNum: 3, text: "Is bad for workers." },
    { kind: "structure", markerNum: 3, text: "This is good." },
    { kind: "vocab", markerNum: 4, text: "boring work" },
    { kind: "vocab", markerNum: 4, text: "do other thing" },
    { kind: "connectives", markerNum: 5, text: "First" },
    { kind: "connectives", markerNum: 5, text: "Second" },
    { kind: "connectives", markerNum: 5, text: "But" },
  ],
};

const priorityBySlug: Record<string, Priority> = {
  "alex-m": {
    color: "grammar",
    rank: "#1",
    title: "Your biggest lever: Grammar",
    text: "One single pattern, subject-verb agreement, causes 4 of your errors. Learning to spot it takes about 10 minutes and could move your grammar score from 7 to 10. Start with Exercise 1 on page 3.",
  },
  "jordan-k": {
    color: "vocab",
    rank: "#1",
    title: "Your finishing touch: precision in vocabulary",
    text: "Your writing is already advanced. The smallest gap between you and the top score is word-level precision. Three or four sharper choices in your next text can move you from 13 to 14. See Exercise 4 on page 3.",
  },
  "casey-r": {
    color: "grammar",
    rank: "#1",
    title: "Your fastest win: subject-verb agreement",
    text: "One pattern accounts for many of your slips: 'people talk' (not 'peoples talks'), 'companies have' (not 'company have'). Learning this single rule will improve several sentences at once. Start with Exercise 1 on page 3.",
  },
};

const potentialBySlug: Record<string, Record<string, PotentialEntry>> = {
  "alex-m": {
    grammar: { width: 20, label: "Fix 1 pattern, reach ~10" },
    sentenceStructure: { width: 13, label: "Add variety, reach ~11" },
    genVocabulary: { width: 13, label: "4 word swaps, reach ~12" },
    domainVocab: { width: 14, label: "2 new connectives, reach ~10" },
  },
  "jordan-k": {
    grammar: { width: 7, label: "Polish stylistic choices, reach 15" },
    sentenceStructure: { width: 13, label: "Try one new opener, reach 14" },
    genVocabulary: { width: 13, label: "Two sharper words, reach 14" },
    domainVocab: { width: 20, label: "Add 'admittedly' or 'nevertheless', reach 13" },
  },
  "casey-r": {
    grammar: { width: 27, label: "Fix one rule, reach ~7" },
    sentenceStructure: { width: 27, label: "Add detail to short sentences, reach ~6" },
    genVocabulary: { width: 27, label: "Three new word swaps, reach ~8" },
    domainVocab: { width: 27, label: "Three topic words, reach ~6" },
  },
};

const dateBySlug: Record<string, string> = {
  "alex-m": "May 7, 2026",
  "jordan-k": "May 7, 2026",
  "casey-r": "May 7, 2026",
};

const highlightsBySlug: Record<string, Highlight[]> = {
  "alex-m": [
    { kind: "grammar", text: "Topiks", note: "Spelling: 'Topics'" },
    { kind: "grammar", text: "lets", note: "Third person singular: 'let's' or context needs 'lets'" },
    { kind: "vocab", text: "the usage of AI in worklife", note: "More natural: 'the use of AI in working life'" },
    { kind: "grammar", text: "there is", note: "Subject-verb agreement: 'there are' (plural subject follows)" },
    { kind: "structure", text: "Companies that use AI systems collect large amounts of personal data, which could be misused.", note: "Strong complex sentence - good use of relative clause" },
    { kind: "grammar", text: "AI offer", note: "Subject-verb agreement: 'AI offers'" },
    { kind: "connectives", text: "Furthermore", note: "Good additive connector - used correctly" },
    { kind: "connectives", text: "However", note: "Good contrastive connector - used correctly" },
  ],
  "jordan-k": [
    { kind: "vocab", text: "considerably", note: "Precise adverb choice - strong academic register" },
    { kind: "structure", text: "By handling routine, repetitive tasks, artificial intelligence allows human workers to concentrate on strategic, creative endeavors that require emotional intelligence and complex problem-solving.", note: "Sophisticated participial opening with embedded list - very advanced" },
    { kind: "connectives", text: "Nevertheless", note: "Strong formal concession marker - excellent choice" },
  ],
  "casey-r": [
    { kind: "grammar", text: "Many peoples talks", note: "Double error: 'Many people talk' (no plural -s on 'people', no -s on verb)" },
    { kind: "grammar", text: "Company have data", note: "Article + agreement: 'Companies have data' or 'A company has data'" },
    { kind: "structure", text: "Is bad for workers.", note: "Fragment - missing subject: 'This is bad for workers.'" },
    { kind: "vocab", text: "boring work", note: "Informal - try: 'repetitive tasks' or 'routine work'" },
  ],
};

export function getAnnotations(slug: string): AnnotationSegment[] {
  return annotationsBySlug[slug] ?? [];
}

export function getPriority(slug: string): Priority | undefined {
  return priorityBySlug[slug];
}

export function getPotential(slug: string): Record<string, PotentialEntry> {
  return potentialBySlug[slug] ?? {};
}

export function getDate(slug: string): string {
  return dateBySlug[slug] ?? "May 7, 2026";
}

const uncertainBySlug: Record<string, UncertainSpan[]> = {
  "alex-m": [
    { text: "Topiks", confidence: 0.42, suggestion: "Topics?" },
    { text: "worklife", confidence: 0.61, suggestion: "work life? working life?" },
    { text: "stratigic", confidence: 0.38, suggestion: "strategic?" },
  ],
  "jordan-k": [
    { text: "endeavors", confidence: 0.65, suggestion: "endeavours?" },
    { text: "algorithmic", confidence: 0.58 },
  ],
  "casey-r": [
    { text: "peoples", confidence: 0.52, suggestion: "people's? peoples?" },
    { text: "thing", confidence: 0.47, suggestion: "things? think?" },
    { text: "secourity", confidence: 0.35, suggestion: "security?" },
  ],
};

export function getUncertainSpans(slug: string): UncertainSpan[] {
  return uncertainBySlug[slug] ?? [];
}

export function getHighlights(slug: string): Highlight[] {
  return highlightsBySlug[slug] ?? [];
}
