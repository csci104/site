---
layout: default
title: Midterm 3 Info
nav: Resources
---

## Counting

For all 3 problems below, Julia has **exactly 6 hours** to binge-watch episodes. You must show work that supports your final answer.

---

### Part (a)

Assuming that for a given show she always watches episodes in **sequential order** (never out of order), how many orderings exist for her to watch **8 half-hour episodes from show A** and **2 one-hour episodes from show B** (she can switch between shows freely)?

**Setup:** The 8 half-hour episodes (A1, A2, …, A8) and 2 one-hour episodes (B1, B2) fill exactly $8 \times 0.5 + 2 \times 1 = 6$ hours. Since within each show the order is fixed, the only choice is which 2 of the 10 total episode slots are occupied by show B's episodes.

$$\boxed{\binom{10}{2} = \binom{10}{8} = 45}$$

---

### Part (b)

Now assume she is willing to watch episodes of the same show in **any order** (not sequentially). How many orderings exist of the ten total episodes from part (a)?

**Setup:** All 10 episodes are now distinguishable and can appear in any order, giving:

$$\boxed{10! = 3{,}628{,}800}$$

---

### Part (c)

She again watches in **sequential order** within each show. There are two shows C and D: one has at least 12 half-hour episodes, the other has at least 3 two-hour episodes. She can mix episodes from both shows in any order. How many orderings exist of the episodes she will watch?

**Setup:** Let $x$ = number of half-hour episodes watched and $y$ = number of two-hour episodes watched. Since she has exactly 6 hours:

$$0.5x + 2y = 6 \implies x + 4y = 12$$

Since episodes within each show are in order, the only freedom is choosing which $y$ of the $x+y$ total slots are two-hour episodes. Break into cases:

| $y$ (two-hour) | $x$ (half-hour) | Total episodes | Orderings |
| :-: | :-: | :-: | :-: |
| 0 | 12 | 12 | $\binom{12}{0} = 1$ |
| 1 | 8 | 9 | $\binom{9}{1} = 9$ |
| 2 | 4 | 6 | $\binom{6}{2} = 15$ |
| 3 | 0 | 3 | $\binom{3}{3} = 1$ |

$$\boxed{1 + 9 + 15 + 1 = 26 \text{ orderings}}$$

---
