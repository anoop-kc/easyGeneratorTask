# Stage 1: Build the React app
FROM node:18-alpine as build

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy build output from the previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Configure Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
