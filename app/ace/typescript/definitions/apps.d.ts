/// <reference path="../definitions/ace.d.ts" />
/// <reference path="../typings/node/node.d.ts" />
import app = require("./app");
import Tile = app.App;
declare function getApps(): Tile[];
export = getApps;
