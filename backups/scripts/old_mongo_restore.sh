#!/bin/bash
set -e

if [ -z "$1" ]; then
  echo "❌ Devi indicare la cartella del backup"
  echo "Esempio:"
  echo "  ./scripts/mongo-restore.sh 2025-12-09_15-50"
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(dirname "$SCRIPT_DIR")"

BACKUP_NAME="$1"
BACKUP_PATH="$REPO_ROOT/backups/mongo/$BACKUP_NAME"

if [ ! -d "$BACKUP_PATH" ]; then
  echo "❌ Backup non trovato: $BACKUP_PATH"
  exit 1
fi

echo "♻️  Ripristino Mongo dal backup: $BACKUP_NAME"

# copia i file nel container
docker cp "$BACKUP_PATH" agenda-mongo-dev:/tmp/restore

# restore (drop = sovrascrive)
docker exec agenda-mongo-dev \
  mongorestore \
  --db agenda \
  --drop \
  /tmp/restore

echo "✅ Ripristino completato con successo"