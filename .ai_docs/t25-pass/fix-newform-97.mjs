// The reviewer's report on the present 6.8, now 7.10: "the set" and "the model" carried no object; the reason is shortened.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
if (d["7.10"]) throw new Error("7.10 already has a draft");
d["7.10"] = {
  from: "6.8", sid: "kept",
  title: "=6.8",
  ruTitle: "Никаких количеств в тексте",
  text: "A node states no count of what the specification or a registry holds — of nodes, of states, of members, of commands. A sentence correcting a count is a count.\n\nWhere the number matters, whatever holds those things produces it. So not “contracts holds 45 nodes”, which was true for one day, but the figure counted off the specification's nodes each time it is shown.",
  reason: "A count is a second copy of a fact. It goes stale silently, because a number that is merely out of date looks exactly like a number that is right.",
  ruText: "Узел не называет количество того, что содержит спецификация или реестр: узлов, состояний, участников списка, команд. Предложение, исправляющее количество, тоже называет количество.\n\nГде число важно, его выдаёт то, что эти вещи хранит. Поэтому не «в contracts 45 узлов», что было верно один день, а число, подсчитанное по узлам спецификации каждый раз, когда его показывают.",
  ruReason: "Количество — это вторая копия факта. Она устаревает незаметно, потому что просто устаревшее число выглядит точно так же, как верное.",
  changes: [
    "Заголовок и первый абзац нынешнего 6.8, дословно.",
    "Второй абзац: вместо «the set» и «the model», у которых не было объекта, сказано, что именно хранит вещи и по чему считают.",
    "Обоснование сокращено, мысль та же.",
    "Сохраняет sid 6.8.",
  ],
  sidValue: "s-xtqebaxjrqjsjwn",
};
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log("7.10 done");
