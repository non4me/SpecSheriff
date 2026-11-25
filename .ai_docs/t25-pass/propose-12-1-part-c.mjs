// The owner, 2026-11-19: "section", "domain", "module" and "component" are commonly accepted words, used
// here in their general sense and not as entities the specification defines, so 1.7.4, which governs only
// the words that take their meaning from the specification, does not keep "domain" out. Rewrites the
// proposal for 12.1 in the owner's words.
import fs from "node:fs";
const file = new URL("newform.json", import.meta.url);
const nf = JSON.parse(fs.readFileSync(file, "utf8"));
const n = nf["12.1"];
const pr = n.proposals[0].pairs[0];
const enAfter = "Other parts of the system may use that data in whole or in part.";
const ruAfter = "Другие части системы могут использовать эти данные целиком или частично.";
pr.en.to = enAfter + "\n\nIn the specification, a part of the system is described by a top-level section of the base specification or by a domain. In the code, a part of the system is a module or a component.";
pr.ru.to = ruAfter + "\n\nВ спецификации часть системы описывает раздел верхнего уровня базовой спецификации или домен. В коде часть системы — это модуль или компонент.";
n.proposals[0].why = "Ваши слова (19 ноября): на уровне спецификации часть системы — раздел или домен, на уровне кода — модуль или компонент. Эти слова стоят в общем смысле, а не как сущности, которые определяет спецификация, поэтому 1.7.4 их не запрещает: он касается только слов, которые берут смысл из спецификации.";
n.decisions.push({ date: "2026-11-19", problem: "Whether the definition of a part of the system, in a rule of the RecordType extension, may name a domain, since 1.7.4 limits such a rule to the words that the guidelines or that extension define.", ruling: "The owner: \"section\", \"domain\", \"module\" and \"component\" are commonly accepted words, used here in their general sense and not as entities that the specification defines, so the definition may name them." });
fs.writeFileSync(file, JSON.stringify(nf, null, 2) + "\n");
console.log("12.1 proposal rewritten in the owner's words");
