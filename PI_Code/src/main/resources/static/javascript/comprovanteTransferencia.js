fetch("http://localhost:8080/transferencia/listar")
.then(response => response.json())
.then(data => {
    let dadosUsuario = document.getElementById("dadosUsuario");

    const tr = data[data.length - 1];

    const transferenciaComprovante = tr.transferencia.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });

    let listItem = document.createElement("li");
    listItem.innerHTML = `<section>
    <p>Operação: ${tr.tipoOperacao}</p>
    <p>Conta: ${tr.numeroConta}</p>
    <p>Beneficiário: ${tr.conta}</p>
    <p>Valor: ${transferenciaComprovante}</p>
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