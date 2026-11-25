// The generator of the page of table 10.1 drops the fates that name the old numbers of the extensions' sections, which no
// row uses since fix-table-119.mjs renamed them.
import fs from "node:fs";

const file = new URL("gen-table-10-1.mjs", import.meta.url);
let g = fs.readFileSync(file, "utf8");
const keep = g.split("\n").filter((l) => !/^ {2}"to 12\.[2-6] (Domains|Generation|Adoption)": \[/.test(l));
fs.writeFileSync(file, keep.join("\n"));
console.log(g.split("\n").length - keep.length, "lines removed");
