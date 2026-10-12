# Site LIFS — Trabalho Individual II

<p align="center">
  <img src="https://img.shields.io/badge/UNESP-Sorocaba-1F4E79?style=for-the-badge&logo=academia&logoColor=white">
  <img src="https://img.shields.io/badge/SCOMP-Trabalho%20II-6C63FF?style=for-the-badge">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white">
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white">
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white">
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white">
</p>

<p align="center">
  Evolução full-stack do sistema web do <strong>Laboratório de Investigação de Filmes Semicondutores — LIFS</strong>,
  da <strong>UNESP — Instituto de Ciência e Tecnologia de Sorocaba</strong>.
</p>

---

## Sobre esta versão

O **Trabalho Individual II** evolui o frontend desenvolvido no Trabalho I para uma aplicação com **backend, banco de dados, autenticação, autorização e API REST**.

A primeira entrega permanece preservada na branch `main` e na tag `v1.0-trabalho1`. Esta branch, `trabalho-2`, concentra a evolução full-stack.

---

## Funcionalidades

### Área pública

- página inicial do laboratório;
- visualização de membros;
- visualização de máquinas e equipamentos;
- consulta ao repositório de trabalhos;
- filtros por tipo e ano;
- interface em português e inglês;
- tema claro e escuro.

### Área autenticada

- login com e-mail e senha;
- autenticação baseada em JWT;
- cadastro, edição e exclusão de trabalhos;
- página de conta do usuário;
- controle de acesso baseado em perfil;
- recursos de agendamento e notificações.

### Perfis de acesso

| Perfil | Permissões |
|---|---|
| `MEMBRO` | Pode cadastrar trabalhos e alterar/excluir os próprios registros |
| `ADMIN` | Pode administrar todos os trabalhos e acessar operações administrativas |

A autorização é validada pelo backend, independentemente dos controles exibidos na interface.

---

## Tecnologias

**Frontend:** HTML5 · CSS3 · JavaScript

**Backend:** Node.js · Express · PostgreSQL · `pg` · JWT · `bcrypt` · `express-validator` · `helmet` · `cors` · `express-rate-limit` · `winston`

**Testes:** Jest · Supertest

---

## Estrutura do projeto

```text
SCOM_1_LIFS_SITE/
├── Site/
│   ├── css/
│   ├── img/
│   ├── js/
│   ├── index.html
│   ├── login.html
│   ├── minha-conta.html
│   ├── membros.html
│   ├── maquinas.html
│   ├── repositorio.html
│   └── demais páginas HTML
├── backend/
│   ├── docs/
│   │   └── API.md
│   ├── scripts/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── repositories/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   └── validators/
│   ├── tests/
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── database/
│   ├── schema.sql
│   └── seed.sql
├── Relatorio/
├── .github/
├── .gitignore
└── README.md
```

> O frontend fica diretamente em `Site/`. A antiga duplicação `Site/site/` foi removida.

---

## Arquitetura

```text
Frontend
   │
   │ HTTP / JSON
   ▼
API REST
   │
   ▼
Routes
   │
   ▼
Middlewares
   │
   ▼
Controllers
   │
   ▼
Services / Repositories
   │
   ▼
PostgreSQL
```

As responsabilidades são separadas entre interface, aplicação, regras de acesso e persistência dos dados.

---

## Banco de dados

O sistema utiliza **PostgreSQL**, com o banco:

```text
lifs_db
```

Principais tabelas:

- `usuarios`
- `membros`
- `maquinas`
- `trabalhos`
- `agendamentos`

Estrutura:

```text
database/schema.sql
```

Dados iniciais:

```text
database/seed.sql
```

As consultas do backend utilizam parâmetros (`$1`, `$2`, etc.), evitando concatenação direta de valores em SQL.

---

## Configuração

### 1. Clonar e acessar a branch

```bash
git clone https://github.com/rick-12q/SCOM_1_LIFS_SITE.git
cd SCOM_1_LIFS_SITE
git checkout trabalho-2
```

### 2. Criar o PostgreSQL

Crie o banco:

```text
lifs_db
```

Execute, nesta ordem:

```text
database/schema.sql
database/seed.sql
```

Os scripts também podem ser executados pelo pgAdmin.

### 3. Configurar o backend

```bash
cd backend
npm install
```

No Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

No Linux/macOS:

```bash
cp .env.example .env
```

Configure o `.env`:

```dotenv
PORT=3000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=5432
DB_NAME=lifs_db
DB_USER=postgres
DB_PASSWORD=sua_senha_do_postgresql

JWT_SECRET=uma_chave_secreta_forte
JWT_EXPIRES_IN=1h

SEED_ADMIN_EMAIL=admin@lifs.local
SEED_ADMIN_PASSWORD=defina_uma_senha_forte

SEED_MEMBER_EMAIL=membro@lifs.local
SEED_MEMBER_PASSWORD=defina_uma_senha_forte
```

O arquivo `.env` real não deve ser enviado ao Git.

### 4. Criar usuários de autenticação

```bash
node scripts/seed-users.js
```

As senhas são definidas pelo `.env` e armazenadas utilizando hash com `bcrypt`.

### 5. Iniciar o backend

```bash
npm start
```

Para desenvolvimento:

```bash
npm run dev
```

API padrão:

```text
http://localhost:3000
```

Teste de saúde:

```text
GET http://localhost:3000/api/health
```

### 6. Executar o frontend

O frontend está em:

```text
Site/
```

Abra `Site/index.html` utilizando um servidor HTTP local, como a extensão **Live Server** do VS Code. O backend deve permanecer em execução na porta `3000`.

---

## API REST

Prefixo:

```text
/api
```

| Método | Endpoint | Acesso |
|---|---|---|
| GET | `/api/health` | Público |
| POST | `/api/auth/login` | Público |
| GET | `/api/auth/me` | Autenticado |
| POST | `/api/auth/logout` | Autenticado |
| GET | `/api/auth/admin-check` | ADMIN |
| GET | `/api/trabalhos` | Público |
| GET | `/api/trabalhos/:id` | Público |
| POST | `/api/trabalhos` | Autenticado |
| PUT | `/api/trabalhos/:id` | Autor ou ADMIN |
| DELETE | `/api/trabalhos/:id` | Autor ou ADMIN |

Documentação detalhada:

```text
backend/docs/API.md
```

---

## Autenticação e segurança

O login utiliza e-mail e senha e retorna um **JWT**. Rotas protegidas recebem:

```http
Authorization: Bearer TOKEN
```

O projeto também utiliza:

- hash de senhas com `bcrypt`;
- queries PostgreSQL parametrizadas;
- validação de entrada;
- proteção contra XSS;
- autorização por perfil e autoria;
- rate limiting no login;
- headers de segurança com `helmet`;
- JWT no header `Authorization`, evitando dependência de cookies de autenticação.

---

## Logs e testes

O backend utiliza `winston` para registrar eventos importantes. Arquivos locais de log ficam em `backend/logs/` e não são versionados.

Para executar os testes:

```bash
cd backend
npm test
```

A suíte utiliza **Jest** e **Supertest** para validar API, autenticação, acesso sem credenciais, identificadores inválidos e outros cenários.

---

## Evolução: Trabalho I → Trabalho II

| Trabalho I | Trabalho II |
|---|---|
| Frontend estático | Aplicação full-stack |
| LocalStorage | PostgreSQL |
| Login/protótipo local | Autenticação JWT |
| Dados no navegador | API REST |
| Interface e navegação | Backend em camadas |
| Protótipo de cadastro | CRUD persistente |
| — | Perfis ADMIN e MEMBRO |
| — | Segurança, logs e testes |

---

## Git

```text
main              → Trabalho Individual I
trabalho-2        → Trabalho Individual II
v1.0-trabalho1    → marco da primeira entrega
```

Essa estrutura mantém a separação das entregas sem perder o histórico do projeto.

---

## Uso de Inteligência Artificial

Ferramentas de Inteligência Artificial foram utilizadas como apoio em análise de código, estruturação do backend, depuração, documentação e revisão. As decisões, testes, integração e validação do sistema foram realizados durante o desenvolvimento do projeto.

---

## Autoria

**Luiz Henrique Corrêa Monteiro**  
Engenharia de Controle e Automação  
Instituto de Ciência e Tecnologia de Sorocaba — UNESP

Projeto desenvolvido para a disciplina **SCOMP — Sistemas Computacionais**.

## LIFS

**Laboratório de Investigação de Filmes Semicondutores — LIFS**  
**UNESP — Sorocaba**

<p align="center">
  <strong>LIFS • UNESP Sorocaba</strong><br>
  <em>Pesquisa, tecnologia e desenvolvimento.</em><br><br>
  Projeto desenvolvido em 2026
</p>
