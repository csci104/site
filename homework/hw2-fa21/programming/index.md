---
layout: asides
toc: true
tasks: true
title: Homework 2 Programming
---

# HW2: Programming Assignment

+ Due: Friday, September 24th, 11:59pm PST
+ To access the written portion of this assignment, click [here](..)
+ Directory name in your github repository for this homework (case sensitive): `hw2`

    - In this project we have provided a code base.  Do a `git pull` in your `resources` repo.
    - Then copy the `resources/hw2` folder into your `hw-username` repo and use the skeletons provided to start work in that `hw2` folder.

    - You **MUST** provide a `Makefile` so that we can compile your code (not run it) by simply typing `make` which should among other compilation commands, produce an executable `interpreter`
    - Remember to compile and test your code inside Docker (but should do your git commands outside Docker)
    -   Provide a `README.md` file to explain how to compile your code, and to document any oddities you want the graders to be aware of.
    - **You may use any STL classes you like**

**Please read the entire assignment through once before you start to perform any tasks.**

#### Background

When you compile your C++ code, the compiler turns your code into a bunch of 0s and 1s (machine code).  There is another way this could be done however: an *Interpreter* doesn't compile the code, but rather goes line by line, interpreting what needs to be done.  It keeps track of the *Program State* as it runs (that is, the values of variables, what line it is on, etc).  Implementing an effective interpreter for C++ would take years.

#### The Language

You will be writing an Interpreter for a very limited version of the well-known programming language BASIC.  BASIC was widely used a few decades ago, and is considered easy to learn.  Like any other language, BASIC has variables, expressions, and commands.

One of the main control flow commands in BASIC is GOTO, which jumps to a given line number.
While you will need to handle GOTO statements in BASIC, don't try to use them in C++: this is considered very bad style.  The GOTO statement produces code which is very difficult to understand, which is why most languages nowadays strongly discourage it, or not make it available at all.  See the article [Go To Statement Considered Harmful](https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf), one of the most influential computer science articles of all time, and also check out the following [XKCD comic](https://xkcd.com/292/).

We will worry about only twelve kinds of statements.  There is a generic `Statement` class, which serves as the base class for all twelve types (that is, there is a class for each type, and it inherits from the generic `Statement` class).  You will need to add functionality for each of the twelve types of statements.

You will implement an `interpretProgram` function which will read in a valid program from an input stream, interpret that program, and output everything to an output stream.  In the skeleton code, we are passing in a file stream as input and cout as output, but your program should work just as well if we pass in different streams to the `interpretProgram` function (such as redirecting output to a file).

A valid program is a sequence of statements, one per line.  **You will only receive valid programs as input, so you don't have to do error checking of this type.** Here is an example of a valid program:

```
1 LET ABRA 42
2 PRINT ABRA
3 GOSUB 7
4 PRINT ABRA
5 PRINT CADABRA
6 GOTO 10
7 LET ABRA 9001
8 LET CADABRA 3720
9 RETURN
10 PRINT ABRA
11 END
12 .
```

Each line contains exactly one statement (there are no blank lines).  A line number is assigned to each line, where the first line is numbered 1, the second line is numbered 2, etc.  The last line is always a period.  Execution of the program always starts at line 1.  A valid program may not exceed 1000 lines.

#### Variables

A variable in a valid program consists of a string of upper-case letters.  Each variable is capable of storing an integer value.  They do not need to be declared: if a variable is referenced before a value is set, the variable should have a value of `0`.

The value of a variable can be changed with a LET statement, and printed with a PRINT statement.  The PRINT statement prints the value of a single variable on its own line.

```
1 LET HAN 42
2 LET SOLO -9
3 PRINT HAN
4 PRINT SOLO
5 .
```

The above program would output:

```
42
-9
```

The PRINTALL statement should output the value of all variables which have been used: each line should have the name of a variable, followed by a space, followed by the value.

```
1 LET HAN 42
2 LET SOLO -9
3 PRINTALL
4 .
```

The above program would output:

```
HAN 42
SOLO -9
```

The following program is a bit strange, but remember that variables are initialized to be 0.

```
1 PRINT A
2 PRINTALL
3 .
```

Therefore it should output this:

```
0
A 0
```

#### Execution

A program is executed one line at a time, starting at line 1, and proceeding sequentially.  The program terminates when an END statement is reached, or the last line of the program is reached (which consists of a single period).

You can cause the program to execute out of sequence via a GOTO statement, which indicates which line to jump to.

```
1 LET YODA 1
2 GOTO 4
3 LET YODA 2
4 PRINT YODA
5 .
```

The above program would output 1, since line 3 is skipped over via the GOTO statement.  A GOTO statement can jump either forward or backward.  If a GOTO statement tries to jump to a line that is not within the boundaries of the program (non-positive integers, or integers larger than the number of lines in the program), the interpreter should terminate with the error message "Illegal jump instruction".

#### Mathematical operations

You can perform addition, subtraction, multiplication, and division.

```
1 LET LUKE 4
2 ADD LUKE 3
3 PRINT LUKE
4 LET LEIA 5
5 SUB LEIA 3
6 PRINT LEIA
7 LET REY 6
8 MULT REY LUKE
9 PRINT REY
10 LET FINN 7
11 DIV FINN 2
12 PRINT FINN
13 .
```

The above example will output:

```
7
2
42
3
```

Note that integer division is performed, so we round down.  If a statement tries to divide by zero, the interpreter should immediately terminate with the error message "Divide by zero exception".  Note that you could have the statement `DIV PALPATINE 0` in your program as long as that line never gets executed.

#### IF Statements

An IF statement acts as a conditional GOTO statement.  It performs a comparison, and jumps to the specified line number if the comparison is true.

```
1 LET CHEWBACCA 3
2 LET VADER 6
3 IF CHEWBACCA < 4 THEN 5
4 PRINT CHEWBACCA
5 PRINT VADER
6 .
```

This will print out only 6, since line 4 is skipped over.  A comparison can use any of the following operators: `<`, `<=`, `>`, `>=`, `=` (equal to), or `<>` (not equal to).

An IF will always be followed by exactly five strings.  The first is the name of the variable, the second is the operator, the third is an integer, the fourth is the word THEN, and the fifth is the line number.

As with GOTO statements, your program should terminate with the error message "Illegal jump instruction" if it tries to jump outside the boundaries of the program.

#### Subroutines

There are no functions, but a simpler mechanism called a subroutine, which is called with a GOSUB statement.  A GOSUB is just like a GOTO, except that it allows you to use the RETURN statement to return to where you jumped from.

```
1 LET ANAKIN 1
2 GOSUB 6
3 PRINT ANAKIN
4 PRINT PADME
5 END
6 LET ANAKIN 2
7 LET PADME 3
8 RETURN
9 .
```

In the above program, ANAKIN will get set to 1, then the program will jump to line 6, overwriting ANAKIN with 2, setting PADME to 3, and then returning to the point it jumped from.  It will then output ANAKIN, then PADME, then terminate.

```
2
3
```

A RETURN statement returns from the *most recent* GOSUB statement.  As an example:

```
1 LET KYLO 1
2 GOSUB 7
3 PRINT KYLO
4 END
5 LET KYLO 3
6 RETURN
7 PRINT KYLO
8 LET KYLO 2
9 GOSUB 5
10 PRINT KYLO
11 RETURN
12 .
```

The above program will set KYLO to 1, jump to line 7, print KYLO, overwrite KYLO with 2, jump to line 5, overwrite KYLO with 3, return from the most recent GOSUB statement by jumping back to line 10, printing KYLO, then returning from the first GOSUB statement by jumping to line 3, printing KYLO, and terminating.

```
1
3
3
```

#### Whitespace

There will be no blank lines in your program, but there may be an arbitrary amount of whitespace placed between tokens.  The following program would be valid:

``` 
 1   LET    Z  5
 2 GOTO   7
3 LET WEDGE   4
 4 PRINT WEDGE
5 PRINT         Z
 6  END
7 PRINT WEDGE
    8     PRINT  Z
    9 GOTO      3
  10 .
```

#### Reference chart

Here is a list of all the statements you will need to support.  Syntax is exactly as written (you won't get lower-case 'let' in a valid program).

```
LET *var* *int*  | Change the value of variable *var* to the integer *int*
--------------------------------------------------------------------------------------------------------
PRINT *var*      | Print the value of variable *var* to output
--------------------------------------------------------------------------------------------------------
PRINTALL         | Prints the value of all used variables to output, one per line.
--------------------------------------------------------------------------------------------------------
ADD *var* *p*    | Adds *p* to the value of the variable *var*, where *p* is an int or variable.
--------------------------------------------------------------------------------------------------------
SUB *var* *p*    | Subtracts *p* from  the value of the variable *var*, where *p* is an int or variable.
--------------------------------------------------------------------------------------------------------
MULT *var* *p*   | Multiplies the value of the variable *var* by the integer or variable *p*
--------------------------------------------------------------------------------------------------------
DIV *var* *p*    | Divides the value of the variable *var* by the integer or variable *p*
--------------------------------------------------------------------------------------------------------
GOTO *linenum*   | Jumps execution of the program to the line numbered *linenum*
--------------------------------------------------------------------------------------------------------
IF *var* *op*    | Compares the value of the variable *var* to the integer *int*
*int* THEN       | via the operator *op* (<, <=, >, >=, =, <>), and jumps
*linenum*        | execution of the program to line *linenum* if true.
--------------------------------------------------------------------------------------------------------
GOSUB *linenum*  | Temporarily jumps to line *linenum*, and jumps back after a RETURN
--------------------------------------------------------------------------------------------------------
RETURN           | Jumps execution of the program back to the most recently executed GOSUB.
--------------------------------------------------------------------------------------------------------
END              | Immediately terminates the program.
--------------------------------------------------------------------------------------------------------
.                | Placed at the end of the program, and behaves like an END statement.
```

### Your Task (90%)

##### Step 1 (Familiarize yourself with the STL Stack)

You will need to use a Stack to handle GOSUB and RETURN statements.  Whenever you reach a GOSUB statement, you should push the line number you want to return to onto your stack.  When you reach a RETURN statement, you should pop the line number from your stack and jump to that line.  If you hit a RETURN statement and nothing is on your stack, the program should terminate as if it hit an END statement.

If you really want to, you can write your own Stack, but it is easier to use the Stack provided by the STL.

##### Step 2 (Add a Map to the Program State)

You will need to keep track of what are the values of each variable at all points in time.  You will need to use the STL Map for this purpose.  You will want to specifically use a `map<string, int>` so that you can pass in a variable name and quickly get out its value.  

To implement the PRINTALL statement, we require you to use the map iterator so as to produce consistent output for our tests.  Note that this will display your variables in alphabetical order rather than the order they are added to the map.

##### Step 3 (Implement the LET statement)

You will probably want to start by thinking about how to implement the `LetStatement::execute` function.  You will need to use your `ProgramState` map to accomplish this, and you will likely want to add some functions to your `ProgramState` class.

Next you will want to review how the LET statement is parsed in the `parseLine` function.  You will need to implement this functionality for the other types of statements.

##### Step 4 (Implement the interpretProgram function)

The `interpretProgram` function should execute each line in the program in the correct order of execution.  You will want to place this inside a loop which breaks when the program is supposed to terminate.

##### Step 5 (Implement the END statement)

Follow the template above to implement the next statement.

##### Step 6 (Test your code)

Make some small programs using only LET statements and END statements to test the code you have written so far.

##### Step 7 (Implement the rest of the Interpreter)

Its your choice where to go from here, but we strongly recommend that you implement one statement-type at a time and thoroughly test it before moving on to the next statement.

### Chocolate Problem (2 Chocolate Bars)

A more limited "Programming Language" than C++, Java, etc., can be obtained using just a single Stack for all data storage. This "computer" has a finite set of "states" (numbered from 0 to S). It starts in state 0, and at any given time, it's in one of those states. It reads a string one character at a time. In addition, it is allowed to push characters on the stack, pop characters off the stack, and read the top element of the stack. In each step, based on the state, the current character, and the character on top of the stack, it decides (1) whether to pop a character off the stack or not, (2) whether to push a character onto the stack or not (and if so, which one), and (3) which new state to enter. Two of the states (let's say S-1 and S) are special, in that when you reach S-1, you output "Yes", and when you reach S, you output "No". (Otherwise, nothing is ever output.)

Here would be an example program:

```
(0, 'a', 'b') -> (-, 'c', 2)
(1, 'b', 'b') -> (+, 'a', 1)
(1, 'b', -) -> (-, 'b', 3) 
```

The first line says that if the computer is in state 0, reads an 'a' from input, and sees a 'b' on top of the stack, then it should not pop from the stack, push a 'c' onto the stack, and enter state 2.
The second line says that if the computer is in state 1, reads a 'b' from input and also sees a 'b' on top of the stack, it should pop from the stack, then push an 'a' onto the stack, and reenter state 1.
The final line says that if the computer is in state 1, reads a 'b' from input, and the stack is empty, then it should not pop from the stack (good idea!), push a 'b' on the stack, and enter state 3.
This type of computer is not as powerful as, say, a C++ compiler. But it can do some interesting things.

1. Write a simulator for this type of program. Feel free to alter the format from the one given above, so long as what you design is readable and your program can parse it. You should output what happens to your program on a given input string when the computer starts in state 0.
2. As a warmup, write a program in this language that will output "Yes" exactly when the string is correctly parenthesized (see early recursive class definitions). So the only legal characters will be '(', '[', ')', ']', and you need to check that all parentheses match.
3. Write a program in this language that will output "Yes" exactly when the input string is a correct arithmetic expression. The legal symbols are variable names made up only of the letters 'a'-'z' (let's say only lowercase), digits '0'-'9' forming integer numbers, and the symbols '+', '-', '*', '/', '(', and ')'. No other symbols will occur. 

As some examples, your program should output "Yes" for the following:

```
(hello+world+531)*(the-answer-is+42)
(a*(b+(c*(d+(e*f)))))
a/b/c/d/e
```

and "No" for

```
(hello2+world1)
)a+b(
(a+(b+c)
```

### Finishing Up

### Completion Checklist

+ Directory name for this homework (case sensitive): `hw2`
  - This directory should be in your `hw-username` repository
  - This directory needs its own `README.md` file briefly describing your work
  - `Interpreter.cpp`, `LetStatement.cpp`, `LetStatement.h`, `PrintStatement.cpp`, `PrintStatement.h`, `ProgramState.h`, `Statement.h`
  - Any files you created
  - Your `Makefile`

The submission link will be posted on Piazza a few days before the due date.
