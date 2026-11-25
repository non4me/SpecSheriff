// The owner of 2026-11-11 on 9.2, its whole proposal chosen: the code is the subject of the requirement (7.3); the
// owner's "The same holds for every approved rule of a project's own kind…" goes, a rule of a kind needing no code
// joining the exclusions (7.6); the conditions say "bound", 9.3's word, citing it once instead of naming the SpecTag
// again; the two sentences on implementing rules, one step and a chain, are one; the reason keeps its first sentence.
import fs from "node:fs";

const here = new URL(".", import.meta.url);
const draftsPath = new URL("newform.json", here);
const d = JSON.parse(fs.readFileSync(draftsPath, "utf8"));
const b = d["9.2"];
if (b.sidValue !== "s-6fw72j65jkqrfpf" || b.agreed) throw new Error("unexpected 9.2");

b.text = "If the specification's approval status is `approved`, the system's code must implement every approved rule. Such a rule counts as implemented when both hold (§s-8xw4mgvpexyvw5q):\n- a symbol of the system's code is bound to it;\n- a test bound to it passes.\n\nCode or a test bound to a rule that implements such a rule, directly or through a chain of `implements` links, counts for it.\n\nThe requirement to be implemented does not hold for:\n- the rules of the SpecSheriff guidelines;\n- the rules of the project's own guidelines;\n- a rule of a project's own kind whose nodes require no implementation in code (§s-vsh384ybt4w25a2);\n- the descriptions of shortcomings in the technical debt (§s-2r7k2aeyusgy6fw);\n- a rule exempted from being implemented (§s-gf6n8ge4mke3pr2).";
b.ruText = "Если спецификация имеет статус одобрения `approved`, код системы должен реализовывать каждое одобренное правило. Такое правило считается реализованным, когда выполняется и то, и другое (§s-8xw4mgvpexyvw5q):\n- символ кода системы связан с ним;\n- тест, связанный с ним, проходит.\n\nКод или тест, связанные с правилом, которое реализует такое правило напрямую или через цепочку связей `implements`, засчитываются ему.\n\nТребование быть реализованным не распространяется на:\n- правила SpecSheriff guidelines;\n- правила собственных guidelines проекта;\n- правило собственного типа в проекте, узлам которого не требуется имплементация кода (§s-vsh384ybt4w25a2);\n- описания недостатков в техническом долге (§s-2r7k2aeyusgy6fw);\n- правило, освобождённое от реализации (§s-gf6n8ge4mke3pr2).";
b.reason = "An approved rule the system's code does not carry out leaves the specification stating what does not hold of the system.";
b.ruReason = "Одобренное правило, которого код системы не выполняет, оставляет спецификацию утверждать то, что о системе неверно.";
b.changes.push(
  "По вашему выбору от 11 ноября: «у каждого одобренного правила должна быть реализация» стало «код системы должен реализовывать каждое одобренное правило»; ваша фраза «То же самое распространяется и на…» удалена, а в список исключений добавлено правило собственного типа, узлам которого не требуется имплементация кода.",
  "Условия реализованности говорят «связан», слово согласованного 9.3, и ссылаются на него один раз, а не называют SpecTag заново. Две фразы о реализующих правилах, об одном шаге и о цепочке связей `implements`, слиты в одну.",
  "Обоснование сокращено до первой фразы: она говорит, зачем правило существует.",
);
fs.writeFileSync(draftsPath, JSON.stringify(d, null, 2) + "\n");
console.log("ok");
