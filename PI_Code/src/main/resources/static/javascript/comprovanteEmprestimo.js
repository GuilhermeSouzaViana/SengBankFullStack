fetch("http://localhost:8080/emprestimo/listar")
.then(response => response.json())
.then(data => {
    let dadosUsuario = document.getElementById("dadosUsuario");

    const em = data[data.length - 1];

    const emprestimoComprovante = em.emprestimo.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });

    let listItem = document.createElement("li");
    listItem.innerHTML = `<section>
    <p>Operação: ${em.tipoOperacao}</p>
    <p>Conta: ${em.numeroConta}</p>
    <p>Beneficiário: 001</p>
    <p>Valor: ${emprestimoComprovante}</p>
    </section>
`;
    dadosUsuario.appendChild(listItem);

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