/// <reference path="definitions/ace.d.ts"/>
/// <reference path="typings/node/node.d.ts"/>
/// <reference path="typings/socket.io/socket.io.d.ts"/>

import IO = require('socket.io');
import Controller = require('./controller');
import internal = require("./internal");

var io: SocketIO.Server;
var clients: Controller[] = [];

var controllers = {
    get(i: number): Controller {
        return clients[i];
    },
    
    count(): number {
        return clients.length;
    },
    
	alternate(controller: string): void {
		internal.changeController(controller);
        io.emit('reload');
	},
    
    disconnectedHandler: Function = null,
    connectedHandler: Function = null,
}

io = IO(aceAPI.getControllerPort());

io.on('connection', function(socket) {
    var controller = new Controller(socket);
    
    // adiciona a conexão no array
    clients.push(controller);
    
    if (controllers.connectedHandler)
        controllers.connectedHandler();
    
    // remove a conexão do array
    socket.on('disconnect', function() {
        var idx = clients.indexOf(controller);
        clients.splice(idx, 1);
        
        if (controllers.disconnectedHandler)
            controllers.disconnectedHandler();
    });
});

export = controllers;