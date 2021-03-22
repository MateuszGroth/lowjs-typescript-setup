import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import * as path from 'path';

import router from './routes/routes';
import { Request } from 'types';

const app = express();
const server = http.createServer(app);

app.use(express.static('dist'));

const wss = new WebSocket.Server({ server, port: 9000 });

let i = 0;
wss.on('connection', (ws: WebSocket) => {
    //connection is up, let's add a simple simple event
    ws.on('message', (message: string) => {
        const data = JSON.parse(message);
        console.log(data);
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

app.use(router);

// testing websockets
app.get('*', (req, res: Request) => {
    res.sendFile(path.resolve(__dirname, '/index.html'));
});

app.listen(8080, () => console.log(8080));
