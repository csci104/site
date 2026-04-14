---
layout: default
title: Midterm 3 Info
nav: Resources
---

## Number Theory

---

### Part (a) — GCD

Find $\gcd(396, 168)$ using Euclid's algorithm.

**Euclid's algorithm:**

$$396 = 2 \times 168 + 60$$

$$168 = 2 \times 60 + 48$$

$$60 = 1 \times 48 + 12$$

$$48 = 4 \times 12 + 0$$

$$\boxed{\gcd(396, 168) = 12}$$

---

### Part (b) — Extended Euclidean

Find integers $x$ and $y$ such that $396x + 168y = \gcd(396, 168) = 12$.

**Back-substitution** (let $r_0 = 396$, $r_1 = 168$):

$$12 = 60 - 1 \times 48$$

$$48 = 168 - 2 \times 60 \implies 12 = 60 - 1\times(168 - 2\times 60) = 3\times 60 - 168$$

$$60 = 396 - 2\times 168 \implies 12 = 3\times(396 - 2\times 168) - 168 = 3\times 396 - 7\times 168$$

$$\boxed{x = 3,\quad y = -7}$$

**Verification:** $3 \times 396 - 7 \times 168 = 1188 - 1176 = 12$ ✓
