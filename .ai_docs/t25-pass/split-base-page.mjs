// Splits base-structure.html into base-page/index.html, which holds the markup and the styles, and base-page/page.js,
// which holds the script with its data. The page is published as these two files, so that a later session can update
// it after reading only the small index.html and listing the artifact's files, instead of reading the whole page.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const h = fs.readFileSync(new URL("base-structure.html", here), "utf8");
const open = h.indexOf("\n<script>\n");
const close = h.lastIndexOf("\n</script>");
if (open < 0 || close < open || h.indexOf("<script>", open + 10) >= 0) throw new Error("base-structure.html must hold exactly one inline script");
const dir = new URL("base-page/", here);
fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(new URL("index.html", dir), h.slice(0, open) + '\n<script src="page.js"></script>' + h.slice(close + "\n</script>".length));
fs.writeFileSync(new URL("page.js", dir), h.slice(open + "\n<script>\n".length, close) + "\n");
console.log("base-page/index.html and base-page/page.js written");
