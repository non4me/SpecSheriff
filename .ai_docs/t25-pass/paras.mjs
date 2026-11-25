// Prints the paragraphs of the present nodes named on the command line, numbered as fix-newform-3.mjs
// counts them (split on a blank line), each cut to its first words.
import fs from "node:fs";

const spec = JSON.parse(fs.readFileSync(new URL("../../specs/_guidelines/spec.json", import.meta.url), "utf8"));
const present = {};
(function walk(ns) {
  for (const n of ns) {
    present[n.location.replace("_guidelines/spec/", "")] = n;
    if (n.children) walk(n.children);
  }
})(spec.nodes);
for (const l of process.argv.slice(2)) {
  for (const f of ["text", "reason"]) {
    present[l][f].split("\n\n").forEach((p, i) => console.log(`${l} ${f} ${i + 1}: ${p.slice(0, 70).replace(/\n/g, " / ")}`));
  }
}
