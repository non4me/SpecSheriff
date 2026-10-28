import { fileURLToPath } from "node:url";
import { resolve } from "node:path";

/** The root of the repository the tests run in, whose specs/ they read and never write. */
export const REPO = resolve(fileURLToPath(new URL(".", import.meta.url)), "../../..");
