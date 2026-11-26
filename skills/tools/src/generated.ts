import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { approvedWordings } from "./approved-wording.ts";
import { domainDiagram, isDomain, levelsOf, partOf, PROJECT, statusNow, type Wordings } from "./model.ts";
import { loadConfig, ownerSettings, strictDefault } from "./config.ts";
import { nodeMarkdown } from "./show.ts";
import { cellNodes, loadSpecification, type SpecNode, type Specification } from "./spec-files.ts";

const EXPORT = "md-version";

/** The libraries the map's web page carries, in the order it runs them, each with its licence notice; the build writes them. */
const LIBRARIES = ["d3.js", "markmap-view.js"].map((name) => new URL(`../map/${name}`, import.meta.url));

/**
 * The page's own script: it reads the outline into the tree markmap draws, one node a line nested by its indent,
 * and shows each title as text, so that nothing in a title is read as markup or makes the page load anything. A
 * node's title stands in an element whose class names its status, which the page frames (s-rpv4fkdqqguptqd).
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
  const framed = /^<span class="(draft|approved)">(.*)<\/span>$/.exec(item[2]);
  const node = { content: framed ? '<span class="node ' + framed[1] + '">' + framed[2] + "</span>" : text(item[2].replace(/\\(.)/g, "$1")), children: [] };
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

/**
 * The extensions of the guidelines that the project has chosen. A command that writes a view of the specification runs only where
 * the Views extension is among them (s-e3495enbc5h75c3, s-rpv4fkdqqguptqd), and is otherwise refused, naming that extension.
 */
function requireViews(root: string, command: string): Set<string> {
  const chosen = ownerSettings(loadConfig(root), strictDefault(root)).extensions;
  if (!chosen.has("views")) throw new Error(`${command} runs only where the project has chosen the Views extension of the guidelines, which an owner chooses with sheriff settings extension views on`);
  return chosen;
}

/** The files whose nodes a view shows: every file of the specification, except the file of an extension that the project takes from the plugin and has not chosen. */
function viewedFiles(spec: Specification, chosen: Set<string>): Specification["files"] {
  const extension = (path: string) => path.match(/^specs\/_guidelines\/extensions\/(.+)\.json$/)?.[1];
  return spec.files.filter((f) => !(f.taken && extension(f.path) && !chosen.has(extension(f.path)!)));
}

/** Writes the readable export: one markdown file for each file of the specification under md-version/, which git ignores. */
export function exportMarkdown(root: string): string[] {
  const chosen = requireViews(root, "sheriff markdown");
  const spec = loadSpecification(root);
  regenerated(root, EXPORT);
  return viewedFiles(spec, chosen).map((f) => {
    const path = f.path.replace(/^specs\//, `${EXPORT}/`).replace(/\.json$/, ".md");
    mkdirSync(dirname(join(root, path)), { recursive: true });
    writeFileSync(join(root, path), f.data.nodes.map((n) => nodeMarkdown(spec, n, 1)).join("\n\n") + "\n");
    return path;
  });
}

/** One line of the outline for a branch that stands for no node: its title only, so it cannot be read as markdown of the outline. */
const item = (depth: number, title: string) => `${"  ".repeat(depth)}- ${title.replace(/[\\`*_[\]<>#]/g, "\\$&")}`;

/** One line of the outline for a node: its title, or the location of a node in a cell, escaped, in an element whose class names its status (s-rpv4fkdqqguptqd). */
const nodeItem = (depth: number, n: SpecNode) => {
  const title = (n.title || n.location).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);
  return `${"  ".repeat(depth)}- <span class="${statusNow(n.status)}">${title}</span>`;
};

/** Each node with the nodes under it, and the nodes in the cells of a TableRule after its children. */
function branch(nodes: SpecNode[], depth: number, out: string[]): void {
  for (const n of nodes) {
    out.push(nodeItem(depth, n));
    branch(n.children ?? [], depth + 1, out);
    if (n.kind === "TableRule") branch(cellNodes(n).map((c) => c.node), depth + 1, out);
  }
}

/**
 * The outline of the map (s-rpv4fkdqqguptqd): the guidelines, the appendix of the tools, the base specification and the technical
 * appendix. In the base specification, the contracts come first; where the Domains extension is chosen, the domains follow row by row
 * in the order of the diagram of the domains, with each domain's other top-level nodes placed under its header.
 */
export function outline(spec: Specification, wordings: Wordings, chosen: Set<string>): string {
  const out = ["# Specification"];
  const shown = viewedFiles(spec, chosen);
  const byPath = (a: { path: string }, b: { path: string }) => (a.path < b.path ? -1 : a.path > b.path ? 1 : 0);
  const at = (path: string) => shown.filter((f) => f.path === path);
  out.push(item(0, "Guidelines"));
  const extensions = shown.filter((f) => f.path.startsWith("specs/_guidelines/extensions/")).sort(byPath);
  for (const f of [...at("specs/_guidelines/spec.json"), ...extensions, ...at(PROJECT)]) branch(f.data.nodes, 1, out);
  out.push(item(0, "Appendix of the tools"));
  for (const f of at("specs/_guidelines/tools.json")) branch(f.data.nodes, 1, out);
  out.push(item(0, "Base specification"));
  const base = shown.filter((f) => !["_guidelines", "tech", "_archive"].includes(partOf(f.path).part));
  for (const f of base.filter((f) => partOf(f.path).part === "contracts")) branch(f.data.nodes, 1, out);
  const others = base.filter((f) => partOf(f.path).part !== "contracts").sort(byPath);
  if (chosen.has("domains")) {
    for (const row of domainDiagram(spec, levelsOf(spec, wordings)).rows) {
      for (const d of row.domains) {
        const nodes = others.filter((f) => partOf(f.path).part === d).flatMap((f) => f.data.nodes);
        const header = nodes.find((n) => n.kind === "header");
        if (!header) {
          branch(nodes, 1, out);
          continue;
        }
        out.push(nodeItem(1, header));
        branch([...(header.children ?? []), ...nodes.filter((n) => n !== header)], 2, out);
      }
    }
  } else {
    for (const f of others) branch(f.data.nodes, 1, out);
  }
  out.push(item(0, "Technical appendix"));
  for (const f of shown.filter((f) => partOf(f.path).part === "tech")) branch(f.data.nodes, 1, out);
  return out.join("\n") + "\n";
}

/**
 * Writes the map: one web page that draws it with markmap from the outline it carries, holding markmap and every
 * library it needs, so that it loads nothing from the network.
 */
export function render(root: string): string {
  const chosen = requireViews(root, "sheriff map");
  const spec = loadSpecification(root);
  // Every `<` written as its escape, so that no title ends the script it stands in.
  const carried = JSON.stringify(outline(spec, approvedWordings(root, spec), chosen)).replace(/</g, "\\u003c");
  const page = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>The map of the specification</title>
<style>html, body { margin: 0; height: 100%; } svg.markmap { display: block; width: 100%; height: 100%; }
.node { padding: 0 4px; border: 1.5px solid currentColor; border-radius: 3px; } .node.draft { border-style: dotted; }</style>
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

/** The guidelines in full, the specification's approval status, and the figures counted from the model, as they are printed. */
export function guide(spec: Specification, approved: boolean): string {
  const counts = new Map<string, { nodes: number; approved: number }>();
  for (const { node, file } of spec.nodes.values()) {
    const { part } = partOf(file.path);
    const c = counts.get(part) ?? { nodes: 0, approved: 0 };
    c.nodes++;
    if (node.status === "approved") c.approved++;
    counts.set(part, c);
  }
  const figures = [...counts].sort(([a], [b]) => a.localeCompare(b)).map(([part, c]) => `- ${part}: ${c.nodes} nodes, ${c.approved} approved`);
  figures.push(`\nThe specification is ${approved ? "approved" : "a draft"}.`);
  const guidelines = spec.files.filter((f) => partOf(f.path).part === "_guidelines").flatMap((f) => f.data.nodes.map((n) => nodeMarkdown(spec, n, 1, { metadata: false })));
  return [`# Where the specification stands\n\nCounted off the model as this was printed.\n\n${figures.join("\n")}`, ...guidelines].join("\n\n") + "\n";
}
