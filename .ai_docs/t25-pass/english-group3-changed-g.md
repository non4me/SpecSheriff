# T25, group 3, round g: the English that round g adds or rewrites

Each item below differs from what round f left, or belongs to a key that round g adds. Each is in the author's own words, unless the notes of round g say that it is in a reviewer's.
fix-group3-g.mjs writes this file; edit the script, not this file.

## s-2x58az67bm6cxq2 — What a commit adds, changes and removes in the code and the tests

- The SpecSheriff tools find what a commit adds, changes and removes in the system's code (§s-hheus6f395ynqvc), including its tests. They compare each file as the commit leaves it with the same file in the commit's parent. For a merge commit, the parent is its first parent. The first commit of a repository is compared with an empty repository. A file that the commit moves or renames is compared with the file at its earlier path. A line that the commit adds or removes is one that git shows as added or removed when it compares the two versions of the file with the Myers algorithm, git's default, whatever git's settings on the machine.
- A commit changes a symbol, a test or a file bound as a whole where its two versions differ (§s-u6mj5yv8ngnz79v). A symbol or a test runs from its first line to its last, including its decorators. So a change in a nested symbol also changes each symbol that encloses it.
- A symbol or a test in the commit's parent is the same as the one with the same name, nested in symbols with the same names, in the file as the commit leaves it. A test that the commit renames, keeping its SpecTag and changing nothing else in it, also stays the same test (§s-8xw4mgvpexyvw5q, §s-9j2mmnuuwmx5ksn).
- Example: A commit deletes the line `log(id);` inside the function `close` and changes nothing else in it. The version of `close` in the commit's parent contains that line, so the two versions give different syntax trees, and the commit changes `close`. The most likely mistake is to look only at the lines that the commit adds, which misses a change made by deleting lines.

## new:tools-7-2-changed-line — How two versions of code are compared

- Where the SpecSheriff tools have a grammar of a file's language, they compare two versions of a symbol or a file bound as a whole (§s-kgbzk2ph9e6jfb4), or of a test (§s-zrsc6asgmhv8tnc), by their syntax trees. They parse each version with the tree-sitter grammar of that language. Two versions differ where their trees differ once the following are left out of both:
- each comment, other than the file's first line where it opens with `#!`;
- A syntax tree holds the kind of each construct of the code, how the constructs nest, and the text of each token, such as an identifier or a literal. So renaming an identifier changes the tree, and so does any edit inside a string literal. A change to whitespace changes the tree only where the grammar makes whitespace part of the syntax, such as the indentation of a line in Python or YAML.
- a file bound as a whole (§s-kgbzk2ph9e6jfb4) whose name ends in `.yaml` or `.yml`, in `.css`, in `.sql`, in `.sh` or in `.json`, with the grammar of YAML, CSS, SQL, Bash or JSON respectively.
- Where the grammar finds a syntax error in either version, the two versions differ where their text differs.
- Reason: A change to the code makes the SpecSheriff tools check that code against its rules again (§s-9j2mmnuuwmx5ksn). A syntax tree keeps whatever can alter what the code does and drops the whitespace to which the language gives no meaning. So comparing trees counts exactly the edits that can matter. Where the SpecSheriff tools have no grammar of a file's language, comparing the text counts every edit, so that no change to the code passes unchecked.
- Example: A commit indents the key `retries` by two more spaces in a YAML file bound as a whole, which nests the key under the key above it. The grammar of YAML makes indentation part of the syntax, so the two versions give different trees, and the commit changes the file. The most likely mistake is to compare only the tokens, which lets the nested key pass as unchanged.

## proposal:s-9j2mmnuuwmx5ksn — Which edits change a test or code

- Title: Which edits change a test or code
- Example: A commit re-indents a block of TypeScript code, adds a comment above it and changes nothing else, so the commit changes no code. By contrast, a commit that indents a key of a YAML file further, which nests the key under the key above it, changes the code.

## proposal:s-kgbzk2ph9e6jfb4 — How code is bound to its rules

- The system's code (§s-hheus6f395ynqvc) other than tests is bound to the rules it implements by SpecTags (§s-8xw4mgvpexyvw5q). Code that implements no rule has a SpecTag that says so.
- A SpecTag before a symbol binds that symbol and every symbol nested in it. SpecTags at the start of a file, and an entry in the bindings file, bind the whole file. A change anywhere in a file bound as a whole is a change to the code its SpecTags bind. The only exception is an edit that changes no code (§s-9j2mmnuuwmx5ksn): an edit to a comment that leaves its SpecTags as they are, or to whitespace that does not affect what the code does.

## proposal:s-m4h279nbaqkpa3t — What the independent reviewer judges

- on every commit that changes the system's code (§s-hheus6f395ynqvc) outside the files generated from the specification (§s-qyjw8xez6t6adc3): whether that code does what the rules named in the commit say and does nothing that they do not say;
- on every commit that adds or changes a comment in the code or in a test outside the files generated from the specification: whether each such comment is consistent with the code that it describes and with the rules that the code implements or that the test is written from;
- Reason: No script can decide whether code does only what its rules say, whether a comment agrees with the code and its rules, whether a rule's implementation really needs no change, or whether a node of the technical appendix agrees with the base specification. So these judgements are made by an independent reviewer. Code generated from the specification only restates the specification, so the reviewer has nothing to judge there.

## proposal:s-nyh9yk22ba6g77q-g3 — What the reviewer is given

- the wording of each rule that a SpecTag (§s-8xw4mgvpexyvw5q) binds to code or a test that the commit adds or changes, or that is described by a comment that the commit adds or changes;

## proposal:row-10-1-43b — a row of the main table of checks

- Each comment that a commit adds or changes in the code or in a test outside the files generated from the specification (§s-qyjw8xez6t6adc3) is consistent with the code that it describes and with the rules that the code implements or that the test is written from

## proposal:s-vp24dqydygztqbt — The review of a commit

- `sheriff review` refuses a commit where the verdict of the independent reviewer (§s-m4h279nbaqkpa3t) refuses it. The refusal lists each finding of the verdict (§s-68ds99w8wd67aae). Where the commit leaves the specification a draft, `sheriff review` disregards each finding on a statement that a rule's implementation needs no change (§s-kgqxg4gunzynwsv). In that case, it refuses the commit only where the verdict lists a finding on code or on a node that the commit approves.

## proposal:new-tools-10-verdict — The reviewer's verdict

- refuses the commit and lists at least one finding that belongs to a judgement other than the one on comments.

## new:tools-7-3-review-comments — The judgement on a comment that a commit adds or changes

- `sheriff review` reports each finding of the independent reviewer (§s-m4h279nbaqkpa3t) on a comment that a commit adds or changes (§s-td4e3rdga6azav9) only as a warning. Each such finding names the file, the line and the problem, and also each rule that the comment contradicts.
- The reviewer judges the comments in the system's code (§s-hheus6f395ynqvc) outside the files generated from the specification (§s-a8fn72xa782wvbk). In a file whose syntax trees the SpecSheriff tools build (§s-u6mj5yv8ngnz79v), the comments are the parts of the file that the SpecSheriff tools leave out of the trees as comments. In any other file, the reviewer itself tells the comments apart from the code.
- A commit adds or changes a comment where, with whitespace left out, the comment's text differs from the text of every comment in the same file in the commit's parent (§s-2x58az67bm6cxq2). The reviewer judges the text of a comment, except its SpecTags (§s-8xw4mgvpexyvw5q), since a change to a SpecTag is a change to the code (§s-9j2mmnuuwmx5ksn).
- The reviewer judges comments on every commit that adds or changes a comment, including a commit that changes no code. `sheriff review` gives the reviewer the code that each such comment describes, in addition to what it gives the reviewer in every review (§s-vp24dqydygztqbt). That code is the following, in full, as the commit leaves it, with its file, its lines and the SpecTags that bind it:
- for a comment in a file bound as a whole (§s-kgbzk2ph9e6jfb4): that file;
- for a comment in a symbol (§s-kgbzk2ph9e6jfb4) or a test, or directly above one (§s-33fw3ga4ctd94dq): the innermost such symbol or test;
- for any other comment: the symbol or the test that follows it, or the whole file where no symbol or test follows it.
- The reviewer finds a problem with a comment only where either of the following holds:
- Reason: A comment that no longer matches its code misleads whoever reads the code next. Only a reader of both the comment and the code can see the mismatch. A comment does not change what the system does, so a problem with a comment warrants a warning, but not a refusal of the commit.

## proposal:row-10-1-43 — a row of the main table of checks

- The system's code (§s-hheus6f395ynqvc) that a commit changes outside the files generated from the specification (§s-qyjw8xez6t6adc3) does what the rules that the commit names say, and nothing they do not

## proposal:s-94k7b6r5kf65udf — A commit whose review cannot be carried out is refused

- Title: A commit whose review cannot be carried out is refused
- The SpecSheriff tools refuse a commit for which the reviewer must make at least one judgement (§s-m4h279nbaqkpa3t) unless the reviewer gives an answer that the tools can read. The refusal says why the review could not be carried out.
- Reason: A review that lets a commit through whenever it could not be carried out is a review nobody can rely on.
- Example: No reviewer is installed.
- Example: The reviewer's run does not end within its time limit.
- Example: The run ends with an error.
- Example: The answer passes the commit but reports a finding on code.
