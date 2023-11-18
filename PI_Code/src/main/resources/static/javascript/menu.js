
let opcoes = document.getElementsByClassName("opcao")

opcoes[0].addEventListener("click", function () {
  let load = document.getElementById("load")

  load.style.display = "block"

  setTimeout(function () {
    load.style.display = "none"

    window.location.href = "http://localhost:8080/perfil/exibir"
  }, 1000)

})

opcoes[1].addEventListener("click", function () {
  let load = document.getElementById("load")

  load.style.display = "block"

  setTimeout(function () {
    load.style.display = "none"

    window.location.href = "http://localhost:8080/perfil/senha"
  }, 1000)

})

opcoes[2].addEventListener("click", function () {
  let load = document.getElementById("load")

  load.style.display = "block"

  setTimeout(function () {
    load.style.display = "none"

    window.location.href = "http://localhost:8080/perfil/endereco"
  }, 1000)

})

opcoes[3].addEventListener("click", function () {
  let load = document.getElementById("load")

  load.style.display = "block"

  setTimeout(function () {
    load.style.display = "none"

    window.location.href = "http://localhost:8080/perfil/email"
  }, 1000)

})

opcoes[4].addEventListener("click", function () {
  let load = document.getElementById("load")

  load.style.display = "block"

  setTimeout(function () {
    load.style.display = "none"

    window.location.href = "http://localhost:8080/perfil/telefone"
  }, 1000)

})

opcoes[5].addEventListener("click", function () {
  let load = document.getElementById("load")

  load.style.display = "block"

  setTimeout(function () {
    load.style.display = "none"

    window.location.href = "http://localhost:8080/perfil/salario"
  }, 1000)

})

document.getElementById("saldo").addEventListener("click", function () {
  let load = document.getElementById("load")

  load.style.display = "block"


  setTimeout(function () {
    load.style.display = "none"

    window.location.href = "http://localhost:8080/saldo"
  }, 1000)
})


document.getElementById("deposito").addEventListener("click", function () {
  let load = document.getElementById("load")

  load.style.display = "block"


  setTimeout(function () {
    load.style.display = "none"

    window.location.href = "http://localhost:8080/deposito"
  }, 1000)
})


document.getElementById("saque").addEventListener("click", function () {
  let load = document.getElementById("load")

  load.style.display = "block"


  setTimeout(function () {
    load.style.display = "none"

    window.location.href = "http://localhost:8080/saque"
  }, 1000)
})

document.getElementById("transferencia").addEventListener("click", function () {
  let load = document.getElementById("load")

  load.style.display = "block"

  setTimeout(function () {
    load.style.display = "none"

    window.location.href = "http://localhost:8080/transferencia"
  }, 1000)
})

document.getElementById("pagamento").addEventListener("click", function () {
  let load = document.getElementById("load")

  load.style.display = "block"

  setTimeout(function () {
    load.style.display = "none"

    window.location.href = "http://localhost:8080/pagamentos/boleto"
  }, 1000)
})

document.getElementById("emprestimo").addEventListener("click", function () {
  let load = document.getElementById("load")

  load.style.display = "block"

  setTimeout(function () {
    load.style.display = "none"

    window.location.href = "http://localhost:8080/emprestimo"
  }, 1000)
})

document.getElementById("extrato").addEventListener("click", function () {
  let load = document.getElementById("load")
  load.style.display = "block"

  setTimeout(function () {
    load.style.display = "none"
    fetch(`http://localhost:8080/extrato/listar`)
      .then(response => response.json())
      .then(data => {
        if (data.length < 1) {
          alert("Não há operações realizadas")
        } else {
          window.location.href = "http://localhost:8080/extrato"
        }
      })
  }, 1000)
})

document.getElementById("headerSuporte").addEventListener("click", function () {
  let load = document.getElementById("load")

  load.style.display = "block"

  setTimeout(function () {
    load.style.display = "none"

    window.location.href = "http://localhost:8080/suporte"
  }, 1000)
})


document.getElementById("sair").addEventListener("click", function () {
  let load = document.getElementById("load")

  load.style.display = "block"

  setTimeout(function () {
    load.style.display = "none"

    window.location.href = "http://localhost:8080"
  }, 2500)
})

document.getElementById("sairResponsive").addEventListener("click", function () {
  let load = document.getElementById("load")

  load.style.display = "block"

  setTimeout(function () {
    load.style.display = "none"

    window.location.href = "http://localhost:8080"
  }, 2500)
})
