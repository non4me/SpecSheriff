// Node 1.39 (s-5yvpn4zhuqmv5bq, approved): its place in part 12 and a proposal for its reason. The merge of 1.39 into
// 12.3.1 was reversed on 2026-11-14, but the page that shows the base specification lost its row, so it is placed as
// 12.3.5, right after the nodes on what a RecordType is; nodes 12.3.5 to 12.3.14 of the structure become 12.3.6 to 12.3.15.
// The proposal carries out decisions the owner has already made, so it goes to the owner without the reviewer's check:
// the second paragraph of the reason spoke of a RecordType of the contracts section, which since 12.3.1 is a fragment of a
// format; the third paragraph cited 1.41 for cycles, and the sentence forbidding cycles now stands in 12.2.3.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(file, "utf8"));

const title = "A domain uses another domain's RecordTypes only from the sections it declares";
const text = "A RecordType of one domain names a RecordType of another domain, in a field's type or as the RecordType it refines, only where the named RecordType stands in a section the first domain's header names in its `consumes` links. A RecordType named from elsewhere is reported, not refused.";
const reason = "A domain's header then names every section of another domain whose RecordTypes the domain relies on at runtime. That other domain's index names the domain beside each such section. So whoever changes such a RecordType sees which domains it reaches (§s-yggv9myedprnaa7).\n\nA RecordType of contracts is provided by no single domain (§s-7vm323mhry2enx3), so naming it makes a domain rely on no other.\n\nA RecordType named from elsewhere is reported rather than refused, since declaring the use may set the domains using one another in a cycle (§s-uw9n84edf7cbe9n). Only a change to the design removes such a cycle. Until then the work goes on with the dependency in view.";
const ruTitle = "Домен использует RecordType другого домена только из разделов, которые он объявляет";
const ruText = "RecordType одного домена называет RecordType другого домена — в типе поля или как RecordType, который он уточняет, — только если названный RecordType находится в разделе, который заголовок первого домена называет в своих связях `consumes`. О RecordType, названном из другого места, инструменты сообщают, но не отклоняют его.";
const ruReason = "Тогда заголовок домена называет каждый раздел другого домена, на RecordType которого домен опирается во время работы. Указатель того, другого домена называет этот домен рядом с каждым таким разделом. Поэтому тот, кто меняет такой RecordType, видит, каких доменов это касается (§s-yggv9myedprnaa7).\n\nRecordType контрактов не предоставляет ни один отдельный домен (§s-7vm323mhry2enx3), поэтому, называя его, домен ни на какой другой домен не опирается.\n\nО RecordType, названном из другого места, инструменты сообщают, но не отклоняют его, потому что объявление такого использования может поставить домены в цикл взаимного использования (§s-uw9n84edf7cbe9n). Устранить такой цикл может только изменение архитектуры. До тех пор работа идёт, а зависимость остаётся на виду.";

const newReasonEn = reason
  .replace("A RecordType of contracts is provided by no single domain (§s-7vm323mhry2enx3), so naming it makes a domain rely on no other.", "A fragment of a format is declared in the contracts section rather than in a domain (§s-7vm323mhry2enx3), so naming a fragment makes a domain rely on no other domain.")
  .replace("in a cycle (§s-uw9n84edf7cbe9n).", "in a cycle, which a domain's header forbids (§s-yggv9myedprnaa7).");
const newReasonRu = ruReason
  .replace("RecordType контрактов не предоставляет ни один отдельный домен (§s-7vm323mhry2enx3), поэтому, называя его, домен ни на какой другой домен не опирается.", "Фрагмент формата объявляется в контрактах, а не в домене (§s-7vm323mhry2enx3), поэтому, называя фрагмент, домен ни на какой другой домен не опирается.")
  .replace("в цикл взаимного использования (§s-uw9n84edf7cbe9n).", "в цикл взаимного использования, который запрещает заголовок домена (§s-yggv9myedprnaa7).");
if (newReasonEn === reason || newReasonRu === ruReason) throw new Error("reason not changed");

d["12.3.5"] = {
  from: "1.39",
  sid: "kept",
  title,
  text,
  reason,
  ruTitle,
  ruText,
  ruReason,
  changes: [
    "Нынешний 1.39, одобренный. Слияние с 12.3.1 отменено 14 ноября, и узел возвращается на своё место: сразу после узлов о том, что такое RecordType. Прежние 12.3.5–12.3.14 стали 12.3.6–12.3.15.",
    "Русский текст — мой перевод одобренного английского.",
  ],
  sidValue: "s-5yvpn4zhuqmv5bq",
  proposals: [
    {
      where: "абзацы 2 и 3 обоснования",
      en: ["Title: " + title, "", "Text: " + text, "", "Reason: " + newReasonEn].join("\n"),
      ru: ["Заголовок: " + ruTitle, "", "Текст: " + ruText, "", "Обоснование: " + newReasonRu].join("\n"),
      why: "Выполняет уже принятые решения: в контрактах объявляются не RecordType, а фрагменты формата (12.3.1, 14 ноября); запрет циклов теперь стоит в заголовке домена (12.2.3), а не в нынешнем 1.41.",
    },
  ],
};
const ordered = {};
for (const [k, v] of Object.entries(d)) {
  if (k === "12.3.5") continue;
  ordered[k] = v;
  if (k === "12.3.4") ordered["12.3.5"] = d["12.3.5"];
}
for (const v of Object.values(ordered)) {
  if (Array.isArray(v.changes)) v.changes = v.changes.map(c => c.replace("расширение для доменов (12.3.14)", "расширение для доменов (12.3.15)"));
}
fs.writeFileSync(file, JSON.stringify(ordered, null, 2) + "\n");

const pageFile = new URL("base-structure.html", here);
let page = fs.readFileSync(pageFile, "utf8");
for (let i = 14; i >= 5; i--) {
  const a = `["12.3.${i}",`;
  if (!page.includes(a)) throw new Error("row not found: " + a);
  page = page.replace(a, `["12.3.${i + 1}",`);
}
const anchor = `      ["12.3.6","move",0,"1.25",`;
if (!page.includes(anchor)) throw new Error("anchor not found");
page = page.replace(anchor, `      ["12.3.5","same",0,"1.39","${title}","${ruTitle}"],\n` + anchor);
fs.writeFileSync(pageFile, page);
console.log("1.39 placed as 12.3.5");
