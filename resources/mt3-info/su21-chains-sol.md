---
layout: default
title: Midterm 3 Info
nav: Resources
---

## Hashing — Solution

### Key Insight

In an **open-addressing** table, a key may not sit at its *home* bucket — it may have been displaced to a later slot by probing.  In **chaining**, every key always goes directly to its home bucket: `h(key) % m`.

So the algorithm is:

1. Allocate a boolean array `occupied` of size `m`, all `false`.
2. Walk every slot of the probing table.  For each slot that is **non-NULL and not deleted**, compute the key's *home* bucket under chaining and mark `occupied[home] = true`.
3. Count and return the number of `false` entries in `occupied`.

This visits every slot exactly once (Θ(m)), plus a second linear sweep to count — overall **Θ(m)**.

---

### Why skip `deleted` entries?

A slot with `deleted == true` represents a key that was logically removed from the table.  If we had been using chaining, that key would also have been removed, so it should not contribute to any bucket.  Only currently live keys (`!= nullptr && !deleted`) count.

---

### Solution Code

```cpp
#ifndef HT_H
#define HT_H
#include <vector>
#include <iostream>
#include <utility>
#include <cmath>

using namespace std;

typedef size_t HASH_INDEX_T;

template <typename KeyType, typename ValueType>
struct HashItem {
    typedef std::pair<KeyType, ValueType> ItemType;
    ItemType item;
    bool deleted;
};

/**
 * @brief Computes the number of empty buckets that would exist if
 * the hash table used chaining rather than open-addressing (probing). 
 * 
 * @param [in] table Hash table of pointers to HashItems. An entry
 *  is occupied if the pointer is non-NULL
 * @param [in] h Hash function that supports operator()(Key) and returns
 *   an unsigned integer of arbitrary size
 * @return the number of buckets/chains that would be empty had chaining
 *   been used rather than open-addressing
 */
template<typename HashItem, typename Hash>
size_t numEmptyIfChaining(const std::vector< HashItem* >& table, Hash h)
{
    size_t m = table.size();

    // Track which home buckets would be non-empty under chaining
    vector<bool> occupied(m, false);

    for (size_t i = 0; i < m; i++) {
        // Only consider live (non-deleted) entries
        if (table[i] != nullptr && !table[i]->deleted) {
            // Re-hash the key to find its home bucket under chaining
            HASH_INDEX_T home = h(table[i]->item.first) % m;
            occupied[home] = true;
        }
    }

    // Count buckets that would remain empty under chaining
    size_t emptyCount = 0;
    for (size_t i = 0; i < m; i++) {
        if (!occupied[i]) {
            emptyCount++;
        }
    }
    return emptyCount;
}

#endif
```

---

### Worked Example

Suppose `m = 7` and the hash function is `h(k) = k`, so `home = k % 7`.  The table after several insertions and one deletion looks like:

| Index | Contents        |
|-------|-----------------|
| 0     | `nullptr`       |
| 1     | key=8, del=false  |
| 2     | key=2, del=false  |
| 3     | key=9, del=true   |
| 4     | key=4, del=false  |
| 5     | `nullptr`       |
| 6     | key=6, del=false  |

Live keys and their home buckets:

| Key | `h(key) % 7` |
|-----|-------------|
| 8   | 1           |
| 2   | 2           |
| 4   | 4           |
| 6   | 6           |

`occupied = [F, T, T, F, T, F, T]`

Empty buckets under chaining: indices **0, 3, 5** → return **3**.

(Note: index 3 currently holds a deleted entry for key=9, whose home would also be 2 `(9 % 7 = 2)`, but since it is deleted it is skipped.  Even if it were live, home=2 is already marked occupied.)

---

### Complexity

| Phase | Work |
|-------|------|
| Allocate `occupied` | Θ(m) |
| Scan `table`, re-hash live entries | Θ(m) (assuming O(1) hash) |
| Count empty slots | Θ(m) |
| **Total** | **Θ(m)**  |
