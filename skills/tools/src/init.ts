import { chmodSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { git } from "./diff.ts";
import { newSid } from "./reindex.ts";
import { canonical } from "./spec-files.ts";

export interface InitReport {
  written: string[];
  /** Files that differ from what init would write, left as they are. */
  left: string[];
  notes: string[];
}

/** Every git hook init writes: a call to its script in the data directory of the plugin for Claude Code. */
const HOOK = readFileSync(new URL("../assets/githook", import.meta.url), "utf8");

/** What a project declares to Claude Code: the marketplace, read from the branch release, and the plugin. */
const DECLARED: Record<string, Record<string, unknown>> = {
  extraKnownMarketplaces: {
    "specsheriff-marketplace": { source: { source: "github", repo: "non4me/SpecSheriff", ref: "release" }, autoUpdate: true },
  },
  enabledPlugins: { "specsheriff@specsheriff-marketplace": true },
};

/** Sets a repository up for the SpecSheriff tools, replacing no file that differs from what it would write. */
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
  for (const hook of ["pre-commit", "commit-msg", "pre-push"]) write(`.githooks/${hook}`, HOOK, true);

  // The marketplace and the plugin are added beside every other key; a declaration of them that says otherwise is left as it is.
  const settingsPath = join(root, ".claude", "settings.json");
  let settings: Record<string, unknown> = {};
  let readable = true;
  if (existsSync(settingsPath)) {
    try {
      settings = JSON.parse(readFileSync(settingsPath, "utf8"));
    } catch {
      readable = false;
      report.left.push(".claude/settings.json");
      report.notes.push(".claude/settings.json is not JSON: the marketplace and the plugin were not declared");
    }
  }
  let changed = false;
  let differs = false;
  for (const [key, entries] of readable ? Object.entries(DECLARED) : []) {
    const held = (settings[key] ??= {}) as Record<string, unknown>;
    for (const [name, value] of Object.entries(entries)) {
      if (!(name in held)) (held[name] = value), (changed = true);
      else if (JSON.stringify(held[name]) !== JSON.stringify(value)) differs = true;
    }
  }
  if (differs) report.left.push(".claude/settings.json");
  if (changed) {
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
        text: "What only this project's specification needs beyond the SpecSheriff guidelines.", owner, refs: [],
      }] };
      write("specs/_guidelines/project.json", canonical(project));
    }
  }
  return report;
}
