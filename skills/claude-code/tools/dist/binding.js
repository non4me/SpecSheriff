import { existsSync, readFileSync } from "node:fs";
import { join, posix } from "node:path";
import { onlySpecTagged, readCode } from "./code.js";
import { loadConfig, readsAs } from "./config.js";
import { before, changes, codeChanges, commitTexts, git, trackedFiles } from "./diff.js";
import { addedApprovals, readApprovals } from "./approvals.js";
import { approvalRule, fixtureGlobs, isFixture, isProjectKind, locations, partOf, PROJECT, specificationOwners, statusNow } from "./model.js";
import { needsCode, schemaRefusals } from "./schema.js";
import { runGenerators } from "./generators.js";
import { judgedHere } from "./reindex.js";
import { loadSpecification, specPaths } from "./spec-files.js";
import { generateTypes, typeFiles, waitingRecords } from "./types.js";
const SID_ANYWHERE = /\bs-[2-9a-hjkmnp-z]{15}\b/g;
/** The files the check of the citations outside the specification reads: the code, the tests and the documents, the tools' own included. */
function outsideFiles(root, config, fixtures) {
    return trackedFiles(root).filter((p) => !p.startsWith("specs/") && !isFixture(fixtures, p) && (readsAs(config, p) !== null || p.endsWith(".md")));
}
async function readAll(root, paths) {
    const files = [];
    for (const path of paths) {
        const read = await readCode(path, readFileSync(join(root, path), "utf8"));
        if (read)
            files.push(read);
    }
    return files;
}
const allSymbols = (symbols) => symbols.flatMap((s) => [s, ...allSymbols(s.inner)]);
/**
 * The lines by which a file of tests changes, a test changing with any line of its text: those that only put `@spec `
 * before a bare sid, as the reindex writes a test's SpecTag, left out with the lines they replace (s-rah8b37kytb682y).
 */
function testLines(change) {
    const removed = [...change.removed];
    const added = change.added.filter((a) => {
        const i = removed.findIndex((r) => onlySpecTagged(r.text, a.text));
        if (i < 0)
            return true;
        removed.splice(i, 1);
        return false;
    });
    return { added: new Set(added.map((l) => l.line)), removed: new Set(removed.map((l) => l.line)) };
}
/** How a file is read: as the settings' globs say, a file of the generated types as the system's code even where they do not reach it. */
export function reader(config, spec) {
    const types = new Set(typeFiles(spec).paths.filter((p) => !p.endsWith(".json")));
    return (path) => readsAs(config, path) ?? (types.has(path) ? "code" : null);
}
/** The code and the tests as the commit leaves them, and what of them it adds or changes. */
export async function readCommit(root, config, spec = loadSpecification(root)) {
    const reads = reader(config, spec);
    const tracked = trackedFiles(root).filter((p) => existsSync(join(root, p)));
    const codeFiles = await readAll(root, tracked.filter((p) => reads(p) === "code"));
    const testFiles = await readAll(root, tracked.filter((p) => reads(p) === "tests"));
    const commit = changes(root).filter((c) => reads(c.path) !== null);
    const lines = await codeChanges(commit, await commitTexts(root, (p) => reads(p) !== null));
    const changedSymbols = new Map();
    const changedTests = new Map();
    for (const change of commit) {
        const now = [...codeFiles, ...testFiles].find((f) => f.path === change.path);
        if (!now)
            continue;
        const was = before(root, change.before ?? change.path);
        const old = was === null ? null : await readCode(change.path, was);
        // Code changes as the rule on SpecTags counts them; a test changes with any line of its text.
        const real = reads(change.path) === "tests" ? testLines(change) : lines.get(change.path);
        const symbols = new Set();
        const tests = new Set();
        const inSymbol = (file, line) => allSymbols(file.symbols).filter((s) => (s.start <= line && line <= s.end) || s.tags.some((t) => t.line === line));
        for (const line of real.added) {
            inSymbol(now, line).forEach((s) => symbols.add(s));
            now.tests.filter((t) => t.start <= line && line <= t.end).forEach((t) => tests.add(t.name));
        }
        for (const line of real.removed) {
            if (!old)
                continue;
            for (const s of inSymbol(old, line))
                allSymbols(now.symbols).filter((n) => n.name === s.name).forEach((n) => symbols.add(n));
            old.tests.filter((t) => t.start <= line && line <= t.end).forEach((t) => tests.add(t.name));
        }
        changedSymbols.set(change.path, symbols);
        changedTests.set(change.path, tests);
    }
    return { codeFiles, testFiles, changedSymbols, changedTests };
}
/** The sids the SpecTags on the symbols a commit changes name, inner symbols' own included. */
export function changedTags(commit) {
    const sids = new Set();
    for (const symbols of commit.changedSymbols.values())
        for (const s of symbols)
            for (const t of s.tags)
                if (t.sid)
                    sids.add(t.sid);
    return sids;
}
export async function binding(root) {
    // Every file is validated before anything is checked, and a refusal stops the checks (s-xzcw3hv4hmxz7h7).
    const unread = [];
    const read = specPaths(root).flatMap((path) => {
        try {
            return [{ path, data: JSON.parse(readFileSync(join(root, path), "utf8")) }];
        }
        catch (error) {
            unread.push({ where: path, message: error.message });
            return [];
        }
    });
    const refused = [...unread, ...schemaRefusals(root, read)];
    if (refused.length)
        return refused;
    const findings = [];
    const config = loadConfig(root);
    const spec = loadSpecification(root);
    const exists = (sid) => spec.nodes.has(sid);
    const approved = (sid) => spec.nodes.get(sid)?.node.status === "approved";
    // A rule, and a node of a project's own kind that needs code, is implemented and tested (s-vsh384ybt4w25a2).
    const needs = needsCode(root);
    const coded = (kind) => kind === "rule" || Boolean(kind && isProjectKind(kind) && needs(kind));
    const { codeFiles, testFiles, changedSymbols, changedTests } = await readCommit(root, config, spec);
    // The specification is approved while the rule of the project's own guidelines approving it is; before the commit it
    // is as the last commit holds it, read as the reindex would rewrite it, and a commit putting it back to draft records
    // a withdrawal of that rule's approval by one of the specification's owners (s-j9r8z4xdrfkfs47).
    const projectNodes = (file) => {
        const out = [];
        const walk = (ns = []) => ns.forEach((n) => (out.push(n), walk(n.children)));
        walk(file?.data.nodes);
        return out;
    };
    const nowRule = approvalRule(projectNodes(spec.files.find((f) => f.path === PROJECT)));
    const lastProject = before(root, PROJECT);
    let wasRule;
    try {
        wasRule = lastProject ? approvalRule(projectNodes({ path: PROJECT, data: JSON.parse(lastProject) })) : undefined;
    }
    catch {
        wasRule = undefined;
    }
    const live = nowRule?.status === "approved";
    if (wasRule && statusNow(wasRule.status) === "approved" && !live) {
        const owners = specificationOwners(spec);
        const withdrawn = addedApprovals(root, readApprovals(root)).some((a) => a.withdrawn && a.sid === wasRule.sid && owners.includes(a.by));
        if (!withdrawn) {
            findings.push({ where: nowRule ? nodeWhere(spec, nowRule.sid) : PROJECT, message: `puts the specification back to draft without a withdrawal of the approval of ${wasRule.sid} by one of the specification's owners (${owners.join(", ") || "none named"})` });
        }
    }
    const at = (path, line) => `${path}:${line}`;
    // SpecTags on the code.
    const rulesChanged = new Set();
    for (const file of codeFiles) {
        for (const p of file.problems)
            findings.push({ where: at(file.path, p.line), message: p.message });
        for (const s of file.symbols) {
            if (s.tags.length)
                continue;
            // In draft mode a symbol without a SpecTag that a commit leaves alone is reported, not refused (s-kkbqcb9xrpaepwn).
            const left = !live && !(changedSymbols.get(file.path)?.has(s) ?? false);
            findings.push({ where: at(file.path, s.start), message: `${s.name} carries no SpecTag`, ...(left ? { reported: true } : {}) });
        }
        for (const s of allSymbols(file.symbols)) {
            const changed = changedSymbols.get(file.path)?.has(s) ?? false;
            for (const t of s.tags) {
                if (!t.sid)
                    continue;
                if (!exists(t.sid))
                    findings.push({ where: at(file.path, t.line), message: `the SpecTag on ${s.name} ${t.sid} names no node` });
                else if (changed && !approved(t.sid))
                    findings.push({ where: at(file.path, t.line), message: `${s.name}, whose code the commit changes, carries the SpecTag ${t.sid}, a draft node` });
                if (changed && coded(spec.nodes.get(t.sid)?.node.kind))
                    rulesChanged.add(t.sid);
            }
        }
    }
    // The SpecTags on the tests.
    const testSids = new Set();
    for (const file of testFiles) {
        for (const t of file.tests) {
            if (!t.sid) {
                // In draft mode a test without a SpecTag that a commit leaves alone is reported, not refused (s-kkbqcb9xrpaepwn).
                const left = !live && !(changedTests.get(file.path)?.has(t.name) ?? false);
                const message = t.bare
                    ? `the test "${t.name}" carries the bare sid ${t.bare}, the form an earlier release read, and so no SpecTag: sheriff reindex writes it`
                    : `the test "${t.name}" carries no SpecTag`;
                findings.push({ where: at(file.path, t.start), message, ...(left ? { reported: true } : {}) });
                continue;
            }
            testSids.add(t.sid);
            const kind = spec.nodes.get(t.sid)?.node.kind;
            if (!exists(t.sid))
                findings.push({ where: at(file.path, t.start), message: `the test "${t.name}" carries ${t.sid}, which names no node` });
            else if (kind !== "rule" && kind !== "term" && !(kind && isProjectKind(kind))) {
                const named = kind === "recordType" ? "a RecordType" : kind === "domain" ? "a domain's header" : `a ${kind}`;
                findings.push({ where: at(file.path, t.start), message: `the test "${t.name}" carries ${t.sid}, ${named}, where a test carries the SpecTag of a rule or a term` });
            }
            else if (changedTests.get(file.path)?.has(t.name) && !approved(t.sid)) {
                findings.push({ where: at(file.path, t.start), message: `the test "${t.name}", which the commit changes, carries ${t.sid}, a draft node` });
            }
        }
    }
    for (const sid of rulesChanged) {
        if (!testSids.has(sid))
            findings.push({ where: nodeWhere(spec, sid), message: "a rule whose code the commit adds or changes, and no test carries its SpecTag" });
    }
    // The lists in the nodes' metadata, and the lists against their declarations.
    const producedCode = new Map();
    for (const file of codeFiles) {
        for (const s of allSymbols(file.symbols))
            for (const t of s.tags) {
                if (!t.sid)
                    continue;
                if (!producedCode.has(t.sid))
                    producedCode.set(t.sid, new Map());
                const files = producedCode.get(t.sid);
                if (!files.has(file.path))
                    files.set(file.path, new Set());
                files.get(file.path).add(s.name);
            }
    }
    const producedTests = new Map();
    for (const file of testFiles)
        for (const t of file.tests) {
            if (!t.sid)
                continue;
            if (!producedTests.has(t.sid))
                producedTests.set(t.sid, new Set());
            producedTests.get(t.sid).add(`${file.path}::${t.name}`);
        }
    for (const [sid, { node, file }] of spec.nodes) {
        if (!judgedHere(file.path, config.writesSpecSheriffGuidelines))
            continue;
        const meta = (node.meta ?? {});
        const produced = producedCode.get(sid) ?? new Map();
        const listed = (meta.code ?? []).map((c) => c.file).sort();
        const want = [...produced.keys()].sort();
        if (listed.join("|") !== want.join("|")) {
            findings.push({ where: nodeWhere(spec, sid), message: `its list of code, ${listed.join(", ") || "none"}, is not what the SpecTags produce: ${want.join(", ") || "none"}` });
        }
        // A node naming the symbols in a file names exactly those that carry its SpecTag.
        for (const c of meta.code ?? []) {
            if (!c.symbols)
                continue;
            for (const name of c.symbols) {
                if (!produced.get(c.file)?.has(name))
                    findings.push({ where: nodeWhere(spec, sid), message: `names the symbol ${name} in ${c.file}, which carries no SpecTag naming it` });
            }
            for (const name of produced.get(c.file) ?? []) {
                if (!c.symbols.includes(name))
                    findings.push({ where: nodeWhere(spec, sid), message: `leaves out the symbol ${name} in ${c.file}, which carries its SpecTag` });
            }
        }
        const listedTests = [...(meta.tests ?? [])].sort();
        const wantTests = [...(producedTests.get(sid) ?? [])].sort();
        if (listedTests.join("|") !== wantTests.join("|")) {
            findings.push({ where: nodeWhere(spec, sid), message: `its list of tests is not what the tests' SpecTags produce: ${wantTests.join(", ") || "none"}` });
        }
        const list = node.list;
        if (list?.declaredIn) {
            const declared = await declaration(root, list.declaredIn.file, list.declaredIn.declaration);
            // A member that is an object is compared by the property the list names.
            const values = list.members.map((m) => String(m && typeof m === "object" ? m[list.property ?? ""] : m));
            const same = declared !== null && [...declared].sort().join("|") === [...values].sort().join("|");
            if (!same)
                findings.push({ where: nodeWhere(spec, sid), message: `its list of ${list.of} does not match ${list.declaredIn.declaration} in ${list.declaredIn.file}: ${declared === null ? "no such declaration" : declared.join(", ")}` });
        }
    }
    const running = new Set(testFiles.flatMap((f) => f.tests.filter((t) => t.sid && !t.skipped).map((t) => t.sid)));
    findings.push(...implementation(spec, new Set(producedCode.keys()), running, coded));
    findings.push(...generatedCopies(root, spec, config));
    findings.push(...locationsOutside(root, config, spec));
    findings.push(...drift(root, spec, config));
    findings.push(...(await projectToolTests(root, config)));
    return findings;
}
/**
 * Each approved rule outside the SpecSheriff guidelines, a project's own guidelines and the technical debt that no tagged
 * symbol or no test that runs carries out — its own, or one of a rule implementing it, followed down the implements
 * links — unless an exempts link reaches it or a section it stands under. Reported only.
 */
function implementation(spec, tagged, tested, coded) {
    const parent = new Map();
    for (const f of spec.files) {
        const walk = (nodes, up) => nodes.forEach((n) => {
            if (up)
                parent.set(n.sid, up);
            walk(n.children ?? [], n.sid);
        });
        walk(f.data.nodes);
    }
    const pointing = (type) => {
        const by = new Map();
        for (const [sid, { node }] of spec.nodes)
            for (const r of node.refs)
                if (r.type === type && r.to)
                    by.set(r.to, [...(by.get(r.to) ?? []), sid]);
        return by;
    };
    const implementers = pointing("implements");
    const exempting = pointing("exempts");
    const found = [];
    for (const [sid, { node, file }] of spec.nodes) {
        if (!coded(node.kind) || node.status !== "approved")
            continue;
        if (file.path.startsWith("specs/_guidelines/") || file.path === "specs/tech/debt.json")
            continue;
        let exempt = false;
        for (let at = sid; at && !exempt; at = parent.get(at))
            exempt = exempting.has(at);
        if (exempt)
            continue;
        const chain = new Set([sid]);
        for (const s of chain)
            for (const by of implementers.get(s) ?? [])
                chain.add(by);
        const hasTag = [...chain].some((s) => tagged.has(s));
        const hasTest = [...chain].some((s) => tested.has(s));
        if (hasTag && hasTest)
            continue;
        const lacks = hasTag ? "no test that runs carries its SpecTag"
            : hasTest ? "no symbol of the system's code carries its SpecTag"
                : "neither a symbol of the system's code nor a test that runs carries its SpecTag";
        found.push({ where: nodeWhere(spec, sid), message: `not implemented: ${lacks}`, reported: true });
    }
    return found;
}
/** The files of the generated types and runtime checks, each compared with what the RecordTypes generate now. */
function generatedCopies(root, spec, config) {
    const { files, refusals } = generateTypes(spec);
    const found = [...refusals, ...projectCopies(root, spec, config)];
    // Code generated from the nodes waits for every node it comes from to be approved, and no commit changes it meanwhile.
    const waiting = waitingRecords(spec);
    if (waiting.length) {
        for (const sid of waiting)
            found.push({ where: nodeWhere(spec, sid), message: "the types and runtime checks generated from the RecordTypes wait for its approval", reported: true });
        for (const f of files) {
            const path = join(root, f.path);
            const kept = existsSync(path) ? readFileSync(path, "utf8").replace(/\r\n/g, "\n") : null;
            const last = before(root, f.path)?.replace(/\r\n/g, "\n") ?? null;
            if (kept !== last)
                found.push({ where: f.path, message: `changed while the RecordTypes it is generated from wait for their approval: ${waiting.join(", ")}` });
        }
        return found;
    }
    for (const f of files) {
        const path = join(root, f.path);
        // Git may check a text file out with CRLF endings; what is committed holds LF.
        const kept = existsSync(path) ? readFileSync(path, "utf8").replace(/\r\n/g, "\n") : null;
        if (kept === null)
            found.push({ where: f.path, message: "missing: a file of the generated types and runtime checks, which sheriff types writes" });
        else if (kept !== f.text)
            found.push({ where: f.path, message: "not what the RecordTypes generate now; sheriff types writes it anew" });
    }
    return found;
}
/** The files of the project's own generators, each compared with what its generator prints now, or with the last commit while it waits for its own nodes. */
function projectCopies(root, spec, config) {
    const own = runGenerators(root, spec, config);
    const found = [...own.refusals];
    const read = (text) => (text ?? null)?.replace(/\r\n/g, "\n") ?? null;
    for (const sid of own.waiting)
        found.push({ where: nodeWhere(spec, sid), message: "the files a project's generator writes from it wait for its approval", reported: true });
    for (const f of own.files) {
        const path = join(root, f.path);
        const kept = read(existsSync(path) ? readFileSync(path, "utf8") : null);
        if (f.waiting.length) {
            if (kept !== read(before(root, f.path)))
                found.push({ where: f.path, message: `changed while the nodes it is generated from wait for their approval: ${f.waiting.join(", ")}` });
        }
        else if (kept === null)
            found.push({ where: f.path, message: `missing: a file the generator "${f.generator}" writes, which sheriff types writes` });
        else if (kept !== f.text)
            found.push({ where: f.path, message: `not what the generator "${f.generator}" generates now; sheriff types writes it anew` });
    }
    return found;
}
/**
 * The tests of each of the project's own checks and generators carry the sid of the rule listing it, and where the
 * commit changes its code, a test carrying that sid exists (s-sfjka4zc4rhfu67). Its code and its tests are the files
 * the settings name for it.
 */
async function projectToolTests(root, config) {
    const found = [];
    const tools = [...config.checks.map((t) => ({ ...t, kind: "check" })), ...config.generators.map((t) => ({ ...t, kind: "generator" }))];
    if (!tools.length)
        return found;
    const tracked = trackedFiles(root).filter((p) => existsSync(join(root, p)));
    const changed = changes(root).map((c) => c.path);
    const matches = (globs, path) => globs.some((g) => posix.matchesGlob(path, g));
    for (const tool of tools) {
        const carried = new Set();
        for (const path of tracked.filter((p) => matches(tool.tests, p))) {
            const read = await readCode(path, readFileSync(join(root, path), "utf8"));
            for (const t of read?.tests ?? []) {
                if (t.sid)
                    carried.add(t.sid);
                if (t.sid !== tool.rule)
                    found.push({ where: `${path}:${t.start}`, message: `the test "${t.name}" of the ${tool.kind} "${tool.name}" carries ${t.sid ?? "no SpecTag"}, not ${tool.rule}, the rule listing it` });
            }
        }
        if (changed.some((p) => matches(tool.code, p)) && !carried.has(tool.rule)) {
            found.push({ where: `${tool.kind} "${tool.name}"`, message: `the code of the ${tool.kind} "${tool.name}" changes, and no test carries the SpecTag of the rule listing it, ${tool.rule}` });
        }
    }
    return found;
}
function nodeWhere(spec, sid) {
    const at = spec.nodes.get(sid);
    return `${at.file.path}: ${sid} (${at.node.location})`;
}
/** The members a declaration holds: the enum a JSON pointer names in a schema, or the string literals of a symbol in the code. */
async function declaration(root, file, name) {
    if (!existsSync(join(root, file)))
        return null;
    const text = readFileSync(join(root, file), "utf8");
    if (file.endsWith(".json")) {
        let value = JSON.parse(text);
        for (const step of name.replace(/^#\/?/, "").split("/").filter(Boolean)) {
            value = value?.[step.replace(/~1/g, "/").replace(/~0/g, "~")];
        }
        const members = Array.isArray(value) ? value : value?.enum;
        if (Array.isArray(members))
            return members.map(String);
        // An object declares its keys, as the kinds of a project's extension are declared.
        return value && typeof value === "object" ? Object.keys(value) : null;
    }
    const read = await readCode(file, text);
    return read?.symbols.find((s) => s.name === name)?.strings ?? null;
}
/** Every file the repository keeps outside `specs/` and the tools, tracked by git or new and not ignored. */
function keptOutside(root, fixtures) {
    return trackedFiles(root).filter((p) => !p.startsWith("specs/") && !isFixture(fixtures, p) && existsSync(join(root, p)));
}
function locationsOutside(root, config, spec) {
    const prefixes = new Set(["contracts", "tech", ...["spec", "tools", "project"].map((file) => "_guidelines/" + file)]);
    for (const f of spec.files) {
        const { part, file } = partOf(f.path);
        prefixes.add(part === "_guidelines" || part === "tech" ? `${part}/${file}` : part);
    }
    const escape = (p) => p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const escaped = [...prefixes].map(escape).join("|");
    // A place is a number, whether or not it names a node now, or the name a term or a file gives the node it locates.
    const named = [...locations(spec).values()].filter((a) => a.includes("/") && !/\/\d+(?:\.\d+)*$/.test(a)).sort((a, b) => b.length - a.length).map(escape).join("|");
    const pattern = new RegExp(`(?<![\\w./-])(?:(?:${escaped})/\\d+(?:\\.\\d+)*(?![\\w])${named ? `|(?:${named})(?![\\w]|\\.\\w)` : ""})`, "gi");
    const found = [];
    for (const path of keptOutside(root, fixtureGlobs(spec))) {
        readFileSync(join(root, path), "utf8").split("\n").forEach((text, i) => {
            for (const m of text.matchAll(pattern))
                found.push({ where: `${path}:${i + 1}`, message: `${m[0]} is a node's location; cite the node by its sid` });
        });
    }
    return found;
}
/** A rule whose text changed after its code last did, read from the history: reported, never refused. */
function drift(root, spec, config) {
    const found = [];
    const order = git(root, "rev-list", "HEAD").out.split("\n").filter(Boolean);
    if (!order.length)
        return found;
    const position = (sha) => order.indexOf(sha);
    const versions = new Map();
    const historyOf = (path) => {
        if (!versions.has(path)) {
            // Each commit with the name the file had in it, so that a renamed file is read under every name it had.
            const named = [];
            for (const line of git(root, "log", "--format=%H", "--name-only", "--follow", "--", path).out.split("\n").filter(Boolean)) {
                if (/^[0-9a-f]{40,64}$/.test(line))
                    named.push({ sha: line, name: path });
                else if (named.length)
                    named[named.length - 1].name = line;
            }
            versions.set(path, named.map(({ sha, name }) => {
                const nodes = new Map();
                const shown = git(root, "show", `${sha}:${name}`);
                if (shown.ok) {
                    const walk = (ns) => ns.forEach((n) => (nodes.set(n.sid, n), walk(n.children ?? [])));
                    try {
                        walk(JSON.parse(shown.out).nodes ?? []);
                    }
                    catch { }
                }
                return { sha, nodes };
            }));
        }
        return versions.get(path);
    };
    // The latest commit that changed any of the files, changes one commit makes counting as made at once; a commit whose
    // only change to a file of tests puts `@spec ` before bare sids does not change it (s-txbwsthdqhvyzd2).
    const lastChanges = new Map();
    const lastChange = (f, tests) => {
        const key = `${tests}:${f}`;
        if (!lastChanges.has(key))
            lastChanges.set(key, findLastChange(f, tests));
        return lastChanges.get(key);
    };
    const findLastChange = (f, tests) => {
        if (!tests)
            return git(root, "log", "-1", "--format=%H", "--follow", "--", f).out.trim();
        let sha = "", was = [], now = [];
        const rewriteOnly = () => now.length > 0 && now.length === was.length && now.every((n) => {
            const i = was.findIndex((w) => onlySpecTagged(w, n));
            return i >= 0 && Boolean(was.splice(i, 1));
        });
        for (const line of git(root, "log", "--format=commit %H", "-p", "-U0", "--no-color", "--follow", "--", f).out.split("\n")) {
            const m = /^commit ([0-9a-f]{40,64})$/.exec(line);
            if (m) {
                if (sha && !rewriteOnly())
                    return sha;
                sha = m[1];
                was = [];
                now = [];
            }
            else if (line.startsWith("-") && !line.startsWith("---"))
                was.push(line.slice(1));
            else if (line.startsWith("+") && !line.startsWith("+++"))
                now.push(line.slice(1));
        }
        return sha && !rewriteOnly() ? sha : "";
    };
    const newest = (files, tests = false) => files.map((f) => lastChange(f, tests)).filter(Boolean).sort((a, b) => position(a) - position(b))[0];
    const later = (a, b) => Boolean(a && b && position(a) < position(b));
    for (const [sid, { node, file }] of spec.nodes) {
        const meta = (node.meta ?? {});
        const code = (meta.code ?? []).map((c) => c.file);
        const tests = [...new Set((meta.tests ?? []).map((t) => t.split("::")[0]))];
        if ((!code.length && !tests.length) || !judgedHere(file.path, config.writesSpecSheriffGuidelines))
            continue;
        const history = historyOf(file.path);
        let textChanged = null;
        for (let i = 0; i < history.length; i++) {
            const now = history[i].nodes.get(sid)?.text;
            const was = history[i + 1]?.nodes.get(sid)?.text;
            if (now !== undefined && now !== was) {
                textChanged = history[i].sha;
                break;
            }
        }
        const codeChanged = newest(code);
        const testsChanged = newest(tests, true);
        const where = nodeWhere(spec, sid);
        if (later(textChanged, testsChanged))
            found.push({ where, message: "its tests lag behind its text", reported: true });
        if (later(textChanged, codeChanged))
            found.push({ where, message: "its code lags behind its text", reported: true });
        if (later(testsChanged, codeChanged))
            found.push({ where, message: "its code may not have caught up with its tests", reported: true });
    }
    return found;
}
/** Every sid the code, the tests and the documents hold names a node, the archive's included, and no number names one. */
export async function citationsOutside(root) {
    const config = loadConfig(root);
    const spec = loadSpecification(root);
    const archived = new Set();
    for (const f of spec.archive) {
        const walk = (ns) => ns.forEach((n) => (archived.add(n.sid), walk(n.children ?? [])));
        walk(f.data.nodes);
    }
    const found = [];
    for (const path of outsideFiles(root, config, fixtureGlobs(spec))) {
        readFileSync(join(root, path), "utf8").split("\n").forEach((text, i) => {
            for (const m of text.matchAll(SID_ANYWHERE)) {
                if (!spec.nodes.has(m[0]) && !archived.has(m[0]))
                    found.push({ where: `${path}:${i + 1}`, message: `${m[0]} names no node` });
            }
            for (const m of text.matchAll(/§\d[\d.]*/g))
                found.push({ where: `${path}:${i + 1}`, message: `${m[0].replace(/\.$/, "")} names a node by a number; cite it by its sid` });
        });
    }
    return found;
}
