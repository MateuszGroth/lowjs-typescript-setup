require('dotenv').config();

import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import * as path from 'path';

import router from './routes/routes';
import { Request } from 'types';

const port = process.env.PORT || 8080;

const app = express();
app.use(express.static('./dist'));
app.use(router);

// testing websockets
app.get('*', (req, res: Request) => {
    res.sendFile(path.resolve(__dirname, '/index.html'));
});

const server = http.createServer(app);

// no need to pass port if server.listen is at the end (instead of app.listen)
// const wss = new WebSocket.Server({ server, port: 9000 });
const wss = new WebSocket.Server({ server });

let i = 0;
wss.on('connection', (ws: WebSocket) => {
    //connection is up, let's add a simple simple event
    ws.on('message', (message: string) => {
        const data = JSON.parse(message);
        if (data.command === 'send-message') {
            wss.clients.forEach(client => {
                if (client != ws) {
                    client.send(JSON.stringify({ message: data.message }));
                }
            });
        } else if (data.command === 'get-id') {
            ws.send(JSON.stringify({ id: `id${i++}` }));
        }
    });
});

server.listen(8080, function () {
    console.log(`Listening on port ${port}`);
});
