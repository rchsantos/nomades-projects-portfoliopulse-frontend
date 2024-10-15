FROM node:18-alpine

WORKDIR /app

COPY package*.json  ./

RUN yarn install

COPY . .

RUN yarn build

RUN yarn global add serve

CMD ["serve", "-s", "build"]

EXPOSE 3000
