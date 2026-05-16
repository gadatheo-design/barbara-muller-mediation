let comparatorSplitX;
let comparatorDragging = false;
let softLayer;
let analysisLayer;

function setup() {
  const canvas = createCanvas(...getComparatorSize());
  canvas.parent("sketch-holder");
  textFont("Georgia");
  comparatorSplitX = width * 0.52;
  buildComparatorLayers();
}

function draw() {
  background("#f2ede4");
  image(softLayer, 0, 0);
  copy(analysisLayer, comparatorSplitX, 0, width - comparatorSplitX, height, comparatorSplitX, 0, width - comparatorSplitX, height);

  stroke(255, 220);
  strokeWeight(3);
  line(comparatorSplitX, 0, comparatorSplitX, height);
  stroke(74, 64, 56, 80);
  strokeWeight(1);
  line(comparatorSplitX, 0, comparatorSplitX, height);

  noStroke();
  fill(255, 236);
  rectMode(CENTER);
  rect(comparatorSplitX, height * 0.5, 28, 62, 14);
  fill(82, 72, 64, 90);
  ellipse(comparatorSplitX, height * 0.5, 6);

  fill(48, 42, 34, 120);
  textSize(12);
  textAlign(LEFT, TOP);
  text("surface", 18, 18);
  textAlign(RIGHT, TOP);
  text("analyse", width - 18, 18);
}

function buildComparatorLayers() {
  softLayer = createGraphics(width, height);
  analysisLayer = createGraphics(width, height);

  softLayer.background("#f2ede4");
  softLayer.noStroke();
  softLayer.fill(221, 207, 183, 160);
  softLayer.rect(width * 0.08, height * 0.14, width * 0.44, height * 0.24, 26);
  softLayer.fill(163, 178, 170, 118);
  softLayer.rect(width * 0.36, height * 0.28, width * 0.34, height * 0.18, 18);
  softLayer.fill(182, 111, 92, 104);
  softLayer.rect(width * 0.56, height * 0.5, width * 0.22, height * 0.22, 16);
  softLayer.fill(246, 240, 232, 142);
  softLayer.ellipse(width * 0.3, height * 0.62, width * 0.24, height * 0.16);
  softLayer.stroke(82, 74, 68, 42);
  softLayer.noFill();
  for (let i = 0; i < 7; i += 1) {
    const y = height * 0.2 + i * height * 0.08;
    softLayer.bezier(width * 0.08, y, width * 0.28, y - 12, width * 0.6, y + 18, width * 0.88, y - 4);
  }

  analysisLayer.background("#f2ede4");
  analysisLayer.noFill();
  analysisLayer.stroke(112, 118, 121, 150);
  analysisLayer.strokeWeight(2);
  analysisLayer.rect(width * 0.08, height * 0.14, width * 0.44, height * 0.24, 22);
  analysisLayer.stroke(173, 143, 111, 160);
  analysisLayer.rect(width * 0.36, height * 0.28, width * 0.34, height * 0.18, 18);
  analysisLayer.stroke(166, 98, 83, 180);
  analysisLayer.rect(width * 0.56, height * 0.5, width * 0.22, height * 0.22, 14);
  analysisLayer.stroke(198, 194, 184, 180);
  analysisLayer.ellipse(width * 0.3, height * 0.62, width * 0.24, height * 0.16);

  analysisLayer.stroke(61, 56, 51, 110);
  analysisLayer.strokeWeight(1.2);
  for (let i = 0; i < 5; i += 1) {
    const y = height * 0.24 + i * height * 0.11;
    analysisLayer.line(width * 0.1, y, width * 0.86, y);
  }

  analysisLayer.fill(61, 56, 51, 140);
  analysisLayer.noStroke();
  analysisLayer.textFont("Georgia");
  analysisLayer.textSize(14);
  analysisLayer.text("voiles", width * 0.16, height * 0.18);
  analysisLayer.text("reserve", width * 0.22, height * 0.64);
  analysisLayer.text("masse", width * 0.6, height * 0.49);
}

function updateComparatorPointer() {
  comparatorSplitX = constrain(mouseX, 44, width - 44);
}

function mousePressed() {
  if (abs(mouseX - comparatorSplitX) < 34) {
    comparatorDragging = true;
  }
  return false;
}

function mouseDragged() {
  if (comparatorDragging) {
    updateComparatorPointer();
  }
  return false;
}

function mouseReleased() {
  comparatorDragging = false;
  return false;
}

function touchStarted() {
  if (abs(mouseX - comparatorSplitX) < 34) {
    comparatorDragging = true;
  }
  return false;
}

function touchMoved() {
  if (comparatorDragging) {
    updateComparatorPointer();
  }
  return false;
}

function touchEnded() {
  comparatorDragging = false;
  return false;
}

function windowResized() {
  resizeCanvas(...getComparatorSize());
  comparatorSplitX = width * 0.52;
  buildComparatorLayers();
}

function getComparatorSize() {
  const widthValue = min(windowWidth - 32, 680);
  return [max(320, widthValue), min(windowHeight * 0.68, 720)];
}
