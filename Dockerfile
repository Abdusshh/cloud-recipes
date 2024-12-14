# Use Node.js as the base image
FROM node:18-alpine AS builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the Next.js application
RUN npm run build

# Stage 2: Serve the application
FROM node:18-alpine

# Set working directory in the container
WORKDIR /app

# Copy the built application from the previous stage
COPY --from=builder /app ./

# Install only production dependencies
RUN npm install --only=production

# Expose the default port Next.js uses
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]