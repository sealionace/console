function ace(conf) {
    return {
        getAppDir: function () {
            return conf["app-dir"];
        },
        getConsolePort: function () {
            return conf["console-port"] || 10000;
        },
        getControllerPort: function () {
            return conf["controller-port"] || 11000;
        }
    };
}
module.exports = ace;
