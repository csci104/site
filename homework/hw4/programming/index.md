---
layout: asides
toc: true
tasks: true
title: Homework 4 Programming
---

# HW4: Programming Assignment

+ Due: Friday, October 29th, 11:59pm PST

+ To access the written portion of this assignment, click [here](..)

+ Directory name in your github repository for this homework (case sensitive): `hw4`

  - There is no skeleton code for this assignment.
  - You **MUST** provide a `Makefile` so that we can compile your code (not run it) by simply typing `make` which should, among other compilation commands, produce an executable `rsa`
- Remember to compile and test your code inside Docker (but should do your git commands outside Docker)
  - Provide a `README.md` file to explain how to compile your code, and to document any oddities you want the graders to be aware of.
  

### Implement the RSA encryption/decryption algorithm (50%)

You will create an executable called `rsa` which takes in 2 command-line parameters: `p` and `q` (in either order).  Your program will assume that p and q are large primes (if they are not prime, your algorithm should still run and not crash, but we cannot promise the decryption process will be secure or accurate).  A list of prime numbers (for testing) can be found [here](http://compoasso.free.fr/primelistweb/page/prime/liste_online_en.php), or you can write your own prime-finding algorithm.

When run, your program should immediately prompt the user for a command (via cin) and, after having executed that command, should loop and prompt the user again.  If the user enters an invalid command, you may do anything except crash (including gracefully terminating the program, or asking for another command).  The list of valid commands are as follows:

1. `EXIT`  Gracefully terminate the program.
2. `DECRYPT [input] [output]`  Opens the file at [input], reads the contents of the file, decrypts the message, and overwrites the contents of the file at [output] with the decrypted message.
3. `ENCRYPT [filename] [n] [message]` Creates/overwrites the file at the specified path, writing an encrypted version of [message], which is a string of lowercase letters a-z and spaces (but no tabs or newlines).   [n] is an integer which will be used in the encryption process.

If Alice and Bob wanted to use this program for its intended purpose, Alice would determine two large primes p and q while keeping them private, calculate n = p*q, and share n with Bob.  Bob can now encrypt messages that only Alice can decrypt.  Bob can do the same thing, identifying a different p' and q', calculating n' and sharing it with Alice.  Now Alice can encrypt messages that only Bob can decrypt.

#### Encryption

1. Set e = 65537 (a common choice of e, but there are other specific choices of e that also work)
2. Calculate x = 1+log_100 (n/27), rounding down.  If n is smaller than 27, your program should output some type of error message and gracefully terminate.
3. Convert the first x characters in [message] to an integer M: space is 00, a is 01, b is 02, and z is 26.    If there are less than x characters remaining, pretend there is an appropriate amount of whitespace at the end of the message.  So if x=5, then `trojan` would produce M = 2,018,151,001, and in the next iteration, M would be 1,400,000,000.
4. Calculate C = M^e mod n, and write this number to the output file.  Due to the large value of e, you will need to implement the **Modular Exponentiation Algorithm** to calculate this.  Review the relevant lecture handout for this algorithm.
5. Repeat steps 3 and 4 for the next x characters, until the entire message is encrypted.  Each number in the output file should be separated by a single whitespace.

#### Decryption

1. Calculate the decryption key d at program start (rather than repeating it every time you decrypt something).  The process for how to do this is detailed in the next section.
2. Take the first long C in the file, and calculate M = C^d mod n, again using the **Modular Exponentiation Algorithm**
3. Convert M to x letters and spaces, and write them to the output file in lower-case.
4. Repeat steps 2 and 3 for the next long, until the entire message is decrypted.  The input file should not be altered.

#### Calculating the decryption key

First, compute L = the least common multiple of p-1 and q-1.

1. This is provably equal to (p-1) * (q-1) / gcd(p-1, q-1)
2. You will need to implement the **Euclidean Algorithm** to calculate gcd(p-1, q-1).  You will be using an extended version of this algorithm later on.
3. If L is equal to e (65537) or smaller, output an error message and gracefully terminate.
4. d would be the value that satisfies d * e mod L = 1.  You can find it by running the **extended Euclidean Algorithm** (detailed below) to find gcd(e, L) (which hopefully is 1), as well as the values d and y such that e * d + L * y = gcd(e, L) = 1.  If the Euclidean algorithm finds d to be < 0, you can correct it by adding (p-1) * (q-1) to d.
5. If you find that gcd(e,L) is not 1, you had an unfortunate choice of p and q.  You can output an error message and gracefully terminate, or continue to run your program as normal (your choice), but be aware that we can no longer vouch that the decryption key will work correctly or securely.
6. Return d.

The **extended Euclidean Algorithm** is as follows:

1. Define `s = 0` and `old_s = 1`.  This line is optional, as we don't actually need y.
2. Define `t = 1` and `old_t = 0`
3. Define `r = e` and `old_r = L`.  Note that `old_r = e * old_t + L * old_s`
4. Define `quotient = old_r / r` (round down).
5. Define `temp = r`
6. Update `r = old_r - quotient * r`
7. Update `old_r = temp`.  Steps 4-7 are exactly the standard Euclidean Algorithm.
8. Update `temp = s`
9. Update `s = old_s - quotient * s`
10. Update `old_s = temp`.  Steps 8-10 are optional, since we don't actually need y.
11. Update `temp = t`
12. Update `t = old_t - quotient * t`
13. Update `old_t = temp`.  Note that `old_r = e * old_t + L * old_s`
14. Repeat steps 4-13 until r == 0
15. The gcd is `old_r`, and d is `old_t` (and y is `old_s`, but we don't need that).

The extended Euclidean Algorithm is explained [here](https://www.youtube.com/watch?v=6KmhCKxFWOs).

#### A note on data sizes

We will only run your program on inputs that fit inside a long, for simplicity.  Inside your modular exponentiation algorithm, you will need to deal with values as large as (n-1)^2 (make sure your algorithm does not require you to store values any larger than this).  When you are testing your program, make sure to choose p and q values such that (p*q-1)^2 is no bigger than about 9x10^15, and we will do the same.

### Finishing Up

### Completion Checklist

+ Directory name for this homework (case sensitive): `hw4`
  - This directory should be in your `hw-username` repository
  - This directory needs its own `README.md` file briefly describing your work
  - Any `.cpp` and `.h` files you created.
  - Your `Makefile`
+ The submission link will be posted on Piazza a few days before the due date.

