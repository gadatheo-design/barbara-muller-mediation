# Barbara Müller Mediation Prototype

Prototype interactif de médiation culturelle autour de trois œuvres abstraites de Barbara Müller.

Le projet est conçu comme une **partition d’attention** : observer, attendre, toucher, nommer, comparer, puis revenir à l’œuvre. Il a été développé en **Processing 4** comme prototype local / exposition, avec documentation pour test public, médiation low-tech et amélioration progressive avec Codex.

Le dépôt contient maintenant deux surfaces distinctes :

- une version **Processing 4** pour le prototype original d’exposition
- une version **p5.js mobile-first** dans `web/`, prévue pour un déploiement statique via GitHub Pages

## Structure

```text
processing/BarbaraMullerMediation/BarbaraMullerMediation.pde
processing/BarbaraMullerMediation/data/
web/
web/assets/
docs/
docs/lowtech/
assets/
exports/
archive/
AGENTS.md
DEPLOYMENT.md
docs/WEB_DEPLOYMENT.md
docs/BEST_CODEX_PROMPTS.md
```

## Lancer le prototype Processing

1. Installer Processing 4.
2. Ouvrir `processing/BarbaraMullerMediation/BarbaraMullerMediation.pde`.
3. Cliquer sur **Run**.

## Lancer le prototype web

Option recommandée depuis la racine du dépôt :

```bash
python3 -m http.server 8000
```

Puis ouvrir :

```text
http://localhost:8000/web/
```

La version web n’a ni build step ni framework. Elle utilise `p5.js` depuis un CDN et conserve des chemins relatifs pour fonctionner correctement sur GitHub Pages.

## Déployer la version web avec GitHub Pages

Le dépôt inclut un workflow GitHub Actions officiel :

```text
.github/workflows/deploy-web-pages.yml
```

Ce workflow :

1. se déclenche sur `push` vers `main` pour les fichiers du prototype web
2. publie directement le contenu de `web/`
3. ne fait aucun build
4. déploie le site sur GitHub Pages

Pour activer le déploiement :

1. ouvrir `Settings` → `Pages`
2. dans `Build and deployment`, choisir `Source: GitHub Actions`
3. merger la branche contenant `web/` et le workflow vers `main`

Ensuite, l’URL publique attendue est :

```text
https://<owner>.github.io/barbara-muller-mediation/
```

Voir aussi :

- `DEPLOYMENT.md`
- `docs/WEB_DEPLOYMENT.md`

## Commandes principales

| Touche | Fonction |
|---|---|
| `Espace` | commencer |
| `1 / 2 / 3` | changer d’œuvre |
| `A / Z / E` | changer d’interaction |
| `B` | changer de langue FR / DE / EN |
| `K` | mode kiosk / exposition |
| `I` | mode sans texte |
| `Q` | trace fantôme |
| `Y` | cartel poétique |
| `U` | mode score / partition de regard |
| `N` | point avant |
| `F` | point après |
| `V` | afficher avant / après |
| `G` | archive visuelle PNG |
| `D` | dashboard médiateur |
| `X` | export CSV |
| `T` | retour silencieux |
| `R` | reset doux |
| `S` | capture |

## Codex

Utiliser d’abord :

```text
Read README.md, AGENTS.md, docs/BEST_CODEX_PROMPTS.md and the Processing sketch.
Summarize the architecture and propose a safe improvement plan.
Do not edit files yet.
```

Puis suivre les prompts détaillés dans `docs/BEST_CODEX_PROMPTS.md`.
