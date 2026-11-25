// Prototype of `sheriff settings`: the project's settings and its extensions as a list of checkboxes.
// It changes nothing: on Apply it prints the commands the real tool would run. The extensions and the
// reasons shown are samples; the approver is read from git and the owners from specs/_guidelines/project.json.
// Run in a real terminal from the repository root: node .ai_docs/t25-pass/settings-prototype.mjs
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import readline from "node:readline";

const extensions = [
  { id: "domains", name: "Domains", about: "the base specification divided into domains, each with its header", active: true,
    locked: "cannot be disabled: the specification holds 3 domain headers" },
  { id: "recordtype", name: "RecordType", about: "data formats declared as RecordTypes; types and RuntimeChecks generated from them", active: true },
  { id: "views", name: "Views of the specification", about: "the human-readable export and the map of the specification", active: true },
];

function git(...args) { try { return execFileSync("git", args, { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim(); } catch { return ""; } }
const me = git("config", "user.email");
let owners = [];
try { owners = JSON.parse(readFileSync("specs/_guidelines/project.json", "utf8")).nodes[0].owners ?? []; } catch { /* outside a project */ }
const isOwner = owners.includes(me);

const wanted = extensions.map((e) => e.active);
const rows = [...extensions.map((_, i) => ({ kind: "ext", i })), { kind: "apply" }, { kind: "cancel" }];
let cursor = 0;
let note = "";

// The list needs a keyboard: without an interactive terminal (an agent's shell, `!` in Claude Code, Remote Control)
// the settings are printed as plain text with a note saying where the list works. SHERIFF_PROTOTYPE_KEYS=1 lets a
// test pipe keystrokes in.
const interactive = (process.stdin.isTTY && process.stdout.isTTY) || process.env.SHERIFF_PROTOTYPE_KEYS === "1";
const colour = process.stdout.isTTY || process.env.SHERIFF_PROTOTYPE_KEYS === "1";
const c = colour
  ? { dim: "\x1b[2m", bold: "\x1b[1m", green: "\x1b[32m", cyan: "\x1b[36m", yellow: "\x1b[33m", reset: "\x1b[0m" }
  : { dim: "", bold: "", green: "", cyan: "", yellow: "", reset: "" };

if (!interactive) {
  console.log("SpecSheriff settings   PROTOTYPE: every value except who you are is a sample\n");
  console.log("  Specification status   approved");
  console.log("  Strict flag            off");
  console.log(`  You                    ${me || "(no git user.email)"}${isOwner ? "  (an owner of the specification)" : ""}\n`);
  console.log("Extensions of the guidelines");
  for (const e of extensions) console.log(`  [${e.active ? "x" : " "}] ${e.name}${e.locked ? ` (${e.locked})` : ""}`);
  console.log("\nThe list of checkboxes needs an interactive terminal, and this one has no keyboard attached.");
  console.log("Run the program in a terminal window on this machine, or over an SSH connection to it.");
  console.log("Working remotely, ask the agent to change the extensions through the question dialog in the chat.");
  process.exit(0);
}

function render() {
  const out = [];
  out.push(`${c.bold}SpecSheriff settings${c.reset}   ${c.yellow}PROTOTYPE: nothing is changed; every value except who you are is a sample${c.reset}`, "");
  out.push(`  Specification status   approved`);
  out.push(`  Strict flag            off`);
  out.push(`  You                    ${me || "(no git user.email)"}${isOwner ? "  (an owner of the specification)" : "  (not an owner: you cannot change extensions)"}`, "");
  out.push(`${c.bold}Extensions of the guidelines${c.reset}`);
  rows.forEach((row, r) => {
    const here = r === cursor;
    const pointer = here ? `${c.cyan}❯${c.reset}` : " ";
    if (row.kind === "ext") {
      const e = extensions[row.i];
      const disabled = !isOwner || Boolean(e.locked);
      const box = wanted[row.i] ? `${c.green}[x]${c.reset}` : "[ ]";
      const changed = wanted[row.i] !== e.active ? `  ${c.yellow}${wanted[row.i] ? "will be enabled" : "will be disabled"}${c.reset}` : "";
      const label = here ? `${c.cyan}${e.name}${c.reset}` : e.name;
      out.push(`${pointer} ${disabled ? c.dim : ""}${box} ${label}${disabled ? c.reset : ""}${changed}`);
      out.push(`      ${c.dim}${e.about}${e.locked ? ` — ${e.locked}` : ""}${c.reset}`);
    } else {
      if (row.kind === "apply") out.push("");
      const label = row.kind === "apply" ? "Apply" : "Cancel";
      out.push(`${pointer} ${here ? c.cyan : ""}[ ${label} ]${c.reset}`);
    }
  });
  out.push("", `${c.dim}↑/↓ move   Space or Enter toggle   Enter on Apply saves   Esc or q cancels${c.reset}`);
  if (note) out.push("", `${c.yellow}${note}${c.reset}`);
  process.stdout.write("\x1b[2J\x1b[H" + out.join("\n") + "\n");
}

function finish(applied) {
  if (process.stdin.isTTY) process.stdin.setRawMode(false);
  process.stdout.write("\x1b[?25h");
  const changes = extensions.filter((e, i) => wanted[i] !== e.active);
  if (!applied) console.log("\nCancelled: nothing changed.");
  else if (!changes.length) console.log("\nNo changes.");
  else {
    console.log("\nThe real tool would now run:");
    for (const e of changes) console.log(`  sheriff extension ${wanted[extensions.indexOf(e)] ? "enable" : "disable"} ${e.id}`);
    console.log("and record the change in sheriff.config.json, to be committed by an owner.");
  }
  process.exit(0);
}

function toggle() {
  const row = rows[cursor];
  if (row.kind === "apply") return finish(true);
  if (row.kind === "cancel") return finish(false);
  const e = extensions[row.i];
  if (!isOwner) { note = "Only an owner of the specification changes its extensions."; return; }
  if (e.locked) { note = `${e.name} ${e.locked}.`; return; }
  wanted[row.i] = !wanted[row.i];
  note = "";
}

readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) process.stdin.setRawMode(true);
process.stdout.write("\x1b[?25l");
process.stdin.on("keypress", (str, key = {}) => {
  if (key.ctrl && key.name === "c") return finish(false);
  if (key.name === "escape" || str === "q") return finish(false);
  if (key.name === "up" || str === "k") cursor = (cursor + rows.length - 1) % rows.length;
  else if (key.name === "down" || str === "j") cursor = (cursor + 1) % rows.length;
  else if (key.name === "space" || key.name === "return" || key.name === "enter") toggle();
  render();
});
process.stdin.on("end", () => finish(false));
render();
