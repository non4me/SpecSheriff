// Draft 10.6: the reviewer's report of 2026-11-13, taken whole into one final wording for the owner.
// - "and nobody else" puts back the "Only" of present 5.4, which the ruling kept (7.3: the text binds the owner who acts).
// - "approval status" is the defined name (1.3.1), in the title and wherever the status is meant (7.9).
// - "The latest such entry" says what the entry records (7.8). "With no entry, the specification is a draft" goes:
//   1.3.1 already makes draft the default.
// - The reason no longer states a requirement (1.2.3): "They may need to put it back to draft for any reason".
// - The reason's last paragraph gives the owner's ground, not an argument against what present 5.4 already guarded.
// - It cites 1.3.2 "What a draft means" (s-utvqbypzhmgndug) instead of s-kkbqcb9xrpaepwn, which may move to the
//   extension "Adoption of an existing project"; a main rule citing it would then breach 12.1.3.
// - An example, as node 7.16 lets a node hold.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const n = d["10.6"];
if (!n) throw new Error("10.6 missing");
n.title = "The specification's approval status is its owners' act";
n.ruTitle = "Статус одобрения спецификации — решение её ответственных";
n.text =
  "One of the specification's owners, and nobody else, approves the specification or puts it back to draft. " +
  "That owner records each such act in an entry of its own, which names that owner. " +
  "The latest such entry sets the specification's approval status.\n\n" +
  "The approval status of a node or a section has no effect on the specification's approval status.";
n.ruText =
  "Одобряет спецификацию или возвращает её в черновик один из её ответственных, и никто другой. " +
  "Каждое такое действие этот ответственный фиксирует отдельной записью, в которой назван он сам. " +
  "Статус одобрения спецификации задаёт последняя такая запись.\n\n" +
  "Статус одобрения узла или раздела на статус одобрения спецификации не влияет.";
n.reason =
  "Whether the specification is approved decides how strictly the checks hold its code and tests (§s-utvqbypzhmgndug, §s-xhcmchcngykvn2k). " +
  "So its owners decide it, both ways, by an act of their own.\n\n" +
  "They may need to put it back to draft for any reason. " +
  "While the specification changes at its core, as when another version of it is adopted or the system's architecture changes, the code and the tests are secondary.\n\n" +
  "Approving the specification is a decision of its own, apart from agreeing to any rule. " +
  "Were the specification's approval status tied to a rule, anyone editing that rule would change it.";
n.ruReason =
  "От того, одобрена ли спецификация, зависит, насколько строго проверки держат её код и тесты (§s-utvqbypzhmgndug, §s-xhcmchcngykvn2k). " +
  "Поэтому решают это её ответственные, в обе стороны, отдельным действием.\n\n" +
  "Им может понадобиться вернуть её в черновик по любой причине. " +
  "Пока спецификация меняется в своей основе, например при переходе на другую её версию или при смене архитектуры системы, код и тесты вторичны.\n\n" +
  "Одобрение спецификации — отдельное решение, не то же, что согласие с каким-либо правилом. " +
  "Будь статус одобрения спецификации привязан к правилу, его менял бы любой, кто правит это правило.";
n.examples = [
  "Every rule of the specification is approved, but none of its owners has approved the specification. The specification is a draft. But not: the specification is approved because all its rules are, as a section would be.",
];
n.ruExamples = [
  "Все правила спецификации одобрены, но ни один из её ответственных не одобрил саму спецификацию. Спецификация — черновик. Но не так: спецификация одобрена, потому что одобрены все её правила, как было бы с разделом.",
];
n.changes = [
  n.changes[0],
  n.changes[1],
  n.changes[2],
  "Правки ревьюера: «и никто другой» возвращает «только» из нынешнего 5.4; «статус одобрения» — определённое имя из 1.3.1, в заголовке и в тексте; «с последней такой записью» видно, что запись фиксирует; фраза «пока записей нет, спецификация — черновик» убрана — 1.3.1 уже делает черновик статусом по умолчанию.",
  "Обоснование: «должны иметь возможность» → «может понадобиться» — обоснование не ставит требований (1.2.3); последний абзац теперь говорит ваше основание: одобрение спецификации — отдельное решение, не согласие с правилом.",
  "Ссылка на 11.2 (код без SpecTag в черновике) заменена ссылкой на 1.3.2 «Что значит черновик»: 11.2 может уйти в расширение «Адоптация», а основное правило не ссылается на расширение (12.1.3).",
  "Добавлен пример, как разрешает узел 7.16. Где хранится запись, решают описание инструментов и T28. Сохраняет sid 5.4.",
];
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(n.text);
