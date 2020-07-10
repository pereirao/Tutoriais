const https = require("https");

let FIPE = {
    marcas: [],
}

getFIPE('https://parallelum.com.br/fipe/api/v1/carros/marcas', getModelos);

function getModelos(marcas) {
    FIPE.marcas = marcas;
    FIPE.marcas.forEach(marca => {
        getFIPE(`https://parallelum.com.br/fipe/api/v1/carros/marcas/${marca.codigo}/modelos`, getAnos, marca);
    });
}

function getAnos(modelos, marca) {
    marca.modelos = modelos.modelos;
    console.log(marca)
    console.log("=".repeat(50));
}

function getFIPE(url, callback, object) {

    https.get(url, (res) => {

        const { statusCode } = res;
        const contentType = res.headers['content-type'];

        let error;

        if (statusCode !== 200) {
            error = new Error('Request Failed.\n' + `Status Code: ${statusCode}`);
        } else if (!/^application\/json/.test(contentType)) {
            error = new Error('Invalid content-type.\n' + `Expected application/json but received ${contentType}`);
        }
        if (error) {
            console.error(error.message, url);
            // Consume response data to free up memory
            res.resume();
            return;
        }

        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => { rawData += chunk; });
        res.on('end', () => {
            try {
                const parsedData = JSON.parse(rawData);
                if(object) {
                    callback(parsedData, object);
                }
                else {
                    callback(parsedData);
                }
            } catch (e) {
                console.error(e.message, url);
            }
        });
    }).on('error', (e) => {
        console.error(`Got error: ${e.message}`);
    });

}

