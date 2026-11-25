# T25, group 7, round c: the English of every node that round c changes

This file holds the final English of every node and proposal of group 7 that round c changes or adds, as `tools-drafts.json` holds it after fix-group7-c.mjs, each in full: the drafts of items 51 to 56 of the appendix of the tools, the new node “The validator of the RuntimeChecks” moved out of item 53, and the proposals to change agreed drafts.
Each node is given under its key in `tools-drafts.json`: its title, its text, its reason and its examples.
fix-group7-c.mjs writes this file; edit the script, not this file.

## s-k4nqjr96ux7a5m7 — How a node is written in Markdown

**Title:** How a node is written in Markdown

**Text:**

`sheriff markdown` (§s-e3495enbc5h75c3), `sheriff show` (§s-2dhbqy43tcm6qj2) and `sheriff guide` (§s-jk8v3srrved7ram) write a node in Markdown in this order:
- a heading that holds the node's location (§s-kag2m9tzdnduxdx) and its title, or only its location where the node is in a cell of a `TableRule` (§s-5fewsp22mmdz7y6) and so has no title;
- a line that holds the node's sid, its kind and its approval status (§s-tgrnpagrb58tya7);
- the node's text, and then its reason, which opens with `*Why:*`;
- any other value that the node's file holds for it, except its links and the nodes under it, under the value's key: a value that is text is written as it is, and any other value is written as JSON;
- the node's links, each with its type, its direction, its ratio (§s-bckzdwd35d2nefa) where it has one, and the sid, location and title of the node at the other end.

`sheriff guide` leaves out each node's metadata, the value of the node's `meta` (§s-jk8v3srrved7ram).

The following values are written in a form of their own instead of as JSON:
- a `TextRule.list` (§s-eferktypcj7njt5) any of whose members is an object: its other values as JSON, and its members as a table;
- the values gathered beside a field (§s-ju5vcanbjph7mgh), which a RecordType's `schema` (§s-6eb92ddch7shuvu) holds in the field's `x-enumSource.gathered`: as a list after the JSON of the `schema`, from which they are left out;
- the `columns` and `groups` of a `TableRule`: as a table for each group of rows, under the group's heading where the group has one.

The first column of the table of a `TextRule.list` is for the property that `TextRule.list.property` names. Its other columns follow in the order in which their properties first appear. The table has a row for each member, and a member that is not an object is written in the first column alone.

The list of the values gathered beside a field is headed by the JSON Pointer to the field's schema within the RecordType's `schema`, such as `/properties/part`. It gives each value with the sid, location and title of the node that the value comes from.

A node in a cell of a `TableRule`, which has no title, is named in a link and in the list of gathered values by its sid and location alone.

A table of a `TableRule` has a column for each column of the `TableRule`, under that column's heading, and a row for each row of the group. A cell of the `TableRule` that holds text is written as that text. A cell that holds a node is written as the node's location and its text.

In a cell of the table of a `TextRule.list` and of a table of a `TableRule`:
- a list or an object is written as JSON on one line;
- each line break is written as `<br>`;
- each `|` is written as `\|`.

A node in a cell of a `TableRule` is also written with the following, before its text, since these are part of its wording (§s-5ah25f6gy99panq):
- the heading of its column;
- the heading of its group, where the table's rows are grouped;
- the text of each cell of its row that holds text, under the heading of that cell's column.

Where a command writes the nodes under a node, it writes them after that node. It writes them in the order in which the computation of locations visits them (§s-ygg5kpcxgzq3m7w), so the nodes in the cells of a `TableRule` come after its children. Each of those nodes has a heading one level deeper than that of the node above it, capped at the sixth level, the deepest that Markdown has. A top-level node of a file, and the node that `sheriff show` prints, have a first-level heading.

**Reason:**

Every command that writes a node for a reader writes it in the same form, so a reader who knows that form from one command can read the output of any other. In that form, a reader sees everything that the node's file holds for the node, and where each of its links leads, without opening the file (§s-ce24ynwabt5yx8h).

**Example:**

The main table of checks (§s-jau82aq9juv9zzh) is a `TableRule` whose column “What is checked” holds a node in each row and whose column “On failure” holds text. `sheriff show` prints the node of one of its rows under a heading that holds the node's location. Along with the node, `sheriff show` prints the heading “What is checked” of the node's column, the heading of its group, such as “The specification alone”, and the text of its row's cell under “On failure”, such as “refused”. The most likely mistake is to print the node without the text of its row, so its reader does not see what a failure of the check costs.

## new:tools-5-export — Writing the human-readable export

A new node, split from `s-k4nqjr96ux7a5m7`, with the sid s-e3495enbc5h75c3.

**Title:** Writing the human-readable export

**Text:**

`sheriff markdown` writes the human-readable export (§s-ce24ynwabt5yx8h) only where the project has chosen the Views extension (§s-qgg6sfawtmwvrbb, §s-9ttvcwpqkehm58g). In any other project, it refuses to run. The refusal names the Views extension.

`sheriff markdown` writes the export into `md-version/` (§s-zefk589ykh37b8u) as follows:
- it first removes everything in that folder;
- it then writes two kinds of file there: a `.gitignore` file that holds `*`, and the Markdown files.

That `.gitignore` file makes git ignore the folder's contents whatever the repository's own ignore files say.

`sheriff markdown` writes one Markdown file for each file of the specification whose nodes the model of the specification holds (§s-w6gybeqn2ttydqx). These include the files of the SpecSheriff guidelines, of the chosen extensions and of the appendix of the tools (§s-a4rbry4hsu34hy8) that the project takes from the plugin (§s-bsya3febm6u64ab, §s-zefk589ykh37b8u).

The path of each Markdown file is the path of its source file below `specs/`, placed below `md-version/`, with `.md` in place of `.json`. For a file that the project takes from the plugin, its path below `specs/` is the one at which the repository where the SpecSheriff guidelines are written keeps that file (§s-zefk589ykh37b8u).

Each Markdown file holds the top-level nodes of its source file, in the order in which the file holds them. Each of them is written as a node is written in Markdown (§s-k4nqjr96ux7a5m7), followed by all the nodes under it.

**Reason:**

In the export, a person reads the project's whole specification, including the guidelines that the project takes from the plugin. The export is written anew from the nodes at every run and kept out of git, so it never becomes a second copy of the specification that a commit could change (§s-kh8qcd5kxgh9z3j).

**Example:**

A project that has chosen the Views and Domains extensions keeps `specs/_guidelines/project.json`, `specs/contracts/terms.json` and `specs/requests/intake.json`, and takes the SpecSheriff guidelines, the files of those extensions and the appendix of the tools from the plugin. `sheriff markdown` writes `md-version/_guidelines/project.md`, `md-version/contracts/terms.md`, `md-version/requests/intake.md`, `md-version/_guidelines/spec.md`, `md-version/_guidelines/extensions/domains.md`, `md-version/_guidelines/extensions/views.md` and `md-version/_guidelines/tools.md`. The most likely mistake is to write only the files that the repository keeps, which leaves the guidelines that the project follows out of the export.

## new:tools-5-show — Printing one node

A new node, split from `s-k4nqjr96ux7a5m7`, with the sid s-2dhbqy43tcm6qj2.

**Title:** Printing one node

**Text:**

`sheriff show` prints one node to its standard output, written as a node is written in Markdown (§s-k4nqjr96ux7a5m7), without the nodes under it. The command's argument is that node's sid (§s-9spq78kdwsxr759) or location (§s-kag2m9tzdnduxdx).

`sheriff show` looks for the node among the nodes that the model of the specification holds (§s-w6gybeqn2ttydqx), including a node in a cell of a `TableRule` (§s-5fewsp22mmdz7y6). Where none of them has that sid or that location, `sheriff show` refuses the argument and names it. `sheriff show` refuses to run without an argument.

**Reason:**

A node is read on its own (§s-x4zcbk5ekebd9ua). `sheriff show` gives a person or an agent everything that a node's file holds for that node, and where each of its links leads, so that they need not open the files of the specification.

**Example:**

`sheriff show _guidelines/spec/8.5` prints the rule that is at that location in the same form as `sheriff show` does when it is given that rule's sid. The most likely mistake is to look the argument up among the sids alone, so a location is refused.

## s-rpv4fkdqqguptqd — Building the map

**Title:** Building the map

**Text:**

`sheriff map` writes the map of the specification (§s-zu8ne3wq84zchc4) only where the project has chosen the Views extension (§s-qgg6sfawtmwvrbb, §s-9ttvcwpqkehm58g). In any other project, it refuses to run. The refusal names the Views extension.

`sheriff map` writes the map into `specs/_viewer/` (§s-zefk589ykh37b8u) as follows:
- it first removes everything in that folder;
- it then writes two files there: the web page `index.html`, which draws the map, and a `.gitignore` file that holds `*`.

That `.gitignore` file makes git ignore the folder's contents whatever the repository's own ignore files say.

`sheriff map` builds an outline in Markdown from the nodes. It writes that outline only into the web page itself. The web page draws the map from the outline with markmap.

The page holds markmap and every library that markmap needs, each with its licence notice. The page loads nothing from the network.

The root of the outline, labelled `Specification`, represents no node. The outline has the following top-level branches, in this order. None of them represents a node. Each holds the nodes of the files listed with it:
- `Guidelines`: the SpecSheriff guidelines, then each extension of the guidelines whose nodes the model of the specification holds (§s-w6gybeqn2ttydqx), in the code-point order of the extensions' names, and then the project's own guidelines (§s-u7tw6m8npxmv5tu);
- `Appendix of the tools`: the appendix of the tools (§s-a4rbry4hsu34hy8);
- `Base specification`: the files of the contracts section (§s-z6tq6a3btnvvwx7) first, and then those of the other folders of the base specification (§s-5x737t9nee4zgaa);
- `Technical appendix`: the files of the technical appendix (§s-tj38pvm38nepaf5).

Where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), the branch `Base specification` takes the domains row by row, from the top row of the diagram of the domains (§s-jzm6qw992j3bnxt) to its row `No level`. It takes the domains of each row in the order in which the diagram places them.

The files of one folder of the base specification, and the files of the technical appendix, are taken in the code-point order of their paths. Each node holds the nodes under it as follows, in the order in which the computation of locations visits them (§s-ygg5kpcxgzq3m7w):
- a node holds its children, and a `TableRule` (§s-5fewsp22mmdz7y6) also holds the nodes in its cells;
- where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), a domain's header (§s-yggv9myedprnaa7) also holds the other top-level nodes of its folder;
- the first top-level node of a file of the guidelines, of the appendix of the tools or of the technical appendix also holds the file's other top-level nodes.

Each node is labelled with its title. A node in a cell of a `TableRule`, which has no title, is labelled with its location (§s-kag2m9tzdnduxdx).

In the outline, `sheriff map` writes each node's title or location in an element whose class names the node's approval status (§s-tgrnpagrb58tya7). The page draws that element with a border, dotted where the node is a draft and solid where it is approved. A branch that represents no node has no border. Apart from that border, the branch of each node is drawn in the same way, whatever the node's approval status.

**Reason:**

A person opens the map wherever the repository is, often without network access. On the map, the person sees the approval status of every node at a glance, at whatever size the map is drawn. The map is drawn from the nodes alone, with nothing stored between the nodes and the page, so it never shows a structure that the nodes no longer have (§s-kh8qcd5kxgh9z3j).

**Example:**

A project that has chosen the Views and Domains extensions lists the levels `core` and `services`. The domain `requests` is at the level `core`, and the domains `accounts` and `billing` are at the level `services`, and `billing` uses `accounts`. The branch `Base specification` holds the top-level node of the contracts section first, and then the headers of `requests`, `accounts` and `billing`, in that order, each with the sections of its domain under it. A `TableRule` in a section of `requests` holds the nodes in its cells under it, each labelled with its location. The most likely mistake is to take the domains in the alphabetical order of their names, which puts `accounts` before `requests`, although `requests` is in a higher row of the diagram of the domains.

## new:tools-4-diagram — Drawing the diagram of the domains

A new node, with the sid s-jzm6qw992j3bnxt.

**Title:** Drawing the diagram of the domains

**Text:**

Where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), the SpecSheriff tools draw the diagram of the domains (§s-4azsb49pj6sech8) from the headers of the domains (§s-yggv9myedprnaa7) as follows:
- each domain is drawn once, labelled with its name, which is the name of its folder under `specs/` (§s-zefk589ykh37b8u);
- an arrow leads from each domain to each domain that it uses, that is, to any other domain that has a section to which a `consumes` link in the using domain's header points;
- each level that the project's own guidelines list (§s-t9j29hppag2nren) and that the header of at least one domain contains has a row of its own, labelled with the level's number (§s-nkyty4dy9x2v2a4) and its name, such as `2 services`;
- below the rows of the levels, a row labelled `No level` holds each domain whose header contains none of those levels, where there is such a domain.

To place a domain, the SpecSheriff tools:
- first place, in the same way, each domain of its row that it uses and that they have not yet started to place;
- then place the domain itself, right after the domains already placed in its row.

The SpecSheriff tools take the domains of each row in this order (§s-uw9n84edf7cbe9n):
- first, each domain that uses no domain of the row and that no domain of the row uses;
- then, each domain that no domain of the row uses and that uses a domain of the row;
- finally, each domain not yet placed, which is left only where domains of the row use one another in a cycle (§s-bncp7gtyaukur8e).

Where the steps above leave a choice between several domains, the SpecSheriff tools take them in the alphabetical order of their names. They compare the names character by character, by the characters' code points.

**Reason:**

The rule on the order of the domains in a row (§s-uw9n84edf7cbe9n) leaves its harder cases to the appendix of the tools (§s-a4rbry4hsu34hy8). This node settles them, together with how the rows are labelled, so that the same headers give the same diagram on every machine.

**Example:**

The domains `a`, `b`, `c`, `d` and `e` are at the same level. `a` uses `b` and `c`, `c` uses `d`, and `e` has no link to any domain of the row. The row is `e`, `b`, `d`, `c`, `a`: `e` comes first, and `a` comes after `b` and after `c`, which comes after `d`. The most likely mistake is to place `a` right after `b`, the first domain that it uses, which puts `a` to the left of `c`, which it also uses.

**Todo (2026-11-25):** No command of the SpecSheriff tools draws this diagram yet. The command that draws it is to be added to the SpecSheriff tools and named in this node and in the list of the commands, in the release that introduces this node.

## s-pvzms7d8kxb8dk2 — Where the types and RuntimeChecks generated from the RecordTypes are written

**Title:** Where the types and RuntimeChecks generated from the RecordTypes are written

**Text:**

Where the project has chosen the RecordType extension (§s-hzuzn8hbq6q9q4s), `sheriff types` (§s-a8fn72xa782wvbk) writes the types and the RuntimeChecks (§s-e877bnfa559tvk9) that it generates from the RecordTypes (§s-7vm323mhry2enx3) only into the files that the technical appendix (§s-tj38pvm38nepaf5) lists for them.

The list of those files is the `TextRule.list` (§s-eferktypcj7njt5) of a rule in the section of the technical appendix on the stack (§s-vj7ercem526zd6v), `specs/tech/stack.json` (§s-zefk589ykh37b8u). That rule is the one that has both a `TextRule.list` and an `implements` link to the rule on generating the types and the RuntimeChecks (§s-e877bnfa559tvk9). Each member of the list is the path of a file relative to the root of the repository.

`sheriff types` reads the list in that rule's last approved wording (§s-a8fn72xa782wvbk). A rule that has never been approved lists no file. `sheriff types` takes the rule's `implements` links from where the SpecSheriff tools take the `refines` links of a rule of the project's own guidelines (§s-t9j29hppag2nren): from the commit that added the rule's last approval or, until that commit is made, from the files of the specification.

The extension of a listed file's name determines what `sheriff types` writes into the file:
- `.ts`: the types in TypeScript;
- `.py`: the types in Python;
- `.json`: the RuntimeChecks in JSON Schema 2020-12.

The check of generated copies refuses a list that names a file with any other extension, and anything else that keeps `sheriff types` from writing (§s-dbk2vyeg8z5jxna).

**Reason:**

Where the generated code goes concerns the whole system, so the technical appendix describes it in its section on the stack (§s-mm2de262g3jkapu).

**Example:**

The rule in the section on the stack lists `src/generated/records.ts` and `src/generated/records.schema.json`. `sheriff types` writes the types of the RecordTypes into the first file and their RuntimeChecks into the second. A team member adds `worker/records.py` to the list, so the rule becomes a draft. Until the new wording is approved, `sheriff types` writes nothing into `worker/records.py`. The most likely mistake is to take the list from the draft wording.

## s-suv42g8r3ra2h6b — What is generated from a RecordType

**Title:** What is generated from a RecordType

**Text:**

From the last approved wording of each RecordType (§s-7vm323mhry2enx3, §s-a8fn72xa782wvbk), `sheriff types` writes a type into each file of types and a definition into each file of RuntimeChecks (§s-pvzms7d8kxb8dk2). It takes the RecordTypes in the code-point order of their files' paths and, within a file, in the order in which the computation of locations visits them (§s-ygg5kpcxgzq3m7w).

The name of a RecordType's type and of its definition is the RecordType's title, with the first letter of each word changed to uppercase and the spaces removed.

Each type has the SpecTag `@spec <sid>` (§s-5z5gnu7pahr82xp) with the sid of its RecordType (§s-ktfstpv8rurznrp), in the comment directly above it (§s-33fw3ga4ctd94dq): `/** @spec <sid> */` in TypeScript and `# @spec <sid>` in Python. Each definition has the sid of its RecordType as its `$anchor`, by which a `$ref` in another definition points to it (§s-4npdup7mjkva69y).

A file of RuntimeChecks holds one JSON Schema document, whose `$schema` is `https://json-schema.org/draft/2020-12/schema` and whose `$defs` holds each definition under its name.

The fields of a type and of a definition are, first, the fields of each RecordType that the type's RecordType reaches through `refines` links (§s-sn6au3vcr9uy5pm). Its own fields, which its `schema` declares (§s-6eb92ddch7shuvu), follow them. The SpecSheriff tools follow the `refines` links of a RecordType in the order in which it lists them. For each link, they first take the RecordTypes that the linked RecordType reaches in this way, and then the linked RecordType itself. They take each RecordType only the first time that they reach it.

Each field keeps its name and the place where it first appears. Where several of these RecordTypes declare a field with the same name, the field's schema in a definition is an `allOf` that holds their schemas in the order in which they are taken. In a type, the field has the type that the last of these schemas gives (§s-4npdup7mjkva69y). A field is guaranteed (§s-adhmw4gw6y82f44) where the `required` of the `schema` of any of these RecordTypes lists it. In a type, a guaranteed field is required, and any other field is optional.

A definition is built from the RecordType's own `schema`, in which `properties` holds these fields and `required` lists the guaranteed ones. Each field's schema in it is changed only as the node on the type given by a field's schema says (§s-4npdup7mjkva69y). Where a RecordType has RecordType variants (§s-z3dnru6qqdf9m6j), the node on such a RecordType (§s-nk8td3ez58gahc4) says what `sheriff types` generates for it and for each of its variants in place of, or in addition to, what this node says.

In TypeScript, a type is written `export type <name> = {...}`, with `?` after the name of each optional field.

In Python:
- a type is written `<name> = TypedDict("<name>", {...})`;
- each name that a type uses from `typing` is imported from `typing`;
- a reference to another type is written as a string;
- an optional field is marked `NotRequired`.

`sheriff types` cannot generate the name of a type or of a definition in any of these cases (§s-dbk2vyeg8z5jxna):
- the name is not an identifier in the language of its file;
- the file already uses the name, including the names that the file imports and those that its language reserves;
- a `$ref` names a sid that no RecordType has, so the type that the `$ref` refers to has no name.

**Reason:**

Generated in one fixed way, the types and the definitions come out the same at every run and on every machine. The check of generated copies relies on that (§s-dbk2vyeg8z5jxna). Named after its RecordType and bound to it by a SpecTag that `sheriff types` writes, each type leads its reader back to the RecordType that it comes from.

**Example:**

The fragment of a format named `address` declares the fields `city` and `street`. The RecordType `user` refines `address` and declares `name` and `street`, with a narrower schema for `street`. The type `User` holds `city`, then `street` with the type that `user` gives it, and then `name`. The definition `User` checks `street` against the schemas of both RecordTypes. The most likely mistake is to write `street` twice in the type, once for each RecordType, which TypeScript refuses to compile.

## s-nk8td3ez58gahc4 — A RecordType that its variants refine

**Title:** A RecordType that its variants refine

**Text:**

For a RecordType (§s-7vm323mhry2enx3) that has RecordType variants (§s-z3dnru6qqdf9m6j), `sheriff types` writes a definition and a type that also describe the fields of each variant. In every other respect, it writes them as it writes those of any RecordType (§s-suv42g8r3ra2h6b).

The variants of such a RecordType are the RecordType variants whose RecordType it is, as the check of RecordType variants determines (§s-c2r9jndrjbtbsv6). `sheriff types` takes each variant in its last approved wording (§s-a8fn72xa782wvbk), in the order in which it takes the RecordTypes. It leaves out a variant that has never been approved. Where it leaves out every variant of a RecordType, it writes the RecordType's definition and type as it writes those of any RecordType.

In a file of RuntimeChecks (§s-e877bnfa559tvk9), the RecordType's definition also holds an `if` and `then` pair for each of its variants, at the end of its `allOf`:
- `if` is `{"properties": {<field>: {"const": <value>}, …}, "required": [<field>, …]}`, with each field and value that the variant's `answersTo` (§s-c2r9jndrjbtbsv6) names;
- `then` is `{"$ref": "#<sid>"}`, with the sid of the variant, so that it points to the variant's definition.

Where the RecordType's `schema` holds no `allOf`, the definition holds an `allOf` with only these pairs.

A variant's definition is written as the definition of any RecordType, except that it holds only the fields that the variant adds to its RecordType. These are the fields that the variant declares and the fields of each RecordType that it reaches through `refines` links (§s-sn6au3vcr9uy5pm), other than its RecordType and the RecordTypes that its RecordType reaches.

In a file of types, the RecordType's type is the union of the following members, each a type of its own:
- for each variant, the variant's type;
- where a combination of values of the fields that select a variant has no variant, a type for the combinations that have no variant; its name is the name of the RecordType's type followed by `Other`.

The type of a variant is written as the type of any RecordType (§s-suv42g8r3ra2h6b), except that each field that selects a variant is required in it and takes only the value that the variant's `answersTo` (§s-c2r9jndrjbtbsv6) names.

The type for the combinations that have no variant is written right after the union. It holds the RecordType's fields. Where one field selects a variant, that field takes only the values to which no variant corresponds. Where several fields select a variant, each of them takes all its values.

The union is written `export type <name> = <member> | …` in TypeScript and `<name> = Union["<member>", …]` in Python. The union has the SpecTag (§s-5z5gnu7pahr82xp) of the RecordType. Each member has the SpecTag of the RecordType that it comes from: a variant's type has the SpecTag of the variant, and the type for the combinations that have no variant has the SpecTag of the RecordType.

The values of a field that selects a variant are those that the SpecSheriff tools collect for it (§s-5nf87c3e3jg9v7c).

**Reason:**

A data record holds the fields of its RecordType together with those of the RecordType variant that its values select (§s-z3dnru6qqdf9m6j). The types and RuntimeChecks generated from the RecordType describe such a data record in the form that each language has for fields that depend on the value of another field.

**Example:**

The RecordType `notification` names `channel` in its `chosenBy`, and the values of `channel` are `email`, `sms` and `app`. Its variants, titled “notification by email” and “notification by SMS”, correspond to `email` and `sms`; the first declares the guaranteed field `address`, and the second the guaranteed field `phone`. Its definition holds an `if` and `then` pair for each of them, and its type `Notification` is the union of `NotificationByEmail`, `NotificationBySMS` and `NotificationOther`, in which `channel` takes only `app`. The most likely mistake is to let `channel` take every value in `NotificationOther`, so a data record whose `channel` is `email` and that has no `address` is accepted by the type.

## s-4npdup7mjkva69y — The type that the schema of a field gives

**Title:** The type that the schema of a field gives

**Text:**

Within a RecordType's `schema` (§s-7vm323mhry2enx3, §s-6eb92ddch7shuvu), the schema of each field gives, in TypeScript and in Python, the type that the table below names. The last column of the table names the neutral type that an earlier release of the SpecSheriff tools wrote in place of each schema (§s-gb8s9657a65hqmv).

| Field's schema | TypeScript | Python | Neutral type that an earlier release wrote |
|---|---|---|---|
| `{"$ref": "#<sid>"}` | the name of the type of the RecordType that has that sid | that name, as a string | record |
| `{"identifierOf": "<sid>"}` | what the field at the end of the field's chain of identifiers gives (§s-3anv9qcmx8pwp2w) | what that field gives | identifier of |
| `{"const": <its value>}` | the literal of its value | `Literal[<its value>]` | — |
| `{"enum": [<its values>]}` | the union of its values as literals | `Literal[<its values>]` | one of, with a list of its own |
| `{"x-enumSource": <its source>}` | the union of the values gathered beside it (§s-ju5vcanbjph7mgh) as literals | `Literal[<the values gathered beside it>]` | one of, with values from elsewhere |
| `{"oneOf": [<its members' schemas>]}` or `{"anyOf": [<its members' schemas>]}` | the union of the types that its members give | `Union[<the types that its members give>]` | — |
| `{"allOf": [<its members' schemas>]}` | the intersection of the types that its members give | a `TypedDict` of its own, which holds the fields of every member | — |
| `{"type": [<its types>]}` | the union of the types that the schema gives with each of its types in place of the list | `Union[<those types>]` | — |
| `{"type": "null"}` | `null` | `None` | — |
| `{"type": "string"}` | `string` | `str` | text |
| `{"type": "string", "format": "email"}` | `string` | `str` | email address |
| `{"type": "string", "format": "date-time"}` | `string` | `str` | instant |
| `{"type": "string", "format": "date"}` | `string` | `str` | date |
| `{"type": "string", "format": "duration"}` | `string` | `str` | duration |
| `{"type": "integer"}`, with its bounds | `number` | `int` | whole number |
| `{"type": "number"}`, with its bounds | `number` | `float` | number |
| `{"type": "boolean"}` | `boolean` | `bool` | yes/no |
| `{"type": "array", "items": <its members' schema>}`, with its bounds on how many members it holds | `<its members' type>[]` | `list[<its members' type>]` | list of |
| `{"properties": {<its fields>}}` | an object type written inline, its fields given as the fields of a RecordType are given (§s-suv42g8r3ra2h6b) | a `TypedDict` of its own | — |
| `{"type": "object", "additionalProperties": <its values' schema>}` | `Record<string, <its values' type>>` | `dict[str, <its values' type>]` | map of |
| `{}` | `unknown` | `Any` | any value |

A field's schema falls under the first row of the table whose keywords it holds with the values that the row gives. In a row, a value in angle brackets stands for any value of the kind that it names. Any other keyword of a field's schema, such as `description`, `format` or a bound, leaves the type as the row gives it. A schema that falls under no other row falls under the last, `{}`. The same table gives the type of the members of a list, of the values of a map and of the members of `oneOf`, `anyOf` and `allOf` from their schemas.

A field with `identifierOf` that fails the check of an identifier followed to its end (§s-3anv9qcmx8pwp2w) gives the same type as `{}`.

In Python, `Literal` holds only a string, a whole number, `true`, `false` or `null`, so a `const` with any other value, or an `enum` that holds any other value, gives the same type as `{}`. In `Literal`, `true`, `false` and `null` are written `True`, `False` and `None`.

An `allOf` gives a `TypedDict` of its own in Python only where each of its members gives a `TypedDict` in Python, and otherwise gives the same type as `{}`. That `TypedDict` holds the fields of the members, in the order of the members. A field that several members declare has the type that the last of them gives, as a field that a RecordType takes through `refines` does (§s-suv42g8r3ra2h6b). Such a field is required where the `required` of any of these members lists it.

In Python, each object written inline and each `allOf` that gives a `TypedDict` is written as a `TypedDict` of its own. Such a `TypedDict` is written only if a type uses it. It is written once, after every type that `sheriff types` writes for the RecordType whose `schema` holds it. It has the SpecTag (§s-5z5gnu7pahr82xp) of that RecordType. Its name begins with the name of that RecordType's type. One part follows for each step from that `schema` down to it, each with its first letter changed to uppercase:
- for a field, the field's name;
- for the members of a list, `Item`;
- for the values of a map, `Value`;
- for a member of `oneOf`, `anyOf` or `allOf`, its position in the list of members, counted from one.

For example, the object written inline as the field `address` of the RecordType `user` gives the `TypedDict` `UserAddress`. Such a name, too, cannot be generated in the cases that the node on what is generated from a RecordType lists (§s-suv42g8r3ra2h6b).

A RecordType's `schema` names another RecordType only in the following forms:
- a `$ref` whose value is `#` followed by the other RecordType's sid, which points to the `$anchor` of that RecordType's definition (§s-suv42g8r3ra2h6b);
- an `identifierOf` whose value is the other RecordType's sid.

`sheriff types` takes each value gathered beside a field (§s-ju5vcanbjph7mgh) once, in the type and in the RuntimeCheck (§s-e877bnfa559tvk9) in the same way, at the place where the value first appears in the field's `x-enumSource.gathered` (§s-5nf87c3e3jg9v7c).

In a file of RuntimeChecks, `sheriff types` writes each field's schema as the RecordType's `schema` holds it, with the following changes at any depth:
- `x-enumSource` is replaced by `enum`, which holds the values gathered beside the field;
- `identifierOf` is replaced, at the same position, by every keyword of the schema of the field at the end of the chain of identifiers, other than that schema's `description`;
- where the field fails the check of an identifier followed to its end (§s-3anv9qcmx8pwp2w), `identifierOf` is removed.

**Reason:**

JSON Schema is a standard with a validator in every language. So a field's schema serves as its RuntimeCheck, which checks in the same way in every language what a type in TypeScript or Python cannot state, such as a bound or a format. Each language's own type for a value is the one that its code reads without a conversion. An identifier has the type of the field that identifies the data records of the RecordType that it names. So a value that moves from that field to a field that refers to it keeps its type and passes the same RuntimeCheck.

**Example:**

The `schema` of the RecordType `statement` holds `"accountId": {"identifierOf": "s-…", "description": "The account."}`, where `s-…` is the sid of the RecordType `account`. The field that identifies `account` is `number`, whose schema is `{"type": "string", "maxLength": 34}`. In TypeScript, `accountId` has the type `string`, and in the RuntimeChecks its schema is `{"type": "string", "maxLength": 34, "description": "The account."}`. The most likely mistake is to leave `identifierOf` in the RuntimeCheck: a JSON Schema validator does not recognise that keyword, so it does not check that `accountId` is a string.

## proposal:s-f5rz6b7dhxejjts-g7 — The commands that `sheriff` accepts

A proposal: the complete new wording of the agreed draft `s-f5rz6b7dhxejjts`, the node s-f5rz6b7dhxejjts.

**Title:** The commands that `sheriff` accepts

**Text:**

The SpecSheriff tools are run as `sheriff <command>` and accept only the following commands. Each command is listed with its purpose and the nodes that describe it:
- `sheriff validate`: checks that the specification holds together and that each change to it follows the guidelines (§s-4kd2pave7vm4hmd);
- `sheriff binding`: checks the specification against the code and the tests that are bound to it (§s-4kd2pave7vm4hmd);
- `sheriff citations`: checks that each sid cited in the code, the tests and the documentation names a node of the specification (§s-4kd2pave7vm4hmd);
- `sheriff guard`: checks an agent's edit before it is made, and refuses an edit that the SpecSheriff guidelines forbid (§s-4kd2pave7vm4hmd);
- `sheriff commit-message`: checks a commit's message against the code that the commit changes (§s-4kd2pave7vm4hmd);
- `sheriff review`: asks the independent reviewer (§s-m4h279nbaqkpa3t) for its verdict on a commit (§s-4kd2pave7vm4hmd);
- `sheriff init`: sets a repository up for SpecSheriff (§s-7unxytshhc4md54);
- `sheriff remove`: removes SpecSheriff from a repository and leaves the repository's specification as it is (§s-7unxytshhc4md54);
- `sheriff approve`: records an owner's approval of a node, or the withdrawal of that approval (§s-v4qus7raqnwzneb);
- `sheriff reindex`: writes into the specification what the SpecSheriff tools compute from it, and rewrites in its own form what an earlier release wrote (§s-ztseyetus7np6br, §s-gb8s9657a65hqmv, §s-w5wg69pvvhedsws);
- `sheriff types`: generates parts of the system's code (§s-hheus6f395ynqvc) from the approved wordings of the nodes (§s-qyjw8xez6t6adc3), for example the types and RuntimeChecks (§s-e877bnfa559tvk9) for the RecordTypes (§s-7vm323mhry2enx3, §s-a8fn72xa782wvbk);
- `sheriff json`: prints as JSON the model of the specification, which a project's own check (§s-2fau85dfyyeq66m) or generator (§s-km4x4s26kv7pjze) reads (§s-w6gybeqn2ttydqx);
- `sheriff todos`: prints every todo (§s-t28j22vbdmmeqnh) of the specification together with its node (§s-fprt8xysafzjqv9);
- `sheriff guide`: prints the guidelines that the project follows, which an agent reads before it works on the specification (§s-jk8v3srrved7ram);
- `sheriff settings`: shows and changes the specification's approval status (§s-qzthyh7yqvfhsa2), its `strict` flag (§s-q3pfzyaxvpr2zj2) and the extensions of the guidelines (§s-mbmnsnxenmavu3z) that the project has chosen (§s-chsfpkgpmfk4fft);
- `sheriff untagged`: lists the symbols of the system's code that have no SpecTag (§s-8xw4mgvpexyvw5q), each with its file (§s-weuyx98r7c923ab);
- `sheriff show`: prints one node, found by its sid or its location (§s-2dhbqy43tcm6qj2);
- `sheriff markdown`: writes a human-readable export of the specification as Markdown (§s-e3495enbc5h75c3);
- `sheriff map`: writes a map of the specification's structure (§s-rpv4fkdqqguptqd).

`sheriff` with no command prints the list of the commands. `sheriff --version` prints the version number of the SpecSheriff tools. `sheriff` with any other word in place of a command reports that word as unknown, prints the list of the commands and exits with code 2.

**Reason:**

A reader who knows what has to be done, or the name of a command, finds here the command for the task and the nodes that describe everything the command does.

## proposal:s-3anv9qcmx8pwp2w-g7 — An identifier followed to its end

A proposal: the complete new wording of the agreed draft `s-3anv9qcmx8pwp2w`, the node s-3anv9qcmx8pwp2w.

**Title:** An identifier followed to its end

**Text:**

Where the project has chosen the RecordType extension (§s-hzuzn8hbq6q9q4s), `sheriff validate` accepts a field with `identifierOf` (§s-qpdnkejr5xzc6j3) only where both of the following hold:
- its `identifierOf` holds the sid of a RecordType (§s-7vm323mhry2enx3, §s-4npdup7mjkva69y) that names, in its `identifiedBy`, one of its fields as the field that identifies its data records (§s-6eb92ddch7shuvu);
- the chain of identifiers that starts at the field ends in a field without `identifierOf` (§s-cqys6wqrnfzu5ac).

`sheriff validate` refuses any other field with `identifierOf`, naming the RecordType that holds it by its file, its sid and its location (§s-kag2m9tzdnduxdx). The refusal also names the field and each condition that the field fails. It names the field by the JSON Pointer to the field's schema within the RecordType's `schema`, such as `/properties/accounts/items`.

The chain of identifiers that starts at a field goes to the field that identifies the data records of the RecordType that the field's `identifierOf` names. Where that field has `identifierOf` too, the chain goes on in the same way. A chain has no end if it comes back to a field that is already in it.

A RecordType's fields here are those that it declares in its `schema` (§s-6eb92ddch7shuvu) and those that it takes through `refines` (§s-sn6au3vcr9uy5pm) from another RecordType. `sheriff validate` makes this check wherever a RecordType's `schema` holds `identifierOf`, at any depth, such as in the schema of the members of a list.

`sheriff validate` makes this check regardless of whether the specification is approved or a draft (§s-qpdnkejr5xzc6j3, §s-cqys6wqrnfzu5ac).

**Reason:**

A field with `identifierOf` takes its type from the field at the end of its chain of identifiers (§s-6eb92ddch7shuvu, §s-cqys6wqrnfzu5ac). The types and RuntimeChecks generated from the RecordType that holds the field (§s-e877bnfa559tvk9) can therefore give the field a type only where that chain has an end.

**Example:**

The RecordType `statement` has a field `accountId` whose `identifierOf` names the RecordType `account`. The `identifiedBy` of the RecordType `account` names its field `number`, of type `string`. The chain that starts at `accountId` ends at `number`, and `sheriff validate` accepts the field. The RecordTypes `left` and `right` are each identified by a field whose `identifierOf` names the other RecordType, so the chains that start at those fields never end. `sheriff validate` refuses both fields. The most likely mistake is to follow only the first step of each chain and so accept both fields.

## proposal:s-ezq8csd433vj6fj-g7 — A RecordType that refers to a RecordType outside its part of the system

A proposal: the complete new wording of the agreed draft `s-ezq8csd433vj6fj`, the node s-ezq8csd433vj6fj.

**Title:** A RecordType that refers to a RecordType outside its part of the system

**Text:**

Where the project has chosen the RecordType extension (§s-hzuzn8hbq6q9q4s), `sheriff validate` stays silent about a reference from one RecordType (§s-7vm323mhry2enx3) to another only in the following cases (§s-8ht2hn88cu2qwz9):
- from a RecordType outside the contracts section (§s-z6tq6a3btnvvwx7), to a RecordType of its own part of the system or to a fragment of a format (§s-7vm323mhry2enx3, §s-rpkq8y79fwg5k92);
- from a fragment of a format, to another fragment of a format (§s-hn9m9dhxaazjn3y).

`sheriff validate` reports each RecordType that holds any other reference, naming that RecordType and each RecordType that it refers to by such a reference, each by its sid (§s-rpkq8y79fwg5k92, §s-hn9m9dhxaazjn3y). The change still passes.

A RecordType refers to another RecordType in either of these ways:
- its `schema` (§s-6eb92ddch7shuvu) names that RecordType at any depth, by a `$ref` or by an `identifierOf` (§s-4npdup7mjkva69y, §s-qpdnkejr5xzc6j3);
- it has a `refines` link (§s-sn6au3vcr9uy5pm) to that RecordType.

A fragment of a format is a RecordType in the contracts section. Where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), the part of the system that a RecordType belongs to is the domain whose files hold the RecordType. Otherwise, it is the section of `specs/base/` that holds the RecordType and whose location (§s-kag2m9tzdnduxdx) is `base/` followed by a single number. The RecordTypes in `specs/base/` that no such section holds are treated as together forming one part of the system.

`sheriff validate` makes this check regardless of whether the specification is approved or a draft (§s-rpkq8y79fwg5k92, §s-hn9m9dhxaazjn3y).

**Reason:**

A RecordType can refer to another RecordType at any depth of its `schema` and through its `refines` links. So only a check that reads a RecordType's whole `schema` and all its `refines` links finds each reference that breaks the rule on what a RecordType may refer to (§s-8ht2hn88cu2qwz9).

**Example:**

In the domain `requests`, the RecordType of a request has a field `deliveryAddress` with a `$ref` to `address`, a fragment of a format. It also has a field `user` whose `identifierOf` names the RecordType of a user in the domain `users`. `sheriff validate` reports that RecordType, naming it and the RecordType of a user, each by its sid, and lets the change pass. The most likely mistake is to leave the reference in the field `user` unreported because that field holds only an identifier. A field `user` that holds only a user's identifier, with no reference to the RecordType of a user, has the type `string` and no `identifierOf`.

## proposal:s-gb8s9657a65hqmv-g7 — What `sheriff reindex` changes in what an earlier release wrote

A proposal: the complete new wording of the agreed draft `proposal:s-gb8s9657a65hqmv-g6`, the node s-gb8s9657a65hqmv.

**Title:** What `sheriff reindex` changes in what an earlier release wrote

**Text:**

`sheriff reindex` rewrites whatever an earlier release of the SpecSheriff tools wrote or read differently from the release that `sheriff reindex` belongs to. It does so after it has merged the duplicate keys (§s-w5wg69pvvhedsws), and before it validates the files. In every file of the specification and of its archive (§s-f2b5zvc565s242f), it makes the following changes:
- a node's key `id` becomes `location`;
- a node's key `rationale` becomes `reason`;
- the kinds of node `record` and `recordType` become `RecordType`;
- the kind of node `rule` becomes `TextRule`;
- the kind of node `domain` becomes `header`;
- a node's status `""` becomes `draft`;
- a node's status `checked` becomes `approved`;
- a node's key `owner`, which holds an email address, becomes `owners`, which holds a list that contains that email address;
- a RecordType's `fields` and `unknown` become its `schema` (§s-6eb92ddch7shuvu), as follows:
  - the schema holds `"type": "object"`, unless the RecordType is a RecordType variant (§s-z3dnru6qqdf9m6j);
  - each field becomes a property whose schema is the one given for the field's neutral type (§s-4npdup7mjkva69y);
  - the field's `text` becomes the property's `description`;
  - each field that the RecordType marks as required is listed in the schema's `required`;
  - a field that is required only "where it holds a value" becomes an optional property;
  - `unknown: "refused"` becomes `unevaluatedProperties: false`, and a RecordType variant loses its `unknown`;
- the source of a field's values becomes the field's `x-enumSource` (§s-xfu2gpzddjnmgks);
- `TextRule.list.declaredIn` (§s-eferktypcj7njt5) is removed where it points to the field `kinds` of the project's extension of the schema (§s-xm8rz4uupb73gu5);
- `TextRule.list.declaredIn` becomes `TextRule.list.jsonSchema`, and its key `declaration` becomes `pointer`, where it points to any other place in a JSON Schema;
- `TextRule.list.declaredIn` becomes `TextRule.list.valueList`, and its key `declaration` becomes `symbol`, where it names a declaration in code;
- a link of the type `supersedes` is removed (§s-sn6au3vcr9uy5pm);
- a node of the archive loses its sid and every link that points to it (§s-f2b5zvc565s242f, §s-bpdqd9v72wg7vsz).

A renamed key keeps its place among the node's keys.

The name of a kind of node is also changed in each of these places:
- the source of a field's values, where those values are the sids of that kind's nodes;
- the `fields` of the project's extension of the schema, where the name is the key under which those `fields` add properties to that kind.

A bare sid is a word that has the form of a sid and meets one of these conditions:
- it opens a test's name, followed by a space or by the end of the name;
- it is the only argument of a test's mark.

`sheriff reindex` also makes the following changes:
- `specs/_confirmations.jsonl` becomes `specs/_approvals.jsonl`;
- the key `owner` in each line of `specs/_confirmations.jsonl` becomes `by`;
- where `specs/_approvals.jsonl` already exists, the lines of `specs/_confirmations.jsonl`, with `owner` renamed to `by`, are appended to it, and `specs/_confirmations.jsonl` is removed;
- where `sheriff.config.json` holds no entry that sets the specification's approval status, an approved rule of `project.json` that refines the rule on that status (§s-qzthyh7yqvfhsa2) is replaced by an entry that approves the specification (§s-d3nkw9b6mn98vuw);
- the entry that approves the specification names the owner who last approved the rule that the entry replaces;
- the rule that the entry replaces is moved to the archive (§s-f2b5zvc565s242f), with the reason "Replaced by the entry in `sheriff.config.json` that records the specification's approval status";
- where `sheriff.config.json` holds no entry that sets the specification's approval status, a draft rule of `project.json` that refines the rule on that status is moved to the archive with the reason "The specification's approval status is recorded in `sheriff.config.json`" if it was ever approved, and is deleted otherwise (§s-f2b5zvc565s242f);
- in a run that archives or deletes a rule of `project.json` that refines the rule on the specification's approval status, whether the archived or deleted rule is approved or a draft, where `project.json` is left with no rule that refines the rule on when the tests must pass (§s-x8uzc8z44pwtd3h), the draft rule on when the tests run, which `sheriff init` writes (§s-7unxytshhc4md54), is added under the top node of `project.json`;
- the key `writesSpecSheriffGuidelines` is removed from `sheriff.config.json` (§s-zefk589ykh37b8u) before the SpecSheriff tools validate that file;
- in each file that `sheriff.config.json` names as tests of the system's code (§s-hheus6f395ynqvc) or of a project's own check (§s-2fau85dfyyeq66m) or generator (§s-km4x4s26kv7pjze), `@spec ` is inserted before each bare sid.

`sheriff reindex` leaves unchanged a RecordType that holds a field of type `variant`, a field whose values come from the source `domains`, or a field whose own list of values is empty, and names that RecordType and each such field.

Where a node of the specification is of a kind, or holds a link of a type, that an extension of the guidelines (§s-mbmnsnxenmavu3z) adds, and the project has not chosen that extension (§s-9ttvcwpqkehm58g), `sheriff reindex` names that extension.

When `sheriff reindex` adds the draft rule on when the tests run, it names that rule, since the SpecSheriff tools read the rule only after an owner approves it (§s-t9j29hppag2nren).

A renamed key and a renamed kind of node leave a node's fingerprint (§s-f5brvuuu6xmkj6t) unchanged, so the approval of the node's wording stays in force (§s-v4qus7raqnwzneb).

`sheriff reindex` names each file that it rewrites because an earlier release wrote or read that file differently, including the files of the specification.

**Reason:**

Each file and each test of a project follows the form used by the release of the SpecSheriff tools that last wrote or read it. A release that writes or reads them in a different form rewrites them, so that nobody has to rewrite a project by hand and no approval is lost because of a rename.

**Example:**

In a project that an earlier release set up, the only rule of `project.json` is an approved rule that refines the rule on the specification's approval status. `sheriff reindex` replaces that rule with an entry that approves the specification and, in the same run, adds the draft rule on when the tests run. The most likely mistake is to add that draft rule again in a later run, after the project has deleted it.

## proposal:s-dbk2vyeg8z5jxna-g7 — Generated copies checked against their nodes

A proposal: the complete new wording of the agreed draft `s-dbk2vyeg8z5jxna`, the node s-dbk2vyeg8z5jxna.

**Title:** Generated copies checked against their nodes

**Text:**

`sheriff binding` refuses each file that `sheriff types` generates (§s-a8fn72xa782wvbk) where the file's text in the repository differs, line endings aside, from what `sheriff types` generates for it (§s-dwxjxb7rw4w5yn3). Where the repository lacks such a file, `sheriff binding` also refuses the commit. Each refusal names the file and says that running `sheriff types` generates it.

`sheriff binding` also refuses the bindings file (§s-trwczfskj5zmuft) where it lacks the entry that `sheriff types` writes for a file of RuntimeChecks (§s-h5rfyy9j8nnhx62), or holds a different value for that file's path. The refusal names the file of RuntimeChecks and says that running `sheriff types` writes its entry.

`sheriff binding` generates in memory, from the last approved wording of each node (§s-qyjw8xez6t6adc3), the files that `sheriff types` would generate. It writes none of them.

While the rule that lists one of the project's own generators (§s-km4x4s26kv7pjze) is a draft, `sheriff binding` refuses each file of that generator that differs between the commit's parent (§s-2x58az67bm6cxq2) and the commit. A file of the generator is one at a path that the generator prints when `sheriff binding` runs it as `sheriff types` runs a generator whose rule is approved (§s-y5yk7eu6h4zrjpr). A file that only one of these commits holds is also treated as different. The refusal names the file and the generator. Where `sheriff types` would refuse such a run of the generator, `sheriff binding` refuses the generator in the same way.

`sheriff binding` also refuses each of the following, any one of which keeps `sheriff types` from writing any file at all (§s-a8fn72xa782wvbk):
- a file in the list of the files (§s-pvzms7d8kxb8dk2) for the types and the RuntimeChecks (§s-e877bnfa559tvk9) generated from the RecordTypes (§s-7vm323mhry2enx3), where the file's name does not end in `.ts`, `.py` or `.json`;
- a file in that list whose path leads outside the repository;
- a second rule, in the section of the technical appendix (§s-tj38pvm38nepaf5) on the stack, that lists such files;
- the name of a type or of a definition, where that name cannot be generated (§s-suv42g8r3ra2h6b);
- a path for which `sheriff types` would generate different texts, such as a path that two of the project's own generators print with different content.

Each of these refusals names the rule, the node or the path concerned.

`sheriff binding` makes this check regardless of whether the specification is approved or a draft (§s-dwxjxb7rw4w5yn3).

**Reason:**

A generated file kept in the repository is part of the system's code (§s-hheus6f395ynqvc). Edited by hand, it would implement what no owner has approved. Lagging behind its nodes, it would implement a wording that the owners of those nodes have since replaced (§s-kh8qcd5kxgh9z3j, §s-qyjw8xez6t6adc3).

**Example:**

A RecordType is reworded and becomes a draft, and the types generated from it stay as its last approved wording produces them. A developer edits `src/types.ts` by hand to match the new wording and commits it. `sheriff binding` refuses `src/types.ts`, since its text differs from what the last approved wording produces. The most likely mistake is to generate the types from the draft wording, which lets the edited file pass.

## new:tools-17-bindings-entry — The entry in the bindings file for a file of RuntimeChecks

A new node, split from `s-pvzms7d8kxb8dk2`, with the sid s-h5rfyy9j8nnhx62.

**Title:** The entry in the bindings file for a file of RuntimeChecks

**Text:**

For each file of RuntimeChecks (§s-pvzms7d8kxb8dk2), `sheriff types` keeps an entry in the bindings file (§s-trwczfskj5zmuft), since a JSON file can hold no SpecTag of its own (§s-kgbzk2ph9e6jfb4). The entry's key is the file's path. Its value lists the SpecTag `@spec <sid>` (§s-5z5gnu7pahr82xp) of each RecordType (§s-7vm323mhry2enx3) whose definition the file holds (§s-suv42g8r3ra2h6b), in the order of the definitions.

`sheriff types` writes that entry where the bindings file lacks it or holds a different value for that path. It leaves any other entry as it is. When it writes the entry, it names the bindings file.

`sheriff types` writes a file of RuntimeChecks, and its entry, only where the file holds at least one definition.

**Reason:**

The code generated from a RecordType is bound to it (§s-ktfstpv8rurznrp), so each RecordType's RuntimeChecks can be found starting from it, as its types can.

**Example:**

The rule in the section on the stack lists `src/generated/records.schema.json`, which holds the definitions of the RecordTypes `user` and `request`, in that order. `sheriff types` keeps in the bindings file the entry for `src/generated/records.schema.json`, whose value lists the SpecTag of `user` and then that of `request`. The most likely mistake is to leave the file of RuntimeChecks without an entry, so it is bound to no RecordType.

## proposal:new-tools-1-settings-g7 — Project-wide settings

A proposal: the complete new wording of the agreed draft `proposal:new-tools-1-settings-g3`.

**Title:** Project-wide settings

**Text:**

`sheriff.config.json` (§s-zefk589ykh37b8u) holds the project-wide settings of the SpecSheriff tools:
- the glob patterns that match the files holding the system's code (§s-hheus6f395ynqvc) and those holding its tests;
- for each check and each generator that the project's own guidelines add (§s-2fau85dfyyeq66m, §s-km4x4s26kv7pjze): the rule that lists it, its name in that rule, the command that runs it, and the glob patterns that match the files holding its code and its tests (§s-utf4mbt7ref8g9c);
- the entries that set the specification's approval status (§s-qzthyh7yqvfhsa2) and its `strict` flag (§s-q3pfzyaxvpr2zj2), and those that record which extensions of the guidelines (§s-mbmnsnxenmavu3z) the project has chosen (§s-9ttvcwpqkehm58g);
- the command that runs the tests of the system's code and of the project's own checks and generators (§s-477gtdrkw34dzxw);
- the project-wide settings of the reviewer (§s-xr5xxa9cxf2mq5u).

The SpecSheriff tools refuse a `sheriff.config.json` that is not valid JSON or does not conform to its schema (§s-zefk589ykh37b8u).

To find the SpecTags (§s-8xw4mgvpexyvw5q) that bind code and tests to their rules, the SpecSheriff tools read only the following files:
- the files that match the glob patterns for code or for tests in `sheriff.config.json`;
- the files into which `sheriff types` writes the types and the RuntimeChecks (§s-pvzms7d8kxb8dk2);
- the bindings file (§s-trwczfskj5zmuft).

A file that matches both a pattern for code and a pattern for tests is read as a test.

**Reason:**

A setting kept in the repository is the same in every clone, so the SpecSheriff tools behave alike for everyone who works on the project.

## proposal:s-vp24dqydygztqbt-g7 — The review of a commit

A proposal: the complete new wording of the agreed draft `proposal:s-vp24dqydygztqbt`, the node s-vp24dqydygztqbt.

**Title:** The review of a commit

**Text:**

`sheriff review` refuses a commit where the verdict of the independent reviewer (§s-m4h279nbaqkpa3t) refuses it. The refusal lists each finding of the verdict (§s-68ds99w8wd67aae). Where the commit leaves the specification a draft, `sheriff review` disregards each finding on a statement that a rule's implementation needs no change (§s-kgqxg4gunzynwsv). In that case, it refuses the commit only where the verdict lists a finding on code or on a node that the commit approves.

`sheriff review` asks for a verdict only on a commit for which the reviewer must make at least one of the following judgements (§s-epaw9sgyaajzn8g):
- the judgement on the code that the commit adds or changes (§s-rd9nftptjuz6bwv);
- the judgement on each comment that the commit adds or changes (§s-7vpsdsy8dpqdy6r);
- the judgement on each statement in the commit's message that a rule's implementation needs no change (§s-kgqxg4gunzynwsv);
- the judgement on each node of the technical appendix (§s-tj38pvm38nepaf5) that the commit approves and that implements a rule of the base specification (§s-5x737t9nee4zgaa, §s-4bwa4zepd4nwcv8).

Where `sheriff review` asks for a verdict, it gives the reviewer everything that the rule on what the reviewer is given lists for the commit (§s-nyh9yk22ba6g77q). The files generated from the specification, which `sheriff review` leaves out of the commit's change, are the files that `sheriff types` generates (§s-a8fn72xa782wvbk). `sheriff review` tells the reviewer which of those files the commit changes.

**Reason:**

Each run of the reviewer is paid for by the user who commits (§s-tnz9zgqx8c629a7), so `sheriff review` runs the reviewer only on a commit that needs one of the reviewer's judgements.

**Example:**

A commit changes only the wording of a draft rule. It changes no code and no comment in the code, its message contains no statement that a rule's implementation needs no change, and it approves no node. So `sheriff review` does not run the reviewer, and the commit passes the review. The most likely mistake is to run the reviewer on every commit, which makes the user who commits pay for a run that has nothing to judge.

## new:tools-17-validator — The validator of the RuntimeChecks

A new node, split from `s-pvzms7d8kxb8dk2`, with the sid s-axxezge5duzemgs.

**Title:** The validator of the RuntimeChecks

**Text:**

The JSON Schema validator that the technical appendix (§s-tj38pvm38nepaf5) names for the RuntimeChecks (§s-e877bnfa559tvk9) treats `format` as an assertion.

**Reason:**

A validator that treats `format` only as an annotation accepts a date that is no date.
