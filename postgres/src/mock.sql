INSERT INTO _USER VALUES ('bruno@sanconnect.br', '$2b$10$qAwN6tVB2kEwlqW56giYt./UW80sEWCWKQcB0xn.VBSQXR12gUEqa', 'Bruno', NULL, NULL, DEFAULT, DEFAULT);
INSERT INTO _USER VALUES ('carlos@sanconnect.br', '$2b$10$qAwN6tVB2kEwlqW56giYt./UW80sEWCWKQcB0xn.VBSQXR12gUEqa', 'Carlos', NULL, NULL, DEFAULT, DEFAULT);
INSERT INTO _USER VALUES ('andre@sanconnect.br', '$2b$10$qAwN6tVB2kEwlqW56giYt./UW80sEWCWKQcB0xn.VBSQXR12gUEqa', 'André', NULL, NULL, DEFAULT, DEFAULT);
INSERT INTO _USER VALUES ('menegali@sanconnect.br', '$2b$10$qAwN6tVB2kEwlqW56giYt./UW80sEWCWKQcB0xn.VBSQXR12gUEqa', 'Menegali', NULL, NULL, DEFAULT, DEFAULT);
INSERT INTO _USER VALUES ('guilherme@sanconnect.br', '$2b$10$qAwN6tVB2kEwlqW56giYt./UW80sEWCWKQcB0xn.VBSQXR12gUEqa', 'Guilherme', NULL, NULL, DEFAULT, DEFAULT);
INSERT INTO _USER VALUES ('vitor@sanconnect.br', '$2b$10$qAwN6tVB2kEwlqW56giYt./UW80sEWCWKQcB0xn.VBSQXR12gUEqa', 'Vitor', NULL, NULL, DEFAULT, DEFAULT);

INSERT INTO EVENT VALUES ('bruno@sanconnect.br', 'Campeonato de Xadrez', TO_TIMESTAMP('2018-07-07 21:00:00', 'YYYY-MM-DD HH24:MI:SS'), 'Partida de Xadrez no ICMC\nDescrição...', 2, 2, NOW(), 'Biblioteca do ICMC');
INSERT INTO EVENT VALUES ('vitor@sanconnect.br', 'D&D', TO_TIMESTAMP('2018-07-07 21:00:00', 'YYYY-MM-DD HH24:MI:SS'), 'D&D no ICMC\nDescrição...', 2, 2, NOW(), 'Biblioteca do ICMC');
INSERT INTO EVENT VALUES ('andre@sanconnect.br', 'Bingo', TO_TIMESTAMP('2018-07-07 21:00:00', 'YYYY-MM-DD HH24:MI:SS'), 'Bingo no ICMC\nDescrição...', 2, 2, NOW(), 'Biblioteca do ICMC');
INSERT INTO EVENT VALUES ('menegali@sanconnect.br', 'Roleta Russa', TO_TIMESTAMP('2018-07-07 21:00:00', 'YYYY-MM-DD HH24:MI:SS'), 'Roleta Russa no ICMC\nDescrição...', 2, 2, NOW(), 'Biblioteca do ICMC');
INSERT INTO EVENT VALUES ('carlos@sanconnect.br', 'Truco', TO_TIMESTAMP('2018-07-07 21:00:00', 'YYYY-MM-DD HH24:MI:SS'), 'Truco no ICMC\nDescrição...', 2, 2, NOW(), 'Biblioteca do ICMC');
INSERT INTO EVENT VALUES ('guilherme@sanconnect.br', 'CS 1.6', TO_TIMESTAMP('2018-07-07 21:00:00', 'YYYY-MM-DD HH24:MI:SS'), 'CS 1.6 no ICMC\nDescrição...', 2, 2, NOW(), 'Biblioteca do ICMC');

INSERT INTO CATEGORY VALUES ('Jogos');
INSERT INTO CATEGORY VALUES ('Jogos de Tabuleiro');
INSERT INTO CATEGORY VALUES ('Jogos de Cartas');
INSERT INTO CATEGORY VALUES ('FPS');
INSERT INTO CATEGORY VALUES ('Esportes');

INSERT INTO EVENT_CATEGORY VALUES ('Jogos', 'bruno@sanconnect.br', 'Campeonato de Xadrez', TO_TIMESTAMP('2018-07-07 21:00:00', 'YYYY-MM-DD HH24:MI:SS'));
INSERT INTO EVENT_CATEGORY VALUES ('Jogos', 'vitor@sanconnect.br', 'D&D', TO_TIMESTAMP('2018-07-07 21:00:00', 'YYYY-MM-DD HH24:MI:SS'));
INSERT INTO EVENT_CATEGORY VALUES ('Jogos de Tabuleiro', 'vitor@sanconnect.br', 'D&D', TO_TIMESTAMP('2018-07-07 21:00:00', 'YYYY-MM-DD HH24:MI:SS'));
INSERT INTO EVENT_CATEGORY VALUES ('Jogos', 'andre@sanconnect.br', 'Bingo', TO_TIMESTAMP('2018-07-07 21:00:00', 'YYYY-MM-DD HH24:MI:SS'));
INSERT INTO EVENT_CATEGORY VALUES ('Jogos', 'menegali@sanconnect.br', 'Roleta Russa', TO_TIMESTAMP('2018-07-07 21:00:00', 'YYYY-MM-DD HH24:MI:SS'));
INSERT INTO EVENT_CATEGORY VALUES ('Jogos', 'carlos@sanconnect.br', 'Truco', TO_TIMESTAMP('2018-07-07 21:00:00', 'YYYY-MM-DD HH24:MI:SS'));
INSERT INTO EVENT_CATEGORY VALUES ('Jogos de Cartas', 'carlos@sanconnect.br', 'Truco', TO_TIMESTAMP('2018-07-07 21:00:00', 'YYYY-MM-DD HH24:MI:SS'));
INSERT INTO EVENT_CATEGORY VALUES ('Jogos', 'guilherme@sanconnect.br', 'CS 1.6', TO_TIMESTAMP('2018-07-07 21:00:00', 'YYYY-MM-DD HH24:MI:SS'));
INSERT INTO EVENT_CATEGORY VALUES ('FPS', 'guilherme@sanconnect.br', 'CS 1.6', TO_TIMESTAMP('2018-07-07 21:00:00', 'YYYY-MM-DD HH24:MI:SS'));

INSERT INTO PARTICIPATES VALUES ('bruno@sanconnect.br', 'Campeonato de Xadrez', TO_TIMESTAMP('2018-07-07 21:00:00', 'YYYY-MM-DD HH24:MI:SS'), 'carlos@sanconnect.br', '1', NOW());
INSERT INTO PARTICIPATES VALUES ('bruno@sanconnect.br', 'Campeonato de Xadrez', TO_TIMESTAMP('2018-07-07 21:00:00', 'YYYY-MM-DD HH24:MI:SS'), 'andre@sanconnect.br', '1', NOW());
INSERT INTO PARTICIPATES VALUES ('bruno@sanconnect.br', 'Campeonato de Xadrez', TO_TIMESTAMP('2018-07-07 21:00:00', 'YYYY-MM-DD HH24:MI:SS'), 'menegali@sanconnect.br', '1', NOW());
INSERT INTO PARTICIPATES VALUES ('bruno@sanconnect.br', 'Campeonato de Xadrez', TO_TIMESTAMP('2018-07-07 21:00:00', 'YYYY-MM-DD HH24:MI:SS'), 'guilherme@sanconnect.br', '1', NOW());
INSERT INTO PARTICIPATES VALUES ('bruno@sanconnect.br', 'Campeonato de Xadrez', TO_TIMESTAMP('2018-07-07 21:00:00', 'YYYY-MM-DD HH24:MI:SS'), 'vitor@sanconnect.br', '1', NOW());

INSERT INTO PARTICIPATES VALUES ('carlos@sanconnect.br', 'Truco', TO_TIMESTAMP('2018-07-07 21:00:00', 'YYYY-MM-DD HH24:MI:SS'), 'bruno@sanconnect.br', '1', NOW());
INSERT INTO PARTICIPATES VALUES ('carlos@sanconnect.br', 'Truco', TO_TIMESTAMP('2018-07-07 21:00:00', 'YYYY-MM-DD HH24:MI:SS'), 'andre@sanconnect.br', '1', NOW());
INSERT INTO PARTICIPATES VALUES ('carlos@sanconnect.br', 'Truco', TO_TIMESTAMP('2018-07-07 21:00:00', 'YYYY-MM-DD HH24:MI:SS'), 'menegali@sanconnect.br', '1', NOW());
INSERT INTO PARTICIPATES VALUES ('carlos@sanconnect.br', 'Truco', TO_TIMESTAMP('2018-07-07 21:00:00', 'YYYY-MM-DD HH24:MI:SS'), 'guilherme@sanconnect.br', '1', NOW());
INSERT INTO PARTICIPATES VALUES ('carlos@sanconnect.br', 'Truco', TO_TIMESTAMP('2018-07-07 21:00:00', 'YYYY-MM-DD HH24:MI:SS'), 'vitor@sanconnect.br', '1', NOW());
