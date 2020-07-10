function mostraIcone(icone) {
    document.getElementsByClassName(icone)[0].setAttribute("style", "display: inline-block;");
}

const iconePagina = window.location.href.split("/").pop().split(".")[0];

fetch("header.html")
    .then(response => {
        return response.text()
    })
    .then(data => {
        document.querySelector("#cabecalho").innerHTML = data;
    })
    .then(() => {
        var botoes = document.getElementsByClassName("menu_button");
        for (i = 0; i < botoes.length; i++) {

            var botao = botoes[i];

            botao.addEventListener("mouseout", function (e) {
                var icones = document.getElementsByClassName("icone");
                for (i = 0; i < icones.length; i++) {
                    icones[i].setAttribute("style", "display: none;");
                }
                mostraIcone("icone " + iconePagina);
            });

            botao.addEventListener("mouseover", function (e) {
                var icone = e.target.dataset.icone ?? "index";
                var icones = document.getElementsByClassName("icone");
                for (i = 0; i < icones.length; i++) {
                    icones[i].setAttribute("style", "display: none;");
                }
                mostraIcone("icone " + icone);
            });

        }
        mostraIcone("icone " + iconePagina);

    }
    );



