# T25, group 3: the English of every node

This file holds the final English of every node of group 3 of stage 2 of T25, as `tools-drafts.json` holds it after fix-group3-h.mjs.
fix-group3-h.mjs writes this file; edit the script, not this file.

## s-j9r8z4xdrfkfs47 — Entries that only an owner of the specification records

**Title:** Entries that only an owner of the specification records

**Text:**

For a setting that only an owner of the specification changes (§s-chsfpkgpmfk4fft), `sheriff binding` accepts a commit's change to the entries in `sheriff.config.json` (§s-zefk589ykh37b8u) only where both of the following hold:
- after the commit, the first entries for that setting are all those that the commit's parent holds for it, unchanged and in the same order;
- each entry that follows them names an owner of the specification (§s-6sk8uet75dmq5qz).

`sheriff binding` refuses every other change to the entries for a setting that only an owner of the specification changes. The refusal names the setting, each entry concerned and the specification's owners.

`sheriff binding` reads the entries of the commit's parent in the form to which `sheriff reindex` would rewrite them (§s-gb8s9657a65hqmv). For a merge commit, the parent is its first parent. `sheriff binding` takes the specification's owners from `project.json` (§s-zefk589ykh37b8u) as the commit leaves it.

`sheriff binding` makes this check regardless of whether the specification is approved or a draft (§s-pa8t49pqpwscuq7, §s-y5w6xwvwh857azx, §s-dxzq5rd6eeteza4).

**Reason:**

Removing, editing or moving an entry already recorded, or recording an entry in the name of a person who is not an owner, could change a setting that only an owner of the specification changes without an act of an owner (§s-qzthyh7yqvfhsa2, §s-q3pfzyaxvpr2zj2, §s-9ttvcwpqkehm58g).

**Example:**

The latest entry for the specification's approval status approves the specification, and the entry before it returned the specification to draft. A person deletes the latest entry by hand, so that the specification would be a draft again. `sheriff binding` refuses the commit, since the first entries for that setting are no longer those of the commit's parent. The most likely mistake is to check only the added entries, which lets the commit return the specification to draft without an owner's entry.

## new:tools-7-1-extensions-delivered — The chosen extensions and the installed plugin

**Title:** The chosen extensions and the installed plugin

**Text:**

A command of the SpecSheriff tools that reads the chosen extensions of the guidelines (§s-mbmnsnxenmavu3z, §s-9ttvcwpqkehm58g) runs only where the installed SpecSheriff plugin delivers each of them (§s-j5qmmdq4m26mdvw). Where the plugin lacks any of them, the command refuses to run. The refusal names each missing extension and the version of the SpecSheriff tools in the plugin. `sheriff reindex` then leaves every file unchanged.

The commands that read the chosen extensions include `sheriff validate`, `sheriff binding` and `sheriff reindex`, which, as they compose the schema of the specification, add to it the schema of each chosen extension that has one (§s-xzcw3hv4hmxz7h7). The commands that read the chosen extensions also include `sheriff guard`, which checks an agent's edit before it is made (§s-st6td4mua9uqt9z). The plugin delivers an extension where the extension's file is at the path given for each extension of the guidelines (§s-zefk589ykh37b8u).

Each command that reads the chosen extensions makes this check regardless of whether the specification is approved or a draft (§s-j5qmmdq4m26mdvw).

**Reason:**

Without an extension's file, the SpecSheriff tools can neither compose the schema that the extension adds nor run the checks of its table (§s-gpzs5fcxvp6jkrp). A command that ran without the file would accept on one machine what the same command refuses on a machine whose plugin delivers the extension.

**Example:**

A project chooses an extension that a new release of the SpecSheriff plugin delivers. A team member's machine still has an earlier release, which does not deliver it. On that machine, `sheriff validate` refuses to run, naming the extension and the earlier release's version, so the git hook refuses the commit. The most likely mistake is to compose the schema without the missing extension, which lets the command accept, on that machine, a node that the extension's checks would refuse.

## s-2x58az67bm6cxq2 — What a commit adds, changes and removes in the code and the tests

**Title:** What a commit adds, changes and removes in the code and the tests

**Text:**

The SpecSheriff tools find what a commit adds, changes and removes in the system's code (§s-hheus6f395ynqvc), including its tests. They compare each file as the commit leaves it with the same file in the commit's parent. For a merge commit, the parent is its first parent. The first commit of a repository is compared with an empty repository. A file that the commit moves or renames is compared with the file at its earlier path. A line that the commit adds or removes is one that git shows as added or removed when it compares the two versions of the file with the Myers algorithm, git's default, however git is configured on the machine.

A commit changes only the symbols (§s-kgbzk2ph9e6jfb4), files bound as a whole (§s-5qdjyf6t898rsd4, §s-trwczfskj5zmuft) and tests (§s-zrsc6asgmhv8tnc) that both the commit's parent and the commit hold. It adds each of them that only the commit holds. It removes each of them that only the commit's parent holds.

A commit changes a symbol, a test or a file bound as a whole where its two versions differ (§s-u6mj5yv8ngnz79v). A symbol or a test extends from its first line to its last, including its decorators. So a change in a nested symbol also changes each symbol that encloses it.

A symbol or a test in the commit's parent is the same as the one with the same name, nested in symbols with the same names, in the file as the commit leaves it. A test that the commit renames, keeping its SpecTag and changing nothing else in it, also stays the same test (§s-8xw4mgvpexyvw5q, §s-9j2mmnuuwmx5ksn).

A commit also changes each symbol, file bound as a whole and test whose SpecTags it changes (§s-9j2mmnuuwmx5ksn). A commit changes the SpecTags of a symbol, a file or a test where a SpecTag binds it either in the commit's parent or after the commit, but not in both. Two SpecTags are the same only where their texts are the same, including the text after `@spec none` (§s-5z5gnu7pahr82xp).

A commit adds an entry of the bindings file (§s-trwczfskj5zmuft) where the commit's parent holds no entry for the same file. It changes an entry whose SpecTags differ from those of the same file's entry in the parent.

A commit adds or changes each SpecTag of the following kinds:
- a SpecTag on a line that the commit adds;
- a SpecTag in an entry that the commit adds or changes.

The exception is a SpecTag that binds the same symbol, file or test, with the same text, as in the commit's parent.

A commit leaves unchanged each symbol, file bound as a whole and test that it leaves in the repository and neither adds nor changes.

**Reason:**

The checks of a commit judge code and tests according to whether the commit adds, changes, removes or leaves them unchanged. A single definition of each of these lets every check judge the same code and tests in the same way.

**Example 1:**

A commit deletes the line `log(id);` inside the function `close` and changes nothing else in it. The version of `close` in the commit's parent contains that line, so the two versions produce different syntax trees, and the commit changes `close`. The most likely mistake is to look only at the lines that the commit adds, which misses a change made by deleting lines.

**Example 2:**

A commit rewords a comment in a stylesheet bound by SpecTags at its start and changes nothing else in it. The SpecSheriff tools parse both versions with the grammar of CSS and leave the comment out of both trees. The trees are the same, so the commit does not change the stylesheet's code. The most likely mistake is to count any change to the text of a file bound as a whole as a change to its code.

## new:tools-7-2-changed-line — How two versions of code are compared

**Title:** How two versions of code are compared

**Text:**

Where the SpecSheriff tools have a grammar for a file's language, they compare two versions of a symbol or a file bound as a whole (§s-kgbzk2ph9e6jfb4), or of a test (§s-zrsc6asgmhv8tnc), by their syntax trees. They parse each version with the tree-sitter grammar of that language. Two versions differ where their trees differ once the following are left out of both:
- each comment, other than the file's first line when that line starts with `#!`;
- in a test, the test's name, other than its SpecTag (§s-8xw4mgvpexyvw5q).

A syntax tree holds the kind of each construct of the code, how the constructs nest, and the text of each token, such as an identifier or a literal. So renaming an identifier changes the tree, and so does any edit inside a string literal. A change to whitespace changes the tree only where the grammar makes whitespace part of the syntax, such as the indentation of a line in Python or YAML.

The SpecSheriff tools parse the following files with a grammar:
- a file whose language a description covers (§s-33fw3ga4ctd94dq), with the grammar of its language;
- a file bound as a whole (§s-kgbzk2ph9e6jfb4) whose name ends in `.yaml` or `.yml`, in `.css`, in `.sql`, in `.sh` or in `.json`, with the grammar of YAML, CSS, SQL, Bash or JSON respectively.

Where the grammar finds a syntax error in either version, the two versions differ where their text differs.

In any other file, two versions differ where their text differs.

**Reason:**

A change to the code makes the SpecSheriff tools check that code against its rules again (§s-9j2mmnuuwmx5ksn). A syntax tree keeps whatever can alter what the code does and drops the whitespace to which the language gives no meaning. So comparing trees treats as changes exactly the edits that can affect what the code does. Where the SpecSheriff tools have no grammar for a file's language, comparing the text treats every edit as a change, so that no change to the code passes unchecked.

**Example 1:**

A commit re-wraps the call `send(to, subject, body);` onto three lines and adds a comment above it. Both versions produce the same syntax tree, so the commit changes no code. The most likely mistake is to compare the lines, which counts the re-wrapped call as a change.

**Example 2:**

A commit renames the test `@spec s-… refuses an empty name` to `@spec s-… refuses a blank name` and changes nothing else in it. With the test's name left out, both versions produce the same tree, so the commit leaves the test unchanged. The most likely mistake is to keep the test's name in the tree, which counts the renamed test as changed.

**Example 3:**

A commit indents the key `retries` by two more spaces in a YAML file bound as a whole, which nests the key under the key above it. The grammar of YAML makes indentation part of the syntax, so the two versions produce different trees, and the commit changes the file. The most likely mistake is to compare only the tokens, which lets the nested key pass as unchanged.

## new:tools-7-2-draft-rule — The code and the tests of a draft rule

**Title:** The code and the tests of a draft rule

**Text:**

`sheriff binding` refuses a commit that adds, changes or removes (§s-2x58az67bm6cxq2) code or a test bound by a SpecTag (§s-8xw4mgvpexyvw5q) that names a draft rule (§s-wpadgy2budcxa3v). It does so regardless of whether the specification is approved or a draft (§s-utvqbypzhmgndug).

The refusal names the rule by its file, its sid and its location (§s-kag2m9tzdnduxdx). It also names each symbol (§s-kgbzk2ph9e6jfb4) and each test concerned, with its file and its line, and each other file concerned. Where the commit removes a symbol or a test, its line is read in the commit's parent.

`sheriff binding` reads the SpecTags both in the commit's parent and as the commit leaves the code and the tests. From the specification as the commit leaves it, `sheriff binding` takes the approval status of each rule that those SpecTags name. A rule here is a node of one of the kinds that the node on the form of a SpecTag lists (§s-5z5gnu7pahr82xp).

**Reason:**

A draft rule may still be incomplete or wrong, so code or a test written, changed or removed for it would follow a wording that no owner has approved (§s-utvqbypzhmgndug).

**Example:**

A rule that a function implements is reworded and becomes a draft. Before an owner approves the new wording, a commit deletes the function. `sheriff binding` refuses the commit and names the rule. The most likely mistake is to read the SpecTags only as the commit leaves the code, which lets the deletion pass, since no SpecTag naming the rule is left.

## s-t383grkn3q68dpf — A node's `meta.code` and `meta.tests`

**Title:** A node's `meta.code` and `meta.tests`

**Text:**

`sheriff binding` refuses each node whose `meta.code` or `meta.tests` (§s-rwqzepmrt77rv35) differs from the list that `sheriff reindex` would write there (§s-ztseyetus7np6br) from the SpecTags (§s-8xw4mgvpexyvw5q) as the commit leaves the code and the tests (§s-tqdmk6jakx97wra). The refusal names the node by its file, its sid and its location (§s-kag2m9tzdnduxdx), and gives that list.

`sheriff binding` compares the entries of a node's `meta.code` and `meta.tests` regardless of their order. It checks each node of the specification in the files that the repository keeps, including a node in a cell of a `TableRule` (§s-5fewsp22mmdz7y6). It makes this check regardless of whether the specification is approved or a draft (§s-tqdmk6jakx97wra).

**Reason:**

`sheriff reindex` writes a node's `meta.code` and `meta.tests` from the SpecTags (§s-ztseyetus7np6br), but a person may edit them by hand or commit without running it. A list that differs from the SpecTags would show a reader code or tests that are not bound to the node, or would hide some that are.

**Example:**

Rule R is implemented by the function `render` in `src/page.ts` and by `src/texts.json`, which the bindings file binds to R. The `meta.code` of R names both files, and `sheriff binding` accepts it. The most likely mistake is to take into account only the SpecTags placed above symbols, which would make `sheriff binding` refuse that `meta.code` for naming `src/texts.json`.

## s-5hb9k2e34dgn284 — A list and its declaration

**Title:** A list and its declaration

**Text:**

`sheriff binding` accepts a `TextRule.list` (§s-eferktypcj7njt5) only where each of the following holds (§s-f5mm7tagez38ffz):
- where the list has a `TextRule.list.jsonSchema`, each of its values is valid, under JSON Schema 2020-12, against the schema at the place to which that property points;
- where the schema at that place holds the keyword `enum`, directly or through `$ref`, each value of that `enum` is one of the list's values;
- where the list has a `TextRule.list.valueList`, the symbol (§s-kgbzk2ph9e6jfb4) to which that property points declares exactly the list's values.

`sheriff binding` refuses every other `TextRule.list`, naming the node by its file, its sid and its location (§s-kag2m9tzdnduxdx), and naming each value concerned. Where the file to which the list points, the place in it or the symbol cannot be found, the refusal names the one that cannot be found.

Each member of a list gives one of the list's values. The value of a member that is an object is the value of the member's property that `TextRule.list.property` names. `sheriff binding` checks a list only where each of its members that is an object holds that property, which the check of an object in a list requires (§s-cdachayybfvg4na).

A symbol declares the text of each string literal within its lines, as the SpecSheriff tools read a file whose language a description covers (§s-33fw3ga4ctd94dq). A value of the list matches such a literal where the value, written as text, is the literal's text.

`sheriff binding` checks the list of each node of the specification in the files that the repository keeps, including a node in a cell of a `TableRule` (§s-5fewsp22mmdz7y6). `sheriff binding` makes this check regardless of whether the specification is approved or a draft (§s-f5mm7tagez38ffz).

**Reason:**

A rule's list and the schema or the code that declares the same values are written separately, so either can gain or lose a value unnoticed. Comparing them at every commit keeps the values that the system accepts in line with those that the rule states.

**Example:**

A rule lists the states of a request: `open`, `done` and `cancelled`. The rule's `TextRule.list.jsonSchema` points to `#/properties/state` in `schema/request.schema.json`, and the schema at that place holds `"enum": ["open", "done", "cancelled", "held"]`. `sheriff binding` refuses the list and names `held`, a value of the `enum` that the list does not hold. The most likely mistake is to check only that each value of the list is valid against the schema. All three are, so a state that the schema accepts and the rule does not state would pass.

## new:tools-7-2-own-kinds — The list of a project's own kinds of node

**Title:** The list of a project's own kinds of node

**Text:**

`sheriff binding` accepts the kinds of node that the project's extension of the schema adds in its field `kinds` (§s-xm8rz4uupb73gu5) only where each of the following holds (§s-hhnahzmhahf8jht, §s-cgkkksc7efxhcst):
- taken together, the members of the `TextRule.list` (§s-eferktypcj7njt5) of the rules in the project's own guidelines (§s-u7tw6m8npxmv5tu) that refine the rule on a project's own kinds of node (§s-vsh384ybt4w25a2) include a member for each of those kinds;
- each member of the `TextRule.list` of those rules gives its kind the same `needsCode` as the field `kinds` gives it;
- each member of the `TextRule.list` of those rules names one of those kinds.

`sheriff binding` refuses a commit after which a kind or a member fails one of the conditions above. The refusal names each such kind or member. For a member, it also names the rule that lists the member, by that rule's file, sid and location (§s-kag2m9tzdnduxdx).

A member names a kind by the property that `TextRule.list.property` names (§s-hhnahzmhahf8jht). It gives the kind's `needsCode` by its property `needsCode`. `sheriff binding` compares the kinds with the members only where each member that is an object holds the property that `TextRule.list.property` names, which the check of an object in a list requires (§s-cdachayybfvg4na). `sheriff binding` makes this check regardless of whether the specification is approved or a draft (§s-cgkkksc7efxhcst).

**Reason:**

A project's own kind of node is declared in the extension of the schema, which nobody approves, but listed in a rule, which an owner approves (§s-hhnahzmhahf8jht). Comparing the two keeps the declaration of each kind, including whether its nodes require an implementation in code, in line with what an owner has approved.

**Example:**

The project's extension of the schema adds the kind `procedure` with `needsCode: true`, and the rule that lists the project's own kinds lists `procedure` with `needsCode: false`. `sheriff binding` refuses the commit and names `procedure`. The most likely mistake is to compare only the names of the kinds. The commit would then pass, although the rule says that the nodes of the kind `procedure` require no code and the schema says that they do.

## s-cdachayybfvg4na — An object in a list

**Title:** An object in a list

**Text:**

`sheriff validate` accepts a member of a `TextRule.list` (§s-eferktypcj7njt5) that is an object only where `TextRule.list.property` names a property and the member holds that property (§s-yuu4ccgch68yzxb). It refuses any other such member. The refusal names the node by its file, its sid and its location (§s-kag2m9tzdnduxdx), the member's position in the list and, where the list names one, the property.

`sheriff validate` checks each node of the specification in the files that the repository keeps, including a node in a cell of a `TableRule` (§s-5fewsp22mmdz7y6). It makes this check regardless of whether the specification is approved or a draft (§s-yuu4ccgch68yzxb).

**Reason:**

The value of a member that is an object is the value of the property that `TextRule.list.property` names. `sheriff binding` compares that value with the schema or the symbol to which the list points (§s-5hb9k2e34dgn284), so a member without that property has no value to compare.

**Example:**

A rule lists the roles of a user as objects, and its `TextRule.list.property` is `name`. One member is `{"title": "operator"}`. `sheriff validate` refuses that member and names `name`. The most likely mistake is to take the member's only property as its value.

## proposal:s-ztseyetus7np6br-g3 — What `sheriff reindex` writes

**Title:** What `sheriff reindex` writes

**Text:**

`sheriff reindex` writes into the files of the specification everything that the SpecSheriff tools compute from the specification, the code and the tests:
- a sid for each node that has none, including a node in a cell of a `TableRule` (§s-9spq78kdwsxr759, §s-5fewsp22mmdz7y6);
- the location of each node (§s-kag2m9tzdnduxdx, §s-ygg5kpcxgzq3m7w);
- the links pointing at each node, rebuilt from the links that the nodes declare (§s-bpdqd9v72wg7vsz);
- the list `meta.code` of each node (§s-rwqzepmrt77rv35), naming each file, other than a test file, that holds code bound by a SpecTag (§s-8xw4mgvpexyvw5q) naming the node, including a file bound as a whole (§s-5qdjyf6t898rsd4, §s-trwczfskj5zmuft);
- the list `meta.tests` of each node, naming each test that declares a SpecTag naming the node (§s-zrsc6asgmhv8tnc), by its file and its name;
- the approval status of each section, derived from every node under it other than a section, including the nodes in the cells of a `TableRule` (§s-9kfdycuq34beqvs);
- where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), the approval status of the header of each domain, derived from every node of the domain other than its sections and the header itself, including the nodes in the cells of a `TableRule` (§s-yccuyqbypzzx2gu);
- where the project has chosen the Domains extension, the index of the sections in the header of each domain that has sections (§s-2r59txnms5serdr);
- where the project has chosen the RecordType extension (§s-hzuzn8hbq6q9q4s), the values gathered for each field that has an `enum` whose values come from elsewhere in the specification, in the field's `x-enumSource.gathered` (§s-ju5vcanbjph7mgh).

In the files that the repository keeps, an approved node whose approval status is set by approvals stays approved while an approval of its current wording stands (§s-v4qus7raqnwzneb). `sheriff reindex` makes each remaining such node a draft and names it.

`sheriff reindex` writes only the files that the repository keeps. It writes a file only when the text it would write differs from the file's text. It names each file that it writes.

`sheriff reindex` writes each file as `JSON.stringify` writes the file's data with an indent of two spaces, with a line feed at the end, with each node's `location` and `sid` first, and with all the other keys in the order in which the file already has them.

**Reason:**

The SpecSheriff tools themselves write whatever they can compute from the specification, the code and the tests, so that it always agrees with its sources and nobody spends effort writing it. Because it is rebuilt in full on every run, it is correct regardless of what an earlier run left behind (§s-jsqxdx47wkkj7gp).

## proposal:s-9j2mmnuuwmx5ksn — Which edits change a test or code

**Title:** Which edits change a test or code

**Text:**

A change to a SpecTag (§s-8xw4mgvpexyvw5q) is considered a change to the test or the code that the SpecTag binds.

As long as the SpecTag stays the same, none of the following changes the test or the code:
- renaming a test;
- adding, removing or rewording a comment;
- changing whitespace that, in the language of its file, does not affect what the code does.

In a file whose comments and whitespace the checks (§s-jau82aq9juv9zzh) cannot tell apart from its code, every edit changes the code.

**Reason:**

Tests and code that change are checked again against the rules their SpecTags name. This rule draws the line between an edit to a test or code that can affect that check and one that cannot.

**Example:**

A commit re-indents a block of TypeScript code, adds a comment above it and changes nothing else, so the commit changes no code. By contrast, a commit that indents a key of a YAML file further, which nests the key under the key above it, changes the code.

## proposal:s-hhnahzmhahf8jht — How a project's own kind of node is declared and checked

**Title:** How a project's own kind of node is declared and checked

**Text:**

A project adds a new kind of node to its JSON Schema, in the field `kinds` (§s-xm8rz4uupb73gu5).
Through its `schema`, a new kind of node may add fields of its own, beyond those the schema of the SpecSheriff guidelines sets for every node.
A kind's `needsCode` says whether its nodes require an implementation in code.

A rule in the project's own guidelines refines the rule on a project's own kinds of node (§s-vsh384ybt4w25a2). That rule's `TextRule.list.members` (§s-eferktypcj7njt5) holds each added kind of node with its `needsCode`. That rule's `TextRule.list.property` names the key holding a kind's name.

At each commit, a check verifies that the JSON Schema and the project's own guidelines agree on the name and `needsCode` of each new kind of node (§s-jau82aq9juv9zzh).

**Reason:**

Only the project knows whether the nodes of a kind it adds are carried out by code, by tools or by people. Nobody approves an extension of the schema, so this rule subjects each such kind, and whether its nodes require an implementation in code, to an owner's approval.

**Example:**

A project adds the kind `procedure` for the steps that an operator carries out by hand. Its extension of the schema declares `"procedure": {"needsCode": false, "schema": {}}` in the field `kinds`. The rule of the project's own guidelines that refines the rule on a project's own kinds of node has `TextRule.list.property` set to `name`, and its `TextRule.list.members` holds `{"name": "procedure", "needsCode": false}`. The most likely mistake is to declare the kind only in the extension of the schema, which nobody approves.

## proposal:new-tools-1-settings-g3 — Project-wide settings

**Title:** Project-wide settings

**Text:**

`sheriff.config.json` (§s-zefk589ykh37b8u) holds the project-wide settings of the SpecSheriff tools:
- the glob patterns that match the files holding the system's code (§s-hheus6f395ynqvc) and those holding its tests;
- for each check and each generator that the project's own guidelines add (§s-2fau85dfyyeq66m, §s-km4x4s26kv7pjze): the rule that lists it, its name in that rule, the command that runs it, and the glob patterns that match the files holding its code and its tests (§s-utf4mbt7ref8g9c);
- the entries that set the specification's approval status (§s-qzthyh7yqvfhsa2) and its `strict` flag (§s-q3pfzyaxvpr2zj2), and those that record which extensions of the guidelines (§s-mbmnsnxenmavu3z) the project has chosen (§s-9ttvcwpqkehm58g);
- the command that runs the tests of the system's code and of the project's own checks and generators (§s-477gtdrkw34dzxw);
- the project-wide settings of the reviewer (§s-xr5xxa9cxf2mq5u).

The SpecSheriff tools refuse a `sheriff.config.json` that is not valid JSON or does not conform to its schema (§s-zefk589ykh37b8u).

To find the SpecTags (§s-8xw4mgvpexyvw5q) that bind code and tests to their rules, the SpecSheriff tools read only the following files:
- the files that match the glob patterns for code or for tests in `sheriff.config.json`;
- the files into which `sheriff types` writes the types (§s-pvzms7d8kxb8dk2);
- the bindings file (§s-trwczfskj5zmuft).

A file that matches both a pattern for code and a pattern for tests is read as a test.

**Reason:**

A setting kept in the repository is the same in every clone, so the SpecSheriff tools behave alike for everyone who works on the project.

## proposal:s-gb8s9657a65hqmv-g3 — What `sheriff reindex` changes in what an earlier release wrote

**Title:** What `sheriff reindex` changes in what an earlier release wrote

**Text:**

`sheriff reindex` rewrites whatever an earlier release of the SpecSheriff tools wrote or read differently from the release that `sheriff reindex` belongs to. It does so after it has merged the duplicate keys (§s-w5wg69pvvhedsws), and before it validates the files. In every file of the specification and of its archive, it makes the following changes:
- a node's key `id` becomes `location`;
- a node's key `rationale` becomes `reason`;
- the kinds of node `record` and `recordType` become `RecordType`;
- the kind of node `rule` becomes `TextRule`;
- the kind of node `domain` becomes `header`;
- a node's status `""` becomes `draft`;
- a node's status `checked` becomes `approved`;
- a node's key `owner`, which holds an email address, becomes `owners`, which holds a list that contains that email address;
- a RecordType's `fields` and `unknown` become its `schema` (§s-6eb92ddch7shuvu), as follows:
  - each field becomes a property whose schema is the one given for the field's neutral type (§s-4npdup7mjkva69y);
  - the field's `text` becomes the property's `description`;
  - each field that the RecordType marks as required is listed in the schema's `required`;
  - a field that is required only "where it holds a value" becomes an optional property;
  - `unknown: "refused"` becomes `additionalProperties: false`;
- the source of a field's values becomes the field's `x-enumSource` (§s-xfu2gpzddjnmgks);
- `TextRule.list.declaredIn` is removed where it points to the field `kinds` of the project's extension of the schema (§s-xm8rz4uupb73gu5);
- `TextRule.list.declaredIn` becomes `TextRule.list.jsonSchema` where it points to any other place in a JSON Schema;
- `TextRule.list.declaredIn` becomes `TextRule.list.valueList` where it names a declaration in code;
- a link of the type `supersedes` is removed (§s-sn6au3vcr9uy5pm);
- a node of the archive loses its sid and every link that points to it (§s-f2b5zvc565s242f, §s-bpdqd9v72wg7vsz).

A renamed key keeps its place among the node's keys. A kind of node is also renamed where a field's values are the sids of that kind's nodes, and where the project's extension of the schema declares `fields` for that kind.

A bare sid is a word that has the form of a sid and occurs in one of these places:
- it opens a test's name, followed by a space or by the end of the name;
- it is the only argument of the test's mark.

`sheriff reindex` also makes the following changes:
- `specs/_confirmations.jsonl` becomes `specs/_approvals.jsonl`;
- the key `owner` in each line of `specs/_confirmations.jsonl` becomes `by`;
- where `specs/_approvals.jsonl` already exists, the lines of `specs/_confirmations.jsonl`, with that key renamed, are appended to it, and `specs/_confirmations.jsonl` is removed;
- until `sheriff.config.json` holds an entry that sets the specification's approval status, an approved rule of `project.json` that refines the rule on that status (§s-qzthyh7yqvfhsa2) is replaced by an entry that approves the specification;
- that entry names the owner who last approved that rule;
- that rule is moved to the archive (§s-f2b5zvc565s242f), with the reason "Replaced by the entry in `sheriff.config.json` that records the specification's approval status";
- the key `writesSpecSheriffGuidelines` is removed from `sheriff.config.json` (§s-zefk589ykh37b8u) before the SpecSheriff tools validate that file;
- in each file that `sheriff.config.json` names as tests of the system's code or of a project's own check or generator, `@spec ` is inserted before each bare sid.

`sheriff reindex` leaves unchanged a RecordType that holds a field of type `variant`, a field whose values come from the source `domains`, or a field whose own list of values is empty, and names that RecordType and each such field.

Where a node of the specification is of a kind, or holds a link of a type, that an extension of the guidelines adds, and the project has yet to choose that extension (§s-9ttvcwpqkehm58g), `sheriff reindex` names that extension.

A renamed key and a renamed kind of node leave a node's fingerprint unchanged (§s-v4qus7raqnwzneb). `sheriff reindex` names each file that it changes in this way, including the files of the specification.

**Reason:**

Each file and each test of a project is written in the form of the release of the SpecSheriff tools that last wrote or read it. A release that writes or reads them differently rewrites them, so that nobody has to rewrite a project by hand and no approval is lost because of a rename.

## proposal:row-10-1-35a — row 10.1.35a of the main table of checks

Its "On failure" cell reads: refused.

**Text:**

Each kind of node that the project's extension of the schema (§s-xm8rz4uupb73gu5) adds is listed, with the `needsCode` that the extension gives it, in the rules of the project's own guidelines that refine the rule on a project's own kinds of node (§s-vsh384ybt4w25a2). Each kind that those rules list is one that the extension adds

## proposal:s-kgbzk2ph9e6jfb4 — How code is bound to its rules

**Title:** How code is bound to its rules

**Text:**

The system's code (§s-hheus6f395ynqvc) other than tests is bound by SpecTags (§s-8xw4mgvpexyvw5q) to the rules it implements. Code that implements no rule has a SpecTag that says so.

A symbol is a named unit of code, such as a function, a class or a member of one, a type, a constant or a component. Whoever writes code binds it to its rules in one of the following ways:
- by a SpecTag directly before each symbol, if the checks (§s-jau82aq9juv9zzh) can identify the file's symbols;
- by SpecTags in a comment placed as near the start of the file as its format allows, if the checks cannot identify the file's symbols;
- by an entry in the bindings file at the root of the repository, for a file whose format allows no comments.

A SpecTag before a symbol binds that symbol and every symbol nested in it. SpecTags at the start of a file, and an entry in the bindings file, bind the whole file. A change anywhere in a file bound as a whole is a change to the code its SpecTags bind. The only exception is an edit that changes no code (§s-9j2mmnuuwmx5ksn): an edit to a comment that leaves its SpecTags as they are, or to whitespace that does not affect what the code does.

The formats that allow no comments are JSON and those that a project's own guidelines (§s-u7tw6m8npxmv5tu) name as allowing none.

Each entry in the bindings file names an existing file and holds that file's SpecTags.

**Reason:**

Binding each file of the system's code as precisely as its format allows lets the checks immediately find code that has lost its link to the specification.

**Example 1:**

A stylesheet whose symbols the checks cannot identify has its SpecTag in a comment at its start.

**Example 2:**

A JSON file that holds the texts a user interface shows has an entry in the bindings file. The entry names the JSON file and holds its SpecTags.

## proposal:s-m4h279nbaqkpa3t — What the independent reviewer judges

**Title:** What the independent reviewer judges

**Text:**

In the review of a commit, an independent reviewer judges the following (§s-nyh9yk22ba6g77q):
- for every commit that changes the system's code (§s-hheus6f395ynqvc) outside the files generated from the specification (§s-qyjw8xez6t6adc3): whether that code does what the rules named in the commit say and does nothing that they do not say;
- for every commit that adds or changes a comment in the code or in a test outside the files generated from the specification: whether each such comment is consistent with the code that it describes and with the rules that the code implements or that the test is written from;
- for a commit whose message states that a rule's implementation needs no change: whether that statement is true;
- for a commit in which a node of the technical appendix (§s-qmmzf9nksfsa3qp) is approved, if the node has an `implements` link (§s-sn6au3vcr9uy5pm) to a rule of the base specification (§s-5x737t9nee4zgaa): whether the node refines the rules of the base specification that it implements and contradicts no rule of the base specification.

**Reason:**

No script can decide whether code does only what its rules say, whether a comment agrees with the code and its rules, whether a rule's implementation really needs no change, or whether a node of the technical appendix agrees with the base specification. So these judgements are made by an independent reviewer. Code generated from the specification only restates the specification, so the reviewer has nothing to judge there.

## proposal:s-nyh9yk22ba6g77q-g3 — What the reviewer is given

**Title:** What the reviewer is given

**Text:**

The SpecSheriff tools give the independent reviewer (§s-m4h279nbaqkpa3t) of a commit the following:
- the commit's message;
- the commit's change, excluding the files generated from the specification;
- the wording of each rule or term (§s-khqsmy6mhejkrhg) that the commit's message names;
- the wording of each rule that a SpecTag (§s-8xw4mgvpexyvw5q) binds to code or a test that the commit adds or changes, or that is described by a comment that the commit adds or changes;
- for each rule whose implementation, according to the commit's message, needs no change: the rule's wording as it was before the commit and as it is after it, and the tests and the code bound to the rule, directly or through a chain of `implements` links (§s-sn6au3vcr9uy5pm), as they are after it;
- for each node of the technical appendix (§s-qmmzf9nksfsa3qp) that is approved in the commit and has an `implements` link to a rule of the base specification (§s-5x737t9nee4zgaa):
  - the node's wording;
  - the wording of each rule of the base specification that the node implements, that has a link to or from such a rule, or that is in the same top-level section of the base specification as such a rule.

In this rule, a node's wording is its title, its text, its reason, its examples and the fields its kind adds, as an approval covers them (§s-5ah25f6gy99panq).

The SpecSheriff tools give the reviewer nothing from the session in which the change was made. They tell the reviewer that each file left out of the change is generated from the specification. The reviewer treats what a rule requires of generated code as implemented by that code.

**Reason:**

The reviewer makes the judgements that no deterministic check can make: whether code does only what its rules say, whether a comment agrees with the code and its rules, whether a rule's implementation really needs no change, and whether an approved node of the technical appendix agrees with the base specification. It can judge only from what it is shown. Shown what each judgement needs, and nothing of what the author of the change meant, it judges by the rules alone.

## proposal:row-10-1-43b — row 10.1.43b of the main table of checks

Its "On failure" cell reads: reported as a warning, naming the file and the line of the comment.

**Text:**

Each comment that a commit adds or changes in the code or in a test outside the files generated from the specification (§s-qyjw8xez6t6adc3) is consistent with the code that it describes and with the rules that the code implements or that the test is written from

## proposal:s-vp24dqydygztqbt — The review of a commit

**Title:** The review of a commit

**Text:**

`sheriff review` refuses a commit where the verdict of the independent reviewer (§s-m4h279nbaqkpa3t) refuses it. The refusal lists each finding of the verdict (§s-68ds99w8wd67aae). Where the commit leaves the specification a draft, `sheriff review` disregards each finding on a statement that a rule's implementation needs no change (§s-kgqxg4gunzynwsv). In that case, it refuses the commit only where the verdict lists a finding on code or on a node that the commit approves.

`sheriff review` asks for a verdict only on a commit for which the reviewer must make at least one of the following judgements (§s-epaw9sgyaajzn8g):
- the judgement on the code that the commit adds or changes (§s-rd9nftptjuz6bwv);
- the judgement on each comment that the commit adds or changes (§s-7vpsdsy8dpqdy6r);
- the judgement on each statement in the commit's message that a rule's implementation needs no change (§s-kgqxg4gunzynwsv);
- the judgement on each node of the technical appendix (§s-tj38pvm38nepaf5) that the commit approves and that implements a rule of the base specification (§s-5x737t9nee4zgaa, §s-4bwa4zepd4nwcv8).

Where `sheriff review` asks for a verdict, it gives the reviewer everything that the rule on what the reviewer is given lists for the commit (§s-nyh9yk22ba6g77q). The files generated from the specification, which `sheriff review` leaves out of the commit's change, are the files that `sheriff types` writes (§s-a8fn72xa782wvbk). `sheriff review` tells the reviewer which of those files the commit changes.

**Reason:**

Each run of the reviewer is paid for by the user who commits (§s-tnz9zgqx8c629a7), so `sheriff review` runs the reviewer only on a commit that needs one of the reviewer's judgements.

**Example:**

A commit changes only the wording of a draft rule. It changes no code and no comment in the code, its message contains no statement that a rule's implementation needs no change, and it approves no node. So `sheriff review` does not run the reviewer, and the commit passes the review. The most likely mistake is to run the reviewer on every commit, which makes the user who commits pay for a run that has nothing to judge.

## proposal:new-tools-10-verdict — The reviewer's verdict

**Title:** The reviewer's verdict

**Text:**

`sheriff review` refuses a commit for which the reviewer must make a judgement other than the one on comments (§s-vp24dqydygztqbt) unless the runner (§s-xr5xxa9cxf2mq5u) gives a verdict that `sheriff review` can read (§s-94k7b6r5kf65udf). Where the commit needs only the judgement on comments (§s-7vpsdsy8dpqdy6r), `sheriff review` instead issues a warning that says why it could not read a verdict.

`sheriff review` gives the runner's CLI the schema of the verdict. The runner's CLI answers with a JSON object that conforms to that schema. The verdict passes or refuses the commit. It lists its findings. Each finding names the sids of the nodes that it concerns and the problem. A finding that concerns code also names the file and, where the problem lies at a line, that line. Each finding also names the judgement that it belongs to (§s-vp24dqydygztqbt).

`sheriff review` reads a verdict only from an answer that conforms to the schema of the verdict and that does one of the following:
- passes the commit and lists only findings that belong to the judgement on comments (§s-7vpsdsy8dpqdy6r), if it lists any;
- refuses the commit and lists at least one finding that belongs to a judgement other than the one on comments.

**Reason:**

A verdict whose meaning `sheriff review` had to guess, such as a verdict that passes the commit and lists a finding on code, would let `sheriff review` decide the outcome of the commit in place of the independent reviewer (§s-m4h279nbaqkpa3t).

**Example:**

The runner answers with a verdict that passes the commit and lists one finding on code. That answer is not a verdict that `sheriff review` can read, so `sheriff review` refuses the commit. The most likely mistake is to pass the commit and drop the finding, which means deciding for the reviewer what it meant.

## new:tools-7-3-review-comments — The judgement on a comment that a commit adds or changes

**Title:** The judgement on a comment that a commit adds or changes

**Text:**

`sheriff review` reports each finding of the independent reviewer (§s-m4h279nbaqkpa3t) on a comment that a commit adds or changes (§s-td4e3rdga6azav9) only as a warning. Each such finding names the file, the line and the problem, and also each rule that the comment contradicts.

The reviewer judges the comments in the system's code (§s-hheus6f395ynqvc) outside the files generated from the specification (§s-qyjw8xez6t6adc3). In a file whose syntax trees the SpecSheriff tools build (§s-u6mj5yv8ngnz79v), the comments are the parts of the file that the SpecSheriff tools treat as comments and leave out of the trees. In any other file, the reviewer itself tells the comments apart from the code.

A commit adds or changes a comment where, with whitespace left out, the comment's text differs from the text of every comment in the same file in the commit's parent (§s-2x58az67bm6cxq2). The reviewer judges the text of a comment, except its SpecTags (§s-8xw4mgvpexyvw5q), since a change to a SpecTag is a change to the code (§s-9j2mmnuuwmx5ksn).

The reviewer judges comments on every commit that adds or changes a comment, including a commit that changes no code. `sheriff review` gives the reviewer the code that each such comment describes, in addition to what it gives the reviewer in every review (§s-vp24dqydygztqbt). That code is the following, in full, as the commit leaves it, with its file, its lines and the SpecTags that bind it:
- for a comment in a file bound as a whole (§s-kgbzk2ph9e6jfb4): that file;
- for a comment in a symbol (§s-kgbzk2ph9e6jfb4) or a test, or directly above one (§s-33fw3ga4ctd94dq): the innermost such symbol or test;
- for any other comment: the symbol or the test that follows it, or the whole file where no symbol or test follows it.

The reviewer finds a problem with a comment only where either of the following holds:
- the comment states something that the code it describes does not do;
- the comment contradicts a rule that a SpecTag on that code names.

**Reason:**

A comment that no longer matches its code misleads whoever reads the code next. Only a reader of both the comment and the code can see the mismatch. A comment does not change what the system does, so a problem with a comment warrants a warning, but not a refusal of the commit.

**Example:**

A commit changes only the comment above `roundPrice`, which now says that the function rounds halves up, while the function rounds them to the nearest even number. `sheriff review` reports the reviewer's finding as a warning and lets the commit pass. The most likely mistake is to refuse the commit, as `sheriff review` does for a defect in the code.

## proposal:new-spec-1-6-checks — What the checks enforce

**Title:** What the checks enforce

**Text:**

The following are checked mechanically:
- that the specification conforms to the rules of the guidelines that the main table of checks (§s-jau82aq9juv9zzh), or the table of checks of an extension (§s-gpzs5fcxvp6jkrp), lists;
- that the specification and the code still agree with each other.

Every check except the review (§s-m4h279nbaqkpa3t) is deterministic.

A failed check refuses the change, unless the table that lists the check says otherwise (§s-jau82aq9juv9zzh).

**Reason:**

Every check but the review is binary, so a refusal requires nobody's judgement. A check that sometimes refuses for a reason nobody can reproduce is bypassed at the first opportunity and never trusted again.

## proposal:new-spec-1-6-tests — When the tests must pass

**Title:** When the tests must pass

**Text:**

As long as the specification has the status `approved`, the tests of the system's code (§s-hheus6f395ynqvc) and of a project's own checks (§s-2fau85dfyyeq66m) and generators (§s-km4x4s26kv7pjze) must pass before a change reaches the project's shared branch. The project's own guidelines (§s-u7tw6m8npxmv5tu) name where the tests run, such as on every push or on a shared server before a merge.

**Reason:**

The tests are not run on a commit, since a test suite takes longer than anyone should wait for a commit. A change not yet shared misleads nobody, so its tests can wait until it is shared. Where they run is the project's choice, since some suites take hours or need what a developer's machine lacks. While the specification is a draft, the work is focused on the specification itself, so no test has to pass.

**Example:**

A project whose tests need a database states in its own guidelines that the tests run on a shared server before a merge. A push from a developer's machine then runs no tests, and the merge waits until the tests pass.

## proposal:row-10-1-43 — row 10.1.43 of the main table of checks

Its "On failure" cell reads: refused, naming the rule and the line.

**Text:**

The system's code (§s-hheus6f395ynqvc) that a commit changes outside the files generated from the specification (§s-qyjw8xez6t6adc3) does what the rules named in the commit say, and nothing they do not

## proposal:s-94k7b6r5kf65udf — A commit whose review cannot be carried out is refused

**Title:** A commit whose review cannot be carried out is refused

**Text:**

The SpecSheriff tools refuse a commit for which the reviewer must make at least one judgement other than the one on comments (§s-m4h279nbaqkpa3t) unless the reviewer gives an answer that the tools can read. The refusal says why the review could not be carried out. Where the commit needs only the judgement on comments, the tools issue a warning that says why the review could not be carried out.

**Reason:**

A review that lets a commit through whenever it could not be carried out is a review nobody can rely on.

**Example 1:**

No reviewer is installed.

**Example 2:**

The reviewer's run does not end within its time limit.

**Example 3:**

The run ends with an error.

**Example 4:**

The answer passes the commit but reports a finding on code.

## proposal:new-tools-7-3-review-code — The judgement on the code that a commit changes

**Title:** The judgement on the code that a commit changes

**Text:**

`sheriff review` refuses a commit where the independent reviewer (§s-m4h279nbaqkpa3t) refuses it for a defect in the code that the commit adds or changes (§s-zn4vrdpnv9bch62). Each finding names the rule that it concerns, the file and the line.

The reviewer judges the changed code on every commit that adds or changes the system's code (§s-hheus6f395ynqvc), including its tests, outside the files generated from the specification (§s-qyjw8xez6t6adc3). Besides what `sheriff review` gives the reviewer in every review (§s-vp24dqydygztqbt), it gives the reviewer the changed code outside the files generated from the specification. That code consists of the following, each in full, as the commit leaves it, with its file, its lines and the SpecTags (§s-8xw4mgvpexyvw5q) that bind it:
- each symbol (§s-kgbzk2ph9e6jfb4) whose code the commit adds or changes (§s-2x58az67bm6cxq2);
- each file that the commit adds or changes and that is bound as a whole (§s-5qdjyf6t898rsd4, §s-trwczfskj5zmuft);
- each test that the commit adds or changes.

The reviewer refuses the commit where any of the following holds:
- a changed symbol or file whose SpecTags name rules does something that none of those rules states;
- a changed test checks something that the rule its SpecTag names does not state;
- the changed code other than tests leaves out something required by a rule that a SpecTag on that code names, or that the commit's message names outside an `Implementation-Needs-No-Change` trailer (§s-7gab4ptjt2khfr5);
- a changed symbol or file carries a SpecTag naming a rule that it does not implement;
- a changed symbol or file carries `@spec none` (§s-5z5gnu7pahr82xp), but implements the system's logic (§s-2jcmb9xe9d64t2t);
- a changed symbol or file carries `@spec none` whose text does not say what the technology that the system is built with requires of it (§s-5z5gnu7pahr82xp).

A finding on code that carries `@spec none` names the rule on how code is bound to its rules (§s-kgbzk2ph9e6jfb4) as the rule that it concerns.

**Reason:**

A SpecTag shows only which rule a piece of code is meant to implement. Whether the code does only what that rule says, including in the unchanged lines around a change, can be judged only by reading it.

**Example:**

A commit changes one line of the function `close`, whose SpecTag names a rule saying that an account can be closed only when its balance is zero. An unchanged line of the same function also sends the account holder an email. The reviewer is given the whole function and finds that no rule its SpecTag names says anything about the email. `sheriff review` refuses the commit, naming the rule and that line. The most likely mistake is to give the reviewer only the changed line, so that the email goes unnoticed.
