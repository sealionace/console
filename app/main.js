// lê configuração específica do app
require("pkginfo")(module, 'ace');
var conf = exports.ace;

// não exponhamos nossas configurações abertamente...
delete exports.ace;

module.exports = require("ace")(conf);

/*exports.getAppDir = function() {
    return conf["app-dir"];
};*/

global.aceAPI = module.exports;