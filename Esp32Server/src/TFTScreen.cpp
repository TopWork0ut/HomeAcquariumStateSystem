// #include "TFTScreen.h"

// // tft lcd 2.4 pinout lcd_rd 13, lcd_rw 12,  lcd_rs 14, lcd_cs 27, lcd_rst 41, lcd_d1  4, lcd_d0  16, lcd_d7 17 , lcd_d6  40, lcd_d5  19, lcd_d4 21 , lcd_d3 22, lcd_d2 23
// // #define TFT_CS   27  // Chip select control pin
// // #define TFT_DC   14  // Data Command control pin - must use a pin in the range 0-31
// // // #define TFT_RST  26  // Reset pin
// // #define TFT_RST  41

// // #define TFT_WR   12  // Write strobe control pin - must use a pin in the range 0-31
// // #define TFT_RD   13


// // #define TFT_D0 16
// // #define TFT_D1 4
// // #define TFT_D2 23
// // #define TFT_D3 22
// // #define TFT_D4 21
// // #define TFT_D5 19
// // #define TFT_D6 40
// // #define TFT_D7 17


// // Update the pin mappings based on your LCD
// // #define TFT_CLK 13
// // #define TFT_RD 12
// // #define TFT_RS 14
// // #define TFT_CS 27
// // #define TFT_RST 41
// // #define TFT_D0 16
// // #define TFT_D1 4
// // #define TFT_D2 23
// // #define TFT_D3 22
// // #define TFT_D4 21
// // #define TFT_D5 19
// // #define TFT_D6 40
// // #define TFT_D7 17

// TFTScreen::TFTScreen() {
//   // Constructor
// }

// void TFTScreen::setup() {
//   // Serial.begin(115200);
//   // tft.reset();
//   uint8_t value = 0x9341;
//   tft.begin(value);
  
//   // tft.readID();
//   tft.setRotation(3);
//   tft.fillScreen(TFT_BLACK);
//   tft.setTextSize(2);
//   tft.setTextColor(TFT_WHITE);
//   tft.setCursor(10, 10);
//   tft.println("Hello, TFT!");
// }

// void TFTScreen::loop() {
//   // Your code here
// }
