# Design log

The decisions taken while shaping SpecSheriff, newest first, and the questions still open. Once the
method's own specification exists, each decision moves onto the rule it settled, and this log
holds only what no rule carries.

## Decisions

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
appendix of the tools records a confirmation, never as what a confirmation is.

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
  changes — lives in personal scripts in the origin project. Without it, "confirmed" is a
  declaration, so it becomes part of the public tools.
- The examples in the doctrine of how a rule is written are drawn from the origin project. They are
  replaced by neutral ones, or by examples from the worked example project.
- The guidelines name the technologies of their own tools. The method may apply its own split to
  itself: what is checked, in the base; how one toolset checks it, in an appendix.

## Open questions

- Which languages the binding of code to rules supports.
- The licence.
- The articles: their readers, where they appear, and in which languages.
- The figure of the sheriff: the brand's voice and look.
- Whether the history of decisions on the core rules is carried over, or the core starts clean.
