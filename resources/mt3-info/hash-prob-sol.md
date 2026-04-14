---
layout: default
title: Midterm 3 Info
nav: Resources
---

## Hashing and Probability — Solution

**Problem:** You put `k` keys into a hash table with `m` hash buckets. Assuming the hash function is uniformly random and each key lands independently, what is the probability that all `k` keys end up in *different* buckets (no collisions)?

---

## Derivation

Think about inserting the keys one at a time and track the probability that each new key avoids all previously inserted keys.

| Insertion | Buckets still free | Probability (no collision) |
| --------- | ------------------- | ------------------------ |
| Key 1 | m (empty table) | m/m = 1 |
| Key 2 | m − 1 | (m − 1)/m |
| Key 3 | m − 2 | (m − 2)/m |
| ... | ... | ... |
| Key k | m − (k−1) | (m − k + 1)/m |

Since each insertion is **independent**, the joint probability is the product of all these terms:

    P(no collision) = (m/m) × ((m−1)/m) × ((m−2)/m) × ... × ((m−k+1)/m)

Equivalently:

    P(no collision) = [m × (m−1) × (m−2) × ... × (m−k+1)] / m^k

Using factorial notation:

    P(no collision) = m! / [(m−k)! × m^k]

Or using permutation notation (mPk = m!/(m−k)!):

    P(no collision) = mPk / m^k

---

## Intuition

- The **numerator** m × (m−1) × (m−2) × ... × (m−k+1) counts the ordered ways to place k keys into m buckets with **no two keys in the same bucket**.
- The **denominator** m^k counts the total number of ways to place k keys into m buckets (each key independently picks any of the m buckets).

---

## Sanity Checks

- **If k = 1:** (m/m) = 1 — one key can never collide with itself ✓
- **If k = m:** m! / m^m — small but nonzero probability (all buckets filled exactly once) ✓
- **If k > m:** By Pigeonhole Principle, collision is guaranteed. The formula correctly yields 0 since the numerator contains the factor (m−k+1) which is ≤ 0 ✓

---

## Connection to the Birthday Problem

This is exactly the **birthday problem**: replace "buckets" with "days in a year" (m = 365) and "keys" with "people" (k). The probability that all k people have *different* birthdays is:

    P(all different) = 365 × 364 × 363 × ... × (365−k+1) / 365^k

which has the same form.
