// 04_ghost_gesture
// Des gestes fantomes apparaissent et disparaissent.
// La souris influe leur direction sans les controler totalement.

ArrayList<GhostBrush> ghosts = new ArrayList<GhostBrush>();
boolean ghostShowText = true;

void settings() {
  size(960, 640);
  smooth(8);
}

void setup() {
  frameRate(60);
  resetGhosts(10);
  background(244, 239, 232);
}

void draw() {
  noStroke();
  fill(244, 239, 232, 16);
  rect(0, 0, width, height);

  for (GhostBrush ghost : ghosts) {
    ghost.update();
    ghost.display();
  }

  if (ghostShowText) {
    fill(45, 39, 33, 180);
    textSize(14);
    text("la souris attire legerement les gestes, sans les commander", 18, 24);
    text("g = ajouter, r = recommencer, h = texte", 18, 44);
  }
}

void resetGhosts(int amount) {
  ghosts.clear();
  for (int i = 0; i < amount; i++) {
    ghosts.add(new GhostBrush());
  }
}

void keyPressed() {
  if (key == 'g' || key == 'G') {
    ghosts.add(new GhostBrush());
  } else if (key == 'r' || key == 'R') {
    background(244, 239, 232);
    resetGhosts(10);
  } else if (key == 'h' || key == 'H') {
    ghostShowText = !ghostShowText;
  }
}

class GhostBrush {
  PVector pos;
  PVector prev;
  PVector vel;
  float life;
  float seed;
  float weight;

  GhostBrush() {
    respawn();
  }

  void respawn() {
    pos = new PVector(random(width), random(height));
    prev = pos.copy();
    vel = PVector.random2D().mult(random(0.2, 1.4));
    life = random(220, 420);
    seed = random(1000);
    weight = random(1.2, 4.2);
  }

  void update() {
    prev.set(pos);

    float angle = noise(seed, frameCount * 0.004) * TWO_PI * 2.0;
    PVector drift = new PVector(cos(angle), sin(angle));
    drift.mult(0.18);
    vel.add(drift);

    PVector mouseInfluence = new PVector(mouseX - pos.x, mouseY - pos.y);
    float mouseDistance = max(40, mouseInfluence.mag());
    mouseInfluence.normalize();
    mouseInfluence.mult(1.8 / mouseDistance);
    vel.add(mouseInfluence);

    vel.limit(2.4);
    pos.add(vel);

    if (pos.x < -40 || pos.x > width + 40 || pos.y < -40 || pos.y > height + 40) {
      respawn();
    }

    life -= 1.0;
    if (life <= 0) {
      respawn();
    }
  }

  void display() {
    stroke(76, 69, 63, 44);
    strokeWeight(weight);
    line(prev.x, prev.y, pos.x, pos.y);

    stroke(171, 111, 92, 28);
    strokeWeight(weight * 0.45);
    line(prev.x + 6, prev.y - 4, pos.x + 6, pos.y - 4);
  }
}
