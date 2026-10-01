/* =============================================================================
   TCC 2x - TECNOSTAR (NUTRIGUIDE)
   Script de criação do banco de dados - SQL Server 2019+
   -----------------------------------------------------------------------------
   Domínio: plataforma de orientação nutricional
   (IMC, plano alimentar, acompanhamento e mensagens de contato)

   O modelo segue a base do protótipo (Usuario / RecuperarSenha / Mensagem)
   acrescida das entidades do domínio: PerfilNutricional, HistoricoPeso,
   Dieta, Refeicao, Alimento, RefeicaoAlimento e Acompanhamento.

   Login de teste (todas as senhas): 12345678
   ============================================================================= */

USE master
GO

IF EXISTS(select * from sys.databases where name='bd_tecnostar')
	DROP DATABASE bd_tecnostar
GO

-- CRIAR UM BANCO DE DADOS
CREATE DATABASE bd_tecnostar
GO

-- ACESSAR O BANCO DE DADOS
USE bd_tecnostar
GO

/* -----------------------------------------------------------------------------
   1) USUARIO - tabela base de autenticação (Login / CriarConta / PerfilUsuario)
   -------------------------------------------------------------------------- */
CREATE TABLE Usuario
(
   id              INT             IDENTITY,
   nome            VARCHAR(254)    NOT NULL,
   username        VARCHAR(255)    NOT NULL UNIQUE,
   password        VARCHAR(100)    NOT NULL, -- hash BCrypt
   nivelAcesso     VARCHAR(20)     NOT NULL DEFAULT 'USER', -- ADMIN, NUTRICIONISTA ou USER
   foto            VARBINARY(MAX)  NULL,
   dataCadastro    SMALLDATETIME   NOT NULL DEFAULT GETDATE(),
   dataAtualizacao SMALLDATETIME   NULL,
   statusUsuario   VARCHAR(20)     NOT NULL DEFAULT 'ATIVO', -- ATIVO, INATIVO ou TROCAR_SENHA

   PRIMARY KEY (id),
   CONSTRAINT chk_usuario_nivelAcesso CHECK (nivelAcesso IN ('ADMIN', 'NUTRICIONISTA', 'USER')),
   CONSTRAINT chk_usuario_status    CHECK (statusUsuario IN ('ATIVO', 'INATIVO', 'TROCAR_SENHA'))
);
GO

-- '$2a$10$Su2UIixHK/L2kAMDQAB1AusVsF6eEzwVoyU/hUBnQKtc78yGO0nzi' = 12345678
INSERT Usuario (nome, username, password, nivelAcesso, foto, dataCadastro, dataAtualizacao, statusUsuario)
VALUES ('Mariana Miranda de Brito', 'mariana@tecnostar.com.br', '$2a$10$Su2UIixHK/L2kAMDQAB1AusVsF6eEzwVoyU/hUBnQKtc78yGO0nzi', 'ADMIN', NULL, GETDATE(), NULL, 'ATIVO')
INSERT Usuario (nome, username, password, nivelAcesso, foto, dataCadastro, dataAtualizacao, statusUsuario)
VALUES ('Rafael Nutricionista', 'nutricionista@tecnostar.com.br', '$2a$10$Su2UIixHK/L2kAMDQAB1AusVsF6eEzwVoyU/hUBnQKtc78yGO0nzi', 'NUTRICIONISTA', NULL, GETDATE(), NULL, 'ATIVO')
INSERT Usuario (nome, username, password, nivelAcesso, foto, dataCadastro, dataAtualizacao, statusUsuario)
VALUES ('Beltrana de Sá', 'beltrana@email.com.br', '$2a$10$Su2UIixHK/L2kAMDQAB1AusVsF6eEzwVoyU/hUBnQKtc78yGO0nzi', 'USER', NULL, GETDATE(), NULL, 'ATIVO')
INSERT Usuario (nome, username, password, nivelAcesso, foto, dataCadastro, dataAtualizacao, statusUsuario)
VALUES ('Sicrana de Oliveira', 'sicrana@email.com.br', '$2a$10$Su2UIixHK/L2kAMDQAB1AusVsF6eEzwVoyU/hUBnQKtc78yGO0nzi', 'USER', NULL, GETDATE(), NULL, 'INATIVO')
INSERT Usuario (nome, username, password, nivelAcesso, foto, dataCadastro, dataAtualizacao, statusUsuario)
VALUES ('Ordnael Zurc', 'ordnael@email.com.br', '$2a$10$Su2UIixHK/L2kAMDQAB1AusVsF6eEzwVoyU/hUBnQKtc78yGO0nzi', 'USER', NULL, GETDATE(), NULL, 'ATIVO')
GO

/* -----------------------------------------------------------------------------
   2) RECUPERARSENHA - códigos de recuperação (Login -> "Esqueceu a senha?")
   -------------------------------------------------------------------------- */
CREATE TABLE RecuperarSenha
(
   id            INT             IDENTITY,
   usuarioId     INT             NOT NULL,
   email         VARCHAR(254)    NOT NULL, -- username do Usuario
   codigo        CHAR(6)         NOT NULL,
   geradoEm      SMALLDATETIME   NOT NULL DEFAULT GETDATE(),
   expiraEm      SMALLDATETIME   NOT NULL, -- expiração do código (ex.: 15 minutos)
   statusCodigo  BIT             NOT NULL DEFAULT 1, -- 1 = ATIVO ou 0 = INATIVO

   PRIMARY KEY (id),
   CONSTRAINT fk_recuperarsenha_usuario FOREIGN KEY (usuarioId) REFERENCES Usuario (id)
);
GO

INSERT RecuperarSenha (usuarioId, email, codigo, geradoEm, expiraEm, statusCodigo)
VALUES
	((SELECT id FROM Usuario WHERE username = 'beltrana@email.com.br'), 'beltrana@email.com.br', 'A1B2C3', GETDATE(), DATEADD(MINUTE, 15, GETDATE()), 1),
	((SELECT id FROM Usuario WHERE username = 'ordnael@email.com.br'), 'ordnael@email.com.br', 'D4E5F6', GETDATE(), DATEADD(MINUTE, 15, GETDATE()), 0)
GO

/* -----------------------------------------------------------------------------
   3) MENSAGEM - formulário de contato do site
   -------------------------------------------------------------------------- */
CREATE TABLE Mensagem
(
   id             INT             IDENTITY,
   dataMensagem   SMALLDATETIME   NOT NULL DEFAULT GETDATE(),
   emissor        VARCHAR(100)    NOT NULL,
   email          VARCHAR(254)    NOT NULL,
   telefone       VARCHAR(20)     NULL,
   texto          VARCHAR(400)    NOT NULL,
   dataAtualizacao SMALLDATETIME  NULL,
   statusMensagem VARCHAR(10)     NOT NULL DEFAULT 'ATIVO', -- ATIVO ou INATIVO

   PRIMARY KEY (id),
   CONSTRAINT chk_mensagem_status CHECK (statusMensagem IN ('ATIVO', 'INATIVO'))
);
GO

INSERT Mensagem (dataMensagem, emissor, email, telefone, texto, dataAtualizacao, statusMensagem)
VALUES (GETDATE(), 'Ordnael Zurc', 'ordnael@username.com', '(11) 98765-4123', 'Mensagem de teste', NULL, 'ATIVO')
INSERT Mensagem (dataMensagem, emissor, email, telefone, texto, dataAtualizacao, statusMensagem)
VALUES (GETDATE(), 'Maria Onete', 'maria@username.com', NULL, 'Segunda mensagem de teste', NULL, 'ATIVO')
GO

/* -----------------------------------------------------------------------------
   4) PERFILNUTRICIONAL - dados de saúde do usuário (PerfilUsuario / AcompNutri)
   -------------------------------------------------------------------------- */
CREATE TABLE PerfilNutricional
(
   id             INT             IDENTITY,
   usuarioId      INT             NOT NULL UNIQUE,
   sexo           VARCHAR(10)     NOT NULL, -- MASCULINO ou FEMININO
   idade          SMALLINT        NOT NULL,
   peso           DECIMAL(5,2)    NOT NULL, -- kg
   altura         DECIMAL(5,2)    NOT NULL, -- cm
   objetivo       VARCHAR(20)     NOT NULL, -- EMAGRECER, MANTER ou GANHAR_MASSA
   nivelAtividade VARCHAR(20)     NOT NULL DEFAULT 'LEVE', -- SEDENTARIO, LEVE, MODERADO ou INTENSO
   restricoes     VARCHAR(400)    NULL, -- alergias / preferências alimentares
   pesoMeta       DECIMAL(5,2)    NULL, -- kg
   metaAguaLitros DECIMAL(4,2)    NOT NULL DEFAULT 3.00, -- litros por dia
   dataAtualizacao SMALLDATETIME  NULL,

   PRIMARY KEY (id),
   CONSTRAINT fk_perfil_usuario      FOREIGN KEY (usuarioId)      REFERENCES Usuario (id),
   CONSTRAINT chk_perfil_sexo        CHECK (sexo IN ('MASCULINO', 'FEMININO')),
   CONSTRAINT chk_perfil_objetivo    CHECK (objetivo IN ('EMAGRECER', 'MANTER', 'GANHAR_MASSA')),
   CONSTRAINT chk_perfil_atividade   CHECK (nivelAtividade IN ('SEDENTARIO', 'LEVE', 'MODERADO', 'INTENSO')),
   CONSTRAINT chk_perfil_peso        CHECK (peso > 0),
   CONSTRAINT chk_perfil_altura      CHECK (altura > 0)
);
GO

/* -----------------------------------------------------------------------------
   5) HISTORICOPESO - evolução de peso e IMC (tabela do PerfilUsuario)
   -------------------------------------------------------------------------- */
CREATE TABLE HistoricoPeso
(
   id             INT             IDENTITY,
   usuarioId      INT             NOT NULL,
   peso           DECIMAL(5,2)    NOT NULL, -- kg
   imc            DECIMAL(5,2)    NULL, -- calculado: peso / (altura em m ^ 2)
   classificacao  VARCHAR(20)     NULL, -- ABAIXO_PESO, PESO_NORMAL, SOBREPESO, OBESIDADE_I, II ou III
   dataMedicao    SMALLDATETIME   NOT NULL DEFAULT GETDATE(),

   PRIMARY KEY (id),
   CONSTRAINT fk_historico_usuario FOREIGN KEY (usuarioId) REFERENCES Usuario (id),
   CONSTRAINT chk_historico_peso   CHECK (peso > 0)
);
GO

INSERT HistoricoPeso (usuarioId, peso, imc, classificacao, dataMedicao)
VALUES
	((SELECT id FROM Usuario WHERE username = 'beltrana@email.com.br'), 78.00, 28.61, 'SOBREPESO',       DATEADD(DAY, -30, GETDATE())),
	((SELECT id FROM Usuario WHERE username = 'beltrana@email.com.br'), 77.00, 28.24, 'SOBREPESO',       DATEADD(DAY, -22, GETDATE())),
	((SELECT id FROM Usuario WHERE username = 'beltrana@email.com.br'), 76.00, 27.89, 'SOBREPESO',       DATEADD(DAY, -14, GETDATE())),
	((SELECT id FROM Usuario WHERE username = 'beltrana@email.com.br'), 75.00, 27.55, 'SOBREPESO',       DATEADD(DAY,  -7, GETDATE())),
	((SELECT id FROM Usuario WHERE username = 'ordnael@email.com.br'), 82.50, 25.15, 'SOBREPESO',       DATEADD(DAY, -15, GETDATE()))
GO

INSERT PerfilNutricional (usuarioId, sexo, idade, peso, altura, objetivo, nivelAtividade, restricoes, pesoMeta, metaAguaLitros, dataAtualizacao)
VALUES
	((SELECT id FROM Usuario WHERE username = 'beltrana@email.com.br'), 'FEMININO', 30, 75.00, 165.00, 'EMAGRECER', 'LEVE', 'Sem restrições alimentares', 70.00, 3.00, GETDATE()),
	((SELECT id FROM Usuario WHERE username = 'ordnael@email.com.br'), 'MASCULINO', 28, 82.50, 181.00, 'GANHAR_MASSA', 'MODERADO', 'Intolerante a lactose', 88.00, 3.50, GETDATE())
GO

/* -----------------------------------------------------------------------------
   6) DIETA - plano alimentar gerado (entidade Dieta.java / tela PlanoAlimentar)
   -------------------------------------------------------------------------- */
CREATE TABLE Dieta
(
   id              INT             IDENTITY,
   usuarioId       INT             NOT NULL, -- usuário dono do plano
   nome            VARCHAR(120)    NOT NULL,
   descricao       VARCHAR(400)    NULL,
   duracaoDias     SMALLINT        NOT NULL DEFAULT 7,
   caloriasDiarias SMALLINT        NOT NULL, -- kcal/dia
   proteinas       DECIMAL(6,2)    NULL, -- g/dia
   carboidratos    DECIMAL(6,2)    NULL, -- g/dia
   gorduras        DECIMAL(6,2)    NULL, -- g/dia
   nivel           VARCHAR(20)     NOT NULL DEFAULT 'BASICO', -- BASICO, INTERMEDIARIO ou AVANCADO
   statusDieta     VARCHAR(20)     NOT NULL DEFAULT 'ATIVA', -- ATIVA, CONCLUIDA ou INATIVA
   dataGeracao     SMALLDATETIME   NOT NULL DEFAULT GETDATE(),

   PRIMARY KEY (id),
   CONSTRAINT fk_dieta_usuario FOREIGN KEY (usuarioId) REFERENCES Usuario (id),
   CONSTRAINT chk_dieta_nivel  CHECK (nivel IN ('BASICO', 'INTERMEDIARIO', 'AVANCADO')),
   CONSTRAINT chk_dieta_status CHECK (statusDieta IN ('ATIVA', 'CONCLUIDA', 'INATIVA')),
   CONSTRAINT chk_dieta_calorias CHECK (caloriasDiarias > 0)
);
GO

/* -----------------------------------------------------------------------------
   7) REFEICAO - refeições do dia (Café da manhã, Almoço, Lanche, Jantar...)
   -------------------------------------------------------------------------- */
CREATE TABLE Refeicao
(
   id        INT             IDENTITY,
   dietaId   INT             NOT NULL,
   titulo    VARCHAR(60)     NOT NULL,
   horario   CHAR(5)         NOT NULL, -- HH:mm
   ordem     SMALLINT        NOT NULL DEFAULT 1,

   PRIMARY KEY (id),
   CONSTRAINT fk_refeicao_dieta FOREIGN KEY (dietaId) REFERENCES Dieta (id) ON DELETE CASCADE
);
GO

/* -----------------------------------------------------------------------------
   8) ALIMENTO - cardápio de alimentos
   -------------------------------------------------------------------------- */
CREATE TABLE Alimento
(
   id            INT             IDENTITY,
   nome          VARCHAR(120)    NOT NULL,
   quantidade    VARCHAR(60)     NULL, -- ex.: 150g, 2 fatias, 1 unidade
   calorias      SMALLINT        NULL, -- kcal por porção

   PRIMARY KEY (id)
);
GO

/* -----------------------------------------------------------------------------
   9) REFEICAOALIMENTO - relação N:N entre Refeicao e Alimento
   -------------------------------------------------------------------------- */
CREATE TABLE RefeicaoAlimento
(
   refeicaoId INT NOT NULL,
   alimentoId INT NOT NULL,

   PRIMARY KEY (refeicaoId, alimentoId),
   CONSTRAINT fk_refeicao_alimento_refeicao FOREIGN KEY (refeicaoId) REFERENCES Refeicao (id) ON DELETE CASCADE,
   CONSTRAINT fk_refeicao_alimento_alimento FOREIGN KEY (alimentoId) REFERENCES Alimento (id)
);
GO

/* -----------------------------------------------------------------------------
   10) ACOMPANHAMENTO - registro diário de metas (tela DashboardCliente)
   -------------------------------------------------------------------------- */
CREATE TABLE Acompanhamento
(
   id                  INT             IDENTITY,
   usuarioId           INT             NOT NULL,
   dietaId             INT             NULL,
   dataAcompanhamento  DATE            NOT NULL DEFAULT CAST(GETDATE() AS DATE),
   pesoRegistrado      DECIMAL(5,2)    NULL, -- kg
   imc                 DECIMAL(5,2)    NULL,
   caloriasConsumidas  SMALLINT        NOT NULL DEFAULT 0,
   aguaConsumida       DECIMAL(4,2)    NOT NULL DEFAULT 0.00, -- litros
   statusAcompanhamento VARCHAR(20)    NOT NULL DEFAULT 'ATIVO', -- ATIVO ou INATIVO

   PRIMARY KEY (id),
   CONSTRAINT fk_acompanhamento_usuario FOREIGN KEY (usuarioId) REFERENCES Usuario (id),
   CONSTRAINT fk_acompanhamento_dieta   FOREIGN KEY (dietaId)   REFERENCES Dieta (id),
   CONSTRAINT chk_acompanhamento_status  CHECK (statusAcompanhamento IN ('ATIVO', 'INATIVO')),
   CONSTRAINT uq_acompanhamento_dia UNIQUE (usuarioId, dataAcompanhamento)
);
GO

-- ALIMENTOS
INSERT Alimento (nome, quantidade, calorias) VALUES
	('Ovos mexidos',        '3 unidades',  215),
	('Pão integral',        '2 fatias',    140),
	('Banana',              '1 unidade',   105),
	('Iogurte natural',      '1 pote',      120),
	('Castanhas',           '30g',          180),
	('Frango grelhado',     '150g',        248),
	('Arroz integral',      '100g',        124),
	('Feijão',              '80g',          76),
	('Salada verde',        '1 prato',       35),
	('Aveia',               '40g',         150),
	('Pasta de amendoim',   '1 colher',    190),
	('Peixe grelhado',      '150g',        180),
	('Batata-doce',         '150g',        129),
	('Legumes cozidos',     '1 prato',      90)
GO

-- DIETAS
INSERT Dieta (usuarioId, nome, descricao, duracaoDias, caloriasDiarias, proteinas, carboidratos, gorduras, nivel, statusDieta, dataGeracao)
VALUES
	((SELECT id FROM Usuario WHERE username = 'beltrana@email.com.br'),
	 'Plano Deficit 2200 kcal', 'Plano para emagrecimento com déficit calórico moderado', 30, 2200, 180.00, 220.00, 65.00, 'INTERMEDIARIO', 'ATIVA', GETDATE()),
	((SELECT id FROM Usuario WHERE username = 'ordnael@email.com.br'),
	 'Plano Hipertrofia 2800 kcal', 'Plano de ganho de massa muscular sem lactose', 45, 2800, 200.00, 300.00, 80.00, 'AVANCADO', 'ATIVA', GETDATE())
GO

-- REFEICOES (dieta 1 = Plano Deficit)
INSERT Refeicao (dietaId, titulo, horario, ordem)
VALUES
	((SELECT TOP 1 id FROM Dieta ORDER BY id), 'Café da Manhã',    '07:00', 1),
	((SELECT TOP 1 id FROM Dieta ORDER BY id), 'Lanche da Manhã',  '10:00', 2),
	((SELECT TOP 1 id FROM Dieta ORDER BY id), 'Almoço',           '13:00', 3),
	((SELECT TOP 1 id FROM Dieta ORDER BY id), 'Lanche da Tarde',  '16:00', 4),
	((SELECT TOP 1 id FROM Dieta ORDER BY id), 'Jantar',           '20:00', 5)
GO

-- REFEICAO x ALIMENTO (usa SELECT por nome para manter o script legível)
INSERT RefeicaoAlimento (refeicaoId, alimentoId)
SELECT r.id, a.id
FROM (VALUES
	('Café da Manhã',   'Ovos mexidos'),
	('Café da Manhã',   'Pão integral'),
	('Café da Manhã',   'Banana'),
	('Lanche da Manhã', 'Iogurte natural'),
	('Lanche da Manhã', 'Castanhas'),
	('Almoço',          'Frango grelhado'),
	('Almoço',          'Arroz integral'),
	('Almoço',          'Feijão'),
	('Almoço',          'Salada verde'),
	('Lanche da Tarde', 'Banana'),
	('Lanche da Tarde', 'Aveia'),
	('Lanche da Tarde', 'Pasta de amendoim'),
	('Jantar',          'Peixe grelhado'),
	('Jantar',          'Batata-doce'),
	('Jantar',          'Legumes cozidos')
) AS vinculo (tituloRefeicao, nomeAlimento)
JOIN Refeicao r ON r.titulo = vinculo.tituloRefeicao
JOIN Alimento a ON a.nome   = vinculo.nomeAlimento
GO

-- ACOMPANHAMENTO
INSERT Acompanhamento (usuarioId, dietaId, dataAcompanhamento, pesoRegistrado, imc, caloriasConsumidas, aguaConsumida, statusAcompanhamento)
VALUES
	((SELECT id FROM Usuario WHERE username = 'beltrana@email.com.br'), (SELECT TOP 1 id FROM Dieta ORDER BY id), DATEADD(DAY, -1, CAST(GETDATE() AS DATE)), 75.40, 27.68, 1850, 2.00, 'ATIVO'),
	((SELECT id FROM Usuario WHERE username = 'beltrana@email.com.br'), (SELECT TOP 1 id FROM Dieta ORDER BY id), CAST(GETDATE() AS DATE),                        75.00, 27.55, 1500, 1.50, 'ATIVO')
GO

/* =============================================================================
   CONSULTAS DE VERIFICAÇÃO
   ============================================================================= */
SELECT * FROM Usuario
SELECT * FROM RecuperarSenha
SELECT * FROM Mensagem
SELECT * FROM PerfilNutricional
SELECT * FROM HistoricoPeso
SELECT * FROM Dieta
SELECT * FROM Refeicao
SELECT * FROM Alimento
SELECT * FROM RefeicaoAlimento
SELECT * FROM Acompanhamento
GO

-- CARDÁPIO COMPLETO DO PLANO (dieta 1)
SELECT d.nome AS dieta, r.titulo AS refeicao, r.horario, a.nome AS alimento, a.quantidade, a.calorias
FROM Dieta d
JOIN Refeicao r          ON r.dietaId = d.id
JOIN RefeicaoAlimento ra ON ra.refeicaoId = r.id
JOIN Alimento a          ON a.id = ra.alimentoId
WHERE d.id = 1
ORDER BY r.ordem, a.nome;
GO

