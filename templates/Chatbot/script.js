document.addEventListener("DOMContentLoaded", function () {
    const chatBox = document.getElementById("chat-box");
    const userInput = document.getElementById("user-input");
    const sendButton = document.getElementById("send-btn");

    const GEMINI_API_KEY = "AIzaSyApEwqGMR-QWjYuRet991YivOE2zLS4-GY";  // Replace with your actual API key

    sendButton.addEventListener("click", sendMessage);
    userInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();  // Prevents form submission
            sendMessage();
        }
    });

    function sendMessage() {
        const message = userInput.value.trim();
        if (message === "") return;

        appendMessage("user", message);
        userInput.value = "";

        fetchGeminiResponse(message);
    }

    function appendMessage(sender, text) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message", sender);
        messageDiv.textContent = text;
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    async function fetchGeminiResponse(userMessage) {
        appendMessage("bot", "Typing...");

        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${GEMINI_API_KEY}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: userMessage }] }]
                })
            });

            const data = await response.json();
            document.querySelector(".message.bot:last-child").remove();

            if (data && data.candidates && data.candidates.length > 0) {
                const botReply = data.candidates[0].content.parts.map(part => part.text).join(" ");
                appendMessage("bot", botReply);
            } else {
                appendMessage("bot", "I'm not sure how to respond to that.");
            }
        } catch (error) {
            document.querySelector(".message.bot:last-child").remove();
            appendMessage("bot", "Oops! Something went wrong. Please try again.");
            console.error("Error fetching Gemini response:", error);
        }
    }
});
