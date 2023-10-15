---
layout: asides
toc: true
tasks: true
title: Number Theory
---

---

**Due at the end of your registered lab section.** 

---

## Number Theory

### Quick Review of Basic Concepts

(1)

$$m \mid n$$

The above reads as "$m$ divides $n$", and means that there exists integer $k$ such that $n = km$.

(2)

$$a \equiv b \pmod{m}$$

The above reads as "$a$ is congruent to $b$ modulo $m$", and means that $m \mid a - b$.

If $a \equiv b \pmod{m}$ and $c \equiv d \pmod{m}$, then:

$$
\begin{gather*}
   ac \equiv bd &\pmod{m} \\
   a+c \equiv b+d &\pmod{m}
\end{gather*}
$$

(3)

$$\gcd(a, b)$$

The above denotes the "greatest common divisor of $a$ and $b$", which is the greatest positive integer $d$ such that $d \mid a$ and $d \mid b$.

If $gcd(a, b)=1$, then $a$ and $b$ are said to be "co-prime" or "relatively prime" to each other.


### A Helpful Theorem

Here is a helpful theorem to remember:

* If $a \mid bc$ and $\gcd(a, b)=1$, then $a \mid c$.

## Exercise 1

Using the theorem above, prove the following:

* If $p$ is a prime and $p \mid ab$, then $p \mid a$ or $p \mid b$.

---
### Quadratic Probing

Recall that in linear probing, the positions we try to insert an element at are:

$$h, h + 1, h + 2, h + 3, \dots$$

where $h$ is the hash value of the element you want to insert.

In quadratic probing, this becomes:

$$h, h + 1, h + 4, h + 9, \dots, h + i^2, \dots$$

Quadratic probing has the nice property that if the size of the hash table is a prime number $p$, then the first $\frac{p-1}{2} + 1$ probed positions are going to be unique ($h, h + 1, \dots, h + (\frac{p-1}{2})^2$, moduli the size of the hash table).

We could prove this using contradiction:

Given any two different probes $h + i^2$ and $h + j^2$ where $0 \leq i \le j \leq \frac{p-1}{2}$, we assume that they fall at the same location: $h + i^2 \equiv h + j^2 \pmod p$. Then we would have:

$$
\begin{gather*}
h + i^2 \equiv h + j^2 &\pmod p \\
i^2 \equiv j^2 &\pmod p \\
i^2 - j^2 \equiv 0 &\pmod p\\
(i-j)(i+j) \equiv 0 &\pmod p
\end{gather*}
$$

By the theorem we proved earlier, this means either $p \mid i-j$ or $p \mid i+j$.

However, this is impossible since $0 \leq i \le j \leq \frac{p-1}{2}$. Therefore, $h + i^2 \not \equiv h + j^2 \pmod p$ (i.e. the probes fall at different locations)

### Double Hashing

Another common probing scheme is called double hashing. Similar to quadratic probing, it requires the size of the hash table to be a prime number $p$. Furthermore, in addition to the primary hash function, it needs a secondary hash function that returns a number $k$ in the range $[1, p-1]$.

The positions we probe would then be:

$$h, h+k, h+2k, h+3k, \dots$$

The nice property of double hashing is that the first $p$ locations we probe will all be unique. In other words, the first $p$ probes will cover the whole hash table!

As an example, if $h=1$, $p=5$ and $k=3$, then we have:

   * 1st probe: `(1 + 0 * 3) % 5 == 1`
   * 2nd probe: `(1 + 1 * 3) % 5 == 4`
   * 3rd probe: `(1 + 2 * 3) % 5 == 2`
   * 4th probe: `(1 + 3 * 3) % 5 == 0`
   * 5th probe: `(1 + 4 * 3) % 5 == 3`

As you can see, all the probed locations are unique.

## Exercise 2

Prove with number theory that the above property of double hashing holds. (Hint: check out the proof for quadratic probing)

---
### Fermat's Little Theorem and Prime Testing

Here is another practical use of number theory, which involves a theorem called Fermat's little theorem (not to be confused with the other well-known but much complicated Fermat's last theorem).

Fermat's little theorem states that given a prime number $p$, and another number $a$ which is not a multiply of $p$, we have:

$$a^{p-1} \equiv 1 \pmod{p}$$

The immediate consequence of the above is that if we are given a number $n$ and we can find some $a$ such that $a^{n-1} \not \equiv 1 \pmod{n}$, then we know for sure that $n$ is NOT a prime.

If we try a lot of values of $a$, and all those values satisfy $a^{n-1} \equiv 1 \pmod{n}$, we could have a high confidence that $n$ is indeed prime. This method is called "Fermat primality test".

Note that "high confidence" $\neq$ "100% sure". Just like Bloom Filter, Fermat primality test could yield false positives. However, it is sufficient for the purpose of our lab. If you are interested, there are more robust primality tests out there, such as the [Miller-Rabin test](https://en.wikipedia.org/wiki/Miller%E2%80%93Rabin_primality_test).

You might be wondering why this is useful. Recall from lecture that the RSA algorithm requires the generation of two large prime numbers (they can be as large as 4096 bits). You actually did this in lab 0 when you [configured your SSH key](https://bytes.usc.edu/cs104/labs/lab0/#configuring-an-ssh-key).

How are those prime numbers generated though? A [popular way](https://crypto.stackexchange.com/q/1970/85400) to do this is extremely straightforward:

 1. Pick a random 4096 bit odd number.
 2. Test if it is prime. If yes, return it.
 3. Otherwise, go back to step 1.

Here if we use a naive method to test primes (try dividing it by every number from 1 up until its square root), it would take a REALLY REALLY LONG time. Instead, we could use tests like the Fermat Test to get a accurate-enough result very quickly.

## Exercise 3 (Coding)

For this exercise, you are going to implement a simple version of the Fermat test.

There are two functions for you to implement, both of which are in `fermat.cpp`:

   * `uint32_t mod_exp(uint32_t base, uint32_t exponent, uint32_t mod)`: Calulate the value of $(base^{exponent}$ % $mod)$. You should use the [squaring technique mentioned in lecture](https://ee.usc.edu/~redekopp/cs104/slides/L19_NumberTheory.pdf) (Slide 19).

   * `bool fermat_test(uint32_t n, const std::vector<uint32_t>& tests)`: Perform Fermat primality test (mentioned above) on $n$. Returns `true` if it passes the test, `false` otherwise (i.e. `false` if you know for sure that $n$ is not prime). The values of $a$ you should use are inside the vector `tests`.

**Some important hints:**

   * In `mod_exp`, you don't have to convert `exponent` to binary (in lecture you receive a `std::vector<bool>` as input). Instead, the least significant bit can be calculated as `exponent % 2`. The next bit is `(exponent / 2) % 2`, and the next is `(exponent / 4) % 2`, etc.

   * You want to use `std::uint64_t` to store intermediate results in `mod_exp`. This is because squaring a 32-bit integer can give you a result as large as 64-bits.

   * You should be using `mod_exp` in your `fermat_test` function.

After you finish your implementation, type `make` in your terminal to run the tests.

---
## Checking Off

To get checked off, complete all three exercises in this lab and show your results to a CP/TA.
