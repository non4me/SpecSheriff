"""SpecSheriff's plugin for pytest.

It registers the mark a test declares the sid of the node it verifies with, ``@pytest.mark.spec("s-…")``,
and opens the name a run reports for that test with the sid, so that a run's report says which rule
each test verifies.
"""

import re

import pytest

SID = re.compile(r"^s-[2-9a-hjkmnp-z]{15}$")


def pytest_configure(config):
    config.addinivalue_line("markers", "spec(sid): the sid of the node of the specification the test verifies")


def pytest_collection_modifyitems(items):
    for item in items:
        mark = item.get_closest_marker("spec")
        if mark is None:
            continue
        sid = mark.args[0] if len(mark.args) == 1 else None
        if not isinstance(sid, str) or not SID.match(sid):
            raise pytest.UsageError(f"{item.nodeid}: the spec mark needs one sid, s- and fifteen characters")
        head, _, name = item.nodeid.rpartition("::")
        item._nodeid = f"{head}::{sid} {name}"
