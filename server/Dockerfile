FROM node:16.3.0-slim

LABEL version="1.0"

WORKDIR /app

COPY ["package*.json", "./"]
RUN npm install --production
COPY . .

expose 3001

CMD ["npm", "run", "dev"]