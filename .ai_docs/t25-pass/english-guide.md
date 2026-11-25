# "The guidelines that a project follows, printed in one place", a new node of the appendix of the tools, agreed on 2026-11-22

## Title

The guidelines that a project follows, printed in one place

## Text

`sheriff guide` prints the guidelines that the project follows, each node with its links and without its metadata (§s-k4nqjr96ux7a5m7):
- the SpecSheriff guidelines;
- each extension of the guidelines that the project has chosen (§s-9ttvcwpqkehm58g);
- the project's own guidelines (§s-u7tw6m8npxmv5tu).

For each of the other extensions that the plugin delivers, `sheriff guide` prints the extension's name and what the extension is for.

After the guidelines, `sheriff guide` prints the appendix of the tools, under a heading that says the appendix is not part of the guidelines (§s-a4rbry4hsu34hy8).

`sheriff guide` also prints how many nodes each part of the specification holds and how many of those nodes are approved. It counts them each time it runs. It prints whether the specification is approved (§s-qzthyh7yqvfhsa2) and whether the specification's `strict` flag is on (§s-q3pfzyaxvpr2zj2).

## Reason

An agent reads the guidelines before it works on the specification. Printed by one command, they are exactly the rules that the project follows, whatever release of the SpecSheriff tools it uses and whichever extensions it has chosen. The appendix of the tools comes after them because it holds what an agent needs to apply them with the SpecSheriff tools, such as the syntax of the SpecTag.
