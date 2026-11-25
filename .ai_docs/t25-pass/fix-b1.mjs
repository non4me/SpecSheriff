// Applies the corrections that the agent accepted from EngStickler's reader in batch 1 of this session
// to the index of .ai_docs, the continuation file and the draft of "Where the files are".
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const edits = {
  "../INDEX.md": [
    ["agree-tools-1-instructions.mjs starts it with \"Where the files are\" (s-zefk589ykh37b8u) and removes from that node the two instructions to a user that the owner agreed to remove.",
     "agree-tools-1-instructions.mjs creates tools-drafts.json with the draft of \"Where the files are\" (s-zefk589ykh37b8u) and removes from that draft the two instructions for a user that the owner agreed to remove."],
    ["propose-tools-1.mjs proposes the new wording of that node, one node holding a table of what is kept where, part by part in English and in Russian.",
     "propose-tools-1.mjs proposes the new wording of \"Where the files are\" as one node that holds a table of what is kept where, written part by part in English and in Russian."],
    ["gen-tools-node-page.mjs builds tools-page/index.html, the page that shows a proposed node of the appendix part by part, with what changed in each part, the nodes it cites, its tests and its approved wording.",
     "gen-tools-node-page.mjs builds tools-page/index.html, the page that shows a proposed node of the appendix of the tools part by part. Beside each part, the page shows what changed in it and the nodes it cites. Below the parts, it shows the node's tests and its currently approved wording."]
  ],
  "../t25-one-thought.md": [
    ["is shown to the owner once the reviewer's findings are applied.",
     "is shown to the owner once the findings of specsheriff-rule-reviewer are applied."],
    ["Its drafts and those of the later nodes of the appendix are kept in t25-pass/tools-drafts.json, and gen-tools-node-page.mjs builds the page that shows a proposed node, tools-page/index.html.",
     "Its drafts and those of the later nodes of the appendix of the tools are kept in t25-pass/tools-drafts.json, and gen-tools-node-page.mjs builds tools-page/index.html, the page that shows a proposed node."],
    ["and whether it is service information rather than a rule. The agent answered that the code of the SpecSheriff tools that finds the files is written from it, and that the code depends on these paths.",
     "and whether the node is auxiliary information rather than a rule. The agent answered that the code of the SpecSheriff tools that finds the files is written from the node, and that this code depends on the paths the node lists."],
    ["to remove the two paragraphs that instruct a user: how `sheriff` is run in a terminal and how the plugin for pytest is installed by pip. The practitioner's guide already gives both.",
     "to remove the two paragraphs of instructions for a user: how `sheriff` is run in a terminal, and how the plugin for pytest is installed with pip. The practitioner's guide, skills/claude-code/README.md, already gives both."],
    ["The agent then decided, on its own, against the section of eight rules it had proposed earlier: a list of where each file is kept states one thing, so the node stays one node holding a table of what is kept where.",
     "The agent then decided, without asking the owner, not to make the node the section of eight rules that it had proposed earlier. A list of where each file is kept states a single thought, so the node remains a single node that holds a table of what is kept where."],
    ["and the paragraph on the files of the tools in a project.",
     "and the paragraph saying which files of the SpecSheriff tools a project keeps."],
    ["The choices the agent made on its own, which the proposal shows: the entries",
     "The proposal shows these choices, which the agent made on its own: the entries"],
    ["and the section of the technical appendix that implements it in `specs/tech/base.json`.",
     "and the section of the technical appendix that implements that specification is kept in `specs/tech/base.json`."],
    ["To be taken up when the node of the Views extension is next changed: its section text calls the views",
     "A mismatch of terms, to be resolved when the section of the Views extension is next changed: the text of that section calls the views"]
  ],
  "tools-drafts.json": [
    ["and whether it is service information rather than a rule. Two of its paragraphs instruct a user: how `sheriff` is run in a terminal, and how the plugin for pytest is installed by pip.",
     "and whether it is auxiliary information rather than a rule. Two of its paragraphs are instructions for a user: how `sheriff` is run in a terminal, and how the plugin for pytest is installed with pip."],
    ["the paragraph on how the plugin for pytest is installed by pip",
     "the paragraph on how the plugin for pytest is installed with pip"]
  ]
};
for (const [file, list] of Object.entries(edits)) {
  const url = new URL(file, here);
  let s = fs.readFileSync(url, "utf8");
  for (const [from, to] of list) {
    if (!s.includes(from)) throw new Error(`${file}: not found: ${from.slice(0, 60)}`);
    s = s.replace(from, to);
  }
  fs.writeFileSync(url, s);
}
console.log("batch 1 corrections applied");
