# === Frontend Dockerfile (for Next.js 14 project) ===
FROM node:20-alpine

# Set working directory inside container
WORKDIR /app

# Install only production dependencies first (good practice)
COPY frontend/package*.json ./

RUN npm install

# Copy all frontend source code into container
COPY frontend/ .

# Build the Next.js production build (creates the `.next` folder)
RUN npm run build

# Expose the frontend port
EXPOSE 3000

# Start the production server
CMD ["npm", "run", "start"]
