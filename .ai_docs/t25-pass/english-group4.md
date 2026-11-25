# T25, group 4: the English of every node

This file holds the final English of every node of group 4 of stage 2 of T25, as `tools-drafts.json` holds it after propose-group4.mjs: the drafts of items 33 to 40 of the appendix of the tools, and the proposal for the agreed "What the SpecSheriff tools read in the project's own guidelines".
Each node is given under its key in `tools-drafts.json`: its title, its text, its reason and its examples.
propose-group4.mjs writes this file; edit the script, not this file.

## s-7pk89t8z6wymmj9 — How a project's own check is run

**Title:** How a project's own check is run

**Text:**

Where a check that a project's own guidelines add (§s-2fau85dfyyeq66m) fails, `sheriff validate` refuses the change. It only reports the failure where the rule that lists the check says so (§s-ujm7nfxkk9j3464). The refusal or the report names the check and shows what the check printed on its standard output and its standard error. Where the check printed nothing, it shows the check's exit status.

`sheriff validate` runs each such check by the command that `sheriff.config.json` names for it (§s-zefk589ykh37b8u). The check runs in the directory in which `sheriff validate` runs, which at a commit holds what the commit contains (§s-477gtdrkw34dzxw). On its standard input, the check receives the model of the specification in the form that `sheriff json` prints (§s-w6gybeqn2ttydqx). A check passes only where its process ends with the exit status zero.

The rule that `sheriff.config.json` names for a check lists the check by a member of its `TextRule.list` (§s-eferktypcj7njt5) whose value (§s-5hb9k2e34dgn284) is the check's name. The check's failure is only reported where that member is an object whose property `onFailure` is `reported`. Where the rule lists no member whose value is the check's name, `sheriff validate` refuses the change, naming the check and the rule.

`sheriff validate` runs the project's own checks after it has validated the files against the schema of the specification (§s-xzcw3hv4hmxz7h7) and before every other check that it makes (§s-pcnyfp7gev7syax). It makes those other checks whatever the project's own checks find.

`sheriff validate` refuses the change where a check adds, changes or removes a file in the directory in which it runs, other than a file that git ignores. The refusal names the check and each such file (§s-pcnyfp7gev7syax).

Given the option `--strict`, `sheriff validate` hands each of the project's own checks a model in which the specification is approved and its `strict` flag is on (§s-qzthyh7yqvfhsa2, §s-q3pfzyaxvpr2zj2). It does so whatever the entries for the approval status and the flag hold. Its other checks are the same with or without the option.

`sheriff validate` runs the project's own checks regardless of whether the specification is approved or a draft (§s-ujm7nfxkk9j3464).

**Reason:**

Run by `sheriff validate`, a project's own check runs wherever the checks of the SpecSheriff guidelines run and reads the same files. So it binds every participant, rather than depending on whoever remembers to run it (§s-2fau85dfyyeq66m).

**Example:**

The rule that lists the project's own checks has `name` as its `TextRule.list.property`, and one of its members is `{"name": "no-secrets", "onFailure": "reported"}`. The check `no-secrets` finds a token in a file, prints the file's path and exits with the status 1. `sheriff validate` reports the failure, showing the path, and the commit passes. The most likely mistake is to refuse the commit because the check's exit status is not zero.

## s-nh8b2hjvzasdxmd — A location outside the specification

**Title:** A location outside the specification

**Text:**

`sheriff binding` refuses each location of a node (§s-kag2m9tzdnduxdx) written in a file that the repository keeps outside `specs/`, the folder that holds the files of the specification (§s-zefk589ykh37b8u, §s-u5hfbygfyqv4wmf). The refusal names the file, the line and the location, and says that a node is cited by its sid (§s-9spq78kdwsxr759).

`sheriff binding` takes as a location each of the following, whatever the case of its letters:
- text in the form of a numbered node's location (§s-ygg5kpcxgzq3m7w), such as `base/3.2` or `_guidelines/spec/1.3.4`, whether or not a node is at that location now;
- a location of a node of the model of the specification (§s-w6gybeqn2ttydqx) where the location holds a slash and ends in no number, such as `contracts/request`, the location of a term (§s-khqsmy6mhejkrhg).

Text has the form of a numbered node's location where it consists of one of the following, a slash and one or more numbers separated by dots:
- the name of a folder under `specs/` that holds files of the base specification (§s-5x737t9nee4zgaa);
- the location of the first top-level node of a file of the guidelines, of the appendix of the tools (§s-a4rbry4hsu34hy8) or of the technical appendix (§s-tj38pvm38nepaf5).

Such text counts only on its own, not as part of a longer path or name: in `specs/tech/stack.json`, `tech/stack` is part of a path and is no location.

`sheriff binding` leaves out each file that the project's own guidelines list as a fixture of the tests of a check that reads citations or locations (§s-6hha5en226aj8hu).

`sheriff binding` makes this check regardless of whether the specification is approved or a draft (§s-u5hfbygfyqv4wmf).

**Reason:**

A node's location changes whenever the specification is reordered, while its sid never changes (§s-9spq78kdwsxr759). Outside the specification no link backs a location, so a location left in a file would point at another node, or at none, without any check noticing.

**Example:**

A guide in `docs/` says “see `base/3.2`”. `sheriff binding` refuses that line and names `base/3.2`, though no node is at that location now. The most likely mistake is to refuse only a location at which a node exists, which lets a location left behind by a removed node pass.

## s-m8nmfsxkcfu7cjp — A citation outside the specification

**Title:** A citation outside the specification

**Text:**

`sheriff citations` refuses each of the following in the files that it reads (§s-e84nggntkrcyumq):
- a word that has the form of a sid, `s-` followed by 15 characters from `23456789abcdefghjkmnpqrstuvwxyz` (§s-eferktypcj7njt5), where that sid names no node of the model of the specification (§s-w6gybeqn2ttydqx);
- a `§` followed directly by a digit, such as `§5.8`, which cites a node by a number instead of its sid (§s-9spq78kdwsxr759).

Each refusal names the file, the line and the text refused.

`sheriff citations` reads the following files:
- the system's code (§s-hheus6f395ynqvc) and its tests: the files that the glob patterns for code or for tests in `sheriff.config.json` match (§s-zefk589ykh37b8u), and the files that `sheriff types` writes (§s-a8fn72xa782wvbk);
- the code and the tests of each of the project's own checks and generators (§s-2fau85dfyyeq66m, §s-km4x4s26kv7pjze): the files that the glob patterns given for them in `sheriff.config.json` match;
- the documentation: each Markdown file that the repository keeps outside `specs/` (§s-zefk589ykh37b8u).

In the files that it reads, `sheriff citations` checks each word that has the form of a sid, except the sid of a SpecTag `@spec <sid>` (§s-5z5gnu7pahr82xp) in the system's code or its tests. The check of a SpecTag that names no node checks the sid of such a SpecTag (§s-36x8amvunmv2kp5).

`sheriff citations` leaves out each file that the project's own guidelines list as a fixture of the tests of a check that reads citations or locations (§s-6hha5en226aj8hu).

`sheriff citations` makes this check regardless of whether the specification is approved or a draft (§s-e84nggntkrcyumq).

**Reason:**

Outside the specification no link backs a citation (§s-9spq78kdwsxr759). So a cited sid that names no node, or a number in place of a sid, would mislead every reader, and no other check would notice it.

**Example:**

The guide `docs/setup.md` cites `§s-…`, the sid of a rule that a later commit removes. That commit changes no file outside `specs/`, and `sheriff citations` refuses it, naming the guide, the line and the sid. The most likely mistake is to read only the files that the commit changes, which lets the citation pass until someone edits the guide.

## s-dbk2vyeg8z5jxna — Generated copies against the nodes

**Title:** Generated copies against the nodes

**Text:**

`sheriff binding` refuses each file that `sheriff types` writes (§s-a8fn72xa782wvbk) where the file's text in the repository differs from what `sheriff types` would write, line endings aside (§s-dwxjxb7rw4w5yn3). It also refuses each such file that the repository lacks. Each refusal names the file and says that `sheriff types` writes it anew.

`sheriff binding` generates in memory, from the approved wordings of the nodes (§s-qyjw8xez6t6adc3), the files that `sheriff types` would write, and writes none of them.

`sheriff binding` also refuses each of the following, which keeps `sheriff types` from writing any file (§s-a8fn72xa782wvbk):
- a file in the list of the files for the types and the RuntimeChecks (§s-e877bnfa559tvk9, §s-pvzms7d8kxb8dk2) whose name ends in none of `.ts`, `.py` and `.json`;
- a file in that list whose path leads outside the repository;
- a second rule in the section of the technical appendix (§s-tj38pvm38nepaf5) for the stack that lists such files;
- a name that cannot be generated (§s-suv42g8r3ra2h6b);
- a path to which `sheriff types` would write different texts, such as a path that two of the project's own generators (§s-km4x4s26kv7pjze) print with different content.

The refusal names the rule, the node or the path concerned.

`sheriff binding` makes this check regardless of whether the specification is approved or a draft (§s-dwxjxb7rw4w5yn3).

**Reason:**

A generated file kept in the repository is part of the system's code. A copy edited by hand or left behind its nodes would implement what no owner has approved (§s-kh8qcd5kxgh9z3j, §s-qyjw8xez6t6adc3).

**Example:**

A RecordType is reworded and becomes a draft, and the types generated from it stay as its last approved wording produces them. A commit edits `src/types.ts` by hand to match the new wording. `sheriff binding` refuses `src/types.ts`, since its text differs from what the last approved wording produces. The most likely mistake is to generate the types from the draft wording, which lets the edited file pass.

## s-txbwsthdqhvyzd2 — An approved rule whose tests or code lag behind it

**Title:** An approved rule whose tests or code lag behind it

**Text:**

`sheriff commit-message` refuses a commit after which the tests or the code of an approved rule lag behind that rule (§s-ddd2e96uke4y83j). The commit passes where its message states that the rule's implementation needs no change (§s-7gab4ptjt2khfr5). The refusal names the rule by its file, its sid and its location (§s-kag2m9tzdnduxdx). It says whether the rule's tests, its code or both lag, and names the trailer by which the commit message can make that statement.

The tests of an approved rule lag behind it where all of the following hold:
- the commit changes the rule's approved wording;
- a test of the system's code (§s-hheus6f395ynqvc) is bound to the rule before the commit (§s-zrsc6asgmhv8tnc);
- the commit adds, changes or removes no test that is bound to the rule before or after the commit (§s-2x58az67bm6cxq2).

The code of an approved rule lags behind it where all of the following hold:
- the commit changes the rule's approved wording, or adds, changes or removes a test that is bound to the rule before or after the commit;
- code of the system other than tests is bound to the rule before the commit (§s-kgbzk2ph9e6jfb4);
- the commit adds, changes or removes no such code that is bound to the rule before or after the commit.

Code or a test is bound to a rule before the commit where it is bound in the commit's parent. It is bound after the commit where it is bound as the commit leaves the code and the tests. For a merge commit, the parent is its first parent.

A commit changes the approved wording of a rule where both of the following hold:
- the rule is approved as the commit leaves it;
- its wording then differs from its last approved wording in the commit's parent (§s-a8fn72xa782wvbk).

For each approved rule, `sheriff commit-message` compares the fingerprint of the rule's wording as the commit leaves it with the fingerprint that the rule's last approval in the commit's parent records (§s-v4qus7raqnwzneb). It reads the approvals of the commit's parent in the form to which `sheriff reindex` would rewrite them (§s-gb8s9657a65hqmv).

`sheriff commit-message` checks each approved rule in the files that the repository keeps, including a node in a cell of a `TableRule` (§s-5fewsp22mmdz7y6). A rule here is a node of one of the kinds that the node on the form of a SpecTag lists (§s-5z5gnu7pahr82xp).

`sheriff commit-message` makes this check only where the commit leaves the specification approved (§s-qzthyh7yqvfhsa2, §s-ddd2e96uke4y83j). Where the commit leaves the specification a draft, the check passes and reports nothing.

**Reason:**

Unless its tests and code follow its new wording in the same commit, an approved rule enters the history with tests and code written for its earlier wording (§s-ddd2e96uke4y83j). Only the commit message can state that they need no change, so `sheriff commit-message`, which reads the message, makes the check.

**Example:**

The specification is approved. An earlier commit reworded rule R while it was a draft. The next commit adds the approval of the new wording and changes R's code but none of its tests. Its message has no trailer naming R. `sheriff commit-message` refuses the commit and says that R's tests lag behind it. The most likely mistake is to compare R's wording with its wording in the commit's parent. That wording is already the new one, so the lag passes.

## s-jgejd5rpd9d43pd — An approved rule without code or a test

**Title:** An approved rule without code or a test

**Text:**

`sheriff binding` refuses a commit that includes an approved rule that the system's code (§s-hheus6f395ynqvc) must implement (§s-6fw72j65jkqrfpf), where that rule lacks either of the following (§s-c4y63t285gg7jz7):
- code of the system other than tests, bound to the rule (§s-kgbzk2ph9e6jfb4);
- a test of the system's code, bound to the rule (§s-zrsc6asgmhv8tnc), that is marked neither as skipped nor as expected to fail.

The refusal names the rule by its file, its sid and its location (§s-kag2m9tzdnduxdx), and says whether it lacks code, a test or both.

Code or a test counts as bound to an approved rule as the rule on implementing an approved rule says, including through a chain of `implements` links (§s-6fw72j65jkqrfpf, §s-sn6au3vcr9uy5pm).

A commit includes an approved rule where it does any of the following (§s-c4y63t285gg7jz7):
- it adds an approval of the rule (§s-75ue25v6r23jkk8);
- it adds, changes or removes (§s-2x58az67bm6cxq2) code or a test that is bound to the rule in the commit's parent or as the commit leaves it;
- it removes an `implements` link through which, in the commit's parent, code or a test was bound to the rule.

`sheriff binding` checks the approved rules in the files that the repository keeps, including a node in a cell of a `TableRule` (§s-5fewsp22mmdz7y6). A rule here is a node of one of the kinds that the node on the form of a SpecTag lists (§s-5z5gnu7pahr82xp). Of those rules, it leaves out the following, which the system's code need not implement (§s-6fw72j65jkqrfpf):
- each node of the project's own guidelines, kept in `specs/_guidelines/project.json` (§s-zefk589ykh37b8u);
- in the repository where the SpecSheriff guidelines are written, each node of those guidelines, of their extensions and of the appendix of the tools, all kept in `specs/_guidelines/`;
- each node in `specs/tech/debt.json`, which holds the descriptions of shortcomings in the technical debt (§s-2r7k2aeyusgy6fw);
- each rule that an `exempts` link reaches, directly or through a section above the rule at any depth, where the node that declares the link is approved (§s-gf6n8ge4mke3pr2).

A test is marked as skipped or as expected to fail by a mark, a call or an option that the description of its language names for that purpose (§s-33fw3ga4ctd94dq). In TypeScript and JavaScript these include `test.skip` and `test.todo`, and in Python `pytest.mark.skip`, `pytest.mark.skipif` and `pytest.mark.xfail`.

`sheriff binding` makes this check only where the commit leaves the specification approved (§s-qzthyh7yqvfhsa2, §s-c4y63t285gg7jz7). Where the commit leaves the specification a draft, the check passes and reports nothing.

**Reason:**

Committed without code, or without a test that a run can fail, an approved rule would let the specification state what the system does not do, unnoticed (§s-c4y63t285gg7jz7).

**Example:**

The specification is approved. A commit adds the approval of rule R, whose code exists, and the only test that declares R's SpecTag is marked `pytest.mark.skip`. `sheriff binding` refuses the commit, naming R and saying that it lacks a test. The most likely mistake is to count the skipped test, which no run of the tests can fail.

## s-qqs2svksmjct753 — The nodes that a commit message must name

**Title:** The nodes that a commit message must name

**Text:**

`sheriff commit-message` accepts a commit message only where it gives the sid of each node to which a SpecTag (§s-5z5gnu7pahr82xp) binds code that the commit adds or changes (§s-2x58az67bm6cxq2, §s-7sk3s553ukzwtbm). It refuses any other message, naming each node whose sid the message lacks by its file, its sid and its location (§s-kag2m9tzdnduxdx).

In this check, the code means the symbols (§s-kgbzk2ph9e6jfb4) and the files bound as a whole (§s-5qdjyf6t898rsd4, §s-trwczfskj5zmuft) that the commit adds or changes in the system's code (§s-hheus6f395ynqvc), other than tests. `sheriff commit-message` reads their SpecTags as the commit leaves them.

A message gives a node's sid where the sid appears anywhere in the message. The lines that start with `#` are left out, since git treats them as comments.

`sheriff commit-message` makes this check regardless of whether the specification is approved or a draft (§s-7sk3s553ukzwtbm).

**Reason:**

The commit message records, for whoever reads the history, which nodes the changed code implements (§s-ef93u6cnbs2sevr), and the SpecTags on that code name exactly those nodes.

**Example:**

A commit changes only `src/ui/texts.json`, which the bindings file binds to rule R, and its message gives no sid. `sheriff commit-message` refuses the message and names R. The most likely mistake is to read only the SpecTags placed above symbols, which lets the message pass.

## s-b6qdtghnyha3fhk — The tests, run before a push

**Title:** The tests, run before a push

**Text:**

The pre-push hook (§s-477gtdrkw34dzxw) refuses a push where the tests of the system's code and of the project's own checks and generators fail (§s-aufnqn6t7y2me7a). It runs them by the command that `sheriff.config.json` gives as its `testCommand` (§s-zefk589ykh37b8u). The tests fail where that command ends with an exit status other than zero. Where the hook must run the tests and `sheriff.config.json` gives no `testCommand`, it refuses the push and says so.

The pre-push hook runs the tests only where the push creates or updates a ref whose commit meets both of the following conditions:
- the commit leaves the specification approved: the latest entry for the specification's approval status in that commit's `sheriff.config.json` approves it (§s-qzthyh7yqvfhsa2);
- the project's own guidelines (§s-u7tw6m8npxmv5tu), as that commit holds them in `project.json`, name a push as the moment at which the tests run (§s-x8uzc8z44pwtd3h).

The commit of a ref is the commit that the ref names, directly or through a tag. The project's own guidelines name a push as the moment at which the tests run where a rule that refines the rule on when the tests must pass lists `push`. A rule lists `push` where its `TextRule.list` (§s-eferktypcj7njt5) has a member whose value is `push` (§s-5hb9k2e34dgn284).

Where the push creates or updates a ref and the pre-push hook runs no test, the hook says so and names the reason: the specification is a draft, the project's own guidelines do not name a push as the moment at which the tests run, or both.

**Reason:**

A project whose own guidelines name a push as the moment at which the tests run relies on the pre-push hook. The hook keeps a change whose tests fail from reaching the project's shared branch (§s-x8uzc8z44pwtd3h).

**Example:**

A project's own guidelines state that the tests run on a shared server before a merge, and none of their rules lists `push`. The specification is approved, and `sheriff.config.json` gives a `testCommand`. A developer pushes a branch, and the pre-push hook runs no test and says that the project's own guidelines do not name a push. The most likely mistake is to run the tests because a `testCommand` is given.

## proposal:new-tools-1-project-g4 — What the SpecSheriff tools read in the project's own guidelines

A proposal: the complete new wording of the node agreed under `new:tools-1-project`. Only the item on where the tests run, the sentence after the first list and the words "the SpecSheriff tools" in the reason differ from it.

**Title:** What the SpecSheriff tools read in the project's own guidelines

**Text:**

The SpecSheriff tools read the following in the project's own guidelines (§s-u7tw6m8npxmv5tu), kept in `project.json` (§s-zefk589ykh37b8u):
- the specification's owners (§s-6sk8uet75dmq5qz): those whom the top node of `project.json` names;
- if the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), the levels of the domains: the members of the `TextRule.list` of the rule that refines the rule on a domain's level (§s-nkyty4dy9x2v2a4);
- test fixtures: the files that match the glob patterns in the `TextRule.list` of each rule that refines the rule on such fixtures (§s-6hha5en226aj8hu);
- the project's own kinds of node: the members of the `TextRule.list` of the rule that refines the rule on such kinds (§s-vsh384ybt4w25a2);
- the project's own checks and generators (§s-2fau85dfyyeq66m, §s-km4x4s26kv7pjze): the members of the `TextRule.list` of the rule that `sheriff.config.json` names for each such check or generator;
- where the tests run: the members of the `TextRule.list` of the rule that refines the rule on when the tests must pass (§s-x8uzc8z44pwtd3h);
- the project's own tools that rewrite files: the members of the `TextRule.list` of the rule that refines the rule on the order in which tools and checks run (§s-pcnyfp7gev7syax), where each member is the path of a tool relative to `.githooks/`, such as `pre-commit.d/format` (§s-n4m5zvh96yb299p);
- the files other than JSON files whose format allows no comments: those that match the glob patterns in the `TextRule.list` of the rule that refines the rule on how code is bound to its rules (§s-kgbzk2ph9e6jfb4);
- the `exempts` links of the nodes of `project.json` (§s-gf6n8ge4mke3pr2).

Where an item above refers to the rule that refines another rule, the SpecSheriff tools find that rule by its `refines` link to that other rule, and read:
- nothing, if no rule of `project.json` refines that other rule;
- otherwise, the members of every rule of `project.json` that refines that other rule, in the order in which those rules appear there.

**Reason:**

The SpecSheriff tools need values that only a project's own guidelines set, such as who owns the specification (§s-m42rsngtayk9g3g). A project gives its own rules any titles and arranges those rules as it chooses, so the SpecSheriff tools find each value in the top node of `project.json`, by a link, or by a setting in `sheriff.config.json`.
