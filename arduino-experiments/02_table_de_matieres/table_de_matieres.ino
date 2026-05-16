/*
  Table de matieres
  -----------------
  Prototype Arduino uniquement.

  Idee:
  Cinq materiaux physiques correspondent a cinq qualites picturales.
  Quand le visiteur touche un materiau, une LED associee repond doucement.

  - papier calque  -> voile
  - papier rugueux -> trace
  - carton sombre  -> masse
  - carte blanche  -> reserve
  - tissu doux     -> effacement / douceur

  Version par defaut:
  - 5 boutons en INPUT_PULLUP
  - 5 LEDs separees

  Cablage boutons (recommande pour la stabilite):
  - un cote du bouton -> pin d'entree
  - autre cote du bouton -> GND
  - INPUT_PULLUP active la resistance interne, donc:
      bouton relache = HIGH
      bouton presse  = LOW

  Remplacement possible par des pastilles/feuilles conductrices:
  - garder INPUT_PULLUP
  - relier une pastille conductrice a la pin d'entree
  - prevoir une zone conductive commune reliee a GND
  - le contact du doigt ou de la main entre les deux zones joue alors
    le role d'un "bouton" simple
  Cette solution est moins robuste qu'un vrai bouton mecanique mais permet
  une demonstration tactile tres simple sans bibliotheque externe.

  Cablage LEDs:
  - anode de chaque LED -> pin PWM via resistance 220 a 330 ohms
  - cathode -> GND

  Le moniteur serie affiche:
  - le materiau selectionne
  - la qualite picturale associee

  Aucune bibliotheque externe n'est utilisee.
*/

const byte MATERIAL_COUNT = 5;

const byte BUTTON_PINS[MATERIAL_COUNT] = {2, 4, 7, 8, 12};
const byte LED_PINS[MATERIAL_COUNT] = {3, 5, 6, 9, 10};

const char* MATERIAL_NAMES[MATERIAL_COUNT] = {
  "papier calque",
  "papier rugueux",
  "carton sombre",
  "carte blanche",
  "tissu doux"
};

const char* PICTORIAL_QUALITIES[MATERIAL_COUNT] = {
  "voile",
  "trace",
  "masse",
  "reserve",
  "effacement / douceur"
};

const unsigned long DEBOUNCE_MS = 28;
const unsigned long HOLD_AFTER_TOUCH_MS = 1200;
const unsigned long SERIAL_INTERVAL_MS = 240;

bool stableButtonState[MATERIAL_COUNT];
bool lastRawButtonState[MATERIAL_COUNT];
unsigned long lastDebounceChangeMs[MATERIAL_COUNT];

float currentLedLevels[MATERIAL_COUNT] = {0, 0, 0, 0, 0};

int activeMaterialIndex = -1;
int lastPrintedMaterialIndex = -2;
unsigned long lastTouchMs = 0;
unsigned long lastSerialIntervalMs = 0;

void setup() {
  Serial.begin(115200);

  for (byte i = 0; i < MATERIAL_COUNT; i++) {
    pinMode(BUTTON_PINS[i], INPUT_PULLUP);
    pinMode(LED_PINS[i], OUTPUT);

    const bool initialState = digitalRead(BUTTON_PINS[i]);
    stableButtonState[i] = initialState;
    lastRawButtonState[i] = initialState;
    lastDebounceChangeMs[i] = millis();

    analogWrite(LED_PINS[i], 0);
  }

  Serial.println(F("Table de matieres - demarrage"));
  Serial.println(F("Touchez un materiau pour activer une qualite picturale."));
}

void loop() {
  updateButtons();
  updateActiveMaterial();
  updateLeds();
  printStatus();

  delay(12);
}

void updateButtons() {
  const unsigned long now = millis();

  for (byte i = 0; i < MATERIAL_COUNT; i++) {
    const bool rawState = digitalRead(BUTTON_PINS[i]);

    if (rawState != lastRawButtonState[i]) {
      lastDebounceChangeMs[i] = now;
      lastRawButtonState[i] = rawState;
    }

    if (now - lastDebounceChangeMs[i] > DEBOUNCE_MS) {
      stableButtonState[i] = rawState;
    }
  }
}

void updateActiveMaterial() {
  const unsigned long now = millis();

  int pressedIndex = -1;

  // Priorite simple: premier materiau stable detecte comme touche.
  // Cela garde le comportement previsible et facile a expliquer.
  for (byte i = 0; i < MATERIAL_COUNT; i++) {
    if (stableButtonState[i] == LOW) {
      pressedIndex = i;
      break;
    }
  }

  if (pressedIndex >= 0) {
    activeMaterialIndex = pressedIndex;
    lastTouchMs = now;
    return;
  }

  // On garde un court maintien apres le toucher pour laisser la lumiere vivre.
  if (activeMaterialIndex >= 0 && (now - lastTouchMs) > HOLD_AFTER_TOUCH_MS) {
    activeMaterialIndex = -1;
  }
}

void updateLeds() {
  const float t = millis() * 0.0013;

  for (byte i = 0; i < MATERIAL_COUNT; i++) {
    float target = 0.0;

    if (i == activeMaterialIndex) {
      // Battement doux, proche d'une respiration plutot que d'un clignotement.
      const float pulse = 0.82 + 0.18 * sin(t + i * 0.75);
      target = 150.0 * pulse;
    }

    currentLedLevels[i] += (target - currentLedLevels[i]) * 0.08;
    analogWrite(LED_PINS[i], constrain((int)currentLedLevels[i], 0, 255));
  }
}

void printStatus() {
  const unsigned long now = millis();

  if (activeMaterialIndex != lastPrintedMaterialIndex) {
    if (activeMaterialIndex >= 0) {
      Serial.print(F("materiau: "));
      Serial.print(MATERIAL_NAMES[activeMaterialIndex]);
      Serial.print(F(" | qualite: "));
      Serial.println(PICTORIAL_QUALITIES[activeMaterialIndex]);
    } else {
      Serial.println(F("materiau: attente"));
    }

    lastPrintedMaterialIndex = activeMaterialIndex;
    lastSerialIntervalMs = now;
    return;
  }

  if (now - lastSerialIntervalMs < SERIAL_INTERVAL_MS) {
    return;
  }
  lastSerialIntervalMs = now;

  if (activeMaterialIndex >= 0) {
    Serial.print(F("actif: "));
    Serial.print(MATERIAL_NAMES[activeMaterialIndex]);
    Serial.print(F(" -> "));
    Serial.println(PICTORIAL_QUALITIES[activeMaterialIndex]);
  }
}
