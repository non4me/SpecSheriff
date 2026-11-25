// The reviewer's report on the present 6.7, now 7.12: "as a rule" read as "in the form of a rule", and "carries" gives way to "holds".
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const path = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
if (d["7.12"]) throw new Error("7.12 already has a draft");
const row = fs.readFileSync(new URL("base-structure.html", here), "utf8").split("\n").map(l => l.trim()).find(t => t.startsWith('["7.12",'));
d["7.12"] = {
  from: "6.7", sid: "kept",
  title: "=6.7",
  ruTitle: JSON.parse(row.replace(/,$/, ""))[5],
  text: "A reason states the ground its rule rests on, usually in its first sentence. Beyond that ground, a reason holds only these:\n- a caveat for a case the ground does not reach;\n- further grounds that do not overlap it.\n\nWhat a mistake would cost and a restatement of the rule's text are left out.",
  reason: "=6.7",
  ruText: "Обоснование называет основание, на котором держится правило, обычно в первом предложении. Кроме этого основания, обоснование содержит только следующее:\n- оговорку для случая, которого основание не охватывает;\n- другие основания, которые с ним не пересекаются.\n\nТо, чего стоила бы ошибка, и пересказ текста правила в него не входят.",
  ruReason: "Всё, что обоснование говорит сверх своих оснований, размывает их, пока читатель не перестанет понимать, на каком предложении держится правило. А правило, опирающееся на непересекающиеся основания, переживает устаревание любого из них.",
  changes: [
    "Заголовок и обоснование нынешнего 6.7, дословно.",
    "В тексте «as a rule» заменено на «usually»: прежние слова читались как «в виде правила». «Carries» заменено на «holds». Смысл тот же.",
    "Сохраняет sid 6.7.",
  ],
  sidValue: "s-ydzyh9nqm3x64h4",
};
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(d["7.12"].ruTitle);
