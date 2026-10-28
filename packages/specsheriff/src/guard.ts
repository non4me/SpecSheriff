import { existsSync, readFileSync } from "node:fs";
import { isAbsolute, join, relative, sep } from "node:path";
import { readCode, type CodeSymbol } from "./code.ts";
import { loadConfig, readsAs } from "./config.ts";
import { holds, readConfirmations } from "./confirmations.ts";
import { codeChanges, trackedFiles, type Line } from "./diff.ts";
import { fingerprint, ownerOf } from "./model.ts";
import { judgedHere } from "./reindex.ts";
import { loadSpecification, specificationOf, type SpecFile, type SpecNode } from "./spec-files.ts";

interface Edit {
  old_string: string;
  new_string: string;
  replace_all?: boolean;
}

/** The input an agent's harness hands a hook before a tool runs: the tool, and what it is given. */
export interface HookInput {
  tool_name?: string;
  tool_input?: { file_path?: string; content?: string; edits?: Edit[] } & Partial<Edit>;
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
 * Judges an edit an agent is about to make: the reason it is refused, or null where it may be made.
 * It refuses an edit that would leave a node checked over a wording its owner never confirmed, or
 * change the code of a rule no test carries the sid of.
 */
export async function guard(root: string, input: HookInput): Promise<string | null> {
  const tool = input.tool_name ?? "";
  const given = input.tool_input;
  if (!given?.file_path || !["Write", "Edit", "MultiEdit"].includes(tool)) return null;
  const path = relative(root, isAbsolute(given.file_path) ? given.file_path : join(root, given.file_path)).split(sep).join("/");
  if (path.startsWith("..")) return null;
  const current = existsSync(join(root, path)) ? readFileSync(join(root, path), "utf8") : "";
  const next = afterEdit(tool, given, current);
  if (next === null) return null;
  const config = loadConfig(root);
  const reasons: string[] = [];

  if (path.startsWith("specs/") && path.endsWith(".json") && !path.startsWith("specs/_schema/")) {
    let data: SpecFile["data"];
    try {
      data = JSON.parse(next);
    } catch {
      return null;
    }
    const spec = loadSpecification(root);
    const was = new Map<string, SpecNode>();
    for (const [sid, at] of spec.nodes) if (at.file.path === path) was.set(sid, at.node);
    const edited = specificationOf([...spec.files.filter((f) => f.path !== path), ...spec.archive, { path, data }]);
    const lines = readConfirmations(root);
    for (const [sid, { node, file }] of edited.nodes) {
      if (file.path !== path || node.status !== "checked" || !judgedHere(path, config.writesCore)) continue;
      const old = was.get(sid);
      const touched = !old || old.status !== "checked" || fingerprint(old) !== fingerprint(node);
      if (touched && !holds(edited, lines, sid)) {
        reasons.push(`${sid} (${node.id}) would stand checked over a wording its owner ${ownerOf(edited, sid) ?? "(none named)"} has not confirmed: leave its status empty for its owner to confirm`);
      }
    }
  }

  if (readsAs(config, path) === "code") {
    const now = await readCode(path, next);
    const old = await readCode(path, current);
    if (now) {
      const real = codeChanges([{ path, ...changedLines(current, next) }]).get(path)!;
      const all = (symbols: CodeSymbol[]): CodeSymbol[] => symbols.flatMap((s) => [s, ...all(s.inner)]);
      const at = (symbols: CodeSymbol[], line: number) => all(symbols).filter((s) => (s.start <= line && line <= s.end) || s.tags.some((t) => t.line === line));
      const touched = new Set<CodeSymbol>();
      for (const line of real.added) at(now.symbols, line).forEach((s) => touched.add(s));
      for (const line of real.removed) {
        for (const s of at(old?.symbols ?? [], line)) all(now.symbols).filter((n) => n.name === s.name).forEach((n) => touched.add(n));
      }
      const spec = loadSpecification(root);
      const rules = new Set<string>();
      for (const s of touched) for (const t of s.tags) if (t.sid && spec.nodes.get(t.sid)?.node.kind === "rule") rules.add(t.sid);
      if (rules.size) {
        const tested = new Set<string>();
        for (const p of trackedFiles(root).filter((p) => readsAs(config, p) === "tests" && existsSync(join(root, p)))) {
          const read = await readCode(p, readFileSync(join(root, p), "utf8"));
          for (const t of read?.tests ?? []) if (t.sid) tested.add(t.sid);
        }
        for (const sid of rules) {
          if (!tested.has(sid)) reasons.push(`no test carries ${sid} (${spec.nodes.get(sid)!.node.id}), a rule whose code this edit changes: write its test first`);
        }
      }
    }
  }
  return reasons.length ? reasons.join("\n") : null;
}
