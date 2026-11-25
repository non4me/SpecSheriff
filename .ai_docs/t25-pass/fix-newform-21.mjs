// The owner, 2026-11-08: 1.2.3 is rewritten whole, its title kept, around the separation of
// responsibility: the text gives the requirement, the reason its grounds. "What must hold" was a
// special case only. The exception of the technical debt stays, since its text describes a problem.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const n = d["1.2.3"];
const debt = "§s-2r7k2aeyusgy6fw";
n.text = `A rule's text states what the rule requires. Its reason says why that is required. The reason itself requires nothing.\n\nA rule of the technical debt is the exception: its text describes a problem as it stands (${debt}).`;
n.ruText = `Описание правила говорит, чего правило требует. Обоснование говорит, почему это требуется. Само обоснование ничего не требует.\n\nИсключение — правило технического долга: его описание говорит о проблеме, как она есть (${debt}).`;
n.reason = "Each part answers one question: the text what is required, the reason why. Mixed in one text, a rule grows long. A reader then cannot tell which part of it is required. A reason kept apart shows when it has stopped holding. Buried inside the requirement, it does not.";
n.ruReason = "Каждая часть отвечает на свой вопрос: описание — что требуется, обоснование — почему. Смешанное в одном тексте, правило становится длинным. Тогда читатель не может понять, какая его часть требуется. Обоснование, которое хранится отдельно, видно, когда оно перестаёт быть верным. Спрятанное внутри требования, оно этого не показывает.";
n.changes = [
  "Заголовок — ваш, из комментария: «Правило состоит из описания и его обоснования».",
  "Текст и обоснование написаны заново, по вашему решению: узел говорит о разделении ответственности — описание задаёт требование, обоснование говорит, почему оно нужно. «Что должно выполняться» нынешнего 1.12 было лишь частным случаем.",
  "Из нынешнего 1.12 по смыслу сохранены: исключение для технического долга (дословно, кроме «описание» вместо «текст» в русском), то, что обоснование не входит в требование, и доводы о длинном смешанном правиле и о спрятанном обосновании. Абзац 3 нынешнего 1.12 по-прежнему уходит в 7.10.",
  "Сохраняет sid 1.12.",
];
delete n.agreed;
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(n.ruText, "\n---\n", n.ruReason);
