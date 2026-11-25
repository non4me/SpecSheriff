// Teaches the review page to show a draft's examples (node 7.16, the owner's ruling of 2026-11-11): apply-newform.mjs
// passes `examples` and `ruExamples`, and the page draws them under the reason, English beside Russian.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const builder = new URL("apply-newform.mjs", here);
let b = fs.readFileSync(builder, "utf8");
const passFrom = "    ruReason: resolve(d.ruReason, \"reason\", \"ru\"),\n";
if (!b.includes("examples: d.examples")) {
  if (b.split(passFrom).length !== 2) throw new Error("builder anchor");
  b = b.replace(passFrom, passFrom + "    examples: d.examples,\n    ruExamples: d.ruExamples,\n");
  fs.writeFileSync(builder, b);
}

const pagePath = new URL("base-structure.html", here);
let p = fs.readFileSync(pagePath, "utf8");
const drawFrom = "        const ch = el(\"ul\", \"changes\");\n        for (const c of dr.changes) ch.append(el(\"li\", \"\", c));\n        body.append(grid, rg, el(\"span\", \"full-h\", \"что изменилось против нынешнего узла\"), ch);";
const drawTo = "        const ch = el(\"ul\", \"changes\");\n        for (const c of dr.changes) ch.append(el(\"li\", \"\", c));\n        // A draft's examples, where it has any, under its reason (node 7.16).\n        const eg = el(\"div\", \"full-grid\");\n        if (dr.examples && dr.examples.length) for (const [lang, xs] of [[\"EN\", dr.examples], [\"RU\", dr.ruExamples || []]]) {\n          const col = el(\"div\", \"full-col\");\n          col.append(el(\"span\", \"full-h\", lang + \" · examples\"));\n          for (const x of xs) col.append(cited(\"full-tx\", x));\n          eg.append(col);\n        }\n        body.append(grid, rg, eg, el(\"span\", \"full-h\", \"что изменилось против нынешнего узла\"), ch);";
if (!p.includes("A draft's examples")) {
  if (p.split(drawFrom).length !== 2) throw new Error("page anchor");
  p = p.replace(drawFrom, drawTo);
  fs.writeFileSync(pagePath, p);
}
console.log("ok");
