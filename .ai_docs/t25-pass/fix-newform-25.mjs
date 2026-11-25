// The owner's ruling of 2026-11-08 at the showing of 1.1.6: the node is titled "The owners", and in
// Russian "owner" is rendered «ответственный». The English of every node stays as it is. Each pair
// below holds Cyrillic context, so no English sentence quoted on the page is touched.
import fs from "node:fs";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const here = new URL(".", import.meta.url);
const pairs = [
  ["уходит сюда: Owners спецификации, домена или раздела", "уходит сюда: Ответственные"],
  ["У спецификации есть owners, один или несколько", "У спецификации есть ответственные, один или несколько"],
  ["могут быть свои owners", "могут быть свои ответственные"],
  ["они заменяют owners уровнем выше", "они заменяют ответственных уровнем выше"],
  ["Узел одобряют только его owners", "Узел одобряют только его ответственные"],
  ["работающий на одного из owners узла", "работающий на одного из ответственных за узел"],
  ["не входит в owners узла", "не входит в число ответственных за узел"],
  ["сверяют с owners узла", "сверяют с ответственными за узел"],
  ["один из owners узла", "один из ответственных за узел"],
  ["один из его owners", "один из его ответственных"],
  ["ни один из owners", "ни один из ответственных"],
  ["от имени этого owner", "от имени этого ответственного"],
  ["от имени owner", "от имени ответственного"],
  ["этому owner", "этому ответственному"],
  ["Owner может его отозвать", "Ответственный может его отозвать"],
  ["с чем его owners не согласились", "с чем его ответственные не согласились"],
  ["внимание owners", "внимание ответственных"],
  ["работающий на owner", "работающий на ответственного"],
  ["сообщает owner о", "сообщает ответственному о"],
  ["позволяет owner увидеть", "позволяет ответственному увидеть"],
  ["таким, owner может", "таким, ответственный может"],
  ["сделанное самим owner", "сделанное самим ответственным"],
  ["того, кто его owners;", "того, кто его ответственные;"],
  ["своим owners", "своим ответственным"],
  ["Смена owners", "Смена ответственных"],
  ["Уход owner", "Уход ответственного"],
  ["одобрял owner", "одобрял ответственный"],
  ["дожидаясь его owners", "дожидаясь его ответственных"],
  ["говорит owners, кого", "говорит ответственным, кого"],
  ["выбор owners спецификации", "выбор ответственных за спецификацию"],
  ["например owners спецификации", "например ответственные за спецификацию"],
  ["- его owners, если он их называет", "- его ответственные, если он их называет"],
  ["которые owners спецификации", "которые ответственные за спецификацию"],
  ["без ведома её owners", "без ведома её ответственных"],
  ["Owners доменов и разделов", "Ответственные за домены и разделы"],
  ["Owners одной части", "Ответственные за одну часть"],
  ["Owners — те, кто", "Ответственные — те, кто"],
  ["решение её owners", "решение её ответственных"],
  ["«кто такие owners»", "«кто такие ответственные»"],
  ["Ссылка об owners домена", "Ссылка об ответственных за домен"],
  ["указывают owners домена", "указывают «ответственные за домен»"],
  ["понятие owner вводится", "понятие ответственного вводится"],
];
const used = new Map(pairs.map(([a]) => [a, 0]));
const swap = s => {
  for (const [a, b] of pairs) {
    const n = s.split(a).length - 1;
    if (n) { used.set(a, used.get(a) + n); s = s.split(a).join(b); }
  }
  return s;
};

// The drafts: 1.1.6 written whole, then the term throughout.
const file = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["1.1.6"];
n.title = "The owners";
n.ruTitle = "Ответственные";
n.ruText = "Вся спецификация должна иметь ответственного за одобрение её узлов. Для каждой части может быть назначен свой ответственный. Ответственных может быть несколько. Для каждого узла внутри части её ответственные заменяют ответственных уровнем выше.";
n.changes = [
  "Заголовок — ваш: The owners, по-русски «Ответственные».",
  "Перенесён из раздела 9 (был 9.4) по вашему решению: понятие ответственного вводится до первого использования.",
  "Текст: первые три фразы ваши. Они заменили «The specification has owners, one or several. A domain or a section may have owners of its own». Четвёртая — прежняя третья фраза 9.4: «They» стало «A part's owners», потому что перед ней теперь другая фраза.",
  "В ваших фразах: союз «и» заменён точкой, «за аппрув» стало «за одобрение её узлов». По-английски слово — owner.",
  "Обоснование — прежнее 9.4, дословно, и вторая фраза «A node is implemented only once it is approved»: основание для «must have».",
  "Ссылка на заголовок домена убрана: слова domain в тексте больше нет.",
];
for (const v of Object.values(d)) {
  for (const f of ["ruTitle", "ruText", "ruReason"]) if (typeof v[f] === "string") v[f] = swap(v[f]);
  v.changes = v.changes.map(swap);
}
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");

// The faithful Russian of the present nodes.
const fr = new URL("full-ru.json", here);
const ru = JSON.parse(fs.readFileSync(fr, "utf8"));
for (const v of Object.values(ru)) for (const f of Object.keys(v)) if (typeof v[f] === "string") v[f] = swap(v[f]);
fs.writeFileSync(fr, JSON.stringify(ru, null, 2) + "\n");

// The page: its rows and the folded present nodes; the drafts are put on it by apply-newform.mjs.
const page = new URL("base-structure.html", here);
fs.writeFileSync(page, swap(fs.readFileSync(page, "utf8")));
execFileSync(process.execPath, [fileURLToPath(new URL("apply-newform.mjs", here))], { stdio: "ignore" });

const unused = [...used].filter(([, c]) => !c).map(([a]) => a);
if (unused.length) throw new Error("no match for: " + unused.join(" | "));
console.log("replaced:", [...used.values()].reduce((a, b) => a + b, 0));
