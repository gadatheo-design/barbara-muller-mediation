// 01_breathing_painting
// Un champ abstrait respire lentement.
// La position de la souris change le rythme (X) et l'amplitude (Y).

boolean breathingPaused = false;
boolean breathingShowText = true;
float breathingPhase = 0.0;
float breathingSeed = 120.0;

void settings() {
  size(960, 640);
  smooth(8);
}

void setup() {
  frameRate(60);
  rectMode(CENTER);
  noStroke();
}

void draw() {
  background(244, 239, 232);

  if (!breathingPaused) {
    breathingPhase += map(mouseX, 0, width, 0.0035, 0.015);
  }

  float amplitude = map(mouseY, 0, height, 10, 44);
  float slowWave = sin(breathingPhase);
  float secondWave = sin(breathingPhase * 0.6 + 1.7);
  float thirdWave = sin(breathingPhase * 0.36 + 3.0);

  // Grand voile pale.
  fill(224, 211, 186, 165);
  ellipse(width * 0.32, height * 0.34 + slowWave * amplitude * 0.25, width * 0.46, height * 0.28 + slowWave * amplitude);

  // Masse plus dense qui respire moins vite.
  fill(172, 112, 97, 122);
  ellipse(width * 0.69, height * 0.56 + secondWave * amplitude * 0.18, width * 0.24 + secondWave * amplitude * 0.5, height * 0.29 + secondWave * amplitude * 0.7);

  // Champ vert gris plus diffus.
  fill(156, 177, 170, 118);
  rect(width * 0.54, height * 0.3 + thirdWave * amplitude * 0.16, width * 0.34, height * 0.18 + thirdWave * amplitude * 0.45, 28);

  // Rehauts clairs.
  fill(248, 244, 238, 140);
  ellipse(width * 0.24, height * 0.62 - slowWave * amplitude * 0.12, width * 0.25, height * 0.18);
  ellipse(width * 0.76, height * 0.24 + thirdWave * amplitude * 0.1, width * 0.16, height * 0.12);

  stroke(77, 70, 62, 34);
  strokeWeight(1.2);
  noFill();
  for (int i = 0; i < 7; i++) {
    float y = height * 0.18 + i * height * 0.085;
    float offset = sin(breathingPhase + i * 0.35) * amplitude * 0.2;
    bezier(width * 0.1, y, width * 0.28, y - 18 + offset, width * 0.58, y + 14 - offset, width * 0.88, y - 6 + offset * 0.6);
  }

  if (breathingShowText) {
    fill(45, 39, 32, 180);
    textSize(14);
    text("mouvement lent : le champ respire", 18, 24);
    text("souris X = rythme, souris Y = amplitude", 18, 44);
    text("espace = pause, r = nouvelle respiration, h = texte", 18, 64);
  }
}

void keyPressed() {
  if (key == ' ') {
    breathingPaused = !breathingPaused;
  } else if (key == 'r' || key == 'R') {
    breathingPhase = random(TWO_PI);
    breathingSeed = random(1000);
  } else if (key == 'h' || key == 'H') {
    breathingShowText = !breathingShowText;
  }
}
