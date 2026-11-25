// Node 9.5: the owner's wording of 2026-11-17 («что код за пределами коммита ещё нужно довести до ума -> что код за
// пределами коммита ещё нужно привести в соответствие с требованиями; после этого согласовано»), word for word in the
// Russian and by meaning in the English; the node is marked agreed.
// Node 1.3.2: its proposal now also says, in the bullet on a draft specification, that the checks give no warning about
// code outside the commit without a SpecTag (9.5), and the bullet on the tests says "a push goes through without running
// the tests", which EngStickler's readers found clearer than "a push runs without its tests".
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-417.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const swap = (n, field, from, to) => {
  if (!n[field].includes(from)) throw new Error(`${field}: not found: ${from}`);
  n[field] = n[field].replace(from, to);
};

const n95 = d["9.5"];
swap(n95, "ruReason", "что код за пределами коммита ещё нужно довести до ума:", "что код за пределами коммита ещё нужно привести в соответствие с требованиями:");
swap(n95, "reason", "that code outside the commit is still to be finished:", "that code outside the commit is still to be brought into line with the requirements:");
n95.changes.push("Ваша правка от 17 ноября, дословно: «ещё нужно довести до ума» → «ещё нужно привести в соответствие с требованиями». После неё вы согласовали узел («согласовано»).");
n95.agreed = "2026-11-17";

const n132 = d["1.3.2"];
const p = n132.proposals[0];
const T53 = "s-xhcmchcngykvn2k";
const T95 = "s-kkbqcb9xrpaepwn";
const oldEn = `- While the specification as a whole is a draft, a push runs without its tests (§${T53}).`;
const newEn = `- While the specification as a whole is a draft, a push goes through without running the tests (§${T53}), and the checks give no warning about code outside the commit that carries no SpecTag (§${T95}).`;
const oldRu = `- Пока вся спецификация — черновик, push проходит без запуска тестов (§${T53}).`;
const newRu = `- Пока вся спецификация — черновик, push проходит без запуска тестов (§${T53}), и проверки не предупреждают о коде за пределами коммита без SpecTag (§${T95}).`;
if (!p.en.includes(oldEn) || !p.ru.includes(oldRu)) throw new Error("1.3.2: the bullet was not found in the proposal");
p.en = p.en.replace(oldEn, newEn);
p.ru = p.ru.replace(oldRu, newRu);
p.why = p.why.replace("Оставшийся пункт сформулирован утверждением: «push проходит без запуска тестов».", "В пункт добавлено, что в черновике нет предупреждения о коде за пределами коммита без SpecTag (9.5), по вашему уточнению от 17 ноября. Пункт сформулирован утверждением: «push проходит без запуска тестов».");
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
