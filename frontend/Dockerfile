# 1. Base Image
FROM node:18-alpine
WORKDIR /app

# 2. Copy configuration files
COPY package*.json ./

# 3. Dependency
RUN npm install ajv@8 ajv-keywords@5 --legacy-peer-deps && \
    npm install --legacy-peer-deps

# 4. Code copy
COPY . .
RUN npm run build

# 5. Production build
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]
