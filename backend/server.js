require('dotenv').config();

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();
const PORT = 3000;

// ===============================
// MIDDLEWARES
// ===============================

app.use(cors());
app.use(express.json());


// ===============================
// CONEXÃO COM MYSQL
// ===============================

const conexao = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

conexao.connect((erro) => {

    if (erro) {
        console.error("Erro ao conectar ao MySQL:", erro);
        return;
    }

    console.log("MySQL conectado com sucesso!");
});


// ===============================
// ROTA PRINCIPAL
// ===============================

app.get("/", (req, res) => {

    res.json({
        mensagem: "API do Login Form funcionando!"
    });

});


// ===============================
// CADASTRO
// ===============================

app.post("/api/cadastro", async (req, res) => {

    const { nome, email, senha } = req.body;

    console.log("API DE CADASTRO FOI CHAMADA!");

    console.log("Cadastro recebido:", {
        nome,
        email
    });

    try {

        // Criptografa a senha
        const senhaHash = await bcrypt.hash(senha, 10);

        const sql = `
            INSERT INTO usuarios (nome, email, senha)
            VALUES (?, ?, ?)
        `;

        conexao.query(
            sql,
            [nome, email, senhaHash],
            (erro, resultado) => {

                if (erro) {

                    console.error("Erro ao cadastrar:", erro);

                    return res.status(500).json({
                        sucesso: false,
                        mensagem: "Erro ao cadastrar usuário"
                    });

                }

                console.log("Usuário cadastrado no MySQL!");

                res.status(201).json({
                    sucesso: true,
                    mensagem: "Usuário cadastrado com sucesso!"
                });

            }
        );

    } catch (erro) {

        console.error("Erro ao criptografar senha:", erro);

        res.status(500).json({
            sucesso: false,
            mensagem: "Erro interno do servidor"
        });

    }

});


// ===============================
// LOGIN
// ===============================

app.post("/api/login", (req, res) => {

    const { email, senha } = req.body;

    console.log("API DE LOGIN FOI CHAMADA!");

    console.log("Login recebido:", {
        email
    });

    const sql = `
        SELECT *
        FROM usuarios
        WHERE email = ?
    `;

    conexao.query(
        sql,
        [email],
        async (erro, resultados) => {

            // Erro na consulta
            if (erro) {

                console.error("Erro ao buscar usuário:", erro);

                return res.status(500).json({
                    sucesso: false,
                    mensagem: "Erro interno do servidor"
                });

            }


            // Usuário não encontrado
            if (resultados.length === 0) {

                return res.status(401).json({
                    sucesso: false,
                    mensagem: "E-mail ou senha incorretos"
                });

            }


            // Usuário encontrado
            const usuario = resultados[0];


            // Comparar senha digitada
            // com o hash armazenado no MySQL
            const senhaCorreta = await bcrypt.compare(
                senha,
                usuario.senha
            );


            // Senha incorreta
            if (!senhaCorreta) {

                return res.status(401).json({
                    sucesso: false,
                    mensagem: "E-mail ou senha incorretos"
                });

            }


            // Login realizado
            console.log("Login realizado com sucesso!");


            res.json({
                sucesso: true,
                mensagem: "Login realizado com sucesso!",

                usuario: {
                    id: usuario.id,
                    nome: usuario.nome,
                    email: usuario.email
                }
            });

        }
    );

});


// ===============================
// INICIAR SERVIDOR
// ===============================

app.listen(PORT, () => {

    console.log(
        `Servidor rodando em http://localhost:${PORT}`
    );

});