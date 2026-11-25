# T25, group 7: the English of every node

This file holds the final English of every node of group 7 of stage 2 of T25, as `tools-drafts.json` holds it after propose-group7.mjs: the drafts of items 51 to 56 of the appendix of the tools, which describe how a node is written in Markdown, the human-readable export, printing one node, the map, the diagram of the domains, and what `sheriff types` generates from the RecordTypes. It also holds the five proposals of the group, each a complete new wording of an agreed draft that the group's subject brings to light.
Each node is given under its key in `tools-drafts.json`: its title, its text, its reason and its examples.
propose-group7.mjs writes this file; edit the script, not this file.

## s-k4nqjr96ux7a5m7 — How a node is written in Markdown

**Title:** How a node is written in Markdown

**Text:**

`sheriff markdown` (§s-e3495enbc5h75c3), `sheriff show` (§s-2dhbqy43tcm6qj2) and `sheriff guide` (§s-jk8v3srrved7ram) write a node in Markdown in this order:
- a heading that holds the node's location (§s-kag2m9tzdnduxdx) and its title, or only its location where the node is in a cell of a `TableRule` (§s-5fewsp22mmdz7y6) and so has no title;
- a line that holds the node's sid, its kind and its approval status (§s-tgrnpagrb58tya7);
- the node's text, and then its reason;
- each other value that the node's file holds for it, other than its links and the nodes under it, under the value's key: a value that is text as it is, and any other value as JSON;
- the node's links, each with its type, its direction, its ratio (§s-bckzdwd35d2nefa) where it has one, and the sid, location and title of the node at the other end.

The following values are written in a form of their own instead:
- a `TextRule.list` (§s-eferktypcj7njt5) any of whose members is an object: its other values as JSON, and its members as a table;
- the values gathered beside a field (§s-ju5vcanbjph7mgh), which a RecordType's `schema` (§s-6eb92ddch7shuvu) holds in the field's `x-enumSource.gathered`: as a list after the JSON of the `schema`, from which they are left out;
- the `columns` and `groups` of a `TableRule`: as a table for each group of rows, under the group's heading where the group has one.

The first column of the table of a `TextRule.list` is for the property that `TextRule.list.property` names. Its other columns follow in the order in which their properties first appear. The table has a row for each member, and a member that is not an object is written in the first column alone.

The list of the values gathered beside a field is headed by the JSON Pointer to the field's schema within the RecordType's `schema`, such as `/properties/part`. It gives each value with the sid, location and title of the node that the value comes from.

A table of a `TableRule` has a column for each column of the `TableRule`, under that column's heading, and a row for each row of the group. A cell that holds text holds that text. A cell that holds a node holds the node's location and its text.

In a cell of these tables, a list or an object is written as JSON on one line, each line break as `<br>`, and each `|` as `\|`.

A node in a cell of a `TableRule` is also written with the following, before its text, since they are part of its wording (§s-5ah25f6gy99panq):
- the heading of its column;
- the heading of its group, where the table's rows are grouped;
- the text of each cell of its row that holds text, under the heading of that cell's column.

Where a command writes the nodes under a node, it writes them after that node. It writes them in the order in which the computation of locations goes through them (§s-ygg5kpcxgzq3m7w), so the nodes in the cells of a `TableRule` come after its children. Each of those nodes takes a heading one level deeper than that of the node above it, down to the sixth level, the deepest that Markdown has. A top-level node of a file, and the node that `sheriff show` prints, take a heading of the first level.

**Reason:**

Every command that writes a node for a reader writes it in one form, so a reader who knows that form from one command can read the output of any other. In that form, a reader sees everything that the node's file holds for the node without opening the file (§s-ce24ynwabt5yx8h). From each sid, the reader also learns the location and title of the node that the sid names.

**Example:**

The main table of checks (§s-jau82aq9juv9zzh) is a `TableRule` whose column “What is checked” holds a node in each row and whose column “On failure” holds text. `sheriff show` prints the node of one of its rows under the node's location. With it, `sheriff show` prints the heading “What is checked” of the node's column and the text of its row's cell under “On failure”, such as “refused”. The most likely mistake is to print the node without the text of its row, so that its reader does not see what a failure of the check costs.

## new:tools-5-export — Writing the human-readable export

A new node, split from `s-k4nqjr96ux7a5m7`, with the sid s-e3495enbc5h75c3.

**Title:** Writing the human-readable export

**Text:**

`sheriff markdown` writes the human-readable export (§s-ce24ynwabt5yx8h) only where the project has chosen the Views extension (§s-qgg6sfawtmwvrbb, §s-9ttvcwpqkehm58g). In any other project, it refuses to run, and the refusal names the Views extension.

`sheriff markdown` first removes everything in `md-version/` (§s-zefk589ykh37b8u). It then writes there a `.gitignore` file that holds `*`. That file makes git ignore the folder's contents whatever the repository's own ignore files say.

`sheriff markdown` writes one Markdown file for each file of the specification whose nodes the model of the specification holds (§s-w6gybeqn2ttydqx). These include the files of the SpecSheriff guidelines, of the chosen extensions and of the appendix of the tools that the project takes from the plugin (§s-bsya3febm6u64ab).

The path of each Markdown file is the path of its file below `specs/`, placed below `md-version/`, with `.md` in place of `.json`. For a file that the project takes from the plugin, its path below `specs/` is the one at which the repository where the SpecSheriff guidelines are written keeps that file (§s-zefk589ykh37b8u). So the SpecSheriff guidelines are exported to `md-version/_guidelines/spec.md`.

Each Markdown file holds the top-level nodes of its file in their order. Each of them is written as a node is written in Markdown (§s-k4nqjr96ux7a5m7), followed by all the nodes under it.

**Reason:**

The export is written anew from the nodes at every run, so it shows the specification as the nodes state it (§s-kh8qcd5kxgh9z3j). Kept out of git, it never becomes a second copy of the specification that a commit could change. A project gets the export only where it has chosen the Views extension, since a project uses an extension only by its own choice (§s-mbmnsnxenmavu3z).

**Example:**

A project that has chosen the Views and Domains extensions keeps `specs/contracts/terms.json` and `specs/requests/intake.json`, and takes the SpecSheriff guidelines and the appendix of the tools from the plugin. `sheriff markdown` writes `md-version/contracts/terms.md`, `md-version/requests/intake.md`, `md-version/_guidelines/spec.md` and `md-version/_guidelines/tools.md`. The most likely mistake is to write only the files that the repository keeps, which leaves the guidelines that the project follows out of the export.

## new:tools-5-show — Printing one node

A new node, split from `s-k4nqjr96ux7a5m7`, with the sid s-2dhbqy43tcm6qj2.

**Title:** Printing one node

**Text:**

`sheriff show` prints to its standard output the node whose sid (§s-9spq78kdwsxr759) or location (§s-kag2m9tzdnduxdx) is the command's argument, written as a node is written in Markdown (§s-k4nqjr96ux7a5m7). It prints the node alone, without the nodes under it.

`sheriff show` looks for the node among the nodes that the model of the specification holds (§s-w6gybeqn2ttydqx), including a node in a cell of a `TableRule` (§s-5fewsp22mmdz7y6). Where none of them has that sid or that location, `sheriff show` refuses the argument and names it.

**Reason:**

A node is read on its own (§s-x4zcbk5ekebd9ua). `sheriff show` gives a person or an agent everything that the node's file holds for one node, and where each of its links leads, without opening the files of the specification.

**Example:**

`sheriff show _guidelines/spec/8.5` prints the rule on a node's location in the same form as `sheriff show` with that rule's sid does. The rule's children, if it had any, would not be printed. The most likely mistake is to look the argument up among the sids alone, so that a location is refused.

## s-rpv4fkdqqguptqd — Building the map

**Title:** Building the map

**Text:**

`sheriff map` writes the map of the specification (§s-zu8ne3wq84zchc4) only where the project has chosen the Views extension (§s-qgg6sfawtmwvrbb, §s-9ttvcwpqkehm58g). In any other project, it refuses to run, and the refusal names the Views extension.

`sheriff map` first removes everything in `specs/_viewer/` (§s-zefk589ykh37b8u). It then writes there the web page `index.html`, which draws the map, and a `.gitignore` file that holds `*`. That file makes git ignore the folder's contents whatever the repository's own ignore files say.

The web page draws the map with markmap, from an outline in Markdown that `sheriff map` builds from the nodes and keeps in no file. The page holds markmap and every library that markmap needs, each with its licence notice, and loads nothing from the network.

Each of the following top-level branches of the outline represents no node. They come in this order, and each holds the top-level nodes of the files named with it:
- `Guidelines`: the SpecSheriff guidelines, then each extension of the guidelines whose file the model of the specification holds (§s-w6gybeqn2ttydqx), in the code-point order of the extensions' names, and then the project's own guidelines (§s-u7tw6m8npxmv5tu);
- `Appendix of the tools`: the appendix of the tools (§s-a4rbry4hsu34hy8);
- `Base specification`: the files of the base specification (§s-5x737t9nee4zgaa), folder by folder in the code-point order of the folders' names;
- `Technical appendix`: the files of the technical appendix (§s-tj38pvm38nepaf5).

The files of one folder of the base specification, and the files of the technical appendix, are taken in the code-point order of their paths. Each node holds the nodes under it as follows, in the order in which the computation of locations goes through them (§s-ygg5kpcxgzq3m7w):
- a node holds its children, and a `TableRule` (§s-5fewsp22mmdz7y6) also holds the nodes in its cells;
- where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), a domain's header (§s-yggv9myedprnaa7) also holds the other top-level nodes of its folder;
- the first top-level node of a file of the guidelines, of the appendix of the tools or of the technical appendix also holds the file's further top-level nodes.

Each node is shown by its title. A node in a cell of a `TableRule`, which has no title, is shown by its location (§s-kag2m9tzdnduxdx).

The outline writes each node's title or location in an element whose class names the node's approval status (§s-tgrnpagrb58tya7). The page draws that element in a frame, dotted where the node is a draft and solid where it is approved. A branch that represents no node has no frame. The branches are drawn alike, whatever the approval status of their nodes.

**Reason:**

A person opens the map wherever the repository is, often without a network. On the map, the person sees the approval status of every node at a glance, at whatever size the map is drawn. The map is drawn from the nodes alone, with no format kept between them and the page, so it never shows a structure that the nodes no longer have (§s-kh8qcd5kxgh9z3j).

**Example:**

In a project that has chosen the Views and Domains extensions, the branch `Base specification` first holds the section of the contracts section. It then holds the header of the domain `accounts`, with the sections of `accounts` under it, and then the header of the domain `requests`, with its sections. A `TableRule` in a section of `requests` holds under it the nodes in its cells, each shown by its location. The most likely mistake is to draw a branch for each level of the domains, which represents no node.

## new:tools-4-diagram — Drawing the diagram of the domains

A new node, with the sid s-jzm6qw992j3bnxt.

**Title:** Drawing the diagram of the domains

**Text:**

Where the project has chosen the Domains extension (§s-tdm3rwsppnuh6dm), the SpecSheriff tools draw the diagram of the domains (§s-4azsb49pj6sech8) from the headers of the domains (§s-yggv9myedprnaa7) as follows:
- each domain is drawn once, labelled with its name, which is the name of its folder under `specs/` (§s-zefk589ykh37b8u);
- an arrow leads from each domain to each domain that it uses: each other domain to a section of which a `consumes` link of its header points;
- each level that the header of at least one domain contains has a row of its own, labelled with the level's number and its name, such as `2 services`;
- the rows of the levels follow the order of the levels' numbers from the top (§s-nkyty4dy9x2v2a4);
- below the rows of the levels, a row labelled `No level` holds each domain whose header contains none of the levels that the project's own guidelines list (§s-t9j29hppag2nren), where there is such a domain.

To place a domain, the SpecSheriff tools first place each domain of its row that it uses and that they have not yet started to place, each in the same way. They then place the domain itself. They take the domains of each row in this order (§s-uw9n84edf7cbe9n):
- first, each domain that uses no domain of the row and that no domain of the row uses;
- then, each domain that no domain of the row uses and that uses a domain of the row;
- last, each domain not yet placed, which only domains that use one another in a cycle leave (§s-bncp7gtyaukur8e).

This order takes into account only the domains of the same row that a domain uses. Where several domains are to be taken at once, the SpecSheriff tools take them in the alphabetical order of their names. They compare the names character by character, by the characters' code points.

**Reason:**

Drawn from the headers alone, the diagram always shows the hierarchy of the domains as the headers state it (§s-4azsb49pj6sech8). The rule on the order of the domains in a row leaves its harder cases to the appendix of the tools (§s-uw9n84edf7cbe9n). This procedure settles them by placing each domain right after the domains that it uses, in the same way on every machine.

**Example:**

The domains `a`, `b`, `c`, `d` and `e` are at the same level. `a` uses `b` and `c`, `c` uses `d`, and `e` has no link to any domain of the row. The row is `e`, `b`, `d`, `c`, `a`: `e` comes first, and `a` comes after `b` and after `c`, which comes after `d`. The most likely mistake is to place `a` right after `b`, the first domain that it uses, which puts `a` to the left of `c`, which it also uses.

**Todo (2026-11-25):** No command of the SpecSheriff tools draws this diagram yet. The command that draws it is to be added to the SpecSheriff tools and named in this node and in the list of the commands, in the release that brings this node.

## s-pvzms7d8kxb8dk2 — Where the types and RuntimeChecks generated from the RecordTypes are written

**Title:** Where the types and RuntimeChecks generated from the RecordTypes are written

**Text:**

Where the project has chosen the RecordType extension (§s-hzuzn8hbq6q9q4s), `sheriff types` (§s-a8fn72xa782wvbk) writes the types and the RuntimeChecks (§s-e877bnfa559tvk9) that it generates from the RecordTypes (§s-7vm323mhry2enx3) into the files that the technical appendix lists for them. Where the technical appendix lists no such file, `sheriff types` writes no types and no RuntimeChecks.

The list of those files is the `TextRule.list` (§s-eferktypcj7njt5) of a rule in the section of the technical appendix on the stack (§s-vj7ercem526zd6v), `specs/tech/stack.json` (§s-zefk589ykh37b8u). That rule is the one that has an `implements` link to the rule on generating the types and the RuntimeChecks (§s-e877bnfa559tvk9). Each member of the list is the path of a file relative to the root of the repository.

`sheriff types` reads that rule as the SpecSheriff tools read a rule of the project's own guidelines (§s-t9j29hppag2nren), with its `implements` link in place of a `refines` link. So it reads the list in the rule's last approved wording (§s-a8fn72xa782wvbk), and a rule that has never been approved lists no file.

The end of a listed file's name says what `sheriff types` writes into the file:
- `.ts`: the types in TypeScript;
- `.py`: the types in Python;
- `.json`: the RuntimeChecks in JSON Schema 2020-12.

The check of generated copies refuses a list that names any other file, and each other defect that keeps `sheriff types` from writing (§s-dbk2vyeg8z5jxna).

The JSON Schema validator that the technical appendix names for the RuntimeChecks (§s-e877bnfa559tvk9) treats `format` as an assertion, not only as an annotation.

For each file of RuntimeChecks, `sheriff types` keeps an entry in the bindings file (§s-trwczfskj5zmuft), since a JSON file can hold no SpecTag of its own (§s-kgbzk2ph9e6jfb4). The entry's key is the file's path. Its value lists the SpecTag `@spec <sid>` (§s-5z5gnu7pahr82xp) of each RecordType whose definition the file holds (§s-suv42g8r3ra2h6b), in the order of the definitions.

`sheriff types` writes that entry where the bindings file lacks it or holds another value for that path. It changes no other entry, and names the bindings file where it writes it.

**Reason:**

Where the generated code goes is a choice that concerns the whole system. The section of the technical appendix on the stack makes that choice, in a list that the SpecSheriff tools read (§s-vj7ercem526zd6v). Each file that `sheriff types` writes is bound to the RecordTypes that it comes from (§s-ktfstpv8rurznrp), so the RuntimeChecks are found from each RecordType, as its types are.

**Example:**

The rule of the stack lists `src/generated/records.ts` and `src/generated/records.schema.json`. `sheriff types` writes the types of the RecordTypes into the first file and their RuntimeChecks into the second. It keeps in the bindings file the entry for `src/generated/records.schema.json`, with the SpecTag of each RecordType. A team member adds `worker/records.py` to the list, so the rule becomes a draft. Until the new wording is approved, `sheriff types` writes nothing into `worker/records.py`. The most likely mistake is to take the list from the draft wording.

## s-suv42g8r3ra2h6b — What a RecordType generates

**Title:** What a RecordType generates

**Text:**

From the last approved wording of each RecordType (§s-7vm323mhry2enx3, §s-a8fn72xa782wvbk), `sheriff types` writes a type into each file of types and a definition into each file of RuntimeChecks (§s-pvzms7d8kxb8dk2). It takes the RecordTypes in the code-point order of their files' paths and, within a file, in the order in which the computation of locations goes through them (§s-ygg5kpcxgzq3m7w).

The name of a RecordType's type and of its definition is the RecordType's title, with the first letter of each word turned to uppercase and the spaces removed.

Each type has the SpecTag `@spec <sid>` (§s-5z5gnu7pahr82xp) with the sid of its RecordType (§s-ktfstpv8rurznrp), in the comment directly above it (§s-33fw3ga4ctd94dq): `/** @spec <sid> */` in TypeScript and `# @spec <sid>` in Python. Each definition has the sid of its RecordType as its `$anchor`, by which a `$ref` in another definition points to it (§s-4npdup7mjkva69y).

A file of RuntimeChecks holds one JSON Schema document, whose `$schema` is `https://json-schema.org/draft/2020-12/schema` and whose `$defs` holds each definition under its name.

The fields of a type and of a definition are, first, the fields of each RecordType that the RecordType reaches through `refines` links (§s-sn6au3vcr9uy5pm). Its own fields, which its `schema` declares (§s-6eb92ddch7shuvu), follow them. The SpecSheriff tools go through the `refines` links of a RecordType in the order in which it lists them. For each link, they first take the RecordTypes that the linked RecordType reaches in this way, and then the linked RecordType itself. They take no RecordType twice.

Each field keeps its name and the place where it first appears. Where several of these RecordTypes declare a field with the same name, the field has the schema that the last of them gives. A field is guaranteed (§s-adhmw4gw6y82f44) where the `required` of the `schema` of any of these RecordTypes lists it. In a type, a guaranteed field is required, and any other field is optional.

A definition is the RecordType's own `schema`, in which `properties` holds these fields and `required` lists the guaranteed ones. Each field's schema in it is changed only as the node on the type that the schema of a field gives says (§s-4npdup7mjkva69y). A RecordType of which RecordType variants exist generates, in addition, what the node on such a RecordType says (§s-nk8td3ez58gahc4).

In TypeScript, a type is written `export type <name> = {...}`, with `?` after the name of each optional field.

In Python:
- a type is written `<name> = TypedDict("<name>", {...})`;
- each name that a type uses from `typing` is imported from `typing`;
- a reference to another type is written as a string;
- an optional field is marked `NotRequired`.

`sheriff types` cannot generate the name of a type or of a definition in each of these cases (§s-dbk2vyeg8z5jxna):
- the name is not an identifier in the language of its file;
- the file already uses the name, including the names that the file imports and those that its language reserves;
- the name is that of the type that a `$ref` names, and no RecordType has the sid that the `$ref` names.

**Reason:**

Generated in one fixed way, the types and the definitions come out the same at every run and on every machine. The check of generated copies relies on that (§s-dbk2vyeg8z5jxna). Named after its RecordType and bound to it by a SpecTag that `sheriff types` writes, each type leads its reader back to the RecordType that it comes from.

**Example:**

The fragment of a format `address` declares the fields `city` and `street`. The RecordType `user` refines `address` and declares `name` and `street`, with a narrower schema for `street`. The type `User` holds `city`, then `street` with the schema that `user` gives, and then `name`. The most likely mistake is to write `street` twice, once for each RecordType, which TypeScript refuses to compile.

## s-nk8td3ez58gahc4 — A RecordType its variants refine

**Title:** A RecordType its variants refine

**Text:**

A RecordType of which RecordType variants exist (§s-z3dnru6qqdf9m6j) generates, besides what any RecordType generates (§s-suv42g8r3ra2h6b), what this node says. Its variants are the RecordType variants whose RecordType it is, as the check of RecordType variants determines (§s-c2r9jndrjbtbsv6). `sheriff types` takes them in the order in which it takes the RecordTypes.

In a file of RuntimeChecks, the RecordType's definition also holds `allOf`, with a pair of `if` and `then` for each of its variants:
- `if` is `{"properties": {<field>: {"const": <value>}, …}, "required": [<field>, …]}`, with each field and value that the variant's `answersTo` names;
- `then` is `{"$ref": "#<sid>"}`, with the sid of the variant, which points to the variant's definition.

A variant's definition is written as the definition of any RecordType, except that it holds only the fields that the variant adds to its RecordType. These are the fields that the variant declares and the fields of each RecordType that it reaches through `refines` links (§s-sn6au3vcr9uy5pm), other than its RecordType and the RecordTypes that its RecordType reaches.

In a file of types, the RecordType's type is the union of the following members, each a type of its own:
- for each variant, a type whose name is that of the variant's type (§s-suv42g8r3ra2h6b);
- where a combination of values of the fields that select a variant has no variant, a type for the other combinations, whose name is the name of the RecordType's type followed by `Other`.

A combination of values holds one value of each field that selects a variant. The type of a variant holds the RecordType's fields, followed by the fields that the variant adds. In it, each field that selects a variant is required and takes only the value that the variant's `answersTo` names.

The type for the other combinations holds the RecordType's fields. Where one field selects a variant, that field takes only the values to which no variant corresponds. Where several fields select a variant, each of them takes all its values.

The union is written `export type <name> = <member> | …` in TypeScript and `<name> = Union["<member>", …]` in Python. The union has the SpecTag of the RecordType. Each member has the SpecTag of the RecordType that it comes from: a variant's type that of the variant, and the type for the other combinations that of the RecordType.

The values of a field that selects a variant are those that the SpecSheriff tools collect for it (§s-5nf87c3e3jg9v7c).

**Reason:**

A data record holds the fields of its RecordType together with those of the RecordType variant that its values select (§s-z3dnru6qqdf9m6j). JSON Schema states this with pairs of `if` and `then`. TypeScript and Python state it with a union of flat types, which the values of the fields that select a variant tell apart.

**Example:**

The RecordType `notification` names `channel` in its `chosenBy`, and the values of `channel` are `email`, `sms` and `app`. Its variants, titled “notification by email” and “notification by SMS”, correspond to `email` and `sms`. Its definition holds a pair of `if` and `then` for each of them, and its type `Notification` is the union of `NotificationByEmail`, `NotificationBySMS` and `NotificationOther`, in which `channel` takes only `app`. The most likely mistake is to let `channel` take every value in `NotificationOther`, so that a data record whose `channel` is `email` and that has no `address` passes the type.

## s-4npdup7mjkva69y — The type that the schema of a field gives

**Title:** The type that the schema of a field gives

**Text:**

Within a RecordType's `schema` (§s-6eb92ddch7shuvu), the schema of each field gives, in TypeScript and in Python, the type that the table below names. The last column of the table names the neutral type that an earlier release of the SpecSheriff tools wrote in place of each schema (§s-gb8s9657a65hqmv).

| Field's schema | TypeScript | Python | Neutral type that an earlier release wrote |
|---|---|---|---|
| `{"$ref": "#<sid>"}` | the name of the type of the RecordType that has that sid | that name, as a string | record |
| `{"identifierOf": "<sid>"}` | what the field at the end of its chain of identifiers gives (§s-3anv9qcmx8pwp2w) | what that field gives | identifier of |
| `{"enum": [<its values>]}` | the union of its values as literals | `Literal[<its values>]` | one of, with a list of its own |
| `{"x-enumSource": <its source>}` | the union of the values gathered beside it as literals | `Literal[<the values gathered beside it>]` | one of, with values from elsewhere |
| `{"type": "string"}` | `string` | `str` | text |
| `{"type": "string", "format": "email"}` | `string` | `str` | email address |
| `{"type": "string", "format": "date-time"}` | `string` | `str` | instant |
| `{"type": "string", "format": "date"}` | `string` | `str` | date |
| `{"type": "string", "format": "duration"}` | `string` | `str` | duration |
| `{"type": "integer"}`, with its bounds | `number` | `int` | whole number |
| `{"type": "number"}`, with its bounds | `number` | `float` | number |
| `{"type": "boolean"}` | `boolean` | `bool` | yes/no |
| `{"type": "array", "items": <its members' schema>}`, with its bounds on how many members it holds | `<its members' type>[]` | `list[<its members' type>]` | list of |
| `{"type": "object", "additionalProperties": <its values' schema>}`, with no `properties` | `Record<string, <its values' type>>` | `dict[str, <its values' type>]` | map of |
| `{}` | `unknown` | `Any` | any value |

A field's schema falls under the first row of the table whose keywords it holds with the values that the row gives. In a row, a value in angle brackets means any value of the kind that it names. Any other keyword of a field's schema, such as `description`, `format` or a bound, leaves the type as the row gives it. The same table gives the type of the members of a list and of the values of a map from their schemas.

The rows that give the same type, such as those whose schema holds `{"type": "string"}`, are listed apart because an earlier release wrote each of them as a neutral type of its own.

A field with `identifierOf` gives what `{}` gives where its chain of identifiers has no end.

A RecordType's `schema` names another RecordType only in the following forms:
- a `$ref` whose value is `#` followed by the RecordType's sid, which points to the `$anchor` of that RecordType's definition (§s-suv42g8r3ra2h6b);
- an `identifierOf` whose value is the RecordType's sid.

Each value gathered beside a field (§s-ju5vcanbjph7mgh) is taken once, at the place where it first appears in the field's `x-enumSource.gathered` (§s-5nf87c3e3jg9v7c). The types and the RuntimeChecks take the values alike.

In a file of RuntimeChecks, `sheriff types` writes each field's schema as the RecordType's `schema` holds it, with the following changes at any depth:
- `x-enumSource` is replaced by `enum`, which holds the values gathered beside the field;
- `identifierOf` is replaced, in its place, by each keyword of the schema of the field at the end of the chain of identifiers, other than that schema's `description`;
- where that chain has no end, `identifierOf` is removed.

**Reason:**

JSON Schema is the standard for which every language has a validator. So a field's schema serves as its RuntimeCheck, which checks alike in every language what a type in TypeScript or Python cannot state, such as a bound or a format. Each language's own type for a value is the one that its code reads without a conversion. An identifier has the type of the field that identifies the RecordType that it names. So a value that moves from that field to a field that refers to it keeps its type and passes the same RuntimeCheck.

**Example:**

The `schema` of the RecordType `statement` holds `"accountId": {"identifierOf": "s-…", "description": "The account."}`, where `s-…` is the sid of the RecordType `account`. The field that identifies `account` is `number`, whose schema is `{"type": "string", "maxLength": 34}`. In TypeScript, `accountId` has the type `string`, and in the RuntimeChecks its schema is `{"type": "string", "maxLength": 34, "description": "The account."}`. The most likely mistake is to leave `identifierOf` in the RuntimeCheck: a JSON Schema validator does not know that keyword, so it does not check that `accountId` is a string.

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
- `sheriff review`: asks the independent reviewer for its verdict on a commit (§s-4kd2pave7vm4hmd);
- `sheriff init`: sets a repository up for SpecSheriff (§s-7unxytshhc4md54);
- `sheriff remove`: removes SpecSheriff from a repository and leaves the repository's specification as it is (§s-7unxytshhc4md54);
- `sheriff approve`: records an owner's approval of a node, or the withdrawal of that approval (§s-v4qus7raqnwzneb);
- `sheriff reindex`: writes into the specification what the SpecSheriff tools compute from it, and rewrites in its own form what an earlier release wrote (§s-ztseyetus7np6br, §s-gb8s9657a65hqmv, §s-w5wg69pvvhedsws);
- `sheriff types`: generates parts of the system's code from the approved wordings of the nodes, for example the types and RuntimeChecks for the RecordTypes (§s-a8fn72xa782wvbk);
- `sheriff json`: prints as JSON the model of the specification, which a project's own check or generator reads (§s-w6gybeqn2ttydqx);
- `sheriff todos`: prints every todo of the specification together with its node (§s-fprt8xysafzjqv9);
- `sheriff guide`: prints the guidelines that the project follows, which an agent reads before it works on the specification (§s-jk8v3srrved7ram);
- `sheriff settings`: shows and changes the specification's approval status, its `strict` flag and the extensions of the guidelines that the project has chosen (§s-chsfpkgpmfk4fft);
- `sheriff untagged`: lists the symbols of the system's code that have no SpecTag, each with its file (§s-weuyx98r7c923ab);
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
- its `schema` (§s-6eb92ddch7shuvu) holds, at any depth, a `$ref` that points to that RecordType or an `identifierOf` that names it, in the forms in which a RecordType's `schema` names another RecordType (§s-4npdup7mjkva69y, §s-qpdnkejr5xzc6j3);
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

`sheriff binding` also refuses the bindings file (§s-trwczfskj5zmuft) where it lacks the entry that `sheriff types` writes for a file of RuntimeChecks (§s-pvzms7d8kxb8dk2), or holds another value for that file's path. The refusal names the file of RuntimeChecks and says that running `sheriff types` writes its entry.

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
