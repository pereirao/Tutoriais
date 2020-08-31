document.addEventListener("DOMContentLoaded", (e) => {
    fetch("/contato/read.php")
    .then(response => response.json())
    .then(data => {
        new gridjs.Grid({
            columns: ["Id", "Nome", "Nascimento", "Sexo", "Alteração"],
            data: data.map(c => [c.Id, c.Nome, c.Nascimento, c.Sexo, c.Alteracao])
        }).render(document.getElementById("tab-contatos"));
    });
});
