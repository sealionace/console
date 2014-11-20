declare function ace(conf: any): {
    getAppDir: () => string;
    getConsolePort: () => number;
    getControllerPort: () => number;
};
export = ace;
