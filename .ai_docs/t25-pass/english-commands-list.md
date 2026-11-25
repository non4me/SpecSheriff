# "The commands that `sheriff` accepts", a node of the appendix of the tools, agreed on 2026-11-21

## Title

The commands that `sheriff` accepts

## Text

The SpecSheriff tools are run as `sheriff <command>` and accept only the following commands. Each command is listed with its purpose and the nodes that describe it:
- `sheriff validate`: checks that the specification holds together and that each change to it follows the guidelines (§s-4kd2pave7vm4hmd);
- `sheriff binding`: checks the specification against the code and the tests that are bound to it (§s-4kd2pave7vm4hmd);
- `sheriff citations`: checks that each sid cited in the code, the tests and the documentation names a node of the specification (§s-4kd2pave7vm4hmd);
- `sheriff guard`: checks an agent's edit before it is made, and refuses an edit that the SpecSheriff guidelines forbid (§s-4kd2pave7vm4hmd);
- `sheriff commit-message`: checks a commit's message against the code that the commit changes (§s-4kd2pave7vm4hmd);
- `sheriff review`: asks the independent reviewer for its verdict on a commit (§s-4kd2pave7vm4hmd);
- `sheriff init`: sets a repository up for SpecSheriff (§s-7unxytshhc4md54);
- `sheriff remove`: removes SpecSheriff from a repository and leaves the repository's specification as it is (§s-7unxytshhc4md54);
- `sheriff approve`: records an owner's approval of a node, or the withdrawal of that approval (§s-v4qus7raqnwzneb);
- `sheriff reindex`: writes into the specification what the SpecSheriff tools compute from it, and rewrites in its own form what an earlier release wrote (§s-ztseyetus7np6br, §s-gb8s9657a65hqmv, §s-w5wg69pvvhedsws);
- `sheriff types`: generates parts of the system's code from the approved wordings of the nodes, for example the types and runtime checks for the RecordTypes (§s-a8fn72xa782wvbk);
- `sheriff json`: prints as JSON the model of the specification, which a project's own check or generator reads (§s-w6gybeqn2ttydqx);
- `sheriff todos`: prints every todo of the specification together with its node (§s-fprt8xysafzjqv9);
- `sheriff guide`: prints the guidelines that the project follows, which an agent reads before it works on the specification (§s-jk8v3srrved7ram);
- `sheriff settings`: shows and changes the specification's approval status, its `strict` flag and the extensions of the guidelines that the project has chosen (§s-chsfpkgpmfk4fft);
- `sheriff untagged`: lists the symbols of the system's code that have no SpecTag, each with its file (§s-chsfpkgpmfk4fft);
- `sheriff show`: prints one node, found by its sid or its location (§s-k4nqjr96ux7a5m7);
- `sheriff markdown`: writes a human-readable export of the specification as Markdown (§s-k4nqjr96ux7a5m7);
- `sheriff map`: writes a map of the specification's structure (§s-rpv4fkdqqguptqd).

`sheriff` with no command prints the list of the commands. `sheriff --version` prints the version number of the SpecSheriff tools. `sheriff` with any other word in place of a command reports that word as unknown, prints the list of the commands and exits with code 2.

## Reason

A reader who knows what has to be done, or the name of a command, finds here the command for the task and the nodes that describe everything the command does.
