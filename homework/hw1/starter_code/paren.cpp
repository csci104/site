#include <iostream>
#include <string>
#include <ctype.h>


using namespace std;

/* TO DO: Implement isParen */
bool isParen(string expression);

/* Add any helper function prototypes here */

/* Provided for you to check for skipped characters. 
   returns true if and only if a character can be skipped. */
bool skippedCharacter(char c);



/* It is not necessary to change the main function */
int main(int argc, char* argv[])
{
   if (argc != 2) {
      /*Writing error message to standard error for incorrect number
        of parameters */
      cerr << "Incorrect usage: paren expression" << endl;
      return -1;
   }

   /* The second argument is the expression string in the format specified
      and promised in the assignment page. You do not need to do any
      error checking except for checking the parentheses. */

   string e = string(argv[1]);
   if (isParen(e)){
       cout << "Correct!" << endl;
   } else {
       cout <<  "Incorrect!" << endl;
   }
   
   
   return 0;
}


/* Complete function implementations here */
/* For debugging, use GDB or write error messages to standard
   error by using cerr */

bool isParen(string expression) {
    /* This function is incorrect. Please fix starting here. */
    return true;
}


/* Add any additional function implementations here */

/* skippedCharacter takes as its input a character and returns true if and
   only if the character may be skipped when checking for correct 
   parentheses. */

bool skippedCharacter(char c){
    return (c == ' ' || c == '+' || c == '*' || isdigit(c));
}
