// Node 1.3.1: the owner ruled on 2026-11-17 that the rules of the guidelines state no default status, which only the
// schema holds («я бы статусы по умолчанию вообще не фиксировал в правилах гайдлайна - тут они не несут особой пользы
// помоему - а только в схеме»). The decision itself says what is removed, so the sentence "`draft` is the default." is
// removed without asking, and the node stays agreed. 1.3.2 still says that whatever is not approved is a draft.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-422.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["1.3.1"];
const swap = (field, from, to) => {
  if (!n[field].includes(from)) throw new Error(`${field}: not found: ${from}`);
  n[field] = n[field].replace(from, to);
};
swap("text", " `draft` is the default.", "");
swap("ruText", " `draft` используется по умолчанию.", "");
(n.changes ??= []).push("17 ноября, по вашему решению, что правила guidelines не называют статус по умолчанию, а держит его только схема: убрано «`draft` is the default» («`draft` используется по умолчанию»). Согласование сохраняется; что всё неодобренное — черновик, говорит 1.3.2.");
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log(n.text, "|", n.ruText);
