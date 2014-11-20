/// <reference path="definitions/ace.d.ts"/>
/// <reference path="typings/node/node.d.ts"/>
/// <reference path="typings/express/express.d.ts"/>
/// <reference path="typings/jquery/jquery.d.ts"/>
"use strict";
var path = require("path");
var express = require("express");
var currentHttpApp;
var internal = {
    spawnHttp: function (root, port) {
        var app = express();
        app.use(express.static(root, { index: "main.html" }));
        app.listen(aceAPI.getConsolePort(), "localhost");
    },
    run: function (app, iframe) {
        var appDir = path.resolve(aceAPI.getAppDir()) + "/" + app.getBundleID();
    }
};
module.exports = internal;
