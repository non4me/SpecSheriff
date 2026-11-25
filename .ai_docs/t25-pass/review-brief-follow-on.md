# T25: the review of the follow-on drafts of the appendix of the tools

You review drafts of nodes of the appendix of the tools (`specs/_guidelines/tools.json`) before they are approved on the owner's behalf. Do not edit any file: your final message is your report.

## What the drafts are

On 2026-11-25 the owner settled the questions about the base specification that stage 2 of T25 had deferred. `base-questions.md` holds the items and `bq-pages.json` the agreed wordings, in English and in Russian; `agree-base.mjs` recorded them in `tools-drafts.json`. The owner's answers:
- proposals 2.1 to 2.9 and 3.2: agreed on the owner's behalf, since they only carry out earlier decisions;
- proposals 3.1 and 3.3 to 3.8: «согласен»;
- questions 4.1 A, 4.2 A, 4.3 A, 4.4 B, 4.5 B, 4.6 B: «ок»;
- question 4.7: settled by decision R8 of the page `recordtype-jsonschema.html` (2026-11-19), a vocabulary of SpecSheriff's own.

The drafts under review change agreed nodes of the appendix, or add nodes to it, so that the appendix carries out those answers. `follow-on.mjs` wrote them, as `follow-on-brief.md` says. Each draft's `base` names the agreed draft it replaces, and its `change` field says, in Russian, what changed. Under the owner's rule in `.claude/vt/rules.md` ("A new or substantially rewritten node is checked before it is shown"), a change that only carries out a decision is approved on the owner's behalf once you find its wording ready.

Your part is printed, in English and in Russian, in your input file, `review-input-fo-a.md` or `review-input-fo-b.md`. Read each draft's agreed base draft in `tools-drafts.json`, the base nodes it implements (the agreed drafts in `tools-drafts.json`, and `moved/specs/_guidelines/`), and the item of `base-questions.md` that it carries out.

## What to check

For each draft:
- that it carries out the decision, and does no more than the decision requires;
- that it contradicts no agreed node, no decision recorded in a node's `meta.decisions` and no principle in `docs/principles.md`;
- the checklist from `node .claude/vt/writing-rules.mjs`, with a verdict line for each rule, applied to the whole node;
- the five criteria of the owner's rule "Every wording is assessed against the whole specification before it is shown", as an «Оценка» in Russian, one line per criterion;
- citations and their links, as `CLAUDE.md` says;
- the Russian rendering against the English, clause by clause.

Look in particular at the choices that the author lists as not settled by the decisions: the new node for 3.7, the removal of s-h5rfyy9j8nnhx62 (deleted, since it was never approved in `specs/`), `TextRule` left out of the fingerprint, the details of 4.4 (`$schema` and `$id` counted as imports, the refusal of a bindings-file entry for a file in a described language), the change to s-c2r9jndrjbtbsv6 that 3.5 brings, whether s-5qdjyf6t898rsd4 needs a sentence under 4.3, and the long sentences.

Mark as a nit any finding that a careful reader would not need fixed before the node is approved. A draft with only nits is ready.

## Your report

For each draft: its verdict (ready, or not ready), the checklist, the «Оценка», and each finding with the exact replacement wording in English and in Russian. Then a short list of the drafts that are ready.
