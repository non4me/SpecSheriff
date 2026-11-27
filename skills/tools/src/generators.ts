import { spawnSync } from "node:child_process";
import { isAbsolute, posix } from "node:path";
import { approvedWordings } from "./approved-wording.ts";
import { modelFlags, readsAs, type Config } from "./config.ts";
import { modelOf } from "./model.ts";
import type { Specification } from "./spec-files.ts";
import type { Finding } from "./validate.ts";

/** A file that a project's own generator prints: its path, its content, the sids of the nodes it is written from, and its generator. */
export interface ProjectFile {
  path: string;
  text: string;
  sids: string[];
  generator: string;
  /** The rule that lists the generator, and whether that rule is a draft, in which case `sheriff types` writes none of the generator's files. */
  rule: string;
  draft: boolean;
}

/**
 * Runs each of the project's own generators (s-km4x4s26kv7pjze) as `sheriff types` runs it (s-y5yk7eu6h4zrjpr): by the command
 * that the settings name, in the root of the repository, with the model of the specification in the last approved wording of
 * each node on its standard input. A generator whose rule is a draft runs only where `drafts` asks for it, to learn its paths.
 * `waiting` names the draft rules. A generator is refused where its rule does not list it, where it exits with a non-zero status,
 * where it prints anything other than a JSON array of objects holding `path`, `content` and `sids`, where a path lies outside
 * the system's code, and where the `sids` of a file name a node outside the model that it is handed.
 */
export function runGenerators(root: string, spec: Specification, config: Config, drafts = false): { files: ProjectFile[]; refusals: Finding[]; waiting: string[] } {
  const files: ProjectFile[] = [];
  const refusals: Finding[] = [];
  const waiting = new Set<string>();
  if (!config.generators.length) return { files, refusals, waiting: [] };
  const model = modelOf(spec, modelFlags(root, config, spec), approvedWordings(root, spec));
  const handed = new Set(model.nodes.map((n) => n.sid));
  const input = JSON.stringify(model);
  for (const g of config.generators) {
    const where = `generator "${g.name}"`;
    const rule = spec.nodes.get(g.rule)?.node;
    const list = rule?.list as { members?: unknown[]; property?: string } | undefined;
    const listed = list?.members?.some((m) => Boolean(m) && typeof m === "object" && (m as Record<string, unknown>)[list.property ?? "name"] === g.name);
    if (!listed) {
      refusals.push({ where, message: `the settings name a generator that the rule ${g.rule} does not list` });
      continue;
    }
    const draft = rule?.status !== "approved";
    if (draft) waiting.add(g.rule);
    if (draft && !drafts) continue;
    const run = spawnSync(g.command, { cwd: root, input, shell: true, encoding: "utf8", maxBuffer: 1 << 26 });
    if (run.status !== 0) {
      refusals.push({ where, message: `${run.stdout ?? ""}${run.stderr ?? ""}`.trim() || `ended with exit status ${run.status}` });
      continue;
    }
    let printed: unknown;
    try {
      printed = JSON.parse(run.stdout);
    } catch {
      printed = null;
    }
    const isFile = (f: unknown): f is { path: string; content: string; sids: unknown[] } =>
      Boolean(f) && typeof f === "object" && typeof (f as Record<string, unknown>).path === "string" && typeof (f as Record<string, unknown>).content === "string" && Array.isArray((f as Record<string, unknown>).sids);
    if (!Array.isArray(printed) || !printed.every(isFile)) {
      refusals.push({ where, message: "printed something other than a JSON array of objects holding path, content and sids" });
      continue;
    }
    for (const f of printed) {
      const raw = f.path.replaceAll("\\", "/");
      const path = posix.normalize(raw);
      // A path outside the repository's root, absolute, or matched by no glob pattern of the system's code or its tests (s-hheus6f395ynqvc).
      if (!raw || isAbsolute(raw) || /^[A-Za-z]:/.test(raw) || path === ".." || path.startsWith("../") || readsAs(config, path) === null) {
        refusals.push({ where, message: `prints ${raw}, a path outside the system's code` });
        continue;
      }
      const sids = f.sids.map(String);
      const foreign = sids.filter((s) => !handed.has(s));
      if (foreign.length) {
        refusals.push({ where, message: `prints ${path} from ${foreign.join(", ")}, outside the model that it is handed` });
        continue;
      }
      files.push({ path, text: f.content, sids, generator: g.name, rule: g.rule, draft });
    }
  }
  return { files, refusals, waiting: [...waiting] };
}

/**
 * The paths for which `sheriff types` would write different texts (s-dbk2vyeg8z5jxna), such as a path that two generators print
 * with different content. Each path is named together with each generator that prints it.
 */
export function clashes(files: Array<{ path: string; text: string; by: string }>): Finding[] {
  const byPath = new Map<string, Array<{ text: string; by: string }>>();
  for (const f of files) byPath.set(f.path, [...(byPath.get(f.path) ?? []), f]);
  const found: Finding[] = [];
  for (const [path, all] of byPath) {
    if (new Set(all.map((f) => f.text)).size < 2) continue;
    const writers = [...new Set(all.map((f) => f.by))];
    found.push({ where: path, message: `sheriff types would write different texts at this path: those of ${writers.join(" and ")}` });
  }
  return found;
}
