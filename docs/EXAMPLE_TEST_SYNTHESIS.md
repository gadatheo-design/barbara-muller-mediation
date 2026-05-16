# Example Test Synthesis

## Statut du document

Cette synthese est un **exemple de travail** fonde sur la documentation actuellement disponible dans le depot. Elle ne pretend pas restituer un corpus complet de sessions homogènes. Elle montre plutot **comment utiliser** le protocole, les templates et les documents existants pour produire une lecture structurée du laboratoire.

Elle s'appuie principalement sur :

- `docs/MOBILE_TESTING.md`
- `docs/laboratoire-hkb/`
- `docs/presentation-hkb/`
- `docs/COMPARATIVE_MATRIX.md`
- `docs/experiments-catalogue/`

## Perimetre

- Format ou formats analyses :
  - prototype mobile principal
  - parcours guide
  - laboratoire public web
  - quelques experiences p5.js publiques
- Periode concernee :
  - etat actuel du depot, relu a partir de la documentation
- Nombre de sessions prises en compte :
  - non normalise ; relecture de plusieurs iterations et protocoles documentes
- Type de contexte :
  - tests publics modestes, lecture documentaire, preparation HKB

## Question de synthese

- Quelle hypothese generale veut-on relire a travers ces tests ?

Hypothese relue :

Le projet devient plus fort lorsqu'il ne cherche pas a tout faire dans une seule application, mais lorsqu'il organise plusieurs formes de mediation qui reconduisent, chacune a leur maniere, vers l'oeuvre.

## Materiau relu

- sessions individuelles :
  - non centralisees dans un meme fichier
- resumes locaux / JSON :
  - decrits dans `docs/MOBILE_TESTING.md` et `docs/laboratoire-hkb/05_MODE_TEST_EXPORT_JSON.md`
- notes mediateur :
  - implicites dans la documentation de test et de presentation
- photos / captures :
  - suggerees dans les dossiers HKB et laboratoire
- retours oraux :
  - anticipes dans les questions de feedback et les protocoles de test

## Ce qui semble fonctionner

- Le prototype mobile principal offre aujourd'hui la forme la plus lisible pour une demonstration publique courte.
- Le parcours guide donne une coherence temporelle plus forte que l'exploration libre et renforce l'idee de retour a l'oeuvre.
- Le mode test local et l'export JSON constituent une base utile pour documenter les essais sans surveillance ni collecte de donnees personnelles.
- Le laboratoire public web rend visible a l'exterieur du depot que le projet depasse le cadre d'une seule app.
- Les experiences p5.js isolees rendent certaines hypotheses de mediation plus claires que lorsqu'elles sont enfouies dans un prototype plus large.

## Ce qui reste fragile

- Le prototype mobile reste tributaire du petit ecran, du rythme du telephone et de la clarte immediate des gestes.
- La difference entre ce qui releve du prototype visiteur et ce qui releve du laboratoire n'est pas toujours lisible sans une petite explication.
- Certaines branches experimentales sont fortes comme argument HKB mais restent peu testees comme experiences publiques.
- Le corpus de test reste qualitatif, fragmentaire et inegal selon les formats.

## Hesitations recurrentes

- hesitation la plus frequente :
  - comprendre rapidement quoi faire au debut de l'interaction, surtout sur mobile
- hesitation liee au support :
  - l'ecran peut retenir l'attention au lieu de la reconduire vers l'oeuvre
- hesitation liee au vocabulaire ou a la consigne :
  - certains termes ou transitions demandent encore une mediation orale pour etre pleinement compris

## Relation a l'oeuvre

- le dispositif reconduit-il vers l'oeuvre :
  - oui, mais de facon inegale selon les formats
- a quel moment cette bascule se produit-elle :
  - surtout a la fin d'une interaction claire, d'un mot choisi ou d'une synthese de parcours
- quels formats ou situations la renforcent :
  - parcours guide, consignes courtes, moments de ralentissement, experiences p5.js focalisees, low-tech et Arduino lorsque la mediation orale est juste
- quels formats ou situations la freinent :
  - ecran trop dominant, geste encore flou, multiplication de couches explicatives, ou demonstration trop technique

## Comparaison des formats

| Format | Force principale | Limite principale | Type d'attention produit | Besoin de mediation orale | Suite recommandee |
|---|---|---|---|---|---|
| Prototype mobile principal | le plus testable et presentable publiquement | reste contraint par le telephone | attention individuelle guidee par le geste | moyen | poursuivre et simplifier |
| Parcours guide | donne une structure claire et un retour plus lisible a l'oeuvre | peut devenir trop directif | attention patiente, ordonnee, comparative | moyen | consolider |
| Exploration libre | acces direct et souple | moins de coherence narrative | attention plus autonome mais plus variable | faible a moyen | garder comme entree secondaire |
| Laboratoire public web | rend visible la pluralite du projet | fonctionne surtout comme vitrine | attention de lecture et de comparaison | faible | garder pour HKB et diffusion |
| Experiences p5.js publiques | isolent bien une hypothese de mediation | restent partielles | attention concentree sur une seule qualite | faible a moyen | conserver, tester, reintegrer partiellement |
| Processing local | riche pour l'atelier et la projection | moins diffusable | attention a l'ambiance et aux comportements visuels | moyen a fort | garder comme reference et projection |
| Arduino / low-tech | retire l'ecran et deplace la mediation vers le corps et la matiere | encore tres exploratoire | attention spatiale, tactile, collective | moyen | garder comme laboratoire et demonstration HKB |

## Ce que nous avons appris

- apprentissage general sur la mediation :
  - le projet gagne en force quand il assume plusieurs portes d'entree plutot qu'un seul outil supposé tout resoudre
- apprentissage sur le support :
  - le web mobile est utile pour tester et diffuser, mais il ne suffit pas a lui seul a exprimer toute la recherche
- apprentissage sur le rythme :
  - les formes qui ralentissent, clarifient et limitent le nombre d'actions semblent les plus justes
- apprentissage sur la place du mediateur :
  - la mediation humaine reste structurante, surtout pour introduire, relancer et reancrer l'experience dans l'oeuvre

## Ce qui ne doit pas etre surinterprete

- limite du nombre de tests :
  - le depot ne contient pas encore un grand corpus de sessions homogenes
- limite du contexte :
  - plusieurs observations viennent de demonstrations, de preparation HKB et de tests internes
- limite du prototype :
  - certaines branches sont des sketches exploratoires, pas des outils stabilises
- limite de l'observation :
  - une partie des conclusions repose sur une relecture documentaire, pas seulement sur des logs bruts de terrain

## Decisions

### A garder

- prototype mobile principal
  - parce qu'il reste la forme la plus directement montrable et testable
- parcours guide
  - parce qu'il porte le mieux la logique de mediation
- laboratoire public web
  - parce qu'il rend l'argument du laboratoire visible pour HKB
- mode test local
  - parce qu'il soutient une documentation legere mais utile

### A simplifier

- certains passages du prototype mobile
  - parce que la clarte immediate reste cruciale sur petit ecran
- la frontiere entre prototype visiteur et branches experimentales
  - parce qu'elle peut etre mieux formulee dans les demonstrations et les docs

### A deplacer vers le laboratoire seulement

- plusieurs sketches Processing
  - parce qu'ils sont tres utiles comme recherche visuelle mais pas necessairement comme experience publique deployable
- certaines pistes p5.js analytiques
  - parce qu'elles servent mieux la demonstration et la comparaison que l'experience visiteur principale

### A suspendre ou abandonner

- l'idee d'une application toujours plus complete
  - parce que le projet est plus convaincant comme laboratoire compare que comme produit unique cherchant a tout absorber

## Prochaine iteration recommandee

- prochain test a mener :
  - comparer une session guidee, une session libre et une experience p5.js courte avec la meme question de sortie
- modification minimale a essayer :
  - reduire encore les points de confusion sur l'entree dans l'interaction mobile
- documentation a produire :
  - une ou deux vraies fiches de session remplies avec `TEST_SESSION_TEMPLATE.md`

## Formulation courte possible pour HKB

Ce qui a ete teste :
plusieurs formes de mediation, du prototype mobile aux sketches publics et aux pistes sans ecran.

Ce qui semble solide :
le prototype mobile, surtout en parcours guide, et la capacite du projet a se presenter comme laboratoire documente.

Ce qui reste ouvert :
la comparaison plus systematique entre formats, et la place exacte de certaines pistes experimentales.

Ce qui sera poursuivi ou non :
la simplification du prototype visiteur et la consolidation de quelques branches fortes plutot qu'une extension generale de toutes les fonctions.
