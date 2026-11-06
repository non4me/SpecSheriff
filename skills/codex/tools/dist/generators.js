import { spawnSync } from "node:child_process";
import { isAbsolute, posix } from "node:path";
import { modelOf } from "./model.js";
/**
 * Runs each generator a project's own guidelines add (s-km4x4s26kv7pjze) by the command the settings name, in the
 * directory the checks read, the model on its standard input; it prints as JSON each file's path, its content and the
 * sids of the nodes it is written from. A generator its rule does not list, one ending with an exit status other than
 * zero, and a path outside the repository or under specs/ are refused. Each file waits while a node it is written
 * from, or the rule listing its generator, is unchecked (s-kh8qcd5kxgh9z3j), and `waiting` gathers them all.
 */
export function runGenerators(root, spec, config) {
    const files = [];
    const refusals = [];
    const waiting = new Set();
    if (!config.generators.length)
        return { files, refusals, waiting: [] };
    const model = JSON.stringify(modelOf(spec));
    for (const g of config.generators) {
        const where = `generator "${g.name}"`;
        const rule = spec.nodes.get(g.rule)?.node;
        const list = rule?.list;
        const listed = list?.members?.some((m) => Boolean(m) && typeof m === "object" && m[list.property ?? "name"] === g.name);
        if (!listed) {
            refusals.push({ where, message: `the settings name a generator the rule ${g.rule} does not list` });
            continue;
        }
        const run = spawnSync(g.command, { cwd: root, input: model, shell: true, encoding: "utf8", maxBuffer: 1 << 26 });
        if (run.status !== 0) {
            refusals.push({ where, message: `${run.stdout ?? ""}${run.stderr ?? ""}`.trim() || `ended with exit status ${run.status}` });
            continue;
        }
        let printed;
        try {
            printed = JSON.parse(run.stdout);
        }
        catch {
            printed = null;
        }
        if (!Array.isArray(printed)) {
            refusals.push({ where, message: "printed no JSON list of the files it writes" });
            continue;
        }
        for (const f of printed) {
            const raw = String(f?.path ?? "").replaceAll("\\", "/");
            const path = posix.normalize(raw);
            // Outside the repository's files: above its root, its root itself, and git's own directory.
            const outside = isAbsolute(raw) || /^[A-Za-z]:/.test(raw) || path === ".." || path.startsWith("../") || path === "." || path === ".git" || path.startsWith(".git/");
            if (!raw || outside || path.startsWith("specs/")) {
                refusals.push({ where, message: `prints ${raw}, a path outside the repository or under specs/` });
                continue;
            }
            const sids = Array.isArray(f.sids) ? f.sids.map(String) : [];
            const unchecked = [...sids, g.rule].filter((s, i, all) => all.indexOf(s) === i && spec.nodes.get(s)?.node.status !== "checked");
            files.push({ path, text: String(f.content ?? ""), sids, generator: g.name, waiting: unchecked });
            for (const s of unchecked)
                waiting.add(s);
        }
        if (rule?.status !== "checked")
            waiting.add(g.rule);
    }
    return { files, refusals, waiting: [...waiting] };
}
