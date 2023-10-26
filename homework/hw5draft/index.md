---
layout: asides
toc: true
tasks: true
title: Homework 5 Written
---

# HW5: Written Assignment

+ Due: Monday, November 13th, 11:59pm PST
+ You will submit this homework through Blackboard, by uploading your answers.  Please submit with a common file extension (such as .jpg, or .pdf)
+ For all your answers, you will primarily be graded on **your work**.
+ To access the programming portion of this assignment, click [here](./programming/)

### Problem 1 (Bloom Filters, 15%)

A bloom filter has `h` hash functions, stores `m` bits, and has inserted `i` things so far.  What is the probability of a false positive?  That is, if we lookup something that isn't in the bloom filter, what is the probability we incorrectly say it is?  It is recommended you build your formula via the following steps:

1. For a specific index `k`, what is the probability it was the *first* bit that was set to `1`?
2. How many bits did we attempt to set when inserting all `i` things?
3. For a specific index `k`, what is the probability it is `1` after all `i` things have been inserted?
4. In expectation, how many indices have been set to `1` after all `i` things have been inserted?
5. When performing a lookup of something that isn't in the bloom filter, what is the probability that our *first* hash function maps to an index that is set to `1`?
6. What is the probability of a false positive? 

### Problem 2 (Amortized Analysis, 5%)

Suppose we perform a sequence of `n` operations on a data structure in which the `i`th operation costs `i` if `i` is an exact power of `2`, and `1` otherwise. Analyze both the worst-case, and the amortized worst-case runtime of the operation in question.

### Problem 3 (Stacks and Queues, 20%)

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

What is the amortized runtime per function call (i.e. the worst-possible average runtime if you make n calls to some sequence of enqueue and dequeue)?  Note that dequeue can only be analyzed in *conjunction* with enqueue.

#### Part (d)

Suppose the underlying `stack` structure is poorly implemented, with `push(x)` taking &Theta;(1) time, and `pop()` taking &Theta;(`n`) time, where `n` is the number of elements in the stack.  Now what is the worst-case runtime of `enqueue(x)` and `dequeue()`?  What is the amortized runtime per function call?

### Problem 4 (More Amortized Analysis, 10%)
In Big-&Theta; notation, analyze both the worst-case running time, and the amortized worst-case running time of the following code/pseudo-code in terms of n (the input size).  Show your work and derivations supporting your final answer.

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
