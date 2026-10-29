import { randomInt } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { loadConfig } from "./config.ts";
import { holds, readConfirmations } from "./confirmations.ts";
import { mergeKeys, type KeyTwice } from "./json-text.ts";
import { addresses, incoming, partOf, SID } from "./model.ts";
import { canonical, specificationOf, specPaths, type SpecFile, type SpecNode, type Specification } from "./spec-files.ts";

export interface ReindexReport {
  /** Every key whose values were merged, with the file it is in. */
  merged: Array<KeyTwice & { file: string }>;
  /** The sids of the nodes whose status was emptied. */
  emptied: string[];
  /** The files written, because something in them changed. */
  written: string[];
}

const ALPHABET = "23456789abcdefghjkmnpqrstuvwxyz";

export function newSid(taken: Set<string>): string {
  for (;;) {
    let sid = "s-";
    for (let i = 0; i < 15; i++) sid += ALPHABET[randomInt(ALPHABET.length)];
    if (!taken.has(sid)) return taken.add(sid), sid;
  }
}

/** Gives a sid to every node without one, and puts every node's address and sid first. */
function giveSids(files: SpecFile[]): void {
  const taken = new Set<string>();
  const each = (nodes: SpecNode[], visit: (n: SpecNode) => void) => {
    for (const n of nodes) visit(n), each(n.children ?? [], visit);
  };
  for (const f of files) each(f.data.nodes ?? [], (n) => typeof n.sid === "string" && taken.add(n.sid));
  const settle = (nodes: SpecNode[]): SpecNode[] =>
    nodes.map((n) => {
      const sid = typeof n.sid === "string" && SID.test(n.sid) ? n.sid : newSid(taken);
      const { id = "", sid: _, ...rest } = n;
      const settled = { id, sid, ...rest } as SpecNode;
      if (settled.children) settled.children = settle(settled.children);
      return settled;
    });
  for (const f of files) if (!partOf(f.path).part.startsWith("_archive")) f.data.nodes = settle(f.data.nodes ?? []);
}

/** Each domain's head and the sections its index lists. */
function heads(spec: Specification): Array<{ head: SpecNode; sections: SpecNode[] }> {
  const parts = new Map<string, { head?: SpecNode; sections: SpecNode[] }>();
  for (const f of spec.files) {
    const { part } = partOf(f.path);
    if (["_guidelines", "tech", "contracts"].includes(part)) continue;
    if (!parts.has(part)) parts.set(part, { sections: [] });
    const entry = parts.get(part)!;
    for (const n of f.data.nodes) {
      if (n.kind === "domain") {
        entry.head = n;
        entry.sections.push(...(n.children ?? []).filter((c) => c.kind === "section"));
      } else if (n.kind === "section") entry.sections.push(n);
    }
  }
  return [...parts.values()].filter((e) => e.head).map((e) => ({ head: e.head!, sections: e.sections }));
}

/** The index a head carries, as the domain's sections produce it. */
export function headIndex(spec: Specification, sections: SpecNode[], built: ReturnType<typeof incoming>) {
  return sections.map((s) => {
    const usedBy = (built.get(s.sid) ?? []).filter((r) => r.type === "consumes" && spec.nodes.get(r.from)?.node.kind === "domain").map((r) => r.from);
    return { sid: s.sid, title: s.title, text: s.text, ...(usedBy.length ? { usedBy } : {}) };
  });
}

/** Whether a node's status is judged by the confirmations here, rather than taken with the SpecSheriff guidelines at their version. */
export function judgedHere(path: string, writesSpecSheriffGuidelines: boolean): boolean {
  return writesSpecSheriffGuidelines || !partOf(path).specSheriffGuidelines;
}

export function reindex(root: string): ReindexReport {
  const { writesSpecSheriffGuidelines } = loadConfig(root);
  const report: ReindexReport = { merged: [], emptied: [], written: [] };
  const texts = new Map<string, string>();
  const files: SpecFile[] = specPaths(root).map((path) => {
    const text = readFileSync(join(root, path), "utf8");
    texts.set(path, text);
    try {
      const { value, merged } = mergeKeys(text);
      report.merged.push(...merged.map((m) => ({ file: path, ...m })));
      return { path, data: value as SpecFile["data"] };
    } catch (error) {
      throw new Error(`${path}: ${(error as Error).message}`);
    }
  });
  giveSids(files);
  const spec = specificationOf(files);

  const ids = addresses(spec);
  const built = incoming(spec);
  for (const [sid, { node }] of spec.nodes) {
    if (ids.has(sid)) node.id = ids.get(sid)!;
    node.refs = [...(node.refs ?? []).filter((r) => !r.from), ...(built.get(sid) ?? [])];
  }
  for (const { head, sections } of heads(spec)) head.sections = headIndex(spec, sections, built);

  const lines = readConfirmations(root);
  for (const [sid, { node, file }] of spec.nodes) {
    if (node.status === "checked" && judgedHere(file.path, writesSpecSheriffGuidelines) && !holds(spec, lines, sid)) {
      node.status = "";
      report.emptied.push(sid);
    }
  }

  for (const f of [...spec.files, ...spec.archive]) {
    const text = canonical(f.data);
    if (text !== texts.get(f.path)) {
      writeFileSync(join(root, f.path), text);
      report.written.push(f.path);
    }
  }
  return report;
}
