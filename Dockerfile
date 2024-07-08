# Use the official Node.js 17 image
FROM node:iron-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available) to the working directory
#COPY package*.json .

# Install dependencies

# Copy the rest of the application code to the working directory
COPY . .
RUN npm install
EXPOSE 3011

# Command to run the JavaScript file
CMD ["npm","start"]