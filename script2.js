console.log("SCRIPT2 CARREGADO!");

const formulario = document.getElementById("cadastro-form");

formulario.addEventListener("submit", async (event) => {

    event.preventDefault();

    const nome = document.getElementById("firstname").value;
    const sobrenome = document.getElementById("lastname").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("password").value;
    const confirmarSenha = document.getElementById("Confirmpassword").value;

    if (senha !== confirmarSenha) {
        alert("As senhas não coincidem!");
        return;
    }

    try {

        const resposta = await fetch("http://localhost:3000/api/cadastro", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                nome: `${nome} ${sobrenome}`,
                email: email,
                senha: senha
            })
        });

        const resultado = await resposta.json();

        if (resultado.sucesso) {

            alert("Cadastro realizado com sucesso!");

            formulario.reset();

        } else {

            alert(resultado.mensagem);

        }

    } catch (erro) {

        console.error(erro);

        alert("Não foi possível conectar ao servidor.");

    }

});