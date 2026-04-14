---
layout: default
title: Midterm 3 Info
nav: Resources
---

## Hashing (10 pts.) 
Consider a hash table that uses open-addressing (some form of probing) and the same 
table structure (vector of HashItem pointers) from homework 6 as well as a similar 
HashItem structure (reproduced below for your benefit).  Now write a function that will 
compute how many buckets of the hash table would be empty if chaining / closed-
addressing had been used instead (for the same table size).   
 
You do not necessarily need to convert the table to use chaining, simply calculate how 
many locations / buckets would be empty. Your function must run in Theta(m) time where 
`m` is the table size. You may declare other arrays / data structures as needed.  
 
Complete your code in the linked chains.cpp and submit that file. A portion is reproduced 
below

```c++
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
    // Your code here 
    
    // Recall:  You will not be able to test this code since we do not provide
    // the original hash table implementation nor main() test driver. Use 
    // visual (pen/paper) analysis to check over your implementation



}

#endif
```