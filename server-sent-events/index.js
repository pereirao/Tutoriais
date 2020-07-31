const app = require("express")();

app.get("/", (req, res) => res.send("<h1>Hello, world!</h1>"));

app.get("/stream", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");

  send(res);
});

let i = 0;
function send(res) {
  res.write(toSSE(`Hello number ${++i}`));
  setTimeout(() => {
    send(res);
  }, 2000);
}

function toSSE(data) {
  return "data: " + data + "\n\n";
}

const PORT = 8080;

app.listen(PORT);

console.log(`Listening on port ${PORT}`);
