---
layout: default
title: Midterm 2 Info
nav: Resources
---

You have a correctly implemented Max-Heap class (indices starting at 1), which provides the two following helper functions (in addition to insert, remove, peek):
 - (a) `bubbleUp (int i)` takes the element at position `i` and keeps swapping it with its parent (and grandparent etc.) until it is no larger than the parent at the time.
 - (b) `trickleDown (int i)` takes the element at position `i` and keeps swapping it with the larger of its children (and grandchildren etc.) until it is no smaller than both children.

Suppose that you get an instance whose array elements are not in correct heap order, i.e., the heap property does not hold yet. You want to establish the correct arrangement, by using the two helper functions given above. Which of the following two alternatives do this correctly? Explain why they are correct or incorrect. For incorrect ones, give an example of an initial heap which is not correctly processed, and explain what happens when the incorrect variant is executed on it.

```c++
Heap h;
// Variant 1
for (int i = 1; i <= n; i ++) h.bubbleUp (i);

// Variant 2;
for (int i = 1; i <= n; i ++) h.trickleDown (i);
```
