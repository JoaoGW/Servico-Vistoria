# CODEX.md

Behavioral guidelines to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:

- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:

- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:

- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:

- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:

```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

## 5. Implementation Patterns

**Always follow the coding patterns already present in the project.**

Don't try to write a new code implementation following a totally different manner of implementation.
If we use useStates, use it. If we use useEffect, useCallback, etc so do it

Why would you overcomplicate it? Always remember the second section of this Markdown file!

## 6. Creating Documentations

If you are requested to create some documentations for a method/function, always follow this pattern:

```
    /**
        Brief description of what does that following code does. Maximumn of 3 lines
        @params Make a list of the parameters that this function/method has
        @params Place the name of the parameter and a one line description for each param
        return Explain what is the expected return that this function will bring
    */
```

if you are requested to create some documentations for a variable, always follow this pattern:

```
    // Type of the variable - What it is used for - Uses in the code
```

Avoid any unnecessary documentation and weird comment lines. Never write a TODO comment on the code.

## 7. UI Design Implementations

**Creating a new UI on a Component or Page/Screen? So this is what you need to do:**

- Always use the DESIGN.md provided as a context of colors, fonts, spacing, etc
- If the new page is a component or you're creating a new component, analyze the components folder in the project and create a new file in the most suitable folder
- Always analyze another already existing page/screen to know which components are common between them before starting a new UI implementation
- When requested to make a 3D Effect in some component, you are expected to create a 3D looking like element and use elevation and hard shadows in the styling
- If you are creating a style with a variable with Pressable, make sure you have a design made for when the button is not pressed as well
- Always prefer the Modern, Clean and Simple design when you are not given any direct instructions about how you should do it, but don't forget to ask how I would prefer it if there are not enough base files to use as a context
- Remember that for UI implementations, your ROLE is Senior Front-End Software Engineer, the CONTEXT is you were requested to implement a new UI component/screen and should focus on doing it only. Avoid doing any backend
- Look for all the already existing components on the components folder and search for all the Components Libraries that will be already installed in the project
- Be creative but don't exagerate. Use a temperature between 0.4 - 0.7
- If TailwindCSS is available in the project, use their variables

## 8. Commits and Pull Requests

**When requested to write a Commit message:**

Start the commit message with one of the following:

```
    (init): For initializing a new repo or infra in the project. Can't be used more than 3 times all long
    (feat): For new feature implementations
    (imp): For general improvements in functions and UI
    (fix): For bug fixes and errors fixes
    (refactor): When the focus was to refactor some code to new specific own files
    (docs): When the focus was to document code and/or update some README and docs/ files
    (libs): When new external libraries (npm/yarn) are added. They must specified

```

You can mix multiple ones in a commit message. Example

```
    git commit -m "(feat/imp/fix): The feature that has been implemented. The improvement made. The bug that has been fixed"
```

**When requested to write a Pull Requests:**

- Don't create a file in the project source code, write it in your app extension window and make it copyable
- Always write it in Markdown format

This are the rules that you should be following to write the PR:

````
Every Pull Request must contain:

1. Title
2. Overview
3. Change Categories
4. Details of Changes
5. How to Test
6. Related Issues
7. Checklist

---

Title Rules:
- Never use generic titles such as:
  - Pull Request
  - Update
- The title must clearly summarize the main purpose of the branch.
- Always use professional and technical language.

Example:
```md
# Implementation of ECU Diagnostics System and Fault Structure
````

---

Commit Category Mapping:

| Commit Prefix    | PR Category  |
| ---------------- | ------------ |
| `(feat)`         | FEATURE      |
| `(imp)`          | IMPROVEMENTS |
| `(fix)`          | BUG FIX      |
| `(refactor)`     | REFACTOR     |
| `(docs)`         | DOCS         |
| `(dependencies)` | DEPENDENCIES |
| `(libs)`         | DEPENDENCIES |

Combined prefixes must appear in multiple sections:

- `(feat/imp)` → FEATURE + IMPROVEMENTS
- `(feat/fix)` → FEATURE + BUG FIX
- `(feat/refactor)` → FEATURE + REFACTOR
- `(imp/fix)` → IMPROVEMENTS + BUG FIX
- `(feat/imp/fix)` → FEATURE + IMPROVEMENTS + BUG FIX
- `(feat/dependencies)` → FEATURE + DEPENDENCIES
- `(feat/docs)` → FEATURE + DOCS

---

Writing Rules:

- Never invent features or technical details.
- Always rely exclusively on the provided commits.
- Use technical, organized, and professional language.
- Never use emojis.
- Never use informal language.
- Expand commit descriptions only when there is clear logical context.

---

Item Formatting:
All items must follow this pattern:

```md
- Description of the change.  
  **Author:** @JoaoGW
```

If another author is explicitly informed, replace only the username.

---

Overview Rules:
The Overview section must:

- Professionally summarize the branch.
- Explain the main technical goals and impacts.

---

Details of Changes
This section must summarize:

- Structure implementations
- Integrations
- Improvements
- Technical adjustments
- Architectural changes

```

```

## 9. README Files

You should always be using this Repo Markdown as reference: https://github.com/JoaoRibeiro-Multscan/SmartScanCDI
Always write it in Portuguese - BR. Use profesional language, no emojis.

If you can't access it, remember the following structure:

```
# Centered Title

Centered Brief Description

---

[FRAMEWORK BADGE] [MAIN PROGRAMMING LANGUAGE BADGE] [TESTING BADGE] [DEVELOPMENT STATUS BADGE]

---

Sumário

- Visao geral
- Principais funcionalidades
- Arquitetura da aplicacao
- Arquitetura de conexoes (BLE + Localizacao)
- Stack tecnologica
- Estrutura de pastas
- Requisitos de ambiente
- Como executar localmente
- Build e distribuicao (EAS)
- Docker e CI
- Permissoes e recursos nativos
- Troubleshooting

Remaining Content...

```

---

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.
