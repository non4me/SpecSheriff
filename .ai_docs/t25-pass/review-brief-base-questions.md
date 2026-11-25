# T25: the review of the questions about the base specification

You review `D:/SpecSheriff/.ai_docs/t25-pass/base-questions.md` before the owner sees it. Do not edit any file: your final message is your report.

## What the file holds

Stage 2 of T25, the review of the appendix of the tools, is finished. During it, questions about the base specification were deferred under the owner's rule "One part at a time". A general-purpose agent gathered them, as `briefs/t25-base-questions-brief.md` says:
- section 1, seven changes to base nodes that the owner has already decided, each with its new wording. These are not put to the owner again: the main session approves them on the owner's behalf and reports each in one line, as the principle "Nothing unapproved is implemented" allows for a change that only states what an owner has approved;
- section 2, eighteen questions that only the owner can answer, each with a recommendation, options and the new wording under the recommended option;
- section 3, the items the agent dropped, each with its reason.

The base is `D:/SpecSheriff/.ai_docs/t25-pass/moved/specs/_guidelines/spec.json`, with its extensions under `moved/specs/_guidelines/extensions/`; agreed drafts are in `tools-drafts.json`.

## What to check

Read first `D:/SpecSheriff/CLAUDE.md`, `D:/SpecSheriff/docs/principles.md`, and `D:/SpecSheriff/.claude/vt/rules.md` from "How a rule is proposed and worded" to the end.

For each item in your part:
- **A decided change** (section 1): that it states exactly what the owner decided, and nothing more. Where it goes beyond the decision, say so: that part becomes a question for the owner.
- **A question** (section 2): that only the owner can answer it. Search the owner's rulings (`D:/SpecSheriff/.ai_docs/t25-one-thought.md`, by sid and by title, and the `meta.decisions` of each node concerned) and the agreed drafts. A question that an earlier ruling or an agreed node settles is not a question: cite the ruling, and say what the change then is. Check that the recommendation and its basis come first, and that each option says what a person sees, what it costs and what risk remains.
- **A dropped item** (section 3): that the reason holds.
- **Every new wording**: the checklist that `node .claude/vt/writing-rules.mjs` prints when you run it in `D:/SpecSheriff`, the five criteria of the rule "Every wording is assessed against the whole specification before it is shown", citations with their links, and the Russian `change` field.

## Your part

Your prompt names your part of the file.

## Your report

In English, except for the «Оценка» lines, which are in Russian. For each item: its number and title, the verdict (**ready** or **not ready**), and each finding with the exact fix in English and, where the Russian changes, in Russian. Mark each finding as one the author can fix, or as one only the owner can answer, with the reason. End with the items that, in your view, should not reach the owner at all, and why.
