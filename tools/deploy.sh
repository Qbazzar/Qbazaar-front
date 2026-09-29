#!/usr/bin/env bash
# Deploy the committed frontend (HEAD) to the cPanel VPS as static files.
#
#   tools/deploy.sh                                  # IP-only site  -> /var/www/html
#   TARGET=/home/qbazaar/public_html OWNER=qbazaar:qbazaar tools/deploy.sh   # cPanel account
#   FULL=1 tools/deploy.sh                           # re-send every image
#
# Only git-tracked files are shipped (no .git, tokens, or local scratch files).
# Commit before deploying: uncommitted edits are NOT uploaded.
set -euo pipefail

HOST="${HOST:-qbazaar}"                 # ssh alias from ~/.ssh/config
TARGET="${TARGET:-/var/www/html}"
OWNER="${OWNER:-root:root}"
STAMP="$(date +%Y%m%d-%H%M%S)"
STATE="/root/qb-backups/deployed-$(echo "$TARGET" | tr '/' '_')"
BATCH=8

cd "$(git rev-parse --show-toplevel)"
HEAD_SHA="$(git rev-parse HEAD)"

if [ -n "$(git status --porcelain)" ]; then
  echo "warning: uncommitted changes are not deployed (shipping HEAD ${HEAD_SHA:0:7})" >&2
fi

# The link to the server drops on long transfers, so every upload is small and retried.
retry() {
  local n
  for n in 1 2 3 4 5; do
    "$@" && return 0
    echo "   retry $n..." >&2
    sleep $((n * 3))
  done
  return 1
}

send_paths() {
  git archive --format=tar HEAD -- "$@" | ssh "$HOST" "mkdir -p '$TARGET' && tar -xf - -C '$TARGET'"
}

echo "==> backup $HOST:$TARGET (code only) -> /root/qb-backups/html-$STAMP.tgz"
retry ssh "$HOST" "mkdir -p /root/qb-backups && tar -czf /root/qb-backups/html-$STAMP.tgz --exclude=./images -C '$TARGET' . 2>/dev/null || true"

echo "==> upload code ${HEAD_SHA:0:7}"
retry send_paths . ':!docs' ':!tools' ':!images'

LAST="$(ssh "$HOST" "cat '$STATE' 2>/dev/null || true")"
if [ -z "${FULL:-}" ] && [ -n "$LAST" ] && git cat-file -e "$LAST" 2>/dev/null; then
  mapfile -t IMAGES < <(git diff --name-only --diff-filter=AM "$LAST" HEAD -- images)
else
  mapfile -t IMAGES < <(git ls-files images)
fi

echo "==> upload ${#IMAGES[@]} image(s)"
for ((i = 0; i < ${#IMAGES[@]}; i += BATCH)); do
  retry send_paths "${IMAGES[@]:i:BATCH}"
  printf '   %d/%d\n' "$((i + BATCH < ${#IMAGES[@]} ? i + BATCH : ${#IMAGES[@]}))" "${#IMAGES[@]}"
done

echo "==> permissions ($OWNER, dirs 755, files 644)"
retry ssh "$HOST" "chown -R '$OWNER' '$TARGET' \
  && find '$TARGET' -type d -exec chmod 755 {} + \
  && find '$TARGET' -type f -exec chmod 644 {} + \
  && echo '$HEAD_SHA' > '$STATE'"

echo "==> deployed ${HEAD_SHA:0:7} to $HOST:$TARGET"
