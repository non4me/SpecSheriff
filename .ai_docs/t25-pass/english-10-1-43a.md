# Row 10.1.43a of the main table of checks

What is checked: Where a commit message states that a rule's implementation needs no change, the tests and the code bound to that rule, directly or through a chain of `implements` links (§s-sn6au3vcr9uy5pm), do what the rule's wording after the commit says and do nothing that it does not say

On failure: refused, naming the rule, while the specification is approved; reported, naming the rule, while it is a draft

Reason: Without this check, a commit could leave a rule's tests and code lagging behind its new wording, and avoid the cost of that lag, merely by stating that the rule's implementation needs no change.
