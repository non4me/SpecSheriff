# T25, group 1: the sentences that round e changed

This file holds each sentence of group 1 that fix-group1-e.mjs changed, as it now reads, under the key of its node in `tools-drafts.json`.
A sentence is listed when the node's English held no identical sentence before round e. The whole English of each node is in `english-group1.md`.
fix-group1-e.mjs writes this file; edit the drafts, not this file.

## s-stxmhq3hgfndvn6 — A location that differs from the computed one

- The refusal names the node's file and sid, the location that the file holds and the computed location.
- `sheriff validate` checks each node of the specification in the files that the repository keeps, including a node in a cell of a `TableRule` (§s-5fewsp22mmdz7y6).
- `sheriff reindex` writes every location after each edit that an agent makes (§s-477gtdrkw34dzxw).
- So a location that differs from the computed one was written by hand, or was left behind when the node was moved and `sheriff reindex` did not run afterwards.

## new:tools-7-1-location — How a node's location is computed

- The SpecSheriff tools compute a node's location (§s-kag2m9tzdnduxdx) from the path of its file and where the node is in the specification.
- In a file of the guidelines, of the appendix of the tools (§s-a4rbry4hsu34hy8) or of the technical appendix (§s-tj38pvm38nepaf5), the first top-level node of the file takes as its location the file's path under `specs/`, without `.json` (§s-zefk589ykh37b8u).
- in a file of the guidelines, of the appendix of the tools or of the technical appendix, the location of the first top-level node of that file, as in `_guidelines/spec/1.3.4`;
- the first top-level node of a file of the guidelines, of the appendix of the tools or of the technical appendix;
- The SpecSheriff tools go through the numbered nodes under a node in the order of the node's children.
- In a folder of the base specification, the top-level nodes of its files and the children of a domain's header are treated as nodes under one parent.
- The SpecSheriff tools go through them file by file, in the code-point order of the files' paths.
- The top-level nodes of one file come in the order in which the file lists them.
- The children of a domain's header take the header's position in that order.
- In a file of the guidelines, of the appendix of the tools or of the technical appendix, each further top-level node of the file is numbered under the location of the first node, after that node's children.
- Both commands therefore need one computation that gives every node a location of its own that is the same on every machine.
- A domain named `requests` is kept in three files: `specs/requests/00-requests.json` holds its header, `specs/requests/intake.json` holds one section, and `specs/requests/review.json` holds another.
- The header's location is `requests`, and the sections' locations are `requests/1` and `requests/2`.
- The most likely mistake is to number each file from one, which gives both sections the location `requests/1`.

## s-95w92rnjuv3sst8 — An approved node with no approval in force

- An approved node with no approval in force
- `sheriff validate` refuses each approved node for which no approval of its current wording is in force (§s-v4qus7raqnwzneb, §s-cey3k9xxjvkpyqz).
- `sheriff validate` checks each node of the specification in the files that the repository keeps, including a node in a cell of a `TableRule` (§s-5fewsp22mmdz7y6).
- the header of each domain, where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm, §s-yccuyqbypzzx2gu).
- The approval itself is recorded separately from the node, in `specs/_approvals.jsonl` (§s-v4qus7raqnwzneb).
- Comparing the two reveals an approval status typed by hand and one left `approved` after the wording changed.
- `sheriff validate` refuses the rule, since no approval of its new wording is in force.

## new:tools-7-1-approval-by — Who an added approval names

- Where the node is in the files that the repository keeps, the refusal also names the node's file, its location (§s-kag2m9tzdnduxdx) and its owners.
- An approval is added by a commit where `specs/_approvals.jsonl` holds more lines identical to that approval after the commit than it held in the commit's parent.
- `sheriff validate` takes a node's owners from the model of the specification (§s-w6gybeqn2ttydqx).
- A node's owners may change from one commit to the next, so each approval is judged against the owners as of the commit that adds it.
- A commit that adds the same approval and also makes `b@example.com` an owner of that section is accepted.
- The most likely mistake is to judge the approval against the owners named in the commit's parent, which would refuse that second commit.

## s-agc6fb3vx46pc23 — Values built from other nodes

- `sheriff validate` computes the following values:
- where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), the approval status of the header of each domain (§s-yccuyqbypzzx2gu, §s-bn8rvk6du2jkf2d);
- where the project has chosen the Domains extension, the index of the sections in the header of each domain (§s-2r59txnms5serdr, §s-6n2ab7escdtspwe);
- where the project has chosen the RecordType extension (§s-hzuzn8hbq6q9q4s), the values gathered for each field that has an `enum` (§s-ju5vcanbjph7mgh, §s-93jpnb4c96qhwbu).
- `sheriff validate` checks each node of the specification in the files that the repository keeps, including a node in a cell of a `TableRule` (§s-5fewsp22mmdz7y6).
- Computing every such value again reveals a commit that holds an out-of-date value or a value written by hand.
- The most likely mistake is to count only the nodes in a node's `children`, which leaves out the node in the cell.

## new:tools-7-1-one-header — One header for each domain

- So only reading all of them reveals that a header is missing or that there is a second one.

## new:tools-7-1-link-target — The target of a link

- It refuses any other link declared by a node of the specification in the files that the repository keeps, including a node in a cell of a `TableRule` (§s-5fewsp22mmdz7y6).
- Only such a link appears among the links pointing at its target (§s-bpdqd9v72wg7vsz).
- A rule still has a `refines` link to a rule that a later commit removed and archived.
- The most likely mistake is to look for the target only among the nodes in the files that the repository keeps.
- That mistake would refuse a `refines` link from a rule of a project's own guidelines to a rule of the SpecSheriff guidelines, which the project takes from the SpecSheriff plugin.
- `sheriff validate` accepts that link.

## s-qzyacnqwvaeaps4 — Citations and the links that match them

- `sheriff validate` refuses each of the following in a node of the specification in the files that the repository keeps, including a node in a cell of a `TableRule` (§s-5fewsp22mmdz7y6):
- A `§` followed by a sid cites that sid, in text in backticks too, where no lower-case letter or digit follows the sid (§s-cxtt6jvhqcey2k9).
- `sheriff validate` reads every property of a node for citations except the following (§s-cxtt6jvhqcey2k9):
- the nodes under it, including the nodes in its cells;
- Those links are complete only where every citation, in whatever property of a node it appears, names a node by its sid and is matched by a declared link.
- A node's reason shows `§base/3.2`, a citation by location, in backticks, and `sheriff validate` accepts it.
- In backticks, a `§` followed by a sid still counts as a citation, so the node must declare a link to the node with that sid.

## s-pvnnr844f3y964m — Link types reserved for terms

- It accepts a link of any other type, including `cites`, only where at least one of its ends is a node other than a term node.
- `sheriff validate` refuses every other link declared by a node of the specification in the files that the repository keeps, including a node in a cell of a `TableRule` (§s-5fewsp22mmdz7y6).
- It says that the link is to be agreed with the specification's owners.
- Whether two terms are bound, and how, shows how the entities (§s-9w3u3wn37wksyxd) that they name relate to one another.

## s-e2vdhfsndy5stq9 — A run of words in capitals

- The refusal names the run, the property that holds it, and the node by its file, its sid and its location (§s-kag2m9tzdnduxdx).
- `sheriff validate` checks each node of the specification in the files that the repository keeps, whatever its approval status.
- In what `sheriff validate` reads, a word set in capitals is a sequence of two or more consecutive characters that meet each of these conditions:
- no letter, digit or underscore comes immediately before or after them.
- Text in backticks, in straight double quotation marks or in curly double quotation marks (“…”) is not read.
- A rule's text ends with the words “WITHOUT ANY EXCEPTION”, written as part of a sentence, outside backticks and quotation marks.
- The most likely mistake is to let three abbreviations in a row, such as “HTTP REST API”, pass: `sheriff validate` refuses them too.

## s-zhen42p6mnaxu7w — A section with a rule in it

- A section whose rules have all been moved or removed still looks like a part of the specification.
- The most likely mistake is to refuse only the nested section.

## s-qvgzubkrafadqgf — exempts links

- The section on the stack holds a rule that chooses the programming language.
- A rule of `project.json` exempts that rule, since no symbol in the code can implement that choice.
- The exempting rule's text gives that reason and cites the rule that it exempts.
- The exempting rule also declares an `exempts` link to that rule, and `sheriff validate` accepts the link.
- The most likely mistake is to cite the exempted rule only in the reason, in which case `sheriff validate` refuses the link.

## new:tools-7-1-consumes — consumes links

- The index in a domain's header, and the check for a cycle in which domains use one another, both read from the `consumes` links which domain uses which section (§s-2r59txnms5serdr, §s-bncp7gtyaukur8e).
- Any other `consumes` link would make the index wrong or the cycle check give a wrong result.
- The most likely mistake is to point the link at the rule in that section that the domain `requests` relies on, in which case `sheriff validate` refuses the link.

## new:tools-7-1-guidelines-to-extension — A link from the SpecSheriff guidelines to an extension of the guidelines

- A link from the SpecSheriff guidelines to an extension of the guidelines
- `sheriff validate` runs this check only in the repository where the SpecSheriff guidelines are written (§s-zefk589ykh37b8u).
- There it reads every node of `specs/_guidelines/spec.json` other than a section, including a node in a cell of a `TableRule` (§s-5fewsp22mmdz7y6).
- In the repository where the SpecSheriff guidelines are written, the extensions of the guidelines are kept beside them.

## s-yprj7d6tnvauggr — implements and refines links in the appendices and in a project's own guidelines

- `implements` and `refines` links in the appendices and in a project's own guidelines
- In the files that the repository keeps, `sheriff validate` refuses each of the following nodes, other than a section, where the node lacks the link listed for it:
- `sheriff validate` determines which part of the specification a node belongs to from the path of its file (§s-zefk589ykh37b8u).
- A node linked to the rule it builds on can be found whenever that rule changes.
- `sheriff validate` refuses the rule of `project.json`, since it declares no `refines` link.

## s-6bmnsbskg6en4nf — Copies of the files that the SpecSheriff plugin delivers

- `sheriff validate` refuses each copy of a file that is common to every project and comes with the SpecSheriff tools in the SpecSheriff plugin (§s-zefk589ykh37b8u, §s-rnbm4v8hsta6heq).
- As long as the repository keeps a copy, `sheriff validate` runs only the check for copies.
- A copy in the project's repository is read by people and agents, but not by any of the SpecSheriff tools.
- So it falls behind the plugin's files unnoticed.

## proposal:s-kag2m9tzdnduxdx — A node's location

- the top-level node of a file of the guidelines or of the technical appendix (§s-tj38pvm38nepaf5), which takes as its location the part's name followed by the file's name;
- a node of a kind that an extension of the guidelines (§s-mbmnsnxenmavu3z) defines and that a part of the base specification (§s-5x737t9nee4zgaa) opens with, which takes the part's name alone as its location.
- In each file of the guidelines or of the technical appendix, the nodes are numbered under the location of the file's top-level node.
- The nodes under a node whose location is the part's name alone are numbered together with the other top-level nodes of the part.
- A rule kept in `specs/_guidelines/spec.json` as the fifth node of the file's eighth section is at `_guidelines/spec/8.5`.
- The most likely mistake is to number the header, which would put that section at `requests/2`.

## proposal:domains-header-status — The approval status of a domain's header

- The SpecSheriff tools derive the approval status (§s-tgrnpagrb58tya7) of a domain's header (§s-yggv9myedprnaa7) in the same way as they derive a section's (§s-9kfdycuq34beqvs).
- The most likely mistake is to derive the header's approval status only from the nodes under the header, and so to show the header as approved while a rule in the second document is still a draft.

## proposal:row-10-1-8 — a row of a table, spec 10.1.8 (row of the main table of checks)

- Every node of the specification outside both the SpecSheriff guidelines that a project uses and the extensions that the project has chosen, except a section and any other node whose approval status is derived from other nodes, is approved only while an approval of its current wording is in force

## proposal:s-sn6au3vcr9uy5pm — What a link is

- `refines` — the linking node states more precisely what the linked node states, states it for a narrower case, or extends the linked node.
- A node extends another when it adds a requirement on a question that the other leaves open within its own subject, such as a value that the other leaves to each project.
- `term-relation` — the linking term (§s-khqsmy6mhejkrhg) and the linked term are bound, for as long as both exist, in the ratio the link carries (§s-bckzdwd35d2nefa).
- An extension of the guidelines (§s-mbmnsnxenmavu3z) or a project's own guidelines (§s-u7tw6m8npxmv5tu) may define further types of link.
- No diagram can show it.
- The most likely mistake is an `implements` link from the project's rule: that rule does not state how the rule it refines is implemented.
- The rule on a project's own guidelines (§s-u7tw6m8npxmv5tu) and the row of the main table of checks that checks it say that a rule of a project's own guidelines refines or extends a rule.
- This rule gave `refines` only the meaning of refining, and no type of link expressed extending.
- The owner: one link, `refines`, covers both refining and extending, since the line between them is thin and no check could tell them apart.

## proposal:row-10-1-17 — a row of a table, spec 10.1.17 (row of the main table of checks)

- The only exceptions are abbreviations, constants and special designations, such as part numbers, where there are no more than two of them in a row.
- “REST API” in a sentence passes: two consecutive abbreviations.
- “HTTP REST API” is refused, though each of its words is an abbreviation: three consecutive words in capitals.

## proposal:s-ztseyetus7np6br — What sheriff reindex writes

- the approval status of each section, derived from every node under it other than a section, including the nodes in the cells of a `TableRule` (§s-9kfdycuq34beqvs);
- where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), the approval status of the header of each domain, derived from every node of the domain other than its sections and the header itself, including those in the cells of a `TableRule` (§s-yccuyqbypzzx2gu);
- `sheriff reindex` writes each file as `JSON.stringify` writes the file's data with an indent of two spaces, with a line feed at the end, with each node's `location` and `sid` first, and with all the other keys in the order in which the file already has them.
- The SpecSheriff tools themselves write whatever they can compute from the specification, the code and the tests, so that it always agrees with its sources and nobody spends effort writing it.

## proposal:s-83ev4wwesbwnhnp — An agent's edit is checked before it is made

- change the approvals, or the entries that set the specification's approval status (§s-qzthyh7yqvfhsa2) or its `strict` flag (§s-q3pfzyaxvpr2zj2), or the record of the extensions that the project has chosen (§s-9ttvcwpqkehm58g), other than through the procedures that record or withdraw them.
- A check that runs later sees only the result: the approvals, which it takes as given, and a commit that contains a test together with the code it tests.
- So only a check made before an edit can keep an agent from making a decision that only the owners may make, or from writing code before its test.
