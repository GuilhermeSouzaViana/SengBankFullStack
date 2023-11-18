function cadSaldo() {
    let load = document.getElementById("load")
    load.style.display = "block"
    let cpf = document.getElementById("cpf").value
    let obj = { cpf: cpf };

    fetch(`http://localhost:8080/confereCpf?cpf=${cpf}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    }).then(response => {
      if (response.status == 200) {
        console.log("Cpf já cadastrado")
      } else {
        let saldo = { saldo: 0 }
        fetch("http://localhost:8080/saldo/cadastrar", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(saldo)
        })
      }
    })
  }


  function cadastroUsuario() {
    event.preventDefault()

    let nome = document.getElementById("nome").value
    let cpf = document.getElementById("cpf").value
    let idade = new Date(document.getElementById("idade").value)
    let endereco = document.getElementById("endereco").value
    let senha = document.getElementById("senha").value
    let email = document.getElementById("email").value
    let telefone = document.getElementById("telefone").value
    let salarioBase = parseFloat(document.getElementById("salarioBase").value)

    let formataIdade = idade.toLocaleDateString('pt-BR')

    let load = document.getElementById("load")

    load.style.display = "block"

    setTimeout(function () {

      let obj = { cpf: cpf };


      fetch(`http://localhost:8080/confereCpf?cpf=${cpf}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
      })
        .then(response => {
          if (response.status == 200) {
            load.style.display = "none"

            setTimeout(function () {

              alert("Cpf já cadastrado")
            }, 100)
          } else {

            fetch("http://localhost:8080/saldo/listar")
              .then(response => response.json())
              .then(data => {

                const usuario = {
                  agencia: "001",
                  nome: nome,
                  cpf: cpf,
                  nascimento: formataIdade,
                  endereco: endereco,
                  senha: senha,
                  email: email,
                  telefone: telefone,
                  salarioBase: salarioBase,
                  "saldo": {
                    "codigo": data.length,
                    "saldo": data.saldo
                  }
                }


                fetch("http://localhost:8080/usuario/cadastrar", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify(usuario)
                })
                  .then(Response => {
                    if (Response.status === 200) {
                      load.style.display = "none"

                      setTimeout(function () {
                        alert("Usuario cadastrado ")

                        document.getElementById("CadUsuario").reset()
                        window.location.href = "http://localhost:8080/menu"
                      }, 100)
                    } else {
                      load.style.display = "none"

                      setTimeout(function () {
                        alert("Não foi possivel concluir o cadastro")
                      }, 100)
                    }
                  })
                  .catch(error => {
                    console.error("Erro:", error)
                  })
              })
          }
        })
    }, 1500)
  }

  document.getElementById("CadUsuario").addEventListener("submit", function (event) {
    cadSaldo();
    cadastroUsuario();
  });

  document.getElementById("voltar").addEventListener("click", function () {
          let load = document.getElementById("load")

          load.style.display = "block"
          document.getElementById("CadUsuario").reset()
          setTimeout(function () {
              load.style.display = "none"

              window.location.href = "http://localhost:8080"
          }, 1000)
      })