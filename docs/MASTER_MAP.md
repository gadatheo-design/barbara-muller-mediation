# Carte maitresse du projet

## But du document

Ce document sert de carte maitresse du projet Barbara Muller. Le depot ne contient plus seulement un prototype unique, mais plusieurs surfaces de travail :

- une experience publique mobile web
- un laboratoire public visible sur GitHub Pages
- des experimentations p5.js et Processing
- des pistes Arduino et low-tech
- une documentation de presentation HKB

L'objectif est d'aider a repondre rapidement a quatre questions :

1. qu'est-ce qui est public
2. qu'est-ce qui est local
3. qu'est-ce qui sert surtout a HKB
4. qu'est-ce qui reste experimental

## Vue d'ensemble

| Zone | Chemin principal | Statut | Usage principal | Public |
|---|---|---|---|---|
| Prototype mobile principal | `web/index.html` | actif | mediation visiteur sur smartphone | public |
| Laboratoire public web | `web/laboratoire/` | actif | montrer le projet comme laboratoire sur GitHub Pages | public / HKB |
| Experiments p5.js publics | `web/laboratoire/experiments/` | actif | sketches web autonomes et comparables | public / HKB |
| Prototype Processing historique | `processing/BarbaraMullerMediation/` | actif mais local | prototype d'exposition et base historique du projet | local |
| Experiments Processing | `experiments/processing/` | exploratoire | projection, comportement visuel, installation | local / HKB |
| Experiments p5.js de travail | `experiments/p5/` | exploratoire | source experimentale hors surface publique principale | local |
| Arduino | `arduino-experiments/` | exploratoire | mediation sans ecran, tactilite, distance, vocabulaire materiel | local / HKB |
| Documentation laboratoire | `docs/laboratoire-hkb/` | actif | formuler le projet comme laboratoire de mediation | HKB |
| Documentation presentation | `docs/presentation-hkb/` | actif | plan oral, slides, demo, argumentaire | HKB |
| Grille rapide de comparaison HKB | `docs/presentation-hkb/06_GRILLE_COMPARAISON_HKB.md` | actif | comparer sur une page mobile, p5, low-tech et Arduino | HKB |
| Grille HKB pre-remplie | `docs/presentation-hkb/07_GRILLE_COMPARAISON_HKB_AIDE_MEMOIRE.md` | actif | garder un repere oral prudent deja formule pour la soutenance | HKB |
| Catalogue d'experiences | `docs/experiments-catalogue/` | actif | expliquer les differentes familles de sketches | HKB / travail interne |
| Matrice comparative | `docs/COMPARATIVE_MATRIX.md` | actif | comparer les grandes familles du laboratoire | travail interne / HKB |
| Protocoles de test | `docs/TEST_PROTOCOL.md` et templates associes | actif | structurer les essais et les syntheses | travail interne / HKB |
| Fiche de session reelle prete a l'emploi | `docs/REAL_TEST_SESSION_01_GUIDED_MOBILE.md` | actif | documenter un vrai test du prototype mobile guide | travail interne / HKB |
| Fiche de session reelle courte | `docs/REAL_TEST_SESSION_01_GUIDED_MOBILE_COURTE.md` | actif | documenter un vrai test en contexte HKB tres rapide | travail interne / HKB |
| Fiche de session reelle courte low-tech | `docs/REAL_TEST_SESSION_02_LOWTECH_CALQUES_COURTE.md` | actif | documenter un vrai test rapide des calques transparents | travail interne / HKB |
| Fiche de session reelle courte Arduino | `docs/REAL_TEST_SESSION_03_ARDUINO_TABLE_DE_MATIERES_COURTE.md` | actif | documenter un vrai test rapide du prototype tactile Arduino | travail interne / HKB |
| Fiche de session reelle courte p5 | `docs/REAL_TEST_SESSION_04_P5_FIXED_COLOUR_COURTE.md` | actif | documenter un vrai test rapide d'un sketch web de laboratoire | travail interne / HKB |
| Fiches de session d'exemple | `docs/EXAMPLE_TEST_SESSION_*.md` | actif | montrer comment documenter un essai unique sur mobile, p5, Arduino ou low-tech | travail interne / HKB |
| Synthese d'exemple | `docs/EXAMPLE_TEST_SYNTHESIS.md` | actif | montrer comment relire concretement les essais | travail interne / HKB |
| Low-tech | `docs/lowtech/` | actif | alternatives sans ecran | mediation / HKB |

## Ce qui est public aujourd'hui

### 1. Prototype mobile principal

- chemin : `web/index.html`
- role : version la plus directement testable en situation de visite
- logique : regarder, toucher, nommer, revenir a l'oeuvre
- prudence : ne pas l'alourdir inutilement si le but est une experience visiteur claire

### 2. Laboratoire public

- chemin : `web/laboratoire/`
- role : rendre visible que le projet depasse le cadre d'une seule app mobile
- logique : donner acces a des experiences web courtes et expliquer les pistes locales
- usage : ideal pour une presentation HKB, un QR code, ou une lecture externe rapide du projet

## Ce qui reste local

### 1. Prototype Processing

- chemin : `processing/BarbaraMullerMediation/`
- role : base historique et prototype d'exposition
- raison de rester local : depend de Processing et d'un contexte plus controle

### 2. Experiments Processing

- chemin : `experiments/processing/`
- role : tester respiration, effacement, densite, geste, projection collective
- raison de rester local : ces sketches ne sont pas penses pour le navigateur et relèvent davantage du laboratoire et de l'installation

### 3. Arduino

- chemin : `arduino-experiments/`
- role : ouvrir des pistes sans ecran
- raison de rester local : montage physique, capteurs, materiaux, lumiere, demonstration situee

## Ce qui sert surtout a HKB

### Documents les plus utiles pour la soutenance

- `docs/laboratoire-hkb/README.md`
- `docs/presentation-hkb/00_PRESENTATION_PLAN.md`
- `docs/presentation-hkb/01_SLIDE_OUTLINE.md`
- `docs/presentation-hkb/02_DEMO_SCRIPT.md`
- `docs/presentation-hkb/03_ARGUMENTAIRE.md`
- `docs/presentation-hkb/06_GRILLE_COMPARAISON_HKB.md`
- `docs/presentation-hkb/07_GRILLE_COMPARAISON_HKB_AIDE_MEMOIRE.md`
- `docs/experiments-catalogue/README.md`

### Parcours HKB recommande

1. montrer `web/index.html` comme prototype public principal
2. ouvrir `web/laboratoire/`
3. montrer 2 ou 3 experiences p5.js
4. completer par des captures ou demonstrations locales Processing / Arduino
5. conclure avec `docs/laboratoire-hkb/` et `docs/presentation-hkb/`

## Ce qui est experimental

Le projet comporte plusieurs niveaux d'experimentation. Il est utile de les distinguer.

### Experimental mais public-facing

- `web/laboratoire/experiments/`
- role : sketches courts, montrables, comparables

### Experimental et laboratoire-facing

- `experiments/processing/`
- `arduino-experiments/`
- role : essayer des principes de mediation, de projection, de tactilite ou de distance

### Experimental et conceptuel / documentaire

- certaines pistes de `docs/laboratoire-hkb/`
- role : garder des directions futures sans les presenter comme des outils finalises

## Comment lire le depot selon le besoin

### Si l'on veut voir le projet en 5 minutes

1. `README.md`
2. `web/index.html`
3. `web/laboratoire/index.html`
4. `docs/laboratoire-hkb/README.md`

### Si l'on veut preparer HKB

1. `docs/presentation-hkb/00_PRESENTATION_PLAN.md`
2. `docs/presentation-hkb/01_SLIDE_OUTLINE.md`
3. `docs/presentation-hkb/02_DEMO_SCRIPT.md`
4. `docs/presentation-hkb/03_ARGUMENTAIRE.md`
5. `docs/presentation-hkb/06_GRILLE_COMPARAISON_HKB.md`
6. `docs/presentation-hkb/07_GRILLE_COMPARAISON_HKB_AIDE_MEMOIRE.md`
7. `docs/experiments-catalogue/README.md`

### Si l'on veut documenter des tests

1. `docs/TEST_PROTOCOL.md`
2. `docs/TEST_SESSION_TEMPLATE.md`
3. `docs/REAL_TEST_SESSION_01_GUIDED_MOBILE.md`
4. `docs/REAL_TEST_SESSION_01_GUIDED_MOBILE_COURTE.md`
5. `docs/REAL_TEST_SESSION_02_LOWTECH_CALQUES_COURTE.md`
6. `docs/REAL_TEST_SESSION_03_ARDUINO_TABLE_DE_MATIERES_COURTE.md`
7. `docs/REAL_TEST_SESSION_04_P5_FIXED_COLOUR_COURTE.md`
8. `docs/TEST_SYNTHESIS_TEMPLATE.md`
9. `docs/EXAMPLE_TEST_SESSION_01_GUIDED_MOBILE.md`
10. `docs/EXAMPLE_TEST_SESSION_02_P5_FIXED_COLOUR.md`
11. `docs/EXAMPLE_TEST_SESSION_03_ARDUINO_TABLE_DE_MATIERES.md`
12. `docs/EXAMPLE_TEST_SESSION_04_LOWTECH_CALQUES.md`
13. `docs/EXAMPLE_TEST_SYNTHESIS.md`
14. `docs/MOBILE_TESTING.md`

### Si l'on veut comparer les formats de mediation

1. `docs/laboratoire-hkb/01_CARTE_DES_PROTOTYPES.md`
2. `docs/experiments-catalogue/COMPARISON_TABLE.md`
3. `docs/COMPARATIVE_MATRIX.md`
4. `docs/lowtech/`
5. `arduino-experiments/`

### Si l'on veut poursuivre le prototype web

1. `README.md`
2. `docs/MOBILE_TESTING.md`
3. `web/index.html`
4. `web/sketch.js`
5. `web/laboratoire/` seulement comme reference, pas comme contrainte directe

## Frontieres utiles

### Ce qui ne doit pas etre confondu

- `web/index.html` n'est pas le laboratoire complet : c'est le prototype visiteur principal.
- `web/laboratoire/` n'est pas une seconde application complete : c'est une vitrine de sketches et de pistes.
- `experiments/processing/` n'est pas une version deployable : c'est un terrain d'essai local.
- `arduino-experiments/` n'est pas un gadget annexe : c'est une autre famille de mediation sans ecran.

### Ce qui peut nourrir autre chose

- certaines experiences p5.js peuvent migrer vers le prototype principal
- certaines pistes Processing peuvent devenir des projections ou des principes d'interaction
- certaines pistes Arduino ou low-tech peuvent enrichir la soutenance et l'argument du laboratoire, meme sans integration logicielle

## Questions strategiques actuelles

Le depot est maintenant assez riche pour que les prochaines decisions portent moins sur "que construire en plus" que sur "que consolider". Les questions les plus utiles semblent etre :

- quelles pistes doivent rester autonomes
- quelles pistes peuvent etre reintegrees dans le prototype principal
- quels formats servent surtout la soutenance HKB
- quels formats meritent une suite apres le cours

## Usage avec GPT-5.5

Ce document est un bon point d'entree pour demander a un modele de :

- resumer le laboratoire
- comparer les familles de prototypes
- proposer une priorisation
- identifier les redondances ou les trous documentaires

Il doit etre lu avec `README.md` et `docs/BEST_CODEX_PROMPTS.md`.
