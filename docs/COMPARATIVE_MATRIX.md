# Comparative Matrix

## Rôle du document

Cette matrice sert a comparer les grandes familles du laboratoire Barbara Muller. Elle n'a pas pour but de designer un "meilleur" format absolu. Elle aide plutot a distinguer :

- ce qui sert deja de prototype public
- ce qui fonctionne surtout comme laboratoire
- ce qui soutient particulierement bien la presentation HKB
- ce qui pourrait etre reintegre plus tard
- ce qui devrait sans doute rester autonome

Elle doit etre lue avec :

- `docs/MASTER_MAP.md`
- `docs/laboratoire-hkb/01_CARTE_DES_PROTOTYPES.md`
- `docs/experiments-catalogue/COMPARISON_TABLE.md`
- `docs/TEST_PROTOCOL.md`

## Echelles de lecture

Les niveaux ci-dessous restent qualitatifs.

- maturite :
  - forte
  - moyenne
  - exploratoire
- besoin de mediation orale :
  - faible
  - moyen
  - fort
- potentiel d'integration :
  - direct
  - partiel
  - faible

## Matrice

| Format | Support | Public vise | Type de mediation | Force principale | Limite principale | Maturite actuelle | Besoin de mediation orale | Place dans HKB | Potentiel d'integration future |
|---|---|---|---|---|---|---|---|---|---|
| Prototype mobile principal | smartphone web | visiteur individuel | parcours visuel et tactile | version la plus lisible et la plus testable publiquement | reste contraint par l'ecran et la lisibilite mobile | forte | moyen | centrale | direct |
| Parcours guide | smartphone web | visiteur individuel accompagne ou semi-autonome | structuration temporelle de l'attention | rend le retour a l'oeuvre plus explicite | peut devenir trop directif si trop charge | moyenne a forte | moyen | tres forte | direct |
| Exploration libre | smartphone web | visiteur individuel | entree plus immediate et autonome | acces simple et rapide | moins de coherence narrative | forte | faible a moyen | utile mais secondaire | direct |
| Mode test / resume local / JSON | documentation web locale | mediateur, chercheur, soutenance | trace qualitative et structuree des essais | documenter sans surveillance ni backend | ne produit pas une analyse scientifique forte | moyenne | moyen | forte | direct |
| Laboratoire public web | pages web GitHub Pages | jury, enseignants, visiteurs curieux | mise en visibilite du projet comme laboratoire | rend la pluralite des pistes lisible en ligne | reste une vitrine, pas une experience unifiee | moyenne | faible | tres forte | partiel |
| Experiments p5.js publics | web interactif court | public HKB, testeurs, visiteurs | tests focalises sur une question de perception | permet d'isoler clairement une hypothese de mediation | chaque sketch reste partiel | moyenne | faible a moyen | tres forte | partiel a direct selon le cas |
| Prototype Processing historique | sketch local | presentation locale, travail interne | base d'exposition et d'experimentation initiale | profondeur historique et richesse de fonctions | moins diffusable et plus local | moyenne | fort | forte comme reference | partiel |
| Experiments Processing | sketch local / projection | travail interne, HKB, installation | ambiance, projection, comportement visuel | explore des qualites difficiles a montrer sur mobile | non deployable publiquement | exploratoire | moyen a fort | forte | partiel comme principe, faible comme forme |
| Arduino distance | montage physique | HKB, mediation situee | perception par distance et posture du corps | retire l'ecran et deplace la mediation dans l'espace | demonstration dependante du montage | exploratoire | moyen | forte | faible a partiel |
| Arduino matieres | montage physique tactile | HKB, atelier, mediation accompagnee | vocabulaire materiel du regard | cree une entree non ecran, simple et collective | reste interpretatif et artisanal | exploratoire | moyen | forte | faible a partiel |
| Low-tech | papier, cartes, oralite | groupes, ateliers, mediation accompagnee | langage, couleur, regard, parole | tres leger, adaptable, peu dependants de la technique | moins autonome, plus dependants du mediateur | moyenne | fort | tres forte | partiel comme logique, pas comme interface |
| Projection / installation | projection, espace | groupe, public HKB, exposition | attention collective et restitution visible | ouvre le projet a une dimension publique et spatiale | risque de survisualiser les traces | exploratoire | moyen | tres forte | partiel |
| Version tablette / kiosque | tablette dediee | petits groupes, mediateur, salle | mediation accompagnee plus stable que smartphone personnel | meilleure lisibilite et meilleur controle technique | reste un ecran et demande un appareil dedie | piste credible | moyen | forte | direct |

## Lecture strategique

### Ce qui semble le plus solide aujourd'hui

- le prototype mobile principal
- le parcours guide
- le mode test local
- la documentation HKB et le laboratoire public web

Ces elements donnent au projet une forme deja presentable et argumentable.

### Ce qui semble le plus utile pour montrer le laboratoire

- les experiences p5.js publiques
- les experiences Processing
- les deux pistes Arduino
- les formats low-tech

Ces branches montrent que le projet n'est pas une simple application a terminer, mais une comparaison de formes de mediation.

### Ce qui semble le plus facile a reintegrer

- certaines interactions p5.js vers le prototype principal
- certaines logiques du parcours guide
- certaines structures de documentation de test
- une adaptation tablette du prototype web

### Ce qui semble surtout devoir rester autonome

- les projections
- plusieurs sketches Processing
- les pistes Arduino
- certaines formes low-tech

Leur valeur vient souvent justement de leur difference avec le prototype mobile.

## Questions de decision

Cette matrice peut servir a repondre a quatre questions simples.

### 1. Que montrer en premier a HKB ?

- prototype mobile principal
- parcours guide
- laboratoire public web

### 2. Que montrer ensuite pour ouvrir le laboratoire ?

- 2 ou 3 experiences p5.js
- 1 ou 2 captures ou demos locales Processing
- 1 piste Arduino ou low-tech si le temps le permet

### 3. Que poursuivre apres le cours si l'on cherche la continuite la plus simple ?

- prototype mobile principal
- simplification visiteur
- integration de quelques experiences p5.js
- version tablette ou kiosque

### 4. Que poursuivre apres le cours si l'on cherche l'extension la plus experimentale ?

- projection collective
- Processing local
- Arduino
- formats hybrides sans ecran

## Utilisation avec les tests

Apres plusieurs sessions, cette matrice peut etre mise a jour en s'appuyant sur :

- `docs/TEST_SESSION_TEMPLATE.md`
- `docs/TEST_SYNTHESIS_TEMPLATE.md`

Elle devient alors non seulement une carte de l'existant, mais aussi un outil de priorisation.

## Formulation courte pour HKB

Si la matrice doit etre expliquee oralement :

"Tous les formats du projet n'ont pas la meme fonction. Certains servent deja de prototype public, d'autres servent a tester une hypothese de mediation, d'autres encore a ouvrir vers la projection, le tactile ou le low-tech. La force du laboratoire vient de cette comparaison organisee, pas d'une seule solution unique."
