# "How a project's own code generator is run", a new node of the appendix of the tools, agreed on 2026-11-22

## Title

How a project's own code generator is run

## Text

`sheriff types` runs each of the project's own code generators (§s-km4x4s26kv7pjze) with the command that `sheriff.config.json` names for it. It runs a generator only while the rule that lists the generator is approved.

`sheriff types` passes the generator, on its standard input, a model of the specification in the form that `sheriff json` prints (§s-w6gybeqn2ttydqx). That model holds each section and each domain's header as the files hold them. Of the other nodes, it holds only those that code can be generated from, each in its last approved wording (§s-a8fn72xa782wvbk).

The generator prints a JSON array holding one object per generated file. The object's `path` is the file's path from the root of the repository, its `content` is the file's text, and its `sids` lists the sids of the nodes that the file is generated from.

`sheriff types` refuses a generator in each of these cases:
- the rule that `sheriff.config.json` names for the generator lists no generator of that name;
- the generator exits with a non-zero status;
- the generator prints anything other than a JSON array of objects holding `path`, `content` and `sids`;
- a path that the generator prints lies outside the system's code (§s-hheus6f395ynqvc);
- the `sids` of a file that the generator prints name a node outside the model that the generator is handed.

## Reason

A project's own generator is a program that the SpecSheriff tools did not write, yet what it prints becomes the system's code. `sheriff types` therefore decides what the generator reads and which of its output is written, so that the generated code implements only what the owners have approved (§s-qyjw8xez6t6adc3).
