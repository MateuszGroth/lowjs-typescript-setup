export interface Request {
    send(message: string): void;
    sendFile(filePath: string): void;
}
