# Déploiement Web

## 1. Tester localement

Depuis la racine du dépôt :

```bash
python3 -m http.server 8000
```

Ouvrir ensuite :

```text
http://localhost:8000/web/
```

Alternative si vous voulez servir directement le dossier web :

```bash
python3 -m http.server 8000 --directory web
```

Puis ouvrir :

```text
http://localhost:8000/
```

## 2. Activer GitHub Pages

1. Aller dans `Settings` du dépôt.
2. Ouvrir la section `Pages`.
3. Dans `Build and deployment`, choisir `Source: GitHub Actions`.
4. Vérifier que le fichier suivant est présent sur `main` :

```text
.github/workflows/deploy-web-pages.yml
```

5. Pousser ou merger les changements vers `main`.

Le workflow publiera alors directement le contenu de `web/`.

## 3. Format attendu de l’URL publique

Pour un dépôt de projet GitHub Pages, l’URL attendue est :

```text
https://<owner>.github.io/barbara-muller-mediation/
```

Le site publié correspond au contenu de `web/`, mais l’URL publique ne contient pas `/web/`.

## 4. Dépannage si les assets manquent

Si les images ne chargent pas :

- vérifier que `web/assets/oeuvre1.jpg`, `web/assets/oeuvre2.jpg` et `web/assets/oeuvre3.jpg` sont bien suivis par Git
- vérifier que `index.html` charge `./sketch.js` et `./style.css`
- vérifier que `sketch.js` pointe vers `./assets/oeuvre1.jpg`, `./assets/oeuvre2.jpg` et `./assets/oeuvre3.jpg`
- vérifier que le workflow publie bien `path: ./web`
- vérifier dans l’onglet `Actions` que le job GitHub Pages s’est terminé sans erreur
- faire un rechargement complet du navigateur après le déploiement
