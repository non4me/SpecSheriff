// Node 7.3.2, agreed on 2026-11-16: a proposal that writes into its text the owner's ruling of 2026-11-15, which so far
// only the wording checker held: a sentence that states one relation between two facts states one thought; two facts
// side by side with no relation, or two relations, are two thoughts. The agreed sentence "Where one part of a sentence
// could be true while another is not, the parts are two thoughts" contradicts that ruling, since in "X, so Y" each
// part could be true or false on its own, so the ruling replaces it. The reason does not change. The owner agreed to
// take up this node on 2026-11-16 («да только эти три»). The temporary key "7.3.2~" holds the wording for the checker.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
fs.copyFileSync(file, new URL("newform.before-396.json", import.meta.url));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["7.3.2"];
const text = [
  "Each sentence of a node states one thought: a statement that can be agreed with or disputed on its own.",
  "A sentence that states one relation between two facts states one thought, even though each fact could be disputed on its own. Such a relation is, for example:\n- a cause and its effect: \"X, so Y\";\n- a contrast: \"X, but Y\";\n- a condition: \"if X, Y\".",
  "A sentence that sets two facts side by side with no relation between them, or that states two relations, states two thoughts.",
].join("\n\n");
const ruText = [
  "Каждое предложение узла утверждает одну мысль: утверждение, с которым можно согласиться или поспорить отдельно.",
  "Предложение, которое утверждает одно отношение между двумя фактами, утверждает одну мысль, хотя с каждым фактом можно поспорить отдельно. Такое отношение — например:\n- причина и её следствие: «X, поэтому Y»;\n- противопоставление: «X, но Y»;\n- условие: «если X, то Y».",
  "Предложение, которое ставит рядом два факта без отношения между ними или утверждает два отношения, утверждает две мысли.",
].join("\n\n");
n.proposals = [
  {
    where: "текст",
    en: [`Title: ${n.title}`, "", `Text: ${text}`, "", `Reason: ${n.reason}`].join("\n"),
    ru: [`Заголовок: ${n.ruTitle}`, "", `Текст: ${ruText}`, "", `Обоснование: ${n.ruReason}`].join("\n"),
    why: "Второе предложение. Было: «Если одна часть предложения может быть верной, а другая нет, это две мысли». Стало: два абзаца с вашим решением от 15 ноября — одно отношение между двумя фактами (причина и следствие, противопоставление, условие) — одна мысль; два факта рядом без отношения или два отношения — две мысли. Прежнее предложение противоречило решению: в «X, поэтому Y» каждая часть может быть верной или нет отдельно. До сих пор это решение знал только проверяющий формулировок, а пишущий спецификацию в другом проекте о нём не узнал бы. Слово «отношение», а не «связь», потому что «связь» — ваше слово для ссылки между узлами. Первое предложение и обоснование не меняются.",
  },
];
d["7.3.2~"] = { ...n, text, ruText };
delete d["7.3.2~"].proposals;
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
