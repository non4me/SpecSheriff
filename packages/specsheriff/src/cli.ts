#!/usr/bin/env node
import { readFileSync } from "node:fs";

const USAGE = `Usage: sheriff <command>

Options:
  --version  print the version of the toolset
`;

function version(): string {
  return JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8")).version;
}

const [command] = process.argv.slice(2);
if (command === undefined) {
  process.stdout.write(USAGE);
} else if (command === "--version") {
  process.stdout.write(version() + "\n");
} else {
  process.stderr.write(`sheriff: unknown command: ${command}\n\n${USAGE}`);
  process.exitCode = 2;
}
