// The owner's ruling of 2026-11-07: 1.1.2 names the three parts and 1.1.3–1.1.5 unfold them one by
// one. 1.1.3 keeps of the present 1.13 only what 1.1.2 does not already say; a new 1.1.5 takes from
// the present 1.19 its first two sentences and the paragraph of its reason that grounds them,
// verbatim, out of 4.1 and 4.2.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const path = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(path, "utf8"));
const spec = JSON.parse(fs.readFileSync(new URL("../../specs/_guidelines/spec.json", here), "utf8"));
const present = {};
(function walk(ns) {
  for (const n of ns) {
    present[n.location.replace("_guidelines/spec/", "")] = n;
    if (n.children) walk(n.children);
  }
})(spec.nodes);
const rep = (s, a, b) => {
  if (!s.includes(a)) throw new Error(`not found: ${a}`);
  return s.replace(a, b);
};
const p19 = present["1.19"];
const p19first = p19.text.split("\n\n")[0].split(/(?<=\.) (?=[A-Z])/);
const p19r4 = p19.reason.split("\n\n")[3];

// 1.1.3
const g = d["1.1.3"];
if (g.from !== "1.13") throw new Error("1.1.3 is not the present 1.13");
g.text = rep(present["1.13"].text.split("\n\n").slice(1).join("\n\n"), "- tries to govern anything else;", "- tries to govern anything but how the specification is kept, changed and implemented;");
g.ruText = "Правило отбрасывается, если оно:\n\n- пытается регулировать что-либо, кроме того, как спецификация ведётся, меняется и реализуется;\n- утверждает очевидное.";
g.changes = [
  "Заголовок — по вашему комментарию: речь здесь не о всей спецификации, а только о guidelines.",
  "Стоит перед узлом о базе, по вашему комментарию: 1.1.2 называет три части, а 1.1.3–1.1.5 раскрывают их по одной.",
  "Текст — абзац 2 нынешнего 1.13. Абзац 1 убран: что guidelines регулируют только то, как ведётся спецификация, уже говорит 1.1.2, а что спецификация описывает систему, — 1.1.4 и 1.1.5. Поэтому «anything else» в первом пункте раскрыто: «anything but how the specification is kept, changed and implemented».",
  "Обоснование — нынешнее 1.13, дословно.",
];

// 1.1.5
d["1.1.5"] = {
  from: "1.19", sid: "new",
  title: "The technical appendix states how the system is built",
  text: p19first.slice(0, 2).join(" "),
  reason: p19r4,
  ruTitle: "Техническое приложение говорит, как построена система",
  ruText: "Техническое приложение описывает, как этот репозиторий строит систему: её стек, как построен каждый домен и как выглядит пользовательский интерфейс. Оно описывает это так подробно, как нужно инстансу, чтобы это повторить.",
  ruReason: "У того, как выполняется правило, нет другого места, потому что база не называет технологий. Если бы это было описано менее точно, выбор оставался бы тому, кто реализует правило. Тогда этот выбор держал бы код, а не спецификация.",
  changes: [
    "Новый узел, по вашему комментарию: 1.1.2 называет три части, а 1.1.3–1.1.5 раскрывают их по одной.",
    "Заголовок новый, по образцу 1.1.4.",
    "Текст — первые две фразы абзаца 1 нынешнего 1.19, дословно. Они уходят сюда из 4.1.",
    "Обоснование — абзац 4 нынешнего обоснования 1.19, дословно. Его первая фраза уходит сюда из 4.1, две другие — из 4.2.",
    "Новый sid.",
  ],
};

// 4.1
const a = d["4.1"];
const [p1, p2, p3] = p19.text.split("\n\n");
a.text = [rep(p2, "The appendix is no domain", "The technical appendix is no domain"), p3, p19first[2]].join("\n\n");
a.ruText = "Техническое приложение — не домен и не стоит ни на каком уровне. Оно стоит рядом с доменами, как contracts. Оно содержит:\n\n- раздел для каждого домена, который оно реализует, под именем этого домена;\n- раздел стека;\n- пока какая-либо проблема отложена, раздел её технического долга (§s-2r7k2aeyusgy6fw).\n\nВсякая часть, кроме приложения и guidelines, — базовая спецификация.";
a.reason = rep(a.reason, p19r4.split(/(?<=\.) (?=[A-Z])/)[0] + "\n\n", "");
a.ruReason = rep(a.ruReason, "У того, как выполняется правило, нет другого места, потому что база не называет технологий.\n\n", "");
a.changes[1] = "Текст — абзацы 1–2 нынешнего 1.19, кроме первых двух фраз абзаца 1: они уходят в 1.1.5. Оставшаяся фраза абзаца 1 стоит теперь после абзаца 2, а «The appendix» в начале абзаца 2 стало «The technical appendix»: здесь приложение названо впервые.";
a.changes[2] = "Обоснование — абзац 5 без второй фразы и абзац 6 нынешнего обоснования, дословно. Абзац 4 уходит в 1.1.5, вторая фраза абзаца 5 — в 4.2, абзацы 1 и 7 — в 4.3.";

// 4.2
const b = d["4.2"];
b.reason = rep(b.reason, "Described less exactly, how a rule is carried out would leave a choice to whoever implements it. The code would then hold that choice, and the specification would not.\n\n", "");
b.ruReason = rep(b.ruReason, "Если бы то, как выполняется правило, было описано менее точно, выбор оставался бы тому, кто его реализует. Тогда этот выбор держал бы код, а не спецификация.\n\n", "");
b.changes[2] = "Обоснование — абзацы 2–3 и вторая фраза абзаца 5 нынешнего обоснования, дословно. Абзац 4 уходит в 1.1.5: он обосновывает то, как подробно приложение описывает реализацию.";

// Key order: 1.1.5 after 1.1.4.
const out = {};
for (const [k, v] of Object.entries(d)) {
  if (k === "1.1.5") continue;
  out[k] = v;
  if (k === "1.1.4") out["1.1.5"] = d["1.1.5"];
}
fs.writeFileSync(path, JSON.stringify(out, null, 2) + "\n");

// The page: a row for 1.1.5 after 1.1.4.
const page = new URL("base-structure.html", here);
const lines = fs.readFileSync(page, "utf8").split("\n");
if (!lines.some(l => l.trim().startsWith('["1.1.5",'))) {
  const i = lines.findIndex(l => l.trim().startsWith('["1.1.4",'));
  const indent = lines[i].slice(0, lines[i].indexOf("["));
  const row = ["1.1.5", "part", 1, "1.19", "part of 1.19: The technical appendix stands beside the base specification", "уходит сюда: Техническое приложение говорит, как построена система", "", "Новый узел по вашему комментарию: три части раскрываются по одной.", ["4.1", "4.2", "4.3"], ""];
  lines.splice(i + 1, 0, indent + JSON.stringify(row) + ",");
  fs.writeFileSync(page, lines.join("\n"));
}
console.log("1.1.3:", g.text.replace(/\n/g, " / "), "\n1.1.5:", d["1.1.5"].text, "\n4.1:", a.text.slice(0, 80));
