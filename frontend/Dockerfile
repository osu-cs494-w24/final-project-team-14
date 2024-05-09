FROM node:16-alpine as BUILD_IMAGE

WORKDIR /app/react-app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]