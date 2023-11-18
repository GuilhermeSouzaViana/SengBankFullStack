fetch("http://localhost:8080/extrato/listar")
            .then(response => response.json())
            .then(data => {

                let operacoes = document.getElementById("extratos");
                data = data.reverse();

                data.forEach(extrat => {
                    const valor = extrat.extrato.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                    });

                    let listExtrato = document.createElement("li")
                    listExtrato.innerHTML = `<section>
                <p>Operação: ${extrat.tipoOperacao}</p>
                <p>Conta: ${extrat.numeroConta}</p>
                <p>Beneficiário: ${extrat.conta}</p>
                <p>Valor: ${valor}</p>
                </section>`;
                    operacoes.appendChild(listExtrato);
                })
            })

        document.getElementById("voltar").addEventListener("click", function () {
            let load = document.getElementById("load")
            load.style.display = "block"

            setTimeout(function () {
                load.style.display = "none"

                window.location.href = "http://localhost:8080/menu"
            }, 1000)
        })