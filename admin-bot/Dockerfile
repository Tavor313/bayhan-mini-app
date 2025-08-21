FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install --legacy-peer-deps --no-audit --no-fund
COPY src ./src
CMD ["npm","start"]
