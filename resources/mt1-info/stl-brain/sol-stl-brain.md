---
layout: default
title: Midterm 1 Info
nav: Resources
---

# Solution: Forgetful Brain (LRU with LimitedList)

## (a) Inheritance or Composition?
Use **private inheritance** from `LimitedList`.

Reason: `find()` and `size()` are **protected** in `LimitedList`, so they are only accessible from subclasses, not via composition. The Brain is an implementation detail wrapper around the list, so private inheritance is appropriate.

## (b) Implementation
Maintain facts in **most-recently-used order** at the front of the list.
- `remember(fact)`: move it to the front.
- `learn(fact)`: if full, remove least-recently-used (back), then insert at front.

```cpp
#include <string>
using namespace std;

class Brain : private LimitedList
{
public:
    Brain (int capacity) : LimitedList(capacity) {}

    void remember (const string & fact) {
        int idx = find(fact); // guaranteed to exist
        if (idx == -1) return; // just in case
        remove(idx);
        insert(0, fact);
    }

    void learn (const string & fact) {
        if (size() == capacity_) {
            // Evict least recently used (last item)
            remove(size() - 1);
        }
        insert(0, fact);
    }

private:
    int capacity_;
};
```

### Fix: store capacity
Because `LimitedList` doesn’t expose capacity, store it locally.

Final version:

```cpp
#include <string>
using namespace std;

class Brain : private LimitedList
{
public:
    Brain (int capacity) : LimitedList(capacity), capacity_(capacity) {}

    void remember (const string & fact) {
        int idx = find(fact); // guaranteed to exist
        if (idx == -1) return;
        remove(idx);
        insert(0, fact);
    }

    void learn (const string & fact) {
        if (size() == capacity_) {
            remove(size() - 1); // remove LRU
        }
        insert(0, fact); // insert as most recent
    }

private:
    int capacity_;
};
```

## Complexity
- `remember`: `find` is O(n), `remove` and `insert` are O(n) → O(n)
- `learn`: remove last is O(1) or O(n) depending on list, insert front O(n) → O(n)

This matches the expected use of the provided `LimitedList`.
