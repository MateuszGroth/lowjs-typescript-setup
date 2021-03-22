import { openDB, DBSchema } from 'idb';

// a very ugly test app - message sender with indexed db (idb)

const dbName = 'msgDb';
const storeName = 'messages';
interface MyDB extends DBSchema {
    messages: {
        key: string;
        value: {
            message: string;
            date: Date;
            usr: string;
            id?: number;
        };
        indexes: { 'by-date': Date; 'by-usr': string };
    };
}

const sendBtn = document.getElementById('msgBtn');
const msgInp: HTMLInputElement | null | HTMLElement = document.getElementById('msgInp');
const msgCont = document.getElementById('msgCont');

(async () => {
    let msgQueue: Array<string> = [];
    let idbMsgQueue: Array<any> = [];
    let myId: string = '';
    const addMessage = async (msg: string, self = false) => {
        if (!msgCont) {
            return;
        }

        // sending messages to myself - from tab to tab, so store message only when it is being send from current tab
        // otherwise every message would be stored twice - on send and receive
        if (self) {
            await db.add(storeName, {
                message: msg,
                usr: myId,
                date: new Date()
            });
        }

        appendMsg(msg, self);
    };

    const appendMsg = (msg: string, self: boolean) => {
        if (!msgCont) {
            return;
        }
        const msgP = document.createElement('p');
        msgP.className = `msg${self ? ` msg--self` : ``}`;
        msgP.innerHTML = msg;
        msgCont.appendChild(msgP);
    };

    // Connection opened
    const socket = new WebSocket('ws://localhost:8080');
    socket.addEventListener('message', async event => {
        const data = JSON.parse(event.data);
        if (data.id) {
            myId = data.id;

            for (const msgToSend of msgQueue) {
                addMessage(msgToSend, true);
                socket.send(JSON.stringify({ message: msgToSend, command: 'send-message', usr: myId }));
            }
            msgQueue = [];
            for (const msgToSend of idbMsgQueue) {
                appendMsg(msgToSend.message, myId === msgToSend.usr);
            }
            idbMsgQueue = [];
            return;
        }
        // append msg and set to store
        addMessage(data.message, false);
    });
    socket.addEventListener('open', () => {
        socket.send(JSON.stringify({ command: 'get-id' }));
    });

    // connect to idb
    const db = await openDB<MyDB>(dbName, 1, {
        upgrade(db) {
            // Create a store of objects
            const store = db.createObjectStore('messages', {
                // The 'id' property of the object will be the key.
                keyPath: 'id',
                // If it isn't explicitly set, create a value by auto incrementing.
                autoIncrement: true
            });
            // Create an index on the 'date' property of the objects.
            store.createIndex('by-date', 'date');
        }
    });

    const messages = await db.getAllFromIndex(storeName, 'by-date');
    if (messages.some(msg => msg.usr === null)) {
        // delete messages if are invalid
        db.transaction(storeName, 'readwrite')
            .objectStore(storeName)
            .index('by-date')
            .openCursor(null, 'prev')
            .then(cursor => {
                // cursor?.advance(30);
                // return cursor?.continue()
                return cursor;
            })
            .then(function deleteRecord(cursor) {
                if (!cursor) {
                    return;
                }
                cursor.delete();
                cursor.continue().then(deleteRecord);
            });
    } else if (!myId) {
        // queue messages for when id is specified
        idbMsgQueue = [...messages];
    } else {
        // display messages if id is specified
        messages.forEach(msg => appendMsg(msg.message, msg.usr === myId));
    }

    if (!sendBtn) {
        return;
    }
    sendBtn.addEventListener('click', async () => {
        if (!msgInp || !(<HTMLInputElement>msgInp).value) return;

        const inputValue = (<HTMLInputElement>msgInp).value;
        (<HTMLInputElement>msgInp).value = '';

        if (!myId) {
            // if id is not ready yet, get it and queue messages
            socket.send(JSON.stringify({ command: 'get-id' }));
            msgQueue.push(inputValue);
            return;
        }
        // add message - append and add to inexdb
        addMessage(inputValue, true);
        socket.send(JSON.stringify({ command: 'send-message', message: inputValue, usr: myId }));
    });
})();
