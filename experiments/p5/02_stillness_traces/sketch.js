const stillnessTraces = [];
let stillnessPointerActive = false;

function setup() {
  const canvas = createCanvas(...getStillnessSize());
  canvas.parent("sketch-holder");
  textFont("Georgia");
}

function draw() {
  background(243, 239, 233, 26);
  drawStillnessAtmosphere();

  const speed = dist(mouseX, mouseY, pmouseX, pmouseY);
  if (stillnessPointerActive && speed < 2.2) {
    stillnessTraces.push({
      x: mouseX + random(-3, 3),
      y: mouseY + random(-3, 3),
      life: 255,
      size: random(16, 42),
    });
  }

  if (stillnessPointerActive && speed > 8) {
    for (const trace of stillnessTraces) {
      trace.life *= 0.9;
    }
  }

  for (let i = stillnessTraces.length - 1; i >= 0; i -= 1) {
    const trace = stillnessTraces[i];
    noStroke();
    fill(137, 158, 157, trace.life * 0.16);
    ellipse(trace.x, trace.y, trace.size * 1.6);
    fill(188, 157, 126, trace.life * 0.24);
    ellipse(trace.x, trace.y, trace.size);
    fill(255, trace.life * 0.22);
    ellipse(trace.x, trace.y, trace.size * 0.48);
    trace.life -= 2.6;
    if (trace.life <= 1) {
      stillnessTraces.splice(i, 1);
    }
  }

  drawStillnessIndicator(speed);
}

function drawStillnessAtmosphere() {
  noStroke();
  fill(255, 70);
  ellipse(width * 0.28, height * 0.34, width * 0.3, height * 0.25);
  ellipse(width * 0.74, height * 0.64, width * 0.36, height * 0.28);
}

function drawStillnessIndicator(speed) {
  fill(49, 42, 34, 128);
  textSize(12);
  textAlign(LEFT, TOP);
  const message = stillnessPointerActive && speed < 2.2 ? "presque immobile" : "le mouvement rapide efface";
  text(message, 18, 18);

  if (stillnessPointerActive) {
    noFill();
    stroke(103, 120, 120, 70);
    strokeWeight(1);
    ellipse(mouseX, mouseY, map(constrain(speed, 0, 12), 0, 12, 30, 70));
  }
}

function mousePressed() {
  stillnessPointerActive = true;
  return false;
}

function mouseReleased() {
  stillnessPointerActive = false;
  return false;
}

function touchStarted() {
  stillnessPointerActive = true;
  return false;
}

function touchEnded() {
  stillnessPointerActive = false;
  return false;
}

function windowResized() {
  resizeCanvas(...getStillnessSize());
}

function getStillnessSize() {
  const widthValue = min(windowWidth - 32, 680);
  return [max(320, widthValue), min(windowHeight * 0.68, 720)];
}
