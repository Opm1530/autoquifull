FROM node:20-alpine AS base
WORKDIR /app

# Instala dependências de produção
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copia o código fonte
COPY src/ ./src/

# Cria usuário não-root para segurança
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

EXPOSE 3001

HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=3 \
  CMD wget -qO- http://localhost:3001/health || exit 1

CMD ["node", "src/server.js"]
