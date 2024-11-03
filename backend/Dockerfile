# Use a Node.js base image
FROM node:18-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the NestJS application
RUN npm run build

# Production image
FROM node:18-alpine

WORKDIR /app

# Copy only the compiled output and necessary files
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./

# Install only production dependencies
RUN npm install --production

# Expose the port that NestJS listens on
EXPOSE 3001

# Start the application
CMD ["node", "dist/main"]

