var socket
let hit
let score

function preload() {
    hit = loadSound('./media/hit.mp3')
    score = loadSound('./media/score.mp3')
}

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
    player = 0
    score1 = 0
    score2 = 0
    score3 = 0
    score4 = 0
    socket = io.connect('https://demon.live:25569')
    hit = loadSound('./media/hit.mp3')
    scoresound = loadSound('./media/score.mp3')
    textAlign(CENTER, CENTER)

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

    socket.on('ball',
        function(ball) {
            ballx = ball.x
            bally = ball.y
        }
    )

    socket.on('hit',
        function() {
            if (!(hit.isPlaying())) {
                hit.play()
            }
        }
    )

    socket.on('score',
        function(scoreboard) {
            score1 = scoreboard.a
            score2 = scoreboard.b
            score3 = scoreboard.c
            score4 = scoreboard.d
            if (!(scoresound.isPlaying())) {
                scoresound.play()
            }
        }
    )
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
    sendmouse(mouseX, mouseY, player);

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
    textSize(40)
    rect(mouseX1 - 125, largo - 100, 250, 60)
    text(str(score4), mouseX1, largo - 70)

    rect(40, mouseY1 - 125, 60, 250)
    text(str(score3), 70, mouseY1)

    rect(mouseX2 - 125, 40, 250, 60)
    text(str(score2), mouseX2, 70)

    rect(largo - 100, mouseY2 - 125, 60, 250)
    text(str(score1), largo - 70, mouseY2)

    square(ballx, bally, 60)
}

function sendmouse(xpos, ypos, player) {
    var data = {
        x: xpos,
        y: ypos,
        z: player
    }
    socket.emit('mouse', data)
}