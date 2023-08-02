#include "RemoteServer.h"

void RemoteServer::postRequestUltrasonic(const char* serverUrl, int distance, int ultrasonicID) {
  HTTPClient http;
  http.begin(serverUrl);
  http.addHeader("Content-Type", "application/json");

  char postData[50];
  snprintf(postData, sizeof(postData), "{\"distance\": %d, \"ultrasonicSensorId\":%d}", distance, ultrasonicID);

  int httpResponseCode = http.POST(postData);
  Serial.printf("HTTP response code: %d\n", httpResponseCode);

  if (httpResponseCode > 0) {
    String response = http.getString();
    Serial.println(response);
  }

  http.end();
}

void RemoteServer::postRequestDCON(const char* serverUrl, int dcMotorID) {
  HTTPClient http;
  http.begin(serverUrl);
  http.addHeader("Content-Type", "application/json");

  char postData[50];
  snprintf(postData, sizeof(postData), "{ \"dcMotorId\":%d}", dcMotorID);

  int httpResponseCode = http.POST(postData);
  Serial.printf("HTTP response code: %d\n", httpResponseCode);

  if (httpResponseCode > 0) {
    String response = http.getString();
    Serial.println(response);
  }

  http.end();
}

void RemoteServer::updateRequestDCOFF(const char* serverUrl, int dcMotorID) {
  HTTPClient http;
  http.begin(serverUrl);
  http.addHeader("Content-Type", "application/json");

  char postData[50];
  snprintf(postData, sizeof(postData), "{ \"dcMotorId\":%d}", dcMotorID);

  int httpResponseCode = http.PUT(postData);
  Serial.printf("HTTP response code: %d\n", httpResponseCode);

  if (httpResponseCode > 0) {
    String response = http.getString();
    Serial.println(response);
  }

  http.end();
}

void RemoteServer::postRequestStepper(const char* serverUrl, int motorId) {
  HTTPClient http;
  http.begin(serverUrl);
  http.addHeader("Content-Type", "application/json");

  char postData[50];
  snprintf(postData, sizeof(postData), "{ \"motorId\":%d}", motorId);

  int httpResponseCode = http.POST(postData);
  Serial.printf("HTTP response code: %d\n", httpResponseCode);

  if (httpResponseCode > 0) {
    String response = http.getString();
    Serial.println(response);
  }

  http.end();
}
