import { isDomain, partOf } from "./model.ts";
import type { SpecNode, Specification } from "./spec-files.ts";

/** A value of a field of type one of gathered from elsewhere in the specification, with the node it comes from (s-ju5vcanbjph7mgh). */
export interface Gathered {
  value: string;
  sid: string;
}
export type NeutralType = { is: string; values?: string[]; from?: string; kind?: string; of?: NeutralType; fields?: Field[]; record?: string };
export type Field = { name: string; type: NeutralType; gathered?: Gathered[] };

/** The key a field's values are kept under: the RecordType holding it and its name. */
export const fieldKey = (holder: SpecNode, name: string) => `${holder.sid} ${name}`;

/** A RecordType's own fields and those inside the object of its field of type variant. */
export function fieldsOf(n: SpecNode): Field[] {
  return ((n.fields as Field[] | undefined) ?? []).flatMap((f) => [f, ...(f.type.is === "variant" ? (f.type.fields ?? []) : [])]);
}

/** The RecordType a node refines, where it refines one. */
export function refinedRecord(spec: Specification, n: SpecNode): SpecNode | undefined {
  const to = n.refs.find((r) => r.type === "refines" && spec.nodes.get(r.to ?? "")?.node.kind === "recordType")?.to;
  return to ? spec.nodes.get(to)?.node : undefined;
}

/** The RecordType up the refines links of a node that holds the field of that name among its own fields. */
export function holding(spec: Specification, n: SpecNode | undefined, name: string): SpecNode | undefined {
  const seen = new Set<string>();
  for (let c = n; c && !seen.has(c.sid); c = refinedRecord(spec, c)) {
    seen.add(c.sid);
    if (fieldsOf(c).some((f) => f.name === name)) return c;
  }
  return undefined;
}

/**
 * The values of every field of type one of whose source lies elsewhere than its own list (s-xfu2gpzddjnmgks), in the
 * order the specification reads them, each with the node it comes from:
 * - the values the domains add: the members of each rule's list naming the field, the rule refining the RecordType;
 * - the names of the domains: each domain's name, with its header;
 * - the sids of a kind's nodes: those of the nodes of that kind standing in the base specification.
 */
export function gather(spec: Specification): Map<string, Gathered[]> {
  const out = new Map<string, Gathered[]>();
  const nodes = [...spec.nodes.values()];
  for (const { node } of nodes) {
    if (node.kind !== "recordType") continue;
    for (const f of fieldsOf(node)) {
      if (f.type.is !== "one of" || !f.type.from) continue;
      const found: Gathered[] = [];
      if (f.type.from === "domains") {
        for (const { node: rule } of nodes) {
          const list = rule.list as { field?: string; members?: unknown[] } | undefined;
          if (list?.field !== f.name || holding(spec, refinedRecord(spec, rule), f.name) !== node) continue;
          for (const m of list.members ?? []) found.push({ value: String(m), sid: rule.sid });
        }
      } else if (f.type.from === "domainNames") {
        for (const { node: header, file } of nodes) if (header.kind === "domain") found.push({ value: partOf(file.path).part, sid: header.sid });
      } else if (f.type.from === "kindSids") {
        for (const { node: n, file } of nodes) {
          const { part } = partOf(file.path);
          if (n.kind === f.type.kind && (isDomain(part) || part === "contracts")) found.push({ value: n.sid, sid: n.sid });
        }
      }
      out.set(fieldKey(node, f.name), found);
    }
  }
  return out;
}
