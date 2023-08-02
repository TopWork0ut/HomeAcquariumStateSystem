#pragma once

#include "WebServer.h"

void setupESP32Server(WebServer& server);
void handleRoot(WebServer& server);
void handleDataFilter(WebServer& server);
void handleDataFeeder(WebServer& server);


