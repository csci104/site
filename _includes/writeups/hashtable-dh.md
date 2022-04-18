You will create a `HashTable` data structure that uses open-addressing (i.e. uses probing for collision resolution) and **NOT** chaining.  Your table should support **linear** and **quadratic** probing via functors.  It should support resizing when the loading factor is above a user-defined threshold. You may use the `std::hash<>` functor provided with the C++ `std` library as well as your own hash function for **string**s made of letters and digits only (no punctuation) that you created in an earlier problem. You should complete the implementation in `ht.h`.

```c++
template<
    typename K, 
    typename V, 
    typename Prober = LinearProber<K>,
    typename Hash = std::hash<K>, 
    typename KEqual = std::equal_to<K> >
class HashTable
{
    /* Implementation */
};
```

The template types are as follows:
  - **K**: the key type (just like a normal map)
  - **V**: the value type (just like a normal map)
  - **Prober**: a functor that supports an `init()` and `next()` function that the hash table can use to generate the probing sequence (e.g. linear, quadratic, double-hashing).  A base `Prober` class has been written and a derived `LinearProber` is nearly complete. You will then write your own `DoubleHashProber` class to implement double-hash probing.  The actual Prober type that is passed may contain other template arguments but must at least take the Key type as a template argument. The `DoubleHashProber` will take the key type *AND* the second hash function type (see below for more details).
  - **Hash**:  The primary hash function that converts a value of type **K** to a `std::size_t` which we have typedef'd as `HASH_INDEX_T`.
  - **KEqual**: A functor that takes two **K** type objects and should return `true` if the two objects are **equal** and `false`, otherwise.

Internally, we will use a hash table of **pointers** to `HashItem`s (i.e. `std::vector<HashItem*> >` ). The `HashItem` has the following members:

```c++
typedef std::pair<KeyType, ValueType> ItemType;
struct HashItem {
        ItemType item;  // key, value pair
        bool deleted;
};
```

You should allocate a `HashItem` when inserting and free them at an appropriate time based on the description below.  If no location is available to insert the item, you should throw `std::logic_error`, though since we are not using Quadratic probing and we resize the table when the loading factor is above a certain threshold, this should not happen. (Yet we include it in case we do implement quadratic probing in the future.)

We have also provided a constant array of prime sizes that can be used, in turn, when resizing and rehashing is necessary.  This sequence is: 11, 23, 47, 97, 197, 397, 797, 1597, 3203, 6421, 12853, 25717, 51437, 102877, 205759, 411527, 823117, 1646237, 3292489, 6584983, 13169977, 26339969, 52679969, 105359969, 210719881, 421439783, 842879579, 1685759167.  Thus, when a HashTable is constructed it should start with a **size of 11**. The client will supply a **loading factor**, `alpha`, at construction, and **before** inserting any new element, you should resize (to the next larger size in the list above) if the current loading factor is **at or above** the given `alpha`.  

For removal of keys, we will use a deferred strategy of simply marking an item as "deleted" using a `bool` value.  These values should not be considered when calls are made to `find` or `operator[]` but should continue to count toward the loading factor until the next resize/rehash.  At that point, when you resize, you will only rehash the non-deleted items and (permanently) remove the deleted items.

We will not ask you to implement an `iterator` for the hash table.  So `find()` will simply return a pointer to the key,value pair if it exists and `nullptr` if it does not.

To facilitate tracking relevant statistics we will use for performance measurements, we have provided the core **probing** routine: `probe(key)`. This routine, applies the hash function to get a starting index, then initializes the prober and repeatedly calls next() until it finds the desired key, reaches a hashtable location that contains `nullptr` (where a new item may be inserted if desired), or reaches its upper limit of calls (i.e. cannot find a null location).  `probe()` utilizes the `Prober`.  `Prober::init` is called to give the prober all relevant info that it may need, regardless of the probing strategy (i.e. starting index, table size, the key (which would be needed by double-hash probing) etc.).  Then a sequence of calls to `Prober::next()` will ensue.  If, for example we are using linear probing, the first call to `next()` would yield h(k), the subsequent call to `next()` would yield h(k)+1, the third call would yield h(k)+2, etc.  Notice: the first call to `next()` just returns the h(k) value passed to `Prober::init()`.  As probing progresses we will update statistics such as the total number of probes.   Some accessor and mutator functions are provided to access those statistics.

Note:  When probing to insert a new key, we could stop on a location marked as deleted and simply overwrite it with the key to be inserted.  However, because our design uses the same `probe(key)` function for all three operations: insert, find, and remove, and certainly for find and remove we would NOT want to stop on a deleted item, but instead keep probing to find the desired key, **we will simply take the more inefficient probing approach of not reusing locations marked for deletion when probing for insertion**.

A debug function, `reportAll` is also provided to print out each key value pair. Use this when necessary to help you debug your code.

#### Probers

We have abstracted the probing sequence so various strategies may be implemented without the hash table implementation being modified.  Complete the `LinearProber` and then write a similar `DoubleHashProber` that uses double-hashing. Return `npos` after `m` calls to next() .

#### Double Hash Prober

Your double-hash prober should take in two template arguments:

```
template <typename KeyType, typename Hash2>
struct DoubleHashProber : public Prober<KeyType>
{
  /* Code */
}; 
```

The `KeyType` is the same as that of the hash table, while `Hash2` should be a function object that implements a `HASH_INDEX_T operator()(const KeyType& key) const`.  Our double-hash prober should use a stepsize of `m2 - h2(k)%m2` where `m2` is some prime moduli less than the current hash table size.  Since our double hash prober needs this separate `m2`, we have a static array of moduli to use and provide a helper function to determine which moduli to use, given the hash table size, `m` passed to `init()`.   The `init()` is complete but can be appended to, if need be.  

#### Testing Your Hash Table

A simple test driver program `ht-test.cpp` has been provided which you may modify to test various aspects of your hash table implementation. We will not grade this file so use it as you please.  **BUT PLEASE** do some sanity tests with it **BEFORE** using any of our test suite.
