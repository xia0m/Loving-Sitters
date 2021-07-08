FROM node:15.9.0

LABEL version="1.0"

WORKDIR /app

COPY ["package*.json", "./"]
RUN npm install --production
COPY . .

expose 3001

CMD ["npm", "run", "dev"]