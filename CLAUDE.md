# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repository is

SpecSheriff is a method of spec-anchored development and the upstream of its core: the guidelines
and the `sheriff` toolset now, later the skills and a worked example. `npm install` at the root
builds `packages/specsheriff/` and links `sheriff`; `npm test` runs its unit and end-to-end tests and
those of `packages/pytest-specsheriff/` (Python 3.10 or later with pytest). The repository is held by
its own tools: `sheriff.config.json` says the core is written here, so its nodes are confirmed in
`specs/_confirmations.jsonl` by the owner `specs/_guidelines/project.json` names. A change to
`packages/specsheriff/src/` reaches the hooks once `npm run build -w specsheriff` has run. The git
hooks, the agent's hook and the skills `spec`, `spec-review` and `spec-adopt` are kept in
`packages/specsheriff/assets/`; `.githooks/`, `.claude/hooks/` and `.claude/skills/` here are what
`sheriff init` writes from them, so a change is made in the assets, the copy deleted and `sheriff
init` run again — a test fails while the two differ. Never report a check as having run that has
not.

The principles the method rests on, as the owner states them, are below. Weigh every decision and
proposal against them first; one that contradicts a principle is raised with the owner, never carried
out quietly.

@docs/principles.md

`docs/design-log.md` holds the decisions (newest first), the order of work and the open questions;
read it before proposing anything. A decision moves onto the rule it settled once that rule exists,
and the log keeps only what no rule carries.

`specs/_guidelines/` is the core of the guidelines — the method's own specification, normative for
all work here:

- `spec.json` — the base: what is held, what is checked, when, and what a failure costs. It names no
  technology.
- `tools.json` — the appendix of the tools: how SpecSheriff's toolset carries the base out — file
  layout, commands, hooks, the table of how each check is made, tag and test syntax, the reviewer's
  runner, how a confirmation is recorded. It is the specification the tools are built from.

What a project installs (tools, skills, guidelines, example) is Apache 2.0; `docs/` is CC BY 4.0.

## The node files

A file is `{schemaVersion, scope, section, nodes}`, a tree of nodes through `children`; its structure
is `specs/_schema/` (§s-eferktypcj7njt5). A node holds:

- `sid` — permanent, `s-` plus 15 characters from `23456789abcdefghjkmnpqrstuvwxyz`; the only way a
  node is cited, anywhere. A node written without one is given one by `sheriff reindex`.
- `id` — the address computed from where the node stands. Nothing cites it, and nobody writes it:
  `sheriff reindex` does.
- `kind` (`section`, which holds rules and requires nothing; `rule`; `term`; `record`; `domain`, a
  domain's head), `title`, `status` (`""` or `"checked"`), `text` (what must hold), `rationale` (why,
  kept apart from the requirement), `list` (`of`, `members`, `declaredIn`), `owner` on a section or a
  head, `refs`, and `meta`: `decisions` (`date`, `problem`, `ruling`, `type`), `todos`, `comments`,
  and the lists of the `code` and the `tests` bound to the node, which must agree with the tags and
  the tests' sids (§s-rwqzepmrt77rv35).
- `refs` — typed outgoing links `{type, to}`, written by hand, and incoming ones `{type, from}`,
  built by `sheriff reindex`. The types and their meanings: §s-sn6au3vcr9uy5pm.

Formatting is exactly `JSON.stringify(data, null, 2) + "\n"`, LF endings, the existing key order;
`sheriff reindex` rewrites a file into it.

## Editing the specification

The tools hold every edit. The agent's hooks in `.claude/settings.json` run `sheriff guard` before an
edit made with the file tools, and after any edit `sheriff reindex`, `export`, `render`, `validate`,
`binding` and `citations`, handing back what they refuse; the git hooks in `.githooks/` (turned on per
clone by `git config core.hooksPath .githooks`) check the staged commit, its message and, where code
changes, its review. `npx sheriff validate`, `binding`, `citations` and `show <sid>` run by hand, and
`npm test` runs the tools' tests.

- **Status.** Any change to a node's wording — title, text, rationale, or the values its kind carries
  such as `list` — needs its status written `""`: `sheriff guard` refuses an edit that leaves it
  checked. A node becomes checked only on the owner's agreement after reading it, never on your own
  judgement, by `npx sheriff confirm <sid>` (git names the owner). The one exception the owner allows:
  a purely technical replacement that changes no meaning, such as a renamed term or path, is
  confirmed by you and reported in one line. A change to links or metadata leaves the status as it
  is; a move that gives the node another owner empties it (§s-5ah25f6gy99panq).
- **Citations.** A node cites another as `§<sid>`, in any field but its links and children. Every
  citation needs an outgoing link to that node (`cites` unless another type says how the two bear on
  each other), and a `cites` link stands only where the node cites its target (§s-bpdqd9v72wg7vsz);
  the incoming entry is built by the reindex.
- **Decisions** are recorded in the `meta.decisions` of the rule they settled, never as a document
  (§s-gqbj8849rf224qa), retold without anything of the private origin project the method was
  extracted from: nothing here names it or relies on it.
- **Removal.** A node a confirmation was ever given for goes to the archive,
  `specs/_archive/<name>.json`, with `archived` holding the date, the reason and the sid of the node
  that replaces it; a node never confirmed is deleted (§s-f2b5zvc565s242f).
- **Where a rule goes.** The base names no technology, no look of a user interface and no figure
  measured on one instance; those go to the appendix of the tools, each of whose rules implements a
  node of the base. Examples in the core name what any system has — a user, an operator, a record, a
  request — never the worked example's bank.
- **How a rule is written** is the last section of `spec.json` — one language (English), a named
  subject, a reason that gives only its grounds and is no narrower than its rule, no count in prose,
  no capitals for stress, a general word carrying its object. Read it before writing any node.

## Working with the owner

- The owner reviews one node at a time, shown whole: the English original above a reading in
  Russian, never fragments of it. Their confirmation is the only thing that makes a node checked.
- A node changed only to carry out what the owner already confirmed elsewhere is not shown again:
  the owner's agreement to that node covers it, so confirm it and report it in one line, naming the
  node it follows from.
- Files outside `specs/` — the docs, this file, later the code — cite a node by its sid, never by its
  address; the tools refuse an address outside the specification.
- Commit messages follow the history: the part first, then what changed, in plain sentences
  ("Design log: …", "Core guidelines: …").

## When code arrives

The tools are written in TypeScript on Node and read code with tree-sitter. Their source is kept in
`packages/specsheriff/` (the npm package providing `sheriff`) and `packages/pytest-specsheriff/` (the
plugin for pytest). In the worked example and
any project taking the core, every symbol of the system's code carries `@spec <sid>` (or
`@spec none <reason>`) in the comment directly above it, a test declares the sid it verifies and is
written first, and a commit changing code names every checked node it serves; the exact syntax is in
`tools.json`. The repository's tools, configuration and tests are exempt from tags by where they live
(§s-kgbzk2ph9e6jfb4). The tools' own tests are not exempt from sids, by the owner's choice
(2026-10-28): each declares the sid of the node of `spec.json` or `tools.json` it verifies and is
written before the code it tests, so that this repository works by the method it offers.
