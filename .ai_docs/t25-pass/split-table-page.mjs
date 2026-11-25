// Splits a page of a table of checks, as gen-table-10-1.mjs writes it, into <dir>/index.html, which holds the title and
// the styles, and <dir>/page.js, which puts the page's markup in place of an empty element of index.html and then runs the page's script. The page is published
// as these two files, so that a later session can update it after reading only the small index.html.
// Usage: node split-table-page.mjs [table-10-1.html table-page]
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const [src = "table-10-1.html", out = "table-page"] = process.argv.slice(2);
const h = fs.readFileSync(new URL(src, here), "utf8");
const styleEnd = h.indexOf("</style>\n");
const scriptStart = h.lastIndexOf("\n<script>\n");
const scriptEnd = h.lastIndexOf("\n</script>");
if (styleEnd < 0 || scriptStart < styleEnd || scriptEnd < scriptStart) throw new Error(`${src}: expected the styles, then the markup, then one script`);
if (h.indexOf("<script", styleEnd) !== scriptStart + 1) throw new Error(`${src}: the markup must hold no script`);
const head = h.slice(0, styleEnd + "</style>\n".length);
const markup = h.slice(styleEnd + "</style>\n".length, scriptStart);
const script = h.slice(scriptStart + "\n<script>\n".length, scriptEnd);
const tail = h.slice(scriptEnd + "\n</script>".length);
if (tail.trim()) throw new Error(`${src}: nothing may follow the script`);
const dir = new URL(`${out}/`, here);
fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(new URL("index.html", dir), head + '<div id="page-root"></div>\n<script src="page.js"></script>\n');
fs.writeFileSync(new URL("page.js", dir), `document.getElementById("page-root").outerHTML = ${JSON.stringify(markup)};\n${script}\n`);
console.log(`${out}/index.html and ${out}/page.js written`);
