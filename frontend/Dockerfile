# ── Stage 1: Build Phase ──────────────────────────────────────
FROM node:18-alpine AS builder
WORKDIR /app

# Dependency resolution ko clean rakhein
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Source code copy karke build banayein
COPY . .
RUN npm run build

# ── Stage 2: Production Phase ────────────────────────────
FROM nginx:1.25-alpine AS production

# Default Nginx config ko remove karein aur apna copy karein
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/

# Builder stage se generated files ko Nginx folder mein copy karein
COPY --from=builder /app/build /usr/share/nginx/html

# Default port expose karein (Nginx default 80 use karta hai, standard approach yahi hai)
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
