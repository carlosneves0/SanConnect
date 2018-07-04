#!/bin/sh
docker stop sanconnect-postgres-dev && docker rm sanconnect-postgres-dev
cd ../postgres && \
docker build -t sanconnect-postgres-dev . && \
docker run --name sanconnect-postgres-dev -p 5432:5432 -d sanconnect-postgres-dev
