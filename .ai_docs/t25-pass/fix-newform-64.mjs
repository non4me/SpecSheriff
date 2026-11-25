// Node 4.4, present 1.20: "the default implementation" becomes the implementation, instances having left the rules (the
// owner's rulings of 2026-11-09), in the reviewed wording.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const spec = JSON.parse(fs.readFileSync(new URL("../../specs/_guidelines/spec.json", here), "utf8"));
let p;
(function walk(ns) { for (const n of ns) { if (n.location === "_guidelines/spec/1.20") p = n; if (n.children) walk(n.children); } })(spec.nodes);

const swap = (s, from, to) => {
  if (!s.includes(from)) throw new Error("not found: " + from);
  return s.replace(from, to);
};
let text = swap(p.text, "one problem of the default implementation as it stands", "one problem of the system's implementation as it stands");
text = swap(text, "the nodes the default implementation falls short of", "the nodes the implementation falls short of");
text = swap(text, "a technology the default implementation uses", "a technology the implementation uses");
const reason = swap(p.reason, "a problem tells whoever repeats an instance, or reads those nodes, what the implementation does not do.", "a problem tells whoever reads those nodes what the implementation does not do.");

d["4.4"] = {
  from: "1.20", sid: "kept",
  title: "The technical debt holds the problems set aside in the system's implementation",
  text, reason,
  ruTitle: "Технический долг содержит отложенные проблемы реализации системы",
  ruText: "Раздел технического долга содержит только правила. Каждое из них описывает одну проблему реализации системы такой, какая она есть. Каждое уточняет узлы, которым реализация в этом месте не соответствует, хотя бы один из них — узел базовой спецификации. Если проблема кроется в технологии, которую использует реализация, правило называет версию этой технологии, в которой проблема замечена.\n\nНахождение там и есть весь выбор отложить проблему:\n\n- у её правила нет обоснования;\n- решение об этом выборе нигде не записывается;\n- изменение, которое решает проблему, удаляет правило.",
  ruReason: "Отложенной проблеме нужно место, где она записана, иначе о ней забудут или будут держать как задачу, которую никто не собирается делать. Каждая проблема там находится по одной причине: ответственные за спецификацию сочли, что сейчас решать её не стоит. Поэтому собственное обоснование или решение только повторяло бы сам факт её нахождения там.\n\nОписанная такой, какая она есть, и связанная с узлами, которых касается, проблема говорит тому, кто читает эти узлы, чего реализация не делает. Оставшись после решения, она описывала бы недостаток, которого больше нет.\n\nПроблема в технологии может быть решена её более поздней версией, хотя здесь ничего не меняется. Версия, в которой проблема замечена, позволяет читателю это понять.",
  changes: ["«Реализация по умолчанию» стала просто реализацией: инстансов в правилах больше нет. В обосновании убрано «тому, кто повторяет инстанс». Формулировка прошла рецензента."],
  sidValue: p.sid,
};
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log(d["4.4"].title);
console.log(text);
console.log("---");
console.log(reason);
