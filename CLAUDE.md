# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repository is

SpecSheriff is a method of spec-anchored development, and this repository is upstream of what a project installs
from it: the plugins for Claude Code and for Codex CLI, each carrying the skills, the SpecSheriff
guidelines and the SpecSheriff tools. The worked example, the saloon, is a repository of its own,
`non4me/specsheriff-saloon`, which this one links to. `npm install` at the root builds the tools in
`skills/tools/`, links `sheriff`, and copies the built tools into both plugins:
into `skills/claude-code/tools/`, and into `skills/codex/` together with the skills and hook scripts it copies there from the
plugin for Claude Code. On `main`, git ignores all these copies in both plugins; they are committed only on the `release` branch. `npm test` builds
the tools again and runs their unit and end-to-end tests and those of `skills/pytest-specsheriff/`
(Python 3.10 or later with pytest). The repository is checked by its own tools: `sheriff.config.json` states that the SpecSheriff
guidelines are written in this repository, so their nodes are approved by the
owners named in `specs/_guidelines/project.json`, and the approvals are recorded in `specs/_approvals.jsonl`. `.githooks/`, `.claude/settings.json` and `.gitattributes`
contain what `sheriff init` writes, as in any project, and a test fails if they differ from it. `internal/release.md`
describes how a release is made and how this repository runs its own plugin from the working tree: a change to `skills/tools/src/` reaches the
agent's hooks once `npm run build -w specsheriff-tools` has run, and reaches the git hooks at the start of the first
session after that build. Never report that a check has run when it has not.

The principles the method rests on, as the owner states them, are below. Weigh every decision and
proposal against them first; one that contradicts a principle is raised with the owner, never carried
out quietly.

@docs/principles.md

Decisions are never kept in a document of their own: a decision on a rule goes into that rule's
`meta.decisions`, and any other decision only into the commit message.

`specs/_guidelines/` holds the SpecSheriff guidelines — the method's own specification, normative for
all work in this repository:

- `spec.json` — the base: what is held, what is checked, when, and what a failure costs.
- `tools.json` — the appendix of the tools: how the SpecSheriff tools carry out the base — file
  layout, commands, hooks, the table showing how each check is made, the syntax of the SpecTag, the reviewer's
  runner, how an approval is recorded. It is the specification the tools are built from.

What a project installs (tools, skills, guidelines, example) is licensed under Apache 2.0; `docs/` and `_promo/`
are licensed under CC BY 4.0, except the mark in `_promo/brand/`, which is under no open licence. `_promo/` holds
all promotional material — the mark, the pictures, the style guide, the articles and the brief
for the SpecSheriff website — and none of it is kept anywhere else.

## The node files

A file is `{schemaVersion, scope, section, nodes}`, its nodes nested in a tree through `children`; its structure
is defined in `specs/_schema/` (§s-eferktypcj7njt5). A node holds:

- `sid` — permanent, `s-` plus 15 characters from `23456789abcdefghjkmnpqrstuvwxyz`; the only way to
  cite a node, anywhere. A node written without a sid is given one by `sheriff reindex`.
- `location` — the node's path in the specification, computed from its position in the tree. Nothing cites it, and
  nobody writes it: `sheriff reindex` does.
- `kind` (`section`, which holds rules and states no requirement of its own; `TextRule`; `term`; `RecordType`; `header`,
  a domain's header), `title`, `status` (`"draft"` or `"approved"`; the status of a section or a header is derived from
  the nodes under it), `text` (what must hold), `reason` (why, kept apart from the requirement), `list`
  (`of`, `members`, `declaredIn`), `owners` on a section or a header, `refs`, and `meta`: `decisions` (`date`, `problem`, `ruling`, `type`), `todos`, `comments`,
  and `code` and `tests`, which list the code and the tests bound to the node and must agree with the SpecTags on
  the code and on the tests (§s-rwqzepmrt77rv35).
- `refs` — typed outgoing links `{type, to}`, written by hand, and incoming ones `{type, from}`,
  built by `sheriff reindex`. The types and their meanings are given in §s-sn6au3vcr9uy5pm.

A file is formatted exactly as `JSON.stringify(data, null, 2) + "\n"` writes it, with LF line endings and the existing key order;
`sheriff reindex` rewrites a file into that format.

## Editing the specification

The tools check every edit. The agent's hooks, which the plugin declares, run `sheriff guard` before an
edit made with the file-editing tools, and after any edit `sheriff reindex`, `export`, `render`, `validate`,
`binding` and `citations`, reporting to the agent what they find wrong; the git hooks in `.githooks/` (enabled by
the plugin when a session starts) check what is staged and the commit message, and have the commit
reviewed where it changes code. `npx sheriff validate`, `binding`, `citations` and `show <sid>` can be run by hand, and
`npm test` runs the tools' tests.

- **Status.** Any change to a node's wording — title, text, reason, or the fields its kind adds,
  such as `list` — requires its status to be set to `draft`: `sheriff guard` rejects an edit that leaves the node
  approved. A node is approved with `npx sheriff approve <sid>` (git supplies the approver's identity),
  and only after an owner has read it and agreed to it, never on your own judgement. The only exception the owner
  allows is a purely technical replacement that changes no meaning, such as a renamed term or path: you
  approve it yourself and report it in one line. Changing a node's links, metadata or owners, or moving the node, leaves
  its status as it is (§s-5ah25f6gy99panq). Nobody approves a section or a domain's header:
  `sheriff reindex` derives their status from the nodes under them (§s-9kfdycuq34beqvs).
- **Citations.** A node cites another as `§<sid>`, in any field but its links and children. For every
  citation, the citing node must have an outgoing link to the cited node (`cites`, unless another type says how the two nodes
  relate), and a `cites` link is allowed only where the node cites its target (§s-bpdqd9v72wg7vsz);
  the matching incoming entry is built by `sheriff reindex`.
- **Decisions** are recorded in the `meta.decisions` field of the rule they settled, never as a separate document
  (§s-gqbj8849rf224qa), and are restated with no trace of the private project the method was
  extracted from: nothing in this repository names that project or relies on it.
- **Removal.** A node that has ever been approved is moved, when it is removed, to the archive
  `specs/_archive/<name>.json`, with its `archived` field holding the date, the reason and the sid of the node
  that replaces it; a section, a domain's header and a node that was never approved are deleted
  (§s-f2b5zvc565s242f).
- **Where a rule goes.** How the SpecSheriff tools carry out a rule belongs in the appendix of the tools,
  each of whose rules implements a node of the base. The ban on naming a technology applies to a
  project's base specification and not to the guidelines (§s-a4rbry4hsu34hy8). Examples in the
  SpecSheriff guidelines name what any system has — a user, an operator, a record, a request — never
  anything from the saloon, the worked example.
- **How a rule is written** is the last section of `spec.json` — one language (English), a named
  subject, a reason that says why the rule exists, no count in prose, no phrase or sentence in capitals, a general word carrying its object. Read it before writing any node.

## Working with the owner

- The owner reviews one node at a time, shown in full, never in fragments. Their approval is the
  only thing that makes a node approved.
- A node changed only to carry out what the owner has already approved in another node is not shown to the owner again:
  the owner's agreement to that other node covers it, so approve it and report it in one line, naming the
  node it follows from.
- Files outside `specs/` — the docs, this file and the code — cite a node by its sid, never by its
  location; the tools reject a location cited outside the specification.
- Commit messages follow the pattern of the earlier commit messages: the part of the repository first, then what changed, in plain sentences
  ("SpecSheriff guidelines: …").

## When code is written

The tools are written in TypeScript for Node and parse code with tree-sitter. Their source is kept in
`skills/tools/` (the npm package providing `sheriff`) and `skills/pytest-specsheriff/` (the
plugin for pytest). In the worked example and any project adopting the SpecSheriff guidelines, every
symbol in the system's code carries the SpecTag `@spec <sid>` (or `@spec none <reason>`) in the
comment directly above it. There, a test carries the SpecTag of the node it is written from, at the start of its
name or in its pytest mark, and is written before the code it tests. There, a commit
that changes code names every approved node that its changed symbols implement. The exact syntax is in
`tools.json`. The repository's configuration, its own tools and their tests are not the system's code
and carry no SpecTags, because of where they are kept (§s-hheus6f395ynqvc). In this repository, though, the tools' own tests are not exempt from carrying SpecTags, by the owner's
choice (2026-10-28): each carries the SpecTag of the node it is written from, in `spec.json` or `tools.json`, and is
written before the code it tests, so that this repository follows the method it offers.
