// Node 7.2.3, the proposal of fix-newform-380.mjs and fix-newform-381.mjs, after specsheriff-rule-reviewer. "For
// example" had turned the agreed requirement into an illustration and dropped its condition, so the sentence again
// requires what a rule that names a structure, a check or a model also says. "wherever it can" did not say when a rule
// cannot name the thing; the paragraph now states the condition the checker's ruling on 7.2.3 uses: a rule that means a
// particular thing names it. In the reason, "what the word applies to" repeated the first sentence, and the Russian
// «к своему смыслу» pointed grammatically at the rule.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
fs.copyFileSync(file, new URL("newform.before-382.json", import.meta.url));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["7.2.3"];
const text = [
  "A word of general meaning stands in the same phrase as what it applies to. So a rule that names a structure, a check or a model also says:\n- which record the structure describes;\n- when the check is made and what it compares with what;\n- what the model represents.",
  "Where a rule means a particular thing, it names that thing rather than a general word for it.",
  "This rule applies to a node's text, reason, list members and table cells.",
].join("\n\n");
const ruText = [
  "Слово общего значения стоит в одной фразе с тем, к чему оно относится. Поэтому правило, которое называет структуру, проверку или модель, говорит также:\n- какую запись описывает структура;\n- в какой момент выполняется проверка и что с чем она сравнивает;\n- что представляет модель.",
  "Где правило имеет в виду конкретную вещь, оно называет эту вещь, а не общее слово для неё.",
  "Это правило распространяется на текст, обоснование, члены списка и ячейки таблицы узла.",
].join("\n\n");
const reason = "A rule has no conversation around it to say what a general word applies to. Each reader decides this for themselves, and the rule then binds each of them to a meaning of their own. Nothing in the word itself looks wrong, so each reader takes their own meaning to be the only one.";
const ruReason = "У правила нет разговора вокруг, который подсказал бы, к чему относится общее слово. Каждый читатель решает это сам, и тогда правило обязывает каждого из них к тому смыслу, который он выбрал. В самом слове ничего не выглядит неправильным, поэтому каждый читатель принимает свой смысл за единственный.";
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
      "Второе предложение. Было: «Поэтому никогда не просто структура, проверка или модель, а структура какой записи, проверка в какой момент и что с чем сравнивает, модель чего». Стало: «Поэтому правило, которое называет структуру, проверку или модель, говорит также:» и дальше списком: какую запись описывает структура; в какой момент выполняется проверка и что с чем она сравнивает; что представляет модель. Прежнее говорило через отрицание, чего правило не делает, а в русском у него не было подлежащего.",
      "Второй абзац. Было: «Где можно, правило называет конкретную вещь, которую имеет в виду, а не общее слово для неё». Стало: «Где правило имеет в виду конкретную вещь, оно называет эту вещь, а не общее слово для неё». «Где можно» не говорило, когда правило не может назвать вещь; теперь условие названо: правило имеет в виду конкретную вещь. Это же условие проверяющий формулировок уже применяет к 7.2.3: общее слово в утверждении, сказанном в общем виде, правило не нарушает.",
      "Новый последний абзац: «Это правило распространяется на текст, обоснование, члены списка и ячейки таблицы узла». По вашему решению от 15 ноября правило не применяется к заголовку; без этого абзаца узел 7.1 распространяет правило и на заголовок. Слова те же, что в 7.1.",
      "Обоснование. Было: «У правила нет разговора вокруг, который подсказал бы, к чему относится общее слово. У общего правила контекста меньше всего, поэтому каждый читатель додумывает это сам, и правило обязывает к тому, что выбрал каждый из них. В самом слове ничего не выглядит неправильным, поэтому неоднозначность переживает любое прочтение». Стало: «У правила нет разговора вокруг, который подсказал бы, к чему относится общее слово. Каждый читатель решает это сам, и тогда правило обязывает каждого из них к тому смыслу, который он выбрал. В самом слове ничего не выглядит неправильным, поэтому каждый читатель принимает свой смысл за единственный». «Неоднозначность» ни на что названное в абзаце не указывала; второе предложение несло три мысли, а «общее правило» читалось как ещё один термин.",
    ].join(" "),
  },
];
d["7.2.3~"] = { ...n, text, ruText, reason, ruReason };
delete d["7.2.3~"].proposals;
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log(block("en"));
