# T25, group 2, round c: the sentences written in the author's own words

Each sentence below is in the English of a node after round c, is not in that node's English after round b, and is not word for word in any of review-g2b-a.md to review-g2b-d.md. So it is the author's own wording: a reader's correction, a sentence written for answer B to Q1, or a fix that a review described without giving its English. The proposal for "The list of code that no SpecTag binds" is compared with the agreed node. fix-group2-c.mjs writes this file.

## s-vp24dqydygztqbt — The review of a commit

- Where the commit leaves the specification a draft, `sheriff review` disregards each finding on a statement that a rule's implementation needs no change (§s-kgqxg4gunzynwsv).
- Each run of the reviewer is paid for by the user who commits (§s-tnz9zgqx8c629a7), so `sheriff review` runs the reviewer only on a commit that needs one of its judgements.

## new:tools-7-3-review-code — The judgement on the code that a commit changes

- That is each of the following, in full, as the commit leaves it, with its file, its lines and the SpecTags (§s-8xw4mgvpexyvw5q) that bind it:
- the changed code other than tests leaves out something required by a rule that a SpecTag on that code names, or that the commit's message names anywhere other than in an `Implementation-Needs-No-Change` trailer (§s-7gab4ptjt2khfr5);

## new:tools-7-3-review-statement — The judgement on a statement that a rule's implementation needs no change

- `sheriff review` refuses a commit on such a finding only where the commit leaves the specification approved (§s-qzthyh7yqvfhsa2).
- Where the commit leaves it a draft, the commit passes this check silently.
- The reviewer judges the statement about each rule that such a trailer names, whatever the specification's approval status.

## new:tools-7-3-review-appendix — The judgement on a node of the technical appendix that a commit approves

- `sheriff review` refuses a commit on such a finding whatever the specification's approval status (§s-qzthyh7yqvfhsa2).
- In the rule on what the reviewer is given (§s-nyh9yk22ba6g77q), a top-level section of the base specification is a section whose location (§s-kag2m9tzdnduxdx) consists of the name of a part, a slash and a single number, such as `base/3` or `requests/2`.

## new:tools-10-verdict — The reviewer's verdict

- Each finding also names the judgement that it belongs to (§s-vp24dqydygztqbt).
- A verdict whose meaning `sheriff review` had to guess, such as a pass that lists a finding, would let `sheriff review` decide the commit in place of the independent reviewer (§s-m4h279nbaqkpa3t).

## new:tools-10-start — How a runner is started

- with its tools turned off, as far as its command-line options allow;

## new:tools-10-codex — The runner `codex`

- Codex offers no way to run without its own home and tools, so the runner restricts both.

## new:tools-10-settings — The settings of each runner

- They write a setting into a user's git configuration only with the value that this user gives in reply.
- From then on, every review made with the runner `claude` on that machine runs with that model, including after the plugin is updated, or removed and installed again.

## s-9rtrj24myzjvshu — SpecTags on the system's code other than tests

- where a SpecTag may stand, a text that opens with `@spec` but has none of the forms of a SpecTag (§s-5z5gnu7pahr82xp), such as `@spec none` with no text after it;
- The refusal names the file and, where it concerns a symbol or a line, that symbol or line.

## new:tools-7-2-rule-test — A test for each rule whose code a commit changes

- `sheriff binding` accepts a commit that adds or changes code bound to a rule (§s-kgbzk2ph9e6jfb4, §s-5z5gnu7pahr82xp) only where a test of the system's code (§s-hheus6f395ynqvc) declares that rule's SpecTag (§s-zrsc6asgmhv8tnc, §s-m82tz4mp3f9r3fg).
- In this check, the code means the symbols (§s-kgbzk2ph9e6jfb4) and the files bound as a whole (§s-5qdjyf6t898rsd4, §s-trwczfskj5zmuft) that the commit adds or changes (§s-2x58az67bm6cxq2), other than tests.
- In this check, a test is taken into account whether or not the commit changes it.
- A test marked as skipped or as expected to fail is taken into account too.
