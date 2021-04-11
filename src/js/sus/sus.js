let song;

function setup() {
  song = loadSound('media/sound/sus.mp3');
  createCanvas(40, 40);
  background("#202020");
}

function mousePressed() {
  if (song.isPlaying()) {
    song.stop();
    clear();
  } else {
    song.play();
    clear();
  }
}