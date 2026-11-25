// The reviewer's report on the node now 7.2. Its first item condemned every rule of the base once the sentence that the
// specification describes the system stayed behind in 1.13; the thought of 6.12 that what no rule requires needs no rule stood
// nowhere, while the reason's paragraph on prohibitions grounded nothing. "Obvious" stays: the testable form reads murkier.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const n = d["7.2"];
if (n.sidValue !== "s-whn3jvdftd7uy9g") throw new Error("7.2 is another node");
n.title = "Which rules have no place in the specification";
n.ruTitle = "Каким правилам нет места в спецификации";
n.text = "A rule describes the system or governs how the specification is kept and implemented. Whoever writes or revises a rule removes it where it:\n\n- does neither;\n- forbids what no rule requires;\n- states the obvious.";
n.ruText = "Правило либо описывает систему, либо регулирует то, как спецификация ведётся и реализуется. Тот, кто пишет или пересматривает правило, удаляет его, если оно:\n\n- не делает ни того, ни другого;\n- запрещает то, чего не требует ни одно правило;\n- утверждает очевидное.";
n.reason = "A rule that does neither decides nothing.\n\nA prohibition that answers no rule decides nothing. Each one written suggests that whatever it does not name is allowed.\n\nA rule stating the obvious costs a reading and decides nothing either.";
n.ruReason = "Правило, которое не делает ни того, ни другого, ничего не решает.\n\nЗапрет, который не отвечает ни одному правилу, ничего не решает. Каждый написанный запрет внушает, что всё, чего он не называет, разрешено.\n\nПравило, утверждающее очевидное, стоит одного прочтения и тоже ничего не решает.";
n.changes = [
  "Новый узел, по вашему комментарию: это правило о правилах в целом, и место ему в разделе 7.",
  "Заголовок новый.",
  "Первая фраза возвращает мысль нынешнего 1.13, что спецификация описывает систему. Без неё первый пункт запрещал бы все правила базовой спецификации.",
  "Второй пункт новый. Мысль нынешнего 6.12 «It needs no rule saying so» иначе нигде не стоит, а абзац обоснования о запретах ничего бы не обосновывал.",
  "Назван тот, кто удаляет правило, а «dropped» заменено на «removes», как в узле об архиве.",
  "Обоснование сокращено: убраны фразы об агенте и о борьбе с дублированием структурой, они не обосновывают текст.",
  "Новый sid: нынешний sid 1.13 остаётся у 1.1.3.",
];
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(n.title);
