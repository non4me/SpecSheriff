# T25, group 4, round b: the English of every changed or new node

This file holds the final English of every node of group 4 that fix-group4-b.mjs changed or added, as `tools-drafts.json` holds it after that script.
Each node is given under its key in `tools-drafts.json`: its title, its text, its reason and its examples.
fix-group4-b.mjs writes this file; edit the script, not this file.

## s-7pk89t8z6wymmj9 — How a project's own check is run

**Title:** How a project's own check is run

**Text:**

Where a check that a project's own guidelines add (§s-2fau85dfyyeq66m) fails, `sheriff validate` refuses the change. Where the rule that lists the check says that its failure is only reported, `sheriff validate` reports the failure instead (§s-ujm7nfxkk9j3464). The refusal or the report names the check and shows what the check printed on its standard output and its standard error. Where the check printed nothing, it shows the check's exit status.

`sheriff validate` runs each of the project's own checks with the command that `sheriff.config.json` names for it (§s-zefk589ykh37b8u). The check runs in the directory in which `sheriff validate` runs. On a commit, that directory holds what the commit contains (§s-477gtdrkw34dzxw). On its standard input, the check receives the model of the specification in the form that `sheriff json` prints (§s-w6gybeqn2ttydqx). A check passes only where its process exits with status zero.

The rule that `sheriff.config.json` names for a check lists the check as a member of its `TextRule.list` (§s-eferktypcj7njt5) whose value (§s-5hb9k2e34dgn284) is the check's name. `sheriff validate` reads that rule in its last approved wording (§s-a8fn72xa782wvbk). The rule says that the check's failure is only reported where that member is an object whose `onFailure` is `reported`. Where the rule lists no member whose value is the check's name, `sheriff validate` refuses the change, naming the check and the rule.

`sheriff validate` runs the project's own checks only once the files of the specification have passed the check for a key written more than once (§s-7zqsstgnuc772ba) and the validation against their schema (§s-xzcw3hv4hmxz7h7). It runs them before each of its other checks (§s-pcnyfp7gev7syax). It makes those other checks whatever the project's own checks find.

`sheriff validate` refuses the change where one of the project's own checks adds, changes or removes a file in the directory in which it runs, other than a file that git ignores (§s-vj67ztqkuhxbv7s). The refusal names the check and each such file.

Given the option `--strict`, `sheriff validate` passes each of the project's own checks a model of the specification in which the specification is approved and its `strict` flag is on (§s-qzthyh7yqvfhsa2, §s-q3pfzyaxvpr2zj2). It does so whatever the entries in `sheriff.config.json` (§s-zefk589ykh37b8u) set the approval status and the flag to. The other checks of `sheriff validate` give the same results with or without the option.

Before `sheriff settings` records an approval of the specification, it runs the project's own checks (§s-chsfpkgpmfk4fft). It passes them a model in which the specification is approved and the `strict` flag is as its entries set it. In the cases that the rule on the `strict` flag names (§s-q3pfzyaxvpr2zj2), `sheriff settings` runs them as `sheriff validate --strict` runs them.

`sheriff validate` runs the project's own checks regardless of whether the specification is approved or a draft (§s-ujm7nfxkk9j3464).

**Reason:**

`sheriff validate` runs a project's own checks wherever the checks of the SpecSheriff guidelines run, on the same files. So such a check binds every participant, rather than depending on whoever remembers to run it (§s-2fau85dfyyeq66m).

**Example:**

The rule that lists the project's own checks has `name` as its `TextRule.list.property`, and one of its members is `{"name": "spelling", "onFailure": "reported"}`. The check `spelling` finds a misspelt word in a node's text, prints the node's sid and exits with status 1. `sheriff validate` reports the failure, showing the sid, and the commit passes. The most likely mistake is to refuse the commit because the check's exit status is not zero.

## proposal:row-10-1-37a — a row of the main table of checks

A new row 10.1.37a of the main table of checks, whose cost is "refused, naming the check and each such file". A row has no title of its own.

**Text:**

A check that a project's own guidelines add (§s-2fau85dfyyeq66m) leaves every file in the directory in which it runs as it was, other than a file that git ignores

## proposal:s-pcnyfp7gev7syax-g4 — The order in which tools and checks run on a commit and on a push

A proposal: the complete new wording of the agreed rule 10.12. The paragraph that opens with "As an exception", its list and the third paragraph of the reason are new.

**Title:** The order in which tools and checks run on a commit and on a push

**Text:**

On a commit and on a push, the project's own tools, the SpecSheriff tools and the checks run in three steps:
1. the tools that rewrite files: first the project's own tools of that kind that its own guidelines (§s-u7tw6m8npxmv5tu) list, such as formatters, and then the generators, both those of the SpecSheriff tools and the project's own (§s-km4x4s26kv7pjze);
2. the project's own checks (§s-2fau85dfyyeq66m) and the rest of the project's own tools, none of which changes a file;
3. the checks of the SpecSheriff guidelines (§s-jau82aq9juv9zzh).

After the first step, nothing changes what the commit contains. Each step runs regardless of what the earlier steps found. The commit or the push goes through only if every check passes and no tool fails.

As an exception, the project's own checks and the other checks of the SpecSheriff guidelines run only once the following checks, which therefore run first, have passed:
- that each object in a file of the specification, of its archive or of its schema gives each of its properties one value (§s-d5cgda5bdsn7bzy);
- that every file of the specification complies with its JSON Schema (§s-emrfpzw2d5bgb6x).

Where the SpecSheriff tools cannot run, the project's own tools still run. The commit or the push then goes through unless one of them fails. Whoever makes the commit or the push is told that no SpecSheriff check ran.

**Reason:**

A project may run tools of its own on a commit or a push, such as a scan that checks that nothing internal reaches a public repository, and adopting the method must not stop them.

The order runs from the most specific to the most general. Whatever rewrites files runs first, so every check reads the commit in its final form. The checks of the SpecSheriff guidelines run last, after the project's own checks. A tool that changed the commit after the checks would let through what no check had read.

The checks that a file gives each property one value and complies with its JSON Schema come before the project's own checks, since every other check reads the nodes of the files that those checks have passed.

The generators, both those of the SpecSheriff tools and the project's own, run after the project's other tools that rewrite files, so that no formatter changes what they generate.

Where the SpecSheriff tools cannot run, as on a machine without the plugin, the project's own tools still guard the commit, and a team that needs the checks to hold for everyone runs them in CI.

**Example:**

A project's own guidelines list a formatter. On a commit, the formatter rewrites the files in the commit first, and the generators of the SpecSheriff tools then write their files. A scan for secrets runs next, and the checks of the SpecSheriff guidelines run last, on the final files.

## s-nh8b2hjvzasdxmd — A node's location outside the specification

**Title:** A node's location outside the specification

**Text:**

`sheriff binding` refuses each location of a node (§s-kag2m9tzdnduxdx) written in a file that the repository keeps outside `specs/`, the folder that holds the files of the specification (§s-zefk589ykh37b8u, §s-u5hfbygfyqv4wmf). The refusal names the file, the line and the location, and says that a node is cited by its sid (§s-9spq78kdwsxr759).

`sheriff binding` treats each of the following as a location, whatever the case of its letters:
- text in the form of a numbered node's location (§s-ygg5kpcxgzq3m7w), such as `base/3.2` or `_guidelines/spec/1.3.4`, whether or not a node is at that location now;
- the location that the model of the specification (§s-w6gybeqn2ttydqx) gives a term (§s-khqsmy6mhejkrhg), such as `contracts/request`;
- the location that the model gives the first top-level node of a file of the guidelines, of the appendix of the tools (§s-a4rbry4hsu34hy8) or of the technical appendix (§s-tj38pvm38nepaf5), such as `tech/stack`.

Text has the form of a numbered node's location where it consists of one of the following, followed by a slash and one or more numbers separated by dots:
- the name of a folder under `specs/` that holds files of the base specification (§s-5x737t9nee4zgaa);
- the location of the first top-level node of a file of the guidelines, of the appendix of the tools or of the technical appendix.

`sheriff binding` treats text as a location only where the text stands on its own, not as part of a longer path or name, as `tech/stack` is part of `specs/tech/stack.json`.

`sheriff binding` leaves out each file that the project's own guidelines (§s-u7tw6m8npxmv5tu) list as a fixture of the tests of a check that reads citations or locations (§s-6hha5en226aj8hu).

`sheriff binding` makes this check regardless of whether the specification is approved or a draft (§s-u5hfbygfyqv4wmf).

**Reason:**

A node's location changes whenever the specification is reordered, while its sid never changes (§s-9spq78kdwsxr759). Outside the specification, a location comes with no link to the node that it names. A location left in a file would then point at another node, or at none, and no other check would notice it.

**Example:**

A guide in `docs/` says “see `base/3.2`”. `sheriff binding` refuses that line and names `base/3.2`, though no node is at that location now. The most likely mistake is to refuse only a location at which a node exists, which lets a location left behind by a removed node pass.

## s-m8nmfsxkcfu7cjp — A citation outside the specification

**Title:** A citation outside the specification

**Text:**

`sheriff citations` refuses each of the following in the files that it reads (§s-e84nggntkrcyumq):
- a word that has the form of a sid (§s-eferktypcj7njt5), where that sid names no node of the model of the specification (§s-w6gybeqn2ttydqx);
- a `§` followed directly by a digit, such as `§5.8`, which cites a node by a number instead of its sid (§s-9spq78kdwsxr759).

Each refusal names the file, the line and the text refused.

`sheriff citations` reads every file that the repository keeps outside `specs/` (§s-zefk589ykh37b8u). It leaves out the following:
- the bindings file (§s-trwczfskj5zmuft), whose SpecTags the check for a SpecTag that names no node looks up (§s-36x8amvunmv2kp5);
- each file that the project's own guidelines (§s-u7tw6m8npxmv5tu) list as a fixture of the tests of a check that reads citations or locations (§s-6hha5en226aj8hu);
- the sid of each SpecTag `@spec <sid>` (§s-5z5gnu7pahr82xp) in the system's code (§s-hheus6f395ynqvc) or its tests, which the check for a SpecTag that names no node looks up instead.

`sheriff citations` makes this check regardless of whether the specification is approved or a draft (§s-e84nggntkrcyumq).

**Reason:**

Outside the specification, a citation comes with no link to the node that it cites (§s-cxtt6jvhqcey2k9). So a cited sid that names no node, or a number in place of a sid, would mislead every reader, and no other check would notice it.

**Example:**

The guide `docs/setup.md` cites `§s-…`, the sid of a rule that a later commit removes. That commit changes no file outside `specs/`, yet `sheriff citations` refuses the sid in the guide, naming the guide, the line and the sid. The most likely mistake is to read only the files that the commit changes, which lets the citation pass until someone edits the guide.

## s-dbk2vyeg8z5jxna — Generated copies checked against their nodes

**Title:** Generated copies checked against their nodes

**Text:**

`sheriff binding` refuses each file that `sheriff types` generates (§s-a8fn72xa782wvbk) where the file's text in the repository differs, line endings aside, from what `sheriff types` generates for it (§s-dwxjxb7rw4w5yn3). It also refuses each such file that the repository lacks. Each refusal names the file and says that running `sheriff types` regenerates it.

`sheriff binding` generates in memory, from the last approved wording of each node (§s-qyjw8xez6t6adc3), the files that `sheriff types` would generate. It writes none of them.

`sheriff binding` refuses each change that a commit makes to a file of one of the project's own generators (§s-km4x4s26kv7pjze) while the rule that lists that generator is a draft. Such a file is one at a path that the generator prints when `sheriff binding` runs it as `sheriff types` runs a generator whose rule is approved (§s-y5yk7eu6h4zrjpr). A change is any difference between that file as the commit leaves it and the same file in the commit's parent. The refusal names the file and the generator.

`sheriff binding` also refuses each of the following, any one of which keeps `sheriff types` from writing any file at all (§s-a8fn72xa782wvbk):
- a file in the list of the files (§s-pvzms7d8kxb8dk2) for the types and the RuntimeChecks (§s-e877bnfa559tvk9) generated from the RecordTypes (§s-7vm323mhry2enx3), where the file's name does not end in `.ts`, `.py` or `.json`;
- a file in that list whose path leads outside the repository;
- a second rule that lists such files in the section of the technical appendix for the stack (§s-tj38pvm38nepaf5);
- a name of a type or a definition that cannot be generated (§s-suv42g8r3ra2h6b);
- a path for which `sheriff types` would generate different texts, such as a path that two of the project's own generators print with different content.

Each of these refusals names the rule, the node or the path concerned.

`sheriff binding` makes this check regardless of whether the specification is approved or a draft (§s-dwxjxb7rw4w5yn3).

**Reason:**

A generated file kept in the repository is part of the system's code (§s-hheus6f395ynqvc). Edited by hand, it would implement what no owner has approved. Lagging behind its nodes, it would implement a wording that the owners of those nodes have since replaced (§s-kh8qcd5kxgh9z3j, §s-qyjw8xez6t6adc3).

**Example:**

A RecordType is reworded and becomes a draft, and the types generated from it stay as its last approved wording produces them. A commit edits `src/types.ts` by hand to match the new wording. `sheriff binding` refuses `src/types.ts`, since its text differs from what the last approved wording produces. The most likely mistake is to generate the types from the draft wording, which lets the edited file pass.

## s-txbwsthdqhvyzd2 — An approved rule whose tests or code lag behind it

**Title:** An approved rule whose tests or code lag behind it

**Text:**

`sheriff commit-message` refuses a commit after which the tests or the code of an approved rule lag behind that rule (§s-ddd2e96uke4y83j). The commit passes where its message states that the rule's implementation needs no change (§s-7gab4ptjt2khfr5). The refusal names the rule by its file, its sid and its location (§s-kag2m9tzdnduxdx). It says whether the rule's tests, its code or both lag. It also names the trailer (§s-7gab4ptjt2khfr5) with which the commit message can make that statement.

The tests of an approved rule lag behind it where all of the following hold:
- the commit changes the rule's approved wording;
- a test of the system's code (§s-hheus6f395ynqvc) is bound to the rule before the commit (§s-zrsc6asgmhv8tnc);
- the commit adds, changes or removes no test that is bound to the rule before or after the commit (§s-2x58az67bm6cxq2).

The code of an approved rule lags behind it where all of the following hold:
- the commit changes the rule's approved wording, or adds, changes or removes a test that is bound to the rule before or after the commit;
- code of the system other than tests is bound to the rule before the commit (§s-kgbzk2ph9e6jfb4);
- the commit adds, changes or removes no such code that is bound to the rule before or after the commit.

Code or a test is bound to a rule before the commit where it is bound in the commit's parent. It is bound after the commit where it is bound as the commit leaves the code and the tests.

Code or a test bound to a node that has an `implements` link (§s-sn6au3vcr9uy5pm) to a rule, directly or through a chain of such links, also counts as bound to that rule (§s-6fw72j65jkqrfpf).

A commit changes the approved wording of a rule where all of the following hold:
- the rule is approved as the commit leaves it;
- the commit's parent holds an approval of the rule (§s-v4qus7raqnwzneb);
- the fingerprint of the rule's wording as the commit leaves it differs from the fingerprint that the rule's last approval in the commit's parent records.

`sheriff commit-message` reads the approvals of the commit's parent in the form to which `sheriff reindex` would rewrite them (§s-gb8s9657a65hqmv).

For a merge commit, `sheriff commit-message` counts only what the merge changes relative to every one of its parents, since each merged commit was checked when it was made:
- the merge changes a rule's approved wording, or adds, changes or removes a test or code, only where it does so relative to each of its parents;
- code or a test is bound to a rule before the commit where it is bound in any of its parents.

`sheriff commit-message` checks each approved rule in the files that the repository keeps, including a node in a cell of a `TableRule` (§s-5fewsp22mmdz7y6). A rule here is a node of one of the kinds that the node on the form of a SpecTag lists (§s-5z5gnu7pahr82xp).

`sheriff commit-message` makes this check only where the commit leaves the specification approved (§s-qzthyh7yqvfhsa2, §s-ddd2e96uke4y83j). Where the commit leaves the specification a draft, the check passes and reports nothing.

**Reason:**

Unless its tests and code follow its new wording in the same commit, an approved rule enters the history with tests and code written for its earlier wording (§s-ddd2e96uke4y83j). Only the commit message can state that they need no change, so `sheriff commit-message`, which reads the message, makes the check.

**Example:**

The specification is approved. An earlier commit reworded the approved rule R, so R became a draft. The next commit adds the approval of the new wording and changes R's code but none of its tests. Its message has no trailer naming R. `sheriff commit-message` refuses the commit and says that R's tests lag behind it. The most likely mistake is to compare R's wording with its wording in the commit's parent. That wording is already the new one, so the lag goes unnoticed.

## s-jgejd5rpd9d43pd — An approved rule without code or a test

**Title:** An approved rule without code or a test

**Text:**

`sheriff binding` refuses a commit that includes an approved rule that the system's code (§s-hheus6f395ynqvc) must implement (§s-6fw72j65jkqrfpf), where that rule lacks one or both of the following (§s-c4y63t285gg7jz7):
- code of the system other than tests, bound to the rule (§s-kgbzk2ph9e6jfb4);
- a test of the system's code, bound to the rule (§s-zrsc6asgmhv8tnc), that is marked neither as skipped nor as expected to fail.

The refusal names the rule by its file, its sid and its location (§s-kag2m9tzdnduxdx). It also says whether the rule lacks code, a test or both.

Code or a test bound to a node that has an `implements` link (§s-sn6au3vcr9uy5pm) to an approved rule, directly or through a chain of such links, also counts as bound to that rule (§s-6fw72j65jkqrfpf).

A commit includes an approved rule where it does any of the following (§s-c4y63t285gg7jz7):
- it adds an approval of the rule (§s-75ue25v6r23jkk8);
- it adds, changes or removes (§s-2x58az67bm6cxq2) code or a test that is bound to the rule in the commit's parent or as the commit leaves it;
- it removes an `implements` link through which, in the commit's parent, code or a test was bound to the rule;
- it ends the rule's exemption from implementation (§s-gf6n8ge4mke3pr2): an `exempts` link that reached the rule is removed or no longer reaches it, or the node that declares that link becomes a draft.

`sheriff binding` checks the approved rules in the files that the repository keeps, including a node in a cell of a `TableRule` (§s-5fewsp22mmdz7y6). A rule here is a node of one of the kinds that the node on the form of a SpecTag lists (§s-5z5gnu7pahr82xp). Of those rules, it leaves out the following, which the system's code need not implement (§s-6fw72j65jkqrfpf):
- each node of the project's own guidelines (§s-u7tw6m8npxmv5tu), kept in `specs/_guidelines/project.json` (§s-zefk589ykh37b8u);
- in the repository where the SpecSheriff guidelines are written, each node of those guidelines, of their extensions (§s-mbmnsnxenmavu3z) and of the appendix of the tools (§s-a4rbry4hsu34hy8), all kept in `specs/_guidelines/`;
- each node in `specs/tech/debt.json`, which holds the descriptions of shortcomings in the technical debt (§s-2r7k2aeyusgy6fw);
- each rule that an `exempts` link reaches, directly or through a section above the rule at any depth, where the node that declares the link is approved (§s-gf6n8ge4mke3pr2).

A test is marked as skipped or as expected to fail by a mark, a call or an option that the description of its language names for that purpose (§s-33fw3ga4ctd94dq). In TypeScript and JavaScript these include `test.skip` and `test.todo`, and in Python `pytest.mark.skip`, `pytest.mark.skipif` and `pytest.mark.xfail`.

`sheriff binding` makes this check only where the commit leaves the specification approved (§s-qzthyh7yqvfhsa2, §s-c4y63t285gg7jz7). Where the commit leaves the specification a draft, the check passes and reports nothing.

**Reason:**

Committed without code, or without a test that can fail when it is run, an approved rule would let the specification state, unnoticed, what the system does not do (§s-c4y63t285gg7jz7).

**Example:**

The specification is approved. A commit adds the approval of rule R, whose code exists, and the only test that declares R's SpecTag is marked with `pytest.mark.skip`. `sheriff binding` refuses the commit, naming R and saying that it lacks a test. The most likely mistake is to count the skipped test, which cannot fail in any run of the tests.

## proposal:row-10-1-41-g4 — a row of the main table of checks

A proposal: the complete new wording of the agreed row 10.1.41 of the main table of checks. The last item of its list is new; its cost stays "refused, naming the rule, while the specification is approved; passes while it is a draft".

**Text:**

An approved rule that the system's code (§s-hheus6f395ynqvc) must implement (§s-6fw72j65jkqrfpf) is bound to a test that is not marked as skipped or as expected to fail and to code of the system other than tests. Code or a test bound to a node that has an `implements` link (§s-sn6au3vcr9uy5pm) to the approved rule, directly or through a chain of such links, also counts as bound to the approved rule.

The check applies only to the approved rules that a commit includes. A commit includes an approved rule if any of the following happens in that commit:
- the rule's approval is added;
- a test or code changes that is bound to the rule before the commit or after it;
- an `implements` link through which a test or code is bound to the rule is removed;
- the rule stops being exempted from implementation (§s-gf6n8ge4mke3pr2): an `exempts` link that reached it is removed or no longer reaches it, or the node that declares that link becomes a draft.

**Reason:**

An approved rule committed without its test or its code would let the specification state what the system does not do, and nobody would notice. A test run does not count a skipped test, or a failing test expected to fail, as failed. So, if such a test counted, a rule whose only test is marked in either of these ways would pass this check and the test run while nothing checks the rule. While the specification is a draft, the work is focused on the specification itself, so an approved rule may still lack its test or its code.

**Example:**

The specification is approved. Code and a test not marked as skipped are bound to node N, which has an `implements` link to rule R. That code changes in a commit, so the commit includes R, and the commit passes. But not: the commit is refused because no SpecTag names R itself.

## s-qqs2svksmjct753 — The nodes that a commit message must name

**Title:** The nodes that a commit message must name

**Text:**

`sheriff commit-message` accepts a commit message only where it contains the sid of each node to which a SpecTag (§s-5z5gnu7pahr82xp) binds code that the commit adds or changes (§s-2x58az67bm6cxq2, §s-7sk3s553ukzwtbm). It refuses any other message, naming, by its file, its sid and its location (§s-kag2m9tzdnduxdx), each node whose sid the message lacks.

In this check, the code means the symbols (§s-kgbzk2ph9e6jfb4) and the files bound as a whole (§s-5qdjyf6t898rsd4, §s-trwczfskj5zmuft) that the commit adds or changes in the system's code (§s-hheus6f395ynqvc), other than tests. `sheriff commit-message` reads their SpecTags as the commit leaves them.

A message contains a node's sid where the sid appears anywhere in the message. `sheriff commit-message` ignores each line of the message that starts with git's comment character (`core.commentChar`, by default `#`). It also ignores the scissors line that `git commit --verbose` writes, and every line after it, which hold the diff that git leaves out of the commit message.

For a merge commit, `sheriff commit-message` counts only the code that the merge adds or changes relative to every one of its parents. Each merged commit was checked when it was made.

`sheriff commit-message` makes this check regardless of whether the specification is approved or a draft (§s-7sk3s553ukzwtbm).

**Reason:**

The SpecTags on the changed code name the nodes that it implements, so a commit message checked against them records those nodes for whoever reads the history (§s-ef93u6cnbs2sevr).

**Example:**

A commit changes only `src/ui/texts.json`, which the bindings file binds to rule R, and its message contains no sid. `sheriff commit-message` refuses the message and names R. The most likely mistake is to read only the SpecTags placed above symbols, which lets the message pass.

## s-b6qdtghnyha3fhk — Running the tests before a push

**Title:** Running the tests before a push

**Text:**

The pre-push hook (§s-477gtdrkw34dzxw) refuses a push where the tests of the system's code (§s-hheus6f395ynqvc) and of the project's own checks (§s-2fau85dfyyeq66m) and generators (§s-km4x4s26kv7pjze) fail (§s-aufnqn6t7y2me7a). It runs them with the command that the project-wide settings give as their `testCommand` (§s-zefk589ykh37b8u). The tests fail where that command exits with a non-zero status. Where the hook must run the tests and the project-wide settings give no `testCommand`, it refuses the push and says that `testCommand` is missing.

The pre-push hook runs the tests only where the push creates or updates a ref that names, directly or through a tag, a commit that meets both of the following conditions:
- the commit leaves the specification approved (§s-qzthyh7yqvfhsa2);
- the project's own guidelines (§s-u7tw6m8npxmv5tu), as that commit holds them in `project.json`, name a push as the moment at which the tests run (§s-x8uzc8z44pwtd3h).

The SpecSheriff tools look for `push` in the `TextRule.list` (§s-eferktypcj7njt5) of each rule of `project.json` that has a `refines` link (§s-sn6au3vcr9uy5pm) to the rule on when the tests must pass (§s-x8uzc8z44pwtd3h). They read each such rule in its last approved wording as of that commit (§s-a8fn72xa782wvbk). Where a member of such a list has the value `push` (§s-5hb9k2e34dgn284), the project's own guidelines name a push as the moment at which the tests run.

Where the push creates or updates a ref and the pre-push hook runs no tests, the hook says so. For each ref that the push creates or updates, it names the reason: in the commit that the ref names, the specification is a draft, the project's own guidelines do not name a push as the moment at which the tests run, or both.

**Reason:**

A project whose own guidelines name a push as the moment at which the tests run relies on the pre-push hook. The hook keeps a change whose tests fail from reaching the project's shared branch (§s-x8uzc8z44pwtd3h).

**Example:**

A project's own guidelines state that the tests run on a shared server before a merge, and none of their rules lists `push`. The specification is approved, and the project-wide settings give a `testCommand`. A developer pushes a branch, and the pre-push hook runs no tests. It says that the project's own guidelines do not name a push as the moment at which the tests run. The most likely mistake is to run the tests because a `testCommand` is given.

## proposal:new-tools-1-project-g4 — What the SpecSheriff tools read in the project's own guidelines

A proposal: the complete new wording of the node agreed under `new:tools-1-project`. The item on where the tests run, the paragraph on the last approved wording, the sentence after the first list, the citation of `TextRule.list` in the item on levels and the reason differ from the agreed wording.

**Title:** What the SpecSheriff tools read in the project's own guidelines

**Text:**

The SpecSheriff tools read the following in the project's own guidelines (§s-u7tw6m8npxmv5tu), kept in `project.json` (§s-zefk589ykh37b8u):
- the specification's owners (§s-6sk8uet75dmq5qz): those whom the top node of `project.json` names;
- if the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), the levels of the domains: the members of the `TextRule.list` (§s-eferktypcj7njt5) of the rule that refines the rule on a domain's level (§s-nkyty4dy9x2v2a4);
- test fixtures: the files that match the glob patterns in the `TextRule.list` of each rule that refines the rule on such fixtures (§s-6hha5en226aj8hu);
- the project's own kinds of node: the members of the `TextRule.list` of the rule that refines the rule on such kinds (§s-vsh384ybt4w25a2);
- the project's own checks and generators (§s-2fau85dfyyeq66m, §s-km4x4s26kv7pjze): the members of the `TextRule.list` of the rule that `sheriff.config.json` names for each such check or generator;
- where the tests run: the members of the `TextRule.list` of the rule that refines the rule on when the tests must pass (§s-x8uzc8z44pwtd3h), such as `push` (§s-b6qdtghnyha3fhk);
- the project's own tools that rewrite files: the members of the `TextRule.list` of the rule that refines the rule on the order in which tools and checks run (§s-pcnyfp7gev7syax), where each member is the path of a tool relative to `.githooks/`, such as `pre-commit.d/format` (§s-n4m5zvh96yb299p);
- the files other than JSON files whose format allows no comments: those that match the glob patterns in the `TextRule.list` of the rule that refines the rule on how code is bound to its rules (§s-kgbzk2ph9e6jfb4);
- the `exempts` links of the nodes of `project.json` (§s-gf6n8ge4mke3pr2).

Where an item above refers to a rule that refines another rule, the SpecSheriff tools find that rule by its `refines` link (§s-sn6au3vcr9uy5pm) to that other rule, and read:
- nothing, if no rule of `project.json` refines that other rule;
- otherwise, the members of every rule of `project.json` that refines that other rule, in the order in which those rules appear there.

The SpecSheriff tools read the `TextRule.list` of each rule of `project.json` in the rule's last approved wording (§s-qyjw8xez6t6adc3), since a draft rule is not implemented (§s-utvqbypzhmgndug). A rule that has never been approved lists nothing.

**Reason:**

The SpecSheriff tools need values that only a project's own guidelines set, such as who owns the specification (§s-m42rsngtayk9g3g). A project may give its own rules any titles and arrange those rules as it chooses, so the SpecSheriff tools find each value in the top node of `project.json`, through a link, or through a setting in `sheriff.config.json`.
