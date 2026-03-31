# Stage 1: Build the React application
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies from the frontend folder
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install

# Copy the rest of the frontend source code
COPY frontend/ .

# Inject the Render Environment Variable to Vite at build-time
ARG VITE_GEMINI_API_KEY
ENV VITE_GEMINI_API_KEY=$VITE_GEMINI_API_KEY

# Build the production bundle
RUN npm run build

# Stage 2: Serve the files using Nginx
FROM nginx:alpine

# Clear default nginx assets
RUN rm -rf /usr/share/nginx/html/*

# Copy our custom Nginx config to handle direct URL routing back to index.html
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

# Copy the generated Vite assets from Stage 1 into the Nginx static folder
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 for Render routing
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
