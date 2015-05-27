events = require("events")

class Controller extends events.EventEmitter
  constructor: (@socket) ->
    super()
    @paused = no

    socket.on 'pause', =>
      @paused = yes

    socket.on 'resume', =>
      @paused = yes

    socket.on 'event', (data) =>
      component = data.component or 'unknown'
      event = data.event or 'unknown'
      @emit("#{component}_#{event}", data.data or {})

  vibrate: (duration = 500) ->
    @socket.emit('vibrate', { tempo: duration } )

  beep: (times = 1) ->
    @socket.emit('beep', { vezes: times })

  isPaused: ->
    @paused

module.exports = Controller;
