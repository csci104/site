---
layout: asides
toc: true
tasks: true
title: Hashtables
---

## HashTables

### 0 - What is a Map?

Recall that a map is a data structure used mostly for fast look ups or searching data. It stores data in the form of key, value pairs, where every key is unique. Each key maps to a value, hence the name "map."

The look up speed and ordering of map elements depends on the data structure we use to implement our map. In previous labs, we reviewed AVL Trees, an implementation of a balanced BST. This lab will go over hashtables and explore how it can be used to implement a map.

### 3 - Let's Talk About Hash Tables

A Hash Table is like an array in many aspects. However, in order to find the index in the array, we use a special function called a hash function. This converts the input into an index location that the input is then stored into.

<div style="text-align:center"><img src="./assets/hashTable.png" alt="bst" width="300" height="250" /> </div>

In the above example, we can see that our hash table stores strings, and those strings are stored in locations within an array specified by the hash function.

This type of data structure is very useful in terms of accessing data. You could probably think of different applications of this data structure. Maybe a set? Given an input, we first hash it, then look to see if it is inserted in our hash table by checking the index returned by our hash function. Since hashing is just a function, it takes O(1) time. If we have a good hash function that distributes keys uniformly around the table such that there are a small number of keys at each location, the entire check is O(1) on average.

There are many different applications of this type of data structure, including sets, maps, and associative arrays (which are pretty much maps).

#### 3.1 - Hash Functions

So the whole idea of a hash table relies on the hash function. A hash function is a function that converts an object into an index location within our array. 

What goals should our hash function have?
1. Easy and fast to compute
2. Uniformly distributes keys across the hash table

The first thing we want is for the function to be fast. It should be an easy calculation that takes O(1) time to compute.

Lets first go over a bad example:

```
int hash(int data) {
    return 42 % size;
}
```

This hash function is super fast. It literally just does one operation and then returns. However, it always returns the same number. This means that we are always going to go to the same array index. This doesn't make sense. Shouldn't our hash function result in different outputs with different inputs?

A good example of this would be:

```
int hash(int data){
    return 31 * 54059 ^ (data * 76963) % size;
}
```

Wow, I literally have no idea what the number is going to be! In this example, the output hash is different in every case. It may be more operations than our first hash function, but it still does a constant amount of work. Plus, it now gives us a good variety in our output!


#### 3.2 - Collisions

So what happens if the hash function outputs the same index for multiple objects? This is called a **collision**. There are two approaches to handling collisions: open addressing and closed addressing such as chaining or buckets.

#### 3.3 - Open Addressing

The idea with open addressing is that every location in the array can only have 1 thing in it. This means that we will have to find a free spot that we can place the object in. Linear probing is a very simple solution.

Linear probing is where you just keep incrementing up/looking at the next index until you find a free location.

Other examples of open addressing are:
+ Quadratic Probing
+ Double Hashing

#### 3.4 - Chaining

For closed addressing we will focus on chaining. Chaining allows for multiple objects to reside within the same array location. The array is changed to be an array of lists or some other data structure, allowing us to store multiple items per index. We often use an array of linked lists, hence the name "chaining."

<div style="text-align:center"><img src="./assets/chaining.png" alt="bst" width="400" height="250" /> </div>


Other implementations may use another type of list or even a balanced tree. 

Because chaining allows for buckets, it is probable for `n` objects to all be placed within the same bucket. The worst case runtime is O(n). Chaining may even prevent our goal of O(1) on average. However, a scenario like this should not occur if the hash function is good and the size of the hash table is big enough.

### 4 - OrderedMap vs. UnorderedMap

So let's see a real life example of a hash table. In your homework, you have been using an ordered map. What is an unordered map and how is it different?

#### 4.1 - OrderedMap

An ordered map uses a balanced binary search tree as its underlying data structure. This means that access operations are O(logn) in the worse case. As the name suggests, ordered maps maintain order based off the key.

This is the default implementation of a map if you try and use `std::map`. Fun Fact: The standard library uses a Red-Black Tree as the underlying implementation.

1. `get(key)` | O(logn)
2. `put(key, value)` | O(logn)
3. `remove(key)` | O(logn)

#### 4.1 - UnorderedMap

An unordered map uses a hash table as its underlying data structure. This means that access operations are O(1) on average, but because of this, no order can be inferred. By improving the runtime of operations, we had to sacrifice the ordering property.

You must explicitly create an unordered map using `std::unordered_map`.

1. `get(key)` | O(1) on average
2. `put(key, value)` | O(1) on average
3. `remove(key)` | O(1) on average

### 5 - HashTable Assignment

You will be implementing an unordered set with `string` keys using linear probing. The hash function is already implemented so you will be using the array of vector pointers to do the required functions.

To run the tests, run `make` to compile the hashtable binary, then run the program. It should print out all "Good", and of course not segfault or anything.
- [ ] Implement `insert`, `find`, and `remove` in `hashtable.cpp`
- [ ] Remember to show your passing tests & `lab12.txt` to a TA/CP for checkoff!

NOTE: as a bonus, there is an optional, commented-out test called `TestRemoveSUPERSTRESS_AGHHHHHHHHH`. If you've implemented everything correctly, you should be able to run this test pretty quickly! Otherwise, it takes a very long time to run (though you might have success running the `HashtableTest` executable faster without Valgrind.) Regardless, you do not need to wait for/pass this test to pass to get checked off!
