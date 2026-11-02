// Writes tokens.css beside this script from tokens.json, so that every value of the style has one
// source: `node docs/style/build.mjs` after a token changes. tokens.css is never edited by hand.
import { readFileSync, writeFileSync } from "node:fs";

const here = new URL(".", import.meta.url);
const tokens = JSON.parse(readFileSync(new URL("tokens.json", here), "utf8"));
const theme = tokens.color.themes[0].id;

const lines = [];
const section = (name, entries) => {
  lines.push(`  /* ${name} */`);
  for (const [key, value] of entries) lines.push(`  --${key}: ${value};`);
};
section("colour", tokens.color.tokens.map((t) => [t.name, typeof t.value === "string" ? t.value : t.value[theme]]));
section("type", Object.entries(tokens.type.families).map(([key, stack]) => [`font-${key}`, stack]));
for (const [family, { tokens: list }] of Object.entries(tokens)) {
  if (["name", "version", "color", "type"].includes(family)) continue;
  section(family, list.map((t) => [t.name, t.value]));
}

writeFileSync(new URL("tokens.css", here), `/* SpecSheriff style guide — generated from tokens.json */\n:root {\n${lines.join("\n")}\n}\n`);
console.log(`docs/style/tokens.css: ${lines.filter((l) => l.startsWith("  --")).length} tokens`);
