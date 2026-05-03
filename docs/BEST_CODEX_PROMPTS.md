# Best Codex Prompts — Barbara Müller Mediation Prototype

## 0. Prompt de démarrage

```text
You are working on a Processing 4 repository for an interactive museum mediation prototype around Barbara Müller’s abstract paintings.

Before changing code:
1. Read README.md, AGENTS.md, docs/README_V6_FINAL.md, docs/IMPLEMENTATION_NOTES_V6.md, and processing/BarbaraMullerMediation/BarbaraMullerMediation.pde.
2. Summarize the architecture and current features.
3. Identify the safest next improvement.
4. Propose a plan.
Do not edit files yet.
```

## 1. Audit technique

```text
Audit the Processing project for Processing 4 compatibility issues, duplicated logic, keyboard shortcut conflicts, bugs in kiosk mode, archive export, before/after mode, and language switching.

Return:
1. critical issues
2. medium issues
3. safe quick fixes
4. risky changes to avoid

Do not change the visual design.
```

## 2. Refactorisation en onglets Processing

```text
Refactor processing/BarbaraMullerMediation/BarbaraMullerMediation.pde into Processing tabs:
- Main.pde
- State.pde
- UI.pde
- Onboarding.pde
- Artwork1.pde
- Artwork2.pde
- Artwork3.pde
- Language.pde
- Logging.pde
- Export.pde
- Utils.pde

Keep all behavior, shortcuts, visual style, and filenames identical.
```

## 3. Stabilisation présentation

```text
Prepare this Processing prototype for a live class presentation.
Priorities: prevent crashes, make the default experience easy to understand, keep public UI clean, keep debug shortcuts available, ensure reset returns to a stable state.
Make only safe changes and provide a 5-step test checklist.
```

## 4. Kiosk

```text
Improve kiosk mode:
- K toggles kiosk
- hide cursor only in kiosk
- after 2 minutes inactivity reset to onboarding
- do not erase exported files
- keep debug shortcuts outside kiosk
- add comments
```

## 5. Debug après erreur

```text
I got this Processing error:

PASTE_ERROR_HERE

Explain likely cause, locate relevant code, apply smallest safe fix, avoid unrelated changes, and tell me how to test.
```

## 6. Expérience publique

```text
Improve the public-facing experience without changing core interactions:
- reduce text density
- make buttons easier to understand
- keep FR/DE/EN
- clarify flow: start → choose work → interact → choose word → final phrase → return to artwork
- keep visual style minimal and quiet
```

## 7. Archive PNG

```text
Improve the visual archive PNG layout.
Include: session title, selected artwork, look points, before point A, after point B, selected word, final phrase, duration, clicks, language, date/session id.
Make it clean and printable. Do not change live UI.
```

## 8. CSV exports

```text
Improve CSV exports with consistent columns:
session_id, timestamp_ms, work_index, work_label, interaction_index, interaction_label, selected_word, point_type, x, y.
Update documentation.
```

## 9. p5.js plan

```text
Plan a p5.js mobile conversion. Do not create files yet.
Return target structure, Processing-to-p5 mapping, features to preserve, features to simplify, mobile UI strategy, risks, and phases.
```

## 10. p5.js implementation

```text
Create a first p5.js mobile web version in a new web/ folder.
Use web/index.html, web/style.css, web/sketch.js, web/assets/.
Preserve onboarding, choose artwork, choose interaction, word selection, final phrase, silence mode, movable color square, before/after gaze points, and FR/DE/EN language switch.
Simplify archive, dashboard, kiosk.
Make it deployable on GitHub Pages.
Do not modify the Processing version.
```

## 11. Note de présentation

```text
Create docs/PRESENTATION_NOTE.md in French, 900–1200 words.
Explain project intention, mediation concept, interaction flow, technical setup, public testing method, data collected, low-tech versions, next steps.
Tone: clear, academic, accessible.
```

## 12. Guide médiateur

```text
Create docs/MEDIATOR_GUIDE.md in French.
Include how to launch, guide a visitor, explain each interaction, suggested oral questions, before/after gaze points, archive PNG, and a 5-minute test session.
```

## 13. Préserver l’intention artistique

```text
Preserve the artistic and mediation intention:
The app is not an explanatory encyclopedia. It is a slow-looking mediation tool.
Avoid gamification, excessive text, bright UI, noisy animations, and technical effects that dominate the paintings.
Apply this principle to the next change.
```

## 14. Revue après modification

```text
Review your last changes.
Check Processing 4 compatibility, shortcuts, FR/DE/EN switching, image paths, output filenames, public experience.
Return a concise verification report.
```

## 15. Une seule amélioration

```text
Make only one improvement:
PASTE_IMPROVEMENT_HERE

Do not refactor unrelated code, redesign the interface, rename files, or remove features.
After implementing, explain files changed, functions changed, and how to test.
```
