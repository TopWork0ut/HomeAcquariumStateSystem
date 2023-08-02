#pragma once

#include <Arduino.h>

class TimerClass {
private:
  hw_timer_t *timer;
  uint8_t timerId;
  uint8_t prescellar;
  bool direction; //increase or decrease
  bool edgeOfSignal; //front or end
  void (*isrCallback)(); // Function pointer to the ISR


public:
  TimerClass(int timerId, uint8_t prescellar, bool direction, bool edgeOfSignal, void (*isr)()) 
  : timerId(timerId), prescellar(prescellar), direction(direction), edgeOfSignal(edgeOfSignal), isrCallback(isr)  {
    timer = timerBegin(timerId, prescellar, direction);
    timerAttachInterrupt(timer, isrCallback, edgeOfSignal);
  }

  void setAlarm(int alarmMicroseconds, bool autoReload) {
    timerAlarmWrite(timer, alarmMicroseconds, autoReload);
  }

  void enableTimer() {
    timerAlarmEnable(timer);
  }

  void disableTimer() {
    timerAlarmDisable(timer);
  }
};


