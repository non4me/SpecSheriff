// The owner refined the definition of a part of the system on 2026-11-19: in the specification it is a
// section or a domain, in the code a module or a component. Rewrites the proposal for 12.1 to name both
// levels. The word "domain" stays out, as 1.7.4 requires of a rule of the RecordType extension; a domain
// is a top-level section of the base specification, as in the agreed 4.1.
import fs from "node:fs";
const file = new URL("newform.json", import.meta.url);
const nf = JSON.parse(fs.readFileSync(file, "utf8"));
const n = nf["12.1"];
const pr = n.proposals[0].pairs[0];
const enAfter = "Other parts of the system may use that data in whole or in part.";
const ruAfter = "Другие части системы могут использовать эти данные целиком или частично.";
pr.en.to = enAfter + "\n\nIn the specification, a part of the system is described by one top-level section of the base specification. In the code, a part of the system is a module or a component.";
pr.ru.to = ruAfter + "\n\nВ спецификации часть системы описывает один раздел верхнего уровня базовой спецификации. В коде часть системы — это модуль или компонент.";
n.proposals[0].why = "Ваше уточнение от 19 ноября: на уровне спецификации часть системы — раздел или домен, на уровне программного кода — модуль или компонент. Слова «домен» в тексте нет: правила расширения «RecordType» не называют понятий расширения «Домены» (1.7.4). Домен под определение подходит: в спецификации с доменами разделы верхнего уровня базы — домены и контракты, как в согласованном 4.1.";
n.decisions.push({ date: "2026-11-19", problem: "How the definition of a part of the system names its two levels.", ruling: "The owner: in the specification, a part of the system is a section or a domain; in the code, it is a module or a component." });
fs.writeFileSync(file, JSON.stringify(nf, null, 2) + "\n");
console.log("12.1 proposal rewritten");
