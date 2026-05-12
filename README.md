# GemmPen

**AI that reads handwriting, scores against a teacher's rubric, and gives every student personal feedback with exercises - entirely on one device, no internet required.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-gemmpen.vercel.app-blue)](https://gemmpen.vercel.app)
[![HuggingFace](https://img.shields.io/badge/HuggingFace-SveBorg%2Fgemmpen--lora-yellow)](https://huggingface.co/SveBorg/gemmpen-lora)
[![Kaggle Notebook](https://img.shields.io/badge/Kaggle-Finetuning%20Notebook-20BEFF)](https://www.kaggle.com/code/svenjaborgwardt/gemmpen-finetuning-gemma-4-e4b)
[![License](https://img.shields.io/badge/License-Apache%202.0-green)](LICENSE)

Submission for the [Gemma 4 Good Hackathon](https://www.kaggle.com/competitions/gemma-4-good-hackathon) - Tracks: Future of Education, Digital Equity & Inclusivity, Safety & Trust.

---

## The Problem

Research consistently shows that detailed, individual feedback is one of the most powerful drivers of student learning. Yet in practice, it rarely happens. A teacher grading a stack of handwritten exams faces a hard tradeoff: spend hours writing personal comments for each student, or move on to the next lesson. Most choose the latter - not because they do not care, but because there is no time.

The result: students receive a grade but never understand what exactly they did well, where they went wrong, or how to improve. Personalized exercises based on each student's specific mistakes have been virtually impossible to create at scale.

GemmPen changes this. It gives every student feedback that cites their own writing, explains each score transparently, and generates exercises targeting their individual weaknesses - all running on a single device, in any classroom in the world.

---

## How It Works

GemmPen uses Gemma 4 as a single multimodal model for the entire pipeline, intelligently routing each step to the right mode: vision for handwriting recognition, fine-tuned LoRA for rubric-aligned evaluation and feedback, and prompt-based generation for exercises and answer checking. Everything runs on one device - no internet, no cloud, no external services.

```
                         All on one device - no internet required
  +-------------+    +-------------+    +-------------+    +-------------+    +-------------+
  |             |    |             |    |             |    |             |    |             |
  |    Scan     |--->|  Evaluate   |--->|  Feedback   |--->|  Exercises  |--->|    Check    |
  |             |    |             |    |             |    |             |    |   Answer    |
  +-------------+    +-------------+    +-------------+    +-------------+    +-------------+
    Gemma 4            Gemma 4            Gemma 4            Gemma 4            Gemma 4
    multimodal         fine-tuned         fine-tuned         per prompt         per prompt
```

**Scan** - The teacher photographs or scans a handwritten exam. Gemma 4 reads the handwriting directly using its built-in vision capabilities. No separate tools, no upload to external services.

**Evaluate** - The model scores the text against the teacher's rubric. The rubric is a configurable input parameter (JSON), not baked into the model. Any teacher can use their own rubric, for any subject, in any language. Every score is grounded with direct quotes from the student's text.

**Feedback** - GemmPen generates up to 6 feedback points per student, written at a level the student can understand. Each point references specific passages from their writing. The model never reveals the correct answer - instead, it guides students to find their own mistakes.

**Exercises** - Personalized practice tasks based on the student's individual errors. Not generic grammar drills, but exercises derived from the patterns in their own writing.

**Check Answer** - Students can submit answers and receive hints as many times as they need. Running on the student's own device means unlimited attempts at zero cost.

---

## Why On-Device

GemmPen runs entirely on one device. This is not a limitation - it is the core design principle.

**Data never leaves the classroom.** Student writing, grades, and feedback stay on the teacher's device. There is no cloud, no server, no account. Privacy is guaranteed by architecture, not by policy.

**Any classroom in the world.** The only requirement is a single device that can run Gemma 4 - including a phone. The interface is fully mobile-responsive, so a teacher can photograph an exam, review feedback, and hand the device to a student for exercises. No laptop required, no internet connection, no subscription, no API costs.

**Teachers stay in control.** Open weights mean full transparency. No vendor lock-in, no dependency on services that might shut down. The teacher owns their model, their data, and their workflow.

---

## Digital Equity

GemmPen is designed so that a teacher's access to quality feedback tools does not depend on budget, geography, or technical skills.

**Zero cost, zero infrastructure.** The model trains on a free Kaggle GPU in 70 minutes. The tool runs on a single device - including a phone. There is no subscription, no API key, no server to maintain. The only requirement is a device that can run Gemma 4.

**Language-agnostic by design.** The rubric is a JSON parameter, not embedded in the model. A teacher grading English essays in Cologne and a teacher grading Swahili compositions in Nairobi use the same system with different configurations. Adding a new language or subject requires only a new rubric - not a new model.

**No technical knowledge required.** Teachers interact through a visual interface: upload, review, correct. Even the personalization loop (training the model on individual feedback style) requires only clicking an export button and running a pre-built Kaggle notebook. The entire workflow is designed for educators, not engineers.

---

## Explainable and Trustworthy

Every decision GemmPen makes is transparent and verifiable.

**Every score is grounded in evidence.** The model does not just assign a number. It cites specific passages from the student's text and maps them to the rubric's threshold definitions. A teacher can see exactly why a student received a particular score and verify it against their own judgment.

**The rubric is visible, not hidden.** The grading criteria are passed as a readable JSON configuration, not buried inside model weights. Teachers can inspect, modify, and share the exact rules the model applies. There is no black box.

**Teacher-in-the-loop as a trust mechanism.** GemmPen is not designed to replace teacher judgment. Every piece of AI-generated feedback passes through a review step where the teacher can accept, edit, or reject it. Corrections feed back into the model through DPO training, aligning the system more closely with the teacher's standards over time.

**Privacy by architecture, not by policy.** Student data never leaves the device. This is not a terms-of-service promise - it is a structural guarantee. There is no server, no account, no data transfer. Compliance with privacy regulations (GDPR, EU AI Act) is achieved by the absence of any data transmission, not by paperwork.

---

## It Grows With You

GemmPen works immediately without any customization. But teachers who want the model to match their personal style can train it - without any technical knowledge.

Here is how it works:

1. A teacher uses GemmPen normally, reviewing AI-generated feedback for their students.
2. When a feedback point does not sound right, they edit it directly in the review interface.
3. GemmPen stores these corrections as training pairs locally in the browser.
4. After roughly 30 corrections, a single button exports the pairs as a JSONL file.
5. One training run on Kaggle (free GPU) produces a personal LoRA adapter.
6. Next round: GemmPen sounds like the teacher.

**What gets uploaded for training:** Only the training pairs (AI feedback vs. teacher correction). These are short text snippets without student names, grades, or original exam content. The export format is deliberately minimal.

**What never leaves the device:** Student writing, transcriptions, scores, names, and original exams. None of this is included in the export.

This creates a closed loop: students write, the model evaluates, the teacher corrects, the model learns. Over time, GemmPen adapts to each teacher's voice and standards.

---

## Key Design Decisions

**Rubric as a parameter.** The grading rubric is passed as a JSON configuration, not embedded in the model. This means GemmPen is not limited to one subject or one grading system. Any teacher can plug in their own rubric - English essays, biology lab reports, economics case studies.

**Three fine-tuned core tasks.** Instead of training one monolithic "grade an exam" task, GemmPen uses three specialized capabilities: error analysis with rubric alignment (KT1), argument structure validation (KT2), and explainable feedback generation (KT3). This produces more training data from the same source material and makes each skill independently verifiable.

**Exercises and answer-checking run per prompt.** These tasks do not require fine-tuning - base Gemma 4 handles them well. Fine-tuning effort is focused where it matters most: rubric calibration, rule application, and feedback tone.

---

## Training

GemmPen is fine-tuned on Gemma 4 E4B using LoRA, trained on a free Kaggle T4 GPU with Unsloth.

| Parameter | Value |
|-----------|-------|
| Base model | Gemma 4 E4B (multimodal, ~5B parameters) |
| Method | LoRA (r=8, alpha=8), 4-bit quantized |
| Training pairs | 941 (883 original + 58 data-balanced) |
| Source | Real handwritten student exams, teacher-graded |
| Epochs | 3 |
| Platform | Kaggle T4 GPU (free tier) |
| Training time | ~70 minutes |
| Framework | Unsloth + TRL |

The training pairs were extracted from real handwritten exams that were transcribed and graded by the teacher. No synthetic data was used. The pairs cover three core tasks, broken into four subtasks: sentence-level error analysis with rubric categories (KT1A), cascade threshold checks for grade determination (KT1B), CRE argument structure analysis (KT2), and feedback generation with explainable scoring (KT3).

Data balancing was applied to KT2 after the first training run revealed hallucination on incomplete arguments (the model invented missing parts instead of flagging them). Adding 58 targeted incomplete-argument examples resolved this completely.

---

## Evaluation

A side-by-side comparison of base Gemma 4 vs. fine-tuned GemmPen on the same student texts (KT3 grammar feedback):

| Metric | Base Gemma 4 | Fine-tuned GemmPen |
|--------|-------------|-------------------|
| Output length | 89% under 400 characters | 3x longer on average |
| Specificity | Generic, same schema every time | Cites 2-4 specific passages per student |
| Adaptation | Same tone regardless of level | Adjusts language to student proficiency |
| Error patterns | Lists individual errors | Identifies recurring patterns, explains why they matter |
| Exercises | None | Personalized practice based on individual weaknesses |

The fine-tuned model produces feedback that is longer, more specific, and adapts to each student's proficiency level - exactly the qualities that make feedback effective according to educational research.

**Known tradeoff:** In 21% of outputs, the fine-tuned model reveals the correct answer instead of guiding the student to find it. The DPO personalization pipeline (see "It Grows With You") is designed to address this through teacher corrections over time.

---

## Repo Structure

```
GemmPen/
  web-app/                  # Next.js 16 + React 19 + Tailwind v4
    src/
      app/                  # Pages: landing, upload, configure, class, review, feedback, exercises, training
      components/           # UI components: feedback cards, score summary, transcript view, landing sections
      lib/                  # Types, constants, grading systems, mock data
    public/                 # Logo and example scans
```

The training notebook and datasets live on Kaggle (linked above). This repo contains only the web application.

---

## Future Work

**Vision fine-tuning for handwriting.** GemmPen currently uses Gemma 4's built-in multimodal capabilities to read handwriting. A dedicated fine-tuning pass on exam handwriting would improve recognition of crossed-out text, margin notes, and difficult handwriting styles. The architecture supports this - Gemma 4 E4B includes a 16-layer Vision Transformer that can be fine-tuned with LoRA, and scanned exam pages are available as training data.

**DPO-based personalization at scale.** The teacher correction loop described in "It Grows With You" collects preference pairs that can be used for Direct Preference Optimization. As more teachers use the system, each builds their own personalized adapter - creating a model that reflects their individual teaching philosophy and standards.

**Beyond English.** The rubric-as-parameter design means GemmPen is not tied to any language or subject. Expanding to other languages requires only a new rubric configuration and appropriate training data. The on-device architecture means this works equally well in any country, regardless of internet infrastructure.

---

## Getting Started

**Try the demo:** [gemmpen.vercel.app](https://gemmpen.vercel.app)
The demo runs with static data to show how the full pipeline works. The production version runs entirely on your device.

**Reproduce the training:**

1. Open the [Kaggle Notebook](https://www.kaggle.com/code/svenjaborgwardt/gemmpen-finetuning-gemma-4-e4b)
2. The notebook includes all training data, configuration, and instructions
3. Training takes approximately 70 minutes on a free T4 GPU

**Use the fine-tuned model:**

```python
from unsloth import FastModel

model, tokenizer = FastModel.from_pretrained(
    model_name="SveBorg/gemmpen-lora",
    max_seq_length=4096,
    load_in_4bit=True,
)
```

**Run the web app locally:**

```bash
cd web-app
npm install
npm run dev
```

**Recommended click path through the demo:**

```
Landing  ->  Upload  ->  Configure  ->  Start AI Evaluation
  ->  Review (Alex M.)  ->  Save & Next
  ->  Review (Jordan K.)  ->  Save & Next
  ->  Review (Casey R.)  ->  Save & Next
  ->  Class Overview
  ->  PDF Feedback (Alex M.)  ->  Print works
  ->  Exercises (Alex M.)  ->  Try submitting answers
```

---

## Tech Stack

| Component | Technology |
|-----------|-----------|
| Model | Gemma 4 E4B (Google DeepMind) |
| Fine-tuning | LoRA via Unsloth + TRL on Kaggle |
| Web app | Next.js 16, React 19, Tailwind v4 |
| Demo hosting | Vercel |
| Model hosting | HuggingFace ([SveBorg/gemmpen-lora](https://huggingface.co/SveBorg/gemmpen-lora)) |
| License | Apache 2.0 |

---

Built by [Svenja Borgwardt](https://github.com/SvenjaBorgwardt) - teacher, developer, and the person who grades these exams.

Powered by [Gemma 4](https://ai.google.dev/gemma) from Google DeepMind.
