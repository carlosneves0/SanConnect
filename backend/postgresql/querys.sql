/* Para visualizar todas as tabelas do banco. */
SELECT * FROM pg_catalog.pg_tables;

/* Visualiza toda as tableas de um determinado usuário do banco. */
SELECT * FROM pg_catalog.pg_tables WHERE tableowner = 'tzpzrrtr';

/* Remove um usuário específico do banco. */
DELETE FROM usuario WHERE nome = 'Bruno';

/* Insere um usuário na base de dados. */
INSERT INTO USUARIO VALUES('bruno@sanconnect.br', '$2b$10$qAwN6tVB2kEwlqW56giYt./UW80sEWCWKQcB0xn.VBSQXR12gUEqa', 'Bruno', NULL, NULL, DEFAULT, DEFAULT);
INSERT INTO USUARIO VALUES('carlos@sanconnect.br', '$2b$10$qAwN6tVB2kEwlqW56giYt./UW80sEWCWKQcB0xn.VBSQXR12gUEqa', 'Carlos', NULL, NULL, DEFAULT, DEFAULT);
INSERT INTO USUARIO VALUES('andre@sanconnect.br', '$2b$10$qAwN6tVB2kEwlqW56giYt./UW80sEWCWKQcB0xn.VBSQXR12gUEqa', 'André', NULL, NULL, DEFAULT, DEFAULT);