# Repository Guidelines

## Scope and blast radius

- Before editing, identify the files needed for the requested change.
- Make the smallest change that fully addresses the request.
- Do not modify workshop guides, tests, or unrelated quiz features unless the request requires it.
- Do not add dependencies, change scripts, or alter build or deployment setup without explaining why.
- If the work requires changes beyond the directly relevant area, explain the impact and ask before proceeding.

## Preserve behavior

- Keep the quiz usable as a static app; do not introduce a framework or server requirement unless asked.
- Preserve existing page behavior and accessibility patterns.
- The README notes that one test failure is intentional for the workshop. Do not remove or change that expected failure unless the task calls for it.

## Validation

- After changing code, run the most relevant existing test or check; the test command is `npm test`.
- Report what changed and what you ran, and call out checks that were not run.
