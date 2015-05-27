/// <reference path="definitions/ace.d.ts"/>
/// <reference path="typings/node/node.d.ts"/>
/// <reference path="typings/socket.io/socket.io.d.ts"/>
var IO = require('socket.io');
var Controller = require('./controller');
var internal = require("./internal");
var io;
var clients = [];
var controllers = {
    get: function (i) {
        return clients[i];
    },
    count: function () {
        return clients.length;
    },
    alternate: function (controller) {
        internal.changeController(controller);
        io.emit('reload');
    },
    disconnectedHandler: Function = null,
    connectedHandler: Function = null
};
io = IO(aceAPI.getControllerPort());
io.on('connection', function (socket) {
    var controller = new Controller(socket);
    // adiciona a conexão no array
    clients.push(controller);
    if (controllers.connectedHandler)
        controllers.connectedHandler();
    // remove a conexão do array
    socket.on('disconnect', function () {
        var idx = clients.indexOf(controller);
        clients.splice(idx, 1);
        if (controllers.disconnectedHandler)
            controllers.disconnectedHandler();
    });
});
module.exports = controllers;
