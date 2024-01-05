## Quick review

### Hash functions

If you want to insert an item into a hash-table, you first map it to a integer using the hash function. Once you have the integer, you could use it to index an array in order to find the location to store it.

### Valid hash functions

A valid hash function should map the same item to the same integer, always.

More formally, if $X = Y$, then $H(X)=H(Y)$, no matter how many times you have called $H$.

Which of the following are ***VALID*** hash functions?

```c++
size_t hash(std::string str) {
    return str.size();
}
```

```c++
size_t hash(std::string str) {
    return str.size() + rand() % 256;
}
```

```c++
size_t hash(std::string str) {
    return 42;
}
```

```c++

const size_t A = 54059;
const size_t B = 76963;

size_t hash(std::string str) {
    size_t h = 31;
    for (char c : str) {
        h = (h * A) ^ (c * B);
    }
    return h;
}
```


### Good hash functions

When a hash function maps two different items to the same integer (i.e $X \neq Y$ but $H(X)=H(Y)$), then you get a "collision". A good hash function should aim to minimize the chance of collision, and it should be fairly inexpensive to calculate.

Note **this not only depends on the hash function itself, but also the set of items you are inserting**.

### Addressing schemes

Even with a good hash function, collisions are usually unavoidable. If one location in the array can only hold one item, then there would be no place to put the second item.

There are multiple ways to implement this:

* Chaining
* Linear probing
* Quadratic probing
* Double hashing

### Implementing removal in linear probing

Once you have removed an item, the items come afterwards might become "lost".

For example, you have a hashtable of size 3. You have inserted three items $x, y, z$, and all of them were hashed to 0. What happens if you just simply remove $x$?