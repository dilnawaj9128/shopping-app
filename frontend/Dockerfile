# 1. Base Image aur Application folder set kiya
FROM node:18-alpine
WORKDIR /app

# 2. Pehle configuration files copy ki
COPY package*.json ./

# 3. Dependency error se bachne ke liye ye simple trick use ki
RUN npm install ajv@8 ajv-keywords@5 --legacy-peer-deps && \
    npm install --legacy-peer-deps

# 4. Pura code copy kiya aur build banayi
COPY . .
RUN npm run build

# 5. Production build ko port 3000 par launch kar diya
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]
