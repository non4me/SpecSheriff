# T25, group 3, round f: the English that round f adds or rewrites

Each item below differs from what round e left, or belongs to a key that round f adds. Each is in the author's own words, unless the notes of round f say that it is in a reviewer's.
fix-group3-f.mjs writes this file; edit the script, not this file.

## s-2x58az67bm6cxq2 — What a commit adds, changes and removes in the code and the tests

- A commit changes a symbol, a test or a file bound as a whole where its two versions give different syntax trees (§s-u6mj5yv8ngnz79v). The tree of a symbol or a test spans it from its first line to its last, including its decorators. So a change in a nested symbol also changes each symbol that encloses it.
- A symbol or a test of the commit's parent is the same as the one of the same name in the file as the commit leaves it. A test that the commit renames, keeping its SpecTag and changing nothing else in it, also stays the same test (§s-8xw4mgvpexyvw5q, §s-9j2mmnuuwmx5ksn).
- Example: A commit deletes one line inside the function `close` and changes nothing else in it. The version of `close` in the commit's parent holds that line, so the two versions give different syntax trees, and the commit changes `close`. The most likely mistake is to look only at the lines that the commit adds, which misses a change made by deleting lines.
- Example: A commit rewords a comment in a stylesheet bound by SpecTags at its start and changes nothing else in it. The SpecSheriff tools parse both versions with the grammar of CSS and leave the comment out of both trees. The trees are the same, so the commit does not change the stylesheet's code. The most likely mistake is to count any change to the text of a file bound as a whole as a change to its code.

## new:tools-7-2-changed-line — How two versions of code are compared

- Title: How two versions of code are compared
- The SpecSheriff tools compare two versions of a symbol (§s-kgbzk2ph9e6jfb4), a test (§s-zrsc6asgmhv8tnc) or a file bound as a whole by their syntax trees (§s-9j2mmnuuwmx5ksn). They parse each version with the tree-sitter grammar of its file's language. Two versions differ where their trees differ once the following are left out of both:
- each comment, other than a first line of the file that opens with `#!`;
- in a test, the test's name, other than its SpecTag (§s-8xw4mgvpexyvw5q).
- A syntax tree holds the kind of each of its nodes and the text of each token, such as an identifier or a literal. So renaming an identifier changes the tree, and so does any edit inside a string literal. Whitespace changes the tree only where the grammar makes it part of the syntax, such as the indentation of a line in Python or YAML.
- The SpecSheriff tools parse the following files with a grammar:
- a file whose language a description covers (§s-33fw3ga4ctd94dq), with the grammar of its language;
- a file bound as a whole (§s-kgbzk2ph9e6jfb4) whose name ends in `.yaml`, `.yml`, `.css`, `.sql`, `.sh` or `.json`, with the grammar of YAML, CSS, SQL, Bash or JSON.
- In any other file, two versions differ where their text differs.
- Reason: A change to the code makes the SpecSheriff tools check that code against its rules again (§s-9j2mmnuuwmx5ksn). A syntax tree keeps whatever can alter what the code does and drops the whitespace that the language gives no meaning. So comparing trees counts exactly the edits that can matter. Where the SpecSheriff tools have no grammar, comparing the text counts every edit, so that no change to the code passes unchecked.
- Example: A commit re-wraps the call `send(to, subject, body);` onto three lines and adds a comment above it. Both versions give the same syntax tree, so the commit changes no code. The most likely mistake is to compare the lines, which counts the re-wrapped call as a change.
- Example: A commit renames the test `@spec s-… refuses an empty name` to `@spec s-… refuses a blank name` and changes nothing else in it. With the test's name left out, both versions give the same tree, so the commit leaves the test unchanged. The most likely mistake is to keep the test's name in the tree, which counts the renamed test as changed.
- Example: A commit indents the key `retries` by two more spaces in a YAML file bound as a whole, which nests the key in the key above it. The grammar of YAML makes indentation part of the syntax, so the two versions give different trees, and the commit changes the file. The most likely mistake is to compare only the tokens, which lets the nested key pass as unchanged.

## proposal:s-9j2mmnuuwmx5ksn — A change to a SpecTag

- In a file whose comments and whitespace the checks (§s-jau82aq9juv9zzh) cannot tell apart from its code, every edit changes the code.
- Example: A commit re-indents a block of TypeScript code, adds a comment above it and changes nothing else, so it changes no code. By contrast, a commit that indents a key of a YAML file further, which nests the key in the key above it, changes the code.

## proposal:s-kgbzk2ph9e6jfb4 — How code is bound to its rules

- A SpecTag before a symbol binds that symbol and every symbol nested in it. SpecTags at the start of a file, and an entry in the bindings file, bind the whole file. A change anywhere in a file bound as a whole is a change to the code its SpecTags bind. The only exception is an edit that changes no code (§s-9j2mmnuuwmx5ksn): an edit to a comment, or to whitespace that does not affect what the code does.

## proposal:s-m4h279nbaqkpa3t — What the independent reviewer judges

- Title: What the independent reviewer judges
- In the review of a commit, an independent reviewer judges the following (§s-nyh9yk22ba6g77q):
- on every commit that changes code other than the files generated from the specification: whether that code does what the rules named in the commit say and does nothing that they do not say;
- on every commit that adds or changes a comment in the code or in a test, other than in the files generated from the specification: whether each such comment is consistent with the code that it describes and with the rules that this code implements or that this test is written from;
- on a commit in which a node of the technical appendix (§s-qmmzf9nksfsa3qp) is approved, if the node has an `implements` link (§s-sn6au3vcr9uy5pm) to a rule of the base specification (§s-5x737t9nee4zgaa): whether the node refines the rules of the base specification that it implements and contradicts no rule of the base specification.
- Reason: No script can decide whether code does only what its rules say, whether a comment agrees with the code and its rules, whether a rule's implementation really needs no change, or whether a node of the technical appendix agrees with the base specification. So these judgements are made by an independent reviewer. Code generated from the specification only restates it, so the reviewer has nothing to judge there.

## proposal:s-nyh9yk22ba6g77q-g3 — What the reviewer is given

- the wording of each rule that a SpecTag (§s-8xw4mgvpexyvw5q) binds to code or a test that the commit adds or changes, or that holds, or lies directly below, a comment that the commit adds or changes;

## proposal:row-10-1-43b — a new row of the main table of checks

- Each comment that a commit adds or changes in the code or in a test, other than in the files generated from the specification, is consistent with the code that it describes and with the rules that this code implements or that this test is written from

## proposal:s-vp24dqydygztqbt — The review of a commit

- `sheriff review` refuses a commit where the verdict of the independent reviewer (§s-m4h279nbaqkpa3t) refuses it. The refusal lists each finding of the verdict (§s-68ds99w8wd67aae). Where the commit leaves the specification a draft, `sheriff review` disregards each finding on a statement that a rule's implementation needs no change (§s-kgqxg4gunzynwsv). In that case, it refuses the commit only where the verdict also lists a finding on code or on a node that the commit approves.
- Example: A commit changes only the wording of a draft rule. It changes no code and no comment in the code, its message contains no statement that a rule's implementation needs no change, and it approves no node. So `sheriff review` does not run the reviewer, and the commit passes the review. The most likely mistake is to run the reviewer on every commit, which makes the user who commits pay for a run that has nothing to judge.

## proposal:new-tools-10-verdict — The reviewer's verdict

- `sheriff review` reads a verdict only from an answer that conforms to the schema of the verdict and that does one of the following:
- passes the commit and lists only findings that belong to the judgement on comments (§s-7vpsdsy8dpqdy6r), if it lists any;
- refuses the commit and lists at least one finding that belongs to another judgement.
- Reason: A verdict whose meaning `sheriff review` had to guess, such as a verdict that passes the commit and lists a finding on code, would let `sheriff review` decide the outcome of the commit in place of the independent reviewer (§s-m4h279nbaqkpa3t).

## new:tools-7-3-review-comments — The judgement on a comment that a commit adds or changes

- `sheriff review` reports each finding of the independent reviewer (§s-m4h279nbaqkpa3t) on a comment that the commit adds or changes (§s-td4e3rdga6azav9) only as a warning. Each such finding names the file, the line and the problem, and also each rule that the comment contradicts.
- The reviewer judges the comments in the system's code (§s-hheus6f395ynqvc), other than in the files generated from the specification (§s-a8fn72xa782wvbk). In a file whose syntax trees the SpecSheriff tools build (§s-u6mj5yv8ngnz79v), the comments are what the SpecSheriff tools leave out of the trees. In any other file, the reviewer itself tells the comments apart from the code.
- A commit adds or changes a comment where the commit adds a line that holds part of the comment. It also changes a comment where it removes a line that held part of the comment and leaves the rest of the comment in place. The reviewer judges the text of a comment, except its SpecTags (§s-8xw4mgvpexyvw5q), since a change to a SpecTag is a change to the code (§s-9j2mmnuuwmx5ksn).
- The reviewer makes the judgement on comments on every commit that adds or changes one, including a commit that changes no code. Besides what it gives the reviewer in every review (§s-vp24dqydygztqbt), `sheriff review` gives the reviewer the code that each such comment describes. That code is the following, in full, as the commit leaves it, with its file, its lines and the SpecTags that bind it:
- for a comment in a file bound as a whole: that file;
- for a comment in a symbol (§s-kgbzk2ph9e6jfb4) or a test, or directly above one (§s-33fw3ga4ctd94dq): that symbol or test;
- for any other comment: the symbol or the test that follows it, or the whole file where none follows it.
- Reason: A comment that no longer matches its code misleads whoever reads the code next. Only a reader of both the comment and the code can see the mismatch. A comment does not change what the system does, so a problem with one warrants a warning, but not a refusal of the commit.
- Example: A commit changes only the comment above `roundPrice`, which now says that the function rounds halves up, while the function rounds them to the nearest even number. `sheriff review` reports the reviewer's finding as a warning and lets the commit pass. The most likely mistake is to refuse the commit, as `sheriff review` does for a defect in the code.

## proposal:new-spec-1-6-checks — What the checks enforce

- Title: What the checks enforce
- The following are checked mechanically:
- that the specification conforms to the rules of the guidelines that the main table of checks (§s-jau82aq9juv9zzh), or the table of checks of an extension (§s-gpzs5fcxvp6jkrp), lists;
- that the specification and the code still agree with each other.
- Every check except the review (§s-m4h279nbaqkpa3t) is deterministic.
- A failed check refuses the change, unless the table that lists the check says otherwise (§s-jau82aq9juv9zzh).
- Reason: Every check but the review is binary, so a refusal requires nobody's judgement. A check that sometimes refuses for a reason nobody can reproduce is bypassed at the first opportunity and never trusted again.

## proposal:new-spec-1-6-runs — The checks on a commit and on an agent's edits

- Title: The checks on a commit and on an agent's edits
- The checks run when a commit is made. Where an agent writes the specification, the tests or the code, the checks also run after each of its edits (§s-epaw9sgyaajzn8g). Some of its edits are refused before they are made (§s-83ev4wwesbwnhnp).
- Reason: A check that runs after each of an agent's edits finds a mistake at the moment it is made. The order in which the test and the code are written can be seen only edit by edit, since a commit contains the test and the code together.

## proposal:new-spec-1-6-tests — When the tests must pass

- Title: When the tests must pass
- As long as the specification has the status `approved`, the tests of the system's code (§s-hheus6f395ynqvc) and of a project's own checks (§s-2fau85dfyyeq66m) and generators (§s-km4x4s26kv7pjze) must pass before a change reaches the project's shared branch. The project's own guidelines (§s-u7tw6m8npxmv5tu) name where the tests run, such as on every push or on a shared server before a merge.
- Reason: The tests are not run on a commit, since a test suite takes longer than anyone should wait for a commit. A change not yet shared misleads nobody, so its tests can wait until it is shared. Where they run is the project's choice, since some suites take hours or need what a developer's machine lacks. While the specification is a draft, the work is focused on the specification itself, so no test has to pass.
- Example: A project whose tests need a database states in its own guidelines that the tests run on a shared server before a merge. A push from a developer's machine then runs no tests, and the merge waits until the tests pass.
