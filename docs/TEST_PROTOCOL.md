# Protocole de test

## Rôle du document

Ce protocole propose une maniere simple et cohérente de documenter les tests du projet Barbara Muller. Il ne transforme pas le laboratoire en étude scientifique lourde. Il sert plutot a :

- comparer des essais entre eux
- garder une memoire structurée des observations
- distinguer ce qui fonctionne, ce qui reste flou, et ce qui doit etre simplifie
- renforcer la lecture du projet comme laboratoire de mediation

## Ce que ce protocole n'est pas

Ce protocole n'est pas :

- un dispositif de surveillance
- une mesure scientifique du regard
- un questionnaire standardise complet
- une evaluation quantitative forte

Il doit rester proportionné au projet, a son echelle et a ses moyens.

## Formats pouvant etre testes

Le protocole peut etre utilise pour plusieurs surfaces du laboratoire :

- prototype mobile principal dans `web/`
- experiences web du laboratoire public
- essais Processing en contexte local
- prototypes Arduino
- formats low-tech

Tous les formats n'impliquent pas les memes observations. Le protocole donne une base commune, puis laisse une marge d'adaptation selon le support.

## Question generale

La question commune a tous les tests peut etre formulee ainsi :

Comment ce format de mediation modifie-t-il l'attention du visiteur face a l'oeuvre, sans remplacer cette rencontre par le dispositif lui-meme ?

## Structure minimale d'un test

Chaque test devrait documenter au minimum :

1. le format teste
2. le contexte
3. le profil general du visiteur ou du groupe
4. ce qui a ete compris ou non
5. les hesitations principales
6. le rapport entre dispositif et retour a l'oeuvre
7. une decision de suite

## Avant le test

Avant de lancer un test, preciser en une phrase :

- ce que l'on cherche a verifier

Exemples :

- verifier si le parcours guide ralentit effectivement le regard
- verifier si une interaction reste lisible sans explication orale
- verifier si un materiau tactile aide a formuler une qualite picturale
- verifier si une piste de projection sert la discussion ou la distraie

Il est preferable de tester une question principale a la fois.

## Pendant le test

### Ce qu'il faut observer

- le premier niveau de comprehension
- les points d'hesitation
- le rythme de l'engagement
- la clarte du geste ou de l'action attendue
- la place prise par le dispositif
- le moment de retour vers l'oeuvre
- les mots ou formulations qui emergent spontanement

### Ce qu'il faut eviter

- trop expliquer avant de laisser essayer
- corriger trop vite
- poser trop de questions pendant l'experience
- surinterpreter un seul comportement

## Role du mediateur pendant le test

Le mediateur ou l'observateur ne doit pas seulement "faire marcher" le dispositif. Il doit aussi :

- cadrer le test en une phrase simple
- laisser un temps d'exploration reel
- noter ce qui reste obscur sans le combler trop vite
- distinguer ce qui vient du dispositif et ce qui vient de sa propre mediation orale

## Apres le test

Apres l'essai, il faut produire deux traces si possible :

1. une trace structuree
2. une note qualitative courte

La trace structuree peut prendre la forme :

- d'un resume local ou JSON pour le prototype web
- d'une fiche de session
- d'une note d'observation
- d'une capture ou photo si le format est local ou physique

La note qualitative doit rester breve et utile :

- moment fort
- point de confusion
- lien ou absence de lien avec l'oeuvre
- decision de suite

## Questions post-test recommandees

Poser peu de questions, mais des questions precises.

Questions transversales :

- Qu'avez-vous cru devoir faire au debut ?
- A quel moment cela a commence a faire sens ?
- Le dispositif vous a-t-il aide a regarder l'oeuvre autrement ?
- Avez-vous eu envie de revenir a l'oeuvre, ou de rester dans le dispositif ?
- Quelle partie vous a semble la plus juste, et laquelle la plus artificielle ?

Selon les formats, on peut ajouter une question plus ciblee :

- web : le geste etait-il clair sans explication ?
- Arduino : la lumiere ou la distance ont-elles eu du sens sans ecran ?
- low-tech : le materiau ou le support a-t-il aide a parler de l'oeuvre ?
- projection : la visualisation collective ouvrait-elle une discussion utile ?

## Indicateurs qualitatifs utiles

Sans produire de fausse objectivite, il peut etre utile de noter :

- comprehension immediate / comprehension tardive / comprehension fragile
- hesitation faible / moyenne / forte
- retour a l'oeuvre faible / moyen / fort
- autonomie faible / moyenne / forte
- besoin de mediation orale faible / moyen / fort

Ces indicateurs servent a comparer des essais, pas a produire des chiffres absolus.

## Ce qu'il faut documenter explicitement

Les tests doivent nommer aussi les limites :

- taille du groupe
- contexte de demonstration
- bruit ou contraintes du lieu
- temps disponible
- accompagnement oral plus ou moins important
- statut du prototype teste

Cela permet d'eviter de presenter un resultat partiel comme une validation generale.

## Grille de decision apres test

Chaque test devrait aboutir a une mini-decision parmi les suivantes :

- garder tel quel pour l'instant
- garder mais simplifier
- clarifier la consigne
- renforcer la relation a l'oeuvre
- deplacer vers la categorie laboratoire seulement
- suspendre ou abandonner

## Documents associes

Utiliser ce protocole avec :

- [TEST_SESSION_TEMPLATE.md](./TEST_SESSION_TEMPLATE.md)
- [REAL_TEST_SESSION_01_GUIDED_MOBILE.md](./REAL_TEST_SESSION_01_GUIDED_MOBILE.md)
- [REAL_TEST_SESSION_01_GUIDED_MOBILE_COURTE.md](./REAL_TEST_SESSION_01_GUIDED_MOBILE_COURTE.md)
- [REAL_TEST_SESSION_02_LOWTECH_CALQUES_COURTE.md](./REAL_TEST_SESSION_02_LOWTECH_CALQUES_COURTE.md)
- [REAL_TEST_SESSION_03_ARDUINO_TABLE_DE_MATIERES_COURTE.md](./REAL_TEST_SESSION_03_ARDUINO_TABLE_DE_MATIERES_COURTE.md)
- [REAL_TEST_SESSION_04_P5_FIXED_COLOUR_COURTE.md](./REAL_TEST_SESSION_04_P5_FIXED_COLOUR_COURTE.md)
- [TEST_SYNTHESIS_TEMPLATE.md](./TEST_SYNTHESIS_TEMPLATE.md)
- [EXAMPLE_TEST_SESSION_01_GUIDED_MOBILE.md](./EXAMPLE_TEST_SESSION_01_GUIDED_MOBILE.md)
- [EXAMPLE_TEST_SESSION_02_P5_FIXED_COLOUR.md](./EXAMPLE_TEST_SESSION_02_P5_FIXED_COLOUR.md)
- [EXAMPLE_TEST_SESSION_03_ARDUINO_TABLE_DE_MATIERES.md](./EXAMPLE_TEST_SESSION_03_ARDUINO_TABLE_DE_MATIERES.md)
- [EXAMPLE_TEST_SESSION_04_LOWTECH_CALQUES.md](./EXAMPLE_TEST_SESSION_04_LOWTECH_CALQUES.md)
- [EXAMPLE_TEST_SYNTHESIS.md](./EXAMPLE_TEST_SYNTHESIS.md)
- [MOBILE_TESTING.md](./MOBILE_TESTING.md)

## Formulation courte pour HKB

Si ce protocole doit etre presente oralement, une formulation concise peut etre :

"Nous ne cherchons pas a mesurer scientifiquement le regard. Nous cherchons a comparer des formes de mediation, en documentant ce qui est compris, ce qui hesite, et ce qui reconduit ou non vers l'oeuvre."
