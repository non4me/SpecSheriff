# T25, stage 2, group 6: round e, the readers' last findings

EngStickler's readers read round d, in `english-g6d-fast.md` and `english-g6d-thorough.md`. Apply the fixes below with `fix-group6-e.mjs`, idempotent from a backup `tools-drafts.before-group6-e.json`, then rebuild the page with `build-group6-ru.mjs` and `gen-group6-page.mjs`. Each fix changes only the English, except where a Russian wording is given. Add a short "Round e" section to `group6-notes.md`, placed first, and write `english-group6e.md` with only the sentences that round e changed. Do not publish the page, and do not touch `.ai_docs/INDEX.md` or anything under `specs/`.

- **"How an approval is recorded":** ", where that line is an approval" → ", if that line is an approval"; and in the next sentence "the last line for the node's sid that is an approval" → "the latest line for the node's sid that is an approval", since the node defines "latest".
- **Withdrawing the approval of a node:** "For each approval of a wording (§s-5ah25f6gy99panq) of such a node, where that approval is in force and whether or not the node holds that wording now," → "For each approval of a wording (§s-5ah25f6gy99panq) of such a node, if that approval is in force, whether or not the node still holds that wording,".
- **Turning the `strict` flag on:** in both items of the list, "and the refusal names …" → "and the refusal to turn the flag on names …" / «и отказ включить флаг называет …».
- **Approving the specification:** "The refusal is the same as the refusal to turn the flag on in that case." → "The refusal names what the refusal to turn the flag on names in that case." / «Этот отказ называет то же, что называет в этом случае отказ включить флаг.»
- **The entries of the settings:** in the reason, "these settings" → "the settings that only an owner of the specification changes".
- **Withdrawing the choice of an extension:** in both sentences, "that extension's schema" → "the schema of that extension of the guidelines".
- **Setting a repository up:** "from elsewhere, from `.git/hooks/` or from another folder that `core.hooksPath` named" → "from elsewhere, that is, from `.git/hooks/` or from another folder that `core.hooksPath` pointed to"; "git's samples" → "git's sample hooks"; "each folder `.githooks/<hook>.d/` that it leaves" → "each folder `.githooks/<hook>.d/` that it leaves in place"; in example 2, "git reports a conflict" → "git would report a conflict".
- **The proposal on `sheriff reindex`:** "whether that rule is approved or a draft" → "whether the archived or deleted rule is approved or a draft".

Report, as your final message: the keys you changed and the files you wrote.
