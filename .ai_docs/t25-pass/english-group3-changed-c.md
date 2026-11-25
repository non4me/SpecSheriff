# T25, group 3, round c: the sentences written in the author's own words

Each sentence below was written in round c by fix-group3-c.mjs in the author's own words, not in a review's. Every other change of round c uses the wording of a review, or of an EngStickler reader. The texts of the three new proposals of round c (`proposal:new-tools-1-settings-g3`, `proposal:s-gb8s9657a65hqmv-g3`, `proposal:row-10-1-35a`) are reviewers' wordings set into agreed nodes; they are in `english-group3.md`.
fix-group3-c.mjs writes this file; edit the script, not this file.

## new:tools-7-1-extensions-delivered — The chosen extensions and the installed plugin

- The commands that read the chosen extensions also include `sheriff guard`, which checks an agent's edit before it is made (§s-st6td4mua9uqt9z).

## s-2x58az67bm6cxq2 — What a commit adds, changes and removes in the code and the tests

- A commit changes a symbol or a test where a line of that symbol or test changes the code (§s-u6mj5yv8ngnz79v).
- A test that the commit renames outside its SpecTag, and changes in no other way, also stays the same test (§s-8xw4mgvpexyvw5q, §s-9j2mmnuuwmx5ksn).
- A commit changes a file bound as a whole where it changes any part of the file's text, including a comment or whitespace (§s-kgbzk2ph9e6jfb4).

## new:tools-7-2-changed-line — A line that changes the code

- Reading each line as the tokens of the language of its file leaves out what cannot alter what the code does, such as comments and the whitespace between tokens.

## new:tools-7-2-draft-rule — The code and the tests of a draft rule

- It takes the approval status of each rule that those SpecTags name from the specification as the commit leaves it.

## s-t383grkn3q68dpf — A node's `meta.code` and `meta.tests`

- The most likely mistake is to take into account only the SpecTags placed above symbols, which would make `sheriff binding` refuse that `meta.code` for naming `src/texts.json`.

## s-5hb9k2e34dgn284 — A list and its declaration

- Where the file, the place or the symbol to which the list points cannot be found, the refusal names the one that is missing.
- For a member that is an object, the value is the value of the property that `TextRule.list.property` names.
- The rule's `TextRule.list.jsonSchema` points to `#/properties/state` in `schema/request.schema.json`, and the schema at that place holds `"enum": ["open", "done", "cancelled", "held"]`.

## new:tools-7-2-own-kinds — The list of a project's own kinds of node

- Comparing the two keeps the declaration of each kind, including whether its nodes require an implementation in code, in line with what an owner has approved.
- The commit would then pass, although the rule says that the nodes of the kind `procedure` require no code and the schema says that they do.

## s-cdachayybfvg4na — An object in a list

- The value of a member that is an object is the value of the property that `TextRule.list.property` names.

## proposal:s-9j2mmnuuwmx5ksn — A change to a SpecTag

- Renaming a test, or rewording the comments in the tests or in a file whose symbols the checks can identify (§s-kgbzk2ph9e6jfb4), changes neither the test nor the code, as long as the SpecTag stays the same. (The reviewer's words for the narrowed scope, set into the agreed sentence.)
