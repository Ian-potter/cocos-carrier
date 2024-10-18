# Stage 1: Build the application
FROM node:20.18.0-alpine AS deps

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock to the container
COPY package.json yarn.lock ./

# Cache the node_modules folder using Docker BuildKit's cache
RUN yarn install --frozen-lockfile

# Stage 2: Copy application source and build
FROM node:20.18.0-alpine AS build

WORKDIR /app

# Copy the rest of the application code to the working directory
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Argument for build script
ARG BUILD_SCRIPT=build

# Build the application and handle non-root
RUN adduser -D -h /app appuser && \
    chown -R appuser /app && \
    su appuser -c "yarn ${BUILD_SCRIPT}"

# Stage 3: Serve the application using Nginx
FROM cgr.dev/chainguard/nginx:latest AS production

# Copy the build output from the first stage to Nginx's static content directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 8080 for Nginx
EXPOSE 8080