// Records row 12.12.8 and the new row after it as agreed, proposes row 12.12.9 as a positive statement, and writes the
// state reached into the continuation file, the queue outline and the index, with the corrections EngStickler's
// readers confirmed in batch 8.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const docs = "D:/SpecSheriff/.ai_docs/";
const fix = (s, pairs, where) => {
  for (const [a, b] of pairs) {
    if (!s.includes(a)) throw new Error(`${where}: missing ${a.slice(0, 70)}`);
    s = s.split(a).join(b);
  }
  return s;
};

const file = new URL("table-12-12.json", here);
const t = JSON.parse(fs.readFileSync(file, "utf8"));
const rows = t.tables[0].rows;
for (const r of rows.filter((x) => x.num === "12.12.8" || x.n === 30.5)) {
  const p = r.proposals[0];
  r.en = p.en.replace("names values only of the fields", "names values only for the fields");
  r.ru = p.ru;
  delete r.proposals;
  r.agreed = "2026-11-19";
  r.change += " Вы согласовали её 19 ноября («ок»).";
}
const r9 = rows.find((x) => x.num === "12.12.9");
r9.impl = ["s-c2r9jndrjbtbsv6"];
r9.about = "Затрагивает каждый RecordType, у которого есть варианты. Если двум вариантам соответствует одно сочетание значений, запись получает поля обоих, а в JSON Schema сработали бы сразу две пары `if`/`then`.";
r9.proposals = [{
  en: "The variants of one RecordType correspond to different combinations of values",
  ru: "Варианты одного RecordType соответствуют разным сочетаниям значений",
  why: "Утверждение вместо отрицания, по вашему правилу «правило говорит, что верно». «Отвечают на значения» заменено на «соответствуют сочетаниям значений», как в 12.6: каждое сочетание значений выбирающих полей имеет свой вариант.",
}];
fs.writeFileSync(file, JSON.stringify(t, null, 2) + "\n");

const cont = docs + "t25-one-thought.md";
let s = fs.readFileSync(cont, "utf8");
const start = s.indexOf("**Now (2026-11-19, 14:30 UTC):**");
const end = s.indexOf("\n\nThe owner ruled that everything about RecordType", start);
if (start < 0 || end < 0) throw new Error("markers not found");
s = s.slice(0, start) + [
  "**Now (2026-11-19, 14:35 UTC):** row 12.12.9 is being presented to the owner.",
  "Its proposed wording is \"The variants of one RecordType correspond to different combinations of values\" («Варианты одного RecordType соответствуют разным сочетаниям значений»), a positive statement in place of the approved negative one.",
  "On 2026-11-19 the owner agreed to rows 12.12.5, 12.12.6 and 12.12.8, and to a new row after 12.12.8.",
  "Row 12.12.8 was split in two, as one approved row was earlier split into rows 12.12.2 and 12.12.3.",
  "Row 12.12.8 now says that a RecordType variant names values only for the fields that select a variant of its RecordType, one value for each of them.",
  "The new row after it says that each value that a RecordType variant names for a field is in the `enum` of that field.",
].join(" ") + s.slice(end);
s = fix(s, [["Rows 12.12.9 to 12.12.16 come after 12.12.8 and are agreed one at a time.", "Rows 12.12.10 to 12.12.16 come after 12.12.9 and are agreed one at a time."]], "continuation");
fs.writeFileSync(cont, s);

const outFile = docs + "t25-pass/queue-outline.md";
let o = fs.readFileSync(outFile, "utf8");
o = fix(o, [
  ["- ● 12.12.8: делится на две строки — значения только выбирающих полей; каждое значение есть в `enum` поля\n- ○ 12.12.9: никакие два варианта не соответствуют одним и тем же значениям\n", "- ✓ 12.12.8 и новая строка после неё: значения только выбирающих полей; каждое значение есть в `enum` поля\n- ● 12.12.9: варианты одного RecordType соответствуют разным сочетаниям значений\n"],
  ["### ◐ строка 12.12.8 — спрашиваю сейчас\n- одобренная: два требования в одной строке\n- предлагаю две строки: значения только выбирающих полей, по одному на поле; каждое значение есть в `enum` поля\n", "### ◐ строка 12.12.9 — спрашиваю сейчас\n- одобренная: «Никакие два варианта одного RecordType не отвечают на одни и те же значения»\n- предлагаю: «Варианты одного RecordType соответствуют разным сочетаниям значений»\n"],
], "outline");
fs.writeFileSync(outFile, o);

const idxFile = docs + "INDEX.md";
let x = fs.readFileSync(idxFile, "utf8");
const ts = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
x = x.replace(/^last_updated: .*$/m, `last_updated: ${ts}`);
x = x.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${ts} |`);
x = x.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${ts} |`);
x = fix(x, [[
  "step-12-12-6.mjs and state-12-12-8.mjs write into the continuation file, the queue outline and this index the state reached once rows 12.12.5 and 12.12.6 were agreed.",
  "step-12-12-6.mjs and state-12-12-8.mjs record, in the continuation file, the queue outline and this index, the state reached once rows 12.12.5 and 12.12.6 were agreed. step-12-12-9.mjs records row 12.12.8 and the new row after it as agreed and proposes a positive wording for row 12.12.9.",
]], "index");
fs.writeFileSync(idxFile, x);
console.log("ok", ts);
