# Seuils de distance

## Concept

`Seuils de distance` est un prototype Arduino uniquement. Il ne propose ni ecran ni interaction mobile. Un capteur de distance mesure a quelle distance une personne se tient d'une reproduction imprimee ou d'une projection. Selon cette distance, une lumiere douce suggere trois modes de regard :

- proche : detail / trace
- moyen : champ de couleur / composition
- loin : masse / equilibre

Le dispositif ne corrige pas le visiteur. Il l'invite simplement a essayer plusieurs seuils de distance.

## Intention de mediation

L'enjeu est de faire sentir qu'une peinture abstraite ne se lit pas de la meme maniere selon la distance a laquelle on la regarde. De pres, certaines traces, bords ou nuances deviennent perceptibles. A distance moyenne, les champs colorés et les rapports de composition s'organisent. De plus loin, les masses et les equilibres generaux prennent davantage de place.

Cette experience reste volontairement simple. Elle ne donne pas une bonne reponse. Elle met en scene une variation de perception.

## Materiel

- 1 Arduino Uno ou 1 Arduino Mega
- 1 capteur ultrason HC-SR04
- 3 LEDs distinctes
- 3 resistances de 220 ohms a 330 ohms
- des fils dupont
- une breadboard
- une reproduction imprimee ou une projection d'oeuvre
- optionnel : une petite carte texte invitant a avancer et reculer

## Guide de cablage

### HC-SR04

- `VCC` -> `5V`
- `GND` -> `GND`
- `TRIG` -> `D9`
- `ECHO` -> `D10`

### LEDs

Le sketch est pense pour trois LEDs separees :

- LED 1 `proche / detail / trace`
  - anode -> `D3` via une resistance
  - cathode -> `GND`
- LED 2 `moyen / couleur / composition`
  - anode -> `D5` via une resistance
  - cathode -> `GND`
- LED 3 `loin / masse / equilibre`
  - anode -> `D6` via une resistance
  - cathode -> `GND`

### Remarque

Une LED RGB peut aussi etre utilisee, mais les trois LEDs separees rendent la demonstration plus lisible pendant une presentation HKB. Si une LED RGB est choisie, il faut adapter les sorties PWM au type de LED utilisee.

## Experience visiteur

Le visiteur se place devant une reproduction ou une projection. En s'approchant, en restant a mi-distance puis en reculant, il voit des retroactions lumineuses lentes changer. La lumiere ne dit pas "c'est juste" ou "c'est faux". Elle sert de repere discret pour explorer trois regimes de perception.

L'interet vient du va-et-vient :

- s'approcher pour chercher la trace
- se remettre au milieu pour retrouver l'organisation colorée
- reculer pour sentir la masse et l'equilibre

## Pourquoi c'est different du prototype mobile

Cette piste retire completement l'ecran individuel. Il n'y a ni telephone, ni geste tactile, ni navigation. Le corps entier devient l'interface minimale : avancer, s'arreter, reculer.

Le prototype mobile propose une mediation portee par une surface interactive. `Seuils de distance` propose au contraire une mediation spatiale, situee dans la relation entre le visiteur, la lumiere et l'oeuvre.

## Relation a Barbara Muller

Cette experience est liee a plusieurs questions presentes dans le projet Barbara Muller :

- la distance modifie la lecture d'une peinture abstraite
- certaines traces ou reserves se revelent de pres
- les champs colorés se lisent souvent mieux a distance moyenne
- les masses et les equilibres generaux apparaissent davantage de loin

Le prototype ne cherche pas a illustrer une oeuvre precise de maniere exhaustive. Il isole plutot un principe de regard deja present dans la mediation du projet.

## Mise en place HKB

Pour une demonstration HKB, le montage peut rester tres simple :

1. fixer le capteur sous ou a cote d'une reproduction / projection
2. placer les trois LEDs dans une petite ligne visible, ou dans une petite boite diffuse
3. ajouter une carte texte tres courte, par exemple :
   - approchez
   - arretez-vous au milieu
   - reculez
4. ouvrir le moniteur serie pour montrer la distance mesuree et la zone active

Le plus interessant est de faire essayer le dispositif a une ou deux personnes en direct, puis d'expliquer que l'objectif n'est pas de mesurer correctement un comportement, mais de proposer un exercice de perception.

## Limites

- le HC-SR04 peut etre sensible aux surfaces, aux angles et aux personnes qui passent a cote
- la distance mesuree reste approximative et demande un peu de lissage
- le prototype ne sait pas qui regarde ni ce qui est effectivement percu
- la lumiere reste une suggestion de mediation, pas une preuve d'attention
- en exposition, il faudrait mieux integrer la lumiere et cacher le cablage

## Usage museal futur

Dans un contexte museal, cette piste pourrait evoluer vers :

- une station de mediation sans ecran devant une reproduction
- une petite installation lumineuse devant une projection
- un dispositif de groupe pour faire sentir la difference entre lecture rapprochée et lecture d'ensemble

Elle pourrait aussi etre combinee plus tard a d'autres formes du laboratoire, mais son interet principal tient justement a sa sobriete : elle deplace la mediation du cote de la distance et de la posture du corps.
