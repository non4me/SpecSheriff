# "What the SpecSheriff tools read in the project's own guidelines", a new node of the appendix of the tools, agreed on 2026-11-21

## Title

What the SpecSheriff tools read in the project's own guidelines

## Text

The SpecSheriff tools read the following in the project's own guidelines (§s-u7tw6m8npxmv5tu), kept in `project.json` (§s-zefk589ykh37b8u):
- the specification's owners (§s-6sk8uet75dmq5qz): those whom the top node of `project.json` names;
- if the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), the levels of the domains: the members of the `TextRule.list` of the rule that refines the rule on a domain's level (§s-nkyty4dy9x2v2a4);
- test fixtures: the files that match the glob patterns in the `TextRule.list` of each rule that refines the rule on such fixtures (§s-6hha5en226aj8hu);
- the project's own kinds of node: the members of the `TextRule.list` of the rule that refines the rule on such kinds (§s-vsh384ybt4w25a2);
- the project's own checks and generators (§s-2fau85dfyyeq66m, §s-km4x4s26kv7pjze): the members of the `TextRule.list` of the rule that `sheriff.config.json` names for each such check or generator;
- the project's own tools that rewrite files: the members of the `TextRule.list` of the rule that refines the rule on the order in which tools and checks run (§s-pcnyfp7gev7syax), where each member is the path of a tool relative to `.githooks/`, such as `pre-commit.d/format` (§s-n4m5zvh96yb299p);
- the files other than JSON files whose format allows no comments: those that match the glob patterns in the `TextRule.list` of the rule that refines the rule on how code is bound to its rules (§s-kgbzk2ph9e6jfb4);
- the `exempts` links of the nodes of `project.json` (§s-gf6n8ge4mke3pr2).

Where an item above refers to the rule that refines another rule, the SpecSheriff tools find that rule by the `refines` link it carries, and read:
- nothing, if no rule of `project.json` refines that other rule;
- otherwise, the members of every rule of `project.json` that refines that other rule, in the order in which those rules appear there.

## Reason

The SpecSheriff tools need values that only a project's own guidelines set, such as who owns the specification (§s-m42rsngtayk9g3g). A project gives its own rules any titles and arranges those rules as it chooses, so the tools find each value in the top node of `project.json`, by a link, or by a setting in `sheriff.config.json`.
