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


---

## Solution

### Variant 1 — Correct

**Invariant:** After iteration `i`, the subarray `h[1..i]` is a valid max-heap.

- **Base case:** After `bubbleUp(1)`, a single element is trivially a valid heap.
- **Inductive step:** Assume `h[1..i-1]` is a valid max-heap. Calling `bubbleUp(i)` examines the element at position `i` and keeps swapping it with its parent as long as it is larger than its parent. This is exactly the same operation as a standard heap insert — the new element is placed at the next free position and bubbled up. Therefore `h[1..i]` is a valid max-heap after the call.

By induction, after all `n` iterations the entire array is a valid max-heap. ✓

---

### Variant 2 — Incorrect

**Why it fails:** `trickleDown(i)` may pull a large element from a deeper level up into position `i`, but position `i`'s ancestor (at index `< i`) has already been processed and will not be revisited. The heap property for that ancestor can therefore be left violated.

**Counterexample:** Start with `h = [3, 7, 1, 8, 2, 4]` (n = 6).

1. `trickleDown(1)`: `h[1]=3` is smaller than child `h[2]=7`. Swap → `[7, 3, 1, 8, 2, 4]`.
   Now `h[2]=3` is smaller than child `h[4]=8`. Swap → `[7, 8, 1, 3, 2, 4]`.
2. `trickleDown(2)`: `h[2]=8` is already larger than both children (3 and 2). No change.
3. `trickleDown(3)`: `h[3]=1` is smaller than child `h[6]=4`. Swap → `[7, 8, 4, 3, 2, 1]`.
4. `trickleDown(4)`, `(5)`, `(6)`: leaf nodes, no change.

**Final array:** `[7, 8, 4, 3, 2, 1]`

This is **not** a valid max-heap: `h[1] = 7 < h[2] = 8`, violating the heap property. ✗

The root cause: `trickleDown(1)` promoted 8 to position 2 *after* position 1 was set to 7, and Variant 2 never goes back to fix the now-violated root.

> **Note:** The correct O(n) heapify using `trickleDown` processes nodes in *reverse* order:
> ```c++
> for (int i = n/2; i >= 1; i--) h.trickleDown(i);
> ```
> Going forwards is what breaks it.