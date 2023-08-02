#include "ESP32Server.h"
#include "StepMotor.h"


// const uint8_t motorPin1 = 26;
// const uint8_t motorPin2 = 25;
// const uint8_t motorPin3 = 33;
// const uint8_t motorPin4 = 32;
// const uint8_t interruptPin = 2;

// const int stepDelay = 3000;

// StepperMotor myStepper(motorPin1, motorPin2, motorPin3, motorPin4, stepDelay);
extern StepperMotor myStepper;
volatile bool flag3 = false;


void IRAM_ATTR stepperInterrupt() {
  flag3 = true;
  digitalWrite(interruptPin, HIGH);
}

void setupESP32Server(WebServer& server) {
  server.on("/", std::bind(handleRoot, std::ref(server)));
  server.on("/filter", std::bind(handleDataFilter, std::ref(server)));
  server.on("/feeder", std::bind(handleDataFeeder, std::ref(server)));

  server.begin();
}

void handleRoot(WebServer& server) {
  String html = "<html><body>";
  html += "<h1>ESP32 Web Server</h1>";
  html += "<form method='post' action='/data'>";
  html += "<input type='number' name='value' />";
  html += "<input type='submit' value='Submit' />";
  html += "</form>";
  html += "</body></html>";
  server.send(200, "text/html", html);
}

void handleDataFilter(WebServer& server) {
  String value = server.arg("value");
  
  // Do something with the received value
  // For example, you can print it to the Serial Monitor
  // Serial.print("Received value: ");
  // Serial.println(value);
  // Serial.println("atoi(value.c_str())");
  // Serial.print(atoi(value.c_str()));
  int pinVal = atoi(value.c_str());
  if (pinVal == 1) {
    digitalWrite(15, 0);
  } else if (pinVal == 0) {
    digitalWrite(15, 1);
  }
  

  int pinState = digitalRead(15);

  // Serial.print("State of pin ");
  // Serial.print(pinState);
  // Allow CORS
  server.sendHeader("Access-Control-Allow-Origin", "*");
  server.sendHeader("Access-Control-Max-Age", "10000");
  server.sendHeader("Access-Control-Allow-Methods", "POST");
  // server.sendHeader("Access-Control-Allow-Headers", "Content-Type");
  server.sendHeader("Access-Control-Allow-Headers", "*");

  server.send(200, "text/plain", "Data received successfully!");
}


void handleDataFeeder(WebServer& server) {
  digitalWrite(interruptPin, LOW);  // Set the 2nd pin to low to trigger the interrupt
  
  server.sendHeader("Access-Control-Allow-Origin", "*");
  server.sendHeader("Access-Control-Max-Age", "10000");
  server.sendHeader("Access-Control-Allow-Methods", "POST");
  // server.sendHeader("Access-Control-Allow-Headers", "Content-Type");
  server.sendHeader("Access-Control-Allow-Headers", "*");

  server.send(200, "text/plain", "Data received successfully!");
}
