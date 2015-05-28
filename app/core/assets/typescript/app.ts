/// <reference path="definitions/ace.d.ts"/>
/// <reference path="typings/node/node.d.ts"/>
"use strict";

import events = require("events");
import EventEmitter = events.EventEmitter;

export enum Size {
    Single, Double, Triple, Quadro
}

export enum Orientation {
    Horizontal, Vertical
}

export interface Background {
    render(): string;
}

export function sizeFromString(size: string): Size {
    if (size == "double")
        return Size.Double;
    if (size == "triple")
        return Size.Triple;
    if (size == "quadro")
        return Size.Quadro;

    return Size.Single;
}

export function getSize(app: App): string {
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

export function orientationFromString(orientation: string): Orientation {
    if (orientation == "vertical")
        return Orientation.Vertical;

    return Orientation.Horizontal;
}

export class BackgroundIcon implements Background {
    constructor(private tileIcon: string) { }
    render(): string {
        return "<div class='tile-content icon'><i class='icon-" + this.tileIcon + "'></i></div>";
    }

    getIcon(): string {
        return this.tileIcon;
    }
}

export class BackgroundImage implements Background {
    constructor(private imagePath: string) { }
    render(): string {
        return "<div class='tile-content image'><img src='" + this.imagePath + "'></div>";
    }

    getImage(): string {
        return this.imagePath;
    }
}

export class App extends EventEmitter {
    constructor(
        private bundleId: string,
        private appName: string,
        private icon: Background,
        private size: Size = Size.Single,
        private orientation: Orientation = Orientation.Horizontal,
        private backgroundColor: string = "white"
        ) {
        super();
    }

    getBundleID(): string {
        return this.bundleId;
    }

    getName(): string {
        return this.appName;
    }

    getIcon(): Background {
        return this.icon;
    }

    getSize(): Size {
        return this.size;
    }

    getOrientation(): Orientation {
        return this.orientation;
    }

    getBackgroundColor(): string {
        return this.backgroundColor;
    }

    render(): string {
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
        } else {
            classes += " ";
        }

        classes += " bg-" + this.backgroundColor;

        saida += "<div class=\"" + classes + "\">";
        saida += this.icon.render();
        saida += "</div>";

        return saida;
    }
}