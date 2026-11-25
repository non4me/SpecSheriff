# "The model of the specification", a new node of the appendix of the tools, agreed on 2026-11-22

## Title

The model of the specification

## Text

`sheriff json` prints, as JSON, the model of the specification of the repository in which it runs.

The model holds each node of the files that the repository keeps. It also holds each node of the SpecSheriff guidelines, of the chosen extensions (§s-9ttvcwpqkehm58g) and of the appendix of the tools, where the project takes them from the plugin. It also holds each node that is in a cell of a `TableRule` (§s-5fewsp22mmdz7y6).

It gives each node in the form in which its file holds it, without the nodes under it, together with:
- the part of the specification and the file that the node is in;
- the node above it;
- the owners named by the nearest section or domain header above it that names owners (§s-6sk8uet75dmq5qz).

The model also holds the specification's approval status (§s-qzthyh7yqvfhsa2) and its `strict` flag (§s-q3pfzyaxvpr2zj2).

## Reason

Given the model instead of reading the files itself, a project's check or code generator finds nodes by their location, finds owners and follows links as the SpecSheriff tools do, in whatever programming language the project writes that check or generator. The approval status and the `strict` flag are in the model because they affect what a project's check requires.
