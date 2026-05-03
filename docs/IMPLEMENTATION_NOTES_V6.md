# Notes d’implémentation V6

## Ajouter ou retirer rapidement des modules

Les modules V6 sont regroupés dans la section :

`// V6 — MODES AVANCÉS`

Variables principales :
- `minimalTextMode`
- `showMouseTrail`
- `showPoeticLabel`
- `scoreMode`
- `softResetActive`
- `observationStarted`

## Touches utiles
- `I` : interface minimale
- `Q` : trace fantôme
- `Y` : cartel poétique
- `U` : score / partition de regard
- `R` : reset doux
- `N / F / V` : avant / après

## Pour installation plein écran
Dans `setup()`, remplacer :

```processing
size(950, 1100);
```

par :

```processing
fullScreen();
```

Puis lancer avec `K` pour activer le mode kiosk.