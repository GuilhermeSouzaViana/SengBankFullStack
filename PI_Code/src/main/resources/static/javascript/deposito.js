function Depositar() {

    event.preventDefault()

    confirmSenha.style.display = "none"

    let conta = document.getElementById("conta").value
    let agencia = document.getElementById("agencia").value
    let dep = parseFloat(document.getElementById("deposito").value)

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

                    const valorDeposito = {
                        tipoOperacao: "Deposito",
                        numeroConta: conta,
                        conta: agencia,
                        deposito: dep
                    }
                    fetch(`http://localhost:8080/deposito/cadastrar?codigoSaldo=${conta}
                    &codigoConta=${conta}&agenciaConta=${agencia}`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(valorDeposito)
                    })
                        .then(response => {
                            if (response.status === 200) {
                                load.style.display = "none"

                                setTimeout(function () {
                                    document.getElementById("depositar").reset();

                                    const extrato = {
                                        tipoOperacao: "Deposito",
                                        numeroConta: conta,
                                        conta: agencia,
                                        extrato: dep
                                    }
                                    fetch("http://localhost:8080/extrato/cadastrar", {
                                        method: "POST",
                                        headers: { "Content-Type": "application/json" },
                                        body: JSON.stringify(extrato)
                                    })

                                    window.location.href = "http://localhost:8080/comprovanteDeposito";
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
                } else {
                    document.getElementById("conferS").reset();
                    load.style.display = "none"
                    document.getElementById("depositar").reset();
                    setTimeout(function () {
                        alert("Senha incorreta")
                    }, 100)
                }
            })
    }, 1500)
}


document.getElementById("depositar").addEventListener("submit", function () {
    event.preventDefault()
    confirmSenha.style.display = "block"
})

document.getElementById("conferS").addEventListener("submit", Depositar)

document.getElementById("voltar").addEventListener("click", function () {
    let load = document.getElementById("load")

    load.style.display = "block"

    setTimeout(function () {
        load.style.display = "none"

        window.location.href = "http://localhost:8080/menu"
    }, 1000)
})