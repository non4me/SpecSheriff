# Row 10.1.41 of the main table of checks

What is checked: An approved rule that the system's code (§s-hheus6f395ynqvc) must implement (§s-6fw72j65jkqrfpf) is bound to a test that is not marked as skipped or as expected to fail and to code of the system other than tests. Code or a test bound to a node that has an `implements` link (§s-sn6au3vcr9uy5pm) to the approved rule, directly or through a chain of such links, also counts as bound to the approved rule.

The check applies only to the approved rules that a commit includes. A commit includes an approved rule where any of the following happens in that commit:
- the rule's approval is added;
- a test or code bound to the rule before or after the commit changes;
- an `implements` link through which a test or code is bound to the rule is removed.

On failure: refused, naming the rule, while the specification is approved; passes while it is a draft

Example: The specification is approved. Code and a test not marked as skipped are bound to node N, which has an `implements` link to rule R. That code changes in a commit, so the commit includes R, and R passes. But not: R is refused because no SpecTag names R itself.

Reason: An approved rule committed without its test or its code would let the specification state what the system does not do, and nobody would notice. A test run does not count a skipped test, or a failing test expected to fail, as failed. So a rule whose only test is marked in either way would pass this check and the run of the tests while nothing checks the rule. While the specification is a draft, the work is focused on the specification itself, so an approved rule may still lack its test or its code.
