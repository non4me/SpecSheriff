// The owner, 2026-11-10, on 8.3: a reference stood in for the explanation ("as a rule is (§…, §…)"). The sentence goes: what it stood for
// is stated at its home, the rule on being implemented and 11.4, 11.5, 13.12. With it the reviewer's fixes of the same day: "Its" read as
// the kind's in 8.3; in 11.4 and 13.12 «которому» attached to the project; in 6.1 a bare «тип» followed «узел собственного типа».
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
if (d["8.3"].sidValue !== "s-vsh384ybt4w25a2") throw new Error("unexpected draft");

const swap = (k, field, from, to) => {
  if (!d[k][field].includes(from)) throw new Error(`${k}.${field}: no "${from}"`);
  d[k][field] = d[k][field].replace(from, to);
};

swap("8.3", "text", " Nodes that need code are implemented and tested as a rule is (§s-6fw72j65jkqrfpf, §s-rah8b37kytb682y).", "");
swap("8.3", "ruText", " Узлы, которым нужен код, реализуются и тестируются так же, как правило (§s-6fw72j65jkqrfpf, §s-rah8b37kytb682y).", "");
swap("8.3", "text", "Its `TextRule.list.declaredIn` names that extension.", "That rule's `TextRule.list.declaredIn` names that extension.");
swap("8.3", "ruText", "Его `TextRule.list.declaredIn` называет это расширение.", "`TextRule.list.declaredIn` этого правила называет это расширение.");
swap("11.4", "ruText", "узла собственного типа в проекте, которому нужен код.", "узла собственного типа в проекте, нуждающегося в коде.");
swap("13.12", "ruText", "узла собственного типа в проекте, которому нужен код (", "узла собственного типа в проекте, нуждающегося в коде (");
swap("6.1", "ruText", "никакой другой тип не говорит", "никакой другой тип связи не говорит");

d["8.3"].changes = [...d["8.3"].changes, "Убрано предложение \"Nodes that need code are implemented and tested as a rule is (§s-6fw72j65jkqrfpf, §s-rah8b37kytb682y).\": ссылка стояла вместо объяснения, а сказанное уже есть в правиле о реализации и в 11.4, 11.5, 13.12."];
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log(d["8.3"].text);
console.log(d["8.3"].ruText);
