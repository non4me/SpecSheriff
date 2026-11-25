// Applies the corrections that EngStickler's readers confirmed in batch 57 (the inventory of stage 2, stage2-inventory.md)
// and in batch 58 (the continuation file). In the inventory, it also puts each node's title in quotation marks where the
// title is followed by the node's sid, since a title without them runs into the sentence around it.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const report = [];
const apply = (s, pairs, file) => {
  for (const [from, to] of pairs) {
    const n = s.split(from).length - 1;
    if (!n) report.push(`${file}: not found: ${from}`);
    s = s.split(from).join(to);
  }
  return s;
};

const cp = new URL("../t25-one-thought.md", here);
let c = fs.readFileSync(cp, "utf8");
c = apply(c, [
  ["**Questions for the owner from the inventory**", "**Questions for the owner that arose from the inventory**"],
  ["which the reason of rule 2.2 relies on", "which the reason for rule 2.2 relies on"],
  ["propose-6-4.mjs proposes that a node of the guidelines and a node of a chosen extension also hold the links from the appendix (asked first)", "propose-6-4.mjs proposed that a node of the guidelines and a node of an extension that the project has chosen also hold the links from the appendix, and the owner accepted it on 2026-11-20 («ок»)"],
  ["row 10.1.17 exempts abbreviations, while", "row 10.1.17 exempts abbreviations from the ban on sentences written in capitals, while"],
  ["The agent decides the other questions of the inventory itself:", "The agent decides the other questions of the inventory on its own:"],
  ["each check of the appendix implements the rows of the table that it carries out", "each check of the appendix implements the rows of a table of checks that it carries out"],
  ["the hooks and the commands implement 10.2 and 1.6.1", "the hooks and the commands implement nodes 10.2 and 1.6.1"],
  ["how the tools load the chosen extensions", "how the tools load the extensions that a project has chosen"],
  ["renamed terms are replaced as technical changes.", "each replacement of a renamed term is a technical replacement."],
], "continuation");
fs.writeFileSync(cp, c);

const ip = new URL("stage2-inventory.md", here);
let s = fs.readFileSync(ip, "utf8");
s = apply(s, [
  ["in 4 no change was found", "for 4 nodes no change was found"],
  ["may require a change", "may require the node to change"],
  ["that the node fails", "that the node fails to meet"],
  ["stand only in", "appear only in"],
  ["instead of the whole table or beside it", "instead of the whole table or in addition to it"],
  ["whose checks it makes", "whose checks it performs"],
  ["only by its own choice", "only if it chooses to"],
  ["on which every such node then relies", "on which every such node would then rely"],
  ["goes to the owner.", "goes to the owner for approval."],
  ["relies on finding a rule of the appendix", "relies on being able to find a rule of the appendix"],
  ["will meet", "will encounter"],
  ["cannot be settled", "cannot be finalised"],
  ["its todo name ", "its todo names "],
  ["would compute anew", "would recompute"],
  ["numbered straight through its files", "numbered continuously across its files"],
  ["refers beyond its part", "refers to anything outside its part"],
  ["recommended refusing it", "recommended rejecting it"],
  ["The agreed rows decide", "The agreed rows take precedence"],
  ["at the tools step", "at the step that changes the SpecSheriff tools"],
  ["the former mechanism of approval", "the former approval mechanism"],
  ["Every kept copy", "Every stored copy"],
  ["refuses a repeated value", "rejects a duplicate value"],
  ["refuses a field holding no value", "rejects a field that holds no value"],
  ["refuses a kind that the schema does not hold", "rejects a kind that the schema does not define"],
  ["in the history of git", "in git history"],
  ["the former waiting", "the former waiting behaviour"],
  ["name a push", "mention a push"],
  ["names the push", "mentions pushes"],
  ["Uncertain:", "Unclear:"],
  ["present sid", "current sid"],
  ["is rewritten or archived", "must be rewritten or archived"],
  ["is moved on", "is passed on to the next replacement"],
  ["the place of the archive", "where the archive is kept"],
  ["leaves to the appendix how", "leaves it to the appendix to say how"],
  ["orders the domains otherwise", "orders the domains differently"],
  ["names the names of the domains", "refers to the names of the domains"],
  ["finds no replacement", "has no replacement"],
  ["must stop.", "must stop reading them."],
  ["points at", "points to"],
  ["against 22", "compared with 22"],
  ["the present schema", "the current schema"],
  ["The order follows three steps.", "The order has three steps."],
  ["are confirmed with it", "are approved together with it"],
  ["new, or part of an existing node", "a new node or part of an existing one"],
  ["with a node for the diagram and the order of the domains", "with nodes for the diagram of the domains and the order of the domains"],
  ["A node for choosing and withdrawing extensions", "Nodes for choosing and withdrawing extensions"],
], "inventory");

const titles = new Set();
const collect = (nodes) => { for (const n of nodes || []) { if (n.title && n.title.length > 3) titles.add(n.title); collect(n.children); } };
collect(JSON.parse(fs.readFileSync("D:/SpecSheriff/specs/_guidelines/tools.json", "utf8")).nodes);
for (const f of ["spec.json", "extensions/domains.json", "extensions/recordtype.json", "extensions/views.json"]) collect(JSON.parse(fs.readFileSync(new URL(`moved/specs/_guidelines/${f}`, here), "utf8")).nodes);
collect(JSON.parse(fs.readFileSync("D:/SpecSheriff/specs/_guidelines/spec.json", "utf8")).nodes);
let quoted = 0;
for (const t of [...titles].sort((a, b) => b.length - a.length)) {
  for (const tail of [" (s-", ", s-"]) {
    const parts = s.split(t + tail);
    for (let i = 0; i < parts.length - 1; i++) {
      const before = parts[i];
      if (before.endsWith("“") || before.endsWith("\"") || before.endsWith("`") || /[A-Za-z]$/.test(before)) { parts[i] = before + t + tail; continue; }
      parts[i] = before + "“" + t + "”" + tail;
      quoted++;
    }
    s = parts.join("");
  }
}
fs.writeFileSync(ip, s);
console.log("titles quoted:", quoted);
console.log(report.join("\n") || "every pair found");
