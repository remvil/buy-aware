#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
REPO_ROOT="$(dirname "$SCRIPT_DIR")"

DATE=$(date +%Y-%m-%d_%H-%M)
BACKUP_DIR="$REPO_ROOT/backups/mongo/$DATE"

echo "📦 Backup Mongo → $BACKUP_DIR"

mkdir -p "$BACKUP_DIR"

docker exec agenda-mongo-dev \
  mongodump \
  --db agenda \
  --out /tmp/backup

docker cp agenda-mongo-dev:/tmp/backup/agenda "$BACKUP_DIR"

echo "✅ Backup completato"