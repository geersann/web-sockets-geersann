const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8082 });

wss.on('connection', (ws) => {
    console.log('New client connected');

    ws.on('message', (message) => {
        const messageStr = typeof message === 'string' ? message : message.toString();

        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(messageStr);
            }
        });
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

// Do not remove this export. wss should be the name of your WebSocket Server instance
module.exports = wss;
