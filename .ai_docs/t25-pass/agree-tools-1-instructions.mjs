// Starts tools-drafts.json, the drafts of the nodes of the appendix of the tools reviewed in stage 2,
// with the draft of "Where the files are" (s-zefk589ykh37b8u). It removes the two paragraphs that
// instruct a user (running `sheriff` in a terminal, installing the plugin for pytest by pip), as the
// owner agreed on 2026-11-21, and the `cites` link to s-4mej6ccn7xu3d3p, which only the removed
// paragraph cited.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsUrl = new URL("tools-drafts.json", here);
const tools = JSON.parse(fs.readFileSync(new URL("../../specs/_guidelines/tools.json", here), "utf8"));

function find(nodes, sid) {
  for (const n of nodes) {
    if (n.sid === sid) return n;
    const r = n.children && find(n.children, sid);
    if (r) return r;
  }
}

const sid = "s-zefk589ykh37b8u";
const node = find(tools.nodes, sid);
const paras = node.text.split("\n\n");
const terminal = paras.findIndex(p => p.startsWith("The SpecSheriff tools provide the command `sheriff`."));
const pytest = paras.findIndex(p => p.startsWith("Their plugin for pytest,"));
if (terminal < 0 || pytest !== terminal + 1) throw new Error("the two paragraphs were not found where expected");
const text = paras.filter((_, i) => i !== terminal && i !== pytest).join("\n\n");
if (text.includes("s-4mej6ccn7xu3d3p")) throw new Error("s-4mej6ccn7xu3d3p is still cited");

const drafts = fs.existsSync(draftsUrl) ? JSON.parse(fs.readFileSync(draftsUrl, "utf8")) : {};
if (drafts[sid]) throw new Error("the draft already exists");
drafts[sid] = {
  location: "tools 1",
  title: node.title,
  text,
  reason: node.reason ?? "",
  refs: (node.refs || []).filter(r => r.to && r.to !== "s-4mej6ccn7xu3d3p"),
  agreed: false,
  changes: [
    "Removed the paragraph on how `sheriff` is run in a terminal and the paragraph on how the plugin for pytest is installed by pip: both instruct a user rather than state what the SpecSheriff tools do, and the practitioner's guide, skills/claude-code/README.md, already gives both. The `cites` link to s-4mej6ccn7xu3d3p goes with the first paragraph, the only place that cited it."
  ],
  rulings: [
    {
      date: "2026-11-21",
      problem: "The owner asked what this node is for and for whom, and whether it is service information rather than a rule. Two of its paragraphs instruct a user: how `sheriff` is run in a terminal, and how the plugin for pytest is installed by pip. The practitioner's guide already gives both.",
      ruling: "The owner: the node stays in the appendix of the tools, since the code of the SpecSheriff tools that finds the files is written from it, and the two instructions are removed from it, since the guide gives them («ок»).",
      type: "textual"
    }
  ]
};
fs.writeFileSync(draftsUrl, JSON.stringify(drafts, null, 2) + "\n");
console.log("tools-drafts.json: draft of", sid, "written;", paras.length - text.split("\n\n").length, "paragraphs removed");
