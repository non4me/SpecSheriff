// Sets up, with the SpecSheriff tools of the release under test, the neutral project in which the test cases of the
// SpecSheriff skills run. The neutral project is a small project that takes nothing from any real project. The script:
// - runs `sheriff init`;
// - runs `sheriff reindex`, which gives each node its sid;
// - replaces each SpecTag written as `@spec {{<title of a rule>}}` with the SpecTag that names that rule's sid;
// - approves every rule and the specification, as the project's owner;
// - runs `sheriff validate`, `sheriff binding`, `sheriff citations` and the project's tests;
// - stops if any of them fails, and otherwise makes the first commit.
//
//   node internal/skill-evals/setup-project.mjs <tools> <target>
//
// <tools> is the folder of the built SpecSheriff tools that the plugin for Claude Code delivers, such as
// skills/claude-code/tools. <target> is an empty folder or one that does not exist yet. The project's settings do not
// declare the plugin, so that each run of a test case either loads the plugin or leaves it out.
import { spawnSync } from "node:child_process";
import { cpSync, existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const OWNER = "owner@example.org";
const TEMPLATE = join(dirname(fileURLToPath(import.meta.url)), "project");

function run(cwd, command, args) {
  const r = spawnSync(command, args, { cwd, encoding: "utf8" });
  if (r.status !== 0) throw new Error(`${command} ${args.join(" ")} failed in ${cwd}:\n${r.stdout}${r.stderr}`);
  return r.stdout;
}

/** Every file under a folder, as paths relative to it. */
function files(root, dir = "") {
  return readdirSync(join(root, dir), { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? files(root, join(dir, e.name)) : [join(dir, e.name)],
  );
}

/** The sid of each node in the specification's files, keyed by the node's title. */
function sidsByTitle(root) {
  const sids = new Map();
  const visit = (nodes) => {
    for (const n of nodes ?? []) {
      if (n.title && n.sid) sids.set(n.title, n.sid);
      visit(n.children);
    }
  };
  for (const path of files(join(root, "specs")).filter((p) => p.endsWith(".json") && !p.startsWith("_schema"))) {
    visit(JSON.parse(readFileSync(join(root, "specs", path), "utf8")).nodes);
  }
  return sids;
}

export function setupProject(tools, target) {
  if (existsSync(target) && readdirSync(target).length) throw new Error(`${target} is not empty`);
  const sheriff = (...args) => run(target, process.execPath, [join(resolve(tools), "dist", "cli.js"), ...args]);
  cpSync(TEMPLATE, target, { recursive: true });
  run(target, "git", ["init", "-q", "-b", "main"]);
  run(target, "git", ["config", "user.email", OWNER]);
  run(target, "git", ["config", "user.name", "Owner"]);
  sheriff("init", "--agent", "claude");
  const settings = join(target, ".claude", "settings.json");
  if (existsSync(settings)) {
    const data = JSON.parse(readFileSync(settings, "utf8"));
    delete data.extraKnownMarketplaces;
    delete data.enabledPlugins;
    writeFileSync(settings, JSON.stringify(data, null, 2) + "\n");
  }
  sheriff("reindex");
  const sids = sidsByTitle(target);
  for (const path of [...files(target, "src"), ...files(target, "test")].map((p) => join(target, p))) {
    const text = readFileSync(path, "utf8").replace(/\{\{([^}]+)\}\}/g, (_, title) => {
      const sid = sids.get(title);
      if (!sid) throw new Error(`${path}: no node is titled "${title}"`);
      return sid;
    });
    writeFileSync(path, text);
  }
  sheriff("reindex");
  const rules = [];
  const visit = (nodes) => {
    for (const n of nodes ?? []) {
      if (n.kind !== "section" && n.kind !== "header") rules.push(n.sid);
      visit(n.children);
    }
  };
  for (const path of files(join(target, "specs")).filter((p) => p.endsWith(".json") && !p.startsWith("_schema"))) {
    visit(JSON.parse(readFileSync(join(target, "specs", path), "utf8")).nodes);
  }
  sheriff("approve", ...rules);
  sheriff("settings", "status", "approved", "--confirm");
  sheriff("reindex");
  for (const check of ["validate", "binding", "citations"]) sheriff(check);
  run(target, process.execPath, ["--test"]);
  run(target, "git", ["add", "-A"]);
  run(target, "git", ["commit", "-q", "--no-verify", "-m", "Records: the specification, the code and the tests"]);
  return { sids: Object.fromEntries(sids), rules };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const [tools, target] = process.argv.slice(2);
  if (!tools || !target) {
    console.error("usage: node internal/skill-evals/setup-project.mjs <tools> <target>");
    process.exit(2);
  }
  console.log(JSON.stringify(setupProject(tools, target), null, 2));
}
