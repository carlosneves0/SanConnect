CREATE TABLE USUARIO (
	EMAIL VARCHAR (64) NOT NULL,
	SALT VARCHAR (32) NOT NULL,
	HASH CHAR (60) NOT NULL,
	NOME VARCHAR (64) NOT NULL,
	DESCRICAO TEXT,
	FOTO BYTEA,
	LIKES INTEGER DEFAULT 0 NOT NULL,
	DISLIKES INTEGER DEFAULT 0 NOT NULL,
	CONSTRAINT PK_USUARIO_0 PRIMARY KEY (EMAIL),
	CONSTRAINT UK_USUARIO_0 UNIQUE (SALT),
	CONSTRAINT CK_USUARIO_0 CHECK (LIKES >= 0),
	CONSTRAINT CK_USUARIO_1 CHECK (DISLIKES >= 0),
	CONSTRAINT CK_USUARIO_2 CHECK (length(SALT) >= 8),
	CONSTRAINT CK_USUARIO_3 CHECK (EMAIL ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$')
);

CREATE TABLE EVENTO (
	CRIADOR VARCHAR (64) NOT NULL,
	TITULO VARCHAR (32) NOT NULL,
	DATA_HORA_EVENTO TIMESTAMP (0) NOT NULL,
	DESCRICAO TEXT,
	MIN_PARTICIPANTES SMALLINT DEFAULT 2 NOT NULL,
	MAX_PARTICIPANTES SMALLINT DEFAULT 0 NOT NULL,
	DATA_HORA_CRIACAO TIMESTAMP (0) NOT NULL,
	LOCAL VARCHAR (64),
	CONSTRAINT PK_EVENTO_0 PRIMARY KEY (CRIADOR, TITULO, DATA_HORA_EVENTO),
	CONSTRAINT FK_EVENTO_0 FOREIGN KEY (CRIADOR) REFERENCES USUARIO (EMAIL),
	CONSTRAINT CK_EVENTO_1 CHECK (MAX_PARTICIPANTES >= MIN_PARTICIPANTES OR MAX_PARTICIPANTES = 0),
	CONSTRAINT CK_EVENTO_4 CHECK (DATA_HORA_CRIACAO < DATA_HORA_EVENTO)
);

CREATE TABLE CATEGORIA (
	NOME VARCHAR (32) NOT NULL,
	CONSTRAINT PK_CATEGORIA_0 PRIMARY KEY (NOME)
);

CREATE TABLE PARTICIPA (
	CRIADOR_EVENTO VARCHAR (64) NOT NULL,
	TITULO_EVENTO VARCHAR (32) NOT NULL,
	DATA_HORA_EVENTO TIMESTAMP (0) NOT NULL,
	PARTICIPANTE VARCHAR (64) NOT NULL,
	CONFIRMACAO BOOLEAN DEFAULT '0',
	DATA_HORA_INGRESSO TIMESTAMP (0) NOT NULL,
	CONSTRAINT PK_PARTICIPA_0 PRIMARY KEY (CRIADOR_EVENTO, TITULO_EVENTO, DATA_HORA_EVENTO, PARTICIPANTE),
	CONSTRAINT FK_PARTICIPA_0 FOREIGN KEY (CRIADOR_EVENTO, TITULO_EVENTO, DATA_HORA_EVENTO) 
		REFERENCES EVENTO(CRIADOR, TITULO, DATA_HORA_EVENTO),
	CONSTRAINT FK_PARTICIPA_1 FOREIGN KEY (PARTICIPANTE) REFERENCES USUARIO (EMAIL),
	CONSTRAINT CK_PARTICIPA_0 CHECK (DATA_HORA_INGRESSO < DATA_HORA_EVENTO)
);

CREATE TABLE AVALIA (
	AVALIADOR VARCHAR (64) NOT NULL,
	AVALIADO VARCHAR (64) NOT NULL,
	CRIADOR_EVENTO VARCHAR (64) NOT NULL,
	TITULO_EVENTO VARCHAR (32) NOT NULL,
	DATA_HORA_EVENTO TIMESTAMP (0) NOT NULL,
	VALOR SMALLINT NOT NULL,
	CONSTRAINT PK_AVALIA_0 PRIMARY KEY (AVALIADOR, AVALIADO, CRIADOR_EVENTO, TITULO_EVENTO, DATA_HORA_EVENTO),
	CONSTRAINT FK_AVALIA_0 FOREIGN KEY (AVALIADOR, CRIADOR_EVENTO, TITULO_EVENTO, DATA_HORA_EVENTO)
		REFERENCES PARTICIPA (PARTICIPANTE, CRIADOR_EVENTO, TITULO_EVENTO, DATA_HORA_EVENTO),
	CONSTRAINT FK_AVALIA_1 FOREIGN KEY (AVALIADO, CRIADOR_EVENTO, TITULO_EVENTO, DATA_HORA_EVENTO)
		REFERENCES PARTICIPA (PARTICIPANTE, CRIADOR_EVENTO, TITULO_EVENTO, DATA_HORA_EVENTO),
	CONSTRAINT CK_AVALIA_0 CHECK (VALOR IN (-1, 1)),
	CONSTRAINT CK_AVALIA_1 CHECK (AVALIADOR <> AVALIADO)
);

CREATE TABLE EVENTO_CATEGORIA (
	CATEGORIA VARCHAR (32) NOT NULL,
	CRIADOR_EVENTO VARCHAR (64) NOT NULL,
	TITULO_EVENTO VARCHAR (32) NOT NULL,
	DATA_HORA_EVENTO TIMESTAMP (0) NOT NULL,
	CONSTRAINT PK_EVENTO_CATEGORIA_0 PRIMARY KEY (CATEGORIA, CRIADOR_EVENTO, TITULO_EVENTO, DATA_HORA_EVENTO),
	CONSTRAINT FK_EVENTO_CATEGORIA_0 FOREIGN KEY (CATEGORIA) REFERENCES CATEGORIA (NOME),
	CONSTRAINT FK_EVENTO_CATEGORIA_1 FOREIGN KEY (CRIADOR_EVENTO, TITULO_EVENTO, DATA_HORA_EVENTO)
		REFERENCES EVENTO (CRIADOR, TITULO, DATA_HORA_EVENTO)
);

CREATE TABLE PREFERENCIA (
	USUARIO VARCHAR (64) NOT NULL,
	CATEGORIA VARCHAR (32) NOT NULL,
	ESCALA REAL DEFAULT 0,
	CONSTRAINT PK_PREFERENCIA_0 PRIMARY KEY (USUARIO, CATEGORIA),
	CONSTRAINT FK_PREFERENCIA_0 FOREIGN KEY (USUARIO) REFERENCES USUARIO (EMAIL),
	CONSTRAINT FK_PREFERENCIA_1 FOREIGN KEY (CATEGORIA) REFERENCES CATEGORIA (NOME),
	CONSTRAINT CK_PREFERENCIA_0 CHECK (ESCALA >= 0 AND ESCALA <= 1)
);