# T25: the changes to the appendix of the tools that the base decisions call for — the brief

`agree-base.mjs` recorded the owner's answers on the base specification. Several agreed nodes of the appendix of the tools must now change so that they carry out those answers; nobody has written their wordings yet. Draft them in `tools-drafts.json`, with a script `follow-on.mjs` that, like `agree-base.mjs`, copies the file first to `tools-drafts.before-follow-on.json`, rebuilds from that copy when it is run again, and refuses to run if a key it touches is missing or out of date. Edit nothing under `specs/`, make no commit, and do not touch `INDEX.md`, `tasks.md` or `t25-one-thought.md`.

## What to draft

Each change that your report on `agree-base.mjs` listed under "Appendix wordings that the items name but nobody has written yet":
- 2.9: s-yauyedny2yzvs4c, as its todo says, and the node or nodes of the appendix that implement the two new rows of table 11.3;
- 3.4: the sentence in s-ezq8csd433vj6fj;
- 3.6: the sentence in s-c2r9jndrjbtbsv6;
- 3.7: the node of the appendix that says that the extension's schema requires `"type": "object"`;
- 4.1: s-f5brvuuu6xmkj6t includes the kind;
- 4.2: s-gvafe6bnstwab8b is split;
- 4.3: the sentences in s-33fw3ga4ctd94dq, s-2x58az67bm6cxq2, s-weuyx98r7c923ab, s-9rtrj24myzjvshu and s-rd9nftptjuz6bwv;
- 4.4, option B: s-33fw3ga4ctd94dq describes JSON Schema as a language whose symbols are the definitions under `$defs`; s-9rtrj24myzjvshu accepts a SpecTag in a comment property; s-h5rfyy9j8nnhx62 is removed; s-suv42g8r3ra2h6b says that `$comment` is written; s-dbk2vyeg8z5jxna stops checking that entry;
- 4.5: the sentence in s-m8nmfsxkcfu7cjp;
- 4.7: a node that describes the metaschema declaring SpecSheriff's vocabulary through `$vocabulary`, and the reference to it from the schema of the RecordType extension.

Write each as a new draft (`-bq` suffix on the key of the agreed draft it replaces, with `base` naming that draft, as you did in `agree-base.mjs`), with a complete wording in English, a Russian `change` field that says each place, what it said and what it says now, the links it needs, and an `implements` link to the base node it carries out. A node to be removed is recorded as the earlier groups recorded a removal. Do not mark any draft as agreed: each goes to specsheriff-rule-reviewer first.

Keep each change to what the decision requires. Follow the owner's rules on how a node is written (`node .claude/vt/writing-rules.mjs` prints them) and the conventions of the agreed nodes around it.

When the drafts are written, report each key with what changed, and anything that the decisions do not settle.
