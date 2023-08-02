#pragma once
#include <stdint.h>

class Ultrasonic {
public:
  void setupUltrasonic();
  void measureDistance();
  // bool isDistanceAvailable();
  int getDistance();

private:
  const int trigPin = 5;
  const int echoPin = 18;
  const float SOUND_SPEED = 0.034;

  long duration;
  int distanceCm;
  bool distanceAvailable = false;
};
