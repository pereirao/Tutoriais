var http = require('http');

http.createServer(
    function (req, res) {
        res.writeHead(200, {'Content-Type': 'text/html;charset=UTF-8'});

        var times = [
            "Suzano",
            "Sesc",
            "Petrobrás"
        ]

        res.write(`
        <html>
            <head>
                <title>Teste de página</title>
            </head>
            <body>
                <h1>Hello, world!</h1>
                <ol>`);

        times.forEach(
            function(e) {
                res.write(`<li>${e}</li>` + "\n");
            }
        )

        res.write(`
                </ol>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde, non dolor illo officia minus soluta voluptates doloribus amet quas, dolorum modi sit eligendi odio nostrum distinctio beatae iste quam culpa?</p class="maiusculo" >
            </body>
        </html>`);
        res.end();
    }
).listen(8888);
