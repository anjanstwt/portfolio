import { io, type Socket } from "socket.io-client";

export default class SocketClient {
    public socket: Socket | null;

    constructor() {
        this.socket = io({
            autoConnect: false,
        });
    }
}
