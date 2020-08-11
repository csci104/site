---
layout: asides
toc: true
tasks: true
title: Homework 1
---

# Homework 1


- Assigned: August 17, 2020 PST
- Due: September 04, 2020 at 11:59 PST
- Directory name in your github repository for this homework (case sensitive): `hw1`
   - Skeleton code for this assignment is available in [`resources/hw1/`]({{ site.data.urls.github }}/resources/).
   - Once you have cloned your `hw-username` repo, copy the `hw1/` directory into it from `resources`.


## Objective

In this assignment we will review recursion and memory management by writing a simple character storage manager ourselves.
In doing so, we will improve our practice of pointers and develop greater appreciation for what the C++ language and the operating system provide for us in terms of memory management.
We will also practicing using dynamic memory allocation by using dynamically allocated arrays.

## General Advice

### Repository Reminders

1. Never clone one repository inside another.
   If you have a work folder `cs104` and clone your personal repo `hw-username` under it (i.e., `cs104/hw-username`), whenever you want to clone some other repository (such as `resources`), you'll need to do it back up in the `cs104` folder or another location, **not** in the `hw-username` folder.
2. Your repository may not be ready immediately but be sure to create your GitHub account and fill out the GitHub information form linked to at the end of [lab 1]({{ site.baseurl }}/labs/lab1/).

### Skeleton Code

On many occasions we will want to distribute skeleton code, tests, and other pertinent files.
To do this, we have made a separate repository, [`resources`]({{ site.data.urls.github }}/resources/), under the CSCI 104 Github organization.
You should clone this repository to your laptop and `git pull` regularly to check for updates;
even we sometimes make mistakes, and when we do, we will fix them as quickly as possible, but you'll only get the fixes when you pull.

```shell
git clone {{ site.data.urls.github_ssh }}/resources.git
```

Again, be sure you don't clone this repo into your `hw-username` repo, but at some higher-up point like in a `cs104` folder on your machine.

### Using Valgrind

Carefully review the lecture topics related to memory management and allocation, classes, operator overloading, and copy constructors/assignment operators.
On later assignments **you will lose points if you have memory leaks**, so be sure to run `valgrind` once you think your code is working.
Remember that using C++ smart pointers as we discussed in lecture can help you with memory management and preventing memory leaks.

For example, if you were to compile `program` that takes two arguments:

```
$ ./program input.txt output.txt
```

The corresponding Valgrind command would be:

```
$ valgrind --tool=memcheck --leak-check=yes ./program input.txt output.txt
```

For more information on Valgrind, take a look at the [Valgrind wiki page]({{ site.baseurl }}/wiki/valgrind).

### Command line Arguments

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

### Exceptions

Errors happen in programming.
We receive unexpected or illegal inputs or arguments or we reach a state that we cannot handle. 
Rather than using return values to indicate errors, an elegant mechanism provided by C++ to handle errors are **exceptions**.
We will teach you more about exceptions in a few weeks.
However, in the code we provide for this assignment we are using exceptions to indicate when errors occur.

- In this homework, you do not need to catch any exceptions.
- In addition, we have provided the code that throws exceptions when needed.
- You should simply understand what is happening when we do throw exceptions, i.e. an error case has occurred.


## 1. Paren Balance (33.3%)

In this problem you will implement `are_paren_balanced`, which, given an expression, will return `true` if and only if it is properly parenthesized.
An expression is properly parenthesized if a left parentheses such as `(` and  `[` have a matching right parentheses.
Symbols such as `+`, `-`, `*`, `/`, and numbers may be ignored.

- Expression strings will only contain parentheses, `+`, `-`, `*`, `/`, spaces, or numbers.
- Your implementation must recursive.
- Your solution may use helper functions. 

Consider the following examples of inputs that should return true and false.
Note that the expression don't have to be valid mathematically:

```
// are_paren_balanced returns true
(7 + 8)  
[7 * (6 + 8)]  
7+8  
(7+/8/1+*4) ** (5+-6) * (--1-5)

// are_paren_balanced returns false
[7+8  
[7+8) 
([7*5]+(6+8)(15))+5+6)
```

### Design

Remember that **a helper function can be used to implement a recursive function** by passing extra parameters to the recursive calls that help solve the problem.
If you choose to use a helper function, here are some things to consider:

- What parameters may be helpful to pass?
- How might you keep track of where the recursion is evaluating in the expression string?
- How might you keep track of what parentheses must be matched?
- Should the parameters be **passed by C++ reference** so that the variable is shared across calls or will **passing by value** suffice (do not use pointers, they are not necessary)?

### Specifications

Your implementation should be completed in `main.cpp`, which we have provided for you in the `hw1/paren_balanced/` directory in the [`resources`]({{ site.data.urls.github }}/resources/) repository.
Please copy the `hw1/` directory into your `hw-username` repository and only make changes where indicated.
**You may not use STL containers classes nor include any additional libraries**.
Here are some tips on how to compile and run your program to test it from inside the `hw1/paren_balanced` directory in your homework repository:

```shell
# Use g++ to compile, use -Wall to get all warnings
g++ -Wall main.cpp -o paren

# Use quotes when passing arguments to your program that contain spaces or special characters
./paren "[7 * (6 + 8)]"
./paren "[7+8"
```


## 2. Rational Numbers (66.7%)

To practice implementing classes and applying operator overloading, implement a `Rational` number class.
Rational numbers are ones that can be represented as a fraction where there is an integer numerator, `n`, and an integer denominator, `d`: `n/d`.

Operations that apply to rational numbers include the basic arithmetic operators, comparison operators, and some assignment operators.
You will be asked to **implement a subset of these operators**.  

In addition to typical C++ operators, we will support integer exponentiation using the `^` operator.
In many programming languages this is the bitwise-XOR operation, but it will be repurposed for our `Rational` class.
As an example: `(2/7)^2 == 4/49`.
Note that the integer exponent can be negative and should work appropriately.
As an example, `(2/7)^-2 == 49/4`.

To determine what operations are required to be implemented:

1. Find `rational.h` in the `hw1/rational/` directory of your homework repository that you copied with the rest of `hw1/` from resources.
2. Implement all prototyped functions in the class declaration.  
2. **Add all appropriate functions to support the code written in `test-rational.cpp`**.
   You can check that you've done so by making sure that `test-rational.cpp` will compile, run, and produce the expected output given in `test-rational.exp`.  

You may wish to test your code for correctenss in cases not present in `test-rational.cpp`, but we will not require any additional operators or methods besides those used in `test-rational.cpp`.
To reiterate, **no other operations must be supported beyond those exercised by `test-rational.cpp`**.

### Specifications

 - The default constructor should produce a Rational number of `0/1`.
 - A Rational number can be constructed from any combination of positive and negative numerator and denominator, but should follow traditional mathematical rules.
   Consider how you want to deal with the sign.  When outputting a negative fraction, the negative sign, `-`, should appear before the fraction (e.g. `-1/2`).
 - When extracting a Rational number via `operator>>`, you may expect the format ` n / d ` with any amount of whitespace (including none) separating the three components: numerator, `/`, and denominator (e.g. `-1/ 2`, `1 / 2`, `1 /-2`).
   However, we will never input a rational with just the whole number (e.g. we will enter `2/1` and not just `2`).
   For a negative numerator or denominator, you do NOT have to handle whitespace between the negative sign and the integer value, you may assume the integer will immediately follow the negative sign.
   If, as you extract the components of a `Rational`, the stream fails or you don't find the appropriate format, you should set the referenced `Rational` to the **value of a default constructed Rational (i.e. `0/1`)**.
 - Any time a resulting Rational number results in 0 (i.e. numerator = 0), you must store the denominator as `1`.
   We have provided a normalization helper function: `void Rational::normalize0();` to perform that check and update and you may call it as needed.
 - Remember that any rational number may be reduced to a canonical form such that the numerator and denominator do not share any factors except `1`.
   You must implement a private member function, *reduce*, in order to keep your rational number in a canonical form.
   To do so, you must find the greatest common divisor (gcd) of the numerator and denominator.
   **You may use the `<numeric>` library function `std::gcd` to help you**.
   Note that if at least one of the arguments to this function is negative the returned value is negative and your code should handle this case.
 - You may use functions from `<cmath>`, `<cstdlib>`, and `<numeric>` as necessary.


### Testing

We recommend you use `diff` to ensure the output of `test-rational` matches the contents of `test-rational.exp`.
You can do so by using the following commands:

```
# Run the makefile we provide to you
make

# Run the test-rational binary and write the result to an output file 
./test-rational > test-rational.out

# Compare the expected and output files
diff test-rational.out test-rational.exp
```

Running the final command will result in a line-by-line comparison of the results your program output and what we expect.
However, there are other cases that we will test for grading beyond those given in `test-rational.exp`.
In 104 it is your responsibility to test your code thoroughly, thinking through potential corner cases and stress cases.
Please spend some time thinking about what could break your code, writing more test cases and ensuring they work as expected.


