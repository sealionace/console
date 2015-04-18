/// <reference path="../definitions/ace.d.ts" />
/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/socket.io/socket.io.d.ts" />
import events = require("events");
declare class Controller extends events.EventEmitter {
    private socket;
    private paused;
    constructor(socket: SocketIO.Socket);
    vibrate(duration?: number): void;
    beep(times?: number): void;
    isPaused(): boolean;
}
export = Controller;
