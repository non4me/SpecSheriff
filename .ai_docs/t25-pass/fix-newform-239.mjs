// Node 1.3.7, agreed on 2026-11-10: one whole new wording proposed to the owner. It carries out the owner's ruling of
// 2026-11-13, in agreed node 10.6, that the specification is approved by an entry of its own, with no rule in between.
// The second exception and the reason's sentences on that rule go; the one exception left stands in the sentence.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const n = d["1.3.7"];
n.proposals = [
  {
    where: "текст и обоснование целиком",
    en:
      "Text: Anyone may withdraw the approval of a node, except that of a node of the SpecSheriff guidelines a project uses (§s-bsya3febm6u64ab). " +
      "A withdrawal makes the node a draft. The withdrawal names whoever made it.\n\n" +
      "Reason: A withdrawal gives no agreement in anyone's name, so whoever finds an approved rule wrong can stop any further change to its code (§s-utvqbypzhmgndug) without waiting for its owners. " +
      "The name on it tells the owners whom to ask. The SpecSheriff guidelines are approved where they are written (§s-bsya3febm6u64ab), so their approval is not for just anyone to withdraw.",
    ru:
      "Текст: Одобрение узла может отозвать кто угодно, кроме одобрения узла SpecSheriff guidelines, которые использует проект (§s-bsya3febm6u64ab). " +
      "Отзыв делает узел черновиком. Отзыв называет того, кто его сделал.\n\n" +
      "Обоснование: Отзыв ни от чьего имени не даёт согласия, поэтому тот, кто считает одобренное правило неверным, может остановить любые дальнейшие изменения его кода (§s-utvqbypzhmgndug), не дожидаясь его ответственных. " +
      "Имя в отзыве говорит ответственным, кого спросить. SpecSheriff guidelines одобрены там, где написаны (§s-bsya3febm6u64ab), поэтому их одобрение не может отозвать кто угодно.",
    why:
      "По вашему решению в согласованном 10.6: спецификацию одобряет отдельная запись ответственного, правила-посредника нет. " +
      "Поэтому ушли второе исключение («правило собственных guidelines проекта, которое говорит, что спецификация одобрена») и предложение обоснования о нём; связь на 10.6 убирается при переносе. " +
      "Осталось одно исключение, и оно стоит в самом предложении, без списка.",
  },
];
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log("1.3.7 proposal set");
