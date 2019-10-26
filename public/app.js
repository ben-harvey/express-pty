document.addEventListener("DOMContentLoaded", () => {
  const submitButton = document.querySelector("#submit");
  const textArea = document.querySelector("#code");
  const output = document.querySelector("#result");

  submitButton.addEventListener("click", () => {
    const codeContent = textArea.innerHTML.replace(/ +?/g, "");
    const data = { code: codeContent };
    const json = JSON.stringify(data);

    var request = new XMLHttpRequest();

    request.open("POST", "/");
    request.setRequestHeader("Content-Type", "application/json");
    request.responseType = "json";

    request.send(json);

    request.addEventListener("load", () => {
      const result = request.response.result;
      console.log(result);

      output.textContent = result;
    });
  });
});
