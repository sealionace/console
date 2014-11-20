/// <reference path="definitions/ace.d.ts"/>
/// <reference path="typings/node/node.d.ts"/>
"use strict";
var app = require("./app");
var fs = require("fs");
var path = require("path");
var Tile = app.App;
var default_icon = "icon-lightning";
// caminho dos apps
var appsDir = aceAPI.getAppDir();
function getApp(appDir) {
    var bundleId = path.basename(appDir);
    appDir += "/app.json";
    if (!fs.existsSync(appDir))
        return null;
    var json = fs.readFileSync(appDir, { encoding: 'utf8' });
    json = JSON.parse(json);
    if (json["bundle-id"] && json["bundle-id"] === bundleId)
        return json;
    else
        return null;
}
function createApp(tiles, _app) {
    var tileDef = _app.tile || {};
    var icon = tileDef.image ? new app.BackgroundImage(tileDef.image) : new app.BackgroundIcon(tileDef.icon || default_icon);
    var size = app.sizeFromString(_app.size || "");
    var orientation = app.orientationFromString(tileDef.orientation || "");
    var bgColor = tileDef.bgColor || "white";
    tiles.push(new Tile(_app["bundle-id"], _app.name, icon, size, orientation, bgColor));
}
function getApps() {
    var tiles = [];
    var files = fs.readdirSync(appsDir);
    for (var i = 0; i < files.length; i++) {
        var atual = appsDir + "/" + files[i];
        var stat = fs.statSync(atual);
        if (stat.isDirectory()) {
            var _app = getApp(atual);
            if (app != null)
                createApp(tiles, _app);
        }
    }
    return tiles;
}
module.exports = getApps;
