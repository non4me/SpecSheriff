# Group 3 drafts of round f for review (generated 2026-11-24T14:50:08.857Z)

## What the independent reviewer judges | key proposal:s-m4h279nbaqkpa3t | sid s-m4h279nbaqkpa3t | spec 1.6.2 (in rule 1.6.1's place, after the new rule on what the checks enforce)

### Text

In the review of a commit, an independent reviewer judges the following (§s-nyh9yk22ba6g77q):

on every commit that changes code other than the files generated from the specification: whether that code does what the rules named in the commit say and does nothing that they do not say;

on every commit that adds or changes a comment in the code or in a test, other than in the files generated from the specification: whether each such comment is consistent with the code that it describes and with the rules that this code implements or that this test is written from;

on a commit whose message states that a rule's implementation needs no change: whether that statement is true;

on a commit in which a node of the technical appendix (§s-qmmzf9nksfsa3qp) is approved, if the node has an `implements` link (§s-sn6au3vcr9uy5pm) to a rule of the base specification (§s-5x737t9nee4zgaa): whether the node refines the rules of the base specification that it implements and contradicts no rule of the base specification.

### Reason

No script can decide whether code does only what its rules say, whether a comment agrees with the code and its rules, whether a rule's implementation really needs no change, or whether a node of the technical appendix agrees with the base specification. So these judgements are made by an independent reviewer. Code generated from the specification only restates it, so the reviewer has nothing to judge there.

### Outgoing links

```json
[
  {
    "type": "cites",
    "to": "s-nyh9yk22ba6g77q"
  },
  {
    "type": "cites",
    "to": "s-qmmzf9nksfsa3qp"
  },
  {
    "type": "cites",
    "to": "s-sn6au3vcr9uy5pm"
  },
  {
    "type": "cites",
    "to": "s-5x737t9nee4zgaa"
  }
]
```

### The current node

Title: What the checks enforce, and when they run

Two things are checked mechanically:
- that the specification conforms to the rules of the guidelines that the main table of checks, or the table of checks of an extension, lists;
- that the specification and the code still agree with each other.

Every check except the review is deterministic.

In the review, an independent reviewer judges the following (§s-nyh9yk22ba6g77q):
- on every commit that changes code: whether that code does what the rules named in the commit say and does nothing that they do not say;
- on a commit whose message states that a rule's implementation needs no change: whether that statement is true;
- on a commit in which a node of the technical appendix (§s-qmmzf9nksfsa3qp) is approved, if the node has an `implements` link (§s-sn6au3vcr9uy5pm) to a rule of the base specification: whether the node refines the rules of the base specification that it implements and contradicts no rule of the base specification.

The checks run when a commit is made. Where an agent writes the specification, the tests or the code, the checks also run after each of its edits (§s-epaw9sgyaajzn8g). Some of its edits are refused before they are made (§s-83ev4wwesbwnhnp). As long as the specification has the status `approved`, the tests of the system's code and of a project's own checks and generators must pass before a change reaches the project's shared branch. The project's own guidelines (§s-u7tw6m8npxmv5tu) name where the tests run, such as on every push or on a shared server before a merge.

A failed check refuses the change, unless the table that lists the check says otherwise (§s-jau82aq9juv9zzh).

Reason: Every check but the review is binary, so a refusal requires nobody's judgement. A check that sometimes refuses for a reason nobody can reproduce is bypassed at the first opportunity and never trusted again. The review needs a reviewer, because no script can decide whether code does only what its rules say, whether a rule's implementation really needs no change, or whether a node of the technical appendix agrees with the base specification.

Run after each of an agent's edits, a check finds a mistake where it is made. The order in which the test and the code are written can be seen only edit by edit, since a commit contains the test and the code together.

The tests are not run on a commit, since a test suite takes longer than anyone should wait for a commit. A change not yet shared misleads nobody, so its tests can wait until it is shared. Where they run is the project's choice, since some suites take hours or need what a developer's machine lacks. While the specification is a draft, the work is focused on the specification itself, so no test has to pass.

## What the checks enforce | key proposal:new-spec-1-6-checks | sid s-5j9s5dstbawdd69 | spec 1.6.1 (new, split from rule 1.6.1, before it)

### Text

The following are checked mechanically:

that the specification conforms to the rules of the guidelines that the main table of checks (§s-jau82aq9juv9zzh), or the table of checks of an extension (§s-gpzs5fcxvp6jkrp), lists;

that the specification and the code still agree with each other.

Every check except the review (§s-m4h279nbaqkpa3t) is deterministic.

A failed check refuses the change, unless the table that lists the check says otherwise (§s-jau82aq9juv9zzh).

### Reason

Every check but the review is binary, so a refusal requires nobody's judgement. A check that sometimes refuses for a reason nobody can reproduce is bypassed at the first opportunity and never trusted again.

### Outgoing links

```json
[
  {
    "type": "cites",
    "to": "s-jau82aq9juv9zzh"
  },
  {
    "type": "cites",
    "to": "s-gpzs5fcxvp6jkrp"
  },
  {
    "type": "cites",
    "to": "s-m4h279nbaqkpa3t"
  }
]
```

### The current node

(none: this node is new)

## The checks on a commit and on an agent's edits | key proposal:new-spec-1-6-runs | sid s-ec6meku7xd34ych | spec 1.6.3 (new, split from rule 1.6.1)

### Text

The checks run when a commit is made. Where an agent writes the specification, the tests or the code, the checks also run after each of its edits (§s-epaw9sgyaajzn8g). Some of its edits are refused before they are made (§s-83ev4wwesbwnhnp).

### Reason

A check that runs after each of an agent's edits finds a mistake at the moment it is made. The order in which the test and the code are written can be seen only edit by edit, since a commit contains the test and the code together.

### Outgoing links

```json
[
  {
    "type": "cites",
    "to": "s-epaw9sgyaajzn8g"
  },
  {
    "type": "cites",
    "to": "s-83ev4wwesbwnhnp"
  }
]
```

### The current node

(none: this node is new)

## When the tests must pass | key proposal:new-spec-1-6-tests | sid s-x8uzc8z44pwtd3h | spec 1.6.4 (new, split from rule 1.6.1)

### Text

As long as the specification has the status `approved`, the tests of the system's code (§s-hheus6f395ynqvc) and of a project's own checks (§s-2fau85dfyyeq66m) and generators (§s-km4x4s26kv7pjze) must pass before a change reaches the project's shared branch. The project's own guidelines (§s-u7tw6m8npxmv5tu) name where the tests run, such as on every push or on a shared server before a merge.

### Reason

The tests are not run on a commit, since a test suite takes longer than anyone should wait for a commit. A change not yet shared misleads nobody, so its tests can wait until it is shared. Where they run is the project's choice, since some suites take hours or need what a developer's machine lacks. While the specification is a draft, the work is focused on the specification itself, so no test has to pass.

### Examples

```json
[
  {
    "en": "A project whose tests need a database states in its own guidelines that the tests run on a shared server before a merge. A push from a developer's machine then runs no tests, and the merge waits until the tests pass.",
    "ru": "Проект, тестам которого нужна база данных, называет в собственных guidelines, что тесты запускаются на общем сервере перед слиянием. Тогда push с машины разработчика тестов не запускает, а слияние ждёт, пока тесты пройдут."
  }
]
```

### Outgoing links

```json
[
  {
    "type": "cites",
    "to": "s-hheus6f395ynqvc"
  },
  {
    "type": "cites",
    "to": "s-2fau85dfyyeq66m"
  },
  {
    "type": "cites",
    "to": "s-km4x4s26kv7pjze"
  },
  {
    "type": "cites",
    "to": "s-u7tw6m8npxmv5tu"
  }
]
```

### The current node

(none: this node is new)

## undefined | key proposal:row-10-1-43b | sid s-td4e3rdga6azav9 | spec 10.1.43b (new row of the main table of checks, after row 10.1.43a)

### Text

Each comment that a commit adds or changes in the code or in a test, other than in the files generated from the specification, is consistent with the code that it describes and with the rules that this code implements or that this test is written from

### Reason

(none)

### Outgoing links

```json
[
  {
    "type": "checks",
    "to": "s-m4h279nbaqkpa3t"
  },
  {
    "type": "checks",
    "to": "s-nyh9yk22ba6g77q"
  }
]
```

### The current node

(none: this node is new)
