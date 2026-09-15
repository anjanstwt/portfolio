import { createServer, type Server as HttpServer } from "node:http";
import next from "next";
import { Server as SocketIOServer } from "socket.io";

export class SocketServer {
    private readonly dev: boolean;
    private readonly hostname: string;
    private readonly port: number;

    private readonly app;
    private readonly handler;

    private httpServer: HttpServer | null = null;
    private io: SocketIOServer | null = null;

    constructor() {
        this.dev = process.env.NODE_ENV !== "production";
        this.hostname = "0.0.0.0";
        this.port = Number(process.env.PORT) || 3000;

        this.app = next({
            dev: this.dev,
            hostname: this.hostname,
            port: this.port,
        });

        this.handler = this.app.getRequestHandler();
    }

    public async start() {
        await this.app.prepare();

        this.httpServer = createServer(this.handler);

        this.io = new SocketIOServer(this.httpServer, {
            cors: {
                origin: "*",
            },
        });

        this.registerEvents();
        this.registerErrorHandler();

        this.httpServer.listen(this.port, this.hostname, () => {
            console.log(`> Ready on http://${this.hostname}:${this.port}`);
        });
    }

    private registerEvents() {
        if (!this.io) {
            throw new Error("Socket.IO server is not initialized");
        }

        this.io.on("connection", (socket) => {
            console.log("connected:", socket.id);

            socket.on("disconnect", () => {
                console.log("disconnected:", socket.id);
            });
        });
    }

    private registerErrorHandler() {
        if (!this.httpServer) {
            throw new Error("HTTP server is not initialized");
        }

        this.httpServer.once("error", (error) => {
            console.error(error);
            process.exit(1);
        });
    }

    public getIO(): SocketIOServer {
        if (!this.io) {
            throw new Error("Socket.IO server is not initialized");
        }

        return this.io;
    }
}

const server = new SocketServer();
server.start();