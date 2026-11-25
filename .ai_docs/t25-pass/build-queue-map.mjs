// Builds the queue map from the vt template and queue-outline.md. Usage: node build-queue-map.mjs "<day>" "<state>"
import fs from "node:fs";
const here = new URL(".", import.meta.url);
const [day, state] = process.argv.slice(2);
if (!day || !state) throw new Error("usage: node build-queue-map.mjs <day> <state>");
const template = fs.readFileSync("C:/Users/PC/.claude/skills/vt/queue-map.html", "utf8");
const outline = fs.readFileSync(new URL("queue-outline.md", here), "utf8").trim();
const page = template
  .replaceAll("{{PROJECT}}", "SpecSheriff")
  .replaceAll("{{DAY}}", day)
  .replaceAll("{{STATE}}", state)
  .replace("{{OUTLINE}}", () => outline);
fs.writeFileSync(new URL("queue-map.html", here), page);
console.log("queue-map.html written");
