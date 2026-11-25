// Node 4.4: the owner's ruling of 2026-11-09 on what technical debt is, in the reviewed wording. What follows from it in the
// agreed 1.2.3 and 4.1 only renames the thing, so their agreement stands.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["4.4"];

n.title = "The technical debt holds the accepted shortcomings of the system's implementation";
n.ruTitle = "Технический долг содержит осознанно принятые недостатки реализации системы";
n.text = "The section of the technical debt holds only descriptions, and each of them describes one accepted shortcoming in the internal quality of the system's implementation. The system still does what the rules require. A defect is not technical debt.\n\nA description may refine the nodes it concerns. Where the shortcoming lies in a technology the implementation uses, the description names the version of that technology it was seen in.\n\nStanding there is the whole of the choice to accept the shortcoming:\n\n- its description needs no reason;\n- no decision records that choice;\n- the change that removes the shortcoming removes its description.";
n.ruText = "Раздел технического долга содержит только описания, и каждое из них описывает один осознанно принятый недостаток внутреннего качества реализации системы. Система при этом делает то, что требуют правила. Дефект техническим долгом не является.\n\nОписание может уточнять узлы, которых касается. Если недостаток кроется в технологии, которую использует реализация, описание называет версию этой технологии, в которой он замечен.\n\nНахождение там и есть весь выбор принять недостаток:\n\n- описанию не нужно обоснование;\n- решение об этом выборе нигде не записывается;\n- изменение, которое устраняет недостаток, удаляет его описание.";
n.reason = "A shortcoming accepted on purpose needs a place where it is recorded, or it is forgotten, or kept as a task nobody means to do. Every shortcoming there stands for the one reason that the specification's owners judged it not worth removing now. So a reason or a decision of its own would only repeat its standing. A defect breaks a rule, so standing here could not accept it.\n\nDescribed as it stands and bound to the nodes it concerns, a shortcoming tells whoever reads those nodes what the implementation does worse than it could. A description left standing once its shortcoming is removed would describe what no longer exists.\n\nA shortcoming in a technology may be removed by a later version of it while nothing here changes. The version it was seen in lets a reader tell.";
n.ruReason = "Осознанно принятому недостатку нужно место, где он записан, иначе о нём забудут или будут держать как задачу, которую никто не собирается делать. Каждый недостаток там находится по одной причине: ответственные за спецификацию сочли, что сейчас устранять его не стоит. Поэтому собственное обоснование или решение только повторяло бы сам факт его нахождения там. Дефект нарушает правило, поэтому нахождение здесь не может его принять.\n\nОписанный таким, какой он есть, и связанный с узлами, которых касается, недостаток говорит тому, кто читает эти узлы, что реализация делает хуже, чем могла бы. Описание, оставшееся после устранения недостатка, описывало бы то, чего больше нет.\n\nНедостаток в технологии может быть устранён её более поздней версией, хотя здесь ничего не меняется. Версия, в которой он замечен, позволяет читателю это понять.";
n.changes.push("По вашему решению технический долг — это осознанно принятый недостаток внутреннего качества реализации, а не проблема или дефект. Формулировка прошла рецензента.");

const swap = (k, field, from, to) => {
  const m = d[k];
  if (!m[field].includes(from)) throw new Error(`not found in ${k}.${field}: ${from}`);
  m[field] = m[field].replace(from, to);
};
swap("1.2.3", "text", "its text describes a problem as it stands", "its text describes a shortcoming as it stands");
swap("1.2.3", "ruText", "его описание говорит о проблеме, как она есть", "его описание говорит о недостатке таким, какой он есть");
d["1.2.3"].changes.push("Вслед за вашим решением о техническом долге: «недостаток» вместо «проблема».");
swap("4.1", "reason", "The problems set aside are read as one list", "The accepted shortcomings are read as one list");
swap("4.1", "ruReason", "Отложенные проблемы читают одним списком", "Принятые недостатки читают одним списком");
swap("4.1", "reason", "A problem is not how a rule is carried out but where carrying it out falls short.", "A shortcoming is not how a rule is carried out but where the implementation is worse than it could be.");
swap("4.1", "ruReason", "Проблема — это не то, как выполняется правило, а то, где его выполнение не дотягивает.", "Недостаток — это не то, как выполняется правило, а то, чем реализация хуже, чем могла бы быть.");
d["4.1"].changes.push("Вслед за вашим решением о техническом долге: «недостаток» вместо «проблема».");
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log(n.title);
console.log(d["4.1"].reason.split("\n\n")[1]);
