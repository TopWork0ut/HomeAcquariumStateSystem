#ifndef REMOTE_SERVER_H
#define REMOTE_SERVER_H

#include <HTTPClient.h>

class RemoteServer {
private:
int ultrasonicId;
public:
  RemoteServer(int ultrasonicId) {
    ultrasonicId = ultrasonicId;
  }
  void postRequestUltrasonic(const char* serverUrl, int distance, int ultrasonicID);
  void postRequestDCON(const char* serverUrl, int dcMotorID);
  void updateRequestDCOFF(const char* serverUrl, int dcMotorID);
  void postRequestStepper(const char* serverUrl, int motorID);
  
};

#endif
