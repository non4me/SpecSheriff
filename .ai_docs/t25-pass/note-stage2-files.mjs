// Records in the continuation file where stage 2 stands: the questions from the inventory are settled, and the agent has
// proposed to the owner that the node "Where the files are" (s-zefk589ykh37b8u) become a section of eight rules.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const p = new URL("../t25-one-thought.md", here);
let s = fs.readFileSync(p, "utf8");
const from = "**The next session continues** stage 1 of the step that changes the SpecSheriff tools,";
if (!s.includes(from)) throw new Error("the opening of the next session's paragraph has moved");
s = s.replace(from, () => "**The next session continues** stage 2 of the step that changes the SpecSheriff tools: the review of the appendix of the tools, one node at a time, as the paragraph \"Stage 2 starts\" below describes. The first node under review is \"Where the files are\" (s-zefk589ykh37b8u), and the owner's answer to the proposal for it, described there, comes first. Stage 1 belonged to that same step,");
const anchor = "**Stage 2 starts**";
const at = s.indexOf(anchor);
if (at < 0) throw new Error("no paragraph on stage 2");
const end = s.indexOf("\n\n", at);
const add = [
  "",
  "",
  "**The first node of the appendix under review** is \"Where the files are\" (s-zefk589ykh37b8u). It lists every file of a project in one rule. The agent proposed to the owner on 2026-11-21 that it become a section of the following rules, each to be shown to the owner on its own:",
  "1. the files of the base specification and of the technical appendix under `specs/`;",
  "2. the files of the guidelines and of the schema, including the schema of each extension and `archive-file.schema.json`, which every project except SpecSheriff itself reads from the plugin;",
  "3. the records kept beside the specification: the approvals, the entries of the specification's approval status and of its `strict` flag, the archive and the bindings file;",
  "4. the settings in `sheriff.config.json`, including the chosen extensions, and the reviewer's settings in each user's git configuration;",
  "5. what `project.json` holds, now without the rule that approved the specification, and with where the tests run, the project's own tools that rewrite files and the formats that allow no comments;",
  "6. what is rebuilt after every change and is not kept in git, where the Views extension is chosen;",
  "7. how the SpecSheriff tools are run and installed, and which of their files a project keeps;",
  "8. what the documentation is: the Markdown files that the repository keeps outside `specs/`.",
  "",
  "The agent made four choices of its own, since the new form requires these files and the current node names none of them: the entries of the specification's approval status and of its `strict` flag are kept in `specs/_status.jsonl`; the bindings file is `sheriff.bindings.json`, next to `sheriff.config.json`; the chosen extensions are listed in `sheriff.config.json`; without the Domains extension, the base specification is kept under `specs/base/`.",
].join("\n");
s = s.slice(0, end) + add + s.slice(end);
fs.writeFileSync(p, s);
console.log("continuation updated");
