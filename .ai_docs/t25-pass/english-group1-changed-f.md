# T25, group 1: the sentences that round f changed

This file holds each sentence of group 1 that fix-group1-f.mjs changed, as it now reads, under the key of its node in `tools-drafts.json`.
A sentence is listed when the node's English held no identical sentence before round f. The whole English of each node is in `english-group1.md`.
fix-group1-f.mjs writes this file; edit the drafts, not this file.

## s-stxmhq3hgfndvn6 — A location that differs from the computed one

- `sheriff validate` refuses each node whose location (§s-kag2m9tzdnduxdx) is missing or differs from the one computed for it (§s-ygg5kpcxgzq3m7w, §s-tvxhtjbj7mmpmnx).
- So a location that differs from the computed one was left behind by a change that no run of `sheriff reindex` has followed yet, such as an edit made without an agent.

## s-zhen42p6mnaxu7w — A section with a rule in it

- a term (§s-khqsmy6mhejkrhg) or a node of a project's own kind (§s-vsh384ybt4w25a2, §s-pctqj9wqaq8762t);

## s-qvgzubkrafadqgf — exempts links

- `sheriff validate` accepts an `exempts` link (§s-gf6n8ge4mke3pr2, §s-6u54kfn4ze29r6h) only where the link is allowed.
- It refuses any other `exempts` link, naming the node that declares it by its file, its sid and its location (§s-kag2m9tzdnduxdx), and naming the link's target.
- It checks only an `exempts` link whose target is a node of the model of the specification (§s-w6gybeqn2ttydqx).
- An `exempts` link is allowed where all of the following hold:

## new:tools-7-1-consumes — consumes links

- `sheriff validate` refuses any other `consumes` link, naming the node that declares it by its file, its sid and its location (§s-kag2m9tzdnduxdx), and naming the link's target.
- It checks only a `consumes` link whose target is a node of the model of the specification (§s-w6gybeqn2ttydqx).

## proposal:s-kag2m9tzdnduxdx — A node's location

- the first top-level node of a file of the guidelines, of the appendix of the tools (§s-a4rbry4hsu34hy8) or of the technical appendix (§s-tj38pvm38nepaf5), which takes as its location the part's name followed by the file's name;
- In each file of the guidelines, of the appendix of the tools or of the technical appendix, the nodes are numbered under the location of the file's first top-level node.

## proposal:row-10-1-8 — a row of a table, spec 10.1.8 (row of the main table of checks)

- Every node of the specification is approved only while an approval of its current wording is in force.
- The check leaves out the following nodes:
- the nodes of the SpecSheriff guidelines that a project uses and of the extensions that the project has chosen (§s-9ttvcwpqkehm58g);
- sections and any other nodes whose approval status (§s-tgrnpagrb58tya7) is derived from other nodes

## proposal:s-sn6au3vcr9uy5pm — What a link is

- A node extends another when it adds a requirement on something that the other leaves open within its own subject, such as a value that the other leaves to each project.

## proposal:s-ztseyetus7np6br — What sheriff reindex writes

- where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), the approval status of the header of each domain, derived from every node of the domain other than its sections and the header itself, including the nodes in the cells of a `TableRule` (§s-yccuyqbypzzx2gu);

## proposal:s-83ev4wwesbwnhnp — An agent's edit is checked before it is made

- change the code written for a rule, including a rule of a project's own kind (§s-vsh384ybt4w25a2), while no test has that rule's SpecTag (§s-8xw4mgvpexyvw5q, §s-rah8b37kytb682y);
