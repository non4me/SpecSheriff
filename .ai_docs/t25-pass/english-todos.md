# "The list of todos", a new node of the appendix of the tools, agreed on 2026-11-22

## Title

The list of todos

## Text

`sheriff todos` prints as plain text every item of `meta.todos` (§s-t28j22vbdmmeqnh) of the nodes in the files that the repository keeps.

The items are listed newest first. Items of the same day are sorted by the path of their file, compared in code-point order, and then in the order in which their nodes appear in that file. Each item is printed with its date, its author, the work to be done, and the sid, the location and the title of its node.

## Reason

A todo is kept on the node it concerns (§s-t28j22vbdmmeqnh), so it can be found where that node is. Listed together, the todos show all the deferred work in one place, newest first.
