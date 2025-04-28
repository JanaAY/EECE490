FROM node:20-alpine

WORKDIR /app

# Copy package files and install ALL dependencies (not only production)
COPY package*.json ./
RUN npm install

# Copy frontend app code
COPY . .

# Build the app (creates `.next/` folder)
RUN npm run build

# Expose port
EXPOSE 3000

# Start production server
CMD ["npm", "run", "start"]
