var https = require('https')
var url = require('url')
var path = require('path')
var fs = require('fs')

var server = https.createServer({
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
}, handleRequest)
server.listen(25569)
console.log('Server iniciado en el puerto 25569')

largo = 3000
ancho = 3000
ballx = largo / 2 - 30
bally = ancho / 2 - 30
bx = 1
by = 1
speed = 3
start = false
mouseY1 = ancho / 2
mouseY2 = ancho / 2
mouseX1 = largo / 2
mouseX2 = largo / 2
bonusx = 1
bonusy = 0

function handleRequest(req, res) {
    var pathname = req.url

    if (pathname == '/') {
        pathname = '/index.html'
    }
    var ext = path.extname(pathname)
    var typeExt = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css'
    }
    var contentType = typeExt[ext] || 'text/plain'
    fs.readFile(__dirname + pathname,
        function(err, data) {
            if (err) {
                res.writeHead(500);
                return res.end('Error loading ' + pathname)
            }

            res.writeHead(200, { 'Content-Type': contentType })
            res.end(data);
        }
    )
}
var io = require('socket.io')(server, {
    cors: {
        origin: "*"
    }
})
io.sockets.on('connection',
    function(socket) {
        console.log(socket.id + " se ha unido");

        socket.on('mouse',
            function(data) {
                socket.broadcast.emit('mouse', data);
                if (data.z == 1) {
                    mouseY1 = data.y
                } else if (data.z == 2) {
                    mouseX2 = data.x
                } else if (data.z == 3) {
                    mouseY2 = data.y
                } else if (data.z == 4) {
                    mouseX1 = data.x
                }
            }
        )

        socket.on('disconnect', function() {
            console.log(socket.id + " se desconectó");
        })

        setInterval(function() {
            if (mouseX1 != largo / 2 && mouseX2 != largo / 2 && mouseY1 != largo / 2 && mouseY2 != largo / 2) {
                start = true
            }
            if (start) {
                ballx += parseInt(bonusx * speed * (-1) ** bx)
                bally += parseInt(bonusy * speed * (-1) ** by)
                var ball = {
                    x: ballx,
                    y: bally,
                }
                socket.broadcast.emit('ball', ball);

                if (ballx >= largo - 160 && bally <= mouseY2 + 125 && mouseY2 - 125 - 60 <= bally && bx % 2 == 0) {
                    bx += 1
                    by = 0
                    if (bally + 30 <= mouseY2) {
                        by = 1
                    }
                    speed += 0.5
                    bonusy = Math.abs(mouseY2 - bally - 30) / 125
                    bonusx = 1 + Math.abs(125 - Math.abs(bally - 30 - mouseY2)) / 125
                }
                if (bally <= 100 && ballx <= mouseX2 + 125 && mouseX2 - 125 - 60 <= ballx && by % 2 == 1) {
                    by += 1
                    bx = 0
                    if (ballx + 30 <= mouseX2) {
                        bx = 1
                    }
                    speed += 0.5
                    bonusx = Math.abs(mouseX2 - ballx - 30) / 125
                    bonusy = 1 + Math.abs(125 - Math.abs(ballx - 30 - mouseX2)) / 125
                }
                if (ballx <= 100 && bally <= mouseY1 + 125 && mouseY1 - 125 - 60 <= bally && bx % 2 == 1) {
                    bx += 1
                    by = 0
                    if (bally + 30 <= mouseY1) {
                        by = 1
                    }
                    speed += 0.5
                    bonusy = Math.abs(mouseY1 - bally - 30) / 125
                    bonusx = 1 + Math.abs(125 - Math.abs(bally - 30 - mouseY1)) / 125
                }
                if (bally >= ancho - 160 && ballx <= mouseX1 + 125 && mouseX1 - 125 - 60 <= ballx && by % 2 == 0) {
                    by += 1
                    bx = 0
                    if (ballx + 30 <= mouseX1) {
                        bx = 1
                    }
                    speed += 0.5
                    bonusx = Math.abs(mouseX1 - ballx - 30) / 125
                    bonusy = 1 + Math.abs(125 - Math.abs(ballx - 30 - mouseX1)) / 125
                }
                if (bally <= -60 || bally >= ancho) {
                    ballx = largo / 2 - 30
                    bally = ancho / 2 - 30
                    speed = 3
                    bx = 1
                    by = 1
                    bonusx = 1
                    bonusy = 0
                }
                if (ballx <= -60 || ballx >= largo) {
                    ballx = largo / 2 - 30
                    bally = ancho / 2 - 30
                    speed = 3
                    bx = 1
                    by = 1
                    bonusx = 1
                    bonusy = 0
                }
            }
        }, 20)
    }
)