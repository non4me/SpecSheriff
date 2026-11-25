// A proposal for the agreed 12.1 "RecordType" that carries out the owner's ruling of 2026-11-16: the RecordType extension
// stands on its own, and its rules name no domain, using a general word for a part of an application instead. The agent
// uses "a part of the system", the plain words that the agreed 7.2.1 and 1.1.5 already use, and "the section of the base
// specification that describes where data in that format first appears", the phrase of the agreed example of 1.7.4.
// The contracts section stays, since 3.1 defines it in the SpecSheriff guidelines. The example may still mention domains,
// as an example of a part of the system (the same ruling).
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-478.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["12.1"];
if (n.proposals) throw new Error("12.1 already holds a proposal");
const TERM = "s-6eb92ddch7shuvu";
const CONTRACTS = "s-z6tq6a3btnvvwx7";
const text = `A RecordType (§${TERM}) is the format of data that a part of the system outputs and keeps in its store. It belongs to the API of that part of the system. Other parts of the system may use that data, whole or in part.\n\nData in one format has one RecordType. It is declared in the only section of the base specification that describes where data in that format first appears. The exception is a fragment of a format, such as an address. Fragments are declared in the contracts section (§${CONTRACTS}), and any section may reuse them. RecordType names are unique across the specification.`;
const ruText = `RecordType (§${TERM}) — это формат данных, которые часть системы выдаёт и хранит в своём хранилище. Он относится к API этой части системы. Другие части системы могут использовать эти данные целиком или частично.\n\nУ данных одного формата один RecordType. Он объявляется в том единственном разделе базовой спецификации, который описывает, где данные этого формата появляются впервые. Исключение — фрагмент формата, например адрес. Фрагменты объявляются в контрактах (§${CONTRACTS}), и их может переиспользовать любой раздел. Имена RecordType уникальны во всей спецификации.`;
const reason = "Two descriptions of one format drift apart over time. The parts of the system that read the data then cannot tell which description is valid. A format declared once, under one name, by whoever changes it, has nothing to drift from.";
const ruReason = "Два описания одного формата со временем расходятся. Тогда части системы, которые читают эти данные, не могут понять, какое описание верно. Формату, объявленному один раз, под одним именем, тем, кто его меняет, расходиться не с чем.";
const example = "In a base specification divided into domains, the domain of users declares the RecordType of a user. The domain of requests takes users' data and declares the RecordType of a request. Users and requests both hold an address, whose format is declared once, in the contracts section. A domain that masks users' personal data and offers the masked data to other domains keeps the RecordType of a user.";
const ruExample = "В базовой спецификации, разделённой на домены, домен пользователей объявляет RecordType пользователя. Домен заявок берёт данные пользователей и объявляет RecordType заявки. И у пользователя, и у заявки есть адрес, формат которого объявлен один раз, в контрактах. Домен, который маскирует персональные данные пользователей и отдаёт замаскированные данные другим доменам, сохраняет RecordType пользователя.";
n.proposals = [{
  where: "текст, обоснование и пример",
  en: [`Title: ${n.title}`, `Text: ${text}`, `Example: ${example}`, `Reason: ${reason}`].join("\n\n"),
  ru: [`Заголовок: ${n.ruTitle}`, `Текст: ${ruText}`, `Пример: ${ruExample}`, `Обоснование: ${ruReason}`].join("\n\n"),
  why: "Выполняет ваше решение от 16 ноября: правила расширения RecordType не называют доменов. «Домен» заменён на «часть системы» и «раздел базовой спецификации», как в согласованных 7.2.1, 1.1.5 и в примере 1.7.4. Контракты остаются: их определяет 3.1 в SpecSheriff guidelines. Пример может говорить о доменах как о примере части системы (то же решение).",
}];
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
