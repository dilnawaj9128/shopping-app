# Stage 1: Build Phase
FROM node:18-alpine AS builder
WORKDIR /app

COPY package*.json ./

# Packages Install
RUN npm install ajv@^8 ajv-keywords@^5 --legacy-peer-deps && \
    npm install --legacy-peer-deps

COPY . .
RUN npm run build

# Stage 2: Production Phase
FROM nginx:1.25-alpine AS production

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/

COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
