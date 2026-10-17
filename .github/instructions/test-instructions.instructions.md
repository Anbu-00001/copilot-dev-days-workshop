---
description: "Use when creating, editing, or debugging tests in this repository."
applyTo: "tests/**"
---

# Test Guidelines

- Use Node.js's built-in test runner and strict assertions, following the existing tests in this directory.
- Run the full suite from the repository root with `npm test`.
- Keep tests deterministic and focused on observable behavior, including relevant boundary cases.
- Do not add test dependencies or change the test script unless the task requires it.
- Do not weaken or remove an assertion just to make a failing test pass; investigate the behavior instead.
- The workshop intentionally includes a failing test for a debugging exercise. Preserve that setup unless the task specifically asks to fix or change it.
