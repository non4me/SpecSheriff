import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, symlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { REPO } from "./repo.ts";

/** A path as Claude Code hands it to a hook, with forward slashes. */
export const slashed = (path: string) => path.replaceAll("\\", "/");

/** The plugin for Claude Code, as this repository builds it. */
export const PLUGIN = slashed(join(REPO, "skills", "claude-code"));

/** The plugin for Codex CLI, as this repository builds it. */
export const CODEX_PLUGIN = slashed(join(REPO, "skills", "codex"));

/** A plugins directory of its own, as Claude Code keeps one, and the environment that points the git hooks at it. */
export function plugins(): { dir: string; data: string; env: NodeJS.ProcessEnv } {
  const dir = slashed(mkdtempSync(join(tmpdir(), "sheriff-plugins-")));
  // A Codex home of its own, empty, so that no plugin for Codex CLI installed on the machine is found.
  const codex = slashed(mkdtempSync(join(tmpdir(), "sheriff-no-codex-")));
  return { dir, data: `${dir}/data/specsheriff-specsheriff-marketplace`, env: { ...process.env, CLAUDE_CODE_PLUGIN_CACHE_DIR: dir, CODEX_HOME: codex } };
}

/** Runs one of the plugin's hooks as Claude Code does, in the project at `cwd`. */
export function pluginHook(name: string, p: ReturnType<typeof plugins>, cwd: string, input = "") {
  return spawnSync("sh", [`${PLUGIN}/hooks/${name}`], {
    cwd, input, encoding: "utf8",
    env: { ...p.env, CLAUDE_PLUGIN_ROOT: PLUGIN, CLAUDE_PLUGIN_DATA: p.data, CLAUDE_PROJECT_DIR: slashed(cwd) },
  });
}

/** Where Codex keeps the installed version of the plugin for Codex CLI, in the Codex home `home`. */
export const codexCache = (home: string) => `${home}/plugins/cache/specsheriff-marketplace/specsheriff`;

/** A Codex home of its own and the environment naming it, its cache holding the plugin for Codex CLI as this repository builds it where `installed`. */
export function codexHome(installed = true): { home: string; env: NodeJS.ProcessEnv } {
  const home = slashed(mkdtempSync(join(tmpdir(), "sheriff-codex-")));
  if (installed) {
    mkdirSync(codexCache(home), { recursive: true });
    symlinkSync(CODEX_PLUGIN, `${codexCache(home)}/0.0.0`, "junction");
  }
  // A plugins directory of Claude Code of its own, empty, so that no copy the plugin for Claude Code keeps on the machine is found.
  const claude = slashed(mkdtempSync(join(tmpdir(), "sheriff-no-claude-")));
  return { home, env: { ...process.env, CODEX_HOME: home, CLAUDE_CODE_PLUGIN_CACHE_DIR: claude } };
}

/** Runs the agent's hook for Codex that `event` names in the project's `.codex/hooks.json`, as Codex runs a hook's command. */
export function codexHook(event: string, codex: ReturnType<typeof codexHome>, cwd: string, input = "") {
  const { hooks } = JSON.parse(readFileSync(join(cwd, ".codex", "hooks.json"), "utf8"));
  const ours = (hooks?.[event] ?? []).flatMap((e: { hooks: Array<{ command: string }> }) => e.hooks.map((h) => h.command)).filter((c: string) => c.includes("specsheriff"));
  if (ours.length !== 1) throw new Error(`${event}: ${ours.length} hooks of SpecSheriff`);
  return spawnSync("sh", ["-c", ours[0]], { cwd, input, encoding: "utf8", env: codex.env });
}
