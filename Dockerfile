FROM node:14

# Link the image back to the GitHub repo
LABEL org.opencontainers.image.source https://github.com/klcodanr/roman-numeral

WORKDIR /usr/src/app

# Create a layer for the node dependencies
COPY package*.json ./
RUN npm ci

# Bundle app source
COPY ./src/ ./src

# Expose and run app on port 8080
EXPOSE 8080
CMD [ "node", "src/server.js" ]