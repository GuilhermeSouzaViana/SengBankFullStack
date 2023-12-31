function Emprestimo() {
    event.preventDefault()

    confirmSenha.style.display = "none"

    let contaR = document.getElementById("contaR").value
    let limite = parseFloat(document.getElementById("limite").value)

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

                    let salarioBase

                    fetch("http://localhost:8080/usuario/listar")
                        .then(response => response.json())
                        .then(data => {

                            if (data.length < contaR - 1 || contaR == 0) {
                                load.style.display = "none"

                                setTimeout(function () {
                                    alert("Conta inexistente")
                                }, 100)
                            }


                            salarioBase = data[contaR - 1].salarioBase; 1

                            if (limite === 0) {
                                alert("Informe um valor valido")
                            } else if (limite > salarioBase * 2) {
                                load.style.display = "none"

                                setTimeout(function () {
                                    alert("Solicitação acima do limite disponivel")
                                }, 100)
                            } else {

                                const valorEmprestimo = {
                                    tipoOperacao: "Emprestimo",
                                    numeroConta: "1",
                                    conta: "001",
                                    emprestimo: limite
                                }

                                fetch(`http://localhost:8080/emprestimo/cadastrar?codigoSaldo=${contaR}
                                &codigoConta=${contaR}`, {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify(valorEmprestimo)
                                })
                                    .then(response => {
                                        if (response.status === 200) {
                                            load.style.display = "none"

                                            setTimeout(function () {
                                                document.getElementById("emprestimo").reset();

                                                const extrato = {
                                                    tipoOperacao: "Emprestimo",
                                                    numeroConta: "1",
                                                    conta: "001",
                                                    extrato: limite
                                                }


                                                fetch("http://localhost:8080/extrato/cadastrar", {
                                                    method: "POST",
                                                    headers: { "Content-Type": "application/json" },
                                                    body: JSON.stringify(extrato)
                                                })

                                                window.location.href = "http://localhost:8080/comprovanteEmprestimo";
                                            }, 100)
                                        }
                                    })
                                    .catch(error => {
                                        console.error("Erro:", error);
                                    });
                            }
                        })
                } else {
                    document.getElementById("conferS").reset();
                    load.style.display = "none"
                    document.getElementById("emprestimo").reset();
                    setTimeout(function () {
                        alert("Senha incorreta")
                    }, 100)
                }
            })
    }, 1500)
}


document.getElementById("emprestimo").addEventListener("submit", function () {
    event.preventDefault()
    confirmSenha.style.display = "block"
})
document.getElementById("conferS").addEventListener("submit", Emprestimo)

document.getElementById("voltar").addEventListener("click", function () {
    let load = document.getElementById("load")

    load.style.display = "block"

    setTimeout(function () {
        load.style.display = "none"

        window.location.href = "http://localhost:8080/menu"
    }, 1000)
})    