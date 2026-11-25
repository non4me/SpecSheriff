# The specification's approval status

Only an owner of the specification approves it or returns it to draft. That owner records each such act in a separate entry, which names that owner. Only the latest such entry determines the specification's approval status.

Before the approval procedure records an approval of the specification, it runs the checks listed in the main table of checks (§s-jau82aq9juv9zzh) or in the table of checks of an extension. It leaves out the review and the checks that need a commit message or a run of the tests. It runs the others as if the specification were approved and one commit added the whole specification and all of the system's code (§s-hheus6f395ynqvc). It shows the approving owner what they find, for example a symbol without a SpecTag (§s-8xw4mgvpexyvw5q) or an approved rule that has no test or no code. If the checks find anything, the procedure records the approval only after the owner confirms the approval. While the specification's `strict` flag is on, the procedure refuses to record the approval in the cases that the rule on that flag names (§s-q3pfzyaxvpr2zj2).

Example: Every rule of the specification is approved, but none of its owners has approved the specification. The specification is a draft. But not: the specification is approved because all its rules are, as a section would be.
Example: The specification's strict flag is off. Two symbols of old code have no SpecTag. An owner starts the approval procedure, sees the two symbols listed, confirms, and the specification is approved. But not: the procedure refuses to approve the specification until every symbol has a SpecTag.

Reason: Whether the specification is approved determines whether the tests must pass before a change reaches the project's shared branch (§s-m4h279nbaqkpa3t). So its owners decide it, in both directions, by an act of their own.

The owners may need to return the specification to draft for any reason. While the specification is changing fundamentally, for example when another version of it is adopted or the system's architecture changes, the code and the tests are secondary.

Approving the specification is a decision of its own, separate from approving any rule. Were the specification's approval status tied to a rule, anyone editing that rule would change it.

The owners base their decision on what they see. Old code without a SpecTag may still work correctly, so while the `strict` flag is off, such code does not block the approval. The checks at a commit judge only what the commit contains, so they never show everything that the specification and the code still lack. Seeing what is missing, the owners approve the specification deliberately rather than by oversight.
