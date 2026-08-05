#!/usr/bin/env bash
# Build locally and deploy to the sandbox server (low-RAM box can't build itself).
# Usage: ./scripts/deploy-sandbox.sh

set -euo pipefail

REMOTE_HOST="react-portal"
REMOTE_DIR="/var/www/portal.sandbox.leajlak.com"
PM2_APP="portal-sandbox"
ARCHIVE="next-build.tar.gz"

cd "$(dirname "$0")/.."

echo "==> Checking local .env matches server .env"
ssh "$REMOTE_HOST" "cat $REMOTE_DIR/.env" > .env.remote-check
if ! diff -q .env .env.remote-check > /dev/null 2>&1; then
  echo "!! Local .env differs from server .env (or is missing)."
  echo "!! NEXT_PUBLIC_* values are baked in at build time - mismatched env will break the deploy."
  diff .env .env.remote-check || true
  rm -f .env.remote-check
  read -p "Continue anyway? [y/N] " -n 1 -r
  echo
  [[ $REPLY =~ ^[Yy]$ ]] || exit 1
else
  rm -f .env.remote-check
fi

echo "==> Building locally (webpack, not turbopack)"
rm -rf .next
NEXT_TELEMETRY_DISABLED=1 npm run build

if [ ! -f ".next/server/app/[locale]/(main)/auth/login/page.js" ]; then
  echo "!! Build looks incomplete - login page.js missing. Aborting deploy."
  exit 1
fi

echo "==> Archiving build output (excluding .next/cache)"
rm -f "$ARCHIVE"
COPYFILE_DISABLE=1 tar --exclude='.next/cache' -czf "$ARCHIVE" \
  .next public package.json yarn.lock next.config.mjs

echo "==> Uploading to $REMOTE_HOST:$REMOTE_DIR"
scp "$ARCHIVE" "$REMOTE_HOST:$REMOTE_DIR/"

echo "==> Extracting and restarting on server"
ssh "$REMOTE_HOST" "cd $REMOTE_DIR && \
  rm -rf .next && \
  tar -xzf $ARCHIVE && \
  rm -f $ARCHIVE && \
  find .next public -name '._*' -delete && \
  pm2 restart $PM2_APP"

rm -f "$ARCHIVE"

echo "==> Verifying"
sleep 3
ssh "$REMOTE_HOST" "curl -s -o /dev/null -w 'HTTP %{http_code}\n' http://localhost:3000/auth/login"

echo "==> Done"
