# T25, stage 2, group 5: the review

You review drafts of nodes of the SpecSheriff guidelines before the owner sees them. The owner will see each node once, in its final wording, on one page for the whole group, and agree to the group with one answer. So a node you find ready must need no further change. Do not edit any file: your final message is your report.

## What the drafts are

Group 5 covers items 41 to 47 of the order of the review in `D:/SpecSheriff/.ai_docs/t25-pass/stage2-inventory.md`. Its nodes belong to the appendix of the tools and implement rows of the tables of checks of two extensions of the guidelines: Domains (table 11.3) and RecordType (table 12.12). They describe:
- domains that use one another in a cycle;
- the sections of the technical appendix matched to the domains;
- the level in a domain's header;
- an identifier followed to its end;
- what a RecordType variant must agree with;
- where the values of a field with `enum` are collected, and a new node on the values and the source of such a field;
- a RecordType that refers outside its part of the system.

All drafts are in `D:/SpecSheriff/.ai_docs/t25-pass/tools-drafts.json`, under the keys that your input file names. Your input file shows each draft's English text, reason, examples and outgoing links, beside the node's current wording. The Russian rendering and the list of changes of each draft are in `tools-drafts.json`, in the fields `ru`, `ruTitle`, `ruReason` and `change`. The author's notes are in `group5-notes.md`.

The specification is being moved into a new form, kept in `D:/SpecSheriff/.ai_docs/t25-pass/moved/` until the review ends:
- the extensions under `moved/specs/_guidelines/extensions/`, with their tables of checks;
- `moved/specs/_guidelines/spec.json`, the base of the guidelines;
- `moved/impl.json`, which maps each row of a table of checks to the nodes of the appendix that implement it.

The current appendix is `D:/SpecSheriff/specs/_guidelines/tools.json`. The drafts of items 1 to 40 in `tools-drafts.json`, which the owner agreed to by 2026-11-24, are binding: a draft that contradicts one is wrong. A proposal key with a `base` holds a newer agreed wording of the draft that `base` names, and that newer wording is the one in force.

## How to review

Read first:
- `D:/SpecSheriff/CLAUDE.md` and `D:/SpecSheriff/docs/principles.md`;
- `D:/SpecSheriff/.claude/vt/rules.md`, from "How a rule is proposed and worded" to the end;
- the last section of `moved/specs/_guidelines/spec.json`, on how a rule is written.

Then, for each draft:
- Run `node .claude/vt/writing-rules.mjs` in `D:/SpecSheriff` once, and give a verdict line for each rule it prints, applied to the whole node: ✓, or ✗ with the words that breach it.
- Assess the draft against the five criteria of the rule "Every wording is assessed against the whole specification before it is shown". Search `specs/`, `moved/` and `tools-drafts.json` for each term and each concept the draft uses, and read each node found. Do not rely on memory.
- Search the owner's rulings on the draft's subject: `D:/SpecSheriff/.ai_docs/t25-one-thought.md` (search it by sid and by title), the `meta.decisions` of each node concerned, and the `change` fields of the drafts. The owner gave many rulings on domains (2026-11-16 to 2026-11-18) and on RecordType (2026-11-14 to 2026-11-21, including the ruling that everything about RecordType follows JSON Schema 2020-12). A finding that an earlier ruling settles is not a finding: cite the ruling.
- Check the code in `D:/SpecSheriff/skills/tools/src/` only to see whether the draft states what the SpecSheriff tools must do. Where the code does something else, the draft wins, and the author's notes must say what changes in stage 3.
- Check that the Russian rendering says everything the English says, with every nuance, and nothing more.
- Check each term against the vocabularies of the skill `specsheriff-terminology-review`. A term you question goes to the owner as a doubt.
- Check that each word that takes its meaning from the specification cites, at its first use in the node, the node that defines it, and that a link backs each citation.

## Points to look at

The author settled these, and a reviewer may read the rules otherwise. The notes mark them [check]. Say for each that falls in your input whether the author's reading holds. Where it does not, say whether the rules and rulings settle the point another way, or whether only the owner can answer it:
- Item 42: below the first node of `specs/tech/<domain>.json`, a section is matched to the domain by its title and by the titles of the sections that hold it. The first node stands for the domain, so its title is not compared.
- Item 43 repeats in one sentence what the agreed "What the SpecSheriff tools read in the project's own guidelines" says about reading the levels, because that node has no sid to cite yet.
- Item 45: a variant must have a `refines` link to exactly one RecordType that has fields that select a variant, because rule 12.10 lets a RecordType also refine a fragment of a format. Field names are compared character for character, following JSON Schema.
- Item 46 is split in two: how the values of a field are collected keeps the old sid, and the refusals of rows 12.12.11 to 12.12.13 go into the new node `new:tools-7-1-enum-values`. The names of the parts are the folder names, including `contracts`. For `contracts` and `base`, the node a value comes from is the first top-level node of the first file. The kind named in `x-enumSource.kind` must be one of the project's own kinds.
- Item 47: rows 12.12.15 and 12.12.16 are reported, not refused. Without the Domains extension, a part of the system is a section of `specs/base/` whose location is `base/` and a single number.
- The notes record several gaps outside the group: the form of the name that `$ref` and `identifierOf` use, which item 56 is to state; two cases that table 12.12 has no row for; and, without the Domains extension, no row that checks that the technical appendix matches the structure of the base specification. Say whether any of them is in fact a defect of a draft in your input that must be fixed now.

## Your report

In English, except for the «Оценка» blocks, which are in Russian. Keep it short. For each draft, give:
- its key and title, and the verdict: **ready**, or **not ready**;
- each finding: the words concerned, what is wrong, and the fix in the exact words to apply, in English and, where the Russian changes, in Russian. Mark each finding as one the author can fix, or as a question only the owner can answer, with the reason;
- every verdict line of the checklist;
- its «Оценка» block in Russian, with one line per criterion, named in the owner's words: согласованность, целостность, целесообразность, избыточность, недостаточность. Each line gives ✓ with the nodes the wording was compared with, or the problem found. For избыточность and недостаточность, ✓ means that none was found.

End with a list of the findings that only the owner can answer, if any.
