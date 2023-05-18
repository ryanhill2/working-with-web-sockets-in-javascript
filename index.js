const WebSocket = require('ws');
const cors = require('cors');

const corsOptions = {
    origin: '*',
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
};

const wss = new WebSocket.Server({ port: 8080 });
wss.on('headers', (headers) => {
    Object.assign(headers, corsOptions);
})

wss.on('connection', (ws) => {
    console.log('Client connected');

    // Send a welcome message to the connected client
    ws.send('Welcome to the WebSocket server!');

    // Send mock transaction data to the connected client every second
    const interval = setInterval(() => {
        sendMockTransactions(ws);
    }, 1000);

    // WebSocket close event
    ws.on('close', () => {
        console.log('Client disconnected');

        // Clear the interval when the client disconnects
        clearInterval(interval);
    });
});

console.log('WebSocket server started on port 8080');

// Function to send mock transactions
function sendMockTransactions(ws) {
    // Generate and send mock transaction data to the client
    const transactionData = generateMockTransaction();
    ws.send(JSON.stringify(transactionData));
}

// Function to generate mock transaction data
function generateMockTransaction() {
    // Generate mock transaction data
    const transaction = {
        amount: Math.random() * 1000,
        timestamp: new Date().toISOString(),
    };

    return transaction;
}
