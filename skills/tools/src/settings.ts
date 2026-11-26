import { spawnSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { APPROVALS } from "./approvals.ts";
import { binding, citationsOutside, parentSpecification, untagged } from "./binding.ts";
import { BINDINGS } from "./bindings.ts";
import { loadConfig, ownerSettings, strictDefault } from "./config.ts";
import { git } from "./diff.ts";
import { reader } from "./lists.ts";
import { fingerprint, specificationOwners } from "./model.ts";
import { isArchive, readExtension, type Extension } from "./schema.ts";
import { CARRIED, loadSpecification, schemaDir, specPaths, writesGuidelines, type SpecNode, type Specification } from "./spec-files.ts";
import { generateTypes } from "./types.ts";
import { readAgainstSchema, strictOwnChecks, validate, type Finding } from "./validate.ts";

const FILE = "sheriff.config.json";
const USAGE = "sheriff settings takes no arguments, or one change: status approved [--confirm], status draft, strict on, strict off, extension <name> on or extension <name> off";

/** One change to a setting that only an owner of the specification changes (s-chsfpkgpmfk4fft). */
export type Change = { status: "approved" | "draft" } | { strict: boolean } | { extension: string; chosen: boolean };

/**
 * The result of a change. It says whether the change was recorded, why it was refused, and what the checks before an approval
 * found. Where the change would leave its setting as it is, a note says so.
 */
export interface Outcome {
  recorded: boolean;
  refused: string[];
  found: string[];
  /** Whether the checks before an approval found something and the owner has not confirmed the approval. */
  unconfirmed: boolean;
  note?: string;
}

/** The change that the arguments of `sheriff settings` name, and whether `--confirm` is given. */
export function parseChange(args: string[]): { change: Change; confirm: boolean } {
  const confirm = args.at(-1) === "--confirm";
  const rest = confirm ? args.slice(0, -1) : args;
  const [what, a, b] = rest;
  let change: Change | null = null;
  if (what === "status" && rest.length === 2 && (a === "approved" || a === "draft")) change = { status: a };
  else if (what === "strict" && rest.length === 2 && (a === "on" || a === "off")) change = { strict: a === "on" };
  else if (what === "extension" && rest.length === 3 && a && (b === "on" || b === "off")) change = { extension: a, chosen: b === "on" };
  if (!change || (confirm && !("status" in change && change.status === "approved"))) throw new Error(USAGE);
  return { change, confirm };
}

/** The names of the extensions of the guidelines that the installed plugin delivers, or that this repository writes. */
export function deliveredExtensions(root: string): string[] {
  const dir = writesGuidelines(root) ? join(root, "specs", "_guidelines", "extensions") : join(CARRIED, "extensions");
  return existsSync(dir) ? readdirSync(dir).filter((n) => n.endsWith(".json")).map((n) => n.slice(0, -".json".length)).sort() : [];
}

/** The settings that only an owner changes, and every extension that the plugin delivers, one per line (s-chsfpkgpmfk4fft). */
export function settingsText(root: string): string {
  const { approved, strict, extensions } = ownerSettings(loadConfig(root), strictDefault(root));
  return [
    `status: ${approved ? "approved" : "draft"}`,
    `strict: ${strict ? "on" : "off"}`,
    ...deliveredExtensions(root).map((name) => `extension ${name}: ${extensions.has(name) ? "chosen" : "not chosen"}`),
    "",
  ].join("\n");
}

/** Appends an entry to the end of its list in `sheriff.config.json` (s-d3nkw9b6mn98vuw). */
function append(root: string, key: "approvalStatus" | "strict" | "extensions", entry: Record<string, unknown>): void {
  const path = join(root, FILE);
  const settings = JSON.parse(readFileSync(path, "utf8")) as Record<string, unknown>;
  settings[key] = [...(Array.isArray(settings[key]) ? (settings[key] as unknown[]) : []), entry];
  writeFileSync(path, JSON.stringify(settings, null, 2) + "\n");
}

/**
 * Makes one change, as the rules on the approval status, on the `strict` flag and on withdrawing an extension require
 * (s-chsfpkgpmfk4fft). `confirm` is the owner's confirmation of an approval for which the checks that run before an approval have
 * found problems. It is either given in advance or requested after the findings are known.
 */
export async function changeSetting(root: string, change: Change, { me, confirm = false }: { me: string; confirm?: boolean | ((found: string[]) => Promise<boolean>) }): Promise<Outcome> {
  const out: Outcome = { recorded: false, refused: [], found: [], unconfirmed: false };
  const spec = loadSpecification(root);
  const owners = specificationOwners(spec);
  if (!owners.includes(me)) {
    return { ...out, refused: [`${me || "whoever has no email set in git"} is not an owner of the specification, whose owners are ${owners.join(", ") || "not named"}: only an owner changes these settings`] };
  }
  const now = ownerSettings(loadConfig(root), strictDefault(root));
  if ("status" in change) {
    const approving = change.status === "approved";
    if (now.approved === approving) return { ...out, note: `the specification is already ${change.status}` };
    if (approving) {
      // While the strict flag is on, an approval is refused where turning the flag on would be refused (s-m59dqwkw2e96wne).
      if (now.strict) {
        const refused = await strictRefusals(root);
        if (refused.length) return { ...out, refused };
      }
      const found = await approvalChecks(root, me);
      if (found.length && !(typeof confirm === "function" ? await confirm(found) : confirm)) return { ...out, found, unconfirmed: true };
      out.found = found;
    }
    append(root, "approvalStatus", { status: change.status, by: me });
  } else if ("strict" in change) {
    if (now.strict === change.strict) return { ...out, note: `the strict flag is already ${change.strict ? "on" : "off"}` };
    if (change.strict) {
      const refused = await strictRefusals(root);
      if (refused.length) return { ...out, refused };
    }
    append(root, "strict", { on: change.strict, by: me });
  } else {
    const { extension: name, chosen } = change;
    if (now.extensions.has(name) === chosen) return { ...out, note: `the extension ${name} is already ${chosen ? "chosen" : "not chosen"}` };
    if (chosen && !deliveredExtensions(root).includes(name)) return { ...out, refused: [`the installed SpecSheriff plugin delivers no extension "${name}"`] };
    if (!chosen) {
      const refused = dependents(root, spec, name);
      if (refused.length) return { ...out, refused };
    }
    append(root, "extensions", { name, chosen, by: me });
  }
  return { ...out, recorded: true };
}

/**
 * The reasons for refusing to turn the `strict` flag on (s-nxgkp988mej79eg). The first is that a file of the specification fails
 * the check for a key written more than once or the validation against its schema. Each of the others is a check that the flag makes
 * stricter and that would refuse even a commit or a push that changes nothing. These checks run on the working tree as if the
 * specification were approved and the flag were on. Each reason names the command that lists what its check finds.
 */
async function strictRefusals(root: string): Promise<string[]> {
  const read = readAgainstSchema(root);
  if (read.findings.length) return [`${read.findings.length} problems in the files of the specification, which the check for a key written more than once or the validation against their schema finds: sheriff validate lists them`];
  const refused: string[] = [];
  const unbound = await untagged(root);
  if (unbound.length) refused.push(`${unbound.length} pieces of code and tests are bound by no SpecTag: sheriff untagged lists them`);
  const own = strictOwnChecks(root);
  if (own.length) refused.push(`${own.length} of the project's own checks would refuse: sheriff validate --strict lists what they find`);
  return refused;
}

/** One finding as the commands print it. */
const shown = (f: Finding) => `${f.where}: ${f.reported ? "reported: " : ""}${f.message}`;

/**
 * The checks before an approval (s-m59dqwkw2e96wne), made on a copy of the working tree in a repository of its own. The copy has
 * two commits. The second adds the nodes of the specification, the approvals in force, the system's code and tests, and the bindings
 * file. The first holds everything else that the repository keeps. In both commits, the settings contain an
 * entry that approves the specification, so that the checks treat the specification as approved. The copy is deleted after the checks.
 */
async function approvalChecks(root: string, me: string): Promise<string[]> {
  const base = mkdtempSync(join(tmpdir(), "sheriff-approval-"));
  const copy = join(base, "repository");
  const marked = process.env.SPECSHERIFF_GUIDELINES_REPO;
  try {
    const config = loadConfig(root);
    const spec = loadSpecification(root);
    const reads = reader(root, config, spec);
    const listed = git(root, "ls-files", "-co", "--exclude-standard", "-z");
    const paths = (listed.ok ? listed.out.split("\0") : []).filter((p) => p && existsSync(join(root, p)) && statSync(join(root, p)).isFile());
    const nodeFiles = new Set(specPaths(root).filter((p) => !isArchive(p)));
    const added = (path: string) => nodeFiles.has(path) || reads(path) !== null || path === BINDINGS;

    // The approval in force for each approved node: the last line that approves its current wording.
    const lines = existsSync(join(root, APPROVALS)) ? readFileSync(join(root, APPROVALS), "utf8").split("\n") : [];
    const inForce = new Set<number>();
    for (const [sid, { node, file, cell }] of spec.nodes) {
      if (file.taken || node.status !== "approved") continue;
      const print = fingerprint(node, cell);
      for (let i = lines.length - 1; i >= 0; i--) {
        const line = parseLine(lines[i]!);
        if (line?.sid === sid && line.fingerprint === print && !line.withdrawn) {
          inForce.add(i);
          break;
        }
      }
    }
    const settings = JSON.parse(readFileSync(join(root, FILE), "utf8")) as Record<string, unknown>;
    settings.approvalStatus = [...(Array.isArray(settings.approvalStatus) ? settings.approvalStatus : []), { status: "approved", by: me }];

    const put = (path: string, text: string | null) => {
      mkdirSync(dirname(join(copy, path)), { recursive: true });
      if (text === null) copyFileSync(join(root, path), join(copy, path));
      else writeFileSync(join(copy, path), text);
    };
    // Git commands run in the copy with no global or system configuration, so that none of the user's hooks or signing settings apply there.
    const empty = join(base, "empty.gitconfig");
    writeFileSync(empty, "");
    const env = { ...process.env, GIT_CONFIG_GLOBAL: empty, GIT_CONFIG_SYSTEM: empty, GIT_CONFIG_NOSYSTEM: "1" };
    const run = (...args: string[]) => spawnSync("git", args, { cwd: copy, env, encoding: "utf8" });
    mkdirSync(copy);
    for (const path of paths) if (!added(path) && path !== APPROVALS && path !== FILE) put(path, null);
    if (lines.length) put(APPROVALS, lines.filter((_, i) => !inForce.has(i)).join("\n"));
    put(FILE, JSON.stringify(settings, null, 2) + "\n");
    run("init", "-q");
    run("config", "user.email", me);
    run("config", "user.name", "sheriff settings");
    run("add", "-A");
    run("commit", "-q", "--allow-empty", "-m", "what the approval leaves unchanged");
    for (const path of paths) if (added(path)) put(path, null);
    if (lines.length) put(APPROVALS, lines.join("\n"));
    run("add", "-A");

    if (writesGuidelines(root)) process.env.SPECSHERIFF_GUIDELINES_REPO = copy;
    const found = [
      ...validate(copy, { before: parentSpecification(copy) ?? undefined }).map(shown),
      ...(await binding(copy)).map(shown),
      ...(await citationsOutside(copy)).map(shown),
    ];
    // The check for a node from which nothing is generated, made as `sheriff types` makes it, with no file written.
    const types = generateTypes(copy);
    found.push(...types.refusals.map(shown));
    for (const sid of types.leftOut) found.push(`${sid}: reported: left out of the types, since it relies on a RecordType that has never been approved`);
    for (const sid of types.named) found.push(`${sid}: reported: its last approved wording is found neither in the files nor on the current branch`);
    return found;
  } finally {
    if (marked === undefined) delete process.env.SPECSHERIFF_GUIDELINES_REPO;
    else process.env.SPECSHERIFF_GUIDELINES_REPO = marked;
    rmSync(base, { recursive: true, force: true });
  }
}

function parseLine(line: string): { sid?: string; fingerprint?: string; withdrawn?: boolean } | null {
  try {
    const value = JSON.parse(line) as unknown;
    return value && typeof value === "object" ? (value as { sid?: string; fingerprint?: string; withdrawn?: boolean }) : null;
  } catch {
    return null;
  }
}

/**
 * What depends on an extension of the guidelines (s-n4ny597qdv9c9bu). The function checks each node other than the extension's own
 * nodes, including the nodes in cells and the nodes of the archive. It also checks each reference and each kind in the project's
 * extension of the schema.
 */
function dependents(root: string, spec: Specification, name: string): string[] {
  const schemaPath = join(schemaDir(root), "extensions", `${name}.schema.json`);
  const ext = (existsSync(schemaPath) ? JSON.parse(readFileSync(schemaPath, "utf8")) : {}) as Extension;
  const own = `specs/_guidelines/extensions/${name}.json`;
  const sids = new Set([...spec.nodes].filter(([, at]) => at.file.path === own).map(([sid]) => sid));
  const kinds = new Set(Object.keys(ext.kinds ?? {}));
  const linkTypes = new Set(ext.linkTypes ?? []);
  const keysOf = (schema: unknown) => {
    const s = (schema ?? {}) as { properties?: Record<string, unknown> };
    return new Set(Object.keys(s.properties ?? s));
  };
  const linkKeys = keysOf(ext.link);
  const why = (node: SpecNode, archived: boolean): string[] => {
    const reasons: string[] = [];
    if (kinds.has(node.kind)) reasons.push(`its kind ${node.kind} is one that the extension adds`);
    const fields = keysOf(ext.fields?.[node.kind]);
    for (const key of Object.keys(node)) if (fields.has(key)) reasons.push(`it holds ${key}, a property that the extension adds to its kind`);
    for (const r of node.refs ?? []) {
      if (r.from) continue;
      if (linkTypes.has(r.type)) reasons.push(`it has a link of the type ${r.type}, which the extension adds`);
      for (const key of Object.keys(r)) if (linkKeys.has(key) && !["type", "to", "from"].includes(key)) reasons.push(`its link to ${r.to} holds ${key}, a property that the extension adds to a link`);
      if (!archived && r.to && sids.has(r.to)) reasons.push(`it links to ${r.to}, a node of the extension`);
    }
    return reasons;
  };
  const refused: string[] = [];
  for (const [sid, { node, file }] of spec.nodes) {
    if (file.taken || file.path === own) continue;
    for (const reason of why(node, false)) refused.push(`${file.path}: ${sid} (${node.location}): depends on the extension ${name}: ${reason}`);
  }
  for (const file of spec.archive) {
    const walk = (nodes: SpecNode[]) => nodes.forEach((node) => {
      for (const reason of why(node, true)) refused.push(`${file.path}: ${node.location}: depends on the extension ${name}: ${reason}`);
      walk(node.children ?? []);
    });
    walk(file.data.nodes);
  }
  // The project's extension of the schema also depends on the extension of the guidelines where it refers to a definition that this
  // extension adds or gives fields to a kind that this extension adds.
  const project = readExtension(root);
  if (project) {
    const defs = new Set(Object.keys(ext.$defs ?? {}));
    const visit = (value: unknown, pointer: string) => {
      if (!value || typeof value !== "object") return;
      for (const [key, inner] of Object.entries(value)) {
        const at = `${pointer}/${key.replaceAll("~", "~0").replaceAll("/", "~1")}`;
        if (key === "$ref" && typeof inner === "string" && defs.has(inner.replace(/^.*#\/\$defs\//, ""))) refused.push(`specs/_schema/project.schema.json: ${at}: a reference to ${inner}, a definition that the extension ${name} adds`);
        visit(inner, at);
      }
    };
    visit(project, "");
    for (const kind of Object.keys(project.fields ?? {})) if (kinds.has(kind)) refused.push(`specs/_schema/project.schema.json: /fields/${kind}: the fields of ${kind}, a kind that the extension ${name} adds`);
  }
  return refused;
}
