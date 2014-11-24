/// <reference path="definitions/ace.d.ts"/>
/// <reference path="typings/node/node.d.ts"/>
/// <reference path="typings/node/node-webkit.d.ts"/>
/// <reference path="typings/express/express.d.ts"/>
/// <reference path="typings/jquery/jquery.d.ts"/>
"use strict";

import app = require("./app");
import path = require("path");
import fs = require("fs");
import express = require("express");
import gui = require("nw.gui");

var appServe: express.RequestHandler = null;
var http = express();

http.use("/game", function (req, res, next) {
    if (appServe != null)
        appServe(req, res, next);
    else
        next();
});
http.listen(aceAPI.getConsolePort());

var internal = {
	startApp(root: string) {
		appServe = express.static(root, { index: "main.html" });
	},

	run(app: app.App, iframe: JQuery): void {
		var appDir = path.resolve(aceAPI.getAppDir()) + "/" + app.getBundleID();
		this.startApp(appDir);
		iframe.attr("src", "http://localhost:" + aceAPI.getConsolePort() + "/game");
		
		var ifr = gui.Window.get(iframe);
		
	}
};

export = internal;
