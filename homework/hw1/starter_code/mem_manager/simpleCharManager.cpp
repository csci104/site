#include <cstddef>
#include "simpleCharManager.h"
#include <algorithm>



char* simpleCharManager::alloc_chars(int n){
       //Add your implementation here
	return nullptr;
}

void simpleCharManager::free_chars(char* p){
       // Add your implementation here
       return;
}        


// Provided: Overwrite will fill the buffer with null characters
// from the start address until the end address in the buffer inclusive.
// You must provide the correct address into the buffer if you
// call this function.

void simpleCharManager::overwrite(char* start, char* end){
     std::fill(start, end,'\0');
}
                

               



