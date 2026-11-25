# T25, group 6: the English of every node

This file holds the final English of every node of group 6 of stage 2 of T25, as `tools-drafts.json` holds it after propose-group6.mjs: the drafts of items 48 to 50 of the appendix of the tools, which describe how an approval is recorded, the settings that only an owner of the specification changes, and setting a repository up and taking SpecSheriff out of it. It also holds the two proposals of the group, each a complete new wording of an agreed draft that the group's subject exposes.
Each node is given under its key in `tools-drafts.json`: its title, its text, its reason and its examples.
propose-group6.mjs writes this file; edit the script, not this file.

## new:tools-11-section — The approvals of nodes

A new section, with the sid s-e75g25ajrm2kqj5.

**Title:** The approvals of nodes

**Text:**

How the SpecSheriff tools record the approval of a node (§s-67vekyup7y8smap) and the withdrawal of that approval (§s-fpq35tf3pehgk64), and how they tell whether an approval is in force.

## s-v4qus7raqnwzneb — How an approval is recorded

**Title:** How an approval is recorded

**Text:**

`specs/_approvals.jsonl` (§s-zefk589ykh37b8u) records each approval (§s-67vekyup7y8smap) of a wording of a node (§s-5ah25f6gy99panq), and each withdrawal of such an approval (§s-fpq35tf3pehgk64), in a line of its own. Each line is appended to the end of the file (§s-upkur92ry6332y5, §s-xybjqp2rxh8gszf). Each line is the text that `JSON.stringify` writes, with no whitespace, for an object that holds only the following keys, in this order:
- `sid`, the sid of the node;
- `fingerprint`, the fingerprint of the wording that the line approves, or whose approval the line withdraws (§s-f5brvuuu6xmkj6t);
- `withdrawn`, whose value is `true`, only in a line that withdraws an approval;
- `by`, the email address that git's configuration sets for whoever approves or withdraws.

A line names whoever approves or withdraws only by that email address. So an approval that an agent makes on an owner's behalf (§s-t5uw8zfxzhfdg86) has the same form as the owner's own approval.

A line that holds no `withdrawn` is an approval. An approval of a wording of a node is in force where the latest line for the node's sid and that wording's fingerprint is an approval. The latest line is the last one in the file.

A node's last approval is the last line for the node's sid that is an approval, whether or not a later line withdraws it.

**Reason:**

An approval is recorded apart from its node, so that nobody can make a node approved by editing the node. Lines are only ever appended to the file, so that every approval stays on record with whoever gave it.

**Example:**

Rule R was approved with the wording whose fingerprint is F1, then reworded and approved with the fingerprint F2. Someone then withdrew R's approval, which appended a withdrawal for F1 and then one for F2. No approval of R's wording is in force, so R is a draft, and R's last approval is the line that approved F2. The most likely mistake is to treat R as approved because a line in the file approves its current wording, although a later line withdraws that approval.

## new:tools-11-fingerprint — The fingerprint of a node's wording

A new node, split from `s-v4qus7raqnwzneb`, with the sid s-f5brvuuu6xmkj6t.

**Title:** The fingerprint of a node's wording

**Text:**

The fingerprint of a node's wording (§s-5ah25f6gy99panq) is the SHA-256 hash of the UTF-8 bytes of one string, written as 64 lowercase hexadecimal digits. That string is the text that `JSON.stringify` writes, with no whitespace, for an object built from the node. In that text, the keys of each object are sorted by their UTF-16 code units, and each list keeps its order.

The object holds every property of the node except the following:
- its `location`, its `sid`, its `kind` and its `status`;
- its links and its `meta`;
- the nodes under it;
- the values gathered beside a field (§s-ju5vcanbjph7mgh), which `sheriff reindex` builds from other nodes (§s-ztseyetus7np6br);
- the `archived` field of a node of the archive (§s-f2b5zvc565s242f);
- in a `TableRule` (§s-5fewsp22mmdz7y6), each cell that holds a node, since that node has a fingerprint of its own.

For a node in a cell of a `TableRule`, the object also holds the key `cell`. Its value is an object that holds the following, which are part of the node's wording:
- `column`, the heading of the node's column;
- `group`, the heading of the node's group, which is `null` where the table's rows are not grouped;
- `row`, an object that holds the text of each cell of the node's row that holds text, under the key of that cell's column.

The following names, which `sheriff reindex` changes in what an earlier release wrote (§s-gb8s9657a65hqmv), appear in the object as the earlier release wrote them:
- the node's `reason`, under the key `rationale`;
- a `TextRule.list.jsonSchema` or a `TextRule.list.valueList` (§s-eferktypcj7njt5), in a list that holds only one of them, under the key `declaredIn`, with its `pointer` or its `symbol` under the key `declaration`;
- the name of a kind of node whose nodes' sids are a field's values: `TextRule` as `rule`, `RecordType` as `recordType`, and `header` as `domain`.

For a field whose values come from the source `domains` (§s-gb8s9657a65hqmv), earlier releases wrote an empty list of its own values under the key `values`. Where such a field has no list of its own values, it appears in the object with that empty list.

**Reason:**

An approval records a wording by its fingerprint, so that a change to that wording, and to nothing else, leaves the node without an approval in force (§s-5ah25f6gy99panq). A string built the same way everywhere gives every machine and every release the same fingerprint for the same wording.

**Example 1:**

A rule is approved, and an edit adds an example to it. The rule's fingerprint changes, so no approval of its new wording is in force, and `sheriff reindex` makes the rule a draft. A later edit adds a link to the rule and moves it to another section, and its fingerprint stays the same. The most likely mistake is to leave the examples out of the object, so that the rule stays approved with an example that no owner has read.

**Example 2:**

Each row of a `TableRule` holds a rule and the text of what a failure of that rule costs. The cost in one row changes from `refused` to `reported`. The fingerprint of the rule in that row changes, since the text cells of its row are part of its wording, and the fingerprint of the `TableRule` changes too. The most likely mistake is to build the object of the rule from its own properties alone, so that the rule stays approved with a cost that no owner has approved.

## new:tools-11-approve — Approving a node

A new node, split from `s-v4qus7raqnwzneb`, with the sid s-upkur92ry6332y5.

**Title:** Approving a node

**Text:**

`sheriff approve <sid>...` approves each node that it names (§s-67vekyup7y8smap). For each such node, it appends to `specs/_approvals.jsonl` an approval of the node's current wording (§s-v4qus7raqnwzneb), which names whoever runs the command.

`sheriff approve` then sets the node's status to `approved`. Where an approval of the node's current wording is already in force, it appends nothing and only sets the status.

Where a node that `sheriff approve` names is a `TableRule` (§s-5fewsp22mmdz7y6), the command also approves each node in the table's cells for which no approval of its current wording is in force. It appends these approvals after that of the `TableRule`, in the order of the table's rows.

`sheriff approve` refuses each of the following:
- a sid that names no node in the files that the repository keeps;
- a section, and the header of a domain where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm, §s-yccuyqbypzzx2gu), whose approval status `sheriff reindex` derives from other nodes (§s-ztseyetus7np6br);
- a node none of whose owners (§s-6sk8uet75dmq5qz) is whoever runs the command.

In a project other than SpecSheriff itself, the nodes of the SpecSheriff guidelines and of a chosen extension (§s-9ttvcwpqkehm58g) come with the plugin rather than from the files that the repository keeps (§s-bsya3febm6u64ab).

Each refusal names the sid concerned. The refusal of a node whose owners do not include whoever runs the command also names those owners.

Where `sheriff approve` refuses any node that the run names, it records nothing. Where git's configuration sets no email address, `sheriff approve` refuses to run.

After it records the approvals, `sheriff approve` runs `sheriff reindex` (§s-ztseyetus7np6br), which derives the approval status of each section anew.

**Reason:**

Recording every approval through one command lets the SpecSheriff tools check, before an approval is recorded, that whoever gives it is an owner of the node (§s-67vekyup7y8smap).

**Example:**

A rule of a project's base specification is a `TableRule`, each row of which holds one state of a request as a node. An owner adds two rows, whose nodes are drafts, and runs `sheriff approve` with the table's sid. `sheriff approve` appends an approval of the table's new wording and one approval for the node in each new row. The most likely mistake is to approve only the table, so that the nodes of the new rows stay drafts.

## new:tools-11-withdraw — Withdrawing the approval of a node

A new node, split from `s-v4qus7raqnwzneb`, with the sid s-xybjqp2rxh8gszf.

**Title:** Withdrawing the approval of a node

**Text:**

`sheriff approve --withdraw <sid>...` withdraws the approval of each node that it names (§s-fpq35tf3pehgk64). For each wording (§s-5ah25f6gy99panq) of such a node whose approval is in force, whether the node holds that wording or not, it appends to `specs/_approvals.jsonl` a line that withdraws that approval (§s-v4qus7raqnwzneb). Each such line names whoever runs the command.

`sheriff approve --withdraw` then sets the node's status to `draft`. Where no approval of any wording of the node is in force, it appends nothing and only sets the status.

`sheriff approve --withdraw` records a withdrawal by whoever runs it, whether or not that person is an owner of the node. It refuses each of the following:
- a sid that names no node in the files that the repository keeps;
- a section, and the header of a domain where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm, §s-yccuyqbypzzx2gu), whose approval status `sheriff reindex` derives from other nodes (§s-ztseyetus7np6br).

In a project other than SpecSheriff itself, the nodes of the SpecSheriff guidelines and of a chosen extension (§s-9ttvcwpqkehm58g) come with the plugin rather than from the files that the repository keeps (§s-bsya3febm6u64ab).

Each refusal names the sid concerned. Where `sheriff approve --withdraw` refuses any node that the run names, it records nothing. After it records the withdrawals, it runs `sheriff reindex` (§s-ztseyetus7np6br).

**Reason:**

A withdrawal takes back the approval of the node, not only that of the wording that the node holds now (§s-fpq35tf3pehgk64). An approval left in force for an earlier wording would let an edit that restores that wording make the node approved again without any owner approving it.

**Example:**

Rule R was approved, reworded and approved again, so an approval of each of its wordings is in force. A developer who is not an owner of R finds R wrong and runs `sheriff approve --withdraw` with R's sid. The command appends a withdrawal for each of those wordings, and R becomes a draft. The most likely mistake is to withdraw only the approval of R's current wording, so that an edit that restores R's earlier wording makes R approved again.

## new:tools-2-entries — The entries of the settings that only an owner changes

A new node, with the sid s-d3nkw9b6mn98vuw.

**Title:** The entries of the settings that only an owner changes

**Text:**

`sheriff.config.json` (§s-zefk589ykh37b8u) keeps the entries of each setting that only an owner of the specification changes (§s-chsfpkgpmfk4fft) in a list of its own, under its own key:
- `approvalStatus`, for the specification's approval status (§s-qzthyh7yqvfhsa2): each entry holds `status`, whose value is `approved` or `draft`, and `by`;
- `strict`, for the specification's `strict` flag (§s-q3pfzyaxvpr2zj2): each entry holds `on`, whose value is `true` or `false`, and `by`;
- `extensions`, for the extensions of the guidelines that the project has chosen (§s-9ttvcwpqkehm58g): each entry holds `name`, the name of an extension (§s-zefk589ykh37b8u), `chosen`, whose value is `true` or `false`, and `by`.

The value of an entry's `by` is the email address by which `sheriff settings` names the owner who made the change. An entry holds only the keys given above for its list.

`sheriff settings` appends each entry to the end of its list, and a commit keeps the entries of its parent first (§s-j9r8z4xdrfkfs47). So the last entry of a list is the latest.

The specification's approval status and its `strict` flag have the values that the last entry of their lists sets. The project has chosen exactly those extensions for which the last entry of `extensions` that names the extension sets `chosen` to `true`.

Where `approvalStatus` holds no entry, no owner has approved the specification, so the specification is a draft (§s-9g7jj8z4yf9kq93). Where `strict` holds no entry, the flag has the default value that the schema of `sheriff.config.json` sets (§s-zefk589ykh37b8u).

`sheriff settings` records an entry only where the entry changes the value of its setting. Otherwise it records nothing and says that the setting already has that value.

**Reason:**

The entries keep every change that an owner made to these settings, each with whoever made it, while the last entry of each list gives its setting a value. `sheriff reindex` writes an entry in place of the rule by which an earlier release approved the specification (§s-gb8s9657a65hqmv). An entry holds nothing that depends on when it is written, so that this entry has the same text whenever it is written.

**Example:**

`approvalStatus` holds `{"status": "approved", "by": "a@example.com"}` followed by `{"status": "draft", "by": "b@example.com"}`. The specification is a draft, since the last entry returns it to draft. The most likely mistake is to treat the specification as approved because one of the entries approves it.

## new:tools-2-approve-spec — Approving the specification

A new node, with the sid s-m59dqwkw2e96wne.

**Title:** Approving the specification

**Text:**

Before `sheriff settings` records an entry that approves the specification (§s-chsfpkgpmfk4fft, §s-d3nkw9b6mn98vuw), it runs every check that the rule on the specification's approval status requires before an approval (§s-qzthyh7yqvfhsa2): the checks that `sheriff validate`, `sheriff binding` and `sheriff citations` make (§s-4kd2pave7vm4hmd).

These checks read the specification as approved, whatever the entries in `sheriff.config.json` set. They judge the files in the working tree as one commit that adds the following:
- each node of the specification in the files that the repository keeps;
- the approval in force of each approved node (§s-v4qus7raqnwzneb);
- all of the system's code (§s-hheus6f395ynqvc), including its tests.

The checks treat everything else that the repository keeps, such as the archive (§s-f2b5zvc565s242f), the other lines of `specs/_approvals.jsonl` and the entries in `sheriff.config.json`, as unchanged by that commit. The project's own checks receive the model of the specification (§s-w6gybeqn2ttydqx) that the node on such checks gives for this run (§s-7pk89t8z6wymmj9).

`sheriff settings` also names each node from which `sheriff types` would generate nothing, because the node's approved wording relies on a node that has never been approved (§s-f8fmudceuyaj942). It finds these nodes as `sheriff types` does (§s-a8fn72xa782wvbk), but writes no file.

`sheriff settings` shows the owner who approves the specification every refusal, warning and report that these checks give. Where they give none, it records the entry. Otherwise, it records the entry only after the owner confirms the approval, as the node on `sheriff settings` says (§s-chsfpkgpmfk4fft).

While the `strict` flag (§s-q3pfzyaxvpr2zj2) is on, `sheriff settings` first makes the checks that the flag makes stricter, as it does before it turns the flag on (§s-nxgkp988mej79eg). Where any of them would refuse a commit that changes nothing, `sheriff settings` refuses to record the approval and makes no other check. That refusal is the one that `sheriff settings` gives before it turns the flag on.

`sheriff settings` records an entry that returns the specification to draft without running any check.

**Reason:**

The checks at a commit judge only what the commit contains, so they never show everything that the specification and the code still lack (§s-qzthyh7yqvfhsa2). Judging one commit that adds the whole specification and all of the code, they show the owner every such gap before the owner approves the specification.

**Example:**

The specification is a draft, and its `strict` flag is off. An approved rule R has neither code nor a test, and no SpecTag binds an old function. The agent runs `sheriff settings status approved` with no terminal attached. `sheriff settings` names R, saying that R lacks code and a test, names the function, and records nothing. The owner agrees, and the agent runs the command again with `--confirm`. The most likely mistake is to read R's approval as one that the commit's parent already holds. R is then not among the rules that the commit includes, and the owner never sees what R lacks.

## new:tools-2-strict — Turning the `strict` flag on

A new node, with the sid s-nxgkp988mej79eg.

**Title:** Turning the `strict` flag on

**Text:**

`sheriff settings` refuses to turn the `strict` flag on (§s-q3pfzyaxvpr2zj2) where a check that the flag makes stricter would refuse a commit or a push that changes nothing, if the specification were approved and the flag were on. The refusal names, for each check that would refuse, the command that lists what that check finds (§s-chsfpkgpmfk4fft). Where no such check would refuse, `sheriff settings` records the entry that turns the flag on (§s-d3nkw9b6mn98vuw).

The checks that the `strict` flag makes stricter, and the cases in which each would refuse such a commit, are the following:
- the check of code and tests outside the commit (§s-3xx2eukc8gtd2tx) that no SpecTag (§s-8xw4mgvpexyvw5q) binds, where `sheriff untagged` would list any code (§s-weuyx98r7c923ab);
- each of the project's own checks (§s-2fau85dfyyeq66m), which the rule that lists it may make stricter (§s-q3pfzyaxvpr2zj2), where it refuses the change when `sheriff validate --strict` runs it (§s-7pk89t8z6wymmj9).

`sheriff settings` records an entry that turns the `strict` flag off without running any check.

**Reason:**

The flag lets the owners make the checks stricter by an act of their own without stopping all work when they do (§s-q3pfzyaxvpr2zj2). Turned on while such a check would refuse a commit that changes nothing, the flag would make every commit fail until that check passed.

**Example:**

The specification is a draft, and no SpecTag binds two functions of an old file. An owner runs `sheriff settings strict on`. `sheriff settings` refuses to turn the flag on and names `sheriff untagged`, which lists those functions. The most likely mistake is to turn the flag on because the specification is a draft. The first commit after the specification is approved is then refused for code that it does not change.

## new:tools-2-extension-off — Withdrawing the choice of an extension

A new node, with the sid s-n4ny597qdv9c9bu.

**Title:** Withdrawing the choice of an extension

**Text:**

`sheriff settings` refuses to record an entry that withdraws the choice of an extension of the guidelines (§s-9ttvcwpqkehm58g, §s-d3nkw9b6mn98vuw) while a node depends on that extension (§s-j8y62pa9hzz6nwx). The refusal names each such node by its file, its sid and its location (§s-kag2m9tzdnduxdx). Where no node depends on the extension, `sheriff settings` records the entry.

A node other than the extension's own nodes depends on the extension where any of the following holds:
- the node's kind is one that the `kinds` of the extension's schema (§s-zefk589ykh37b8u) add;
- the node holds a property that the `fields` of the extension's schema add to the node's kind;
- the node has a link whose type is one of the `linkTypes` of the extension's schema;
- the node has a link that holds a property that the `link` of the extension's schema adds;
- the node has a link to a node in the extension's file.

`sheriff settings` checks each node in the files that the repository keeps, including a node in a cell of a `TableRule` (§s-5fewsp22mmdz7y6). It makes this check regardless of whether the specification is approved or a draft.

**Reason:**

Withdrawn while a node still depends on it, an extension would leave that node relying on rules and definitions that no longer hold in the project (§s-j8y62pa9hzz6nwx). Everything that an extension adds to the specification is either declared in its schema or held in its file, so those two show every node that depends on it.

**Example:**

The project has chosen the RecordType extension, whose name is `recordtype`, and its base specification holds a RecordType. An owner runs `sheriff settings extension recordtype off`. `sheriff settings` refuses and names the RecordType by its file, its sid and its location. The most likely mistake is to look only for links to the extension's nodes, so that a node of a kind that the extension adds goes unnoticed.

## s-7unxytshhc4md54 — Setting a repository up and taking SpecSheriff out of it

**Title:** Setting a repository up and taking SpecSheriff out of it

**Text:**

`sheriff init` sets a repository up for the SpecSheriff tools. With the git hooks, it does the following:
- it writes them into `.githooks/` (§s-4mej6ccn7xu3d3p);
- it stages with the executable mode, 100755, each hook there that holds what it would write and that git's index does not already hold with that mode, naming each one;
- where it cannot stage a hook, it names the hook and says how to stage it as executable;
- it turns the hooks on by setting git's `core.hooksPath` to `.githooks`.

`sheriff init` writes for the agent that the option `--agent` names, `claude` or `codex`, and for `claude` where the option is not given:
- for `claude`, it adds the marketplace and the plugin to `.claude/settings.json` as a project declares them (§s-zh2vcr3xjumppg5), keeping any other key there;
- for `codex`, it writes the agent's hooks for Codex into `.codex/hooks.json` (§s-n76wt2bkqdmh78x), keeping any other hook there.

`sheriff init` refuses any other name of an agent, naming the agents for which it writes.

`sheriff init` has git merge the approvals (§s-v4qus7raqnwzneb) by union. What `sheriff init` does depends on the state that `git check-attr merge specs/_approvals.jsonl` reports for the merge attribute of the approvals:
- where git reports the attribute as unspecified, `sheriff init` appends the line `specs/_approvals.jsonl merge=union` to the `.gitattributes` at the repository's root, and writes that file where it is missing;
- where git reports `union`, `sheriff init` appends nothing;
- where git reports any other state of that attribute, `sheriff init` appends nothing and names that state.

Outside a git repository, `sheriff init` appends the line unless the file already holds it, spacing and line endings aside. The appended line starts a line of its own and ends as the file's lines end.

Where they are missing, `sheriff init` writes these files (§s-zefk589ykh37b8u):
- a `sheriff.config.json` that holds only `code` and `tests`, each an empty list of glob patterns;
- a `specs/_guidelines/project.json` whose top node is a section that names, as the specification's owner (§s-t9j29hppag2nren), the email address set in git's configuration.

That section holds, as a draft, a rule that refines the rule on when the tests must pass (§s-x8uzc8z44pwtd3h). The rule's title is “When the tests run”. Its text is “The tests run on every push.” Its `TextRule.list` (§s-eferktypcj7njt5) lists `push` (§s-b6qdtghnyha3fhk), and the list's `of` is “the moments at which the tests run”.

Where git's configuration sets no email address, `sheriff init` writes no `project.json` and says how to set that address.

`sheriff init` replaces a hook or a declaration that holds what an earlier release of `sheriff init` wrote, and names each. It leaves as it is any other file that differs from what it would write, and names that file. So, run again, `sheriff init` changes nothing (§s-jsqxdx47wkkj7gp).

A hook or a declaration holds what an earlier release wrote where, line endings aside, it equals one of the texts that the earlier releases wrote. The SpecSheriff tools keep those texts.

Where the repository's hooks ran from elsewhere before, from `.git/hooks/` or from another folder that `core.hooksPath` named, `sheriff init` names each hook found there, apart from git's samples. It says that each one no longer runs until it is moved into `.githooks/<hook>.d/` (§s-n4m5zvh96yb299p).

`sheriff remove` takes out of a repository what `sheriff init` writes outside `specs/`, for each agent for which `sheriff init` writes:
- each git hook, the marketplace and the plugin in `.claude/settings.json`, and the agent's hooks for Codex in `.codex/hooks.json`, where each holds what `sheriff init` writes now or wrote in an earlier release;
- each line of the `.gitattributes` at the repository's root that is the line that `sheriff init` appends there, spacing and line endings aside;
- `core.hooksPath`, where it names `.githooks`;
- a key of `.claude/settings.json` or of `.codex/hooks.json` that is left holding nothing, and either file where it is left holding no key;
- `.gitattributes`, where it is left holding nothing but blank lines;
- `.githooks/`, `.claude/` or `.codex/`, where it is left empty;
- `sheriff.config.json`, whatever it holds, including the entries of the settings that only an owner of the specification changes (§s-d3nkw9b6mn98vuw).

`sheriff remove` leaves each hook and declaration that differs from what `sheriff init` writes, and names it. It leaves `specs/` and the bindings file (§s-trwczfskj5zmuft) as they are, and names each of them. It names each folder `.githooks/<hook>.d/` that it leaves, and says that the project's own tools in it (§s-n4m5zvh96yb299p) no longer run.

`sheriff remove` stages nothing. Run again, it changes nothing.

**Reason:**

Taking up the method and taking it out are each one command, so that nobody has to know every file and setting that the SpecSheriff tools need. What `sheriff init` writes reaches every clone through git, so the checks run alike for everyone who works on the project (§s-epaw9sgyaajzn8g). Each command changes only what serves the SpecSheriff tools, and leaves the rest of the repository to the project.

**Example 1:**

A project on Windows runs `sheriff init`. Git there takes no executable mode from a file, so `sheriff init` stages each hook that it wrote with the mode 100755 and names it. The most likely mistake is to make the hooks executable on disk only: git on Windows does not record that mode, so a clone on Linux or macOS runs none of the hooks.

**Example 2:**

Two branches each approve a node, and each appends a line to `specs/_approvals.jsonl`. Since `sheriff init` had git merge that file by union, the merge keeps both lines and puts the line of the branch being merged last. Without the union merge, git raises a conflict there. The most likely mistake is to resolve that conflict by keeping the lines of one branch, which loses the approval made on the other branch.

**Example 3:**

The owner runs `sheriff init` in a new repository. `project.json` then holds a section that names the owner and holds, as a draft, the rule on when the tests run. So the first commit passes the check that every section contains a rule (§s-exxuckgakfxkycp). The most likely mistake is to write the section alone, which that check refuses.

## proposal:s-gb8s9657a65hqmv-g6 — What `sheriff reindex` changes in what an earlier release wrote

A proposal: the complete new wording of the agreed draft `proposal:s-gb8s9657a65hqmv-g3`, the node s-gb8s9657a65hqmv.

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
- `TextRule.list.declaredIn` becomes `TextRule.list.jsonSchema`, and its key `declaration` becomes `pointer`, where it points to any other place in a JSON Schema;
- `TextRule.list.declaredIn` becomes `TextRule.list.valueList`, and its key `declaration` becomes `symbol`, where it names a declaration in code;
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
- where `project.json` then holds no rule that refines the rule on when the tests must pass (§s-x8uzc8z44pwtd3h), the draft rule on when the tests run that `sheriff init` writes (§s-7unxytshhc4md54) is added under its top node;
- the key `writesSpecSheriffGuidelines` is removed from `sheriff.config.json` (§s-zefk589ykh37b8u) before the SpecSheriff tools validate that file;
- in each file that `sheriff.config.json` names as tests of the system's code (§s-hheus6f395ynqvc) or of a project's own check (§s-2fau85dfyyeq66m) or generator (§s-km4x4s26kv7pjze), `@spec ` is inserted before each bare sid.

`sheriff reindex` leaves unchanged a RecordType that holds a field of type `variant`, a field whose values come from the source `domains`, or a field whose own list of values is empty, and names that RecordType and each such field.

Where a node of the specification is of a kind, or holds a link of a type, that an extension of the guidelines (§s-mbmnsnxenmavu3z) adds, and the project has yet to choose that extension (§s-9ttvcwpqkehm58g), `sheriff reindex` names that extension.

`sheriff reindex` names the rule on when the tests run that it adds, since the SpecSheriff tools read that rule only after an owner approves it (§s-t9j29hppag2nren).

A renamed key and a renamed kind of node leave a node's fingerprint (§s-f5brvuuu6xmkj6t) unchanged, so the approval of the node's wording stays in force (§s-v4qus7raqnwzneb).

`sheriff reindex` names each file that it rewrites because an earlier release wrote that file differently, including the files of the specification.

**Reason:**

Each file and each test of a project is written in the form of the release of the SpecSheriff tools that last wrote or read it. A release that writes or reads them differently rewrites them, so that nobody has to rewrite a project by hand and no approval is lost because of a rename.

## proposal:s-7pk89t8z6wymmj9-g6 — How a project's own check is run

A proposal: the complete new wording of the agreed draft `s-7pk89t8z6wymmj9`, the node s-7pk89t8z6wymmj9.

**Title:** How a project's own check is run

**Text:**

Where a check that a project's own guidelines add (§s-2fau85dfyyeq66m) fails, `sheriff validate` refuses the change. Where the rule that lists the check says that the check's failure is only reported, `sheriff validate` reports the failure instead (§s-ujm7nfxkk9j3464). The refusal or the report names the check and shows what the check printed to its standard output and its standard error. Where the check printed nothing, the refusal or the report shows the check's exit status.

`sheriff validate` runs each of the project's own checks with the command that `sheriff.config.json` names for it (§s-zefk589ykh37b8u). The check runs in the directory in which `sheriff validate` runs. On a commit, that directory holds what the commit contains (§s-477gtdrkw34dzxw). On its standard input, the check receives the model of the specification in the form that `sheriff json` prints (§s-w6gybeqn2ttydqx). A check passes only if its process exits with status zero.

In its `TextRule.list` (§s-eferktypcj7njt5), the rule that `sheriff.config.json` names for a check lists the check as a member whose value (§s-5hb9k2e34dgn284) is the check's name. `sheriff validate` reads that rule in its last approved wording (§s-a8fn72xa782wvbk). Where the rule, in that wording, lists no member whose value is the check's name, `sheriff validate` refuses the change. The refusal names the check and the rule, and says that the rule's last approved wording does not list the check.

Where that member is an object whose `onFailure` is `reported`, the rule says that the check's failure is only reported. Where that member's `onFailure` is `reportedUnlessStrict`, `sheriff validate` reports the check's failure while the specification's `strict` flag (§s-q3pfzyaxvpr2zj2) is off, and refuses the change while the flag is on. It reads the flag in the model of the specification that it gives the check.

`sheriff validate` runs the project's own checks only after the files of the specification have passed the check for a key written more than once (§s-7zqsstgnuc772ba) and the validation against their schema (§s-xzcw3hv4hmxz7h7). It runs them before the rest of its checks (§s-pcnyfp7gev7syax). It makes the rest of its checks regardless of what the project's own checks find.

`sheriff validate` refuses the change where one of the project's own checks adds, changes or removes a file in the directory in which the check runs, other than a file that git ignores (§s-vj67ztqkuhxbv7s). The refusal names the check and each such file.

Given the option `--strict`, `sheriff validate` gives each of the project's own checks a model of the specification in which the specification is approved and the specification's `strict` flag is on (§s-qzthyh7yqvfhsa2, §s-q3pfzyaxvpr2zj2). It does so regardless of how the entries in `sheriff.config.json` (§s-zefk589ykh37b8u) set the approval status and the flag. The other checks of `sheriff validate` give the same results with or without the option.

Before `sheriff settings` records an approval of the specification (§s-m59dqwkw2e96wne), it runs the project's own checks (§s-chsfpkgpmfk4fft, §s-qzthyh7yqvfhsa2). It gives them a model in which the specification is approved and the `strict` flag has the value that the entries in `sheriff.config.json` set. Before `sheriff settings` turns the `strict` flag on (§s-nxgkp988mej79eg), it runs the project's own checks as `sheriff validate --strict` runs them.

`sheriff validate` runs the project's own checks regardless of whether the specification is approved or a draft (§s-ujm7nfxkk9j3464).

**Reason:**

Whenever `sheriff validate` makes its checks of the SpecSheriff guidelines, it also runs a project's own checks, on the same files. Such a check therefore binds every participant, rather than depending on whoever remembers to run it (§s-2fau85dfyyeq66m).

**Example 1:**

The rule that lists the project's own checks has `name` as its `TextRule.list.property`, and one of its members is `{"name": "spelling", "onFailure": "reported"}`. The check `spelling` finds a misspelt word in a node's text, prints the node's sid and exits with status 1. `sheriff validate` reports the failure, showing the sid, and the commit passes. The most likely mistake is to refuse the commit because the check's exit status is not zero.

**Example 2:**

The member of the check `spelling` is `{"name": "spelling", "onFailure": "reportedUnlessStrict"}`. While the `strict` flag is off, `sheriff validate` reports each misspelt word, and the commit passes. An owner runs `sheriff settings strict on`, and the check fails when `sheriff validate --strict` runs it, so `sheriff settings` refuses to turn the flag on and names `sheriff validate --strict`. The most likely mistake is to read the flag from the entries in `sheriff.config.json` rather than from the model that the check receives. The flag is then turned on, and the next commit is refused.
