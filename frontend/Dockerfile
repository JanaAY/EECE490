FROM node:20-alpine

WORKDIR /app

# Install ALL dependencies (remove the production-only install)
COPY frontend/package*.json ./
RUN npm install   # <---- REMOVE --production !!

COPY frontend/ .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
