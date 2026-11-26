import { cpSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { LEVELS_RULE, TESTS_PASS_RULE, testsRunRule } from "../src/model.ts";
import { reindex } from "../src/reindex.ts";
import type { SpecNode } from "../src/spec-files.ts";
import { REPO } from "./repo.ts";

export const OWNER = "owner@example.org";

/** The entries by which the owner has chosen every extension of the guidelines (s-d3nkw9b6mn98vuw). */
export const ALL_EXTENSIONS = ["domains", "recordtype", "views"].map((name) => ({ name, chosen: true, by: OWNER }));
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

/** A sid no node holds, made when the tests run, so that no file of the tests cites a node that does not exist. */
export const NONE = sid("a node no specification holds");

/** A node's location, made when the tests run, so that no file of the tests holds one. */
export const loc = (...parts: string[]) => parts.join("/");

/** A citation by a number, made when the tests run, so that no file of the tests holds one. */
export const BY_NUMBER = "§" + "4.1";

export function node(name: string, fields: Record<string, unknown> = {}): SpecNode {
  return { location: "", sid: sid(name), kind: "TextRule", title: name, status: "draft", text: `What ${name} requires.`, refs: [], ...fields };
}

/** A TableRule whose rows each hold a node in the column "What is checked" and text in the column "On failure". */
export function table(name: string, rows: Array<[string, string]>, fields: Record<string, unknown> = {}) {
  const cell = (n: string) => {
    const { title: _, ...rest } = node(n);
    return rest;
  };
  return node(name, {
    kind: "TableRule",
    columns: [{ key: "check", heading: "What is checked", holds: "node" }, { key: "cost", heading: "On failure", holds: "text" }],
    groups: [{ heading: null, rows: rows.map(([n, cost]) => ({ cells: { check: { node: cell(n) }, cost: { text: cost } } })) }],
    ...fields,
  });
}

export function file(scope: string, section: string, ...nodes: object[]) {
  return { schemaVersion: 1, scope, section, nodes };
}

/**
 * Marks the repository at the given root as the one where the SpecSheriff guidelines are written, by setting the
 * environment variable SPECSHERIFF_GUIDELINES_REPO (s-zefk589ykh37b8u), or, given null, unsets the variable so that no repository is marked. The commands the tests run inherit the variable.
 */
export function writing(root: string | null): void {
  if (root) process.env.SPECSHERIFF_GUIDELINES_REPO = root;
  else delete process.env.SPECSHERIFF_GUIDELINES_REPO;
}

/**
 * A repository in a temporary directory that holds the given files, together with this repository's schema. Unless the
 * caller asks otherwise, it is marked as the repository where the SpecSheriff guidelines are written.
 */
export function repo(files: Record<string, unknown>, { writes = true } = {}): string {
  const root = mkdtempSync(join(tmpdir(), "sheriff-"));
  cpSync(join(REPO, "specs", "_schema"), join(root, "specs", "_schema"), { recursive: true });
  const all: Record<string, unknown> = { "sheriff.config.json": { code: [], tests: [], extensions: ALL_EXTENSIONS }, ...files };
  for (const [path, content] of Object.entries(all)) {
    mkdirSync(dirname(join(root, path)), { recursive: true });
    writeFileSync(join(root, path), typeof content === "string" ? content : JSON.stringify(content, null, 2) + "\n");
  }
  if (writes) writing(root);
  return root;
}

/** A project taking the SpecSheriff guidelines rather than writing them: its own guidelines alone, reindexed. */
export function taking(files: Record<string, unknown> = {}): string {
  const { "sheriff.config.json": config = { code: [], tests: [] }, ...rest } = files;
  const root = repo({
    // Every extension is chosen, unless the given settings hold entries of their own for the extensions.
    "sheriff.config.json": typeof config === "string" ? config : { extensions: ALL_EXTENSIONS, ...(config as object) },
    "specs/_guidelines/project.json": file("_guidelines", "project", node("project", { kind: "section", owners: [OWNER], text: "Ours.", children: [
      node("our levels", { refs: [{ type: "refines", to: LEVELS_RULE }], list: { of: "the levels", members: ["core"] } }),
    ] })),
    ...rest,
  }, { writes: false });
  rmSync(join(root, "specs", "_schema"), { recursive: true });
  reindex(root);
  return root;
}

/** The base of the guidelines, as held by a repository in which they are written, reduced to the rule on when the tests must pass. */
export const BASE = file("_guidelines", "spec", node("base", { kind: "section", text: "The base.", children: [node("when the tests must pass", { sid: TESTS_PASS_RULE })] }));

/** The project's own guidelines in a repository that holds BASE: their owner, and the draft rule on when the tests run, as `sheriff init` writes that rule. */
export const OWN = file("_guidelines", "project", node("project", { kind: "section", owners: [OWNER], text: "Ours.", children: [{ location: "", sid: sid("tests run"), ...testsRunRule() }] }));
