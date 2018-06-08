# SanConnect

## frontend

Got it all from [here](http://mherman.org/blog/2017/12/07/dockerizing-a-react-app/).

### frontend::installation

Install [docker](https://docs.docker.com/install/).

### frontend::development

```bash
cd frontend
docker-compose up -d --build
# Open http://localhost:3000/
# And to finish it off:
docker-compose stop
```

### frontend::test

Just get inside a development container and run:

```bash
npm run test
```

### frontend::production

```bash
docker-compose -f docker-compose.prod.yml up -d --build
# Open http://localhost/
# And to finish it off:
docker-compose stop
```

## backend

// TODO;
