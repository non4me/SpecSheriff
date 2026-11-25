# T25, group 2, round d: the sentences written in the author's own words

Each sentence below is in the English of a node after round d, is not in that node's English after round c, and is not word for word in review-g2c-a.md or review-g2c-b.md. So it is the author's own wording: a reader's correction, or a fix that a review described without giving its English. fix-group2-d.mjs writes this file.

## s-vp24dqydygztqbt — The review of a commit

- `sheriff review` asks for a verdict only on a commit for which the reviewer must make at least one of the following judgements (§s-epaw9sgyaajzn8g):
- Each run of the reviewer is paid for by the user who commits (§s-tnz9zgqx8c629a7), so `sheriff review` runs the reviewer only on a commit that needs one of the reviewer's judgements.

## new:tools-7-3-review-code — The judgement on the code that a commit changes

- That code consists of the following, each in full, as the commit leaves it, with its file, its lines and the SpecTags (§s-8xw4mgvpexyvw5q) that bind it:
- the changed code other than tests leaves out something required by a rule that a SpecTag on that code names, or that the commit's message names outside an `Implementation-Needs-No-Change` trailer (§s-7gab4ptjt2khfr5);

## new:tools-7-3-review-statement — The judgement on a statement that a rule's implementation needs no change

- `sheriff review` refuses a commit because of such a finding only where the commit leaves the specification approved (§s-qzthyh7yqvfhsa2).

## new:tools-7-3-review-appendix — The judgement on a node of the technical appendix that a commit approves

- `sheriff review` refuses a commit because of such a finding whatever the specification's approval status (§s-qzthyh7yqvfhsa2).
- In the rule on what the reviewer is given (§s-nyh9yk22ba6g77q), a top-level section of the base specification means a section whose location (§s-kag2m9tzdnduxdx) consists of the name of a part, a slash and a single number, such as `base/3` or `requests/2`.

## new:tools-10-verdict — The reviewer's verdict

- A verdict whose meaning `sheriff review` had to guess, such as a pass that lists a finding, would let `sheriff review` decide the outcome of the commit in place of the independent reviewer (§s-m4h279nbaqkpa3t).

## new:tools-10-codex — The runner `codex`

- Codex offers no way to run without its own home directory and tools, so the runner restricts both.

## s-9rtrj24myzjvshu — SpecTags on the system's code other than tests

- where a SpecTag may be placed, text that begins with `@spec` but matches none of the forms of a SpecTag (§s-5z5gnu7pahr82xp), such as `@spec none` with no text after it;

## new:tools-7-2-no-node — A SpecTag that names no node

- Once a node is removed, every SpecTag that names it binds its code or test to nothing, wherever that SpecTag is placed.

## proposal:s-weuyx98r7c923ab — The list of code that no SpecTag binds

- `sheriff untagged` lists, by file and symbol, the system's code (§s-hheus6f395ynqvc) that no SpecTag (§s-8xw4mgvpexyvw5q) binds (§s-3xx2eukc8gtd2tx), including the tests.
