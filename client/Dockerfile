FROM node:15.9.0

LABEL version="1.0"
LABEL description="This is the base docker image for Loving Sitters client side"

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install --production

COPY . .

expose 3000

CMD ["npm","start"]