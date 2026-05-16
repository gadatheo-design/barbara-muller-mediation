// 03_density_resistance
// Une masse sombre cree une resistance visuelle.
// A proximite, les traces ralentissent, s'epaississent et se courbent.

boolean densityShowText = true;
float densityMassX;
float densityMassY;
float densityMassRadius = 150;
float densityTraceX;
float densityTraceY;

void settings() {
  size(960, 640);
  smooth(8);
}

void setup() {
  frameRate(60);
  densityMassX = width * 0.72;
  densityMassY = height * 0.48;
  densityTraceX = width * 0.5;
  densityTraceY = height * 0.5;
  clearDensitySurface();
}

void draw() {
  noStroke();
  fill(244, 239, 232, 10);
  rect(0, 0, width, height);

  drawDensityBackground();
  drawDensityMass();

  if (mousePressed) {
    // On ralentit la poursuite de la souris quand on s'approche de la masse.
    float d = dist(mouseX, mouseY, densityMassX, densityMassY);
    float influence = 1.0 - constrain(d / densityMassRadius, 0.0, 1.0);
    float follow = lerp(0.28, 0.06, influence);

    float previousX = densityTraceX;
    float previousY = densityTraceY;

    densityTraceX = lerp(densityTraceX, mouseX, follow);
    densityTraceY = lerp(densityTraceY, mouseY, follow);

    PVector away = new PVector(densityTraceX - densityMassX, densityTraceY - densityMassY);
    if (away.mag() > 0.001) {
      away.normalize();
      densityTraceX += away.x * influence * 8.0;
      densityTraceY += away.y * influence * 8.0;
    }

    stroke(72, 65, 60, 140);
    strokeWeight(lerp(2.0, 8.0, influence));
    line(previousX, previousY, densityTraceX, densityTraceY);

    noStroke();
    fill(175, 107, 90, 48 + influence * 80.0);
    ellipse(densityTraceX, densityTraceY, 10 + influence * 18.0, 10 + influence * 18.0);
  } else {
    densityTraceX = lerp(densityTraceX, mouseX, 0.18);
    densityTraceY = lerp(densityTraceY, mouseY, 0.18);
  }

  if (densityShowText) {
    fill(46, 39, 32, 180);
    textSize(14);
    text("pres de la masse : le trace ralentit et s'epaissit", 18, 24);
    text("r = effacer, m = deplacer la masse, h = texte", 18, 44);
  }
}

void drawDensityBackground() {
  noStroke();
  fill(221, 209, 186, 64);
  rect(width * 0.28, height * 0.26, width * 0.38, height * 0.2, 26);
  fill(160, 178, 171, 54);
  rect(width * 0.45, height * 0.58, width * 0.22, height * 0.18, 20);
}

void drawDensityMass() {
  noStroke();
  fill(74, 60, 56, 180);
  ellipse(densityMassX, densityMassY, densityMassRadius * 1.1, densityMassRadius * 1.2);
  fill(94, 75, 69, 80);
  ellipse(densityMassX - 18, densityMassY - 10, densityMassRadius * 0.7, densityMassRadius * 0.76);
}

void clearDensitySurface() {
  background(244, 239, 232);
}

void keyPressed() {
  if (key == 'r' || key == 'R') {
    clearDensitySurface();
  } else if (key == 'm' || key == 'M') {
    densityMassX = random(width * 0.35, width * 0.78);
    densityMassY = random(height * 0.28, height * 0.72);
  } else if (key == 'h' || key == 'H') {
    densityShowText = !densityShowText;
  }
}
