INSERT INTO _USER VALUES ('bruno@sanconnect.br', '$2b$10$qAwN6tVB2kEwlqW56giYt./UW80sEWCWKQcB0xn.VBSQXR12gUEqa', 'Bruno', NULL, NULL, DEFAULT, DEFAULT);
INSERT INTO _USER VALUES ('carlos@sanconnect.br', '$2b$10$qAwN6tVB2kEwlqW56giYt./UW80sEWCWKQcB0xn.VBSQXR12gUEqa', 'Carlos', NULL, NULL, DEFAULT, DEFAULT);
INSERT INTO _USER VALUES ('andre@sanconnect.br', '$2b$10$qAwN6tVB2kEwlqW56giYt./UW80sEWCWKQcB0xn.VBSQXR12gUEqa', 'André', NULL, NULL, DEFAULT, DEFAULT);
INSERT INTO _USER VALUES ('menegali@sanconnect.br', '$2b$10$qAwN6tVB2kEwlqW56giYt./UW80sEWCWKQcB0xn.VBSQXR12gUEqa', 'Menegali', NULL, NULL, DEFAULT, DEFAULT);
INSERT INTO _USER VALUES ('guilherme@sanconnect.br', '$2b$10$qAwN6tVB2kEwlqW56giYt./UW80sEWCWKQcB0xn.VBSQXR12gUEqa', 'Guilherme', NULL, NULL, DEFAULT, DEFAULT);
INSERT INTO _USER VALUES ('vitor@sanconnect.br', '$2b$10$qAwN6tVB2kEwlqW56giYt./UW80sEWCWKQcB0xn.VBSQXR12gUEqa', 'Vitor', NULL, NULL, DEFAULT, DEFAULT);

INSERT INTO EVENT VALUES (DEFAULT, 'bruno@sanconnect.br', 'Campeonato de Xadrez', TO_TIMESTAMP('2018-07-07 21:00:00', 'YYYY-MM-DD HH24:MI:SS'), 'Partida de Xadrez no ICMC... Descrição...', 6, 6, NOW(), 'Biblioteca do ICMC');
INSERT INTO EVENT VALUES (DEFAULT, 'vitor@sanconnect.br', 'D&D', TO_TIMESTAMP('2018-07-07 21:00:00', 'YYYY-MM-DD HH24:MI:SS'), 'D&D no ICMC... Descrição...', 2, 2, NOW(), 'Biblioteca do ICMC');
INSERT INTO EVENT VALUES (DEFAULT, 'andre@sanconnect.br', 'Bingo', TO_TIMESTAMP('2018-07-07 21:00:00', 'YYYY-MM-DD HH24:MI:SS'), 'Bingo no ICMC... Descrição...', 2, 2, NOW(), 'Biblioteca do ICMC');
INSERT INTO EVENT VALUES (DEFAULT, 'menegali@sanconnect.br', 'Roleta Russa', TO_TIMESTAMP('2018-07-07 21:00:00', 'YYYY-MM-DD HH24:MI:SS'), 'Roleta Russa no ICMC... Descrição...', 2, 2, NOW(), 'Biblioteca do ICMC');
INSERT INTO EVENT VALUES (DEFAULT, 'carlos@sanconnect.br', 'Truco', TO_TIMESTAMP('2018-07-07 21:00:00', 'YYYY-MM-DD HH24:MI:SS'), 'Truco no ICMC... Descrição...', 6, 6, NOW(), 'Biblioteca do ICMC');
INSERT INTO EVENT VALUES (DEFAULT, 'guilherme@sanconnect.br', 'CS 1.6', TO_TIMESTAMP('2018-07-07 21:00:00', 'YYYY-MM-DD HH24:MI:SS'), 'CS 1.6 no ICMC... Descrição...', 2, 2, NOW(), 'Biblioteca do ICMC');
INSERT INTO EVENT VALUES (DEFAULT, 'bruno@sanconnect.br', 'Partida de Tênis de Mesa', TO_TIMESTAMP('2018:07:28 00:30:00', 'YYYY-MM-DD HH24:MI:SS'), 'Procura-se parceiro de jogo.', 2, 2, NOW(), 'ICMC');

INSERT INTO CATEGORY VALUES ('Jogos');
INSERT INTO CATEGORY VALUES ('Jogos de Tabuleiro');
INSERT INTO CATEGORY VALUES ('Jogos de Cartas');
INSERT INTO CATEGORY VALUES ('FPS');
INSERT INTO CATEGORY VALUES ('Esportes');

INSERT INTO EVENT_CATEGORY VALUES ('Jogos', 1);
INSERT INTO EVENT_CATEGORY VALUES ('Jogos', 2);
INSERT INTO EVENT_CATEGORY VALUES ('Jogos de Tabuleiro', 2);
INSERT INTO EVENT_CATEGORY VALUES ('Jogos', 3);
INSERT INTO EVENT_CATEGORY VALUES ('Jogos', 4);
INSERT INTO EVENT_CATEGORY VALUES ('Jogos', 5);
INSERT INTO EVENT_CATEGORY VALUES ('Jogos de Cartas', 5);
INSERT INTO EVENT_CATEGORY VALUES ('Jogos', 6);
INSERT INTO EVENT_CATEGORY VALUES ('FPS', 6);
INSERT INTO EVENT_CATEGORY VALUES ('Esportes', 7);

INSERT INTO PARTICIPATES VALUES (1, 'bruno@sanconnect.br', '1', NOW());
INSERT INTO PARTICIPATES VALUES (1, 'carlos@sanconnect.br', '1', NOW());
INSERT INTO PARTICIPATES VALUES (1, 'andre@sanconnect.br', '1', NOW());
INSERT INTO PARTICIPATES VALUES (1, 'menegali@sanconnect.br', '1', NOW());
INSERT INTO PARTICIPATES VALUES (1, 'guilherme@sanconnect.br', '1', NOW());
INSERT INTO PARTICIPATES VALUES (1, 'vitor@sanconnect.br', '1', NOW());

INSERT INTO PARTICIPATES VALUES (5, 'carlos@sanconnect.br', '1', NOW());
INSERT INTO PARTICIPATES VALUES (5, 'bruno@sanconnect.br', '1', NOW());
INSERT INTO PARTICIPATES VALUES (5, 'andre@sanconnect.br', '1', NOW());
INSERT INTO PARTICIPATES VALUES (5, 'menegali@sanconnect.br', '1', NOW());
INSERT INTO PARTICIPATES VALUES (5, 'guilherme@sanconnect.br', '1', NOW());
INSERT INTO PARTICIPATES VALUES (5, 'vitor@sanconnect.br', '1', NOW());

INSERT INTO PARTICIPATES VALUES (7, 'bruno@sanconnect.br', '1', NOW());
INSERT INTO PARTICIPATES VALUES (7, 'andre@sanconnect.br', '1', NOW());
INSERT INTO PARTICIPATES VALUES (7, 'carlos@sanconnect.br', '0', NOW());
INSERT INTO PARTICIPATES VALUES (7, 'guilherme@sanconnect.br', '0', NOW());

INSERT INTO PREFERENCE VALUES ('andre@sanconnect.br', 'Jogos', 0.3);
INSERT INTO PREFERENCE VALUES ('andre@sanconnect.br', 'Jogos de Tabuleiro', 0.9);
INSERT INTO PREFERENCE VALUES ('andre@sanconnect.br', 'Jogos de Cartas', 0.9);
INSERT INTO PREFERENCE VALUES ('andre@sanconnect.br', 'FPS', 0.8);
INSERT INTO PREFERENCE VALUES ('andre@sanconnect.br', 'Esportes', 0.4);
INSERT INTO PREFERENCE VALUES ('bruno@sanconnect.br', 'Jogos', 0.7);
INSERT INTO PREFERENCE VALUES ('bruno@sanconnect.br', 'Jogos de Tabuleiro', 0.9);
INSERT INTO PREFERENCE VALUES ('bruno@sanconnect.br', 'Jogos de Cartas', 0.7);
INSERT INTO PREFERENCE VALUES ('bruno@sanconnect.br', 'FPS', 0.7);
INSERT INTO PREFERENCE VALUES ('bruno@sanconnect.br', 'Esportes', 0.0);
INSERT INTO PREFERENCE VALUES ('carlos@sanconnect.br', 'Jogos', 0.9);
INSERT INTO PREFERENCE VALUES ('carlos@sanconnect.br', 'Jogos de Tabuleiro', 0.9);
INSERT INTO PREFERENCE VALUES ('carlos@sanconnect.br', 'Jogos de Cartas', 0.7);
INSERT INTO PREFERENCE VALUES ('carlos@sanconnect.br', 'FPS', 0.1);
INSERT INTO PREFERENCE VALUES ('carlos@sanconnect.br', 'Esportes', 0.5);
INSERT INTO PREFERENCE VALUES ('guilherme@sanconnect.br', 'Jogos', 0.7);
INSERT INTO PREFERENCE VALUES ('guilherme@sanconnect.br', 'Jogos de Tabuleiro', 0.7);
INSERT INTO PREFERENCE VALUES ('guilherme@sanconnect.br', 'Jogos de Cartas', 0.8);
INSERT INTO PREFERENCE VALUES ('guilherme@sanconnect.br', 'FPS', 0.4);
INSERT INTO PREFERENCE VALUES ('guilherme@sanconnect.br', 'Esportes', 1.0);
INSERT INTO PREFERENCE VALUES ('menegali@sanconnect.br', 'Jogos', 1.0);
INSERT INTO PREFERENCE VALUES ('menegali@sanconnect.br', 'Jogos de Tabuleiro', 0.1);
INSERT INTO PREFERENCE VALUES ('menegali@sanconnect.br', 'Jogos de Cartas', 0.9);
INSERT INTO PREFERENCE VALUES ('menegali@sanconnect.br', 'FPS', 0.3);
INSERT INTO PREFERENCE VALUES ('menegali@sanconnect.br', 'Esportes', 0.6);