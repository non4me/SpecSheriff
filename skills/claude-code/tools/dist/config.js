import { readFileSync } from "node:fs";
import { join, posix } from "node:path";
const FILE = "sheriff.config.json";
const KEYS = ["code", "tests"];
const REVIEW = { runner: "claude", model: "fable", fallbackModel: "opus", minutes: 20 };
export function loadConfig(root) {
    let raw;
    try {
        raw = JSON.parse(readFileSync(join(root, FILE), "utf8"));
    }
    catch (error) {
        throw new Error(`${FILE}: ${error.message}`);
    }
    for (const key of Object.keys(raw)) {
        if (![...KEYS, "writesSpecSheriffGuidelines", "testCommand", "review"].includes(key))
            throw new Error(`${FILE}: ${key} is no setting of the SpecSheriff tools`);
    }
    for (const key of KEYS) {
        const value = raw[key];
        if (!Array.isArray(value) || !value.every((g) => typeof g === "string")) {
            throw new Error(`${FILE}: ${key} must be a list of glob patterns`);
        }
    }
    if (raw.writesSpecSheriffGuidelines !== undefined && typeof raw.writesSpecSheriffGuidelines !== "boolean")
        throw new Error(`${FILE}: writesSpecSheriffGuidelines must be true or false`);
    if (raw.testCommand !== undefined && typeof raw.testCommand !== "string")
        throw new Error(`${FILE}: testCommand must be a command`);
    const review = { ...REVIEW, ...(raw.review ?? {}) };
    for (const key of Object.keys(review))
        if (!(key in REVIEW))
            throw new Error(`${FILE}: review.${key} is no setting of the reviewer`);
    if (review.runner !== "claude")
        throw new Error(`${FILE}: review.runner names no runner the SpecSheriff tools describe: ${review.runner}`);
    if (typeof review.minutes !== "number" || review.minutes <= 0)
        throw new Error(`${FILE}: review.minutes must be a number of minutes`);
    return {
        code: raw.code,
        tests: raw.tests,
        writesSpecSheriffGuidelines: raw.writesSpecSheriffGuidelines === true,
        testCommand: raw.testCommand ?? null,
        review,
    };
}
/** How a file, by its path from the root with forward slashes, is read: a test wins over code where both name it. */
export function readsAs(config, path) {
    const matches = (globs) => globs.some((glob) => posix.matchesGlob(path, glob));
    if (matches(config.tests))
        return "tests";
    if (matches(config.code))
        return "code";
    return null;
}
