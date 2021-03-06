postgres:
	(docker stop postgres-dev && docker rm postgres-dev) || true
	docker run --name postgres-dev -p 5432:5432 -d --rm postgres

postgres-stop:
	docker stop postgres-dev

deploy:
	docker-compose up --build
