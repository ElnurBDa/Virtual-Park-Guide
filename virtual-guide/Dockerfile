# Stage 1: Build the React app
FROM node:18-alpine as build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install --silent

# Copy the rest of the app files and build the app
COPY . ./
RUN npm run build

# Install 'serve' to serve the built app
RUN npm install -g serve

# Expose port 3000
EXPOSE 3000

# Command to serve the app
CMD ["serve", "-s", "build", "-l", "3000"]

