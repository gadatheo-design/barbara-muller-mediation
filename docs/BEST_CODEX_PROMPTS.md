# Best GPT-5.5 Prompts — Barbara Müller Mediation Laboratory

Ce document met a jour les prompts du depot pour un usage plus adapte au projet actuel. Le depot n'est plus seulement un sketch Processing : c'est un laboratoire de mediation compose de plusieurs formats, publics ou locaux, web ou physiques, documentaires ou experimentaux.

GPT-5.5 est surtout utile ici pour :

- faire du tri dans un depot devenu plus riche
- comparer plusieurs pistes sans les confondre
- transformer les traces et documents en matiere de recherche
- preparer une soutenance HKB plus claire et plus argumentee

## 0. Principe general

Utiliser GPT-5.5 non pas pour ajouter de la complexite partout, mais pour :

- clarifier la carte du projet
- consolider quelques formats forts
- documenter les decisions
- distinguer ce qui est prototype public, laboratoire local, projection, Arduino, low-tech et HKB

## 1. Prompt de demarrage — version courte

```text
You are working on the Barbara Müller mediation laboratory repository.

Before changing anything:
1. Read README.md, docs/MASTER_MAP.md, docs/BEST_CODEX_PROMPTS.md.
2. Identify the main project surfaces: public web prototype, public laboratory web section, Processing, p5 experiments, Arduino, low-tech, HKB documentation.
3. Summarize what each surface is for.
4. Propose the safest next improvement for the user’s stated goal.

Do not edit files yet.
```

## 2. Prompt de demarrage — version moyenne

```text
You are working on a mediation laboratory repository around Barbara Müller’s abstract paintings.

Before changing code or docs:
1. Read README.md, docs/MASTER_MAP.md, docs/laboratoire-hkb/README.md, docs/presentation-hkb/00_PRESENTATION_PLAN.md, and docs/experiments-catalogue/README.md.
2. Distinguish clearly between:
   - the main public mobile prototype
   - the public laboratory section
   - local Processing work
   - p5.js experiments
   - Arduino experiments
   - low-tech mediation
   - HKB presentation material
3. Summarize current strengths, current fragmentation, and the most useful next action.
4. Provide a short plan.

Do not edit files yet.
```

## 3. Prompt de demarrage — version approfondie

```text
Read the repository as a mediation laboratory, not as a single unfinished app.

Before editing:
1. Read README.md, docs/MASTER_MAP.md, docs/BEST_CODEX_PROMPTS.md, docs/laboratoire-hkb/, docs/presentation-hkb/, docs/experiments-catalogue/, docs/MOBILE_TESTING.md, and inspect the current web/ structure.
2. Build a map of the project:
   - what is public
   - what is local
   - what supports HKB
   - what is exploratory
   - what could still be integrated later
3. Return:
   - one concise repository summary
   - one table of project surfaces
   - three strongest mediation ideas in the repo
   - three main risks or incoherences
   - the safest next step for the current request

Do not edit files yet.
```

## 4. Audit du laboratoire

```text
Audit this repository as a mediation laboratory rather than as a single application.

Look for:
- duplicated concepts across web, docs, experiments, and Arduino
- unclear boundaries between public prototype and experimental sketches
- documentation gaps
- places where HKB presentation material and implementation diverge
- good candidates for consolidation

Return:
1. structural issues
2. documentation issues
3. safe high-impact improvements
4. things that should remain separate on purpose

Do not edit files yet.
```

## 5. Comparaison de prototypes

```text
Compare the mediation formats currently present in this repository:
- main mobile web prototype
- public web laboratory experiments
- Processing experiments
- Arduino experiments
- low-tech mediation

Return a comparison table with:
- support
- intended public
- main mediation strength
- current limitation
- public-facing vs laboratory-facing
- integration potential into the main prototype

Be specific and do not overclaim maturity.
```

## 6. Synthese de tests

```text
Use the repository documentation as material for a qualitative testing synthesis.

Read:
- docs/MOBILE_TESTING.md
- docs/laboratoire-hkb/
- docs/presentation-hkb/
- any test-related notes or summaries already present

Return:
1. what the project seems to have learned so far
2. what remains uncertain
3. what should be tested next
4. what should be simplified before more testing

Write in French. Keep an academic but accessible tone.
```

## 7. Preparation HKB

```text
Prepare this repository for an HKB final presentation.

Work as if the goal were to show:
- one public prototype
- several experimental branches
- one clear laboratory argument
- explicit limits
- plausible futures

Return:
1. the strongest presentation narrative
2. what to show live
3. what to show only as screenshots or local demos
4. what to leave out to avoid overload
5. the most useful files to update next

Do not edit files yet unless asked.
```

## 8. Decision prompt — garder / adapter / abandonner

```text
Review the current experimental branches of the Barbara Müller mediation laboratory.

Classify each branch into:
- keep as active public-facing prototype
- keep as laboratory experiment
- adapt into a simpler form
- archive or leave dormant for now

Explain each decision briefly with mediation reasoning, not just technical reasoning.
```

## 9. Prompt pour nouvelle experimentation

```text
Create one new experiment for the Barbara Müller mediation laboratory.

Before implementing:
1. Identify what mediation question this new experiment tests.
2. Explain how it differs from the main mobile prototype.
3. Explain whether it belongs to public web, local Processing, Arduino, or low-tech.
4. Keep the implementation modest and exploratory.

Do not design it as a finished museum product.
```

## 10. Prompt pour documentation de recherche

```text
Create or improve documentation for this repository as a research-practice laboratory.

Priorities:
- clarity of project surfaces
- explicit status of each prototype
- what has been learned
- what remains limited or speculative
- how the work supports HKB

Write in French.
Tone: reflective, practical, academically accessible.
Do not use marketing language.
```

## 11. Prompt pour refactor web prudent

```text
Improve the public web prototype carefully.

Before editing:
1. Distinguish between the main visitor prototype in web/index.html and the laboratory pages in web/laboratoire/.
2. Preserve the main visitor flow.
3. Avoid cluttering the public prototype with too many experimental links or concepts.

Then propose the smallest safe improvement for the user’s goal.
```

## 12. Prompt pour Arduino

```text
Treat Arduino experiments as mediation prototypes without screens.

Before implementing or modifying:
1. Explain the mediation principle being tested.
2. Explain why the interaction should remain physically simple.
3. Prefer robust wiring, clear comments, and no external libraries.
4. Keep Serial output useful for HKB demos.

Do not imitate the mobile prototype literally.
```

## 13. Prompt pour revue apres modification

```text
Review the last changes in this repository.

Check:
- whether the change stays coherent with the mediation laboratory argument
- whether public vs local boundaries remain clear
- whether documentation still matches implementation
- whether the user-facing prototype has stayed readable
- whether experimental branches are still properly framed as exploratory

Return a concise verification report.
```

## 14. Prompt une seule amelioration

```text
Make only one improvement:
PASTE_IMPROVEMENT_HERE

Before editing, explain:
- which project surface this affects
- whether it is public, local, HKB-facing, or experimental
- what you will not touch

After editing, explain files changed and how to test.
```

## 15. Prompts recommandes GPT-5.5

### A. Court

```text
Read README.md and docs/MASTER_MAP.md.
Summarize the project as a mediation laboratory and propose the safest next improvement for this goal:
PASTE_GOAL_HERE
Do not edit files yet.
```

### B. Moyen

```text
Treat this repository as a mediation laboratory with public, local, and HKB-facing parts.
Read README.md, docs/MASTER_MAP.md, docs/laboratoire-hkb/README.md, and the most relevant implementation files.
Then:
1. summarize the relevant surfaces
2. identify the main mediation question behind this request
3. propose a small implementation plan
4. state risks and boundaries before editing
```

### C. Approfondi

```text
Read this repository as a distributed mediation laboratory rather than a single product.

Goal:
PASTE_GOAL_HERE

Before editing:
1. map the relevant public, local, and HKB-facing files
2. identify what is already solved and what is still exploratory
3. list the smallest coherent intervention that advances the goal
4. explain what should remain untouched

Then implement only that coherent intervention.
Afterward, provide:
- files changed
- why this helps the laboratory argument
- how to test or present it
```

## 16. Rappel d'intention

Le projet Barbara Müller ne doit pas etre traite comme une encyclopedie explicative ni comme une simple app a completer. C'est un laboratoire de mediation autour du regard, de la distance, de la trace, du vocabulaire, du rythme et du retour a l'oeuvre.

Les meilleurs prompts sont donc ceux qui :

- respectent cette pluralite de formats
- evitent la surproduction de fonctionnalites
- aident a choisir
- renforcent la coherence documentaire
- rendent le projet plus lisible pour HKB
