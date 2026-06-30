# ── Stage 1: Build ──────────────────────────────────────
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# ── Stage 2: Serve with Nginx ────────────────────────────
FROM nginx:1.25-alpine AS production

# Non-root setup
RUN addgroup -g 1001 -S nginx-grp && \
    adduser -S nginx-usr -u 1001

# Remove default config
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/

COPY --from=builder /app/build /usr/share/nginx/html

RUN chown -R nginx-usr:nginx-grp /usr/share/nginx/html && \
    chown -R nginx-usr:nginx-grp /var/cache/nginx && \
    chown -R nginx-usr:nginx-grp /var/log/nginx && \
    chown -R nginx-usr:nginx-grp /etc/nginx/conf.d && \
    mkdir -p /var/run/nginx && \
    chown -R nginx-usr:nginx-grp /var/run/nginx && \
    touch /var/run/nginx.pid && \
    chown nginx-usr:nginx-grp /var/run/nginx.pid

USER nginx-usr
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
  CMD wget -q --spider http://localhost:3000 || exit 1

CMD ["nginx", "-g", "daemon off;"]
