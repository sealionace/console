'use strict'
app = require('./app')
fs = require('fs')
path = require('path')
Tile = app.App
default_icon = 'icon-lightning'

# Caminho dos apps.
appsDir = path.resolve(aceAPI.getAppDir())

getApp = (appDir) ->
  expectedBundleId = path.basename(appDir)
  appDir += '/app.json'

  if !fs.existsSync(appDir)
    return null

  json = fs.readFileSync(appDir, encoding: 'utf8')
  json = JSON.parse(json)

  if json['bundle-id'] and json['bundle-id'] is expectedBundleId then json else null

createApp = (tiles, _app) ->
  tileDef = _app.tile or {}
  icon = if tileDef.image then new (app.BackgroundImage)(tileDef.image) else new (app.BackgroundIcon)(tileDef.icon or default_icon)
  size = app.sizeFromString(_app.size or '')
  orientation = app.orientationFromString(tileDef.orientation or '')
  bgColor = tileDef.bgColor or 'white'
  tiles.push new Tile(_app['bundle-id'], _app.name, icon, size, orientation, bgColor)
  return

getApps = ->
  tiles = []
  files = fs.readdirSync(appsDir)
  i = 0
  while i < files.length
    atual = appsDir + '/' + files[i]
    stat = fs.statSync(atual)
    if stat.isDirectory()
      _app = getApp(atual)
      if _app != null
        createApp tiles, _app
    i++
  tiles


module.exports = getApps
