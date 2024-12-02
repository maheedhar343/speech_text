const startListeningButton = document.getElementById("startListening");
const resultDiv = document.getElementById("result");

startListeningButton.addEventListener("click", async () => {
    resultDiv.textContent = "Listening...";
    try {
        const response = await fetch("http://127.0.0.1:5000/convert", { method: "GET" });
        const result = await response.json();

        if (response.ok) {
            resultDiv.textContent = `Converted Text:\n${result.text}`;
        } else {
            resultDiv.textContent = `Error: ${result.error}`;
        }
    } catch (error) {
        resultDiv.textContent = `Error: ${error.message}`;
    }
});
