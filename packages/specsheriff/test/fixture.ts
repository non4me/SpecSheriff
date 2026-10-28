import { cpSync, mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import type { SpecNode } from "../src/spec-files.ts";
import { REPO } from "./repo.ts";

export const OWNER = "owner@example.org";
const sids = new Map<string, string>();

/** A sid made from a name, the same each time, so a fixture can link its nodes by name. */
export function sid(name: string): string {
  const alphabet = "23456789abcdefghjkmnpqrstuvwxyz";
  if (!sids.has(name)) {
    let n = sids.size + 1;
    let out = "";
    for (let i = 0; i < 15; i++, n = Math.floor(n / alphabet.length)) out = alphabet[n % alphabet.length] + out;
    sids.set(name, "s-" + out);
  }
  return sids.get(name)!;
}

export function node(name: string, fields: Record<string, unknown> = {}): SpecNode {
  return { id: "", sid: sid(name), kind: "rule", title: name, status: "", text: `What ${name} requires.`, refs: [], ...fields };
}

export function file(scope: string, section: string, ...nodes: object[]) {
  return { schemaVersion: 1, scope, section, nodes };
}

/** A repository in a temporary directory holding the given files, the repository's schema with them. */
export function repo(files: Record<string, unknown>): string {
  const root = mkdtempSync(join(tmpdir(), "sheriff-"));
  cpSync(join(REPO, "specs", "_schema"), join(root, "specs", "_schema"), { recursive: true });
  const all: Record<string, unknown> = { "sheriff.config.json": { code: [], tests: [], writesCore: true }, ...files };
  for (const [path, content] of Object.entries(all)) {
    mkdirSync(dirname(join(root, path)), { recursive: true });
    writeFileSync(join(root, path), typeof content === "string" ? content : JSON.stringify(content, null, 2) + "\n");
  }
  return root;
}
