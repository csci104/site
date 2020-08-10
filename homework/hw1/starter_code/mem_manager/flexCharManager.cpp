#include "flexCharManager.h"

             
// The constructor creates a unique_ptr to a dynamically allocated 
// array of  2 Mem_Blocks using the intialization list

flexCharManager::flexCharManager():used_memory(new Mem_Block[2]) {

   
}

char* flexCharManager::alloc_chars(int n){
// Add your implementation 
	return nullptr;
}

void flexCharManager::free_chars(char* p){
// Add your implementation

}         

