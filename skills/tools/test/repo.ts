import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

/** The root of the repository the tests run in, whose specs/ they read and never write. */
export const REPO = resolve(fileURLToPath(new URL(".", import.meta.url)), "../../..");

// The hooks and the reviewer read and write the user's global git configuration: every git the tests start,
// directly or through a hook, is given one of its own, so that no test reads or changes the machine's.
if (!process.env.SHERIFF_TEST_GIT_CONFIG) {
  const file = join(mkdtempSync(join(tmpdir(), "sheriff-gitconfig-")), "config");
  writeFileSync(file, "");
  process.env.GIT_CONFIG_GLOBAL = file;
  process.env.SHERIFF_TEST_GIT_CONFIG = file;
}

/** A global git configuration of its own, empty, for a test that reads or writes the user's settings. */
export function gitConfig(): string {
  const file = join(mkdtempSync(join(tmpdir(), "sheriff-gitconfig-")), "config");
  writeFileSync(file, "");
  return file;
}
