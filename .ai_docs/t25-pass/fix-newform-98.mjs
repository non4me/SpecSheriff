// The reviewer's report on the present 6.11, now 7.11: the paragraph of the reason on a style spreading by imitation grounds nothing
// in the text. The text and the rest of the reason stand as they are.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
if (d["7.11"]) throw new Error("7.11 already has a draft");
d["7.11"] = {
  from: "6.11", sid: "kept",
  title: "=6.11",
  ruTitle: "Ни фраза, ни предложение не пишутся заглавными",
  text: "=6.11",
  reason: "Set in capitals, a phrase reads as more binding than the words around it, although every word of a rule binds alike. A reader who meets capitals on every line starts reading the capitals instead of the sentence.\n\nA word or two in capitals are most often an abbreviation or a name keeping its own spelling, which no check tells from a word stressed. So they are left alone. Three words running are seldom anything but stress. A run of abbreviations as long is rare enough to be worded around.",
  ruText: "Узел пишется в обычном регистре своего языка. Имя, процитированное из кода, сохраняет своё написание.\n\nВне такого имени заглавными могут стоять одно слово или два подряд (REST API). Фраза или предложение, три слова подряд и больше, заглавными никогда не пишутся. То, что должно выделяться, говорится словами.",
  ruReason: "Написанная заглавными фраза читается как более обязательная, чем слова вокруг, хотя каждое слово правила обязывает одинаково. Читатель, встречающий заглавные в каждой строке, начинает читать заглавные, а не предложение.\n\nОдно-два слова заглавными — чаще всего сокращение или имя со своим написанием, и никакая проверка не отличит их от выделенного слова. Поэтому их не трогают. Три слова подряд — редко что-то иное, кроме выделения. Ряд сокращений такой длины встречается настолько редко, что его можно переформулировать.",
  changes: [
    "Заголовок и текст нынешнего 6.11, дословно.",
    "Из обоснования убран абзац о том, что стиль распространяется подражанием: он не обосновывает текст.",
    "Сохраняет sid 6.11.",
  ],
  sidValue: "s-m6upmfq64kw5h4r",
};
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log("7.11 done");
