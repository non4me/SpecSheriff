// The rule reviewer on check 10.1.3 once more: "may name" reads as permission, as "may" does elsewhere in the
// specification, and a reason requires nothing; "can" states a possibility. Proposed apart, since the owner took the
// sentence. The Russian reading unfolds its hanging participle, as the rule on the Russian reading says.
import fs from "node:fs";

const path = new URL("table-10-1.json", import.meta.url);
const t = JSON.parse(fs.readFileSync(path, "utf8"));
const r = t.tables.flatMap((g) => g.rows).find((x) => x.num === "10.1.3");
r.ruReason = "Связь `supersedes` и ссылка в коде, тестах или документах могут называть архивный узел по его sid. Если дать этот sid другому узлу, один и тот же sid будет называть два узла.";
r.proposals = [
  {
    en: "Reason, its first sentence: A `supersedes` link and a citation in the code, the tests or the documents can name an archived node by its sid.",
    ru: "Русский не меняется: «…могут называть архивный узел по его sid».",
    why:
      "Рецензент: «may» в этой спецификации везде означает разрешение (2.5 «A node may later be deleted from the archive», 7.13 «may be set in capitals»). " +
      "Прочитанное так, обоснование что-то разрешает, а обоснование ничего не требует и не разрешает (1.2.3). «can» говорит то, что имеется в виду: такие ссылки возможны. " +
      "Так же различают «may» и «can» правила оформления ISO (ISO/IEC Directives, Part 2).",
  },
];
fs.writeFileSync(path, JSON.stringify(t, null, 2) + "\n");
console.log("10.1.3 proposals:", r.proposals.length);
