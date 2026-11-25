# T25, group 3, round e: the English that round e adds or rewrites

Each item below was written in round e by fix-group3-e.mjs in the author's own words: every part, reason and example whose English differs from what round d left, and every key that round e adds, in full.
fix-group3-e.mjs writes this file; edit the script, not this file.

## s-2x58az67bm6cxq2 — What a commit adds, changes and removes in the code and the tests

- A commit changes a file bound as a whole where a line of that file changes the code (§s-u6mj5yv8ngnz79v).
- Example: A commit rewords a comment in a stylesheet bound by SpecTags at its start and changes nothing else in it. The SpecSheriff tools read the stylesheet's lines with the grammar of CSS and leave out the comment, so the commit leaves the stylesheet unchanged. The most likely mistake is to count any change to the text of a file bound as a whole, which makes a reworded comment a change to the code.

## new:tools-7-2-changed-line — A line that changes the code

- The SpecSheriff tools decide which of the lines that a commit removes or adds change the code (§s-9j2mmnuuwmx5ksn). They read each line as the tokens of the file's language in each of the following files:
- a file whose language a description covers (§s-33fw3ga4ctd94dq);
- a file bound as a whole (§s-kgbzk2ph9e6jfb4) whose name ends in `.yaml`, `.yml`, `.css`, `.sql`, `.sh` or `.json`.
- They parse such a file bound as a whole with the tree-sitter grammar of its format: YAML, CSS, SQL, Bash or JSON. They read the tokens of a line as follows:
- the whitespace of the two lines differs where the file's language gives whitespace a meaning, such as the indentation of a line in Python or YAML.
- In any other file, every line that the commit removes or adds changes the code.
- Reason: A change to the code makes the SpecSheriff tools check that code against its rules again (§s-9j2mmnuuwmx5ksn). Reading each line as the tokens of the language of its file leaves out what cannot alter what the code does, such as comments and whitespace to which the language gives no meaning.
- Example: A commit indents the key `retries` in a YAML file bound as a whole by two more spaces, which moves the key under the key above it. The line holds the same tokens as before, but its indentation, to which YAML gives a meaning, differs, so the line changes the code. The most likely mistake is to leave out all whitespace, as in TypeScript, which lets the moved key pass as unchanged.

## proposal:s-9j2mmnuuwmx5ksn — A change to a SpecTag

- A change to a SpecTag (§s-8xw4mgvpexyvw5q) is considered a change to the test or the code that the SpecTag binds.
- As long as the SpecTag stays the same, none of the following changes the test or the code:
- renaming a test;
- adding, removing or rewording a comment;
- changing whitespace that, in the language of its file, does not affect what the code does.
- In a file whose comments and whitespace the checks (§s-jau82aq9juv9zzh) cannot tell from its code, every edit changes the code.
- Example: A commit re-indents a block of TypeScript code, adds a comment above it and changes nothing else, so it changes no code. But not: a commit that indents a key of a YAML file further, which moves the key under the key above it, leaves the code unchanged.

## proposal:s-kgbzk2ph9e6jfb4 — How code is bound to its rules

- A SpecTag before a symbol binds that symbol and every symbol nested in it. SpecTags at the start of a file, and an entry in the bindings file, bind the whole file. A change anywhere in a file bound as a whole is a change to the code its SpecTags bind. The only exception is an edit to a comment or to whitespace that changes no code (§s-9j2mmnuuwmx5ksn).

## proposal:s-m4h279nbaqkpa3t — What the checks enforce, and when they run

- on every commit that adds or changes a comment in the code or in a test: whether each such comment is consistent with the code that it describes and with the rules that this code implements;
- Reason: Every check but the review is binary, so a refusal requires nobody's judgement. A check that sometimes refuses for a reason nobody can reproduce is bypassed at the first opportunity and never trusted again. The review needs a reviewer, because no script can decide whether code does only what its rules say, whether a comment agrees with the code and its rules, whether a rule's implementation really needs no change, or whether a node of the technical appendix agrees with the base specification.

Run after each of an agent's edits, a check finds a mistake where it is made. The order in which the test and the code are written can be seen only edit by edit, since a commit contains the test and the code together.

The tests are not run on a commit, since a test suite takes longer than anyone should wait for a commit. A change not yet shared misleads nobody, so its tests can wait until it is shared. Where they run is the project's choice, since some suites take hours or need what a developer's machine lacks. While the specification is a draft, the work is focused on the specification itself, so no test has to pass.

## proposal:s-nyh9yk22ba6g77q-g3 — What the reviewer is given

- the wording of each rule that a SpecTag (§s-8xw4mgvpexyvw5q) binds to code or a test that the commit adds or changes, or in which the commit adds or changes a comment;
- Reason: The reviewer makes the judgements that no deterministic check can make: whether code does only what its rules say, whether a comment agrees with the code and its rules, whether a rule's implementation really needs no change, and whether an approved node of the technical appendix agrees with the base specification. It can judge only from what it is shown. Shown what each judgement needs, and nothing of what the author of the change meant, it judges by the rules alone.

## proposal:row-10-1-43b — a new row of the main table of checks

- Each comment that a commit adds or changes in the code or in a test is consistent with the code that it describes and with the rules that this code implements
- On failure: reported as a warning, naming the file and the line of the comment

## proposal:s-vp24dqydygztqbt — The review of a commit

- the judgement on each comment that the commit adds or changes (§s-7vpsdsy8dpqdy6r);

## proposal:new-tools-10-verdict — The reviewer's verdict

- `sheriff review` reads a verdict only from an answer that conforms to the schema of the verdict. A verdict that passes the commit lists no finding other than findings on comments (§s-7vpsdsy8dpqdy6r). A verdict that refuses the commit lists at least one finding that is not on a comment.
- Reason: A verdict whose meaning `sheriff review` had to guess, such as a pass that lists a finding on code, would let `sheriff review` decide the outcome of the commit in place of the independent reviewer (§s-m4h279nbaqkpa3t).
- Example: The runner answers with a verdict that passes the commit and lists one finding on code. That answer is not a verdict that `sheriff review` can read, so `sheriff review` refuses the commit. The most likely mistake is to pass the commit and drop the finding, which means deciding for the reviewer what it meant.

## new:tools-7-3-review-comments — The judgement on a comment that a commit adds or changes

- `sheriff review` reports as a warning each finding of the independent reviewer (§s-m4h279nbaqkpa3t) on a comment that the commit adds or changes (§s-td4e3rdga6azav9). It refuses no commit because of such a finding. Each such finding names the file, the line and the problem.
- The reviewer judges the comments that the SpecSheriff tools leave out when they read a line of code (§s-u6mj5yv8ngnz79v). A commit adds or changes such a comment where it adds a line that holds part of the comment. The reviewer judges the text of a comment other than its SpecTags (§s-8xw4mgvpexyvw5q), since a change to a SpecTag is a change to the code (§s-9j2mmnuuwmx5ksn).
- The reviewer makes this judgement on every commit that adds or changes such a comment, including a commit that changes no code. Besides what `sheriff review` gives the reviewer in every review (§s-vp24dqydygztqbt), it gives the reviewer each symbol (§s-kgbzk2ph9e6jfb4), test or file bound as a whole that holds such a comment. Each is given in full, as the commit leaves it, with its file, its lines and the SpecTags that bind it.
- The reviewer finds a problem with a comment where either of the following holds:
- the comment states something that the code it describes does not do;
- the comment contradicts a rule that a SpecTag on that code names.
- Reason: A comment that no longer matches its code misleads whoever reads the code next, and only reading both can show the mismatch. A comment does not change what the system does, so a problem with one is worth a warning but not a refused commit.
- Example: A commit changes only the comment above `roundPrice`, which now says that the function rounds halves up, while the function rounds them to the nearest even number. `sheriff review` reports the reviewer's finding as a warning and lets the commit pass. The most likely mistake is to refuse the commit, as for a defect in the code.
