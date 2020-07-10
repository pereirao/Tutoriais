function gerarPalpite() {
    $(".dezena").removeClass("dezena--marcada");
    $.ajax({
        method: 'GET',
        url: '/gerarPalpite'
    }).done((data) => {
        const dezenas = JSON.parse(data);
        dezenas.forEach(element => {
            const n = parseInt(element);
            $(".dezena:nth(" + (n - 1) + ")").addClass("dezena--marcada");
        });
    }).fail((error) => {
        console.error(error);
    });
}

function effect() {
    const ini = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30, 40, 50, 60];
}

$(() => {
    $("#btn-palpite").unbind("click").click(gerarPalpite);
});
