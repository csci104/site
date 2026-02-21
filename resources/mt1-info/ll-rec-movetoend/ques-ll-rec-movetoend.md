---
layout: default
title: Midterm 1 Info
nav: Resources
---

## Problem: Move Matching Values to the End of a Linked List


Write a **recursive** function:

```c++
Item* ll_movtoend(Item* head, int val);
```

that moves every Item node whose val equals val to the end of the singly-linked list and returns a pointer to the head of the (possibly) updated list.

### Requirements and clarifications

You must **NOT** allocate new `Item` nodes. You must **relink** the existing nodes (remove them from their current position and append them to the moved list).

It is not required to preserve the original relative order of the moved nodes; they may appear in any order at the end, but the nodes that are **NOT** moved must preserve their relative order.

 - You must use recursion. NO LOOPS are allowed (0 credit if loops are used).

 - Your solution must run in O(n) time. You should make only 1 recursive call on each node. For at most half-credit, you may make 2 or more recursive calls on nodes.

 - You may write helper functions if you like.

 - Return the head of the updated list.

### Examples

 - Input: `[3, 1, 3, 2, 3]`, `val` = `3`
  Possible output: `[1, 2, 3, 3, 3]`
  (the three 3 nodes appear at the end; their internal order may be different from the original)

 - Input: `[5, 5, 5]`, `val` = `5`
    Output: `[5, 5, 5]`
    (all nodes match; they end up at the end — same nodes, possibly reordered)

 - Input: `[1, 2, 3, 4]`, `val` = `9`
    Output: `[1, 2, 3, 4]`
    (no nodes moved)

 - Input: `[]` (empty list), any val
    Output: `[]`

Node definition

Assume the following Item struct:

```c++
struct Item {
    int val;
    Item* next;
    Item(int v, Item* n) : val(v), next(n) {}
};
```

## Skeleton

```cpp
#include <iostream>

// Item definition
struct Item {
    int val;
    Item* next;
    Item(int v, Item* n) : val(v), next(n) {}
};

// Add a helper function here, if necessary

Item* ll_movtoend(Item* head, int val) 
{

}
```

