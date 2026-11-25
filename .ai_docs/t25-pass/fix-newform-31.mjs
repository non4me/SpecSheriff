// The owner's text for 2.2, 2026-11-08. The node stood unchanged on the page until now, so it gets a draft.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(file, "utf8"));
if (d["2.2"]) throw new Error("2.2 has a draft already");

const node = {
  from: "1.36",
  sid: "kept",
  title: "=1.36",
  text: "If the specification is divided by domains, each domain, contracts, the technical appendix and the guidelines are kept in separate files.\n\nIf a domain is itself too large to fit into the context window, it is divided into files, one per section.",
  reason: "The specification is too large to fit whole into the context window of an agent working with it. It is therefore divided into self-contained domains, and a domain into sections, so that only the part the work at hand needs is loaded. Contracts is the exception: shared by every domain, it is loaded whichever part the work needs.",
  ruTitle: "Часть спецификации читается отдельно",
  ruText: "Если спецификация разделена по доменам, то каждый домен, контракты, техническое приложение и guidelines хранятся в отдельных файлах.\n\nЕсли и домен слишком большой, чтобы поместиться в контекстное окно, то он делится на файлы, по одному на раздел.",
  ruReason: "Спецификация слишком велика, чтобы целиком поместиться в контекстное окно работающего с ней агента. Поэтому она разделена на самостоятельные домены, а домен — на разделы, так что загружается только та часть, которая нужна для текущей работы. Исключение — контракты: они общие для всех доменов и загружаются, какая бы часть ни была нужна для работы.",
  changes: ["Узел перенесён из 1.36, sid сохранён.", "Текст — ваш. Исправлены опечатка и запятая."],
  sidValue: "s-k73czmpkazcx7mu",
};

const out = {};
let placed = false;
for (const [k, v] of Object.entries(d)) {
  out[k] = v;
  if (k === "2.1") { out["2.2"] = node; placed = true; }
}
if (!placed) throw new Error("no key 2.1 to follow");
fs.writeFileSync(file, JSON.stringify(out, null, 2) + "\n");
console.log("2.2 drafted");
