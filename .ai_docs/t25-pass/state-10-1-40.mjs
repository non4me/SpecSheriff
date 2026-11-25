// Records in the queue outline the state reached once the reconciliation of 10.1 began:
// the order of the remaining steps decided, and the reason of row 10.1.40 put to the owner.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const path = new URL("queue-outline.md", here);
let o = fs.readFileSync(path, "utf8");

const swap = (from, to) => {
  if (!o.includes(from)) throw new Error("not found: " + from.slice(0, 60));
  o = o.replace(from, to);
};

swap(
  "### ● следующая сессия: шаг правки инструментов SpecSheriff\n- первый вопрос — порядок оставшихся шагов; рекомендую сначала перенести черновики в файлы спецификации\n",
  "### ● перенос черновиков в файлы спецификации\n- порядок решён: спецификация первой, затем описание инструментов, тесты, код, skills\n- ● сведение двух версий 10.1: остаётся шапка таблицы; абзацы прежнего обоснования — в обоснования проверок\n- ● сейчас: обоснование строки 10.1.40 (расхождение только сообщается)\n- ○ затем: обоснование строки 10.1.41 (несделанное одобренное правило)\n",
);
swap(
  "### ○ перенос черновиков в файлы спецификации, с `meta.decisions`; две версии 10.1 свести\n",
  "### ○ затем: черновики — в spec.json, с `meta.decisions`, схемой TableRule и RecordType\n",
);
swap(
  "## ◐ Ждёт вашего решения\n\n",
  "## ◐ Ждёт вашего решения\n\n### ◐ обоснование строки 10.1.40\n- перенесено дословно из прежнего обоснования 10.1, которое вы согласовали 17 ноября\n- изменена одна фраза: «эта проверка только сообщает о расхождении»\n\n",
);

fs.writeFileSync(path, o);
console.log("queue-outline.md updated");
