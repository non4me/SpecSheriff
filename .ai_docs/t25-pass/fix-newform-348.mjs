// Node 12.3.6, "Guaranteed fields": the owner rejected the closing sentence "A RecordType marks no other field as
// guaranteed" as stated from the opposite. The sentence is removed, and "only" in the first sentence makes the list of
// conditions the only cases in which a field is marked as guaranteed, as node 7.11 asks of a list where a case let in
// would go unnoticed. The conditions are no longer stated as sufficient, as in the current node 1.25, "only where".
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
fs.copyFileSync(file, new URL("newform.before-348.json", import.meta.url));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["12.3.6"];

const swap = (s, from, to) => {
  if (!s.includes(from)) throw new Error("not found: " + from);
  return s.replace(from, to);
};
n.text = swap(n.text, "marks a field as guaranteed where at least one", "marks a field as guaranteed only where at least one");
n.text = swap(n.text, "\n\nA RecordType marks no other field as guaranteed.", "");
n.ruText = swap(n.ruText, "гарантированное, если верно", "гарантированное, только если верно");
n.ruText = swap(n.ruText, "\n\nRecordType не отмечает как гарантированное никакое другое поле.", "");

const i = n.changes.findIndex((c) => c.startsWith("Первая фраза — ваша"));
if (i < 0) throw new Error("the item on the first sentence not found");
n.changes[i] = "Первая фраза — ваша, с «только»: «RecordType отмечает поле как гарантированное, только если верно хотя бы одно из следующего». Последняя фраза «RecordType не отмечает как гарантированное никакое другое поле» говорила от обратного и убрана: её смысл теперь передаёт «только». Убраны также определение через «значение есть в каждой записи данных» и оговорка «всякий раз, когда домен выдаёт или сохраняет такую запись данных». Каждое условие и так обеспечивает, что значение у поля есть всегда.";
const j = n.changes.findIndex((c) => c.startsWith("Виды негарантированных полей"));
if (j < 0) throw new Error("the item on the examples not found");
n.changes[j] = swap(n.changes[j], "последняя фраза текста и так охватывает их все", "«только» в первой фразе и так охватывает их все");

fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log(n.text + "\n\n" + n.ruText);
