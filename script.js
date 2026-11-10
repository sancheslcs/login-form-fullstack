// ===============================
// MOSTRAR / OCULTAR SENHA
// ===============================

const senha = document.getElementById("senha");

const toggle = document.getElementById("toggle-senha");

toggle.addEventListener("click", () => {

    if (senha.type === "password") {

        senha.type = "text";

        toggle.classList.replace("bx-hide", "bx-show");

    } else {

        senha.type = "password";

        toggle.classList.replace("bx-show", "bx-hide");

    }

});


// ===============================
// LOGIN
// ===============================

const formulario = document.getElementById("login-form");

formulario.addEventListener("submit", async (event) => {

    // Impede o formulário de recarregar a página
    event.preventDefault();


    // Pegar os dados digitados
    const email = document.getElementById("email").value;

    const senhaDigitada = document.getElementById("senha").value;


    try {

        // Enviar os dados para o Node.js
        const resposta = await fetch(
            "http://localhost:3000/api/login",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email: email,
                    senha: senhaDigitada
                })
            }
        );


        // Transformar resposta em JSON
        const resultado = await resposta.json();


        // ===============================
        // LOGIN CORRETO
        // ===============================

        if (resultado.sucesso) {

            alert("Login realizado com sucesso!");


            // Salvar os dados do usuário
            localStorage.setItem(
                "usuario",
                JSON.stringify(resultado.usuario)
            );


            // Ir para a dashboard
            window.location.href = "dashboard.html";

        }


        // ===============================
        // LOGIN INCORRETO
        // ===============================

        else {

            alert(resultado.mensagem);

        }


    } catch (erro) {

        console.error("Erro:", erro);

        alert("Não foi possível conectar ao servidor.");

    }

});