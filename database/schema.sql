-- ============================================================
-- LIFS 
-- Trabalho Individual II
-- Banco de dados PostgreSQL
-- ============================================================


-- ============================================================
-- TABELA: usuarios
-- Responsavel pela autenticacao e controle de acesso.
-- ============================================================

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha_hash VARCHAR(255) NOT NULL,
    perfil VARCHAR(20) NOT NULL
        CHECK (perfil IN ('ADMIN', 'MEMBRO', 'USUARIO')),
    ativo BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- ============================================================
-- TABELA: membros
-- Informacoes publicas dos integrantes do laboratorio.
-- ============================================================

CREATE TABLE membros (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    tipo VARCHAR(100) NOT NULL,
    situacao VARCHAR(50) NOT NULL,
    imagem VARCHAR(500),
    lattes VARCHAR(500),
    orcid VARCHAR(500),
    email VARCHAR(255) UNIQUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- ============================================================
-- TABELA: maquinas
-- Equipamentos disponiveis no laboratorio.
-- ============================================================

CREATE TABLE maquinas (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    fabricante VARCHAR(150),
    modelo VARCHAR(150),
    imagem VARCHAR(500),
    local VARCHAR(150),
    descricao TEXT,
    disponivel BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- ============================================================
-- TABELA: trabalhos
-- Trabalhos cientificos cadastrados no repositorio.
-- ============================================================

CREATE TABLE trabalhos (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(300) NOT NULL,
    autores TEXT NOT NULL,
    ano INTEGER NOT NULL
        CHECK (ano >= 1900 AND ano <= 2100),
    tipo VARCHAR(100) NOT NULL,
    arquivo VARCHAR(500),
    created_by INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_trabalhos_usuario
        FOREIGN KEY (created_by)
        REFERENCES usuarios(id)
        ON DELETE RESTRICT
);


-- ============================================================
-- TABELA: agendamentos
-- Reservas dos equipamentos do laboratorio.
-- ============================================================

CREATE TABLE agendamentos (
    id SERIAL PRIMARY KEY,
    maquina_id INTEGER NOT NULL,
    usuario_id INTEGER NOT NULL,
    nome VARCHAR(150) NOT NULL,
    instituicao VARCHAR(200) NOT NULL,
    resumo TEXT,
    data DATE NOT NULL,
    hora TIME NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'PENDENTE'
        CHECK (status IN ('PENDENTE', 'APROVADO', 'CANCELADO')),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_agendamentos_maquina
        FOREIGN KEY (maquina_id)
        REFERENCES maquinas(id)
        ON DELETE RESTRICT,

    CONSTRAINT fk_agendamentos_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id)
        ON DELETE RESTRICT,

    CONSTRAINT uq_agendamento_maquina_data_hora
        UNIQUE (maquina_id, data, hora)
);


-- ============================================================
-- INDICES
-- ============================================================

CREATE INDEX idx_trabalhos_ano
    ON trabalhos(ano);

CREATE INDEX idx_trabalhos_tipo
    ON trabalhos(tipo);

CREATE INDEX idx_agendamentos_data
    ON agendamentos(data);

CREATE INDEX idx_agendamentos_usuario
    ON agendamentos(usuario_id);

-- ============================================================
-- CONFIGURAÇÕES DE NOTIFICAÇÃO
-- ============================================================

CREATE TABLE configuracoes_notificacao (
    id SERIAL PRIMARY KEY,
    email_destino VARCHAR(255),
    email_ativo BOOLEAN NOT NULL DEFAULT FALSE,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);