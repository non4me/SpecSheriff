// Node 2.5 "The archive": what EngStickler's two readers and the rule reviewer's second pass found.
// The proposals: P1 said two things (the sid removed, or no new sid given), now it states the state; P2 "if" for
// "where", and in Russian «удаляется» as paragraph 1 renders the phrase, with the negation written out; P4 says where
// the sid would come back to; the example punctuated, "now" as the Russian says.
// The agreed wording, English alone, the Russian unchanged (the `vt` skill's rule "The owner agrees to the Russian,
// and the English says what the Russian means"): "have ever been approved" with "ever"; "whatever cites it", since
// what counts is what cites the section when it is deleted; "A rule that one of its owners has approved", which read
// with a stumble; "no code implements it", since a rule is implemented, not code "implemented from" it.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const n = d["2.5"];
const swap = (field, from, to) => {
  if (!n[field].includes(from)) throw new Error(`2.5 ${field}: "${from}" not found`);
  n[field] = n[field].replace(from, to);
};
swap("text", "the nodes that were ever approved and have since been removed", "the nodes that have ever been approved and have since been removed");
swap("text", "is deleted outright, whatever cited it.", "is deleted outright, whatever cites it.");
swap("reason", "A rule one of its owners approved is one the code may implement", "A rule that one of its owners has approved is one the code may implement");
swap("reason", "A section requires nothing, so no code was implemented from it.", "A section requires nothing, so no code implements it.");
n.changes.push("Только английский, по замечаниям читателей EngStickler; русский текст не изменился: «that have ever been approved» вместо «that were ever approved»; «whatever cites it» вместо «whatever cited it»; «A rule that one of its owners has approved» вместо «A rule one of its owners approved»; «so no code implements it» вместо «so no code was implemented from it».");

const p = n.proposals;
p[0].en = "In the archive, it holds no sid of its own.";
p[0].ru = "В архиве у него нет собственного sid.";
p[1].en = "An archived node names as its replacement only a node of the specification. When that replacement is removed from the specification in turn, each archived node naming it names the replacement's own replacement instead, or none if the replacement has none.";
p[1].ru = "Архивный узел называет своей заменой только узел спецификации. Когда из спецификации удаляется и эта замена, каждый архивный узел, который её называет, называет вместо неё её собственную замену, а если у неё замены нет — не называет никакой.";
p[3].en = "A sid kept in the archive could come back into the specification with a copy of its node, and would then name two nodes.";
p[3].ru = "sid, оставленный в архиве, мог бы вернуться в спецификацию вместе с копией своего узла и тогда называл бы два узла.";
p[4].en = "A is archived, naming B as its replacement. Later, B is archived, naming C. A now names C.";
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(n.text + "\n---\n" + n.reason);
