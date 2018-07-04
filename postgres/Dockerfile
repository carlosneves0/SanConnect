FROM library/postgres
ENV POSTGRES_USER sanconnect
ENV POSTGRES_PASSWORD UbOKrlnAbJW3FqaiNlfve8jX6ZTCCOWn
ENV POSTGRES_DB sanconnect
COPY src/schema.sql /docker-entrypoint-initdb.d/0.sql
COPY src/mock.sql /docker-entrypoint-initdb.d/1.sql
