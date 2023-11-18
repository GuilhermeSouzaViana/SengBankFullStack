function transferenciaPix() {

    event.preventDefault()

    confirmSenha.style.display = "none"

    let contaR = document.getElementById("contaR").value;
    let conta = document.getElementById("conta").value
    let valor = parseFloat(document.getElementById("valor").value)
    let load = document.getElementById("load")

    let confSenha = document.getElementById("cPass").value

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

                                if (valor === 0) {
                                    load.style.display = "none"
                                    setTimeout(function () {

                                        alert("Insira um valor valido");
                                    }, 100)
                                } else if (valor + 11 > saldoDisponivel) {

                                    load.style.display = "none"
                                    setTimeout(function () {
                                        alert("Saldo insuficiente");
                                        document.getElementById("pix").reset();
                                    }, 100)
                                } else {

                                    const valorPix = {
                                        tipoOperacao: "Transferencia via PIX",
                                        numeroConta: "Pix",
                                        conta: "Chave pix: " + conta,
                                        transferencia: valor
                                    }

                                    fetch(`http://localhost:8080/transferenciaPix/cadastrar?codigoSaldo=${contaR}`, {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json"
                                        },
                                        body: JSON.stringify(valorPix)
                                    })
                                        .then(response => {
                                            if (response.status === 200) {
                                                load.style.display = "none"

                                                setTimeout(function () {
                                                    document.getElementById("pix").reset();

                                                    const extrato = {
                                                        tipoOperacao: "Transferencia via PIX",
                                                        numeroConta: "Pix",
                                                        conta: "Chave pix: " + conta,
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
                            }
                        })


                } else {
                    document.getElementById("conferS").reset();
                    load.style.display = "none"
                    document.getElementById("pix").reset();
                    setTimeout(function () {
                        alert("Senha incorreta")
                    }, 100)
                }
            })

    }, 1500)
}

document.getElementById("pix").addEventListener("submit", function () {
    event.preventDefault()
    confirmSenha.style.display = "block"
})
document.getElementById("conferS").addEventListener("submit", transferenciaPix)

document.getElementById("voltar").addEventListener("click", function () {
    let load = document.getElementById("load")

    load.style.display = "block"

    setTimeout(function () {
        load.style.display = "none"

        window.location.href = "http://localhost:8080/menu"
    }, 1000)

})