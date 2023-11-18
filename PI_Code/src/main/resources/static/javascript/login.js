function LoginSengBank() {
    event.preventDefault()

    let load = document.getElementById("load")

    load.style.display = "block"

    setTimeout(function () {

        let cpf = document.getElementById("cpf").value
        let senha = document.getElementById("senha").value

        let obj = {
            cpf: cpf,
            senha: senha
        };

        fetch(`http://localhost:8080/login?cpf=${cpf}&senha=${senha}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
            .then(response => {
                if (response.status == 200) {
                    load.style.display = "none"
                    document.getElementById("formLogin").reset();
                    window.location.href = "http://localhost:8080/menu"
                } else {
                    load.style.display = "none"

                    setTimeout(function () {
                        alert("Conta inexistente")
                        document.getElementById("formLogin").reset();

                    }, 100)
                }

            })
    }, 1500)
}

document.getElementById("formLogin").addEventListener("submit", LoginSengBank)

document.getElementById("cadBtn").addEventListener("click", function () {
    let load = document.getElementById("load")

    load.style.display = "block"

    setTimeout(function () {
        load.style.display = "none"

        window.location.href = "http://localhost:8080/cadastro"
    }, 1500)
})

document.getElementById("cadResponsivo").addEventListener("click", function () {
    let load = document.getElementById("load")

    load.style.display = "block"

    setTimeout(function () {
        load.style.display = "none"

        window.location.href = "http://localhost:8080/cadastro"
    }, 1500)
})