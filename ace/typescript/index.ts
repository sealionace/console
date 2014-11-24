function ace(conf: any) {
	return {
		getAppDir(): string {
			return conf["app-dir"];
		},

		getConsolePort(): number {
			return conf["console-port"] || 10000;
		},

		getControllerPort(): number {
			return conf["controller-port"] || 11000;
		},
        
        getAppWidth(): number {
            return 1600;
        },
        
        getAppHeight(): number {
            return 900;
        }
	};
}

export = ace;