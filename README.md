# GemmPen

**AI that reads handwriting, scores against a teacher's rubric, and gives every student personal feedback with exercises - entirely on one device, no internet required.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-gemmpen.vercel.app-blue)](https://gemmpen.vercel.app)
[![Video](https://img.shields.io/badge/Video-YouTube-red)](https://youtu.be/IeDM1mJ3J2M)
[![HuggingFace](https://img.shields.io/badge/HuggingFace-SveBorg%2Fgemmpen--lora-yellow)](https://huggingface.co/SveBorg/gemmpen-lora)
[![Kaggle Notebook](https://img.shields.io/badge/Kaggle-Finetuning%20Notebook-20BEFF)](https://www.kaggle.com/code/svenjaborgwardt/gemmpen-finetuning-gemma-4-e4b)
[![License](https://img.shields.io/badge/License-Apache%202.0-green)](LICENSE)

Submission for the [Gemma 4 Good Hackathon](https://www.kaggle.com/competitions/gemma-4-good-hackathon) - Tracks: Future of Education, Digital Equity & Inclusivity, Safety & Trust.

<p align="center">
  <img src="web-app/public/screenshots/review-screen.png" alt="GemmPen Review Screen - AI feedback with highlighted transcript" width="800">
</p>

---

## The Problem

I am a teacher at a vocational school in Cologne, Germany. I teach 240 students. Each of them writes at least four exams per year - over 960 handwritten texts, plus homework. Grading each one takes 20-30 minutes: reading, scoring, documenting. That is the job, and I do it. But when I am done, my students get a number. Not an explanation of what went well. Not a breakdown of which patterns are holding them back. Not an exercise that targets their specific mistakes. Just a grade.

The time I spend grading is time I cannot spend on what would actually help them improve. GemmPen changes that. It takes the grading I already do and turns it into something my students can learn from: feedback that quotes their own writing, explains their error patterns, and gives them personalized exercises to practice. And I get back to doing what I became a teacher for: inspiring young people, helping them find their voice, showing them what they are capable of.

GemmPen is trained on real exam data from my classroom. I used Gemma 4's built-in vision to transcribe 38 handwritten exams from two of my classes, manually corrected the transcriptions, and graded each one against my rubric. Every student is 18 or older and gave written consent for their data to be used - participation was voluntary with no effect on grades, and no student declined. But 38 exams do not mean 38 training examples. GemmPen's micro-task architecture breaks each exam into multiple independent scoring, analysis, and feedback tasks - producing 883 training pairs from those 38 source texts. No synthetic data was used. Every training pair comes from a real student's writing and a real teacher's grade.

The pipeline is designed to scale: each new exam batch generates roughly 25 training pairs per student, and the teacher correction loop continuously improves the model. The 38 exams in this submission are a starting point, not a ceiling.

This is not a research demo. It is a tool I built because I need it, and because I know teachers everywhere face the same problem. Every hour we spend counting points is an hour we are not spending with our students. I became a teacher to inspire young people, to help them find their voice, to show them what they are capable of. GemmPen exists so that teachers can get back to doing exactly that.

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

**No technical knowledge required.** Teachers interact through a visual interface: upload, review, correct. Even the personalization loop (training the model on individual feedback style) requires only clicking one button - GemmPen handles the training automatically. The entire workflow is designed for educators, not engineers.

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
2. When a feedback point does not match their judgment, they edit it directly in the review interface.
3. GemmPen stores these corrections as training pairs locally on the device.
4. After roughly 30 corrections, one button triggers the training - GemmPen handles the rest.
5. Next round: GemmPen sounds like the teacher.

**What happens under the hood:** Each correction creates a DPO preference pair: the original AI-generated feedback (rejected) and the teacher's edited version (chosen). These pairs are short text snippets containing no student names, grades, or original exam content.

When the teacher presses the training button, the pipeline works as follows:

1. The pairs are uploaded as a private Kaggle dataset via the built-in API route (`/api/retrain`)
2. A pre-configured Kaggle notebook is triggered on a free T4 GPU
3. The notebook loads Gemma 4 E4B in 4-bit quantization with the existing SFT adapter merged into the base weights (this merged checkpoint becomes the reference model for DPO)
4. A new LoRA adapter (r=8) is trained on top using TRL's DPOTrainer with Unsloth memory optimization - the reference model shares the quantized weights and simply has no active LoRA, which keeps the memory footprint under 10 GB on a 16 GB T4
5. The resulting adapter is pushed to a private HuggingFace repository
6. On the next session, GemmPen pulls the updated adapter automatically

Training runs for approximately 60-90 minutes. The teacher's 30+ pairs are sufficient for style alignment because DPO is not teaching a new capability here - the model already knows how to score and explain from the SFT stage (883 pairs). DPO only shifts phrasing preferences within the existing task distribution, which requires far fewer examples than general alignment.

**Current state:** The API integration for triggering this pipeline is built and included in the codebase. The SFT training infrastructure (Unsloth + LoRA on Kaggle T4) is proven - it produced the current adapter from 883 pairs. The DPO extension reuses the same stack with TRL's DPOTrainer added. For the hackathon demo, the training loop is demonstrated with pre-computed results. The next iteration will close the loop end-to-end.

**What never leaves the device:** Student writing, transcriptions, scores, names, and original exams. The only data transmitted is a set of short preference pairs showing how the teacher phrases feedback differently from the model. These are pedagogical style preferences, not student data.

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
| Training pairs | 883 |
| Source | Real handwritten student exams, teacher-graded |
| Epochs | 3 |
| Platform | Kaggle T4 GPU (free tier) |
| Training time | ~70 minutes |
| Framework | Unsloth + TRL |

The training pairs were extracted from real handwritten exams that were transcribed and graded by the teacher. No synthetic data was used. The pairs cover three core tasks, broken into four subtasks: sentence-level error analysis with rubric categories (KT1A), cascade threshold checks for grade determination (KT1B), CRE argument structure analysis (KT2), and feedback generation with explainable scoring (KT3).

Data balancing was applied to KT2 after the first training run revealed hallucination on incomplete arguments (the model invented missing parts instead of flagging them). Adding 58 targeted incomplete-argument examples resolved this completely.

---

## Evaluation

A side-by-side comparison of base Gemma 4 vs. fine-tuned GemmPen, evaluated on all 38 real student texts from the same exam period (KT3 grammar feedback):

| Metric | Base Gemma 4 | Fine-tuned GemmPen |
|--------|-------------|-------------------|
| Output length | 89% under 400 characters | 3x longer on average |
| Specificity | General feedback, consistent structure | Cites 2-4 specific passages per student |
| Adaptation | Uniform tone across levels | Adjusts language to student proficiency |
| Error patterns | Lists individual errors | Identifies recurring patterns, explains why they matter |
| Exercises | None | Personalized practice based on individual weaknesses |

The fine-tuned model produces feedback that is longer, more specific, and adapts to each student's proficiency level - exactly the qualities that make feedback effective according to educational research.

A central goal of the fine-tuning was teaching the model when to guide and when to correct directly. When a student writes "there" instead of "their," showing the correct spelling is the right call. But when a student writes "the company can helps," the model should point to the pattern and let the student find the fix. The fine-tuned model learned exactly this distinction: in evaluation, it makes the correct pedagogical decision in 84% of cases (32 of 38 students), including the hardest judgment call - knowing when to show the answer and when to guide. The remaining cases are caught during the teacher review step, and each correction feeds into the DPO pipeline (see "It Grows With You") for continuous improvement.

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

**Vision fine-tuning for handwriting.** GemmPen already uses Gemma 4's built-in vision to transcribe handwritten exams. The teacher corrections from this process - comparing the raw transcription to the corrected version - are a natural source of training pairs for a dedicated vision fine-tuning pass. This would improve recognition of crossed-out text, margin notes, and difficult handwriting styles. The data already exists from the current workflow; we did not get to this fine-tuning step within the hackathon timeline.

**DPO-based personalization at scale.** The teacher correction loop described in "It Grows With You" collects preference pairs that can be used for Direct Preference Optimization. As more teachers use the system, each builds their own personalized adapter - creating a model that reflects their individual teaching philosophy and standards.

**Beyond English.** The rubric-as-parameter design means GemmPen is not tied to any language or subject. Expanding to other languages requires only a new rubric configuration and appropriate training data. The on-device architecture means this works equally well in any country, regardless of internet infrastructure.

---

## Getting Started

**Watch the video:** [youtu.be/IeDM1mJ3J2M](https://youtu.be/IeDM1mJ3J2M)
A 3-minute walkthrough of the problem, the pipeline, and the product.

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

**Explore the demo - what to look for at each step:**

1. **Landing Page** - Scroll through the pipeline overview and the before/after comparison.
2. **Upload** - Drag-and-drop interface with a privacy notice. The demo pre-loads three student exams.
3. **Configure** - Pick a rubric preset or toggle individual categories. Try switching the grading system (German 0-15, US Letter, UK GCSE, Percentage) - the scores update across the entire app.
4. **Class Overview** - All 21 students at a glance with score bars and status indicators.
5. **Review (click any student)** - This is the core screen. Hover over the colored highlights in the transcript to see error tooltips. Notice how each feedback card cites specific sentences from the student's text. Try editing a feedback card - this is how teachers create DPO training pairs. Check the score breakdown at the top and try switching grading systems there.
6. **Compare students** - Open Alex M., then Jordan K., then Casey R. Notice how the feedback adapts: different errors, different tone, different level of detail for each student.
7. **Feedback (printer icon)** - Three-page printable report for the student: annotated text, detailed feedback, personalized exercises.
8. **Exercises** - Try submitting an answer. The model gives hints without revealing the solution. Open exercises for different students and notice they are completely different, because each student made different mistakes.
9. **Training** - The DPO export page shows how teacher corrections become training data. The progress bar starts at 8/30, showing this is a system that has already been used.

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

Built by [Svenja Borgwardt](https://github.com/SvenjaBorgwardt) - English teacher at a vocational school in Cologne, Germany. I built GemmPen because I believe every student deserves to know not just their score, but what they did well and how to get better. And because every teacher deserves the time to tell them.

Powered by [Gemma 4](https://ai.google.dev/gemma) from Google DeepMind.
