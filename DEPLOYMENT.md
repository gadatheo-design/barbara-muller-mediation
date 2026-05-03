# Déploiement GitHub

## Créer le dépôt

```bash
git init
git add .
git commit -m "Initial Processing mediation prototype"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/barbara-muller-mediation.git
git push -u origin main
```

## Ouvrir dans Processing

```text
processing/BarbaraMullerMediation/BarbaraMullerMediation.pde
```

## Pour une version web

Créer une branche `p5js-mobile` puis convertir vers p5.js dans un dossier `web/`.
Voir `docs/P5JS_CONVERSION_PLAN.md`.
