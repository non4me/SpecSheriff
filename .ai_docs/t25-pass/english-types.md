# "What `sheriff types` generates", a new node of the appendix of the tools, agreed on 2026-11-22

## Title

What `sheriff types` generates

## Text

`sheriff types` generates, from the last approved wording of each node (§s-qyjw8xez6t6adc3), the parts of the system's code (§s-hheus6f395ynqvc) that are derived from the nodes:
- the types and the RuntimeChecks (§s-e877bnfa559tvk9) generated from the RecordTypes (§s-7vm323mhry2enx3), in the files that the technical appendix lists for them (§s-pvzms7d8kxb8dk2);
- the files that each of the project's own code generators prints (§s-km4x4s26kv7pjze, §s-y5yk7eu6h4zrjpr).

The last approved wording of a node is the wording whose fingerprint the node's last approval records (§s-v4qus7raqnwzneb). `sheriff types` takes that wording from the files of the specification where they hold it. Otherwise it takes the wording from the latest commit on the current branch whose files hold it, and reads that wording in the form into which `sheriff reindex` would rewrite it (§s-gb8s9657a65hqmv).

Where neither holds that wording, `sheriff types` names the node and takes the latest wording that an approval of the node records and that the files or the current branch hold. Where there is none, it treats the node as never approved.

`sheriff types` treats only a RecordType as relying on other nodes. A RecordType relies on each of the following RecordTypes, directly or through other RecordTypes:
- each RecordType that it refines;
- each RecordType that one of its fields refers to.

`sheriff types` takes the `refines` links of a RecordType from the commit that added the RecordType's last approval to `specs/_approvals.jsonl`, and from the files of the specification until that commit is made.

`sheriff types` names by its sid each node that it leaves out because that node relies on a node that has never been approved (§s-f8fmudceuyaj942).

`sheriff types` generates the types and RuntimeChecks from the gathered values written beside a field (§s-ju5vcanbjph7mgh) as the files of the specification hold them when it runs, even when a RecordType's approved wording is taken from a commit.

`sheriff types` writes a file only where the file is missing or holds, line endings aside, content other than what it generates. It names each file that it writes.

If any of the following is true, `sheriff types` names each refusal and writes no file:
- the check of generated copies against the nodes refuses anything that `sheriff types` would write (§s-dbk2vyeg8z5jxna);
- `sheriff types` refuses a project's generator (§s-y5yk7eu6h4zrjpr).

## Reason

`sheriff types` regenerates the code that comes from the nodes after every edit and at every commit (§s-kh8qcd5kxgh9z3j). Each run therefore changes only what a change in the approved wordings affects, and leaves that code either wholly regenerated or untouched.
