let botoes = document.getElementsByClassName("btn-detalhes");
for (let i = 0; i < botoes.length; i++) {
    botoes.item(i).addEventListener("click", (e) => {
        e.preventDefault();
        let id = e.target.dataset.id;
        window.location.href = "/Home/Detalhes/" + id;
    });

}
