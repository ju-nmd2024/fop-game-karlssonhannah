function setup() {
  createCanvas(700, 600);
}
let f = 300;
let i = 200;
let o = 300;
let r = 250;
const s = 0.6;
let velocity = 0.5;
let gravity = 0;
let submarineX = 350;
let submarineY = 0;
let state = "start";
let shadowWidth = 0;
let shadowHeight = 0;
let fishY = 200;
let fishColor = color(255, 153, 51);

function fish(f, i) {
  fill(fishColor);
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
  background(125, 200, 236);
  fish(f - 230, i - 40);
  fish(f - 250, i - 150);
  fish(f - 250, i + 100);
  fish(f - 220, i + 50);
  fish(f - 180, i - 100);
  fish(f - 230, i + 10);

  //if you loose game, fish will be black
  if (state === "lost") {
    fishColor = color(0, 0, 0);
  }

  if (state !== "lost") {
    fishColor = color(255, 153, 51);
  }
  //movement for the fishes
  f = f + 1.5;
  if (f > 800) {
    f = -5;
  }
}

function grass(o, r) {
  fill(34, 139, 34);
  noStroke();
  triangle(o - 205, r + 320, o - 210, r + 270, o - 200, r + 320);
  triangle(o - 200, r + 320, o - 195, r + 250, o - 190, r + 320);
  triangle(o - 190, r + 320, o - 185, r + 270, o - 180, r + 320);
}

function grassBottom() {
  grass(o - 20, r - 40);
  grass(o + 100, r - 40);
  grass(o + 50, r - 20);
  grass(o + 400, r - 40);
  grass(o + 480, r - 40);
  grass(o + 450, r - 20);
}
function oceanBottom() {
  //sand bottom
  fill(246, 215, 176);
  noStroke();
  rect(o - 300, r + 250, 700, 105);
  //stones
  fill(200, 180, 150);
  ellipse(o - 250, r + 330, 30, 20);
  ellipse(o - 100, r + 330, 40, 25);
  ellipse(o + 10, r + 310, 20, 15);
  //sand
  fill(232, 203, 160);
  ellipse(o + 300, r + 335, 50, 10);
  ellipse(o + 330, r + 320, 60, 12);
}

function submarine(x, y) {
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
}

function startScreen() {
  fishMove();
  oceanBottom();
  textSize(50);
  grassBottom();
  fill(0, 0, 0);
  text("click to start ", 220, 390);
  fill(242, 82, 67);
  ellipse(350, 240, 390, 190);
  textSize(40);
  fill(255);
  text("Submarine Lander", 190, 260);
}

function gameScreen() {
  fishMove();
  oceanBottom();
  //landing plattform
  fill(101, 67, 33);
  ellipse(350, 510, shadowWidth, shadowHeight);
  grassBottom();

  submarine(submarineX, submarineY);

  if (keyIsDown(32)) {
    gravity = -2;
  } else {
    gravity = 0.15;
  }

  velocity = velocity + gravity;
  submarineY = submarineY + velocity;

  shadowWidth = (submarineY / 550) * 200;
  shadowHeight = (submarineY / 550) * 40;
}

function draw() {
  if (state === "start") {
    startScreen();
  } else if (state === "game") {
    gameScreen();
  } else if (state === "lost") {
    lostScreen();
  } else if (state === "win") {
    winScreen();
  }
  if (submarineY > 450 && velocity < 4) {
    state = "win";
  }
  if (submarineY > 450 && velocity > 4) {
    state = "lost";
  }
}

function winScreen() {
  fishMove();
  oceanBottom();
  grassBottom();
  textSize(50);
  fill(0, 128, 0);
  ellipse(350, 240, 390, 190);
  fill(255, 255, 255);
  text("YOU WON", 220, 260);
  fill(255, 255, 255);
  textSize(40);
  text("click to play again", 220, 390);
}

function lostScreen() {
  fishMove();
  oceanBottom();
  grassBottom();
  textSize(50);
  fill(255, 0, 0);
  ellipse(350, 240, 390, 190);
  fill(0, 0, 0);
  text("GAME OVER", 200, 260);
  fill(255, 255, 255);
  textSize(40);
  text("click to play again", 220, 390);
}

function mouseClicked() {
  if (state === "start") {
    state = "game";
  }
  if (state === "win" || state === "lost") {
    state = "game";
    submarineY = 0;
    velocity = 0.5;
    gravity = 0.15;
  }
}
