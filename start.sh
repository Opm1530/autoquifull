#!/bin/sh
set -e

echo "🚀 Iniciando backend..."
cd /backend && node src/server.js &

echo "🌐 Iniciando nginx..."
nginx -g "daemon off;"
