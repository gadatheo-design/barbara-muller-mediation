let firstLookPoint = null;
let returnLookPoint = null;

function setup() {
  const canvas = createCanvas(...getLookReturnSize());
  canvas.parent("sketch-holder");
  textFont("Georgia");
}

function draw() {
  background("#f2ede4");
  drawLookReturnField();

  if (firstLookPoint && returnLookPoint) {
    stroke(90, 83, 76, 90);
    strokeWeight(1.2);
    line(firstLookPoint.x, firstLookPoint.y, returnLookPoint.x, returnLookPoint.y);
  }

  drawLookMarker(firstLookPoint, "#b86f5f", "premier regard");
  drawLookMarker(returnLookPoint, "#75928d", "retour");

  noStroke();
  fill(46, 40, 32, 120);
  textSize(12);
  textAlign(LEFT, TOP);
  text("Un troisieme appui recommence.", 18, 18);
}

function drawLookReturnField() {
  noStroke();
  fill(223, 209, 183, 160);
  rect(width * 0.08, height * 0.16, width * 0.38, height * 0.22, 24);
  fill(163, 177, 171, 120);
  rect(width * 0.42, height * 0.32, width * 0.32, height * 0.18, 18);
  fill(184, 116, 97, 96);
  rect(width * 0.58, height * 0.52, width * 0.22, height * 0.22, 18);
  fill(246, 241, 234, 150);
  ellipse(width * 0.28, height * 0.62, width * 0.22, height * 0.16);

  stroke(79, 71, 62, 32);
  strokeWeight(1);
  noFill();
  for (let i = 0; i < 6; i += 1) {
    const y = height * 0.2 + i * height * 0.1;
    bezier(width * 0.1, y, width * 0.34, y - 12, width * 0.62, y + 18, width * 0.88, y - 4);
  }
}

function drawLookMarker(point, hexColor, label) {
  if (!point) {
    return;
  }
  const markerColor = color(hexColor);
  noFill();
  stroke(red(markerColor), green(markerColor), blue(markerColor), 120);
  strokeWeight(1.2);
  ellipse(point.x, point.y, 26);
  line(point.x - 18, point.y, point.x + 18, point.y);
  line(point.x, point.y - 18, point.x, point.y + 18);

  noStroke();
  fill(red(markerColor), green(markerColor), blue(markerColor), 180);
  textSize(12);
  textAlign(LEFT, BOTTOM);
  text(label, point.x + 12, point.y - 10);
}

function registerLookPoint() {
  const point = { x: mouseX, y: mouseY };
  if (!firstLookPoint) {
    firstLookPoint = point;
  } else if (!returnLookPoint) {
    returnLookPoint = point;
  } else {
    firstLookPoint = point;
    returnLookPoint = null;
  }
}

function mousePressed() {
  registerLookPoint();
  return false;
}

function touchStarted() {
  registerLookPoint();
  return false;
}

function windowResized() {
  resizeCanvas(...getLookReturnSize());
}

function getLookReturnSize() {
  const widthValue = min(windowWidth - 32, 680);
  return [max(320, widthValue), min(windowHeight * 0.68, 720)];
}
