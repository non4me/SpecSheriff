// What changed since the agent's hook last ran the checks (s-hcmpjmwtgfwzncu). `changed.mjs diff` prints "none"
// where the last commit and the working tree, not counting the files that git ignores, match what the hook recorded.
// Otherwise it prints one word for each of these kinds of file in which at least one file differs, the words separated by spaces:
// - "spec": a file under specs/, or sheriff.config.json;
// - "tags": a file read for SpecTags, that is, a file that a glob for the code or for the tests matches; a file with the code or
//   the tests of a project's own check or generator; or sheriff.bindings.json;
// - "generator": the code of a project's own generator.
// It prints all three words where nothing has been recorded, and "checks" where only files of other kinds differ. `changed.mjs snapshot`
// saves the current state, taken once the files are regenerated and before the checks run, so that a file changed while
// they run is not treated as checked; `changed.mjs note` then records that state, or the current one where none was saved,
// in the clone's git directory.
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { join, posix } from "node:path";

const git = (...args) => execFileSync("git", args, { encoding: "utf8", maxBuffer: 1 << 28, stdio: ["ignore", "pipe", "ignore"] });
const dir = git("rev-parse", "--absolute-git-dir").trim();
const note = join(dir, "sheriff-noted.json");
const kept = join(dir, "sheriff-snapshot.json");

function present() {
  let head = "";
  try {
    head = git("rev-parse", "--verify", "-q", "HEAD").trim();
  } catch {}
  const paths = git("status", "--porcelain=v1", "-z", "--untracked-files=all", "--no-renames")
    .split("\0").filter(Boolean).map((line) => line.slice(3));
  const there = paths.filter((p) => existsSync(p));
  const hashes = there.length ? execFileSync("git", ["hash-object", "--stdin-paths"], { input: there.join("\n"), encoding: "utf8" }).trim().split("\n") : [];
  const files = Object.fromEntries(paths.map((p) => [p, there.includes(p) ? hashes[there.indexOf(p)] : "gone"]));
  return { head, files };
}

if (process.argv[2] === "snapshot") {
  writeFileSync(kept, JSON.stringify(present()));
} else if (process.argv[2] === "note") {
  if (existsSync(kept)) renameSync(kept, note);
  else writeFileSync(note, JSON.stringify(present()));
} else {
  // A state kept by a run that ended before noting it belongs to no run.
  rmSync(kept, { force: true });
  const now = present();
  let was = null;
  try {
    was = JSON.parse(readFileSync(note, "utf8"));
  } catch {}
  if (!was) {
    process.stdout.write("spec tags generator");
  } else {
    const changed = new Set();
    for (const p of new Set([...Object.keys(now.files), ...Object.keys(was.files)])) if (now.files[p] !== was.files[p]) changed.add(p);
    if (now.head !== was.head) {
      try {
        for (const p of git("diff", "--name-only", was.head, now.head).split("\n").filter(Boolean)) changed.add(p);
      } catch {
        changed.add("specs/");
      }
    }
    let generators = [];
    let read = [];
    try {
      const settings = JSON.parse(readFileSync("sheriff.config.json", "utf8"));
      generators = (settings.generators ?? []).flatMap((g) => g.code ?? []);
      const own = [...(settings.checks ?? []), ...(settings.generators ?? [])];
      read = [...(settings.code ?? []), ...(settings.tests ?? []), ...own.flatMap((t) => [...(t.code ?? []), ...(t.tests ?? [])])];
    } catch {}
    const kinds = [
      [...changed].some((p) => p.startsWith("specs/") || p === "sheriff.config.json") && "spec",
      [...changed].some((p) => p === "sheriff.bindings.json" || read.some((g) => posix.matchesGlob(p, g))) && "tags",
      [...changed].some((p) => generators.some((g) => posix.matchesGlob(p, g))) && "generator",
    ].filter(Boolean);
    process.stdout.write(!changed.size ? "none" : kinds.length ? kinds.join(" ") : "checks");
  }
}
