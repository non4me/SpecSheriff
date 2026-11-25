// Applies the corrections EngStickler's readers confirmed in batch 4, and records in the continuation file what
// specsheriff-rule-reviewer found in the proposal for 12.6.
import fs from "node:fs";

const fix = (f, pairs) => {
  let s = fs.readFileSync(f, "utf8");
  for (const [a, b] of pairs) {
    if (!s.includes(a)) throw new Error(`${f}: missing ${a.slice(0, 70)}`);
    s = s.split(a).join(b);
  }
  fs.writeFileSync(f, s);
};
const root = "D:/SpecSheriff/";
fix(root + ".claude/vt/rules.md", [
  ["New nodes are not shown together as a table:", "New nodes are not shown together in a table:"],
  ["and the volume of such consequences buries", "and the number of such consequences buries"],
  ["The SpecSheriff tools already check node files against JSON Schema and generate", "The SpecSheriff tools already check node files against schemas written in JSON Schema and generate"],
  ["The agent compares the decision with other practices after JSON Schema.", "Only then does the agent compare the decision with other practices."],
]);
fix(root + ".ai_docs/t25-one-thought.md", [
  ["the owner is agreeing, one row at a time, to table 12.12,", "the owner is agreeing to the rows of table 12.12 one at a time,"],
  ["derived from their purpose in 12.6 (rows 12.12.4 to 12.12.9).", "derived from their purpose in 12.6 (rows 12.12.4 to 12.12.9, of which row 12.12.4 is now removed)."],
  ["The owner also accepted every purely mechanical change immediately, so that only the differences of principle are put to the owner.", "The owner also accepted in advance every purely mechanical change, so that only the changes that are matters of principle are put to the owner."],
  ["Ajv 2020 accepted or refused 13 sample records as expected", "Ajv 2020 accepted or rejected 13 sample records as expected"],
  ["The drafts as they were before it are kept in", "The drafts as they were before it ran are kept in"],
  [
    "- 12.6. In it, the fields of a RecordType variant are at the same level as the fields of its RecordType. The name of each field of a variant differs from the names of its RecordType's fields. specsheriff-rule-reviewer is checking 12.6 before it is shown to the owner.",
    "- 12.6. In 12.6, the fields of a RecordType variant are at the same level as the fields of its RecordType. The name of each field that a variant declares differs from the name of every field of its RecordType. specsheriff-rule-reviewer checked 12.6, and json-schema-12-6-review.mjs applied its fixes. 12.6 is now shown to the owner.",
  ],
  ["Differences of principle still to be put to the owner, one at a time, after 12.6:", "Changes of principle still to be put to the owner, one at a time, after 12.6:"],
  ["The step that changes the SpecSheriff tools must do the following for this ruling, in an estimated 5–7 h more:", "To put this ruling into effect, the step that changes the SpecSheriff tools must do the following, which adds an estimated 5–7 h:"],
  ["a RecordType contains `schema`, an object of JSON Schema, in place of", "a RecordType contains `schema`, a JSON Schema object, instead of"],
  ["`answersTo` and the word for the source of gathered values", "`answersTo` and the keyword for the source of gathered values"],
  [
    "- validate.ts checks the names of a variant's fields against those of its RecordType, in place of counting the fields of type `variant`.",
    "- validate.ts checks that the names of a variant's fields differ from those of its RecordType, instead of counting the fields of type `variant`.",
  ],
  [
    "- The tests of the SpecSheriff tools, and the RecordType nodes of the saloon, are rewritten.",
    [
      "- The tests of the SpecSheriff tools, and the RecordType nodes of the saloon, are rewritten.",
      "- The reviewer named the other nodes of the appendix of the tools that change: 7.2.8 (s-dbk2vyeg8z5jxna), which refuses a RecordType with two fields of type `variant`; nodes s-suv42g8r3ra2h6b, s-nk8td3ez58gahc4 and s-4npdup7mjkva69y, the last of which has a row for the type `variant`; and the tests listed in `meta.tests` of node s-jau82aq9juv9zzh.",
      "- The same step settles two questions of the reviewer. The first is whether a field of another variant is refused when the RecordType keeps unknown fields. The second is whether the names of fields are compared regardless of letter case.",
    ].join("\n"),
  ],
]);
fix(root + ".ai_docs/INDEX.md", [["the mechanical changes that bring RecordType to JSON Schema 2020-12", "the mechanical changes that bring RecordType into line with JSON Schema 2020-12"]]);
console.log("ok");
