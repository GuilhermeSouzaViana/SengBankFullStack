function Sacar() {

    event.preventDefault()

    confirmSenha.style.display = "none"

    let conta = document.getElementById("conta").value
    let sacar = parseFloat(document.getElementById("sacar").value)

    let confSenha = document.getElementById("cPass").value

    let load = document.getElementById("load")

    load.style.display = "block"

    setTimeout(function () {

        let validaS = { senha: confSenha }

        fetch(`http://localhost:8080/confereSenha?id=${conta}`, {
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

                            if (data.length < conta - 1 || conta == 0) {
                                load.style.display = "none"

                                setTimeout(function () {
                                    alert("Conta inexistente")
                                }, 100)
                            } else {

                                saldoDisponivel = data[conta - 1].saldo;

                                if (sacar === 0) {
                                    load.style.display = "none"
                                    setTimeout(function () {

                                        alert("Insira um valor valido");
                                    }, 100)
                                } else if (sacar > saldoDisponivel) {

                                    load.style.display = "none"
                                    setTimeout(function () {
                                        alert("Saldo insuficiente");

                                    }, 100)
                                } else {

                                    const valorSaque = {
                                        tipoOperacao: "Saque",
                                        numeroConta: conta,
                                        conta: "001",
                                        saque: sacar
                                    }

                                    fetch(`http://localhost:8080/saque/cadastrar?codigoSaldo=${conta}
                                    &codigoConta=${conta}`, {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json"
                                        },
                                        body: JSON.stringify(valorSaque)
                                    })
                                        .then(response => {
                                            if (response.status === 200) {

                                                load.style.display = "none"

                                                setTimeout(function () {

                                                    document.getElementById("saque").reset();

                                                    const extrato = {
                                                        tipoOperacao: "Saque",
                                                        numeroConta: conta,
                                                        conta: "001",
                                                        extrato: sacar
                                                    }


                                                    fetch("http://localhost:8080/extrato/cadastrar", {
                                                        method: "POST",
                                                        headers: { "Content-Type": "application/json" },
                                                        body: JSON.stringify(extrato)
                                                    })

                                                    window.location.href = "http://localhost:8080/comprovanteSaque";
                                                }, 100)
                                            } else {
                                                load.style.display = "none"

                                                setTimeout(function () {
                                                    alert("Conta inexistente");
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
                    document.getElementById("saque").reset();
                    setTimeout(function () {
                        alert("Senha incorreta")
                    }, 100)
                }
            })
    }, 2000)
}


document.getElementById("saque").addEventListener("submit", function () {
    event.preventDefault()
    confirmSenha.style.display = "block"
})

document.getElementById("conferS").addEventListener("submit", Sacar)

document.getElementById("voltar").addEventListener("click", function () {
    let load = document.getElementById("load")

    load.style.display = "block"

    setTimeout(function () {
        load.style.display = "none"

        window.location.href = "http://localhost:8080/menu"
    }, 1000)
})