#include "UltrasonicSensor.h"
#include <Arduino.h>

void Ultrasonic::setupUltrasonic() {
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
}

void Ultrasonic::measureDistance() {
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  duration = pulseIn(echoPin, HIGH);
  distanceCm = duration * SOUND_SPEED / 2;
  // distanceAvailable = true;
}

// bool Ultrasonic::isDistanceAvailable() {
//   return distanceAvailable;
// }

int Ultrasonic::getDistance() {
  // distanceAvailable = false;
  return distanceCm;
}

