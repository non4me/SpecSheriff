import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { domainOrder, isDomain, levelsOf, partOf } from "./model.ts";
import { nodeMarkdown } from "./show.ts";
import { loadSpecification, type SpecNode, type Specification } from "./spec-files.ts";

const EXPORT = "md-version";

/** The libraries the map's web page carries, in the order it runs them, each with its licence notice; the build writes them. */
const LIBRARIES = ["d3.js", "markmap-view.js"].map((name) => new URL(`../map/${name}`, import.meta.url));

/**
 * The page's own script: it reads the outline into the tree markmap draws, one node a line nested by its indent,
 * and shows each title as text, so that nothing in a title is read as markup or makes the page load anything.
 */
const DRAW = String.raw`const text = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const root = { content: "", children: [] };
const open = [{ depth: -1, node: root }];
for (const line of OUTLINE.split("\n")) {
  const heading = /^# (.*)$/.exec(line);
  const item = /^( *)- (.*)$/.exec(line);
  if (heading) root.content = text(heading[1]);
  if (!item) continue;
  const depth = item[1].length / 2;
  const node = { content: text(item[2].replace(/\\(.)/g, "$1")), children: [] };
  while (open[open.length - 1].depth >= depth) open.pop();
  open[open.length - 1].node.children.push(node);
  open.push({ depth, node });
}
markmap.Markmap.create("svg.markmap", null, root);`;

/**
 * Empties a directory written from the nodes alone and keeps it out of git, so that no repository stores it whatever
 * its own ignore file says. The directory itself stays, since a server running on it may hold it, and Windows
 * removes no directory a process holds.
 */
function regenerated(root: string, dir: string): void {
  mkdirSync(join(root, dir), { recursive: true });
  for (const entry of readdirSync(join(root, dir))) rmSync(join(root, dir, entry), { recursive: true, force: true });
  writeFileSync(join(root, dir, ".gitignore"), "*\n");
}

/** Writes the readable export: one markdown file for each file of the specification under md-version/, which git ignores. */
export function exportMarkdown(root: string): string[] {
  const spec = loadSpecification(root);
  regenerated(root, EXPORT);
  return spec.files.map((f) => {
    const path = f.path.replace(/^specs\//, `${EXPORT}/`).replace(/\.json$/, ".md");
    mkdirSync(dirname(join(root, path)), { recursive: true });
    writeFileSync(join(root, path), f.data.nodes.map((n) => nodeMarkdown(spec, n, 1)).join("\n\n") + "\n");
    return path;
  });
}

/** One line of the outline: titles only, so a title cannot be read as markdown of the outline. */
const item = (depth: number, title: string) => `${"  ".repeat(depth)}- ${title.replace(/[\\`*_[\]<>#]/g, "\\$&")}`;

function branch(nodes: SpecNode[], depth: number, out: string[]): void {
  for (const n of nodes) {
    out.push(item(depth, n.title));
    branch(n.children ?? [], depth + 1, out);
  }
}

/** The outline of the map: the guidelines, contracts, a branch per level from the top, the technical appendix last. */
export function outline(spec: Specification): string {
  const out = ["# Specification"];
  const files = (part: (p: string) => boolean) => spec.files.filter((f) => part(partOf(f.path).part));
  out.push(item(0, "Guidelines"));
  for (const f of files((p) => p === "_guidelines")) branch(f.data.nodes, 1, out);
  out.push(item(0, "Contracts"));
  for (const f of files((p) => p === "contracts")) branch(f.data.nodes, 1, out);
  const levels = levelsOf(spec) ?? [];
  const order = domainOrder(spec);
  const domainFiles = (d: string) => files((p) => p === d);
  const levelOf = (d: string) => domainFiles(d).flatMap((f) => f.data.nodes).find((n) => n.kind === "domain")?.level as string | undefined;
  const branches = [...levels.map((l, i) => ({ title: `${i + 1} ${l}`, has: (lv?: string) => lv === l })), { title: "No level listed", has: (lv?: string) => !lv || !levels.includes(lv) }];
  for (const b of branches) {
    const domains = order.filter((d) => isDomain(d) && b.has(levelOf(d)));
    if (!domains.length && b.title === "No level listed") continue;
    out.push(item(0, b.title));
    for (const d of domains) {
      const nodes = domainFiles(d).flatMap((f) => f.data.nodes);
      const header = nodes.find((n) => n.kind === "domain");
      out.push(item(1, header?.title ?? d));
      branch(nodes.filter((n) => n !== header), 2, out);
    }
  }
  out.push(item(0, "Technical appendix"));
  for (const f of files((p) => p === "tech")) branch(f.data.nodes, 1, out);
  return out.join("\n") + "\n";
}

/**
 * Writes the map: one web page that draws it with markmap from the outline it carries, holding markmap and every
 * library it needs, so that it loads nothing from the network.
 */
export function render(root: string): string {
  const spec = loadSpecification(root);
  // Every `<` written as its escape, so that no title ends the script it stands in.
  const carried = JSON.stringify(outline(spec)).replace(/</g, "\\u003c");
  const page = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>The map of the specification</title>
<style>html, body { margin: 0; height: 100%; } svg.markmap { display: block; width: 100%; height: 100%; }</style>
</head>
<body>
<svg class="markmap"></svg>
<script>const OUTLINE = ${carried};</script>
${LIBRARIES.map((library) => `<script>\n${readFileSync(library, "utf8")}</script>`).join("\n")}
<script>\n${DRAW}\n</script>
</body>
</html>
`;
  const path = join("specs", "_viewer", "index.html");
  regenerated(root, join("specs", "_viewer"));
  writeFileSync(join(root, path), page);
  return path.replace(/\\/g, "/");
}

/** The guidelines whole, and the figures counted off the model as they are printed. */
export function guide(spec: Specification): string {
  const counts = new Map<string, { nodes: number; checked: number }>();
  for (const { node, file } of spec.nodes.values()) {
    const { part } = partOf(file.path);
    const c = counts.get(part) ?? { nodes: 0, checked: 0 };
    c.nodes++;
    if (node.status === "checked") c.checked++;
    counts.set(part, c);
  }
  const figures = [...counts].sort(([a], [b]) => a.localeCompare(b)).map(([part, c]) => `- ${part}: ${c.nodes} nodes, ${c.checked} checked`);
  const guidelines = spec.files.filter((f) => partOf(f.path).part === "_guidelines").flatMap((f) => f.data.nodes.map((n) => nodeMarkdown(spec, n, 1, { metadata: false })));
  return [`# Where the specification stands\n\nCounted off the model as this was printed.\n\n${figures.join("\n")}`, ...guidelines].join("\n\n") + "\n";
}
