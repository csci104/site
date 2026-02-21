---
layout: default
title: Midterm 1 Info
nav: Resources
---

## Problem: Move Matching Values to the End of a Linked List


Write a **recursive** function:

```c++
Item* ll_move_vals_to_end(Item* head, int val);
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

## Solution

```cpp
#include <iostream>

// Item definition
struct Item {
    int val;
    Item* next;
    Item(int v, Item* n) : val(v), next(n) {}
};

Item* ll_movtoend_helper(Item* head, Item* duphead, int val) 
{
  if(head == nullptr){
    return duphead;
  }  else if(head->val == val) {
    Item* mynext = head->next;
    head->next = duphead;
    return ll_movtoend_helper(mynext, head, val);
  } else {
    head->next = ll_movtoend_helper(head->next, duphead, val);
    return head;
  }

}
Item* ll_movtoend(Item* head, int val) 
{
  return ll_movtoend_helper(head, nullptr, val);
}
```

### Why it Works (Intuition)

`ll_movtoend_helper(head, duphead, val)` processes the list starting at `head` and accumulates all nodes whose value equals `val` onto the front of `duphead`. It always returns the head of a partially rebuilt list consisting of:

- All original nodes **not equal** to `val`, in their original relative order, followed by  
- The `duphead` list (the moved nodes), which may appear in any relative order.

---

### How the Recursion Works

#### Base Case

If `head == nullptr`, the original list has been fully processed.  
Return `duphead`, which contains all nodes that were removed.

#### If `head->val == val`

- Save `head->next` in a temporary pointer.
- Relink `head` to the front of `duphead`.
- Recursively process the remainder of the list using the saved next pointer.
- The current node is *not* returned into the main chain — it becomes part of the moved list.

#### If `head->val != val`

- Recursively process the rest of the list.
- Set `head->next` to the returned pointer (which will be the kept nodes followed by the moved nodes).
- Return `head`.

As recursion unwinds, the non-matching nodes rebuild their chain in original order, and at the very end the accumulated `duphead` list is appended to them.

---

### Example Traces

#### Example 1

Input:  
`[3, 1, 3, 2, 3]`, `val = 3`

Processing steps (conceptually):

- Remove first `3`, add to `duphead`.
- Keep `1`.
- Remove next `3`, add to `duphead`.
- Keep `2`.
- Remove final `3`, add to `duphead`.
- Base case returns `duphead`.
- Rebuild kept nodes in order.

Final result:  
`[1, 2, 3, 3, 3]`

(The moved nodes may be in reverse order of discovery — which is allowed.)

---

#### Example 2

Input:  
`[5, 5, 5]`, `val = 5`

All nodes match. Each is moved to `duphead`.  
Final list consists only of those nodes (order may differ from original).

---

#### Example 3

Input:  
`[]`

Base case immediately returns `nullptr`.

---

### Complexity

- **Time Complexity:** O(n)  
  Each node is visited exactly once and performs constant-time pointer updates.

- **Space Complexity:** O(n)  
  Due to recursive call stack depth in the worst case.

- **No dynamic allocation:**  
  All nodes are relinked; no new `Item` objects are created.

- **No loops:**  
  The solution relies entirely on recursion.

---
