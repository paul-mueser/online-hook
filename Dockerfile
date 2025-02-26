FROM node:20
ENV TZ="Europe/Berlin"
WORKDIR /usr/src/online-hook
COPY package*.json ./
RUN apt-get update && apt-get install -y
RUN npm install
COPY . .
CMD ["node", "src/index.js"]