---
name: spec-adopt
description: Bringing a project's existing documents — a specification, requirements, design notes — into the specification's nodes, and its code and tests under the checks. Use when a project takes up this method with documents or code it already has.
---

# spec-adopt

The existing documents become nodes first, exactly as they read; only then are they gone over with
the owner. Rewriting while importing loses what nobody notices was lost. Load the skill `spec` first.

## Before you start

`npx sheriff init` has set the repository up: the hooks, the skills, the core in
`specs/_guidelines/`, `sheriff.config.json` and `specs/_guidelines/project.json` naming the owner.
Name in `sheriff.config.json` where the system's code and its tests live.

## 1. Ask where the documentation is

Ask the owner for the directory that holds the project's current documentation. Walk it
recursively and list every document in it — markdown and text — with its first heading, and the part
of the specification you would bring each into: a domain, contracts, the technical appendix, or
the project's own guidelines, the directories it stands in suggesting which. Put the list to the
owner; they may leave a document out or move it to another part. Then import what they agreed, as
step 2 says. Once every document is in the nodes and `sheriff validate` passes, the originals are
deleted in the same commit: kept beside the nodes, they would be a second version of the rules.

## 2. Import verbatim

Read each document the owner agreed, whole. Then write it into nodes, one part of the specification per file as the
appendix of the tools lays them out — a domain under `specs/<domain>/` opening with its head,
what the domains share under `specs/contracts/`:

- a heading becomes a section, its preamble the section's text;
- a numbered requirement becomes a rule, its continuation paragraphs, tables and code blocks part
  of its text; a reason the document gives for it becomes its `rationale`;
- every word stays as the document has it, and nothing is dropped, merged or reordered;
- every status is `""`, and no node gets a sid or an address by hand.

Run `npx sheriff reindex`: it gives every node its sid and its address.

## 3. Move every citation onto a sid

Wherever a document cited another place by its number or its heading, cite the node by its sid,
`§<sid>`, and give the node the link: `cites`, or the type that says how the two bear on each other.
Do the same in the code, the tests and the other documents. `npx sheriff validate` and
`npx sheriff citations` find what is left.

## 4. Go over it with the owner

By the skill `spec-review`, one node at a time, one part at a time. This is where the wording is
brought to the guidelines' section on how a rule is written, a rule too broad is split, a rule that
states the obvious goes — each change shown, each node confirmed by its owner.

## 5. Bind the code and the tests

Once a part's rules are confirmed, `npx sheriff binding` shows what its code and tests lack: a tag on
every symbol, naming the node it implements or saying it implements none and why; the sid each test
verifies; the lists of code and tests in the nodes' metadata. Code that implements no rule at all is
a question for the owner — a rule is missing, or the code should go — never a tag chosen because it
is near.
