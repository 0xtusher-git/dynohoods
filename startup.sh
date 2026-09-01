#!/bin/sh
# Restart contract: Grok workspace Vite app (Dynohoods + waitlist).
set -e
cd /workspace

if curl -sf -o /dev/null --max-time 2 http://127.0.0.1:8080/; then
  exit 0
fi

npm run dev >/tmp/vite-dev.log 2>&1 &
exit 0
