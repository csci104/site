---
layout: default
title: Homework 1
nav: assignments
---
## HW1

+ Due: Friday. Sep. 4, 2020, 11:59pm (PST)
+ Directory name in your github repository for this homework (case sensitive): `hw1`
   - Once you have cloned your `hw-usc_username` repo, create this `hw1` folder underneath it (i.e. `hw-usc_username/hw1`).
   - If your `hw-usc_username` repo has not been created yet, please do your work in a separate folder and you can copy over relevant files before submitting.

### Objective

In this assignment we will using GitHub and resources such as skeleton code. We will also reviewecursion and memory management by writing simple character storage managers ourselves. In doing so, we will not only improve our practice of pointers, but also develop greater appreciation for what the C++ language and the operating
system provide for us in memory management. We will also practicing using dynamic memory allocation by using dynamically allocated arrays.

###A Few Notes on Repositories

1. Never clone one repo into another.  If you have a folder `cs104` on your VM and you clone your personal repo `hw-usc_username` under it (i.e., `cs104/hw-usc_username`) then whenever you want to clone some other repo (such as the repo we use to give you skeleton code, or another personal repo you may have created), you need to do it back up in the `cs104` folder or another location, NOT in the `hw-usc_username` folder.
2. Your repos may not be ready immediately but be sure to create your GitHub account and fill out the GitHub information form linked to at the end of [Lab 01]({{ site.url }}/labs/lab01.html).

###Skeleton Code

On many occasions we will want to distribute skeleton code, tests, and other pertinent files. To do this, we have made a separate repository, [`homework-resources`]({{site.data.main.github}}), under our class GitHub site.  You should clone this repository to your laptop and do a `git pull` regularly to check for updates. (Yes, even we sometimes make mistakes; when we do, we will fix them as quickly as possible, but you'll only get the fixes when you pull.)

```
$ git clone git@github.com:usc-csci104-fall2020/homework-resources.git
```

Again, be sure you don't clone this repo into your `hw-usc_username` repo, but at some higher-up point like in a `cs104` folder on your laptop.

### Using Valgrind

Carefully review the lecture topics related to memory management and allocation, classes, operator overloading, and copy constructors/assignment operators.

You will lose points if you have memory leaks, so be sure to run `valgrind` once you think your code is working. Remember that using *C++ smart pointers* as we discussed in lecture can help you with memory management and preventing memory leaks.

For example, if you were to compile `program` that takes two arguments:

```
$ ./program input.txt output.txt
```

The corresponding Valgrind command would be:

```
$ valgrind --tool=memcheck --leak-check=yes ./program input.txt output.txt
```

For more information on Valgrind, take a look at the CSCI 104 [wiki](https://github.com/csci104/wiki).

### Programming Advice and C++ Review

#### Command line Arguments

In order to read parameters as command line arguments in C++, you need to use a slightly different syntax for your `main` function:
 
```c++
int main (int argc, char* argv[]) {
    // Your code here
}
```

When your program is called at the command line, `argc` will then contain the total number of arguments that the program was given, and `argv` will be an array of the arguments the program was passed.

- The argument at `argv[0]` is always the name of your program.
- Consequently, `argv[1]` is the first argument passed to the program.

The operating system will assign the values of `argc` and `argv`, and you can just access them inside your program.

#### Exceptions

Errors happen in programming. We receive unexpected or illegal inputs or arguments or we reach a state that we cannot handle. Rather than using return values to indicate errors, an elegant mechanism provided by C++ to handle errors are ***exceptions***. We will teach you more about exceptions in a few weeks. However, in the code we provide for this assignment we are using exceptions to indicate when errors occur.
- In this homework, you do not need to catch any exceptions.
- In addition, we have provided the code that throws exceptions when needed.
- You should simply understand what is happening when we do throw exceptions, i.e. an error case has occurred.


###Problem 1 (Recursion Review from CSCI 103, 15%)

For this problem you will implement a function called, **isParen**, that given an expression string will return true if and only if the
expression string is properly parenthesized and false otherwise. An expression is properly parenthesized if a left parentheses such as ’(’ and  ’\['
have a matching right parentheses. Symbols such as ’+’, ’\*’, and numbers may be ignored. You may assume expression strings will only contain
parentheses, ’+’, ’\*’, spaces, or numbers. Your implementation must recursive.  Your solution may use helper functions. 

The function **isParen** has the following prototype:
**bool isParen(string expression);**

Consider the following examples of inputs that should return true and false:
- **True:**  
   - (7+8)  
   - \[7\*(6+8)]  
   - 7+8  
   - (7+8)\*(5+6)\*(15)
- **False:** 
   - \[7+8  
   - \[7+8) 
   - (\[7*5\]+(6+8)(15))+5+6)

Remember that a *helper function* can be used to implement a recursive function by passing extra parameters to the recursive calls that help solve the problem. If you choose to use a helper function, consider what parameters may be helpful to pass? For example, how may you keep track of where the recursion is evaluating in the expression string and what parentheses must be matched?  Another consideration is how to pass the parameters. Should the parameters be *passed by C++ reference* so that the variable is shared across calls or will *passing by copy* suffice? (You should not need pointers for this.)


Your implementation should be completed in `paren.cpp`, which we have provided for you in the
`homework_resources/hw1` folder/repo. Copy the file to your `hw_usc-username/hw1` folder. Please only make changes where indicated and do not change 
the main function. You may not use **STL containers classes** nor include any additional libraries.

To compile the code, type `g++ -o paren paren.cpp`.
To test the code on the command line, type `./paren 'expression'`. Use the `'` marks around the expression in order to prevent the shell from interpreting parentheses in the expression. Here are example tests with output from main: <br>
`./paren '(7+8)*(5+6)*(15)'`<br>
`Correct!`<br>
`./paren '[7+8'` <br>
`Incorrect!`<br>


###Problem 2 (Rational Numbers, 30% )

To practice implementing classes and applying operator overloading, implement a `Rational` number class. Rational numbers are ones that can be represented as a fraction where there is an integer numerator, n, and an integer denominator, d: `n/d`.

Operations that apply to rational numbers include the basic **arithmetic** operators, **comparison** operators, and some **assignment** operators.
You will be asked to implement variations of a **subset** of these operators (not all).  

In addition, we will support integer exponentiation using the `^` operator (note: this is the bitwise-XOR operation in C/C++ but will be redefined for our `Rational` class).
As an example: `(2/7)^2 == 4/49`.  Note that the integer exponent can be negative and should work appropriately. As an example, `(2/7)^-2 == 49/4`.

To determine what operations are required to be implemented:

1. First reference the skeleton header file [`rational.h`]({{ site.data.main.github }}/homework-resources/blob/master/hw1/rational/rational.h).
   You must implement all prototyped functions in the class declaration.  
2. Second, you will also need to add **all appropriate functions to support the code written in [`test-rational.cpp`]({{site.data.main.github}}/homework-resources/blob/master/hw1/rational/test-rational.cpp)** such that `test-rational.cpp` will compile, run, and produce the expected output given in [`test-rational.exp`]({{site.data.main.github}}/homework-resources/blob/master/hw1/rational/test-rational.exp).  

You should certainly test your code for various, other corner cases (which we will also do when we grade your assignment), but to determine which functions to implement, use the `test-rational.cpp` file.
**No other operations must be supported beyond those exercised by `test-rational.cpp`.**

#### Implementation Requirements and Notes

 - The default constructor should produce a Rational number of `0/1`.
 - A Rational number can be constructed from any combination of positive and negative numerator and denominator, but should follow traditional mathematical rules.
   Consider how you want to deal with the sign.  When outputting a negative fraction, the negative sign, `-`, should appear before the fraction (e.g. `-1/2`).
 - When extracting a Rational number via `operator>>`, you may expect the format ` n / d ` with any amount of whitespace (including none) separating the three components: numerator, `/`, and denominator (e.g. `-1/ 2`, `1 / 2`, `1 /-2`).  However, we will never input a rational with just the whole number (e.g. we will enter `2/1` and not just `2`). For a negative numerator or denominator, you do NOT have to handle whitespace between the negative sign and the integer value, you may assume the integer will immediately follow the negative sign.  If, as you extract the components of a `Rational`, the stream fails or you don't find the appropriate format, you should set the referenced Rational to the **value of a default constructed Rational (i.e. 0/1)**.
 - Any time a resulting Rational number results in 0 (i.e. numerator = 0), you must store the denominator as 1.  We have provided a normalization helper function: `void Rational::normalize0();` to perform that check and update and you may call it as needed.
 - Remember that any rational number may be reduced to a canonical form such that the numerator and denominator do not share any factors except 1. You must implement a private member function, *reduce*, in order to keep your rational number in a canonical form. To do so, you must find the greatest common divisor (gcd) of the numerator and denominator. You may use the `<algorithm>` library function **std::__gcd** to help you. Note that if at least one of the arguments to this function is negative the returned gcd is negative and your code should handle this case.
 - You may use functions from `<cmath>`, `<cstdlib>`, and `<algorithm>` as necessary.


#### Testing
To start ensure the output of `test-rational` matches the contents of `test-rational.exp`.  A useful tool to do this is the `diff` utility. First direct the output of your code to a file using redirection `>`: <br>
`make test-rational` <br>
`./test-rational > my_output_file ` <br>
Then use the diff utility to help you compare the files and as a result, any lines that differ between the files, if any, will be printed to standard output: <br>
`diff my_output_file test-rational.exp`

However, there are other cases that we will test for grading beyond those given in `test-rational.exp`.  In CS 104 it is your responsibility to test your code thoroughly, thinking through potential corner cases and stress cases.  Please spend some time  thinking about what could break your code, writing more test cases and ensuring they work as expected. We will teach you more formal tools to help with testing a little later into the semester.



###Problem 3 (Memory)

In this problem you will create your own memory manager that will be able to store and find characters for a user or client program.  As we move forward in the class we want to rely more on C++ and the operating system to manage memory for us, but this exercise will give a glimpse into what underlies some of the abstractions that are provided to manage memory.

#### Part 1: A Simple, Contiguous Character Storage Manager (20%)

The memory will be stored in a single array of `10000` characters 

```
/* char buffer[10000] */
```

You will need to implement the following two functions:

1. `char* alloc_chars( int n);`
This function will return a pointer to a memory address in the buffer that can hold n characters. If there
is not enough space left in the buffer, return **nullptr**.
2. `void free_chars(char *);`
This function given a pointer into the buffer will free all memory addressed from that address in the buffer until the end of the buffer.  If the pointer is the nullptr or an address not in the buffer, this function should do nothing. This is not the ideal way to free memory; it is only to help us learn an easier way to manage memory to start.

Let's consider a program that  utilizes the simple memory manager by calling the following code:

```
if (char* c1 = alloc_chars(2)) /* Request space for two characters and check that it was granted */
{  
    c1[0] = 'h';     /* Overwrite the buffer space given with characters */
    c1[1] = 'i';
}   
char* c2 = alloc_chars(3);  
 /* Free characters in the buffer starting at address c1 and overwrite buffer with null characters
    starting at c1 until the end of the buffer */
free_chars(c1); 
```

Skeleton code is given in the `simpleCharManager.*`.  If a character has not been allocated to the user, then it should contain the null character, `\0`.  When a simple memory manager is instantiated, all characters in the buffer will be set to the null character before anything has been allocated to a user. All characters in the buffer should be set to the null character after they have been freed by a call to `free_chars`. We have provided the member function, `overwrite`, to assist in this.

In this part of the problem, all characters are stored contiguously in memory.  When memory is requested by your program, you will assign it the smallest address available (i.e. smallest available array index), unless there is not enough remaining space in the buffer. If memory is freed, it will be freed from the address requested until the end of the buffer. This is illustrated below:

![Rotation Image]({{ site.url }}/assignments/img/contiguous_buffer.jpg)

In order to test your memory manager:

1. A  small driver program that utilizes your memory manager is provided in `first_memtest.cpp`.  The program should do the following if your memory manager is working correctly. First it should store the phrase: `Hello world!\n` one character at a time, storing whitespace and punctuation also.  Then print the phrase. Then release the memory for `world!\n` and finally obtain memory to store the phrase `moon! Bye.\n`. This program should work  only using your memory manager to do this and not using `malloc`, `new`, `free`, `delete`, or C++ strings. You may modify this program as needed to help test your code.
2. To help debug your program, draw what the stack memory of the driver program looks like. Draw what it should look like if your manager is working properly and then compare to what may be happening with your manager.
3. This storage manager is very problematic. Consider how it is possible to overwrite part of the buffer that the user still has a pointer to (and may try to access via that pointer). (This is not a problem with your implementation. It is inherent in the design provided. Try to test this case in the driver program.)

#### Part 2: A More Flexible Character Storage Manager (35%)

Being unable to selectively remove a few characters in the middle of our program stack is not ideal.  To fix the identified problems, we will need to keep careful track of each of our pointers. We will implement a flexCharManager which inherits publicly from our simpleCharManager. (We will cover inheritance more carefully in a few weeks.) The flexCharManager will have access to all of the data and function members of the simplerCharManager that were written in part one. This means the flexCharManager has a large (10000) buffer of characters to manage.  Once again, if the character is not allocated in the buffer it should hold the null character.

Since we will now allow the user to delete characters in the middle of our buffer, while leaving the rest of the characters after intact, we will need to keep careful track of which characters are allocated (we cannot merely keep track of the last character in use).  In addition, we will need to keep careful track of how many chars are assigned via a specific `alloc_chars` function call.  When you call `alloc_chars`, you will need to create a `Mem_Block`, which is defined in the skeleton code, which will keep track of both the `char*` return value, as well as the number of characters stored in this memory block.  Let's look at our Mem_Block struct more carefully

```
typedef struct Mem_Block {
      /* the number of characters allocated to the memory block by call to alloc_chars*/
      int size;  
      /* the starting address in the buffer allocated to the memory block by call to alloc_chars*/
      char* physical_location;
      // Constructors
      Mem_Block(){size = 0; physical_location = nullptr;};
      Mem_Block(int s,char *p){size = s; physical_location = p;};
} Mem_Block;

```


Your flexible manager should keep track of all of the memory allocated in array of `Mem_Block`s. That means when there is a call to `alloc_chars`, your flexible char manager should do the following:
1. As with the simple manager, find a location in the buffer of characters that has enough characters for the request. Return a pointer to that address in the buffer or the nullptr if the request cannot be satisfied.
2. If there is space in the character buffer to grant the request, create a `Mem_Block` that keeps track of the number of characters allocated and the starting address pointer that is returned from the call to `alloc_chars`.

The flex Manager should store all the `Mem_Block`s in a dynamically allocated array.  In the flexCharManager the dynamically allocated array is managed using a **unique_ptr** to an array of Mem_Blocks that is initialized in its constructor to be an array of `2` Mem_Blocks called `used_memory`.
```
std::unique_ptr<Mem_Block[]> used_memory;
```

How big should your array be?

+ The constructor creates  an array of Mem_Blocks of size `2`.  That is the minimum size of this array.
+ If the number of active requests for memory from the character buffer equals the size of the array of Mem_Blocks, `used_mem_size`, then double the size of the Mem_Block array, `used_memory`.
+ Unless the used_memory array is size `2`, if the number of Mem_Blocks in use by active memory requests is less than half the `used_mem_size`, halve the size of the used_memory array (make sure to not have memory leaks! and let the unique_ptr help you.) 

Remember there are two different arrays:.
1. As with the simple manager there is the *buffer* array of `10000` characters that is statically allocated as a data member of the manager class.  
2. For the flexible memory manager, there is also a dynamically allocated array,`used_memory`, storing  `Mem_Block` structs that keep track of memory allocated in the *buffer*.

Skeleton code for this part is provided in `flexCharManager.*`. We have provided driver code for testing your memory manager in `second_memtest.cpp`. You will need to implement the same functions as in the first part, but now the memory can be assigned from any place in your buffer as long as there is space. As a consequence it will be possible to delete individual pointers from memory.

Implement the same two functions as before:

1. `char * alloc_chars( int n);`
This function will return a pointer to memory location in the character buffer that can hold `n` characters. For
determining from where to allocate memory, implement a ***first fit strategy***. There are two critical parts to implementing
this with the used_memory array:

   1. *Checking if memory location in the buffer exists to satisfy the request:* Starting from the beginning of the used_memory array, 
check the physical location, the address of a character in the buffer, for the Mem_Block and check if there is
enough memory in the buffer to satisfy the call for `n` characters between the current Mem_Block's physical location and the next Mem_Block's physical location. 
If so, create a new Mem_Block and insertit  into the used_memory array so the physical locations of the Mem_Blocks are in sorted order of increased address into
the character buffer. The address in the buffer returned should be the address closest to the starting address of the buffer that can fit the entire n requested 
characters. *If there is no space left in the buffer that can satisfy the request, return nullptr.* 

   2. *Keeping the used_memory array of Mem_Blocks in sorted order of increasing address into the buffer:* In order to find the smallest memory address in the character buffer that can satisfy the request, the discussion above assumed that the array of Mem_Blocks in `used_memory` are sorted in increasing order of physical addresses into the character buffer stored in the Mem_Blocks (i.e. `physical_location`). To do this, once a location to satisfy the request is found, keep track of where in the used_memory array this new Mem_Block should be inserted into the used_memory array. Once strategy given the location to insert the new Mem_Block is to move all of the Mem_Blocks in the used_memory array with physical addresses in the buffer greater than it. There are many other ways to implement this and you are welcome to do so as long as the final effect is that the Mem_Block that is added is in sorted order of increasing `physical_location` of the Mem_Block in the used_memory array. (You may use `<algorithm>`.)

For example, for the very first memory request received for say 10 characters, i.e. the first call alloc_chars(10):
```
Mem_Block first;
first.size = 10;
first.physical_location = buffer; /*No memory is allocated yet so it can be the start of the buffer*/
used_memory[0] = first; /*No Mem_Blocks are used yet, so it can be the first Mem_Block in the used_memory array */
```
This is an example of a special case for first fit and how to use both arrays. Your code should generalize this and handle other special cases.

2. `void free_chars(char *);`
This function given a pointer in the buffer will free all memory at the given address that had been allocated in an `alloc_chars` call. It will not free all memory
left in the buffer, only the memory allocated at the given address from a single `alloc_char` call. For example, if a call `alloc_chars(10)` was made and returned
`address_1`, then a call to `free_chars(address_1)` would release `10` characters from buffer starting at `address_1`, overwriting the contents with the null character. (Remember that you can stil use the `overwrite` member function.) If the pointer given as an argument to `free_chars` is not a valid address in the buffer range or
has not been requested from `alloc_chars`, then nothing will be done. In order to know what memory addresses are valid, you must manage the memory blocks in
use.

Some additional notes:

1. Your character storage manage must have the exact same behavior as any
sequence of `new char[int]` and `delete` calls (with the exception of running out of
memory faster).
2. There is one major problem with this implementation. We may have enough
space in the buffer, but it is not all contiguous, so when a request for more
memory comes, the implementation will not find enough space. This is called
fragmentation and it is illustrated below:

![Rotation Image]({{ site.url }}/assignments/img/fragmentation_example.jpg)

Given the following requests for memory and free memory and words placed in
the space, diagram what the fragmentation looks like in a buffer of 20 characters assuming that a first fit algorithm is used to find space in the buffer. This is a good exercise to visualize the first fit algorithm. Can you create test cases for your own code to create fragmentation? (Once again this is not a problem in your implementation. It is an inherent problem with memory management in general.) 

```
Request 3 chars in which to place the string "in "
Request 7 chars in which to place the string "French "
Request 7 chars in which to place the string "chapeau"
Remove the 3 chars allocated for "in "
Request 3 chars in which to place the string "top"
Remove the 7 chars allocated for "French "
Request 8 chars in which to place the string "sombrero"
Request 3 chars in which to place the string "hat"
```

### Completion Checklist

+ Directory name for this homework (case sensitive): `hw1`
    - This directory should be in your `hw-username` repository
    - This directory needs its own `README.md` file briefly describing your work
 + Your completed `paren.cpp`
 + Your completed  Rational implementation in the following files: `Rational.h` and `Rational.cpp`
 + Your completed simple character manager  in the following files: `simpleCharManager.h` and `simpleCharManager.cpp` 
 + Your completed flexible character manager  in the following files:  `flexCharManager.h` and `flexCharManager.cpp` 




### Commit then Re-clone your Repository

You can submit your homework [here](http://bits.usc.edu/codedrop/?course=cs104-fa18&assignment=hw1&auth=Google). Please make sure you have read and understood the [submission instructions]({{ site.url }}/assignments/submission-instructions.html).

