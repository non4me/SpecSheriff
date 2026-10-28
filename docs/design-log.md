# Design log

The decisions taken while shaping SpecSheriff, newest first, and the questions still open. Once the
method's own specification exists, each decision moves onto the rule it settled, and this log
holds only what no rule carries.

## Decisions

### 2026-10-28 — The core read again as a whole, against the principles

The owner stated the principles the method rests on, now in `docs/principles.md`, and went over the
core again as a whole, each changed node confirmed as it now stands, its decisions on it. The rulings
that bear on more than one node:

- **A symbol, not a declaration, carries the tag**, and only a symbol whose code a commit changes must
  name a checked node; a change to a tag is a change to the code (§s-kgbzk2ph9e6jfb4).
- **The specification has one owner; a domain or any section may have its own**, the nearest above a
  node being its owner, and only the owner confirms (§s-67vekyup7y8smap). A confirmation names its
  owner and is not signed: the agent's hooks and the checks at a commit keep a status honest. This
  sets aside the signed confirmations of 2026-10-27.
- **The checks run at each edit an agent makes**, and an edit that would leave a node checked over an
  unconfirmed wording, or change the code of a rule with no test, is refused before it is made
  (§s-83ev4wwesbwnhnp); the hooks are kept in the repository.
- **Whatever is generated from the nodes is regenerated after every change and never edited**, and a
  generated copy that is kept is checked against what the nodes produce (§s-kh8qcd5kxgh9z3j).
- **A node ever confirmed is archived when removed**, not only one checked at the moment
  (§s-f2b5zvc565s242f). The rule that a node removed while the core is first written is deleted ends
  before `sheriff validate` first runs on this repository.
- **Comments come back into a node's metadata**, the one type of comment an open problem; the schema
  defines them at step 2 (todo on §s-eferktypcj7njt5).

### 2026-10-27 — The core guidelines are confirmed

The owner went over every node of the core, the base and the appendix of the tools, one at a time,
the English above a reading in Russian. What came over unchanged kept its confirmation, since its
wording was the one the owner had already confirmed; every changed or new node was confirmed as it
now stands, its decisions on it. The confirmations become lines in a file once the tools record them
(step 2). The rulings of that reading that bear on more than one node:

- **The core's examples name what any system has** — a user, an operator, a record, a request — and
  nothing of one implementation. The worked example's bank stays in the example, the articles and the
  pictures, never in a rule.
- **The specification is written fresh.** A node removed while it is first written is deleted, not
  archived: the origin project's experience shapes it, its history does not carry over beyond the
  decisions retold on the rules.
- **A test always carries the sid of what it verifies, and every declaration of the system's code a
  tag**, or the tag saying it implements none and why. Only a test or a declaration whose code a
  commit changes must name a checked node. The origin project, taking the core, tags its code before
  the check is turned on.
- **The base of the guidelines is tied to no implementation** in three rules — no technology, no look
  of a user interface, no figure measured on one instance; the doctrine's own rule on measured figures
  folded into them.
- **Every procedure that writes the specification is idempotent**, by that name.
- **One language for a specification, English recommended** and holding where a project names no
  other; the core is in English.
- **A restriction by list** names what is allowed or what is forbidden by which mistake would go
  unnoticed.

### 2026-10-27 — The guidelines apply the split between base and appendix to themselves

The base guidelines state what is held, what is checked, when, and what a failure costs — a rule's
tag stands on its declaration, and the check at a commit refuses a declaration without one — and name
no technology. An appendix of the tools describes how SpecSheriff's own tools carry them out: the
commands, the hooks, the layout of the files, the parser and its descriptions of languages, the
runners of the reviewer, the spelling of a tag in a comment. Another toolset, in another language,
can implement the same base.

Keeping the tools named in the rules was set aside because the method would break its own rule that
a base names no technology; moving only the runners and the parser out, because it leaves that rule
broken by the commands.

### 2026-10-27 — The core carries its history of decisions, retold

Each decision recorded on a rule of the core in the origin project comes over with its date, its
problem and its ruling, retold without anything of the origin project: not its components, its
stores or its commits, but the shape of the problem — a rule on confirmation that did not cover the
fields of a record, so that a changed field left the status standing over a structure the owner
never saw. A decision that cannot be told without the origin project stays there alone.

Carrying the decisions over as they stand was set aside because they speak of the origin project,
which the one-way dependency forbids; starting clean, because it drops the strongest evidence a
reader weighing the method has — that each rule came out of a real failure rather than a desk.

### 2026-10-27 — The first article carries a series of four pictures and a set of cards

Each picture answers one question an architect asks, and each can be posted alone with a link to the
article:

1. How does it work? — the life of a rule: the owner confirms it, a test carrying its identifier, code
   carrying its tag, the commit, the checks and the reviewer, the merge; and the loop by which a
   changed wording returns the status to empty until it is confirmed again.
2. What stops bad code? — the gate of a commit: the deterministic checks, and the one judgement, made
   by a reviewer that sees only the change and the text of the rules.
3. Will it survive a change of stack? — one base specification, two technical appendices.
4. How does it differ from Spec Kit? — the map of approaches, spec-first, spec-anchored and
   spec-as-source, with the tools placed on it and SpecSheriff among them.

Beside the series, a set of cards on how requirements decay silently, one per rule of the doctrine of
writing: posts for the weeks after the article, useful even to a reader who never takes up the whole
method. The scene of the sheriff refusing a commit is kept for the second article.

One poster holding the whole method was set aside because nothing on it can be read closely and it
cannot be cut into posts; one picture alone, because it answers one of the four questions.

### 2026-10-27 — An emblem is the face of the project, a character appears where play fits

The emblem is a sheriff's star with a rule node at its centre: the face of the README, the
documentation and the first article. A drawn sheriff appears only where the reader is ready to smile —
the hands-on article, posts on social networks, the scene of the refused commit.

An emblem alone was set aside because it wastes the name chosen for being remembered; a character
everywhere, because it would make the method look like a joke to the architects the first article is
written for.

### 2026-10-27 — Each article appears in English and in Russian in the same week

The English text is the original and is kept in this repository. The Russian one is written for Habr
rather than translated: its own examples and its own way in, the same meaning. Both appear in the
same week; the comments on Habr feed the second, hands-on article.

English alone was set aside because it gives up Habr, where the method's readers like to argue about
process and the author writes in his own language; Russian first as a trial, because the English
text would lose time while the niche fills.

### 2026-10-27 — The first article is written for team leads and architects

Its reader is the engineer bringing coding agents into a team's work: plausible code nobody can trace
to a requirement, decisions an agent quietly undoes, review that cannot keep up with generation. The
method's strengths answer a team's problems — an owner's confirmation, owners per domain, the gate at
every commit, the base kept apart from the appendix — and this reader can introduce a process. Its
proof is the origin project: one engineer with agents, two months, about 1,800 rules and about 3,900
bindings of code to them, and agents that do not drift from the rules. Its venues are InfoQ, LinkedIn,
Habr and Medium. A second, hands-on article, built on the sheriff's scene, is written for developers
working with agents alone, for Hacker News, Reddit and dev.to.

Developers working alone were set aside as the first reader because they are likeliest to see the
method's weight before its value, the criticism Spec Kit already draws; regulated industries, as too
narrow a first audience.

### 2026-10-27 — Apache 2.0 for what is installed, CC BY 4.0 for what is read

What a project installs — the tools, the skills, the guidelines and the worked example — is under the
Apache License 2.0, whose patent clause is the first thing a large company's lawyers look for. What
is read and shared — the concept, the articles and the infographics — is under CC BY 4.0, which
requires naming the source wherever a picture or a passage is reused, so that every reprint carries
the name and a link. The guidelines count as installed, since a project copies them in beside the
tools.

MIT for everything was set aside for want of a patent clause, and because it lets the texts and the
pictures travel without their source; Apache 2.0 for everything, because it is not written for texts
and pictures.

### 2026-10-27 — TypeScript and Python at launch, through one general parser

The binding of code to rules is read through a parser with grammars for many languages, so that a
language is added by describing what counts as a declaration and as a test in it, rather than by new
code. TypeScript and JavaScript, and Python, are supported at launch; Go, Java, C#, Rust and others
follow by description. The core rule binding a test to what it verifies becomes: a test declares the
identifier of the rule it verifies in the way its framework names a test — the opening of its name
in TypeScript, a mark on the test in Python, where an identifier cannot hold a hyphen.

TypeScript alone was set aside because it cuts the method off from most of the people building
agents and working with data; a tag bound to the next line without parsing, because nothing could
then tell which declarations a commit touched, and so whether each carries its tag.

### 2026-10-27 — The reviewer is a contract, carried out by replaceable runners

The core states the reviewer's contract: it is given the commit's change and the text of the rules
the commit names, and nothing of the session that wrote the code; it answers with a verdict naming
the rule and the line of each finding; and a review that cannot be held — no runner, a timeout, an
answer that does not parse — refuses the commit. Who carries the review out is a runner, described
in the appendix of the tools: first the Claude Code CLI, which exists, then the Codex and Gemini
CLIs, then any service speaking the OpenAI-compatible API, which covers models run locally. The
example ships a recorded run in which the commit is refused, so that the scene can be seen without
any model installed.

One runner alone was set aside because the method would read as one vendor's tool and a reader
without it could not run the example; a call to an API on the reader's key, because every commit
would cost money and the choice of model would fall on the reader.

### 2026-10-27 — The worked example is a small bank in a frontier town

The example project specifies a small savings bank of a Wild West town, which the sheriff guards:
accounts, transfers between them, a journal of operations. Its rules are a bank's and are meant
seriously — a transfer never leaves an account below zero — and the theme lives only in names, so
that removing it is a renaming. The scene the method is shown by: an agent asked to make transfers
faster drops the check of the balance, and the commit is refused, naming the rule on transfers and
the line that breaks it. The example is written in TypeScript on Node, the stack the tools are
already written in.

A task list was set aside as a subject nobody minds seeing broken; a library's loans, because a
broken rule there costs little; a plain bank, because the frontier town lets the example and the
brand tell one story.

### 2026-10-27 — Each domain has its owners, and a confirmation names who gave it

A confirmed node means that an owner of the part it stands in read its wording. Each domain names
its owners in its head; the core rules and the agreements between domains have the specification's
chief owner. A confirmation is kept in git beside the fingerprint of the wording confirmed and the
name of whoever confirmed it, and a commit adding a confirmation is refused unless it is signed by
that person. Working alone, one person owns every domain, and nothing changes.

One owner for the whole specification was set aside because it binds a growing specification to one
person; a confirmation read off the approvals of a merge request, because it would tie what a status
means to one hosting platform. That platform's approvals may later be described as one way an
appendix of the tools records a confirmation, never as what a confirmation is. (The signature was set
aside on 2026-10-28.)

### 2026-10-27 — How the origin project takes the core

Before the first publication, the origin project takes the core as a git dependency pinned to a
commit of this repository; after it, as a versioned package. A change to the core is made here and
committed here first, and the origin project then moves its pin.

### 2026-10-27 — The name is SpecSheriff

Chosen for a word known in every country, and for a figure an article and an infographic can carry:
the sheriff who refuses a commit that no rule warrants. Names built on guard, warden, sentinel,
shield or mind were set aside: each is taken by a project in the same niche, and guardrails are the
most worn metaphor in tooling for coding agents. Specbound, SpecWarrant, Rulefirst and Spec Anchor
were weighed and set aside as neutral, or as the name of a category rather than of a project.

### 2026-10-27 — The line between the core and a project's own rules

The core holds the model of nodes and statuses, the links and their types, the binding of code and
tests to rules, the map, the doctrine of how a rule is written, the split between the base
specification and the technical appendix, the technical debt, record nodes with the types and
runtime checks generated from them, and record variants.

A project holds as its own rules what only its system needs. For the origin project those are its
model of jobs and of the steps a job consists of, with the registry its runtime reads; the exception
letting a menu entry of its user interface carry its icon and place, with the checks of its pages and
menu; its domains' tables headed by a field's name, with its kinds of problem; and the concrete list
of the levels its domains stand at. The core keeps the rule that every domain stands at a level the
owner defines, from the general to the particular; the list of levels is a project's setting.

A project's own rules stand to the core as the technical appendix stands to the base: they refine
it and never contradict it.

### 2026-10-27 — Three skills

- **spec** — the core, generated from the guidelines and the figures counted off the model, and
  nothing else.
- **spec-review** — how an agent works with the specification's owner: as a colleague rather than a
  clerk; a proposed rule checked by a reviewer apart before it is shown; one node at a time, shown
  whole, the original above a reading in the owner's language; one part at a time; a confirmation
  recorded by a script and guarded by a hook; a technical replacement not confirmed again; a domain
  gone over whole once its nodes are confirmed. The owner's language is a setting, with a table of
  terms.
- **spec-adopt** — bringing a project's existing documents into the model: imported verbatim first,
  every citation moved onto a permanent identifier, numbered by place, then gone over with the owner.

A personal working regime — a task list, working time against an estimate, a status line, a local
cache in front of external systems — is not published. Neither is a protocol for teams of agent
sessions: it is a subject of its own. Of it, only the independent reviewer is published, as part of
the commit gate.

### 2026-10-27 — SpecSheriff is the upstream of the method

The method's core rules, its tools and its skills live here. The project the method was extracted
from — a private system under active development, to be opened once it is finished — takes the
core from here and keeps only its own extensions. The dependency runs one way: nothing here names or
relies on that project.

### 2026-10-27 — What a reader gets

The concept, and a small worked example project carrying the minimum of tools, on which a commit is
seen being refused with the rule and the line named. Not the concept alone, which would be one more
opinion among many; not yet a standalone product, which would be a second project to support. The
example leaves the road to a product open.

## Findings to act on

- The mechanism that keeps a confirmation honest — a fingerprint of each wording the owner
  confirmed, a hook refusing a status typed by hand, a status returned to empty when its wording
  changes — lives in personal scripts in the origin project. The core now states it (the owners'
  rule and the appendix's rule on recording a confirmation); the tools carry it out in step 2.
- The origin project's code holds many declarations without a tag. Taking the core (step 5), it
  tags them, finding a rule for each or stating that it implements none and why, before the check
  of tags is turned on.

## Order of work

1. ~~The core guidelines~~ — done 2026-10-27: the base and the appendix of the tools, confirmed by the
   owner node by node.
2. The tools, along the base: checks of the specification on its own and against the code, the
   generated export, map and types, confirmations naming who gave them, the general parser with
   TypeScript and Python described, the reviewer's contract with its first runner.
3. The skills: spec, spec-review, spec-adopt.
4. The worked example: the frontier town's bank, its specification, code and tests, and the recorded
   run in which a commit is refused.
5. The origin project takes the core from here and keeps its own rules as a part refining it.
6. The emblem, the four pictures and the cards.
7. The first article, in English and in Russian.
8. The repository opened, and the article published.

## Open questions

None at this point.
