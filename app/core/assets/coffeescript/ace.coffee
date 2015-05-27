ace = (conf) ->
  {
    getAppDir: ->
      conf['app-dir']
    getConsolePort: ->
      conf['console-port'] or 10000
    getControllerPort: ->
      conf['controller-port'] or 11000
    getAppWidth: ->
      1600
    getAppHeight: ->
      900
  }

module.exports = ace
