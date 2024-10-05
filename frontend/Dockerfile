FROM node:21-alpine

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

EXPOSE 5173

ENV VITE_PORT=5173
ENV VITE_HOST=0.0.0.0

CMD ["npm","run","dev"]