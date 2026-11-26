import { cellNodes, type SpecNode, type Specification, type TableColumn, type TableGroup } from "./spec-files.ts";
import { schemasWithin, sourcedFields } from "./values.ts";

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

/**
 * A RecordType's `schema` as JSON, with the values gathered beside each field left out of it (s-k4nqjr96ux7a5m7). Each
 * field's gathered values follow as a list headed by the JSON Pointer to the field's schema. Each value is written with
 * the sid, location and title of the node it comes from. A value that comes from a node in a cell, which has no title, is
 * written with that node's sid and location.
 */
function schemaWithGathered(spec: Specification, node: SpecNode): string {
  const bare = structuredClone(node.schema);
  for (const { schema } of schemasWithin(bare)) {
    const source = schema.enumSource as Record<string, unknown> | undefined;
    if (source && typeof source === "object") delete source.gathered;
  }
  const out = [`**schema:**\n\n\`\`\`json\n${JSON.stringify(bare, null, 2)}\n\`\`\``];
  const line = (g: { value: string; sid: string }) => {
    const at = spec.nodes.get(g.sid)?.node;
    return `- ${g.value} — ${g.sid}${at ? ` ${at.location}${at.title ? ` ${at.title}` : ""}` : ""}`;
  };
  for (const { pointer, source } of sourcedFields(node)) {
    if (source.gathered?.length) out.push(`**${pointer}:**\n\n${source.gathered.map(line).join("\n")}`);
  }
  return out.join("\n\n");
}

/** The text of a cell, with each line break written as `<br>` (s-k4nqjr96ux7a5m7). */
const inCell = (text: string) => text.replaceAll("\r\n", "\n").replaceAll("\n", "<br>");

/** The place of a node in a cell: the heading of its column, the heading of its group, and the text cells of its row, each under its column's heading. */
function cellPlace(spec: Specification, sid: string): string | null {
  const at = spec.nodes.get(sid);
  if (!at?.cell) return null;
  const headings = new Map(((at.parent?.columns as TableColumn[] | undefined) ?? []).map((c) => [c.key, c.heading]));
  return [
    `- column: ${at.cell.column}`,
    ...(at.cell.group ? [`- group: ${at.cell.group}`] : []),
    ...Object.entries(at.cell.row).map(([key, text]) => `- ${headings.get(key) ?? key}: ${inCell(text)}`),
  ].join("\n");
}

/** The columns and groups of a TableRule as a table for each group, under the group's heading where it has one; a node's cell holds its location and its text. */
function tableMarkdown(n: SpecNode): string {
  const columns = (n.columns as TableColumn[] | undefined) ?? [];
  const escaped = (text: string) => inCell(text).replaceAll("|", "\\|");
  const line = (cells: string[]) => `| ${cells.join(" | ")} |`;
  return ((n.groups as TableGroup[] | undefined) ?? []).map((group) => {
    const rows = group.rows.map(({ cells }) => line(columns.map((c) => {
      const cell = cells[c.key];
      return escaped(cell?.node ? `${cell.node.location} ${cell.node.text ?? ""}`.trim() : (cell?.text ?? ""));
    })));
    const table = [line(columns.map((c) => escaped(c.heading))), `|${columns.map(() => "---").join("|")}|`, ...rows].join("\n");
    return group.heading ? `**${group.heading}**\n\n${table}` : table;
  }).join("\n\n");
}

/**
 * A node as the export, the guide and `sheriff show` write it: every value that its file holds, each value that is not text
 * written as JSON under its key, the metadata only where asked for, and, only where asked for, the nodes under it, each a heading
 * level deeper than the node above it. A node in a cell, which has no title, is headed by its location alone.
 */
export function nodeMarkdown(spec: Specification, n: SpecNode, depth: number, { metadata = true, children = true } = {}): string {
  const place = cellPlace(spec, n.sid);
  const parts = [`${"#".repeat(Math.min(depth, 6))} ${n.location}${place ? "" : ` ${n.title}`}`, `\`${n.sid}\` · ${n.kind} · ${n.status}`];
  if (place) parts.push(place);
  if (n.text) parts.push(n.text);
  if (n.reason) parts.push(`*Why:* ${n.reason}`);
  for (const [key, value] of Object.entries(n)) {
    if (WRITTEN.has(key) || (key === "meta" && !metadata)) continue;
    if (n.kind === "TableRule" && key === "columns") continue;
    if (n.kind === "TableRule" && key === "groups") parts.push(tableMarkdown(n));
    else if (key === "list" && listTable(value)) parts.push(listTable(value)!);
    else if (key === "schema" && n.kind === "RecordType") parts.push(schemaWithGathered(spec, n));
    else parts.push(typeof value === "string" ? `**${key}:** ${value}` : `**${key}:**\n\n\`\`\`json\n${JSON.stringify(value, null, 2)}\n\`\`\``);
  }
  if (n.refs.length) parts.push(["**Links:**", "", ...n.refs.map((r) => link(spec, r))].join("\n"));
  const own = parts.join("\n\n");
  // The nodes in the cells of a TableRule follow its children, in the order in which their locations are computed.
  const below = [...(n.children ?? []), ...(n.kind === "TableRule" ? cellNodes(n).map((c) => c.node) : [])];
  return children ? [own, ...below.map((c) => nodeMarkdown(spec, c, depth + 1, { metadata }))].join("\n\n") : own;
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
