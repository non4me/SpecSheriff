// Node 12.3.4, not yet agreed: the owner's wording of 2026-11-14 for the first sentence of the reason, «Домены, которые
// читают данные другого домена, ...»: the domains that rely on the format are the other domains. The second sentence of the
// reason follows it: "that domain" is the domain whose data is read, and "those domains" are its readers.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const n = d["12.3.4"];
const swap = (s, a, b) => {
  if (!s.includes(a)) throw new Error("not found: " + a);
  return s.replace(a, b);
};
n.reason = swap(n.reason, "The domains that read a domain's data rely on the format of that data. Without this rule, when the domain's code renames a field, those domains lose its value without notice.",
  "The domains that read another domain's data rely on the format of that data. Without this rule, when that domain renames a field in its code, those domains lose the field's value without notice.");
n.ruReason = swap(n.ruReason, "Домены, которые читают данные домена, полагаются на формат этих данных. Без этого правила, если код домена переименует поле, эти домены незаметно потеряют его значение.",
  "Домены, которые читают данные другого домена, полагаются на формат этих данных. Без этого правила, если тот домен переименует поле в своём коде, эти домены незаметно потеряют значение этого поля.");
n.changes.push("Первая фраза обоснования — ваша (2026-11-14): данные читают другие домены. Вторая фраза приведена к ней: «тот домен» — домен, чьи данные читают, «эти домены» — те, кто их читает.");
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(n.reason, "\n", n.ruReason);
