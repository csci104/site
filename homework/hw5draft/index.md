---
layout: asides
toc: true
tasks: true
title: Homework 5 Written
---

# HW5: Written Assignment

+ Due: Friday, November 12th, 11:59pm PST
+ You will submit this homework through Blackboard, by uploading your answers.  Please submit with a common file extension (such as .jpg, or .pdf)
+ For all your answers, you will primarily be graded on **your work**.
+ To access the programming portion of this assignment, click [here](./programming/)

### Problem 1 (Number Theory, 25%)

Answer the following questions:

1. The following message has been encrypted with the Caesar cipher: what was the original message?  `ILJKW RQ, WURMDQV!`
2. You receive the following bit strings over a communication link, where the last bit is a partiy check.  In which string(s) must there be an error?
   - 00000111111
   - 10101010101
   - 11111100000
   - 10111101111
3. Which positive integers less than `30` are relatively prime to `30`?
4. What is `gcd(21n+4, 14n+3)`, where `n > 0`?
5. How many 0's are there at the end of `100!`?

### Problem 2 (Amortized Analysis, 15%)

It is possible to implement a queue using two stacks `stack1` and `stack2`, by implementing the functions in the following manner:

+ `enqueue (x)`: push `x` on `stack1`.
+ `dequeue ()`: if `stack2` is not empty, then pop from it.  Otherwise, pop the entire contents of `stack1`, pushing each one onto `stack2`.  Now pop from `stack2`.

As always, explain your answers thoroughly.

#### Part (a)

Starting with an empty queue, indicate the contents of `stack1` and `stack2` after **EACH** of the following operations have occurred.  Clearly indicate the top and bottom of each stack:

+ enqueue 1
+ enqueue 2
+ dequeue
+ enqueue 3
+ enqueue 4
+ dequeue
+ enqueue 5
+ enqueue 6 

#### Part (b)

What is the worst-case runtime of `enqueue(x)` and `dequeue()`, assuming `stack.push()` and `stack.pop()` run in O(1)?

#### Part (c)

What is the amortized runtime per function call (i.e. the worst-possible average runtime if you make n calls to some sequence of enqueue and dequeue)?

#### Part (d)

Suppose the underlying `stack` structure is poorly implemented, with `push(x)` taking &Theta;(1) time, and `pop()` taking &Theta;(`n`) time, where `n` is the number of elements in the stack.  Now what is the worst-case runtime of `enqueue(x)` and `dequeue()`?  What is the amortized runtime per function call?

### Problem 3 (More Amortized Analysis, 10%)
In Big-&Theta; notation, analyze the running time of the following code/pseudo-code in terms of n (the input size).  Show your work and derivations supporting your final answer.

```c++
int n;  // Set to some large value initially
int* A; // Points to an array of size n
int x = n;

// Assume x and n are never changed outside this function
int f1(int* A)
{
  if( x == 0) {
    x = n;
    return 1;
  }
  else if( (x % (int)sqrt(n)) == 0){
    for(int i=1; i <= n; i++){
      for(int j = 0; j < i; j++){
        // do something O(1) with A[]
        // x and n are unaffected
      }
    }
  }
  else {
    // do something O(1)
    // x and n are unaffected
  }
  x--;
  return 0;
}
```

## Programming Assignment

To access the programming portion of this assignment, click [here](./programming/)
