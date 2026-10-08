# 🚀 GitHub Copilot Dev Days: Hands-on Workshop

**10:00 – 13:00 IST · Intermediate · 10 chapters + bonus · Works on GitHub Copilot Free**

Take a small quiz web app through a realistic engineering workflow with GitHub Copilot: **instructions → plan → build → debug → refactor → CI → skills → issue → pull request → ship**. Everyone uses the **same starter code and builds the same features**, but each room works in a different Copilot surface.

## 🚪 Choose your room

| | 🖥️ **Room A: VS Code** | ⌨️ **Room B: Copilot CLI** | 🪟 **Room C: Copilot app** |
|---|---|---|---|
| **Guide** | [workshops/vscode.md](workshops/vscode.md) | [workshops/cli.md](workshops/cli.md) | [workshops/copilot-app.md](workshops/copilot-app.md) |
| **Choose it if you…** | live in VS Code | prefer the terminal and keyboard | want a visual, agent-first workspace |
| **Signature features** | Completions, next edit suggestions, Plan/Agent modes, GitHub MCP | `/plan`, `/diff`, `/context`, `/worktree`, side panel, `/pr create`, `!` commands | Interactive/Plan sessions, integrated browser + element picker, worktree sessions, Create PR |
| **Install** | VS Code, Git, Node 20+ | Copilot CLI, Git, Node 20+, `gh` | Copilot app, Node 20+, Git |
| **Codespaces?** | ✅ | ✅ | ❌ desktop only |
| **Requests (core)** | ≈ 14–16 | ≈ 12–14 | ≈ 13–15 |

Not sure? **VS Code** if your laptop is locked down (Codespaces runs in a browser), **CLI** if you already live in `gh` and the terminal, **Copilot app** for the newest agent-first workflow.

## 📚 Chapters (same in every room)

| # | Chapter | Time (IST) | You'll learn |
|---|---|---|---|
| 0 | Pre-work: setup | **before the day** + 10:00 check | Tools, your repo copy, first run |
| 1 | Warm-up | 10:10 – 10:25 | The core loop on your surface |
| 2 | Instructions | 10:25 – 10:40 | `/init`, path-specific instructions, context |
| 3 | Plan → build | 10:40 – 11:05 | Plan mode for a multi-file feature (countdown timer) |
| 4 | Debug | 11:05 – 11:20 | Agent-driven red → green on a planted bug |
| 5 | Refactor | 11:20 – 11:35 | Behaviour-preserving refactor guarded by tests |
| ☕ | Break | 11:35 – 11:45 | |
| 6 | CI | 11:45 – 11:55 | GitHub Actions workflow + status badge |
| 7 | Agent skills | 11:55 – 12:10 | Packaging team know-how as a reusable skill |
| 8 | Backlog | 12:10 – 12:20 | Creating well-specified issues from Copilot |
| 9 | Issue → PR → merge | 12:20 – 12:50 | Isolated branch/worktree, PR with green CI, Free-friendly review |
| 10 | Ship & retro | 12:50 – 13:00 | GitHub Pages, usage check, reflection |
| ⭐ | Bonus | early finishers / later | Audit, custom reviewer agent, parallel work, surface extras |

Chapters are **independent**: if you fall behind, take the chapter's **🏃 Behind?** shortcut and keep going.

## ✅ Before the workshop (everyone)

1. Use a **personal** GitHub account with **Copilot Free** (or any plan) enabled at <https://github.com/settings/copilot>.
2. Make sure you have **at least 25 chat/agent requests left** this month (core uses ≈ 12–16).
3. **Use this template → Create a new repository** → name `copilot-dev-days-workshop` → **Public**.
4. Open your room's guide and complete **Chapter 0** at home. Setup is where most workshop time is lost.

## 💳 About Copilot Free

About **2,000 completions** and **50 chat/agent requests** per month (limits can change). Guides mark every request with **💬**, give request-free 🏃 shortcuts, and avoid paid-only features (Copilot code review, cloud sessions, `/delegate`).

## 🗂 Repository layout

```
copilot-dev-days-workshop/
├── README.md               ← this page: choose your room
├── workshops/
│   ├── vscode.md           ← Room A
│   ├── cli.md              ← Room B
│   └── copilot-app.md      ← Room C
├── package.json            ← npm test / npm start (no dependencies)
├── index.html              ← redirects GitHub Pages visitors to src/
├── src/                    ← the quiz: index.html, style.css, questions.js, quiz.js, app.js
└── tests/
    ├── quiz.test.js        ← logic tests (one fails on purpose!)
    └── questions.test.js   ← validates quiz data
```

---

Adapted from the [Copilot Workshops](https://github-samples.github.io/copilot-workshops/) first-steps workshops by James Montemagno ([github-samples/copilot-workshops](https://github.com/github-samples/copilot-workshops), MIT License).
