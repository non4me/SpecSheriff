import { spawnSync } from "node:child_process";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { REPO } from "./repo.ts";

/** A path as Claude Code hands it to a hook, with forward slashes. */
const slashed = (path: string) => path.replaceAll("\\", "/");

/** The plugin for Claude Code, as this repository builds it. */
export const PLUGIN = slashed(join(REPO, "skills", "claude-code"));

/** A plugins directory of its own, as Claude Code keeps one, and the environment that points the git hooks at it. */
export function plugins(): { dir: string; data: string; env: NodeJS.ProcessEnv } {
  const dir = slashed(mkdtempSync(join(tmpdir(), "sheriff-plugins-")));
  return { dir, data: `${dir}/data/specsheriff-specsheriff-marketplace`, env: { ...process.env, CLAUDE_CODE_PLUGIN_CACHE_DIR: dir } };
}

/** Runs one of the plugin's hooks as Claude Code does, in the project at `cwd`. */
export function pluginHook(name: string, p: ReturnType<typeof plugins>, cwd: string, input = "") {
  return spawnSync("sh", [`${PLUGIN}/hooks/${name}`], {
    cwd, input, encoding: "utf8",
    env: { ...p.env, CLAUDE_PLUGIN_ROOT: PLUGIN, CLAUDE_PLUGIN_DATA: p.data, CLAUDE_PROJECT_DIR: slashed(cwd) },
  });
}
