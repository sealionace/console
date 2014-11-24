/// <reference path="definitions/ace.d.ts"/>
/// <reference path="typings/node/node.d.ts"/>
/// <reference path="typings/socket.io/socket.io.d.ts"/>

import io = require('socket.io');
import Controller = require('./controller');

class Controllers {
	
	private io: SocketIO.Server;
	
	private clients: Controller[] = [];
	
	constructor() {
		this.io = io(aceAPI.getControllerPort());
		
		var that = this;
		
		this.io.on('connection', function(socket) {
			var controller = new Controller(socket);
			
			// adiciona a conexão no array
			that.clients.push(controller);
			
			// remove a conexão do array
			socket.on('disconnect', function() {
				var idx = that.clients.indexOf(socket);
				that.clients.splice(idx, 1);
			});
			
		});
		
	}
}

export = Controllers;