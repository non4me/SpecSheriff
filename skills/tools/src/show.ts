import type { SpecNode, Specification } from "./spec-files.ts";

type Ref = SpecNode["refs"][number];

/** The values a node's heading, its first lines, its links and the nodes under it already write. */
const WRITTEN = new Set(["location", "sid", "kind", "title", "status", "text", "reason", "refs", "children"]);

/** A link with its type, its direction, its ratio where it holds one, and the node at the other end. */
function link(spec: Specification, r: Ref): string {
  const at = (r.to ?? r.from)!;
  const other = spec.nodes.get(at)?.node;
  return `- ${r.type}${r.ratio ? ` ${r.ratio}` : ""} ${r.to ? "→" : "←"} ${other ? `${other.sid} ${other.location} ${other.title}` : `${at} (no node)`}`;
}

/**
 * A list any of whose members is an object, written as its other values in JSON and its members as a table: a column
 * for each property a member holds, the one the list names first, and a row for each member, a primitive member in
 * the first column alone. A cell holding a list or an object holds it as JSON on one line, a `|` escaped.
 */
function listTable(value: unknown): string | null {
  const { members = [], ...rest } = (value ?? {}) as { members?: unknown[]; property?: string };
  const isObject = (m: unknown): m is Record<string, unknown> => Boolean(m) && typeof m === "object" && !Array.isArray(m);
  if (!members.some(isObject)) return null;
  const columns = [rest.property ?? ""];
  for (const m of members) if (isObject(m)) for (const k of Object.keys(m)) if (!columns.includes(k)) columns.push(k);
  const cell = (v: unknown) => (v === undefined ? "" : (typeof v === "object" ? JSON.stringify(v) : String(v)).replaceAll("|", "\\|"));
  const rows = members.map((m) => (isObject(m) ? columns.map((c) => cell(m[c])) : [cell(m), ...columns.slice(1).map(() => "")]));
  const line = (cells: string[]) => `| ${cells.join(" | ")} |`;
  return [`**list:**`, "", "```json", JSON.stringify(rest, null, 2), "```", "", line(columns), `|${columns.map(() => "---").join("|")}|`, ...rows.map(line)].join("\n");
}

/** A RecordType's fields as JSON, the values gathered beside a field left out of it and written after it as a list under the field's name. */
function fieldsWithGathered(spec: Specification, fields: Array<Record<string, unknown>>): string {
  const bare = fields.map(({ gathered: _, ...f }) => f);
  const out = [`**fields:**\n\n\`\`\`json\n${JSON.stringify(bare, null, 2)}\n\`\`\``];
  for (const f of fields) {
    const gathered = f.gathered as Array<{ value: string; sid: string }> | undefined;
    if (!gathered?.length) continue;
    const line = (g: { value: string; sid: string }) => {
      const at = spec.nodes.get(g.sid)?.node;
      return `- ${g.value} — ${g.sid}${at ? ` ${at.location} ${at.title}` : ""}`;
    };
    out.push(`**${f.name}:**\n\n${gathered.map(line).join("\n")}`);
  }
  return out.join("\n\n");
}

/**
 * A node as the export, the guide and sheriff show write it: every value its file holds, each that is
 * not text under its key as JSON, the metadata only where asked for, and the nodes under it each one
 * heading level deeper, only where asked for.
 */
export function nodeMarkdown(spec: Specification, n: SpecNode, depth: number, { metadata = true, children = true } = {}): string {
  const parts = [`${"#".repeat(Math.min(depth, 6))} ${n.location} ${n.title}`, `\`${n.sid}\` · ${n.kind} · ${n.status || "unchecked"}`];
  if (n.text) parts.push(n.text);
  if (n.reason) parts.push(`*Why:* ${n.reason}`);
  for (const [key, value] of Object.entries(n)) {
    if (WRITTEN.has(key) || (key === "meta" && !metadata)) continue;
    if (key === "list" && listTable(value)) parts.push(listTable(value)!);
    else if (key === "fields" && Array.isArray(value)) parts.push(fieldsWithGathered(spec, value));
    else parts.push(typeof value === "string" ? `**${key}:** ${value}` : `**${key}:**\n\n\`\`\`json\n${JSON.stringify(value, null, 2)}\n\`\`\``);
  }
  if (n.refs.length) parts.push(["**Links:**", "", ...n.refs.map((r) => link(spec, r))].join("\n"));
  const own = parts.join("\n\n");
  return children ? [own, ...(n.children ?? []).map((c) => nodeMarkdown(spec, c, depth + 1, { metadata }))].join("\n\n") : own;
}

/**
 * Every item of the todos of the specification, the archive left out: the newest first, those of one day in the order
 * the specification reads — its files in the code-point order of their paths, the nodes of each in the order they
 * stand — each with its date, its author, what is to be done, and the sid, location and title of its node.
 */
export function todos(spec: Specification): string {
  const byPath = (a: { file: { path: string } }, b: { file: { path: string } }) => (a.file.path < b.file.path ? -1 : a.file.path > b.file.path ? 1 : 0);
  const items = [...spec.nodes.values()].sort(byPath).flatMap(({ node }) => ((node.meta?.todos ?? []) as Array<{ date: string; by: string; text: string }>).map((item) => ({ node, item })));
  const newestFirst = items.sort((a, b) => (a.item.date > b.item.date ? -1 : a.item.date < b.item.date ? 1 : 0));
  return newestFirst.map(({ node, item }) => `${item.date} · ${item.by}\n${item.text}\n${node.sid} · ${node.location} · ${node.title}\n`).join("\n");
}

/** A node, found by its sid or its location, alone. */
export function show(spec: Specification, key: string): string {
  const at = spec.nodes.get(key) ?? [...spec.nodes.values()].find((n) => n.node.location === key);
  if (!at) throw new Error(`${key}: no node holds this sid or location`);
  return nodeMarkdown(spec, at.node, 1, { children: false }) + "\n";
}
