# primeiraAPI

API de Gerenciamento de Clientes

Uma API RESTful para gerenciar clientes, conectando um formulário de frontend a um banco de dados. Desenvolvida com Fastify e TypeScript.

📋 Visão Geral

Esta API permite operações CRUD (Criar, Ler, Atualizar, Deletar) para gerenciar cadastros de clientes. Ela serve como backend para um formulário web, processando e armazenando dados em um banco de dados.

🚀 Tecnologias Utilizadas

Node.js

TypeScript

Fastify - Framework web rápido e de baixo overhead

Prisma (presumido) - ORM para acesso ao banco de dados

@fastify/cors - Middleware CORS para Fastify

📦 Estrutura do Projeto

api/

├── src/

│   ├── controllers/

│   │   ├── createrCustumerController.ts

│   │   ├── ListCustomersControllers.ts

│   │   └── DeleteCustomerControllers.ts

│   ├── services/

│   │   └── DeleteCustomerService.ts

│   ├── routes.ts

│   └── server.ts

├── prisma/

│   └── schema.prisma (presumido)

└── package.json
