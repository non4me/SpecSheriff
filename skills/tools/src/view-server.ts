import http from "node:http";
import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync, watch, type FSWatcher } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { CARRIED } from "./spec-files.ts";
import { viewModel } from "./view.ts";

/** The range of ports from which `sheriff view` takes the first free one where `--port` is not given (s-282zba8mtxvxnm5). */
export const DEFAULT_PORT = 5278;
export const LAST_PORT = 5297;

const HERE = dirname(fileURLToPath(import.meta.url));
export const PAGE = join(HERE, "..", "assets", "viewer", "index.html");

/**
 * The identifier of the build of the SpecSheriff tools that this code belongs to: a hash of every module in this module's folder, this
 * one included, and of the web page. A plugin update, or a new build in this repository, produces a different value. `--detach`
 * uses this value to recognise a viewer that it must replace (s-282zba8mtxvxnm5).
 */
export function buildId(): string {
  const hash = createHash("sha256");
  const modules = readdirSync(HERE).filter((name) => /\.(js|ts)$/.test(name)).sort();
  for (const name of modules) hash.update(name).update(readFileSync(join(HERE, name)));
  if (existsSync(PAGE)) hash.update(readFileSync(PAGE));
  return hash.digest("hex").slice(0, 16);
}

export interface Viewer {
  url: string;
  port: number;
  close(): Promise<void>;
  /** Settles once the server has stopped, whether `close` or a request to `/stop` stopped it. */
  closed: Promise<void>;
}

/** Listens on the port, and returns false where another program is using it. */
function listen(server: http.Server, port: number): Promise<boolean> {
  return new Promise((done, fail) => {
    const onError = (error: NodeJS.ErrnoException) => {
      server.off("listening", onListening);
      if (error.code === "EADDRINUSE" || error.code === "EACCES") done(false);
      else fail(error);
    };
    const onListening = () => {
      server.off("error", onError);
      done(true);
    };
    server.once("error", onError);
    server.once("listening", onListening);
    server.listen(port, "127.0.0.1");
  });
}

/**
 * Serves the web page of the viewer at 127.0.0.1 (s-282zba8mtxvxnm5). It answers:
 * - `/` with the page, and `/model.json` with the model that the page is drawn from;
 * - `/events` with the events that tell each open page to redraw;
 * - `/health` with the project's root and the identifier of the build of the SpecSheriff tools;
 * - a POST to `/stop` by stopping the server.
 * It reads the specification again after each change to a file that it reads. Where it cannot, it keeps the model that it last
 * built successfully and sends the error to the open pages. It takes the port given in `port`, or else the first free port from `first` to `last`.
 */
export async function serve(rootGiven: string, opts: { port?: number; first?: number; last?: number } = {}): Promise<Viewer> {
  const root = resolve(rootGiven);
  const build = buildId();
  // The first reading of the specification throws where the project has chosen neither the Views nor the Domains extension.
  let model = viewModel(root);
  let modelJson = JSON.stringify(model);
  let modelBody = JSON.stringify({ ...model, built: null });
  let error: string | null = null;
  const clients = new Set<http.ServerResponse>();
  const send = (event: string, data: unknown) => {
    const frame = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
    for (const res of clients) res.write(frame);
  };

  const rebuild = () => {
    try {
      const next = viewModel(root);
      const body = JSON.stringify({ ...next, built: null });
      const hadError = error !== null;
      error = null;
      if (body === modelBody && !hadError) return;
      model = next;
      modelBody = body;
      modelJson = JSON.stringify(next);
    } catch (failure) {
      const message = String((failure as Error)?.message ?? failure);
      if (message === error) return;
      error = message;
    }
    send("model", { built: model.built, error });
  };

  let timer: NodeJS.Timeout | undefined;
  const schedule = () => {
    clearTimeout(timer);
    timer = setTimeout(rebuild, 300);
  };
  const watchers: FSWatcher[] = [watch(join(root, "specs"), { recursive: true }, schedule), watch(root, (_event, name) => name === "sheriff.config.json" && schedule())];
  if (existsSync(CARRIED) && resolve(CARRIED) !== join(root, "specs")) watchers.push(watch(CARRIED, { recursive: true }, schedule));
  if (existsSync(dirname(PAGE))) watchers.push(watch(dirname(PAGE), (_event, name) => name === "index.html" && send("page", {})));

  let stop: () => Promise<void> = async () => {};
  const server = http.createServer((req, res) => {
    const path = new URL(req.url ?? "/", "http://127.0.0.1").pathname;
    const reply = (status: number, type: string, body: string | Buffer) => {
      res.writeHead(status, { "Content-Type": type, "Cache-Control": "no-store" });
      res.end(body);
    };
    // Only a request addressed to this machine is answered, so that a web page on another site whose domain name was set up to
    // resolve to 127.0.0.1 cannot read the specification.
    const own = [`127.0.0.1:${port}`, `localhost:${port}`];
    if (!own.includes(req.headers.host ?? "")) {
      return reply(403, "text/plain", "forbidden");
    }
    try {
      if (path === "/health") return reply(200, "application/json", JSON.stringify({ root, build }));
      if (path === "/model.json") return reply(200, "application/json", modelJson);
      if (path === "/status") return reply(200, "application/json", JSON.stringify({ built: model.built, error }));
      if (path === "/") return reply(200, "text/html; charset=utf-8", readFileSync(PAGE));
      if (path === "/stop" && req.method === "POST") {
        reply(200, "text/plain", "stopping");
        void stop();
        return undefined;
      }
      if (path === "/events") {
        res.writeHead(200, { "Content-Type": "text/event-stream", "Cache-Control": "no-store", Connection: "keep-alive" });
        res.write("retry: 2000\n\n");
        clients.add(res);
        req.on("close", () => clients.delete(res));
        return undefined;
      }
      return reply(404, "text/plain", "not found");
    } catch (failure) {
      if (!res.headersSent) reply(500, "text/plain", String((failure as Error)?.message ?? failure));
      return undefined;
    }
  });

  let port = 0;
  const first = opts.port ?? opts.first ?? DEFAULT_PORT;
  const last = opts.port ?? opts.last ?? LAST_PORT;
  for (let p = first; p <= last && !port; p++) if (await listen(server, p)) port = p;
  if (!port) {
    clearTimeout(timer);
    for (const w of watchers) w.close();
    throw new Error(opts.port !== undefined ? `port ${opts.port} is already in use` : `no port from ${first} to ${last} is free`);
  }

  const ping = setInterval(() => { for (const res of clients) res.write(": ping\n\n"); }, 25000);
  ping.unref();
  let finish: () => void = () => {};
  const closed = new Promise<void>((done) => { finish = done; });
  let stopping: Promise<void> | null = null;
  stop = () => {
    stopping ??= new Promise<void>((done) => {
      clearTimeout(timer);
      clearInterval(ping);
      for (const w of watchers) w.close();
      for (const res of clients) res.end();
      clients.clear();
      server.close(() => {
        finish();
        done();
      });
      server.closeAllConnections();
    });
    return stopping;
  };
  return { url: `http://127.0.0.1:${port}/`, port, close: stop, closed };
}

/** What answers `/health` on a port: a viewer, with its project's root and build ID; another program; or nothing. */
function healthAt(port: number): Promise<{ root: string; build: string } | "other" | null> {
  return new Promise((done) => {
    const req = http.get({ host: "127.0.0.1", port, path: "/health", timeout: 1000 }, (res) => {
      let body = "";
      res.setEncoding("utf8");
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => {
        try {
          const answer = JSON.parse(body) as { root?: unknown; build?: unknown };
          done(typeof answer.root === "string" && typeof answer.build === "string" ? { root: answer.root, build: answer.build } : "other");
        } catch {
          done("other");
        }
      });
    });
    req.on("timeout", () => req.destroy());
    req.on("error", (error: NodeJS.ErrnoException) => done(error.code === "ECONNREFUSED" ? null : "other"));
  });
}

/** Asks the viewer on the port to stop, and waits until the port no longer answers. */
async function stopAt(port: number): Promise<void> {
  await new Promise<void>((done) => {
    const req = http.request({ host: "127.0.0.1", port, path: "/stop", method: "POST", timeout: 2000 }, (res) => {
      res.resume();
      res.on("end", done);
    });
    req.on("timeout", () => req.destroy());
    req.on("error", () => done());
    req.end();
  });
  for (let i = 0; i < 50 && (await healthAt(port)) !== null; i++) await new Promise((done) => setTimeout(done, 100));
}

/** The ports on which `--detach` and `--stop` look for the viewer of a project: the one that `--port` sets, or the whole range. */
const portsToSearch = (port?: number) => (port !== undefined ? [port] : Array.from({ length: LAST_PORT - DEFAULT_PORT + 1 }, (_, i) => DEFAULT_PORT + i));

/** The port on which the viewer of the project answers, with the ID of the build that started it. */
async function viewerOf(root: string, port?: number): Promise<{ port: number; build: string } | null> {
  for (const p of portsToSearch(port)) {
    const answer = await healthAt(p);
    if (answer && answer !== "other" && answer.root === root) return { port: p, build: answer.build };
  }
  return null;
}

/**
 * Starts the viewer of the project in the background and returns its address (s-282zba8mtxvxnm5). Where the viewer of the project
 * already answers and this build started it, `detach` starts no second viewer and returns the address of the running one. Where another
 * build started the running viewer, `detach` stops it first. `detach` starts the new viewer by running `cli` with the argument `view` in a separate process,
 * detached from this one.
 */
export async function detach(rootGiven: string, cli: string, opts: { port?: number } = {}): Promise<string> {
  const root = resolve(rootGiven);
  // The settings and the specification are read first, so that this call throws for a project that has chosen neither the Views
  // nor the Domains extension.
  viewModel(root);
  const build = buildId();
  const running = await viewerOf(root, opts.port);
  if (running?.build === build) return `http://127.0.0.1:${running.port}/`;
  if (running) await stopAt(running.port);
  if (opts.port !== undefined && (await healthAt(opts.port)) !== null) throw new Error(`port ${opts.port} is already in use`);
  const args = [cli, "view", ...(opts.port !== undefined ? ["--port", String(opts.port)] : [])];
  spawn(process.execPath, args, { cwd: root, detached: true, stdio: "ignore", windowsHide: true }).unref();
  for (let i = 0; i < 100; i++) {
    const started = await viewerOf(root, opts.port);
    if (started?.build === build) return `http://127.0.0.1:${started.port}/`;
    await new Promise((done) => setTimeout(done, 100));
  }
  throw new Error(opts.port !== undefined ? `the viewer did not start on port ${opts.port}` : `the viewer did not start on any port from ${DEFAULT_PORT} to ${LAST_PORT}`);
}

/** Stops the viewer of the project, and returns whether one was running (s-282zba8mtxvxnm5). */
export async function stop(rootGiven: string, opts: { port?: number } = {}): Promise<boolean> {
  const running = await viewerOf(resolve(rootGiven), opts.port);
  if (!running) return false;
  await stopAt(running.port);
  return true;
}
