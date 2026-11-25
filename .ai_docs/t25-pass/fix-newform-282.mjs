// Node 12.3.1, not yet agreed: a proposal carrying out what the owner settled on 2026-11-14 in the round of questions on
// the data models and RecordTypes.
// - A domain's RecordTypes are its API: they describe the data the domain creates and keeps in its store, and the other
//   domains take that data whole or in part. Domains do not pass data on; they offer it (questions 2 and 3).
// - Data in one format has one name, and two domains producing data in the same format are one domain (questions 4 and
//   6), so every RecordType a domain produces is declared in the domain that first offers data in its format. The branch
//   on a RecordType with no providing domain, and its example, go.
// - A structure that the RecordTypes of several domains contain, such as an address, is declared once among the shared
//   data structures, part of the contracts section kept in a document of its own (questions 7 and 8).
// - The English says "describes the structure", as 12.3.2 does; the Russian keeps the owner's «формат».
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const n = d["12.3.1"];

const text = [
  "A RecordType (§s-6eb92ddch7shuvu) describes the structure of a kind of data. A domain's RecordTypes are its API: they describe the data that the domain creates and keeps in its store. Other domains take that data, whole or in part.",
  "",
  "A domain that takes data in the format of a RecordType may offer it on in the same format, changing only the values in the data, not its structure. The name of the RecordType then does not change. A domain that changes the structure offers the data under a RecordType of its own, with a new name. RecordType names are unique across the specification.",
  "",
  "A RecordType is declared in the domain that first offers data in its format. A structure that the RecordTypes of several domains contain, such as an address, is declared once, as a RecordType among the shared data structures. The shared data structures are part of the contracts section and are kept in a document of their own.",
  "",
  "A domain may take data of another domain's RecordType only if its own header names, in its `consumes` links, the section where that RecordType is declared.",
].join("\n");
const ruText = [
  "RecordType (§s-6eb92ddch7shuvu) — это формат данных. RecordType домена — это его API: они описывают данные, которые домен создаёт и хранит в своём хранилище. Другие домены берут эти данные целиком или частично.",
  "",
  "Домен, который берёт данные в формате RecordType, может предлагать их дальше в том же формате, меняя только значения, но не структуру. Имя RecordType при этом не меняется. Домен, который меняет структуру, предлагает данные под своим RecordType с новым именем. Имена RecordType уникальны во всей спецификации.",
  "",
  "RecordType объявляется в домене, который первым предлагает данные в его формате. Структура, которую содержат RecordType нескольких доменов, например адрес, объявляется один раз — как RecordType среди общих структур данных. Общие структуры данных входят в контракты и хранятся в отдельном документе.",
  "",
  "Домен может брать данные RecordType другого домена, только если его собственный заголовок называет в связях `consumes` раздел, в котором объявлен этот RecordType.",
].join("\n");

const swap = (s, a, b) => {
  if (!s.includes(a)) throw new Error("not found: " + a);
  return s.replace(a, b);
};
let reason = swap(
  n.reason,
  "A RecordType described outside its provider falls out of step when the provider changes what it provides. Where a RecordType has no single provider, the format of the part of the data common to the domains using it belongs to none of them.",
  "A RecordType described outside the domain that first offers its data falls out of step when that domain changes what it offers. Only one domain is responsible for a subject area (§s-h6h25ctd3yryudh), so data in one format first comes from one domain. A structure that the RecordTypes of several domains contain belongs to none of them, so it is kept with what the domains share. It is kept apart from the terms, since a structure is written differently from a term.",
);
reason = swap(
  reason,
  "A RecordType of the contracts section has no single provider, so a domain naming it relies on no other domain.",
  "A shared data structure belongs to no domain, so a domain using it relies on no other domain.",
);
let ruReason = swap(
  n.ruReason,
  "RecordType, описанный вдали от поставщика, отстаёт, когда поставщик меняет то, что отдаёт. Если у RecordType нет отдельного поставщика, формат части данных, общей для доменов, которые его используют, не принадлежит ни одному из них.",
  "RecordType, описанный вне домена, который первым предлагает его данные, отстаёт, когда этот домен меняет то, что предлагает. За предметную область отвечает только один домен (§s-h6h25ctd3yryudh), поэтому данные одного формата впервые появляются в одном домене. Структура, которую содержат RecordType нескольких доменов, не принадлежит ни одному из них, поэтому её хранят вместе с тем, что домены делят между собой. Её хранят отдельно от терминов, потому что структура записывается иначе, чем термин.",
);
ruReason = swap(
  ruReason,
  "У RecordType контрактов нет отдельного поставщика, поэтому, называя его, домен ни на кого другого не опирается.",
  "Общая структура данных не принадлежит ни одному домену, поэтому домен, который её использует, ни на какой другой домен не опирается.",
);

const example =
  "A domain that takes orders declares the RecordType of an order. A domain that issues invoices takes the orders it needs and declares the RecordType of an invoice. Both RecordTypes contain a sum of money, which is declared once, among the shared data structures.";
const ruExample =
  "Домен, который принимает заказы, объявляет RecordType заказа. Домен, который выставляет счета, берёт нужные ему заказы и объявляет RecordType счёта. Оба RecordType содержат денежную сумму, а она объявлена один раз — среди общих структур данных.";

n.proposals = [
  {
    where: "текст и обоснование целиком; новый пример",
    en: "Title: " + n.title + "\n\nText: " + text + "\n\nReason: " + reason + "\n\nExamples: " + example,
    ru: "Заголовок: " + n.ruTitle + "\n\nТекст: " + ruText + "\n\nОбоснование: " + ruReason + "\n\nПримеры: " + ruExample,
    why: [
      "Абзац 1: RecordType домена — его API: данные, которые домен создаёт и хранит, а другие домены берут целиком или частично (ваши ответы на вопросы 2 и 3). Ваша фраза «RecordType — это формат данных» осталась; «для передачи следующему домену и для хранения» заменено, потому что домены не передают данные, а предлагают, и хранимые данные и есть его разъём.",
      "Абзац 2: «передать дальше» заменено на «предлагать дальше» по той же причине; смысл абзаца — ваш случай с санитизацией — не изменился.",
      "Абзац 3: RecordType объявляется в домене, который первым предлагает данные в его формате. Ветка о RecordType без такого домена и пример к ней убраны: два домена с одним форматом — это один домен (ваш ответ на вопрос 6). Добавлены общие структуры данных: они входят в контракты и хранятся в отдельном документе (вопросы 7 и 8).",
      "Абзац 4: «принимать RecordType» заменено на «брать данные RecordType».",
      "Обоснование, абзац 2: почему данные одного формата впервые появляются в одном домене — со ссылкой на 12.2.1, — и почему общая структура хранится с тем, что домены делят, но отдельно от терминов. Абзац 3: последняя фраза — об общей структуре данных вместо RecordType контрактов.",
      "Новый пример: два домена и общая денежная сумма.",
    ].join(" "),
  },
];
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(text + "\n---\n" + reason);
