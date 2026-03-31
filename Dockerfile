# Stage 1: Build the React application
FROM node:18-alpine AS builder

WORKDIR /app

# Copy dependencies
COPY frontend/package.json frontend/package-lock.json ./

# Install ALL dependencies (including Vite) regardless of Render's global NODE_ENV
RUN npm install --include=dev

# Copy source code
COPY frontend/ .

# Build args
ARG VITE_GEMINI_API_KEY
ENV VITE_GEMINI_API_KEY=$VITE_GEMINI_API_KEY

# Build the production bundle (with expanded memory to prevent Free Tier OOM crashes)
RUN NODE_OPTIONS="--max_old_space_size=1024" npm run build

# Stage 2: Serve the files using Nginx
FROM nginx:alpine

# Clear default nginx assets
RUN rm -rf /usr/share/nginx/html/*

# Copy our custom Nginx config
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

# Copy the generated Vite assets
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
