// Splits english-stage1.md into chunk files for EngStickler's readers, in the format of EngStickler's own chunks: each
// passage is headed by the file's path and the line it starts on. A chunk holds whole passages and about 1500 words.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const src = "D:\\SpecSheriff\\.ai_docs\\t25-pass\\english-stage1.md";
const lines = fs.readFileSync(new URL("english-stage1.md", here), "utf8").split("\n");
const passages = [];
let cur = null;
lines.forEach((line, i) => {
  const isHead = /^#{1,3} /.test(line);
  if (isHead || !line.trim()) { if (cur) passages.push(cur); cur = null; if (isHead) passages.push({ line: i + 1, text: line.replace(/^#+ /, "") }); return; }
  if (!cur) cur = { line: i + 1, text: line };
  else cur.text += "\n" + line;
});
if (cur) passages.push(cur);

const dir = new URL("stage1-chunks/", here);
fs.rmSync(dir, { recursive: true, force: true });
fs.mkdirSync(dir);
let chunk = [], words = 0, n = 0;
const flush = () => {
  if (!chunk.length) return;
  n++;
  fs.writeFileSync(new URL(`chunk-${String(n).padStart(2, "0")}.md`, dir), chunk.map((p) => `### ${src} · line ${p.line}\n\n${p.text}\n`).join("\n"));
  chunk = []; words = 0;
};
for (const p of passages) {
  const w = p.text.split(/\s+/).length;
  if (words + w > 1500 && words > 0) flush();
  chunk.push(p); words += w;
}
flush();
console.log(n, "chunks written");
