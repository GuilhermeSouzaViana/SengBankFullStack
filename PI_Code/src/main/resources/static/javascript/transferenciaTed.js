
function transferenciaTed() {
    event.preventDefault();

    confirmSenha.style.display = "none"

    let contaR = document.getElementById("contaR").value
    let conta = document.getElementById("conta").value;
    let agencia = document.getElementById("agencia").value;
    let valor = parseFloat(document.getElementById("valor").value);

    let confSenha = document.getElementById("cPass").value

    let load = document.getElementById("load")

    load.style.display = "block"

    setTimeout(function () {

        let validaS = { senha: confSenha }


        fetch(`http://localhost:8080/confereSenha?id=${contaR}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(validaS)
        })
            .then(response => {
                if (response.status == 200) {
                    document.getElementById("conferS").reset();
                    console.log("Senha correta")

                    let saldoDisponivel;

                    fetch("http://localhost:8080/saldo/listar")
                        .then(response => response.json())
                        .then(data => {

                            if (data.length < contaR - 1 || contaR == 0) {
                                load.style.display = "none"

                                setTimeout(function () {
                                    alert("Conta inexistente")
                                }, 100)
                            } else {
                                saldoDisponivel = data[contaR - 1].saldo;

                                if (conta == contaR && agencia == "001") {
                                    load.style.display = "none"
                                    setTimeout(function () {

                                        alert("Não é possível transferir para a mesma conta");
                                        document.getElementById("ted").reset();
                                    }, 100)
                                } else if (valor === 0) {
                                    load.style.display = "none"
                                    setTimeout(function () {

                                        alert("Insira um valor valido");
                                    }, 100)
                                } else if (valor + 11 > saldoDisponivel) {

                                    load.style.display = "none"
                                    setTimeout(function () {
                                        alert("Saldo insuficiente");
                                        document.getElementById("ted").reset();
                                    }, 100)
                                } else {

                                    const valorTedEntreontas = {
                                        tipoOperacao: "Entre contas via TED ",
                                        numeroConta: conta,
                                        conta: agencia,
                                        transferencia: valor
                                    }

                                    fetch(`http://localhost:8080/confereTransferencia?codigoSaldoDestino=${conta}
                                    &codigoSaldoOrigem=${contaR}
                                    &agencia=${agencia}`, {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json"
                                        },
                                        body: JSON.stringify(valorTedEntreontas)
                                    })
                                        .then(response => {
                                            if (response.status == 200) {
                                                load.style.display = "none"

                                                setTimeout(function () {
                                                    document.getElementById("ted").reset();
                                                    window.location.href = "http://localhost:8080/comprovanteTransferencia";

                                                }, 100)

                                            } else {
                                                const valorTed = {
                                                    tipoOperacao: "Transferencia via TED",
                                                    numeroConta: conta,
                                                    conta: agencia,
                                                    transferencia: valor
                                                }

                                                fetch(`http://localhost:8080/transferenciaTed/cadastrar?codigoSaldo=${contaR}`, {
                                                    method: "POST",
                                                    headers: {
                                                        "Content-Type": "application/json"
                                                    },
                                                    body: JSON.stringify(valorTed)
                                                })
                                                    .then(response => {
                                                        if (response.status === 200) {
                                                            load.style.display = "none"

                                                            setTimeout(function () {
                                                                document.getElementById("ted").reset();

                                                                const extrato = {
                                                                    tipoOperacao: "Transferencia via TED",
                                                                    numeroConta: conta,
                                                                    conta: agencia,
                                                                    extrato: valor
                                                                }


                                                                fetch("http://localhost:8080/extrato/cadastrar", {
                                                                    method: "POST",
                                                                    headers: { "Content-Type": "application/json" },
                                                                    body: JSON.stringify(extrato)
                                                                })

                                                                window.location.href = "http://localhost:8080/comprovanteTransferencia";
                                                            }, 100)
                                                        }
                                                    })
                                                    .catch(error => {
                                                        console.error("Erro:", error);
                                                    });

                                            }

                                        })
                                }
                            }
                        })
                } else {
                    document.getElementById("conferS").reset();
                    load.style.display = "none"
                    document.getElementById("ted").reset();
                    setTimeout(function () {
                        alert("Senha incorreta")
                    }, 100)
                }
            })
    }, 1500)
}

document.getElementById("ted").addEventListener("submit", function () {
    event.preventDefault()
    confirmSenha.style.display = "block"
})

document.getElementById("conferS").addEventListener("submit", transferenciaTed)


document.getElementById("voltar").addEventListener("click", function () {
    let load = document.getElementById("load")

    load.style.display = "block"

    setTimeout(function () {
        load.style.display = "none"

        window.location.href = "http://localhost:8080/menu"
    }, 1000)
})