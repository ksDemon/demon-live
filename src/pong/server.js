var https = require('https');
var url = require('url');
var path = require('path');
var fs = require('fs');
var server = https.createServer({
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
    cors: {
        origin: "*",
    }
}, handleRequest);
server.listen(25569);
console.log('Server started on port 25569');


function handleRequest(req, res) {
    var pathname = req.url;

    if (pathname == '/') {
        pathname = '/index.html';
    }
    var ext = path.extname(pathname);
    var typeExt = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css'
    };
    var contentType = typeExt[ext] || 'text/plain';
    fs.readFile(__dirname + pathname,
        function(err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading ' + pathname);
            }
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        }
    );
}
var io = require('socket.io').listen(server);
io.sockets.on('connection',
    function(socket) {
        console.log("We have a new client: " + socket.id);
        socket.on('mouse',
            function(data) {
                socket.broadcast.emit('mouse', data);
            }
        );
        socket.on('ball',
            function(ball) {
                console.log("Received: 'ball' " + ball.x + " " + ball.y);
                socket.broadcast.emit('ball', ball);
            }
        );
        socket.on('disconnect', function() {
            console.log("Client has disconnected");
        });
    }
);