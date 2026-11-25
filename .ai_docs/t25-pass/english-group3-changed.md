# T25, group 3, round b: the sentences written in the author's own words

Each sentence below was written in round b by fix-group3-b.mjs in the author's own words, not in a review's or a reader's. Every other change of round b uses the wording of a review or of an EngStickler reader, or the coordinator's phrase "makes this check regardless of whether the specification is approved or a draft".
fix-group3-b.mjs writes this file; edit the script, not this file.

## s-j9r8z4xdrfkfs47 — Entries that only an owner of the specification records

- after the commit, the first entries for that setting are all those that the commit's parent holds for it, unchanged and in the same order;

## new:tools-7-1-extensions-delivered — The chosen extensions and the installed plugin

- They also include `sheriff guard`, which checks an agent's edit before it is made (§s-st6td4mua9uqt9z).
- The most likely mistake is to compose the schema without the missing extension, which lets the command accept, on that machine, a node that the extension's checks would refuse.

## s-2x58az67bm6cxq2 — The code and the tests that a commit changes

- A commit changes a symbol (§s-kgbzk2ph9e6jfb4) or a test (§s-zrsc6asgmhv8tnc) where one of its lines changes the code (§s-u6mj5yv8ngnz79v).
- A test is also the same where the commit changes only its name outside its SpecTag (§s-8xw4mgvpexyvw5q, §s-9j2mmnuuwmx5ksn). (The reviewer's sentence, with the citation of the SpecTag added at its first use.)
- A commit changes a file bound as a whole (§s-5qdjyf6t898rsd4, §s-trwczfskj5zmuft) where it changes any of the file's text, including a comment or whitespace (§s-kgbzk2ph9e6jfb4).
- A single definition of those changes lets every check judge the same ones.

## new:tools-7-2-changed-line — A line that changes the code

- Reading lines as the tokens of their language leaves out what cannot alter what the code does, such as comments and the whitespace between tokens.

## new:tools-7-2-draft-rule — The code and the tests of a draft rule

- It takes the rule's approval status from the specification as the commit leaves it.

## s-t383grkn3q68dpf — A node's `meta.code` and `meta.tests`

- The most likely mistake is to count only the SpecTags placed above symbols, which would make `sheriff binding` refuse that `meta.code` for naming `src/texts.json`.

## s-5hb9k2e34dgn284 — A list and its declaration

- Where the file, the place or the symbol to which the list points cannot be found, the refusal names it.
- For a member that is an object, the value is the value of its property that `TextRule.list.property` names.
- Comparing them at every commit keeps the values that the system accepts in line with those that the rule states.
- Its `TextRule.list.jsonSchema` points to `#/properties/state` in `schema/request.schema.json`, and the schema at that place holds `"enum": ["open", "done", "cancelled", "held"]`.

## new:tools-7-2-own-kinds — The list of a project's own kinds of node

- Comparing the two keeps each kind, and whether its nodes require an implementation in code, in line with what an owner has approved.
- The rule would then say that the nodes of the kind `procedure` require no code, while the schema says that they do.

## s-cdachayybfvg4na — An object in a list

- The value of a member that is an object is the value of its property that `TextRule.list.property` names.

## proposal:s-9j2mmnuuwmx5ksn — A change to a SpecTag

- Renaming a test, or rewording the comments in the tests or in code bound by a SpecTag before each symbol (§s-kgbzk2ph9e6jfb4), changes neither the test nor the code, as long as the SpecTag stays the same.
