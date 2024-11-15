---
layout: asides
toc: true
tasks: true
title: Homework 4 Written
---

# HW4: Written Assignment

+ Due: Friday, November 22nd, 11:59pm PST
+ You will submit this homework through Gradescope, by uploading your answers.  Please submit with a common file extension (such as .jpg, or .pdf)
+ For all your answers, you will primarily be graded on **your work**.  Only putting a final numerical answer will yield very little credit.  Instead, give the formula you used, and explain your answers.  You do **not** need to provide a final numerical answer for any of these problems, but it might help your graders out a bit if you do. 
+ To access the programming portion of this assignment, click [here](./programming/)

### Problem 1 (Number Theory, 15%)

Answer the following questions and show your work.

1. Suppose that for positive integers, a and b, `gcd(a,b) = d`. What is `gcd(a/d, b/d)`? Justify your answer.
2. What is `gcd(x!+1,(x+1)!+1)`, where `x > 0`?
3. How many integers `n : 1 <= n <= 100`, are there such that `(n+1)(n+3)` is divisible by 7?
4. What is `(1! + 2! + 3! + 4! + ... + 1000!) % 10`?
5. Our prisons are too crowded, so we need to release some inmates.  For a high-security prison, there are 1000 inmates and 1000 guards.  Initially, all doors are locked.  Beginning with the 1st guard, the `i`th guard switches the locked/unlocked state of every `i`th door. For example, the first guard would go through and unlock every door. Then the 2nd guard switches the (lock/unlock) state for every even door (effectively locking every even door while leaving every odd door unlocked).  Then the 3rd guard switches the state for every 3rd door, unlocking the door if it is locked, or locking the door if it is unlocked. After the 1000th guard, how many doors are left unlocked?

### Problem 2 (Hashing Applications, 8%)

In the Pattern Matching problem, you have a long string `S = s1 s2 ... sn`, and a short string `T = t1 t2 ... tk` (`k < n`).  You are wondering if T shows up anywhere in S; that is, if there is an i such that `si s(i+1) ... s(i+k-1) = T`.  

A naive algorithm for this would be to check `s1 s2 ... sk`, and if that fails at any point, to check `s2 s3 ... s(k+1)`, and if that fails, keep incrementing i until you find T, or you determine that it is not in S.  This algorithm would take O(nk) time.

Instead, we will use a very simple hash function `h(a1 a2 ... ak)` which takes an input string of length k, and adds the integer values of each character together: `a1 + a2 + ... + ak`.  We will calculate h(T) and compare that to `h(s1 s2 ... sk)`, `h(s2 s3 ... s(k+1))`, etc.

1. Explain how, given the value of `h(s1 s2 ... sk)`, you can update it in constant time to obtain `h(s2 s3 ... s(k+1))`.
2. If `h(si s(i+1) ... s(i+k-1)) = h(T)`, why have we **not** necessarily found a match?  How would we verify whether this is actually a match?
3. We will assume the probability of a false positive (that is, finding `h(si s(i+1) ... s(i+k-1)) = h(T)` when it isn't a match) is smaller than `1/k`.  Explain how the algorithm sketched out in your previous answers obtains an average runtime of O(n) 

### Problem 3 (Stacks and Queues, 10%)

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

What is the amortized runtime per function call (i.e. the worst-possible average runtime if you make n calls to some sequence of enqueue and dequeue)?  Note that dequeue can only be analyzed *jointly* with enqueue.

#### Part (d)

Suppose the underlying `stack` structure is poorly implemented, with `push(x)` taking &Theta;(1) time, and `pop()` taking &Theta;(`n`) time, where `n` is the number of elements in the stack.  Now what is the worst-case runtime of `enqueue(x)` and `dequeue()`?  What is the amortized runtime per function call?

## Programming Assignment

To access the programming portion of this assignment, click [here](./programming/)
