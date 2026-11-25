// Node 10.7: the owner kept the name `strict` on 2026-11-17 and made the flag general («strict - это флаг к которому можно
// привязывать уровень проверок и их поведение. ПО сути это общее требование к более строгой проверке гайдлайна… мы можем
// привязывать к этому флагу и другие проверки в том числе и сам проект может использовать его для управления поведением в
// своих правилах и гайдлайне»). The node now says that any rule, a project's own included, may make the checks stricter
// while the flag is on and says what changes; the two refusals (turning the flag on, approving the specification while it
// is on) apply to every check that the flag makes stricter; the effect on code without a SpecTag moves to the examples,
// since 9.5 states it.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-427.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const OWN = "s-u7tw6m8npxmv5tu";
const EXT = "s-mbmnsnxenmavu3z";
const APPROVAL = "s-qzthyh7yqvfhsa2";
const T95 = "s-kkbqcb9xrpaepwn";
const OWNCHECKS = "s-2fau85dfyyeq66m";
const n = d["10.7"];
n.text = [
  `The specification has a \`strict\` flag. A rule of the SpecSheriff guidelines, of an extension of the guidelines (§${EXT}) or of a project's own guidelines (§${OWN}) may make a check stricter while the flag is on. Such a rule says what the check does differently while the flag is on.`,
  "Only an owner of the specification turns the flag on or off. That owner records each such act in a separate entry, which names that owner. Only the latest such entry sets the flag.",
  `Two procedures refuse to act while a check that the flag makes stricter would refuse a commit that changed nothing:\n- the procedure that turns the flag on;\n- while the flag is on, the procedure that approves the specification (§${APPROVAL}).\n\nEach refusal names the command of the SpecSheriff tools that lists what that check would refuse.`,
].join("\n\n");
n.ruText = [
  `У спецификации есть флаг \`strict\`. Правило SpecSheriff guidelines, расширения guidelines (§${EXT}) или собственных guidelines проекта (§${OWN}) может сделать проверку строже, пока флаг включён. Такое правило говорит, что проверка делает иначе, пока флаг включён.`,
  "Включает или выключает флаг только ответственный за спецификацию. Каждое такое действие этот ответственный фиксирует отдельной записью, в которой назван он сам. Флаг задаёт только последняя такая запись.",
  `Две процедуры отказываются действовать, пока проверка, которую флаг делает строже, отклонила бы коммит, ничего не меняющий:\n- процедура, которая включает флаг;\n- пока флаг включён, процедура одобрения спецификации (§${APPROVAL}).\n\nКаждый отказ называет команду инструментов SpecSheriff, которая выводит то, что эта проверка отклонила бы.`,
].join("\n\n");
n.examples = [
  `The specification is approved, and its strict flag is on. Under 9.5 (§${T95}), code that is outside a commit and carries no SpecTag then makes the checks refuse that commit. A commit made with the hooks bypassed has added a file without SpecTags. The next commit, which changes another file whose symbols all carry SpecTags, is refused, and the refusal names the command that lists the symbols of the added file. But not: that commit passes with a warning, as it would with the flag off.`,
  `A project's own guidelines may refine one of the project's own checks (§${OWNCHECKS}) so that, while the flag is on, it refuses a commit where it otherwise only reports.`,
];
n.ruExamples = [
  `Спецификация одобрена, и её флаг strict включён. По 9.5 (§${T95}) код без SpecTag за пределами коммита тогда приводит к тому, что проверки отклоняют этот коммит. Коммит, сделанный в обход хуков, добавил файл без SpecTag. Следующий коммит, который меняет другой файл, где у всех символов есть SpecTag, отклоняется, и отказ называет команду, которая выводит символы добавленного файла. Но не так: этот коммит проходит с предупреждением, как прошёл бы при выключенном флаге.`,
  `Собственные guidelines проекта могут уточнить одну из собственных проверок проекта (§${OWNCHECKS}) так, чтобы при включённом флаге она отклоняла коммит там, где иначе только сообщает.`,
];
n.reason = [
  "The rules of the guidelines require only the minimum that every project needs, and some projects need stricter checks: for example, a project whose code is all bound to its rules and has to stay so. One flag lets the owners switch such strictness on and off by an act of their own, and lets each rule, a project's own included, say what it changes.",
  "If the flag were turned on, or the specification approved while it is on, while a check that the flag makes stricter would refuse a commit that changed nothing, every commit would be refused until one commit fixed everything that check finds at once.",
].join("\n\n");
n.ruReason = [
  "Правила guidelines требуют только минимума, который нужен каждому проекту, а некоторым проектам нужны более строгие проверки: например, проекту, весь код которого связан с правилами и должен таким остаться. Один флаг позволяет ответственным включать и выключать такую строгость своим отдельным действием, а каждому правилу, в том числе собственному правилу проекта, — сказать, что оно меняет.",
  "Если бы флаг включили или одобрили спецификацию при включённом флаге, пока проверка, которую флаг делает строже, отклонила бы коммит, ничего не меняющий, отклонялся бы каждый коммит, пока один коммит не исправит сразу всё, что находит эта проверка.",
].join("\n\n");
n.changes.push("Ваше решение от 17 ноября: имя `strict` остаётся, и флаг общий — к нему можно привязать любую проверку, в том числе в собственных правилах и guidelines проекта. Поэтому первый абзац говорит, что правило может сделать проверку строже при включённом флаге и само говорит, что меняется; оба отказа — включить флаг и одобрить спецификацию при включённом флаге — относятся теперь к любой такой проверке, а не только к SpecTag; действие флага на код без SpecTag показано в первом примере (его задаёт 9.5); второй пример показывает, как флаг может использовать сам проект; обоснование переписано под общий флаг.");
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
