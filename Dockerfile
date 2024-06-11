# Use the official Node.js 14 image as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) files
COPY package*.json ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the Nuxt application
RUN yarn build

# Expose the port that the application will run on
EXPOSE 3000

# Command to run the application
CMD ["yarn", "start"]
