// Node 7.2.3, agreed on 2026-11-16: a proposal of a new wording, from the wording checker's findings. "is always used"
// named nobody who uses the word, so the rule now requires a property of the word itself (node 7.2.1). "So a rule never
// names just …, but …" stated by negation what a rule does, and its Russian had no subject; the new sentence says what a
// rule says. A new last paragraph names the parts of a node the rule applies to, which leaves out the title, as the
// owner ruled on 2026-11-15; without it, node 7.1 makes the rule apply to the title too. In the reason, "the ambiguity"
// referred to nothing named in its paragraph, and the second sentence held three thoughts, its "general rule" reading
// as one more term. The temporary key "7.2.3~" holds the proposed wording for the checker.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
fs.copyFileSync(file, new URL("newform.before-380.json", import.meta.url));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["7.2.3"];
const text = [
  "A word of general meaning stands in the same phrase as what it applies to. For example, a rule says which record a structure describes, when a check is made and what it compares with what, and what a model represents.",
  "Where it can, a rule names the concrete thing it means rather than a general word for it.",
  "This applies to the node's text, reason, list members and table cells.",
].join("\n\n");
const ruText = [
  "Слово общего значения стоит в одной фразе с тем, к чему оно относится. Например, правило говорит, какую запись описывает структура, в какой момент выполняется проверка и что с чем она сравнивает, что представляет модель.",
  "Где можно, правило называет конкретную вещь, которую имеет в виду, а не общее слово для неё.",
  "Это относится к тексту, обоснованию, членам списка и ячейкам таблицы узла.",
].join("\n\n");
const reason = "A rule has no conversation around it to say what a general word applies to. Each reader decides for themselves what the word applies to, and the rule then binds each of them to a different meaning. Nothing in the word itself looks wrong, so each reader takes their own meaning to be the only one.";
const ruReason = "У правила нет разговора вокруг, который подсказал бы, к чему относится общее слово. Каждый читатель сам решает, к чему оно относится, и тогда правило обязывает каждого из них к своему смыслу. В самом слове ничего не выглядит неправильным, поэтому каждый читатель принимает свой смысл за единственный.";
const block = (lang) => {
  const L = lang === "en" ? ["Title", "Text", "Example", "Reason"] : ["Заголовок", "Текст", "Пример", "Обоснование"];
  const v = lang === "en" ? [n.title, text, n.examples[0], reason] : [n.ruTitle, ruText, n.ruExamples[0], ruReason];
  return L.map((l, i) => `${l}: ${v[i]}`).join("\n\n");
};
n.proposals = [
  {
    where: "текст и обоснование",
    en: block("en"),
    ru: block("ru"),
    why: [
      "Первое предложение. Было: «Слово с общим смыслом всегда употребляется в той же фразе вместе с тем, к чему оно относится». Стало: «Слово общего значения стоит в одной фразе с тем, к чему оно относится». «Употребляется» не называло, кто употребляет слово (узел 7.2.1); теперь правило требует свойства от самого слова, а «общего значения» совпадает с заголовком.",
      "Второе предложение. Было: «Поэтому никогда не просто структура, проверка или модель, а структура какой записи, проверка в какой момент и что с чем сравнивает, модель чего». Стало: «Например, правило говорит, какую запись описывает структура, в какой момент выполняется проверка и что с чем она сравнивает, что представляет модель». Прежнее говорило через отрицание, чего правило не делает, а в русском у него не было подлежащего.",
      "Новый последний абзац: «Это относится к тексту, обоснованию, членам списка и ячейкам таблицы узла». По вашему решению от 15 ноября правило не применяется к заголовку; без этого абзаца узел 7.1 распространяет правило и на заголовок. Формулировка та же, что в 7.2.7.",
      "Обоснование. Было: «У правила нет разговора вокруг, который подсказал бы, к чему относится общее слово. У общего правила контекста меньше всего, поэтому каждый читатель додумывает это сам, и правило обязывает к тому, что выбрал каждый из них. В самом слове ничего не выглядит неправильным, поэтому неоднозначность переживает любое прочтение». Стало: «У правила нет разговора вокруг, который подсказал бы, к чему относится общее слово. Каждый читатель сам решает, к чему оно относится, и тогда правило обязывает каждого из них к своему смыслу. В самом слове ничего не выглядит неправильным, поэтому каждый читатель принимает свой смысл за единственный». «Неоднозначность» ни на что названное в абзаце не указывала; второе предложение несло три мысли, а «общее правило» читалось как ещё один термин.",
    ].join(" "),
  },
];
d["7.2.3~"] = { ...n, text, ruText, reason, ruReason };
delete d["7.2.3~"].proposals;
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log(block("en"));
