# Node 4.4, technical debt: new wording under review, second version

The owner's rulings (2026-11-09): technical debt is a shortcoming of the internal quality of the implementation, accepted on purpose; the system does what the rules require; a defect is not technical debt, and work put off is a todo. "Holds only descriptions" was an excessive limit: the point is that a reason is not required. An entry is no rule, only what is known of the shortcomings accepted; it is called "the description of a shortcoming" («описание недостатка»). The owner's title is "Technical debt" («Технический долг»), and "may refine the nodes" is theirs. The kind of node in the files stays as it is.

## Text
EN:

The section of the technical debt lists the accepted shortcomings in the internal quality of the system's implementation. The description of a shortcoming need not carry a reason. The system still does what the rules require. A defect is not technical debt.

The description of a shortcoming may refine the nodes it concerns. Where the shortcoming lies in a technology the implementation uses, its description names the version of that technology it was seen in.

Standing there is the whole of the choice to accept the shortcoming:

- no decision records that choice;
- the change that removes the shortcoming removes its description.

RU:

Раздел технического долга перечисляет осознанно принятые недостатки внутреннего качества реализации системы. Описание недостатка не обязано содержать обоснование. Система при этом делает то, что требуют правила. Дефект техническим долгом не является.

Описание недостатка может уточнять узлы, которых касается. Если недостаток кроется в технологии, которую использует реализация, его описание называет версию этой технологии, в которой он замечен.

Нахождение там и есть весь выбор принять недостаток:

- решение об этом выборе нигде не записывается;
- изменение, которое устраняет недостаток, удаляет его описание.

## Reason
Unchanged from the draft in `newform.json`, key "4.4".

## Following change, carried out with it
1.2.3 (agreed), which now reads "A rule of the technical debt may be an exception: its text describes a shortcoming as it stands and may need no reason (§s-2r7k2aeyusgy6fw)." becomes:
- EN: "The description of a shortcoming in the technical debt may be an exception: it may carry no reason (§s-2r7k2aeyusgy6fw)."
- RU: «Исключение может быть у описания недостатка в техническом долге: оно может не содержать обоснования (§s-2r7k2aeyusgy6fw).»
