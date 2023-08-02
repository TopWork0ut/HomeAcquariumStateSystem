#pragma once
#include <WiFiMulti.h>

extern WiFiMulti wifiMulti;
const uint32_t connectTimeoutMs = 30000;

void connectWiFi();


