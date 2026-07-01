# ── Stage 1: Install deps ────────────────────────────────
FROM node:22-alpine AS builder

RUN apk update && apk upgrade --no-cache && \
    npm install -g npm@latest

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# ── Stage 2: Production ──────────────────────────────────
FROM node:22-alpine AS production
RUN apk update && apk upgrade --no-cache && \
    npm install -g npm@latest

# Security: non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodeuser -u 1001

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --chown=nodeuser:nodejs . .

# Remove dev files
RUN rm -f .env.example

USER nodeuser
EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=10s --start-period=15s --retries=3 \
  CMD wget -q --spider http://localhost:5000/health || exit 1

CMD ["node", "server.js"]
