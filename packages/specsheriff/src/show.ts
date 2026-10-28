import type { Specification } from "./spec-files.ts";

/** A node, found by its sid or its address, with every link it makes or receives named by the node at the other end. */
export function show(spec: Specification, key: string): string {
  const at = spec.nodes.get(key) ?? [...spec.nodes.values()].find((n) => n.node.id === key);
  if (!at) throw new Error(`${key}: no node holds this sid or address`);
  const { node } = at;
  const lines = [`${node.id} · ${node.sid} · ${node.status || "unchecked"}`, node.title, "", node.text];
  if (node.rationale) lines.push("", `Reason: ${node.rationale}`);
  if (node.refs.length) {
    lines.push("", "Links:");
    for (const r of node.refs) {
      const other = spec.nodes.get((r.to ?? r.from)!)?.node;
      lines.push(`  ${r.type} ${r.to ? "→" : "←"} ${other ? `${other.id} ${other.title}` : `${r.to ?? r.from} (no node)`}`);
    }
  }
  return lines.join("\n") + "\n";
}
