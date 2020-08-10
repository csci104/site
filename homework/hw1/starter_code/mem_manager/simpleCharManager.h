#ifndef SIMPLECHARMANAGER_H
#define SIMPLECHARMANAGER_H




/**
* Simplest Character Storage Manager
*/
class simpleCharManager
{
	public:
               // Default constructors and destructors are sufficient
                simpleCharManager(){};
                ~simpleCharManager(){};
             
                char* alloc_chars(int n);
                void free_chars(char* p);          

	protected:
                
		static const int BUF_SIZE = 10000;
                // Allocating buffer and initializing to null characters
		char buffer[BUF_SIZE]{};
                // Initializing the pointer to first available place
                // to allocate memory as the start of the buffer
                char* free_place = buffer;
                
                // We have provided this function to overwrite the
                // buffer with null characters beginning at the address
                // start and ending at the address end.
                // It is the caller's responsibility to pass the 
                // correct starting and ending addresses in the buffer.
                                                                           
                void overwrite(char *start, char * end);
};





#endif
