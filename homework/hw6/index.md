---
layout: asides
toc: true
tasks: true
title: Homework 6 Written
---

# HW6: Written Assignment

+ Due: Friday, April 23rd, 11:59pm PST
+ You will submit this homework through Blackboard, by uploading your answers.  Please submit with a common file extension (such as .jpg, or .pdf)
+ To access the programming portion of this assignment, click [here](./programming/)

### Problem 1 (Number Theory, 20%)

Answer the following questions and show your work.

1. What is `gcd(x!+1,(x+1)!+1)`, where `x > 0`?
3. How many integers `n : 1 <= n <= 100`, are there such that `(n+1)(n+3)` is divisible by 7?
4. What is `(1! + 2! + 3! + 4! + ... + 1000!) % 10`?
5. Our prisons are too crowded, so we need to release some inmates.  For a high-security prison, there are 1000 inmates and 1000 guards.  Initially, all doors are locked.  Beginning with the 1st guard, the `i`th guard switches the locked/unlocked state of every `i`th door. For example, the first guard would go through and unlock every door. Then the 2nd guard switches the (lock/unlock) state for every even door (effectively locking every even door while leaving every odd door unlocked).  Then the 3rd guard switches the state for every 3rd door, unlocking the door if it is locked, or locking the door if it is unlocked. After the 1000th guard, how many doors are left unlocked?

### Problem 2 (Hashing Applications, 15%)

In the Pattern Matching problem, you have a long string `S = s1 s2 ... sn`, and a short string `T = t1 t2 ... tk` (`k < n`).  You are wondering if T shows up anywhere in S; that is, if there is an i such that `si s(i+1) ... s(i+k-1) = T`.  

A naive algorithm for this would be to check `s1 s2 ... sk`, and if that fails at any point, to check `s2 s3 ... s(k+1)`, and if that fails, keep incrementing i until you find T, or you determine that it is not in S.  This algorithm would take O(nk) time.

Instead, we will use a very simple hash function `h(a1 a2 ... ak)` which takes an input string of length k, and adds the integer values of each character together: `a1 + a2 + ... + ak`.  We will calculate h(T) and compare that to `h(s1 s2 ... sk)`, `h(s2 s3 ... s(k+1))`, etc.

1. Explain how, given the value of `h(s1 s2 ... sk)`, you can update it in constant time to obtain `h(s2 s3 ... s(k+1))`.
2. If `h(si s(i+1) ... s(i+k-1)) = h(T)`, why have we **not** necessarily found a match?  How would we verify whether this is actually a match?
3. We will assume the probability of a false positive (that is, finding `h(si s(i+1) ... s(i+k-1)) = h(T)` when it isn't a match) is smaller than `1/k`.  Explain how the algorithm sketched out in your previous answers obtains an average runtime of O(n) 

### Problem 3 (Analysis of Chaining, 15%)

Recall that in chaining, we create a linked list (or array) at each position of the hash table. When multiple items collide at that position, we store them in that list/array. Since to find an item, we now have to perform a linear search through that "bucket", it's important to bound how many items are likely to be stored in any one bucket. 

For the entire first problem, we assume that the load factor is 1, i.e., we are placing m items in m hash buckets. (Obviously, the guarantees will be better if the load factor is lower, but this way, we will avoid having an extra parameter you have to deal with.) Prove the following:

+ The probability that **any** hash bucket contains more than ln(m) items goes to 0 as m goes to infinity. (As a result, for large hash tables, all hash operations are very likely to run in time O(log m).)

As an outline of a proof that you might want to follow (though you don't have to):

+ As we discussed in class, you can/should assume that the hash function maps each item **independently** to a **uniformly random** position between 0 and m-1 (where `m` is the hash table's size).
+ First, focus on just one hash bucket i.
+ If bucket i ends up with at least `ln m` keys, then there must be some set (let's call it S) of exactly `ln m` keys that end up in it.
+ How many different sets S of `ln m` keys are there?
+ For any one set S of exactly `ln m` keys, what is the probability that they all end up in bucket i (and the others end up in bucket i or somewhere else)?
+ To upper bound the probability that **at least one** of these sets ends up in bucket i, you can use the "Union Bound": It says that the probability of the union of events is no more than the sum of probabilities of the individual events. In particular, it implies that the probability that at least one of the sets S ends up in bucket i is at most the sum of their individual probabilities.
+ You will probably end up with a combination somewhere. A useful formula here is that 
  `(n choose k) <= n^k / k!`
+ Now the formula should simplify nicely for a single bucket i.
+ To go from a single bucket to all buckets, you can again use the Union Bound, which says that the probability that **at least one** bucket has more than `ln m` keys is at most the sum of the probabilities for the individual buckets.
+ Finally, you may want to use the property that log x! =  &Theta;(x log x)
+ If all has gone well, you can now take limits as m goes to infinity.  Alternatively, consider whether your numerator or denominator grows more quickly asymptotically.

## Programming Assignment

To access the programming portion of this assignment, click [here](./programming/)
