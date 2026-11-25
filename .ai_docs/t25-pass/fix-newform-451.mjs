// Node 1.6.1: the wording checker found that one new sentence of the reason gave two reasons; it is split in two. The
// temporary key "1.6.1~" is removed, since the proposal carries the whole wording.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-451.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const p = d["1.6.1"].proposals[0];
const swap = (field, from, to) => {
  if (!p[field].includes(from)) throw new Error(`${field}: not found: ${from}`);
  p[field] = p[field].replace(from, to);
};
swap("en", "The tests are not run at a commit, since a suite takes longer than a commit should wait, and a change not yet shared misleads nobody.", "The tests are not run at a commit, since a suite takes longer than a commit should wait. A change not yet shared misleads nobody, so its tests can wait until it is shared.");
swap("ru", "Тесты не запускаются при коммите: набор тестов идёт дольше, чем стоит ждать коммиту, а изменение, которое ещё не попало в общую ветку, никого не вводит в заблуждение.", "Тесты не запускаются при коммите, потому что набор тестов идёт дольше, чем стоит ждать коммиту. Изменение, которое ещё не попало в общую ветку, никого не вводит в заблуждение, поэтому его тесты могут подождать до этого момента.");
delete d["1.6.1~"];
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
