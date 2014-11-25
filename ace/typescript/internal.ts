/// <reference path="definitions/ace.d.ts"/>
/// <reference path="typings/node/node.d.ts"/>
/// <reference path="typings/node/node-webkit.d.ts"/>
/// <reference path="typings/express/express.d.ts"/>
/// <reference path="typings/jquery/jquery.d.ts"/>
/// <reference path="typings/qr-image/qr-image.d.ts"/>
"use strict";

import app = require("./app");
import path = require("path");
import fs = require("fs");
import express = require("express");
import qr = require("qr-image");
import os = require("os");

var currentApp: app.App = null;
var appServe: express.RequestHandler = null;
var controlServe: express.RequestHandler = null;
var http = express();

var ifaces = os.networkInterfaces();
var ip: string = "";
for (var dev in ifaces) {
	ifaces[dev].forEach(function(details) {
		if (details.family === 'IPv4' && details.address !== "127.0.0.1") {
			ip = details.address;
            return;
		}
	});
    if (ip !== "")
        break;
}

// serve o app para o iframe
http.use("/app", function (req, res, next) {
    if (appServe != null)
        appServe(req, res, next);
    else
        next();
});

// serve o controle para os conectados
http.use("/controller", function (req, res, next) {
    if (controlServe != null)
        controlServe(req, res, next);
    else
        next();
});

// serve o QRCode para conectar haha (:
http.get('/qrcode.svg', function(req, res) {
	var code = qr.image('sl://' + ip, { type: 'svg' });
    res.type('svg');
    code.pipe(res);
});

http.listen(aceAPI.getConsolePort());

var internal = {
	startApp(root: string) {
		appServe = express.static(root, { index: "main.html" });
	},

	run(app: app.App, nwGui: any, iframe: JQuery): void {
		currentApp = app;
		var appDir = path.resolve(aceAPI.getAppDir()) + "/" + app.getBundleID();
		this.startApp(appDir);
		iframe.attr("src", "http://localhost:" + aceAPI.getConsolePort() + "/app");
	},

	changeController(controller: string): void {
		var appDir = path.resolve(aceAPI.getAppDir()) + "/" + currentApp.getBundleID() + "/" + controller;
		controlServe = express.static(appDir, { index: "main.html" });
	},
    
    getCurrentApp(): app.App {
        return currentApp;
    }
};

export = internal;
