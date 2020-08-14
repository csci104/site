---
layout: default
title: Homework 2
nav: assignments
---
## HW2

+ Due: Fri. Sep. 18, 2020, 11:59pm (PST)
+ Directory name in your github repository for this homework (case sensitive): `hw2`
   - Once you have cloned your `hw-usc_username` repo, create this `hw2` folder underneath it (i.e. `hw-usc_username/hw2`).
   - If your `hw-usc_username` repo has not been created yet, please do your work in a separate folder and you can copy over relevant files before submitting.
   
### Problem 0: Experimental Runtime Analysis 
This problem will be discussed during our class meetings. You do not need to submit this as part of your programming assignment. We want to give you extra time as this exercise involves
coding and running experiments. It is helpful if you think about this problem before we meet or even try coding this before meeting and start collecting data to discuss.

For this exercise you will implement your own queue using STL vector and STL list. As we discussed the STL queue class is an adaptive container. It is essentially a list, but with the first in first out 
protocol (FIFO), so we can only add the the back of the list and remove from the front of the list. We want to complete the implementation of queue classes that use composition
and have either an STL vector or STL list as the private data and then we want to measure the differences in the operations given each implementation and why this may be occurring.
We will step you through this here. 
   
### Problem 1: Circular Linked List (25%)

For this problem, you will be using your skills with linked lists to create a class that stores a doubly-linked list of ints.  The list will also be circular, meaning that the head and tail of the list link to each other.  The list supports all operations in the List ADT, including insert, remove, get, and set, as well as a simple iterator interface which is explained below. 

A class skeleton has been provided in `circular_list_int.h`.  Copy this header to your homework folder and, in `circular_list_int.cpp`, implement the functions in `CircularListInt` according to their descriptions in the header file.

#### Circular Indicies

Since this class is a circular list, it is meant to store data that will be accessed continuously in a circle, and it would be nice if we could move around the circle just by incrementing the index.  So, indicies past the end of the list should "wrap around" back to the front of the list. For example, if a list has 5 members, index 5 wraps back to element 0, index 6 maps to element 1, and index 10 maps to element 0. This rule applies to `get()`, `set()`, and `remove()`.

The exception to this is when the list has 0 length, and there are no elements at all.  No amount of wrapping would produce a valid index here!  Instead, `get()` should return 0, and `set()` and `remove()` should just return without modifying the list.  



### Problem 2 (Stacks, 20%)
Use your `CircularListInt` class to create a Stack data structure for variables of type `int`.  Alternatively, you can use the STL `list<int>` if your Circular Linked List is not work for a cost of 4 points.  Download and use the provided [stackint.h](https://github.com/usc-csci104-fall2018/homework-resources/blob/master/hw3/stackint.h) as is.  Notice the stack has a CircularListInt as a data member (which you'll need to change to `list<int>` if you use that class instead, but don't make any other changes).  This is called **composition**, where we compose/build one class from another, already available class.  Essentially the member functions of the `StackInt` class that you write should really just be wrappers around calls to the underlying linked list.

You should think **carefully** about efficiency.  **All operations (other than possibly the destructor) should run in O(1)**

### Problem 3 (Simple Arithmetic Parser and Evaluator, 55%)

Simple arithmetic expressions consist of integers, the operators PLUS (+), MULTIPLY (\*), SHIFTLEFT (<), and SHIFTRIGHT (>), along with parentheses to specify a desired order of operations.  The SHIFTLEFT operator indicates you should double the integer immediately following the operator.  The SHIFTRIGHT operator indicates you should divide the integer by 2 (rounding down).  

Your task is to write a program (the executable should be named `parser`) that will read simple arithmetic expressions from a file, and evaluate and show the output of the given arithmetic expressions.

Simple Arithmetic Expressions are defined formally as follows:

1. Any string of digits is a simple arithmetic expression, namely a positive integer.
1. If Y1, Y2, ..., Yk are simple arithmetic expressions then the following are simple arithmetic expressions for `k>1`:
    + <Y1
    + >Y1
    + (Y1+Y2+Y3+...+Yk)
    + (Y1\*Y2\*Y3\*...\*Yk)

Notice that our format rules out the expression 12+23, since it is missing the parentheses. It also rules out (12+34\*123) which would have to instead be written (12+(34\*123)), so you never have to worry about precedence. This should make your parsing task significantly easier. Whitespace may occur in arbitrary places in arithmetic expressions, but never in the middle of an integer. Each expression will be on a single line.

Examples (the first three are valid, the other three are not):  

```
(<<14 *(>>123+333 )) // evaluates to 20328
<>(2 * 1* ( >500000000 + <<0)) // evaluates to 500000000
<>(1 * >3 * 3) // evaluates to 2
((<123*234)    // missing parenthesis
(1337*9001+42)   // mixing operators
(*1138*3720)    // extra *
```
Your program should take the filename in which the formulas are stored as an input parameter.  For each expression, your program should output to `cout`, one per line, one of the options:

 - `Malformed` if the formula was malformed (did not meet our definition of a formula) and then continue to the next expression.  
 - An integer equal to the evaluation of the expression, if the expression was well-formed.

Each expression will be on a single line by itself so that you can use getline() and then parse the whole line of text that is returned to you. If you read a blank line, just ignore it and go on to the next.  The numbers will always fit into `int` types, but as you can see from the example, they can be pretty large.  

**You must not use recursion to solve this problem**. Instead keep a stack on which you push pieces of formula.  **Use your `StackInt` class** from Problem 2 for this purpose.  In order to develop your algorithm, you should use STL stack. If your StackInt class is not working, you may submit the implementation using STL Stack for an 11 point deduction. Push open parenthesis '(', integers, and operators onto the stack.  When you encounter a closing parenthesis ')', pop things from the stack and evaluate them until you pop the open parenthesis '('. Now --- assuming everything was correctly formatted --- compute the value of the expression in parentheses, and push it onto the stack as an integer.  When you reach the end of the string, assuming that everything was correctly formatted (otherwise, report an error), your stack should contain exactly one integer, which you can output.

In order to be able to push all those different things (parentheses, operators, and integers) onto the stack, you will need to represent each item with an integral value.  It is your choice how to do this mapping.  One option is to store special characters (parentheses and operators) as special numbers that you reserve specifically for these purposes.  It might make your code more readable to define the mapping of special characters to integers by declaring them as const ints as in:

```c++
const int OPEN_PAREN = -1;
```

That way, your code can use `OPEN_PAREN` wherever you want to check for that value.  Remember that all numbers you are given will be positive, so you can use negative integers for your const values.

