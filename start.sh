#!/bin/sh
set -e

echo "🚀 Iniciando backend..."
cd /backend && node src/server.js &

echo "⏳ Aguardando backend ficar pronto..."
until wget -qO- http://localhost:3001/health > /dev/null 2>&1; do
  sleep 1
done
echo "✅ Backend pronto!"

echo "🌐 Iniciando nginx..."
exec nginx -g "daemon off;"
