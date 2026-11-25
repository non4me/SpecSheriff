// Carries out the owner's ruling of 2026-11-21 on `writesSpecSheriffGuidelines`: the key leaves the draft of "The settings
// common to a project", and a setting that only one repository needs is to be read from an environment variable rather
// than from `sheriff.config.json`. Also applies EngStickler's eleventh batch of corrections to the draft, the
// continuation file and INDEX.md.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsUrl = new URL("tools-drafts.json", here);
const drafts = JSON.parse(fs.readFileSync(draftsUrl, "utf8"));
fs.writeFileSync(new URL("tools-drafts.before-flag.json", here), JSON.stringify(drafts, null, 2) + "\n");

const settings = drafts["new:tools-1-settings"];
const p = settings.proposal;
const swap = (s, from, to) => {
  if (!s.includes(from)) throw new Error(`not found: ${from.slice(0, 80)}`);
  return s.replace(from, to);
};

// The list loses its last item; the item before it now closes the list.
const flagAt = p.parts.findIndex((x) => x.en.startsWith("`\"writesSpecSheriffGuidelines\": true`"));
if (flagAt < 0) throw new Error("the item on the key is not in the draft");
const flag = p.parts[flagAt];
p.parts.splice(flagAt, 1);
const before = p.parts[flagAt - 1];
before.en = swap(before.en, "(§s-xr5xxa9cxf2mq5u);", "(§s-xr5xxa9cxf2mq5u).");
before.ru = swap(before.ru, "(§s-xr5xxa9cxf2mq5u);", "(§s-xr5xxa9cxf2mq5u).");
p.text = swap(p.text, `(§s-xr5xxa9cxf2mq5u);\n- ${flag.en}`, "(§s-xr5xxa9cxf2mq5u).");
p.ruText = swap(p.ruText, `(§s-xr5xxa9cxf2mq5u);\n- ${flag.ru}`, "(§s-xr5xxa9cxf2mq5u).");
p.removed = [...(p.removed || []),
  "Пункт `\"writesSpecSheriffGuidelines\": true` — по вашему решению от 21 ноября: этот ключ нужен только репозиторию SpecSheriff, а значение, важное одному проекту, не хранится в настройках, которые читают инструменты каждого проекта. Как инструменты узнают репозиторий, где пишутся SpecSheriff guidelines, скажет переменная окружения."];

// EngStickler, batch 11: "not JSON" reads as a file that is merely named .json.
const refusal = p.parts.find((x) => x.en.startsWith("The SpecSheriff tools refuse"));
refusal.en = swap(refusal.en, "that is not JSON", "that is not valid JSON");
refusal.ru = swap(refusal.ru, "не является JSON", "не является корректным JSON");
p.text = swap(p.text, "that is not JSON", "that is not valid JSON");
p.ruText = swap(p.ruText, "не является JSON", "не является корректным JSON");

settings.rulings = [...(settings.rulings || []), {
  date: "2026-11-21",
  problem: "The owner asked how the SpecSheriff tools use `\"writesSpecSheriffGuidelines\": true`, noting that no repository but SpecSheriff's own seems to need it. The tools use the key to tell the repository where the SpecSheriff guidelines are written from a project: only there do they read the guidelines and their schema from `specs/`, judge the approvals of the guidelines' nodes by that repository's own approvals, and accept those files under `specs/` rather than refuse them as copies. `sheriff init` never writes the key, so every project leaves it out.",
  ruling: "The owner: the key is removed from this node («ок, убирай»). A setting that only one repository needs is read from an environment variable, since carrying a value that matters to one project into the settings of every other project is an antipattern.",
  type: "textual"
}];

fs.writeFileSync(draftsUrl, JSON.stringify(drafts, null, 2) + "\n");

const edit = (rel, pairs) => {
  const url = new URL(rel, here);
  let s = fs.readFileSync(url, "utf8");
  for (const [from, to] of pairs) s = swap(s, from, to);
  fs.writeFileSync(url, s);
};

edit("../t25-one-thought.md", [
  ["The owner asked how the SpecSheriff tools use `writesSpecSheriffGuidelines`, noting that no repository but SpecSheriff's own seems to need it. The agent answered and proposed to take the key out of the node's list of settings. The owner's decision on that proposal is to be acted on first.",
    "The owner had the key `writesSpecSheriffGuidelines` removed from that node, as the paragraph \"The first node of the appendix under review\" below describes, and the node is shown to the owner again. The owner's answer is to be acted on first."],
  ["corrected it without changing its meaning. The map and the export are each now named together with the directory that holds it. \"Common to every project\" replaces \"that every project shares\", and the closing sentence and the reason are worded more plainly. tools-drafts.before-settings-b.json keeps the drafts as they were before that script and propose-settings-b.mjs ran.",
    "corrected it without changing its meaning. The node now names the directory of the map and that of the export. \"Common to every project\" replaces \"that every project shares\", and the node's closing sentence and its reason are worded more plainly. tools-drafts.before-settings-b.json keeps the drafts as they were before fix-tools-1-english.mjs and propose-settings-b.mjs ran."],
  ["now also covers the files of types that `sheriff types` writes", "now also covers the files holding the types that `sheriff types` writes"],
  ["refuse a `sheriff.config.json` file that is not JSON", "refuse a `sheriff.config.json` file that is not valid JSON"],
  ["  - the item on the test command says which tests the command runs, as \"The hooks\" does, and `writesSpecSheriffGuidelines` marks the repository where the guidelines are written, as the approved wording says;",
    "  - the item on the test command says which tests the command runs, as \"The hooks\" does;"],
  ["The agent decided, because it is a matter of where a rule belongs, that other nodes state the format of an entry: how it names the owner, how the latest entry is found and how it names an extension.",
    "Since the question was only where a rule belongs, the agent decided it: other nodes state the format of an entry in `sheriff.config.json`, namely how the entry names the owner, how the latest entry is found and how an entry names an extension."],
  ["- gen-tools-node-page.mjs now also builds the page of a new node,",
    `- The owner asked how the SpecSheriff tools use \`"writesSpecSheriffGuidelines": true\`, noting that no repository but SpecSheriff's own seems to need it. The agent answered from the code. The key tells the tools that they work in the repository where the SpecSheriff guidelines are written, and \`sheriff init\` never writes it. On 2026-11-21 the owner had the key removed from the draft («ок, убирай») and ruled that a setting that only one repository needs is read from an environment variable. remove-flag-settings.mjs removed the item and recorded the ruling in the draft. It also corrected "not JSON" to "not valid JSON", and tools-drafts.before-flag.json keeps the drafts as they were before it ran.
- The node that is to name the environment variable, and the variable's name, are still to be proposed to the owner. The agent intends to propose one sentence for "Where the files are", which already says that the tools read the guidelines from \`specs/\` in the repository where they are written. Once that variable replaces the key, the SpecSheriff repository's own \`sheriff.config.json\`, the tests that write the key into the configuration of a test repository, internal/release.md and CLAUDE.md change with it in stage 3.
- gen-tools-node-page.mjs now also builds the page of a new node,`]
]);

edit("../INDEX.md", [
  ["state-settings-b.mjs records in the continuation file that the draft was shown to the owner.",
    "state-settings-b.mjs records in the continuation file that the draft of \"The settings common to a project\" was shown to the owner."],
  ["queue-outline.before-flag.md is the outline as it was before the owner's question about `writesSpecSheriffGuidelines` was added to it.",
    "queue-outline.before-flag.md is the queue outline (queue-outline.md) as it was before the owner's question about `writesSpecSheriffGuidelines` was added to it. remove-flag-settings.mjs removes `writesSpecSheriffGuidelines` from the draft of \"The settings common to a project\" by the owner's ruling, and tools-drafts.before-flag.json is tools-drafts.json as it was before that script ran."]
]);

const outline = new URL("queue-outline.md", here);
let o = fs.readFileSync(outline, "utf8");
o = swap(o, "### ◐ writesSpecSheriffGuidelines — убрать из перечня настроек проекта?\n- флаг нужен инструментам только в репозитории SpecSheriff; проект его не пишет\n\n", "");
o = swap(o, "### ✓ «Где лежат файлы» — согласован\n- две таблицы: файлы проекта и файлы, которые несёт плагин\n- статус спецификации, strict и выбранные расширения — в sheriff.config.json\n",
  "### ✓ «Где лежат файлы» — согласован\n- две таблицы: файлы проекта и файлы, которые несёт плагин\n- статус спецификации, strict и выбранные расширения — в sheriff.config.json\n\n### ✓ writesSpecSheriffGuidelines — не в настройках проекта\n- ключ убран из узла «Настройки, общие для проекта»\n- значение, важное одному репозиторию, задаёт переменная окружения\n");
o = swap(o, "- ● «Настройки, общие для проекта»: черновик прошёл рецензента и показан вам", "- ● «Настройки, общие для проекта»: без writesSpecSheriffGuidelines, показаны вам снова");
o = swap(o, "- ○ «Что инструменты читают в project.json»", "- ○ переменная окружения для репозитория SpecSheriff: в каком узле и под каким именем\n- ○ «Что инструменты читают в project.json»");
fs.writeFileSync(outline, o);
console.log("draft, continuation file, INDEX.md and outline updated");
