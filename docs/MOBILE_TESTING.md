# Mobile Testing

## Local Run

Run the prototype from the repository root:

```bash
python3 -m http.server 8000
```

Open one of these URLs:

- Desktop: `http://localhost:8000/web/`
- Phone on the same Wi-Fi network: `http://<your-local-ip>:8000/web/`
- GitHub Pages: `https://gadatheo-design.github.io/barbara-muller-mediation/`

The site is static and uses relative paths, so it works both locally and on GitHub Pages without a build step.

## Guided Mode

The start screen now offers two entry points:

- `Parcours guidé` / `Geführter Parcours` / `Guided path`
- `Explorer librement` / `Frei erkunden` / `Explore freely`

The guided path follows this sequence:

1. Artwork 3: silence, traces, almost invisible marks
2. Artwork 1: veil, pale layers, reserve, counterweight mass
3. Artwork 2: color relations, density, neighbor effects

Before the first artwork, the visitor passes through three short introduction screens on slow looking, gesture, and attention.

After each artwork, the guided mode:

- invites the visitor to return to the real artwork
- offers `continue to next artwork`
- allows `leave guided path` at any time

After the third artwork, the prototype generates a short final synthesis from the visited works, chosen words, return phrases, and gaze-shift notes when available.

## Free Exploration

Free mode remains the direct path already used in the prototype:

1. choose one artwork
2. observe
3. choose one interaction
4. interact
5. choose one word
6. generate one phrase
7. return to the artwork
8. optionally restart, open the test summary, or choose another artwork

Free mode does not impose an order on the artworks. It keeps the same local test summary tools and privacy model as guided mode.

## Interaction Clarity

The interaction layer is now designed to be understood faster on a phone:

- each interaction begins with a short direct prompt such as `Glisse lentement sur les voiles` or `Reste immobile quelques secondes`
- interactive areas now show a subtle visual cue before the first touch
- once the visitor touches successfully, the cue becomes quieter and the image response becomes more important
- each core interaction now has a light local completion state, followed by an invitation to choose a word
- during the active interaction stage, the bottom sheet is simplified: one short instruction, one compact cue, one primary `Choose a word` button, and an optional inline `Mark looking` control
- the A/B explanation is no longer shown as a large card during interaction; `Mark looking` now sits as a secondary inline action instead of competing with the main gesture

What changed by artwork:

- Artwork 1 now responds more clearly to pressure and slow contact: the veils shift locally and the darker mass answers more visibly
- Artwork 2 now makes the square feel draggable and keeps a visible `fixed colour` label attached to it, while only the surrounding halo changes
- Artwork 2 now also keeps a very light memory of two placements, so the visitor can compare two neighborhoods without adding a new mode
- Artwork 3 now makes stillness more legible through a clearer hold cue, a gentler reveal / fade rhythm, and a more visible difference between waiting and moving too quickly
- Artwork 3 `Trace` now gives a clearer line to follow, a more progressive emergence, and visible poles between near-erasure and trace
- Artwork 1 now also names `veil` and `mass` directly on the image so the relation is readable before the first touch
- Artwork 3 now keeps a slightly more visible image base before stillness builds, so the waiting state does not read like a blank or broken screen
- Across the three artworks, the active gesture stage now names clearer paired poles such as `reserve / mass`, `fixed colour / surroundings`, or `erasure / trace`

## 5-Minute Guided Test

Use this short protocol for a public or internal test:

1. Open the site on a phone.
2. Confirm the language in use.
3. Start `Guided path`.
4. Let the visitor pass through the three short introduction screens at their own pace.
5. Let the visitor complete artwork 3, then artwork 1, then artwork 2.
6. If it feels useful, ask them to open the inline `Mark looking` control and place A before the gesture, then B after it.
7. After the final synthesis, invite them to lower the phone and look back at the artwork.
8. Open `Test summary`.
9. Use `Copy test summary` or `Download JSON`.
10. Ask the short post-test questions below.

## Testing Interaction Clarity

When testing on a phone, check whether the visitor understands all four of these points without extra explanation:

- what can be touched
- what changes when they touch
- when the interaction has “done enough”
- why the phone should finally lead them back to the artwork

If an interaction still feels unclear, watch where hesitation happens:

- before the first touch
- during the first movement
- when deciding whether to continue
- when deciding whether to move to the word
- at the return-to-artwork moment
- when deciding whether to ignore or use the optional `Mark looking` flow

Also test the main transition control directly:

- before interaction completion, confirm the `Choose a word` button is visibly disabled and does not feel broken
- after interaction completion, confirm the same button becomes clearly active
- tap it once and confirm the prototype moves immediately to the word-selection stage

## Comparing Guided And Free

To compare the two modes in testing:

- run one session in guided mode and one in free mode
- note where the visitor hesitates, accelerates, or stops reading
- compare whether guided mode increases patience, continuity, or attention to relations between works
- compare whether free mode feels more autonomous or more abrupt
- check whether the final phrase or the guided synthesis gives the stronger return to the real artwork

## What Mediators Should Observe

During testing, pay attention to:

- whether the visitor understands the difference between guided mode and free exploration
- whether the introduction screens slow the rhythm without feeling instructional
- whether the visitor notices the intended qualities of each artwork path
- whether the short `try this` prompt is enough on its own
- whether artwork 1 makes the veil / mass relation understandable before the first touch
- whether artwork 3 reads as a deliberate waiting action rather than an inactive faded screen
- whether artwork 3 makes the difference between `waiting`, `trace appearing`, and `moving too quickly` understandable without explanation
- whether artwork 3 `Trace` now feels like following something almost lost, rather than simply drawing on top of the image
- whether the first visual cue is noticed before the visitor asks what to do
- whether the image response feels immediate enough after touch
- whether the completion moment feels calm but clear
- whether the `Choose a word` button is understood as the next step
- whether the optional `Mark looking` control is understood as documentation, not as a required task
- whether the transition back to the real artwork actually happens
- whether the guided synthesis feels like a meaningful closure

## Questions After The Guided Path

Use short spoken questions, not a questionnaire. For example:

1. Which moment stayed with you most strongly?
2. Did the guided order change the way you looked?
3. Did one gesture help you notice something you had not seen at first?
4. Did the final phrase or final synthesis feel close to your experience?
5. At the end, did you want to look back at the real artwork?

If an interaction still felt unclear, ask one short follow-up:

- What did you think you were supposed to do first?
- What changed most clearly when you touched?
- At what moment did the interaction start to make sense?
- Did you know when it was enough to move to the word?
- Did the phone help you return to the painting, or keep you on the screen?

For Artwork 2 specifically, ask one direct check question:

- Did it feel clear that the square itself stayed the same, and that only the surroundings changed your perception?
- Did the first and second placements help you compare two different neighborhoods, or did they remain too discreet?

For Artwork 1 and Artwork 3, two extra check questions can help:

- In artwork 1, did you understand where the veil was and where the denser mass held?
- In artwork 3, did it feel clear that waiting was the action?
- In artwork 3, did you feel when the image was becoming more present, and when it was withdrawing again because of movement?
- In artwork 3 `Trace`, did you feel that you were following a nearly erased mark, or did it still feel like drawing freely?

## Local Test Summary

The `Test summary` panel stays local to the current browser session. It can show:

- anonymous session ID
- language
- guided mode: yes or no
- current path step
- visited artworks
- completed artworks
- selected artwork
- selected gesture
- whether the selected interaction reached its local completion state
- approximate interaction duration
- number of color regions crossed for the square interaction
- highest stillness value for the slow-looking interaction
- selected word
- before point A when marked
- after point B when marked
- a short A/B attention-shift note when both points are present
- total touches
- duration
- final phrase
- final guided synthesis when available
- short interpretation sentence

Use:

- `Copy test summary` to copy a plain-text note
- `Download JSON` to save the current session record locally

## Data Collected

The prototype stores only local session data in memory for the current browser session:

- anonymous session ID
- language
- guided/free mode
- artwork path information
- selected artwork, gesture, and word
- interaction completion state
- approximate interaction duration
- color-region count for the movable square
- highest stillness reached in slow-looking mode
- optional A/B attention markers when used
- A/B voluntary attention markers when used
- touch count
- duration
- final phrase
- final guided synthesis
- whether the visitor returned to the artwork
- whether the visitor restarted or chose another artwork

## Data Not Collected

The prototype does not collect:

- names
- emails
- IP addresses
- precise location
- cookies
- analytics
- backend records
- cross-session history

Reloading the page clears the in-memory session unless the mediator has copied the summary or downloaded the JSON file.

## Ethical Note

This prototype is designed for lightweight museum testing, not surveillance. The goal is to document how the mediation flow is experienced, not to measure or profile visitors. When testing in public, mediators should explain that the summary is anonymous, local-only, and optional.

## Known Limits

- Session data is not persisted across reloads.
- The guided synthesis is rule-based writing, not a human-authored curatorial note.
- The A/B gaze feature is an optional self-marking tool, not eye tracking.
- The canvas remains only partially accessible for non-visual use.
- The web version still depends on the p5.js CDN.
- Some visitors may still need one spoken sentence to understand Artwork 2 if they expect the square itself to change color.
