# Principles

The principles SpecSheriff rests on. Every rule of the guidelines, every tool and every proposal is
weighed against them: one that contradicts a principle is wrong, unless the principle is changed
first.

## What SpecSheriff is for

SpecSheriff offers the skills and the scripts that guarantee that work follows the paradigm of
spec-anchored development. They also make working this way as easy as it can be: whatever a principle
below requires, a script checks or a skill carries out, so that nobody has to remember it.

## Three documents, changing at three rates

The specification of a project that uses SpecSheriff consists of three documents. The guidelines say how
the specification is kept and implemented; they hardly change over the project's life. Whatever in
the guidelines prescribes how the system is organised belongs in their extensions. A project uses
an extension only if it chooses to. The base
specification says what the system does, as rules linked to one another; it changes only when the
business logic or the system's core functionality does. The technical appendix says how the system
is built; it changes most often, since debugging a defect usually changes the appendix, and rules specific to
the implementation, such as those of a user interface, are refined there.

## The specification first, in one direction

Every change follows the same course. The specification changes first, in individual rules, each with its
permanent identifier, the sid. Then the tests of those rules are written, and then the code that makes
them pass. Never the reverse: wanting the code to behave differently is a reason to change a rule.

## Rule, test and code bound by the sid

A rule knows the code that implements it and the tests written from it. That code and each of those tests are
bound to the rule by a SpecTag naming it by its sid. The sid also links rules to one another,
so that what a change touches is traced exactly, and the context given to a person or an agent consists of the
rules that bear on the task rather than the whole specification.

## Deterministic checks hold every participant to the contract

Checks that produce the same result for the same change hold the chain of rule, test and code together:

- hooks in the agent's harness run on each edit the agent makes, and make sure that a rule is written before
  its tests and its tests before its code;
- git hooks run on every commit, as the last checks on each participant's machine that can refuse the commit,
  whoever made the change.

A team that needs the git hooks' checks to apply to everyone also runs them in CI.

An independent reviewer makes the judgements that are not deterministic:

- for every commit in which code is changed: whether the code does only what its rules say;
- for a commit whose message states that a rule's implementation needs no change: whether that statement is
  true;
- for a commit in which a node of the technical appendix is approved: whether the node refines the rules of
  the base specification that it implements and contradicts no rule of the base specification.

## A rule is self-sufficient

Everything that bears on a rule is in its node and can be seen at a glance: its text and its reason, the
links it makes and the links the rest of the specification makes to it, the decisions taken on it,
the work on it that has been deferred, and comments, with an open problem marked as such.

## Nothing unapproved is implemented

Anyone may change or add a rule. A rule is implemented only after one of its owners has approved it,
having understood it and judged it legitimate. A change to a rule's wording makes the rule a draft again
until one of its owners approves the new wording.

A node is approved on behalf of one of its owners, and the approval is reported to that owner, in each of
these cases:

- the change to the node only states what an owner has already approved, or does not change the node's
  meaning;
- the node belongs to the technical appendix, implements an approved rule of the base specification, and was
  written by an agent that was implementing that rule.

The specification has one or more default owners. A domain or any section may name its own owners, and a
rule's owners are those named by the nearest section or domain above it that names owners.
