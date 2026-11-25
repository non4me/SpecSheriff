// Node 1.3.3: its proposal's first sentence of the reason now also names the warning about code outside the commit, which
// node 9.5, agreed on 2026-11-17, gives only while the specification is approved.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-421.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const p = d["1.3.3"].proposals[0];
const swap = (field, from, to) => {
  if (!p[field].includes(from)) throw new Error(`${field}: not found: ${from}`);
  p[field] = p[field].replace(from, to);
};
swap("en", "decides whether the tests of the system's code run on a push (§s-xhcmchcngykvn2k).", "decides whether the tests of the system's code run on a push (§s-xhcmchcngykvn2k) and whether the checks warn about code outside the commit that carries no SpecTag (§s-kkbqcb9xrpaepwn).");
swap("ru", "зависит, запускаются ли при push тесты кода системы (§s-xhcmchcngykvn2k).", "зависит, запускаются ли при push тесты кода системы (§s-xhcmchcngykvn2k) и предупреждают ли проверки о коде за пределами коммита без SpecTag (§s-kkbqcb9xrpaepwn).");
p.why = p.why.replace("с ссылкой на 5.3. Остальное не меняется.", "с ссылкой на 5.3, и «предупреждают ли проверки о коде за пределами коммита без SpecTag», со ссылкой на согласованный 9.5. Остальное не меняется.");
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
