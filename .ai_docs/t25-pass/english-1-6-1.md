# What the checks enforce, and when they run

Two things are checked mechanically:
- that the specification conforms to the rules of the guidelines that the main table of checks, or the table of checks of an extension, lists;
- that the specification and the code still agree with each other.

Every check except the review is deterministic.

In the review, an independent reviewer judges the following (§s-nyh9yk22ba6g77q):
- at every commit that changes code: whether that code does what the rules that the commit names say, and nothing that they do not say;
- at a commit whose message states that a rule's implementation needs no change: whether that statement is true;
- at a commit in which a node of the technical appendix (§s-qmmzf9nksfsa3qp) is approved, if the node has an `implements` link (§s-sn6au3vcr9uy5pm) to a rule of the base specification: whether the node refines the rules of the base specification that it implements and contradicts no rule of the base specification.

The checks run when a commit is made. Where an agent writes the specification, the tests or the code, the checks also run after each of its edits (§s-epaw9sgyaajzn8g). Some of its edits are refused before they are made (§s-83ev4wwesbwnhnp). As long as the specification has the status `approved`, the tests of the system's code and of a project's own checks and generators must pass before a change reaches the project's shared branch. The project's own guidelines (§s-u7tw6m8npxmv5tu) name where the tests run, such as on every push or on a shared server before a merge.

A failed check refuses the change, unless the table that lists the check says otherwise (§s-jau82aq9juv9zzh).

Example: A project whose tests need a database states in its own guidelines that the tests run on a shared server before a merge. A push from a developer's machine then runs no tests, and the merge waits until the tests pass.

Reason: Every check but the review is binary, so a refusal requires nobody's judgement. A check that sometimes refuses for a reason nobody can reproduce is bypassed at the first opportunity and never trusted again. The review needs a reviewer, because no script can decide whether code does only what its rules say, whether a rule's implementation really needs no change, or whether a node of the technical appendix agrees with the base specification.

Run at each of an agent's edits, a check finds a mistake where it is made. The order in which the test and the code are written can be seen only edit by edit, since a commit contains the test and the code together.

The tests are not run on a commit, since a test suite takes longer than anyone should wait for a commit. A change not yet shared misleads nobody, so its tests can wait until it is shared. Where they run is the project's choice, since some suites take hours or need what a developer's machine lacks. While the specification is a draft, no test has to pass, for the reason §s-xhcmchcngykvn2k gives.
