fetch("http://localhost:8080/saque/listar")
            .then(response => response.json())
            .then(data => {
                let dadosUsuario = document.getElementById("dadosUsuario");

                const sq = data[data.length - 1];

                const saqueComprovante = sq.saque.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                });

                let listItem = document.createElement("li");
                listItem.innerHTML = `<section>
                <p>Operação: ${sq.tipoOperacao}</p>
                <p>Conta: ${sq.numeroConta}</p>
                <p>Beneficiário: ${sq.conta}</p>
                <p>Valor: ${saqueComprovante}</p>
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