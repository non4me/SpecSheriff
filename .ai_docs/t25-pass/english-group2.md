# T25, group 2: the English of every node

This file holds the final English of every node of group 2 of stage 2 of T25, as `tools-drafts.json` holds it after fix-group2-d.mjs (round d): the drafts of the appendix of the tools, the proposal for rule 10.4 and the proposal for "The list of code that no SpecTag binds".
Each node is given under its key in `tools-drafts.json`: its title, its text, its reason, its list and its examples.
fix-group2-d.mjs writes this file; edit the script, not this file.

## s-vp24dqydygztqbt — The review of a commit

**Title:** The review of a commit

**Text:**

`sheriff review` refuses a commit where the verdict of the independent reviewer (§s-m4h279nbaqkpa3t) refuses it. The refusal lists each finding of the verdict (§s-68ds99w8wd67aae). Where the commit leaves the specification a draft, `sheriff review` disregards each finding on a statement that a rule's implementation needs no change (§s-kgqxg4gunzynwsv). In that case, it refuses the commit only where the verdict lists at least one other finding.

`sheriff review` asks for a verdict only on a commit for which the reviewer must make at least one of the following judgements (§s-epaw9sgyaajzn8g):
- the judgement on the code that the commit adds or changes (§s-rd9nftptjuz6bwv);
- the judgement on each statement in the commit's message that a rule's implementation needs no change (§s-kgqxg4gunzynwsv);
- the judgement on each node of the technical appendix (§s-tj38pvm38nepaf5) that the commit approves and that implements a rule of the base specification (§s-5x737t9nee4zgaa, §s-4bwa4zepd4nwcv8).

Where `sheriff review` asks for a verdict, it gives the reviewer everything that the rule on what the reviewer is given lists for the commit (§s-nyh9yk22ba6g77q). The files generated from the specification, which `sheriff review` leaves out of the commit's change, are the files that `sheriff types` writes (§s-a8fn72xa782wvbk). `sheriff review` tells the reviewer which of those files the commit changes.

**Reason:**

Each run of the reviewer is paid for by the user who commits (§s-tnz9zgqx8c629a7), so `sheriff review` runs the reviewer only on a commit that needs one of the reviewer's judgements.

**Example:**

A commit changes only the wording of a draft rule. It changes no code, its message contains no statement that a rule's implementation needs no change, and it approves no node. So `sheriff review` does not run the reviewer, and the commit passes the review. The most likely mistake is to run the reviewer on every commit, which makes the user who commits pay for a run that has nothing to judge.

## new:tools-7-3-review-code — The judgement on the code that a commit changes

**Title:** The judgement on the code that a commit changes

**Text:**

`sheriff review` refuses a commit where the independent reviewer (§s-m4h279nbaqkpa3t) refuses it for a defect in the code that the commit adds or changes (§s-zn4vrdpnv9bch62). Each finding names the rule that it concerns, the file and the line.

The reviewer judges the changed code on every commit that adds or changes the system's code (§s-hheus6f395ynqvc), including its tests. Besides what `sheriff review` gives the reviewer in every review (§s-vp24dqydygztqbt), it gives the reviewer the changed code other than the files generated from the specification. That code consists of the following, each in full, as the commit leaves it, with its file, its lines and the SpecTags (§s-8xw4mgvpexyvw5q) that bind it:
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

## new:tools-7-3-review-statement — The judgement on a statement that a rule's implementation needs no change

**Title:** The judgement on a statement that a rule's implementation needs no change

**Text:**

`sheriff review` refuses a commit whose message, in the judgement of the independent reviewer (§s-m4h279nbaqkpa3t), falsely states that a rule's implementation needs no change (§s-nudrdn5xvcg262k). Each finding names the rule. `sheriff review` refuses a commit because of such a finding only where the commit leaves the specification approved (§s-qzthyh7yqvfhsa2). Where the commit leaves it a draft, `sheriff review` disregards such a finding silently.

A commit's message states that a rule's implementation needs no change by means of a trailer (§s-7gab4ptjt2khfr5). The reviewer judges the statement about each rule that such a trailer names, whatever the specification's approval status. For each such rule, `sheriff review` gives the reviewer the tests and the code bound to the rule (§s-6fw72j65jkqrfpf) as the commit leaves them, each in full, with its file, its lines and its SpecTags (§s-8xw4mgvpexyvw5q).

**Reason:**

Whether a rule's tests and code fit its wording after the commit can be judged only by reading all of them, including those that the commit leaves as they were.

**Example:**

The specification is approved, and a commit corrects a misspelt word in the text of an approved rule without changing its tests or code. Its message ends with the trailer `Implementation-Needs-No-Change: s-…`, which names the rule. The reviewer is given the rule's wording before the commit and after it, its tests and its code, and finds that they fit the new wording. The commit passes. The most likely mistake is to give the reviewer only the code that the commit changes, and here there is none, so that the statement is judged against nothing.

## new:tools-7-3-review-appendix — The judgement on a node of the technical appendix that a commit approves

**Title:** The judgement on a node of the technical appendix that a commit approves

**Text:**

`sheriff review` refuses a commit that approves a node of the technical appendix (§s-tj38pvm38nepaf5) where the independent reviewer (§s-m4h279nbaqkpa3t) finds that any of the following is true of that node (§s-4p9amamvp2bry7b):
- the node contradicts a rule of the base specification (§s-5x737t9nee4zgaa);
- the node implements a rule of the base specification without refining that rule.

Each finding names the node and the rule of the base specification that the finding concerns. `sheriff review` refuses a commit because of such a finding whatever the specification's approval status (§s-qzthyh7yqvfhsa2).

The reviewer judges each node of the technical appendix for which all of the following hold:
- the commit adds to `specs/_approvals.jsonl` (§s-v4qus7raqnwzneb) an entry that approves the node, whoever made the approval;
- the node has an `implements` link (§s-sn6au3vcr9uy5pm) to a rule of the base specification.

In the rule on what the reviewer is given (§s-nyh9yk22ba6g77q), a top-level section of the base specification means a section whose location (§s-kag2m9tzdnduxdx) consists of the name of a part, a slash and a single number, such as `base/3` or `requests/2`. For a rule that is in no section (§s-qmmzf9nksfsa3qp), the rules in the same top-level section are the other rules of the same part of the base specification that are in no section either.

**Reason:**

An approval names whoever made it only by the email address that git was configured with (§s-v4qus7raqnwzneb). An approval that an agent makes on an owner's behalf (§s-t5uw8zfxzhfdg86) therefore looks the same as the owner's own approval. So the reviewer judges every node of the technical appendix that implements a rule of the base specification, whoever approved it.

**Example:**

An agent that is implementing an approved rule saying that an idle session expires adds a node of the technical appendix that sets the idle limit to 30 minutes. The node has an `implements` link to that rule, and the agent approves it on the owner's behalf. Another rule of the same top-level section keeps a session open while a file is being uploaded, which the node's limit breaks during a long upload. `sheriff review` refuses the commit, naming the node and that rule. The most likely mistake is to give the reviewer only the rule that the node implements, so that the contradiction with the rule on uploads goes unnoticed.

## new:tools-9-no-change-trailer — How a commit message states that a rule's implementation needs no change

**Title:** How a commit message states that a rule's implementation needs no change

**Text:**

A commit's message states that a rule's implementation needs no change (§s-ddd2e96uke4y83j, §s-nudrdn5xvcg262k) with the trailer `Implementation-Needs-No-Change: <sid>`, in which `<sid>` is the sid of that rule. The message contains one such trailer for each rule about which it makes that statement.

The SpecSheriff tools read the trailers of a message as `git interpret-trailers --parse` reads them. They read a trailer as a statement that a rule's implementation needs no change only where its key is spelt exactly `Implementation-Needs-No-Change` and its value is a single sid.

**Reason:**

A trailer is the form that git itself provides for a statement about a commit, so git and other tools read it without parsing the message's prose.

**Example:**

A commit changes the text of an approved rule only to correct a misspelt word. Its message ends with the line `Implementation-Needs-No-Change: s-…`, which names the rule. The most likely mistake is to write the statement in the message's prose, such as “the code needs no change for s-…”, which the SpecSheriff tools do not read as such a statement.

## new:tools-10-section — Who runs the reviewer

**Title:** Who runs the reviewer

**Text:**

How `sheriff review` runs the independent reviewer (§s-m4h279nbaqkpa3t), and how it reads the reviewer's verdict.

## s-xr5xxa9cxf2mq5u — Which runner runs the reviewer

**Title:** Which runner runs the reviewer

**Text:**

`sheriff review` hands everything that the independent reviewer (§s-m4h279nbaqkpa3t) is given (§s-nyh9yk22ba6g77q) to a runner. A runner is an agent's CLI that `sheriff review` starts for each review (§s-avvnasjhsfkgajh). The runner is `claude` (§s-3wh8uhgn9jr2k74) or `codex` (§s-u2n5hwwqkb6zk4z).

`sheriff review` runs the runner that `review.runner` in `sheriff.config.json` names (§s-zefk589ykh37b8u). The default of `review.runner` is the runner of the SpecSheriff plugin whose tools run `sheriff review`. The build of each SpecSheriff plugin writes the file `agent` into the folder of the plugin's SpecSheriff tools. That file names the plugin's runner:
- `claude` for the plugin for Claude Code (§s-zh2vcr3xjumppg5);
- `codex` for the plugin for Codex CLI (§s-2pdy9gw2jrjvfb4).

SpecSheriff tools that have no file `agent` use `claude`.

The project-wide settings of the reviewer in `sheriff.config.json` are `review.runner` and `review.minutes`. `review.minutes` sets the time limit of a run of the reviewer (§s-wgedv32rdaqca9k).

**Reason:**

A user with one agent has no other agent to run, so the default runner is that of the plugin that the user has installed. A project that wants one runner for everyone names it in `review.runner`.

## new:tools-10-verdict — The reviewer's verdict

**Title:** The reviewer's verdict

**Text:**

`sheriff review` refuses a commit on which it asks for a verdict (§s-vp24dqydygztqbt) unless the runner (§s-xr5xxa9cxf2mq5u) gives a verdict that `sheriff review` can read (§s-94k7b6r5kf65udf).

`sheriff review` gives the runner's CLI the schema of the verdict. The runner's CLI answers with a JSON object that conforms to that schema. The verdict passes or refuses the commit. It lists its findings. Each finding names the sids of the nodes that it concerns and the problem. A finding that concerns code also names the file and, where the problem lies at a line, that line. Each finding also names the judgement that it belongs to (§s-vp24dqydygztqbt).

`sheriff review` reads a verdict only from an answer that conforms to the schema of the verdict and either passes the commit with no finding or refuses it with at least one.

**Reason:**

A verdict whose meaning `sheriff review` had to guess, such as a pass that lists a finding, would let `sheriff review` decide the outcome of the commit in place of the independent reviewer (§s-m4h279nbaqkpa3t).

**Example:**

The runner answers with a verdict that passes the commit and lists one finding. That answer is not a verdict that `sheriff review` can read, so `sheriff review` refuses the commit. The most likely mistake is to pass the commit and drop the finding, which means deciding for the reviewer what it meant.

## new:tools-10-start — How a runner is started

**Title:** How a runner is started

**Text:**

`sheriff review` starts a runner (§s-xr5xxa9cxf2mq5u) separately from the session that made the change, so that the runner is given nothing from that session (§s-nyh9yk22ba6g77q). It starts the runner:
- with only the credentials from what its CLI keeps for the user;
- with a system prompt that `sheriff review` writes for it;
- in an empty working directory;
- with its tools turned off, as far as its command-line options allow;
- as a program, never through a shell.

A CLI that npm installs on Windows as a command script is started as the program that the script starts, with the arguments that the script gives it.

The runner's environment holds only the variables that the list of this node allows and, for the runner `codex`, the variable that names its own Codex home (§s-u2n5hwwqkb6zk4z). The variables of the list hold:
- the search path for programs, the folders of the operating system and of the user, and the user's name;
- the locale;
- a proxy, the hosts to reach without it, and the certificates to trust;
- where the runner's CLI keeps its credentials, the credentials themselves, and the provider serving the model.

**Reason:**

Anything that reaches the runner from the session that made the change, such as the user's memory or the repository through git's variables, lets it judge by more than the rules (§s-nyh9yk22ba6g77q). A shell between `sheriff review` and the runner would read the runner's arguments, such as the schema of the verdict, by its own syntax and could change them.

**List of:**

the variables that a runner's environment may hold, each matched regardless of case, where a name that ends in `*` matches every name that begins with what comes before the `*`

**Example:**

Claude Code sets `CLAUDECODE` for its session, and git sets `GIT_DIR` to the repository for each hook it runs. Neither variable is in the list, so neither reaches the runner. The runner therefore cannot read the repository through `GIT_DIR` from its empty working directory. The most likely mistake is to remove only the variables on a list of known ones, which misses each variable that a new release of an agent adds.

## new:tools-10-limit — The time limit of a run

**Title:** The time limit of a run

**Text:**

`sheriff review` ends a run of the independent reviewer (§s-m4h279nbaqkpa3t) that is still running after the number of minutes that `review.minutes` in `sheriff.config.json` specifies (§s-zefk589ykh37b8u). The default of `review.minutes` is twenty. `sheriff review` ends the run together with every process that the runner (§s-xr5xxa9cxf2mq5u) has started, directly or through another process.

**Reason:**

A run of the reviewer that hangs, together with the processes it has started, keeps running at the expense of the user who commits until it is ended. The default time limit is long, so that it ends a run that hangs rather than one that reads a large change.

## new:tools-10-claude — The runner `claude`

**Title:** The runner `claude`

**Text:**

The runner `claude` (§s-xr5xxa9cxf2mq5u) is the Claude Code CLI in print mode. It runs with its session not kept. It requests the model and the reasoning effort that the settings of the runner specify (§s-tnz9zgqx8c629a7). Where that model is overloaded or unavailable, it falls back to the fallback model that those settings specify.

**Reason:**

In print mode, the CLI answers once and exits, with no session that could carry an earlier conversation into the review (§s-m4h279nbaqkpa3t).

## new:tools-10-codex — The runner `codex`

**Title:** The runner `codex`

**Text:**

The runner `codex` (§s-xr5xxa9cxf2mq5u) is the Codex CLI run as `codex exec`, with a Codex home of its own. That home is created in a temporary directory for the run and deleted after it. It holds only a copy of the user's credentials.

The runner `codex` runs with:
- its sandbox read-only;
- its session not kept;
- no skill offered.

The runner `codex` requests the model and the reasoning effort that the settings of the runner specify (§s-tnz9zgqx8c629a7).

**Reason:**

Codex offers no way to run without its own home directory and tools, so the runner restricts both.

**Example:**

`sheriff review` makes a temporary directory, copies the user's `auth.json` into it, and starts `codex exec` with `CODEX_HOME` set to that directory, so the user's own configuration and skills stay out of the run. The most likely mistake is to leave `CODEX_HOME` at the user's own Codex home, which brings that configuration and those skills into the review.

## new:tools-10-settings — The settings of each runner

**Title:** The settings of each runner

**Text:**

`sheriff review` reads the settings of each runner (§s-xr5xxa9cxf2mq5u) from the git configuration of the user who commits:
- `specsheriff.review.claudeModel`, `specsheriff.review.claudeFallbackModel` and `specsheriff.review.claudeEffort`, for the runner `claude` (§s-3wh8uhgn9jr2k74);
- `specsheriff.review.codexModel` and `specsheriff.review.codexEffort`, for the runner `codex` (§s-u2n5hwwqkb6zk4z).

`sheriff review` takes the model and the reasoning effort only from these settings and their defaults. Where a setting is empty, the runner leaves the choice of the setting's value to its CLI. An empty `specsheriff.review.codexModel`, for example, means the model that Codex chooses for the signed-in account.

A setting that the user's git configuration holds, empty or not, counts as confirmed. The agent's hooks (§s-477gtdrkw34dzxw) and the skills of each SpecSheriff plugin (§s-zh2vcr3xjumppg5, §s-2pdy9gw2jrjvfb4) ask only for a setting that this configuration lacks. They write a setting into a user's git configuration only with the value that this user gives in reply. Where the user answers with the default, they write it like any other value.

The defaults are:
- for the runner `claude`, the model `opus` at the reasoning effort `high`, with `sonnet` as the fallback model;
- for the runner `codex`, the model that Codex chooses, at the reasoning effort `high`.

Where the user's git configuration lacks a setting of the runner in use, `sheriff review` takes that setting's default. In every review (§s-m4h279nbaqkpa3t) that runs with a default setting, `sheriff review` names each setting whose default it took, and says how the user confirms that setting.

**Reason:**

A run of the reviewer (§s-m4h279nbaqkpa3t) is paid for by the user who commits, from their own account. So that user alone controls the models and the reasoning efforts that the reviewer runs with.

**Example:**

A user confirms `specsheriff.review.claudeModel` once with `git config --global`. From then on, every review made with the runner `claude` on that machine runs with that model, including after the plugin is updated, or removed and installed again. The most likely mistake is to keep the model in `sheriff.config.json`, which every clone shares, so that everyone who commits pays for one person's choice.

## new:tools-8-section — SpecTags in the code and the tests

**Title:** SpecTags in the code and the tests

**Text:**

How the system's code (§s-hheus6f395ynqvc) and its tests carry SpecTags (§s-8xw4mgvpexyvw5q), and how the SpecSheriff tools read them.

## s-5z5gnu7pahr82xp — The form of a SpecTag

**Title:** The form of a SpecTag

**Text:**

A SpecTag (§s-8xw4mgvpexyvw5q) is written in one of these forms:
- `@spec <sid>`, where `<sid>` is the sid of a rule that the code carrying the SpecTag implements, or that the test carrying it is written from (§s-sfjka4zc4rhfu67);
- `@spec none`, followed by a space and a statement of what the technology that the system is built with requires of the code that carries the SpecTag (§s-2jcmb9xe9d64t2t).

The rule that a SpecTag `@spec <sid>` names is a node of one of these kinds, including one in a cell of a `TableRule`:
- `TextRule`;
- `TableRule` (§s-5fewsp22mmdz7y6);
- `RecordType` (§s-ktfstpv8rurznrp);
- a project's own kind whose nodes require an implementation in code (§s-vsh384ybt4w25a2).

Code that implements several rules carries a SpecTag for each of them. Code that implements no rule carries `@spec none` as its only SpecTag. A test carries a SpecTag only in the form `@spec <sid>` (§s-nrjxfvpkq3m8hzm).

**Reason:**

Fixed forms, each opening with `@spec`, let the SpecSheriff tools find every SpecTag by its text, in a file in any language. What follows `@spec none` says why the code needs no rule, so that whoever reads the code can tell whether it is technical code (§s-2jcmb9xe9d64t2t).

**Example:**

A function that a web framework calls to register routes, and that holds none of the system's logic, carries `@spec none the web framework requires a function that registers routes`. The most likely mistake is `@spec none helper`, which does not say what the technology requires of the code.

## new:tools-8-symbol — How a symbol carries its SpecTags

**Title:** How a symbol carries its SpecTags

**Text:**

In a file whose language is described in the folder `languages/` of the SpecSheriff tools, the SpecTags (§s-5z5gnu7pahr82xp) of a symbol (§s-kgbzk2ph9e6jfb4) are lines of the comment directly above the symbol, above its decorators where it has any. That comment is:
- in TypeScript and JavaScript, the symbol's doc comment;
- in Python, one or more comment lines.

Only the delimiters of the comment may share a SpecTag's line.

Where the first of a run of re-exports, with no blank line between them, carries `@spec none`, that SpecTag also binds each later re-export of the run that carries no SpecTag of its own.

The SpecSheriff tools find the symbol that a SpecTag is above by parsing the file with tree-sitter and the grammar of the file's language. They parse each file on its own, with the parser alone and no type checker.

The description of each language names what counts in that language as a symbol and as a test. TypeScript, JavaScript and Python are described.

**Reason:**

A SpecTag sits where a reader of the symbol's code already looks. There, a parser, unlike a scan of the text, tells which symbol the SpecTag binds, the same way for the same file every time.

**Example:**

In TypeScript, `/** @spec s-… */` directly above `export function close()` binds the function and every symbol nested in it. The most likely mistake is a blank line between the comment and the function: the SpecTag is then directly above no symbol and binds nothing.

## new:tools-8-file-start — SpecTags at the start of a file

**Title:** SpecTags at the start of a file

**Text:**

A file of the system's code (§s-hheus6f395ynqvc) other than tests carries its SpecTags (§s-5z5gnu7pahr82xp) at its start (§s-kgbzk2ph9e6jfb4) where all of the following hold:
- the SpecSheriff tools cannot identify the file's symbols, because no description covers its language (§s-33fw3ga4ctd94dq);
- the file's format allows comments (§s-trwczfskj5zmuft).

The SpecTags at the start of a file are on the lines that come before the first of its lines that holds a letter or a digit outside a SpecTag. The file's first line is not counted where it opens with `#!` or `<?`, so that a shebang or a declaration that the format requires to come first, such as an XML declaration, may come before them.

In a file bound by SpecTags at its start, the text that follows `@spec none` runs to the end of its line, excluding any characters at its end that are neither letters nor digits.

**Reason:**

The lines before a file's content can be identified in any language without parsing. So the SpecTags of a file that the SpecSheriff tools cannot parse are kept there.

**Example:**

A stylesheet starts with `/* @spec s-… */`, followed by the stylesheet's content. An XML file starts with its declaration, `<?xml version="1.0"?>`, followed by `<!-- @spec s-… -->`. The most likely mistake is to put the SpecTag after a licence comment at the start of the file. The words of the licence then come first, and the SpecTag binds nothing.

## new:tools-8-bindings — The bindings file

**Title:** The bindings file

**Text:**

`sheriff binding` accepts an entry in the bindings file (§s-kgbzk2ph9e6jfb4), `sheriff.bindings.json` (§s-zefk589ykh37b8u), only where the entry's path names a file that the commit leaves in the repository (§s-ffkv5qnqvet7bga). At every commit, whether the specification is approved or a draft, it refuses any other entry, naming its path.

The bindings file holds a JSON object. Each key of the object is the path of a file relative to the root of the repository, with forward slashes. The value of each key is the list of the SpecTags (§s-5z5gnu7pahr82xp) of that file, each a string. The SpecSheriff tools refuse a `sheriff.bindings.json` that is not valid JSON or does not hold an object of this form.

The SpecSheriff tools treat a file's format as allowing no comments where the file's name ends in `.json`, or where the file matches the glob patterns that the project's own guidelines (§s-u7tw6m8npxmv5tu) list for such formats.

**Reason:**

An entry keeps the path it names when its file is moved or renamed. So only a check of every entry against the repository shows that a file has lost its SpecTags.

**Example:**

`src/ui/texts.json` holds the texts that a user interface shows, and the bindings file holds the entry `"src/ui/texts.json": ["@spec s-…"]`. The most likely mistake is to rename the file to `src/ui/labels.json` and leave the entry as it was. `sheriff binding` then refuses the entry, and the renamed file carries no SpecTag.

## s-zrsc6asgmhv8tnc — How a test declares the rule it is written from

**Title:** How a test declares the rule it is written from

**Text:**

A test declares the SpecTag (§s-5z5gnu7pahr82xp) of the rule it is written from (§s-nrjxfvpkq3m8hzm):
- in TypeScript and JavaScript, by starting its name with the SpecTag, as in `test("@spec s-… what it checks", …)`;
- in Python, by a mark on the test, `@pytest.mark.spec("@spec s-…")`;
- in any other language, as the description of that language says (§s-33fw3ga4ctd94dq).

A test declares one SpecTag.

The SpecSheriff tools' plugin for pytest, `pytest-specsheriff`, registers the mark. It puts the test's SpecTag at the start of the name that a run reports for the test.

Where the mark holds anything other than one SpecTag `@spec <sid>`, the plugin stops the run with an error that names the test. Where the mark holds a bare sid (§s-gb8s9657a65hqmv), the error also names `sheriff reindex`, which writes the SpecTag.

**Reason:**

A test run reports each test by its name, so the SpecTag is placed where that report shows it.

**Example:**

In TypeScript, `test("@spec s-… refuses an empty name", …)` declares the SpecTag of the rule it is written from. The most likely mistake is to put the SpecTag only in the name of the `describe` block that holds the tests. That block is not a test, so no test in it declares a SpecTag.

## s-9rtrj24myzjvshu — SpecTags on the system's code other than tests

**Title:** SpecTags on the system's code other than tests

**Text:**

`sheriff binding` refuses each of the following that the commit adds or changes (§s-2x58az67bm6cxq2) in the system's code (§s-hheus6f395ynqvc), other than tests, or in the bindings file (§s-trwczfskj5zmuft), whether the specification is approved or a draft (§s-k6dzuajejrw4cej):
- a symbol (§s-kgbzk2ph9e6jfb4) that no SpecTag (§s-5z5gnu7pahr82xp) binds;
- a file that is to be bound as a whole (§s-5qdjyf6t898rsd4, §s-trwczfskj5zmuft) and that no SpecTag binds;
- in a file whose language a description covers (§s-33fw3ga4ctd94dq), a SpecTag in any comment other than the one directly above a symbol;
- in such a file, a SpecTag that shares its line with anything other than the comment's delimiters;
- in a file to be bound by SpecTags at its start (§s-5qdjyf6t898rsd4), a SpecTag on a line after that start;
- where a SpecTag may be placed, text that begins with `@spec` but matches none of the forms of a SpecTag (§s-5z5gnu7pahr82xp), such as `@spec none` with no text after it;
- an entry in the bindings file (§s-trwczfskj5zmuft) for a file that is not part of the system's code other than tests, or whose format allows comments;
- a SpecTag whose sid names a node of the model of the specification (§s-w6gybeqn2ttydqx) that is not a rule (§s-5z5gnu7pahr82xp);
- a SpecTag on code that carries `@spec none` together with another SpecTag.

The refusal names the file and, where it concerns a symbol or a line, that symbol or line.

A SpecTag or an entry of a kind that this list refuses binds nothing. Code that the commit leaves unchanged and that no SpecTag binds is handled by the check of code and tests outside the commit (§s-3xx2eukc8gtd2tx).

**Reason:**

A SpecTag that cannot be attached to one symbol or one file, or that names a node that no code can implement, binds nothing. The code that it is meant to bind is then as unbound as code with no SpecTag.

**Example:**

A commit adds a function that carries `/** @spec s-… */`, whose sid is that of the section that holds the rules that the function implements. `sheriff binding` refuses the SpecTag, since a section requires nothing that code could implement. The most likely mistake is to accept the SpecTag because its node exists, which leaves the function bound to no rule.

## new:tools-7-2-no-node — A SpecTag that names no node

**Title:** A SpecTag that names no node

**Text:**

`sheriff binding` accepts a SpecTag `@spec <sid>` (§s-5z5gnu7pahr82xp) only where its sid names a node of the model of the specification (§s-w6gybeqn2ttydqx) as the commit leaves it. It checks each such SpecTag in the system's code (§s-hheus6f395ynqvc), including the tests, and in the bindings file (§s-trwczfskj5zmuft). It refuses a SpecTag whose sid names no node of that model, naming the file, the line and the sid (§s-w4g56n2bs753rt3).

`sheriff binding` refuses a SpecTag whose sid names no node at every commit, whether or not:
- the commit changes the code or the test that the SpecTag is meant to bind;
- the specification is approved.

**Reason:**

Once a node is removed, every SpecTag that names it binds its code or test to nothing, wherever that SpecTag is placed.

**Example:**

A rule is removed, while a function elsewhere still carries its SpecTag. The commit that removes the rule changes no code, and `sheriff binding` refuses the SpecTag on the function. The most likely mistake is to look up only the SpecTags on code that the commit changes, which lets the SpecTag pass until someone edits the function.

## new:tools-7-2-outside — Code and tests outside the commit that no SpecTag binds

**Title:** Code and tests outside the commit that no SpecTag binds

**Text:**

`sheriff binding` treats each of the following that the commit leaves unchanged (§s-2x58az67bm6cxq2) as the rule on code and tests without a SpecTag (§s-5z5gnu7pahr82xp) requires (§s-kkbqcb9xrpaepwn):
- in the system's code (§s-hheus6f395ynqvc) other than tests, a symbol (§s-kgbzk2ph9e6jfb4) or a file to be bound as a whole (§s-5qdjyf6t898rsd4, §s-trwczfskj5zmuft) that no SpecTag binds (§s-9rtrj24myzjvshu);
- a test of the system's code that declares no SpecTag (§s-zrsc6asgmhv8tnc), or whose SpecTag names a node that is not a rule (§s-utf4mbt7ref8g9c).

`sheriff binding` takes the specification's approval status and its `strict` flag as the commit leaves them (§s-qzthyh7yqvfhsa2, §s-q3pfzyaxvpr2zj2).

**Reason:**

The approval status and the `strict` flag decide what code without a SpecTag outside the commit costs the commit: nothing, a warning or a refusal. The commit itself may change either of them.

**Example:**

A commit adds the entry that approves the specification while its `strict` flag is off, and old code elsewhere carries no SpecTag. The commit is judged against the specification as the commit leaves it, approved, so the commit passes with the warning. The most likely mistake is to judge the commit by the status before it, a draft, which lets the commit that approves the specification pass without the warning.

## s-utf4mbt7ref8g9c — The SpecTags the tests carry

**Title:** The SpecTags the tests carry

**Text:**

`sheriff binding` refuses each of the following tests of the system's code (§s-hheus6f395ynqvc), whether the specification is approved or a draft:
- a test that the commit adds or changes (§s-2x58az67bm6cxq2) and that declares no SpecTag (§s-5z5gnu7pahr82xp) in the place set for the test's language (§s-zrsc6asgmhv8tnc, §s-ay6wntm2dxcgpnp);
- a test that the commit adds or changes and whose SpecTag names a node of the model of the specification (§s-w6gybeqn2ttydqx) that is not a rule (§s-5z5gnu7pahr82xp).

Each refusal names the test, its file and its line.

A test whose name or mark holds a bare sid (§s-gb8s9657a65hqmv) declares no SpecTag. The refusal of such a test names `sheriff reindex`, which writes the SpecTag.

`sheriff binding` reads the tests in each file that the glob patterns for tests in `sheriff.config.json` match, where a description covers the file's language (§s-33fw3ga4ctd94dq). For a test that the commit leaves unchanged and that declares no SpecTag, or whose SpecTag names a node that is not a rule, the check of code and tests outside the commit applies instead (§s-3xx2eukc8gtd2tx).

**Reason:**

A test counts toward the rule that its SpecTag names when the SpecSheriff tools judge whether that rule is implemented (§s-6fw72j65jkqrfpf). A test with no SpecTag, or with one that names a section or a term, counts toward no rule.

**Example:**

A commit adds a test that opens its name with `@spec s-…`, where the sid is that of the term `request`. `sheriff binding` refuses the test, since a term is not a rule. The most likely mistake is to accept the test because the term exists.

## new:tools-7-2-rule-test — A test for each rule whose code a commit changes

**Title:** A test for each rule whose code a commit changes

**Text:**

`sheriff binding` accepts a commit that adds or changes code bound to a rule (§s-kgbzk2ph9e6jfb4, §s-5z5gnu7pahr82xp) only where a test of the system's code (§s-hheus6f395ynqvc) declares that rule's SpecTag (§s-zrsc6asgmhv8tnc, §s-m82tz4mp3f9r3fg). It refuses any commit that does not meet this condition, naming the rule by its file, its sid and its location (§s-kag2m9tzdnduxdx).

In this check, the code means the symbols (§s-kgbzk2ph9e6jfb4) and the files bound as a whole (§s-5qdjyf6t898rsd4, §s-trwczfskj5zmuft) that the commit adds or changes (§s-2x58az67bm6cxq2), other than tests. A rule is bound to such code where one of the code's SpecTags names the rule.

In this check, `sheriff binding` takes into account each test as the commit leaves it, including:
- a test that the commit leaves unchanged;
- a test marked as skipped or as expected to fail.

`sheriff binding` runs this check whether the specification is approved or a draft.

**Reason:**

A rule's test is written before its code (§s-rah8b37kytb682y). So code added or changed for a rule that no test names was written before the rule's test, or without one.

**Example:**

A commit adds a function whose SpecTag names a rule, and no test in the repository declares that rule's SpecTag. `sheriff binding` refuses the commit and names the rule. The most likely mistake is to look for the test only among the tests that the commit changes, in which case `sheriff binding` refuses a commit whose test was committed earlier.

## proposal:s-nyh9yk22ba6g77q — What the reviewer is given

**Title:** What the reviewer is given

**Text:**

The SpecSheriff tools give the independent reviewer (§s-m4h279nbaqkpa3t) of a commit the following:
- the commit's message;
- the commit's change, excluding the files generated from the specification;
- the wording of each rule or term (§s-khqsmy6mhejkrhg) that the commit's message names;
- the wording of each rule that a SpecTag (§s-8xw4mgvpexyvw5q) binds to code or a test that the commit adds or changes;
- for each rule whose implementation, according to the commit's message, needs no change: the rule's wording as it was before the commit and as it is after it, and the tests and the code bound to the rule, directly or through a chain of `implements` links (§s-sn6au3vcr9uy5pm), as they are after it;
- for each node of the technical appendix (§s-qmmzf9nksfsa3qp) that is approved in the commit and has an `implements` link to a rule of the base specification (§s-5x737t9nee4zgaa):
  - the node's wording;
  - the wording of each rule of the base specification that the node implements, that has a link to or from such a rule, or that is in the same top-level section of the base specification as such a rule.

In this rule, a node's wording is its title, its text, its reason, its examples and the fields its kind adds, as an approval covers them (§s-5ah25f6gy99panq).

The SpecSheriff tools give the reviewer nothing from the session in which the change was made. They tell the reviewer that each file left out of the change is generated from the specification. The reviewer treats what a rule requires of generated code as implemented by that code.

**Reason:**

The reviewer makes the judgements that no deterministic check can make: whether code does only what its rules say, whether a rule's implementation really needs no change, and whether an approved node of the technical appendix agrees with the base specification. It can judge only from what it is shown. Shown what each judgement needs, and nothing of what the author of the change meant, it judges by the rules alone.

## proposal:s-weuyx98r7c923ab — The list of code that no SpecTag binds

**Title:** The list of code that no SpecTag binds

**Text:**

`sheriff untagged` lists, by file and symbol, the system's code (§s-hheus6f395ynqvc) that no SpecTag (§s-8xw4mgvpexyvw5q) binds (§s-3xx2eukc8gtd2tx), including the tests. The check for code without a SpecTag names this command in its warning and in its refusal (§s-kkbqcb9xrpaepwn).

**Reason:**

The check for code without a SpecTag covers all such code in one warning, so that the warning does not bury the other findings (§s-kkbqcb9xrpaepwn). `sheriff untagged` lists that code symbol by symbol for whoever has to bind each symbol to the rules it implements.

**Example:**

An old function carries the SpecTag `@spec s-…`, which names a section, and no other SpecTag. `sheriff untagged` lists the function with its file, since that SpecTag binds nothing. The most likely mistake is to list only code that carries no SpecTag at all, so that the function is missing from the list that the warning points to.
