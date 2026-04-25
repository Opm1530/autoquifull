# ── Stage 1: Build do frontend ───────────────────────────────
FROM node:20-alpine AS build-frontend

WORKDIR /app
COPY package*.json ./
RUN npm install && chmod +x node_modules/.bin/*
COPY . .
RUN npm run build

# ── Stage 2: Dependências do backend ─────────────────────────
FROM node:20-alpine AS build-backend

WORKDIR /backend
COPY backend/package*.json ./
RUN npm ci --only=production

# ── Stage 3: Container final (nginx + node) ──────────────────
FROM node:20-alpine

# Instala nginx
RUN apk add --no-cache nginx

# Frontend estático
COPY --from=build-frontend /app/dist /usr/share/nginx/html

# Backend
COPY --from=build-backend /backend/node_modules /backend/node_modules
COPY backend/src /backend/src

# Config nginx (proxy localhost:3001 → backend)
COPY nginx.conf /etc/nginx/http.d/default.conf

# Script de start
COPY start.sh /start.sh
RUN chmod +x /start.sh

EXPOSE 80

CMD ["/start.sh"]
