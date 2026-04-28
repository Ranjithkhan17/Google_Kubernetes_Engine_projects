# Use a lightweight Alpine-based image
FROM node:22-alpine

# Set a non-root user for security (Best Practice)
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Set working directory
WORKDIR /app

# Copy package files first to leverage Docker layer caching
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the application source code
COPY server.js .

# Expose the application port
EXPOSE 8080

# Use CMD to start the application
CMD ["node", "server.js"]
