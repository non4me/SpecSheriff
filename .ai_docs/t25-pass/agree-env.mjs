// Records the owner's agreement of 2026-11-21 («ок») to the two additions to "Where the files are" that name the
// environment variable SPECSHERIFF_GUIDELINES_REPO, and writes english-tools-1-env.md, their English text, for
// EngStickler's reader. Corrects, without a change of meaning, the English of the agreed "The settings common to a
// project", now "Project-wide settings", and of the matching row of "Where the files are", as EngStickler's reader of
// english-settings.md advised. Applies EngStickler's thirteenth batch of corrections to the continuation file and
// INDEX.md, and updates the queue outline.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const swap = (s, from, to, all) => {
  if (!s.includes(from)) throw new Error(`not found: ${from.slice(0, 80)}`);
  return all ? s.split(from).join(to) : s.replace(from, to);
};
const edit = (rel, pairs) => {
  const url = new URL(rel, here);
  let s = fs.readFileSync(url, "utf8");
  for (const [from, to, all] of pairs) s = swap(s, from, to, all);
  fs.writeFileSync(url, s);
};
// Replaces a phrase wherever a draft holds it: in a part, in a cell of a row, in the whole text, title or reason.
const fix = (draft, pairs) => {
  const p = draft.proposal;
  for (const [from, to, lang] of pairs) {
    const key = lang === "ru" ? "ru" : "en";
    let found = false;
    for (const part of p.parts) {
      const v = part[key];
      if (Array.isArray(v)) part[key] = v.map((c) => (c.includes(from) ? ((found = true), c.replace(from, to)) : c));
      else if (v.includes(from)) (found = true), (part[key] = v.replace(from, to));
    }
    for (const field of lang === "ru" ? ["ruText", "ruReason", "ruTitle"] : ["text", "reason", "title"]) {
      if (p[field]?.includes(from)) (found = true), (p[field] = p[field].replace(from, to));
    }
    if (!found) throw new Error(`not in the draft: ${from.slice(0, 80)}`);
  }
};

const draftsUrl = new URL("tools-drafts.json", here);
const drafts = JSON.parse(fs.readFileSync(draftsUrl, "utf8"));

// "Where the files are": agreed again with the two additions.
const files = drafts["s-zefk589ykh37b8u"];
files.agreed = "2026-11-21";
files.rulings.push({ date: "2026-11-21", problem: "Whether the owner agrees to the two additions that name the environment variable `SPECSHERIFF_GUIDELINES_REPO`: the sentence before the second table and the two sentences at the end of the reason.", ruling: "The owner agreed to both («ок»).", type: "textual" });
fix(files, [
  // The reader of batch 13: "marks" reads two ways; the reason now says what the path prevents.
  ["The variable holds the path to that repository's root, so that it marks no other repository on the same machine.",
    "The variable holds the path to that repository's root, so that no other repository on the same machine is recognized as that repository."],
  ["Переменная содержит путь к корню этого репозитория, поэтому она не отмечает другой репозиторий на той же машине.",
    "Переменная содержит путь к корню этого репозитория, поэтому никакой другой репозиторий на той же машине не принимается за него.", "ru"],
  // The reader of english-settings.md: "settings ... that are common to the whole project" reads as tools common to it.
  ["The settings of the SpecSheriff tools that are common to the whole project, among them", "The project-wide settings of the SpecSheriff tools, among them"]
]);
const p = files.proposal;
for (const part of p.parts) if (part.change?.startsWith("Предложено сейчас")) part.change = part.change.replace("Предложено сейчас", "Согласовано 21 ноября");
p.reasonChange = p.reasonChange.replace("Предложено сейчас", "Согласовано 21 ноября");
const paragraph = p.parts.find((x) => x.en.includes("SPECSHERIFF_GUIDELINES_REPO"));
fs.writeFileSync(new URL("english-tools-1-env.md", here), [
  "# Two additions to \"Where the files are\" (s-zefk589ykh37b8u), the appendix of the tools, agreed on 2026-11-21", "",
  "## The paragraph before the second table", "", paragraph.en, "", "## Reason", "", p.reason, ""
].join("\n"));

// "Project-wide settings": English only, the meaning kept.
const settings = drafts["new:tools-1-settings"];
fix(settings, [
  ["The settings common to a project", "Project-wide settings"],
  ["holds the settings of the SpecSheriff tools that are common to the whole project:", "holds the project-wide settings of the SpecSheriff tools:"],
  ["the glob patterns that name where the system's code (§s-hheus6f395ynqvc) is kept and where its tests are kept;",
    "the glob patterns that match the files holding the system's code (§s-hheus6f395ynqvc) and those holding its tests;"],
  ["glob-шаблоны, которые указывают, где хранится код системы (§s-hheus6f395ynqvc) и где хранятся его тесты;",
    "glob-шаблоны, которым соответствуют файлы с кодом системы (§s-hheus6f395ynqvc) и файлы с его тестами;", "ru"],
  ["and the glob patterns that name the files of its code and of its tests (§s-utf4mbt7ref8g9c);",
    "and the glob patterns that match the files holding its code and its tests (§s-utf4mbt7ref8g9c);"],
  ["и glob-шаблоны, которые указывают файлы их кода и их тестов (§s-utf4mbt7ref8g9c);",
    "и glob-шаблоны, которым соответствуют файлы с их кодом и их тестами (§s-utf4mbt7ref8g9c);", "ru"],
  ["the settings of the reviewer that are common to the whole project (§s-xr5xxa9cxf2mq5u).", "the project-wide settings of the reviewer (§s-xr5xxa9cxf2mq5u)."],
  ["read only the files that the glob patterns in `sheriff.config.json` name as code or as tests,",
    "read only the files that match the glob patterns for code or for tests in `sheriff.config.json`,"],
  ["читают только файлы, которые glob-шаблоны в `sheriff.config.json` указывают как код или как тесты,",
    "читают только файлы, которые соответствуют glob-шаблонам кода или тестов в `sheriff.config.json`,", "ru"],
  ["A file that those patterns name both as code and as a test is read as a test.",
    "A file that matches both a pattern for code and a pattern for tests is read as a test."],
  ["Файл, который эти шаблоны указывают и как код, и как тест, читается как тест.",
    "Файл, который соответствует и шаблону кода, и шаблону тестов, читается как тест.", "ru"]
]);
settings.englishRead = "EngStickler's reader, 2026-11-21: the English corrected without a change of meaning by agree-env.mjs; \"refuse\" kept, since the appendix of the tools says throughout that a tool refuses what it does not accept";
drafts["new:tools-1-project"].location = "tools 3 (new, after \"Project-wide settings\")";
fs.writeFileSync(draftsUrl, JSON.stringify(drafts, null, 2) + "\n");

// The continuation file: the new state, the new title, and the corrections of batch 13.
const notesUrl = new URL("../t25-one-thought.md", here);
let notes = fs.readFileSync(notesUrl, "utf8");
const from = notes.indexOf("The owner agreed on 2026-11-21 to the first node under review");
const to = notes.indexOf("below describes both nodes.") + "below describes both nodes.".length;
if (from < 0 || to < from) throw new Error("line 5 not found");
notes = notes.slice(0, from) + "The owner agreed on 2026-11-21 to the first two nodes under review. The first is \"Where the files are\" (s-zefk589ykh37b8u), which now also names the environment variable by which the SpecSheriff tools identify the repository where the SpecSheriff guidelines are written. The second is the new node \"Project-wide settings\". The paragraph \"The first node of the appendix under review\" below describes both. The next node is the new node \"What the SpecSheriff tools read in the project's own guidelines\", which specsheriff-rule-reviewer is checking before it is shown to the owner." + notes.slice(to);
notes = swap(notes, "The settings common to a project", "Project-wide settings", true);
const a = notes.indexOf("- The owner agreed to \"Project-wide settings\" on 2026-11-21 («ок»).");
const b = notes.indexOf("tools-drafts.before-env.json keeps the drafts as they were before agree-settings.mjs ran.") + "tools-drafts.before-env.json keeps the drafts as they were before agree-settings.mjs ran.".length;
if (a < 0 || b < a) throw new Error("the block on the agreement not found");
notes = notes.slice(0, a) + `- The owner agreed to the node on 2026-11-21 («ок»), when it was still titled "The settings common to a project". agree-settings.mjs marked the draft as agreed and wrote english-settings.md, the English text of the agreed node, for EngStickler's reader. After that reading, agree-env.mjs corrected the node's English without changing its meaning. The title is now "Project-wide settings", and the node now says that a file matches a glob pattern rather than that the pattern names the file. The reader's advice to write "reject" for "refuse" was not taken, since the appendix of the tools says throughout that a tool refuses what it does not accept.
- agree-settings.mjs also reopened "Where the files are" and proposed two additions to it. The owner agreed to both on 2026-11-21 («ок»), and agree-env.mjs marked the draft as agreed again:
  - after the sentence saying that only the repository where the SpecSheriff guidelines are written keeps the files of the second table under \`specs/\`, the node now says: "The SpecSheriff tools recognize that repository only by the environment variable \`SPECSHERIFF_GUIDELINES_REPO\`, which holds the path to its root.";
  - the reason now ends with two sentences. The first says that the variable keeps what only that repository needs out of every project's settings. The second says that, since the variable holds the path to that repository's root, no other repository on the same machine is recognized as that repository.
- agree-env.mjs wrote english-tools-1-env.md, the English text of the two additions, for EngStickler's reader.
- In stage 3 the variable replaces the key \`writesSpecSheriffGuidelines\`:
  - the SpecSheriff repository's own \`sheriff.config.json\` no longer contains the key;
  - the tests that write the key into the configuration of a test repository set the variable instead;
  - internal/release.md is to say that on each machine the variable is set in the \`env\` field of \`.claude/settings.local.json\`;
  - CLAUDE.md is to stop saying that \`sheriff.config.json\` identifies the repository.
- Without the variable, \`sheriff validate\` in the SpecSheriff repository refuses the guidelines under \`specs/\` as copies of the SpecSheriff guidelines, so a missing variable cannot go unnoticed. tools-drafts.before-env.json keeps the drafts as they were before agree-settings.mjs ran.` + notes.slice(b);
notes = swap(notes, "The agent answered from the code.", "The agent answered after reading the code of the SpecSheriff tools.");
notes = swap(notes, "remove-flag-settings.mjs removed the key's item from the list", "remove-flag-settings.mjs removed the item for the key from the draft's list of settings");
fs.writeFileSync(notesUrl, notes);

edit("../INDEX.md", [
  ["The settings common to a project", "Project-wide settings", true],
  ["tools-drafts.before-env.json is tools-drafts.json as it was before agree-settings.mjs ran.",
    "tools-drafts.before-env.json is tools-drafts.json as it was before agree-settings.mjs ran. agree-env.mjs records the owner's agreement to that sentence and to two sentences of the reason of \"Where the files are\", writes english-tools-1-env.md, their English text, for EngStickler's reader, and corrects the English of \"Project-wide settings\"."]
]);

const outlineUrl = new URL("queue-outline.md", here);
let o = fs.readFileSync(outlineUrl, "utf8");
o = swap(o, "### ✓ «Настройки, общие для проекта» — согласован\n- что хранит sheriff.config.json проекта и когда инструменты его отвергают\n",
  "### ✓ «Настройки, общие для проекта» — согласован\n- что хранит sheriff.config.json проекта и когда инструменты его отвергают\n\n### ✓ «Где лежат файлы»: переменная окружения — согласована\n- инструменты узнают репозиторий guidelines только по SPECSHERIFF_GUIDELINES_REPO с путём к его корню\n");
o = swap(o, "- ● переменная окружения SPECSHERIFF_GUIDELINES_REPO в «Где лежат файлы»: предложена вам\n- ○ «Что инструменты читают в project.json»",
  "- ✓ переменная окружения SPECSHERIFF_GUIDELINES_REPO в «Где лежат файлы» — согласована\n- ● «Что инструменты читают в project.json»: черновик проверяет рецензент");
const waiting = o.indexOf("## ◐ Ждёт вашего решения");
const next = o.indexOf("## ○ Затем:");
if (waiting < 0 || next < waiting) throw new Error("outline: the waiting branch not found");
o = o.slice(0, waiting) + o.slice(next);
fs.writeFileSync(outlineUrl, o);
console.log("agreed; english-tools-1-env.md written; English corrected; notes and outline updated");
