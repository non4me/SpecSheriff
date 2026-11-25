# T25: round b of the follow-on drafts — the main session's decisions

Two reviewers read the 18 follow-on drafts: `review-fo-a.md` (part A) and `review-fo-b.md` (part B). Apply their findings with `follow-on.mjs` (or a second script that runs after it), so that a second run still gives the same file. Edit nothing under `specs/`, make no commit, and do not touch `INDEX.md`, `tasks.md` or `t25-one-thought.md`.

"Apply" means: in the report's own wording, with its Russian, unless this brief says otherwise. Every finding not named below is applied as its report proposes, nits included.

## Part A (`review-fo-a.md`)

- **s-ezq8csd433vj6fj:** split it, as the review says. The agreed node keeps its agreed wording and title; drop its `-bq` draft. Add the new node "What a `$ref` within a RecordType names" with the review's wording, a new sid and the links the review names.
- **s-c2r9jndrjbtbsv6:** apply the doubt on the first condition, and the cut of the paragraph that repeats the definition of the fields a variant adds.
- **The meta-schema node (s-j4t9vusnsajmqdw):**
  - spell it "meta-schema", as JSON Schema does, in the title and the text;
  - name the meta-schema's file, its `$id` and the URI of SpecSheriff's vocabulary; choose values that follow the conventions of `moved/specs/_schema/`;
  - mark SpecSheriff's vocabulary in `$vocabulary` as not required (`false`), so that other JSON Schema tools can still read a RecordType's `schema`;
  - say that the meta-schema checks the keywords at any depth;
  - apply the wording fixes and the cut.

## Part B (`review-fo-b.md`)

- **Tests are excluded:** apply the doubts on s-33fw3ga4ctd94dq (paragraph 5) and s-2x58az67bm6cxq2 (paragraph 3), with the `cites` link to s-hheus6f395ynqvc. Rule 1.5.2 binds only code other than tests.
- **The shebang:** apply the doubt. The exception moves into s-33fw3ga4ctd94dq; s-5qdjyf6t898rsd4 needs no sentence.
- **`$id`:** drop it from the imports of JSON Schema; keep `$schema`.
- **The open questions of s-33fw3ga4ctd94dq:**
  - The keys of the top-level object of a JSON Schema file other than the definitions under `$defs` (`$schema`, `$defs` itself, `$comment`) are not code outside every symbol, so a file of RuntimeChecks has no code outside its symbols and needs no top-level `$comment`. Say so in the node.
  - Python: follow what the agreed wording of s-33fw3ga4ctd94dq already says about the comment directly above a symbol; if it does not settle a run of `#` lines, a run of `#` lines with no blank line between them is one comment.
- **s-m8nmfsxkcfu7cjp:** apply the doubt on the reason and the nit.
- **The removal of s-h5rfyy9j8nnhx62:** apply the nit: say in `change` that the rule "a file of RuntimeChecks is written only where it holds at least one definition" goes with it, and check whether another node already states it; if none does, add that sentence to s-suv42g8r3ra2h6b.
- **Nodes outside part B that must change**, as new `-bq` drafts in the same way:
  - s-3xx2eukc8gtd2tx counts the code outside every symbol of a file other than tests, as s-9rtrj24myzjvshu hands it that code;
  - s-u6mj5yv8ngnz79v leaves out of the trees it compares the text of a `$comment` other than the SpecTags, since JSON Schema 2020-12 Core (§8.3) makes `$comment` a comment;
  - check s-qqs2svksmjct753 and change it only if it must;
  - the nit on s-nk8td3ez58gahc4: say which SpecTag the definition of a variant carries.

When round b is done, report each key with what changed, and list every wording that you wrote yourself and that no report dictated.
