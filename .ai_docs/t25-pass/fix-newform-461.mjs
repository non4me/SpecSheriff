// The English of 10.11, agreed on 2026-11-17, brought into line with its Russian text after EngStickler's readers had
// read it: a tool does not "pass", it fails or not; "SpecSheriff check"; step 2 says that none of its tools changes a file;
// the reason no longer says that the checks of the guidelines run only on what passed the project's checks, since each
// step runs regardless of what the earlier steps found.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const file = new URL("newform.json", here);
fs.copyFileSync(file, new URL("newform.before-461.json", here));
const d = JSON.parse(fs.readFileSync(file, "utf8"));
const n = d["10.11"];
const swap = (field, from, to) => {
  const v = n[field];
  if (Array.isArray(v)) {
    const i = v.findIndex((x) => x.includes(from));
    if (i < 0) throw new Error(`${field}: not found: ${from}`);
    v[i] = v[i].replace(from, to);
  } else {
    if (!v.includes(from)) throw new Error(`${field}: not found: ${from}`);
    n[field] = v.replace(from, to);
  }
};
swap("text", "first the project's own tools of that kind that the project's own guidelines (§s-u7tw6m8npxmv5tu) list,", "first the project's own tools of that kind that its own guidelines (§s-u7tw6m8npxmv5tu) list,");
swap("text", "2. the project's own checks (§s-2fau85dfyyeq66m) and the project's other own tools, which change no file;", "2. the project's own checks (§s-2fau85dfyyeq66m) and the project's other own tools, none of which changes a file;");
swap("text", "The commit or the push goes through only if every check and every tool passes.", "The commit or the push goes through only if every check passes and no tool fails.");
swap("text", "Whoever makes it is told that no check of SpecSheriff ran.", "Whoever makes it is told that no SpecSheriff check ran.");
swap("examples", "and the checks of the guidelines run last, on the final files.", "and the checks of the SpecSheriff guidelines run last, on the final files.");
swap("reason", "such as a scan that nothing internal reaches a public repository, and taking up the method must not stop them.", "such as a scan that checks that nothing internal reaches a public repository, and adopting the method must not stop them.");
swap("reason", "The order goes from the most specific to the most general.", "The order runs from the most specific to the most general.");
swap("reason", "The checks of the guidelines run last, on what has already passed the checks of the project.", "The checks of the SpecSheriff guidelines run last, after the project's own checks.");
fs.writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
