/// <reference path="definitions/ace.d.ts"/>
/// <reference path="typings/node/node.d.ts"/>
/// <reference path="typings/express/express.d.ts"/>
/// <reference path="typings/jquery/jquery.d.ts"/>
"use strict";

import app = require("./app");
import path = require("path");
import fs = require("fs");
import express = require("express");

var currentHttpApp: express.Express = null;

var internal = {

	spawnHttp(root: string, port: number) {
		if (currentHttpApp != null) 
			currentHttpApp.

		var app = express();
		app.use(express.static(root, { index: "main.html" }));
		app.listen(aceAPI.getConsolePort(), "localhost");
	},

	run(app: app.App, iframe: JQuery): void {
		var appDir = path.resolve(aceAPI.getAppDir()) + "/" + app.getBundleID();
		
	}
}

export = internal;
