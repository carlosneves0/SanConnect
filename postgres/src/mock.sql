INSERT INTO _USER VALUES ('bruno@sanconnect.br', '$2b$10$qAwN6tVB2kEwlqW56giYt./UW80sEWCWKQcB0xn.VBSQXR12gUEqa', 'Bruno', NULL, NULL, DEFAULT, DEFAULT);
INSERT INTO _USER VALUES ('carlos@sanconnect.br', '$2b$10$qAwN6tVB2kEwlqW56giYt./UW80sEWCWKQcB0xn.VBSQXR12gUEqa', 'Carlos', NULL, NULL, DEFAULT, DEFAULT);
INSERT INTO _USER VALUES ('andre@sanconnect.br', '$2b$10$qAwN6tVB2kEwlqW56giYt./UW80sEWCWKQcB0xn.VBSQXR12gUEqa', 'André', NULL, NULL, DEFAULT, DEFAULT);

INSERT INTO EVENT VALUES ('bruno@sanconnect.br', 'Partida de Xadrez', TO_TIMESTAMP('2018-07-07 21:00:00', 'YYYY-MM-DD HH24:MI:SS'), 'Xadrez no ICMC', 2, 2, NOW(), 'Biblioteca do ICMC');

INSERT INTO CATEGORY VALUES ('Jogos');

INSERT INTO EVENT_CATEGORY VALUES ('Jogos', 'bruno@sanconnect.br', 'Partida de Xadrez', TO_TIMESTAMP('2018-07-07 21:00:00', 'YYYY-MM-DD HH24:MI:SS'));
