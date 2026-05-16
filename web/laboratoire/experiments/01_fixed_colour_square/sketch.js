const fixedSquarePalette = [
  "#e5d8bf",
  "#d7c3a0",
  "#b8c8bc",
  "#dbb9a5",
  "#c8ccd8",
];

let fixedSquareX;
let fixedSquareY;
let fixedSquareTargetX;
let fixedSquareTargetY;
let fixedSquareSize;
let fixedSquareDragging = false;
let fixedSquareColor;

function setup() {
  const canvas = createCanvas(...getFixedSquareSize());
  canvas.parent("sketch-holder");
  textFont("Georgia");
  fixedSquareColor = color("#d86f54");
  resetFixedSquare();
}

function draw() {
  drawFixedField();

  fixedSquareX = lerp(fixedSquareX, fixedSquareTargetX, 0.18);
  fixedSquareY = lerp(fixedSquareY, fixedSquareTargetY, 0.18);

  const regionColor = getRegionColor(fixedSquareX);
  const haloColor = lerpColor(regionColor, fixedSquareColor, 0.4);

  noStroke();
  for (let i = 5; i >= 1; i -= 1) {
    const haloAlpha = 22 / i;
    fill(red(haloColor), green(haloColor), blue(haloColor), 40 * haloAlpha);
    ellipse(fixedSquareX, fixedSquareY, fixedSquareSize * (1.5 + i * 0.45));
  }

  rectMode(CENTER);
  stroke(255, 235);
  strokeWeight(1.2);
  fill(fixedSquareColor);
  rect(fixedSquareX, fixedSquareY, fixedSquareSize, fixedSquareSize, 8);

  noStroke();
  fill(43, 36, 29, 180);
  textSize(13);
  textAlign(CENTER, BOTTOM);
  text("couleur fixe", fixedSquareX, fixedSquareY - fixedSquareSize * 0.8);

  drawFixedCaption();
}

function drawFixedField() {
  rectMode(CORNER);
  background("#f2ede2");
  noStroke();
  const bandWidth = width / fixedSquarePalette.length;

  for (let i = 0; i < fixedSquarePalette.length; i += 1) {
    fill(fixedSquarePalette[i]);
    rect(i * bandWidth, 0, bandWidth + 1, height);
  }

  for (let y = 0; y < height; y += 42) {
    const alpha = map(sin(frameCount * 0.01 + y * 0.03), -1, 1, 8, 22);
    fill(255, alpha);
    rect(0, y, width, 18);
  }

  fill(245, 240, 232, 95);
  ellipse(width * 0.25, height * 0.26, width * 0.38, height * 0.25);
  ellipse(width * 0.72, height * 0.68, width * 0.48, height * 0.32);
}

function drawFixedCaption() {
  fill(48, 41, 32, 118);
  textSize(12);
  textAlign(LEFT, TOP);
  text("Le halo change avec le voisinage.", 18, 18);
}

function getRegionColor(x) {
  const bandWidth = width / fixedSquarePalette.length;
  const index = constrain(floor(x / bandWidth), 0, fixedSquarePalette.length - 1);
  return color(fixedSquarePalette[index]);
}

function moveFixedSquareToPointer() {
  fixedSquareTargetX = constrain(mouseX, fixedSquareSize * 0.6, width - fixedSquareSize * 0.6);
  fixedSquareTargetY = constrain(mouseY, fixedSquareSize * 0.8, height - fixedSquareSize * 0.6);
}

function mousePressed() {
  fixedSquareDragging = true;
  moveFixedSquareToPointer();
  return false;
}

function mouseDragged() {
  if (fixedSquareDragging) {
    moveFixedSquareToPointer();
  }
  return false;
}

function mouseReleased() {
  fixedSquareDragging = false;
  return false;
}

function touchStarted() {
  fixedSquareDragging = true;
  moveFixedSquareToPointer();
  return false;
}

function touchMoved() {
  if (fixedSquareDragging) {
    moveFixedSquareToPointer();
  }
  return false;
}

function touchEnded() {
  fixedSquareDragging = false;
  return false;
}

function windowResized() {
  resizeCanvas(...getFixedSquareSize());
  resetFixedSquare();
}

function getFixedSquareSize() {
  const widthValue = min(windowWidth - 32, 680);
  return [max(320, widthValue), min(windowHeight * 0.68, 720)];
}

function resetFixedSquare() {
  fixedSquareSize = min(width, height) * 0.13;
  fixedSquareX = width * 0.5;
  fixedSquareY = height * 0.55;
  fixedSquareTargetX = fixedSquareX;
  fixedSquareTargetY = fixedSquareY;
}
