declare function ace(conf: any): {
    getAppDir(): string;
    getConsolePort(): number;
    getControllerPort(): number;
    getAppWidth(): number;
    getAppHeight(): number;
};
export = ace;
