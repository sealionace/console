/// <reference path="../definitions/ace.d.ts" />
/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/node/node-webkit.d.ts" />
/// <reference path="../typings/express/express.d.ts" />
/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="../typings/qr-image/qr-image.d.ts" />
import app = require("./app");
declare var internal: {
    startApp(root: string): void;
    run(app: app.App, nwGui: any, iframe: JQuery): void;
    changeController(controller: string): void;
    getCurrentApp(): app.App;
};
export = internal;
