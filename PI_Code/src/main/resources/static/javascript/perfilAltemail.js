function AlterarEmail() {
    event.preventDefault()

    confirmSenha.style.display = "none"

    let contaR = document.getElementById("contaR").value

    let email = document.getElementById("email").value

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

                    const altEmail = { email: email }

                    fetch(`http://localhost:8080/usuario/email/${contaR}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(altEmail)
                    })
                        .then(Response => {
                            if (Response.status === 200) {
                                load.style.display = "none"

                                setTimeout(function () {
                                    alert("Email alterado com sucesso !")
                                    document.getElementById("altEmail").reset()
                                    window.location.href = "http://localhost:8080/menu"
                                }, 100)
                            } else {
                                let load = document.getElementById("load")
                                load.style.display = "none"
                                setTimeout(function () {
                                    alert("Conta inexistente")
                                }, 100)
                            }
                        })
                        .catch(error => {
                            console.error("Erro:", error)
                        })
                } else {
                    document.getElementById("conferS").reset();
                    load.style.display = "none"
                    document.getElementById("altEmail").reset();
                    setTimeout(function () {
                        alert("Senha incorreta")
                    }, 100)
                }
            })
    }, 1500)
}

document.getElementById("altEmail").addEventListener("submit", function () {
    event.preventDefault()
    confirmSenha.style.display = "block"
})

document.getElementById("conferS").addEventListener("submit", AlterarEmail)

document.getElementById("voltar").addEventListener("click", function () {
    let load = document.getElementById("load")

    load.style.display = "block"

    setTimeout(function () {
        load.style.display = "none"

        window.location.href = "http://localhost:8080/menu"
    }, 1000)
})