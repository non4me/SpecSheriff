// Node 2.5 "The archive", the fast reader's second pass: P1 names its subject, since "it" after "In the archive"
// could be read as the archive; P2 orders the change with "then" and loses "naming ... names"; P4 puts the sid "in" the
// copy of its node, since the sid is part of the node, not something carried beside it.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const p = d["2.5"].proposals;
p[0].en = "An archived node has no sid of its own.";
p[0].ru = "У архивного узла нет собственного sid.";
p[1].en = "An archived node names as its replacement only a node of the specification. When that replacement is removed from the specification in turn, each archived node that names it then names the replacement's own replacement instead, or none if the replacement has none.";
p[3].en = "A sid kept in the archive could come back into the specification in a copy of its node, and would then name two nodes.";
p[3].ru = "sid, оставленный в архиве, мог бы вернуться в спецификацию в копии своего узла и тогда называл бы два узла.";
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(p.map((x) => x.en).join("\n"));
