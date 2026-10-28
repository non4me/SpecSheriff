#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { confirm } from "./confirmations.ts";
import { reindex } from "./reindex.ts";
import { show } from "./show.ts";
import { loadSpecification, specificationOf, type SpecFile, type Specification } from "./spec-files.ts";
import { validate } from "./validate.ts";

const USAGE = `Usage: sheriff <command>

Commands:
  reindex                     give sids, compute addresses, rebuild incoming links and heads' indexes,
                              empty every status no confirmation by its owner holds
  validate                    check the specification on its own
  confirm [--withdraw] <sid>  record the owner's confirmation of a node's wording, or withdraw it
  show <sid|address>          print a node with its links

Options:
  --version  print the version of the toolset
`;

const root = process.cwd();
const git = (...args: string[]) => spawnSync("git", args, { cwd: root, encoding: "utf8" });

/** The specification as the last commit holds it, or none where there is no commit. */
function lastCommitted(): Specification | undefined {
  const listed = git("ls-tree", "-r", "--name-only", "HEAD", "specs");
  if (listed.status !== 0) return undefined;
  const files: SpecFile[] = [];
  for (const path of listed.stdout.split("\n").filter((p) => p.endsWith(".json") && !/^specs\/_(schema|viewer)\//.test(p))) {
    const shown = git("show", `HEAD:${path}`);
    if (shown.status === 0) files.push({ path, data: JSON.parse(shown.stdout) });
  }
  return specificationOf(files);
}

function run(command: string | undefined, args: string[]): number {
  switch (command) {
    case undefined:
      process.stdout.write(USAGE);
      return 0;
    case "--version":
      process.stdout.write(JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8")).version + "\n");
      return 0;
    case "reindex": {
      const report = reindex(root);
      for (const m of report.merged) process.stdout.write(`merged: ${m.file}: "${m.key}" at ${m.path || "/"}, lines ${m.lines.join(", ")}\n`);
      for (const s of report.emptied) process.stdout.write(`status emptied: ${s}\n`);
      for (const f of report.written) process.stdout.write(`written: ${f}\n`);
      return 0;
    }
    case "validate": {
      const findings = validate(root, { coreDir: fileURLToPath(new URL("../core/", import.meta.url)), before: lastCommitted() });
      for (const f of findings) process.stdout.write(`${f.where}: ${f.message}\n`);
      return findings.length ? 1 : 0;
    }
    case "confirm": {
      const withdraw = args[0] === "--withdraw";
      const sids = withdraw ? args.slice(1) : args;
      const me = git("config", "user.email").stdout.trim();
      if (!me) throw new Error("git names no email for whoever confirms: set it with git config user.email");
      if (!sids.length) throw new Error("name the sid of every node to confirm");
      confirm(root, sids, { me, withdraw });
      return 0;
    }
    case "show":
      if (!args[0]) throw new Error("name a node by its sid or its address");
      process.stdout.write(show(loadSpecification(root), args[0]));
      return 0;
    default:
      process.stderr.write(`sheriff: unknown command: ${command}\n\n${USAGE}`);
      return 2;
  }
}

const [command, ...args] = process.argv.slice(2);
try {
  process.exitCode = run(command, args);
} catch (error) {
  process.stderr.write(`sheriff ${command}: ${(error as Error).message}\n`);
  process.exitCode = 1;
}
