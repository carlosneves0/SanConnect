# SanConnect

Software Engineering Project 2018 that aims to offer a micro events dissemination platform in order to integrate people with common interests and helps to make new friendships, originally designed for the city of São Carlos.

## Deploying to production

Install [docker](https://docs.docker.com/install/) and [docker-compose](https://docs.docker.com/compose/install/).

```bash
# You can also pass -d after "up" to run the stack in detached mode
docker-compose up --build
```

## Development and testing

Install [docker](https://docs.docker.com/install/) and [nvm](https://github.com/creationix/nvm). Then:

```bash
nvm install v10.4.0
npm install -g yarn
```

### frontend

```bash
cd frontend
yarn # will install all frontend's dependencies
yarn start
yarn test
```

### backend

```bash
make postgres
cd backend
yarn # will install all backend's dependencies
yarn start
yarn test
```

// TODO;
