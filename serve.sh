#!/bin/bash
echo "Démarrage du serveur local TSSR Notes..."
echo "Ouvre http://localhost:8000 dans ton navigateur"
echo "(Ctrl+C pour arrêter)"
python3 -m http.server 8000
