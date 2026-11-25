// Node 12.3.6, "Guaranteed fields": the owner's own opening. The text now says at once when a RecordType marks a field
// as guaranteed. The sentence that defined the mark by "a value in every data record" and the lead-in "each time a domain
// outputs or stores such a data record" are gone: each condition already says that the value is always there. The
// conditions are now sufficient, and the closing sentence makes them the only ones. In English, the bullets say "a data
// record", since nothing before them names one any more.
import fs from "node:fs";

const file = new URL("newform.json", import.meta.url);
fs.copyFileSync(file, new URL("newform.before-347.json", import.meta.url));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["12.3.6"];

n.text = [
  "A RecordType marks a field as guaranteed where at least one of these holds:",
  "",
  "- the domain sets the field's value when it creates a data record and never removes that value;",
  "- the domain itself produces or observes the value whenever it outputs or stores a data record;",
  "- the domain outputs or stores a data record only once it has the value, such as an identifier from an external system.",
  "",
  "A RecordType marks no other field as guaranteed.",
].join("\n");
n.ruText = [
  "RecordType отмечает поле как гарантированное, если верно хотя бы одно из следующего:",
  "",
  "- домен задаёт значение, когда создаёт запись данных, и никогда его не удаляет;",
  "- домен сам формирует или наблюдает это значение всякий раз, когда выдаёт или сохраняет запись данных;",
  "- домен выдаёт или сохраняет запись данных, только когда это значение у него уже есть, например идентификатор от внешней системы.",
  "",
  "RecordType не отмечает как гарантированное никакое другое поле.",
].join("\n");

const lead = "Первая фраза — ваша: «RecordType отмечает поле как гарантированное, если верно хотя бы одно из следующего». Убраны определение через «значение есть в каждой записи данных» и оговорка «всякий раз, когда домен выдаёт или сохраняет такую запись данных». Каждое условие само говорит, что значение есть всегда: «никогда не удаляет», «всякий раз», «только когда значение уже есть». Условия теперь достаточны: если верно хотя бы одно, поле отмечается как гарантированное. Последняя фраза делает их единственными.";
const i = n.changes.findIndex((c) => c.startsWith("Перечень условий закрыт"));
if (i < 0) throw new Error("the item on the closed list not found");
n.changes.splice(i, 1);
n.changes.splice(1, 0, lead);
const j = n.changes.findIndex((c) => c.startsWith("«Записывает запись» заменено"));
if (j < 0) throw new Error("the item on outputs or stores not found");
n.changes[j] = "«Записывает запись» заменено на «выдаёт или сохраняет запись данных»: в эти же моменты запись проверяет RuntimeCheck по 12.3.4.";

fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log(n.text + "\n\n" + n.changes.join("\n"));
