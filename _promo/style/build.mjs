// Writes tokens.css beside this script from tokens.json, so that every value of the style has one
// source: `node _promo/style/build.mjs` after a token changes. tokens.css is never edited by hand.
// The first theme is a page's own. Every other theme is written twice from one list of its colours: for a
// page whose root names it by its scheme, `data-theme="dark"`, and for a browser that asks for that scheme
// on a page whose root does not name the first theme's.
import { readFileSync, writeFileSync } from "node:fs";

const here = new URL(".", import.meta.url);
const tokens = JSON.parse(readFileSync(new URL("tokens.json", here), "utf8"));
const [first, ...others] = tokens.color.themes;
const ids = tokens.color.themes.map((t) => t.id);
for (const t of tokens.color.tokens) {
  const named = typeof t.value === "string" ? ids : Object.keys(t.value);
  if (named.join() !== ids.join()) throw new Error(`tokens.json: the colour ${t.name} has values for ${named.join(", ")}, not for each theme, ${ids.join(", ")}`);
}
const colours = (theme) => tokens.color.tokens.map((t) => [t.name, typeof t.value === "string" ? t.value : t.value[theme.id]]);

const block = (theme, indent, families) => {
  const lines = [`${indent}color-scheme: ${theme.scheme};`];
  for (const [name, entries] of families) {
    lines.push(`${indent}/* ${name} */`);
    for (const [key, value] of entries) lines.push(`${indent}--${key}: ${value};`);
  }
  return lines;
};

const families = [["colour", colours(first)], ["type", Object.entries(tokens.type.families).map(([key, stack]) => [`font-${key}`, stack])]];
for (const [family, { tokens: list }] of Object.entries(tokens)) {
  if (["name", "version", "color", "type"].includes(family)) continue;
  families.push([family, list.map((t) => [t.name, t.value])]);
}

let css = `/* SpecSheriff style guide — generated from tokens.json */\n:root {\n${block(first, "  ", families).join("\n")}\n}\n`;
for (const theme of others) {
  const own = [["colour", colours(theme)]];
  css += `/* ${theme.name}: a page whose root names it */\n:root[data-theme="${theme.scheme}"] {\n${block(theme, "  ", own).join("\n")}\n}\n`;
  css += `/* ${theme.name}: a browser that asks for it, unless the root of the page names the ${first.scheme} theme */\n`;
  css += `@media (prefers-color-scheme: ${theme.scheme}) {\n  :root:not([data-theme="${first.scheme}"]) {\n${block(theme, "    ", own).join("\n")}\n  }\n}\n`;
}

writeFileSync(new URL("tokens.css", here), css);
console.log(`_promo/style/tokens.css: ${families.reduce((n, [, e]) => n + e.length, 0)} tokens, ${others.length} theme(s) beside ${first.name}`);
