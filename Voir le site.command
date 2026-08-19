#!/bin/bash
# ============================================================
# Fichier à DOUBLE-CLIQUER depuis le Finder.
# Il construit le site et l'ouvre dans le navigateur. Rien à taper.
# ============================================================
cd "$(dirname "$0")" || exit 1
clear
echo ""
echo "  ┌────────────────────────────────────────────┐"
echo "  │   SITE PELSE — aperçu                      │"
echo "  └────────────────────────────────────────────┘"
echo ""

if [ ! -d node_modules ]; then
  echo "  Première fois : installation des outils (1 à 2 minutes)…"
  npm install --silent || { echo "  ✗ Installation impossible."; read -r; exit 1; }
fi

echo "  Construction du site…"
if ! npm run build > /tmp/pelse-site-build.log 2>&1; then
  echo "  ✗ La construction a échoué. Détail :"
  tail -8 /tmp/pelse-site-build.log | sed 's/^/      /'
  echo ""
  echo "  Appuyez sur Entrée pour fermer."
  read -r
  exit 1
fi
echo "  ✓ Site construit."
echo ""

( for _ in $(seq 1 30); do
    curl -s -o /dev/null http://localhost:4100 && { open "http://localhost:4100"; break; }
    sleep 1
  done ) &

echo "  Le navigateur s'ouvre sur le site tel qu'il sera en ligne."
echo ""
echo "  Pour le voir en téléphone : dans Chrome, menu ⋮ ▸ Plus d'outils ▸"
echo "  Outils de développement, puis l'icône téléphone en haut à gauche."
echo ""
echo "  ⚠ LAISSEZ CETTE FENÊTRE OUVERTE. Pour arrêter : fermez-la."
echo ""
node scripts/serve.mjs out 4100
