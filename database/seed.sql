-- ============================================================
-- LIFS - Laboratório de Interfaces e Filmes Semicondutores
-- Trabalho Individual II
-- Dados iniciais do sistema
-- ============================================================


-- ============================================================
-- MEMBROS
-- ============================================================

INSERT INTO membros
    (nome, tipo, situacao, imagem, lattes, orcid, email)
VALUES
(
    'José Roberto Ribeiro Bortoleto',
    'Docente chefe do grupo',
    'atual',
    'img/membros/bortoleto.JPG',
    'http://lattes.cnpq.br/0104980613925349',
    'https://orcid.org/0000-0003-4129-7819',
    'jose.rr.bortoleto@unesp.br'
),
(
    'Luiz Henrique Corrêa Monteiro',
    'Aluno de iniciação científica',
    'atual',
    'img/membros/rick.jpeg',
    'http://lattes.cnpq.br/0250660115526685',
    'https://orcid.org/0009-0005-1095-3221',
    'lh.monteiro@unesp.br'
),
(
    'Paulo Silas Oliveira',
    'Aluno de doutorado',
    'atual',
    'img/membros/paulo.jpg',
    'http://lattes.cnpq.br/8312977684358988',
    'https://orcid.org/0000-0001-8367-8287',
    'paulo.silas@unesp.br'
),
(
    'Raul Ramos',
    'Aluno de pós-doutorado',
    'atual',
    'img/membros/raul.jpg',
    'http://lattes.cnpq.br/4183764742951944',
    'https://orcid.org/0000-0002-6949-485X',
    'raul.ramos@unesp.br'
),
(
    'Anna Florkowska',
    'Aluna de intercâmbio',
    'atual',
    'img/membros/ania.JPG',
    NULL,
    NULL,
    NULL
),
(
    'Maja Poleczka',
    'Aluna de intercâmbio',
    'atual',
    'img/membros/none.jpg',
    NULL,
    NULL,
    NULL
);


-- ============================================================
-- MÁQUINAS
-- ============================================================

INSERT INTO maquinas
    (nome, fabricante, modelo, imagem, local, disponivel)
VALUES
(
    'Reator de baixa pressão 1',
    'Fabricação própria do laboratório',
    '--',
    'img/maquinas/R1.jpeg',
    'Lab LIFS',
    TRUE
),
(
    'Reator de baixa pressão 2',
    'Fabricação própria do laboratório',
    '--',
    'img/maquinas/R2.jpg',
    'Lab LIFS',
    TRUE
),
(
    'Microscópio de força atômica',
    'Park Systems',
    'XE-100',
    'img/maquinas/afm.jpg',
    'Lab LIFS',
    TRUE
),
(
    'Espectrômetro UVVIS',
    'Perkin Elmer',
    'ScanLambda 750',
    'img/maquinas/UVVIS.jpg',
    'Lab LIFS',
    TRUE
),
(
    'Quatro Pontas Elétricas Linear',
    'Fabricação própria do laboratório',
    'Special 4P',
    'img/maquinas/quatro_pontas.jpg',
    'Lab LIFS',
    TRUE
),
(
    'Fonte de Radiofrequência 13,56 MHz',
    'Tokyo High Power',
    'THP-13.56-1000',
    'img/maquinas/RF_generator.jpg',
    'Lab LIFS',
    TRUE
);