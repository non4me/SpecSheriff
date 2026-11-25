# When the checks run

The SpecSheriff tools run the checks at these moments:
- before an agent's edit is made: the checks that can tell from the edit itself that it would break a rule, and that refuse it (§s-83ev4wwesbwnhnp);
- after each edit by an agent: every check that needs neither a commit message nor a run of the tests, from the main table of checks (§s-jau82aq9juv9zzh) or from the table of checks of an extension;
- on a commit: every check in those tables except the tests and the review;
- on a commit for which the list of the reviewer's judgements (§s-m4h279nbaqkpa3t) names at least one judgement: also the review, in which an independent reviewer makes every judgement that the list names for that commit;
- on a push, where the project's own guidelines (§s-u7tw6m8npxmv5tu) name a push as the moment at which the tests run: the tests of the system's code and of a project's own checks and generators, as long as the specification has the status `approved`;
- before the approval procedure records an approval of the specification: the checks that the rule on the specification's approval status names (§s-qzthyh7yqvfhsa2), over the whole specification and all of the system's code.

After an agent's edit, the SpecSheriff tools report to the agent what the checks refuse.

Reason: Each check but the tests runs at the earliest moment at which everything it reads is available, so a mistake is caught and fixed where it is made.
