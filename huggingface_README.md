---
language:
  - en
license: apache-2.0
library_name: transformers
base_model: unsloth/gemma-4-e4b-it-unsloth-bnb-4bit
tags:
  - text-generation-inference
  - transformers
  - unsloth
  - gemma4
  - trl
  - sft
  - lora
  - education
  - feedback
  - grading
  - fine-tuned
  - bnb-4bit
  - gemma-4-good-hackathon
datasets:
  - custom
pipeline_tag: text-generation
model-index:
  - name: gemmpen-lora
    results:
      - task:
          type: text-generation
          name: Student Feedback Generation
        metrics:
          - name: Avg Output Length (fine-tuned)
            type: custom
            value: 1060 characters
          - name: Avg Output Length (base)
            type: custom
            value: 350 characters
          - name: Outputs Under 400 chars (fine-tuned)
            type: custom
            value: 0%
          - name: Outputs Under 400 chars (base)
            type: custom
            value: 89%
          - name: Specific Passages Cited Per Response (fine-tuned)
            type: custom
            value: 2-4
          - name: Direct Student Address
            type: custom
            value: 100%
---

# GemmPen - Personalized Student Feedback with Gemma 4

**GemmPen** gives teachers back the time for what matters most: teaching, inspiring and empowering. It reads handwritten exams, scores them against the teacher's own rubric, and generates individualized feedback with targeted exercises - entirely offline, with no cloud, no internet, and no student data ever leaving the room.

This LoRA adapter is the core of GemmPen. It was fine-tuned on real handwritten English exams from 38 students at a vocational college in Cologne, Germany, scored and annotated by their teacher.

| | |
|---|---|
| **Live Demo** | [gemmpen.vercel.app](https://gemmpen.vercel.app) |
| **Video** | [YouTube](https://youtu.be/IeDM1mJ3J2M) |
| **Track** | Future of Education |
| **Hackathon** | [The Gemma 4 Good Hackathon](https://www.kaggle.com/competitions/gemma-4-good-hackathon) |

## The Problem

I teach 240 students. Each of them writes at least four exams per year - over 960 handwritten texts, plus homework. Grading each one takes 15-20 minutes: reading, scoring, documenting. Every hour I spend on this is an hour I cannot spend on what actually moves my students forward. And when I am done, they get a number. Not an explanation of what went well. Not a breakdown of which patterns are holding them back. Not an exercise that targets their specific mistakes. Just a grade.

The time I spend grading is time I cannot spend on what would actually help them improve. GemmPen changes that. It takes the grading I already do and turns it into something my students can learn from: specific feedback that quotes their own writing, explains their error patterns, and gives them personalized exercises to practice.

## Why Fine-tuning Was Necessary

I tried base Gemma 4 first. It understood grammar, it could identify errors, and it produced reasonable general advice. But it had never seen what a real teacher's feedback looks like - the kind that references a specific rubric, quotes a student's own sentence back to them, identifies the pattern behind the error, and adjusts its tone depending on whether the student scored 3 or 14 out of 15.

Base Gemma 4 gave the same structure to every student. A student who struggled with basic subject-verb agreement got the same depth of response as one who only needed stylistic polish. The feedback was correct but generic - it did not reflect what I as a teacher would actually say to each individual student.

That is a specialized skill. It requires knowing what rubric-calibrated, individually adapted, pedagogically effective feedback looks like. And the only way to teach that is with real examples from a real classroom.

## What GemmPen Does Differently

For this hackathon, I fine-tuned GemmPen on 38 exams from two of my classes - real handwritten texts, graded and annotated by me. The result is a model that understands how an experienced educator thinks about student writing - not just what is correct, but what each student needs to hear to improve.

The fine-tuned model produces feedback that is 3x longer than the base model, quotes 2-4 specific passages from the student's text, explains error patterns rather than just flagging mistakes, and adjusts its tone to match the student's proficiency level. A student scoring 3 out of 15 gets patient, foundational guidance. A student scoring 14 out of 15 gets style refinements.

## Three Specialized Tasks

Rather than asking one prompt to do everything, GemmPen breaks grading into three focused tasks. Each one was fine-tuned separately to do its job well:

**Task 1 - Error Analysis and Rubric Scoring:** Finds language errors in the student's text, categorizes them (grammar, sentence structure, vocabulary, connectives), and assigns a score with direct quotes as evidence.

**Task 2 - Argument Structure Analysis:** Checks whether each argument in a persuasive essay contains all three required parts: a Claim, a Reason, and an Example. This follows the all-or-nothing rule used in the original rubric - if any part is missing, the argument scores zero.

**Task 3 - Feedback Generation:** Writes student-facing feedback in accessible English (B1-B2 level). The feedback is encouraging, quotes the student's own words, and guides them toward finding the answer themselves - without ever revealing the correction directly.

## Grading System: How It Works

GemmPen was built around the grading standards used in the German state of North Rhine-Westphalia (NRW). Here is what you need to know to understand the scores:

**Language assessment** uses four categories, each scored from 0 to 15 points. The scale works like this: 15-13 is excellent, 12-10 is good, 9-7 is satisfactory, 6-4 is adequate, 3-1 is poor, and 0 means the criterion was not met at all. The four categories are Grammar, Sentence Structure, General Vocabulary, and Subject-Specific Vocabulary including Connectives.

**Content assessment** uses a structured rubric for persuasive writing. Each argument must contain a Claim, a Reason, and an Example (the CRE rule). If all three are present, the argument earns 3 points. If any part is missing, it earns 0. This strict rule teaches students to build complete arguments.

The rubric itself is not baked into the model. It is passed as a configurable JSON parameter, which means any teacher can plug in their own grading criteria.

## Training Details

| | |
|---|---|
| **Base model** | Gemma 4 E4B (multimodal, ~5B parameters) |
| **Method** | LoRA (r=8) with Unsloth, SFT |
| **Quantization** | 4-bit (bnb) |
| **Training pairs** | 883 |
| **Source data** | 38 handwritten English exams from two classes (21 + 17 students) |
| **Hardware** | Kaggle T4 x2 (free tier) |
| **Training cost** | $0 |
| **Training time** | 73 minutes |
| **Final loss** | 0.2836 |
| **Framework** | Unsloth + TRL + Transformers |
| **Training notebook** | [Kaggle](https://www.kaggle.com/code/svenjaborgwardt/gemmpen-finetuning-gemma-4-e4b) |

### Hyperparameters

| | |
|---|---|
| **Learning rate** | 2e-4 |
| **Epochs** | 3 |
| **Batch size** | 1 (gradient accumulation: 4, effective batch: 4) |
| **Max sequence length** | 4096 |
| **Optimizer** | AdamW 8-bit |
| **Scheduler** | Cosine with 10 warmup steps |
| **Weight decay** | 0.01 |
| **LoRA rank** | 8 |
| **LoRA alpha** | 8 |
| **LoRA dropout** | 0 |
| **Trainable parameters** | 18,350,080 of 8,014,506,528 (0.23%) |
| **Training mode** | train_on_responses_only |

All training data comes from real student exams, transcribed using Gemma 4's built-in vision capabilities and manually corrected by me, then scored against the rubric. No synthetic data was used. The 883 training pairs were extracted by decomposing each student's evaluation into the three task types described above.

Every student gave written consent for their exam data to be used in this project. All students were 18 or older. Participation was voluntary, and students were informed that declining would have no effect on their grade. No student declined. The consent process follows German data protection rules (GDPR).

## Evaluation: Base Model vs. Fine-Tuned

I ran both models on all 38 students using the Grammar feedback task. Here are the results:

| Metric | Base Gemma 4 | GemmPen (fine-tuned) |
|--------|-------------|----------------------|
| Average output length | 350 chars | 1,060 chars |
| Outputs under 400 chars | 89% (34/38) | 0% (0/38) |
| Cites specific student passages | 1 generic reference | 2-4 specific quotes per response |
| Addresses student directly | 100% | 100% |
| Correct pedagogical decision | N/A (too general to evaluate) | 84% (32/38 students) |

The base model quotes student text at surface level - it picks one sentence and comments on it generically in under 350 characters. The fine-tuned model quotes 2-4 passages per response and uses them as evidence for pattern analysis across 1,060 characters. The difference is not whether the model quotes, but what it does with the quote.

Fine-tuning unlocks what Gemma 4 is capable of when it learns a teacher's actual grading decisions.

### Example: Same Student, Different Models

**Student:** B1-B2 level, scored 3/15 on Grammar. Errors include "The AI can helps the company to being more efficient" and "There is many jobs what will be replaced."

**Base Gemma 4:**
> Your writing shows some inconsistencies in sentence structure. For example, you wrote, "The AI can helps the company." Try reviewing how to use "is," "are," or "will be" correctly.

*(321 characters. Generic advice. Does not identify the pattern. Same response structure for every student.)*

**GemmPen (fine-tuned):**
> Your sentences often start strong but then lose their path halfway through. Look at what you wrote: "The AI can helps the company to being more efficient in the future." There are two patterns here that repeat throughout your text. First, after modal verbs like "can" or "will," you add an extra -s or -ing where it does not belong. Second, your infinitive constructions get tangled - "to being" instead of the base form. This is actually good news - once you learn to spot these two patterns, many errors in your text disappear at once.

*(~1,060 characters. Quotes the student's writing. Identifies the repeating pattern. Guides without revealing the correction. Adjusts tone to the proficiency level.)*

### Pedagogical Restraint: The Core Achievement

A central goal of the fine-tuning was teaching the model when to guide and when to correct directly. Good feedback does not always work the same way. When a student writes "there" instead of "their," the right move is to show the correct spelling - there is no underlying pattern to discover. But when a student writes "the company can helps," the right move is to point to the pattern (modal verbs take the base form) and let the student find the fix. Handing them the answer feels helpful but undermines learning.

The fine-tuned model learned exactly this distinction. Looking at the 8 cases (out of 38 student feedbacks) where the model includes a direct correction, the picture is clear: 2 of those are spelling corrections ("effinant" to "efficient," "there" to "their") where showing the answer is pedagogically appropriate. The remaining 6 are grammar cases where guiding would have been better. That means the model guides correctly in 84% of all cases (32 of 38 students), and the cases it gets right include the hardest judgment call - knowing the difference between "show the answer" and "guide to the answer."

This is not something the base model can do. The base model gives the same general advice regardless of error type. The fine-tuned model makes a pedagogical decision for each error. The DPO pipeline built into the web app addresses the remaining 6 cases: each time a teacher adjusts an over-specific feedback point during review, that correction becomes a training signal for the next round.

## How to Use

```python
from peft import PeftModel
from transformers import AutoModelForCausalLM, AutoTokenizer

# Load base model
base_model = AutoModelForCausalLM.from_pretrained(
    "unsloth/gemma-4-e4b-it-unsloth-bnb-4bit",
    device_map="auto",
)
tokenizer = AutoTokenizer.from_pretrained(
    "unsloth/gemma-4-e4b-it-unsloth-bnb-4bit"
)

# Load GemmPen LoRA adapter
model = PeftModel.from_pretrained(base_model, "SveBorg/gemmpen-lora")

# Example: Generate grammar feedback for a student text
messages = [
    {"role": "system", "content": "You are GemmPen, an experienced English teacher providing grammar feedback on student writing. Quote specific passages and guide the student to find the answer themselves."},
    {"role": "user", "content": "Student text: 'The company has helps many people to find new jobs. AI will definetly change how we is working in the future.'\nScore: 5/15 for Grammar.\nProvide encouraging, specific feedback."}
]

input_ids = tokenizer.apply_chat_template(
    messages, return_tensors="pt"
).to(model.device)

output = model.generate(
    input_ids,
    max_new_tokens=512,
    temperature=0.7,
)
print(tokenizer.decode(output[0], skip_special_tokens=True))
```

## Prompt Format

The model was trained on conversations with four system prompt variants (distributed evenly to prevent overfitting to a single phrasing) and structured user prompts. Here is the format for each task:

### Task 1 - Error Analysis (KT1A)

```
System: "You are GemmPen, an AI exam feedback assistant. You analyze student texts against a provided rubric and give constructive, specific feedback."

User: "A student wrote the following sentences in an English exam. Analyze them for errors in grammar, vocabulary, word choice, and sentence structure. For each error: name the type, assign the rubric category, and show the correction.

Rubric categories:
- grammar: verb forms, articles, prepositions, agreement, tense
- sentence_structure: sentence variety, linking between clauses, run-on sentences
- general_vocabulary: word choice, precision, range, spelling that affects meaning
- subject_vocabulary: topic-specific terms + connective words

Sentences:
1: \"[student sentence]\"
2: \"[student sentence]\""
```

### Task 1 - Rubric Scoring (KT1B)

```
User: "This student's [category] is at the '[level]' level ([point range] points). Narrow down the exact score within this range. Cite specific passages to justify your decision.

[threshold descriptions for each point in the range]

Student text:
\"[full student text]\""
```

### Task 3 - Feedback Generation (KT3)

```
User: "Compose student-facing feedback for the rubric category listed here. Requirements: B1 English, max 15 words per sentence, no negative words (wrong, bad, poor, fail, lack, weak, missing, incorrect), direct address with you/your. Explain the score using quotes and provide one concrete improvement tip.

Category: [category]
Score: [score]/15 ([level])
Rubric description for this level: [description]

Key findings:
- [finding 1]
- [finding 2]

Evidence from student text:
1: \"[quote]\"
2: \"[quote]\""
```

The rubric itself is passed as part of the user prompt, not embedded in model weights. This means any rubric can be used at inference time without retraining.

## The Full Pipeline

GemmPen is more than this adapter. The complete system has five steps, all running on a single device:

1. **Scan** - Gemma 4's multimodal capabilities read handwritten text directly from photos. No separate OCR tool needed.
2. **Evaluate** - This LoRA adapter scores the text against the teacher's rubric, with quotes as evidence for every score.
3. **Feedback** - This LoRA adapter generates student-facing feedback that is specific, encouraging, and level-appropriate.
4. **Exercises** - Personalized practice tasks based on each student's individual errors. Generated via prompting (no fine-tuning needed).
5. **Check Answers** - Students can submit answers to exercises and get instant feedback. Unlimited attempts, zero cost.

## Why Local Matters

GemmPen runs entirely on one device. No internet connection, no cloud service, no API calls. This matters for three reasons:

**Privacy by architecture.** Student data - their handwriting, their grades, their mistakes - never leaves the classroom. This is not a policy decision. It is how the system is built. There is nothing to configure and nothing that could leak.

**Works in any classroom.** The only requirement is one device that can run Gemma 4. No school IT infrastructure, no internet access, no subscription fees. A teacher in rural Kenya and a teacher in downtown Berlin use the exact same system.

**Teacher independence.** The teacher controls the model, the rubric, and the feedback. No vendor lock-in, no algorithm changes, no service shutdowns. Open weights mean full transparency.

## Teacher-in-the-Loop: It Grows With You

GemmPen works out of the box. But teachers who want the model to match their personal grading style can improve it over time:

1. Use GemmPen normally to review AI-generated feedback for your students
2. When a feedback point does not match your judgment, edit it directly in the review interface
3. Each correction is saved as a training pair locally on your device
4. After roughly 30 corrections, one button triggers the training - GemmPen handles the rest
5. Next round, the feedback sounds like you

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

## Limitations

- **Pedagogical restraint:** The model correctly distinguishes between guiding and direct correction in 84% of cases (32 of 38 students). In 6 cases, it over-specifies on grammar errors where guiding would have been more effective. The teacher review step catches these, and each correction feeds into the DPO pipeline for continuous improvement.
- **English only:** The current adapter was trained on English language exams. The architecture supports any language, but training data for other languages does not exist yet.
- **Rubric scope:** Training data comes from one exam type (persuasive writing with the CRE argument structure). Other writing formats would need additional training pairs.
- **Hardware requirements:** The base model requires a device capable of running Gemma 4 E4B in 4-bit quantization. This is feasible on modern laptops but may not work on older hardware.

## Built By

**Svenja Borgwardt** - English and IT teacher at GSO Berufskolleg in Cologne, Germany. GemmPen grew out of the daily reality of grading 38 handwritten exams and wanting every student to get feedback that actually helps them improve.

## License

This adapter is released under the Apache 2.0 license, following the base model's license terms.

## Links

- [Live Demo](https://gemmpen.vercel.app) - Full web app with three example students
- [Submission Video](https://youtu.be/IeDM1mJ3J2M) - 3-minute project walkthrough
- [Training Notebook](https://www.kaggle.com/code/svenjaborgwardt/gemmpen-finetuning-gemma-4-e4b) - Full training code on Kaggle (reproducible)
- [GitHub](https://github.com/SvenjaBorgwardt/GemmPen) - Source code for the web app
- [Hackathon Page](https://www.kaggle.com/competitions/gemma-4-good-hackathon)

## Citation

```bibtex
@misc{borgwardt2026gemmpen,
  title={GemmPen: Personalized Student Feedback with Fine-Tuned Gemma 4},
  author={Borgwardt, Svenja},
  year={2026},
  url={https://huggingface.co/SveBorg/gemmpen-lora}
}
```

---

*This model was trained 2x faster with [Unsloth](https://github.com/unslothai/unsloth).*
