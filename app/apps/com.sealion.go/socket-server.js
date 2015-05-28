var app = require('http').createServer(handler);
var io = require('socket.io')(app);
var fs = require('fs');

var arquivo = fs.readFileSync("index.html");

app.listen(8888);

function handler(req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.end(arquivo);
}

io.on('connection', function (socket) {
    socket.on('disconnect', function () {
        //pausar
    });
    socket.on('evento', function (e) {
        eventos[e.call].call(this, e);
    });

});