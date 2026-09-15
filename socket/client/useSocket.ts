"use client";

import { useCallback, useEffect, useState } from "react";
import SocketClient from "./client.socket";

export default function useSocket() {
    const socket = new SocketClient().socket;

    const [connected, setConnected] = useState(socket?.connected);

    useEffect(() => {
        socket?.on("connect", onConnect);
        socket?.on("disconnect", onDisconnect);

        if (!socket?.connect()) {
            socket?.connect();
        }

        return () => {
            socket?.off("connect", onConnect);
            socket?.off("disconnect", onDisconnect);
        };
    }, [socket]);

    function onConnect() {
        setConnected(true);
    }
    function onDisconnect() {
        setConnected(false);
    }

    const emit = useCallback(
        <T>(event: string, data: T) => {
            if (!socket?.connected) return;
            socket.emit(event, data);
        },
        [socket],
    );

    const on = useCallback(
        <T>(event: string, callback: (data: T) => void) => {
            socket?.on(event, callback);

            return () => {
                socket?.off(event, callback);
            };
        },
        [socket],
    );

    function setCursor(x: number, y: number) {
        emit("cursor:move", { x, y });
    }

    return {
        socket,
        connected,
        setCursor,
        emit,
        on,
    };
}
