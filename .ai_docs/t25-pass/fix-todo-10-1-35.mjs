// The todo of row 10.1.35 names the node holding the statuses, now 1.3.1 (s-tgrnpagrb58tya7), in its Russian
// (table-10-1.json) and in its English (todos-en.json). Each file is changed as text, so nothing else in it moves.
import fs from 'node:fs';

const T = 'D:/SpecSheriff/.ai_docs/t25-pass/';
const edits = [
  ['table-10-1.json', 'перевести на новые свойства узлы 1.5 и 2.2 spec.json', 'перевести на новые свойства узлы 1.3.1 и 6.1 spec.json', 1],
  ['todos-en.json', 'перевести на новые свойства узлы 1.5 и 2.2 spec.json', 'перевести на новые свойства узлы 1.3.1 и 6.1 spec.json', 1],
  ['todos-en.json', 'The nodes s-5ah25f6gy99panq and s-sn6au3vcr9uy5pm of spec.json', 'The nodes s-tgrnpagrb58tya7 and s-sn6au3vcr9uy5pm of spec.json', 1],
];
for (const [file, from, to, expected] of edits) {
  const text = fs.readFileSync(T + file, 'utf8');
  const found = text.split(from).length - 1;
  if (found !== expected) {
    console.log(`${file}: "${from}" found ${found} times, ${expected} expected; ${text.includes(to) ? 'already changed' : 'not changed'}`);
    continue;
  }
  fs.writeFileSync(T + file, text.split(from).join(to));
  JSON.parse(fs.readFileSync(T + file, 'utf8'));
  console.log(`${file}: changed`);
}
