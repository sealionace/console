'use strict';

events = require("events")
EventEmitter = events.EventEmitter

((Size) ->
    Size[Size["Single"] = 0] = "Single"
    Size[Size["Double"] = 1] = "Double"
    Size[Size["Triple"] = 2] = "Triple"
    Size[Size["Quadro"] = 3] = "Quadro"
)(exports.Size || (exports.Size = {}))

Size = exports.Size

((Orientation) ->
    Orientation[Orientation["Horizontal"] = 0] = "Horizontal"
    Orientation[Orientation["Vertical"] = 1] = "Vertical"
)(exports.Orientation || (exports.Orientation = {}))

Orientation = exports.Orientation

sizeFromString = (size) ->
  switch size
    when "double" then Size.Double
    when "triple" then Size.Triple
    when "quadro" then Size.Quadro
    else Size.Single

exports.sizeFromString = sizeFromString

getSize = (app) ->
  switch app.getSize()
    when Size.Double then "double"
    when Size.Triple then "triple"
    when Size.Quadro then "quadro"
    else "single"

exports.getSize = getSize

orientationFromString = (orientation) ->
  if orientation is "vertical" then Orientation.Vertical else Orientation.Horizontal
exports.orientationFromString = orientationFromString

# Class Definitions
class BackgroundIcon
  constructor: (@tileIcon) ->
    this.tileIcon = tileIcon;

  render: ->
    "<div class='tile-content icon'><i class='icon-'#{@tileIcon}></i></div>"

  getIcon: ->
    @tileIcon

exports.BackgroundIcon = BackgroundIcon

class BackgroundImage
  constructor: (@imagePath) ->
  render: ->
    "<div class='tile-content image'><img src='#{this.imagePath}'></div>"
  getImage: ->
    @this.imagePath

exports.BackgroundImage = BackgroundImage

class App extends EventEmitter
  constructor: (@bundleId, @appName, @icon, @size = Size.Single, @orientation = Orientation.Horizontal, @backgroundColor = "white") ->
    super()

  # Why?
  getBundleId: ->
    @bundleId

  getName: ->
    @appName

  getIcon: ->
    @icon

  getSize: ->
    @size

  getOrientation: ->
    @orientation

  getBackgroundColor: ->
    @backgroundColor

  render: ->
    switch @size
      when Size.Double then classes = " tile double"
      when Size.Triple then classes = " tile triple"
      when Size.Quadro then classes = " tile quadro"
      else classes = " tile "

    if (@orientation is Orientation.Vertical) and (@size isnt Size.Single)
      classes += "-vertical "
    else
      classes += " "

    classes += " bg-#{ @backgroundColor }"

    "<div class='#{classes}'>#{ @icon.render() }</div>"

exports.App = App;
