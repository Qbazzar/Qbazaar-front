#!/usr/bin/env bash
# Deploy the committed frontend (HEAD) to the cPanel VPS as static files.
#
#   tools/deploy.sh                                  # IP-only site  -> /var/www/html
#   TARGET=/home/qbazaar/public_html OWNER=qbazaar:qbazaar tools/deploy.sh   # cPanel account
#
# Only git-tracked files are shipped (no .git, tokens, or local scratch files).
# Commit before deploying: uncommitted edits are NOT uploaded.
set -euo pipefail

HOST="${HOST:-qbazaar}"                 # ssh alias from ~/.ssh/config
TARGET="${TARGET:-/var/www/html}"
OWNER="${OWNER:-root:root}"
STAMP="$(date +%Y%m%d-%H%M%S)"

cd "$(git rev-parse --show-toplevel)"

if [ -n "$(git status --porcelain)" ]; then
  echo "warning: uncommitted changes are not deployed (shipping HEAD $(git rev-parse --short HEAD))" >&2
fi

echo "==> backup $HOST:$TARGET -> /root/qb-backups/html-$STAMP.tgz"
ssh "$HOST" "mkdir -p /root/qb-backups && tar -czf /root/qb-backups/html-$STAMP.tgz -C '$TARGET' . 2>/dev/null || true"

echo "==> upload HEAD to $HOST:$TARGET"
git archive --format=tar HEAD -- . ':!docs' ':!tools' \
  | ssh "$HOST" "mkdir -p '$TARGET' && tar -xf - -C '$TARGET'"

echo "==> permissions ($OWNER, dirs 755, files 644)"
ssh "$HOST" "chown -R '$OWNER' '$TARGET' \
  && find '$TARGET' -type d -exec chmod 755 {} + \
  && find '$TARGET' -type f -exec chmod 644 {} +"

echo "==> deployed $(git rev-parse --short HEAD) to $HOST:$TARGET"
