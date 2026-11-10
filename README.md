# Login Form Full Stack

Sistema de cadastro e autenticação de usuários desenvolvido com HTML, CSS, JavaScript, Node.js, Express e MySQL.

## Sobre o projeto

O Login Form Full Stack é uma aplicação web que permite o cadastro de usuários, autenticação por login e acesso a um dashboard.

O projeto foi desenvolvido para praticar conceitos de desenvolvimento Front-End e Back-End, integração com banco de dados e segurança no armazenamento de senhas.

## Funcionalidades

- Cadastro de usuários.
- Login com validação de credenciais.
- Criptografia de senhas utilizando bcrypt.
- Integração com banco de dados MySQL.
- Dashboard após autenticação.
- Configuração de credenciais por variáveis de ambiente.

## Tecnologias utilizadas

**Front-End**
- HTML5
- CSS3
- JavaScript

**Back-End**
- Node.js
- Express
- MySQL
- bcrypt
- dotenv
- CORS

## Como executar

### 1. Clone o repositório

```bash
git clone https://github.com/sancheslcs/login-form-fullstack.git
```

### 2. Instale as dependências

```bash
cd login-form-fullstack/backend
npm install
```

### 3. Configure o ambiente

Crie uma cópia do arquivo `.env.example` com o nome `.env` e configure suas credenciais do MySQL.

### 4. Configure o banco de dados

Crie o banco de dados `login_form` no MySQL e a tabela de usuários conforme a estrutura utilizada no projeto.

### 5. Inicie o servidor

```bash
node server.js
```

O servidor estará disponível em `http://localhost:3000`.

### 6. Execute o Front-End

Abra a pasta do projeto no VS Code e utilize o Live Server para acessar a aplicação pelo navegador.

## Autor

**Lucas Pedrosa Sanches Eusebio**

[GitHub](https://github.com/sancheslcs)