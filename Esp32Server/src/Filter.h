#pragma once

class Filter {
private:
  
  int filterID;

public:
  Filter(int filterID){
   filterID = filterID;
  }

  int getID() {
    return filterID;
  }
};