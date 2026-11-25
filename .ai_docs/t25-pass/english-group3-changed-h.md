# T25, group 3, round h: the English that round h adds or rewrites

Each item differs from what round g left, or belongs to the key that round h adds. The notes of round h say which are in a reviewer's words.

## s-2x58az67bm6cxq2 — What a commit adds, changes and removes in the code and the tests

- The SpecSheriff tools find what a commit adds, changes and removes in the system's code (§s-hheus6f395ynqvc), including its tests. They compare each file as the commit leaves it with the same file in the commit's parent. For a merge commit, the parent is its first parent. The first commit of a repository is compared with an empty repository. A file that the commit moves or renames is compared with the file at its earlier path. A line that the commit adds or removes is one that git shows as added or removed when it compares the two versions of the file with the Myers algorithm, git's default, however git is configured on the machine.
- A commit changes a symbol, a test or a file bound as a whole where its two versions differ (§s-u6mj5yv8ngnz79v). A symbol or a test extends from its first line to its last, including its decorators. So a change in a nested symbol also changes each symbol that encloses it.
- Example: A commit deletes the line `log(id);` inside the function `close` and changes nothing else in it. The version of `close` in the commit's parent contains that line, so the two versions produce different syntax trees, and the commit changes `close`. The most likely mistake is to look only at the lines that the commit adds, which misses a change made by deleting lines.

## new:tools-7-2-changed-line — How two versions of code are compared

- Where the SpecSheriff tools have a grammar for a file's language, they compare two versions of a symbol or a file bound as a whole (§s-kgbzk2ph9e6jfb4), or of a test (§s-zrsc6asgmhv8tnc), by their syntax trees. They parse each version with the tree-sitter grammar of that language. Two versions differ where their trees differ once the following are left out of both:
- each comment, other than the file's first line when that line starts with `#!`;
- Reason: A change to the code makes the SpecSheriff tools check that code against its rules again (§s-9j2mmnuuwmx5ksn). A syntax tree keeps whatever can alter what the code does and drops the whitespace to which the language gives no meaning. So comparing trees treats as changes exactly the edits that can affect what the code does. Where the SpecSheriff tools have no grammar for a file's language, comparing the text treats every edit as a change, so that no change to the code passes unchecked.
- Example: A commit re-wraps the call `send(to, subject, body);` onto three lines and adds a comment above it. Both versions produce the same syntax tree, so the commit changes no code. The most likely mistake is to compare the lines, which counts the re-wrapped call as a change.
- Example: A commit renames the test `@spec s-… refuses an empty name` to `@spec s-… refuses a blank name` and changes nothing else in it. With the test's name left out, both versions produce the same tree, so the commit leaves the test unchanged. The most likely mistake is to keep the test's name in the tree, which counts the renamed test as changed.
- Example: A commit indents the key `retries` by two more spaces in a YAML file bound as a whole, which nests the key under the key above it. The grammar of YAML makes indentation part of the syntax, so the two versions produce different trees, and the commit changes the file. The most likely mistake is to compare only the tokens, which lets the nested key pass as unchanged.

## proposal:s-kgbzk2ph9e6jfb4 — How code is bound to its rules

- The system's code (§s-hheus6f395ynqvc) other than tests is bound by SpecTags (§s-8xw4mgvpexyvw5q) to the rules it implements. Code that implements no rule has a SpecTag that says so.

## proposal:s-m4h279nbaqkpa3t — What the independent reviewer judges

- for every commit that changes the system's code (§s-hheus6f395ynqvc) outside the files generated from the specification (§s-qyjw8xez6t6adc3): whether that code does what the rules named in the commit say and does nothing that they do not say;
- for every commit that adds or changes a comment in the code or in a test outside the files generated from the specification: whether each such comment is consistent with the code that it describes and with the rules that the code implements or that the test is written from;
- for a commit whose message states that a rule's implementation needs no change: whether that statement is true;
- for a commit in which a node of the technical appendix (§s-qmmzf9nksfsa3qp) is approved, if the node has an `implements` link (§s-sn6au3vcr9uy5pm) to a rule of the base specification (§s-5x737t9nee4zgaa): whether the node refines the rules of the base specification that it implements and contradicts no rule of the base specification.

## proposal:new-tools-10-verdict — The reviewer's verdict

- `sheriff review` refuses a commit for which the reviewer must make a judgement other than the one on comments (§s-vp24dqydygztqbt) unless the runner (§s-xr5xxa9cxf2mq5u) gives a verdict that `sheriff review` can read (§s-94k7b6r5kf65udf). Where the commit needs only the judgement on comments (§s-7vpsdsy8dpqdy6r), `sheriff review` instead issues a warning that says why it could not read a verdict.

## new:tools-7-3-review-comments — The judgement on a comment that a commit adds or changes

- The reviewer judges the comments in the system's code (§s-hheus6f395ynqvc) outside the files generated from the specification (§s-qyjw8xez6t6adc3). In a file whose syntax trees the SpecSheriff tools build (§s-u6mj5yv8ngnz79v), the comments are the parts of the file that the SpecSheriff tools treat as comments and leave out of the trees. In any other file, the reviewer itself tells the comments apart from the code.

## proposal:row-10-1-43 — a row of the main table of checks

- The system's code (§s-hheus6f395ynqvc) that a commit changes outside the files generated from the specification (§s-qyjw8xez6t6adc3) does what the rules named in the commit say, and nothing they do not

## proposal:s-94k7b6r5kf65udf — A commit whose review cannot be carried out is refused

- The SpecSheriff tools refuse a commit for which the reviewer must make at least one judgement other than the one on comments (§s-m4h279nbaqkpa3t) unless the reviewer gives an answer that the tools can read. The refusal says why the review could not be carried out. Where the commit needs only the judgement on comments, the tools issue a warning that says why the review could not be carried out.

## proposal:new-tools-7-3-review-code — The judgement on the code that a commit changes

- The reviewer judges the changed code on every commit that adds or changes the system's code (§s-hheus6f395ynqvc), including its tests, outside the files generated from the specification (§s-qyjw8xez6t6adc3). Besides what `sheriff review` gives the reviewer in every review (§s-vp24dqydygztqbt), it gives the reviewer the changed code outside the files generated from the specification. That code consists of the following, each in full, as the commit leaves it, with its file, its lines and the SpecTags (§s-8xw4mgvpexyvw5q) that bind it:
