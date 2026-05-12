/**
 * GemmPen Mock Data - Students
 * All student details and the main student list.
 */

import {
  Student,
  StudentDetail,
  AppState,
} from '../types';
import { CATEGORIES } from '../constants';
import { classStats } from './class-stats';
import { rubricPresets } from './rubric-presets';

const categoryColorMap = CATEGORIES;

const alexMDetail: StudentDetail = {
  slug: 'alex-m',
  name: 'Alex M.',
  taskInfo: 'Task A2: Comment Writing - AI in the Workplace',
  transcript: `At this point in time Artificial Intelligence (AI) is one of the most talked about Topiks. For this matter the question: Should AI be included in the daily worklife? is bigger than ever. So lets have a look at both sides.

First of all, one of the strongest arguments against the usage of AI in worklife is the potential loss of jobs. Many employees fear that AI could replace them in their positions. For example, in the manufacturing industry, robots have already taken over many tasks that were previously done by humans.

Furthermore, there is also concerns about data privacy. Companies that use AI systems collect large amounts of personal data, which could be misused. A recent study showed that 67% of employees are worried about how their data is being used by AI systems at work.

However, looking at the other side, AI offer many benefits for the workplace. It can automate repetitive tasks and allow employees to focus on more creative and strategic work.`,
  gradePoints: 10,
  gradeLetter: 'B',
  contentScore: 16,
  textStructureScore: 9,
  categoryScores: [
    {
      id: 'grammar',
      label: 'Grammar',
      score: 7,
      maxScore: 15,
      color: categoryColorMap.grammar.color,
      bgColor: categoryColorMap.grammar.bgColor,
      borderColor: categoryColorMap.grammar.borderColor,
      reasoning:
        'Basic command of grammatical structures. Frequent subject-verb agreement errors and article misuse, but text remains broadly comprehensible. Tense usage is mostly consistent within paragraphs.',
      evidenceQuotes: [
        '"there is also concerns about data privacy"',
        '"AI offer many benefits for the workplace"',
        '"So lets have a look at both sides"',
      ],
      errorTags: [
        'Subject-verb agreement',
        'Article errors',
        'Apostrophe not used',
      ],
    },
    {
      id: 'sentenceStructure',
      label: 'Sentence Structure',
      score: 9,
      maxScore: 15,
      color: categoryColorMap.sentenceStructure.color,
      bgColor: categoryColorMap.sentenceStructure.bgColor,
      borderColor: categoryColorMap.sentenceStructure.borderColor,
      reasoning:
        'Generally clear sentence construction. Some variety in sentence openers (adverbial phrases, subordinate clauses). Occasional run-on sentences weaken coherence. Could benefit from more complex embedded clauses.',
      evidenceQuotes: [
        '"First of all, one of the strongest arguments against the usage of AI in worklife is the potential loss of jobs."',
        '"Companies that use AI systems collect large amounts of personal data, which could be misused."',
      ],
      errorTags: ['Run-on sentences', 'Repetitive SVO pattern'],
    },
    {
      id: 'genVocabulary',
      label: 'General Vocabulary',
      score: 10,
      maxScore: 15,
      color: categoryColorMap.genVocabulary.color,
      bgColor: categoryColorMap.genVocabulary.bgColor,
      borderColor: categoryColorMap.genVocabulary.borderColor,
      reasoning:
        'Functional vocabulary that conveys meaning clearly. Uses some precise expressions ("potential loss of jobs", "repetitive tasks") alongside more generic phrasing. Room for improvement in avoiding overused words like "many" and "things".',
      evidenceQuotes: [
        '"automate repetitive tasks and allow employees to focus on more creative and strategic work"',
      ],
      errorTags: ['Limited range', 'Generic phrasing'],
    },
    {
      id: 'domainVocab',
      label: 'Domain Vocabulary & Connectives',
      score: 8,
      maxScore: 15,
      color: categoryColorMap.domainVocab.color,
      bgColor: categoryColorMap.domainVocab.bgColor,
      borderColor: categoryColorMap.domainVocab.borderColor,
      reasoning:
        'Uses key terms like "AI", "data privacy", and "manufacturing industry" correctly. Connectives are functional but limited to "first of all", "furthermore", "however". Could benefit from "nevertheless", "in contrast", or "consequently".',
      evidenceQuotes: ['"First of all" / "Furthermore" / "However"'],
      errorTags: ['Limited connective range', 'Adequate domain terms'],
    },
  ],
  feedbackItems: [
    {
      categoryId: 'grammar',
      label: 'Grammar',
      score: 7,
      maxScore: 15,
      color: categoryColorMap.grammar.color,
      bgColor: categoryColorMap.grammar.bgColor,
      feedbackText:
        'Good news first: your reader always understands what you mean. That matters a lot. Now here is something interesting. You made the same type of grammar mistake four times in your text. It is called subject-verb agreement. This is one of the most common patterns at this level, and here is why it is great news: once you learn to spot it, four errors disappear in one go.',
      altFeedbackText:
        'Your text is easy to follow, and that is a real strength. Let us zoom in on one specific pattern that appears several times: subject-verb agreement. When you write "there is concerns", the verb "is" does not match the plural "concerns". The same thing happens with "AI offer". Fixing this one rule will clean up multiple sentences at once. It is the fastest win available to you right now.',
      quotes: [
        {
          text: 'You wrote: "there is also concerns about data privacy"',
          explanation:
            'The trick: "concerns" is plural, so it needs "are". Read it out loud. "there are concerns". Hear the difference?',
        },
        {
          text: 'You wrote: "AI offer many benefits"',
          explanation:
            'AI is one thing (singular), so it needs "offers". Think of it like this: "He offers" not "He offer".',
        },
      ],
      tip: 'Subject-verb agreement is one of those patterns where fixing one rule fixes many sentences at once. Exercise 1 on the next page lets you practice exactly this. You will probably notice how quickly it starts to feel natural.',
    },
    {
      categoryId: 'sentenceStructure',
      label: 'Sentence Structure',
      score: 9,
      maxScore: 15,
      color: categoryColorMap.sentenceStructure.color,
      bgColor: categoryColorMap.sentenceStructure.bgColor,
      feedbackText:
        'You are already doing something that few students at your level can do. Look at this sentence you wrote: a complex sentence with a relative clause. Nice work. The reason you scored 9 instead of higher is that most of your other sentences follow the same pattern: subject first, then verb, then object. Your reader notices the repetition. The fix is simple, and you already have the skills for it.',
      altFeedbackText:
        'Here is what stands out: you already write complex sentences with relative clauses. That is a real skill. The gap between 9 and 11 points is about variety. Most of your sentences start with the subject. Try flipping a few: "By automating tasks, AI..." instead of "AI can automate tasks." Same meaning, different rhythm. Your reader will notice the confidence.',
      quotes: [
        {
          text: '"Companies that use AI systems collect large amounts of personal data, which could be misused."',
        },
      ],
      tip: 'You wrote "AI can automate repetitive tasks." Now flip it: "By automating repetitive tasks, AI frees up time for creative work." Same idea, but the sentence feels more confident. Exercise 2 on the next page gives you a chance to practice this with your own sentences.',
    },
    {
      categoryId: 'genVocabulary',
      label: 'General Vocabulary',
      score: 10,
      maxScore: 15,
      color: categoryColorMap.genVocabulary.color,
      bgColor: categoryColorMap.genVocabulary.bgColor,
      feedbackText:
        'This is your strongest category, and you should feel good about that. Look at what you already do well. That is precise, confident language. You are close to the next level. The difference between 10 and 12 points is often just three or four word swaps in the whole text.',
      altFeedbackText:
        'Vocabulary is where you shine. Phrases like "automate repetitive tasks" and "creative and strategic work" show real precision. You are already at 10 out of 15. To reach 12, the trick is not learning new words but replacing a few you overuse. "Many" appears four times. Swap two for "a growing number of" or "the majority of" and your range jumps.',
      quotes: [
        {
          text: '"automate repetitive tasks and allow employees to focus on more creative and strategic work"',
        },
      ],
      tip: 'You used "many" four times. What if two of those became "a growing number of" or "the majority of"? Same meaning, but it shows range. That is all it takes.',
    },
    {
      categoryId: 'domainVocab',
      label: 'Domain Vocabulary & Connectives',
      score: 8,
      maxScore: 15,
      color: categoryColorMap.domainVocab.color,
      bgColor: categoryColorMap.domainVocab.bgColor,
      feedbackText:
        'You clearly understand the topic. "data privacy", "manufacturing industry", "automation" are all used correctly. Where you can grow is in your connectives. Right now you use three: "first of all", "furthermore", "however". They work, but your reader notices the repetition. Think of connectives like spices. The same three get boring, but adding one or two new ones changes the whole flavor.',
      altFeedbackText:
        'Your topic vocabulary is solid: "data privacy", "manufacturing industry", "automation" all land correctly. The area to grow is connectives. You use "first of all", "furthermore", and "however" well, but they repeat. Try swapping one for "nevertheless" or "in contrast". Just one new connective in your next text will make a visible difference.',
      quotes: [],
      tip: 'You already use connectives. That is more than many students do. The next step is simply swapping a few words you already know for ones that sound fresher. Exercise 3 on the next page is built around exactly this.',
    },
    {
      categoryId: 'content',
      label: 'Content / Arguments',
      score: 16,
      maxScore: 27,
      color: categoryColorMap.content.color,
      bgColor: categoryColorMap.content.bgColor,
      feedbackText:
        'You present two clear counter-arguments with claims, reasons, and examples. That is solid argumentation. Your own side is started but your text appears truncated. What you have shows good structure: each argument follows the Claim-Reason-Example pattern. To reach a higher score, make sure all three own arguments are fully developed with examples.',
      altFeedbackText:
        'Your argumentation follows a clear pattern: you state a claim, give a reason, and back it up with an example. Two of your counter-arguments do this well. Your own arguments are started but the text seems to end early. When you finish the text, apply the same Claim-Reason-Example structure to your own side. That alone could move your score from 16 to 20.',
      quotes: [
        {
          text: '"Many employees fear that AI could replace them... robots have already taken over many tasks"',
          explanation:
            'This is a complete argument: claim (fear of replacement), reason (AI can do the work), example (manufacturing robots). Well done.',
        },
      ],
      tip: 'You already know the CRE pattern (Claim, Reason, Example). Apply it consistently to every argument, including your own side. Three complete arguments on each side is the target.',
    },
    {
      categoryId: 'textStructure',
      label: 'Text Structure',
      score: 9,
      maxScore: 15,
      color: categoryColorMap.content.color,
      bgColor: categoryColorMap.content.bgColor,
      feedbackText:
        'Your text has a clear introduction that names the topic and previews both sides. Counter-arguments come before your own position, which is the right order. The bridge between the two sides ("However, looking at the other side") works but could be stronger. Your paragraph organization is logical and easy to follow.',
      altFeedbackText:
        'Good structure: you open with the topic, present counter-arguments first, then switch to your own side. That is the correct order for a comment. The bridge sentence "However, looking at the other side" does the job but feels generic. A stronger bridge might reference what came before: "While these risks are real, the benefits of AI deserve equal attention." Small upgrade, big impact.',
      quotes: [],
      tip: 'Your structure is already logical. To push higher, strengthen your bridge sentence between counter-arguments and own arguments. Make it reference the previous section instead of just saying "on the other hand".',
    },
  ],
  exercises: [
    {
      number: 1,
      type: 'fill-blank',
      categoryId: 'grammar',
      sourceHint: 'From markers 3 and 4 in your text',
      instruction: 'Each sentence is based on your exam. Fill in the correct verb form.',
      content: {
        sentences: [
          'a) "There ____ (is / are) also concerns about data privacy in the workplace."',
          'b) "Artificial Intelligence ____ (offer / offers) many benefits for modern companies."',
          'c) "The use of AI, along with robotics, ____ (change / changes) how we work."',
          'd) "Each of the employees ____ (fear / fears) being replaced by a machine."',
        ],
      },
      correctAnswers: ['are', 'offers', 'changes', 'fears'],
      explanation:
        'These are all subject-verb agreement patterns. The trick is to identify the real subject. In (a), "concerns" is plural. In (b), "AI" is singular. In (c) the subject is "use" (singular), not "robotics". In (d), "each" is singular, even though it refers to multiple people.',
    },
    {
      number: 2,
      type: 'rewrite',
      categoryId: 'sentenceStructure',
      sourceHint: 'Building on your strength',
      instruction: 'These are from your exam. Rewrite each one so it starts with something other than the subject.',
      content: {
        sentences: [
          'a) Your sentence: "AI can automate repetitive tasks and allow employees to focus on creative work."',
          'b) Your sentence: "Many employees fear that AI could replace them in their positions."',
        ],
      },
      correctAnswers: [
        'By automating repetitive tasks, AI frees up time for creative work.',
        'In many positions, AI threatens to replace human workers.',
      ],
      explanation:
        'Good rewrite examples: (a) "By automating..." starts with a gerund phrase. That changes the rhythm. (b) "In many positions..." or "Due to automation concerns, many employees..." give new perspective. The key is that you are reshaping the idea, not changing the meaning.',
    },
    {
      number: 3,
      type: 'multiple-choice',
      categoryId: 'domainVocab',
      sourceHint: 'Expanding your range',
      instruction:
        'You used "first of all", "furthermore", and "however" in your text. Replace each one with a stronger alternative.',
      content: {
        options: [
          {
            letter: 'A',
            text: 'In addition to this, there are concerns...',
            isCorrect: true,
            hint: 'This is close to "furthermore" but not stronger. Keep going.',
          },
          {
            letter: 'B',
            text: 'As a result, there are concerns...',
            isCorrect: false,
            hint: '"As a result" suggests causation, not addition. Not the right connective here.',
          },
          {
            letter: 'C',
            text: 'In contrast, there are concerns...',
            isCorrect: false,
            hint: 'This suggests contradiction. But this paragraph is adding to the argument, not contrasting.',
          },
        ],
      },
      correctAnswers: ['A'],
      explanation:
        'For addition, your options are "In addition to this" (more formal than "Furthermore"), "Moreover", or "Additionally". All are stronger than "furthermore". For the second blank, "Nevertheless" works better than "However" because it emphasizes the contrast more sharply.',
    },
    {
      number: 4,
      type: 'fill-blank',
      categoryId: 'grammar',
      sourceHint: 'From markers 1, 2, and 5 in your text',
      instruction:
        'These sentences are copied directly from your exam. Each one has something that could be improved. Can you spot it?',
      content: {
        sentences: [
          'a) "AI is one of the most talked about Topiks."',
          'b) "So lets have a look at both sides."',
          'c) "Should AI be included in the daily worklife?"',
        ],
      },
      correctAnswers: ['Topics', "let\'s", 'workplace'],
      explanation:
        'a) "Topiks" should be "Topics" (spelling). b) "lets" needs an apostrophe: "let\'s" (contraction of "let us"). c) "worklife" is two words: "work life" or the single word "workplace" is more common. These are small fixes that make a big difference.',
    },
  ],
};

const jordanKDetail: StudentDetail = {
  slug: 'jordan-k',
  name: 'Jordan K.',
  taskInfo: 'Task A2: Comment Writing - AI in the Workplace',
  transcript: `Artificial Intelligence has become central to discussions about the future of work, yet opinions vary considerably. I will examine both potential drawbacks and significant advantages before concluding.

Initially, critics argue that automation may displace workers across multiple sectors. Manufacturing and customer service have already seen substantial job transitions due to intelligent systems. Research indicates that approximately two-thirds of employees express concerns about technological displacement. This represents a valid perspective that warrants serious consideration in policy discussions.

Additionally, organizations collecting vast datasets for AI training raise legitimate privacy concerns. Data protection regulations like GDPR reflect growing awareness of these risks. Employees rightfully question how their personal information is processed and stored by algorithmic systems.

However, the evidence increasingly suggests that AI creates more opportunities than it eliminates. By handling routine, repetitive tasks, artificial intelligence allows human workers to concentrate on strategic, creative endeavors that require emotional intelligence and complex problem-solving. Emerging data suggests that companies implementing AI experience productivity gains and can redirect their workforce toward higher-value work. Furthermore, new roles in AI development, maintenance, and oversight are emerging rapidly. The transition, though challenging, ultimately enhances both worker satisfaction and organizational performance.`,
  gradePoints: 13,
  gradeLetter: 'A-',
  contentScore: 23,
  textStructureScore: 13,
  categoryScores: [
    {
      id: 'grammar',
      label: 'Grammar',
      score: 14,
      maxScore: 15,
      color: categoryColorMap.grammar.color,
      bgColor: categoryColorMap.grammar.bgColor,
      borderColor: categoryColorMap.grammar.borderColor,
      reasoning:
        'Consistently correct grammatical structures throughout. Subject-verb agreement is flawless. Tense shifts are intentional and controlled. Minor observation: "which" clauses are sometimes preceded by commas. This is stylistic and acceptable at this level.',
      evidenceQuotes: [
        '"Artificial Intelligence has become central to discussions about the future of work"',
        '"By handling routine, repetitive tasks, artificial intelligence allows human workers to concentrate..."',
      ],
      errorTags: ['Comma before which (stylistic)', 'Excellent control'],
    },
    {
      id: 'sentenceStructure',
      label: 'Sentence Structure',
      score: 12,
      maxScore: 15,
      color: categoryColorMap.sentenceStructure.color,
      bgColor: categoryColorMap.sentenceStructure.bgColor,
      borderColor: categoryColorMap.sentenceStructure.borderColor,
      reasoning:
        'Sophisticated sentence variety. Opening with participial phrases, gerunds, and subordinate clauses. Excellent use of complex structures with relative clauses. Some sentences could be even more varied, but overall demonstrates command well above average.',
      evidenceQuotes: [
        '"By handling routine, repetitive tasks, artificial intelligence allows..."',
        '"Data protection regulations like GDPR reflect growing awareness of these risks."',
      ],
      errorTags: ['Advanced complexity', 'Strong variety'],
    },
    {
      id: 'genVocabulary',
      label: 'General Vocabulary',
      score: 13,
      maxScore: 15,
      color: categoryColorMap.genVocabulary.color,
      bgColor: categoryColorMap.genVocabulary.bgColor,
      borderColor: categoryColorMap.genVocabulary.borderColor,
      reasoning:
        'Impressive range and precision. Uses advanced vocabulary appropriately: "displace", "algorithmic", "emotional intelligence", "endeavors". Word choice is consistently sophisticated. Minor suggestion: one phrase could be even more precise.',
      evidenceQuotes: [
        '"concentrates on strategic, creative endeavors that require emotional intelligence"',
      ],
      errorTags: ['Advanced lexicon', 'Precise word choice'],
    },
    {
      id: 'domainVocab',
      label: 'Domain Vocabulary & Connectives',
      score: 11,
      maxScore: 15,
      color: categoryColorMap.domainVocab.color,
      bgColor: categoryColorMap.domainVocab.bgColor,
      borderColor: categoryColorMap.domainVocab.borderColor,
      reasoning:
        'Excellent grasp of domain terminology: "automation", "algorithmic systems", "GDPR", "productivity gains". Connectives are varied and appropriate: "Initially", "Additionally", "However", "Furthermore". Could occasionally use "Nevertheless" or "Admittedly" for even more sophistication.',
      evidenceQuotes: [
        '"Data protection regulations like GDPR reflect growing awareness"',
        '"By handling routine, repetitive tasks..."',
      ],
      errorTags: ['Strong domain vocabulary', 'Varied connectives'],
    },
  ],
  feedbackItems: [
    {
      categoryId: 'grammar',
      label: 'Grammar',
      score: 14,
      maxScore: 15,
      color: categoryColorMap.grammar.color,
      bgColor: categoryColorMap.grammar.bgColor,
      feedbackText:
        'Your command of grammar is evident throughout. Every verb agrees perfectly with its subject, every tense choice is intentional, and every article is in place. You are writing at a level where grammatical accuracy allows your ideas to shine. This is something to build on.',
      altFeedbackText:
        'Grammar is clearly your strength. Subject-verb agreement, tense consistency, article usage: all controlled throughout. At 14 out of 15, the remaining point is stylistic polish, not error correction. The comma before "which" clauses is a deliberate choice, and it works.',
      quotes: [
        {
          text: '"By handling routine, repetitive tasks, artificial intelligence allows human workers to concentrate on strategic, creative endeavors"',
          explanation:
            'This sentence shows perfect control. The participial phrase, the parallel structure, the subject-verb agreement. All flawless.',
        },
      ],
      tip: 'You are already doing this well. The only note: commas before "which" clauses are optional. Both are correct. Your choice is stylistically sound.',
    },
    {
      categoryId: 'sentenceStructure',
      label: 'Sentence Structure',
      score: 12,
      maxScore: 15,
      color: categoryColorMap.sentenceStructure.color,
      bgColor: categoryColorMap.sentenceStructure.bgColor,
      feedbackText:
        'You demonstrate genuine variety in sentence structure. You open paragraphs with adverbial phrases, embed complex clauses smoothly, and show control of rhythm. This is rare at this level. To reach the very highest score, experiment with even more unconventional openers or occasional asides set off by dashes.',
      altFeedbackText:
        'Your sentence variety is impressive: participial openers, embedded clauses, controlled rhythm. You are at 12 out of 15, which means the structure supports your ideas well. To push to 14, try one unexpected move per paragraph. A very short sentence after a long one. A rhetorical question. A dash-separated aside. These breaks in pattern show mastery.',
      quotes: [
        {
          text: '"By handling routine, repetitive tasks, artificial intelligence allows..."',
          explanation:
            'This is a strong opener. It immediately shows sentence variety and sophistication.',
        },
      ],
      tip: 'You could occasionally try: "Complex problem-solving, emotional intelligence, strategic thinking. These are the skills AI cannot replace." Short declarative sentences after complex ones create rhythm.',
    },
    {
      categoryId: 'genVocabulary',
      label: 'General Vocabulary',
      score: 13,
      maxScore: 15,
      color: categoryColorMap.genVocabulary.color,
      bgColor: categoryColorMap.genVocabulary.bgColor,
      feedbackText:
        'Your vocabulary is genuinely advanced. "Displace", "algorithmic", "endeavors", "organizational performance". These are not words most students use naturally. You are writing with confidence and precision. To reach 14 or 15, challenge yourself to find one or two even more striking words in revision.',
      altFeedbackText:
        'Words like "displace", "algorithmic", "endeavors", and "organizational performance" show genuine vocabulary range. You are at 13 out of 15. The gap to 15 is not about learning new words but about revision: finding two or three moments where a more unexpected word creates impact. "Express concerns" could become "voice apprehensions". Small refinements compound.',
      quotes: [
        {
          text: '"strategic, creative endeavors that require emotional intelligence and complex problem-solving"',
        },
      ],
      tip: 'You are already excellent here. One challenge: instead of "very", try "remarkably" or "substantially". Instead of "many", try "proliferating" or "burgeoning". These tiny upgrades compound.',
    },
    {
      categoryId: 'domainVocab',
      label: 'Domain Vocabulary & Connectives',
      score: 11,
      maxScore: 15,
      color: categoryColorMap.domainVocab.color,
      bgColor: categoryColorMap.domainVocab.bgColor,
      feedbackText:
        'You clearly master the topic vocabulary. GDPR, algorithmic systems, automation, productivity gains. Every technical term is used correctly and confidently. Your connectives are strong and varied. You move smoothly from one idea to the next. One small suggestion: experiment with "Admittedly" or "To be sure" to concede points even more gracefully.',
      altFeedbackText:
        'Domain vocabulary is a clear strength: GDPR, algorithmic systems, automation, productivity gains. All used correctly. Your connectives are varied: "Initially", "Additionally", "However", "Furthermore". To reach 13, add one concessive connective. "Admittedly" or "To be sure" before a counterargument shows rhetorical maturity.',
      quotes: [
        {
          text: '"Data protection regulations like GDPR reflect growing awareness of these risks."',
          explanation:
            'Perfect integration of domain terminology with clear, confident language.',
        },
      ],
      tip: 'Try opening one paragraph with "To be sure" or "Admittedly" before presenting a counterargument. This rhetorical move shows maturity and makes your own arguments even stronger by contrast.',
    },
    {
      categoryId: 'content',
      label: 'Content / Arguments',
      score: 23,
      maxScore: 27,
      color: categoryColorMap.content.color,
      bgColor: categoryColorMap.content.bgColor,
      feedbackText:
        'All three counter-arguments and all three own arguments are complete with Claim, Reason, and Example. Your reasoning is sophisticated and well-supported throughout. You present a clear position and defend it with confidence. This is excellent argumentation.',
      altFeedbackText:
        'Your argumentation is thorough: six complete arguments, each following the Claim-Reason-Example structure. The reasoning is mature, and your position is clear. To push from 23 to 25, one strategy is to anticipate and address a possible weakness in your own argument. "One might object that... yet the evidence shows..." This pre-emptive move strengthens your case.',
      quotes: [
        {
          text: '"By handling routine, repetitive tasks, artificial intelligence allows human workers to concentrate..."',
          explanation:
            'A complete argument: claim (AI frees humans), reason (handles routine tasks), example (strategic and creative work). Textbook CRE.',
        },
      ],
      tip: 'Your arguments are already strong. To reach the top, try addressing one potential objection within your own argument. This shows critical thinking beyond the basic structure.',
    },
    {
      categoryId: 'textStructure',
      label: 'Text Structure',
      score: 13,
      maxScore: 15,
      color: categoryColorMap.content.color,
      bgColor: categoryColorMap.content.bgColor,
      feedbackText:
        'Confident introduction that names the topic and previews the structure. Bridge sentences are smooth and intentional. Counter-arguments precede own arguments. Paragraph organization is excellent. A conclusion that reinforces your position would complete the picture.',
      altFeedbackText:
        'Your structure is nearly textbook: introduction with preview, counter-arguments first, then own position, smooth bridges throughout. At 13 out of 15, the gap is in the conclusion. A strong closing paragraph that synthesizes your argument and restates your position would push this to 14 or 15.',
      quotes: [
        {
          text: '"I will examine both potential drawbacks and significant advantages before concluding."',
          explanation:
            'This preview sentence tells the reader exactly what to expect. It shows structural awareness.',
        },
      ],
      tip: 'Add a conclusion that does more than summarize. Reference your strongest argument and make a forward-looking statement. "As workplaces evolve, the question is not whether to adopt AI, but how to do so responsibly."',
    },
  ],
  exercises: [
    {
      number: 1,
      type: 'fill-blank',
      categoryId: 'grammar',
      sourceHint: 'Participial construction challenge',
      instruction:
        'Complete the participial phrase. Choose the correct form and complete the sentence.',
      content: {
        sentences: [
          'a) "____ (Handling / Have handled) routine tasks efficiently, AI systems free human workers for higher-value work."',
          'b) "The regulations ____ (governing / governed) data protection vary widely across regions."',
        ],
      },
      correctAnswers: ['Handling', 'governing'],
      explanation:
        'Participles at the start of a sentence must relate to the subject. "Handling" (present participle) refers to "AI systems" doing the handling. "Governing" (present participle) describes which regulations we mean.',
    },
    {
      number: 2,
      type: 'rewrite',
      categoryId: 'sentenceStructure',
      sourceHint: 'Pushing complexity higher',
      instruction:
        'Rewrite using the structure shown. Maintain your meaning but upgrade the sophistication.',
      content: {
        sentences: [
          'a) Original: "Companies implementing AI experience productivity gains."',
          'b) Original: "New roles in AI development are emerging rapidly."',
        ],
      },
      correctAnswers: [
        'Organizations leveraging AI for automation report measurable productivity gains alongside workforce restructuring opportunities.',
        'Emergent sectors in AI development, maintenance, and governance present unprecedented career pathways.',
      ],
      explanation:
        'Notice how these rewrites use more precise verbs ("leveraging" vs. "implementing", "report measurable" vs. "experience"), add nuance ("alongside workforce restructuring"), and expand scope ("Emergent sectors", "maintenance, and governance").',
    },
    {
      number: 3,
      type: 'multiple-choice',
      categoryId: 'domainVocab',
      sourceHint: 'Upgrading connectives',
      instruction:
        'Your connectives are strong. These upgrades would push you from 11 to 13 points. Choose the most sophisticated.',
      content: {
        options: [
          {
            letter: 'A',
            text: 'Nevertheless, the evidence increasingly suggests that...',
            isCorrect: true,
            hint: 'Strong! "Nevertheless" is more formal and emphatic than "However".',
          },
          {
            letter: 'B',
            text: 'However, the evidence increasingly suggests that...',
            isCorrect: false,
            hint: 'Correct, but less sophisticated than the alternative.',
          },
          {
            letter: 'C',
            text: 'Still, the evidence increasingly suggests that...',
            isCorrect: false,
            hint: 'Too informal for this formal essay.',
          },
        ],
      },
      correctAnswers: ['A'],
      explanation:
        '"Nevertheless" is more emphatic and formal, suggesting stronger contrast. At your level, word choice like this distinguishes 13/15 from 11/15.',
    },
    {
      number: 4,
      type: 'rewrite',
      categoryId: 'genVocabulary',
      sourceHint: 'Synonym upgrade',
      instruction: 'Replace the underlined word with a more precise or striking alternative.',
      content: {
        sentences: [
          'a) Original: "Research indicates that approximately two-thirds of employees express concerns about technological displacement."',
        ],
      },
      correctAnswers: [
        'Research indicates that approximately two-thirds of employees voice apprehensions regarding technological displacement.',
      ],
      explanation:
        'Options: "voice" (more active than "express"), "apprehensions" (stronger than "concerns"), "regarding" (more formal than "about"). Each tiny upgrade compounds. This rewrite feels more confident and mature.',
    },
  ],
};

const caseyRDetail: StudentDetail = {
  slug: 'casey-r',
  name: 'Casey R.',
  taskInfo: 'Task A2: Comment Writing - AI in the Workplace',
  transcript: `AI is important topic now. Many peoples talks about it. Should we use AI at work? This is big question.

First, AI maybe take jobs from humans. Workers worry about this. Factory robots do work what people do before. Is bad for workers.

Second, data is not safe. Company have data about workers. This data maybe stolen. Workers not happy about this.

But AI good too. Robots do boring work. Peoples can do other thing. This is good.`,
  gradePoints: 4,
  gradeLetter: 'D',
  contentScore: 8,
  textStructureScore: 4,
  categoryScores: [
    {
      id: 'grammar',
      label: 'Grammar',
      score: 4,
      maxScore: 15,
      color: categoryColorMap.grammar.color,
      bgColor: categoryColorMap.grammar.bgColor,
      borderColor: categoryColorMap.grammar.borderColor,
      reasoning:
        'Basic grammatical structures present but inconsistently applied. Frequent errors in subject-verb agreement, articles not yet in place, tense mixing. Meaning is usually clear despite grammatical challenges. Shows understanding of sentence-building but needs practice with fundamental patterns.',
      evidenceQuotes: [
        '"Many peoples talks about it" (should be "people talk")',
        '"Company have data" (should be "companies have")',
        '"data maybe stolen" (auxiliary not yet included)',
      ],
      errorTags: [
        'Subject-verb agreement',
        'Articles not yet in place',
        'Tense mixing',
      ],
    },
    {
      id: 'sentenceStructure',
      label: 'Sentence Structure',
      score: 3,
      maxScore: 15,
      color: categoryColorMap.sentenceStructure.color,
      bgColor: categoryColorMap.sentenceStructure.bgColor,
      borderColor: categoryColorMap.sentenceStructure.borderColor,
      reasoning:
        'Sentences are mostly simple and short. Little variety in structure. Some fragments present. Beginning to attempt complex ideas but structure does not support them yet. Building blocks are there, but assembly needs work.',
      evidenceQuotes: [
        '"Is bad for workers." (fragment)',
        '"This is good." (very simple)',
      ],
      errorTags: ['Fragments', 'Simple structures only', 'Limited variety'],
    },
    {
      id: 'genVocabulary',
      label: 'General Vocabulary',
      score: 5,
      maxScore: 15,
      color: categoryColorMap.genVocabulary.color,
      bgColor: categoryColorMap.genVocabulary.bgColor,
      borderColor: categoryColorMap.genVocabulary.borderColor,
      reasoning:
        'Uses high-frequency words accurately but range is limited. Word choices like "boring", "good", "bad", "thing" are vague. Shows understanding but could be more precise. Ready to expand vocabulary with targeted practice.',
      evidenceQuotes: [
        '"data is not safe" (vague; could be "secure", "protected")',
        '"do other thing" (vague; could be "other tasks", "creative work")',
      ],
      errorTags: ['Limited range', 'Vague word choice'],
    },
    {
      id: 'domainVocab',
      label: 'Domain Vocabulary & Connectives',
      score: 3,
      maxScore: 15,
      color: categoryColorMap.domainVocab.color,
      bgColor: categoryColorMap.domainVocab.bgColor,
      borderColor: categoryColorMap.domainVocab.borderColor,
      reasoning:
        'Limited use of domain vocabulary related to the topic. "AI" is used correctly but few other topic-specific terms appear. Connectives are minimal. "First", "Second", "But" are present but limited. Opportunity to grow by learning more precise terminology.',
      evidenceQuotes: [
        '"AI is important topic" (general)',
        '"do work what people do" (awkward; domain vocabulary not yet used)',
      ],
      errorTags: ['Minimal connectives', 'Few domain terms'],
    },
  ],
  feedbackItems: [
    {
      categoryId: 'grammar',
      label: 'Grammar',
      score: 4,
      maxScore: 15,
      color: categoryColorMap.grammar.color,
      bgColor: categoryColorMap.grammar.bgColor,
      feedbackText:
        'You are expressing real ideas here, and that is the foundation. Your reader understands what you mean, which is good. Now let us work on one specific pattern that will help you quickly. When you write "Many peoples", you are mixing singular and plural. "Peoples" is rarely used. The correct form is "many people" (plural noun, stays the same). When you write "Company have data", you need "companies" (plural) or "the company has" (singular). Let us focus on this one pattern.',
      altFeedbackText:
        'Your ideas come through clearly, and that is the most important thing. Now let us work on one grammar rule that will fix several sentences at once. The word "people" is already plural, so it does not need an "s". And plural subjects need plural verbs: "people talk" not "peoples talks". The same rule applies to "companies have" instead of "company have". One rule, many fixes.',
      quotes: [
        {
          text: 'You wrote: "Many peoples talks about it"',
          explanation:
            '"People" is already plural. So it needs a plural verb: "people talk". Try this: cover "peoples" with your finger and replace it with "people". Now it reads "many people talks". Do the verb next: "people" needs "talk", not "talks".',
        },
      ],
      tip: 'Here is a small challenge: go back through your text and find every sentence with "people", "workers", or "companies". Make sure the verb matches. This is one pattern, and learning it will fix many of your errors at once.',
    },
    {
      categoryId: 'sentenceStructure',
      label: 'Sentence Structure',
      score: 3,
      maxScore: 15,
      color: categoryColorMap.sentenceStructure.color,
      bgColor: categoryColorMap.sentenceStructure.bgColor,
      feedbackText:
        'Your sentences are easy to understand, which is great. Most of them are short and simple: "AI is important." "This is bad." These are solid sentences. But you notice how they all follow the same pattern? You have a subject, then a verb, then a small idea. Let us try adding just a little more to some sentences. Not every sentence needs to be long, but mixing short and slightly longer sentences makes your writing feel stronger.',
      altFeedbackText:
        'Clarity is your strength: every sentence is easy to follow. The next step is adding detail. "Is bad for workers" is a fragment. Try: "This job loss is bad for workers." Now you have a subject, a clear idea, and your reader understands the connection. You do not need to make every sentence long. Just add one detail to two or three sentences in your next text.',
      quotes: [
        {
          text: 'You wrote: "Is bad for workers."',
          explanation:
            'This is a fragment (no subject). Try: "This is bad for workers." Or better: "This job loss is bad for workers." The second one has more information and sounds more confident.',
        },
      ],
      tip: 'Pick one of your short sentences and add one more piece of information. Example: instead of "Factory robots do work", try "Factory robots do work that people used to do." Same idea, but now your reader gets more detail. Try this with one sentence today.',
    },
    {
      categoryId: 'genVocabulary',
      label: 'General Vocabulary',
      score: 5,
      maxScore: 15,
      color: categoryColorMap.genVocabulary.color,
      bgColor: categoryColorMap.genVocabulary.bgColor,
      feedbackText:
        'You are using words correctly, and that is a real strength. Your reader never has to guess what you mean. You are ready to expand your vocabulary a little. Instead of "good" and "bad", English has so many other choices. "Bad" could be "harmful", "dangerous", or "problematic". "Good" could be "helpful", "beneficial", or "useful". These are not hard words, but they make your writing sound more mature.',
      altFeedbackText:
        'Your words are clear and correct. That is a solid foundation. The upgrade is simple: swap three overused words for slightly more precise ones. "Bad" becomes "harmful" or "risky". "Good" becomes "helpful" or "useful". "Thing" becomes "task" or "issue". These are not difficult words, but they show your reader that your vocabulary is growing.',
      quotes: [
        {
          text: 'You wrote: "data is not safe"',
          explanation:
            'This is clear, and that is good. To level up: "data is not secure" or "data is not protected". These words are only slightly more formal, but they show growth.',
        },
      ],
      tip: 'Pick the three words you use most: "good", "bad", "thing". For each one, learn one new word that means the same thing. "Thing" becomes "task" or "issue". "Good" becomes "helpful" or "useful". "Bad" becomes "harmful" or "risky". Use these new words just once in your next piece of writing. You will feel the difference.',
    },
    {
      categoryId: 'domainVocab',
      label: 'Domain Vocabulary & Connectives',
      score: 3,
      maxScore: 15,
      color: categoryColorMap.domainVocab.color,
      bgColor: categoryColorMap.domainVocab.bgColor,
      feedbackText:
        'You understand the topic (AI in the workplace), but your text does not yet show that understanding through vocabulary. You use the word "AI" correctly, which is a start. Now let us add a few more topic words. When you write about job loss, you could say "displacement" or "automation" instead of just "take jobs". These are words your teacher uses when teaching this topic. Learning them will help you sound more confident.',
      altFeedbackText:
        'You know what you want to say about AI. The next step is using the right words for the topic. Instead of "take jobs", try "automation" or "job displacement". Instead of "do boring work", try "handle repetitive tasks". These are the words your teacher and textbook use. Learning three of them is enough for your next text.',
      quotes: [
        {
          text: 'You wrote: "do work what people do"',
          explanation:
            'This is understandable, but the grammar is awkward. Better: "perform tasks that humans previously did". The word "tasks" and "previously" are more precise. "Perform" is more formal than "do".',
        },
      ],
      tip: 'Here are three domain words for your next attempt: "automation" (when machines do work), "displacement" (when jobs are lost), "productivity" (how much work gets done). Write them down. Use at least one in your next piece. Starting small like this helps your vocabulary grow.',
    },
    {
      categoryId: 'content',
      label: 'Content / Arguments',
      score: 8,
      maxScore: 27,
      color: categoryColorMap.content.color,
      bgColor: categoryColorMap.content.bgColor,
      feedbackText:
        'You have two counter-arguments, which shows you understand the task. Right now they are at the claim level: "AI maybe take jobs" and "data is not safe". The next step is adding a reason (why?) and an example (such as?) to each one. Your own argument is started but needs the same treatment. You are building the right foundation.',
      altFeedbackText:
        'Your text shows you understand the task: present two sides and take a position. You have two counter-arguments and one own argument. They are at the claim level right now. To develop them, add one reason and one example to each. "AI takes jobs" becomes "AI takes jobs because robots can do factory work faster and cheaper. For example, car factories now use robots for assembly." Same idea, but now it is a complete argument.',
      quotes: [
        {
          text: '"AI maybe take jobs from humans. Workers worry about this."',
          explanation:
            'This is a claim. It states the idea but does not explain why or give an example. The structure to aim for: Claim + Reason + Example.',
        },
      ],
      tip: 'For each argument, ask yourself two questions: "Why?" (that gives you the reason) and "For example?" (that gives you the example). Do this for just one argument in your next text, and you will see the difference.',
    },
    {
      categoryId: 'textStructure',
      label: 'Text Structure',
      score: 4,
      maxScore: 15,
      color: categoryColorMap.content.color,
      bgColor: categoryColorMap.content.bgColor,
      feedbackText:
        'Your text has a clear beginning that names the topic. You separate counter-arguments from your own arguments into different paragraphs. That is the right instinct. The bridge between them ("But AI good too") is brief but functional. Your next step is building longer paragraphs with more detail, and using a stronger bridge sentence.',
      altFeedbackText:
        'You introduce the topic and separate your ideas into paragraphs. That is a good structural instinct. The bridge word "But" works but is very short. Try: "However, there are also good reasons to use AI at work." This is a complete bridge sentence. Also, try to make each paragraph a bit longer by adding one more sentence with a detail or example.',
      quotes: [],
      tip: 'Think of your text like a sandwich: introduction on top, counter-arguments in the middle, then a bridge, then your own arguments, then a conclusion. You already have most of the layers. The bridge and conclusion need the most work.',
    },
  ],
  exercises: [
    {
      number: 1,
      type: 'fill-blank',
      categoryId: 'grammar',
      sourceHint: 'From your text',
      instruction: 'Fill in the correct article or verb. Choose one.',
      content: {
        sentences: [
          'a) "Many ____ (person / people) talks about AI."',
          'b) "Data ____ (is / are) important to protect."',
          'c) "The company ____ (have / has) information about workers."',
        ],
      },
      correctAnswers: ['people', 'is', 'has'],
      explanation:
        '"People" is always plural, so it goes with "talk" (not "talks"). "Data" is singular, so "is". "Company" is singular, so "has". These are high-frequency patterns.',
    },
    {
      number: 2,
      type: 'rewrite',
      categoryId: 'sentenceStructure',
      sourceHint: 'Building on your strength',
      instruction: 'Rewrite each short sentence by adding one more detail.',
      content: {
        sentences: [
          'a) Original: "This is bad for workers."',
          'b) Original: "This is good."',
        ],
      },
      correctAnswers: [
        'Job loss from automation is very bad for workers.',
        'Robots doing boring work is good for worker satisfaction.',
      ],
      explanation:
        'By adding "job loss from automation" instead of just "this", we are clearer. By adding "for worker satisfaction", we add more meaning. Small additions make big difference.',
    },
    {
      number: 3,
      type: 'multiple-choice',
      categoryId: 'genVocabulary',
      sourceHint: 'Learning new words',
      instruction: 'Choose the word that is more formal and stronger than "good".',
      content: {
        options: [
          {
            letter: 'A',
            text: 'Robots doing boring work is very good for employees.',
            isCorrect: false,
            hint: '"Good" is clear but basic. Keep looking.',
          },
          {
            letter: 'B',
            text: 'Robots doing boring work is helpful for employees.',
            isCorrect: true,
            hint: '"Helpful" is a step up. It sounds more mature.',
          },
          {
            letter: 'C',
            text: 'Robots doing boring work is nice for employees.',
            isCorrect: false,
            hint: '"Nice" is even more casual than "good".',
          },
        ],
      },
      correctAnswers: ['B'],
      explanation:
        '"Helpful" shows you are thinking about impact. "Good" is correct but very basic. "Nice" is too casual. The tiny upgrade from "good" to "helpful" makes a real difference.',
    },
    {
      number: 4,
      type: 'fill-blank',
      categoryId: 'domainVocab',
      sourceHint: 'Using topic words',
      instruction: 'Complete with the correct domain word.',
      content: {
        sentences: [
          'a) "Job ____ (loss / taking) happens when robots replace workers."',
          'b) "____ (Machines / Automation) helps companies work faster."',
          'c) "Worker ____ (worry / concerns) about technology are real."',
        ],
      },
      correctAnswers: ['loss', 'Automation', 'concerns'],
      explanation:
        '"Job loss" is the standard way to talk about this. "Automation" is the process of machines doing work. "Concerns" is the correct noun (not "worry" in this context). These words will appear on your next exam.',
    },
  ],
};

// Generate 18 additional students (21 total - 3 detail students)
const additionalStudents: Omit<Student, 'detail'>[] = [
  {
    id: '04',
    slug: 'riley-p',
    name: 'Riley P.',
    gradePoints: 8,
    gradeLetter: 'C+',
    status: 'reviewed',
    categoryScores: [
      { categoryId: 'grammar', score: 8, maxScore: 15 },
      { categoryId: 'sentenceStructure', score: 7, maxScore: 15 },
      { categoryId: 'genVocabulary', score: 9, maxScore: 15 },
      { categoryId: 'domainVocab', score: 8, maxScore: 15 },
    ],
  },
  {
    id: '05',
    slug: 'morgan-l',
    name: 'Morgan L.',
    gradePoints: 7,
    gradeLetter: 'C',
    status: 'reviewed',
    categoryScores: [
      { categoryId: 'grammar', score: 7, maxScore: 15 },
      { categoryId: 'sentenceStructure', score: 8, maxScore: 15 },
      { categoryId: 'genVocabulary', score: 7, maxScore: 15 },
      { categoryId: 'domainVocab', score: 6, maxScore: 15 },
    ],
  },
  {
    id: '06',
    slug: 'taylor-w',
    name: 'Taylor W.',
    gradePoints: 5,
    gradeLetter: 'D+',
    status: 'pending',
    categoryScores: [
      { categoryId: 'grammar', score: 5, maxScore: 15 },
      { categoryId: 'sentenceStructure', score: 4, maxScore: 15 },
      { categoryId: 'genVocabulary', score: 6, maxScore: 15 },
      { categoryId: 'domainVocab', score: 5, maxScore: 15 },
    ],
  },
  {
    id: '07',
    slug: 'drew-n',
    name: 'Drew N.',
    gradePoints: 2,
    gradeLetter: 'E',
    status: 'pending',
    categoryScores: [
      { categoryId: 'grammar', score: 2, maxScore: 15 },
      { categoryId: 'sentenceStructure', score: 2, maxScore: 15 },
      { categoryId: 'genVocabulary', score: 3, maxScore: 15 },
      { categoryId: 'domainVocab', score: 2, maxScore: 15 },
    ],
  },
  {
    id: '08',
    slug: 'alex-p',
    name: 'Alex P.',
    gradePoints: 9,
    gradeLetter: 'B-',
    status: 'reviewed',
    categoryScores: [
      { categoryId: 'grammar', score: 9, maxScore: 15 },
      { categoryId: 'sentenceStructure', score: 9, maxScore: 15 },
      { categoryId: 'genVocabulary', score: 10, maxScore: 15 },
      { categoryId: 'domainVocab', score: 8, maxScore: 15 },
    ],
  },
  {
    id: '09',
    slug: 'chris-j',
    name: 'Chris J.',
    gradePoints: 11,
    gradeLetter: 'B+',
    status: 'reviewed',
    categoryScores: [
      { categoryId: 'grammar', score: 11, maxScore: 15 },
      { categoryId: 'sentenceStructure', score: 10, maxScore: 15 },
      { categoryId: 'genVocabulary', score: 11, maxScore: 15 },
      { categoryId: 'domainVocab', score: 10, maxScore: 15 },
    ],
  },
  {
    id: '10',
    slug: 'dakota-h',
    name: 'Dakota H.',
    gradePoints: 6,
    gradeLetter: 'D',
    status: 'reviewed',
    categoryScores: [
      { categoryId: 'grammar', score: 6, maxScore: 15 },
      { categoryId: 'sentenceStructure', score: 5, maxScore: 15 },
      { categoryId: 'genVocabulary', score: 7, maxScore: 15 },
      { categoryId: 'domainVocab', score: 6, maxScore: 15 },
    ],
  },
  {
    id: '11',
    slug: 'emma-b',
    name: 'Emma B.',
    gradePoints: 12,
    gradeLetter: 'A',
    status: 'reviewed',
    categoryScores: [
      { categoryId: 'grammar', score: 12, maxScore: 15 },
      { categoryId: 'sentenceStructure', score: 12, maxScore: 15 },
      { categoryId: 'genVocabulary', score: 12, maxScore: 15 },
      { categoryId: 'domainVocab', score: 12, maxScore: 15 },
    ],
  },
  {
    id: '12',
    slug: 'fin-s',
    name: 'Fin S.',
    gradePoints: 8,
    gradeLetter: 'C+',
    status: 'reviewed',
    categoryScores: [
      { categoryId: 'grammar', score: 8, maxScore: 15 },
      { categoryId: 'sentenceStructure', score: 8, maxScore: 15 },
      { categoryId: 'genVocabulary', score: 8, maxScore: 15 },
      { categoryId: 'domainVocab', score: 8, maxScore: 15 },
    ],
  },
  {
    id: '13',
    slug: 'georgia-k',
    name: 'Georgia K.',
    gradePoints: 10,
    gradeLetter: 'B',
    status: 'reviewed',
    categoryScores: [
      { categoryId: 'grammar', score: 10, maxScore: 15 },
      { categoryId: 'sentenceStructure', score: 9, maxScore: 15 },
      { categoryId: 'genVocabulary', score: 10, maxScore: 15 },
      { categoryId: 'domainVocab', score: 9, maxScore: 15 },
    ],
  },
  {
    id: '14',
    slug: 'harper-m',
    name: 'Harper M.',
    gradePoints: 7,
    gradeLetter: 'C',
    status: 'pending',
    categoryScores: [
      { categoryId: 'grammar', score: 6, maxScore: 15 },
      { categoryId: 'sentenceStructure', score: 7, maxScore: 15 },
      { categoryId: 'genVocabulary', score: 7, maxScore: 15 },
      { categoryId: 'domainVocab', score: 8, maxScore: 15 },
    ],
  },
  {
    id: '15',
    slug: 'india-r',
    name: 'India R.',
    gradePoints: 9,
    gradeLetter: 'B-',
    status: 'reviewed',
    categoryScores: [
      { categoryId: 'grammar', score: 9, maxScore: 15 },
      { categoryId: 'sentenceStructure', score: 10, maxScore: 15 },
      { categoryId: 'genVocabulary', score: 9, maxScore: 15 },
      { categoryId: 'domainVocab', score: 9, maxScore: 15 },
    ],
  },
  {
    id: '16',
    slug: 'james-n',
    name: 'James N.',
    gradePoints: 6,
    gradeLetter: 'D',
    status: 'reviewed',
    categoryScores: [
      { categoryId: 'grammar', score: 5, maxScore: 15 },
      { categoryId: 'sentenceStructure', score: 6, maxScore: 15 },
      { categoryId: 'genVocabulary', score: 7, maxScore: 15 },
      { categoryId: 'domainVocab', score: 6, maxScore: 15 },
    ],
  },
  {
    id: '17',
    slug: 'kai-t',
    name: 'Kai T.',
    gradePoints: 11,
    gradeLetter: 'B+',
    status: 'reviewed',
    categoryScores: [
      { categoryId: 'grammar', score: 11, maxScore: 15 },
      { categoryId: 'sentenceStructure', score: 11, maxScore: 15 },
      { categoryId: 'genVocabulary', score: 10, maxScore: 15 },
      { categoryId: 'domainVocab', score: 11, maxScore: 15 },
    ],
  },
  {
    id: '18',
    slug: 'lena-d',
    name: 'Lena D.',
    gradePoints: 8,
    gradeLetter: 'C+',
    status: 'reviewed',
    categoryScores: [
      { categoryId: 'grammar', score: 8, maxScore: 15 },
      { categoryId: 'sentenceStructure', score: 8, maxScore: 15 },
      { categoryId: 'genVocabulary', score: 9, maxScore: 15 },
      { categoryId: 'domainVocab', score: 7, maxScore: 15 },
    ],
  },
  {
    id: '19',
    slug: 'mason-g',
    name: 'Mason G.',
    gradePoints: 9,
    gradeLetter: 'B-',
    status: 'reviewed',
    categoryScores: [
      { categoryId: 'grammar', score: 9, maxScore: 15 },
      { categoryId: 'sentenceStructure', score: 9, maxScore: 15 },
      { categoryId: 'genVocabulary', score: 9, maxScore: 15 },
      { categoryId: 'domainVocab', score: 10, maxScore: 15 },
    ],
  },
  {
    id: '20',
    slug: 'nora-e',
    name: 'Nora E.',
    gradePoints: 10,
    gradeLetter: 'B',
    status: 'reviewed',
    categoryScores: [
      { categoryId: 'grammar', score: 10, maxScore: 15 },
      { categoryId: 'sentenceStructure', score: 10, maxScore: 15 },
      { categoryId: 'genVocabulary', score: 11, maxScore: 15 },
      { categoryId: 'domainVocab', score: 9, maxScore: 15 },
    ],
  },
];

// Create the main student list with full details for Alex M., Jordan K., Casey R.
export const allStudents: Student[] = [
  {
    id: '03',
    slug: 'alex-m',
    name: 'Alex M.',
    gradePoints: 10,
    gradeLetter: 'B',
    status: 'reviewed',
    categoryScores: [
      { categoryId: 'grammar', score: 7, maxScore: 15 },
      { categoryId: 'sentenceStructure', score: 9, maxScore: 15 },
      { categoryId: 'genVocabulary', score: 10, maxScore: 15 },
      { categoryId: 'domainVocab', score: 8, maxScore: 15 },
    ],
    detail: alexMDetail,
  },
  {
    id: '01',
    slug: 'jordan-k',
    name: 'Jordan K.',
    gradePoints: 13,
    gradeLetter: 'A-',
    status: 'reviewed',
    categoryScores: [
      { categoryId: 'grammar', score: 14, maxScore: 15 },
      { categoryId: 'sentenceStructure', score: 12, maxScore: 15 },
      { categoryId: 'genVocabulary', score: 13, maxScore: 15 },
      { categoryId: 'domainVocab', score: 11, maxScore: 15 },
    ],
    detail: jordanKDetail,
  },
  {
    id: '02',
    slug: 'sam-t',
    name: 'Sam T.',
    gradePoints: 11,
    gradeLetter: 'B+',
    status: 'reviewed',
    categoryScores: [
      { categoryId: 'grammar', score: 12, maxScore: 15 },
      { categoryId: 'sentenceStructure', score: 10, maxScore: 15 },
      { categoryId: 'genVocabulary', score: 11, maxScore: 15 },
      { categoryId: 'domainVocab', score: 11, maxScore: 15 },
    ],
  },
  ...additionalStudents,
  {
    id: '21',
    slug: 'casey-r',
    name: 'Casey R.',
    gradePoints: 4,
    gradeLetter: 'D',
    status: 'pending',
    categoryScores: [
      { categoryId: 'grammar', score: 4, maxScore: 15 },
      { categoryId: 'sentenceStructure', score: 3, maxScore: 15 },
      { categoryId: 'genVocabulary', score: 5, maxScore: 15 },
      { categoryId: 'domainVocab', score: 3, maxScore: 15 },
    ],
    detail: caseyRDetail,
  },
];

export const students = allStudents;

export const appState: AppState = {
  students: allStudents,
  classStats,
  rubricPresets,
};

// Convenience export for accessing specific students
export const getStudentBySlug = (slug: string): Student | undefined => {
  return allStudents.find((s) => s.slug === slug);
};

export const getDetailStudent = (slug: string): StudentDetail | undefined => {
  const student = getStudentBySlug(slug);
  return student?.detail;
};
