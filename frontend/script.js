const startListeningButton = document.getElementById('startListening');
        const resultDiv = document.getElementById('result');
        const loadingSpinner = document.getElementById('loadingSpinner');
        const copyButton = document.getElementById('copyButton');
        let isListening = false;

        // Toggle button and spinner states
        const toggleUI = (listening) => {
            isListening = listening;
            startListeningButton.disabled = listening;
            loadingSpinner.style.display = listening ? 'block' : 'none';
            startListeningButton.innerHTML = listening
                ? `<span class="mic-icon">🎙️</span> Listening...`
                : `<span class="mic-icon">🎙️</span> Start Listening`;
        };

        // Display result or error
        const displayResult = (text) => {
            resultDiv.textContent = text;
            copyButton.style.display = text && !text.startsWith('Error') ? 'block' : 'none';
        };

        // Start listening
        startListeningButton.addEventListener('click', async () => {
            toggleUI(true);
            displayResult('Listening for speech...');

            try {
                const response = await fetch('http://127.0.0.1:5000/convert', { method: 'GET' });
                const result = await response.json();

                if (response.ok) {
                    displayResult(`Converted Text:\n${result.text}`);
                } else {
                    displayResult(`Error: ${result.error}`);
                }
            } catch (error) {
                displayResult('Error: Failed to connect to the server. Please ensure the backend is running.');
            } finally {
                toggleUI(false);
            }
        });

        // Copy text to clipboard
        copyButton.addEventListener('click', () => {
            const text = resultDiv.textContent.replace('Converted Text:\n', '');
            navigator.clipboard.writeText(text).then(() => {
                copyButton.textContent = 'Copied!';
                setTimeout(() => {
                    copyButton.textContent = 'Copy Text';
                }, 2000);
            }).catch(() => {
                displayResult('Error: Failed to copy text.');
            });
        });
