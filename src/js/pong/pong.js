function setup() {
  createCanvas(660, 510)
}
ballx = 325
bally = 250
bx = 1
by = 0
boty = 255
speed = 1
delta = 30
score1 = 0
score2 = 0

function draw() {
  background("red")
  textSize(14)
  textAlign(CENTER, CENTER)
  delta = 7 * 574/(ballx)
  if (30 <= mouseY && mouseY <= 480) {
    rect(20, mouseY - 30, 16, 60)
    text(str(score1), 28, mouseY)
    
  }
  if (30 > mouseY) {
    rect(20, 0, 16, 60)
    text(str(score1), 28, 30)
  }
  if (mouseY > 480) {
    rect(20, 450, 16, 60)
    text(str(score1), 28, 480)
  }
  ballx += int(speed*(-1)**bx)
  bally += int(speed*(-1)**by)
  if (ballx >= 650) {
    bx += 1
    ballx = 325
    bally = 250
    speed = 1
    score1 += 1
  }
  if (ballx <= 0) {
    bx += 1
    ballx = 325
    bally = 250
    speed = 1
    boty = 255 + (2* (by % 2) -1) * -100
    score2 += 1
    
  }
  if (bally >= 500) {
    by += 1
    
  }
  if (bally <= 0) {
    by += 1
  }
   
  if (ballx <=36 && ballx >= 20) {
    if (mouseY -30 < bally && bally < mouseY + 30 || (mouseY < 30 && bally < 60 && bally > 0 || (mouseY > 480 && bally < 500 && bally > 440))) {
      bx += 1
      speed += 0.5
    }
  }
  if (ballx >= 574 && ballx <= 590) {
    if (boty -30 < bally && bally < boty + 30 || (boty < 30 && bally < 60 && bally > 0 || (boty > 480 && bally < 500 && bally > 440))) {
      bx += 1
      speed += 0.5
  }
  }
  if (bx%2 == 0 || bx%2 == 1) {
    if (bally + delta > boty && boty <= 480){
    boty += int(speed)
  }
  if (bally - delta < boty && boty >= 30) {
    boty -= int(speed)
  }
  }
  square(ballx,bally, 10)
  rect(584, boty -30, 16, 60)
  text(str(score2), 592, boty)
}
