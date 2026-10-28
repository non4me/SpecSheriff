import { chmodSync, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { git } from "./diff.ts";
import { newSid } from "./reindex.ts";
import { canonical } from "./spec-files.ts";

export interface InitReport {
  written: string[];
  /** Files that differ from what init would write, left as they are. */
  left: string[];
  notes: string[];
}

const ASSETS = fileURLToPath(new URL("../assets/", import.meta.url));
const CORE = fileURLToPath(new URL("../core/", import.meta.url));

type HookEntry = { matcher?: string; hooks: Array<{ type: string; command: string }> };
type Settings = { hooks?: Record<string, HookEntry[]>; [key: string]: unknown };

function files(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? files(join(dir, e.name)).map((f) => `${e.name}/${f}`) : [e.name]));
}

/**
 * What init writes, by the path it writes it to: the hooks, the agent's hook, the skills, and the
 * core — except in the repository the core is written in, where the core is the source of the copy
 * the toolset carries, not a copy of it.
 */
function plan(writesCore: boolean): Map<string, { text: string; executable: boolean }> {
  const out = new Map<string, { text: string; executable: boolean }>();
  const add = (to: string, from: string, executable = false) => out.set(to, { text: readFileSync(from, "utf8"), executable });
  for (const f of files(join(ASSETS, "githooks"))) add(`.githooks/${f}`, join(ASSETS, "githooks", f), true);
  for (const f of files(join(ASSETS, "claude", "hooks"))) add(`.claude/hooks/${f}`, join(ASSETS, "claude", "hooks", f), true);
  for (const f of files(join(ASSETS, "skills"))) add(`.claude/skills/${f}`, join(ASSETS, "skills", f));
  if (!writesCore) {
    for (const name of ["spec.json", "tools.json"]) add(`specs/_guidelines/${name}`, join(CORE, name));
    for (const f of files(join(CORE, "_schema"))) add(`specs/_schema/${f}`, join(CORE, "_schema", f));
  }
  return out;
}

function writesCore(root: string): boolean {
  try {
    return JSON.parse(readFileSync(join(root, "sheriff.config.json"), "utf8")).writesCore === true;
  } catch {
    return false;
  }
}

/** Adds each of its hooks to the agent's settings where no hook already runs the same command. */
function mergeSettings(settings: Settings, ours: Settings): boolean {
  let changed = false;
  settings.hooks ??= {};
  for (const [event, entries] of Object.entries(ours.hooks ?? {})) {
    const theirs = (settings.hooks[event] ??= []);
    for (const entry of entries) {
      const present = theirs.some((e) => e.hooks?.some((h) => entry.hooks.some((o) => o.command === h.command)));
      if (!present) {
        theirs.push(entry);
        changed = true;
      }
    }
  }
  return changed;
}

/** Sets a repository up for the toolset, replacing no file that differs from what it would write. */
export function init(root: string): InitReport {
  const report: InitReport = { written: [], left: [], notes: [] };
  const write = (path: string, text: string, executable = false) => {
    const full = join(root, path);
    if (existsSync(full)) {
      if (readFileSync(full, "utf8") !== text) report.left.push(path);
      return;
    }
    mkdirSync(dirname(full), { recursive: true });
    writeFileSync(full, text);
    if (executable) chmodSync(full, 0o755);
    report.written.push(path);
  };
  for (const [path, { text, executable }] of plan(writesCore(root))) write(path, text, executable);

  const settingsPath = join(root, ".claude", "settings.json");
  const ours = JSON.parse(readFileSync(join(ASSETS, "claude", "settings.hooks.json"), "utf8")) as Settings;
  let settings: Settings = {};
  let readable = true;
  if (existsSync(settingsPath)) {
    try {
      settings = JSON.parse(readFileSync(settingsPath, "utf8"));
    } catch {
      readable = false;
      report.left.push(".claude/settings.json");
      report.notes.push(".claude/settings.json is not JSON: the agent's hooks were not added");
    }
  }
  if (readable && mergeSettings(settings, ours)) {
    mkdirSync(dirname(settingsPath), { recursive: true });
    writeFileSync(settingsPath, JSON.stringify(settings, null, 2) + "\n");
    report.written.push(".claude/settings.json");
  }

  if (git(root, "config", "core.hooksPath").out.trim() !== ".githooks") {
    if (git(root, "config", "core.hooksPath", ".githooks").ok) report.notes.push("the git hooks are turned on: core.hooksPath is .githooks");
    else report.notes.push("not a git repository: turn the hooks on with git config core.hooksPath .githooks");
  }

  if (!existsSync(join(root, "sheriff.config.json"))) {
    write("sheriff.config.json", JSON.stringify({ code: [], tests: [] }, null, 2) + "\n");
    report.notes.push("name in sheriff.config.json where the system's code and its tests live, and the testCommand");
  }
  if (!existsSync(join(root, "specs", "_guidelines", "project.json"))) {
    const owner = git(root, "config", "user.email").out.trim();
    if (!owner) report.notes.push("git names no email: specs/_guidelines/project.json was not written; set git config user.email and run sheriff init again");
    else {
      const project = { schemaVersion: 1, scope: "_guidelines", section: "project", nodes: [{
        id: "_guidelines/project", sid: newSid(new Set()), kind: "section", title: "The project's own guidelines", status: "",
        text: "What only this project's specification needs beyond the core.", owner, refs: [],
      }] };
      write("specs/_guidelines/project.json", canonical(project));
    }
  }
  return report;
}
