
function AlterarSenha() {
    event.preventDefault()

    confirmSenha.style.display = "none"

    let contaR = document.getElementById("contaR").value
    let novaSenha = document.getElementById("senha").value
    let confirmaSenha = document.getElementById("senhaConfirm").value

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


                    if (novaSenha === confirmaSenha) {

                        const altsenha = { senha: novaSenha }

                        fetch(`http://localhost:8080/usuario/senha/${contaR}`, {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(altsenha)
                        })
                            .then(Response => {
                                if (Response.status === 200) {

                                    document.getElementById("altSenha").reset()
                                    load.style.display = "none"

                                    setTimeout(function () {
                                        alert("Senha alterada com sucesso !")
                                        window.location.href = "http://localhost:8080/menu"
                                    }, 100)

                                } else {
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
                        load.style.display = "none"

                        setTimeout(function () {
                            alert("Senhas não correspondentes !")
                        }, 100)
                    }

                } else {
                    document.getElementById("conferS").reset();
                    load.style.display = "none"
                    document.getElementById("altSenha").reset();
                    setTimeout(function () {
                        alert("Senha incorreta")
                    }, 100)
                }
            })

    }, 1500)
}


document.getElementById("altSenha").addEventListener("submit", function () {
    event.preventDefault()
    confirmSenha.style.display = "block"
})

document.getElementById("conferS").addEventListener("submit", AlterarSenha)

document.getElementById("voltar").addEventListener("click", function () {
    let load = document.getElementById("load")

    load.style.display = "block"

    setTimeout(function () {
        load.style.display = "none"

        window.location.href = "http://localhost:8080/menu"
    }, 1000)
})