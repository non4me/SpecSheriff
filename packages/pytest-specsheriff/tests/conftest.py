import sys
from pathlib import Path

# The plugin is read from its source, so that its tests run without installing it.
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "src"))

pytest_plugins = ["pytester", "pytest_specsheriff"]
