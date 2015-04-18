/// <reference path="definitions/ace.d.ts"/>
/// <reference path="typings/node/node.d.ts"/>
"use strict";

import app = require("./app");
import fs = require("fs");
import path = require("path");

import Tile = app.App;

var default_icon = "icon-lightning";

// caminho dos apps
var appsDir: string = path.resolve(aceAPI.getAppDir());

function getApp(appDir: string): any {
    var expectedBundleId = path.basename(appDir);

    appDir += "/app.json";
    if (!fs.existsSync(appDir)) return null;

    var json: any = fs.readFileSync(appDir, { encoding: 'utf8' });
    json = JSON.parse(json);

    if (json["bundle-id"] && json["bundle-id"] === expectedBundleId)
        return json;
    else
        return null;
}

function createApp(tiles: Tile[], _app: any) {
    var tileDef = _app.tile || {};
    var icon: app.Background = tileDef.image ? 
        new app.BackgroundImage(tileDef.image) : 
        new app.BackgroundIcon(tileDef.icon||default_icon);
    var size = app.sizeFromString(_app.size||"");
    var orientation = app.orientationFromString(tileDef.orientation||"");
    var bgColor = tileDef.bgColor || "white";

    tiles.push(new Tile(
        _app["bundle-id"],
        _app.name,
        icon,
        size,
        orientation,
        bgColor
    ));
}

function getApps(): Tile[] {
    var tiles: Tile[] = [];
    var files = fs.readdirSync(appsDir);

    for (var i = 0; i < files.length; i++) {
        var atual = appsDir + "/" + files[i];
        var stat = fs.statSync(atual);

        if (stat.isDirectory()) {
            var _app = getApp(atual);

            if (_app != null) 
                createApp(tiles, _app);
        }
    }

    return tiles;
}

export = getApps;
