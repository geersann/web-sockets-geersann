document.addEventListener("DOMContentLoaded", () => {
    const chat = document.getElementById("chat");
    const sendButton = document.getElementById("send");
    const nicknameInput = document.getElementById("userName");
    const messageInput = document.getElementById("message");

    const remoteUrl = 'wss://boiling-beach-26008.herokuapp.com';
    const localUrl = 'ws://localhost:8082';

    const socketUrl = (window.location.hostname === 'localhost') ? localUrl : remoteUrl;
    const socket = new WebSocket(socketUrl);

    socket.addEventListener("message", (event) => {
        chat.value += event.data + "\n";
    });

    sendButton.addEventListener("click", () => {
        const nickname = nicknameInput.value.trim();
        const message = messageInput.value.trim();
        
        if (nickname && message) {
            const formattedMessage = `${nickname}: ${message}`;
            socket.send(formattedMessage);
            messageInput.value = ""; 
        } else {
            alert("Please enter both a nickname and a message.");
        }
    });
});