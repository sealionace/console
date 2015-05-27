# Lê configuração específica do app.
require('pkginfo') module, 'ace'
conf = exports.ace

# Não exponhamos nossas configurações abertamente...
delete exports.ace
module.exports = require('./ace')(conf)
module.exports.count = 1

global.aceAPI = module.exports
