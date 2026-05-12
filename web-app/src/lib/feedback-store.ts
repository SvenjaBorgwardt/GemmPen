import type { CategoryId, DPOPair } from './types';

interface StoredCorrection {
  studentSlug: string;
  categoryId: CategoryId;
  feedbackText: string;
  score: number;
  action: 'approved' | 'edited' | 'regenerated';
  timestamp: string;
}

interface CalibrationState {
  pairs: DPOPair[];
  totalCorrections: number;
  currentThreshold: number;
}

const CORRECTIONS_KEY = 'gemmpen-corrections';
const CALIBRATION_KEY = 'gemmpen-calibration';

function correctionKey(studentSlug: string, categoryId: string): string {
  return `${studentSlug}::${categoryId}`;
}

function getCorrections(): Record<string, StoredCorrection> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(CORRECTIONS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function setCorrections(corrections: Record<string, StoredCorrection>) {
  localStorage.setItem(CORRECTIONS_KEY, JSON.stringify(corrections));
}

export function saveCorrection(correction: StoredCorrection) {
  const all = getCorrections();
  all[correctionKey(correction.studentSlug, correction.categoryId)] = correction;
  setCorrections(all);
}

export function getCorrection(studentSlug: string, categoryId: CategoryId): StoredCorrection | null {
  const all = getCorrections();
  return all[correctionKey(studentSlug, categoryId)] ?? null;
}

export function getAllCorrections(studentSlug: string): StoredCorrection[] {
  const all = getCorrections();
  return Object.values(all).filter((c) => c.studentSlug === studentSlug);
}

export function removeCorrection(studentSlug: string, categoryId: CategoryId) {
  const all = getCorrections();
  delete all[correctionKey(studentSlug, categoryId)];
  setCorrections(all);
}

// --- Calibration / DPO ---

const seedPairs: DPOPair[] = [
  {
    id: 'seed-1', timestamp: '2026-05-06T10:00:00Z', studentSlug: 'riley-p', categoryId: 'grammar',
    action: 'edited', modelFeedback: 'Your grammar needs improvement in several areas.',
    teacherFeedback: 'You have a solid foundation. Let us focus on one pattern: subject-verb agreement. Fix that, and several sentences improve at once.',
    modelScore: 8, teacherScore: 7, maxScore: 15,
    evidenceQuotes: ['The company have to invest in new technology', 'Many worker is afraid of losing their jobs'],
  },
  {
    id: 'seed-2', timestamp: '2026-05-06T10:05:00Z', studentSlug: 'riley-p', categoryId: 'genVocabulary',
    action: 'edited', modelFeedback: 'Vocabulary range is limited. Use more advanced words.',
    teacherFeedback: 'You already use clear words. The next step is swapping just two or three for slightly more precise ones. "Important" becomes "essential". Small changes, big effect.',
    modelScore: 9, teacherScore: 9, maxScore: 15,
    evidenceQuotes: ['AI is important for the future', 'This is a good thing for companies'],
  },
  {
    id: 'seed-3', timestamp: '2026-05-06T10:10:00Z', studentSlug: 'morgan-l', categoryId: 'sentenceStructure',
    action: 'regenerated', modelFeedback: 'Sentence structure shows limited variety with mostly SVO patterns.',
    teacherFeedback: 'You build solid sentences. Now try flipping one: instead of starting with the subject, start with a detail. "In the manufacturing sector, robots have replaced..." Same idea, new rhythm.',
    modelScore: 8, teacherScore: 8, maxScore: 15,
    evidenceQuotes: ['Robots replace workers in factories.', 'Companies use AI to save money.', 'Employees need to learn new skills.'],
  },
  {
    id: 'seed-4', timestamp: '2026-05-06T10:15:00Z', studentSlug: 'morgan-l', categoryId: 'domainVocab',
    action: 'edited', modelFeedback: 'Domain vocabulary is adequate but connectives are repetitive.',
    teacherFeedback: 'Your topic words are solid. For connectives, you rely on "furthermore" and "however". Try one new one next time: "nevertheless" or "in contrast". One swap is enough.',
    modelScore: 6, teacherScore: 7, maxScore: 15,
    evidenceQuotes: ['Furthermore, AI can help companies. However, there are risks.', 'Furthermore, employees might lose their jobs.'],
  },
  {
    id: 'seed-5', timestamp: '2026-05-06T11:00:00Z', studentSlug: 'dakota-h', categoryId: 'grammar',
    action: 'edited', modelFeedback: 'Multiple grammatical errors throughout the text.',
    teacherFeedback: 'Here is the good news: your ideas are clear. The grammar slips follow a pattern. Focus on articles: "the company" not "company". Once you see the pattern, you will catch it yourself.',
    modelScore: 6, teacherScore: 6, maxScore: 15,
    evidenceQuotes: ['Company should invest in training', 'In future, robots will do most of work'],
  },
  {
    id: 'seed-6', timestamp: '2026-05-06T11:05:00Z', studentSlug: 'dakota-h', categoryId: 'genVocabulary',
    action: 'regenerated', modelFeedback: 'Word choice is basic and imprecise.',
    teacherFeedback: 'You communicate clearly, and that matters. To grow your score, pick your three most-used words ("good", "bad", "thing") and learn one replacement for each. "Good" becomes "beneficial". Try it once in your next text.',
    modelScore: 7, teacherScore: 7, maxScore: 15,
    evidenceQuotes: ['AI is a good thing for the company', 'It is bad when people lose their jobs', 'The thing is that we need new rules'],
  },
  {
    id: 'seed-7', timestamp: '2026-05-06T11:20:00Z', studentSlug: 'fin-s', categoryId: 'sentenceStructure',
    action: 'edited', modelFeedback: 'Sentence patterns are repetitive.',
    teacherFeedback: 'You write clear sentences. The pattern you use most is subject-verb-object. That works, but your reader notices the repetition. Try starting one sentence with "Although..." or "Despite...". Just one is enough to break the rhythm.',
    modelScore: 8, teacherScore: 8, maxScore: 15,
    evidenceQuotes: ['AI helps companies. AI saves time. AI reduces costs.', 'Workers need training. Workers feel scared.'],
  },
  {
    id: 'seed-8', timestamp: '2026-05-06T11:25:00Z', studentSlug: 'fin-s', categoryId: 'domainVocab',
    action: 'edited', modelFeedback: 'Connective usage is functional but limited.',
    teacherFeedback: 'You use the right connectives in the right places. That is more than many students manage. To reach the next level, add one concession: "Admittedly" or "To be sure". This shows your reader you can see both sides.',
    modelScore: 8, teacherScore: 8, maxScore: 15,
    evidenceQuotes: ['However, there are also advantages', 'Furthermore, I believe that automation can help'],
  },
];

function getCalibration(): CalibrationState {
  if (typeof window === 'undefined') {
    return { pairs: seedPairs, totalCorrections: seedPairs.length, currentThreshold: 30 };
  }
  try {
    const raw = localStorage.getItem(CALIBRATION_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* fall through */ }
  const initial: CalibrationState = {
    pairs: seedPairs,
    totalCorrections: seedPairs.length,
    currentThreshold: 30,
  };
  localStorage.setItem(CALIBRATION_KEY, JSON.stringify(initial));
  return initial;
}

function setCalibration(state: CalibrationState) {
  localStorage.setItem(CALIBRATION_KEY, JSON.stringify(state));
}

export function addDPOPair(pair: Omit<DPOPair, 'id' | 'timestamp'>) {
  const state = getCalibration();
  const newPair: DPOPair = {
    ...pair,
    id: `dpo-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    timestamp: new Date().toISOString(),
  };
  state.pairs.push(newPair);
  state.totalCorrections += 1;
  if (state.totalCorrections >= state.currentThreshold) {
    if (state.currentThreshold === 30) state.currentThreshold = 50;
    else if (state.currentThreshold === 50) state.currentThreshold = 70;
  }
  setCalibration(state);
}

export function incrementCalibrationCount() {
  const state = getCalibration();
  state.totalCorrections += 1;
  if (state.totalCorrections >= state.currentThreshold) {
    if (state.currentThreshold === 30) state.currentThreshold = 50;
    else if (state.currentThreshold === 50) state.currentThreshold = 70;
  }
  setCalibration(state);
}

export function getCalibrationState(): CalibrationState {
  return getCalibration();
}

// --- DPO Export ---

interface DPOTrainingPair {
  conversations: [
    { role: 'system'; content: string },
    { role: 'user'; content: string },
    { role: 'model'; content: string }
  ];
  rejected: [
    { role: 'system'; content: string },
    { role: 'user'; content: string },
    { role: 'model'; content: string }
  ];
}

export function exportDPOPairs(): string {
  const state = getCalibrationState();
  const lines = state.pairs.map(pair => {
    const systemPrompt = `You are GemmPen, an English exam feedback assistant. ` +
      `Write encouraging, specific feedback for B1/B2 students. ` +
      `Always cite the student's own words. Never use negative words like "wrong" or "poor".`;

    let userPrompt = `Category: ${pair.categoryId}\n` +
      `Score: ${pair.teacherScore}/${pair.maxScore}\n`;

    if (pair.evidenceQuotes && pair.evidenceQuotes.length > 0) {
      userPrompt += `\nThe student wrote:\n`;
      userPrompt += pair.evidenceQuotes.map(q => `- "${q}"`).join('\n');
      userPrompt += '\n';
    }

    userPrompt += `\nWrite feedback for this student's ${pair.categoryId} performance.`;

    const training: DPOTrainingPair = {
      conversations: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
        { role: 'model', content: pair.teacherFeedback },
      ],
      rejected: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
        { role: 'model', content: pair.modelFeedback },
      ],
    };
    return JSON.stringify(training);
  });
  return lines.join('\n');
}
