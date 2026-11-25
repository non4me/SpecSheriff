// Finishes what agree-reindex-writes.mjs stopped short of, after its search for a sentence of INDEX.md failed: records
// that script in INDEX.md and updates the queue outline.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const swap = (s, from, to) => {
  if (!s.includes(from)) throw new Error(`not found: ${from.slice(0, 80)}`);
  return s.replace(from, to);
};
const now = new Date().toISOString().replace(/\.\d{3}Z$/, "Z");

const index = new URL("../INDEX.md", here);
let s = fs.readFileSync(index, "utf8");
s = s.replace(/^last_updated: .*$/m, `last_updated: ${now}`);
s = s.replace(/^\| t25-one-thought\.md \| [^|]+ \|/m, `| t25-one-thought.md | ${now} |`);
s = s.replace(/^\| t25-pass\/ \| [^|]+ \|/m, `| t25-pass/ | ${now} |`);
s = swap(s, "tools-drafts.before-agree-commands-list.json is tools-drafts.json as it was before that script ran.",
  "tools-drafts.before-agree-commands-list.json is tools-drafts.json as it was before that script ran. agree-reindex-writes.mjs records the owner's agreement to \"What `sheriff reindex` writes\", writes english-reindex-writes.md for EngStickler's reader, and corrects the English of the node that lists the commands; tools-drafts.before-agree-reindex-writes.json is tools-drafts.json as it was before that script ran, and agree-reindex-writes-b.mjs finishes the part of that script that stopped on a sentence of this index.");
fs.writeFileSync(index, s);

const outline = new URL("queue-outline.md", here);
let o = fs.readFileSync(outline, "utf8");
o = swap(o, "\n\n## ● В работе:", "\n\n### ✓ «Что пишет sheriff reindex» — согласован\n- sid, расположения, связи, списки meta.code и meta.tests, статусы разделов, оглавления, собранные значения\n\n## ● В работе:");
o = swap(o, "- ● «Что пишет sheriff reindex»: прошёл рецензента, показан вам",
  "- ✓ «Что пишет sheriff reindex» — согласован\n- ● «Что sheriff reindex меняет в записанном прежним выпуском»: показан вам с вопросом о четырёх случаях RecordType");
o = swap(o, "## ○ Затем:", "## ◐ Ждёт вашего решения\n\n### ◐ Четыре случая прежних RecordType без соответствия в JSON Schema\n- «обязательно, где есть значение» — переношу как необязательное свойство\n- variant, источник domains и пустой список — reindex называет, автор переписывает сам\n\n## ○ Затем:");
fs.writeFileSync(outline, o);
console.log(`updated at ${now}`);
