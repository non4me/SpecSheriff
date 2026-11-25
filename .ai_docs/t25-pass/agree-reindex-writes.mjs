// Records the owner's agreement of 2026-11-21 («ок») to "What `sheriff reindex` writes" and writes
// english-reindex-writes.md for EngStickler's reader. Applies the corrections that EngStickler's reader found in the
// English of the agreed list node "The commands that `sheriff` accepts", none of which changes its meaning, and
// EngStickler's forty-fifth batch of corrections to the continuation file. Updates INDEX.md and the outline.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const swap = (s, from, to) => {
  if (!s.includes(from)) throw new Error(`not found: ${from.slice(0, 80)}`);
  return s.replace(from, to);
};
const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
const url = new URL("tools-drafts.json", here);
const drafts = JSON.parse(fs.readFileSync(url, "utf8"));
fs.writeFileSync(new URL("tools-drafts.before-agree-reindex-writes.json", here), JSON.stringify(drafts, null, 2) + "\n");
const render = (parts, key) => {
  const out = [];
  for (const x of parts) {
    if (x.kind === "p") out.push((out.length ? "\n" : "") + x[key]);
    else out.push(`- ${x[key]}`);
  }
  return out.join("\n");
};

// The agreement to "What `sheriff reindex` writes".
const writes = drafts["new:tools-2-reindex-writes"];
writes.agreed = "2026-11-21";
writes.rulings = [{ date: "2026-11-21", problem: "Whether the owner agrees to the node on what `sheriff reindex` writes, which also builds `meta.code` and `meta.tests`.", ruling: "The owner agreed to the node («ок»).", type: "textual" }];
const w = writes.proposal;
fs.writeFileSync(new URL("english-reindex-writes.md", here), [
  "# \"What `sheriff reindex` writes\", a new node of the appendix of the tools, agreed on 2026-11-21", "",
  "## Title", "", w.title, "", "## Text", "", w.text, "", "## Reason", "", w.reason, ""
].join("\n"));

// The English of the agreed list node, as EngStickler's reader read it.
const list = drafts["s-f5rz6b7dhxejjts"];
const p = list.proposal;
const fix = (start, en, ru) => {
  const x = p.parts.find((y) => y.en.startsWith(start));
  if (!x) throw new Error(`no part starts with: ${start}`);
  x.en = en;
  if (ru) x.ru = ru;
};
const sids = drafts["commands:sids"];
fix("The SpecSheriff tools are run as", "The SpecSheriff tools are run as `sheriff <command>` and accept only the following commands. Each command is listed with its purpose and the nodes that describe it:",
  "Инструменты SpecSheriff запускаются как `sheriff <команда>` и принимают только следующие команды. У каждой команды сказано, для чего она, и названы узлы, которые её описывают:");
fix("`sheriff validate`:", "`sheriff validate`: checks that the specification holds together and that each change to it follows the guidelines (§s-4kd2pave7vm4hmd);",
  "`sheriff validate` — проверяет, что спецификация согласована и что каждое её изменение следует guidelines (§s-4kd2pave7vm4hmd);");
fix("`sheriff citations`:", "`sheriff citations`: checks that each sid cited in the code, the tests and the documentation names a node of the specification (§s-4kd2pave7vm4hmd);",
  "`sheriff citations` — проверяет, что каждый sid, который цитируют код, тесты и документация, называет узел спецификации (§s-4kd2pave7vm4hmd);");
fix("`sheriff guard`:", "`sheriff guard`: checks an agent's edit before it is made, and refuses an edit that the SpecSheriff guidelines forbid (§s-4kd2pave7vm4hmd);");
fix("`sheriff remove`:", "`sheriff remove`: removes SpecSheriff from a repository and leaves the repository's specification as it is (§s-7unxytshhc4md54);");
fix("`sheriff reindex`:", `\`sheriff reindex\`: writes into the specification what the SpecSheriff tools compute from it, and rewrites in its own form what an earlier release wrote (§${sids.writes}, §${sids.earlier}, §${sids.twice});`,
  `\`sheriff reindex\` — записывает в спецификацию то, что инструменты SpecSheriff по ней вычисляют, и переписывает в своём виде то, что записал прежний выпуск (§${sids.writes}, §${sids.earlier}, §${sids.twice});`);
fix("`sheriff types`:", `\`sheriff types\`: generates parts of the system's code from the approved wordings of the nodes, for example the types and runtime checks for the RecordTypes (§${sids.types});`,
  `\`sheriff types\` — порождает части кода системы из одобренных формулировок узлов, например типы и проверки во время работы для RecordType (§${sids.types});`);
fix("`sheriff untagged`:", `\`sheriff untagged\`: lists the symbols of the system's code that have no SpecTag, each with its file (§${sids.settings});`,
  `\`sheriff untagged\` — перечисляет символы кода системы, у которых нет SpecTag, каждый с его файлом (§${sids.settings});`);
fix("`sheriff markdown`:", "`sheriff markdown`: writes a human-readable export of the specification as Markdown (§s-k4nqjr96ux7a5m7);");
fix("`sheriff map`:", "`sheriff map`: writes a map of the specification's structure (§s-rpv4fkdqqguptqd).");
fix("`sheriff` with no command", "`sheriff` with no command prints the list of the commands. `sheriff --version` prints the version number of the SpecSheriff tools. `sheriff` with any other word in place of a command reports that word as unknown, prints the list of the commands and exits with code 2.",
  "`sheriff` без команды печатает перечень команд. `sheriff --version` печатает номер версии инструментов SpecSheriff. `sheriff` с любым другим словом вместо команды сообщает, что такого слова не знает, печатает перечень команд и завершается с кодом 2.");
p.text = render(p.parts, "en");
p.ruText = render(p.parts, "ru");
p.reason = "A reader who knows what has to be done, or the name of a command, finds here the command for the task and the nodes that describe everything the command does.";
p.ruReason = "Читатель, который знает, что нужно сделать, или название команды, находит здесь команду для этой задачи и узлы, которые описывают всё, что команда делает.";
list.englishRead = "EngStickler's reader, 2026-11-21: the English corrected without a change of meaning by agree-reindex-writes.mjs; \"the approved wordings\" kept, since the guidelines use that term";
fs.writeFileSync(new URL("english-commands-list.md", here), [
  "# \"The commands that `sheriff` accepts\", a node of the appendix of the tools, agreed on 2026-11-21", "",
  "## Title", "", p.title, "", "## Text", "", p.text, "", "## Reason", "", p.reason, ""
].join("\n"));
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");

// The continuation file.
const cont = new URL("../t25-one-thought.md", here);
let t = fs.readFileSync(cont, "utf8");
for (const [from, to] of [
  ["agree-command-names.mjs wrote the new names into the list node and recorded the ruling in its draft.", "agree-command-names.mjs wrote the new names into the draft of the node that lists the commands, and recorded the ruling in that draft."],
  ["- On 2026-11-21 the owner agreed to the list node with the new names («ок»).", "- On 2026-11-21 the owner agreed to the wording of the node that lists the commands, with the new names («ок»)."],
  ["The next node, \"What `sheriff reindex` writes\", has now been shown to the owner, and the owner's answer is to be acted on first.",
    "On the same day the owner agreed to the next node, \"What `sheriff reindex` writes\" («ок»). agree-reindex-writes.mjs marked its draft as agreed and wrote english-reindex-writes.md for EngStickler's reader. It also corrected the English of the node that lists the commands as EngStickler's reader proposed, without a change of meaning. tools-drafts.before-agree-reindex-writes.json keeps the drafts as they were before that script ran. The page at https://claude.ai/artifact/M37puc7Bx97q32pNm1onK6 shows the node. The next node, \"What `sheriff reindex` changes in what an earlier release wrote\", has now been shown to the owner together with the question of the four cases of an earlier RecordType, and the owner's answer is to be acted on first."]
]) t = swap(t, from, to);
fs.writeFileSync(cont, t);

const index = new URL("../INDEX.md", here);
let s = fs.readFileSync(index, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = swap(s, "and tools-drafts.before-agree-commands-list.json is tools-drafts.json as it was before that script ran.",
  "and tools-drafts.before-agree-commands-list.json is tools-drafts.json as it was before that script ran. agree-reindex-writes.mjs records the owner's agreement to \"What `sheriff reindex` writes\", writes english-reindex-writes.md for EngStickler's reader, and corrects the English of the node that lists the commands; tools-drafts.before-agree-reindex-writes.json is tools-drafts.json as it was before that script ran.");
fs.writeFileSync(index, s);

const outline = new URL("queue-outline.md", here);
let o = fs.readFileSync(outline, "utf8");
o = swap(o, "\n\n## ● В работе:", "\n\n### ✓ «Что пишет sheriff reindex» — согласован\n- sid, расположения, связи, списки meta.code и meta.tests, статусы разделов, оглавления, собранные значения\n\n## ● В работе:");
o = swap(o, "- ● «Что пишет sheriff reindex»: прошёл рецензента, показан вам",
  "- ✓ «Что пишет sheriff reindex» — согласован\n- ● «Что sheriff reindex меняет в записанном прежним выпуском»: показан вам с вопросом о четырёх случаях RecordType");
o = swap(o, "## ○ Затем:", "## ◐ Ждёт вашего решения\n\n### ◐ Четыре случая прежних RecordType без соответствия в JSON Schema\n- «обязательно, где есть значение» — переношу как необязательное свойство\n- variant, источник domains и пустой список — reindex называет, автор переписывает сам\n\n## ○ Затем:");
fs.writeFileSync(outline, o);
console.log(p.text + `\n\nupdated at ${now}`);
