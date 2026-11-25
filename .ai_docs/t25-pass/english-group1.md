# T25, group 1: the English of every node

This file holds the final English of every node of group 1 of stage 2 of T25, as `tools-drafts.json` holds it after fix-group1-f.mjs: the drafts of the appendix of the tools and the proposals for nodes outside it.
Each node is given under its key in `tools-drafts.json`: its title, its text, its reason and its examples.
A node in a cell of a table has no title of its own, so a row is headed by its location.
fix-group1-f.mjs writes this file; edit the drafts, not this file.

## s-stxmhq3hgfndvn6 — A location that differs from the computed one

**Title:** A location that differs from the computed one

**Text:**

`sheriff validate` refuses each node whose location (§s-kag2m9tzdnduxdx) is missing or differs from the one computed for it (§s-ygg5kpcxgzq3m7w, §s-tvxhtjbj7mmpmnx). The refusal names the node's file and sid, the location that the file holds and the computed location.

`sheriff validate` checks each node of the specification in the files that the repository keeps, including a node in a cell of a `TableRule` (§s-5fewsp22mmdz7y6).

**Reason:**

A location tells a reader where a node is only while it is the computed one. `sheriff reindex` writes every location after each edit that an agent makes (§s-477gtdrkw34dzxw). So a location that differs from the computed one was left behind by a change that no run of `sheriff reindex` has followed yet, such as an edit made without an agent.

## new:tools-7-1-location — How a node's location is computed

**Title:** How a node's location is computed

**Text:**

The SpecSheriff tools compute a node's location (§s-kag2m9tzdnduxdx) from the path of its file and where the node is in the specification. They compute it for each node of the specification in the files that the repository keeps.

In a file of the guidelines, of the appendix of the tools (§s-a4rbry4hsu34hy8) or of the technical appendix (§s-tj38pvm38nepaf5), the first top-level node of the file takes as its location the file's path under `specs/`, without `.json` (§s-zefk589ykh37b8u). Such locations include `_guidelines/spec`, `_guidelines/extensions/domains` and `tech/stack`. Where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), a domain's header (§s-yggv9myedprnaa7) takes the domain's name as its location. Every other node's location is one of the following, followed by a slash and the node's place:
- in a file of the guidelines, of the appendix of the tools or of the technical appendix, the location of the first top-level node of that file, as in `_guidelines/spec/1.3.4`;
- in the base specification (§s-5x737t9nee4zgaa), the name of the folder under `specs/` that holds the node's file, as in `base/3.2`, `contracts/1` or `requests/2`.

Every node is numbered except the following:
- a term (§s-khqsmy6mhejkrhg), whose place is the term's name;
- the first top-level node of a file of the guidelines, of the appendix of the tools or of the technical appendix;
- a domain's header.

A numbered node's place is its position among the numbered nodes under its parent, counted from one. Where the parent is numbered too, the parent's place and a dot come before that position, as in `3.2`.

The SpecSheriff tools go through the numbered nodes under a node in the order of the node's children. Under a `TableRule` (§s-5fewsp22mmdz7y6), the nodes in its cells come after its children, row by row through its groups and, within a row, column by column.

In a folder of the base specification, the top-level nodes of its files and the children of a domain's header are treated as nodes under one parent. The SpecSheriff tools go through them file by file, in the code-point order of the files' paths. The top-level nodes of one file come in the order in which the file lists them. The children of a domain's header take the header's position in that order.

In a file of the guidelines, of the appendix of the tools or of the technical appendix, each further top-level node of the file is numbered under the location of the first node, after that node's children.

**Reason:**

`sheriff reindex` writes the locations that `sheriff validate` checks (§s-ztseyetus7np6br, §s-stxmhq3hgfndvn6). Both commands therefore need one computation that gives every node a location of its own that is the same on every machine.

**Example 1:** A domain named `requests` is kept in three files: `specs/requests/00-requests.json` holds its header, `specs/requests/intake.json` holds one section, and `specs/requests/review.json` holds another. The header's location is `requests`, and the sections' locations are `requests/1` and `requests/2`. The fourth node of the second section is a `TableRule`, `requests/2.4`, each of whose rows holds one node, so the node in its third row is `requests/2.4.3`. The most likely mistake is to number each file from one, which gives both sections the location `requests/1`.

## s-95w92rnjuv3sst8 — An approved node with no approval in force

**Title:** An approved node with no approval in force

**Text:**

`sheriff validate` refuses each approved node for which no approval of its current wording is in force (§s-v4qus7raqnwzneb, §s-cey3k9xxjvkpyqz). The refusal names the node by its file, its sid and its location (§s-kag2m9tzdnduxdx).

`sheriff validate` checks each node of the specification in the files that the repository keeps, including a node in a cell of a `TableRule` (§s-5fewsp22mmdz7y6). It leaves out the following nodes, whose approval status `sheriff reindex` derives from other nodes (§s-ztseyetus7np6br):
- each section;
- the header of each domain, where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm, §s-yccuyqbypzzx2gu).

**Reason:**

A node's approval status is written in its file, where anyone can set it to `approved` by hand. The approval itself is recorded separately from the node, in `specs/_approvals.jsonl` (§s-v4qus7raqnwzneb). Comparing the two reveals an approval status typed by hand and one left `approved` after the wording changed.

**Example 1:** A person edits the text of an approved rule by hand and commits the change without running `sheriff reindex`. `sheriff validate` refuses the rule, since no approval of its new wording is in force. Had `sheriff reindex` run, it would have made the rule a draft, and the check would have passed.

## new:tools-7-1-approval-by — Who an added approval names

**Title:** Who an added approval names

**Text:**

`sheriff validate` accepts an approval (§s-v4qus7raqnwzneb) that a commit adds to `specs/_approvals.jsonl` only where both of the following hold:
- its node is in the files that the repository keeps;
- it names an owner of that node (§s-6sk8uet75dmq5qz) as of that commit (§s-acacahc8c9estmr).

`sheriff validate` refuses any other approval that the commit adds. The refusal names the sid and the email address that the approval holds. Where the node is in the files that the repository keeps, the refusal also names the node's file, its location (§s-kag2m9tzdnduxdx) and its owners.

An approval is added by a commit where `specs/_approvals.jsonl` holds more lines identical to that approval after the commit than it held in the commit's parent. For a merge commit, the parent is its first parent. `sheriff validate` reads the parent's approvals in the form to which `sheriff reindex` would rewrite them (§s-gb8s9657a65hqmv).

`sheriff validate` takes a node's owners from the model of the specification (§s-w6gybeqn2ttydqx). Of the lines that a commit adds, it checks only approvals.

**Reason:**

Only a node's owners may approve it, while anyone may withdraw an approval (§s-67vekyup7y8smap, §s-fpq35tf3pehgk64). A node's owners may change from one commit to the next, so each approval is judged against the owners as of the commit that adds it. A later change of owners then leaves in force the approvals given before it.

**Example 1:** The nearest section above a rule names `a@example.com` as its owner. A commit adds an approval of the rule by `b@example.com`, and `sheriff validate` refuses it, naming both addresses. A commit that adds the same approval and also makes `b@example.com` an owner of that section is accepted. The most likely mistake is to judge the approval against the owners named in the commit's parent, which would refuse that second commit.

## s-agc6fb3vx46pc23 — Values built from other nodes

**Title:** Values built from other nodes

**Text:**

`sheriff validate` refuses each node in which a value built from other nodes differs from the value that `sheriff reindex` would write (§s-ztseyetus7np6br). `sheriff validate` computes the following values:
- the links pointing at each node (§s-bpdqd9v72wg7vsz, §s-xdk44dt9uxdeb2b), compared without regard to their order;
- the approval status of each section (§s-9kfdycuq34beqvs, §s-k3hrk8u9uz9mpz7);
- where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), the approval status of the header of each domain (§s-yccuyqbypzzx2gu, §s-bn8rvk6du2jkf2d);
- where the project has chosen the Domains extension, the index of the sections in the header of each domain (§s-2r59txnms5serdr, §s-6n2ab7escdtspwe);
- where the project has chosen the RecordType extension (§s-hzuzn8hbq6q9q4s), the values gathered for each field that has an `enum` (§s-ju5vcanbjph7mgh, §s-93jpnb4c96qhwbu).

`sheriff validate` checks each node of the specification in the files that the repository keeps, including a node in a cell of a `TableRule` (§s-5fewsp22mmdz7y6). The refusal names the node by its file, its sid and its location in the specification (§s-kag2m9tzdnduxdx), and names the value that differs.

**Reason:**

After an edit to one node, a value built from it stays out of date until `sheriff reindex` runs. Computing every such value again reveals a commit that holds an out-of-date value or a value written by hand.

**Example 1:** A section holds a `TableRule`, one cell of which holds a draft node, and every other node under the section is approved. `sheriff validate` computes the section's approval status as draft, and refuses the section if its file marks it approved. The most likely mistake is to count only the nodes in a node's `children`, which leaves out the node in the cell.

## new:tools-7-1-one-header — One header for each domain

**Title:** One header for each domain

**Text:**

Where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), `sheriff validate` accepts a domain only where the domain's files hold exactly one header (§s-yggv9myedprnaa7, §s-ctj5v22yn7wr7n4). A domain's files are those in its folder, `specs/<domain>/` (§s-zefk589ykh37b8u).

`sheriff validate` refuses any other domain. The refusal names the domain's folder and, for each header that the domain's files hold, the header's file and sid.

**Reason:**

A domain may be kept in several files (§s-k73czmpkazcx7mu). So only reading all of them reveals that a header is missing or that there is a second one.

**Example 1:** The domain `requests` is kept in `specs/requests/00-requests.json` and `specs/requests/intake.json`, and whoever split it opened the second file with a new header as well. `sheriff validate` refuses the domain and names both headers. Once the second file holds only sections, the domain passes.

## new:tools-7-1-link-target — The target of a link

**Title:** The target of a link

**Text:**

`sheriff validate` accepts a link only where its target is the sid of a node of the model of the specification (§s-w6gybeqn2ttydqx, §s-x8usyy38qa56k6a). It refuses any other link declared by a node of the specification in the files that the repository keeps, including a node in a cell of a `TableRule` (§s-5fewsp22mmdz7y6). The refusal names the node that declares the link by its file, its sid and its location in the specification (§s-kag2m9tzdnduxdx), and names the link's type and its target.

**Reason:**

Only a link whose target is a node of the specification can be followed. Only such a link appears among the links pointing at its target (§s-bpdqd9v72wg7vsz).

**Example 1:** A rule still has a `refines` link to a rule that a later commit removed and archived. `sheriff validate` refuses the link, since no node of the specification holds the removed rule's sid any longer. The most likely mistake is to look for the target only among the nodes in the files that the repository keeps. That mistake would refuse a `refines` link from a rule of a project's own guidelines to a rule of the SpecSheriff guidelines, which the project takes from the SpecSheriff plugin. `sheriff validate` accepts that link.

## s-qzyacnqwvaeaps4 — Citations and the links that match them

**Title:** Citations and the links that match them

**Text:**

`sheriff validate` refuses each of the following in a node of the specification in the files that the repository keeps, including a node in a cell of a `TableRule` (§s-5fewsp22mmdz7y6):
- a sid other than its own that the node cites without declaring a link whose target is that sid (§s-vwyke96ggxx79je);
- a `cites` link to a node that the node does not cite, or to a node to which the node also declares a link of another type (§s-vwyke96ggxx79je);
- a citation by location (§s-kag2m9tzdnduxdx, §s-whftqmshzc5wzhw).

The refusal names the node by its file, its sid and its location, and names the link or the citation.

A `§` followed by a sid cites that sid, in text in backticks too, where no lower-case letter or digit follows the sid (§s-cxtt6jvhqcey2k9). Any other `§` followed by one or more characters, up to a whitespace character, a comma, a semicolon or a closing parenthesis, is a citation by location, unless it is in text in backticks.

`sheriff validate` reads every property of a node for citations except the following (§s-cxtt6jvhqcey2k9):
- its links;
- the nodes under it, including the nodes in its cells;
- the index of the sections in a domain's header (§s-2r59txnms5serdr) and the values gathered in a field's `x-enumSource.gathered` (§s-ju5vcanbjph7mgh), which are built from other nodes.

**Reason:**

Whoever changes a node learns from the links pointing at it which nodes rely on it (§s-cxtt6jvhqcey2k9). Those links are complete only where every citation, in whatever property of a node it appears, names a node by its sid and is matched by a declared link.

**Example 1:** A node's reason shows `§base/3.2`, a citation by location, in backticks, and `sheriff validate` accepts it. The same characters without backticks are refused as a citation by location. In backticks, a `§` followed by a sid still counts as a citation, so the node must declare a link to the node with that sid.

## s-pvnnr844f3y964m — Link types reserved for terms

**Title:** Link types reserved for terms

**Text:**

`sheriff validate` accepts a link of type `term-relation` or `uses` only where both of its ends are term nodes (§s-ypa92gpcj3f5zj8, §s-76dutms9uv6uha2, §s-s79v9mmyw56hgpx). It accepts a link of any other type, including `cites`, only where at least one of its ends is a node other than a term node. `sheriff validate` refuses every other link declared by a node of the specification in the files that the repository keeps, including a node in a cell of a `TableRule` (§s-5fewsp22mmdz7y6). It checks only a link whose target is a node of the model of the specification (§s-w6gybeqn2ttydqx). The refusal names the node that declares the link by its file, its sid and its location (§s-kag2m9tzdnduxdx), and names the link's type and its target. It says that the link is to be agreed with the specification's owners.

**Reason:**

Whether two terms are bound, and how, shows how the entities (§s-9w3u3wn37wksyxd) that they name relate to one another. The specification's owners decide that, so the refusal sends whoever wrote the link to them, rather than suggesting a type.

**Example 1:** A term cites another term and declares a `cites` link to it. `sheriff validate` refuses that link and sends the author to the owners. They decide whether the terms are bound by a `term-relation` link, and with which `ratio`, or by a `uses` link.

## s-e2vdhfsndy5stq9 — A run of words in capitals

**Title:** A run of words in capitals

**Text:**

`sheriff validate` refuses each run of three or more words set in capitals (§s-m6upmfq64kw5h4r, §s-83natrftdsmttsu). The refusal names the run, the property that holds it, and the node by its file, its sid and its location (§s-kag2m9tzdnduxdx).

`sheriff validate` checks each node of the specification in the files that the repository keeps, whatever its approval status. It reads a node's title, text and reason, each string in each member of its `TextRule.list`, and each text cell of a `TableRule` (§s-qeensty237e6mmm, §s-5fewsp22mmdz7y6). It reads a node in a cell of a `TableRule` as it reads any other node.

In what `sheriff validate` reads, a word set in capitals is a sequence of two or more consecutive characters that meet each of these conditions:
- each of them is a capital letter of any script, a digit or a hyphen;
- the first is a capital letter, and the last is a capital letter or a digit;
- no letter, digit or underscore comes immediately before or after them.

A run is three or more words set in capitals with only spaces or tabs between them. Text in backticks, in straight double quotation marks or in curly double quotation marks (“…”) is not read.

**Reason:**

The check does not understand the text, so it recognises a phrase set in capitals by its form alone. That form is defined exactly, so that ordinary capitalisation and quotations, which keep the spelling of what they quote (§s-7anvune6h4f6mbr), are never refused.

**Example 1:** A rule's text ends with the words “WITHOUT ANY EXCEPTION”, written as part of a sentence, outside backticks and quotation marks. `sheriff validate` refuses the node and names that run. The most likely mistake is to let three abbreviations in a row, such as “HTTP REST API”, pass: `sheriff validate` refuses them too.

## s-zhen42p6mnaxu7w — A section with a rule in it

**Title:** A section with a rule in it

**Text:**

`sheriff validate` accepts a section of the specification in the files that the repository keeps only where the section contains a rule (§s-exxuckgakfxkycp). It refuses any other section, naming it by its file, its sid and its location (§s-kag2m9tzdnduxdx).

A section contains a rule where at least one of the nodes directly under it is one of the following:
- a node of the kind `TextRule` or `TableRule` (§s-5fewsp22mmdz7y6), or, where the project has chosen the RecordType extension (§s-hzuzn8hbq6q9q4s), of the kind `RecordType` (§s-ktfstpv8rurznrp);
- a term (§s-khqsmy6mhejkrhg) or a node of a project's own kind (§s-vsh384ybt4w25a2, §s-pctqj9wqaq8762t);
- a section that contains a rule.

**Reason:**

A section whose rules have all been moved or removed still looks like a part of the specification. Its approval status, which the SpecSheriff tools derive from the nodes under it (§s-9kfdycuq34beqvs), does not show that the section contains no rule.

**Example 1:** A section holds only a nested section, whose last rule was moved to another file. `sheriff validate` refuses both sections, since neither contains a rule. The most likely mistake is to refuse only the nested section.

## s-qvgzubkrafadqgf — exempts links

**Title:** `exempts` links

**Text:**

`sheriff validate` accepts an `exempts` link (§s-gf6n8ge4mke3pr2, §s-6u54kfn4ze29r6h) only where the link is allowed. It refuses any other `exempts` link, naming the node that declares it by its file, its sid and its location (§s-kag2m9tzdnduxdx), and naming the link's target. It checks only an `exempts` link whose target is a node of the model of the specification (§s-w6gybeqn2ttydqx).

An `exempts` link is allowed where all of the following hold:
- the node that declares the link is a node of the project's own guidelines, kept in `specs/_guidelines/project.json` (§s-zefk589ykh37b8u);
- the link's target is a section or a rule, a rule being a node of the kind `TextRule`, `TableRule` (§s-5fewsp22mmdz7y6) or `RecordType` (§s-ktfstpv8rurznrp), or of a project's own kind (§s-vsh384ybt4w25a2);
- the text of the node that declares the link cites the target (§s-cxtt6jvhqcey2k9).

**Reason:**

An `exempts` link lifts the requirement that the system's code implement its target (§s-6fw72j65jkqrfpf). So a link that the rule on exempting a rule does not allow (§s-gf6n8ge4mke3pr2) would hide a rule that the system's code does not implement.

**Example 1:** The section on the stack holds a rule that chooses the programming language. A rule of `project.json` exempts that rule, since no symbol in the code can implement that choice. The exempting rule's text gives that reason and cites the rule that it exempts. The exempting rule also declares an `exempts` link to that rule, and `sheriff validate` accepts the link. The most likely mistake is to cite the exempted rule only in the reason, in which case `sheriff validate` refuses the link.

## new:tools-7-1-consumes — consumes links

**Title:** `consumes` links

**Text:**

Where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), `sheriff validate` accepts a `consumes` link only where it goes from a domain's header to a section in the files of another domain (§s-yggv9myedprnaa7, §s-rdavpdea67hsntf). A domain's files are those in its folder, `specs/<domain>/` (§s-zefk589ykh37b8u). `sheriff validate` refuses any other `consumes` link, naming the node that declares it by its file, its sid and its location (§s-kag2m9tzdnduxdx), and naming the link's target. It checks only a `consumes` link whose target is a node of the model of the specification (§s-w6gybeqn2ttydqx).

**Reason:**

The index in a domain's header, and the check for a cycle in which domains use one another, both read from the `consumes` links which domain uses which section (§s-2r59txnms5serdr, §s-bncp7gtyaukur8e). Any other `consumes` link would make the index wrong or the cycle check give a wrong result.

**Example 1:** The header of the domain `requests` declares a `consumes` link to the section of the domain `users` that describes how a user signs in, and `sheriff validate` accepts the link. The most likely mistake is to point the link at the rule in that section that the domain `requests` relies on, in which case `sheriff validate` refuses the link.

## new:tools-7-1-guidelines-to-extension — A link from the SpecSheriff guidelines to an extension of the guidelines

**Title:** A link from the SpecSheriff guidelines to an extension of the guidelines

**Text:**

`sheriff validate` refuses each link that a rule of the SpecSheriff guidelines (§s-u7tw6m8npxmv5tu) declares to a node of an extension of the guidelines (§s-mbmnsnxenmavu3z, §s-zyaf34chxugtjyn). The refusal names the rule by its file, its sid and its location (§s-kag2m9tzdnduxdx), and names the link's type and its target. `sheriff validate` runs this check only in the repository where the SpecSheriff guidelines are written (§s-zefk589ykh37b8u). There it reads every node of `specs/_guidelines/spec.json` other than a section, including a node in a cell of a `TableRule` (§s-5fewsp22mmdz7y6).

**Reason:**

In the repository where the SpecSheriff guidelines are written, the extensions of the guidelines are kept beside them. A link from a rule of the guidelines to a node of an extension therefore resolves and passes every other check.

**Example 1:** A rule of `spec.json` cites a rule of an extension and declares the `cites` link that the citation requires. `sheriff validate` refuses that link.

## s-yprj7d6tnvauggr — implements and refines links in the appendices and in a project's own guidelines

**Title:** `implements` and `refines` links in the appendices and in a project's own guidelines

**Text:**

In the files that the repository keeps, `sheriff validate` refuses each of the following nodes, other than a section, where the node lacks the link listed for it:
- a node of the technical appendix (§s-tj38pvm38nepaf5) outside the section on the stack (§s-vj7ercem526zd6v) and the technical debt section (§s-2r7k2aeyusgy6fw): an `implements` link (§s-sn6au3vcr9uy5pm) to a node of the base specification (§s-5x737t9nee4zgaa, §s-694brc6fytwxc5v);
- a node of the appendix of the tools (§s-a4rbry4hsu34hy8): an `implements` link to a rule of the SpecSheriff guidelines (§s-u7tw6m8npxmv5tu) or of an extension of the guidelines (§s-mbmnsnxenmavu3z, §s-9c8t99cz34p28sg);
- a node of the project's own guidelines (§s-u7tw6m8npxmv5tu): a `refines` link (§s-sn6au3vcr9uy5pm) to a rule of the SpecSheriff guidelines or of an extension that the project has chosen (§s-3dashdedvu4xgfb, §s-9ttvcwpqkehm58g).

The refusal names the node by its file, its sid and its location (§s-kag2m9tzdnduxdx).

`sheriff validate` determines which part of the specification a node belongs to from the path of its file (§s-zefk589ykh37b8u). It checks a node in a cell of a `TableRule` as it checks any other node (§s-5fewsp22mmdz7y6).

**Reason:**

A node linked to the rule it builds on can be found whenever that rule changes. Only a reader can judge whether the two still agree.

**Example 1:** A rule of `project.json` lists the project's test fixtures and declares an `implements` link to the rule on such fixtures. `sheriff validate` refuses the rule of `project.json`, since it declares no `refines` link. With a `refines` link in its place, the rule passes.

## s-6bmnsbskg6en4nf — Copies of the files that the SpecSheriff plugin delivers

**Title:** Copies of the files that the SpecSheriff plugin delivers

**Text:**

`sheriff validate` refuses each copy of a file that is common to every project and comes with the SpecSheriff tools in the SpecSheriff plugin (§s-zefk589ykh37b8u, §s-rnbm4v8hsta6heq). It accepts such a file only in the repository where the SpecSheriff guidelines are written (§s-zefk589ykh37b8u).

A copy is any of the following files that the repository keeps:
- `specs/_guidelines/spec.json` and `specs/_guidelines/tools.json`;
- each file in `specs/_guidelines/extensions/`;
- each file in `specs/_schema/` or in a folder under it, other than `specs/_schema/project.schema.json`.

The refusal names each copy. As long as the repository keeps a copy, `sheriff validate` runs only the check for copies.

**Reason:**

In a project, the SpecSheriff tools read the files common to every project from the SpecSheriff plugin (§s-zefk589ykh37b8u). A copy in the project's repository is read by people and agents, but not by any of the SpecSheriff tools. So it falls behind the plugin's files unnoticed.

**Example 1:** A project copies `node.schema.json` into `specs/_schema/` to read it beside its own extension of the schema. `sheriff validate` refuses the copy and names it. It accepts `specs/_schema/project.schema.json`, the project's own extension of the schema.

## proposal:s-kag2m9tzdnduxdx — A node's location

**Title:** A node's location

**Text:**

A node's location names where it is in the specification: the part it is in, followed by its place there. A node's place is its number among the nodes under the same parent. The following nodes take no number:
- a term (§s-khqsmy6mhejkrhg), whose place is the term's name;
- the first top-level node of a file of the guidelines, of the appendix of the tools (§s-a4rbry4hsu34hy8) or of the technical appendix (§s-tj38pvm38nepaf5), which takes as its location the part's name followed by the file's name;
- a node of a kind that an extension of the guidelines (§s-mbmnsnxenmavu3z) defines and that a part of the base specification (§s-5x737t9nee4zgaa) opens with, which takes the part's name alone as its location.

In each file of the guidelines, of the appendix of the tools or of the technical appendix, the nodes are numbered under the location of the file's first top-level node. The nodes under a node whose location is the part's name alone are numbered together with the other top-level nodes of the part.

The location is computed from where the node is and is never written by hand.

**Reason:**

A location is computed from where a node is, so it always shows a reader where to find the node.

**Example 1:** A rule kept in `specs/_guidelines/spec.json` as the fifth node of the file's eighth section is at `_guidelines/spec/8.5`. Where an extension makes a part `requests` open with a header, the header is at `requests`, and the part's first section, kept in another of its files, is at `requests/1`. The most likely mistake is to number the header, which would put that section at `requests/2`.

## proposal:domains-header-status — The approval status of a domain's header

**Title:** The approval status of a domain's header

**Text:**

The SpecSheriff tools derive the approval status (§s-tgrnpagrb58tya7) of a domain's header (§s-yggv9myedprnaa7) in the same way as they derive a section's (§s-9kfdycuq34beqvs). The header is approved while every node of the domain other than its sections and the header itself is approved, in whichever of the domain's documents (§s-k73czmpkazcx7mu) the node is kept. Nobody approves a header.

**Reason:**

A header, like a section, requires nothing, so it leaves an owner nothing to agree to. Its approval status shows at a glance whether the whole domain is approved, which helps where only the headers are visible.

**Example 1:** A domain is kept in two documents: the first holds its header and a section under it, and the second holds another section, one rule of which is a draft. The header's approval status is draft. Once that rule is approved, the header becomes approved too, though nobody approved the header. The most likely mistake is to derive the header's approval status only from the nodes under the header, and so to show the header as approved while a rule in the second document is still a draft.

## proposal:11-3-header-status-row — a row of a table, domains 11.3.2a (new row of the table of checks of the Domains extension, after row 11.3.2)

**Text:**

The approval status of a domain's header is derived from the approval statuses of all the other nodes of the domain

**On failure:** refused

## proposal:row-10-1-8 — a row of a table, spec 10.1.8 (row of the main table of checks)

**Text:**

Every node of the specification is approved only while an approval of its current wording is in force. The check leaves out the following nodes:
- the nodes of the SpecSheriff guidelines that a project uses and of the extensions that the project has chosen (§s-9ttvcwpqkehm58g);
- sections and any other nodes whose approval status (§s-tgrnpagrb58tya7) is derived from other nodes

**On failure:** refused

## proposal:s-sn6au3vcr9uy5pm — What a link is

**Title:** What a link is

**Text:**

A link is a directed relation from one node to another. Every link states its meaning through its type. The types of link are:
- `implements` — the linking node states how the linked one is implemented.
- `refines` — the linking node states more precisely what the linked node states, states it for a narrower case, or extends the linked node. A node extends another when it adds a requirement on something that the other leaves open within its own subject, such as a value that the other leaves to each project. The linking node leaves every requirement of the linked node in force.
- `constrains` — the linking node states a condition the linked rule depends on.
- `exempts` — the linking node exempts the linked rule, or every rule under the linked section, from being implemented (§s-gf6n8ge4mke3pr2).
- `checks` — the linking node is a check, and it verifies that the linked rule is followed. Such a link is written by hand.
- `cites` — the linking node cites the linked one (§s-cxtt6jvhqcey2k9), and no other type says how the two relate to each other. So the linking node has no link of another type to the linked one.
- `term-relation` — the linking term (§s-khqsmy6mhejkrhg) and the linked term are bound, for as long as both exist, in the ratio the link carries (§s-bckzdwd35d2nefa).
- `uses` — what the linking term names makes use of what the linked term names while taking part in a process. The link carries no ratio. A term that only starts a process, such as an operator who starts an export, uses nothing the process uses.

An extension of the guidelines (§s-mbmnsnxenmavu3z) or a project's own guidelines (§s-u7tw6m8npxmv5tu) may define further types of link. Each such type states its meaning and contradicts no rule of the SpecSheriff guidelines.

**Reason:**

A link without a type records only that somebody thought of two nodes together. No check can evaluate it. No diagram can show it. A type named without its meaning is the same guess, one step removed.

**Example 1:** `uses`: a user fills in a form while signing up.

**Example 2:** `refines`, extending a rule: a rule of a project's own guidelines lists the fixtures of the tests of a check that reads citations, a list that the rule it refines leaves to each project. The most likely mistake is an `implements` link from the project's rule: that rule does not state how the rule it refines is implemented.

**Decision 1, 2026-11-11:** The rule on a project's own guidelines (§s-u7tw6m8npxmv5tu) and the row of the main table of checks that checks it say that a rule of a project's own guidelines refines or extends a rule. This rule gave `refines` only the meaning of refining, and no type of link expressed extending. The owner: one link, `refines`, covers both refining and extending, since the line between them is thin and no check could tell them apart. The meaning of `refines` in this rule is widened to cover extending.

## proposal:row-10-1-17 — a row of a table, spec 10.1.17 (row of the main table of checks)

**Text:**

No sentence of the specification is written in capital letters. The only exceptions are abbreviations, constants and special designations, such as part numbers, where there are no more than two of them in a row. The deterministic check uses this criterion: no sentence contains three or more consecutive words written in capital letters

**On failure:** refused

**Example 1:** “REST API” in a sentence passes: two consecutive abbreviations. “HTTP REST API” is refused, though each of its words is an abbreviation: three consecutive words in capitals.

## proposal:s-ztseyetus7np6br — What sheriff reindex writes

**Title:** What `sheriff reindex` writes

**Text:**

`sheriff reindex` writes into the files of the specification everything that the SpecSheriff tools compute from the specification, the code and the tests:
- a sid for each node that has none, including a node in a cell of a `TableRule` (§s-9spq78kdwsxr759, §s-5fewsp22mmdz7y6);
- the location of each node (§s-kag2m9tzdnduxdx, §s-ygg5kpcxgzq3m7w);
- the links pointing at each node, rebuilt from the links that the nodes declare (§s-bpdqd9v72wg7vsz);
- the lists `meta.code` and `meta.tests` of each node, built from the SpecTags that bind code and tests to the node (§s-rwqzepmrt77rv35): `meta.code` names each code file that holds a symbol bound by such a SpecTag, and `meta.tests` names each such test by its file and its name;
- the approval status of each section, derived from every node under it other than a section, including the nodes in the cells of a `TableRule` (§s-9kfdycuq34beqvs);
- where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), the approval status of the header of each domain, derived from every node of the domain other than its sections and the header itself, including the nodes in the cells of a `TableRule` (§s-yccuyqbypzzx2gu);
- where the project has chosen the Domains extension, the index of the sections in the header of each domain that has sections (§s-2r59txnms5serdr);
- where the project has chosen the RecordType extension (§s-hzuzn8hbq6q9q4s), the values gathered for each field that has an `enum` whose values come from elsewhere in the specification, in the field's `x-enumSource.gathered` (§s-ju5vcanbjph7mgh).

In the files that the repository keeps, an approved node whose approval status is set by approvals stays approved while an approval of its current wording stands (§s-v4qus7raqnwzneb). `sheriff reindex` makes each remaining such node a draft and names it.

`sheriff reindex` writes only the files that the repository keeps. It writes a file only when the text it would write differs from the file's text. It names each file that it writes.

`sheriff reindex` writes each file as `JSON.stringify` writes the file's data with an indent of two spaces, with a line feed at the end, with each node's `location` and `sid` first, and with all the other keys in the order in which the file already has them.

**Reason:**

The SpecSheriff tools themselves write whatever they can compute from the specification, the code and the tests, so that it always agrees with its sources and nobody spends effort writing it. Because it is rebuilt in full on every run, it is correct regardless of what an earlier run left behind (§s-jsqxdx47wkkj7gp).

## proposal:s-83ev4wwesbwnhnp — An agent's edit is checked before it is made

**Title:** An agent's edit is checked before it is made

**Text:**

Before an agent's edit is made, the SpecSheriff tools refuse it if it would do any of the following:
- leave a node approved with a wording for which no approval stands (§s-5ah25f6gy99panq), unless the node is a section or any other node whose approval status (§s-tgrnpagrb58tya7) is derived from other nodes;
- change the code written for a rule, including a rule of a project's own kind (§s-vsh384ybt4w25a2), while no test has that rule's SpecTag (§s-8xw4mgvpexyvw5q, §s-rah8b37kytb682y);
- change the approvals, or the entries that set the specification's approval status (§s-qzthyh7yqvfhsa2) or its `strict` flag (§s-q3pfzyaxvpr2zj2), or the record of the extensions that the project has chosen (§s-9ttvcwpqkehm58g), other than through the procedures that record or withdraw them.

The refusal before an edit applies only to an edit whose request names the files it writes to and what it writes to them. A shell command names neither.

**Reason:**

A check that runs later sees only the result: the approvals, which it takes as given, and a commit that contains a test together with the code it tests. So only a check made before an edit can keep an agent from making a decision that only the owners may make, or from writing code before its test.
