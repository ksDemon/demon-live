var socket
let hit
let score

function preload() {
    hit = loadSound('./media/hit.mp3')
    scoresound = loadSound('./media/score.mp3')
    up = loadImage('./media/up.png');
    down = loadImage('./media/down.png');
    left = loadImage('./media/left.png');
    right = loadImage('./media/right.png');
    upw = loadImage('./media/upw.png');
    downw = loadImage('./media/downw.png');
    leftw = loadImage('./media/leftw.png');
    rightw = loadImage('./media/rightw.png');

}

function setup() {
    largo = 3000
    ancho = 3000
    createCanvas(largo, ancho)
    ballx = largo / 2 - 30
    bally = ancho / 2 - 30
    score1 = 0
    score2 = 0
    score3 = 0
    score4 = 0
    rgbRed = 125
    rgbGreen = 0
    rgbBlue = 253
    bRed = 0
    bGreen = 0
    bBlue = 0
    player1 = false
    player2 = false
    player3 = false
    player4 = false
    selection = true
    click = false
    mouseY1 = ancho / 2
    mouseY2 = ancho / 2
    mouseX1 = largo / 2
    mouseX2 = largo / 2
    player = 0
    socket = io.connect('https://demon.live:25569')

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


function draw() {
    createCanvas(largo, ancho)
    sendmouse(mouseX, mouseY, player);

    rgbBackground()
    if (selection) {
        drawSelection()
    }
    definePlayer()
    drawMain()
}

function sendmouse(xpos, ypos, player) {
    var data = {
        x: xpos,
        y: ypos,
        z: player
    }
    socket.emit('mouse', data)
}

function drawMain() {
    textFont('Helvetica')
    strokeWeight(0)
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

function drawSelection() {
    image(up, largo / 2 - 100, ancho / 2 - 750, 200, 200)
    image(down, largo / 2 - 100, ancho / 2 + 750 - 200, 200, 200)
    image(left, largo / 2 - 750, ancho / 2 - 100, 200, 200)
    image(right, largo / 2 + 750 - 200, ancho / 2 - 100, 200, 200)

    if ((largo / 2 - 100 <= mouseX && mouseX <= largo / 2 - 100 + 200) && (ancho / 2 - 750 <= mouseY && mouseY <= ancho / 2 - 750 + 200)) {
        image(upw, largo / 2 - 100, ancho / 2 - 750, 200, 200)
        if (click) {
            player = 2
            selection = false
        }
    }

    if ((largo / 2 - 100 <= mouseX && mouseX <= largo / 2 - 100 + 200) && (ancho / 2 + 750 - 200 <= mouseY && mouseY <= ancho / 2 + 750 - 200 + 200)) {
        image(downw, largo / 2 - 100, ancho / 2 + 750 - 200, 200, 200)
        if (click) {
            player = 4
            selection = false
        }
    }

    if ((largo / 2 - 750 <= mouseX && mouseX <= largo / 2 - 750 + 200) && (ancho / 2 - 100 <= mouseY && mouseY <= ancho / 2 - 100 + 200)) {
        image(leftw, largo / 2 - 750, ancho / 2 - 100, 200, 200)
        if (click) {
            player = 1
            selection = false
        }
    }

    if ((largo / 2 + 750 - 200 <= mouseX && mouseX <= largo / 2 + 750 - 200 + 200) && (ancho / 2 - 100 <= mouseY && mouseY <= ancho / 2 - 100 + 200)) {
        image(rightw, largo / 2 + 750 - 200, ancho / 2 - 100, 200, 200)
        if (click) {
            player = 3
            selection = false
        }
    }


}

function rgbBackground() {
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
}

function definePlayer() {
    if (player == 1) {
        mouseY1 = mouseY
    }
    if (player == 2) {
        mouseX2 = mouseX
    }
    if (player == 3) {
        mouseY2 = mouseY
    }
    if (player == 4) {
        mouseX1 = mouseX
    }
}

function mousePressed() {
    click = true
}

function mouseReleased() {
    click = false
}