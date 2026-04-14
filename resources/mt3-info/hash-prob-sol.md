---
layout: default
title: Midterm 3 Info
nav: Resources
---

### Hashing and Probability — Solution

**Problem:** You put `k` keys into a hash table with `m` hash buckets. Assuming the hash function is uniformly random and each key lands independently, what is the probability that all `k` keys end up in *different* buckets (no collisions)?

---

### Derivation

Think about inserting the keys one at a time and track the probability that each new key avoids all previously inserted keys.

| Insertion | Buckets still free | P(no collision for this key) |
|-----------|--------------------|------------------------------|
| Key 1 | m (nothing in table yet) | $$\dfrac{m}{m} = 1$$ |
| Key 2 | m − 1 buckets are safe | $$\dfrac{m-1}{m}$$ |
| Key 3 | m − 2 buckets are safe | $$\dfrac{m-2}{m}$$ |
| ⋮ | ⋮ | ⋮ |
| Key k | m − (k−1) buckets are safe | $$\dfrac{m-(k-1)}{m}$$ |

Since each insertion is **independent**, the joint probability is the product of all these terms:

$$P(\text{no collision}) = \frac{m}{m} \cdot \frac{m-1}{m} \cdot \frac{m-2}{m} \cdots \frac{m-(k-1)}{m}$$

$$= \prod_{i=0}^{k-1} \frac{m - i}{m}$$

$$= \frac{m \cdot (m-1) \cdot (m-2) \cdots (m-k+1)}{m^k}$$

$$= \frac{m!}{(m-k)! \; \cdot \; m^k}$$

This can also be written using the **falling factorial** (permutation) notation:

$$P(\text{no collision}) = \frac{^mP_k}{m^k} = \frac{m^{\underline{k}}}{m^k}$$

---

### Intuition

- The **numerator** $m^{\underline{k}} = m(m-1)\cdots(m-k+1)$ counts the number of ways to place `k` keys into `m` buckets with **no two keys in the same bucket** (ordered).
- The **denominator** $m^k$ counts the total number of ways to place `k` keys into `m` buckets (each key independently picks any of the `m` buckets).

---

### Sanity Checks

- If $k = 1$: $\dfrac{m}{m} = 1$  (one key can never collide with itself)
- If $k = m$: $\dfrac{m!}{m^m}$ — a small but nonzero probability (all buckets filled exactly once, like a bijection)
- If $k > m$: by the Pigeonhole Principle, collision is guaranteed, and the formula correctly gives a product that includes a $\dfrac{0}{m}$ factor → probability 0 

---

### Connection to the Birthday Problem

This is exactly the **birthday problem**: replace "buckets" with "days in a year" ($m = 365$) and "keys" with "people" ($k$). The probability that all $k$ people have *different* birthdays is $\dfrac{365^{\underline{k}}}{365^k}$, which has the same form.
