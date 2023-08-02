// #include <ESP32Servo.h>
#include <Servo.h>
#include "TimerInterruptions.h"
#pragma once

Servo myservo;  // create servo object to control a servo
// twelve servo objects can be created on most boards
class ServoController;

extern ServoController servoController;
void IRAM_ATTR isr1();
//   servoController.updateServo();
// }

int pos = 0;    // variable to store the servo position

class ServoController {
private:
  TimerClass myTimer1;
  int startAngle;
  int endAngle;
  int step;

public:
  ServoController(void (*isrCallback)()) : myTimer1(1, 80, true, false, isrCallback) {
    startAngle = 0;
    endAngle = 0;
    step = 1;
  }

  void setup() {
    // pwm.attach(13); // Attach the servo on pin 13 to the PWM object 
    myservo.attach(14);
    myTimer1.setAlarm(500000, true);  // Set the alarm to trigger every 0.1 second
    myTimer1.enableTimer();
  }

   void setAngles(int start, int end, int s) {
    startAngle = start;
    endAngle = end;
    step = s;
    pos = startAngle; // Initialize servo position to start angle
  }

  void updateServo() {
    Serial.println(pos);
    myservo.write(pos); // Update servo position
    pos += 1;
    if( pos == 188) {
      pos = 0;
    } 
    
    Serial.println(pos);
    // pos += step; // Increment servo position by step
    // if ((step >= 0 && pos > endAngle) || (step < 0 && pos < endAngle)) {
    //   pos = startAngle; // Reset servo position to start angle
    //   Serial.println(pos);
    // }
  }
};


// ESP32PWM pwm;

extern ServoController servoController;
// extern ServoController servoController(&isr);