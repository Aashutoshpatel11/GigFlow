import { io } from "socket.io-client";

const URL = import.meta.env.VITE_SOCKET_SERVER_URL || "http://localhost:8000";

export const socket = io(URL, {
    withCredentials: true,
    autoConnect: false,
    transports: ['websocket', 'polling'] 
});