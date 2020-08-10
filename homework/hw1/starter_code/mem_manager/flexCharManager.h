#ifndef FLEXCHARMANAGER_H
#define FLEXCHARMANAGER_H


#include <memory>
#include <cstddef>
#include "simpleCharManager.h"

typedef struct Mem_Block {
      /* the number of characters allocated to the memory block by call to alloc_chars*/
      int size;  
      /* the starting address in the buffer allocated to the memory block by call to alloc_chars*/
      char* physical_location;
      // Constructors
      Mem_Block(){size = 0; physical_location = nullptr;};
      Mem_Block(int s,char *p){size = s; physical_location = p;};
} Mem_Block;


class flexCharManager: public simpleCharManager
{
	public:
                flexCharManager();
                ~flexCharManager(){};
             
                char* alloc_chars(int n);
                void free_chars(char* p);          

	protected:
/*Dynamically maintain an array of Mem_Blocks sorted by physical addresses into
  the character buffer. The physical addresses in the character buffer are
  used to track active requests. The used_memory pointer keeps
  track of the array of Mem_Blocks and we start with only 2 Mem_Blocks.*/
           
            std::unique_ptr<Mem_Block[]> used_memory;

/* memory available in the buffer */
            int free_mem = BUF_SIZE;

/* memory blocks in use */
            int active_requests = 0;

/* memory blocks available in array of memory blocks*/
            int used_mem_size = 2;

/* You may add additional member functions here if necessary */

};





#endif
