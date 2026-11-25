# EngStickler's thorough reader on english-group7.md: the findings and the main session's decision on each

The thorough reader read `english-group7.md` on 2026-11-25. This file keeps each finding of the reader that asks for a change, with the main session's decision. Where this file and `english-g7-fast.md` give different words for the same phrase, the words in this file are the ones to use.

## Applied: the drafting agent makes these changes in round b

`s-k4nqjr96ux7a5m7`:
- "each other value that the node's file holds for it, other than its links and the nodes under it, under the value's key: a value that is text as it is, and any other value as JSON" → "any other value that the node's file holds for it, except its links and the nodes under it, under the value's key: a value that is text is written as it is, and any other value is written as JSON". "Each other" can read as "one another", and the owner's English uses "any other";
- "A cell that holds text holds that text." and the sentence after it name two different cells by one word: say that where a cell of the `TableRule` holds text, the table's cell holds that text, and where it holds a node, the table's cell holds the node's location and its text;
- "since they are part of its wording" → "since these are part of its wording";
- "takes a heading one level deeper" → "has a heading one level deeper"; "take a heading of the first level" → "have a first-level heading";
- "writes it in one form" → "writes it in the same form";
- "From each sid, the reader also learns" → "Beside each sid, the reader also sees";
- the example's "so that its reader does not see" → ", so its reader does not see": a consequence, not a purpose.

`new:tools-5-export`:
- "It then writes there a `.gitignore` file that holds `*`." → "It then writes a `.gitignore` file that holds `*` there.";
- "the path of its file below `specs/`" and "the top-level nodes of its file" → "its source file".

`new:tools-5-show`:
- "everything that the node's file holds for one node" → "everything that a node's file holds for that node";
- "without opening the files of the specification" → ", so that they need not open the files of the specification", since the person or the agent is the one who would open them;
- the example: "the rule on a node's location" is replaced by the fast reader's wording, "the rule that is at that location"; "so that a location is refused" → ", so a location is refused".

`s-rpv4fkdqqguptqd`:
- "It then writes there the web page `index.html`, which draws the map, and a `.gitignore` file that holds `*`." → "It then writes two files there: the web page `index.html`, which draws the map, and a `.gitignore` file that holds `*`.";
- "Each of the following top-level branches of the outline represents no node." → "None of the following top-level branches of the outline represents a node.";
- "the file's further top-level nodes" → "the file's other top-level nodes";
- "The outline writes each node's title or location in an element" → "In the outline, `sheriff map` writes each node's title or location in an element";
- "in a frame" and "has no frame" → "with a border" and "has no border";
- "often without a network" → "often without network access";
- "with no format kept between them and the page" → "with nothing stored between the nodes and the page".

`new:tools-4-diagram`:
- "right after the domains that it uses" in the reason → "after the domains that it uses, as close to them as possible", the words of rule 11.2.3. The example shows that `a` does not come immediately after each domain it uses.

`s-pvzms7d8kxb8dk2`:
- "The rule of the stack lists" in the example → "The rule in the section on the stack lists";
- "a list that names any other file" → "a list that names a file with any other ending";
- "each other defect that keeps" → "any other defect that keeps";
- "so the RuntimeChecks are found from each RecordType, as its types are" → "so the RuntimeChecks can be found from each RecordType, as its types can". This replaces the fast reader's wording.

`s-suv42g8r3ra2h6b`:
- the title "What a RecordType generates" → "What is generated from a RecordType", since `sheriff types` generates, not the RecordType. The `change` field says that the title changed;
- "the fields of each RecordType that the RecordType reaches through `refines` links" → "the fields of each RecordType that the type's RecordType reaches through `refines` links";
- "is changed only as the node on the type that the schema of a field gives says" → "is changed only as the node on the type given by a field's schema says";
- "A RecordType of which RecordType variants exist generates, in addition, what the node on such a RecordType says" → "For a RecordType that has RecordType variants, `sheriff types` also generates what the node on such a RecordType says";
- "cannot generate the name of a type or of a definition in each of these cases" → "in any of these cases".

`s-nk8td3ez58gahc4`:
- the title → "A RecordType that its variants refine";
- the first sentence → "For a RecordType that has RecordType variants (§s-z3dnru6qqdf9m6j), `sheriff types` generates what this node says, in addition to what it generates for any RecordType (§s-suv42g8r3ra2h6b).";
- "a type for the other combinations" and "The type for the other combinations" → "the combinations that have no variant";
- the sentence on the SpecTags of the members leaves out its verbs: write "a variant's type has the SpecTag of the variant, and the type for the combinations that have no variant has the SpecTag of the RecordType";
- "passes the type" → "is accepted by the type"; "so that a data record" → ", so a data record". This replaces the fast reader's "satisfies".

`s-4npdup7mjkva69y`:
- "`#` followed by the RecordType's sid" and "whose value is the RecordType's sid" → "the other RecordType's sid";
- "The types and the RuntimeChecks take the values alike." → "The types and the RuntimeChecks hold the same values in the same order.";
- "is replaced, in its place, by each keyword of the schema" → "is replaced, at the same position, by every keyword of the schema";
- "the field that identifies the RecordType that it names" → "the field that identifies the data records of the RecordType that it names", as the neighbouring nodes say.

## Not applied, and why

- "makes this check" → "runs this check", in the proposals: the owner's English writes "makes this check", as the brief for group 7 says.
- "the section of the technical appendix on the stack": the owner's phrase, which the brief for group 7 lists.
- "each level that the header of at least one domain contains" → "names": rule 11.2.2 says "contains".
- In the five proposals, every finding on a sentence that the proposal does not change: "holds together" and "in its own form" (`proposal:s-f5rz6b7dhxejjts-g7`), "its own part of the system", "the RecordType of a user" and the last sentence of the example (`proposal:s-ezq8csd433vj6fj-g7`), the long sentence on the draft rule on when the tests run and "opens a test's name" (`proposal:s-gb8s9657a65hqmv-g7`), and "also refuses the commit" and "runs it as" (`proposal:s-dbk2vyeg8z5jxna-g7`). These are agreed wordings that the readers read when they were agreed, and the group changes only what each proposal's `change` field lists.
- The preamble of `english-group7.md`: not a node.
