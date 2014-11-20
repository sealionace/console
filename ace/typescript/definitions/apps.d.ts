/// <reference path="../definitions/ace.d.ts" />
/// <reference path="../typings/node/node.d.ts" />
import app = require("./app");
declare function getApps(): app.App[];
export = getApps;
