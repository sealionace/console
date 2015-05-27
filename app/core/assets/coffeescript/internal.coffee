'use strict'
path = require('path')
express = require('express')
qr = require('qr-image')
os = require('os')

currentApp = null
appServe = null
controlServe = null
http = express()
ifaces = os.networkInterfaces()
ip = ''

setIP = (details) ->
  if details.family is 'IPv4' and details.address isnt '127.0.0.1'
    ip = details.address
    return

for dev of ifaces
  ifaces[dev].forEach setIP
  if ip isnt ''
    break

# Serve o app para o iframe.
http.use '/app', (req, res, next) ->
  if appServe isnt null
    appServe req, res, next
  else
    next()
  return

# Serve o controle para os conectados.
http.use '/controller', (req, res, next) ->
  if controlServe isnt null
    controlServe req, res, next
  else
    next()
  return

# Serve o QRCode para conectar.
http.get '/qrcode.svg', (req, res) ->
  code = qr.image("sl://#{ ip }", type: 'svg')
  res.type 'svg'
  code.pipe res
  return

http.listen aceAPI.getConsolePort()
internal =
  startApp: (root) ->
    appServe = express.static(root, index: 'main.html')
    return

  run: (app, nwGui, iframe) ->
    currentApp = app
    appDir = path.resolve(aceAPI.getAppDir()) + '/' + app.getBundleID()
    @startApp appDir
    iframe.attr 'src', "http://localhost:#{ aceAPI.getConsolePort() }/app"
    return

  changeController: (controller) ->
    appDir = "#{ path.resolve aceAPI.getAppDir() }/#{ currentApp.getBundleID() }/#{ controller }"
    controlServe = express.static(appDir, index: 'main.html')
    return

  getCurrentApp: ->
    currentApp

module.exports = internal
