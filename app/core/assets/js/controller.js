/// <reference path="definitions/ace.d.ts"/>
/// <reference path="typings/node/node.d.ts"/>
/// <reference path="typings/socket.io/socket.io.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var events = require("events");
//import internal = require("./internal");
var Controller = (function (_super) {
    __extends(Controller, _super);
    function Controller(socket) {
        _super.call(this);
        this.socket = socket;
        this.paused = false;
        var that = this;
        socket.on('pause', function () {
            that.paused = true;
        });
        socket.on('resume', function () {
            that.paused = false;
        });
        socket.on('event', function (data) {
            var component = data.component || "unknown";
            var evt = data.event || "unknown";
            that.emit(component + "_" + evt, data.data || {});
        });
    }
    Controller.prototype.vibrate = function (duration) {
        if (duration === void 0) { duration = 500; }
        this.socket.emit('vibrate', { tempo: duration });
    };
    Controller.prototype.beep = function (times) {
        if (times === void 0) { times = 1; }
        this.socket.emit('beep', { vezes: times });
    };
    Controller.prototype.isPaused = function () {
        return this.paused;
    };
    return Controller;
})(events.EventEmitter);
module.exports = Controller;
