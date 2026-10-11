\# API LIFS



Backend do sistema LIFS desenvolvido com Node.js, Express e PostgreSQL.



\## URL base



http://localhost:3000/api



\## Autenticação



As rotas protegidas utilizam JWT no cabeçalho:



Authorization: Bearer TOKEN



O token contém o ID e o perfil do usuário.



Perfis disponíveis:



\- ADMIN

\- MEMBRO



\---



\# Health Check



\## GET /api/health



Verifica a API e a conexão com o PostgreSQL.



Resposta 200:



{

&#x20; "success": true,

&#x20; "data": {

&#x20;   "status": "ok",

&#x20;   "message": "API LIFS funcionando",

&#x20;   "database": "lifs\_db",

&#x20;   "databaseStatus": "connected",

&#x20;   "timestamp": "..."

&#x20; }

}



\---



\# Autenticação



\## POST /api/auth/login



Realiza login.



Limite: 5 tentativas a cada 15 minutos por IP.



Body:



{

&#x20; "email": "membro@lifs.local",

&#x20; "password": "SENHA"

}



Resposta 200:



{

&#x20; "success": true,

&#x20; "data": {

&#x20;   "token": "JWT",

&#x20;   "user": {

&#x20;     "id": 2,

&#x20;     "nome": "Membro LIFS",

&#x20;     "email": "membro@lifs.local",

&#x20;     "perfil": "MEMBRO"

&#x20;   }

&#x20; }

}



Possíveis erros:



\- 400 VALIDATION\_ERROR

\- 401 INVALID\_CREDENTIALS

\- 429 TOO\_MANY\_REQUESTS

\- 500 INTERNAL\_ERROR



\---



\## GET /api/auth/me



Requer autenticação.



Header:



Authorization: Bearer TOKEN



Resposta 200:



{

&#x20; "success": true,

&#x20; "data": {

&#x20;   "id": 2,

&#x20;   "nome": "Membro LIFS",

&#x20;   "email": "membro@lifs.local",

&#x20;   "perfil": "MEMBRO"

&#x20; }

}



Possíveis erros:



\- 401 UNAUTHORIZED

\- 500 INTERNAL\_ERROR



\---



\## POST /api/auth/logout



Requer autenticação.



Como a autenticação utiliza JWT stateless, o cliente deve remover o token armazenado.



Resposta 200:



{

&#x20; "success": true,

&#x20; "data": {

&#x20;   "message": "Logout realizado com sucesso."

&#x20; }

}



\---



\## GET /api/auth/admin-check



Rota de verificação de autorização ADMIN.



Requer:



Authorization: Bearer TOKEN



Somente ADMIN.



Resposta 200:



{

&#x20; "success": true,

&#x20; "data": {

&#x20;   "message": "Acesso de administrador autorizado."

&#x20; }

}



Possíveis erros:



\- 401 UNAUTHORIZED

\- 403 FORBIDDEN



\---



\# Trabalhos



\## GET /api/trabalhos



Rota pública.



Lista todos os trabalhos.



Resposta 200:



{

&#x20; "success": true,

&#x20; "data": \[]

}



\---



\## GET /api/trabalhos/:id



Rota pública.



Exemplo:



GET /api/trabalhos/1



Possíveis respostas:



\- 200 sucesso

\- 400 VALIDATION\_ERROR

\- 404 NOT\_FOUND

\- 500 INTERNAL\_ERROR



\---



\## POST /api/trabalhos



Cria um trabalho.



Requer autenticação.



Body:



{

&#x20; "titulo": "Título do trabalho",

&#x20; "autores": "Autor 1, Autor 2",

&#x20; "ano": 2026,

&#x20; "tipo": "congresso",

&#x20; "arquivo": "arquivo.pdf"

}



Campos obrigatórios:



\- titulo

\- autores

\- ano

\- tipo



`arquivo` é opcional.



Resposta:



\- 201 sucesso



Possíveis erros:



\- 400 VALIDATION\_ERROR

\- 401 UNAUTHORIZED

\- 500 INTERNAL\_ERROR



Entradas contendo tags HTML são rejeitadas pela validação.



\---



\## PUT /api/trabalhos/:id



Atualiza um trabalho.



Requer autenticação.



Regras:



\- ADMIN pode alterar qualquer trabalho.

\- MEMBRO pode alterar apenas trabalhos criados por ele.



Body:



{

&#x20; "titulo": "Título atualizado",

&#x20; "autores": "Autor",

&#x20; "ano": 2026,

&#x20; "tipo": "artigo",

&#x20; "arquivo": "arquivo.pdf"

}



Possíveis respostas:



\- 200 sucesso

\- 400 VALIDATION\_ERROR

\- 401 UNAUTHORIZED

\- 403 FORBIDDEN

\- 404 NOT\_FOUND

\- 500 INTERNAL\_ERROR



\---



\## DELETE /api/trabalhos/:id



Exclui um trabalho.



Requer autenticação.



Regras:



\- ADMIN pode excluir qualquer trabalho.

\- MEMBRO pode excluir apenas trabalhos criados por ele.



Resposta 200:



{

&#x20; "success": true,

&#x20; "data": {

&#x20;   "message": "Trabalho excluído com sucesso."

&#x20; }

}



Possíveis erros:



\- 400 VALIDATION\_ERROR

\- 401 UNAUTHORIZED

\- 403 FORBIDDEN

\- 404 NOT\_FOUND

\- 500 INTERNAL\_ERROR



\---



\# Segurança



O backend utiliza:



\- JWT para autenticação

\- bcrypt para hash e verificação de senhas

\- queries parametrizadas com PostgreSQL

\- express-validator

\- validação contra tags HTML/XSS

\- Helmet

\- CORS

\- Rate Limiting no login

\- controle de acesso ADMIN/MEMBRO

\- variáveis sensíveis em .env

\- logs com Winston



O arquivo `.env` não é versionado.



O arquivo `.env.example` contém apenas exemplos de configuração.



\---



\# Respostas de erro



Formato padrão:



{

&#x20; "success": false,

&#x20; "error": {

&#x20;   "code": "CODIGO\_DO\_ERRO",

&#x20;   "message": "Descrição do erro."

&#x20; }

}



Principais códigos:



\- VALIDATION\_ERROR

\- INVALID\_CREDENTIALS

\- UNAUTHORIZED

\- FORBIDDEN

\- NOT\_FOUND

\- TOO\_MANY\_REQUESTS

\- INTERNAL\_ERROR

\- DATABASE\_ERROR



\---



\# Testes automatizados



Frameworks:



\- Jest

\- Supertest



Executar:



npm test



Atualmente existem 5 testes automatizados cobrindo:



1\. Health check da API e banco.

2\. Rota inexistente.

3\. Login com email inválido.

4\. Acesso a rota protegida sem JWT.

5\. ID de trabalho inválido.

