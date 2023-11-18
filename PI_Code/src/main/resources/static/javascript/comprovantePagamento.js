fetch("http://localhost:8080/pagamento/listar")
            .then(response => response.json())
            .then(data => {
                let dadosUsuario = document.getElementById("dadosUsuario");

                const pg = data[data.length - 1];

                const pagamentoComprovante = pg.pagamento.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                });

                let listItem = document.createElement("li");
                listItem.innerHTML = `<section>
                <p>Operação: ${pg.tipoOperacao}</p>
                <p>Conta: Boleto</p>
                <p>Beneficiário: ${pg.conta}</p>
                <p>Valor: ${pagamentoComprovante}</p>
                </section>
            `;
                dadosUsuario.appendChild(listItem);

            })
            .catch(error => {
                console.error('Erro ao buscar a lista de usuários:', error);
            });


        document.getElementById("voltar").addEventListener("click", function () {
            let load = document.getElementById("load")

            load.style.display = "block"

            setTimeout(function () {
                load.style.display = "none"

                window.location.href = "http://localhost:8080/menu"
            }, 1000)
        })