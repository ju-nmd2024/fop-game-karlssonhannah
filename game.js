function setup() {
  createCanvas(600, 600);
}

let x = 250;
let y = 370;
let f = 300;
let i = 200;
let o = 300;
let r = 250;
const s = 0.6;
let screen = "start";
let velocity = 0.5;
const acceleration = 0.1;

//fish in background
function fish(f, i) {
  fill(255, 153, 51);
  noStroke();
  ellipse(f + 100, i + 10, 100, 20, 10);
  fill(255, 102, 0);
  triangle(f + 60, i + 10, f + 50, i, f + 50, i + 20);
  fill(255, 255, 255);
  ellipse(f + 130, i + 6, 10, 10);
  fill(0, 0, 0);
  ellipse(f + 132, i + 5, 5, 5);
}

function fishMove() {
  push();
  fill(255, 255, 255);
  background(125, 200, 236);
  fish(f - 230, i - 40);
  fish(f - 250, i - 150);
  fish(f - 250, i + 100);
  fish(f - 220, i + 50);
  fish(f - 180, i - 100);
  //movement for the fishes
  f = f + 0.7;
  if (f > 500) {
    f = -10;
  }
  pop();
}

//oceanbottom
function oceanBottom() {
  push();
  fill(246, 215, 176);
  noStroke();
  rect(o - 300, r + 250, 590, 105);
  pop();
}
function submarine(x, y) {
  push();
  translate();
  //windows of the submarine
  function window(x, y) {
    stroke(64, 64, 64);
    strokeWeight(6);
    fill(173, 216, 230);
    ellipse(x, y, 50 * s, 40 * s);
  }

  //Propeller
  stroke(64, 64, 64);
  strokeWeight(2);
  fill(192, 192, 192);
  rect(x + 140 * s, y, 65 * s, 10 * s, 20 * s);
  ellipse(x + 200 * s, y + 39 * s, 10 * s, 70 * s);
  ellipse(x + 200 * s, y - 32 * s, 10 * s, 70 * s);

  //tower
  stroke(64, 64, 64);
  strokeWeight(4);
  fill(242, 82, 67);
  rect(x - 60 * s, y - 160 * s, 80 * s, 80 * s, 20 * s);

  //background of the submarine
  ellipse(x, y, 290 * s, 200 * s);

  //all windows
  window(x - 20 * s, y);
  window(x + 40 * s, y);
  window(x + 100 * s, y);
  window(x - 20 * s, y - 125 * s);

  //front window of the submarine
  ellipse(x - 110 * s, y, 70 * s, 100 * s);

  //detail above the background of the submarine
  noStroke();
  fill(64, 64, 64);
  rect(x - 70 * s, y - 105 * s, 100 * s, 15 * s, 30 * s);

  //periscope
  rect(x - 30 * s, y - 240 * s, 20 * s, 80 * s);
  rect(x - 70 * s, y - 240 * s, 40 * s, 20 * s);
  stroke(0, 0, 0);
  strokeWeight(4);
  fill(0, 110, 200);
  ellipse(x - 70 * s, y - 230 * s, 10 * s, 27 * s);

  //fins
  stroke(64, 64, 64);
  strokeWeight(4);
  fill(242, 82, 67);
  triangle(
    x + 85 * s,
    y - 80 * s,
    x + 140 * s,
    y - 30 * s,
    x + 160 * s,
    y - 70 * s
  );
  triangle(
    x + 85 * s,
    y + 80 * s,
    x + 140 * s,
    y + 30 * s,
    x + 160 * s,
    y + 70 * s
  );

  pop();
}

function draw() {
  fish(f, i);
  scenery();
  oceanBottom();
}

function startScreen() {
  fishMove();
  oceanBottom();
  textSize(50);
  fill(255, 255, 255);
  text("click to start ", 195, 290);
}

function gameScreen() {
  fishMove();
  oceanBottom();
  submarine(x, y - 200, 0.9);
  if (keyIsDown(32)) {
    y = y - 1;
  } else if (y < 650) {
    y = y + velocity;
    velocity += acceleration;
  }
}

function mouseClicked() {
  if (screen === "start") {
    screen = "game";
    y = 200;
  }
}
function draw() {
  if (screen === "start") {
    startScreen();
  } else if (screen === "game") {
    gameScreen();
  }
}

function winScreen() {
  fishMove();
  oceanBottom();
  textSize(50);
  fill(0, 128, 0);
  text("YOU WON", 160, 300);
  fill(255, 255, 255);
  text("click to play again", 170, 350);
}

function lostScreen() {
  fishMove();
  oceanBottom();
  textSize(50);
  fill(255, 0, 0);
  text("GAME OVER", 160, 300);
  fill(255, 255, 255);
  text("click to play again", 170, 350);
}
