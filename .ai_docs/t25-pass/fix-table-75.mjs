// Check 10.1.20 gets a reason of its own, at the owner's word (2026-11-13: «в 10.1.20 нужно добавить обоснование что эта
// связь разрешена только для собственных расширений потому что только их мы можем гарантировано поддержать
// инструментами»). "Own extensions" are the extensions of the SpecSheriff guidelines, delivered with the plugin (12.1.1).
// The owner dictated it, so the check stays agreed in its new wording.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const r = t.tables.flatMap((g) => g.rows).find((x) => x.num === "10.1.20");
r.reason =
  "The link is allowed only from a node of an extension of the SpecSheriff guidelines, " +
  "because the SpecSheriff tools are guaranteed to support only those extensions.";
r.ruReason =
  "Эта связь разрешена только узлам расширений SpecSheriff guidelines, " +
  "потому что гарантированно поддержать инструментами SpecSheriff можно только эти расширения.";
r.change +=
  " Обоснование добавлено по вашим словам (2026-11-13): связь разрешена только для собственных расширений, потому что только их можно гарантированно поддержать инструментами.";
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log(r.num, "| reason:", r.reason);
