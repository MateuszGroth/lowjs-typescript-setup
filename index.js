const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);

app.use(express.static('public'));

const wss = new WebSocket.Server({ server, port: 9000 });

wss.on('connection', ws => {
    console.log('weszlo connection?');
    //connection is up, let's add a simple simple event
    ws.on('message', message => {
        //log the received message and send it back to the client
        console.log('received: %s', message);
        ws.send(`Hello, you sent -> ${message}`);
    });

    //send immediatly a feedback to the incoming connection
    ws.send('Hi there, I am a WebSocket server');
});

// testing websockets
app.get('*', (req, res) => {
    console.log('co kuerwa');
    console.log(__dirname + 'public/index.html');
    res.sendFile(path.resolve(__dirname + 'public/index.html'));
});

app.listen(4000, () => console.log(4000));
