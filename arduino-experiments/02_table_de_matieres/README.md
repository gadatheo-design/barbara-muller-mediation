# Table de matieres

## Concept

`Table de matieres` est un prototype Arduino uniquement, sans ecran. Le visiteur touche des materiaux physiques qui correspondent a des qualites picturales. Chaque toucher active une petite reponse lumineuse discrete.

Le dispositif ne cherche pas a imiter le prototype mobile. Il construit plutot un vocabulaire materiel pour regarder.

## Intention de mediation

L'objectif est de faire sentir qu'une peinture abstraite peut etre approchee non seulement par l'image ou le texte, mais aussi par des analogies tactiles simples :

- un voile
- une trace
- une masse
- une reserve
- une douceur ou un effacement

Le prototype sert donc a preparer le regard autrement, par contact, comparaison et association.

## Materiel

- 1 Arduino Uno ou 1 Arduino Mega
- 5 boutons poussoirs
- 5 LEDs
- 5 resistances de 220 a 330 ohms pour les LEDs
- fils dupont
- breadboard
- base en carton plume, carton epais ou carton de recuperation
- echantillons de materiaux :
  - papier calque
  - papier rugueux
  - carton sombre
  - carte blanche
  - tissu doux

Option possible :

- remplacer les boutons par 5 pastilles tactiles simples en aluminium ou feuille metallisee reliees comme entrees digitales

## Guide de cablage

### Boutons

Le sketch est prevu par defaut pour `INPUT_PULLUP`.

Pour chaque bouton :

- une borne du bouton -> pin d'entree Arduino
- autre borne du bouton -> `GND`

Pins proposes :

- bouton 1 `papier calque` -> `D2`
- bouton 2 `papier rugueux` -> `D4`
- bouton 3 `carton sombre` -> `D7`
- bouton 4 `carte blanche` -> `D8`
- bouton 5 `tissu doux` -> `D12`

Comme `INPUT_PULLUP` est active :

- bouton relache = `HIGH`
- bouton appuye = `LOW`

### Remplacement par feuilles / pastilles tactiles

Si l'on veut un effet plus "tactile" et moins mecanique, on peut remplacer chaque bouton par une petite surface conductrice reliee a une pin d'entree, avec une autre surface commune reliee a `GND`. Le doigt ferme alors le contact. Cette solution est plus simple que du vrai capacitif et reste compatible avec le sketch sans bibliotheque externe.

### LEDs

Pour chaque LED :

- anode -> pin PWM via une resistance de 220 a 330 ohms
- cathode -> `GND`

Pins proposes :

- LED 1 `voile` -> `D3`
- LED 2 `trace` -> `D5`
- LED 3 `masse` -> `D6`
- LED 4 `reserve` -> `D9`
- LED 5 `effacement / douceur` -> `D10`

## Mise en place physique

Le prototype peut etre construit comme une petite table ou une plaque en carton :

1. preparer une base rectangulaire en carton epais
2. repartir cinq zones tactiles de gauche a droite ou en cercle
3. coller chaque echantillon de matiere au-dessus ou autour de son bouton
4. placer une LED a cote de chaque materiau
5. ajouter une courte etiquette sous chaque zone si besoin

Exemple d'organisation :

- papier calque
- papier rugueux
- carton sombre
- carte blanche
- tissu doux

Le plus simple est de cacher le cablage sous la plaque en carton et de laisser seulement les materiaux et les LEDs visibles.

## Experience visiteur

Le visiteur touche un materiau, observe la petite reponse lumineuse, puis peut passer a un autre. L'enjeu n'est pas d'identifier un bon terme, mais de mettre en relation une sensation tactile et une qualite de regard.

Le dispositif peut etre utilise avant de regarder l'oeuvre, pendant une discussion de mediation, ou juste apres, comme outil de reformulation sensible.

## Correspondance materiau / qualite

- papier calque -> voile
- papier rugueux -> trace
- carton sombre -> masse
- carte blanche -> reserve
- tissu doux -> effacement / douceur

Cette cartographie n'est pas definitive. Elle propose un vocabulaire physique simple a discuter et a deplacer.

## Relation aux peintures de Barbara Muller

Cette experience dialogue avec plusieurs dimensions presentes dans la lecture des peintures abstraites :

- les voiles ou couches fines
- les traces ou marques plus rugueuses
- les masses sombres ou denses
- les reserves et blancs actifs
- des zones plus douces, effacees ou silencieuses

Le prototype ne pretend pas traduire directement une peinture en objet tactile. Il propose plutot une table d'appui pour parler des qualites perceptives.

## Pourquoi c'est different du prototype mobile

Le prototype mobile organise un parcours visuel sur ecran. `Table de matieres` retire completement cette interface. Ici, la mediation passe par la main, la surface, la resistance du materiau et une petite lumiere de confirmation.

Ce n'est donc pas une autre version du meme outil. C'est une autre entree dans le laboratoire : plus physique, plus pauvre techniquement, mais aussi plus directe et plus collective.

## Scenario de demonstration HKB

Une demonstration HKB peut etre tres simple :

1. poser la table sur une petite surface
2. inviter une personne a toucher deux ou trois materiaux
3. montrer la reponse lumineuse douce
4. ouvrir le moniteur serie pour faire apparaitre `materiau` et `qualite`
5. expliquer que le prototype cherche a fabriquer un vocabulaire materiel pour regarder

Cette demonstration fonctionne bien en parallele du prototype mobile, parce qu'elle montre un autre type de mediation, sans ecran personnel.

## Limites

- les boutons restent plus mecaniques que vraiment tactiles
- l'association entre matiere et qualite picturale reste interpretative
- la lumiere n'exprime qu'un signal minimal
- le dispositif ne dit rien a lui seul sans un minimum de contexte ou de mediation orale
- pour un usage public durable, il faudrait une fabrication plus robuste

## Usage museal futur possible

Cette piste pourrait evoluer vers :

- une petite table de mediation tactile avant l'entree en salle
- un module d'atelier avec enfants ou groupes
- une station d'accompagnement pour publics preferant une approche plus materielle
- une installation hybride ou la table tactile dialogue avec une projection ou une reproduction

Son interet principal est de montrer qu'une mediation autour de Barbara Muller peut aussi passer par des gestes simples, des matieres et une pedagogie du toucher, sans ecran individuel.
