function setup() {
  createCanvas(800, 600);
}

let x = 250;
let y = 370;
const s = 0.9;

function submarine(x, y, s) {
  background(125, 200, 236);

  //sandbottom
  noStroke();
  fill(220, 170, 120);
  ellipse(60, 520, 400, 100);
  fill(222, 184, 125);
  ellipse(80, 600, 560, 200);
  ellipse(510, 600, 400, 200);
  fill(220, 170, 120);
  ellipse(300, 550, 300, 100);

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
}

submarine(x, y, s);

function draw() {
  background(125, 200, 236);
  submarine(x, y - 200, 0.9);
  if (keyIsDown(32)) {
    y = y - 1;
  } else if (y < 650) {
    y = y + 4;
  }
}
