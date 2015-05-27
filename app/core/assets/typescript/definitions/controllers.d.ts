/// <reference path="../definitions/ace.d.ts" />
/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/socket.io/socket.io.d.ts" />
import Controller = require('./controller');
declare var controllers: {
    get(i: number): Controller;
    count(): number;
    alternate(controller: string): void;
    disconnectedHandler: any;
    connectedHandler: any;
};
export = controllers;
