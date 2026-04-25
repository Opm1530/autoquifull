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

# ── Stage 3: Container final (só Node.js) ────────────────────
FROM node:20-alpine

# Frontend estático (servido pelo Express)
COPY --from=build-frontend /app/dist /app/dist

# Backend
COPY --from=build-backend /backend/node_modules /backend/node_modules
COPY backend/src /backend/src

WORKDIR /backend

EXPOSE 3001

CMD ["node", "src/server.js"]
