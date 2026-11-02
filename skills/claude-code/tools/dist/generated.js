import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { domainOrder, isDomain, levelsOf, partOf } from "./model.js";
import { nodeMarkdown } from "./show.js";
import { loadSpecification } from "./spec-files.js";
const EXPORT = "md-version";
const MARKMAP = "https://cdn.jsdelivr.net/npm/markmap-autoloader@0.18.12";
/** Empties a directory written from the nodes alone and keeps it out of git, so that no repository stores it whatever its own ignore file says. */
function regenerated(root, dir) {
    rmSync(join(root, dir), { recursive: true, force: true });
    mkdirSync(join(root, dir), { recursive: true });
    writeFileSync(join(root, dir, ".gitignore"), "*\n");
}
/** Writes the readable export: one markdown file for each file of the specification under md-version/, which git ignores. */
export function exportMarkdown(root) {
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
const item = (depth, title) => `${"  ".repeat(depth)}- ${title.replace(/[\\`*_[\]<>#]/g, "\\$&")}`;
function branch(nodes, depth, out) {
    for (const n of nodes) {
        out.push(item(depth, n.title));
        branch(n.children ?? [], depth + 1, out);
    }
}
/** The outline of the map: the guidelines, contracts, a branch per level from the top, the technical appendix last. */
export function outline(spec) {
    const out = ["# Specification"];
    const files = (part) => spec.files.filter((f) => part(partOf(f.path).part));
    out.push(item(0, "Guidelines"));
    for (const f of files((p) => p === "_guidelines"))
        branch(f.data.nodes, 1, out);
    out.push(item(0, "Contracts"));
    for (const f of files((p) => p === "contracts"))
        branch(f.data.nodes, 1, out);
    const levels = levelsOf(spec) ?? [];
    const order = domainOrder(spec);
    const domainFiles = (d) => files((p) => p === d);
    const levelOf = (d) => domainFiles(d).flatMap((f) => f.data.nodes).find((n) => n.kind === "domain")?.level;
    const branches = [...levels.map((l, i) => ({ title: `${i + 1} ${l}`, has: (lv) => lv === l })), { title: "No level listed", has: (lv) => !lv || !levels.includes(lv) }];
    for (const b of branches) {
        const domains = order.filter((d) => isDomain(d) && b.has(levelOf(d)));
        if (!domains.length && b.title === "No level listed")
            continue;
        out.push(item(0, b.title));
        for (const d of domains) {
            const nodes = domainFiles(d).flatMap((f) => f.data.nodes);
            const header = nodes.find((n) => n.kind === "domain");
            out.push(item(1, header?.title ?? d));
            branch(nodes.filter((n) => n !== header), 2, out);
        }
    }
    out.push(item(0, "Technical appendix"));
    for (const f of files((p) => p === "tech"))
        branch(f.data.nodes, 1, out);
    return out.join("\n") + "\n";
}
/** Writes the map: one web page that draws it with markmap from the outline it carries. */
export function render(root) {
    const spec = loadSpecification(root);
    const page = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>The map of the specification</title>
<style>html, body, .markmap { margin: 0; height: 100%; } .markmap > svg { width: 100%; height: 100%; }</style>
<script src="${MARKMAP}"></script>
</head>
<body>
<div class="markmap"><script type="text/template">
${outline(spec).replace(/<\/script/gi, "<\\/script")}</script></div>
</body>
</html>
`;
    const path = join("specs", "_viewer", "index.html");
    regenerated(root, join("specs", "_viewer"));
    writeFileSync(join(root, path), page);
    return path.replace(/\\/g, "/");
}
/** The guidelines whole, and the figures counted off the model as they are printed. */
export function guide(spec) {
    const counts = new Map();
    for (const { node, file } of spec.nodes.values()) {
        const { part } = partOf(file.path);
        const c = counts.get(part) ?? { nodes: 0, checked: 0 };
        c.nodes++;
        if (node.status === "checked")
            c.checked++;
        counts.set(part, c);
    }
    const figures = [...counts].sort(([a], [b]) => a.localeCompare(b)).map(([part, c]) => `- ${part}: ${c.nodes} nodes, ${c.checked} checked`);
    const guidelines = spec.files.filter((f) => partOf(f.path).part === "_guidelines").flatMap((f) => f.data.nodes.map((n) => nodeMarkdown(spec, n, 1, { metadata: false })));
    return [`# Where the specification stands\n\nCounted off the model as this was printed.\n\n${figures.join("\n")}`, ...guidelines].join("\n\n") + "\n";
}
