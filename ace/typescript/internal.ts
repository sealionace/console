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

var currentApp: app.App = null;
var appServe: express.RequestHandler = null;
var controlServe: express.RequestHandler = null;
var http = express();

http.use("/app", function (req, res, next) {
    if (appServe != null)
        appServe(req, res, next);
    else
        next();
});

http.use("/controller", function (req, res, next) {
    if (controlServe != null)
        controlServe(req, res, next);
    else
        next();
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
	}
};

export = internal;
