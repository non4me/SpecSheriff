# T25, group 2, round b: the sentences written in the author's own words

Each sentence below is in the English of a node after round b, is not in that node's English after round a (with only the coordinator's rulings on recurring phrases applied), and is not word for word in any of review-g2-a.md to review-g2-e.md. So it is the author's own wording: a fix from EngStickler's readers, a fix made to carry out a ruling, or a fix that a review described without giving its English. The proposal for rule 1.6.1 is compared with the agreed node in newform.json. fix-group2-b.mjs writes this file.

## s-vp24dqydygztqbt — The review of a commit

- The files generated from the specification, which `sheriff review` leaves out of the commit's change, are the files that `sheriff types` writes (§s-a8fn72xa782wvbk).
- It tells the reviewer which of those files the commit changes.
- Each run of the reviewer is paid for by the user who commits (§s-tnz9zgqx8c629a7), so `sheriff review` runs it only on a commit that needs one of its judgements.
- It changes no code, its message contains no statement that a rule's implementation needs no change, and it approves no node.
- So `sheriff review` does not run the reviewer, and the commit passes the review.

## new:tools-7-3-review-code — The judgement on the code that a commit changes

- `sheriff review` refuses a commit in which the independent reviewer (§s-m4h279nbaqkpa3t) finds that the changed code does something that none of its rules states, or leaves out something that they require (§s-zn4vrdpnv9bch62).
- Each finding names the rule that it concerns, the file and the line.
- That is each of the following, in full as the commit leaves it, with its file, its lines and the SpecTags (§s-8xw4mgvpexyvw5q) that bind it:
- each file that the commit adds or changes and that is bound as a whole;
- each test that the commit adds or changes.
- the changed code other than tests leaves out something required by a rule that a SpecTag on that code names, or that the commit's message names other than in an `Implementation-Needs-No-Change` trailer (§s-7gab4ptjt2khfr5);
- a changed symbol or file carries `@spec none` (§s-5z5gnu7pahr82xp), but implements the system's logic (§s-2jcmb9xe9d64t2t);
- a changed symbol or file carries `@spec none` whose text does not say what the technology that the system is built with requires of it (§s-5z5gnu7pahr82xp).
- A finding on code that carries `@spec none` names the rule on how code is bound to its rules (§s-kgbzk2ph9e6jfb4) as the rule that it concerns.
- Whether the code does only what that rule says, including in the unchanged lines around a change, can be judged only by reading it.
- The reviewer is given the whole function and finds that no rule its SpecTag names says anything about the email.
- The most likely mistake is to give the reviewer only the changed line, so that the email goes unnoticed.

## new:tools-7-3-review-statement — The judgement on a statement that a rule's implementation needs no change

- `sheriff review` refuses a commit whose message, in the judgement of the independent reviewer (§s-m4h279nbaqkpa3t), falsely states that a rule's implementation needs no change (§s-nudrdn5xvcg262k).
- A commit's message states that a rule's implementation needs no change by means of a trailer (§s-7gab4ptjt2khfr5).
- The reviewer makes this judgement for each rule that such a trailer names, only where the commit leaves the specification approved (§s-qzthyh7yqvfhsa2).
- For each such rule, `sheriff review` gives the reviewer the tests and the code bound to the rule (§s-6fw72j65jkqrfpf) as the commit leaves them, each in full, with its file, its lines and its SpecTags (§s-8xw4mgvpexyvw5q).
- Whether a rule's tests and code fit its wording after the commit can be judged only by reading all of them, including those that the commit leaves as they were.
- The specification is approved, and a commit corrects a misspelt word in the text of an approved rule without changing its tests or code.
- The reviewer is given the rule's wording before the commit and after it, its tests and its code, and finds that they fit the new wording.
- The most likely mistake is to give the reviewer only the code that the commit changes, and here there is none, so that the statement is judged against nothing.

## new:tools-7-3-review-appendix — The judgement on a node of the technical appendix that a commit approves

- The judgement on a node of the technical appendix that a commit approves
- `sheriff review` refuses a commit that approves a node of the technical appendix (§s-tj38pvm38nepaf5) where the independent reviewer (§s-m4h279nbaqkpa3t) finds that any of the following is true of that node (§s-4p9amamvp2bry7b):
- the node contradicts a rule of the base specification (§s-5x737t9nee4zgaa);
- the node implements a rule of the base specification without refining that rule.
- A top-level section of the base specification, in the rule on what the reviewer is given (§s-nyh9yk22ba6g77q), is a section whose location (§s-kag2m9tzdnduxdx) is the name of a part, a slash and a single number, such as `base/3` or `requests/2`.
- For a rule that is in no section (§s-qmmzf9nksfsa3qp), the top-level section is the whole part of the base specification that the rule is in.
- An approval that an agent makes on an owner's behalf (§s-t5uw8zfxzhfdg86) therefore looks the same as the owner's own approval.
- So the reviewer judges every node that this judgement covers, whoever approved it.
- An agent that is implementing an approved rule saying that an idle session expires adds a node of the technical appendix that sets the idle limit to 30 minutes.
- The most likely mistake is to give the reviewer only the rule that the node implements, so that the contradiction with the rule on uploads goes unnoticed.

## new:tools-9-no-change-trailer — How a commit message states that a rule's implementation needs no change

- A commit's message states that a rule's implementation needs no change (§s-ddd2e96uke4y83j, §s-nudrdn5xvcg262k) with the trailer `Implementation-Needs-No-Change: <sid>`, in which `<sid>` is the sid of that rule.
- The message contains one such trailer for each rule about which it makes that statement.
- A trailer is the form that git itself provides for a statement about a commit, so git and other tools read it without parsing the message's prose.
- The most likely mistake is to write the statement in the message's prose, such as "the code needs no change for s-…", which the SpecSheriff tools do not read as such a statement.

## s-xr5xxa9cxf2mq5u — Which runner runs the reviewer

- SpecSheriff tools that have no such file use `claude`.
- A user with one agent has no other agent to run, so the default runner is that of the plugin that the user has installed.
- A project that wants one runner for everyone names it in `review.runner`.

## new:tools-10-verdict — The reviewer's verdict

- The most likely mistake is to pass the commit and drop the finding, which means deciding for the reviewer what it meant.

## new:tools-10-start — How a runner is started

- `sheriff review` starts a runner (§s-xr5xxa9cxf2mq5u) separately from the session that made the change, so that the runner is given nothing from that session (§s-nyh9yk22ba6g77q).
- with every tool turned off that its command-line options can turn off;
- The variables of the list hold:
- the search path for programs, the folders of the operating system and of the user, and the user's name;
- a proxy, the hosts to reach without it, and the certificates to trust;
- where the runner's CLI keeps its credentials, the credentials themselves, and the provider serving the model.
- the variables that a runner's environment may hold, each matched regardless of case, where a name that ends in `*` matches every name that begins with what comes before the `*`

## new:tools-10-limit — The time limit of a run

- `sheriff review` ends a run of the independent reviewer (§s-m4h279nbaqkpa3t) that is still running after the number of minutes that `review.minutes` in `sheriff.config.json` specifies (§s-zefk589ykh37b8u).
- A run of the reviewer that hangs, together with the processes it has started, keeps running at the expense of the user who commits until it is ended.

## new:tools-10-claude — The runner `claude`

- The runner `claude` (§s-xr5xxa9cxf2mq5u) is the Claude Code CLI in print mode.
- It requests the model and the reasoning effort that the settings of the runner specify (§s-tnz9zgqx8c629a7).
- Where that model is overloaded or unavailable, it falls back to the fallback model that those settings specify.
- In print mode, the CLI answers once and exits, with no session that could carry an earlier conversation into the review (§s-m4h279nbaqkpa3t).

## new:tools-10-codex — The runner `codex`

- The runner `codex` (§s-xr5xxa9cxf2mq5u) is the Codex CLI run as `codex exec`, with a Codex home of its own.
- That home is created in a temporary directory for the run and deleted after it.
- It holds only a copy of the user's credentials.
- It requests the model and the reasoning effort that the settings of the runner specify (§s-tnz9zgqx8c629a7).
- Where `specsheriff.review.codexModel` is empty, it requests no model.
- Codex offers no run without its own home and tools, so the runner restricts both: the home holds only the credentials, and the sandbox lets no tool write anything.

## new:tools-10-settings — The settings of each runner

- `sheriff review` reads the settings of each runner (§s-xr5xxa9cxf2mq5u) from the git configuration of the user who commits:
- `sheriff review` takes the model and the reasoning effort only from these settings and their defaults.
- An empty `specsheriff.review.codexModel` means the model that Codex chooses for the signed-in account.
- A setting that the configuration holds, empty or not, counts as confirmed.
- The agent's hooks (§s-477gtdrkw34dzxw) and the skills of each SpecSheriff plugin ask only for a setting that the configuration lacks.
- They write a setting only with the value that the user whose configuration it is gives in answer.
- The nodes on the session start (§s-477gtdrkw34dzxw) and on the skill `spec-init` (§s-zh2vcr3xjumppg5, §s-2pdy9gw2jrjvfb4) say when each setting is asked for.
- for the runner `claude`, the model `opus` at the reasoning effort `high`, with `sonnet` as the fallback model;
- Where the configuration lacks a setting of the runner in use, `sheriff review` takes that setting's default.
- In every review (§s-m4h279nbaqkpa3t) that runs with a default setting, `sheriff review` names each setting whose default it took, and says how the user confirms that setting.
- A run of the reviewer (§s-m4h279nbaqkpa3t) is paid for by the user who commits, from their own account.
- So it runs with the models and the reasoning efforts that this user has confirmed on their machine.
- Until the user confirms them, each review tells the user which settings it ran with.
- From then on, every review that the runner `claude` makes on that machine runs with that model, including after the plugin is updated, or removed and installed again.

## s-5z5gnu7pahr82xp — The form of a SpecTag

- `@spec <sid>`, where `<sid>` is the sid of a rule that the code carrying the SpecTag implements, or that the test carrying it is written from (§s-sfjka4zc4rhfu67);
- `@spec none`, followed by a space and a statement of what the technology that the system is built with requires of the code that carries the SpecTag (§s-2jcmb9xe9d64t2t).
- A function that a web framework calls to register routes, and that holds none of the system's logic, carries `@spec none the web framework requires a function that registers routes`.
- The most likely mistake is `@spec none helper`, which does not say what the technology requires of the code.

## new:tools-8-symbol — How a symbol carries its SpecTags

- In a file whose language is described in the folder `languages/` of the SpecSheriff tools, the SpecTags (§s-5z5gnu7pahr82xp) of a symbol (§s-kgbzk2ph9e6jfb4) are lines of the comment directly above the symbol, above its decorators where it has any.
- Where the first of a run of re-exports, with no blank line between them, carries `@spec none`, that SpecTag also binds each later re-export of the run that carries no SpecTag of its own.
- The description of each language names what counts in that language as a symbol and as a test.
- A SpecTag sits where a reader of the symbol's code already looks.
- There, a parser, unlike a scan of the text, tells which symbol the SpecTag binds, the same way for the same file every time.
- The most likely mistake is a blank line between the comment and the function: the SpecTag is then directly above no symbol and binds nothing.

## new:tools-8-file-start — SpecTags at the start of a file

- A file of the system's code (§s-hheus6f395ynqvc) other than tests carries its SpecTags (§s-5z5gnu7pahr82xp) at its start (§s-kgbzk2ph9e6jfb4) where all of the following hold:
- The SpecTags at the start of a file are on the lines that come before the first of its lines that holds a letter or a digit outside a SpecTag.
- The file's first line is not counted where it opens with `#!` or `<?`, so that a shebang or a declaration that the format requires to come first, such as an XML declaration, may come before them.
- In a file bound by SpecTags at its start, the text that follows `@spec none` runs to the end of its line, excluding any characters at its end that are neither letters nor digits.
- The lines before a file's content can be identified in any language without parsing.
- A stylesheet starts with `/* @spec s-… */`, followed by the stylesheet's content.

## new:tools-8-bindings — The bindings file

- `sheriff binding` accepts an entry in the bindings file (§s-kgbzk2ph9e6jfb4), `sheriff.bindings.json` (§s-zefk589ykh37b8u), only where the entry's path names a file that the commit leaves in the repository (§s-ffkv5qnqvet7bga).
- Each key of the object is the path of a file relative to the root of the repository, with forward slashes.
- The SpecSheriff tools refuse a `sheriff.bindings.json` that is not valid JSON or does not hold an object of this form.

## s-zrsc6asgmhv8tnc — How a test declares the rule it is written from

- in TypeScript and JavaScript, by starting its name with the SpecTag, as in `test("@spec s-… what it checks", …)`;
- in any other language, as the description of that language says (§s-33fw3ga4ctd94dq).
- The SpecSheriff tools' plugin for pytest, `pytest-specsheriff`, registers the mark.
- A test run reports each test by its name, so the SpecTag is placed where that report shows it.
- In TypeScript, `test("@spec s-… refuses an empty name", …)` declares the SpecTag of the rule it is written from.

## s-9rtrj24myzjvshu — SpecTags on the system's code other than tests

- `sheriff binding` refuses each of the following in the system's code (§s-hheus6f395ynqvc) that the commit adds or changes (§s-2x58az67bm6cxq2), other than tests, whether the specification is approved or a draft (§s-k6dzuajejrw4cej):
- in a file whose language a description covers (§s-33fw3ga4ctd94dq), a SpecTag in any comment other than the one directly above a symbol;
- The refusal names the file, and the symbol and the line where they apply.
- A SpecTag or an entry of a kind that this list refuses binds nothing.
- Code that the commit leaves unchanged and that no SpecTag binds is handled by the check of code and tests outside the commit (§s-3xx2eukc8gtd2tx).
- The code that it is meant to bind is then as unbound as code with no SpecTag.
- A commit adds a function that carries `/** @spec s-… */`, whose sid is that of the section that holds the rules that the function implements.
- The most likely mistake is to accept the SpecTag because its node exists, which leaves the function bound to no rule.

## new:tools-7-2-no-node — A SpecTag that names no node

- It refuses a SpecTag whose sid names no node of that model, naming the file, the line and the sid (§s-w4g56n2bs753rt3).

## new:tools-7-2-outside — Code and tests outside the commit that carry no SpecTag

- in the system's code (§s-hheus6f395ynqvc) other than tests, a symbol (§s-kgbzk2ph9e6jfb4) or a file to be bound as a whole (§s-5qdjyf6t898rsd4, §s-trwczfskj5zmuft) that no SpecTag binds (§s-9rtrj24myzjvshu);
- a test of the system's code that declares no SpecTag (§s-zrsc6asgmhv8tnc), or whose SpecTag names a node that is not a rule (§s-utf4mbt7ref8g9c).
- The approval status and the `strict` flag decide what code without a SpecTag outside the commit costs the commit: nothing, a warning or a refusal.
- The commit itself may change either of them.
- The commit is judged against the specification as the commit leaves it, approved, so the commit passes with the warning.
- The most likely mistake is to judge the commit by the status before it, a draft, which lets the commit that approves the specification pass without the warning.

## s-utf4mbt7ref8g9c — The SpecTags the tests carry

- a test that the commit adds or changes and whose SpecTag names a node of the model of the specification (§s-w6gybeqn2ttydqx) that is not a rule (§s-5z5gnu7pahr82xp).
- The refusal of such a test names `sheriff reindex`, which writes the SpecTag.
- For a test that the commit leaves unchanged and that declares no SpecTag, or whose SpecTag names a node that is not a rule, the check of code and tests outside the commit applies instead (§s-3xx2eukc8gtd2tx).
- A commit adds a test that opens its name with `@spec s-…`, where the sid is that of the term `request`.
- The most likely mistake is to accept the test because the term exists.

## new:tools-7-2-rule-test — A test for each rule whose code a commit changes

- `sheriff binding` accepts a commit that adds or changes code bound to a rule (§s-kgbzk2ph9e6jfb4, §s-5z5gnu7pahr82xp) only where a test of the system's code (§s-hheus6f395ynqvc) declares that rule's SpecTag (§s-m82tz4mp3f9r3fg).
- It refuses any commit that does not meet this condition, naming the rule by its file, its sid and its location (§s-kag2m9tzdnduxdx).
- In this check, the code is each symbol (§s-kgbzk2ph9e6jfb4) and each file bound as a whole (§s-5qdjyf6t898rsd4, §s-trwczfskj5zmuft) that the commit adds or changes (§s-2x58az67bm6cxq2), other than tests.
- In this check, a test counts whether or not the commit changes it.
- The most likely mistake is to look for the test only among the tests that the commit changes, in which case `sheriff binding` refuses a commit whose test was committed earlier.

## proposal:s-nyh9yk22ba6g77q — What the reviewer is given

- the commit's change, excluding the files generated from the specification;
- the wording of each rule that a SpecTag (§s-8xw4mgvpexyvw5q) binds to code or a test that the commit adds or changes;
- In this rule, a node's wording is its title, its text, its reason, its examples and the fields its kind adds, as an approval covers them (§s-5ah25f6gy99panq).

## proposal:s-m4h279nbaqkpa3t — What the checks enforce, and when they run

- on a commit whose message states that a rule's implementation needs no change, while the specification is approved (§s-qzthyh7yqvfhsa2): whether that statement is true;
