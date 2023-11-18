function pagamentoViaBoleto() {
    event.preventDefault()

    confirmSenha.style.display = "none"

    let contaR = document.getElementById("contaR").value
    let barras = document.getElementById("barras").value
    let valor = parseFloat(document.getElementById("valor").value)
    let saldoDisponivel;

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


                    fetch(`http://localhost:8080/saldo/listar`)
                        .then(response => response.json())
                        .then(data => {

                            if (data.length < contaR - 1 || contaR == 0) {
                                load.style.display = "none"

                                setTimeout(function () {
                                    alert("Conta inexistente")
                                }, 100)
                            } else {


                                saldoDisponivel = data[contaR - 1].saldo;

                                if (valor === 0) {
                                    alert("Informe um valor valido")
                                } else if (barras.length !== 48) {
                                    load.style.display = "none"

                                    setTimeout(function () {

                                        alert("Codigo de barras invalido")
                                        document.getElementById("boleto").reset();
                                    }, 100)
                                } else if (valor > saldoDisponivel) {
                                    alert(saldoDisponivel)
                                    alert("Saldo insuficiente")
                                    document.getElementById("boleto").reset();
                                } else {

                                    const valorBolero = {
                                        tipoOperacao: "Pagamento via boleto",
                                        codigoDeBarras: "Boleto",
                                        conta: barras,
                                        pagamento: valor
                                    }

                                    fetch(`http://localhost:8080/pagamentoBoleto/cadastrar?codigoSaldo=${contaR}`, {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json"
                                        },
                                        body: JSON.stringify(valorBolero)
                                    })
                                        .then(response => {
                                            if (response.status === 200) {
                                                load.style.display = "none"

                                                setTimeout(function () {

                                                    document.getElementById("boleto").reset();

                                                    const extrato = {
                                                        tipoOperacao: "Pagamento via boleto",
                                                        numeroConta: "Boleto",
                                                        conta: barras,
                                                        extrato: valor
                                                    }


                                                    fetch("http://localhost:8080/extrato/cadastrar", {
                                                        method: "POST",
                                                        headers: { "Content-Type": "application/json" },
                                                        body: JSON.stringify(extrato)
                                                    })

                                                    window.location.href = "http://localhost:8080/comprovantePagamento";
                                                }, 100)
                                            }
                                        })
                                        .catch(error => {
                                            console.error("Erro:", error);
                                        });
                                }
                            }
                        })
                } else {
                    document.getElementById("conferS").reset();
                    load.style.display = "none"
                    document.getElementById("boleto").reset();
                    setTimeout(function () {
                        alert("Senha incorreta")
                    }, 100)
                }
            })

    }, 1500)
}


document.getElementById("boleto").addEventListener("submit", function () {
    event.preventDefault()
    confirmSenha.style.display = "block"
})
document.getElementById("conferS").addEventListener("submit", pagamentoViaBoleto)


document.getElementById("voltar").addEventListener("click", function () {
    let load = document.getElementById("load")

    load.style.display = "block"

    setTimeout(function () {
        load.style.display = "none"

        window.location.href = "http://localhost:8080/menu"
    }, 1000)
})