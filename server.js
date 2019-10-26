const express = require("express");
const logger = require("morgan");
const app = express();
const pty = require("node-pty");
const bodyParser = require("body-parser");
const repl = pty.spawn("python");

app.use(logger("dev"));
app.use(express.static("public"));
app.use(bodyParser.json());

app.post("/", function(req, res) {
  const code = req.body.code;
  let result = "";

  repl.write(code);

  repl.on("data", data => {
    result += data;
  });

  setTimeout(() => res.json({ result: result }), 200);
});

app.listen(3000, function() {});
