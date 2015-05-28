/// <reference path="definitions/ace.d.ts"/>
/// <reference path="typings/node/node.d.ts"/>
"use strict";
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var events = require("events");
var EventEmitter = events.EventEmitter;
(function (Size) {
    Size[Size["Single"] = 0] = "Single";
    Size[Size["Double"] = 1] = "Double";
    Size[Size["Triple"] = 2] = "Triple";
    Size[Size["Quadro"] = 3] = "Quadro";
})(exports.Size || (exports.Size = {}));
var Size = exports.Size;
(function (Orientation) {
    Orientation[Orientation["Horizontal"] = 0] = "Horizontal";
    Orientation[Orientation["Vertical"] = 1] = "Vertical";
})(exports.Orientation || (exports.Orientation = {}));
var Orientation = exports.Orientation;
function sizeFromString(size) {
    if (size == "double")
        return Size.Double;
    if (size == "triple")
        return Size.Triple;
    if (size == "quadro")
        return Size.Quadro;
    return Size.Single;
}
exports.sizeFromString = sizeFromString;
function getSize(app) {
    switch (app.getSize()) {
        case Size.Double:
            return "double";
        case Size.Triple:
            return "triple";
        case Size.Quadro:
            return "quadro";
        case Size.Single:
        default:
            return "single";
    }
}
exports.getSize = getSize;
function orientationFromString(orientation) {
    if (orientation == "vertical")
        return Orientation.Vertical;
    return Orientation.Horizontal;
}
exports.orientationFromString = orientationFromString;
var BackgroundIcon = (function () {
    function BackgroundIcon(tileIcon) {
        this.tileIcon = tileIcon;
    }
    BackgroundIcon.prototype.render = function () {
        return "<div class='tile-content icon'><i class='icon-" + this.tileIcon + "'></i></div>";
    };
    BackgroundIcon.prototype.getIcon = function () {
        return this.tileIcon;
    };
    return BackgroundIcon;
})();
exports.BackgroundIcon = BackgroundIcon;
var BackgroundImage = (function () {
    function BackgroundImage(imagePath) {
        this.imagePath = imagePath;
    }
    BackgroundImage.prototype.render = function () {
        return "<div class='tile-content image'><img src='" + this.imagePath + "'></div>";
    };
    BackgroundImage.prototype.getImage = function () {
        return this.imagePath;
    };
    return BackgroundImage;
})();
exports.BackgroundImage = BackgroundImage;
var App = (function (_super) {
    __extends(App, _super);
    function App(bundleId, appName, icon, size, orientation, backgroundColor) {
        if (size === void 0) { size = Size.Single; }
        if (orientation === void 0) { orientation = Orientation.Horizontal; }
        if (backgroundColor === void 0) { backgroundColor = "white"; }
        _super.call(this);
        this.bundleId = bundleId;
        this.appName = appName;
        this.icon = icon;
        this.size = size;
        this.orientation = orientation;
        this.backgroundColor = backgroundColor;
    }
    App.prototype.getBundleID = function () {
        return this.bundleId;
    };
    App.prototype.getName = function () {
        return this.appName;
    };
    App.prototype.getIcon = function () {
        return this.icon;
    };
    App.prototype.getSize = function () {
        return this.size;
    };
    App.prototype.getOrientation = function () {
        return this.orientation;
    };
    App.prototype.getBackgroundColor = function () {
        return this.backgroundColor;
    };
    App.prototype.render = function () {
        var saida = "", classes = "";
        switch (this.size) {
            case Size.Double:
                classes = " tile double";
                break;
            case Size.Triple:
                classes = " tile triple";
                break;
            case Size.Quadro:
                classes = " tile quadro";
                break;
            case Size.Single:
            default:
                classes = " tile ";
                break;
        }
        if (this.orientation == Orientation.Vertical && this.size != Size.Single) {
            classes += "-vertical ";
        }
        else {
            classes += " ";
        }
        classes += " bg-" + this.backgroundColor;
        saida += "<div class=\"" + classes + "\">";
        saida += this.icon.render();
        saida += "</div>";
        return saida;
    };
    return App;
})(EventEmitter);
exports.App = App;
