# The method

SpecSheriff is a method of spec-anchored development: the specification is kept for the life of the
system, and the code is held to it, change by change. This page gives the method whole; its links
lead to each part in full.

## The problem

Coding agents write plausible code quickly. Nobody can then say which requirement a given line
serves, a decision taken a month ago is undone in passing by a refactoring nobody asked for, and
review cannot keep up with what is generated. A specification written in prose beside the code does
not help for long: nothing holds the code to it, and it decays without anyone noticing.

## The approach

The specification is a set of small rules, each a node with a permanent identifier, its sid, and with
its reason kept apart from what it requires (§s-kh8qcd5kxgh9z3j, §s-kag2m9tzdnduxdx,
§s-dpe5kcz4eamv39g). A rule is implemented only once its owner has confirmed its wording, and a changed
wording loses the confirmation until the owner confirms it again (§s-5ah25f6gy99panq,
§s-67vekyup7y8smap, §s-utvqbypzhmgndug).

Every change runs one way: the rule first, then its test, then the code (§s-ef93u6cnbs2sevr,
§s-rah8b37kytb682y). Every test declares the sid of the rule it verifies, and every symbol of the code
carries a tag naming the rule it implements (§s-kgbzk2ph9e6jfb4), so that what a change touches is
traced exactly, and an agent is given the rules that bear on its task rather than the whole
specification.

Checks that answer the same for the same change hold the chain together, at each edit an agent makes
and at every commit (§s-83ev4wwesbwnhnp, §s-jau82aq9juv9zzh). The one judgement no such check can make
— whether the code does only what its rules say — is made at every commit by an independent reviewer,
which sees only the change and the text of the rules the commit names, and refuses with the rule and
the line (§s-nyh9yk22ba6g77q).

The base specification names no technology; a technical appendix beside it says how the system is
built, so that the same rules can be built again on another stack (§s-5x737t9nee4zgaa,
§s-vj7ercem526zd6v). And a rule is written by a doctrine whose every item comes from a way
requirements were seen to decay unnoticed — a count in prose that goes stale, a general word without
its object, a rule bound to a name rather than to a property (§s-3w8puyqn2ramsre).

## The principles

Each in full in [the principles](principles.md):

- [What SpecSheriff is for](principles.md#what-specsheriff-is-for): what a principle requires, a
  script checks or a skill carries out, so that nobody has to remember it.
- [Three documents, changing at three rates](principles.md#three-documents-changing-at-three-rates):
  the guidelines, the base specification and the technical appendix.
- [The specification first, in one direction](principles.md#the-specification-first-in-one-direction):
  the rule, then its test, then the code.
- [Rule, test and code bound by the sid](principles.md#rule-test-and-code-bound-by-the-sid).
- [Deterministic checks hold every participant to the contract](principles.md#deterministic-checks-hold-every-participant-to-the-contract):
  at each edit an agent makes and at every commit, with one reviewer for what no check can judge.
- [A rule is self-sufficient](principles.md#a-rule-is-self-sufficient): everything that bears on a
  rule is in its node.
- [Nothing unconfirmed is implemented](principles.md#nothing-unconfirmed-is-implemented): a rule
  waits for its owner.

## How it differs from what exists

Each part of the method exists somewhere already, some of them for decades: permanent ids, links
and tags in code and tests in the traceability tools of regulated industries; a specification
written before the code, guiding an agent, in Spec Kit, Kiro and their kin; a sign-off tied to the
hash of the text, and a deterministic gate, in SpecGate; a model judging a pull request against its
ticket in Qodo, where it advises rather than refuses. No source found holds them together.
[The survey](research/landscape.md), dated and with its sources, says what each shares with
SpecSheriff and what it lacks.

## The guidelines

The method's own specification is written as nodes, the way it asks a project's to be, and the tools
hold this repository to it. The base, [`spec.json`](../specs/_guidelines/spec.json), states what is
held, what is checked, when, and what a failure costs, and names no technology. The appendix of the
tools, [`tools.json`](../specs/_guidelines/tools.json), says how the SpecSheriff tools carry the base
out: where the files are, the commands, the agent's hooks and git's, how each check is made,
how a tag and a test name their rule, who runs the reviewer and how a confirmation is recorded
(§s-a4rbry4hsu34hy8). A project takes both whole, at the version its owner names, and keeps beside
them guidelines of its own that refine them (§s-bsya3febm6u64ab). `sheriff guide` prints them all, and
`sheriff show <sid>` one node.

## The skills the method needs

Some of what the principles require no check can do: writing a rule well, putting it to its owner,
bringing in what a project already has. A skill carries each out, so that an agent does it the same
way every time.

- **spec** — the guidelines as they stand, printed by the tools rather than copied, for an agent about
  to write a node, a test or code: it works from the rules in force, not from memory.
- **spec-review** — working on the specification with its owner, one node at a time, shown whole, the
  original above a reading in the owner's language: a confirmation then means the owner read the
  wording.
- **spec-adopt** — bringing a project's existing documents into nodes, walked whole, the owner agreeing
  where each goes: a project rarely starts from nothing.
- **init** — laying out what the checks depend on: the hooks of the agent and of git, the guidelines
  and their schema, the settings naming the version and the owner. A check nobody installed holds
  nothing.
- **update** — moving a project to a newer version in one commit its owner makes, since a project
  takes the guidelines at the version its owner names.

How to use them, and which to take when, is the practitioner's guide, kept with the skills.

## Where the rest is

- The skills and the tools: [`skills/`](../skills/) — the SpecSheriff tools and their plugin for
  pytest; the plugin for Claude Code follows.
- The worked example, a saloon in a frontier town: to come.
- The decisions taken so far, and why: [the design log](design-log.md).
