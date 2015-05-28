/// <reference path="../definitions/ace.d.ts" />
/// <reference path="../typings/node/node.d.ts" />
import events = require("events");
import EventEmitter = events.EventEmitter;
export declare enum Size {
    Single = 0,
    Double = 1,
    Triple = 2,
    Quadro = 3,
}
export declare enum Orientation {
    Horizontal = 0,
    Vertical = 1,
}
export interface Background {
    render(): string;
}
export declare function sizeFromString(size: string): Size;
export declare function getSize(app: App): string;
export declare function orientationFromString(orientation: string): Orientation;
export declare class BackgroundIcon implements Background {
    private tileIcon;
    constructor(tileIcon: string);
    render(): string;
    getIcon(): string;
}
export declare class BackgroundImage implements Background {
    private imagePath;
    constructor(imagePath: string);
    render(): string;
    getImage(): string;
}
export declare class App extends EventEmitter {
    private bundleId;
    private appName;
    private icon;
    private size;
    private orientation;
    private backgroundColor;
    constructor(bundleId: string, appName: string, icon: Background, size?: Size, orientation?: Orientation, backgroundColor?: string);
    getBundleID(): string;
    getName(): string;
    getIcon(): Background;
    getSize(): Size;
    getOrientation(): Orientation;
    getBackgroundColor(): string;
    render(): string;
}
