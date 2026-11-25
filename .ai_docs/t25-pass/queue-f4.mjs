// The queue outline after the owner accepted the change to the principle: finding 3 is done, finding 4 is next.
import fs from "node:fs";

const file = new URL("queue-outline.md", import.meta.url);
let s = fs.readFileSync(file, "utf8");
const swap = (from, to) => {
  if (!s.includes(from)) throw new Error(`not found: ${from}`);
  s = s.replace(from, to);
};
swap("- ● находка 3: 1.5.2 — закрытый список видов символов, которые несут SpecTag", "- ✓ находка 3: 1.5.2 — закрытый список видов символов, которые несут SpecTag");
swap("  - ● принцип «Rule, test and code bound by the sid»: «код привязан к правилу» вместо «у каждого символа есть SpecTag»", "  - ✓ принцип «Rule, test and code bound by the sid»: «этот код и каждый тест привязаны к правилу» — принят\n- ● находка 4: тесты при каждом push на машине участника — или до попадания в общую ветку, место выбирает проект\n- ○ находка 1: 1.3.2 — «push проходит без запуска тестов» → «ни один тест не отклоняет push»");
swap("- находка 3: 1.5.2 «Как код привязывается к своим правилам» — согласован", "- находка 3: 1.5.2 «Как код привязывается к своим правилам», правки под него и принцип — согласованы");
s = s.replace(/### ◐ находка 3: [^\n]*/, "### ◐ находка 4: тесты — до попадания в общую ветку, где запускать, решает проект?");
fs.writeFileSync(file, s);
console.log("ok");
