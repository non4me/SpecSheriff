import { test } from "node:test";
import assert from "node:assert/strict";
import { execFile, spawnSync } from "node:child_process";
import http from "node:http";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { reindex } from "../../src/reindex.ts";
import { buildId } from "../../src/view-server.ts";
import { file, node, OWNER, repo } from "../fixture.ts";

const CLI = fileURLToPath(new URL("../../src/cli.ts", import.meta.url));
const sheriff = (root: string, ...args: string[]) => spawnSync(process.execPath, [CLI, ...args], { cwd: root, encoding: "utf8", timeout: 30000 });
/** Like `sheriff`, but without blocking this process, so that a server that this process runs can answer the command's requests. */
const sheriffAsync = (root: string, ...args: string[]) =>
  new Promise<{ status: number | null; stdout: string; stderr: string }>((done) => {
    execFile(process.execPath, [CLI, ...args], { cwd: root, encoding: "utf8", timeout: 30000 }, (error, stdout, stderr) => {
      done({ status: error ? ((error as { code?: number }).code ?? 1) : 0, stdout, stderr });
    });
  });

/**
 * Each test gets a port of its own, set by `--port`, far from the viewer's default range, so that no test collides with a viewer that is
 * already running on the machine. The ports of the tests stay below 49152, where the range of ports that Windows reserves by default begins.
 */
let next = 46000 + (process.pid % 300) * 10;
const port = () => ++next;

function project(extensions = ["views"]): string {
  const root = repo({
    "sheriff.config.json": { code: [], tests: [], extensions: extensions.map((name) => ({ name, chosen: true, by: OWNER })) },
    "specs/_guidelines/spec.json": file("_guidelines", "spec", node("base", { kind: "section", text: "The base.", children: [node("base rule")] })),
  });
  reindex(root);
  return root;
}

const health = async (p: number) => {
  try {
    return await (await fetch(`http://127.0.0.1:${p}/health`)).json();
  } catch {
    return null;
  }
};

test("@spec s-282zba8mtxvxnm5 sheriff view refuses to run where the project has chosen neither the Views nor the Domains extension, naming both extensions and sheriff settings", () => {
  const run = sheriff(project(["recordtype"]), "view", "--port", String(port()));
  assert.equal(run.status, 1);
  assert.match(run.stderr, /Views/);
  assert.match(run.stderr, /Domains/);
  assert.match(run.stderr, /sheriff settings/);
});

test("@spec s-282zba8mtxvxnm5 sheriff view --detach starts the viewer in the background and prints its address, and a second --detach starts no second one", async () => {
  const root = project();
  const p = port();
  try {
    const first = sheriff(root, "view", "--detach", "--port", String(p));
    assert.equal(first.status, 0, first.stderr);
    assert.equal(first.stdout.trim(), `Specification viewer: http://127.0.0.1:${p}/`);
    assert.deepEqual(await health(p), { root: resolve(root), build: buildId() });
    const second = sheriff(root, "view", "--detach", "--port", String(p));
    assert.equal(second.status, 0, second.stderr);
    assert.equal(second.stdout.trim(), `Specification viewer: http://127.0.0.1:${p}/`);
  } finally {
    sheriff(root, "view", "--stop", "--port", String(p));
  }
});

test("@spec s-282zba8mtxvxnm5 sheriff view --detach stops a viewer of the project that another build of the SpecSheriff tools started, and starts a new one", async () => {
  const root = project();
  const p = port();
  let stopped = false;
  // A viewer of this project that an earlier build started: it reports a different build ID, and stops when asked to.
  const earlier = http.createServer((req, res) => {
    if (req.url === "/health") return res.end(JSON.stringify({ root: resolve(root), build: "an earlier build" }));
    if (req.url === "/stop" && req.method === "POST") {
      stopped = true;
      res.end("stopping");
      earlier.close();
      earlier.closeAllConnections();
      return undefined;
    }
    res.statusCode = 404;
    return res.end();
  }).listen(p, "127.0.0.1");
  await new Promise((done) => earlier.once("listening", done));
  try {
    const run = await sheriffAsync(root, "view", "--detach", "--port", String(p));
    assert.equal(run.status, 0, run.stderr);
    assert.ok(stopped, "the earlier viewer was asked to stop");
    assert.deepEqual(await health(p), { root: resolve(root), build: buildId() });
  } finally {
    earlier.close();
    sheriff(root, "view", "--stop", "--port", String(p));
  }
});

test("@spec s-282zba8mtxvxnm5 sheriff view refuses to run on the port that --port sets if the viewer of another project already serves on it, naming the port", () => {
  const one = project();
  const other = project();
  const p = port();
  try {
    assert.equal(sheriff(one, "view", "--detach", "--port", String(p)).status, 0);
    const run = sheriff(other, "view", "--detach", "--port", String(p));
    assert.equal(run.status, 1);
    assert.match(run.stderr, new RegExp(String(p)));
  } finally {
    sheriff(one, "view", "--stop", "--port", String(p));
  }
});

test("@spec s-282zba8mtxvxnm5 sheriff view --stop stops the sheriff view process that serves the project and, where there is none, says that there is none", async () => {
  const root = project();
  const p = port();
  assert.equal(sheriff(root, "view", "--detach", "--port", String(p)).status, 0);
  const stop = sheriff(root, "view", "--stop", "--port", String(p));
  assert.equal(stop.status, 0, stop.stderr);
  assert.match(stop.stdout, /stopped/);
  assert.equal(await health(p), null);
  const again = sheriff(root, "view", "--stop", "--port", String(p));
  assert.equal(again.status, 0);
  assert.match(again.stdout, /no sheriff view process serves this project/);
});
