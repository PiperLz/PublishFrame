import { Log, LOG_TAG } from "../Util/Log";

export interface ISocket {
    connect();
    send(data: string | ArrayBuffer);
    close();
};

export enum Enum_SocketState {
    CONNECTING = 1,
    OPEN,
    CLOSING,
    CLOSED
}

export default class Socket implements ISocket {
    private _state: Enum_SocketState = Enum_SocketState.CLOSED;
    private _webSocket: WebSocket;
    private _url: string;

    constructor(url) {
        this._url = url;

    }

    connect() {
        this._webSocket = new WebSocket(this._url);
        this._webSocket.binaryType = 'arraybuffer';
        this._webSocket.onopen = (event) => {
            this._state = Enum_SocketState.OPEN;
        }

        this._webSocket.onmessage = (event) => {

        }

        this._webSocket.onerror = (event) => {

        }

        this._webSocket.onclose = (event) => {
            this._state = Enum_SocketState.CLOSED;
        }
    }

    send(data: string | ArrayBuffer) {
        if (this._webSocket && this._state == Enum_SocketState.OPEN) {
            this._webSocket.send(data)
        } else {
            Log.log(LOG_TAG.SOCKET, 'websocket state :' + this._state)
        }
    }

    close() {
        if (this._webSocket) {
            try {
                this._webSocket.close();
                this._state = Enum_SocketState.CLOSED;
            } catch (err) {
                Log.log(LOG_TAG.SOCKET, 'close error')
            }
        }
    }
}
