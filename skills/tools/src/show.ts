import type { SpecNode, Specification } from "./spec-files.ts";

type Ref = SpecNode["refs"][number];

/** The values a node's heading, its first lines, its links and the nodes under it already write. */
const WRITTEN = new Set(["id", "sid", "kind", "title", "status", "text", "rationale", "refs", "children"]);

/** A link with its type, its direction, its ratio where it holds one, and the node at the other end. */
function link(spec: Specification, r: Ref): string {
  const at = (r.to ?? r.from)!;
  const other = spec.nodes.get(at)?.node;
  return `- ${r.type}${r.ratio ? ` ${r.ratio}` : ""} ${r.to ? "→" : "←"} ${other ? `${other.sid} ${other.id} ${other.title}` : `${at} (no node)`}`;
}

/**
 * A node as the export, the guide and sheriff show write it: every value its file holds, each that is
 * not text under its key as JSON, the metadata only where asked for, and the nodes under it each one
 * heading level deeper, only where asked for.
 */
export function nodeMarkdown(spec: Specification, n: SpecNode, depth: number, { metadata = true, children = true } = {}): string {
  const parts = [`${"#".repeat(Math.min(depth, 6))} ${n.id} ${n.title}`, `\`${n.sid}\` · ${n.kind} · ${n.status || "unchecked"}`];
  if (n.text) parts.push(n.text);
  if (n.rationale) parts.push(`*Why:* ${n.rationale}`);
  for (const [key, value] of Object.entries(n)) {
    if (WRITTEN.has(key) || (key === "meta" && !metadata)) continue;
    parts.push(typeof value === "string" ? `**${key}:** ${value}` : `**${key}:**\n\n\`\`\`json\n${JSON.stringify(value, null, 2)}\n\`\`\``);
  }
  if (n.refs.length) parts.push(["**Links:**", "", ...n.refs.map((r) => link(spec, r))].join("\n"));
  const own = parts.join("\n\n");
  return children ? [own, ...(n.children ?? []).map((c) => nodeMarkdown(spec, c, depth + 1, { metadata }))].join("\n\n") : own;
}

/** A node, found by its sid or its address, alone. */
export function show(spec: Specification, key: string): string {
  const at = spec.nodes.get(key) ?? [...spec.nodes.values()].find((n) => n.node.id === key);
  if (!at) throw new Error(`${key}: no node holds this sid or address`);
  return nodeMarkdown(spec, at.node, 1, { children: false }) + "\n";
}
