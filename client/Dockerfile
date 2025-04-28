FROM node:slim

WORKDIR /client/
COPY package*.json ./
RUN npm install
COPY . .

CMD ["npm", "start"]
EXPOSE 3010