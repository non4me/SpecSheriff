"""Runs the test cases of the SpecSheriff skills live (tier 3) with NVIDIA SkillEvaluator 1.0.1.

Each case runs in Docker in two arms. The with-plugin arm loads the SpecSheriff plugin for Claude Code as Claude Code
loads it, with `--plugin-dir`, so its skills and its hooks are active. The baseline arm runs without the plugin. Both
arms start in the root of the neutral project that setup-project.mjs creates. The report gives, for each case, the
score of each attempt in each arm: the share of the case's assertions that the judge found met (SkillEvaluator's
behavior_check). SkillEvaluator's overall score is not used, because it also counts the metrics of the skill itself,
which only the with-plugin arm has.

SkillEvaluator's command line cannot load a plugin natively: `validate <plugin> --tier3` copies the skills into one
generated SKILL.md and loads no hooks. The driver therefore calls SkillEvaluator's internal function
`evaluate_prepared_plugin(..., load="native")`, which the command line never calls with `load="native"`. The driver also does the work
that this function leaves undone:
- in the evals folder of the wrapper skill that SkillEvaluator generates, it adds the neutral project, a Dockerfile
  for an image with Node.js and git, and a config file that sets the agent's working directory;
- it gives the with-plugin arm the npm packages of the plugin's tools, because SkillEvaluator never copies a
  node_modules folder; the plugin's session start then records where the plugin keeps its tools, so the git hooks find them;
- it runs the agent with the Claude subscription token, which SkillEvaluator does not support, and keeps the judge's
  API key out of the agent's container;
- it works around two bugs in SkillEvaluator on Windows: its refusal to copy a hard-linked file, and the CRLF line
  endings of the shell scripts that SkillEvaluator generates.

Run tier3.py with the Python interpreter of SkillEvaluator's uv tool environment. That environment is in a subfolder of
the folder that `uv tool dir` prints:
<uv tool dir>/skillevaluator/Scripts/python.exe on Windows, <uv tool dir>/skillevaluator/bin/python on Linux.

    python tier3.py --root <repository> --cases <cases.json> --report <report.json> [--attempts 3] [--only id1,id2]

The environment variables must include SKILL_EVAL_LLM_PROVIDER=anthropic and ANTHROPIC_API_KEY for the judge, and
CLAUDE_CODE_OAUTH_TOKEN and CLAUDE_FORCE_OAUTH=1 for the agent.
"""

from __future__ import annotations

import argparse
import json
import os
import shutil
import stat
import subprocess
import sys
import tempfile
from pathlib import Path

try:
    from skillevaluator.evaluation.options import EvaluationOptions
    from skillevaluator.evaluation.service import EvaluationService
    from skillevaluator.plugin_inventory import plugin_inventory_for_root
    from skillevaluator.tier3.harbor import adapter, native_staging, runner
    from skillevaluator.tier3.harbor.local_runtime import PINNED_RUNTIME_VERSIONS
    from skillevaluator.tier3.harbor.progress import PlainProgressReporter
    from skillevaluator.tier3.plugin_execution import active_runtime, evaluate_prepared_plugin
    from skillevaluator.tier3.plugin_native import ClaudeCodeAdapter
    from skillevaluator.tier3.plugin_prepare import prepare_runtime_package
except ImportError as error:
    sys.exit(f"tier3.py: run it with the Python of SkillEvaluator's uv tool environment ({error})")

AGENT = "claude-code"
AGENT_MODEL = "claude-opus-5-5"
JUDGE_MODEL = "claude-opus-5-5"
BEHAVIOR_BUDGET = 80000
WORKDIR = "/project"
# Every process in the container inherits the container's environment, and Claude Code prefers an API key to the
# subscription token. The variables listed below are therefore kept out of that environment. Harbor passes the token
# to the agent, and the judge's key to the verifier, the part of Harbor in which the judge runs.
NOT_IN_CONTAINER = ("ANTHROPIC_API_KEY", "ANTHROPIC_BASE_URL", "CLAUDE_CODE_OAUTH_TOKEN", "CLAUDE_FORCE_OAUTH")
# The image contains the release of Claude Code that SkillEvaluator pins, so Harbor does not install it in each trial.
CLAUDE_CODE = PINNED_RUNTIME_VERSIONS[AGENT]
# The settings of the reviewer's runner, with the values that the owner confirmed on their own machine. Where the
# global git configuration lacks them, the plugin's session-start hook tells the agent to ask the user for them.
REVIEWER = {"claudeModel": "opus", "claudeFallbackModel": "sonnet", "claudeEffort": "high", "claudeAsked": "true"}

DOCKERFILE = f"""\
FROM python:3.12-slim
COPY --from=node:24-bookworm-slim /usr/local/bin/node /usr/local/bin/node
COPY --from=node:24-bookworm-slim /usr/local/lib/node_modules /usr/local/lib/node_modules
RUN ln -s ../lib/node_modules/npm/bin/npm-cli.js /usr/local/bin/npm \\
 && ln -s ../lib/node_modules/npm/bin/npx-cli.js /usr/local/bin/npx \\
 && apt-get -o Acquire::Retries=3 update \\
 && apt-get -o Acquire::Retries=3 install -y --no-install-recommends bash ca-certificates curl git jq procps ripgrep \\
 && rm -rf /var/lib/apt/lists/*
RUN curl -fsSL https://downloads.claude.ai/claude-code-releases/bootstrap.sh | bash -s -- {CLAUDE_CODE}
COPY project/ {WORKDIR}/
WORKDIR {WORKDIR}
"""

CONFIG = f"""\
schema_version: 1
harbor:
  agent_workdir: {WORKDIR}
"""


def fail(message: str) -> None:
    sys.exit(f"tier3.py: {message}")


def check_environment() -> None:
    if os.environ.get("SKILL_EVAL_LLM_PROVIDER") != "anthropic":
        fail("SKILL_EVAL_LLM_PROVIDER must be anthropic")
    for name in ("ANTHROPIC_API_KEY", "CLAUDE_CODE_OAUTH_TOKEN"):
        if not os.environ.get(name, "").strip():
            fail(f"{name} is not set")
    if os.environ.get("CLAUDE_FORCE_OAUTH") != "1":
        fail("CLAUDE_FORCE_OAUTH must be 1, so that the agent runs with the subscription token")
    os.environ.setdefault("SKILL_EVAL_JUDGE_MODEL", JUDGE_MODEL)
    # The judge reads the file changes and the tool history within this many characters. The default of a few
    # thousand cut both in the first run, so the judge failed assertions that the agent had met.
    os.environ.setdefault("SKILL_EVAL_BEHAVIOR_CHECK_BUDGET", str(BEHAVIOR_BUDGET))


def patch_skillevaluator(temp: Path) -> None:
    """Run the agent on the subscription token, and stage the hook census script from a copy that is not a hard link."""
    agent_credentials = runner._agent_credentials
    env_block = adapter._runtime_env_toml_block

    def credentials(**kwargs):
        found = agent_credentials(**kwargs)
        if kwargs.get("agent") == AGENT:
            found = {**found, **{name: os.environ[name] for name in ("CLAUDE_CODE_OAUTH_TOKEN", "CLAUDE_FORCE_OAUTH")}}
        return found

    runner._agent_credentials = credentials
    adapter._runtime_env_toml_block = lambda env: env_block({k: v for k, v in (env or {}).items() if k not in NOT_IN_CONTAINER})
    # uv installs packages as hard links to its cache, and SkillEvaluator refuses to copy a hard-linked file.
    census = temp / "hook_census.sh"
    shutil.copyfile(native_staging.HOOK_CENSUS_TEMPLATE, census)
    native_staging.HOOK_CENSUS_TEMPLATE = census


def build_inputs(root: Path, cases: Path, only: list[str], temp: Path) -> tuple[Path, Path, Path, list[str]]:
    """Write the evals source, the Docker environment with the neutral project, and the evals config."""
    data = json.loads(cases.read_text(encoding="utf-8"))
    evals = [e for e in data["evals"] if not only or e["id"] in only]
    if missing := sorted(set(only) - {e["id"] for e in evals}):
        fail(f"no case has the id {', '.join(missing)}")
    source = temp / "evals"
    source.mkdir()
    entries = [{k: v for k, v in e.items() if k not in ("incident", "rules")} for e in evals]
    (source / "evals.json").write_text(json.dumps({"skill_name": data["skill_name"], "evals": entries}, indent=2))
    environment = temp / "environment"
    environment.mkdir()
    (environment / "Dockerfile").write_text(DOCKERFILE, encoding="utf-8", newline="\n")
    project = environment / "project"
    setup = subprocess.run(
        ["node", str(root / "internal" / "skill-evals" / "setup-project.mjs"), str(tools(root)), str(project)],
        env={k: v for k, v in os.environ.items() if k != "SPECSHERIFF_GUIDELINES_REPO"},
        capture_output=True,
        text=True,
    )
    if setup.returncode != 0:
        fail(f"setup-project.mjs failed:\n{setup.stdout}{setup.stderr}")
    # On Windows, SkillEvaluator cannot delete its copies of git's read-only object files.
    for path in project.rglob("*"):
        path.chmod(path.stat().st_mode | stat.S_IWRITE)
    config = temp / "config.yml"
    config.write_text(CONFIG, encoding="utf-8")
    return source, environment, config, [e["id"] for e in evals]


def tools(root: Path) -> Path:
    return root / "skills" / "claude-code" / "tools"


def evaluate_with(root: Path, environment: Path, config: Path):
    """Return a function that first adds files to the generated wrapper and to the tasks of the with-plugin arm, and
    then calls SkillEvaluator's engine."""

    def evaluate(options: EvaluationOptions):
        evals = options.skill_path / "evals"
        shutil.copytree(environment, evals / "environment")
        shutil.copy(config, evals / "config.yml")
        hooks = active_runtime()
        stage_with_arm = hooks.stage_with_arm

        def stage(agent, task_dirs):
            stage_with_arm(agent, task_dirs)
            for task in task_dirs:
                complete_with_arm(task / "environment", tools(root))

        hooks.stage_with_arm = stage
        return EvaluationService().evaluate(options, progress_reporter=PlainProgressReporter())

    return evaluate


def complete_with_arm(env_dir: Path, tools_dir: Path) -> None:
    """Prepare the with-plugin arm's image: convert SkillEvaluator's generated scripts to LF line endings, add the
    npm packages of the plugin's tools as SkillEvaluator stages them, and set the reviewer's settings."""
    for script in (env_dir / "skilleval").rglob("*.sh"):
        script.write_bytes(script.read_bytes().replace(b"\r\n", b"\n"))
    shutil.copytree(tools_dir / "node_modules", env_dir / "specsheriff-node-modules")
    plugin_tools = f"{ClaudeCodeAdapter.plugin_dir}/tools"
    lines = [
        "",
        "# tier3.py: the npm packages of the plugin's tools",
        f"COPY specsheriff-node-modules/ {plugin_tools}/node_modules/",
        "# tier3.py: the reviewer's settings, so that the session start does not ask the agent for them",
        "RUN " + " && ".join(f"git config --global specsheriff.review.{k} {v}" for k, v in REVIEWER.items()),
    ]
    with (env_dir / "Dockerfile").open("a", encoding="utf-8", newline="\n") as dockerfile:
        dockerfile.write("\n".join(lines) + "\n")


def check_plugin_loaded(result: dict) -> None:
    """Fail unless Claude Code listed every staged skill and hook of the plugin in the with-plugin arm."""
    evidence = (result.get("native_evidence") or {}).get(AGENT) or {}
    missing = [f"{c['type']} {c['name']}" for c in evidence.get("staged", []) + evidence.get("not_loaded", [])]
    if missing or not evidence.get("loaded", []) + evidence.get("listed", []):
        fail(f"the with-plugin arm did not load the plugin: {', '.join(missing) or 'no component listed'}")


def scores(run_dir: Path, ids: list[str], attempts: int) -> list[dict]:
    """The share of the assertions met in each attempt of each case in each arm, read from SkillEvaluator's results."""
    found = {(arm, case): [] for arm in ("with", "without") for case in ids}
    for arm in ("with", "without"):
        for reward in sorted((run_dir / AGENT / f"{arm}-skill" / "trials").glob("*/reward.json")):
            data = json.loads(reward.read_text(encoding="utf-8"))
            if not isinstance(data.get("behavior_check"), (int, float)):
                fail(f"attempt {reward.parent.name} has no score: {data.get('evaluation_errors') or 'unknown reason'}")
            found.setdefault((arm, data.get("entry_id")), []).append(data["behavior_check"])
    for (arm, case), values in found.items():
        if len(values) != attempts:
            fail(f"case {case} has {len(values)} scored attempts in the {arm} arm, not {attempts}")
    return [{"id": case, "with": found["with", case], "without": found["without", case]} for case in ids]


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("--root", type=Path, required=True)
    parser.add_argument("--cases", type=Path, required=True)
    parser.add_argument("--report", type=Path, required=True)
    parser.add_argument("--attempts", type=int, default=3)
    parser.add_argument("--only", default="")
    args = parser.parse_args()
    check_environment()
    root = args.root.resolve()
    plugin = root / "skills" / "claude-code"
    report = args.report.resolve()
    only = [i.strip() for i in args.only.split(",") if i.strip()]
    with tempfile.TemporaryDirectory(prefix="specsheriff-tier3-") as name:
        temp = Path(name)
        patch_skillevaluator(temp)
        source, environment, config, ids = build_inputs(root, args.cases.resolve(), only, temp)
        options = EvaluationOptions(
            skill_path=plugin,
            agents=AGENT,
            agent_model=(f"{AGENT}={AGENT_MODEL}",),
            n_attempts=args.attempts,
            n_concurrent=1,
            stop_on_pass=False,
            custom_dockerfile_mode="preserve",
            agent_runtime_preflight=False,
            timeout_multiplier=2.0,
            results_dir=report.with_name(report.stem + "-raw"),
        )
        outcome = evaluate_prepared_plugin(
            prepare_runtime_package(plugin_inventory_for_root(plugin)),
            options,
            work_dir=temp,
            load="native",
            evals_source=source,
            evaluate=evaluate_with(root, environment, config),
        )
    if reason := EvaluationService.failure_reason(outcome.result):
        fail(f"SkillEvaluator's run failed: {reason}")
    check_plugin_loaded(outcome.result)
    run_dir = Path(outcome.result["run_dir"])
    data = {"cases": scores(run_dir, ids, args.attempts), "raw": str(run_dir)}
    report.write_text(json.dumps(data, indent=2) + "\n", encoding="utf-8")
    print(f"tier3.py: wrote {report}")


if __name__ == "__main__":
    main()
