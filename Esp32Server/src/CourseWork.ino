#include <WiFi.h>
#include <Wire.h>
#include "WebServer.h"
#include "WiFiConnection.h"
#include "ESP32Server.h"
#include "UltrasonicSensor.h"
#include "RemoteServer.h"
#include "TimerInterruptions.h"
#include "StepMotor.h"
#include "Filter.h"

#include <HardwareSerial.h>
#include <SoftwareSerial.h>


Filter filter(1);
const char* serverUrlUltrasonic = "http://192.168.31.123:8080/ultrasonic/data/";
const char* serverUrlStepper = "http://192.168.31.123:8080/stepper_motor/data/";
const char* serverUrlDcMotorON= "http://192.168.31.123:8080/dc_motor/data/";
const char* serverUrlDcMotorOFF= "http://192.168.31.123:8080/dc_motor/endDate/";
// const std::string serverUrlDcMotorOFF = "http://192.168.31.123:8080/dc_motor/data/endDate/" + std::to_string(filter.getID());
// const char* serverUrlDcMotorOFFChar = serverUrlDcMotorOFF.c_str();


WebServer server;
Ultrasonic ultrasonic;
RemoteServer remoteServer(1);


volatile bool flag = false;
extern volatile bool flag2 = false;
extern volatile bool flag3;
volatile bool flag4 = false;


void IRAM_ATTR isr() {
  flag = true;
}

void IRAM_ATTR stepperInterrupt();
// void IRAM_ATTR isr1() {
//   flag2 = true;
// }

const uint8_t motorPin1 = 26;
const uint8_t motorPin2 = 25;
const uint8_t motorPin3 = 33;
const uint8_t motorPin4 = 32;
const uint8_t interruptPin = 2;
const int stepperID = 1;
const int stepDelay = 3000;

StepperMotor myStepper(motorPin1, motorPin2, motorPin3, motorPin4, stepDelay, stepperID);

HardwareSerial SerialUNO2(2);

void setup() {
  Serial.begin(9600);
  SerialUNO2.begin(9600, SERIAL_8N1, 16, 17);  // UART2 for Arduino Uno

  delay(1000);
  
  connectWiFi();

  TimerClass myTimer(0, 80, true, false, &isr);
  myTimer.setAlarm(4000000, true);  // Set the alarm to trigger every 1 second
  myTimer.enableTimer(); 

  Serial.print("SETUP runs");
  pinMode(15, OUTPUT);
  digitalWrite(15, HIGH);

  pinMode(interruptPin, OUTPUT);
  digitalWrite(interruptPin, HIGH);
  
  attachInterrupt(interruptPin,stepperInterrupt, FALLING);
  myStepper.initialize();

  setupESP32Server(server);
  ultrasonic.setupUltrasonic();
  // myStepper.step(20);
}


void loop() {
  server.handleClient();
  ultrasonic.measureDistance();
  
  static unsigned long startTime = 0; 
  

  if (flag) {
    flag = false;
    remoteServer.postRequestUltrasonic(serverUrlUltrasonic, ultrasonic.getDistance(), 1);
  }

  if (SerialUNO2.available()) {
    int data = SerialUNO2.read();
    if (data != -1) {
      int receivedInt = data - '0';
      if(receivedInt >= 0 & receivedInt <= 2) {
        Serial.print("Received data from Arduino Uno: ");
        Serial.println(receivedInt);

        switch(receivedInt) {
          case 0:
            digitalWrite(15, 1);
            Serial.println(0);
            remoteServer.updateRequestDCOFF(serverUrlDcMotorON,filter.getID());
            break;
          case 1:
            digitalWrite(15, 0);
            Serial.println(1);
            remoteServer.postRequestDCON(serverUrlDcMotorOFF,filter.getID());
            break;
          case 2:
            remoteServer.postRequestStepper(serverUrlStepper,myStepper.getID());
            flag3 = true;
            Serial.println(2);
            break;
        }
      }
      
    }
    
  }

  // if (flag2) {
  //   flag2 = false;
  //   // servoController.updateServo();
  //   // Serial.println("l");
  // }

  if (flag3) {
    myStepper.step(260);
    startTime = millis();
    
    flag3 = false;
    flag4 = true;
  }

  if (flag4) {
    unsigned long currentTime = millis();
    if (currentTime - startTime >= 2400) {
      myStepper.step(-260);
      flag4 = false;
      startTime = currentTime;
    }
  } 
}



