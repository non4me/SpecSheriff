// Applies specsheriff-rule-reviewer's report on the draft of the new node "The settings common to a project" (the key
// "new:tools-1-settings"): the files of types are read for SpecTags, a file named both as code and as a test is read as
// a test, a malformed `sheriff.config.json` is refused, the entries no longer repeat 10.6, 10.7 and row 10.1.27b, the
// test command names its tests, `writesSpecSheriffGuidelines` marks its repository, and 9.1 is implemented, not cited.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsUrl = new URL("tools-drafts.json", here);
const drafts = JSON.parse(fs.readFileSync(draftsUrl, "utf8"));
const draft = drafts["new:tools-1-settings"];
const p = draft.proposal;
if (p.reviewed !== "pending") throw new Error("unexpected state");

const at = (kind, start) => {
  const i = p.parts.findIndex((q) => q.kind === kind && q.en.startsWith(start));
  if (i < 0) throw new Error("part not found: " + start);
  return i;
};

p.title = "The settings common to a project";
p.ruTitle = "Настройки, общие для проекта";

const intro = p.parts[at("p", "`sheriff.config.json`")];
intro.en = "`sheriff.config.json` (§s-zefk589ykh37b8u) holds the settings of the SpecSheriff tools that are common to the whole project:";
intro.ru = "`sheriff.config.json` (§s-zefk589ykh37b8u) содержит настройки инструментов SpecSheriff, общие для всего проекта:";

const entries = p.parts[at("li", "the entries that set")];
entries.en = "the entries that set the specification's approval status (§s-qzthyh7yqvfhsa2) and its `strict` flag (§s-q3pfzyaxvpr2zj2), and those that record which extensions of the guidelines (§s-mbmnsnxenmavu3z) the project has chosen (§s-9ttvcwpqkehm58g);";
entries.ru = "записи, которые задают статус одобрения спецификации (§s-qzthyh7yqvfhsa2) и её флаг `strict` (§s-q3pfzyaxvpr2zj2), и записи о том, какие расширения guidelines (§s-mbmnsnxenmavu3z) выбрал проект (§s-9ttvcwpqkehm58g);";
entries.change = "Новое. По вашему решению от 21 ноября записи статуса одобрения спецификации и флага `strict` хранятся здесь, рядом с записями о выбранных расширениях. Что каждая запись называет сделавшего её ответственного, здесь не повторяется: это требуют правила 10.6 и 10.7 и строка 10.1.27b. Из чего состоит запись, скажут узлы «How an approval is recorded» и узел о выборе расширений.";

const testCommand = p.parts[at("li", "the command that runs the tests")];
testCommand.en = "the command that runs the tests of the system's code and of the project's own checks and generators (§s-477gtdrkw34dzxw);";
testCommand.ru = "команду, которая запускает тесты кода системы и собственных проверок и генераторов проекта (§s-477gtdrkw34dzxw);";
testCommand.change = "Новое в этом перечне. Сказано, какие тесты запускает команда, так же как в узле «The hooks», который говорит, когда она выполняется.";

const reviewer = p.parts[at("li", "the settings of the reviewer")];
reviewer.en = "the settings of the reviewer that are common to the whole project (§s-xr5xxa9cxf2mq5u);";
reviewer.ru = "настройки рецензента, общие для всего проекта (§s-xr5xxa9cxf2mq5u);";

const marks = p.parts[at("li", "`\"writesSpecSheriffGuidelines\": true`")];
marks.en = "`\"writesSpecSheriffGuidelines\": true`, which marks the repository where the SpecSheriff guidelines are written.";
marks.ru = "`\"writesSpecSheriffGuidelines\": true`, которая отмечает репозиторий, где пишутся SpecSheriff guidelines.";
marks.change = "Без изменений по смыслу: как и в одобренной формулировке, настройка отмечает этот репозиторий.";

const tags = at("p", "To find the SpecTags");
p.parts[tags].en = "To find the SpecTags (§s-8xw4mgvpexyvw5q) that bind code and tests to their rules, the SpecSheriff tools read only the files that the glob patterns in `sheriff.config.json` name as code or as tests, and the files of types that `sheriff types` writes (§s-pvzms7d8kxb8dk2). A file that those patterns name both as code and as a test is read as a test.";
p.parts[tags].ru = "Чтобы найти SpecTag (§s-8xw4mgvpexyvw5q), которые привязывают код и тесты к их правилам, инструменты SpecSheriff читают только файлы, которые glob-шаблоны в `sheriff.config.json` указывают как код или как тесты, и файлы типов, которые пишет `sheriff types` (§s-pvzms7d8kxb8dk2). Файл, который эти шаблоны указывают и как код, и как тест, читается как тест.";
p.parts[tags].change = "Взято из одобренной формулировки «Where the files are». Добавлены файлы типов: одобренный узел «Where the types and RuntimeChecks generated from the RecordTypes are written» велит читать их как код системы, даже если шаблоны их не указывают. Добавлено, что файл, указанный и как код, и как тест, читается как тест: так делает код инструментов.";
p.parts.splice(tags, 0, {
  kind: "p",
  en: "The SpecSheriff tools refuse a `sheriff.config.json` that is not JSON or does not conform to its schema (§s-zefk589ykh37b8u).",
  ru: "Инструменты SpecSheriff отвергают `sheriff.config.json`, если он не является JSON или не соответствует своей схеме (§s-zefk589ykh37b8u).",
  change: "Новое. Инструменты уже отвергают такой файл, и тесты в config.test.ts это проверяют, но ни один узел этого не говорил. Схему файла называет узел «Where the files are»."
});

function compose(parts, lang) {
  const out = [];
  for (let k = 0; k < parts.length; k++) {
    const q = parts[k];
    out.push(q.kind === "li" ? `- ${q[lang]}` : q[lang]);
    const next = parts[k + 1];
    if (!next) break;
    const sameBlock = (q.kind === "li" && next.kind === "li") || (q.kind === "p" && next.kind === "li");
    out.push(sameBlock ? "\n" : "\n\n");
  }
  return out.join("");
}
p.text = compose(p.parts, "en");
p.ruText = compose(p.parts, "ru");

const implementsSet = ["s-qzthyh7yqvfhsa2", "s-q3pfzyaxvpr2zj2", "s-9ttvcwpqkehm58g", "s-hheus6f395ynqvc"];
const cited = [...new Set([...`${p.text}\n${p.reason}`.matchAll(/§(s-[2-9a-hjkmnp-z]{15})/g)].map((m) => m[1]))];
p.refs = [
  ...implementsSet.map((to) => ({ type: "implements", to })),
  ...cited.filter((to) => !implementsSet.includes(to)).map((to) => ({ type: "cites", to }))
];
p.reviewed = "specsheriff-rule-reviewer, 2026-11-21: not ready; its findings applied and its doubts settled by propose-settings-b.mjs";
draft.from = "s-zefk589ykh37b8u";
draft.testsFrom = "config.test";
fs.writeFileSync(draftsUrl, JSON.stringify(drafts, null, 2) + "\n");
console.log(p.text, "\nlinks:", p.refs.map((r) => r.type[0] + ":" + r.to).join(" "));
