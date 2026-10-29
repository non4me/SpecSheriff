# Principles

The principles SpecSheriff rests on. Every rule of the guidelines, every tool and every proposal is
weighed against them: one that contradicts a principle is wrong, unless the principle is changed
first.

## What SpecSheriff is for

SpecSheriff offers the skills and the scripts that guarantee work in this paradigm and make it as
easy as it can be: what a principle below requires, a script checks or a skill carries out, so that
nobody has to remember it.

## Three documents, changing at three rates

The specification of a project working this way is made of three documents. The guidelines say how
the specification is kept and implemented; they hardly change over the project's life. The base
specification says what the system does, as rules linked to one another; it changes only when the
business logic or the system's core functionality does. The technical appendix says how the system
is built; it changes most often, since debugging a defect found usually changes it, and rules particular to
the implementation, such as those of a user interface, are made precise there.

## The specification first, in one direction

Every change runs the same way. The specification changes first, as single rules, each with its
permanent identifier, the sid. Then the tests of those rules are written, and then the code that makes
them pass. Never the reverse: wanting the code to behave differently is a reason to change a rule.

## Rule, test and code bound by the sid

A rule knows the code and the tests that implement and verify it, a test carries the sid of the rule
it verifies, and every symbol of the code carries a tag naming the node it implements. The sid also
links rules to one another, so that what a change touches is traced exactly, and the context given to
a person or an agent is the rules that bear on the task rather than the whole specification.

## Deterministic checks hold every participant to the contract

Checks that answer the same for the same change hold the chain together: hooks in the agent's
harness, at each of its edits, where the order rule, test, code is also held; and git hooks at every
commit, the final gate on each participant's machine, whoever made the change; a team that needs the
gate to hold for everyone runs the same checks in CI. The one judgement that is not deterministic — whether
the code does only what its rules say — is made at every commit by an independent reviewer.

## A rule is self-sufficient

Everything that bears on a rule is in its node and seen at a glance: its text and its reason, the
links it makes and the links the rest of the specification makes to it, the decisions taken on it,
the work deferred on it, and comments, an open problem marked as one.

## Nothing unconfirmed is implemented

Anyone may change or add a rule. A rule is implemented only once its owner has confirmed that they
understood it and that it is legitimate, and a change to its wording leaves it unconfirmed until the
owner confirms the new wording. The specification has an owner by default; a domain or any section
may name its own, and a rule's owner is the one named nearest above it.
