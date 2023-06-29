# Use the Node.js base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy the backend files to the container
COPY . .

# Install backend dependencies
RUN npm install

# Expose the necessary port for the backend application
EXPOSE 3000

# Specify the command to start the backend server
CMD ["npm", "start"]