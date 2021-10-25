---
layout: asides
toc: true
tasks: true
title: Number Theory
---

## Number Theory

### Quick review

(1)

$$m \mid n$$

The above reads as "$m$ divides $n$", and means that there exists integer $k$ such that $n = km$.

(2)

$$a \equiv b \pmod{m}$$

The above reads as "$a$ is congruent to $b$ modulo $m$", and means that $m \mid a - b$.

### Review of modulo arithmetics

If $a \equiv b \pmod{m}$ and $c \equiv d \pmod{m}$, then:

$$
\begin{gather*}
   ac \equiv bd &\pmod{m} \\
   a+c \equiv b+d &\pmod{m}
\end{gather*}
$$

(3)

$$\gcd(a, b)$$

The above denotes the "greatest common divider of $a$ and $b$", which is the greatest positive integer $d$ such that $d \mid a$ and $d \mid b$.

If $gcd(a, b)=1$, then $a$ and $b$ are said to be "co-prime" or "relatively prime" to each other.

$$\text{lcm}(a, b)$$

The above denotes the "least common multiple" of $a$ and $b$, which is the smallest positive integer $m$ such that $a \mid m$ and $b \mid m$. It can be calculated as:

$$\text{lcm}(a, b) = \frac{\vert ab \vert}{\gcd(a, b)}$$

(4)

**The following theorem could be very useful in homework and exams**: If $a \mid bc$ and $\gcd(a, b)=1$, then $a \mid c$.

An important corollary follows from above (which is also extremekly useful): If $p \mid ab$ and $p$ is a prime number, then $p \mid a$ or $p \mid b$.

***Proof.*** If $p \mid a$, then we are done. Otherwise, $\gcd(p, a)=1$ (since $p$ is a prime), therefore $p \mid b$.



### More examples of proofs

(1) Prove that if $kx \equiv ky \pmod m$ and $\gcd(k, m)=1$, then $x \equiv y \pmod{m}$.

***Proof.*** Since $kx \equiv ky \pmod m$, we have $m \mid k(x-y)$, and since $\gcd(k, m)=1$, we have $m \mid x-y$, which means $x \equiv y \pmod{m}$ by definition.

(2) Prove that given a prime $p$ and integers $m, n, k$ such that $1 \leq m, n, k \leq p-1$ and $m \neq n$, we have $mk \not\equiv nk \pmod{p}$.

***Proof.*** We can do a proof by contradiction. Assume that $mk \equiv nk \pmod p$. Since $1 \leq k \leq p-1$ we have $\gcd(k, p-1)=1$, and therefore by (1), we have $m \equiv n \pmod p$. But since $1 \leq m, n \leq p-1$, we have $m = n$, which is a contradiction. Therefore $mk \not\equiv nk \pmod{p}$.

(3) Prove that given a prime $p$ and integer $k$ such that $1 \leq k \leq p-1$, we have:

$$k^{p-1}(p-1)! \equiv (p-1)! \pmod p$$

***Proof.*** In (2) we have established that for any $r_1, r_2$ such that $1 \leq r_1, r_2 \leq p - 1$, we have $mk \not\equiv nk \pmod{p}$. Therefore each of $(p-1)k, (p-2)k, \dots, k$ would be congruent to a different integer between $1$ and $p-1$. But since there are exactly $p-1$ integers between $1$ and $p-1$, we have 

$$
\begin{align*}
k^{p-1}(p-1)! &\equiv (p-1)k \cdot (p-2)k \cdot \ \dots \ \cdot k \\
&\equiv (p-1)(p-2)\dots2\cdot 1 \\
&\equiv (p-1)!  \pmod p
\end{align*}
$$

As an example, if $p=5$ and $k=3$, then we have:

$$
\begin{gather*}
4k \equiv 2 &\pmod 5 \\
3k \equiv 4 &\pmod 5 \\
2k \equiv 1 &\pmod 5 \\
1k \equiv 3 &\pmod 5
\end{gather*}
$$

You would notice that all numbers from $\{1, 2, 3, 4\}$ appear on both sides, so therefore if you multiply the equations together you would get:

$$4k \cdot 3k \cdot 2k \cdot 1k \equiv 2\times 4 \times 1\times 3 \pmod 5$$

### Excercises

(1) Prove that given a prime $p$ and integers $n$ such that $1 \leq n \leq p-1$, we have $n^{p-1} \equiv 1 \pmod{p}$.


(2) Prove that if $n, p$ are integers and $p$ is a prime number, then

$$n^p \equiv n \pmod{p}$$

(The above is known as Fermat's Little Theorem)

(3) Prove that if $n, p$ are integers where $p$ is a prime number, and $n^2 \equiv 1 \pmod{p}$, then $n \equiv 1\pmod{p}$ or $n \equiv -1\pmod{p}$.

(4) Imgaine a new Pac-Man game where there is a $m$-by-$n$ grid, and there is a dot on every cell of the grid. Pac-Man starts at the bottom left cell, and for every step, Pac-Man does the following:

* Eat the dot at his position (if there is any).

* Move one unit to the right, unless he is already on the rightmost column of the grid, in which case he is teleported to the leftmost cell of the row he is currently in.

* Move one unit to the top, unless he is already on the topmost row of the grid, in which case he is teleported to the bottom-most cell of the column he is currently in.

In what condition (in terms of $m$ and $n$) would Pac-Man be able to eat all the dots on the grid?