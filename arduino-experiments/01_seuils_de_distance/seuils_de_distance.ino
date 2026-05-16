/*
  Seuils de distance
  ------------------
  Prototype Arduino uniquement.

  Idee:
  Un capteur HC-SR04 mesure la distance entre le visiteur et une reproduction
  ou une projection. Trois zones de distance activent des retroactions
  lumineuses lentes et douces:

  - proche  -> detail / trace
  - moyen   -> champ de couleur / composition
  - loin    -> masse / equilibre

  Ce n'est pas un systeme "correct / incorrect".
  Le dispositif invite simplement a essayer plusieurs positions de regard.

  Cablage propose (Arduino Uno ou Mega):
  HC-SR04
  - VCC  -> 5V
  - GND  -> GND
  - TRIG -> D9
  - ECHO -> D10

  LEDs (3 LEDs separees, recommande pour la clarte de demonstration)
  - LED proche/anode  -> D3  via resistance 220 ohms
  - LED moyen/anode   -> D5  via resistance 220 ohms
  - LED loin/anode    -> D6  via resistance 220 ohms
  - Toutes les cathodes -> GND

  Si vous utilisez une LED RGB a la place de 3 LEDs:
  adaptez les trois sorties PWM en consequence, en respectant le type
  de LED (cathode commune ou anode commune).

  Le moniteur serie affiche:
  - mesure brute
  - distance lissee
  - zone active

  Aucune bibliotheque externe n'est utilisee.
*/

enum DistanceZone {
  ZONE_IDLE,
  ZONE_CLOSE,
  ZONE_MIDDLE,
  ZONE_FAR
};

const byte TRIG_PIN = 9;
const byte ECHO_PIN = 10;

const byte LED_CLOSE_PIN = 3;
const byte LED_MIDDLE_PIN = 5;
const byte LED_FAR_PIN = 6;

const byte LED_PINS[3] = {LED_CLOSE_PIN, LED_MIDDLE_PIN, LED_FAR_PIN};

// Seuils adaptes a une reproduction ou projection regardee a courte distance.
// Ils peuvent etre ajustes en fonction de l'espace d'exposition.
const float CLOSE_MAX_CM = 40.0;
const float MIDDLE_MAX_CM = 95.0;
const float HYSTERESIS_CM = 6.0;

const float MIN_VALID_CM = 5.0;
const float MAX_VALID_CM = 220.0;

const float SMOOTHING_ALPHA = 0.18;

const unsigned long NO_VISITOR_TIMEOUT_MS = 1200;
const unsigned long SERIAL_INTERVAL_MS = 300;

float smoothedDistanceCm = -1.0;
float currentLedLevels[3] = {0.0, 0.0, 0.0};
DistanceZone currentZone = ZONE_IDLE;

unsigned long lastValidReadingMs = 0;
unsigned long lastSerialPrintMs = 0;

void setup() {
  Serial.begin(115200);

  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);

  for (byte i = 0; i < 3; i++) {
    pinMode(LED_PINS[i], OUTPUT);
    analogWrite(LED_PINS[i], 0);
  }

  digitalWrite(TRIG_PIN, LOW);

  Serial.println(F("Seuils de distance - demarrage"));
  Serial.println(F("Zone proche  : detail / trace"));
  Serial.println(F("Zone moyenne : champ de couleur / composition"));
  Serial.println(F("Zone lointaine : masse / equilibre"));
}

void loop() {
  const float measuredDistanceCm = readDistanceCm();

  if (measuredDistanceCm > 0.0) {
    if (smoothedDistanceCm < 0.0) {
      smoothedDistanceCm = measuredDistanceCm;
    } else {
      smoothedDistanceCm += (measuredDistanceCm - smoothedDistanceCm) * SMOOTHING_ALPHA;
    }

    lastValidReadingMs = millis();
    currentZone = resolveZone(smoothedDistanceCm, currentZone);
  } else if (millis() - lastValidReadingMs > NO_VISITOR_TIMEOUT_MS) {
    currentZone = ZONE_IDLE;
  }

  updateLights();
  printStatus(measuredDistanceCm);

  delay(18);
}

float readDistanceCm() {
  // Impulsion standard HC-SR04.
  digitalWrite(TRIG_PIN, LOW);
  delayMicroseconds(3);
  digitalWrite(TRIG_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);

  // Timeout de 25 ms ~ environ 4 metres aller-retour.
  const unsigned long duration = pulseIn(ECHO_PIN, HIGH, 25000UL);
  if (duration == 0) {
    return -1.0;
  }

  const float distanceCm = (duration * 0.0343) * 0.5;
  if (distanceCm < MIN_VALID_CM || distanceCm > MAX_VALID_CM) {
    return -1.0;
  }

  return distanceCm;
}

DistanceZone resolveZone(float distanceCm, DistanceZone previousZone) {
  if (previousZone == ZONE_CLOSE) {
    if (distanceCm > CLOSE_MAX_CM + HYSTERESIS_CM) {
      return (distanceCm > MIDDLE_MAX_CM + HYSTERESIS_CM) ? ZONE_FAR : ZONE_MIDDLE;
    }
    return ZONE_CLOSE;
  }

  if (previousZone == ZONE_MIDDLE) {
    if (distanceCm < CLOSE_MAX_CM - HYSTERESIS_CM) {
      return ZONE_CLOSE;
    }
    if (distanceCm > MIDDLE_MAX_CM + HYSTERESIS_CM) {
      return ZONE_FAR;
    }
    return ZONE_MIDDLE;
  }

  if (previousZone == ZONE_FAR) {
    if (distanceCm < MIDDLE_MAX_CM - HYSTERESIS_CM) {
      return (distanceCm < CLOSE_MAX_CM - HYSTERESIS_CM) ? ZONE_CLOSE : ZONE_MIDDLE;
    }
    return ZONE_FAR;
  }

  // Premiere determination apres l'etat idle.
  if (distanceCm <= CLOSE_MAX_CM) {
    return ZONE_CLOSE;
  }
  if (distanceCm <= MIDDLE_MAX_CM) {
    return ZONE_MIDDLE;
  }
  return ZONE_FAR;
}

void updateLights() {
  float targetLevels[3] = {0.0, 0.0, 0.0};
  computeZoneTargets(currentZone, targetLevels);

  const float t = millis() * 0.0012;
  const float phaseOffsets[3] = {0.0, 1.8, 3.5};

  for (byte i = 0; i < 3; i++) {
    const float pulseFactor = 0.86 + 0.14 * sin(t + phaseOffsets[i]);
    const float desired = targetLevels[i] * pulseFactor;

    // Transition douce pour eviter les basculements abrupts.
    currentLedLevels[i] += (desired - currentLedLevels[i]) * 0.06;

    const int pwmValue = constrain((int)currentLedLevels[i], 0, 255);
    analogWrite(LED_PINS[i], pwmValue);
  }
}

void computeZoneTargets(DistanceZone zone, float targets[3]) {
  // Niveaux pensés pour 3 LEDs distinctes.
  // Les LEDs secondaires restent tres faibles pour garder une ambiance douce.
  if (zone == ZONE_CLOSE) {
    targets[0] = 150.0;
    targets[1] = 18.0;
    targets[2] = 4.0;
    return;
  }

  if (zone == ZONE_MIDDLE) {
    targets[0] = 12.0;
    targets[1] = 138.0;
    targets[2] = 16.0;
    return;
  }

  if (zone == ZONE_FAR) {
    targets[0] = 4.0;
    targets[1] = 20.0;
    targets[2] = 142.0;
    return;
  }

  // Idle: aucun visiteur stable detecte.
  targets[0] = 0.0;
  targets[1] = 0.0;
  targets[2] = 0.0;
}

void printStatus(float measuredDistanceCm) {
  if (millis() - lastSerialPrintMs < SERIAL_INTERVAL_MS) {
    return;
  }
  lastSerialPrintMs = millis();

  Serial.print(F("distance brute: "));
  if (measuredDistanceCm > 0.0) {
    Serial.print(measuredDistanceCm, 1);
    Serial.print(F(" cm"));
  } else {
    Serial.print(F("aucune mesure stable"));
  }

  Serial.print(F(" | distance lissee: "));
  if (smoothedDistanceCm > 0.0) {
    Serial.print(smoothedDistanceCm, 1);
    Serial.print(F(" cm"));
  } else {
    Serial.print(F("n/a"));
  }

  Serial.print(F(" | zone: "));
  Serial.println(zoneLabel(currentZone));
}

const __FlashStringHelper* zoneLabel(DistanceZone zone) {
  switch (zone) {
    case ZONE_CLOSE:
      return F("proche -> detail / trace");
    case ZONE_MIDDLE:
      return F("moyenne -> champ de couleur / composition");
    case ZONE_FAR:
      return F("loin -> masse / equilibre");
    case ZONE_IDLE:
    default:
      return F("attente");
  }
}
