// Recuperar os dados do usuário
const usuario = JSON.parse(localStorage.getItem("usuario"));

// Verificar se existe usuário logado
if (!usuario) {

    window.location.href = "index.html";

} else {

    // Nome no cabeçalho
    document.getElementById("nome-header").textContent =
        usuario.nome;

    // Saudação
    document.getElementById("nome-usuario").textContent =
        usuario.nome;

    // Nome no card
    document.getElementById("nome-card").textContent =
        usuario.nome;

    // E-mail no card
    document.getElementById("email-card").textContent =
        usuario.email;

}


// Botão sair
const btnSair = document.getElementById("btn-sair");

btnSair.addEventListener("click", () => {

    // Apagar usuário salvo
    localStorage.removeItem("usuario");

    // Voltar para login
    window.location.href = "index.html";

});