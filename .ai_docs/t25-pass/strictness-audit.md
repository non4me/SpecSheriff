# Rules too strict to be shared: findings of the review of 2026-11-16

The owner's ruling of 2026-11-16: an extension only adds rules to the SpecSheriff guidelines and refines their rules;
a project's own guidelines are held to the same limit (2.3). A shared rule that demands more than some legitimate
project can give is then a dead end, so each such rule is to be made general enough for a project's own guidelines to
add what the project needs. Three general-purpose agents read the drafts of newform.json; their findings are condensed
here, in their order of severity. Confidence is the agent's own. Nothing has been changed yet: each finding goes to the
owner on its own.

## The remedy most findings share

Superseded on 2026-11-16: a default that a project replaces would be an override in disguise. The remedy the owner agreed is node 2.4: a shared rule requires only the minimum its reason needs in every project; a project's own guidelines refine or extend it; a value in which projects may differ, with any default for it, is named only by a project's own guidelines. The paragraph below is kept as the agents wrote it.

The shared rule names its own variation point: it keeps the requirement, sets a default, and lets a project's own
guidelines (or an extension) choose a value or a scope. A project's rule that chooses that value refines the shared rule
rather than contradicting it, since `refines` covers "more precisely, or for a narrower case".

## Themes that recur across sections

- A. One approval status for the whole specification: 1.3.3, 10.6, 14.1, 14.2. A monorepo or a project adopting the
  method part by part needs a status per part, the whole specification being the default.
- B. Tests at every push: 1.6.1, 10.2 and row 66. Proposed: an approved specification's tests pass before a change
  reaches the shared branch; which tests run where is the project's choice.
- C. The scope of a term: 3.1, 3.2, rows 6 and 7, 7.2.4. Proposed: one term for one thing within a scope; a term
  shared across scopes stands in the contracts section; the default scope is the whole specification; case
  sensitivity is the project's choice.
- D. How the guidelines reach a project: 2.4 and row 43. Proposed: one named release, used whole, never edited; it may
  arrive through the plugin, a pinned package or a read-only copy checked against the release.
- E. Which code carries a SpecTag: 1.5.2, 9.3, rows 44 and 70. Proposed: the list of kinds of symbol becomes examples;
  a further language, or a unit such as SQL or Terraform, is described by an extension or a project; generated code is
  bound through its input; vendored code is named as kept outside.

## Sections 1 to 5

Blocks adoption:
1. 1.3.3 with 1.3.2: approval covers the whole specification; "a push runs no test". See A; say "no test refuses a
   push" instead of "runs no test". High.
2. 1.1.4: the base names no technology. A library, an SDK, a protocol or a developer tool exposes a technology as its
   product. Proposed: ban the technologies the system is built with; allow those it serves or exposes, listed by the
   project's own guidelines. High.
3. 1.5.2: every symbol has a SpecTag, from a closed list of kinds of symbol. See E. High.
4. 1.6.1: tests run at a push. See B. Medium-high.
5. 3.2 with 3.1: a term is defined once, in contracts. See C. Medium.
6. 1.2.6: the code contains nothing of its own. API-first contracts owned elsewhere, data tables kept by people
   outside development, design tokens. Proposed: a node may name an outside, versioned artifact that holds its
   content, checked as `list.declaredIn` is. Medium.
7. 2.4: the guidelines are held in the plugin, with no copy. See D. Medium.
8. 1.3.4 with 1.3.3: one owner approves. A regulated team needs two approvals. Proposed: approved once the approvals
   the project requires stand, one by default. Medium.

Causes friction:
9. 4.1: one technical appendix, one section for the stack. Proposed: one appendix per implementation. Medium.
10. 4.3: the look of a user interface goes to the appendix. Proposed: the look goes in the base where a user or a
    regulation relies on it in every instance. Medium.
11. 1.4.2: a test must name a rule. Proposed: a test of technical code carries the SpecTag that names no node, with
    its reason. Medium-low.

Strict by principle, noted: 1.2.4 and 1.2.5 (everything in the node; a link to an outside tracker would keep it
visible); 1.3.6 (an agent approves on the owner's behalf; e-signature rules may forbid it); 1.5.1, 1.3.2 and 1.2.7 (no
path for an emergency fix approved afterwards); 1.4.1 (a rule verified only by a manual procedure); 1.6.1 (a reviewer at
every commit; an air-gapped team with no model).

## Sections 6 to 10

Blocks adoption:
1. 7.6.1: every node is in English. A team whose owners write in another language cannot approve what it cannot read.
   Proposed: each document of a project's own specification is in one language that its own guidelines name; the
   SpecSheriff guidelines stay in English; 7.5.2, 7.6.2, row 18 and 7.1 then refer to the document's language. High.
2. Rows 44 and 70 with 9.3: where a SpecTag goes is described only for TypeScript, JavaScript and Python. See E. High.

Causes friction:
3. 10.10: no project tool changes what the commit holds. Formatters that re-stage files. Proposed: no tool changes the
   commit after the checks read it; the project may list tools that rewrite and run before the checks. High.
4. 10.8: a SpecTag only in the system's code and its tests. This repository's own tool tests carry SpecTags.
   Proposed: a SpecTag outside the system's code never counts toward implementing a rule of the system; tools and
   their tests may be bound to rules of the guidelines. Medium-high.
5. Rows 6 and 7 with 7.2.4: terms in contracts, unique whatever the case. See C. Medium.
6. 9.2 and row 63 with 9.7: implemented means a bound test passes. Verification by inspection, analysis, a manual
   protocol or a test bench. Proposed: bound to what carries it out and to a passing verification; the project adds
   kinds of verification whose records a check reads by sid. Medium.
7. 10.2 and row 66: tests run at each push. See B. Medium.
8. 9.5 and row 64: the commit message names every node. Wide refactors, squash merges. Proposed: the history records
   which nodes each change implements, in a place the project chooses. Medium.
9. 7.2.2, 7.3.2, 7.5.2: the form rules of section 7. A process that mandates EARS, 29148 "shall" statements or user
   stories. Proposed: 7.1, 7.2.1, 7.2.7, 7.3.3, 7.4.1 and 7.4.2 stay binding; the rules on order, sentences and layout
   apply unless the project's own guidelines name a writing standard. Medium.
10. Row 43: no project keeps a copy of the guidelines. See D. Medium.
11. 6.1 and 6.6: only an extension defines a type of link; a ratio is one of four. Proposed: a project's extension of
    the schema (5.2) may declare types of link; any UML multiplicity. Medium for 6.1, low for 6.6.
12. 10.6 and sections 9 and 10 built on git: see A; other version control systems. Low.

Strict by principle, noted: 9.3 and row 44 (every symbol tagged); 9.2, 10.3 and row 50 (specification first); rows 69,
9, 10 and 46, and 10.6 (owners' approval; no path for an on-call hotfix); 10.2, 10.5 and row 65 (a reviewer at every
commit; the tools accept only the Claude Code and Codex CLIs as runners, so a team barred from an outside model cannot
commit code; a runner the project names would keep the principle); 6.2 to 6.4 and 10.12.

Inconsistency found: 6.1 still defined `overrides` and row 67 of table 10.1 still checks it; being removed after the
owner agreed to 1.7.2.

## Extensions, sections 11 to 14

Blocks adoption:
1. 12.12: a RecordType refers only to RecordTypes of its own domain and to fragments in contracts. A pipeline stage
   that extends another's record; an order naming its customer. Proposed: a RecordType may refer to or refine any
   RecordType by sid; the domain boundary moves to Domains in general terms, reported, and a project may make it
   refused. High.
2. 11.1.3: domains do not use one another in a cycle, refused. Event-driven domains; an existing design with a cycle.
   Proposed: report a cycle; a project may refine the report to a refusal. High.
3. 12.4: a generated RuntimeCheck refuses a nonconforming record at every output and write. Fixes the mechanism, the
   place and the policy. Proposed: records a part outputs or stores conform to their RecordType, with the generated
   refusal at output as the default; the project names where conformance is enforced and what happens to a
   nonconforming record. High.
4. 12.1: a RecordType describes what a domain outputs and stores, declared in the only domain where its data first
   appear; data taken in from outside is excluded. A pipeline; an ingester of a partner's file; a table several parts
   write. Proposed: a RecordType describes data one part passes to another, receives from outside, emits or stores;
   it is declared in the part that answers for the format, or in contracts where several parts do. High.
5. 12.3: types and RuntimeChecks are generated; the generator writes only TypeScript, Python and JSON Schema from a
   closed set of neutral types. Proposed: every type and check describing a RecordType is derived from it or checked
   against it, generation by default; the permission to add generators moves to the base, or a project names a check
   comparing a hand-written type with its RecordType. Medium-high.
6. 14.1 and 14.2: one status for the whole specification. See A. Medium.

Causes friction:
7. 13.1: one draft RecordType freezes every generated type. Proposed: each copy is generated from the last approved
   wording of each node, and nodes never approved are left out; 10.12 must leave room for it. Medium-high.
8. 11.1.3: a domain's header names one directory for its code. Proposed: several paths or patterns. Medium.
9. 12.1: RecordType names unique across the specification. Proposed: unique within a generated file. Low.

Still tied to another extension: 12.1, 12.4, 12.5, 12.6 and 12.12 speak of domains (12.5 and 12.6 cite 11.1.1); the
reason of 11.1.1 cites 12.1; 13.1 cites 12.3; 12.3 depends on 13.2; two of the sources 12.7 lists are about domains;
12.13 to 12.15 join 11 and 12 (12.8 may cover them, or they go to the archive or to a project's own guidelines); 14.4
may name domains if it carries the sentence of 1.8 about reviewing a domain whole.
