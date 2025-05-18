#!/bin/bash

# Définir les chemins
SOURCE_DIR="/Users/macbookpro/development/gen-all/gen-nx"
BACKUP_DIR="$HOME/Desktop/mes_save_nx"
DATE=$(date +"%Y-%m-%d_%H-%M-%S")

# Demander à l'utilisateur d'ajouter un texte personnalisé
read -p "Entrez un texte à ajouter au nom de la sauvegarde (ou laissez vide) : " USER_TEXT

# Construire le nom du fichier ZIP
if [ -z "$USER_TEXT" ]; then
    ZIP_NAME="backup-gen-nx-$DATE.zip"
else
    # Nettoyer le texte utilisateur (remplacer les espaces par des underscores)
    CLEAN_TEXT=$(echo "$USER_TEXT" | tr ' ' '_')
    ZIP_NAME="backup-gen-nx-$DATE-$CLEAN_TEXT.zip"
fi

DEST_PATH="$BACKUP_DIR/$ZIP_NAME"

# Créer le dossier de destination s'il n'existe pas
mkdir -p "$BACKUP_DIR"

# Créer l'archive ZIP en excluant certains dossiers
zip -r "$DEST_PATH" "$SOURCE_DIR" -x "**/node_modules/*" "**/.git/*" "**/dist/*"

# Afficher le résultat
echo "✅ Sauvegarde créée : $DEST_PATH"
