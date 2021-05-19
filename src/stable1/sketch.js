var socket;

function setup() {
    largo = 3000
    ancho = 3000
    createCanvas(largo, ancho)
    ballx = largo / 2 - 30
    bally = ancho / 2 - 30
    bx = 1
    by = 1
    speed = 1
    score1 = 0
    score2 = 0
    score3 = 0
    score4 = 0
    rgbRed = 128
    rgbGreen = 0
    rgbBlue = 254
    bRed = 0
    bGreen = 0
    bBlue = 0
    speed = 10
    player1 = false
    player2 = false
    player3 = false
    player4 = false
    selection = true
    start = false
    mouseY1 = ancho / 2
    mouseY2 = ancho / 2
    mouseX1 = largo / 2
    mouseX2 = largo / 2
    bonusx = 1
    bonusy = 0
    socket = io.connect('http://demon.live:25570');
}

function keyPressed() {
    if (keyCode === LEFT_ARROW && selection) {
        player1 = true
        player2 = false
        player3 = false
        player4 = false
        selection = false
    }
    if (keyCode === RIGHT_ARROW && selection) {
        player1 = false
        player2 = false
        player3 = true
        player4 = false
        selection = false
    }
    if (keyCode === UP_ARROW && selection) {
        player1 = false
        player2 = true
        player3 = false
        player4 = false
        selection = false
    }
    if (keyCode === DOWN_ARROW && selection) {
        player1 = false
        player2 = false
        player3 = false
        player4 = true
        selection = false
    }
}

function draw() {
    createCanvas(largo, ancho)
    socket.on('mouse',
        function(data) {
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
    if (player2 || player3 || player4) {
        socket.on('ball',
            function(ball) {
                ballx = ball.x
                bally = ball.y
            }
        )
    }
    rgbRed += (-1) ** bRed
    rgbGreen += (-1) ** bGreen
    rgbBlue += (-1) ** bBlue
    if (rgbRed == 255 || rgbRed == 0) {
        bRed += 1
    }
    if (rgbGreen == 255 || rgbGreen == 0) {
        bGreen += 1
    }
    if (rgbBlue == 255 || rgbBlue == 0) {
        bBlue += 1
    }
    background(rgbRed, rgbGreen, rgbBlue)
    if (mouseX1 != largo / 2 && mouseX2 != largo / 2 && mouseY1 != largo / 2 && mouseY2 != largo / 2) {
        start = true
    }
    if (player1) {
        mouseY1 = mouseY
        player = 1
    }
    if (player2) {
        mouseX2 = mouseX
        player = 2
    }
    if (player3) {
        mouseY2 = mouseY
        player = 3
    }
    if (player4) {
        mouseX1 = mouseX
        player = 4
    }
    rect(mouseX1 - 125, largo - 100, 250, 60)
    rect(40, mouseY1 - 125, 60, 250)
    rect(mouseX2 - 125, 40, 250, 60)
    rect(largo - 100, mouseY2 - 125, 60, 250)
    square(ballx, bally, 60)
    if (start && player1) {
        ballx += int(bonusx * speed * (-1) ** bx)
        bally += int(bonusy * speed * (-1) ** by)
        sendball(ballx, bally)

        if (ballx >= largo - 160 && bally <= mouseY2 + 125 && mouseY2 - 125 - 60 <= bally && bx % 2 == 0) {
            bx += 1
            by = 0
            if (bally + 30 <= mouseY2) {
                by = 1
            }
            speed += 0.5
            bonusy = abs(mouseY2 - bally - 30) / 125
            bonusx = 1 + abs(125 - abs(bally - 30 - mouseY2)) / 125
        }
        if (bally <= 100 && ballx <= mouseX2 + 125 && mouseX2 - 125 - 60 <= ballx && by % 2 == 1) {
            by += 1
            bx = 0
            if (ballx + 30 <= mouseX2) {
                bx = 1
            }
            speed += 0.5
            bonusx = abs(mouseX2 - ballx - 30) / 125
            bonusy = 1 + abs(125 - abs(ballx - 30 - mouseX2)) / 125
        }
        if (ballx <= 100 && bally <= mouseY1 + 125 && mouseY1 - 125 - 60 <= bally && bx % 2 == 1) {
            bx += 1
            by = 0
            if (bally + 30 <= mouseY1) {
                by = 1
            }
            speed += 0.5
            bonusy = abs(mouseY1 - bally - 30) / 125
            bonusx = 1 + abs(125 - abs(bally - 30 - mouseY1)) / 125
        }
        if (bally >= ancho - 160 && ballx <= mouseX1 + 125 && mouseX1 - 125 - 60 <= ballx && by % 2 == 0) {
            by += 1
            bx = 0
            if (ballx + 30 <= mouseX1) {
                bx = 1
            }
            speed += 0.5
            bonusx = abs(mouseX1 - ballx - 30) / 125
            bonusy = 1 + abs(125 - abs(ballx - 30 - mouseX1)) / 125
        }
        if (bally <= -60 || bally >= ancho) {
            ballx = largo / 2 - 30
            bally = ancho / 2 - 30
            speed = 10
            bx = 1
            by = 1
            bonusx = 1
            bonusy = 0
        }
        if (ballx <= -60 || ballx >= largo) {
            ballx = largo / 2 - 30
            bally = ancho / 2 - 30
            speed = 10
            bx = 1
            by = 1
            bonusx = 1
            bonusy = 0
        }
    }
}

function mouseMoved() {
    sendmouse(mouseX, mouseY, player);
}

function sendball(ballx, bally) {
    var ball = {
        x: ballx,
        y: bally,
    }
    socket.emit('ball', ball)
}

function sendmouse(xpos, ypos, player) {
    var data = {
        x: xpos,
        y: ypos,
        z: player
    }
    socket.emit('mouse', data)
}