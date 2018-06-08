FROM node:10.4.0
RUN mkdir /app
WORKDIR /app
COPY package.json /app/package.json
RUN npm install
COPY . /app
EXPOSE 4000
CMD [ "npm", "start" ]
