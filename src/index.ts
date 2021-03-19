import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import * as path from 'path';
// todo babel loader to transpile 'ws' package - it is es2017

import router from './routes/routes';
import { Request } from 'types';

const app = express();
const server = http.createServer(app);

app.use(express.static('public'));

const wss = new WebSocket.Server({ server, port: 9000 });

wss.on('connection', (ws: WebSocket) => {
    //connection is up, let's add a simple simple event
    ws.on('message', (message: string) => {
        console.log('received: %s', message);

        wss.clients.forEach(client => {
            if (client != ws) {
                client.send(message);
            }
        });
    });
});

app.use(router);

// testing websockets
app.get('*', (req, res: Request) => {
    res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

app.listen(8080, () => console.log(8080));
