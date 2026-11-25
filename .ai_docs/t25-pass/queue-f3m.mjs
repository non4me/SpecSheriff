// The queue outline after the owner agreed to 1.5.2: the proposals that follow from it are shown.
import fs from "node:fs";

const file = new URL("queue-outline.md", import.meta.url);
let s = fs.readFileSync(file, "utf8");
const swap = (from, to) => {
  if (!s.includes(from)) throw new Error(`not found: ${from}`);
  s = s.replace(from, to);
};
swap("  - ● 1.5.2 «Как код привязывается к своим правилам» — согласование\n  - ○ следом: «символ» → «код, который привязывает SpecTag» в 9.2, 9.4, 9.5, 9.6, 10.4 и строках таблицы; новая строка о файле привязок; принцип", "  - ✓ 1.5.2 «Как код привязывается к своим правилам» — согласован\n  - ● «символ» → «код, который привязывает SpecTag» в 9.2, 9.4, 9.5, 9.6, 10.4, 10.1 и пяти строках таблицы; новая строка 10.1.26b\n  - ○ следом: принцип «Rule, test and code bound by the sid»");
swap("- находка 11 отклонена: тест называет правило, в том числе правило технического приложения", "- находка 11 отклонена: тест называет правило, в том числе правило технического приложения\n- находка 3: 1.5.2 «Как код привязывается к своим правилам» — согласован");
s = s.replace(/### ◐ находка 3: [^\n]*/, "### ◐ находка 3: правки под 1.5.2 в шести узлах и шести строках таблицы — принимаете?");
fs.writeFileSync(file, s);
console.log("ok");
