// The owner's comment of 2026-11-07 on 1.1.5: the selected "Техническое приложение описывает, как
// этот репозиторий строит систему" gives way to the owner's words, word for word: "Техническое
// приложение описывает, как базовые правила должны быть реализованы. А также содержит все
// необходимые технические подробности:..." — the list after the colon going on as it stands. With
// the system no longer named before it, "её стек" becomes "стек системы". The title follows the text.
import fs from "node:fs";

const path = new URL("newform.json", import.meta.url);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const n = d["1.1.5"];
if (n.from !== "1.19") throw new Error("1.1.5 is not from 1.19");
// The owner's comment of 23:57 on the title: "of the base specification" goes.
n.title = "The technical appendix describes how the rules are implemented";
n.ruTitle = "Техническое приложение описывает, как реализуются правила";
// And the owner's comment of 22:59: "как нужно инстансу, чтобы это повторить" -> "как нужно агенту,
// что[бы] это реализовать".
n.text = "The technical appendix describes how the rules of the base specification are to be implemented. It also holds all the technical detail needed: the system's stack, how each domain is built and how the user interface looks. It describes them in the detail an agent needs to implement them.";
n.ruText = "Техническое приложение описывает, как базовые правила должны быть реализованы. А также содержит все необходимые технические подробности: стек системы, как построен каждый домен и как выглядит пользовательский интерфейс. Оно описывает это так подробно, как нужно агенту, чтобы это реализовать.";
n.changes = [
  "Новый узел, по вашему комментарию: 1.1.2 называет три части, а 1.1.3–1.1.5 раскрывают их по одной.",
  "Заголовок новый, вслед за текстом.",
  "Текст: начало первой фразы нынешнего 1.19 заменено вашей формулировкой, дословно. После двоеточия — перечень нынешнего 1.19; «её стек» стало «стек системы», потому что система перед ним больше не названа. Последняя фраза — нынешнего 1.19, кроме конца: «как нужно инстансу, чтобы это повторить» — ваша правка «как нужно агенту, чтобы это реализовать». Обе фразы уходят сюда из 4.1.",
  "Обоснование — абзац 4 нынешнего обоснования 1.19, дословно. Его первая фраза уходит сюда из 4.1, две другие — из 4.2.",
  "Новый sid.",
];
fs.writeFileSync(path, JSON.stringify(d, null, 2) + "\n");
console.log(n.ruText);
