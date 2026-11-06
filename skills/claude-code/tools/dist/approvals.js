import { appendFileSync, existsSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { before as committed } from "./diff.js";
import { APPROVAL_RULE, fingerprint, isContainer, ownersOf, partOf, specificationOwners } from "./model.js";
import { loadSpecification, takesGuidelines, writeSpecFile } from "./spec-files.js";
export const APPROVALS = "specs/_approvals.jsonl";
/** The file earlier releases kept the confirmations in, each naming its owner where an approval names `by`. */
export const CONFIRMATIONS = "specs/_confirmations.jsonl";
/** The lines of an approvals file, or of an earlier release's confirmations, each `owner` read as `by`. */
export function parseApprovals(text, name = APPROVALS) {
    return text
        .split("\n")
        .filter((line) => line.trim())
        .map((line, i) => {
        let value;
        try {
            value = JSON.parse(line);
        }
        catch (error) {
            throw new Error(`${name}: line ${i + 1}: ${error.message}`);
        }
        const { owner, by, ...rest } = value;
        return { ...rest, by: (by ?? owner) };
    });
}
/** The approvals of the repository: those an earlier release kept as confirmations first, then its own (s-v4qus7raqnwzneb). */
export function readApprovals(root) {
    const read = (path) => (existsSync(join(root, path)) ? parseApprovals(readFileSync(join(root, path), "utf8"), path) : []);
    return [...read(CONFIRMATIONS), ...read(APPROVALS)];
}
/**
 * Moves an earlier release's confirmations into the approvals, each line's `owner` written as `by`, appended after the
 * approvals already standing, and removes the old file; says whether it changed anything (s-f5rz6b7dhxejjts).
 */
export function migrateApprovals(root) {
    const old = join(root, CONFIRMATIONS);
    if (!existsSync(old))
        return false;
    const lines = parseApprovals(readFileSync(old, "utf8"), CONFIRMATIONS);
    const now = join(root, APPROVALS);
    const kept = existsSync(now) ? readFileSync(now, "utf8") : "";
    const ordered = (a) => JSON.stringify({ sid: a.sid, fingerprint: a.fingerprint, ...(a.withdrawn ? { withdrawn: true } : {}), by: a.by });
    writeFileSync(now, [...lines.map(ordered), ...(kept ? [kept.replace(/\n$/, "")] : [])].join("\n") + "\n");
    rmSync(old);
    return true;
}
/** The line that decides for a wording of a node: the latest for the node's sid and that fingerprint. */
export function latest(lines, sid, print) {
    return lines.findLast((l) => l.sid === sid && l.fingerprint === print);
}
/** Whether an approval stands for that wording of the node: the line deciding for it is an approval. */
export function stands(lines, sid, print) {
    const line = latest(lines, sid, print);
    return line !== undefined && !line.withdrawn;
}
/** Whether any wording of the node was ever approved. */
export function everApproved(lines, sid) {
    return lines.some((l) => l.sid === sid && !l.withdrawn);
}
/** The fingerprint of each wording of the node for which an approval stands, whether the node holds it or not. */
export function standingPrints(lines, sid) {
    const prints = new Set(lines.filter((l) => l.sid === sid).map((l) => l.fingerprint));
    return [...prints].filter((print) => stands(lines, sid, print));
}
/**
 * Approves the nodes as `me`, or withdraws their approval; refuses all of them where one may not be, so that a run
 * records what it names or nothing (s-v4qus7raqnwzneb).
 */
export function approve(root, sids, { me, withdraw = false }) {
    const spec = loadSpecification(root);
    const lines = readApprovals(root);
    const specOwners = specificationOwners(spec);
    for (const sid of sids) {
        const at = spec.nodes.get(sid);
        if (!at)
            throw new Error(`${sid}: no node holds this sid`);
        if (isContainer(at.node.kind)) {
            throw new Error(`${sid}: a ${at.node.kind === "domain" ? "domain's header" : "section"}, whose status is built from the nodes under it, so nobody approves it`);
        }
        if (takesGuidelines(root) && partOf(at.file.path).specSheriffGuidelines) {
            throw new Error(`${sid}: a node of the SpecSheriff guidelines, approved only in the repository they are written in`);
        }
        if (at.node.refs?.some((r) => r.type === "refines" && r.to === APPROVAL_RULE)) {
            if (!specOwners.includes(me))
                throw new Error(`${sid}: the rule that approves the specification, which only the specification's owners (${specOwners.join(", ") || "none named"}) approve or withdraw, not ${me}`);
            continue;
        }
        if (withdraw)
            continue;
        const owners = ownersOf(spec, sid);
        if (!owners.length)
            throw new Error(`${sid}: no owner is named for this node`);
        if (!owners.includes(me))
            throw new Error(`${sid}: its owners are ${owners.join(", ")}, not ${me}`);
    }
    const changed = new Set();
    for (const sid of sids) {
        const at = spec.nodes.get(sid);
        // A withdrawal takes back the approval of every wording for which one stands, one line for each.
        const print = fingerprint(at.node);
        const added = withdraw
            ? standingPrints(lines, sid).map((p) => ({ sid, fingerprint: p, withdrawn: true, by: me }))
            : stands(lines, sid, print) ? [] : [{ sid, fingerprint: print, by: me }];
        for (const a of added) {
            appendFileSync(join(root, APPROVALS), JSON.stringify(a) + "\n");
            lines.push(a);
        }
        const status = withdraw ? "draft" : "approved";
        if (at.node.status !== status) {
            at.node.status = status;
            changed.add(at.file.path);
        }
    }
    for (const f of spec.files)
        if (changed.has(f.path))
            writeSpecFile(root, f);
}
/**
 * The approvals a commit records: the lines the approvals hold beyond those of the last commit, read with what an
 * earlier release kept as confirmations, so that the lines a release carries over are not judged again (s-95w92rnjuv3sst8).
 */
export function addedApprovals(root, lines) {
    const key = (a) => [a.sid, a.fingerprint, a.by, a.withdrawn ? 1 : 0].join(" ");
    const last = new Map();
    for (const path of [CONFIRMATIONS, APPROVALS]) {
        for (const a of parseApprovals(committed(root, path) ?? "", path))
            last.set(key(a), (last.get(key(a)) ?? 0) + 1);
    }
    return lines.filter((a) => {
        const left = last.get(key(a)) ?? 0;
        if (left)
            last.set(key(a), left - 1);
        return !left;
    });
}
