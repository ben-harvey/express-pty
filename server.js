const express = require("express");
const logger = require("morgan");
const app = express();
const { exec } = require("child_process");

app.use(logger("dev"));
app.use(express.static("."));

app.get("/", function(req, res) {});

const createAndWriteToScript = command => {
  console.log(command);

  exec(command, (err, stdout, stderr) => {
    if (err) {
      console.error(`error from create (a Node Error object): ${err}`);
    } else {
      console.log("script.rb created and written to!");
      console.log(`stdout from create: ${stdout}`);
      console.log(`stderr from create: ${stderr}`);
    }
  });
};

const executeScript = () => {
  const rubyScript = exec("ruby script.rb");

  rubyScript.stdout.on("data", data => {
    console.log(`stout from execute: ${data}`);
  });
  rubyScript.stderr.on("data", data => {
    console.error(`sterr from execute: ${data}`);
  });
};

const deleteScript = () => {
  exec("rm script.rb", (err, stdout, stderr) => {
    if (err) {
      console.error(`error from delete: ${err}`);
    } else {
      console.log("script deleted!");
    }
  });
};

// const rubyCommand = "echo \"puts 'hi from script!'\" >> script.rb";
const brokenCommand = "echo \"putses 'hi from script!'\" >> script.rb";

// createAndWriteToScript(rubyCommand);
createAndWriteToScript(brokenCommand);
executeScript();
setTimeout(deleteScript, 2000);

app.listen(3000, () => {
  console.log("App started");
});
