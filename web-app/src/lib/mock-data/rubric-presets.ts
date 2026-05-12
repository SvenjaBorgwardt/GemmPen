/**
 * GemmPen Mock Data - Rubric Presets
 */

import { RubricPreset } from '../types';

export const rubricPresets: RubricPreset[] = [
  {
    id: 'english-b1b2',
    name: 'English Writing B1-B2',
    icon: 'EN',
    description: 'Grammar, vocabulary, connectives, sentence structure',
    categories: [
      {
        id: 'grammar',
        name: 'Grammar',
        description: 'Morphological and syntactic correctness',
      },
      {
        id: 'sentenceStructure',
        name: 'Sentence Structure',
        description: 'Complexity, variety, cohesion',
      },
      {
        id: 'genVocabulary',
        name: 'General Vocabulary',
        description: 'Range and precision of word choice',
      },
      {
        id: 'domainVocab',
        name: 'Domain Vocabulary & Connectives',
        description: 'Subject-specific terms and linking devices',
      },
    ],
  },
  {
    id: 'economics-essay',
    name: 'Economics Essay',
    icon: 'EC',
    description: 'Argumentation, technical terms, use of data, structure',
    categories: [
      {
        id: 'argumentation',
        name: 'Argumentation',
        description: 'Thesis clarity and support',
      },
      {
        id: 'technical-terms',
        name: 'Technical Terms',
        description: 'Economics vocabulary accuracy',
      },
      {
        id: 'data-use',
        name: 'Use of Data',
        description: 'Statistical evidence and citations',
      },
      {
        id: 'structure',
        name: 'Structure',
        description: 'Organization and flow',
      },
    ],
  },
  {
    id: 'biology-lab',
    name: 'Biology Lab Report',
    icon: 'BIO',
    description: 'Scientific method, terminology, data analysis, conclusions',
    categories: [
      {
        id: 'scientific-method',
        name: 'Scientific Method',
        description: 'Hypothesis and procedure clarity',
      },
      {
        id: 'terminology',
        name: 'Terminology',
        description: 'Biological vocabulary accuracy',
      },
      {
        id: 'data-analysis',
        name: 'Data Analysis',
        description: 'Interpretation of results',
      },
      {
        id: 'conclusions',
        name: 'Conclusions',
        description: 'Summary and implications',
      },
    ],
  },
  {
    id: 'custom',
    name: 'Custom...',
    icon: '+',
    description: 'Describe your subject, AI suggests matching criteria',
    categories: [
      {
        id: 'custom1',
        name: 'Custom Category 1',
        description: 'Your rubric here',
      },
      {
        id: 'custom2',
        name: 'Custom Category 2',
        description: 'Your rubric here',
      },
    ],
  },
];
