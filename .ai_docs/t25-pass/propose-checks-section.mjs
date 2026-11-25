// Drafts the new wording of the section "How each check is made" (s-4kd2pave7vm4hmd): its text names "the base", a
// term the owner removed, and the checks are now also listed in the table of checks of each extension
// (s-gpzs5fcxvp6jkrp). The change carries out the owner's decision with a wording of its own, so it is shown to the
// owner as a proposal, without the reviewer's check. The three sections under it: "Checks made by `sheriff validate`"
// and "Checks made by `sheriff binding`" need no change; "Checks made by the other commands" takes the new name
// `sheriff commit-message` by a technical replacement.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const swap = (s, from, to) => {
  if (!s.includes(from)) throw new Error(`not found: ${from.slice(0, 80)}`);
  return s.replace(from, to);
};
const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
const url = new URL("tools-drafts.json", here);
const drafts = JSON.parse(fs.readFileSync(url, "utf8"));
const backup = JSON.stringify(drafts, null, 2) + "\n";
const section = (sid, location, title, ruTitle, en, ru, change, refs, extra = {}) => {
  drafts[sid] = { agreed: false, location, sidValue: sid, kind: "section", ...extra, proposal: { title, ruTitle, parts: [{ kind: "p", en, ru, change }], text: en, ruText: ru, refs, date: "2026-11-22", removed: [] } };
};
section("s-4kd2pave7vm4hmd", "tools 7", "How each check is made", "Как выполняется каждая проверка",
  "How each check of the main table of checks (§s-jau82aq9juv9zzh) and of the table of checks of each extension of the guidelines (§s-gpzs5fcxvp6jkrp) is made, and which command makes it.",
  "Как выполняется каждая проверка главной таблицы проверок (§s-jau82aq9juv9zzh) и таблицы проверок каждого расширения guidelines (§s-gpzs5fcxvp6jkrp) и какая команда её выполняет.",
  "Было: «How each check the base lists (§s-jau82aq9juv9zzh) is made, and which command makes it». Термин «base» вы убрали; проверки теперь перечисляют и таблицы проверок расширений.",
  [{ type: "cites", to: "s-jau82aq9juv9zzh" }, { type: "cites", to: "s-gpzs5fcxvp6jkrp" }],
  { shownAs: "a proposal that carries out the owner's removal of \"the base\", without the reviewer's check; the sections under it stay grouped by command" });
section("s-6uqu6vn5fnp7fwb", "tools 7.1", "Checks made by `sheriff validate`", "Проверки, которые выполняет `sheriff validate`",
  "How `sheriff validate` checks the specification itself.", "Как `sheriff validate` проверяет саму спецификацию.", "Без изменений.", [], { unchanged: true });
section("s-p34692nwceaxq2p", "tools 7.2", "Checks made by `sheriff binding`", "Проверки, которые выполняет `sheriff binding`",
  "How `sheriff binding` makes each of its checks.", "Как `sheriff binding` выполняет каждую свою проверку.", "Без изменений.", [], { unchanged: true });
section("s-bgegrkhrgpefs69", "tools 7.3", "Checks made by the other commands", "Проверки, которые выполняют другие команды",
  "How `sheriff citations`, `sheriff guard`, `sheriff commit-message`, `sheriff review` and the project's test command make their checks.",
  "Как `sheriff citations`, `sheriff guard`, `sheriff commit-message`, `sheriff review` и команда тестов проекта выполняют свои проверки.",
  "Техническая замена: `sheriff message` переименована в `sheriff commit-message` по вашему решению от 21 ноября.", [], { technical: "2026-11-22: `sheriff message` renamed `sheriff commit-message`, as the owner ruled on 2026-11-21" });

const cont = new URL("../t25-one-thought.md", here);
let t = fs.readFileSync(cont, "utf8");
t = swap(t, "- The next node to review is \"How each check is made\" (s-4kd2pave7vm4hmd), together with the three sections under it, which stage2-inventory.md says are approved with it. The agent reads them, drafts their new wording, and sends the drafts to specsheriff-rule-reviewer before they are shown to the owner.",
  "- The next node to review is \"How each check is made\" (s-4kd2pave7vm4hmd), together with the three sections under it, which stage2-inventory.md says are approved with it. Its text uses \"the base\", a term that the owner removed, and names only the main table of checks, while each extension now has a table of checks of its own (s-gpzs5fcxvp6jkrp). propose-checks-section.mjs drafted a new wording, \"How each check of the main table of checks and of the table of checks of each extension of the guidelines is made, and which command makes it\", shown to the owner as a proposal without a review by specsheriff-rule-reviewer, since it carries out the owner's decision. The agent recommends keeping the sections under it grouped by the command that makes each check, rather than regrouping them by table. Of those sections, \"Checks made by `sheriff validate`\" and \"Checks made by `sheriff binding`\" need no change, and \"Checks made by the other commands\" takes the name `sheriff commit-message` by a technical replacement. tools-drafts.before-checks-section.json is a copy of the drafts made before that script ran. Whatever the owner answers is to be acted on before the review continues; the next node is \"A key written twice in one object\" (s-7zqsstgnuc772ba), row 10.1.1.");
fs.writeFileSync(cont, t);

const index = new URL("../INDEX.md", here);
let s = fs.readFileSync(index, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = swap(s, "(tools-drafts.before-agree-tools-section.json is a copy of tools-drafts.json made before that script ran).",
  "(tools-drafts.before-agree-tools-section.json is a copy of tools-drafts.json made before that script ran). propose-checks-section.mjs drafts the new wording of the section \"How each check is made\" and records the three sections under it (tools-drafts.before-checks-section.json is a copy of tools-drafts.json made before that script ran).");
fs.writeFileSync(index, s);

const outline = new URL("queue-outline.md", here);
let o = fs.readFileSync(outline, "utf8");
o = swap(o, "- ● «Как выполняется каждая проверка» и три его раздела: агент читает их и пишет черновики",
  "- ● «Как выполняется каждая проверка» и три его раздела: новая формулировка показана вам\n- ○ «Ключ, записанный дважды в одном объекте» (строка 10.1.1)");
o = swap(o, "\n\n## ○ Затем:", "\n\n## ◐ Ждёт вашего решения\n\n### ◐ Раздел «Как выполняется каждая проверка»\n- главная таблица и таблицы расширений вместо «base»\n- группировка по командам остаётся\n\n## ○ Затем:");
fs.writeFileSync(outline, o);
fs.writeFileSync(new URL("tools-drafts.before-checks-section.json", here), backup);
fs.writeFileSync(url, JSON.stringify(drafts, null, 2) + "\n");
console.log(`updated at ${now}`);
