# AGENTS.md — Instructions for Codex

You are working on a Processing 4 repository for an interactive museum mediation prototype around Barbara Müller’s abstract paintings.

## Intention

This is not a game and not an explanatory encyclopedia. It is a slow-looking mediation tool.

Preserve the calm, minimal, museum-like tone.

The prototype should help visitors notice:
- layers
- transparency
- masses
- traces
- white reserves
- color relations
- shifts of attention
- the relation between interaction and returning to the artwork

## Technical context

Main sketch:

```text
processing/BarbaraMullerMediation/BarbaraMullerMediation.pde
```

Assets:

```text
processing/BarbaraMullerMediation/data/
assets/
```

Docs:

```text
docs/
```

## Rules

Before editing:
1. Read README.md.
2. Read docs/README_V6_FINAL.md.
3. Read docs/IMPLEMENTATION_NOTES_V6.md.
4. Inspect the Processing sketch.

When changing code:
- Keep Processing 4 compatibility.
- Preserve existing keyboard shortcuts unless explicitly asked.
- Preserve FR/DE/EN language switching.
- Preserve generated export filenames unless explicitly asked.
- Do not remove artwork assets.
- Do not add heavy dependencies.
- Avoid visual overload.
- Prefer small, reviewable changes.

## Testing checklist

Verify:
- Sketch launches in Processing 4.
- Images load from data/.
- 1/2/3 switch artworks.
- A/Z/E switch interactions.
- B switches FR/DE/EN.
- K toggles kiosk.
- N/F/V before-after works.
- G exports archive PNG.
- X exports CSV.
- R reset does not crash.
