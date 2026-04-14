---
layout: default
title: Midterm 3 Info
nav: Resources
---

We have a Bloom Filter with an array of 10 elements (the elements of the set are integers), and using three hash
functions

$$h1(x) = (7x + 4) mod 10,$$
$$h2(x) = (2x + 1) mod 10,$$
$$h3(x) = (5x + 3) mod 10.$$

We execute the sequence of operations given below. What does the program output? Which of the answers are false positives (the Bloom filter says "Yes", even though the correct answer is "No")? Which are false negatives (the Bloom filter says "No", even though the correct answer is "Yes")? If your final answer is incorrect, you may get more partial credit if you show enough work for us to isolate the mistake.

```c++
BloomFilterSet<int> bf (10);
bf.add (0);
bf.add (1);
bf.add (2);
bf.add (8);
// Show us what the Bloom Filter’s Array looks like at this point.
if (bf.contains (2)) std::cout << "2\n";
if (bf.contains (3)) std::cout << "3\n";
if (bf.contains (4)) std::cout << "4\n";
if (bf.contains (9)) std::cout << "9\n";
```
