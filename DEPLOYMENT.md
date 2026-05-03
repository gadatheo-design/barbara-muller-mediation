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

## Déployer la version web sur GitHub Pages

Le prototype web vit dans :

```text
web/
```

Le dépôt contient un workflow GitHub Actions officiel :

```text
.github/workflows/deploy-web-pages.yml
```

Ce workflow utilise l’approche GitHub Pages recommandée par GitHub :

- `actions/configure-pages`
- `actions/upload-pages-artifact`
- `actions/deploy-pages`

## Ce que fait le workflow

1. Il se déclenche sur `push` vers `main` quand des fichiers liés au prototype web ou à sa documentation changent.
2. Il prend le dossier `web/` tel quel comme artefact du site.
3. Il ne lance aucun build.
4. Il déploie le contenu de `web/` comme racine du site GitHub Pages.

Cela permet de garder :

- le prototype Processing intact
- le prototype web dans `web/`
- des chemins relatifs simples comme `./style.css`, `./sketch.js`, `./assets/...`

## Activer GitHub Pages dans les réglages

1. Ouvrir `Settings` dans le dépôt GitHub.
2. Aller à `Pages`.
3. Dans `Build and deployment`, choisir `Source: GitHub Actions`.
4. Merger vers `main` la branche contenant :
   - `web/`
   - `.github/workflows/deploy-web-pages.yml`
   - la documentation mise à jour

Après le merge, chaque push pertinent sur `main` redéploiera le site.

## URL publique attendue

Pour ce dépôt, l’URL aura la forme :

```text
https://<owner>.github.io/barbara-muller-mediation/
```

Comme le workflow publie directement le contenu de `web/`, l’utilisateur final n’a pas besoin d’ajouter `/web/` à l’URL publique.

## Test local rapide

Depuis la racine du dépôt :

```bash
python3 -m http.server 8000
```

Puis ouvrir :

```text
http://localhost:8000/web/
```

## Pour une évolution future du prototype web

Créer une branche `p5js-mobile` puis convertir vers p5.js dans un dossier `web/`.
Voir `docs/P5JS_CONVERSION_PLAN.md`.
