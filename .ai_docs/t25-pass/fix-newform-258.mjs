// Node 10.10: the owner accepted the wording of fix-newform-257.mjs (2026-11-14, «ок»). Draft 10.11 is written from current
// node 5.11 (s-jsqxdx47wkkj7gp), idempotent procedures, and keeps its sid. The consolidated review of 11 November cut
// ", so running it again is always safe" and doubted the paragraph on a procedure needed only once, which no tool or check
// carries out. The agent keeps that paragraph: whoever writes such a procedure carries it out, as with other rules no
// check enforces. It now names its subject, says "into the nodes", and its "because" moves to the reason.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const a = d["10.10"];
a.agreed = "2026-11-14";
a.changes.push("Вы приняли эту формулировку (2026-11-14).");

if (d["10.11"]) throw new Error("draft 10.11 exists");
d["10.11"] = {
  from: "5.11",
  sid: "kept",
  title: "A procedure that writes the specification is idempotent",
  ruTitle: "Процедура, которая пишет спецификацию, идемпотентна",
  text:
    "Every procedure that writes the specification, or what is generated from it, is idempotent: run again on what its previous run left, it gives the same result and changes nothing.\n\n" +
    "Whoever writes a procedure needed only once, such as one that brings existing documents into the nodes, removes it once it has run.",
  ruText:
    "Каждая процедура, которая пишет спецификацию или то, что из неё генерируется, идемпотентна: запущенная повторно на том, что оставил её предыдущий запуск, она даёт тот же результат и ничего не меняет.\n\n" +
    "Тот, кто пишет процедуру, нужную только один раз, например перенос существующих документов в узлы, удаляет её, как только она отработала.",
  reason:
    "Whoever works on the specification may run such a procedure at any time, by hand or as part of a check, without knowing whether it has run before. " +
    "One whose second run changed anything would damage the specification the next time it ran. " +
    "A procedure needed only once is idempotent only on the state of the specification it was written for, so on a later state it can do damage.",
  ruReason:
    "Тот, кто работает со спецификацией, может запустить такую процедуру в любой момент, вручную или в составе проверки, не зная, запускалась ли она раньше. " +
    "Процедура, второй запуск которой что-то меняет, повредила бы спецификацию при следующем запуске. " +
    "Процедура, нужная только один раз, идемпотентна лишь на том состоянии спецификации, для которого её написали, поэтому на более позднем состоянии она может навредить.",
  changes: [
    "Из нынешнего 5.11, sid сохраняется. Ушло «поэтому повторный запуск всегда безопасен» — это повторяло сказанное, как предложил сводный отчёт рецензента от 11 ноября.",
    "Второй абзац оставлен, хотя рецензент сомневался: его не выполняет ни инструмент, ни проверка. Его выполняет тот, кто пишет процедуру, как и другие правила, которые проверить нельзя. У абзаца теперь есть подлежащее, «в модель» стало «в узлы», а его «потому что» ушло в обоснование.",
  ],
  sidValue: "s-jsqxdx47wkkj7gp",
};
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log("10.10 agreed; draft 10.11 written");
