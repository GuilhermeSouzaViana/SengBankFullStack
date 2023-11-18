fetch("http://localhost:8080/usuario/listar")
.then(response => response.json())
.then(data => {
    let dadosUsuario = document.getElementById("dadosUsuario");

    data.forEach(usuario => {
        const salarioB = usuario.salarioBase.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });

        let listItem = document.createElement("li");
        listItem.innerHTML = `<section>
    <p>Conta: ${usuario.codigo}</p>
    <p>Agencia: ${usuario.agencia}</p>
    <p>Usuário: ${usuario.nome}</p>
    <p>CPF: ${usuario.cpf}</p>
    <p>Data de nascimento: ${usuario.nascimento}</p>
    <p>Endereço: ${usuario.endereco}</p>
    <p>Senha: ${usuario.senha}</p>
    <p>Email: ${usuario.email}</p>
    <p>Telefone: ${usuario.telefone}</p>
    <p>Salário base: ${salarioB}</p>
    </section>
`;
        dadosUsuario.appendChild(listItem);
    });
})
.catch(error => {
    console.error('Erro ao buscar a lista de usuários:', error);
});

document.getElementById("voltar").addEventListener("click", function () {
let load = document.getElementById("load")

load.style.display = "block"

setTimeout(function () {
    load.style.display = "none"

    window.location.href = "http://localhost:8080/menu"
}, 1000)
})