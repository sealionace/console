/// <reference path="../definitions/ace.d.ts" />
/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/express/express.d.ts" />
/// <reference path="../typings/jquery/jquery.d.ts" />
import app = require("./app");
declare var internal: {
    spawnHttp: (root: string, port: number) => void;
    run: (app: app.App, iframe: JQuery) => void;
};
export = internal;
