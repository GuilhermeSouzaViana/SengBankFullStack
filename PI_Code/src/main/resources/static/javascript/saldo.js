fetch("http://localhost:8080/saldo/listar?codigo=1")
            .then(response => response.json())
            .then(data => {
                let dadosUsuario = document.getElementById("exibiSaldo");
                data.forEach(usuario => {
                    const saldo = usuario.saldo.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                    });
                    const contaSaldo = usuario.codigo
                    let listItem = document.createElement("li");
                    listItem.innerHTML = `
                <p>Conta ${contaSaldo}</br>${saldo}</p>`;
                    dadosUsuario.appendChild(listItem);
                });
            })
            .catch(error => {
                console.error('Erro ao buscar saldo usuario:', error);
            });
        document.getElementById("voltar").addEventListener("click", function () {
            let load = document.getElementById("load")
            load.style.display = "block"
            setTimeout(function () {
                load.style.display = "none"

                window.location.href = "http://localhost:8080/menu"
            }, 1000)
        })