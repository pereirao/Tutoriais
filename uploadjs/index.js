const http = require("http");
const fs = require("fs");

const httpServer = http.createServer();

httpServer.on("listening", () => console.log("Listening..."));

httpServer.on("request", (req, res) => {
    if (req.url === "/") {
        res.end(fs.readFileSync("index.html"));
    }

    if (req.url === "/script.js") {
        res.setHeader("Content-Type", "text/javascript");
        res.end(fs.readFileSync("script.js"));
    }

    if (req.url === "/upload") {
        const fileName = req.headers["file-name"];
        req.on("data", chunk => {
            fs.appendFileSync(fileName, chunk);
            console.log(`Chunk received: ${chunk.length} bytes.`);
        });
        res.end("Chunk uploaded.");
    }
});

httpServer.listen(8080);
