FROM node:12-alpine

COPY package*.json ./

RUN npm install

EXPOSE 4000

CMD ["npm", "run", "start"]
