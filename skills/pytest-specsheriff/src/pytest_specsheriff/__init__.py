"""SpecSheriff's plugin for pytest.

It registers the mark a test declares the SpecTag of the node it is written from with,
``@pytest.mark.spec("@spec s-…")``, and opens the name a run reports for that test with the SpecTag, so that a
run's report says which rule each test is written from.
"""

import re

import pytest

SID = re.compile(r"^s-[2-9a-hjkmnp-z]{15}$")
TAG = re.compile(r"^@spec (s-[2-9a-hjkmnp-z]{15})$")


def pytest_configure(config):
    config.addinivalue_line("markers", "spec(tag): the SpecTag, @spec and the sid of the node of the specification the test is written from")


def pytest_collection_modifyitems(items):
    for item in items:
        mark = item.get_closest_marker("spec")
        if mark is None:
            continue
        held = mark.args[0] if len(mark.args) == 1 else None
        tag = TAG.match(held) if isinstance(held, str) else None
        if tag is None:
            if isinstance(held, str) and SID.match(held):
                raise pytest.UsageError(
                    f"{item.nodeid}: the spec mark holds the bare sid {held}, the form an earlier release read: "
                    f"sheriff reindex writes its SpecTag, @spec {held}"
                )
            raise pytest.UsageError(f"{item.nodeid}: the spec mark needs one SpecTag, @spec followed by a sid")
        head, _, name = item.nodeid.rpartition("::")
        renamed = f"{head}::{held} {name}"
        # pytest offers no public way to rename a node: up to 8 it keeps the id as a string, from 9 as
        # a structured id its string is built from.
        if hasattr(item, "_id"):
            item._id = type(item._id).parse(renamed)
        else:
            item._nodeid = renamed
