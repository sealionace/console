/// <reference path="definitions/ace.d.ts"/>
/// <reference path="typings/node/node.d.ts"/>
/// <reference path="typings/node/node-webkit.d.ts"/>
/// <reference path="typings/express/express.d.ts"/>
/// <reference path="typings/jquery/jquery.d.ts"/>
/// <reference path="typings/qr-image/qr-image.d.ts"/>
"use strict";
var path = require("path");
var express = require("express");
var qr = require("qr-image");
var os = require("os");
var currentApp = null;
var appServe = null;
var controlServe = null;
var http = express();
var ifaces = os.networkInterfaces();
var ip = "";
for (var dev in ifaces) {
    ifaces[dev].forEach(function (details) {
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
http.get('/qrcode.svg', function (req, res) {
    var code = qr.image('sl://' + ip, { type: 'svg' });
    res.type('svg');
    code.pipe(res);
});
http.listen(aceAPI.getConsolePort());
var internal = {
    startApp: function (root) {
        appServe = express.static(root, { index: "main.html" });
        //if (Controllers.count() > 0)
        //	Controllers.
    },
    run: function (app, nwGui, iframe) {
        currentApp = app;
        var appDir = path.resolve(aceAPI.getAppDir()) + "/" + app.getBundleID();
        this.startApp(appDir);
        iframe.attr("src", "http://localhost:" + aceAPI.getConsolePort() + "/app");
    },
    changeController: function (controller) {
        var appDir = path.resolve(aceAPI.getAppDir()) + "/" + currentApp.getBundleID() + "/" + controller;
        controlServe = express.static(appDir, { index: "main.html" });
    },
    getCurrentApp: function () {
        return currentApp;
    }
};
module.exports = internal;
