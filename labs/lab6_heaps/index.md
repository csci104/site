---
layout: asides
toc: true
tasks: true
title: Heaps
---

---

**Due at the end of your registered lab section**

---

## Intro

Any questions, thoughts or concerns? How can we help you?

## Heaps & Priority Queues

In today's lab, we're going to focus on priority queues, an important data structure that you'll need to understand for the next assignment and beyond.

### Heaps Introduction

In office hours, we use a standard FIFO queue system, where the student waiting the longest is called next. But what if we wanted to apply a more complicated calculation to found who was next? Maybe the person with the shortest question? The person who started the assignment the earliest? The person who's asked the fewest questions? We still want the popping functionality of a queue, where we just care about who's on top, and don't need to access anyone in the middle. However, we no longer want to process items in order of the arrival.

How do we add, return, and remove items based on their assigned priority?
 
Heaps are an implementation of a **priority queue**, an ADT that allows us to add items to their appropriate location (based on their priority), return the item of highest priority, and remove the item of highest priority. You can visualize a heap as a complete d-ary tree (usually, d = 2) that satisfies the heap property: 

Every parent is better than both of its children. 

In a min heap, a node is less than or equal to all its children. In a max heap, a node is greater than or equal to all its children. 

- [ ] So, **where in the tree is the “best” (maximum or minimum) item at any given time?**

- [ ] **For a binary heap, does it matter which child is on the left and which child is on the right? Why or why not?**

- [ ] **In what data structure is there an ordering property between the left and right children, and why is it necessary for that data structure and not in heaps?**
 
Since a complete tree is one where the first (h-1) levels are full AND the bottom level is filled from left to right, we can store our heaps in a single array. Suppose we index our array starting at index 1. For any node i, parent(i) = i/2. For any parent p, left_child(p) = 2p and right_child(p) = 2p + 1.

- [ ] How does this change if we index our array starting at index 0?

If we start at index 0, for any node i, parent(i) = (i - 1)/2. For any parent p, left_child(p) = 2p + 1 and right_child(p) = 2p + 2.

- [ ] How does that change if we have a 3-ary heap, 4-ary heap, 5-ary heap, etc.?

That's for you to figure out in the homework!
 
Thankfully, implementing the functions of a priority queue is not as hard as it sounds. Let’s say our heap is stored in an array a, and the variable size returns the number of items in the heap at a given time.
 
**Pushing an Item:** to add an item, we need to think about where to add it. In what location should we add our new item if we want to keep our tree complete? What index of our array does this correspond to? Adding the item is the easy part; after adding, we need to think about maintaining the heap property as well. If our newly added leaf is worse than its parent, does our heap property still hold?  This is where “trickling up” comes in: to maintain the heap property, we need to recursively promote our new leaf up. How do we know when to stop “trickling up?”

**Popping an Item:** recall that when we remove from a heap, we are removing the best item. However, the best item is stored in the root, and we can’t just delete our root from the tree! In fact, the only item we can remove while maintaining a complete tree is the leaf node that is as far right as possible. Removing an item is going to involve three main steps:

a.     Swap the “best” node with the very last leaf node. Where are these stored in our array?

b.     Delete the very last leaf node (which now stores our “best” item.)

c.     Since the root now contains what was previously our very last leaf node, we are going to have to put it in its right place to maintain our heap property. The last step of removing involves “trickling down”: recursively swapping our new root with its best child. How do we know when to stop “trickling down?”

**Top/Returning Best Value:** to return the best value, all we have to do is return a[0]. The runtime of top() is clearly constant. What are the runtimes of adding/removing an item? (Hint: what is the height of a complete d-ary tree?)

### Assignment Part 1 - Implementing `pop()` for a max heap

In this part, you are given a partially finished version of a binary max heap (i.e. a heap where each element is larger than its two children).

Your task is to implement the `pop()` function for the heap (in `max_heap.h`), which removes the top element from the heap (and to keep the heap property intact at the same time). This would (hopefully) prepare you for PA3.

**Tips / Hints:**

- Remember we were talking about storing the heap as an array because it is a complete binary heap? Insides our `MaxHeap`, the member `data` serves as that array! We use an `std::vector` instead of an plain array because:

    - We could use `vector.push_back` to push back an item.
    - We could use `vector.pop_back` to remove the last item. (Very useful for heaps)
    - It handles resize automatically.
    - It handles memory allocation automatically (no more manual `new` and `delete`!)

- You could use `std::swap` to swap the value of two elements (e.g. `std::swap(data[parent], data[left])`).

- When you are trickling down, be careful for whether the node has 0, 1, or 2 children.

- [ ] When you are done, run `make heap_test` to test your heap. Make sure all tests pass before moving to Part 2.


### Assignment Part 2 - **ROCK BATTLE**

In this part we will utilize the heap we have just created to solve a problem!

We have a collection of stones. Each stone has a positive integer weight. The stones are represented as a vector of ints, where each int is the stone's weight.

We want our rocks to battle. Each turn, we choose the two heaviest rocks and smash them together. Suppose the stones have weights x and y, where x <= y.  The result of the smash is:

If x == y, both stones are totally destroyed.

If x != y, the stone of weight x is totally destroyed, and the stone of weight y now has weight y-x.

At the end, there is at most 1 stone left.  Return the weight of this stone (or 0 if there are no stones left.)

Your task is to implement the `int lastStoneWeight(vector<int>& stones)` function inside `stones.cpp` to simulate the process described above with the `MaxHeap` you just implemented.

- [ ] When you are done, run `make test` to test your function.

### (Optional) Replacing `MaxHeap<int>` with `std::priority_queue<int>`

Fortunately, you don't have to reinvent the wheel by implementing a heap
in practice (here we do it for the sake of exercise).

The C++ standard library offers us the type `std::priority_queue`, which is also a max-heap (you could though customize it to be a min-heap).

The functions in `MaxHeap` are designed to match those in `std::priority_queue`, so
if you just replace `MaxHeap<int>` in your `stones.cpp` with `std::priority_queue` (and also include the `#include <queue>` header), your code should continue to work.

For more information about priority queues, check [cppreference](https://en.cppreference.com/w/cpp/container/priority_queue).

 - [ ] Replace `MaxHeap<int>` in your `stones.cpp` with `std::priority_queue`, and rerun your tests.

### Checkoff Policy

To get checked off, show your passing result of `make test_heap` and `make test` to a CP/TA.

