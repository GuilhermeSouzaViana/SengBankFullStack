fetch("http://localhost:8080/deposito/listar")
.then(response => response.json())
.then(data => {
    let dadosUsuario = document.getElementById("dadosUsuario");

    const dp = data[data.length - 1];

    const depositoComprovante = dp.deposito.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });

    let listItem = document.createElement("li");
    listItem.innerHTML = `<section>
    <p>Operação: ${dp.tipoOperacao}</p>
    <p>Conta: ${dp.numeroConta}</p>
    <p>Beneficiário: ${dp.conta}</p>
    <p>Valor: ${depositoComprovante}</p>
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