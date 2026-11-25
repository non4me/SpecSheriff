// The owner confirmed on 2026-11-19 what a part of the system is: in an implementation, most often a module;
// in the specification, a section or a domain. Records a proposal for the agreed 12.1 that defines the term
// without naming domains, as 1.7.4 requires of a rule of the RecordType extension.
import fs from "node:fs";
const file = new URL("newform.json", import.meta.url);
const nf = JSON.parse(fs.readFileSync(file, "utf8"));
const n = nf["12.1"];
const enAfter = "Other parts of the system may use that data in whole or in part.";
const ruAfter = "Другие части системы могут использовать эти данные целиком или частично.";
if (!n.text.includes(enAfter) || !n.ruText.includes(ruAfter)) throw new Error("12.1 paragraph not found");
n.proposals = [{
  pairs: [{
    en: { from: enAfter, to: enAfter + "\n\nA part of the system is what one top-level section of the base specification describes. Most often it is a module of the system." },
    ru: { from: ruAfter, to: ruAfter + "\n\nЧасть системы — это то, что описывает один раздел верхнего уровня базовой спецификации. Чаще всего это модуль системы." },
  }],
  why: "Ваше уточнение от 19 ноября: часть системы в реализации чаще всего модуль, в спецификации — раздел или домен. Понятие стоит в 12.1, 12.4, 12.5 и 12.10, но нигде не определено. Слово «домен» в определении не стоит: правила расширения «RecordType» не называют понятий «Доменов» (1.7.4); в спецификации с доменами разделы верхнего уровня базы — домены и контракты, как и в согласованном 4.1.",
}];
n.decisions = (n.decisions ?? []).concat([{ date: "2026-11-19", problem: "What a part of the system is, a phrase that 12.1, 12.4, 12.5 and 12.10 use without defining it.", ruling: "The owner: in an implementation, a part of the system is most often a module; in the specification, it is a section or a domain." }]);
fs.writeFileSync(file, JSON.stringify(nf, null, 2) + "\n");
console.log("12.1 proposal recorded");
