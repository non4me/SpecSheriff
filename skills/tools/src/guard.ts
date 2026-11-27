import { existsSync, readFileSync } from "node:fs";
import { isAbsolute, join, relative, sep } from "node:path";
import { readCode, type Tag } from "./code.ts";
import { loadConfig, readsAs } from "./config.ts";
import { APPROVALS, readApprovals, stands } from "./approvals.ts";
import { trackedFiles } from "./diff.ts";
import { compareFiles } from "./versions.ts";
import { fingerprint, isContainer, isProjectKind } from "./model.ts";
import { patchedFiles, PatchError, type EditedFile } from "./patch.ts";
import { judgedHere } from "./reindex.ts";
import { missingExtensions, needsCode } from "./schema.ts";
import { BINDINGS, parseBindings } from "./bindings.ts";

/** The keys of `sheriff.config.json` whose lists record the settings that only an owner of the specification changes (s-d3nkw9b6mn98vuw). */
const OWNER_LISTS = ["approvalStatus", "strict", "extensions"];
import { loadSpecification, specificationOf, writesGuidelines, type Located, type SpecFile, type SpecNode } from "./spec-files.ts";

interface Edit {
  old_string: string;
  new_string: string;
  replace_all?: boolean;
}

/**
 * The input an agent's harness hands a hook before a tool runs: the tool, what it is given, and the
 * directory the session works in. Claude Code's file tools name a file; Codex's `apply_patch` gives a
 * patch as its command.
 */
export interface HookInput {
  tool_name?: string;
  cwd?: string;
  tool_input?: { file_path?: string; content?: string; edits?: Edit[]; command?: string } & Partial<Edit>;
}

function apply(text: string, edit: Edit): string | null {
  if (!text.includes(edit.old_string)) return null;
  return edit.replace_all ? text.split(edit.old_string).join(edit.new_string) : text.replace(edit.old_string, () => edit.new_string);
}

/** The file as the edit would leave it, or null where the edit would not apply and the tool refuses it itself. */
function afterEdit(tool: string, input: NonNullable<HookInput["tool_input"]>, current: string): string | null {
  if (tool === "Write") return input.content ?? "";
  if (tool === "Edit") return apply(current, input as Edit);
  if (tool === "MultiEdit") {
    let text: string | null = current;
    for (const e of input.edits ?? []) text = text === null ? null : apply(text, e);
    return text;
  }
  return null;
}

/**
 * Judges an edit an agent is about to make, made with the file tools or as a patch in Codex's format:
 * the reason it is refused, or null where it may be made. It refuses an edit that would leave a node
 * approved over a wording for which no approval stands, or change the code of a rule no test carries the SpecTag
 * of, and a patch whole where it refuses one of its files or cannot read or apply the patch.
 */
export async function guard(root: string, input: HookInput): Promise<string | null> {
  const tool = input.tool_name ?? "";
  const given = input.tool_input;
  let files: EditedFile[];
  if (tool === "apply_patch") {
    try {
      files = patchedFiles(root, input.cwd ?? root, given?.command ?? "");
    } catch (error) {
      if (error instanceof PatchError) return error.message;
      throw error;
    }
  } else {
    if (!given?.file_path || !["Write", "Edit", "MultiEdit"].includes(tool)) return null;
    const path = relative(root, isAbsolute(given.file_path) ? given.file_path : join(root, given.file_path)).split(sep).join("/");
    if (path.startsWith("..")) return null;
    if (path === APPROVALS) return judge(root, [{ path, before: "", after: "" }]);
    const current = existsSync(join(root, path)) ? readFileSync(join(root, path), "utf8") : "";
    const next = afterEdit(tool, given, current);
    if (next === null) return null;
    files = [{ path, before: current, after: next }];
  }
  return judge(root, files.filter((f) => !f.path.startsWith("..")));
}

/** Judges the files an edit touches, each as it is and as the edit leaves it, together. */
async function judge(root: string, files: EditedFile[]): Promise<string | null> {
  // Only the procedure that records an approval or withdraws one writes the approvals.
  if (files.some((f) => f.path === APPROVALS)) {
    return `${APPROVALS} is written by sheriff approve alone, which records an approval or its withdrawal: leave the node a draft for one of its owners to approve`;
  }
  // Only `sheriff settings` changes the lists that record the settings only an owner changes (s-st6td4mua9uqt9z). A settings file
  // that is missing or is not valid JSON is treated as holding none of those lists.
  const settings = files.find((f) => f.path === "sheriff.config.json");
  if (settings) {
    const lists = (text: string | null) => {
      let value: Record<string, unknown> = {};
      try {
        value = (JSON.parse(text ?? "") ?? {}) as Record<string, unknown>;
      } catch {
        // treated as holding none of the lists
      }
      return OWNER_LISTS.map((key) => JSON.stringify(value[key] ?? []));
    };
    const was = lists(settings.before);
    const now = lists(settings.after);
    const changed = OWNER_LISTS.filter((_, i) => was[i] !== now[i]);
    if (changed.length) return `sheriff.config.json: the edit changes ${changed.join(", ")}, which an owner of the specification changes only with sheriff settings`;
  }
  const config = loadConfig(root);
  // Every edit is refused while a chosen extension of the guidelines is missing from the plugin (s-mhsb6fjsq5xn6c9).
  const missing = missingExtensions(root);
  if (missing.length) return missing.map((m) => `${m.where}: ${m.message}`).join("\n");
  const reasons: string[] = [];

  // The specification as the edit leaves it: each edited file of it read, a deleted one gone, one that is not JSON left to the checks after the edit.
  const edited = new Map<string, SpecFile["data"] | null>();
  for (const f of files.filter((f) => f.path.startsWith("specs/") && f.path.endsWith(".json") && !f.path.startsWith("specs/_schema/"))) {
    if (f.after === null) edited.set(f.path, null);
    else {
      try {
        edited.set(f.path, JSON.parse(f.after));
      } catch {
        // judged by the checks after the edit
      }
    }
  }
  if (edited.size) {
    const spec = loadSpecification(root);
    const was = new Map<string, Located>();
    for (const [sid, at] of spec.nodes) if (edited.has(at.file.path)) was.set(sid, at);
    const written = [...edited].flatMap(([path, data]) => (data ? [{ path, data }] : []));
    const after = specificationOf([...spec.files.filter((f) => !edited.has(f.path)), ...spec.archive, ...written]);
    const lines = readApprovals(root);
    for (const [sid, { node, file, cell }] of after.nodes) {
      if (node.status !== "approved" || isContainer(node.kind) || !judgedHere(file.path, writesGuidelines(root))) continue;
      if (stands(lines, sid, fingerprint(node, cell))) continue;
      const old = was.get(sid);
      // A node the edit leaves as it was is the reindex's to make a draft, not this edit's fault.
      const touched = edited.has(file.path) && (!old || old.node.status !== "approved" || fingerprint(old.node, old.cell) !== fingerprint(node, cell));
      if (touched) reasons.push(`${file.path}: ${sid} (${node.location}) would stand approved over a wording for which no approval stands: leave it a draft for one of its owners to approve`);
    }
  }

  const code = files.filter((f) => readsAs(config, f.path) === "code");
  const bindingsEdit = files.find((f) => f.path === BINDINGS);
  if (code.length || bindingsEdit) {
    const instead = new Map(files.map((f) => [f.path, f.after]));
    // The SpecTags of each unit of code that the edit adds or changes: a symbol, the code outside every symbol, or a file bound as a
    // whole. The units are found by comparing the file before and after the edit, as s-2x58az67bm6cxq2 compares a file in a commit
    // with the same file in the commit's parent.
    const touched: Tag[][] = [];
    for (const { path, before, after } of code) {
      const now = await readCode(path, after ?? "");
      if (!now) continue;
      const { added, changed } = compareFiles(await readCode(path, before), now);
      for (const u of [...added, ...changed]) touched.push(u.tags);
    }
    // An entry of the bindings file that the edit adds or changes is treated as a change to the file that the entry names.
    if (bindingsEdit) {
      const was = parseBindings(bindingsEdit.before).entries;
      const now = parseBindings(bindingsEdit.after).entries;
      for (const [path, tags] of now) if (JSON.stringify(tags) !== JSON.stringify(was.get(path) ?? null)) touched.push(tags);
    }
    const spec = loadSpecification(root);
    // The kinds of node that a SpecTag names as a rule (s-5z5gnu7pahr82xp).
    const needs = needsCode(root);
    const isRule = (kind?: string) => kind === "TextRule" || kind === "TableRule" || kind === "RecordType" || Boolean(kind && isProjectKind(kind) && needs(kind));
    const rules = new Set<string>();
    for (const tags of touched) for (const g of tags) if (g.sid && isRule(spec.nodes.get(g.sid)?.node.kind)) rules.add(g.sid);
    if (rules.size) {
      // The tests as the edit leaves them: those the working tree holds, and those the edit writes.
      const tested = new Set<string>();
      const bare = new Set<string>();
      const tests = new Set([...trackedFiles(root), ...instead.keys()].filter((p) => readsAs(config, p) === "tests"));
      for (const p of tests) {
        const text = instead.has(p) ? instead.get(p)! : existsSync(join(root, p)) ? readFileSync(join(root, p), "utf8") : null;
        if (text === null) continue;
        const read = await readCode(p, text);
        for (const t of read?.tests ?? []) {
          if (t.sid) tested.add(t.sid);
          else if (t.bare) bare.add(t.bare);
        }
      }
      for (const sid of rules) {
        if (tested.has(sid)) continue;
        const reason = `no test carries the SpecTag of ${sid} (${spec.nodes.get(sid)!.node.location}), a rule whose code this edit changes`;
        // A test naming it by a bare sid, as an earlier release read it, is named with the command writing its SpecTag (s-utf4mbt7ref8g9c).
        reasons.push(bare.has(sid) ? `${reason}: a test names it by the bare sid, the form an earlier release read, and sheriff reindex writes its SpecTag` : `${reason}: write its test first`);
      }
    }
  }
  return reasons.length ? reasons.join("\n") : null;
}
