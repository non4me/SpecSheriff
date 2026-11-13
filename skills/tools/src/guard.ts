import { existsSync, readFileSync } from "node:fs";
import { isAbsolute, join, relative, sep } from "node:path";
import { readCode, type CodeSymbol } from "./code.ts";
import { loadConfig, readsAs } from "./config.ts";
import { APPROVALS, readApprovals, stands } from "./approvals.ts";
import { codeChanges, spelledIn, trackedFiles, type Line } from "./diff.ts";
import { fingerprint, isContainer } from "./model.ts";
import { patchedFiles, PatchError, type EditedFile } from "./patch.ts";
import { judgedHere } from "./reindex.ts";
import { loadSpecification, specificationOf, type SpecFile, type SpecNode } from "./spec-files.ts";

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

/** The lines an edit changes, both sides: what lies between the lines the two texts share at their start and at their end. */
function changedLines(before: string, after: string): { removed: Line[]; added: Line[] } {
  const a = before.split("\n");
  const b = after.split("\n");
  let start = 0;
  while (start < a.length && start < b.length && a[start] === b[start]) start++;
  let end = 0;
  while (end < a.length - start && end < b.length - start && a[a.length - 1 - end] === b[b.length - 1 - end]) end++;
  const lines = (all: string[]) => all.slice(start, all.length - end).map((text, i) => ({ line: start + i + 1, text }));
  return { removed: lines(a), added: lines(b) };
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
  const config = loadConfig(root);
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
    const was = new Map<string, SpecNode>();
    for (const [sid, at] of spec.nodes) if (edited.has(at.file.path)) was.set(sid, at.node);
    const written = [...edited].flatMap(([path, data]) => (data ? [{ path, data }] : []));
    const after = specificationOf([...spec.files.filter((f) => !edited.has(f.path)), ...spec.archive, ...written]);
    const lines = readApprovals(root);
    for (const [sid, { node, file }] of after.nodes) {
      if (node.status !== "approved" || isContainer(node.kind) || !judgedHere(file.path, config.writesSpecSheriffGuidelines)) continue;
      if (stands(lines, sid, fingerprint(node))) continue;
      const old = was.get(sid);
      // A node the edit leaves as it was is the reindex's to make a draft, not this edit's fault.
      const touched = edited.has(file.path) && (!old || old.status !== "approved" || fingerprint(old) !== fingerprint(node));
      if (touched) reasons.push(`${sid} (${node.location}) would stand approved over a wording for which no approval stands: leave it a draft for one of its owners to approve`);
    }
  }

  const code = files.filter((f) => readsAs(config, f.path) === "code");
  if (code.length) {
    const instead = new Map(files.map((f) => [f.path, f.after]));
    const spelled = await spelledIn(root, (p) => readsAs(config, p) !== null, instead);
    const touched = new Set<CodeSymbol>();
    for (const { path, before, after } of code) {
      const next = after ?? "";
      const now = await readCode(path, next);
      const old = await readCode(path, before);
      if (!now) continue;
      const real = (await codeChanges([{ path, ...changedLines(before, next) }], { before: () => before, after: () => next, spelled })).get(path)!;
      const all = (symbols: CodeSymbol[]): CodeSymbol[] => symbols.flatMap((s) => [s, ...all(s.inner)]);
      const at = (symbols: CodeSymbol[], line: number) => all(symbols).filter((s) => (s.start <= line && line <= s.end) || s.tags.some((t) => t.line === line));
      for (const line of real.added) at(now.symbols, line).forEach((s) => touched.add(s));
      for (const line of real.removed) {
        for (const s of at(old?.symbols ?? [], line)) all(now.symbols).filter((n) => n.name === s.name).forEach((n) => touched.add(n));
      }
    }
    const spec = loadSpecification(root);
    const rules = new Set<string>();
    for (const s of touched) for (const t of s.tags) if (t.sid && spec.nodes.get(t.sid)?.node.kind === "TextRule") rules.add(t.sid);
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
