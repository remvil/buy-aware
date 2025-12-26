#!/bin/sh
set -e

DATE=$(date +"%Y-%m-%d_%H-%M-%S")
BACKUP_DIR="/backups/mongo"
TARGET="$BACKUP_DIR/$DATE"
KEEP=7

echo "Waiting for MongoDB..."
sleep 10

echo "Starting MongoDB backup → $TARGET"
mkdir -p "$TARGET"

mongodump \
  --host mongodb \
  --port 27017 \
  --db agenda \
  --out "$TARGET"

echo "Backup completed"

echo "Applying retention (keep last $KEEP backups)..."

ls -1dt "$BACKUP_DIR"/* | tail -n +$((KEEP + 1)) | xargs -r rm -rf

echo "... Done!"