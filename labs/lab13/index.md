---
layout: asides
toc: true
tasks: true
title: Probability & Number Theory
---

---

**Due at the end of your registered lab section.** Show your answers to a CP or TA to get checked off.

---

# Number Theory
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

### Fermat's Little Theorem and Prime Testing

Here is a practical use of number theory, which involves a theorem called Fermat's little theorem (not to be confused with the other well-known but much complicated Fermat's last theorem).

Fermat's little theorem states that given a prime number $p$, and another number $a$ which is not a multiply of $p$, we have:

$$a^{p-1} \equiv 1 \pmod{p}$$

The immediate consequence of the above is that if we are given a number $n$ and we can find some $a$ such that $a^{n-1} \not \equiv 1 \pmod{n}$, then we know for sure that $n$ is NOT a prime.

If we try a lot of values of $a$, and all those values satisfy $a^{n-1} \equiv 1 \pmod{n}$, we could have a high confidence that $n$ is indeed prime. This method is called "Fermat primality test".

Note that "high confidence" $\neq$ "100% sure". The Fermat primality test could yield false positives. However, it is sufficient for the purpose of our lab. If you are interested, there are more robust primality tests out there, such as the [Miller-Rabin test](https://en.wikipedia.org/wiki/Miller%E2%80%93Rabin_primality_test).

You might be wondering why this is useful. Recall from lecture that the RSA algorithm requires the generation of two large prime numbers (they can be as large as 4096 bits). You actually did this in lab 0 when you [configured your SSH key](https://bytes.usc.edu/cs104/labs/lab0/#configuring-an-ssh-key).

How are those prime numbers generated though? A [popular way](https://crypto.stackexchange.com/q/1970/85400) to do this is extremely straightforward:

 1. Pick a random 4096 bit odd number.
 2. Test if it is prime. If yes, return it.
 3. Otherwise, go back to step 1.

Here if we use a naive method to test primes (try dividing it by every number from 1 up until its square root), it would take a REALLY REALLY LONG time. Instead, we could use tests like the Fermat Test to get a accurate-enough result very quickly.

For the last lab exercise, you will implement a simple version of the Fermat test!

# Excercises

1. In Charlie and the Chocolate Factory, Willy Wonka invites 5 lucky children to tour his factory. He randomly distributes 5 golden tickets in a batch of 1000 chocolate bars. You purchase 5 chocolate bars, hoping that at least one of them will have a golden ticket.
  * What is the probability of getting at least 1 golden ticket?
  * What is the probability of getting 5 golden tickets?

2. Scrooge is getting ready for the 104 Duck Fashion Show. Scrooge has 3 hats (yellow, black, green), 9 shirts (3 of which are yellow, and 6 of which are green), and 7 bowties (all of which are blue). Scrooge selects each of his outfit uniformly at random and independently. What is the probability that his hat and shirt will be different colors?

3. Earlier in March, meerkats Howell and Midra in the Taronga Western Plains Zoo gave birth to 5 meerkat pups. You are told that at least 4 pups are female. Given this information, what is the probability that all 5 are female? (Hint: it is not $1/2$)

4. Two cookies are pulled out at random and eaten from a jar containing 7 chocolate chip cookies and 6 snickerdoodles. Let X be a random variable denoting the number of snickerdoodles pulled out.
* What is the probability distribution of X?
* What is the expected value of X?

5. Fermat test implementation.

For this exercise, you are going to implement a simple version of the Fermat test. The skeleton code lives in the resources repo under lab 7.

There are two functions for you to implement, both of which are in `fermat.cpp`:

   * `uint32_t mod_exp(uint32_t base, uint32_t exponent, uint32_t mod)`: Calulate the value of $(base^{exponent}$ % $mod)$. You should use the [squaring technique mentioned here](https://ee.usc.edu/~redekopp/cs104/slides/L19_NumberTheory.pdf) (Slide 19).

   * `bool fermat_test(uint32_t n, const std::vector<uint32_t>& tests)`: Perform Fermat primality test (mentioned above) on $n$. Returns `true` if it passes the test, `false` otherwise (i.e. `false` if you know for sure that $n$ is not prime). The values of $a$ you should use are inside the vector `tests`.

**Some important hints:**

   * In `mod_exp`, you don't have to convert `exponent` to binary (in lecture you receive a `std::vector<bool>` as input). Instead, the least significant bit can be calculated as `exponent % 2`. The next bit is `(exponent / 2) % 2`, and the next is `(exponent / 4) % 2`, etc.

   * You want to use `std::uint64_t` to store intermediate results in `mod_exp`. This is because squaring a 32-bit integer can give you a result as large as 64-bits.

   * You should be using `mod_exp` in your `fermat_test` function.

After you finish your implementation, type `make` in your terminal to run the tests.


### Additional Probability Question (not necessary for checkoff)
1. You roll a fair die 6 times. What is the probability that no number appears twice?

