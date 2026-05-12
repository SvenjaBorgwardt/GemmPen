export const CATEGORIES = {
  grammar: {
    id: 'grammar' as const,
    label: 'Grammar',
    shortLabel: 'GRM',
    color: '#B85C3A',
    bgColor: '#FCEEE8',
    borderColor: '#D4896E',
  },
  sentenceStructure: {
    id: 'sentenceStructure' as const,
    label: 'Sentence Structure',
    shortLabel: 'SS',
    color: '#7A8B5A',
    bgColor: '#EEF2E6',
    borderColor: '#9DAE82',
  },
  genVocabulary: {
    id: 'genVocabulary' as const,
    label: 'General Vocabulary',
    shortLabel: 'VOC',
    color: '#B8860B',
    bgColor: '#FDF3DC',
    borderColor: '#D4AD4A',
  },
  domainVocab: {
    id: 'domainVocab' as const,
    label: 'Domain Vocabulary & Connectives',
    shortLabel: 'CON',
    color: '#7A6B8A',
    bgColor: '#F0ECF4',
    borderColor: '#A89AB8',
  },
  content: {
    id: 'content' as const,
    label: 'Content / Arguments',
    shortLabel: 'CNT',
    color: '#C4841D',
    bgColor: '#FFF3E0',
    borderColor: '#D4A84A',
  },
  textStructure: {
    id: 'textStructure' as const,
    label: 'Text Structure',
    shortLabel: 'STR',
    color: '#C4841D',
    bgColor: '#FFF3E0',
    borderColor: '#D4A84A',
  },
} as const;

export type CategoryKey = keyof typeof CATEGORIES;

// Mapping von CategoryScore.id auf die kurzen Review-Keys
export const CATEGORY_FEEDBACK_MAP: Record<string, 'grammar' | 'structure' | 'vocab' | 'connectives'> = {
  grammar: 'grammar',
  sentenceStructure: 'structure',
  genVocabulary: 'vocab',
  domainVocab: 'connectives',
};

export const EXERCISE_COLORS = {
  correct: {
    bg: '#B6CFA0',
    fg: '#3F5F2C',
    border: '#A8C28D',
    explanationBg: '#CFE2C0',
  },
  hint: {
    bg: '#FDF3DC',
    border: '#D4AD4A',
  },
} as const;

export const CATEGORY_CSS_COLORS = {
  grammar: { fg: 'var(--cat-grammar)', bg: 'var(--cat-grammar-bg)' },
  structure: { fg: 'var(--cat-sentence)', bg: 'var(--cat-sentence-bg)' },
  vocab: { fg: 'var(--cat-vocabulary)', bg: 'var(--cat-vocabulary-bg)' },
  connectives: { fg: 'var(--cat-connectives)', bg: 'var(--cat-connectives-bg)' },
} as const;
