'use strict'
IO = require('socket.io')
Controller = require('./controller')
internal = require('./internal')

io = undefined
clients = []

controllers =
  get: (i) ->
    clients[i]

  count: ->
    clients.length

  alternate: (controller) ->
    internal.changeController controller
    io.emit 'reload'
    return

  disconnectedHandler: Function = null
  connectedHandler: Function = null

io = IO(aceAPI.getControllerPort())

io.on 'connection', (socket) ->
  controller = new Controller(socket)
  # Adiciona a conexão no Array
  clients.push controller
  if controllers.connectedHandler
    controllers.connectedHandler()
  # Remove a conexão do Array

  socket.on 'disconnect', ->
    idx = clients.indexOf(controller)
    clients.splice idx, 1
    if controllers.disconnectedHandler
      controllers.disconnectedHandler()
    return
  return

module.exports = controllers
