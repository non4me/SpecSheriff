// The owner's wording for 2.1, 2026-11-08: a domain describes its API in the form of RecordTypes. The node
// stood unchanged on the page until now, so it gets a draft holding its present words and this one change.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(file, "utf8"));
if (d["2.1"]) throw new Error("2.1 has a draft already");

const node = {
  from: "1.35",
  sid: "kept",
  title: "=1.35",
  text: "The base specification is made of contracts and of one domain or several. A domain is the part of the base specification devoted to one subject area of the system. No other domain is responsible for that area.",
  reason: "A subject area's rules bear on one another and change together, so they are kept together and apart from those of other areas.\n\nA domain describes its API in the form of RecordTypes (§s-7vm323mhry2enx3). Its header's `consumes` links name the sections of theirs it uses (§s-yggv9myedprnaa7). A change to a domain's rules outside its interface and the sections others use then leaves the other domains as they are.\n\nA system of one such area has no line to divide it along.",
  ruTitle: "Деление спецификации",
  ruText: "Базовая спецификация состоит из контрактов и одного или нескольких доменов. Домен — это часть базовой спецификации, посвящённая одной предметной области системы. Ни один другой домен за эту область не отвечает.",
  ruReason: "Правила одной предметной области влияют друг на друга и меняются вместе, поэтому их держат вместе и отдельно от правил других областей.\n\nДомен описывает API в формате RecordType (§s-7vm323mhry2enx3). Связи `consumes` в его заголовке называют разделы других доменов, которые он использует (§s-yggv9myedprnaa7). Тогда изменение правил домена вне его интерфейса и разделов, которыми пользуются другие, оставляет другие домены как есть.\n\nВ системе с одной такой областью нет границы, по которой её можно было бы разделить.",
  changes: [
    "Узел перенесён из 1.35, sid сохранён, текст дословно.",
    "В обосновании первая фраза абзаца 2 — ваша: «Домен описывает API в формате RecordType».",
  ],
  sidValue: "s-h6h25ctd3yryudh",
};

const out = {};
let placed = false;
for (const [k, v] of Object.entries(d)) {
  if (!placed && k === "2.3") { out["2.1"] = node; placed = true; }
  out[k] = v;
}
if (!placed) throw new Error("no key 2.3 to stand before");
fs.writeFileSync(file, JSON.stringify(out, null, 2) + "\n");
console.log("2.1 drafted");
