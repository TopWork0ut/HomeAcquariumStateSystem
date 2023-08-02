#include <Arduino.h>

#pragma once

extern const uint8_t interruptPin;
extern void IRAM_ATTR stepperInterrupt();

class StepperMotor {
  private:
    uint8_t motorPin1;
    uint8_t motorPin2;
    uint8_t motorPin3;
    uint8_t motorPin4;
    uint stepDelay;
    int stepperID;

  public:
    StepperMotor(uint8_t pin1, uint8_t pin2, uint8_t pin3, uint8_t pin4, uint delay, int stepperID) {
      motorPin1 = pin1;
      motorPin2 = pin2;
      motorPin3 = pin3;
      motorPin4 = pin4;
      stepDelay = delay;
      stepperID = stepperID;
    }

    void initialize() {
      pinMode(motorPin1, OUTPUT);
      pinMode(motorPin2, OUTPUT);
      pinMode(motorPin3, OUTPUT);
      pinMode(motorPin4, OUTPUT);
    }

    void step(int steps) {
      int stepsRemaining = abs(steps);

      // Set the direction based on the sign of the steps
      int direction = (steps > 0) ? 1 : -1;
      Serial.println("Is stepping");
      // Step the motor until all steps are completed
      while (stepsRemaining > 0) {
        // Perform a single step
        digitalWrite(motorPin1, (direction == 1) ? HIGH : LOW);
        digitalWrite(motorPin2, LOW);
        digitalWrite(motorPin3, LOW);
        digitalWrite(motorPin4, (direction == -1) ? HIGH : LOW);
        delayMicroseconds(stepDelay);
        
        digitalWrite(motorPin1, LOW);
        digitalWrite(motorPin2, (direction == 1) ? HIGH : LOW);
        digitalWrite(motorPin3, (direction == -1) ? HIGH : LOW);
        digitalWrite(motorPin4, LOW);
        delayMicroseconds(stepDelay);
        
        digitalWrite(motorPin1, LOW);
        digitalWrite(motorPin2, (direction == -1) ? HIGH : LOW);
        digitalWrite(motorPin3, (direction == 1) ? HIGH : LOW);
        digitalWrite(motorPin4, LOW);
        delayMicroseconds(stepDelay);
        
        digitalWrite(motorPin1, (direction == -1) ? HIGH : LOW);
        digitalWrite(motorPin2, LOW);
        digitalWrite(motorPin3, LOW);
        digitalWrite(motorPin4, (direction == 1) ? HIGH : LOW);
        delayMicroseconds(stepDelay);

        // Decrement the remaining steps
        stepsRemaining--;
      }
    }

    int getID() {
      return stepperID;
    }
};

extern StepperMotor myStepper;
