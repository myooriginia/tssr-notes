# CLAUDE.md — TSSR Notes

Instructions pour Claude Code sur ce projet.

## Projet

Site statique de révision TSSR (Technicien Supérieur Systèmes et Réseaux).
Répertoire : `/mnt/d/site tssr/tssr-notes/`
Pas de framework — JavaScript natif, compatible GitHub Pages.

## Fichiers clés

| Fichier | Rôle |
|---|---|
| `data/quiz.js` | Banque de questions — `const QUIZ_DATA = { questions: [...] }` |
| `data/modules-index.js` | Index des cours/modules — source de vérité pour les IDs |
| `pages/quiz.html` | Page quiz — contient la logique JS et le `MODULE_META` |

## Règles critiques

### 1. Toujours vérifier les IDs de modules avant d'intégrer des questions

Avant d'écrire dans `quiz.js`, vérifier les IDs exacts dans `modules-index.js` :

```bash
node -e "
const fs = require('fs');
const src = fs.readFileSync('/mnt/d/site tssr/tssr-notes/data/modules-index.js', 'utf8');
const idx = new Function(src + '; return MODULES_INDEX;')();
idx.forEach(c => { console.log(c.id); c.modules.forEach(m => console.log('  ', m.id, m.titre)); });
"
```

**Pourquoi :** Les IDs inventés (ex. `ms-reseau-m01`) ne correspondent pas aux IDs réels (ex. `srvms-m01`) → boutons "Démarrer" grisés même si les questions existent.

### 2. Après chaque intégration de module, mettre à jour MODULE_META dans quiz.html

Dans `pages/quiz.html` (ligne ~1008), ajouter l'entrée du nouveau module :

```js
'srvms-m03': { label: 'GPO', emoji: '📋' },
```

### 3. Rappeler le hard-refresh navigateur après toute modification de quiz.js

Après chaque modification de `data/quiz.js`, rappeler à l'utilisateur de faire un **hard-refresh** :
- Chrome/Firefox/Edge : `Ctrl + Shift + R`

**Pourquoi :** Le navigateur cache l'ancienne version de quiz.js. Sans hard-refresh, les nouveaux modules n'apparaissent pas actifs même si le fichier est correctement modifié.

### 4. Structure d'une question

```json
{
  "id": "q301",
  "module": "srvms-m04",
  "difficulte": "moyen",
  "question": "...",
  "choix": ["A", "B", "C", "D"],
  "reponse": 0,
  "explication": "..."
}
```

- `reponse` : index **0-based** du bon choix
- `difficulte` : `"facile"` | `"moyen"` | `"difficile"`
- `id` : séquentiel depuis le dernier utilisé (vérifier avant d'insérer)

### 5. Vérification post-intégration obligatoire

```bash
node -e "
const fs = require('fs');
const src = fs.readFileSync('/mnt/d/site tssr/tssr-notes/data/quiz.js', 'utf8');
const data = new Function(src + '; return QUIZ_DATA;')();
console.log('Total:', data.questions.length);
const last = data.questions[data.questions.length - 1];
console.log('Dernière:', last.id, last.module);
"
```
