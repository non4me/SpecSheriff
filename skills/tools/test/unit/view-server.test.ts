import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { request } from "node:http";
import { createServer } from "node:net";
import { writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { reindex } from "../../src/reindex.ts";
import { buildId, serve } from "../../src/view-server.ts";
import { file, node, OWNER, repo, sid } from "../fixture.ts";

/**
 * Each test gets ports of its own, far from the viewer's default range, so that no test collides with a viewer that is already running
 * on the machine. The ports of the tests stay below 49152, where the range of ports that Windows reserves by default begins.
 */
let next = 41000 + (process.pid % 500) * 10;
const ports = () => {
  next += 10;
  return { first: next, last: next + 9 };
};

function project(): string {
  const root = repo({
    "sheriff.config.json": { code: [], tests: [], extensions: [{ name: "views", chosen: true, by: OWNER }] },
    "specs/_guidelines/spec.json": file("_guidelines", "spec", node("base", { kind: "section", text: "The base.", children: [node("base rule")] })),
  });
  reindex(root);
  spawnSync("git", ["init", "-q"], { cwd: root });
  spawnSync("git", ["add", "-A"], { cwd: root });
  spawnSync("git", ["-c", "user.email=o@example.org", "-c", "user.name=O", "commit", "-qm", "start", "--no-verify"], { cwd: root });
  return root;
}

/** Waits for the next `model` event on the server's event stream, after `act` has run. */
async function nextModelEvent(url: string, act: () => void): Promise<{ built: string | null; error: string | null }> {
  const controller = new AbortController();
  const res = await fetch(`${url}events`, { signal: controller.signal });
  const reader = res.body!.getReader();
  const decoder = new TextDecoder();
  let text = "";
  // The stream opens with its retry line; `act` runs as soon as the stream is open.
  while (!text.includes("retry:")) text += decoder.decode((await reader.read()).value);
  act();
  const deadline = Date.now() + 5000;
  while (Date.now() < deadline) {
    const { value, done } = await reader.read();
    if (done) break;
    text += decoder.decode(value);
    const hit = /event: model\ndata: (.*)\n\n/.exec(text);
    if (hit) {
      controller.abort();
      return JSON.parse(hit[1]!);
    }
  }
  controller.abort();
  throw new Error("no model event");
}

test("@spec s-282zba8mtxvxnm5 answers a health-check request with the project's root and the identifier of the build of the SpecSheriff tools", async () => {
  const root = project();
  const viewer = await serve(root, ports());
  try {
    assert.match(viewer.url, /^http:\/\/127\.0\.0\.1:\d+\/$/);
    const health = await (await fetch(`${viewer.url}health`)).json();
    assert.deepEqual(health, { root: resolve(root), build: buildId() });
    const model = await (await fetch(`${viewer.url}model.json`)).json();
    assert.equal(model.nodes[sid("base rule")].title, "base rule");
  } finally {
    await viewer.close();
  }
});

test("@spec s-282zba8mtxvxnm5 reads the specification again after a file of the specification changes, and tells each open web page to redraw", async () => {
  const root = project();
  const viewer = await serve(root, ports());
  try {
    const event = await nextModelEvent(viewer.url, () => {
      writeFileSync(join(root, "specs", "_guidelines", "spec.json"), JSON.stringify(file("_guidelines", "spec", node("base", { kind: "section", text: "The base.", children: [node("base rule", { title: "a new title" })] })), null, 2) + "\n");
    });
    assert.equal(event.error, null);
    const model = await (await fetch(`${viewer.url}model.json`)).json();
    assert.equal(model.nodes[sid("base rule")].title, "a new title");
  } finally {
    await viewer.close();
  }
});

test("@spec s-282zba8mtxvxnm5 reports that it cannot read the specification, and keeps what it last read successfully", async () => {
  const root = project();
  const viewer = await serve(root, ports());
  try {
    const event = await nextModelEvent(viewer.url, () => writeFileSync(join(root, "specs", "_guidelines", "spec.json"), "{ not json"));
    assert.match(event.error ?? "", /spec\.json/);
    const model = await (await fetch(`${viewer.url}model.json`)).json();
    assert.equal(model.nodes[sid("base rule")].title, "base rule");
    // A web page opened after the failure to read the specification learns about it from the server's status endpoint.
    assert.match((await (await fetch(`${viewer.url}status`)).json()).error, /spec\.json/);
  } finally {
    await viewer.close();
  }
});

test("@spec s-282zba8mtxvxnm5 reports that the settings, read again, show that the project has chosen neither the Views nor the Domains extension", async () => {
  const root = project();
  const viewer = await serve(root, ports());
  try {
    const event = await nextModelEvent(viewer.url, () => writeFileSync(join(root, "sheriff.config.json"), JSON.stringify({ code: [], tests: [], extensions: [{ name: "views", chosen: false, by: OWNER }] })));
    assert.match(event.error ?? "", /Views/);
  } finally {
    await viewer.close();
  }
});

test("@spec s-282zba8mtxvxnm5 takes the first free port in its range, and refuses to run on the port that `--port` sets where that port is in use", async () => {
  const root = project();
  const range = ports();
  const taken = createServer().listen(range.first, "127.0.0.1");
  await new Promise((done) => taken.once("listening", done));
  try {
    const viewer = await serve(root, range);
    try {
      assert.equal(viewer.port, range.first + 1);
    } finally {
      await viewer.close();
    }
    await assert.rejects(serve(root, { port: range.first }), new RegExp(String(range.first)));
  } finally {
    taken.close();
  }
});

test("@spec s-282zba8mtxvxnm5 refuses to run where no port in its range is free, naming the range", async () => {
  const root = project();
  const range = ports();
  const held = [];
  for (let p = range.first; p <= range.first + 1; p++) {
    const s = createServer().listen(p, "127.0.0.1");
    await new Promise((done) => s.once("listening", done));
    held.push(s);
  }
  try {
    await assert.rejects(serve(root, { first: range.first, last: range.first + 1 }), new RegExp(`${range.first}.*${range.first + 1}`));
  } finally {
    for (const s of held) s.close();
  }
});

test("@spec s-282zba8mtxvxnm5 stops serving when asked to stop", async () => {
  const root = project();
  const viewer = await serve(root, ports());
  const res = await fetch(`${viewer.url}stop`, { method: "POST" });
  assert.equal(res.status, 200);
  await viewer.closed;
  await assert.rejects(fetch(`${viewer.url}health`));
});

/** Sends a request with the given headers and returns the status of its response. */
function statusOf(url: string, path: string, method: string, headers: Record<string, string>): Promise<number> {
  return new Promise((done, fail) => {
    const req = request(new URL(path, url), { method, headers }, (res) => {
      res.resume();
      done(res.statusCode ?? 0);
    });
    req.on("error", fail);
    req.end();
  });
}

test("@spec s-282zba8mtxvxnm5 answers only requests addressed to the machine on which it runs", async () => {
  const root = project();
  const viewer = await serve(root, ports());
  try {
    const own = `127.0.0.1:${viewer.port}`;
    assert.equal(await statusOf(viewer.url, "/model.json", "GET", { Host: own }), 200);
    assert.equal(await statusOf(viewer.url, "/model.json", "GET", { Host: `localhost:${viewer.port}` }), 200);
    // A web page on another site whose domain name was set up to resolve to 127.0.0.1 sends that name in the Host header of its request.
    assert.equal(await statusOf(viewer.url, "/model.json", "GET", { Host: `elsewhere.example:${viewer.port}` }), 403);
    assert.equal((await fetch(`${viewer.url}health`)).status, 200);
  } finally {
    await viewer.close();
  }
});

test("@spec s-282zba8mtxvxnm5 only reads files: the working tree is unchanged after the web page has been served", async () => {
  const root = project();
  const viewer = await serve(root, ports());
  try {
    await fetch(viewer.url);
    await fetch(`${viewer.url}model.json`);
  } finally {
    await viewer.close();
  }
  assert.equal(spawnSync("git", ["status", "--porcelain", "--ignored"], { cwd: root, encoding: "utf8" }).stdout, "");
});
