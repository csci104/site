# Solution: Recursive Linked-List Merge

## Problem Summary
Given two linked lists `u` and `v`, merge them by alternating nodes (first from `u`, then from `v`, etc.). If one list runs out, append the remaining nodes from the other list. Must be implemented recursively.

## Solution

```cpp
struct Node {
    int value;
    Node* next;
};

Node* merge(Node *u, Node *v) {
    // Base case 1: if u is empty, return v (even if v is also empty)
    if (u == nullptr) {
        return v;
    }
    
    // Base case 2: if v is empty (but u is not), return u
    if (v == nullptr) {
        return u;
    }
    
    // Recursive case: take first node from u, then merge v with rest of u
    // This alternates: u[0], v[0], u[1], v[1], ...
    u->next = merge(v, u->next);
    return u;
}
```

## Explanation

The key insight is that we want to alternate between the two lists. The solution works as follows:

1. **Base Cases:**
   - If `u` is empty, return `v` (includes the case where both are empty)
   - If `v` is empty (but `u` is not), return `u`

2. **Recursive Case:**
   - Take the first node from `u`
   - Recursively merge `v` with the rest of `u` (i.e., `u->next`)
   - Set `u->next` to point to the result of this recursive call
   - Return `u` as the head of the merged list

3. **Why this alternates correctly:**
   - First call: Takes `u[0]`, then calls `merge(v, u->next)`
   - Second call: Takes `v[0]`, then calls `merge(u->next, v->next)`
   - Third call: Takes `u[1]`, then calls `merge(v->next, u->next->next)`
   - And so on...

## Trace Example

For `u = 1→2→3` and `v = 2→4→6`:

```
merge(1→2→3, 2→4→6)
  1->next = merge(2→4→6, 2→3)
            merge(2→4→6, 2→3)
              2->next = merge(2→3, 4→6)
                        merge(2→3, 4→6)
                          2->next = merge(4→6, 3)
                                    merge(4→6, 3)
                                      4->next = merge(3, 6)
                                                merge(3, 6)
                                                  3->next = merge(6, nullptr)
                                                            merge(6, nullptr)
                                                              return 6
                                                  return 3→6
                                      return 4→3→6
                          return 2→4→3→6
              return 2→2→4→3→6
  return 1→2→2→4→3→6

Result: 1→2→2→4→3→6 ✓
```

## Time Complexity
O(m + n) where m and n are the lengths of the two lists, since each node is visited once.

## Space Complexity
O(m + n) due to the recursive call stack.
