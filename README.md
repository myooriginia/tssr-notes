# TSSR Notes

Site de révision interactif pour la certification **TSSR** (Technicien Supérieur Systèmes et Réseaux).

## Contenu

- **Fiches de cours** — 18 cours, 115 modules avec sections détaillées
- **Quiz / QCM** — Questions par module et par difficulté
- **Checklist** — Suivi de compétences avec statuts cycliques
- **Tableau de bord** — Statistiques, radar de progression, heatmap
- **Glossaire** — 83 termes TSSR essentiels avec index A-Z
- **Ressources** — Cheatsheets Cisco / Linux / PowerShell / Docker

## Lancer le site en local

Les données sont embarquées directement dans les fichiers JS (pas de serveur requis pour le fonctionnement de base). Tu peux ouvrir `index.html` directement dans le navigateur.

Si tu rencontres des problèmes, utilise un serveur local :

**Option 1 — Script fourni**

```bash
# Linux / Mac / WSL
./serve.sh

# Windows
serve.bat
```

**Option 2 — Ligne de commande**

```bash
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```

**Option 3 — VS Code**

Installer l'extension **Live Server**, puis clic droit sur `index.html` → *Open with Live Server*.

> Note : sur GitHub Pages (protocole `https://`), aucun serveur local n'est nécessaire.

## Structure du projet

```
tssr-notes/
├── index.html              Page d'accueil / dashboard
├── assets/
│   ├── css/style.css       Design system (variables CSS, composants)
│   └── js/main.js          Store localStorage, utilitaires (window.TSSR)
├── pages/
│   ├── cours.html          Fiches de cours (layout 3 colonnes, TOC, mastered)
│   ├── quiz.html           Quiz / QCM interactif
│   ├── checklist.html      Checklist compétences
│   ├── tableau.html        Tableau de bord (Chart.js)
│   ├── glossaire.html      Glossaire (83 termes, index A-Z)
│   └── ressources.html     Ressources et cheatsheets
├── data/
│   ├── modules.js          18 cours / 115 modules (données embarquées)
│   ├── quiz.js             Questions QCM
│   ├── checklist.js        Compétences TSSR
│   └── glossaire.js        83 termes du glossaire
├── serve.sh                Serveur local (Linux/Mac/WSL)
└── serve.bat               Serveur local (Windows)
```

## Déploiement GitHub Pages

Site en ligne : **https://myooriginia.github.io/tssr-notes/**

1. `git init && git add . && git commit -m "Initial commit"`
2. Créer le dépôt `tssr-notes` sur GitHub (public, sans README)
3. `git remote add origin https://github.com/myooriginia/tssr-notes.git`
4. `git push -u origin main`
5. Settings → Pages → Source : `main` branch → Save
