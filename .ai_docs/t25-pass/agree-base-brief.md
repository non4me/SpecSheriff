# T25: recording the owner's agreement to the questions about the base specification — the brief

The owner has answered all three pages of `base-questions.md`. Write `agree-base.mjs`, which records every agreed change in `tools-drafts.json`, as `agree-group8.mjs` does for group 8, and run it. Edit nothing under `specs/`, make no commit, and do not touch `INDEX.md`, `tasks.md` or `t25-one-thought.md`.

## The owner's answers, all on 2026-11-25

- **Page 1, proposals 2.1 to 2.9:** «я же принимал уже решения по этим вопросам». Each proposal only carries out a decision the owner had already made, so it is agreed on the owner's behalf. The decision that each one carries out is the one that `base-questions.md` names for it.
- **Proposal 3.2:** taken off page 2, because it only carries out the owner's decision of 2026-11-02; agreed on the owner's behalf in the same way.
- **Page 2, proposals 3.1 and 3.3 to 3.8:** «согласен», in answer to «Согласны с формулировками 3.1 и 3.3–3.8?».
- **Page 3, questions 4.1 to 4.6:** «ок», in answer to «Согласны с рекомендованным вариантом во всех шести вопросах?». So: 4.1 option A, 4.2 option A, 4.3 option A, 4.4 option B, 4.5 option B, 4.6 option B.
- **Question 4.7:** settled by decision R8 of the page `recordtype-jsonschema.html`, which the owner accepted on 2026-11-19. `x-enumSource` is renamed `enumSource` in every agreed node of the appendix of the tools that names it, without asking again; no node of the base changes.
- **Changes 1.1 to 1.4:** made without asking, as section 1 of `base-questions.md` says; changes 1.3 and 1.4 go in together with proposal 2.6.

## What the script records

- Every node that these answers change or add, in the wording that the owner's pages show (`bq-pages.json` holds each one in full, in English and in Russian), under its existing key in `tools-drafts.json` or, for a node of the base without a draft yet, under a `proposal:<sid>` key, and for a new node or row under a `new:` key, following the conventions of the earlier groups.
- For questions 4.1 to 4.6, the wordings under the chosen option, which are the recommended ones.
- Each draft marked as agreed on 2026-11-25, with the owner's answer in its `rulings`, as `agree-group8.mjs` records it.
- The decisions for `meta.decisions` that `base-questions.md` writes out for each item, with the owner's answer as the ruling where the file says "written from the owner's answer". Where a decision cites a node that the draft has no link to, add a `cites` link, as `agree-group8.mjs` does.
- The renames of 1.1, 1.3, 1.4 and 4.7, and the `implements` links of 1.2, 3.1 and 3.2, in the agreed nodes they touch.

The script copies `tools-drafts.json` to `tools-drafts.before-agree-base.json` first and, when it is run again, rebuilds from that copy, so a second run gives the same file. It refuses to run if any key it writes is missing or out of date.

When it is done, report the keys it wrote, each with what changed, and anything that `base-questions.md` and `bq-pages.json` did not settle.
