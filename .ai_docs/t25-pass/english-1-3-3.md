# When the status is approved

The specification, a section and a rule have different approval conditions:

- The specification as a whole is approved if an owner has carried out the approval procedure by hand (§s-qzthyh7yqvfhsa2).
- A section is approved while every rule in it is approved (§s-9kfdycuq34beqvs). Nobody approves it as such.
- A rule is approved while an approval stands for its present wording (§s-5ah25f6gy99panq).

Reason: Whether the specification is approved decides whether the tests of the system's code must pass before a change reaches the project's shared branch (§s-xhcmchcngykvn2k) and whether the checks take into account code that is outside the commit and carries no SpecTag (§s-kkbqcb9xrpaepwn). So its owners decide it by an act of their own, and not by how many rules are approved.

A section requires nothing of its own, so it leaves an owner nothing to agree to.

The status `approved` claims that the rule's present wording was approved by one of its owners or, as §s-t5uw8zfxzhfdg86 allows, by an agent on an owner's behalf. A status that survived a change to the rule would certify words nobody approved.
