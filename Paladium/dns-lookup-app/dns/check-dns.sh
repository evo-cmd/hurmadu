#!/bin/sh
set -e

if [ "$#" -eq 0 ]; then
  echo "Usage: check-dns domain [domain ...]"
  exit 1
fi

DNS_ADDR=${DNS_ADDR:-127.0.0.1}
DNS_PORT=${DNS_PORT:-53}

for domain in "$@"; do
  echo "--- Checking $domain via ${DNS_ADDR}:${DNS_PORT} ---"
  dig @"$DNS_ADDR" -p "$DNS_PORT" +short "$domain" || echo "dig failed for $domain"
done
