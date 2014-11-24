/// <reference path="definitions/ace.d.ts"/>
/// <reference path="typings/node/node.d.ts"/>
/// <reference path="typings/socket.io/socket.io.d.ts"/>

import events = require("events");
import internal = require("./internal");

class Controller extends events.EventEmitter {
	
	private paused: boolean = false;
	
	constructor(private io: SocketIO.Socket) {
		io.on('pause', function() {
			paused = true;
		});
		
		io.on('resume', function() {
			paused = false;
		});
		
		var that = this;
		io.on('event', function(data: any) {
			var component: string = data.component || "unknown";
			var evt: string = data.event || "unknown";
			that.emit(component + "_" + evt, data.data || {});
		});
	}
	
	vibrate(duration: number = 500): void {
		this.io.emit('vibrate', { tempo: duration });
	}

	beep(times: number = 1): void {
		this.io.emit('beep', { vezes: times });
	}
	
	alternate(controller: string): void {
		internal.changeController(controller);
	}
	
}