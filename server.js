const express = require("express");
const logger = require("morgan");
const app = express();
const pty = require("node-pty");
const bodyParser = require("body-parser");
const repl = pty.spawn("python");

app.use(logger("dev"));
app.use(express.static("public"));
app.use(bodyParser.json());

app.get("/", function(req, res) {});

app.post("/", function(req, res) {
  const code = req.body.code;
  let result = "";

  console.log(code);

  repl.write(code);

  repl.on("data", data => {
    console.log(`data = ${data}`);
    result += data;
    console.log(`result = ${result}`);
  });

  setTimeout(() => res.json({ result: result }), 200);
});

app.listen(3000, function() {});
